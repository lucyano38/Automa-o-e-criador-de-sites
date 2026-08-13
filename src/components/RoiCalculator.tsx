import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  Globe,
  Send,
  Instagram,
  BarChart3,
  Zap,
  Workflow
} from 'lucide-react';

interface RoiCalculatorProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [projectType, setProjectType] = useState<string>('landing-page');
  const [needWhatsappBot, setNeedWhatsappBot] = useState<boolean>(true);
  const [needTelegramBot, setNeedTelegramBot] = useState<boolean>(true);
  const [needInstagramPosts, setNeedInstagramPosts] = useState<boolean>(true);
  const [needDataDashboard, setNeedDataDashboard] = useState<boolean>(false);
  const [needSystemIntegration, setNeedSystemIntegration] = useState<boolean>(true);
  const [monthlyLeads, setMonthlyLeads] = useState<number>(300);

  // Calculate pricing & time estimates dynamically based on selections
  const computeEstimates = () => {
    let basePrice = 1200; // Base landing page / site project
    let hoursSaved = 10;
    let days = 5;

    if (projectType === 'website-full') {
      basePrice += 1500;
      days += 5;
    } else if (projectType === 'platform-custom') {
      basePrice += 3200;
      days += 10;
    }

    if (needWhatsappBot) {
      basePrice += 900;
      hoursSaved += 25;
      days += 3;
    }
    if (needTelegramBot) {
      basePrice += 700;
      hoursSaved += 20;
      days += 2;
    }
    if (needInstagramPosts) {
      basePrice += 800; // Package of posts
      days += 3;
    }
    if (needDataDashboard) {
      basePrice += 1200;
      hoursSaved += 15;
      days += 4;
    }
    if (needSystemIntegration) {
      basePrice += 850;
      hoursSaved += 20;
      days += 3;
    }

    // Scale hours saved with lead volume
    const volumeMultiplier = monthlyLeads > 1000 ? 1.8 : monthlyLeads > 300 ? 1.2 : 0.8;
    const finalHoursSaved = Math.round(hoursSaved * volumeMultiplier);

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.2);

    return {
      minPrice,
      maxPrice,
      days: Math.round(days),
      hoursSaved: finalHoursSaved,
      projectedConversionBoost: '30% a 50%'
    };
  };

  const estimates = computeEstimates();

  const handleSendToWhatsApp = () => {
    const selectedFeatures = [];
    if (needWhatsappBot) selectedFeatures.push('Bot WhatsApp');
    if (needTelegramBot) selectedFeatures.push('Bot Telegram');
    if (needInstagramPosts) selectedFeatures.push('Artes Instagram');
    if (needDataDashboard) selectedFeatures.push('Dashboard de Dados');
    if (needSystemIntegration) selectedFeatures.push('Automação de Formulários');

    const msg = `Olá Luciano! Fiz uma simulação de projeto no seu site:\n- *Tipo de Projeto:* ${projectType}\n- *Volume de Contatos:* ~${monthlyLeads}/mês\n- *Módulos Selecionados:* ${selectedFeatures.join(', ')}\n- *Estimativa Calculada:* R$ ${estimates.minPrice.toLocaleString('pt-BR')} a R$ ${estimates.maxPrice.toLocaleString('pt-BR')}\nGostaria de alinhar os detalhes desse projeto!`;
    onOpenWhatsAppWithMessage(msg);
  };

  return (
    <section id="calculadora" className="py-20 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador de Projetos & Prazos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Monte Seu Projeto com Luciano
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Selecione os módulos de Website, Automação WhatsApp/Telegram, Postagens do Instagram e Dados para estimar investimento e tempo de entrega.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Selection (Left - 7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* 1. Select Base Project */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                1. Tipo de Projeto Principal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'landing-page', label: 'Landing Page de Vendas' },
                  { id: 'website-full', label: 'Website Institucional' },
                  { id: 'platform-custom', label: 'Portal / Plataforma Custom' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      projectType === item.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Volume Slider */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  2. Volume de Leads ou Contatos Estimados / Mês
                </label>
                <span className="text-xs font-mono font-bold text-white bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
                  ~{monthlyLeads} contatos/mês
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Iniciante (&lt;100)</span>
                <span>Médio (500)</span>
                <span>Alto Volume (3.000+)</span>
              </div>
            </div>

            {/* 3. Features Checkbox Grid */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                3. Adicionar Módulos de Automação & Design
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* WhatsApp Bot */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  needWhatsappBot ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={needWhatsappBot}
                    onChange={(e) => setNeedWhatsappBot(e.target.checked)}
                    className="mt-1 rounded accent-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Bot & Respostas no WhatsApp</div>
                    <div className="text-[11px] text-slate-400">Atendimento 24/7 e triagem de leads</div>
                  </div>
                </label>

                {/* Telegram Bot */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  needTelegramBot ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={needTelegramBot}
                    onChange={(e) => setNeedTelegramBot(e.target.checked)}
                    className="mt-1 rounded accent-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Notificações no Telegram</div>
                    <div className="text-[11px] text-slate-400">Alertas instantâneos para a equipe</div>
                  </div>
                </label>

                {/* Instagram Posts */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  needInstagramPosts ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={needInstagramPosts}
                    onChange={(e) => setNeedInstagramPosts(e.target.checked)}
                    className="mt-1 rounded accent-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Design de Posts & Instagram</div>
                    <div className="text-[11px] text-slate-400">Carrosséis e artes profissionais</div>
                  </div>
                </label>

                {/* Data Dashboard */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  needDataDashboard ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={needDataDashboard}
                    onChange={(e) => setNeedDataDashboard(e.target.checked)}
                    className="mt-1 rounded accent-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Dashboard (Foco em Dados)</div>
                    <div className="text-[11px] text-slate-400">Painel de métricas em tempo real</div>
                  </div>
                </label>

                {/* Webhooks / Forms Integration */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer sm:col-span-2 ${
                  needSystemIntegration ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={needSystemIntegration}
                    onChange={(e) => setNeedSystemIntegration(e.target.checked)}
                    className="mt-1 rounded accent-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Integração de Formulários & Planilhas</div>
                    <div className="text-[11px] text-slate-400">Sincronização automática de dados capturados</div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Estimate Results Card (Right - 5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-emerald-500/30 shadow-2xl bg-gradient-to-b from-slate-900 to-slate-950">
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Estimativa Rápida
              </span>
              <h3 className="text-xl font-bold text-white">
                Investimento & Prazos
              </h3>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
              <span className="text-xs text-slate-400 font-mono">Investimento Estimado:</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                R$ {estimates.minPrice.toLocaleString('pt-BR')} ~ R$ {estimates.maxPrice.toLocaleString('pt-BR')}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                *Valores negociáveis e customizáveis de acordo com a urgência do seu projeto.
              </p>
            </div>

            {/* Metrics Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span className="text-xs text-slate-300">Prazo de Entrega Estimado:</span>
                </div>
                <span className="text-xs font-mono font-bold text-white">~{estimates.days} dias úteis</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-300">Tempo Economizado:</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">~{estimates.hoursSaved}h / mês</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-300">Aumento de Conversão Estimado:</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-300">{estimates.projectedConversionBoost}</span>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              onClick={handleSendToWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Enviar Proposta para Luciano no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400">
              ✓ Atendimento direto com o Luciano (sem intermediários).
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
