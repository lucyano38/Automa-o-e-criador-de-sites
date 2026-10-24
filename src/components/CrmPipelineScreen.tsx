import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  Filter, 
  Send, 
  X
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  ultimaInteracao: string;
  observacoes: string;
}

const INITIAL_DEALS: CrmDeal[] = [
  { id: '1', empresa: 'Clínica OdontoPrime', contatoNome: 'Dr. Fernando Mendes', telefone: '(11) 98765-4321', email: 'contato@odontoprime.com.br', nicho: 'Odontologia', cidade: 'Itupeva, SP', valor: 2800, stage: 'Novo Lead', servico: 'Website de Conversão + Bot WhatsApp', dataCriacao: 'Ontem', ultimaInteracao: 'Ontem', observacoes: 'Detectado sem site no Google Maps. Alta urgência.' },
  { id: '2', empresa: 'Restaurante Sabor da Vila', contatoNome: 'Marcos Silveira', telefone: '(11) 97123-8899', email: 'marcos@sabordavila.com', nicho: 'Gastronomia', cidade: 'Itupeva, SP', valor: 3500, stage: 'Contato Iniciado', servico: 'Cardápio Digital + Postagens Instagram', dataCriacao: '14/04/2024', ultimaInteracao: 'Hoje', observacoes: 'Primeiro contato realizado via WhatsApp. Pediu demonstração.' },
  { id: '3', empresa: 'Advocacia Tavares & Associados', contatoNome: 'Dra. Camila Tavares', telefone: '(11) 99234-5566', email: 'camila@tavaresadv.com.br', nicho: 'Advocacia', cidade: 'Jundiaí, SP', valor: 4200, stage: 'Proposta Enviada', servico: 'Portal Jurídico + CRM Integrado', dataCriacao: '12/04/2024', ultimaInteracao: 'Há 2 dias', observacoes: 'Proposta de R$ 4.200 enviada por PDF e WhatsApp.' },
  { id: '4', empresa: 'Bella Estética Avançada', contatoNome: 'Juliana Costa', telefone: '(11) 98345-6789', email: 'juliana@bellaestetica.com', nicho: 'Estética', cidade: 'Itupeva, SP', valor: 2500, stage: 'Negociação', servico: 'Gestão Instagram + Bot de Agendamento', dataCriacao: '10/04/2024', ultimaInteracao: 'Hoje', observacoes: 'Alinhando formas de pagamento em 3 parcelas.' },
  { id: '5', empresa: 'SOS Cuidadores Portal', contatoNome: 'Coordenação Regional', telefone: '(11) 99441-1307', email: 'atendimento@soscuidadores.com', nicho: 'Saúde & Cuidadores', cidade: 'São Paulo, SP', valor: 15000, stage: 'Fechado', servico: 'Ecossistema Completo + Telegram Bot', dataCriacao: '05/04/2024', ultimaInteracao: 'Há 1 semana', observacoes: 'Contrato ativo e integrado em produção!' },
  { id: '6', empresa: 'Mecânica Express Auto', contatoNome: 'Rogério Lima', telefone: '(11) 96543-2109', email: 'rogerio@expressauto.com', nicho: 'Automotivo', cidade: 'Itupeva, SP', valor: 1800, stage: 'Perdido', servico: 'Website Institucional', dataCriacao: '01/04/2024', ultimaInteracao: 'Há 2 semanas', observacoes: 'Optou por adiar investimentos para o próximo trimestre.' }
];

const COLUMNS: { stage: CrmStage; color: string; badgeBg: string }[] = [
  { stage: 'Novo Lead', color: 'border-cyan-500/40 text-cyan-400', badgeBg: 'bg-cyan-500/10' },
  { stage: 'Contato Iniciado', color: 'border-blue-500/40 text-blue-400', badgeBg: 'bg-blue-500/10' },
  { stage: 'Proposta Enviada', color: 'border-amber-500/40 text-amber-400', badgeBg: 'bg-amber-500/10' },
  { stage: 'Negociação', color: 'border-purple-500/40 text-purple-400', badgeBg: 'bg-purple-500/10' },
  { stage: 'Fechado', color: 'border-emerald-500/40 text-emerald-400', badgeBg: 'bg-emerald-500/10' },
  { stage: 'Perdido', color: 'border-red-500/40 text-red-400', badgeBg: 'bg-red-500/10' },
];

