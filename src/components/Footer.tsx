import React, { useState } from 'react';
import { 
  ArrowUp, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Github, 
  Scale, 
  Lock, 
  ShieldCheck, 
  Mail, 
  ExternalLink,
  X
} from 'lucide-react';

interface FooterProps {
  onOpenAuthModal?: () => void;
  onNavigate?: (path: string) => void;
  isOwner?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuthModal, onNavigate, isOwner }) => {
  const [activeModal, setActiveModal] = useState<'termos' | 'privacidade' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavLink = (target: string) => {
    if (target === 'pallets') { if (onNavigate) onNavigate('/pallets'); return; }
    if (target === 'home') {
      if (onNavigate) {
        onNavigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (target === 'dashboard') {
      if (onNavigate) {
        onNavigate('/dashboard');
      } else if (onOpenAuthModal) {
        onOpenAuthModal();
      }
      return;
    }
    if (target === 'crm') {
      if (onNavigate) {
        onNavigate('/crm');
      } else if (onOpenAuthModal) {
        onOpenAuthModal();
      }
      return;
    }
    if (target === 'growth') {
      if (onNavigate) {
        onNavigate('/prospecting');
      } else if (onOpenAuthModal) {
        onOpenAuthModal();
      }
      return;
    }
    if (target === 'planos') {
      if (window.location.pathname !== '/' && onNavigate) {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById('servicos-precos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('servicos-precos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
  };

  return (
    <footer className="bg-[#0b0d0f] border-t border-white/10 text-slate-300 text-xs relative">
      
      {/* Top Subtle Cyan Neon Strip */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* 4-Column Layout (Faithful to reference structure, adapted to Foco em Dados) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Coluna 1 (Esquerda - 5 cols): Logotipo + Descrição Institucional + Contato / Suporte */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Logo Foco em Dados */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#0b0d0f] rounded-[10px] flex items-center justify-center text-cyan-400 font-black text-lg">
                  ⚡
                </div>
              </div>
              <div>
                <h3 className="text-white font-black text-xl tracking-tight uppercase font-sans">
                  FOCO EM DADOS
                </h3>
                <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-semibold">
                  INTELIGÊNCIA & AUTOMAÇÃO B2B
                </p>
              </div>
            </div>

            {/* Breve Texto Institucional */}
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Inteligência de dados, prospecção e automação para escalar suas vendas no piloto automático.
            </p>

            {/* Contato / Suporte */}
            <div className="space-y-1 pt-1">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                CONTATO / SUPORTE
              </div>
              <a 
                href="mailto:lucyano.pci@gmail.com"
                className="text-cyan-400 hover:text-cyan-300 font-bold font-mono text-sm block transition-colors"
              >
                lucyano.pci@gmail.com
              </a>
              <div className="text-[11px] text-slate-400 font-mono">
                E-mail Profissional: <a href="mailto:atendimento@focoemdados.com.br" className="text-slate-300 hover:text-cyan-400">atendimento@focoemdados.com.br</a>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Atendimento Rápido: <span className="text-emerald-400 font-bold">Segunda a Sábado, das 8h às 20h</span>
              </div>
            </div>

          </div>

          {/* Coluna 2 (Centro-Esquerda - 3 cols): Seção NAVEGAÇÃO */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-sans">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              <li>
                <button 
                  onClick={() => handleNavLink('home')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavLink('dashboard')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Dashboard</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">PRO</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavLink('crm')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>CRM</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">ATIVO</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavLink('growth')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Growth Engine
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavLink('planos')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Planos & Preços
                </button>
              </li>
            <li><button onClick={() => handleNavLink('pallets')} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"><span>Pallets B2B</span><span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400">NOVO</span></button></li>
</ul>
          </div>

          {/* Coluna 3 (Centro-Direita - 2 cols): Seção LEGAL */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-sans">
              LEGAL
            </h4>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              <li>
                <button 
                  onClick={() => setActiveModal('termos')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Termos de Serviço
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('privacidade')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Política de Privacidade
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 4 (Direita - 2 cols): Seção REDES SOCIAIS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-sans">
              REDES SOCIAIS
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/luciano-tavares41"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/40 flex items-center justify-center transition-all shadow-md group"
                title="LinkedIn Luciano Tavares Silva"
              >
                <Linkedin className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 text-slate-300 hover:text-pink-400 border border-white/10 hover:border-pink-400/40 flex items-center justify-center transition-all shadow-md group"
                title="Instagram Foco em Dados"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-400/40 flex items-center justify-center transition-all shadow-md group"
                title="YouTube Foco em Dados"
              >
                <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-400 border border-white/10 hover:border-purple-400/40 flex items-center justify-center transition-all shadow-md group"
                title="GitHub"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Caixa Inferior de Aviso Legal (Estrutura idêntica ao modelo de referência, adaptada ao Foco em Dados) */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#121518]/90 border border-cyan-500/20 shadow-xl relative overflow-hidden backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            
            {/* Balança da Justiça / Ícone Legal */}
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Scale className="w-6 h-6" />
            </div>

            {/* Conteúdo Jurídico da Plataforma */}
            <div className="space-y-2">
              <h5 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider font-sans">
                AVISO LEGAL E NATUREZA DA PLATAFORMA
              </h5>
              <p className="text-slate-300 text-xs leading-relaxed">
                O <strong>Foco em Dados</strong> é uma plataforma de inteligência e automação de prospecção baseada em dados públicos e ferramentas tecnológicas. <strong>Não garantimos resultados comerciais específicos de terceiros.</strong> Toda a abordagem, negociação e execução de vendas são de responsabilidade direta e independente de cada usuário.
              </p>
            </div>

          </div>
        </div>

        {/* Linha Final de Copyright, Portais e Acesso do Titular */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          
          <div className="text-center md:text-left space-y-1">
            <div>
              © {new Date().getFullYear()} <strong>Foco em Dados</strong> · focoemdados.com.br. Todos os direitos reservados.
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Inteligência de Dados, Prospecção B2B e Automação de Vendas 24/7.
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Discretionary Owner Login */}
            {onOpenAuthModal && (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 border border-white/10 text-[11px] font-mono transition-all cursor-pointer"
                title="Acesso exclusivo ao ecossistema para lucyano.pci@gmail.com"
              >
                <Lock className="w-3 h-3" />
                <span>{isOwner ? "Ecossistema Ativo" : "Área do Titular"}</span>
              </button>
            )}

            {/* Scroll To Top */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Modal Interativo para Termos de Serviço ou Política de Privacidade */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-2xl rounded-2xl bg-[#121517] border border-cyan-500/40 p-6 sm:p-8 space-y-4 shadow-2xl text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white uppercase font-sans">
                {activeModal === 'termos' ? 'Termos de Serviço · Foco em Dados' : 'Política de Privacidade · Foco em Dados'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto space-y-3 text-xs text-slate-300 leading-relaxed pr-2 font-sans">
              {activeModal === 'termos' ? (
                <>
                  <p><strong>1. Objeto:</strong> O Foco em Dados fornece serviços de desenvolvimento de websites, automações de mensagens e ferramentas de inteligência analítica de negócios.</p>
                  <p><strong>2. Uso da Plataforma:</strong> O contratante compromete-se a utilizar as ferramentas tecnológicas em estrita conformidade com a legislação brasileira e a Lei Geral de Proteção de Dados (LGPD).</p>
                  <p><strong>3. Limitação de Responsabilidade:</strong> O Foco em Dados não atua como representante comercial ou corretor, não respondendo pelo fechamento final de vendas ou faturamento do cliente.</p>
                  <p><strong>4. Propriedade Intelectual:</strong> Todos os códigos, automações e arquiteturas desenvolvidas são entregues conforme o escopo acordado entre as partes.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Coleta de Dados:</strong> Coletamos apenas as informações estritamente necessárias para prestação de serviços (nome, e-mail comercial, telefone/WhatsApp de contato).</p>
                  <p><strong>2. Finalidade:</strong> Os dados são utilizados exclusivamente para contato técnico, envio de propostas comerciais e operação das automações autorizadas.</p>
                  <p><strong>3. Segurança e Sigilo:</strong> Aplicamos padrões modernos de criptografia e proteção de dados. Não comercializamos nem compartilhamos seus dados com terceiros para fins publicitários não autorizados.</p>
                  <p><strong>4. Direitos do Titular (LGPD):</strong> O titular dos dados pode a qualquer momento solicitar confirmação, correção ou exclusão de suas informações pelo e-mail <strong>atendimento@focoemdados.com.br</strong>.</p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
