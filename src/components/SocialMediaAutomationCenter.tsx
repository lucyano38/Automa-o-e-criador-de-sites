import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Facebook, 
  Calendar, 
  Sparkles, 
  Clock, 
  Send, 
  CheckCircle2, 
  Bot, 
  Image as ImageIcon, 
  Layers, 
  Hash, 
  Plus, 
  Trash2, 
  Eye, 
  Check, 
  Share2, 
  MessageSquare, 
  Zap, 
  Heart, 
  Bookmark, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Sliders,
  Globe
} from 'lucide-react';
import { SocialPost } from '../types';

interface SocialMediaAutomationCenterProps {
  onOpenWhatsAppWithMessage?: (msg: string) => void;
}

const DEFAULT_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    title: 'Por que sites lentos perdem até 40% dos clientes',
    caption: 'Se o seu site demora mais de 3 segundos para carregar no celular, você está literalmente entregando clientes para a concorrência.\n\nNa Foco Completo, desenvolvemos websites com tempo de carregamento inferior a 1 segundo e nota 98+ no Google PageSpeed.\n\nComente "SITE" abaixo para receber uma análise gratuita da velocidade do seu negócio!',
    platform: 'both',
    format: 'feed',
    scheduledDate: '2026-10-22',
    scheduledTime: '18:30',
    status: 'agendado',
    bannerHeadline: 'SEU SITE DEMORA MAIS DE 3 SEGUNDOS PARA ABRIR?',
    bannerSubtext: 'Descubra como o carregamento ultrarrápido dobra suas vendas',
    bannerTheme: 'cyan',
    hashtags: ['#desenvolvimentoweb', '#sitesprofissionais', '#marketingdigital', '#itupeva', '#jundiai', '#fococompleto'],
    autoDmTrigger: {
      enabled: true,
      keyword: 'SITE',
      autoReplyText: 'Olá! Vi que você comentou no post. Segue o link para conversar direto com o Luciano e fazer o diagnóstico do seu site: https://wa.me/5511994411307'
    },
    metrics: {
      likes: 142,
      comments: 38,
      reach: 2850,
      dmsTriggered: 35
    }
  },
  {
    id: 'post-2',
    title: 'Robô no WhatsApp: Atendimento 24h sem perder vendas à noite',
    caption: 'Quantos clientes você perde porque mandam mensagem às 21h ou no domingo e ninguém responde?\n\nCom a automação da Foco Completo, seu WhatsApp responde dúvidas, apresenta portfólio e envia link de orçamento instantaneamente, 24 horas por dia.\n\nDigite "ROBO" para ver uma demonstração ao vivo na sua DM!',
    platform: 'instagram',
    format: 'carousel',
    scheduledDate: '2026-10-24',
    scheduledTime: '12:00',
    status: 'agendado',
    bannerHeadline: 'PARE DE PERDER VENDAS FORA DO HORÁRIO COMERCIAL',
    bannerSubtext: 'Atendimento inteligente 24h por dia no WhatsApp e Telegram',
    bannerTheme: 'emerald',
    hashtags: ['#automacaowhatsapp', '#chatbots', '#vendasautomaticas', '#atendimento24h'],
    autoDmTrigger: {
      enabled: true,
      keyword: 'ROBO',
      autoReplyText: 'Olá! Veja o robô em ação. Toque aqui para testar nosso atendimento automatizado no WhatsApp: https://wa.me/5511994411307'
    },
    metrics: {
      likes: 89,
      comments: 24,
      reach: 1940,
      dmsTriggered: 22
    }
  },
  {
    id: 'post-3',
    title: 'Superação & Tecnologia: A história do titular Luciano Tavares',
    caption: 'Mesmo após o diagnóstico de tetraplegia, a paixão por linhas de código e desenvolvimento de software falou mais alto.\n\nHoje, através da Foco Completo e dos portais focoemdados.com.br e soscuidadores.com, ajudamos empresas a conquistarem uma presença digital sólida, moderna e lucrativa.\n\nObrigado a cada parceiro e cliente pela confiança!',
    platform: 'both',
    format: 'feed',
    scheduledDate: '2026-10-18',
    scheduledTime: '19:00',
    status: 'publicado',
    bannerHeadline: 'TECNOLOGIA, SUPERAÇÃO E FOCO EM RESULTADOS',
    bannerSubtext: 'Luciano Tavares Silva · Titular & Desenvolvedor de Software',
    bannerTheme: 'amber',
    hashtags: ['#superacao', '#desenvolvedor', '#fococompleto', '#inclusao', '#tecnologia'],
    metrics: {
      likes: 412,
      comments: 76,
      reach: 5200,
      dmsTriggered: 18
    }
  }
];

