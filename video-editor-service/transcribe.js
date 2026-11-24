'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(execFile);

function getFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const winget = path.join(
      process.env.LOCALAPPDATA || '',
      'Microsoft', 'WinGet', 'Packages',
      'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe',
      'ffmpeg-9.1-full_build', 'bin', 'ffmpeg.exe'
    );
    if (fs.existsSync(winget)) return winget;
  } catch (_) {}
  return 'ffmpeg';
}

// Caminhos dentro de filtros do FFmpeg precisam ter ":" e "\" escapados.
function escFilterPath(p) {
  return String(p).replace(/\\/g, '/').replace(/:/g, '\\:');
}

function defaultModel() {
  if (process.env.WHISPER_MODEL) return process.env.WHISPER_MODEL;
  // Ordenado do mais preciso para o mais rápido. O large-v3-turbo é bem
  // melhor em português do que o small, que errava muitas palavras.
  const candidates = [
    'ggml-small.bin',
    'ggml-large-v3-turbo-q8_0.bin',
    'ggml-medium-q8_0.bin',
    'ggml-medium.bin',
    'ggml-tiny.bin'
  ];
  for (const name of candidates) {
    const p = path.join(__dirname, 'models', name);
    if (fs.existsSync(p)) return p;
  }
  return path.join(__dirname, 'models', 'ggml-tiny.bin');
}

/**
 * Transcreve o áudio com o filtro whisper do FFmpeg.
 * Retorna segmentos [{ start, end, text }] em segundos.
 */
async function transcribeVideo(inputPath, opts = {}) {
  const model = opts.model || defaultModel();
  if (!fs.existsSync(model)) {
    throw new Error('Modelo Whisper não encontrado: ' + model);
  }
  const language = opts.language || 'pt';
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ig-transcribe-'));
  const dest = path.join(tmpDir, 'transcript.json');
  const localModel = path.join(tmpDir, 'model.bin');

  try {
    // O parser de filtergraph do FFmpeg trata ":" como separador de opções.
    // Por isso usamos nomes curtos e relativos dentro de um cwd temporário.
    try { fs.linkSync(model, localModel); } catch (_) { fs.copyFileSync(model, localModel); }
    // queue=3 (padrão do filtro) entrega o áudio em pedaços de 3 s e destrói
    // o contexto do Whisper, gerando texto torto. 30 s é a janela nativa.
    const requestedQueue = Number(opts.queue);
    const queue = Math.max(3, Math.min(60, Number.isFinite(requestedQueue) ? requestedQueue : 30));
    const af = `whisper=model=model.bin:language=${language}:queue=${queue}:format=json:destination=transcript.json`;
    await execFileAsync(
      getFfmpeg(),
      ['-y', '-hide_banner', '-loglevel', 'error', '-i', path.resolve(inputPath), '-af', af, '-f', 'null', 'NUL'],
      { cwd: tmpDir, maxBuffer: 32 * 1024 * 1024 }
    );

    if (!fs.existsSync(dest)) return [];
    const raw = fs.readFileSync(dest, 'utf8');
    const segments = [];
    for (const line of raw.split(/\r?\n/)) {
      if (!line.trim()) continue;
      let s;
      try { s = JSON.parse(line); } catch (_) { continue; }
      const text = String(s.text || '').trim();
      if (!text || /^\[[^\]]+\]$/.test(text)) continue;
      const start = Number(s.start) / 1000;
      const end = Number(s.end) / 1000;
      if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) continue;
      segments.push({ start, end, text });
    }
    return segments;
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
  }
}

const STOPWORDS = new Set([
  'hoje', 'vamos', 'falar', 'sobre', 'uma', 'um', 'uns', 'umas', 'o', 'a', 'os', 'as',
  'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'que', 'é', 'era', 'foi', 'para', 'por',
  'com', 'no', 'na', 'nos', 'nas', 'ao', 'aos', 'se', 'sua', 'seu', 'seus', 'suas',
  'este', 'esta', 'estes', 'estas', 'isso', 'isto', 'aquele', 'aquela', 'muito', 'mais',
  'já', 'como', 'todos', 'todas', 'todo', 'toda', 'tem', 'ter', 'faz', 'fazer', 'agora',
  'mudar', 'assunto', 'seguinte', 'próximo', 'proxima', 'então', 'entao', 'bom', 'bem',
  'pela', 'pelos', 'pelas', 'pelo', 'até', 'ate', 'só', 'so', 'outro', 'outra', 'ainda',
  'também', 'tambem', 'porque', 'pois', 'quando', 'onde', 'está', 'esta', 'são', 'sao'
]);

