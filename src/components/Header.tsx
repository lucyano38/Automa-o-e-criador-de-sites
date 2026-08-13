import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenWhatsApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenWhatsApp }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTabs = [
    { id: 'solucoes', label: 'INÍCIO' },
    { id: 'websites', label: 'WEBSITES & PAGES' },
    { id: 'automacao', label: 'AUTOMAÇÃO 24H' },
    { id: 'cases', label: 'CASES / PORTFÓLIO' },
    { id: 'sobre', label: 'SOBRE' },
    { id: 'contato', label: 'CONTATO' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f1112]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-[#121414]/90 backdrop-blur-sm py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo - MK3Digital Clean Agency Style */}
          <button
            onClick={() => {
              setActiveTab('solucoes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-400 to-amber-400 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#121414] rounded-[10px] flex items-center justify-center text-cyan-400 font-extrabold text-lg">
                ⚡
              </div>
            </div>
            <div>
              <div className="font-extrabold text-white text-lg tracking-tight group-hover:text-cyan-400 transition-colors uppercase font-sans">
                Foco Completo
              </div>
              <p className="text-[10px] text-cyan-400/90 font-mono tracking-widest uppercase font-semibold">
                AGÊNCIA DIGITAL & AUTOMAÇÕES
              </p>
            </div>
          </button>

          {/* Desktop Nav Links (Clean Uppercase with Underline) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id || (tab.id === 'solucoes' && activeTab === 'solucoes');
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'contato') {
                      const contactEl = document.getElementById('contato-section');
                      if (contactEl) {
                        contactEl.scrollIntoView({ behavior: 'smooth' });
                        return;
                      }
                    }
                    if (tab.id === 'websites' || tab.id === 'automacao') {
                      setActiveTab('solucoes');
                      setTimeout(() => {
                        const targetEl = document.getElementById('servicos-precos');
                        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                      return;
                    }
                    if (tab.id === 'cases') {
                      setActiveTab('solucoes');
                      setTimeout(() => {
                        const targetEl = document.getElementById('portfolio-section');
                        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                      return;
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-xs font-bold tracking-wider transition-all relative py-1 cursor-pointer font-sans ${
                    isActive
                      ? 'text-white font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-cyan-400 rounded-full animate-fade-in"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Social Icons & Fast CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/luciano-tavares41"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 border border-white/10 flex items-center justify-center transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-pink-500/20 text-slate-300 hover:text-pink-400 border border-white/10 flex items-center justify-center transition-all"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenWhatsApp}
              className="w-8 h-8 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition-all cursor-pointer"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-400" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0f1112]/98 border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-2 backdrop-blur-xl">
          <div className="flex flex-col space-y-1">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (tab.id === 'contato') {
                    const contactEl = document.getElementById('contato-section');
                    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    return;
                  }
                  if (tab.id === 'websites' || tab.id === 'automacao') {
                    setActiveTab('solucoes');
                    setTimeout(() => {
                      const targetEl = document.getElementById('servicos-precos');
                      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                    return;
                  }
                  if (tab.id === 'cases') {
                    setActiveTab('solucoes');
                    setTimeout(() => {
                      const targetEl = document.getElementById('portfolio-section');
                      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                    return;
                  }
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-3 text-xs font-bold tracking-wider rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Falar no WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

