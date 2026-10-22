import React, { useState } from 'react';
import { WORKFLOW_NODES } from '../data/services';
import { 
  Workflow, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  CreditCard,
  ShoppingCart,
  Truck,
  UserPlus,
  FileText,
  Bell,
  Database
} from 'lucide-react';

interface AutomationBuilderProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const AutomationBuilder: React.FC<AutomationBuilderProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [selectedTrigger, setSelectedTrigger] = useState(WORKFLOW_NODES.triggers[0]);
  const [selectedActions, setSelectedActions] = useState([
    WORKFLOW_NODES.actions[0],
    WORKFLOW_NODES.actions[1]
  ]);

  const addAction = (action: typeof WORKFLOW_NODES.actions[0]) => {
    if (!selectedActions.find(a => a.id === action.id)) {
      setSelectedActions([...selectedActions, action]);
    }
  };

  const removeAction = (id: string) => {
    if (selectedActions.length > 1) {
      setSelectedActions(selectedActions.filter(a => a.id !== id));
    }
  };

  const totalHoursSaved = selectedActions.reduce((sum, act) => sum + act.hoursSaved, 0);

  const handleSendToWhatsApp = () => {
    const actionNames = selectedActions.map(a => a.name).join(', ');
    const msg = `Olá Luciano! Simulei uma automação no seu site:\n- *Gatilho:* ${selectedTrigger.name} (${selectedTrigger.platform})\n- *Ações:* ${actionNames}\n- *Economia Estimada:* ~${totalHoursSaved}h/mês.\nGostaria de um orçamento para implementar este fluxo!`;
    onOpenWhatsAppWithMessage(msg);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4 text-teal-400" />;
      case 'Truck': return <Truck className="w-4 h-4 text-cyan-400" />;
      case 'UserPlus': return <UserPlus className="w-4 h-4 text-emerald-400" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case 'FileText': return <FileText className="w-4 h-4 text-teal-400" />;
      case 'Bell': return <Bell className="w-4 h-4 text-amber-400" />;
      case 'Database': return <Database className="w-4 h-4 text-cyan-400" />;
      default: return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="automacoes" className="py-20 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Workflow className="w-3.5 h-3.5" />
            <span>Simulador Interativo n8n / Make</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Monte Sua Automação & Veja o Tempo Economizado
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Selecione o evento disparador (Gatilho) e conecte os módulos de ação para calcular a economia de horas da sua equipe.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Node Selector Panel (Left - 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Select Trigger */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider block">
                1. Escolha o Gatilho (Disparador)
              </span>
              <div className="grid grid-cols-1 gap-2">
                {WORKFLOW_NODES.triggers.map((trig) => (
                  <button
                    key={trig.id}
                    onClick={() => setSelectedTrigger(trig)}
                    className={`flex items-center justify-between p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedTrigger.id === trig.id
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {renderIcon(trig.icon)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{trig.name}</div>
                        <div className="text-[11px] text-slate-400">{trig.platform}</div>
                      </div>
                    </div>
                    {selectedTrigger.id === trig.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 1.5: Configure AI Auto-Response (New) */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block">
                1.5. Configurar Resposta IA Automática
              </span>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-xs text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Personalização automática com nome do cliente</span>
                </div>
                <textarea
                  placeholder="Olá {{cliente_nome}}, recebemos seu contato! Como posso te ajudar hoje?"
                  className="w-full h-24 p-3 bg-slate-900 rounded-lg text-xs text-slate-200 border border-slate-700 focus:border-cyan-500 transition-all resize-none"
                />
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Use {{cliente_nome}} para variável</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" className="accent-cyan-500" defaultChecked />
                    Ativar IA
                  </label>
                </div>
              </div>
            </div>

            {/* Step 2: Add Action Nodes */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono font-semibold text-teal-400 uppercase tracking-wider block">
                2. Adicionar Módulos de Ação
              </span>
              <div className="grid grid-cols-1 gap-2">
                {WORKFLOW_NODES.actions.map((act) => {
                  const isAdded = !!selectedActions.find(a => a.id === act.id);
                  return (
                    <button
                      key={act.id}
                      onClick={() => addAction(act)}
                      disabled={isAdded}
                      className={`flex items-center justify-between p-3 rounded-xl text-left border transition-all ${
                        isAdded
                          ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed opacity-60'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-teal-500/50 hover:bg-slate-900 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          {renderIcon(act.icon)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{act.name}</div>
                          <div className="text-[11px] text-slate-400">{act.platform}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-1.5 py-0.5 rounded">
                          +{act.hoursSaved}h/mês
                        </span>
                        {!isAdded && <Plus className="w-4 h-4 text-teal-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Live Workflow Visual Canvas (Right - 7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-sm font-bold text-white font-mono">
                  Fluxo n8n Ativo · Visualizador
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {selectedActions.length + 1} Módulos Conectados
              </span>
            </div>

            {/* Visual Node Chain Flow */}
            <div className="space-y-4 py-2">
              
              {/* Trigger Node Display */}
              <div className="p-4 rounded-xl bg-slate-950 border-2 border-emerald-500/60 shadow-lg shadow-emerald-950/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {renderIcon(selectedTrigger.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      GATILHO DE ENTRADA
                    </span>
                    <h4 className="text-sm font-bold text-white">{selectedTrigger.name}</h4>
                    <p className="text-xs text-slate-400">{selectedTrigger.description}</p>
                  </div>
                </div>
                <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {selectedTrigger.platform}
                </span>
              </div>

              {/* Connecting Arrow */}
              <div className="flex justify-center my-1">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-emerald-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
              </div>

              {/* Actions Chain */}
              {selectedActions.map((act, index) => (
                <React.Fragment key={act.id}>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between group hover:border-teal-500/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-slate-900 text-teal-400 border border-slate-800">
                        {renderIcon(act.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-semibold block">
                          AÇÃO #{index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{act.name}</h4>
                        <p className="text-xs text-slate-400">{act.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                        +{act.hoursSaved}h/mês
                      </span>
                      {selectedActions.length > 1 && (
                        <button
                          onClick={() => removeAction(act.id)}
                          className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors cursor-pointer"
                          title="Remover ação"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {index < selectedActions.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div className="w-0.5 h-4 bg-teal-500/30"></div>
                    </div>
                  )}
                </React.Fragment>
              ))}

            </div>

            {/* Impact Calculation Bar */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-300">Economia Estimada para sua Equipe:</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    ~{totalHoursSaved} horas operacionais / mês
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-md shadow-emerald-500/20 cursor-pointer shrink-0"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Orçar Este Fluxo no WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
