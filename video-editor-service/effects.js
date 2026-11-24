'use strict';

function num(v, def) {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

/**
 * Aplica efeitos de acabamento em uma chain de filtergraph.
 * @param {string[]} filters Array de filtros (modificado no lugar)
 * @param {object} opts Configuração job.effects
 * @param {number} W Largura do preset
 * @param {number} H Altura do preset
 * @param {number} fps FPS de saída
 * @param {string} inputLabel Label do stream de entrada
 * @returns {string} Label do último stream
 */
function applyEffects(filters, opts, W, H, fps, inputLabel) {
  if (!opts || opts.enabled === false) return inputLabel;
  let last = inputLabel;
  let i = 0;

  // Zoom cinematográfico lento e contínuo.
  if (opts.zoom) {
    const maxZoom = Math.min(1.25, Math.max(1.01, num(opts.zoomMax, 1.06)));
    const step = Math.min(0.005, Math.max(0.0001, num(opts.zoomStep, 0.0004)));
    const label = `fx_zoom_${i++}`;
    filters.push(
      `[${last}]zoompan=z='min(zoom+${step},${maxZoom})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=${fps}[${label}]`
    );
    last = label;
  }

  // Correção de cor / contraste sutil.
  if (opts.color) {
    const contrast = Math.min(2, Math.max(0.5, num(opts.contrast, 1.08)));
    const saturation = Math.min(3, Math.max(0, num(opts.saturation, 1.12)));
    const brightness = Math.min(0.3, Math.max(-0.3, num(opts.brightness, 0.01)));
    const label = `fx_color_${i++}`;
    filters.push(`[${last}]eq=contrast=${contrast}:saturation=${saturation}:brightness=${brightness}[${label}]`);
    last = label;
  }

  // Tonalidades de cor predefinidas.
  if (opts.grade && opts.grade !== 'natural') {
    const label = `fx_grade_${i++}`;
    let filter = null;
    if (opts.grade === 'bw') filter = `hue=s=0`;
    else if (opts.grade === 'cinematic') filter = 'colorbalance=rs=-0.06:bs=0.08:gs=0.02:rm=0.03:bm=-0.04';
    else if (opts.grade === 'vibrant') filter = 'eq=saturation=1.35:contrast=1.12';
    else if (opts.grade === 'vintage') filter = 'colorbalance=rs=0.08:bs=-0.08:gs=0.03,eq=contrast=0.92:saturation=0.85';
    if (filter) {
      filters.push(`[${last}]${filter}[${label}]`);
      last = label;
    }
  }

  // Nitidez leve.
  if (opts.sharpen) {
    const amount = Math.min(2, Math.max(0, num(opts.sharpenAmount, 0.35)));
    const label = `fx_sharp_${i++}`;
    filters.push(`[${last}]unsharp=5:5:${amount}:5:5:0[${label}]`);
    last = label;
  }

  // Vignette (cantos escurecidos).
  if (opts.vignette) {
    const strength = Math.min(8, Math.max(1, num(opts.vignetteStrength, 5)));
    const label = `fx_vig_${i++}`;
    filters.push(`[${last}]vignette=PI/${strength}[${label}]`);
    last = label;
  }

  // Barras cinematográficas.
  if (opts.cinemaBar) {
    const ratio = Math.min(0.2, Math.max(0.01, num(opts.cinemaBarHeight, 0.07)));
    const label = `fx_bar_${i++}`;
    filters.push(`[${last}]drawbox=x=0:y=0:w=iw:h=ih*${ratio}:color=black@1:t=fill,drawbox=x=0:y=ih*(1-${ratio}):w=iw:h=ih*${ratio}:color=black@1:t=fill[${label}]`);
    last = label;
  }

  return last;
}

module.exports = { applyEffects };
