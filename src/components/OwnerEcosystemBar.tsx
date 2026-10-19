import React from 'react';
import { 
  ShieldCheck, 
  Radar, 
  Share2, 
  BarChart2, 
  Workflow, 
  Eye, 
  LogOut, 
  User, 
  Sparkles,
  Instagram
} from 'lucide-react';
import { useFirebase, OWNER_EMAIL } from '../contexts/FirebaseContext';

interface OwnerEcosystemBarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const OwnerEcosystemBar: React.FC<OwnerEcosystemBarProps> = ({
  currentView,
  setCurrentView
}) => {
  const { signOut, user } = useFirebase();

  const navItems = [
    { id: 'landing', label: 'Landpage Pública', icon: Eye, color: 'text-slate-300' },
    { id: 'prospeccao', label: 'Radar B2B (15km)', icon: Radar, color: 'text-emerald-400' },
    { id: 'postagens', label: 'Postagens Insta & Face', icon: Instagram, color: 'text-pink-400' },
    { id: 'crm', label: 'Painel Foco em Dados', icon: BarChart2, color: 'text-amber-400' },
    { id: 'automacao', label: 'Automações 24h', icon: Workflow, color: 'text-cyan-400' },
  ];

  return (
    <div className="bg-[#0b0e10] border-b border-cyan-500/30 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Identity & Status */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
              ⚡
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider">Ecossistema Foco Completo</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Titular: {OWNER_EMAIL}</span>
              </span>
            </div>
          </div>

          {/* View Nav Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout Action */}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 text-xs font-bold transition-all cursor-pointer"
            title="Sair do ecossistema e voltar à visão pública"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Desconectar</span>
          </button>

        </div>
      </div>
    </div>
  );
};
