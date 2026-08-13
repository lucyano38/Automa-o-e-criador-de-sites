import React from 'react';
import { Cpu, Code2, Server, Globe, MessageSquare, BarChart3, Instagram } from 'lucide-react';

export const TechStack: React.FC = () => {
  const stackCategories = [
    {
      category: 'Websites & Landing Pages',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: 'React 19 & Vite', level: 'Interface Ultrarrápida' },
        { name: 'TypeScript & JavaScript', level: 'Código Limpo e Seguro' },
        { name: 'Tailwind CSS', level: 'Design Responsivo' },
        { name: 'SEO & Performance', level: 'Otimizado para Google' },
      ]
    },
    {
      category: 'Automação & Mensageria',
      icon: <MessageSquare className="w-5 h-5 text-teal-400" />,
      skills: [
        { name: 'WhatsApp API & Bots', level: 'Disparos e Atendimento' },
        { name: 'Telegram Bot API', level: 'Notificações e Alertas' },
        { name: 'n8n & Webhooks', level: 'Fluxos Automáticos' },
        { name: 'Integrações de Formulários', level: 'Captação de Leads' },
      ]
    },
    {
      category: 'Design, Dados & Mídia',
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
      skills: [
        { name: 'Design para Instagram', level: 'Posts e Carrosséis' },
        { name: 'Análise de Dados & BI', level: 'Foco em Dados' },
        { name: 'Google Sheets / Database', level: 'Sincronização em Nuvem' },
        { name: 'Node.js Backend', level: 'APIs e Servidores' },
      ]
    }
  ];

  return (
    <section className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>Ferramentas & Tecnologias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tecnologias Utilizadas por Luciano
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Ferramentas modernas para entregar sites rápidos, automações eficientes e artes visuais impactantes.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stackCategories.map((cat, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 space-y-6 border border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-white font-mono">
                  {cat.category}
                </h3>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{skill.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
