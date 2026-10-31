import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Zap, 
  Globe, 
  Bot, 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  Rocket 
} from 'lucide-react';
import { AnimatedTechBackground } from './AnimatedTechBackground';

interface HeroProps {
  onOpenWhatsApp: () => void;
  onStartNow?: () => void;
  onLogin?: () => void;
  setActiveTab?: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenWhatsApp, 
  onStartNow,
  onLogin,
  setActiveTab 
}) => {
  const handleScrollToServices = () => {
    if (setActiveTab) {
      setActiveTab('solucoes');
    }
    setTimeout(() => {
      const el = document.getElementById('servicos-precos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleScrollToPortfolio = () => {
    if (setActiveTab) {
      setActiveTab('solucoes');
    }
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative pt-6 sm:pt-10 lg:pt-12 pb-14 sm:pb-20 overflow-hidden bg-[#0a0c0e]"
    >
      
      {/* Ambient Glow Backdrops - Subtle & Performance Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-emerald-500/10 rounded-full blur-[90px]" />
      </div>

      <AnimatedTechBackground 
        defaultMode="hybrid" 
        opacity={0.35} 
        showControls={false} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          
          <div className="max-w-4xl w-full space-y-4 sm:space-y-5">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] sm:text-xs font-mono font-medium tracking-wide">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Criação de Sites de Alta Conversão & Automação WhatsApp 24h</span>
            </div>

            {/* Main Headline - Balanced & Legible across Mobile/Tablet */}
            <h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] font-sans drop-shadow-md"
              style={{ textWrap: 'balance' }}
            >
              Escale seu Faturamento com{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Sites de Alta Conversão
              </span>{' '}
              & Automação Inteligente de Vendas
            </h1>

            {/* Clear Value Proposition Subtitle */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
              Desenvolvemos páginas ultrarrápidas que transformam visitantes em clientes reais e instalamos robôs no WhatsApp que atendem, tiram dúvidas e qualificam oportunidades 24 horas por dia no piloto automático.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 sm:pt-4">
              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer uppercase tracking-wider shrink-0"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Solicitar Orçamento no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleScrollToServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all cursor-pointer font-mono shrink-0"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Ver Planos & Valores</span>
              </button>
            </div>
          </div>

          {/* TWO MAIN COMMERCIAL OFFERINGS (Clear Visual Understanding of What is Sold) */}
          <div className="w-full max-w-5xl mt-6 sm:mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Product 1: Criação & Venda de Sites */}
              <div className="rounded-2xl p-5 sm:p-6 bg-[#111416]/90 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between text-left shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Desenvolvimento Web
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      A partir de R$ 497
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                        Websites & Landing Pages
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Páginas profissionais desenhadas especificamente para gerar vendas e orçamentos, com carregamento em menos de 1 segundo e layout perfeito no celular.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-300 font-sans">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Carregamento instantâneo (&lt; 1s) para não perder clientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Botão WhatsApp integrado com mensagem personalizada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Design 100% responsivo para celular, tablet e computador</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
                  <span className="text-[10px] font-mono text-slate-400">Entrega rápida em até 7 dias</span>
                  <button
                    onClick={handleScrollToServices}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Ver Detalhes do Site</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Product 2: Automação & Atendimento WhatsApp 24h */}
              <div className="rounded-2xl p-5 sm:p-6 bg-[#111416]/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between text-left shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Automação Comercial
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      Sem Mensalidade Fixa
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                        Automação de Atendimento WhatsApp 24h
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Robô inteligente que responde clientes na hora, tira dúvidas, envia tabela de preços ou cardápio e agenda atendimentos no piloto automático.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-300 font-sans">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Respostas instantâneas em menos de 5 segundos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Envio automático de catálogos, tabelas e orçamentos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Transferência humanizada preservando histórico</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
                  <span className="text-[10px] font-mono text-slate-400">Implementação única sem surpresas</span>
                  <button
                    onClick={onOpenWhatsApp}
                    className="px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Testar no WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Combo Banner Teaser */}
            <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2.5">
                <span className="p-1 rounded-md bg-amber-400/20 text-amber-300 text-xs font-mono font-bold">
                  ★ COMBO
                </span>
                <span className="text-xs text-slate-200">
                  Quer os dois juntos? <strong>Site + Robô WhatsApp</strong> com valor especial de lançamento.
                </span>
              </div>
              <button
                onClick={handleScrollToServices}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-bold underline cursor-pointer whitespace-nowrap"
              >
                Conhecer o Combo Completo →
              </button>
            </div>

            {/* Quick Proof & Performance Strip - Clean and responsive on mobile/tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
              {[
                { label: 'Velocidade Média', value: '< 1s', detail: 'Carregamento instantâneo' },
                { label: 'Atendimento', value: '24/7', detail: 'Robô ativo no WhatsApp' },
                { label: 'Compatibilidade', value: '100%', detail: 'Celular, tablet e PC' },
                { label: 'Segurança', value: '7 Dias', detail: 'Garantia incondicional' }
              ].map((stat, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-lg sm:text-xl font-black text-white font-mono">{stat.value}</div>
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">{stat.label}</div>
                  <div className="text-[9px] text-slate-400 hidden sm:block mt-0.5">{stat.detail}</div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
