import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  MessageSquare, 
  Zap, 
  Instagram,
  CheckCircle2,
  Laptop
} from 'lucide-react';

interface HeroProps {
  onOpenWhatsApp: () => void;
  setActiveTab?: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhatsApp, setActiveTab }) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-[#0d0f10]">
      
      {/* Background Subtle Gradient & Light Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Hero Layout (Headline + Mockup) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Clean Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AGÊNCIA DIGITAL & AUTOMAÇÃO 24H</span>
            </div>

            {/* Impact Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.15] font-sans">
              CONSTRUA SUA PRESENÇA NO <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">MUNDO DIGITAL</span>
            </h1>

            {/* Descriptive Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              A apresentação da sua empresa na internet precisa ser impactante e trazer total credibilidade, oferecendo soluções completas de websites de alta performance, bots de atendimento automático 24h e design profissional.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Websites 100% Responsivos & Rápidos</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Automação de WhatsApp sem Mensalidade</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Design Exclusivo UX/UI para Conversão</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Suporte Direto com o Titular & Dev</span>
              </div>
            </div>

            {/* Clean White Pill CTA Button (Like MK3Digital Screenshot) */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-extrabold text-sm bg-white text-slate-950 hover:bg-cyan-300 transition-all shadow-xl hover:scale-105 cursor-pointer uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Fale Conosco no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#servicos-precos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-xs bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all cursor-pointer uppercase tracking-wider"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Ver Soluções & Valores</span>
              </a>
            </div>

            {/* Small Compact Owner Badge */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/80 bg-slate-950 shrink-0">
                <img 
                  src="/src/assets/images/luciano_wheelchair_superman_1786639407347.jpg" 
                  alt="Luciano Tavares Silva"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-white">Luciano Tavares Silva</div>
                <div className="text-slate-400 text-[11px]">Titular & Desenvolvedor de Software</div>
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
