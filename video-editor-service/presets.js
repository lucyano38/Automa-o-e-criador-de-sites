'use strict';

/**
 * Presets otimizados para formatos de redes sociais, com foco em Instagram.
 * Inclui resoluções ideais, taxas de quadros e zonas de segurança (safe zones)
 * para que textos e banners não fiquem cobertos pela interface do Instagram.
 */
const PRESETS = {
  // Instagram Reels e Stories (9:16) - Formato vertical tela cheia
  instagram_reels: {
    width: 1080,
    height: 1920,
    fps: 30,
    label: 'Instagram Reels & Stories (9:16)',
    safeZone: { top: 0.14, bottom: 0.22, left: 0.05, right: 0.05 }
  },
  // Instagram Feed Retrato (4:5) - Ocupa a maior área do feed sem cortar
  instagram_feed_portrait: {
    width: 1080,
    height: 1350,
    fps: 30,
    label: 'Instagram Feed Retrato (4:5)',
    safeZone: { top: 0.08, bottom: 0.12, left: 0.05, right: 0.05 }
  },
  // Instagram Feed Quadrado (1:1) - Formato clássico
  instagram_feed_square: {
    width: 1080,
    height: 1080,
    fps: 30,
    label: 'Instagram Feed Quadrado (1:1)',
    safeZone: { top: 0.06, bottom: 0.08, left: 0.05, right: 0.05 }
  },
  // Formatos legado / compatibilidade
  vertical_9_16: {
    width: 1080,
    height: 1920,
    fps: 30,
    label: 'Vertical 9:16 (TikTok, Shorts, Reels)'
  },
  horizontal_16_9: {
    width: 1920,
    height: 1080,
    fps: 30,
    label: 'Horizontal 16:9 (YouTube)'
  },
  square_1_1: {
    width: 1080,
    height: 1080,
    fps: 30,
    label: 'Quadrado 1:1'
  },
  portrait_4_5: {
    width: 1080,
    height: 1350,
    fps: 30,
    label: 'Retrato 4:5'
  }
};

/**
 * Posições padrão para banners calculadas respeitando as áreas de botões
 * e legendas do Instagram (curtidas, comentários, foto de perfil, áudio).
 */
const BANNER_POSITIONS = {
  // Topo seguro: abaixo da barra de status e nome do usuário
  top: {
    x: '(main_w-overlay_w)/2',
    y: 'main_h*0.14'
  },
  // Centro da tela
  center: {
    x: '(main_w-overlay_w)/2',
    y: '(main_h-overlay_h)/2'
  },
  // Rodapé seguro: acima da legenda e botão de áudio do Reels
  bottom: {
    x: '(main_w-overlay_w)/2',
    y: 'main_h-overlay_h-(main_h*0.22)'
  },
  // Rodapé colado (para feed 4:5 ou 1:1)
  bottom_stick: {
    x: '(main_w-overlay_w)/2',
    y: 'main_h-overlay_h-(main_h*0.06)'
  }
};

/**
 * Paletas de cores profissionais para banners de alta conversão
 */
const BANNER_THEMES = {
  instagram_gradient: {
    name: 'Instagram Oficial',
    bgStart: '#833ab4',
    bgMid: '#fd1d1d',
    bgEnd: '#fcb045',
    textColor: '#ffffff',
    accentColor: '#ffe500',
    borderColor: 'rgba(255,255,255,0.4)'
  },
  dark_neon: {
    name: 'Dark Neon / Tech',
    bgStart: '#0f172a',
    bgMid: '#1e293b',
    bgEnd: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#38bdf8',
    borderColor: '#38bdf8'
  },
  gold_luxury: {
    name: 'Ouro & Luxo',
    bgStart: '#1a1813',
    bgMid: '#2d2619',
    bgEnd: '#1a1813',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
    borderColor: '#f59e0b'
  },
  clean_white: {
    name: 'Clean Moderno',
    bgStart: '#ffffff',
    bgMid: '#f8fafc',
    bgEnd: '#ffffff',
    textColor: '#0f172a',
    accentColor: '#ef4444',
    borderColor: '#e2e8f0'
  },
  youtube_punch: {
    name: 'Atenção Máxima (Amarelo & Preto)',
    bgStart: '#facc15',
    bgMid: '#eab308',
    bgEnd: '#facc15',
    textColor: '#09090b',
    accentColor: '#dc2626',
    borderColor: '#000000'
  }
};

module.exports = { PRESETS, BANNER_POSITIONS, BANNER_THEMES };
