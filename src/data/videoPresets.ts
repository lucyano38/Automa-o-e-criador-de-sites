import { VideoPresetSample } from '../types';

export const sampleVideoPresets: VideoPresetSample[] = [
  {
    id: 'reels-conversao',
    title: 'Reels / TikTok de Alta Conversão',
    category: 'Instagram & TikTok',
    format: '9:16',
    duration: 18,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-talking-to-the-camera-in-a-studio-41120-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    description: 'Edição automática com cortes rápidos de silêncio, legendas estilo Alex Hormozi (amarelo/verde), zoom dinâmico e retenção máxima.',
    hook: '🚨 Pare de perder clientes por demorar para responder no WhatsApp!',
    soundtrack: 'Tech Upbeat Lofi Vibe',
    captions: [
      {
        id: 'c1',
        startTime: 0,
        endTime: 3.5,
        text: 'PARE DE PERDER CLIENTES NO WHATSAPP!',
        highlightWord: 'PERDER CLIENTES',
        emoji: '🚨',
        effect: 'zoom'
      },
      {
        id: 'c2',
        startTime: 3.6,
        endTime: 7.2,
        text: 'Se você demora mais de 5 minutos pra responder...',
        highlightWord: '5 MINUTOS',
        emoji: '⏳',
        effect: 'shake'
      },
      {
        id: 'c3',
        startTime: 7.3,
        endTime: 11.5,
        text: 'O seu concorrente já fechou a venda na sua frente.',
        highlightWord: 'FECHOU A VENDA',
        emoji: '💸',
        effect: 'none'
      },
      {
        id: 'c4',
        startTime: 11.6,
        endTime: 15.0,
        text: 'Com a automação 24h, seu lead é atendido em 3 segundos!',
        highlightWord: '3 SEGUNDOS',
        emoji: '⚡',
        effect: 'bounce'
      },
      {
        id: 'c5',
        startTime: 15.1,
        endTime: 18.0,
        text: 'Comente "AUTOMACAO" ou clique no link da bio! 👉',
        highlightWord: 'CLIQUE NO LINK',
        emoji: '🚀',
        effect: 'flash'
      }
    ]
  },
  {
    id: 'pitch-website',
    title: 'Vídeo Institucional / Pitch de Vendas',
    category: 'Landing Page & Site',
    format: '16:9',
    duration: 15,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41551-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80',
    description: 'Estrutura institucional para apresentação no topo de sites e landing pages com foco em autoridade e velocidade.',
    hook: '⚡ Seu site carrega em menos de 1 segundo?',
    soundtrack: 'Corporate Tech Ambient',
    captions: [
      {
        id: 'p1',
        startTime: 0,
        endTime: 3.5,
        text: 'SEU SITE CARREGA EM MENOS DE 1 SEGUNDO?',
        highlightWord: '1 SEGUNDO',
        emoji: '⚡',
        effect: 'zoom'
      },
      {
        id: 'p2',
        startTime: 3.6,
        endTime: 8.0,
        text: 'Sites lentos perdem mais de 40% das vendas no tráfego pago.',
        highlightWord: '40% DAS VENDAS',
        emoji: '📉',
        effect: 'none'
      },
      {
        id: 'p3',
        startTime: 8.1,
        endTime: 12.0,
        text: 'Nós desenvolvemos páginas modernas, leves e 100% responsivas.',
        highlightWord: 'MODERNAS E LEVES',
        emoji: '💎',
        effect: 'bounce'
      },
      {
        id: 'p4',
        startTime: 12.1,
        endTime: 15.0,
        text: 'Solicite seu orçamento com o Luciano agora mesmo!',
        highlightWord: 'SOLICITE AGORA',
        emoji: '🔥',
        effect: 'flash'
      }
    ]
  },
  {
    id: 'podcast-cortes',
    title: 'Corte Viral de Podcast / Entrevista',
    category: 'Cortes & Entrevistas',
    format: '9:16',
    duration: 16,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-podcaster-speaking-into-microphone-in-studio-41130-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    description: 'Enquadramento automático no interlocutor, remoção de pausas e legendas dinâmicas estilo Karaokê.',
    hook: '🎙️ O segredo que nenhuma agência tradicional te conta...',
    soundtrack: 'Deep Bass Viral Beat',
    captions: [
      {
        id: 'pod1',
        startTime: 0,
        endTime: 4.0,
        text: 'O SEGREDO QUE NENHUMA AGÊNCIA TE CONTA...',
        highlightWord: 'SEGREDO',
        emoji: '🤫',
        effect: 'zoom'
      },
      {
        id: 'pod2',
        startTime: 4.1,
        endTime: 8.5,
        text: 'Não adianta gastar rios de dinheiro em anúncios se o seu funil vaza.',
        highlightWord: 'FUNIL VAZA',
        emoji: '⚠️',
        effect: 'shake'
      },
      {
        id: 'pod3',
        startTime: 8.6,
        endTime: 12.5,
        text: 'Você precisa de uma página de alta conversão + bot inteligente.',
        highlightWord: 'ALTA CONVERSÃO',
        emoji: '🎯',
        effect: 'bounce'
      },
      {
        id: 'pod4',
        startTime: 12.6,
        endTime: 16.0,
        text: 'É isso que gera previsibilidade de faturamento todos os dias!',
        highlightWord: 'FATURAMENTO',
        emoji: '💰',
        effect: 'flash'
      }
    ]
  }
];

