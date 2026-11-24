'use strict';

const { spawn, execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { PRESETS, BANNER_POSITIONS, BANNER_THEMES } = require('./presets');
const { detectSilenceAndGetCuts } = require('./auto-cut');
const { generateBannerFile } = require('./banner-generator');
const { applyEffects } = require('./effects');
const { transcribeVideo, segmentTopics, mapTimeAfterCuts } = require('./transcribe');
const { buildBannerPlan, buildAss } = require('./smart-banners');
const { downloadToFile, searchWikipediaImage } = require('./image-sources');

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

function getFfprobe() {
  if (process.env.FFPROBE_PATH) return process.env.FFPROBE_PATH;
  try {
    const winget = path.join(
      process.env.LOCALAPPDATA || '',
      'Microsoft', 'WinGet', 'Packages',
      'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe',
      'ffmpeg-9.1-full_build', 'bin', 'ffprobe.exe'
    );
    if (fs.existsSync(winget)) return winget;
  } catch (_) {}
  return 'ffprobe';
}

function num(v, def) {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

function probe(file) {
  const FFPROBE = getFfprobe();
  return new Promise((resolve, reject) => {
    execFile(
      FFPROBE,
      ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type', '-of', 'json', file],
      (err, stdout) => {
        if (err) return reject(new Error('ffprobe falhou: ' + err.message));
        let info;
        try {
          info = JSON.parse(stdout);
        } catch (e) {
          return reject(new Error('ffprobe retornou JSON inválido: ' + e.message));
        }
        resolve({
          duration: num(info.format && info.format.duration, 0),
          hasAudio: (info.streams || []).some(s => s.codec_type === 'audio')
        });
      }
    );
  });
}

function normalizeCuts(cuts, duration) {
  if (!Array.isArray(cuts) || cuts.length === 0) return [{ start: 0, end: duration }];
  return cuts.map((c, i) => {
    const start = Math.max(0, num(c.start, 0));
    const end = Math.min(duration, num(c.end, duration));
    if (!(end > start)) throw new Error(`Corte #${i + 1} inválido (start >= end: ${start} >= ${end})`);
    return { start: Number(start.toFixed(3)), end: Number(end.toFixed(3)) };
  });
}

function validateJobSpec(job, duration) {
  if (!job || typeof job !== 'object') throw new Error('Especificação de job inválida');
  const out = job.output || {};
  const presetName = out.preset || 'instagram_reels';
  if (!PRESETS[presetName]) throw new Error('Preset desconhecido: ' + presetName);
  const fit = out.fit || 'blur';
  if (!['blur', 'crop', 'pad'].includes(fit)) throw new Error('Modo de enquadramento inválido: ' + fit);
  
  if (job.cuts && Array.isArray(job.cuts)) {
    normalizeCuts(job.cuts, duration);
  }
  
  const banners = Array.isArray(job.banners) ? job.banners : [];
  banners.forEach((b, i) => {
    const pos = b.position || 'bottom';
    if (!BANNER_POSITIONS[pos]) throw new Error(`Posição de banner #${i + 1} desconhecida: ` + pos);
  });
}

function buildArgs(job, info, paths) {
  const out = job.output || {};
  const preset = PRESETS[out.preset || 'instagram_reels'] || PRESETS.vertical_9_16;

  const W = preset.width;
  const H = preset.height;
  const fps = num(out.fps, preset.fps);
  const crf = num(out.crf, 20);
  const fit = out.fit || 'blur';

  const cuts = normalizeCuts(job.cuts, info.duration);
  const total = cuts.reduce((s, c) => s + (c.end - c.start), 0);
  const banners = Array.isArray(job.banners) ? job.banners : [];

  const f = [];

  // 1. Cortes e concatenação
  cuts.forEach((c, i) => {
    f.push(`[0:v]trim=start=${c.start}:end=${c.end},setpts=PTS-STARTPTS[v${i}]`);
    if (info.hasAudio) {
      // Fade de poucos milissegundos em cada ponta evita o estalo (click)
      // causado pela emenda seca dos trechos após remover silêncios.
      const len = Math.max(0, num(c.end, 0) - num(c.start, 0));
      const fade = Math.min(0.012, len / 4);
      f.push(
        `[0:a]atrim=start=${c.start}:end=${c.end},asetpts=PTS-STARTPTS,` +
        `afade=t=in:st=0:d=${fade.toFixed(3)},` +
        `afade=t=out:st=${(len - fade).toFixed(3)}:d=${fade.toFixed(3)}[a${i}]`
      );
    }
  });

  const concatIn = cuts.map((_, i) => `[v${i}]` + (info.hasAudio ? `[a${i}]` : '')).join('');
  f.push(`${concatIn}concat=n=${cuts.length}:v=1:a=${info.hasAudio ? 1 : 0}[vc]` + (info.hasAudio ? '[ac]' : ''));

  // 2. Enquadramento e proporção (blur / crop / pad)
  if (fit === 'crop') {
    f.push(`[vc]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1[base]`);
  } else if (fit === 'pad') {
    f.push(`[vc]scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:black,setsar=1[base]`);
  } else {
    const bw = Math.max(64, Math.round(W / 4));
    const bh = Math.max(64, Math.round(H / 4));
    f.push('[vc]split[bgs][fgs]');
    f.push(`[bgs]scale=${bw}:${bh}:force_original_aspect_ratio=increase,crop=${bw}:${bh},boxblur=15:3,scale=${W}:${H}:flags=bilinear[bg]`);
    f.push(`[fgs]scale=${W}:${H}:force_original_aspect_ratio=decrease[fg]`);
    f.push('[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1[base]');
  }

  let last = 'base';

  // 2.5. Efeitos de acabamento
  last = applyEffects(f, job.effects, W, H, fps, last);

  // 2.6. Legendas profissionais queimadas (SRT gerado pela transcricao)
  if (paths.subtitleFile && fs.existsSync(paths.subtitleFile)) {
    const cap = job.captions || {};
    const file = String(paths.subtitleFile).replace(/\\/g, '/').replace(/:/g, '\\\\:');
    const label = 'with_captions';
    f.push(`[${last}]subtitles=${file}:original_size=${W}x${H}[${label}]`);
    last = label;
  }

  // 3. Barra de Progresso Dinâmica
  // No drawbox, "t" é atalho de thickness (espessura), não tempo. Por isso a
  // barra é montada em segmentos ativados por enable='gte(t,...)', suportado
  // pela timeline do filtro.
  if (job.progressBar && job.progressBar.enabled) {
    const barH = num(job.progressBar.height, 14);
    const barColor = job.progressBar.color || '#fcb045';
    const barY = job.progressBar.position === 'top' ? '0' : `(ih-${barH})`;
    const segments = Math.max(1, Math.min(60, Math.round(num(job.progressBar.segments, 30))));
    for (let i = 1; i <= segments; i++) {
      const w = i === segments ? 'iw' : `(iw*${i}/${segments}+1)`;
      const at = (total * (i - 1) / segments).toFixed(3);
      const label = i === segments ? 'with_prog' : `prog${i}`;
      f.push(`[${last}]drawbox=x=0:y=${barY}:w=${w}:h=${barH}:color=${barColor}@1:t=fill:enable='gte(t,${at})'[${label}]`);
      last = label;
    }
  }

  // 4. Banners
  banners.forEach((b, i) => {
    const idx = i + 1;
    const pos = BANNER_POSITIONS[b.position || 'top'] || BANNER_POSITIONS.top;
    const widthPct = Math.min(1, Math.max(0.05, num(b.widthPct, 0.92)));
    const opacity = Math.min(1, Math.max(0, num(b.opacity, 1)));
    const when = b.when || 'all';
    const secs = Math.max(0.5, num(b.seconds, 3));

    let start, end;
    if (when === 'end') { start = Math.max(0, total - secs); end = total; }
    else if (when === 'start') { start = 0; end = Math.min(total, secs); }
    else if (when === 'all') { start = 0; end = total; }
    else { start = Math.max(0, num(b.start, 0)); end = Math.min(total, num(b.end, total)); }

    f.push(`[${idx}:v]scale=${Math.round(W * widthPct)}:-1,format=rgba,colorchannelmixer=aa=${opacity}[b${i}]`);
    f.push(`[${last}][b${i}]overlay=${pos.x}:${pos.y}:enable='between(t,${start},${end})'[o${i}]`);
    last = `o${i}`;
  });

  // Audio: preserva o som original por padrão. O loudnorm de uma passada
  // amplifica o ruído de fundo nas partes baixas, por isso agora é opcional.
  let audioLabel = 'ac';
  if (info.hasAudio && job.effects && job.effects.audioNormalize === true) {
    const fadeOutStart = Math.max(0, total - 0.6);
    f.push(`[ac]loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.25,afade=t=out:st=${fadeOutStart}:d=0.5[acn]`);
    audioLabel = 'acn';
  }

  f.push(`[${last}]format=yuv420p[vout]`);

  const args = ['-y', '-hide_banner', '-loglevel', 'error', '-progress', 'pipe:1', '-nostats', '-i', paths.input];
  banners.forEach((_, i) => args.push('-i', paths.banners[i]));
  args.push('-filter_complex', f.join(';'));
  args.push('-map', '[vout]');
  if (info.hasAudio) args.push('-map', `[${audioLabel}]`);

  args.push(
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', out.encoderPreset || 'veryfast',
    '-crf', String(crf), '-r', String(fps), '-pix_fmt', 'yuv420p'
  );

  if (info.hasAudio) {
    // Sem -ar forçado: mantém a taxa original e evita uma reamostragem.
    args.push('-c:a', 'aac', '-b:a', '256k');
  }

  args.push('-movflags', '+faststart', paths.output);

  return { args, total };
}

function runFfmpeg(args, total, onProgress) {
  const FFMPEG = getFfmpeg();
  return new Promise((resolve, reject) => {
    const p = spawn(FFMPEG, args);
    let errBuf = '';
    let outBuf = '';

    p.stderr.on('data', d => {
      errBuf = (errBuf + d).slice(-4000);
    });

    p.stdout.on('data', d => {
      outBuf += d;
      const lines = outBuf.split('\n');
      outBuf = lines.pop();
      for (const line of lines) {
        if (line.startsWith('out_time_us=') || line.startsWith('out_time_ms=')) {
          const us = Number(line.split('=')[1]);
          if (Number.isFinite(us) && total > 0 && onProgress) {
            onProgress(Math.min(99, Math.round((us / 1e6 / total) * 100)));
          }
        }
      }
    });

    p.on('error', e => reject(new Error('Não consegui executar o ffmpeg: ' + e.message)));
    p.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error('ffmpeg falhou (código ' + code + '): ' + errBuf.trim()));
    });
  });
}