const SortableDealCard = ({ deal }: { deal: CrmDeal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: deal.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners} className="p-4 rounded-xl bg-[#14171a] border border-white/10 hover:border-cyan-500/40 transition-all space-y-2.5 shadow-md cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between gap-1">
        <h4 className="text-xs font-bold text-white font-sans leading-tight">{deal.empresa}</h4>
        <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">R$ {deal.valor.toLocaleString('pt-BR')}</span>
      </div>
      <div className="text-[10px] font-mono text-slate-400">{deal.contatoNome} · {deal.cidade}</div>
      <div className="text-[10px] font-mono text-cyan-500">Última interação: {deal.ultimaInteracao}</div>
      <div className="text-[11px] text-cyan-300 font-medium">{deal.servico}</div>
      {deal.observacoes && <p className="text-[10px] text-slate-400 italic bg-black/30 p-2 rounded-lg border border-white/5">"{deal.observacoes}"</p>}
      <a href={`https://wa.me/${(deal.telefone || '').replace(/\D/g, '').replace(/^(?:55)?(\d{10,11})$/, '55$1')}`} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold">
        <Send className="w-2.5 h-2.5" /> Chamar no WhatsApp
      </a>
    </div>
  );
};

export const CrmPipelineScreen: React.FC = () => {
  const [deals, setDeals] = useState<CrmDeal[]>(() => {
    try {
      const saved = localStorage.getItem('foco_crm_deals_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.map((d: any) => ({ ...d, ultimaInteracao: d.ultimaInteracao || 'Nunca' }));
      }
    } catch {}
    return INITIAL_DEALS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<CrmStage | 'Todos'>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDeal, setNewDeal] = useState<Partial<CrmDeal>>({ empresa: '', contatoNome: '', telefone: '', email: '', nicho: 'Odontologia', cidade: 'Itupeva, SP', valor: 2500, stage: 'Novo Lead', servico: 'Website de Conversão', ultimaInteracao: 'Hoje', observacoes: '' });

  const updateDeals = (updated: CrmDeal[]) => {
    setDeals(updated);
    localStorage.setItem('foco_crm_deals_v1', JSON.stringify(updated));
  };

  const filteredDeals = useMemo(() => {
    let result = deals;
    if (stageFilter !== 'Todos') result = result.filter(d => d.stage === stageFilter);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(d => d.empresa.toLowerCase().includes(q) || d.contatoNome.toLowerCase().includes(q) || d.servico.toLowerCase().includes(q) || d.nicho.toLowerCase().includes(q));
    }
    return result;
  }, [deals, searchTerm, stageFilter]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeDeal = deals.find((d) => d.id === active.id);
      const overDeal = deals.find((d) => d.id === over.id);
      const newStage = overDeal ? overDeal.stage : (over.id as CrmStage);
      if (activeDeal && activeDeal.stage !== newStage) {
        updateDeals(deals.map(d => d.id === active.id ? { ...d, stage: newStage, ultimaInteracao: 'Hoje' } : d));
      }
    }
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="space-y-8 animate-fade-in pb-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121518] via-[#101316] to-[#0c0e10] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Pipeline de Vendas</h1>
            <button onClick={() => setIsAddModalOpen(true)} className="px-5 py-3 rounded-xl font-bold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Adicionar Lead
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121517] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white" />
          </div>
          <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value as CrmStage | 'Todos')} className="w-full sm:w-40 px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white">
            <option value="Todos">Todos</option>
            {COLUMNS.map(c => <option key={c.stage} value={c.stage}>{c.stage}</option>)}
          </select>
        </div>

        <div className="crm-pipeline-container flex flex-row md:grid md:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible pb-4 items-start">
          {COLUMNS.map((col) => {
            const colDeals = filteredDeals.filter(d => d.stage === col.stage);
            return (
              <div key={col.stage} className={`rounded-2xl bg-[#101214] border ${col.color} p-4 space-y-3 min-h-[500px] flex flex-col flex-shrink-0 min-w-[300px] overflow-hidden`}>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white pb-2 border-b border-white/10">{col.stage} ({colDeals.length})</h3>
                <SortableContext items={colDeals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                    {colDeals.map((deal) => <SortableDealCard key={deal.id} deal={deal} />)}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};
