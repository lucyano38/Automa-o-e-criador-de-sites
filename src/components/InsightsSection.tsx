import React, { useState, useEffect } from 'react';
import { InsightItem } from '../types';
import { 
  Lightbulb, 
  Sparkles, 
  Clock, 
  Copy, 
  Check, 
  MessageSquare, 
  ArrowRight, 
  Filter, 
  Share2, 
  ExternalLink,
  BookOpen,
  RefreshCw
} from 'lucide-react';

interface InsightsSectionProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeInsightModal, setActiveInsightModal] = useState<InsightItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Insights' },
    { id: 'automacao', label: 'Automação WhatsApp & Telegram' },
    { id: 'conversao', label: 'Websites & Performance' },
    { id: 'instagram', label: 'Estratégia para Instagram' },
    { id: 'projeto', label: 'Projetos & Portais' },
    { id: 'dados', label: 'Análise de Dados & BI' },
  ];

  const fetchInsights = async (category: string) => {
    setLoading(true);
    try {
      const url = category === 'all' ? '/api/insights' : `/api/insights?category=${category}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setInsights(data.insights || []);
      } else {
        throw new Error('Falha ao carregar insights');
      }
    } catch (err) {
      console.error('Erro ao carregar insights:', err);
      // Fallback local insights if server issue
      setInsights([
        {
          id: '1',
          category: 'automacao',
          categoryLabel: 'Automação WhatsApp & Telegram',
          title: 'Como responder leads em menos de 10 segundos no WhatsApp',
          summary: 'Integrando formulários web diretamente com Webhooks da API do WhatsApp, reduzimos o tempo de resposta a zero e aumentamos a taxa de agendamento em até 40%.',
          readTime: '2 min de leitura',
          date: 'Recente',
          author: 'Luciano Tavares Silva',
          tags: ['WhatsApp Bot', 'Webhooks', 'Automação'],
          keyTakeaway: 'Leads atendidos nos primeiros 5 minutos possuem 9x mais chances de converter do que os atendidos após 30 minutos.',
          linkUrl: '#automacoes'
        },
        {
          id: '2',
          category: 'conversao',
          categoryLabel: 'Websites & Performance',
          title: 'O impacto de uma Landing Page com carregamento < 1s nas vendas',
          summary: 'Sites lentos em conexões móveis perdem até 30% do tráfego antes mesmo da página abrir. Arquiteturas com React e Vite entregam carregamento instantâneo.',
          readTime: '3 min de leitura',
          date: 'Recente',
          author: 'Luciano Tavares Silva',
          tags: ['React', 'Performance', 'SEO'],
          keyTakeaway: 'Performance técnica é uma estratégia direta de vendas, não apenas um capricho técnico.',
          linkUrl: '#servicos'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights(selectedCategory);
  }, [selectedCategory]);

  const handleCopyInsight = (item: InsightItem) => {
    const textToCopy = `💡 Insight de Luciano Tavares Silva:\n"${item.title}"\n\n${item.summary}\n\n👉 Sacada Chave: ${item.keyTakeaway}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDiscussInsight = (item: InsightItem) => {
    const msg = `Olá Luciano! Li o seu insight sobre *"${item.title}"* no seu site.\n\n"${item.keyTakeaway}"\n\nGostaria de entender como podemos aplicar essa mesma ideia de ${item.categoryLabel} no meu negócio!`;
    onOpenWhatsAppWithMessage(msg);
  };

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'automacao':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80';
      case 'conversao':
        return 'bg-teal-950/80 text-teal-300 border-teal-800/80';
      case 'instagram':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/80';
      case 'projeto':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80';
      case 'dados':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/80';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-800';
    }
  };

  return (
    <section id="insights" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Dicas & Atualizações por Luciano Tavares Silva</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Insights Práticos de{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Tecnologia & Conversão
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Conhecimento aplicado sobre automações de WhatsApp/Telegram, otimização de websites, estratégias para Instagram e gestão dos portais soscuidadores.com e focoemdados.com.br.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading Skeleton or Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800/80 animate-pulse">
                <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                <div className="h-16 bg-slate-900 rounded"></div>
                <div className="h-10 bg-slate-800 rounded"></div>
              </div>
            ))}
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl border border-slate-800 max-w-lg mx-auto">
            <p className="text-slate-400 text-sm">Nenhum insight encontrado para esta categoria.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-3 text-xs text-emerald-400 underline font-mono cursor-pointer"
            >
              Ver todos os insights
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((item) => (
              <div
                key={item.id}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between space-y-5 border border-slate-800/90 hover:border-emerald-500/40 relative group"
              >
                <div className="space-y-3">
                  {/* Category Badge & Meta */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${getCategoryBadgeStyle(item.category)}`}>
                      {item.categoryLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Key Takeaway Box */}
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-xs text-emerald-300 leading-relaxed space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>Sacada Prática:</span>
                    </div>
                    <p className="italic text-[11px] font-medium text-slate-200">
                      "{item.keyTakeaway}"
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyInsight(item)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
                      title="Copiar resumo e sacada"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Discuss on WhatsApp Button */}
                    <button
                      onClick={() => handleDiscussInsight(item)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-800 hover:border-emerald-400 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Aplicar no Meu Negócio</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Footer Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Precisa de uma solução sob medida para seu projeto?</span>
            </h4>
            <p className="text-xs text-slate-400">
              Converse diretamente com Luciano Tavares Silva para alinhar arquitetura, prazos e orçamento.
            </p>
          </div>
          <button
            onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Gostaria de uma consultoria rápida para implementar automações e melhorar meu website.')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shrink-0 shadow-md shadow-emerald-500/20"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950" />
            <span>Chamar no WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
