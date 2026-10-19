import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  Filter, 
  DollarSign, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Building, 
  Phone, 
  Mail, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

export type CrmStage = 
  | 'Novo Lead'
  | 'Contato Iniciado'
  | 'Proposta Enviada'
  | 'Negociação'
  | 'Fechado'
  | 'Perdido';

export interface CrmDeal {
  id: string;
  empresa: string;
  contatoNome: string;
  telefone: string;
  email: string;
  nicho: string;
  cidade: string;
  valor: number;
  stage: CrmStage;
  servico: string;
  dataCriacao: string;
  observacoes: string;
}

const INITIAL_DEALS: CrmDeal[] = [
  {
    id: '1',
    empresa: 'Clínica OdontoPrime',
    contatoNome: 'Dr. Fernando Mendes',
    telefone: '(11) 98765-4321',
    email: 'contato@odontoprime.com.br',
    nicho: 'Odontologia',
    cidade: 'Itupeva, SP',
    valor: 2800,
    stage: 'Novo Lead',
    servico: 'Website de Conversão + Bot WhatsApp',
    dataCriacao: 'Ontem',
    observacoes: 'Detectado sem site no Google Maps. Alta urgência.'
  },
  {
    id: '2',
    empresa: 'Restaurante Sabor da Vila',
    contatoNome: 'Marcos Silveira',
    telefone: '(11) 97123-8899',
    email: 'marcos@sabordavila.com',
    nicho: 'Gastronomia',
    cidade: 'Itupeva, SP',
    valor: 3500,
    stage: 'Contato Iniciado',
    servico: 'Cardápio Digital + Postagens Instagram',
    dataCriacao: '14/04/2024',
    observacoes: 'Primeiro contato realizado via WhatsApp. Pediu demonstração.'
  },
  {
    id: '3',
    empresa: 'Advocacia Tavares & Associados',
    contatoNome: 'Dra. Camila Tavares',
    telefone: '(11) 99234-5566',
    email: 'camila@tavaresadv.com.br',
    nicho: 'Advocacia',
    cidade: 'Jundiaí, SP',
    valor: 4200,
    stage: 'Proposta Enviada',
    servico: 'Portal Jurídico + CRM Integrado',
    dataCriacao: '12/04/2024',
    observacoes: 'Proposta de R$ 4.200 enviada por PDF e WhatsApp.'
  },
  {
    id: '4',
    empresa: 'Bella Estética Avançada',
    contatoNome: 'Juliana Costa',
    telefone: '(11) 98345-6789',
    email: 'juliana@bellaestetica.com',
    nicho: 'Estética',
    cidade: 'Itupeva, SP',
    valor: 2500,
    stage: 'Negociação',
    servico: 'Gestão Instagram + Bot de Agendamento',
    dataCriacao: '10/04/2024',
    observacoes: 'Alinhando formas de pagamento em 3 parcelas.'
  },
  {
    id: '5',
    empresa: 'SOS Cuidadores Portal',
    contatoNome: 'Coordenação Regional',
    telefone: '(11) 99441-1307',
    email: 'atendimento@soscuidadores.com',
    nicho: 'Saúde & Cuidadores',
    cidade: 'São Paulo, SP',
    valor: 15000,
    stage: 'Fechado',
    servico: 'Ecossistema Completo + Telegram Bot',
    dataCriacao: '05/04/2024',
    observacoes: 'Contrato ativo e integrado em produção!'
  },
  {
    id: '6',
    empresa: 'Mecânica Express Auto',
    contatoNome: 'Rogério Lima',
    telefone: '(11) 96543-2109',
    email: 'rogerio@expressauto.com',
    nicho: 'Automotivo',
    cidade: 'Itupeva, SP',
    valor: 1800,
    stage: 'Perdido',
    servico: 'Website Institucional',
    dataCriacao: '01/04/2024',
    observacoes: 'Optou por adiar investimentos para o próximo trimestre.'
  }
];

const COLUMNS: { stage: CrmStage; color: string; badgeBg: string }[] = [
  { stage: 'Novo Lead', color: 'border-cyan-500/40 text-cyan-400', badgeBg: 'bg-cyan-500/10' },
  { stage: 'Contato Iniciado', color: 'border-blue-500/40 text-blue-400', badgeBg: 'bg-blue-500/10' },
  { stage: 'Proposta Enviada', color: 'border-amber-500/40 text-amber-400', badgeBg: 'bg-amber-500/10' },
  { stage: 'Negociação', color: 'border-purple-500/40 text-purple-400', badgeBg: 'bg-purple-500/10' },
  { stage: 'Fechado', color: 'border-emerald-500/40 text-emerald-400', badgeBg: 'bg-emerald-500/10' },
  { stage: 'Perdido', color: 'border-red-500/40 text-red-400', badgeBg: 'bg-red-500/10' },
];

