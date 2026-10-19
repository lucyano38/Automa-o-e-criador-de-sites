import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Rocket, 
  ShoppingBag, 
  Bot, 
  Check, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Zap,
  TrendingDown,
  ShieldCheck,
  Video,
  Instagram,
  BarChart3,
  Layers,
  Code2
} from 'lucide-react';

interface ServicePricingBlocksProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const ServicePricingBlocks: React.FC<ServicePricingBlocksProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'websites', label: 'Websites & Lojas' },
    { id: 'social', label: 'Instagram & Facebook' },
    { id: 'automacao', label: 'Automação WhatsApp' },
    { id: 'video', label: 'Edição de Vídeos' },
    { id: 'dados', label: 'Métricas & BI' }
  ];

  const offerings = [
    {
      id: 'landing-page',
      category: 'websites',
      title: 'LANDING PAGE DE ALTA CONVERSÃO',
      badge: 'Página de Vendas & Carregamento < 1s',
      icon: Rocket,
      accentColor: 'border-cyan-400 hover:border-cyan-300 shadow-cyan-500/10',
      badgeBg: 'bg-cyan-500 text-slate-950 font-extrabold',
      description: 'Desenvolvida estrategicamente com copywriting persuasivo, carregamento ultrarrápido (Nota 98+ Google) e botões diretos de conversão no WhatsApp.',
      deliverables: [
        'Layout 100% Responsivo e exclusivo para celular e computador',
        'Headline e proposta de valor clara focada em conversão imediata',
        'Botão WhatsApp flutuante com mensagem pronta personalizada',
        'Instalação de Pixels (Meta Ads, Google Ads e Analytics)'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Google PageSpeed 98+'],
      marketPrice: 'R$ 1.500 a R$ 3.500',
      lucianoPrice: 'R$ 590,00',
      customTag: 'A partir de ou Sob Medida',
      popular: true
    },
    {
      id: 'site-institucional',
      category: 'websites',
      title: 'WEBSITE INSTITUCIONAL COMPLETO',
      badge: 'Presença Digital & Credibilidade',
      icon: Globe,
      accentColor: 'border-cyan-500/30 hover:border-cyan-400',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      description: 'Ideal para empresas, clínicas e profissionais que precisam apresentar seus serviços, história, depoimentos e localização com elegância e autoridade.',
      deliverables: [
        'Páginas completas (Início, Sobre Nós, Serviços, Portfólio, Contato)',
        'Estruturação de SEO local para ranquear no Google na sua região',
        'Formulário inteligente com envio de lead direto para seu WhatsApp',
        'Hospedagem rápida e certificado de segurança SSL incluso'
      ],
      technologies: ['React', 'SEO Avançado', 'Tailwind', 'Formulários Webhook'],
      marketPrice: 'R$ 1.800 a R$ 3.800',
      lucianoPrice: 'R$ 690,00',
      customTag: 'A partir de ou Sob Medida',
      popular: false
    },
    {
      id: 'gestao-instagram-facebook',
      category: 'social',
      title: 'POSTAGENS & GESTÃO INSTAGRAM E FACEBOOK',
      badge: 'Criação Visual Estratégica & Agendamento Automatizado',
      icon: Instagram,
      accentColor: 'border-pink-500/30 hover:border-pink-400',
      badgeBg: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
      description: 'Criação de artes profissionais para Feed, Carrosséis educativos de alto valor e Stories, legendas com copy magnética e postagens agendadas automaticamente.',
      deliverables: [
        'Criação de artes para Feed (1:1 / 4:5), Carrosséis explicativos e Stories',
        'Copywriting magnético para legendas com ganchos de retenção e hashtags',
        'Agendamento e postagem programada automática no Instagram e Facebook',
        'Robô de resposta na DM (envio automático de orçamento para quem comenta nos posts)',
        'Relatório mensal de alcance, curtidas, comentários e novos clientes'
      ],
      technologies: ['Figma', 'Photoshop', 'Meta Graph API', 'Automação DM', 'Copywriting'],
      marketPrice: 'R$ 1.500 a R$ 3.200 / mês',
      lucianoPrice: 'R$ 550,00 / mês',
      customTag: 'Planos a partir de ou Sob Medida',
      popular: true
    },
    {
      id: 'automacao-atendimento',
      category: 'automacao',
      title: 'AUTOMAÇÃO DE ATENDIMENTO 24H (WHATSAPP & TELEGRAM)',
      badge: 'Atendimento Instantâneo sem Mensalidades Abusivas',
      icon: Bot,
      accentColor: 'border-emerald-500/30 hover:border-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: 'Atendimento automático no seu WhatsApp para responder dúvidas, enviar catálogo ou tabela de preços, qualificar clientes e agendar reuniões enquanto você dorme.',
      deliverables: [
        'Menu interativo e respostas automáticas instantâneas no WhatsApp',
        'Encaminhamento de leads e notificações em tempo real no Telegram/E-mail',
        'Agendamento automático de consultas, reuniões ou serviços',
        'Sem mensalidades abusivas de plataformas de terceiros',
        'Transição suave para atendimento humano com histórico preservado'
      ],
      technologies: ['WhatsApp Business API', 'Telegram Bot API', 'N8N', 'Webhooks', 'Node.js'],
      marketPrice: 'R$ 1.800 a R$ 4.500',
      lucianoPrice: 'R$ 690,00',
      customTag: 'A partir de ou Sob Medida',
      popular: false
    },
    {
      id: 'edicao-videos-profissional',
      category: 'video',
      title: 'EDIÇÃO PROFISSIONAL DE VÍDEO & REELS',
      badge: 'Edição Manual Cuidadosa por Luciano Tavares',
      icon: Video,
      accentColor: 'border-amber-500/30 hover:border-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      description: 'Transforme gravações brutas em vídeos magnéticos com cortes precisos de pausas, legendas dinâmicas palavra por palavra no estilo Hormozi e zooms de retenção máxima, editados manualmente por Luciano.',
      deliverables: [
        'Edição manual cuidadosa feita diretamente pelo titular Luciano Tavares',
        'Corte preciso de pausas, respirações e silêncios (jump-cuts de alta retenção)',
        'Legendas dinâmicas palavra por palavra no estilo Hormozi / TikTok Pop',
        'Zooms dinâmicos, efeitos sonoros (swoosh/pop) e trilha de fundo sem royalties',
        'Entrega rápida em 9:16 (Reels/Shorts/TikTok) pronta para publicação'
      ],
      technologies: ['Adobe Premiere Pro', 'CapCut Pro', 'DaVinci Resolve', 'Edição Manual'],
      marketPrice: 'R$ 1.200 a R$ 2.800 / mês',
      lucianoPrice: 'R$ 390,00',
      customTag: 'Pacotes a partir de ou Por Vídeo',
      popular: false
    },
    {
      id: 'dashboards-focoemdados',
      category: 'dados',
      title: 'ANÁLISE DE DADOS & DASHBOARDS VISUAIS',
      badge: 'Especialidade focoemdados.com.br',
      icon: BarChart3,
      accentColor: 'border-purple-500/30 hover:border-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      description: 'Construção de painéis visuais interativos em tempo real para acompanhar indicadores de desempenho, leads, faturamento e tomadas de decisão sem trabalho manual.',
      deliverables: [
        'Dashboards visuais interativos para acompanhamento de vendas e leads',
        'Centralização de dados de múltiplos canais em um único painel',
        'Alertas automatizados no Telegram/WhatsApp para variações de KPIs',
        'Relatórios gerenciais periódicos com insights de crescimento',
        'Conexão com planilhas Google Sheets e bancos de dados'
      ],
      technologies: ['BI', 'Data Analytics', 'Recharts', 'SQL', 'Node.js', 'Google Sheets API'],
      marketPrice: 'R$ 2.000 a R$ 5.000',
      lucianoPrice: 'R$ 790,00',
      customTag: 'A partir de ou Sob Medida',
      popular: false
    }
  ];

  const filteredOfferings = selectedCategory === 'todos' 
    ? offerings 
    : offerings.filter(o => o.category === selectedCategory);

  return (
    <section id="servicos-precos" className="py-16 md:py-24 bg-[#0d0f10] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOLUÇÕES COMPLETAS COM VALORES TRANSPARENTES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            SERVIÇOS, PACOTES & <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">PREÇOS DIRETOS</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Desenvolvimento técnico de alto nível, suporte direto com o titular Luciano Tavares e valores justos sem intermediários.
          </p>
        </motion.div>

        {/* Category Filter Pills (Unitized & Cohesive) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredOfferings.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                className={`relative rounded-3xl p-7 sm:p-8 bg-[#15181a] border ${item.accentColor} transition-all duration-300 shadow-2xl flex flex-col justify-between group`}
              >
                {/* Popular Ribbon Tag */}
                {item.popular && (
                  <div className="absolute -top-3 right-6 px-3.5 py-1 rounded-full bg-cyan-400 text-slate-950 font-mono font-extrabold text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-950" />
                    <span>Destaque / Mais Solicitado</span>
                  </div>
                )}

                <div>
                  {/* Top Header: Badge & Title */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="space-y-1.5 flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight pt-1 uppercase font-sans">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 py-4 border-t border-white/10 mb-4">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                      O Que Está Incluso:
                    </span>
                    {item.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-2.5 h-2.5 text-cyan-400" />
                        </div>
                        <span className="leading-snug">{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Badges */}
                  <div className="pt-2 pb-4 flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Comparison Box & Action CTA */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  
                  {/* Price Comparison Row */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0f1112] border border-white/10">
                    {/* Market Price */}
                    <div className="space-y-0.5 border-r border-white/10 pr-2">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-500" />
                        <span>Média de Agências</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-slate-400 line-through">
                        {item.marketPrice}
                      </div>
                    </div>

                    {/* Luciano Price */}
                    <div className="space-y-0.5 pl-1">
                      <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <TrendingDown className="w-3 h-3 text-emerald-400" />
                        <span>Com Luciano (Direto)</span>
                      </div>
                      <div className="text-base sm:text-xl font-mono font-extrabold text-cyan-300">
                        {item.lucianoPrice}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onOpenWhatsAppWithMessage(`Olá Luciano! Gostaria de contratar ou pedir orçamento para "${item.title}".`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-extrabold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Contratar no WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Combo Promocional */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-12 rounded-3xl p-7 sm:p-9 bg-gradient-to-r from-cyan-500/15 via-emerald-500/15 to-purple-600/15 border border-cyan-500/40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              <span>PACOTE COMPLETO DE EXPANSÃO DIGITAL</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
              LANDING PAGE + AUTOMAÇÃO DE WHATSAPP 24H + GESTÃO DE REDES
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Tenha uma página veloz trazendo visitantes, um bot atendendo e qualificando contatos 24 horas por dia e postagens ativas no seu Instagram e Facebook.
            </p>
          </div>

          <button
            onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Vi o Pacote Completo (Landing Page + Automação de WhatsApp + Gestão de Redes) e quero fechar esse combo para minha empresa.')}
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full font-extrabold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer uppercase tracking-wider"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Consultar Valor do Combo Especial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
