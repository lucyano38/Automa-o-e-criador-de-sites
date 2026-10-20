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
      
      {/* Animated Professional Background (Laptop SaaS Dashboard & Dissolving Globe) */}
      <AnimatedTechBackground 
        defaultMode="hybrid" 
        opacity={0.80} 
        showControls={true} 
      />

      {/* 3D Animated Dissolving Globe Particle Canvas */}
      <TechGlobeCanvas variant="hero" intensity={0.4} className="opacity-25 pointer-events-none" />

      {/* Background Subtle Gradient & Light Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Hero Layout (Headline + Mockup) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Clean Headline & Copy with High Legibility Backdrop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0c0e]/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold shadow-lg shadow-black/50">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>FOCO EM DADOS · INTELIGÊNCIA & PROSPECÇÃO 24H</span>
            </div>

            {/* Impact Headline as requested */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.12] font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Transforme dados brutos em <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">máquinas de faturamento</span> que rodam 24/7.
            </h1>

            {/* Descriptive Subtitle */}
            <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-[#0d0f10]/40 lg:bg-transparent backdrop-blur-[2px] p-2 rounded-xl lg:p-0">
              Plataforma de inteligência analítica de dados, prospecção B2B ativa de alta precisão e automação no piloto automático para acelerar o crescimento e o faturamento da sua empresa.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prospecção B2B no Raio Exato (15km)</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Postagens & Gestão Instagram e Facebook</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Websites Rápidos & CRM Integrado</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Upload de Planilhas com IA & Insights</span>
              </div>
            </div>

            {/* Action Buttons: Começar Agora & Entrar (Redirect to Auth Flow) + WhatsApp */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onStartNow || onLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-extrabold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-xl shadow-cyan-500/25 hover:scale-105 cursor-pointer uppercase tracking-wider"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Começar Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer uppercase tracking-wider backdrop-blur-sm shadow-md"
              >
                <span>Entrar na Plataforma</span>
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 transition-all cursor-pointer uppercase tracking-wider backdrop-blur-sm"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-300" />
                <span>Falar no WhatsApp</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean High-Tech Platform & Live Intelligence Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Clean Cyber Dashboard Frame */}
              <div className="rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#121517]/95 shadow-2xl p-6 backdrop-blur-xl space-y-5 hover:border-cyan-400 transition-all">
                
                {/* Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Ecossistema Ativo · Foco em Dados
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    ONLINE 24/7
                  </span>
                </div>

                {/* Live Core Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#090b0d] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Leads Mapeados</div>
                    <div className="text-xl font-extrabold text-cyan-400 font-sans">12.845</div>
                    <div className="text-[9px] text-slate-400 font-mono">Raio de 15km ativo</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#090b0d] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Sem Presença Web</div>
                    <div className="text-xl font-extrabold text-amber-400 font-sans">8.420</div>
                    <div className="text-[9px] text-amber-400 font-mono">Oportunidades em aberto</div>
                  </div>
                </div>

                {/* Interactive Feature List */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-300 font-medium">⚡ Resposta WhatsApp Bot</span>
                    <span className="text-emerald-400 font-mono font-bold">&lt; 3 segundos</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-300 font-medium">🌐 Carregamento dos Sites</span>
                    <span className="text-cyan-400 font-mono font-bold">&lt; 1 segundo</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-300 font-medium">💳 Pagamento Integrado</span>
                    <span className="text-purple-300 font-mono font-bold">Stripe 100% Seguro</span>
                  </div>
                </div>

                {/* Subtitle Guarantee */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Prospecção & Automação B2B</span>
                  <span className="text-cyan-400 font-bold">focoemdados.com.br</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
