import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';

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

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close drawer when screen resizes to desktop breakpoint (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

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
        const targetEl = document.getElementById('portfolio');
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
          ? 'bg-[#0b0d0f]/95 backdrop-blur-md border-b border-cyan-500/20 py-2.5 sm:py-3 shadow-xl'
          : 'bg-[#0d0f10]/90 backdrop-blur-sm py-2.5 sm:py-3.5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo & Title - Dedicated breathing room, never squished or truncated */}
          <button
            onClick={() => {
              setActiveTab('solucoes');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-all shrink-0">
              <div className="w-full h-full bg-[#0d0f10] rounded-[9px] flex items-center justify-center text-cyan-400 font-black text-sm sm:text-base">
                ⚡
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight group-hover:text-cyan-400 transition-colors uppercase font-sans whitespace-nowrap leading-none">
                Foco em Dados
              </span>
              <span className="hidden sm:inline-block text-[10px] sm:text-[11px] text-cyan-400 font-mono tracking-wider uppercase font-semibold whitespace-nowrap mt-1 leading-none">
                Sites &amp; Automação Inteligente
              </span>
            </div>
          </button>

          {/* Desktop Nav Links (Visible exclusively on Large screens >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`text-xs font-bold tracking-wider transition-all relative py-1 cursor-pointer font-sans whitespace-nowrap ${
                    isActive
                      ? 'text-white font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-cyan-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Visible exclusively on Large screens >= 1024px) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Login / Dashboard Action */}
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
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
            >
              Começar Agora
            </button>

            {/* WhatsApp Direct Action */}
            <button
              onClick={onOpenWhatsApp}
              className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 transition-all cursor-pointer"
              title="Falar no WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-cyan-400" />
            </button>
          </div>

          {/* Mobile & Tablet Controls (Visible on all screens < 1024px: phones and tablets) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Direct quick action for mobile & tablet */}
            {isOwner ? (
              <button
                onClick={() => onNavigate('/dashboard')}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all min-h-[44px] cursor-pointer"
                title="Acessar Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xs:inline">Painel</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/login')}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs whitespace-nowrap transition-colors min-h-[44px] cursor-pointer shadow-sm shadow-cyan-500/20"
                title="Entrar na Plataforma"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
            )}

            {/* Direct WhatsApp icon on tablets (sm and up) */}
            <button
              onClick={onOpenWhatsApp}
              className="hidden sm:flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer"
              title="Falar no WhatsApp"
              aria-label="Falar no WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-cyan-400" />
            </button>

            {/* Responsive Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-xl border transition-all cursor-pointer focus:outline-none ${
                mobileMenuOpen
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-200 hover:text-white border-white/10 hover:border-cyan-500/30'
              }`}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Responsive Drawer for Mobile and Tablet Devices (< 1024px) */}
      {mobileMenuOpen && (
        <div 
          id="mobile-tablet-drawer"
          className="lg:hidden bg-[#0a0c0e]/98 border-b border-cyan-500/20 px-4 sm:px-6 pt-3 pb-6 mt-2.5 space-y-3 backdrop-blur-2xl shadow-2xl animate-fade-in"
        >
          {/* Navigation Links with comfortable 44px+ touch targets */}
          <div className="flex flex-col space-y-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleNavClick(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border-l-4 border-cyan-400 font-extrabold shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Action CTAs inside Drawer */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onNavigate(isOwner ? '/dashboard' : '/login');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <span>{isOwner ? 'Acessar Dashboard Executivo' : 'Começar Agora · Foco em Dados'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onOpenWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 font-bold text-xs transition-all cursor-pointer shadow-sm shadow-cyan-500/10"
            >
              <MessageSquare className="w-4 h-4 fill-cyan-400" />
              <span>Falar no WhatsApp Comercial</span>
            </button>

            {!isOwner && (
              <button
                onClick={() => {
                  onNavigate('/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-slate-400 hover:text-cyan-300 font-mono text-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>Já tem cadastro? Acessar login</span>
              </button>
            )}

            {/* Status indicator */}
            <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Sites Profissionais &amp; Automação B2B 24h</span>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

