import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Roberto Mendes',
      role: 'Diretor Clínico',
      company: 'Rede de Apoio à Saúde',
      storeUrl: 'soscuidadores.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      text: 'O Luciano desenvolveu nosso portal com um nível de sensibilidade e atenção aos detalhes impressionante. A integração automática com o Telegram para alertas de novos cadastros otimizou todo o nosso tempo de atendimento!',
      highlightMetric: '+10.000 Famílias Acolhidas'
    },
    {
      id: '2',
      name: 'Mariana Duarte',
      role: 'Consultora de BI & Marketing',
      company: 'Empresa Parceira - Foco em Dados',
      storeUrl: 'focoemdados.com.br',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      text: 'O Luciano tem uma visão completa de negócios, dados e tecnologia. As automações de WhatsApp e os dashboards que ele estruturou no Foco em Dados nos permitiram tomar decisões muito mais rápidas sem perder tempo em planilhas.',
      highlightMetric: '40h/mês economizadas em relatórios'
    },
    {
      id: '3',
      name: 'Eduardo Fontes',
      role: 'Gestor de Vendas & Mídia',
      company: 'Consultoria de Serviços',
      storeUrl: 'instagram.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      text: 'A landing page ultrarrápida combinada com os carrosséis do Instagram criados pelo Luciano quadruplicou a quantidade de mensagens que recebemos no WhatsApp de clientes prontos para fechar negócio.',
      highlightMetric: '4x Mais Mensagens no WhatsApp'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/50 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono">
            <Quote className="w-3.5 h-3.5" />
            <span>Depoimentos & Recomendação</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            O Que Dizem Parceiros & Clientes
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Histórias de quem confia no trabalho do Luciano em desenvolvimento web, automações de mensagens e estratégia visual.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between space-y-6 relative border border-slate-800/80"
            >
              <div className="space-y-4">
                {/* Rating Stars & Highlight Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                    {item.highlightMetric}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.role} · <span className="text-slate-300 font-medium">{item.company}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
