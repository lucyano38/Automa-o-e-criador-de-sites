import React from 'react';
import { 
  BarChart2, 
  Radar, 
  Layers, 
  Sparkles, 
  FileSpreadsheet, 
  LogOut, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X,
  ExternalLink,
  Layout,
  ShoppingBag,
  Film
} from 'lucide-react';
import { useFirebase, OWNER_EMAIL } from '../contexts/FirebaseContext';

interface PrivateNavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const PrivateNavbar: React.FC<PrivateNavbarProps> = ({ currentPath, onNavigate }) => {
  const { signOut, user } = useFirebase();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    {
      id: '/dashboard',
      label: 'Dashboard',
      subtitle: 'Pipeline & Fontes',
      icon: BarChart2,
      badge: 'BI'
    },
    {
      id: '/site-builder',
      label: 'Construtor de Sites',
      subtitle: 'IA & Afiliados',
      icon: Layout,
      badge: 'NOVO'
    },
    {
      id: '/vitrine',
      label: 'Kit Produtividade',
      subtitle: 'Setup & Shopee',
      icon: ShoppingBag,
      badge: 'SHOPEE'
    },
    {
      id: '/prospecting',
      label: 'Prospecção Ativa',
      subtitle: 'Crescimento 24/7',
      icon: Radar,
      badge: 'RADAR'
    },
    {
      id: '/crm',
      label: 'Pipeline CRM',
      subtitle: '6 Etapas de Vendas',
      icon: Layers,
      badge: 'VENDAS'
    },
    {
      id: '/content',
      label: 'Gerador de Conteúdo',
      subtitle: 'Powered by Gemini',
      icon: Sparkles,
      badge: 'IA'
    },
    {
      id: '/data-analysis',
      label: 'Análise de Planilhas',
      subtitle: 'Pergunte aos Dados',
      icon: FileSpreadsheet,
      badge: 'AI BI'
    },
    {
      id: '/editor-pro',
      label: 'Editor Pro de Vídeos',
      subtitle: 'Cortes, banners e efeitos IA',
      icon: Film,
      badge: 'NOVO'
    }
  ];

  const handleLogout = async () => {
    await signOut();
    onNavigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0c0e]/95 backdrop-blur-md border-b border-cyan-500/30 shadow-xl shadow-black/60">
      
      {/* Top Cyber Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('/dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0d0f10] rounded-[10px] flex items-center justify-center text-cyan-400 font-black text-sm">
                  ⚡
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-extrabold text-base tracking-tight font-sans">
                    Foco em Dados
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold">
                    PRO
                  </span>
                </div>
                <span className="block text-[10px] text-slate-400 font-mono">
                  Ecossistema Privado · focoemdados.com.br
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Area: Owner Info & Public Site Link */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* View Landing Page link */}
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all cursor-pointer"
              title="Visualizar a Landing Page pública"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ver Site Público</span>
            </button>

            {/* Owner Identity Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <div className="text-white font-bold leading-tight text-[11px]">Luciano Tavares Silva</div>
                <div className="text-[10px] text-emerald-400">{OWNER_EMAIL}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-400 transition-all cursor-pointer"
              title="Encerrar Sessão"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-lg bg-white/5 text-slate-300 border border-white/10 text-xs"
              title="Site Público"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-200 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0c0e] border-b border-cyan-500/30 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/80">{item.badge}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              Titular: <span className="text-white font-bold">{OWNER_EMAIL}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
