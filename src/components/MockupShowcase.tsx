import React from 'react';
import { motion } from 'motion/react';
import { Monitor, Smartphone, Layout, Zap, Target } from 'lucide-react';

interface MockupShowcaseProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const MockupShowcase: React.FC<MockupShowcaseProps> = ({ onOpenWhatsAppWithMessage }) => {
  return (
    <section className="py-16 md:py-24 bg-[#0a0c0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Padrão de <span className="text-cyan-400">Excelência Digital</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Veja um exemplo concreto do que entregamos: sites de alta conversão, responsivos e otimizados para velocidade, prontos para converter visitantes em clientes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Mockup Display */}
          <div className="lg:col-span-7 relative">
            <div className="relative z-10 p-4 bg-[#121517] rounded-3xl border border-cyan-500/20 shadow-2xl">
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <img
                src="/src/assets/images/exemplo_landing_tech_1792676479800.jpg"
                alt="Exemplo de Site Profissional"
                referrerPolicy="no-referrer"
                className="rounded-xl w-full h-auto"
              />
            </div>
            {/* Mobile overlay decoration */}
            <div className="absolute -bottom-10 -right-10 w-48 h-64 bg-[#1e2528] rounded-2xl border-4 border-white/10 shadow-2xl z-0 hidden lg:block p-2">
              <div className="w-full h-full bg-[#0a0c0e] rounded-lg" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {[
                { icon: Layout, title: 'Design Responsivo', desc: 'Layout perfeito em desktops, tablets e celulares.' },
                { icon: Zap, title: 'Alta Performance', desc: 'Carregamento instantâneo para não perder leads.' },
                { icon: Target, title: 'Foco em Conversão', desc: 'CTAs estratégicos posicionados para gerar vendas.' }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 self-start">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feat.title}</h4>
                    <p className="text-sm text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenWhatsAppWithMessage('Olá! Gostei do exemplo de site profissional que vi no seu portfólio. Gostaria de saber como ter um projeto assim para o meu negócio.')}
              className="w-full py-4 rounded-xl font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <Monitor className="w-5 h-5" />
              Quero um site profissional para mim
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
