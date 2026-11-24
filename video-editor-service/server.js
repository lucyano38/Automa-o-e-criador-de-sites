'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { renderJob, probe, validateJobSpec } = require('./render');
const { PRESETS, BANNER_THEMES, BANNER_POSITIONS } = require('./presets');
const { detectSilenceAndGetCuts, splitForInstagram } = require('./auto-cut');
const { runCleanup, startCleanupScheduler } = require('./cleanup');

const PORT = Number(process.env.PORT) || 3000;
const CONCURRENCY = Number(process.env.CONCURRENCY) || 1;
const MAX_UPLOAD = 2 * 1024 * 1024 * 1024;
const MAX_STORED_JOBS = Number(process.env.MAX_STORED_JOBS) || 200;
const UPLOADS = path.join(__dirname, 'storage', 'uploads');
const OUTPUTS = path.join(__dirname, 'storage', 'outputs');
fs.mkdirSync(UPLOADS, { recursive: true });
fs.mkdirSync(OUTPUTS, { recursive: true });

const ALLOWED_EXT = new Set(['mp4', 'mov', 'mkv', 'webm', 'png', 'jpg', 'jpeg', 'svg']);
const ID_RE = /^[a-f0-9]{32}\.[a-z0-9]{2,4}$/;

// Quando configurado, cada job consome 1 video da cota do assinante no site.
// Sem SITE_API_URL o servico funciona livremente (uso local/desenvolvimento).
const SITE_API_URL = String(process.env.SITE_API_URL || '').replace(/\/$/, '');

function checkEditorProAccess(req) {
  if (!SITE_API_URL) return Promise.resolve({ allowed: true, remaining: null });
  const raw = req.headers['x-foco-id-token'] || req.headers.authorization || '';
  const token = String(raw).replace(/^Bearer\s+/i, '');
  if (!token) return Promise.resolve({ allowed: false, error: 'Token de acesso ausente' });

  return new Promise(resolve => {
    const body = JSON.stringify({});
    const mod = SITE_API_URL.startsWith('https') ? require('https') : http;
    const r = mod.request(
      `${SITE_API_URL}/api/editor-pro/consume`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          Authorization: `Bearer ${token}`
        }
      },
      res => {
        let data = '';
        res.on('data', c => { data += c; });
        res.on('end', () => {
          try {
            const j = JSON.parse(data);
            resolve({
              allowed: res.statusCode < 300 && j.allowed !== false,
              remaining: j.remaining,
              error: j.error
            });
          } catch (_) {
            resolve({ allowed: false, error: 'Resposta invalida do site' });
          }
        });
      }
    );
    r.on('error', e => resolve({ allowed: false, error: 'Falha ao validar assinatura: ' + e.message }));
    r.end(body);
  });
}

const jobs = new Map();
const queue = [];
let running = 0;

function pruneJobs() {
  if (jobs.size <= MAX_STORED_JOBS) return;
  const entries = Array.from(jobs.entries());
  for (const [id, job] of entries) {
    if (jobs.size <= MAX_STORED_JOBS) break;
    if (job.status === 'done' || job.status === 'error') {
      if (job.paths && job.paths.output && fs.existsSync(job.paths.output)) {
        try { fs.unlinkSync(job.paths.output); } catch (_) {}
      }
      jobs.delete(id);
    }
  }
}

function pump() {
  while (running < CONCURRENCY && queue.length) {
    const job = queue.shift();
    running++;
    job.status = 'processing';
    renderJob(job.spec, job.paths, p => { job.progress = p; })
      .then(res => {
        job.status = 'done';
        job.progress = 100;
        job.result = res;
        job.url = '/files/' + path.basename(job.paths.output);
        pruneJobs();
      })
      .catch(e => {
        job.status = 'error';
        job.error = e.message;
        if (job.paths && job.paths.output && fs.existsSync(job.paths.output)) {
          try { fs.unlinkSync(job.paths.output); } catch (_) {}
        }
        pruneJobs();
      })
      .finally(() => { running--; pump(); });
  }
}

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*'
  });
  res.end(body);
}

function readJson(req, limit = 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > limit) { reject(new Error('Corpo muito grande')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString() || '{}')); }
      catch { reject(new Error('JSON inválido')); }
    });
    req.on('error', reject);
  });
}