function normalize(s) {
  return String(s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Palavras de enchimento ditas no início de uma frase. Ignorá-las evita
// títulos como "ENTAO VAMOS FALAR" no lugar do assunto real.
const FILLER = new Set([
  'entao', 'entao', 'bom', 'olha', 'olhe', 'vamos', 'vou', 'agora', 'hoje',
  'porque', 'pois', 'tipo', 'assim', 'ok', 'tudo', 'bem', 'gente', 'pessoal',
  'sei', 'la', 'aqui', 'ali', 'mesmo', 'sobre', 'falar', 'quer', 'precisa',
  'primeiro', 'segundo', 'terceiro', 'proximo', 'proxima'
]);

const TIME_WORDS = new Set([
  'hoje', 'ontem', 'amanha', 'agora', 'dia', 'dias', 'semana', 'semanas',
  'mes', 'meses', 'ano', 'anos', 'horas', 'minuto', 'minutos', 'primeiro',
  'segundo', 'terceiro', 'janeiro', 'fevereiro', 'marco', 'abril', 'maio',
  'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo',
  'quais', 'quem', 'onde', 'quando', 'tá', 'ne', 'tao', 'bastante',
  'tinha', 'falado', 'poderia', 'chegar', 'atras', 'parou', 'disse',
  'vai', 'ver', 'fazendo', 'colocar'
]);

const TITLE_IGNORE = new Set([...STOPWORDS, ...FILLER, ...TIME_WORDS]);

/**
 * Escolhe a janela de palavras mais informativa do trecho falado.
 * Isso evita os títulos ruins de antes ("TERÇAFEIRA NOVEMBRO DIA"), que
 * vinham das primeiras palavras do áudio, e favorece o assunto real.
 */
function titleFromText(text, index) {
  const raw = String(text || '').replace(/\s+/g, ' ').trim();
  const tokens = raw.split(/\s+/).filter(Boolean);
  if (!tokens.length) return `TOPICO ${index + 1}`;
  const norm = tokens.map(normalize);
  const win = Math.min(6, tokens.length);
  let bestScore = -Infinity;
  let bestStart = 0;

  for (let i = 0; i + win <= tokens.length; i++) {
    let score = 0;
    for (let k = 0; k < win; k++) {
      const n = norm[i + k];
      if (n.length < 3 || TITLE_IGNORE.has(n)) {
        if (TIME_WORDS.has(n)) score -= 2;
        continue;
      }
      score += 2;
      if (/^[A-ZÀ-Ý]/.test(tokens[i + k])) score += 1;
    }
    if (score > bestScore) { bestScore = score; bestStart = i; }
  }

  const picked = [];
  for (let k = 0; k < win && picked.length < 4; k++) {
    const j = bestStart + k;
    const n = norm[j];
    if (n.length < 3 || TITLE_IGNORE.has(n)) continue;
    if (picked.length && n === norm[picked[picked.length - 1]]) continue;
    picked.push(j);
  }
  if (!picked.length) {
    for (let j = 0; j < tokens.length && picked.length < 4; j++) {
      if (norm[j].length > 2 && !TITLE_IGNORE.has(norm[j])) picked.push(j);
    }
  }
  if (!picked.length) {
    for (let j = 0; j < tokens.length && picked.length < 3; j++) {
      if (norm[j].length > 2) picked.push(j);
    }
  }

  let title = picked
    .map(j => tokens[j].replace(/[^A-Za-zÀ-ÿ0-9.,]/g, '').replace(/[.,]+$/, '').toUpperCase())
    .filter(Boolean)
    .join(' ');
  if (!title) return `TOPICO ${index + 1}`;
  if (title.length > 44) title = title.slice(0, 41).trim() + '...';
  return title;
}

/**
 * Agrupa segmentos de fala em tópicos. Usa pausas, marcadores de transição,
 * limite de duração e limite de caracteres.
 */
function segmentTopics(segments, opts = {}) {
  const gapThreshold = typeof opts.gapThreshold === 'number' ? opts.gapThreshold : 0.65;
  const maxTopicSeconds = typeof opts.maxTopicSeconds === 'number' ? opts.maxTopicSeconds : 32;
  const maxTopicChars = typeof opts.maxTopicChars === 'number' ? opts.maxTopicChars : 280;
  const markers = opts.markers || [
    'agora vamos', 'mudar de assunto', 'vamos falar sobre', 'proximo tema',
    'em seguida', 'por outro lado', 'outra coisa', 'passando para', 'falando agora',
    'outro ponto', 'segundo tema', 'proxima parte'
  ];

  const groups = [];
  let cur = null;
  for (const seg of segments) {
    const txt = String(seg.text || '').trim();
    if (!txt) continue;
    const low = normalize(txt);
    const hasMarker = markers.some(m => {
      const nm = normalize(m);
      return low.indexOf(nm) !== -1;
    });
    const gap = cur ? seg.start - cur.end : 0;
    const tooLong = cur && ((seg.end - cur.start) > maxTopicSeconds || (cur._chars + txt.length) > maxTopicChars);

    if (!cur || hasMarker || gap > gapThreshold || tooLong) {
      if (cur) groups.push(cur);
      cur = { start: seg.start, end: seg.end, texts: [txt], _chars: txt.length };
    } else {
      cur.end = seg.end;
      cur.texts.push(txt);
      cur._chars += txt.length;
    }
  }
  if (cur) groups.push(cur);

  // Remove grupos muito curtos, juntando com o anterior.
  const merged = [];
  for (const g of groups) {
    if (merged.length && (g.end - g.start) < 1.2) {
      merged[merged.length - 1].end = g.end;
      merged[merged.length - 1].texts.push(...g.texts);
    } else {
      merged.push(g);
    }
  }

  return merged.map((g, i) => {
    const text = g.texts.join(' ');
    return {
      start: Number(g.start.toFixed(3)),
      end: Number(g.end.toFixed(3)),
      text,
      title: titleFromText(text, i)
    };
  });
}

/**
 * Mapeia um tempo do vídeo original para o tempo do vídeo após os cortes.
 */
function mapTimeAfterCuts(time, cuts) {
  if (!Array.isArray(cuts) || cuts.length === 0) return time;
  let rendered = 0;
  for (const c of cuts) {
    const s = Number(c.start) || 0;
    const e = Number(c.end) || 0;
    const len = Math.max(0, e - s);
    if (time >= s && time <= e) return rendered + (time - s);
    if (time < s) return rendered;
    rendered += len;
  }
  return rendered;
}

module.exports = {
  transcribeVideo,
  segmentTopics,
  titleFromText,
  normalize,
  mapTimeAfterCuts,
  defaultModel,
  getFfmpeg
};
