import React from 'react';
import { ArrowUp, Globe, Linkedin, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0d0d] border-t border-white/10 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Personal & Brand Credit in Footer */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-extrabold text-base shadow-md">
              ⚡
            </div>
            <div>
              <div className="text-white font-extrabold text-sm">Luciano Tavares Silva</div>
              <div className="text-[11px] text-amber-400/90 font-mono">Titular & Desenvolvedor · Foco Completo</div>
            </div>
          </div>

          {/* Social & Professional Links - LinkedIn featured in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-medium">
            <a 
              href="https://www.linkedin.com/in/luciano-tavares41" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono text-xs font-bold transition-all"
            >
              <Linkedin className="w-4 h-4 fill-blue-400" />
              <span>LinkedIn: Luciano Tavares</span>
            </a>
          </div>

          {/* Scroll To Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-400 border border-white/10 transition-all cursor-pointer"
            title="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom copyright & portals */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Luciano Tavares Silva · Foco Completo. Desenvolvimento Web, Automações WhatsApp & Mídias Sociais.
          </div>
          <div className="flex items-center gap-3 font-mono text-amber-400">
            <a href="https://soscuidadores.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <Globe className="w-3 h-3" /> soscuidadores.com
            </a>
            <span>•</span>
            <a href="https://focoemdados.com.br" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <Globe className="w-3 h-3" /> focoemdados.com.br
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
