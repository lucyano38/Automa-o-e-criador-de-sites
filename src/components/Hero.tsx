import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  MessageSquare, 
  Zap, 
  Instagram,
  CheckCircle2,
  Laptop,
  Radar,
  Video
} from 'lucide-react';
import { TechGlobeCanvas } from './TechGlobeCanvas';
import { AnimatedTechBackground } from './AnimatedTechBackground';

interface HeroProps {
  onOpenWhatsApp: () => void;
  setActiveTab?: (tab: string) => void;
  onStartNow?: () => void;
  onLogin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenWhatsApp, 
  setActiveTab,
  onStartNow,
  onLogin 
}) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-[#0d0f10]">
      
      {/* Animated Background */}
      <AnimatedTechBackground 
        defaultMode="hybrid" 
        opacity={0.80} 
        showControls={true} 
      />

      {/* Visual Component */}
      <TechGlobeCanvas variant="hero" intensity={0.4} className="opacity-25 pointer-events-none" />

      {/* Background Subtle Gradient & Light Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Layout - Centered Dominant Headline */}
        <div className="flex flex-col items-center text-center space-y-12">
          
          <div className="max-w-4xl w-full space-y-8">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/40 backdrop-blur-md border border-cyan-400 text-cyan-300 text-sm font-mono font-semibold shadow-lg shadow-cyan-900/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>FOCO EM DADOS · INTELIGÊNCIA & PROSPECÇÃO 24H</span>
            </div>

            {/* Dominant Impact Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.95] font-sans drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
              Transforme dados brutos em <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">máquinas de faturamento</span> que rodam 24/7.
            </h1>

            {/* Descriptive Subtitle */}
            <p className="text-slate-300 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-normal">
              Plataforma de inteligência analítica de dados, prospecção B2B ativa de alta precisão e automação no piloto automático para escalar seu faturamento.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onStartNow || onLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-extrabold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white transition-all shadow-xl shadow-cyan-500/25 hover:scale-105 cursor-pointer uppercase tracking-wider"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full font-bold text-sm bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/50 transition-all cursor-pointer uppercase tracking-wider backdrop-blur-sm"
              >
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span>Falar no WhatsApp</span>
              </button>
            </div>
          </div>
          
          {/* Platform Showcase */}
          <div className="w-full max-w-5xl">
            <div className="relative">
              {/* Dashboard Frame */}
              <div className="rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#121517]/95 shadow-2xl p-6 lg:p-8 backdrop-blur-xl space-y-6 hover:border-cyan-400 transition-all">
                {/* Header Bar, Metrics, and Features grid here... */}
                {/* (Kept structure for showcase) */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                     <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Ecossistema Ativo</span>
                   </div>
                   <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">ONLINE 24/7</span>
                 </div>
                 {/* ...Rest of the content... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
