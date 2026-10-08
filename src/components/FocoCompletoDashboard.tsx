import React, { useState } from 'react';
import { 
  Filter, 
  TrendingUp, 
  Globe2, 
  Sparkles, 
  ArrowUpRight, 
  Search, 
  CheckCircle2, 
  Clock, 
  Send, 
  BarChart2, 
  Layers,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface FocoCompletoDashboardProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
}

interface DealItem {
  id: string;
  empresa: string;
  origem: string;
  canal: string;
  data: string;
  valor: string;
  status: 'Contato Iniciado' | 'Em Análise' | 'Proposta Enviada' | 'Fechado';
  stage: 'Discovery' | 'Abordagem' | 'Qualificação' | 'Proposta' | 'Fechamento';
}

export const FocoCompletoDashboard: React.FC<FocoCompletoDashboardProps> = ({
  onOpenWhatsAppWithMessage
}) => {

  const [activeStage, setActiveStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sample lead deals data matching layout
  const deals: DealItem[] = [
    {
      id: '1',
      empresa: 'TechNova Brasil',
      origem: 'Linkedin Ads',
      canal: 'Google Search',
      data: '12/04/2024',
      valor: 'R$ 18.500',
      status: 'Contato Iniciado',
      stage: 'Abordagem'
    },
    {
      id: '2',
      empresa: 'Alpha Soluções',
      origem: 'Referral',
      canal: 'Indicação Direta',
      data: '11/04/2024',
      valor: 'R$ 24.000',
      status: 'Em Análise',
      stage: 'Qualificação'
    },
    {
      id: '3',
      empresa: 'Vértice Digital',
      origem: 'Referral',
      canal: 'WhatsApp Bot',
      data: '10/04/2024',
      valor: 'R$ 32.000',
      status: 'Proposta Enviada',
      stage: 'Proposta'
    },
    {
      id: '4',
      empresa: 'SOS Cuidadores Portal',
      origem: 'Tráfego Orgânico',
      canal: 'soscuidadores.com',
      data: '09/04/2024',
      valor: 'R$ 45.000',
      status: 'Fechado',
      stage: 'Fechamento'
    },
    {
      id: '5',
      empresa: 'Nexus Saúde & Bem Estar',
      origem: 'Google Ads',
      canal: 'Landing Page',
      data: '08/04/2024',
      valor: 'R$ 15.000',
      status: 'Contato Iniciado',
      stage: 'Discovery'
    }
  ];

  const funnelStages = [
    { id: 'Discovery', label: 'Discovery', count: '4,210', icon: Filter, color: 'text-amber-400' },
    { id: 'Abordagem', label: 'Abordagem', count: '3,105', icon: Filter, color: 'text-amber-400' },
    { id: 'Qualificação', label: 'Qualificação', count: '1,890', icon: Filter, color: 'text-amber-400' },
    { id: 'Proposta', label: 'Proposta', count: '342', icon: Filter, color: 'text-amber-400' },
    { id: 'Fechamento', label: 'Fechamento', count: '128', icon: Filter, color: 'text-purple-400' }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesStage = activeStage === 'all' || deal.stage === activeStage;
    const matchesSearch = deal.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.origem.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const getStatusBadge = (status: DealItem['status']) => {
    switch (status) {
      case 'Contato Iniciado':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Em Análise':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Proposta Enviada':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Fechado':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="painel-central" className="py-20 bg-[#121414] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro Label */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Modelo Foco em Dados · Desenvolvido por Luciano Tavares Silva</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestão de Métricas & Automações em Tempo Real
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Integramos seu website, formulários, robôs de WhatsApp e CRM em um único painel inteligente com relatórios automatizados.
          </p>
        </div>

        {/* --- MAIN MODEL FRAME (EXACT LAYOUT FROM IMAGE) --- */}
        <div className="rounded-3xl bg-[#0e1010] border border-amber-500/30 p-4 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-xl">
          
          {/* Decorative ambient glows matching image */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* 1. Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg shadow-amber-500/20">
                ⚡
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight font-sans">
                  Foco em Dados
                </span>
                <span className="block text-[10px] text-amber-400/80 font-mono">
                  focoemdados.com.br
                </span>
              </div>
            </div>

            {/* Nav Menu Items */}
            <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Serviços</span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Receita</span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Propostas</span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Agora</span>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Gostaria de implementar um Painel Central Foco em Dados para o meu negócio.')}
              className="px-5 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 hover:scale-105 transition-all cursor-pointer"
            >
              Começar Agora
            </button>
          </div>

          {/* 2. Headline Title in Glowing Gold */}
          <div className="text-center py-2 relative z-10">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 tracking-tight drop-shadow-[0_0_25px_rgba(250,189,0,0.4)]">
              Painel Central Foco em Dados
            </h1>
          </div>

          {/* 3. Metric Cards Row (4 Cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            
            {/* Card 1: Leads */}
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-amber-500/50 shadow-[0_0_20px_rgba(250,189,0,0.15)] hover:border-amber-400 transition-all text-center space-y-1 group">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-sans tracking-tight group-hover:scale-105 transition-transform">
                12,845
              </div>
              <div className="text-xs font-medium text-slate-300 uppercase tracking-wider font-mono">
                Leads
              </div>
            </div>

            {/* Card 2: Propostas */}
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-500/40 transition-all text-center space-y-1 group">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-200 font-sans tracking-tight group-hover:scale-105 transition-transform">
                342
              </div>
              <div className="text-xs font-medium text-slate-300 uppercase tracking-wider font-mono">
                Propostas
              </div>
            </div>

            {/* Card 3: Receita */}
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-500/40 transition-all text-center space-y-1 group">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight group-hover:scale-105 transition-transform">
                R$ 84k
              </div>
              <div className="text-xs font-medium text-slate-300 uppercase tracking-wider font-mono">
                Receita
              </div>
            </div>

            {/* Card 4: MRR */}
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-500/40 transition-all text-center space-y-1 group">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight group-hover:scale-105 transition-transform">
                R$ 256k
              </div>
              <div className="text-xs font-medium text-slate-300 uppercase tracking-wider font-mono">
                MRR
              </div>
            </div>

          </div>

          {/* 4. Middle Section: Chart + World Map Glow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            
            {/* Left Chart Card */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 font-bold text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                  Crescimento de Leads & Vendas
                </span>
                <span className="text-slate-400">+38.4% este mês</span>
              </div>

              {/* Graphic representation matching image */}
              <div className="relative h-48 w-full flex items-end justify-between gap-3 pt-6 px-2">
                {/* SVG Trend line overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path 
                    d="M 5,75 L 25,82 L 45,55 L 65,70 L 85,35 L 98,20" 
                    fill="none" 
                    stroke="#fabd00" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(250,189,0,0.8)]"
                  />
                  <circle cx="5" cy="75" r="3" fill="#fabd00" />
                  <circle cx="25" cy="82" r="3" fill="#fabd00" />
                  <circle cx="45" cy="55" r="3" fill="#fabd00" />
                  <circle cx="65" cy="70" r="3" fill="#fabd00" />
                  <circle cx="85" cy="35" r="3.5" fill="#fabd00" />
                  <circle cx="98" cy="20" r="4" fill="#ffffff" className="animate-ping" />
                </svg>

                {/* Bars */}
                <div className="w-full bg-amber-500/20 hover:bg-amber-500/40 h-[30%] rounded-t-md transition-all"></div>
                <div className="w-full bg-amber-500/20 hover:bg-amber-500/40 h-[25%] rounded-t-md transition-all"></div>
                <div className="w-full bg-amber-500/30 hover:bg-amber-500/50 h-[50%] rounded-t-md transition-all"></div>
                <div className="w-full bg-amber-500/30 hover:bg-amber-500/50 h-[40%] rounded-t-md transition-all"></div>
                <div className="w-full bg-gradient-to-t from-amber-600/40 to-amber-400/80 h-[75%] rounded-t-md transition-all"></div>
                <div className="w-full bg-gradient-to-t from-amber-500 to-amber-300 h-[90%] rounded-t-md transition-all shadow-lg shadow-amber-500/20"></div>
              </div>
            </div>

            {/* Right World Map Glow Card */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 z-10">
                <span className="flex items-center gap-1.5 font-bold text-purple-400">
                  <Globe2 className="w-4 h-4" />
                  Alcance de Campanhas & Atendimentos
                </span>
                <span className="text-purple-300 font-semibold">Global & Brasil</span>
              </div>

              {/* Map Visual with Glowing Purple Dots */}
              <div className="relative h-44 w-full flex items-center justify-center">
                {/* SVG World Map Silhouette */}
                <svg className="w-full h-full opacity-30 text-slate-400" viewBox="0 0 1000 500" fill="currentColor">
                  <path d="M150,150 Q200,100 250,150 T350,150 Q400,200 300,300 T150,250 Z M450,120 Q600,80 750,120 T800,250 Q750,350 600,300 T450,200 Z M250,320 Q300,350 350,420 T250,450 Z" />
                </svg>

                {/* Pulsing Purple Glow Points matching image */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7] animate-pulse"></div>
                <div className="absolute top-1/4 left-1/2 w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_20px_#a855f7] animate-ping"></div>
                <div className="absolute top-2/3 left-2/3 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7]"></div>
                <div className="absolute top-1/2 left-3/4 w-4 h-4 rounded-full bg-purple-300 shadow-[0_0_25px_#c084fc]"></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_#a855f7]"></div>
              </div>
            </div>

          </div>

          {/* 5. Pipeline Funnel Steps matching image */}
          <div className="pt-2 relative z-10 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-center sm:text-left">
              Etapas do Funil de Conversão:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {funnelStages.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(isActive ? 'all' : stage.id)}
                    className={`p-3 rounded-xl border text-center space-y-2 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/20' 
                        : 'bg-white/5 border-white/10 hover:border-amber-500/40 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-center">
                      <Filter className={`w-4 h-4 ${stage.color}`} />
                    </div>
                    <div className="text-xs font-bold font-sans">
                      {stage.label}
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${stage.id === 'Fechamento' ? 'bg-purple-500' : 'bg-amber-400'} w-3/4`}></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Data Table matching image */}
          <div className="pt-4 relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
                Leads Recentes & Origem das Oportunidades
              </h3>
              
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrar empresa ou origem..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-300 font-mono font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Empresa</th>
                    <th className="p-3.5">Origem</th>
                    <th className="p-3.5">Canal / Campanha</th>
                    <th className="p-3.5">Data</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200 font-sans">
                  {filteredDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        {deal.empresa}
                      </td>
                      <td className="p-3.5 text-slate-300">{deal.origem}</td>
                      <td className="p-3.5 text-slate-400 font-mono">{deal.canal}</td>
                      <td className="p-3.5 text-slate-400 font-mono">{deal.data}</td>
                      <td className="p-3.5 text-right">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${getStatusBadge(deal.status)}`}>
                          {deal.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Callout banner */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
            <div>
              <h4 className="text-sm font-bold text-white">
                Quer um painel como este conectado ao seu negócio?
              </h4>
              <p className="text-xs text-slate-400">
                Criamos soluções completas de Business Intelligence, automação e dashboards personalizados.
              </p>
            </div>
            <button
              onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Vi o Painel Central Foco em Dados e quero um orçamento para integrar meu negócio.')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20 shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Solicitar Orçamento no WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
