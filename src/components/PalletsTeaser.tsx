import React from 'react';
import { ArrowRight, Boxes, CheckCircle2, MessageSquare } from 'lucide-react';
import { PalletIllustration } from './pallets/PalletIllustration';

interface PalletsTeaserProps {
  onNavigate: (path: string) => void;
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const PalletsTeaser: React.FC<PalletsTeaserProps> = ({
  onNavigate,
  onOpenWhatsAppWithMessage,
}) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-[#0f1a20] via-[#11161c] to-[#16120d] border border-cyan-500/25 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-7 sm:p-10 space-y-5">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-orange-300 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-full">
              <Boxes className="w-3.5 h-3.5" />
              Novo nicho no ecossistema
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Pallets B2B para indústria, distribuição e exportação.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
              O Foco em Dados agora também cota pallets de madeira, plástico e compensado.
              Catálogo com ficha técnica, estimativa de carga por caminhão e pedido direto no WhatsApp.
            </p>

            <ul className="space-y-2">
              {[
                '6 modelos com medida, entradas e capacidade de referência',
                'Calculadora de pallets por carga e cargas necessárias',
                'Cotação com CEP, quantidade e prazo no WhatsApp',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('/pallets')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Conhecer a seção de pallets
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenWhatsAppWithMessage(
                    'Olá! Vi o novo nicho de pallets no site e quero uma cotação para minha empresa.'
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-xs transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                Pedir cotação
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center p-6 sm:p-10 bg-[#0b1014]/60 border-t lg:border-t-0 lg:border-l border-white/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />
            <PalletIllustration material="madeira" className="relative w-full max-w-sm h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};
