import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Linkedin, Instagram, Lock, ShieldCheck, ArrowRight, User, LogIn } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenWhatsApp: () => void;
  onNavigate: (path: string) => void;
  isOwner?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenWhatsApp,
  onNavigate,
  isOwner = false
}) => {
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
    { id: 'servicos', label: 'SERVIÇOS & PLANOS' },
    { id: 'cases', label: 'PORTFÓLIO' },
    { id: 'sobre', label: 'SOBRE O TITULAR' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contato', label: 'CONTATO' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);

    if (tabId === 'contato') {
      const contactEl = document.getElementById('contato-section') || document.getElementById('contato');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (tabId === 'servicos') {
      setActiveTab('solucoes');
      setTimeout(() => {
        const targetEl = document.getElementById('servicos-precos');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (tabId === 'cases') {
      setActiveTab('solucoes');
      setTimeout(() => {
        const targetEl = document.getElementById('portfolio-section');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (tabId === 'sobre') {
      setActiveTab('solucoes');
      setTimeout(() => {
        const targetEl = document.getElementById('sobre');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (tabId === 'faq') {
      setActiveTab('solucoes');
      setTimeout(() => {
        const targetEl = document.getElementById('faq');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0d0f]/95 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-xl'
          : 'bg-[#0d0f10]/90 backdrop-blur-sm py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo - Foco em Dados */}
          <button
            onClick={() => {
              setActiveTab('solucoes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#0d0f10] rounded-[10px] flex items-center justify-center text-cyan-400 font-black text-lg">
                ⚡
              </div>
            </div>
            <div>
              <div className="font-extrabold text-white text-lg tracking-tight group-hover:text-cyan-400 transition-colors uppercase font-sans">
                Foco em Dados
              </div>
              <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-semibold">
                focoemdados.com.br · Inteligência B2B
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
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

          {/* Right Actions: Entrar / Dashboard + WhatsApp */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Login / Ecossistema Action Button */}
            {isOwner ? (
              <button
                onClick={() => onNavigate('/dashboard')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm shadow-cyan-500/20"
                title="Acessar o Painel Executivo Foco em Dados"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 text-xs font-mono font-bold transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>Entrar</span>
              </button>
            )}

            {/* Começar Agora Button */}
            <button
              onClick={() => onNavigate(isOwner ? '/dashboard' : '/login')}
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              Começar Agora
            </button>

            {/* WhatsApp Direct Action */}
            <button
              onClick={onOpenWhatsApp}
              className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 transition-all cursor-pointer"
              title="Falar no WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-400" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onNavigate(isOwner ? '/dashboard' : '/login')}
              className="px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Entrar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b0d0f]/98 border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-2 backdrop-blur-xl">
          <div className="flex flex-col space-y-1">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  handleNavClick(tab.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-xs tracking-wider"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate(isOwner ? '/dashboard' : '/login');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs uppercase"
            >
              {isOwner ? 'Acessar Dashboard' : 'Entrar na Plataforma'}
            </button>

            <button
              onClick={() => {
                onOpenWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs"
            >
              Falar no WhatsApp
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
