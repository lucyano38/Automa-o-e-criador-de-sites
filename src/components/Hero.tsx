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
              Plataforma de inteligência analítica de dados, prospecção B2B ativa de alta precisão e automação no piloto automático desenvolvida por Luciano Tavares Silva para acelerar suas vendas.
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

            {/* Small Compact Owner Badge */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-amber-400 p-0.5 shadow-md shrink-0">
                <div className="w-full h-full bg-[#0d0f10] rounded-[10px] flex items-center justify-center text-cyan-400 font-black text-sm">
                  ⚡
                </div>
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-white">Luciano Tavares Silva</div>
                <div className="text-cyan-400/90 font-mono text-[11px]">Titular & Desenvolvedor de Software</div>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Laptop / Device Mockup Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Laptop Screen Frame */}
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#161819] shadow-2xl p-2 group hover:border-cyan-500/50 transition-all">
                {/* Browser Header Bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0a0b0c] rounded-t-xl border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <div className="ml-2 text-[10px] font-mono text-slate-400 truncate bg-white/5 px-3 py-0.5 rounded-full w-full max-w-[200px]">
                    fococompleto.com.br
                  </div>
                </div>

                {/* Main Preview Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl bg-slate-950">
                  <img 
                    src="/src/assets/images/luciano_laptop_hero.jpg" 
                    alt="Desenvolvimento de Websites Profissionais" 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f10] via-transparent to-transparent opacity-60"></div>
                  
                  {/* Floating Metric Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0f1112]/90 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-cyan-400 font-mono uppercase">Performance & Velocidade</div>
                      <div className="font-bold text-white">Pontuação 98+ no Google Lighthouse</div>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30">
                      100% OK
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Floating WhatsApp Badge */}
              <div className="absolute -bottom-5 -left-5 p-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-300/40 hidden sm:flex">
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">Automação 24h</div>
                  <div className="text-xs font-extrabold">Atendimento Instantâneo</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