export const musicTracks = [
  { id: 'lofi-upbeat', name: 'Tech Upbeat Lofi Vibe', bpm: 110, mood: 'Moderno & Energético' },
  { id: 'viral-phonk', name: 'Deep Bass Viral Beat', bpm: 128, mood: 'Hipnótico & Retenção' },
  { id: 'corporate-ambient', name: 'Corporate Tech Ambient', bpm: 95, mood: 'Elegante & Confiável' },
  { id: 'cinematic-hype', name: 'Cinematic Future Bass', bpm: 130, mood: 'Impactante & Vendas' }
];

export const captionStylePresets = [
  {
    id: 'hormozi',
    name: 'Alex Hormozi (Viral)',
    desc: 'Texto em caixa alta com destaque em Amarelo / Verde limão e fundo translúcido escuro.',
    textColor: '#ffffff',
    highlightColor: '#facc15', // yellow-400
    bgColor: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'font-extrabold uppercase font-sans tracking-tight',
    border: 'border-2 border-yellow-400/40'
  },
  {
    id: 'neon',
    name: 'Cyber Neon Cyan',
    desc: 'Brilho neon ciano e esmeralda com sombra brilhante para tecnologia e IA.',
    textColor: '#e0f2fe',
    highlightColor: '#22d3ee', // cyan-400
    bgColor: 'rgba(15, 23, 42, 0.9)',
    fontFamily: 'font-extrabold font-mono tracking-wider',
    border: 'border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
  },
  {
    id: 'pop',
    name: 'TikTok Pop & Emojis',
    desc: 'Fonte arredondada com emojis contextuais grandes e animação bounce ao falar.',
    textColor: '#ffffff',
    highlightColor: '#34d399', // emerald-400
    bgColor: 'rgba(18, 20, 20, 0.92)',
    fontFamily: 'font-black uppercase tracking-normal',
    border: 'border-2 border-emerald-400/50'
  },
  {
    id: 'minimal',
    name: 'Clean Minimalist',
    desc: 'Legendas sutis e elegantes com barra inferior translúcida e contraste refinado.',
    textColor: '#f8fafc',
    highlightColor: '#38bdf8',
    bgColor: 'rgba(0, 0, 0, 0.65)',
    fontFamily: 'font-semibold tracking-wide',
    border: 'border border-white/20'
  }
];