export const SocialMediaAutomationCenter: React.FC<SocialMediaAutomationCenterProps> = ({
  onOpenWhatsAppWithMessage
}) => {
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    try {
      const saved = localStorage.getItem('foco_social_posts_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_POSTS;
  });

  const [activeTab, setActiveTab] = useState<'criador' | 'fila' | 'gatilhos' | 'preview'>('criador');
  const [previewPlatform, setPreviewPlatform] = useState<'instagram' | 'facebook'>('instagram');

  // Form State
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [platform, setPlatform] = useState<'instagram' | 'facebook' | 'both'>('both');
  const [format, setFormat] = useState<'feed' | 'carousel' | 'reels' | 'story'>('feed');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [scheduledTime, setScheduledTime] = useState('18:30');
  const [bannerHeadline, setBannerHeadline] = useState('');
  const [bannerSubtext, setBannerSubtext] = useState('');
  const [bannerTheme, setBannerTheme] = useState<'cyan' | 'emerald' | 'purple' | 'amber' | 'dark'>('cyan');
  const [hashtagsText, setHashtagsText] = useState('#fococompleto #marketingdigital #desenvolvimentoweb #sitesprofissionais');
  const [autoDmEnabled, setAutoDmEnabled] = useState(true);
  const [dmKeyword, setDmKeyword] = useState('EU QUERO');
  const [dmReplyText, setDmReplyText] = useState('Olá! Que bom ter seu contato. Segue o link para falar diretamente comigo no WhatsApp: https://wa.me/5511994411307');
  
  // Feedback alerts
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('foco_social_posts_v1', JSON.stringify(posts));
  }, [posts]);

  // AI Copywriter Simulation for Instagram & Facebook
  const handleGenerateAiCopy = () => {
    const topics = [
      {
        theme: 'Presença Digital & Sites Rápidos',
        headline: 'SUA EMPRESA AINDA DEPENDE SÓ DO INSTAGRAM?',
        subtext: 'Ter um site próprio é a diferença entre um negócio amador e uma autoridade.',
        caption: 'O Instagram é um terreno alugado. Se a rede cair amanhã, onde seus clientes encontram sua empresa?\n\nCom um site profissional da Foco Completo, você tem controle total das suas vendas, aparece no topo do Google quando pesquisarem seu serviço na sua cidade e transmite 100% de credibilidade.\n\nComente "SITE" ou mande uma mensagem para receber um plano personalizado!',
        tags: '#desenvolvimentoweb #sitesprofissionais #fococompleto #itupeva #marketingdigital'
      },
      {
        theme: 'Automação de WhatsApp 24h',
        headline: 'QUANTO VALE NÃO PERDER NENHUM CLIENTE DEPOIS DAS 18H?',
        subtext: 'Atendimento instantâneo no piloto automático sem pagar mensalidades absurdas.',
        caption: 'Você sabia que 72% dos clientes compram do primeiro que responde?\n\nQuando um cliente te chama no WhatsApp às 20h e espera até o dia seguinte, ele já fechou com o concorrente.\n\nNossos robôs de atendimento no WhatsApp respondem na hora, qualificam a necessidade e entregam o contato pronto para fechar.\n\nComente "AUTOMACAO" para testar agora mesmo na sua DM!',
        tags: '#automacao #whatsapp #chatbots #vendas24h #fococompleto'
      },
      {
        theme: 'Gestão Profissional de Mídias',
        headline: 'CHEGA DE POSTAR SEM ESTRATÉGIA E SEM RESULTADO',
        subtext: 'Artes profissionais, legendas que convertem e postagens automatizadas.',
        caption: 'Publicar por publicar só cansa sua equipe e não traz faturamento.\n\nNo serviço de Gestão de Instagram e Facebook da Foco Completo, cuidamos de todo o processo:\n✅ Artes e carrosséis com design marcante\n✅ Copywriting focado em conversão e engajamento\n✅ Postagens agendadas automaticamente\n✅ Robô na DM para responder quem comenta nos posts\n\nComente "CRESCER" e vamos estruturar as redes da sua empresa!',
        tags: '#redessociais #gestaodeinstagram #facebookads #designgrafico #fococompleto'
      }
    ];

    const pick = topics[Math.floor(Math.random() * topics.length)];
    setTitle(pick.theme);
    setBannerHeadline(pick.headline);
    setBannerSubtext(pick.subtext);
    setCaption(pick.caption);
    setHashtagsText(pick.tags);
    setAlertMessage('✨ Conteúdo e copy estratégica gerados com sucesso!');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleSavePost = (publishNow = false) => {
    if (!title && !bannerHeadline) {
      setAlertMessage('Por favor preencha ao menos o título ou o texto do banner.');
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      title: title || bannerHeadline || 'Nova Postagem Automatizada',
      caption: caption || 'Confira as novidades da Foco Completo!',
      platform,
      format,
      scheduledDate,
      scheduledTime,
      status: publishNow ? 'publicado' : 'agendado',
      bannerHeadline: bannerHeadline || title,
      bannerSubtext: bannerSubtext || 'Foco Completo · Luciano Tavares Silva',
      bannerTheme,
      hashtags: hashtagsText.split(' ').filter(t => t.startsWith('#')),
      autoDmTrigger: autoDmEnabled ? {
        enabled: true,
        keyword: dmKeyword,
        autoReplyText: dmReplyText
      } : undefined,
      metrics: publishNow ? {
        likes: 12,
        comments: 3,
        reach: 240,
        dmsTriggered: 2
      } : undefined
    };

    setPosts([newPost, ...posts]);
    setAlertMessage(publishNow ? '🚀 Postagem publicada no Instagram & Facebook com sucesso!' : '📅 Postagem agendada no sistema automatizado!');
    setTimeout(() => setAlertMessage(null), 3500);

    // Reset Form
    setTitle('');
    setCaption('');
    setBannerHeadline('');
    setBannerSubtext('');
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    setAlertMessage('🗑️ Postagem removida da fila.');
    setTimeout(() => setAlertMessage(null), 2500);
  };

  const handlePublishImmediate = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: 'publicado' } : p));
    setAlertMessage('⚡ Post disparado para Instagram & Facebook com status PUBLICADO!');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const getThemeGradient = (t?: string) => {
    switch (t) {
      case 'cyan': return 'from-cyan-900 via-[#0c1e28] to-[#071319] border-cyan-500/40 text-cyan-300';
      case 'emerald': return 'from-emerald-900 via-[#0d231b] to-[#071711] border-emerald-500/40 text-emerald-300';
      case 'purple': return 'from-purple-900 via-[#1f102e] to-[#0f0717] border-purple-500/40 text-purple-300';
      case 'amber': return 'from-amber-950 via-[#271a08] to-[#140d04] border-amber-500/40 text-amber-300';
      default: return 'from-slate-900 via-[#14171a] to-[#0b0d0e] border-slate-700 text-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Status Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-[#121619] via-[#151a1d] to-[#121619] border border-cyan-500/30 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>SISTEMA AUTOMATIZADO DE POSTAGEM · META GRAPH ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Central de Postagem Instagram & Facebook
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Crie, gere copys de alta conversão com IA, agende postagens simultâneas e ative robôs de resposta automática na DM para comentários nos seus posts.
            </p>
          </div>

          {/* Social Badges & Connections */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              <span>Instagram (@fococompleto): Ativo</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold flex items-center gap-2">
              <Facebook className="w-4 h-4" />
              <span>Facebook Pages: Conectado</span>
            </div>
          </div>
        </div>

        {/* Alert Notification Toast */}
        {alertMessage && (
          <div className="mt-4 p-3 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{alertMessage}</span>
          </div>
        )}
      </div>

      {/* Nav Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('criador')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'criador'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Novo Post & Agendador</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'preview'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Visualizador em Tempo Real (Feed Mockup)</span>
        </button>

        <button
          onClick={() => setActiveTab('fila')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'fila'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Fila de Postagens ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gatilhos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'gatilhos'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Automação de Respostas na DM</span>
        </button>
      </div>

      {/* TAB 1: CRIADOR & AGENDADOR */}
      {activeTab === 'criador' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#121517] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Configurar Postagem Automatizada</span>
              </h3>

              <button
                type="button"
                onClick={handleGenerateAiCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Gerar Copy com IA</span>
              </button>
            </div>

            {/* Target Platform & Format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Plataformas de Envio:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlatform('instagram')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      platform === 'instagram' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlatform('facebook')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      platform === 'facebook' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlatform('both')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      platform === 'both' ? 'bg-gradient-to-r from-pink-500/20 to-blue-500/20 border-cyan-400 text-white' : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                  >
                    <Share2 className="w-4 h-4 text-cyan-400" />
                    <span>Ambos</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Formato da Publicação:</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['feed', 'carousel', 'reels', 'story'] as const).map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className={`p-2 rounded-xl border text-[11px] font-bold uppercase transition-all cursor-pointer text-center ${
                        format === fmt ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold' : 'bg-slate-900 border-white/10 text-slate-400'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Banner Theme & Visual Card Options */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Card Visual / Banner Automático</span>
                </span>
                
                <div className="flex items-center gap-1.5">
                  {(['cyan', 'emerald', 'purple', 'amber', 'dark'] as const).map(th => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setBannerTheme(th)}
                      className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                        th === 'cyan' ? 'bg-cyan-400' :
                        th === 'emerald' ? 'bg-emerald-400' :
                        th === 'purple' ? 'bg-purple-400' :
                        th === 'amber' ? 'bg-amber-400' : 'bg-slate-800'
                      } ${bannerTheme === th ? 'scale-125 border-white ring-2 ring-white/50' : 'border-transparent'}`}
                      title={`Tema ${th}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Headline Principal do Card (Grande Impacto):</label>
                <input
                  type="text"
                  value={bannerHeadline}
                  onChange={(e) => setBannerHeadline(e.target.value)}
                  placeholder="Ex: SEU SITE DEMORA MAIS DE 3 SEGUNDOS PARA ABRIR?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Subtexto Explicativo / Proposta:</label>
                <input
                  type="text"
                  value={bannerSubtext}
                  onChange={(e) => setBannerSubtext(e.target.value)}
                  placeholder="Ex: Descubra como a velocidade extrema no Google dobra suas vendas."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Caption / Copywriting Area */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-400">
                Texto da Legenda / Copywriting:
              </label>
              <textarea
                rows={5}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Escreva a legenda magnética do post com gancho, história e chamada para ação..."
                className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans leading-relaxed"
              />
            </div>

            {/* Hashtags Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hashtags Estratégicas (Separadas por espaço):</span>
              </label>
              <input
                type="text"
                value={hashtagsText}
                onChange={(e) => setHashtagsText(e.target.value)}
                placeholder="#fococompleto #marketingdigital #itupeva"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Auto-DM Trigger Config */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>Robô de Resposta Automática na DM</span>
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoDmEnabled}
                    onChange={(e) => setAutoDmEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {autoDmEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Palavra-Chave no Comentário:</label>
                    <input
                      type="text"
                      value={dmKeyword}
                      onChange={(e) => setDmKeyword(e.target.value)}
                      placeholder="Ex: EU QUERO ou SITE"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-amber-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Resposta Instantânea na DM:</label>
                    <input
                      type="text"
                      value={dmReplyText}
                      onChange={(e) => setDmReplyText(e.target.value)}
                      placeholder="Mensagem com link do WhatsApp..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Date & Time Scheduling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Data de Publicação:</span>
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Horário Estratégico:</span>
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => handleSavePost(false)}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Postagem Automática</span>
              </button>

              <button
                type="button"
                onClick={() => handleSavePost(true)}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publicar Agora (Disparo Meta API)</span>
              </button>
            </div>

          </div>

          {/* Right Live Card Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>PREVIEW EM TEMPO REAL:</span>
              <span className="text-cyan-400 font-bold uppercase">{format} · {platform}</span>
            </div>

            {/* Generated Card Mockup */}
            <div className={`rounded-2xl p-6 sm:p-8 border bg-gradient-to-br shadow-2xl flex flex-col justify-between aspect-square relative overflow-hidden ${getThemeGradient(bannerTheme)}`}>
              
              {/* Corner Watermark */}
              <div className="flex items-center justify-between text-xs font-mono font-bold opacity-80">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center font-extrabold text-white text-[10px]">
                    ⚡
                  </div>
                  <span>FOCO COMPLETO</span>
                </div>
                <span className="text-[10px] tracking-wider uppercase">AGÊNCIA & AUTOMAÇÃO</span>
              </div>

              {/* Central Copy Headline */}
              <div className="space-y-4 my-auto py-4">
                <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-md">
                  {bannerHeadline || 'SEU SITE DEMORA MAIS DE 3 SEGUNDOS PARA ABRIR?'}
                </h4>
                <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-90 max-w-sm">
                  {bannerSubtext || 'Descubra como o carregamento ultrarrápido dobra suas vendas e gera clientes automáticos.'}
                </p>
              </div>

              {/* Bottom Footer Callout */}
              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] font-mono">
                <div>
                  <span className="font-bold text-white">Luciano Tavares Silva</span>
                  <div className="text-[10px] opacity-75">fococompleto.com.br</div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-white/20 font-bold text-white text-[10px] uppercase">
                  DESLIZE PARA LER 👉
                </div>
              </div>

            </div>

            {/* Caption Live Preview Snippet */}
            <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Legenda que será postada:</span>
              </div>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line text-[11px]">
                {caption || 'Aguardando preenchimento da legenda...'}
              </p>
              <div className="text-cyan-400 font-mono text-[10px]">
                {hashtagsText}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: LIVE FEED PREVIEW (MOCKUP INSTAGRAM / FACEBOOK) */}
      {activeTab === 'preview' && (
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPreviewPlatform('instagram')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                previewPlatform === 'instagram' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-slate-900 text-slate-400'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>Mockup Instagram Feed</span>
            </button>

            <button
              onClick={() => setPreviewPlatform('facebook')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                previewPlatform === 'facebook' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-slate-400'
              }`}
            >
              <Facebook className="w-4 h-4" />
              <span>Mockup Facebook Feed</span>
            </button>
          </div>

          {previewPlatform === 'instagram' ? (
            /* Instagram Post Card */
            <div className="rounded-2xl bg-black border border-white/15 overflow-hidden shadow-2xl text-white">
              
              {/* Instagram Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-amber-400 text-xs">
                      ⚡
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>fococompleto.com.br</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                    </div>
                    <div className="text-[10px] text-slate-400">Itupeva, São Paulo · Patrocinado</div>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </div>

              {/* Post Visual Graphic */}
              <div className={`p-8 aspect-square flex flex-col justify-between bg-gradient-to-br ${getThemeGradient(bannerTheme)}`}>
                <div className="text-xs font-mono font-bold text-white/80 uppercase">FOCO COMPLETO</div>
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase">
                    {bannerHeadline || 'SEU SITE DEMORA MAIS DE 3 SEGUNDOS PARA ABRIR?'}
                  </h3>
                  <p className="text-xs text-white/90">
                    {bannerSubtext || 'Descubra como o carregamento ultrarrápido dobra suas vendas.'}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-white/80">Luciano Tavares Silva · Dev</div>
              </div>

              {/* Instagram Actions Bar */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <MessageSquare className="w-5 h-5 text-slate-300" />
                    <Send className="w-5 h-5 text-slate-300" />
                  </div>
                  <Bookmark className="w-5 h-5 text-slate-300" />
                </div>

                <div className="text-xs font-bold">142 curtidas</div>

                <div className="text-xs leading-relaxed space-y-1">
                  <span className="font-bold mr-2">fococompleto.com.br</span>
                  <span className="text-slate-200 whitespace-pre-line text-xs">
                    {caption || 'Texto explicativo do post com gancho de retenção e chamada para ação no WhatsApp.'}
                  </span>
                </div>

                <div className="text-[11px] text-cyan-400 font-mono pt-1">
                  {hashtagsText}
                </div>

                <div className="text-[10px] text-slate-500 uppercase tracking-wider pt-1">
                  Publicação Automatizada · Meta Graph API
                </div>
              </div>

            </div>
          ) : (
            /* Facebook Post Card */
            <div className="rounded-2xl bg-[#18191a] border border-white/10 overflow-hidden shadow-2xl text-white">
              
              {/* Facebook Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-base">
                    ⚡
                  </div>
                  <div>
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      <span>Foco Completo - Luciano Tavares Silva</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>Hoje às {scheduledTime}</span>
                      <span>·</span>
                      <Globe className="w-3 h-3 inline" />
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </div>

              {/* Text Body */}
              <div className="p-4 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {caption || 'O grande segredo de vendas automáticas na internet começa na velocidade e autoridade da sua marca.'}
              </div>

              {/* Visual Banner */}
              <div className={`p-8 aspect-[16/9] flex flex-col justify-between bg-gradient-to-br ${getThemeGradient(bannerTheme)}`}>
                <div className="text-xs font-mono font-bold text-white/80 uppercase">FOCO COMPLETO</div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase">
                  {bannerHeadline || 'SEU SITE DEMORA MAIS DE 3 SEGUNDOS PARA ABRIR?'}
                </h3>
                <div className="text-[11px] font-mono text-white/80">fococompleto.com.br</div>
              </div>

              {/* FB Reactions */}
              <div className="p-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <span>👍 ❤️ 84 curtidas</span>
                </div>
                <div>24 comentários · 12 compartilhamentos</div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 3: FILA DE POSTAGENS */}
      {activeTab === 'fila' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Histórico & Postagens Agendadas ({posts.length})
            </h3>
            <button
              onClick={() => setActiveTab('criador')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Criar Novo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(p => (
              <div 
                key={p.id}
                className="rounded-2xl bg-[#121517] border border-white/10 p-5 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Status & Platform Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      p.status === 'publicado' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {p.status}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      {p.platform === 'both' ? (
                        <>
                          <Instagram className="w-3.5 h-3.5 text-pink-400" />
                          <Facebook className="w-3.5 h-3.5 text-blue-400" />
                        </>
                      ) : p.platform === 'instagram' ? (
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      ) : (
                        <Facebook className="w-3.5 h-3.5 text-blue-400" />
                      )}
                      <span className="font-mono text-[11px] uppercase">{p.format}</span>
                    </div>
                  </div>

                  {/* Title / Headline */}
                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    {p.bannerHeadline || p.title}
                  </h4>

                  {/* Caption preview */}
                  <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                    {p.caption}
                  </p>

                  {/* Date & Time */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-[11px] text-slate-300 font-mono flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{p.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{p.scheduledTime}</span>
                    </div>
                  </div>

                  {/* Metrics if published */}
                  {p.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px] font-mono">
                      <div className="p-1.5 rounded-lg bg-white/5">
                        <div className="text-slate-400">Likes</div>
                        <div className="font-bold text-white">{p.metrics.likes}</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white/5">
                        <div className="text-slate-400">Comentários</div>
                        <div className="font-bold text-white">{p.metrics.comments}</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-emerald-400">DMs Enviadas</div>
                        <div className="font-bold text-emerald-300">{p.metrics.dmsTriggered}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  {p.status !== 'publicado' && (
                    <button
                      onClick={() => handlePublishImmediate(p.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1 cursor-pointer"
                      title="Disparar publicação agora"
                    >
                      <Send className="w-3 h-3" />
                      <span>Disparar Já</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDeletePost(p.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer ml-auto"
                    title="Excluir postagem"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUTOMAÇÃO DE GATILHOS NA DM */}
      {activeTab === 'gatilhos' && (
        <div className="bg-[#121517] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>GATILHOS INSTANTÂNEOS DE DIRECT (INSTAGRAM & FACEBOOK)</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Automação de Respostas e Captura de Leads nas Redes
            </h3>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Toda vez que alguém comenta uma das palavras-chave nos seus posts, o sistema envia instantaneamente uma mensagem privada na DM da pessoa contendo o link do WhatsApp com mensagem pronta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                  Gatilho "SITE"
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">ATIVO 24H</span>
              </div>
              <p className="text-xs text-slate-300">
                Responde quem comenta pedindo orçamento de websites e landing pages.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-[11px] text-slate-400">
                💬 <strong>Resposta:</strong> "Olá! Vi seu interesse no post sobre sites rápidos. Fale com Luciano aqui: wa.me/5511994411307"
              </div>
              <div className="text-[10px] font-mono text-cyan-400">Total disparos: 74 leads</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                  Gatilho "ROBO"
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">ATIVO 24H</span>
              </div>
              <p className="text-xs text-slate-300">
                Responde quem quer testar bots de WhatsApp e Telegram sem mensalidades.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-[11px] text-slate-400">
                💬 <strong>Resposta:</strong> "Olá! Teste a automação ao vivo no nosso canal oficial: wa.me/5511994411307"
              </div>
              <div className="text-[10px] font-mono text-amber-400">Total disparos: 52 leads</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 text-xs font-mono font-bold">
                  Gatilho "EU QUERO"
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">ATIVO 24H</span>
              </div>
              <p className="text-xs text-slate-300">
                Gatilho universal para qualquer postagem promocional ou carrossel de vendas.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-[11px] text-slate-400">
                💬 <strong>Resposta:</strong> "Olá! Segue a apresentação completa das soluções Foco Completo: fococompleto.com.br"
              </div>
              <div className="text-[10px] font-mono text-pink-400">Total disparos: 89 leads</div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
