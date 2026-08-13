import React, { useState } from 'react';
import { DiagnosticResult } from '../types';
import { 
  Sparkles, 
  Bot, 
  Send, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Zap, 
  MessageSquare 
} from 'lucide-react';

interface AiDiagnosticProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const AiDiagnostic: React.FC<AiDiagnosticProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    storePlatform: 'Shopify',
    monthlyOrders: '200 - 500 pedidos/mês',
    currentChallenges: '',
    goals: 'Automatizar tarefas repetitivas e aumentar taxa de conversão'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.storeName || !formData.currentChallenges) {
      setErrorMsg('Por favor preencha o nome da loja e o principal desafio.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Falha ao processar diagnóstico.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Erro ao conectar ao serviço de diagnóstico. Tente novamente ou chame no WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscussOnWhatsApp = () => {
    if (!result) return;
    const msg = `Olá Luciano! Gerou o Diagnóstico IA no seu site para a *${formData.storeName}*.\n\n*Resumo:* ${result.executiveSummary}\n*ROI Estimado:* ~${result.estimatedRoi.hoursSavedPerMonth}h economizadas/mês.\n\nGostaria de agendar alguns minutos para apresentarmos a solução exata!`;
    onOpenWhatsAppWithMessage(msg);
  };

  return (
    <section id="diagnostico" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Bot className="w-3.5 h-3.5" />
            <span>Diagnóstico com IA Gemini</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Análise Rápida de Gargalos &{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Plano de Ação Técnico
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Informe os dados da sua loja para que a inteligência artificial analise seus processos e recomende a arquitetura ideal de automação.
          </p>
        </div>

        {/* Diagnostic Form & Result Container */}
        <div className="max-w-4xl mx-auto">
          
          {!result ? (
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Store Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      Nome da Loja / Empresa <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: MinhaLoja.com.br"
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Store Platform */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      Plataforma Atual
                    </label>
                    <select
                      value={formData.storePlatform}
                      onChange={(e) => setFormData({ ...formData, storePlatform: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="Shopify">Shopify</option>
                      <option value="Nuvemshop">Nuvemshop</option>
                      <option value="VTEX IO">VTEX IO</option>
                      <option value="WooCommerce">WooCommerce</option>
                      <option value="Outra / Custom">Outra / Loja Custom</option>
                    </select>
                  </div>
                </div>

                {/* Monthly Volume */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 font-bold block">
                    Volume Médio de Pedidos Mensais
                  </label>
                  <select
                    value={formData.monthlyOrders}
                    onChange={(e) => setFormData({ ...formData, monthlyOrders: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="Até 100 pedidos/mês">Até 100 pedidos/mês</option>
                    <option value="100 a 500 pedidos/mês">100 a 500 pedidos/mês</option>
                    <option value="500 a 2.000 pedidos/mês">500 a 2.000 pedidos/mês</option>
                    <option value="Mais de 2.000 pedidos/mês">Mais de 2.000 pedidos/mês</option>
                  </select>
                </div>

                {/* Main Challenge / Bottleneck */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 font-bold block">
                    Qual é o seu principal problema / gargalo hoje? <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ex: Perto muito tempo digitando código de rastreio e notas no ERP. Suporte no WhatsApp fica sobrecarregado com perguntas de onde está o pedido."
                    value={formData.currentChallenges}
                    onChange={(e) => setFormData({ ...formData, currentChallenges: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analisando Arquitetura com IA...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Gerar Diagnóstico Técnico Gratuitamente</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Result Card */
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-emerald-500/40 shadow-2xl space-y-8 animate-fade-in">
              
              {/* Header Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    Diagnóstico IA Concluído
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {result.summary}
                  </h3>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white underline cursor-pointer"
                >
                  ← Refazer Análise
                </button>
              </div>

              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-sm text-slate-200 leading-relaxed">
                  {result.executiveSummary}
                </p>
              </div>

              {/* Identified Bottlenecks */}
              {result.bottlenecks && result.bottlenecks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Gargalos Mapeados:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.bottlenecks.map((bot, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{bot.title}</span>
                        </div>
                        <p className="text-xs text-slate-400">{bot.description}</p>
                        <div className="text-[11px] font-mono text-rose-400 pt-1">
                          Impacto: {bot.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Architecture */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Arquitetura de Solução Recomendada:
                </h4>
                <div className="space-y-2">
                  {result.recommendedArchitecture.map((arch, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Banner */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-slate-400">Economia Estimada</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    ~{result.estimatedRoi.hoursSavedPerMonth}h / mês
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Potencial Aumento Receita</div>
                  <div className="text-xl font-bold font-mono text-teal-300">
                    {result.estimatedRoi.revenueBoostPercentage}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Retorno do Investimento</div>
                  <div className="text-xl font-bold font-mono text-amber-300">
                    {result.estimatedRoi.paybackTime}
                  </div>
                </div>
              </div>

              {/* WhatsApp Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Apresentação completa de 15 minutos via Google Meet ou WhatsApp.
                </span>
                <button
                  onClick={handleDiscussOnWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Discutir Plano no WhatsApp com Luciano</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