function resolveUpload(id) {
  if (typeof id !== 'string' || !ID_RE.test(id)) throw new Error('Arquivo inválido: ' + id);
  const p = path.join(UPLOADS, id);
  if (!fs.existsSync(p)) throw new Error('Arquivo não encontrado: ' + id);
  return p;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    // 1. Interface Web Principal
    if (req.method === 'GET' && url.pathname === '/') {
      const htmlPath = path.join(__dirname, 'public', 'index.html');
      if (!fs.existsSync(htmlPath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('public/index.html não encontrado');
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(htmlPath).pipe(res);
    }

    // 2. Consulta de presets e temas de banners
    if (req.method === 'GET' && url.pathname === '/presets') {
      return send(res, 200, { presets: PRESETS, themes: BANNER_THEMES, positions: BANNER_POSITIONS });
    }

    // 3. Upload de mídia
    if ((req.method === 'POST' || req.method === 'PUT') && url.pathname === '/upload') {
      const ext = (url.searchParams.get('ext') || '').toLowerCase();
      if (!ALLOWED_EXT.has(ext)) return send(res, 400, { error: 'Extensão não permitida' });
      const id = crypto.randomBytes(16).toString('hex') + '.' + ext;
      const dest = path.join(UPLOADS, id);
      const ws = fs.createWriteStream(dest);
      let size = 0;
      let aborted = false;
      req.on('data', c => {
        size += c.length;
        if (size > MAX_UPLOAD && !aborted) {
          aborted = true;
          ws.destroy();
          fs.unlink(dest, () => {});
          send(res, 413, { error: 'Arquivo muito grande' });
          req.destroy();
        }
      });
      req.pipe(ws);
      ws.on('finish', () => { if (!aborted) send(res, 201, { id, bytes: size }); });
      ws.on('error', () => { if (!aborted) send(res, 500, { error: 'Falha ao salvar' }); });
      return;
    }

    // 4. Detecção automática de silêncio e corte inteligente
    if (req.method === 'POST' && url.pathname === '/auto-cut/detect') {
      const body = await readJson(req);
      const filePath = resolveUpload(body.fileId);
      const info = await probe(filePath);
      if (!(info.duration > 0)) return send(res, 400, { error: 'Vídeo inválido' });

      const result = await detectSilenceAndGetCuts(filePath, info.duration, body.options || {});
      return send(res, 200, {
        duration: info.duration,
        ...result
      });
    }

    // 5. Sugestão de divisão de vídeo para Instagram
    if (req.method === 'POST' && url.pathname === '/auto-cut/split') {
      const body = await readJson(req);
      const filePath = resolveUpload(body.fileId);
      const info = await probe(filePath);
      const parts = splitForInstagram(info.duration, body.mode || 'reels_60');
      return send(res, 200, { duration: info.duration, parts });
    }

    // 6. Submissão de Job de Renderização
    if (req.method === 'POST' && url.pathname === '/jobs') {
      const access = await checkEditorProAccess(req);
      if (!access.allowed) return send(res, 403, { error: access.error || 'Acesso negado ao Editor Pro' });

      const spec = await readJson(req);
      const paths = { input: resolveUpload(spec.input), banners: [] };
      for (const b of spec.banners || []) {
        if (b.file) paths.banners.push(resolveUpload(b.file));
      }

      const info = await probe(paths.input);
      if (!(info.duration > 0)) return send(res, 400, { error: 'Vídeo de entrada inválido' });
      validateJobSpec(spec, info.duration);

      const id = crypto.randomBytes(8).toString('hex');
      paths.output = path.join(OUTPUTS, crypto.randomBytes(16).toString('hex') + '.mp4');
      const job = { id, status: 'queued', progress: 0, spec, paths, createdAt: Date.now() };
      jobs.set(id, job);
      queue.push(job);
      pump();
      return send(res, 202, { id, status: job.status });
    }

    // 7. Status do Job
    let m = url.pathname.match(/^\/jobs\/([a-f0-9]{16})$/);
    if (req.method === 'GET' && m) {
      const job = jobs.get(m[1]);
      if (!job) return send(res, 404, { error: 'Job não encontrado' });
      return send(res, 200, {
        id: job.id,
        status: job.status,
        progress: job.progress,
        url: job.url,
        error: job.error,
        result: job.result
      });
    }

    // 8. Download do Vídeo Final
    m = url.pathname.match(/^\/files\/([a-f0-9]{32}\.mp4)$/);
    if (req.method === 'GET' && m) {
      const file = path.join(OUTPUTS, m[1]);
      if (!fs.existsSync(file)) return send(res, 404, { error: 'Arquivo não encontrado' });
      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': fs.statSync(file).size,
        'Content-Disposition': 'attachment; filename="video-editado-instagram.mp4"'
      });
      return fs.createReadStream(file).pipe(res);
    }

    send(res, 404, { error: 'Rota não encontrada' });
  } catch (e) {
    send(res, 400, { error: e.message });
  }
});

runCleanup([UPLOADS, OUTPUTS]).catch(() => {});
startCleanupScheduler([UPLOADS, OUTPUTS]);

server.listen(PORT, () => console.log('Servidor em http://localhost:' + PORT));
