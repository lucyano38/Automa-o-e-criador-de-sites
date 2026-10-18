import React, { useState, useMemo, useEffect } from 'react';
import { 
  Radar, 
  Search, 
  MapPin, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Zap, 
  TrendingDown, 
  Building2, 
  ExternalLink, 
  FileSpreadsheet, 
  RefreshCw, 
  ChevronRight,
  Navigation,
  ListFilter,
  CheckCircle2,
  Info
} from 'lucide-react';
import { CNAE_NICHES, INITIAL_PROSPECT_LEADS, generateDynamicProspects } from '../data/prospectingData';
import { ProspectLead, CnaeNicheOption } from '../types';
import { TechGlobeCanvas } from './TechGlobeCanvas';

interface ActiveProspectingRadarProps {
  onOpenWhatsAppWithMessage?: (msg: string) => void;
}

export const ActiveProspectingRadar: React.FC<ActiveProspectingRadarProps> = ({ 
  onOpenWhatsAppWithMessage 
}) => {
  // Current search location (defaulting to central region)
  const [userLocation, setUserLocation] = useState<string>('São Paulo, SP (Região Central / Paulista)');
  
  // Radius selection in km
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(10);
  
  // Website filter: 'todos' | 'sem_site' | 'com_site'
  const [websiteFilter, setWebsiteFilter] = useState<'todos' | 'sem_site' | 'com_site'>('todos');
  
  // Selected niche ID
  const [selectedNiche, setSelectedNiche] = useState<string>('todos');
  
  // Search query within current leads
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Search filter for the niche list itself
  const [nicheSearchQuery, setNicheSearchQuery] = useState<string>('');

  // Scanning animation state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string>('');

  // 3D globe background visibility
  const [show3dBackground, setShow3dBackground] = useState<boolean>(true);

  // Expanded lead details
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);

  // All active leads in memory
  const [leads, setLeads] = useState<ProspectLead[]>(() => {
    const saved = localStorage.getItem('foco_prospecting_leads_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return INITIAL_PROSPECT_LEADS;
  });

  // Save leads to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('foco_prospecting_leads_v2', JSON.stringify(leads));
  }, [leads]);

  // Handle GPS location button
  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setIsScanning(true);
      setScanMessage('Obtendo sua localização geográfica...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          const newLoc = `Sua Localização (${lat}, ${lng})`;
          setUserLocation(newLoc);
          
          // Generate realistic prospects around this GPS point
          const freshLeads = generateDynamicProspects('Sua Região', maxRadiusKm, selectedNiche);
          setLeads(freshLeads);
          setIsScanning(false);
          setScanMessage('');
        },
        () => {
          // Fallback if permission denied
          setUserLocation('São Paulo, SP (Região Central)');
          setIsScanning(false);
          setScanMessage('');
        },
        { timeout: 6000 }
      );
    }
  };

  // Trigger active search / radar sweep for the typed location
  const handlePerformProspectingSearch = () => {
    setIsScanning(true);
    setScanMessage(`Varrendo empresas num raio de ${maxRadiusKm} km em ${userLocation || 'sua região'}...`);

    setTimeout(() => {
      const generated = generateDynamicProspects(
        userLocation || 'Sua Região',
        maxRadiusKm,
        selectedNiche
      );
      setLeads(generated);
      setIsScanning(false);
      setScanMessage('');
    }, 750);
  };

  // Filtered leads based on radius, niche, website presence, and text query
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Radius filter
      if (lead.distanceKm > maxRadiusKm) return false;

      // Niche filter
      if (selectedNiche !== 'todos' && lead.niche !== selectedNiche) return false;

      // Website status filter
      if (websiteFilter === 'sem_site' && lead.hasWebsite) return false;
      if (websiteFilter === 'com_site' && !lead.hasWebsite) return false;

      // Search query filter (company name, trade name, CNAE, neighborhood)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = lead.tradeName.toLowerCase().includes(query) || lead.companyName.toLowerCase().includes(query);
        const matchCnae = lead.cnae.toLowerCase().includes(query) || lead.cnaeDescription.toLowerCase().includes(query);
        const matchPlace = lead.neighborhood.toLowerCase().includes(query) || lead.city.toLowerCase().includes(query);
        if (!matchName && !matchCnae && !matchPlace) return false;
      }

      return true;
    });
  }, [leads, selectedNiche, maxRadiusKm, websiteFilter, searchQuery]);

  // Filtered list of CNAE niches for the list selector
  const filteredNicheList = useMemo(() => {
    if (!nicheSearchQuery.trim()) return CNAE_NICHES;
    const q = nicheSearchQuery.toLowerCase();
    return CNAE_NICHES.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.cnaeCode.toLowerCase().includes(q) ||
        n.serviceToOffer.toLowerCase().includes(q)
    );
  }, [nicheSearchQuery]);

  // Current selected niche object
  const currentNicheObj = useMemo(() => {
    return CNAE_NICHES.find((n) => n.id === selectedNiche) || CNAE_NICHES[0];
  }, [selectedNiche]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredLeads.length;
    const withoutSite = filteredLeads.filter((l) => !l.hasWebsite).length;
    const withSite = filteredLeads.filter((l) => l.hasWebsite).length;
    const totalEstimatedLoss = filteredLeads.reduce((acc, curr) => acc + curr.estimatedMonthlyLoss, 0);

    return { total, withoutSite, withSite, totalEstimatedLoss };
  }, [filteredLeads]);

  // Copy proposal text
  const handleCopyPitch = (lead: ProspectLead) => {
    navigator.clipboard.writeText(lead.customPitch);
    setCopiedPitchId(lead.id);
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  // Open WhatsApp with prefilled message
  const handleWhatsAppContact = (lead: ProspectLead) => {
    if (onOpenWhatsAppWithMessage) {
      onOpenWhatsAppWithMessage(lead.customPitch);
    } else {
      const cleanPhone = lead.whatsappDirect.replace(/\D/g, '');
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lead.customPitch)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Empresa',
      'Razão Social',
      'CNPJ',
      'CNAE',
      'Distância (km)',
      'Bairro',
      'Cidade',
      'Telefone',
      'Tem Site',
      'URL Atual',
      'Diagnóstico / O que falta',
      'Perda Estimada Mês (R$)',
      'Proposta Comercial Pronta',
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.tradeName}"`,
      `"${l.companyName}"`,
      `"${l.cnpj}"`,
      `"${l.cnae}"`,
      l.distanceKm,
      `"${l.neighborhood}"`,
      `"${l.city}"`,
      `"${l.phone}"`,
      l.hasWebsite ? 'SIM' : 'NÃO',
      l.websiteUrl ? `"${l.websiteUrl}"` : 'Nenhum',
      `"${l.auditDetails.keyWeakness}"`,
      l.estimatedMonthlyLoss,
      `"${l.customPitch.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `prospeccao_clientes_${userLocation.slice(0, 15).replace(/\s+/g, '_')}_${maxRadiusKm}km.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="prospeccao-ativa" className="relative pt-6 pb-20 overflow-hidden bg-[#090b0c] text-slate-100">
      
      {/* Three.js 3D Animated Dissolving Globe Background */}
      {show3dBackground && (
        <TechGlobeCanvas 
          variant="radar" 
          intensity={0.65} 
          className="opacity-40" 
        />
      )}

      {/* Radial cyber accent light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Header Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111417]/90 border border-cyan-500/25 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase">
                <Radar className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>RADAR DE PROSPECÇÃO B2B & OPORTUNIDADES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                PROSPECÇÃO DE CLIENTES <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">POR RAIO & NICHO</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Varredura rápida em poucos cliques: encontre empresas próximas sem site (para criar presença digital do zero) e com sites antigos (para oferecer redesign e modernização com WhatsApp).
              </p>
            </div>

            {/* Quick Actions (3D Toggle & Export CSV) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShow3dBackground(!show3dBackground)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border transition-all flex items-center gap-2 cursor-pointer ${
                  show3dBackground 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm' 
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
                title="Ativar/Desativar Fundo 3D do Globo Tecnológico"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Globo 3D: {show3dBackground ? 'Ligado' : 'Desligado'}</span>
              </button>

              <button
                onClick={handleExportCsv}
                disabled={filteredLeads.length === 0}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10 disabled:opacity-40"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Exportar Lista CSV ({filteredLeads.length})</span>
              </button>
            </div>

          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 mt-6">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-slate-400 text-xs">Total Encontrado</div>
              <div className="text-2xl font-black text-white font-mono mt-0.5">{stats.total}</div>
              <div className="text-[11px] text-cyan-400">no raio de {maxRadiusKm} km</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-500/[0.08] border border-red-500/30">
              <div className="text-red-300 text-xs font-semibold">🔴 Sem Site</div>
              <div className="text-2xl font-black text-red-400 font-mono mt-0.5">{stats.withoutSite}</div>
              <div className="text-[11px] text-red-300">Criar Presença Digital</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/30">
              <div className="text-amber-300 text-xs font-semibold">🟡 Com Site Antigo</div>
              <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">{stats.withSite}</div>
              <div className="text-[11px] text-amber-300">Modernizar & Atualizar</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30">
              <div className="text-emerald-300 text-xs font-semibold">Perda Estimada/Mês</div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                R$ {(stats.totalEstimatedLoss / 1000).toFixed(0)}k
              </div>
              <div className="text-[11px] text-emerald-300">Dinheiro deixado na mesa</div>
            </div>
          </div>
        </div>

        {/* PROSPECTING COCKPIT (Simple 3-Step Flow) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#101315]/95 border border-white/10 shadow-xl space-y-6">
          
          {/* STEP 1: Location & Search */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>1. Região Desejada de Prospecção</span>
              </label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Usar Meu GPS Atual</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePerformProspectingSearch()}
                  placeholder="Digite sua cidade, bairro ou estado (ex: Campinas, SP ou Barra da Tijuca, RJ)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={handlePerformProspectingSearch}
                disabled={isScanning}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Varrendo Região...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-slate-950" />
                    <span>Buscar Clientes Agora</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* STEP 2: Radius & Presence Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            
            {/* Radius Selector Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">2. Raio Quilométrico de Busca:</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs">
                  {maxRadiusKm} km
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 3, 5, 10, 15, 25, 50].map((km) => (
                  <button
                    key={km}
                    type="button"
                    onClick={() => {
                      setMaxRadiusKm(km);
                    }}
                    className={`flex-1 min-w-[50px] py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      maxRadiusKm === km
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30 scale-105'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {km} km
                  </button>
                ))}
              </div>
            </div>

            {/* Website Presence Filter */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-200">
                3. Filtro de Presença na Internet:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setWebsiteFilter('todos')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    websiteFilter === 'todos'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  🌐 Todos
                </button>
                <button
                  type="button"
                  onClick={() => setWebsiteFilter('sem_site')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    websiteFilter === 'sem_site'
                      ? 'bg-red-500 text-white border-red-400 shadow-md shadow-red-500/30'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-red-400/50 hover:text-red-300'
                  }`}
                >
                  🔴 Sem Site
                </button>
                <button
                  type="button"
                  onClick={() => setWebsiteFilter('com_site')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    websiteFilter === 'com_site'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-400/50 hover:text-amber-300'
                  }`}
                >
                  🟡 Com Site
                </button>
              </div>
            </div>

          </div>

          {/* STEP 3: Company Type / Niche SELECTION LIST (Requested Improvement) */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-emerald-400" />
                  <span>4. Selecione o Tipo de Empresa / Nicho para Oferecer Serviço:</span>
                </label>
                <p className="text-[11px] text-slate-400">
                  Nicho ativo: <strong className="text-cyan-400">{currentNicheObj.name}</strong> · Serviço recomendado: <span className="text-emerald-300">{currentNicheObj.serviceToOffer}</span>
                </p>
              </div>

              {/* Quick search input to filter the niche list */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nicheSearchQuery}
                  onChange={(e) => setNicheSearchQuery(e.target.value)}
                  placeholder="Filtrar nicho da lista..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Scrollable, structured list of business categories */}
            <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5 rounded-2xl bg-slate-950/70 p-2.5 border border-slate-800">
              {filteredNicheList.map((niche) => {
                const isSelected = selectedNiche === niche.id;
                return (
                  <div
                    key={niche.id}
                    onClick={() => {
                      setSelectedNiche(niche.id);
                    }}
                    className={`p-3 rounded-xl transition-all cursor-pointer border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-md ring-1 ring-cyan-400/50'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 shrink-0">
                        {niche.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {niche.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            CNAE {niche.cnaeCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-emerald-400/90 font-medium flex items-center gap-1 mt-0.5">
                          <span>💡 Oferecer:</span>
                          <span className="text-slate-300">{niche.serviceToOffer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {isSelected ? (
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 font-bold text-[11px] inline-flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selecionado</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">
                          Selecionar
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* SCANNING NOTIFICATION */}
        {isScanning && (
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-3 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-cyan-400" />
            <div className="font-semibold">{scanMessage || 'Varrendo base de dados e conectando aos estabelecimentos da região...'}</div>
          </div>
        )}

        {/* RESULTS HEADER & SEARCH WITHIN LEADS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Empresas Encontradas ({filteredLeads.length})</span>
              <span className="text-xs font-normal text-slate-400">
                no raio de {maxRadiusKm} km em {userLocation}
              </span>
            </h3>
          </div>

          {/* Quick search input to filter specific lead names */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome ou rua..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* LEADS LIST RESULTS */}
        {filteredLeads.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-[#111315] border border-white/10 space-y-4">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
            <div className="font-bold text-white text-base">Nenhuma empresa encontrada com os filtros atuais</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Nenhum cliente correspondeu ao filtro exato nesta distância. Você pode gerar novos clientes automaticamente ou resetar os filtros.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const fresh = generateDynamicProspects(userLocation || 'Sua Cidade', maxRadiusKm, selectedNiche);
                  setLeads(fresh);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs cursor-pointer hover:opacity-90 shadow-lg shadow-cyan-500/20"
              >
                ⚡ Encontrar 8 Novos Clientes em {userLocation || 'Sua Região'} Agora
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedNiche('todos');
                  setMaxRadiusKm(25);
                  setWebsiteFilter('todos');
                  setSearchQuery('');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs cursor-pointer hover:bg-slate-700 border border-slate-700"
              >
                Resetar Filtros
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredLeads.map((lead) => {
              const isExpanded = expandedLeadId === lead.id;
              const isCopied = copiedPitchId === lead.id;

              return (
                <div
                  key={lead.id}
                  className={`p-5 sm:p-6 rounded-3xl transition-all duration-200 border ${
                    !lead.hasWebsite
                      ? 'bg-[#121417] border-red-500/30 hover:border-red-500/60 shadow-lg shadow-red-950/10'
                      : 'bg-[#121417] border-amber-500/30 hover:border-amber-500/60 shadow-lg shadow-amber-950/10'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Top Row: Badges & Distance */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Badge */}
                        {!lead.hasWebsite ? (
                          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[11px] font-bold font-mono inline-flex items-center gap-1.5">
                            <XCircle className="w-3.5 h-3.5 text-red-400" />
                            <span>SEM SITE (CRIAR PRESENÇA DIGITAL DO ZERO)</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold font-mono inline-flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span>COM SITE ANTIGO (PRECISA DE MODERNIZAÇÃO)</span>
                          </span>
                        )}

                        {/* Distance Badge */}
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 text-[11px] font-mono border border-slate-700 inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{lead.distanceKm} km de distância</span>
                        </span>

                        {/* CNAE Tag */}
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800">
                          CNAE {lead.cnae}
                        </span>
                      </div>

                      {/* Loss estimate */}
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Perda estimada:</span>
                        <span className="text-sm font-black text-emerald-400 font-mono">
                          - R$ {lead.estimatedMonthlyLoss.toLocaleString('pt-BR')}/mês
                        </span>
                      </div>

                    </div>

                    {/* Company Details */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-black text-white">
                        {lead.tradeName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lead.companyName} · CNPJ: {lead.cnpj}
                      </p>
                      <p className="text-xs text-slate-300 mt-1">
                        📍 {lead.address}, {lead.neighborhood} - {lead.city}/{lead.state} · 📞 {lead.phone}
                      </p>
                    </div>

                    {/* What to offer & Main Problem */}
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">⚠️ Problema Detectado:</span>
                        <span className="text-slate-300">{lead.auditDetails.keyWeakness}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">💡 O que Oferecer:</span>
                        <span className="text-emerald-200 font-medium">{lead.auditDetails.conversionOpportunity}</span>
                      </div>
                    </div>

                    {/* Action Buttons: Copy Pitch & WhatsApp */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                      
                      {/* WhatsApp Direct Action Button */}
                      <button
                        type="button"
                        onClick={() => handleWhatsAppContact(lead)}
                        className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-950" />
                        <span>Chamar no WhatsApp ({lead.phone})</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {/* Copy Pitch Button */}
                        <button
                          type="button"
                          onClick={() => handleCopyPitch(lead)}
                          className="flex-1 sm:flex-none py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Proposta Copiada!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Copiar Proposta Pronta</span>
                            </>
                          )}
                        </button>

                        {/* Expand / Details Toggle */}
                        <button
                          type="button"
                          onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                          className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-medium cursor-pointer"
                        >
                          {isExpanded ? 'Ocultar Análise' : 'Ver Análise Completa'}
                        </button>
                      </div>

                    </div>

                    {/* Expanded Audit & Pitch Details */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-800 space-y-3 animate-fade-in text-xs">
                        
                        {/* Technical Checklist */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className={`p-2.5 rounded-xl border ${lead.auditDetails.sslActive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                            <div className="text-[10px] uppercase font-bold">Segurança SSL</div>
                            <div className="font-semibold text-xs mt-0.5">{lead.auditDetails.sslActive ? 'Ativo (HTTPS)' : 'Sem SSL / Inseguro'}</div>
                          </div>

                          <div className={`p-2.5 rounded-xl border ${lead.auditDetails.mobileFriendly ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                            <div className="text-[10px] uppercase font-bold">Adaptação Celular</div>
                            <div className="font-semibold text-xs mt-0.5">{lead.auditDetails.mobileFriendly ? 'Responsivo' : 'Não abre bem no celular'}</div>
                          </div>

                          <div className="p-2.5 rounded-xl border bg-slate-900 border-slate-800 text-slate-300">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Velocidade</div>
                            <div className="font-semibold text-xs mt-0.5">{lead.auditDetails.loadSpeedSeconds > 0 ? `${lead.auditDetails.loadSpeedSeconds}s de carga` : 'Sem site'}</div>
                          </div>

                          <div className="p-2.5 rounded-xl border bg-slate-900 border-slate-800 text-slate-300">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Lighthouse Score</div>
                            <div className="font-semibold text-xs mt-0.5 font-mono">{lead.auditDetails.googleLighthouseScore}/100</div>
                          </div>
                        </div>

                        {/* Ready-to-send Pitch Box */}
                        <div className="p-3.5 rounded-2xl bg-[#090b0c] border border-cyan-500/30 space-y-2">
                          <div className="flex items-center justify-between text-cyan-400 font-bold text-[11px]">
                            <span>📜 Proposta Comercial Personalizada (Pronta para Enviar):</span>
                            <button
                              type="button"
                              onClick={() => handleCopyPitch(lead)}
                              className="text-xs text-cyan-300 hover:underline cursor-pointer inline-flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{isCopied ? 'Copiado!' : 'Copiar Texto'}</span>
                            </button>
                          </div>
                          <p className="text-slate-300 leading-relaxed italic bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-[11px]">
                            "{lead.customPitch}"
                          </p>
                        </div>

                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
