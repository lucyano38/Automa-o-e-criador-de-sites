'use strict';

const { mapTimeAfterCuts, normalize, titleFromText } = require('./transcribe');

const HIGHLIGHT_RULES = [
  { words: ['dica', 'segredo', 'descubra', 'saiba'], label: 'DICA' },
  { words: ['importante', 'atenção', 'cuidado', 'evite', 'nunca'], label: 'IMPORTANTE' },
  { words: ['primeiro', 'segundo', 'terceiro', 'passo'], label: 'PASSO A PASSO' },
  { words: ['resultado', 'ganhe', 'economize', 'aumente', 'venda'], label: 'RESULTADO' },
  { words: ['erro', 'pior', 'pare', 'não faça'], label: 'ERRO COMUM' }
];

function cleanTitle(text, max = 38) {
  let t = titleFromText(text, 0);
  if (t.length > max) t = t.slice(0, max - 3).trim() + '...';
  return t || 'DESTAQUE';
}

/**
 * Monta um plano com varios banners a partir da fala do video:
 * gancho inicial, um banner por topico, destaques, chamada final e lower-third.
 * Todos os tempos ja vem mapeados para o video apos os cortes.
 */
function buildBannerPlan(segments, topics, opts = {}) {
  const total = Number(opts.total) || 0;
  const cuts = Array.isArray(opts.cuts) ? opts.cuts : [];
  const username = opts.username || '';
  const map = t => mapTimeAfterCuts(t, cuts);
  const themes = Object.keys(opts.themes || {});
  const pickTheme = i => (themes.length ? themes[i % themes.length] : 'instagram_gradient');
  const plan = [];

  topics.forEach((topic, i) => {
    const start = map(topic.start);
    const end = map(topic.end);
    if (end <= start) return;
    plan.push({
      kind: 'topic',
      title: topic.title,
      subtitle: opts.topicSubtitle || `TOPICO ${i + 1}`,
      username,
      theme: pickTheme(i),
      position: opts.position || 'top',
      widthPct: 0.92,
      start,
      end
    });
  });

  if (opts.hook !== false && topics.length) {
    plan.push({
      kind: 'hook',
      title: cleanTitle(topics[0].title, 34),
      subtitle: opts.hookSubtitle || 'ASSISTA ATE O FIM',
      username,
      theme: 'instagram_gradient',
      position: 'bottom',
      widthPct: 0.9,
      start: 0,
      end: Math.min(3.2, total)
    });
  }

  const usedSegments = new Set();
  const maxHighlights = Math.max(0, Math.min(8, Number(opts.maxHighlights) == null ? 4 : Number(opts.maxHighlights)));
  if (opts.highlights !== false && maxHighlights > 0) {
    let lastStart = -100;
    for (let si = 0; si < segments.length; si++) {
      const seg = segments[si];
      if (plan.filter(p => p.kind === 'highlight').length >= maxHighlights) break;
      const low = normalize(seg.text);
      if (!low) continue;
      const hasNumber = /\d/.test(low);
      const isQuestion = (seg.text.match(/\?/g) || []).length > 0;
      const rule = HIGHLIGHT_RULES.find(r => r.words.some(w => low.includes(w)));
      if (!hasNumber && !isQuestion && !rule) continue;

      const start = map(seg.start);
      if (start - lastStart < 4) continue;
      let end = Math.min(total, start + 2.8);
      // Nao deixa o destaque cobrir a chamada final.
      if (opts.cta !== false) end = Math.min(end, Math.max(start, total - 4.4));
      if (end <= start) continue;

      usedSegments.add(si);
      plan.push({
        kind: 'highlight',
        title: cleanTitle(seg.text),
        subtitle: isQuestion ? 'PERGUNTA' : (rule ? rule.label : 'EM NUMEROS'),
        username,
        theme: rule ? pickTheme(plan.length) : 'gold_luxury',
        position: 'bottom',
        widthPct: 0.88,
        start,
        end
      });
      lastStart = start;
    }
  }

  // Cartao de citacao: uma frase curta e marcante dita no video.
  const maxQuotes = Math.max(0, Math.min(3, Number(opts.maxQuotes) == null ? 2 : Number(opts.maxQuotes)));
  if (opts.quotes !== false && maxQuotes > 0) {
    let added = 0;
    let lastQuoteStart = -100;
    for (let si = 0; si < segments.length && added < maxQuotes; si++) {
      if (usedSegments.has(si)) continue;
      const seg = segments[si];
      const text = String(seg.text || '').trim();
      const len = text.length;
      if (len < 18 || len > 95 || /\d/.test(text) || text.includes('?')) continue;
      const start = map(seg.start);
      if (start - lastQuoteStart < 6) continue;
      let end = Math.min(total, start + 3.2);
      if (opts.cta !== false) end = Math.min(end, Math.max(start, total - 4.4));
      if (end - start < 1.5) continue;
      usedSegments.add(si);
      let quote = text.replace(/[!?.,;:]+$/g, '');
      if (quote.length > 52) quote = quote.slice(0, 50).trim() + '...';
      plan.push({
        kind: 'quote',
        title: quote.toUpperCase(),
        subtitle: 'FRASE DE IMPACTO',
        username,
        theme: 'dark_neon',
        position: 'center',
        widthPct: 0.78,
        start,
        end
      });
      lastQuoteStart = start;
      added++;
    }
  }

  // Cartao de divisao entre assuntos (curto, no centro).
  if (opts.dividers === true && topics.length > 1) {
    topics.slice(1).forEach((topic, i) => {
      const start = map(topic.start);
      const end = Math.min(total, start + 1.4);
      if (end <= start) return;
      plan.push({
        kind: 'divider',
        title: `TOPICO ${i + 2}`,
        subtitle: 'NOVA SECAO',
        username,
        theme: pickTheme(i + 2),
        position: 'center',
        widthPct: 0.7,
        start,
        end
      });
    });
  }

  if (opts.cta !== false && total > 5) {
    plan.push({
      kind: 'cta',
      title: 'SALVE E COMPARTILHE',
      subtitle: username || 'SIGA PARA MAIS DICAS',
      username,
      theme: 'gold_luxury',
      position: 'bottom',
      widthPct: 0.92,
      start: Math.max(0, total - 4),
      end: total
    });
  }

  if (opts.lowerThird === true && total > 3) {
    plan.push({
      kind: 'lowerthird',
      title: username || 'FOCO EM DADOS',
      subtitle: 'EDICAO AUTOMATICA',
      username,
      theme: 'dark_neon',
      position: 'bottom_stick',
      widthPct: 0.7,
      start: 0,
      end: Math.min(5, total)
    });
  }

  // Ordem de desenho: topicos -> destaques -> lower-third -> CTA -> gancho.
  const order = { topic: 0, divider: 1, highlight: 2, quote: 3, lowerthird: 4, cta: 5, hook: 6 };
  return plan.sort((a, b) => (order[a.kind] - order[b.kind]) || (a.start - b.start));
}