async function renderJob(job, paths, onProgress) {
  const info = await probe(paths.input);
  if (!(info.duration > 0)) throw new Error('Vídeo de entrada inválido ou duração zerada');
  const outPreset = PRESETS[(job.output && job.output.preset) || 'instagram_reels'] || PRESETS.vertical_9_16;
  const W = outPreset.width;
  const H = outPreset.height;

  if (job.autoCut && job.autoCut.silence && (!job.cuts || job.cuts.length === 0)) {
    if (onProgress) onProgress(5);
    const autoResult = await detectSilenceAndGetCuts(paths.input, info.duration, job.autoCut);
    job.cuts = autoResult.cuts;
  }

  const tempFiles = [];
  const outDir = path.dirname(paths.output);
  const smartEnabled = !!(job.topicBanners && job.topicBanners.enabled);
  let topics = [];

  // Banners inteligentes: transcreve, detecta os tópicos e cria um banner
  // para cada assunto falado, no intervalo correspondente.
  if (smartEnabled) {
    if (onProgress) onProgress(8);
    const tb = job.topicBanners;
    let segments = [];
    try {
      segments = await transcribeVideo(paths.input, tb);
    } catch (e) {
      throw new Error('Falha ao transcrever para banners inteligentes: ' + e.message);
    }
    topics = segmentTopics(segments, tb);
    const plan = buildBannerPlan(segments, topics, {
      total: info.duration,
      cuts: job.cuts || [],
      username: tb.username,
      subtitle: tb.subtitle,
      hookSubtitle: tb.hookSubtitle,
      topicSubtitle: tb.topicSubtitle,
      position: tb.position,
      widthPct: tb.widthPct,
      hook: tb.hook,
      highlights: tb.highlights,
      cta: tb.cta,
      lowerThird: tb.lowerThird,
      quotes: tb.quotes,
      dividers: tb.dividers,
      maxHighlights: tb.maxHighlights,
      maxQuotes: tb.maxQuotes,
      themes: BANNER_THEMES
    });
    if (!Array.isArray(job.banners)) job.banners = [];
    if (!Array.isArray(paths.banners)) paths.banners = [];

    for (const item of plan) {
      const start = Math.max(0, num(item.start, 0));
      const end = Math.min(info.duration, num(item.end, info.duration));
      if (!(end > start)) continue;
      const bannerPath = await generateBannerFile({
        title: item.title,
        subtitle: item.subtitle,
        username: item.username,
        theme: item.theme
      }, outDir);
      tempFiles.push(bannerPath);
      job.banners.push({
        file: path.basename(bannerPath),
        position: item.position || 'top',
        widthPct: item.widthPct || 0.92,
        when: 'custom',
        start: Number(start.toFixed(3)),
        end: Number(end.toFixed(3))
      });
      paths.banners.push(bannerPath);
    }

    // Legendas profissionais geradas a partir da propria fala.
    if (job.captions && job.captions.enabled && segments.length) {
      const ass = buildAss(segments, job.cuts || [], {
        ...job.captions,
        width: W,
        height: H
      });
      const assPath = path.join(outDir, `legendas_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.ass`);
      fs.writeFileSync(assPath, ass, 'utf8');
      tempFiles.push(assPath);
      paths.subtitleFile = assPath;
    }
  }

  // Imagens vindas da internet: URLs informadas e/ou busca automatica pelo
  // assunto falado. Cada imagem entra como uma camada de banner.
  const wi = job.webImages;
  if (wi && wi.enabled) {
    if (!Array.isArray(job.banners)) job.banners = [];
    if (!Array.isArray(paths.banners)) paths.banners = [];
    const maxImages = Math.max(1, Math.min(8, Number(wi.maxImages) || 4));
    const imageItems = [];

    if (Array.isArray(wi.urls)) {
      const urls = wi.urls.map(u => String(u).trim()).filter(Boolean).slice(0, maxImages);
      const slot = info.duration / Math.max(1, urls.length);
      for (let i = 0; i < urls.length; i++) {
        try {
          const file = await downloadToFile(urls[i], outDir);
          imageItems.push({ file, start: i * slot, end: Math.min(info.duration, (i + 1) * slot) });
        } catch (e) {
          console.warn('[Imagem] falha ao baixar ' + urls[i] + ': ' + e.message);
        }
      }
    }

    if (wi.auto && topics.length) {
      for (const topic of topics.slice(0, maxImages)) {
        if (imageItems.length >= maxImages) break;
        try {
          const file = await searchWikipediaImage(topic.title, outDir);
          if (!file) continue;
          imageItems.push({
            file,
            start: mapTimeAfterCuts(topic.start, job.cuts || []),
            end: mapTimeAfterCuts(topic.end, job.cuts || [])
          });
        } catch (e) {
          console.warn('[Imagem] busca falhou para ' + topic.title + ': ' + e.message);
        }
      }
    }

    for (const item of imageItems) {
      const start = Math.max(0, num(item.start, 0));
      const end = Math.min(info.duration, num(item.end, info.duration));
      if (!(end > start)) continue;
      tempFiles.push(item.file);
      job.banners.push({
        file: path.basename(item.file),
        position: wi.position || 'center',
        widthPct: wi.widthPct || 0.42,
        opacity: 0.9,
        when: 'custom',
        start: Number(start.toFixed(3)),
        end: Number(end.toFixed(3))
      });
      paths.banners.push(item.file);
    }
  }

  if (job.professionalBanner && job.professionalBanner.title) {
    const bannerPath = await generateBannerFile(job.professionalBanner, outDir);
    tempFiles.push(bannerPath);

    if (!Array.isArray(job.banners)) job.banners = [];
    if (!Array.isArray(paths.banners)) paths.banners = [];

    // Com banners por tópico, o banner principal aparece só no início para
    // não cobrir os banners de assunto.
    // Desenhado por último para ficar acima dos banners de tópico.
    job.banners.push({
      file: path.basename(bannerPath),
      position: job.professionalBanner.position || 'top',
      widthPct: job.professionalBanner.widthPct || 0.92,
      when: smartEnabled ? 'start' : (job.professionalBanner.when || 'all'),
      seconds: smartEnabled ? 3 : job.professionalBanner.seconds
    });
    paths.banners.push(bannerPath);
  }

  try {
    validateJobSpec(job, info.duration);
    const { args, total } = buildArgs(job, info, paths);
    await runFfmpeg(args, total, onProgress);
    return { duration: total, cutsCount: (job.cuts || []).length };
  } finally {
    for (const f of tempFiles) {
      try { if (fs.existsSync(f)) fs.unlinkSync(f); } catch (_) {}
    }
  }
}

module.exports = {
  renderJob,
  buildArgs,
  probe,
  validateJobSpec,
  getFfmpeg,
  getFfprobe
};