export const CrmPipelineScreen: React.FC = () => {
  const [deals, setDeals] = useState<CrmDeal[]>(() => {
    try {
      const saved = localStorage.getItem('foco_crm_deals_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_DEALS;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newDeal, setNewDeal] = useState<Partial<CrmDeal>>({
    empresa: '',
    contatoNome: '',
    telefone: '',
    email: '',
    nicho: 'Odontologia',
    cidade: 'Itupeva, SP',
    valor: 2500,
    stage: 'Novo Lead',
    servico: 'Website de Conversão',
    observacoes: ''
  });

  // Save to localStorage
  const updateDeals = (updated: CrmDeal[]) => {
    setDeals(updated);
    localStorage.setItem('foco_crm_deals_v1', JSON.stringify(updated));
  };

  const filteredDeals = useMemo(() => {
    if (!searchTerm.trim()) return deals;
    const q = searchTerm.toLowerCase();
    return deals.filter(d => 
      d.empresa.toLowerCase().includes(q) ||
      d.contatoNome.toLowerCase().includes(q) ||
      d.servico.toLowerCase().includes(q) ||
      d.nicho.toLowerCase().includes(q)
    );
  }, [deals, searchTerm]);

  const moveDeal = (id: string, newStage: CrmStage) => {
    const updated = deals.map(d => d.id === id ? { ...d, stage: newStage } : d);
    updateDeals(updated);
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.empresa) return;

    const deal: CrmDeal = {
      id: Date.now().toString(),
      empresa: newDeal.empresa || 'Nova Empresa',
      contatoNome: newDeal.contatoNome || 'Responsável',
      telefone: newDeal.telefone || '(11) 99999-9999',
      email: newDeal.email || 'contato@empresa.com.br',
      nicho: newDeal.nicho || 'Geral',
      cidade: newDeal.cidade || 'Itupeva, SP',
      valor: Number(newDeal.valor) || 2500,
      stage: (newDeal.stage as CrmStage) || 'Novo Lead',
      servico: newDeal.servico || 'Website de Conversão',
      dataCriacao: 'Hoje',
      observacoes: newDeal.observacoes || ''
    };

    updateDeals([deal, ...deals]);
    setIsAddModalOpen(false);
    setNewDeal({
      empresa: '',
      contatoNome: '',
      telefone: '',
      email: '',
      nicho: 'Odontologia',
      cidade: 'Itupeva, SP',
      valor: 2500,
      stage: 'Novo Lead',
      servico: 'Website de Conversão',
      observacoes: ''
    });
  };

  // Pipeline Metrics
  const totalPipelineValue = deals
    .filter(d => d.stage !== 'Perdido')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const closedValue = deals
    .filter(d => d.stage === 'Fechado')
    .reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Title & Stats Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121518] via-[#101316] to-[#0c0e10] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>PIPELINE COMERCIAL DE VENDAS (6 ETAPAS)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Pipeline de Vendas & Gestão de Propostas
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Acompanhe o funil de negócios completo: do primeiro contato com leads qualificados da prospecção até o fechamento contratual.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 rounded-xl font-bold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Lead / Proposta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121517] border border-cyan-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Total de Leads Ativos</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">{deals.length}</div>
          <div className="text-[10px] text-cyan-400 font-mono">Em todas as 6 colunas</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121517] border border-amber-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Valor em Negociação</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-sans">
            R$ {totalPipelineValue.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-amber-300 font-mono">Pipeline aberto total</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121517] border border-emerald-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Receita Fechada</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-sans">
            R$ {closedValue.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-emerald-300 font-mono">Contratos assinados</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121517] border border-purple-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Taxa de Conversão</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-sans">
            {deals.length > 0 ? Math.round((deals.filter(d => d.stage === 'Fechado').length / deals.length) * 100) : 0}%
          </div>
          <div className="text-[10px] text-purple-300 font-mono">Leads em fechamento</div>
        </div>
      </div>

      {/* Search Bar for Contacts & Proposals */}
      <div className="p-4 rounded-2xl bg-[#121517] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por empresa, contato, serviço ou nicho..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="text-xs font-mono text-slate-400">
          Exibindo {filteredDeals.length} de {deals.length} propostas no funil
        </div>
      </div>

      {/* 6 Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
        {COLUMNS.map((col) => {
          const colDeals = filteredDeals.filter(d => d.stage === col.stage);
          const colTotal = colDeals.reduce((sum, item) => sum + item.valor, 0);

          return (
            <div 
              key={col.stage}
              className={`rounded-2xl bg-[#101214] border ${col.color} p-4 space-y-3 min-h-[500px] flex flex-col justify-between`}
            >
              {/* Column Header */}
              <div className="space-y-1 pb-2 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    {col.stage}
                  </h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${col.badgeBg}`}>
                    {colDeals.length}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  R$ {colTotal.toLocaleString('pt-BR')}
                </div>
              </div>

              {/* Cards in this column */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {colDeals.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-[11px] text-slate-500 font-mono">
                    Nenhum lead nesta etapa
                  </div>
                ) : (
                  colDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 rounded-xl bg-[#14171a] border border-white/10 hover:border-cyan-500/40 transition-all space-y-2.5 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white font-sans leading-tight">
                          {deal.empresa}
                        </h4>
                        <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">
                          R$ {deal.valor.toLocaleString('pt-BR')}
                        </span>
                      </div>

                      <div className="text-[10px] font-mono text-slate-400">
                        {deal.contatoNome} · {deal.cidade}
                      </div>

                      <div className="text-[11px] text-cyan-300 font-medium">
                        {deal.servico}
                      </div>

                      {deal.observacoes && (
                        <p className="text-[10px] text-slate-400 italic bg-black/30 p-2 rounded-lg border border-white/5">
                          "{deal.observacoes}"
                        </p>
                      )}

                      {/* Quick stage selector */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                        <select
                          value={deal.stage}
                          onChange={(e) => moveDeal(deal.id, e.target.value as CrmStage)}
                          className="w-full text-[10px] font-mono bg-slate-900 border border-white/10 text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-cyan-400"
                        >
                          {COLUMNS.map(c => (
                            <option key={c.stage} value={c.stage}>{c.stage}</option>
                          ))}
                        </select>
                      </div>

                      {/* WhatsApp trigger */}
                      <div className="pt-1 flex items-center justify-between">
                        <a
                          href={`https://wa.me/${deal.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${deal.contatoNome}, aqui é o Luciano do Foco em Dados! Gostaria de conversar sobre a proposta de ${deal.servico}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                        >
                          <Send className="w-2.5 h-2.5" />
                          <span>Chamar no WhatsApp</span>
                        </a>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Quick Add Button */}
              <button
                onClick={() => {
                  setNewDeal(prev => ({ ...prev, stage: col.stage }));
                  setIsAddModalOpen(true);
                }}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-[11px] font-mono flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>+ Lead</span>
              </button>

            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#121517] border border-cyan-500/40 p-6 sm:p-8 space-y-5 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white uppercase font-sans flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Adicionar Proposta ao Funil</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Nome da Empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Clínica Sorriso Real"
                    value={newDeal.empresa}
                    onChange={(e) => setNewDeal({ ...newDeal, empresa: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Nome do Contato</label>
                  <input
                    type="text"
                    placeholder="Ex: Dr. Roberto"
                    value={newDeal.contatoNome}
                    onChange={(e) => setNewDeal({ ...newDeal, contatoNome: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={newDeal.telefone}
                    onChange={(e) => setNewDeal({ ...newDeal, telefone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Valor da Proposta (R$)</label>
                  <input
                    type="number"
                    value={newDeal.valor}
                    onChange={(e) => setNewDeal({ ...newDeal, valor: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Etapa Inicial</label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value as CrmStage })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white"
                  >
                    {COLUMNS.map(c => (
                      <option key={c.stage} value={c.stage}>{c.stage}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Serviço Oferecido</label>
                  <input
                    type="text"
                    placeholder="Ex: Website + Automação"
                    value={newDeal.servico}
                    onChange={(e) => setNewDeal({ ...newDeal, servico: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">Observações / Anotações</label>
                <textarea
                  rows={2}
                  placeholder="Informações adicionais do lead..."
                  value={newDeal.observacoes}
                  onChange={(e) => setNewDeal({ ...newDeal, observacoes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono text-xs uppercase cursor-pointer"
                >
                  Salvar no CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