function srtTime(seconds) {
  const s = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.round((s - Math.floor(s)) * 1000);
  const p = n => String(n).padStart(2, '0');
  return `${p(h)}:${p(m)}:${p(sec)},${String(ms).padStart(3, '0')}`;
}

/** Gera SRT com os tempos remapeados apos os cortes de silencio. */
function buildSrt(segments, cuts = [], opts = {}) {
  const maxChars = Number(opts.maxChars) || 42;
  const lines = [];
  let i = 1;
  for (const seg of segments) {
    const start = mapTimeAfterCuts(seg.start, cuts);
    const end = mapTimeAfterCuts(seg.end, cuts);
    if (!(end > start)) continue;
    const raw = String(seg.text || '').trim().replace(/-->|\n/g, ' ');
    if (!raw) continue;
    const words = raw.split(/\s+/);
    const chunks = [];
    let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > maxChars && cur) {
        chunks.push(cur.trim());
        cur = w;
      } else {
        cur = (cur ? cur + ' ' : '') + w;
      }
    }
    if (cur.trim()) chunks.push(cur.trim());
    lines.push(String(i++), `${srtTime(start)} --> ${srtTime(end)}`, chunks.join('\n'), '');
  }
  return lines.join('\n') + '\n';
}

function assTime(seconds) {
  const s = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, '0')}:${sec.toFixed(2).padStart(5, '0')}`;
}

/**
 * Gera ASS com PlayRes explicito. Sem isso o libass assume 288 linhas e
 * multiplica o tamanho da fonte em videos verticais 1080x1920.
 */
function buildAss(segments, cuts = [], opts = {}) {
  const width = Number(opts.width) || 1080;
  const height = Number(opts.height) || 1920;
  const fontSize = Math.max(12, Math.min(120, Number(opts.fontSize) || 44));
  const margin = Math.max(10, Math.min(600, Number(opts.marginV) || 140));
  const color = String(opts.color || '#FFFFFF').replace('#', '').toUpperCase();
  const font = String(opts.font || 'Arial').replace(/[,]/g, '');

  const header = [
    '[Script Info]',
    'ScriptType: v4.00+',
    `PlayResX: ${width}`,
    `PlayResY: ${height}`,
    'WrapStyle: 0',
    'ScaledBorderAndShadow: yes',
    '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: Default,${font},${fontSize},&H00${color},&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,3,1,2,30,30,${margin},1`,
    '',
    '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
  ];

  const events = [];
  const maxChars = Number(opts.maxChars) || 34;
  let lastEnd = -1;
  const seen = new Set();
  for (const seg of [...segments].sort((a, b) => a.start - b.start)) {
    let start = mapTimeAfterCuts(seg.start, cuts);
    let end = mapTimeAfterCuts(seg.end, cuts);
    if (!(end > start)) continue;
    const raw = String(seg.text || '').trim().replace(/\{|\}|\\N/g, ' ');
    if (!raw) continue;
    const key = normalize(raw);
    if (seen.has(key)) continue;
    seen.add(key);
    // Segmentos que caem dentro de silencios removidos podem colapsar no
    // mesmo tempo renderizado; corta o inicio para nao sobrepor legendas.
    if (start < lastEnd) start = lastEnd;
    if (!(end > start)) continue;
    lastEnd = end;
    const words = raw.split(/\s+/);
    const chunks = [];
    let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > maxChars && cur) {
        chunks.push(cur.trim());
        cur = w;
      } else {
        cur = (cur ? cur + ' ' : '') + w;
      }
    }
    if (cur.trim()) chunks.push(cur.trim());
    const highlightRe = /(\b\d+(?:[.,]\d+)?%?\b|\b(?:dica|importante|atencao|atenção|segredo|resultado|ganhe|evite|nunca|primeiro|segundo|terceiro)\b)/gi;
    const totalWords = Math.max(1, words.length);
    let usedWords = 0;
    chunks.forEach((chunk, ci) => {
      const cw = Math.max(1, chunk.split(/\s+/).length);
      const cStart = ci === 0 ? start : start + (end - start) * (usedWords / totalWords);
      const cEnd = ci === chunks.length - 1 ? end : start + (end - start) * ((usedWords + cw) / totalWords);
      usedWords += cw;
      if (!(cEnd > cStart)) return;
      const decorated = chunk.replace(highlightRe, m => `{\\c&H0000A5FF}${m}{\\c&H00FFFFFF}`);
      events.push(`Dialogue: 0,${assTime(cStart)},${assTime(cEnd)},Default,,0,0,0,,${decorated}`);
    });
  }

  return header.concat(events).join('\n') + '\n';
}

module.exports = { buildBannerPlan, buildSrt, buildAss, cleanTitle };
