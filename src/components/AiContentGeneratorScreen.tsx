import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Instagram, 
  Facebook, 
  Layers, 
  RefreshCw, 
  Hash, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Bot
} from 'lucide-react';

interface GeneratedContent {
  source: string;
  title: string;
  hook: string;
  caption: string;
  carouselSlides?: {
    slideNumber: number;
    title: string;
    text: string;
    visual: string;
  }[];
  hashtags: string[];
  visualPrompt: string;
  cta: string;
}

export const AiContentGeneratorScreen: React.FC = () => {
  const [niche, setNiche] = useState<string>('Clínicas & Odontologia');
  const [topic, setTopic] = useState<string>('Como não perder pacientes por falta de resposta rápida no WhatsApp');
  const [goal, setGoal] = useState<string>('Gerar conversas diretas no WhatsApp');
  const [format, setFormat] = useState<string>('Carrossel Educativo (5 slides)');
  const [platform, setPlatform] = useState<string>('Instagram & Facebook');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);
  const [scheduleSuccess, setScheduleSuccess] = useState<boolean>(false);

  const [content, setContent] = useState<GeneratedContent | null>({
    source: 'gemini_ready',
    title: 'Estratégia de Conversão Imediata: Pacientes no WhatsApp',
    hook: '🚨 O erro que faz clínicas perderem até 40% dos agendamentos todas as semanas:',
    caption: `Você sabia que a maioria dos pacientes pesquisa no Instagram ou Google à noite e quer uma resposta em minutos?\n\nQuando uma clínica demora 2 ou 3 horas para responder no WhatsApp, o paciente simplesmente chama a próxima da lista.\n\nNo Foco em Dados, nós implementamos um ecossistema completo:\n✅ Presença visual profissional no Instagram\n✅ Website veloz focado em agendamentos\n✅ Robô inteligente no WhatsApp que atende em 3 segundos 24 horas por dia.\n\nQuer parar de perder consultas para a concorrência? O seu faturamento precisa rodar no piloto automático.`,
    carouselSlides: [
      { slideNumber: 1, title: 'Capa / Gancho', text: 'Por que pacientes com dores ou urgências não esperam sua resposta amanhã?', visual: 'Design escuro com ciano neon e ícone de relógio' },
      { slideNumber: 2, title: 'O Diagnóstico', text: '78% das decisões de agendamento são tomadas por quem responde primeiro com clareza.', visual: 'Gráfico demonstrativo de tempo de resposta x conversão' },
      { slideNumber: 3, title: 'A Solução', text: 'Atendimento no piloto automático 24h: tira dúvidas sobre convênios e horários instantaneamente.', visual: 'Mockup de tela de smartphone com conversa no WhatsApp' },
      { slideNumber: 4, title: 'O Resultado', text: 'Agenda cheia, secretária sem sobrecarga e paciente acolhido na hora exata.', visual: 'Checklist de benefícios com ícones de sucesso' },
      { slideNumber: 5, title: 'CTA Final', text: 'Toque no link da bio e fale direto com Luciano Tavares Silva para ativar sua automação!', visual: 'Seta apontando para o botão de contato' }
    ],
    hashtags: ['#focoemdados', '#odontologia', '#gestaoclinica', '#automacaowhatsapp', '#marketingmedico', '#lucianotavares'],
    visualPrompt: 'Arte minimalista escura #0d0f10 com detalhes em azul ciano neon e tipografia geométrica branca de alta legibilidade',
    cta: 'Envie um Direct com a palavra AGENDAR para receber uma demonstração sem custo!'
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setScheduleSuccess(false);

    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          topic,
          goal,
          format,
          platform
        })
      });

      if (!res.ok) throw new Error('Falha na requisição');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error(err);
      // Fallback already returned by server or alert
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCaption = () => {
    if (!content) return;
    const fullText = `${content.hook}\n\n${content.caption}\n\n👉 ${content.cta}\n\n${content.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleSchedulePost = () => {
    setScheduleSuccess(true);
    setTimeout(() => setScheduleSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121518] via-[#101316] to-[#0c0e10] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>POWERED BY GEMINI IA · FOCO EM DADOS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Gerador de Conteúdo Profissional para Redes Sociais
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Crie copys de alto impacto, ganchos visuais e roteiros de carrossel desenhados especificamente para converter seguidores em conversas reais no WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/30">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Modelo Gemini 2.5 Flash Ativo</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Parameters (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#121517] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans border-b border-white/10 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Configuração da Copy</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">Nicho do Cliente *</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Clínicas & Odontologia">Clínicas Médicas & Odontologia</option>
                <option value="Restaurantes & Gastronomia">Restaurantes, Bares & Gastronomia</option>
                <option value="Advocacia & Serviços Jurídicos">Advocacia & Serviços Jurídicos</option>
                <option value="Estética Avançada & Salões">Estética Avançada & Salões de Beleza</option>
                <option value="Academias & Fitness">Academias, Crossfit & Personal</option>
                <option value="Pet Shops & Veterinárias">Pet Shops & Clínicas Veterinárias</option>
                <option value="Contabilidade & Finanças">Contabilidade & BPO Financeiro</option>
                <option value="Imobiliárias & Corretores">Imobiliárias & Corretores de Imóveis</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">Tema ou Dor Principal *</label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Como atrair clientes sem depender de indicações"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">Objetivo da Publicação</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Gerar conversas diretas no WhatsApp">Gerar conversas diretas no WhatsApp</option>
                <option value="Vender criação de Website / Landing Page">Vender criação de Website / Landing Page</option>
                <option value="Autoridade e credibilidade técnica">Autoridade e credibilidade técnica</option>
                <option value="Apresentação de Case de Sucesso">Apresentação de Case de Sucesso</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">Formato</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Carrossel Educativo (5 slides)">Carrossel Educativo</option>
                  <option value="Post Único com Legenda Magnética">Post Único Feed</option>
                  <option value="Roteiro para Reels / Shorts">Roteiro Reels/Shorts</option>
                  <option value="Anúncio Pago (Meta Ads)">Anúncio Meta Ads</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">Plataforma</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Instagram & Facebook">Instagram & Facebook</option>
                  <option value="Apenas Instagram">Apenas Instagram</option>
                  <option value="Apenas Facebook">Apenas Facebook</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isLoading
                  ? 'bg-cyan-500/50 text-slate-950 cursor-wait'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-xl shadow-cyan-500/25 hover:scale-102'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gerando com Gemini IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Gerar Copy com Gemini IA</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Right Area: Generated Result Preview (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#121517] border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase tracking-tight font-sans">
                {content?.title || 'Conteúdo Gerado'}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span>Otimizado para Conversão e Engajamento</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCaption}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCaption ? 'Copiado!' : 'Copiar Legenda'}</span>
              </button>

              <button
                onClick={handleSchedulePost}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold font-mono uppercase flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Agendar Post</span>
              </button>
            </div>
          </div>

          {scheduleSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Publicação agendada com sucesso na Central Automatizada de Postagens!</span>
            </div>
          )}

          {content && (
            <div className="space-y-6">
              
              {/* Hook Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Gancho de Alta Retenção (Primeiras Linhas):
                </span>
                <p className="text-sm font-bold text-white leading-snug">
                  {content.hook}
                </p>
              </div>

              {/* Caption Box */}
              <div className="p-5 rounded-2xl bg-[#0e1011] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Legenda Completa</span>
                  <span>{content.caption.length} caracteres</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                  {content.caption}
                </div>
                <div className="pt-2 border-t border-white/10 text-xs font-bold text-cyan-300">
                  👉 {content.cta}
                </div>
              </div>

              {/* Carousel Slides Preview */}
              {content.carouselSlides && content.carouselSlides.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Estrutura de Slides do Carrossel ({content.carouselSlides.length} cards)</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {content.carouselSlides.map((slide) => (
                      <div 
                        key={slide.slideNumber}
                        className="p-3.5 rounded-xl bg-slate-900 border border-white/10 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                            Slide {slide.slideNumber}
                          </span>
                          <span className="text-[10px] font-bold text-slate-300">{slide.title}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed">
                          {slide.text}
                        </p>
                        <div className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                          Visual: {slide.visual}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Prompt for Designer / Image Generator */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-300 uppercase">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Direção de Arte / Prompt Visual:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {content.visualPrompt}
                </p>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {content.hashtags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 text-cyan-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
