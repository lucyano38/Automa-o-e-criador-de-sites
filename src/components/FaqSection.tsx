import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quais tipos de projetos o Luciano desenvolve?',
      a: 'Luciano desenvolve websites e landing pages de alta conversão, automações inteligentes para WhatsApp e Telegram, estratégias/criação de posts para Instagram, além de portais robustos como o soscuidadores.com e o focoemdados.com.br.'
    },
    {
      q: 'Como funcionam as automações para WhatsApp e Telegram?',
      a: 'Elas conectam seu site ou formulário diretamente ao WhatsApp/Telegram para responder clientes instantaneamente, enviar confirmações, alertas para a sua equipe e direcionar leads qualificados sem intervenção manual.'
    },
    {
      q: 'Como é feito o trabalho de criação de posts para Instagram?',
      a: 'São produzidas artes visuais profissionais, carrosséis educativos e layouts alinhados com a identidade da sua marca, prontos para engajar seu público e atrair clientes direto para o seu WhatsApp.'
    },
    {
      q: 'Quanto tempo leva para entregar um website ou landing page?',
      a: 'Landing pages e automações simples são entregues em média entre 3 e 7 dias úteis. Projetos de sites completos ou plataformas personalizadas levam de 10 a 20 dias úteis.'
    },
    {
      q: 'Como funciona o suporte pós-entrega com Luciano?',
      a: 'Todos os projetos incluem garantia e suporte técnico ilimitado via WhatsApp após a entrega para que tudo funcione perfeitamente.'
    },
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: 'Trabalhamos com entrada + parcela na entrega via Pix, Boleto ou Cartão de Crédito.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tire Suas Dúvidas Frequentes
          </h2>
          <p className="text-slate-400 text-sm">
            Respostas para as principais perguntas sobre os serviços do Luciano.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-100 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
