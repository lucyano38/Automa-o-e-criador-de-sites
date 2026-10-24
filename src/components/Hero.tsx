import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { AnimatedTechBackground } from './AnimatedTechBackground';
import { TechGlobeCanvas } from './TechGlobeCanvas';

interface HeroProps {
  onOpenWhatsApp: () => void;
  onStartNow?: () => void;
  onLogin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenWhatsApp, 
  onStartNow,
  onLogin 
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#0a0c0e]"
    >
      
      {/* Dynamic Ambient Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-950/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[100px]" />
      </div>

      <AnimatedTechBackground 
        defaultMode="hybrid" 
        opacity={0.6} 
        showControls={false} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center text-center space-y-10"
        >
          
          <div className="max-w-4xl w-full space-y-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/50 backdrop-blur-md border border-cyan-500/50 text-cyan-200 text-sm font-mono font-semibold shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>FOCO EM DADOS · INTELIGÊNCIA & PROSPECÇÃO 24H</span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] font-sans drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              Escale seu faturamento no piloto automático: a automação inteligente que dispensa processos manuais.
            </h1>

            <p className="text-slate-400 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
              Plataforma de inteligência analítica que organiza seu CRM e automatiza sua prospecção.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={onStartNow || onLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-extrabold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 cursor-pointer uppercase tracking-wider"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full font-bold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer uppercase tracking-wider backdrop-blur-sm"
              >
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Falar no WhatsApp</span>
              </button>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mt-12"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700" />
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-[#121517]/80 p-6 lg:p-8 backdrop-blur-lg">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                   <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                     <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">Dashboard Executivo</span>
                   </div>
                   <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">Sistema Online 24/7</span>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                   {[
                     { label: 'Leads Mapeados', value: '12.845', color: 'text-cyan-400' },
                     { label: 'Oportunidades', value: '8.420', color: 'text-emerald-400' },
                     { label: 'Faturamento', value: '24h/7d', color: 'text-blue-400' }
                   ].map(stat => (
                     <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">{stat.label}</div>
                        <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
