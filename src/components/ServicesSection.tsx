import React from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data/services';
import { Globe, MessageSquare, Workflow, Instagram, BarChart3, Check, ArrowRight, Sparkles, Code2, Search, Smartphone, Video } from 'lucide-react';

interface ServicesSectionProps {
  onOpenWhatsApp: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenWhatsApp }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Code2 className="w-8 h-8 text-cyan-300" />;
      case 'MessageSquare':
        return <MessageSquare className="w-8 h-8 text-emerald-300 fill-emerald-300/20" />;
      case 'Workflow':
        return <Workflow className="w-8 h-8 text-amber-300" />;
      case 'Instagram':
        return <Instagram className="w-8 h-8 text-pink-300" />;
      case 'Video':
        return <Video className="w-8 h-8 text-cyan-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-8 h-8 text-purple-300" />;
      default:
        return <Sparkles className="w-8 h-8 text-cyan-300" />;
    }
  };

  return (
    <section id="servicos" className="py-16 md:py-24 bg-[#0f1112] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOLUÇÕES & SERVIÇOS DIGITAIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            EXCELÊNCIA EM <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">CADA PROJETO</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Desenvolvimento técnico de alta performance e automações sob medida para impulsionar a credibilidade da sua empresa na internet.
          </p>
        </motion.div>

        {/* 2x2 Clean Agency Grid Layout (As seen in Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="rounded-3xl p-7 sm:p-8 flex flex-col justify-between bg-[#15181a] border border-white/10 hover:border-cyan-500/50 transition-all shadow-2xl group relative overflow-hidden"
            >
              {/* Top Subtle Lighting Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all"></div>

              <div className="space-y-6 relative z-10">
                
                {/* Header: Icon Box on Left + Content */}
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  
                  {/* Clean Gradient Rounded Square Icon Box (MK3Digital Style) */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-emerald-500 to-teal-600 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
                    <div className="w-full h-full bg-[#121414] rounded-[14px] flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      {service.subtitle}
                    </div>
                    {/* Bold Uppercase Heading */}
                    <h3 className="text-xl font-extrabold text-white tracking-tight uppercase group-hover:text-cyan-300 transition-colors font-sans">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Clean Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Grid */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Entregáveis inclusos:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom "Saiba mais →" Action Link (Like MK3Digital) */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-slate-400">
                  {service.popularFor}
                </span>

                <button
                  onClick={onOpenWhatsApp}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer group-hover:translate-x-1"
                >
                  <span className="uppercase tracking-wider">Saiba mais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

