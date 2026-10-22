import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, ArrowRight, Zap, Target } from 'lucide-react';

interface ShowcaseExamplesSectionProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const ShowcaseExamplesSection: React.FC<ShowcaseExamplesSectionProps> = ({ onOpenWhatsAppWithMessage }) => {
  const examples = [
    {
      title: 'Exemplo: Clínica de Saúde Avançada',
      description: 'Landing page focada em conversão para serviços de saúde, com destaque para agendamentos rápidos e credibilidade.',
      image: '/src/assets/images/exemplo_landing_servico_1792676479718.jpg',
      accent: 'emerald'
    },
    {
      title: 'Exemplo: Consultoria B2B Tech',
      description: 'Landing page focada em B2B para consultorias de transformação digital, com foco em dados e estratégias de crescimento.',
      image: '/src/assets/images/exemplo_landing_tech_1792676479800.jpg',
      accent: 'amber'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0d0f10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-sm mb-4">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Exemplos de Excelência Digital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Elevando o Padrão do seu{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Negócio Digital
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Não tem um site ainda? Veja o padrão de qualidade que entregamos. Transformamos ideias em máquinas de faturamento visualmente impactantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group rounded-3xl overflow-hidden border border-white/10 bg-[#121517] hover:border-cyan-500/50 transition-all shadow-2xl"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={example.image}
                  alt={example.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121517] via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">{example.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{example.description}</p>
                <button
                  onClick={() => onOpenWhatsAppWithMessage(`Olá! Gostei dos exemplos de site que vi no seu portfólio. Gostaria de um projeto com esse nível de qualidade para o meu negócio: ${example.title}`)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold bg-${example.accent}-500/10 text-${example.accent}-400 border border-${example.accent}-500/30 hover:bg-${example.accent}-500 hover:text-slate-950 transition-all`}
                >
                  <Target className="w-4 h-4" />
                  <span>Quero um projeto assim</span>
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
