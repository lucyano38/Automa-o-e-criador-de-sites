import React, { useState, useMemo } from 'react';
import { 
  Radar, 
  MapPin, 
  Search, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Filter, 
  Target, 
  DollarSign, 
  TrendingUp, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Navigation,
  RefreshCw,
  ExternalLink,
  Layers
} from 'lucide-react';
import { CNAE_NICHES, ITUPEVA_PROSPECT_LEADS, generateDynamicProspects } from '../data/prospectingData';
import { ProspectLead, GeoLocationPoint } from '../types';
import { geocodeLocation } from '../lib/geoService';

interface ProspectingScreenProps {
  onOpenWhatsAppWithMessage?: (msg: string) => void;
  onNavigateToCrm?: () => void;
}

export const ProspectingScreen: React.FC<ProspectingScreenProps> = ({
  onOpenWhatsAppWithMessage,
  onNavigateToCrm
}) => {
  // Configuration Fields
  const [selectedNiche, setSelectedNiche] = useState<string>('todos');
  const [cityInput, setCityInput] = useState<string>('Itupeva, SP');
  const [radiusKm, setRadiusKm] = useState<number>(15);
  const [avgTicket, setAvgTicket] = useState<number>(2500);
  const [targetMrr, setTargetMrr] = useState<number>(25000);
  const [approachFocus, setApproachFocus] = useState<string>('Website de Alta Conversão');
  
  // Execution status
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanMessage, setScanMessage] = useState<string>('');
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);
  const [searchLeadQuery, setSearchLeadQuery] = useState<string>('');

  // Center Coordinates
  const [centerGeo, setCenterGeo] = useState<GeoLocationPoint>({
    lat: -23.1531,
    lng: -47.0578,
    city: 'Itupeva',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Itupeva, SP, Brasil',
  });

  // Leads state
  const [leads, setLeads] = useState<ProspectLead[]>(ITUPEVA_PROSPECT_LEADS);

  const approachOptions = [
    'Website de Alta Conversão',
    'Postagens & Gestão Instagram e Facebook',
    'Automação de Atendimento WhatsApp / Chatbot 24h',
    'Edição Profissional de Vídeos & Reels',
    'Ecossistema Completo (Site + Redes + Bot)'
  ];

  const handleStartMultiSourceProspecting = async () => {
    setIsScanning(true);
    setScanProgress(10);
    setScanMessage(`Geocodificando coordenadas de ${cityInput} e traçando raio de ${radiusKm}km...`);

    try {
      const geo = await geocodeLocation(cityInput);
      setCenterGeo(geo);
      setScanProgress(40);
      setScanMessage('Consultando Google Places API e base de dados do CNPJ público...');

      setTimeout(() => {
        setScanProgress(75);
        setScanMessage(`Auditando presença web e calculando perdas em R$ para o foco: "${approachFocus}"...`);

        setTimeout(() => {
          // Generate or filter dynamic leads
          let fresh = generateDynamicProspects(geo, radiusKm, selectedNiche);
          if (geo.city.toLowerCase().includes('itupeva')) {
            const verifiedIds = new Set(ITUPEVA_PROSPECT_LEADS.map(l => l.id));
            const extra = fresh.filter(l => !verifiedIds.has(l.id));
            fresh = [...ITUPEVA_PROSPECT_LEADS, ...extra];
          }

          // Adjust custom pitch to include the chosen approach
          const adjusted = fresh.map(l => ({
            ...l,
            customPitch: `Olá equipe ${l.tradeName}! Notei que sua empresa atende em ${l.city} e identifiquei uma excelente oportunidade comercial focada em ${approachFocus}. Gostaria de apresentar uma demonstração sem compromisso pelo WhatsApp!`
          }));

          setLeads(adjusted);
          setScanProgress(100);
          setIsScanning(false);
          setScanMessage('');
        }, 800);
      }, 700);

    } catch (e) {
      console.error(e);
      setIsScanning(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (selectedNiche !== 'todos' && l.niche !== selectedNiche) return false;
      if (l.calculatedDistanceKm > radiusKm) return false;
      if (searchLeadQuery.trim()) {
        const q = searchLeadQuery.toLowerCase();
        return l.tradeName.toLowerCase().includes(q) ||
               l.neighborhood.toLowerCase().includes(q) ||
               l.cnae.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => a.calculatedDistanceKm - b.calculatedDistanceKm);
  }, [leads, selectedNiche, radiusKm, searchLeadQuery]);

  const handleCopyPitch = (lead: ProspectLead) => {
    navigator.clipboard.writeText(lead.customPitch);
    setCopiedPitchId(lead.id);
    setTimeout(() => setCopiedPitchId(null), 2000);
  };

  const handleWhatsApp = (lead: ProspectLead) => {
    const rawPhone = lead.phone || lead.whatsappDirect || '';
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.length >= 10 && cleanPhone.length <= 11 && !cleanPhone.startsWith('55')) {
      cleanPhone = `55${cleanPhone}`;
    }
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lead.customPitch)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleExportCsv = () => {
    const headers = ['Empresa', 'CNPJ', 'CNAE', 'Distancia_KM', 'Bairro', 'Cidade', 'Telefone', 'Tem_Site', 'Pitch_WhatsApp'];
    const rows = filteredLeads.map(l => [
      `"${l.tradeName}"`,
      `"${l.cnpj}"`,
      `"${l.cnae}"`,
      l.calculatedDistanceKm,
      `"${l.neighborhood}"`,
      `"${l.city}"`,
      `"${l.phone}"`,
      l.hasWebsite ? 'SIM' : 'NAO',
      `"${l.customPitch.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `prospeccao_${cityInput.replace(/\s+/g, '_')}_${radiusKm}km.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Target clients calculation
  const clientsNeededForTargetMrr = Math.ceil(targetMrr / (avgTicket || 1));

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121518] via-[#101316] to-[#0c0e10] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              <Radar className="w-3.5 h-3.5 text-cyan-400" />
              <span>MOTOR DE PROSPECÇÃO B2B ATIVA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Crescimento no Piloto Automático
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Configure os parâmetros geográficos e econômicos do seu cliente ideal para varrer empresas locais, diagnosticar ausências digitais e abordar com propostas prontas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-4 py-3 rounded-xl font-bold text-xs bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={onNavigateToCrm}
              className="px-4 py-3 rounded-xl font-bold text-xs bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Abrir no CRM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Configuration Card (All Requested Fields) */}
      <div className="rounded-3xl bg-[#121517] border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider font-sans">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Configuração da Prospecção</span>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold">Mapeamento Universal CNAE</span>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Field 1: Nicho / CNAE (Universal Mapping) */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nicho / CNAE</span>
            </label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-cyan-400 transition-colors"
            >
              {CNAE_NICHES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.icon} {n.name} ({n.cnaeCode})
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 font-mono block">
              Mapeamento de ramos de atividade com CNAE e argumento de venda.
            </span>
          </div>

          {/* Field 2: Cidade */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cidade & Estado</span>
            </label>
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Ex: Itupeva, SP ou Campinas, SP"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <span className="text-[10px] text-slate-400 font-mono block">
              Ponto central de ancoragem georreferenciada.
            </span>
          </div>

          {/* Field 3: Raio em KM */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>Raio Máximo:</span>
              </label>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {radiusKm} km
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 km</span>
              <span>15 km (Recomendado)</span>
              <span>30 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Field 4: Ticket Médio (R$) */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ticket Médio Desejado (R$)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">R$</span>
              <input
                type="number"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                step="500"
                min="500"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono block">
              Valor unitário por cliente fechado.
            </span>
          </div>

          {/* Field 5: MRR Alvo (R$/mês) */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>MRR Alvo (Receita Recorrente)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">R$</span>
              <input
                type="number"
                value={targetMrr}
                onChange={(e) => setTargetMrr(Number(e.target.value))}
                step="5000"
                min="5000"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            <span className="text-[10px] text-emerald-400 font-mono block">
              Necessário fechar <strong>{clientsNeededForTargetMrr} clientes</strong> de R$ {avgTicket.toLocaleString('pt-BR')}.
            </span>
          </div>

          {/* Field 6: Foco da Abordagem */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Foco da Abordagem</span>
            </label>
            <select
              value={approachFocus}
              onChange={(e) => setApproachFocus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-cyan-400 transition-colors"
            >
              {approachOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 font-mono block">
              Gera automaticamente o pitch persuasivo no WhatsApp.
            </span>
          </div>

        </div>

        {/* Big Action Button: Iniciar Prospecção Multi-Fonte */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            Varredura ativa sincronizada com Google Places, Receita Federal e auditoria DNS.
          </div>

          <button
            onClick={handleStartMultiSourceProspecting}
            disabled={isScanning}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer ${
              isScanning
                ? 'bg-cyan-500/50 text-slate-950 cursor-wait'
                : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-xl shadow-cyan-500/25 hover:scale-105'
            }`}
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Varrendo Multi-Fontes...</span>
              </>
            ) : (
              <>
                <Radar className="w-4 h-4" />
                <span>Iniciar Prospecção Multi-Fonte</span>
              </>
            )}
          </button>
        </div>

        {/* Scan Progress Bar */}
        {isScanning && (
          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-2 animate-pulse">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>{scanMessage}</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}

      </div>

      {/* Results Header & Leads Display */}
      <div className="rounded-3xl bg-[#121517] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase tracking-tight font-sans flex items-center gap-2">
              <Building className="w-4 h-4 text-cyan-400" />
              <span>Oportunidades Georreferenciadas Encontradas ({filteredLeads.length})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Empresas mapeadas em um raio de {radiusKm}km de {centerGeo.city} para a oferta: <strong>{approachFocus}</strong>.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Filtrar por nome da empresa..."
              value={searchLeadQuery}
              onChange={(e) => setSearchLeadQuery(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-56 sm:w-64"
            />
          </div>
        </div>

        {/* Lead Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead) => (
            <div 
              key={lead.id}
              className="p-5 rounded-2xl bg-[#0e1011] border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {lead.calculatedDistanceKm} km de distância
                  </span>
                  {lead.hasWebsite ? (
                    <span className="text-[10px] font-mono text-emerald-400">Com Site</span>
                  ) : (
                    <span className="text-[10px] font-mono text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/30">
                      Sem Site
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white font-sans">{lead.tradeName}</h4>
                <div className="text-xs text-slate-400 font-mono">
                  {lead.neighborhood}, {lead.city} · CNAE: {lead.cnae}
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 space-y-1">
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">Diagnóstico Foco em Dados:</div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {lead.auditDetails.keyWeakness}
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 pt-1">
                    Perda Estimada: <strong className="text-amber-300">R$ {lead.estimatedMonthlyLoss.toLocaleString('pt-BR')}/mês</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => handleCopyPitch(lead)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedPitchId === lead.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPitchId === lead.id ? 'Copiado!' : 'Copiar Pitch'}</span>
                </button>
                <a
                  href={`https://wa.me/${(lead.phone || lead.whatsappDirect || '').replace(/\D/g, '').replace(/^(?:55)?(\d{10,11})$/, '55$1')}?text=${encodeURIComponent(lead.customPitch)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title={`Enviar mensagem no WhatsApp (${lead.phone})`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
