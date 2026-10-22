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
  CreditCard,
  Lock,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ServicePricingBlocksProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
}

interface OfferingItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  icon: any;
  accentColor: string;
  badgeBg: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  marketPrice: string;
  promotionalPrice: string;
  installmentText: string;
  priceInCents: number;
  popular: boolean;
}

export const ServicePricingBlocks: React.FC<ServicePricingBlocksProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState<OfferingItem | null>(null);
  const [isProcessingStripe, setIsProcessingStripe] = useState<boolean>(false);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'websites', label: 'Websites & Pages' },
    { id: 'social', label: 'Instagram & Facebook' },
    { id: 'automacao', label: 'Automação WhatsApp' },
    { id: 'video', label: 'Edição de Vídeos' },
    { id: 'dados', label: 'Métricas & BI' }
  ];

  const offerings: OfferingItem[] = [
    {
      id: 'landing-page',
      category: 'websites',
      title: 'LANDING PAGE DE ALTA CONVERSÃO',
      badge: 'Carregamento Instantâneo & Foco em Vendas',
      icon: Rocket,
      accentColor: 'border-cyan-400 hover:border-cyan-300 shadow-cyan-500/10',
      badgeBg: 'bg-cyan-500 text-slate-950 font-extrabold',
      description: 'Página de vendas estruturada com copywriting persuasivo, carregamento ultrarrápido (< 1s) e botões diretos de conversão para o seu WhatsApp.',
      deliverables: [
        'Layout 100% Responsivo e exclusivo para celular e computador',
        'Headline e proposta de valor clara desenhada para converter visitantes em leads',
        'Botão WhatsApp flutuante com mensagem pronta e pré-configurada',
        'Instalação de Pixels de rastreamento (Meta Ads, Google Ads e Analytics)',
        'Hospedagem de alta velocidade e certificado de segurança SSL incluso'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Carregamento < 1s'],
      marketPrice: 'R$ 1.500 a R$ 2.800',
      promotionalPrice: 'R$ 497,00',
      installmentText: 'ou em até 12x de R$ 49,90 no cartão',
      priceInCents: 49700,
      popular: true
    },
    {
      id: 'site-institucional',
      category: 'websites',
      title: 'WEBSITE INSTITUCIONAL COMPLETO',
      badge: 'Autoridade & Presença Comercial',
      icon: Globe,
      accentColor: 'border-cyan-500/30 hover:border-cyan-400',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      description: 'Estrutura multi-páginas para empresas, clínicas e prestadores que precisam apresentar seus serviços, história, depoimentos e localização com credibilidade.',
      deliverables: [
        'Páginas completas (Início, Quem Somos, Serviços, Portfólio, Localização, Contato)',
        'Estruturação técnica de SEO local para ranquear organicamente no Google na sua região',
        'Formulário inteligente conectado ao WhatsApp e Telegram',
        'Painel dinâmico e integração com mapas interativos'
      ],
      technologies: ['React', 'SEO Avançado', 'Tailwind CSS', 'Formulários Webhooks'],
      marketPrice: 'R$ 2.400 a R$ 4.500',
      promotionalPrice: 'R$ 790,00',
      installmentText: 'ou em até 12x de R$ 79,00 no cartão',
      priceInCents: 79000,
      popular: false
    },
    {
      id: 'gestao-instagram-facebook',
      category: 'social',
      title: 'POSTAGENS & GESTÃO INSTAGRAM E FACEBOOK',
      badge: 'Criação Visual & Agendamento Automatizado',
      icon: Instagram,
      accentColor: 'border-pink-500/30 hover:border-pink-400',
      badgeBg: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
      description: 'Criação de artes profissionais para Feed (1:1 / 4:5), Carrosséis educativos de alto valor e Stories, legendas magnéticas e postagens agendadas automaticamente.',
      deliverables: [
        'Criação de artes de alto padrão para Feed, Carrosséis explicativos e Stories',
        'Copywriting magnético para legendas com ganchos de retenção e hashtags estratégicas',
        'Agendamento e postagem programada automática no Instagram e Facebook',
        'Robô de resposta na DM para envio imediato de catálogo a quem comentar',
        'Relatório mensal de alcance, engajamento e novos clientes'
      ],
      technologies: ['Figma', 'Photoshop', 'Meta Graph API', 'Automação DM', 'Copywriting'],
      marketPrice: 'R$ 1.200 a R$ 2.500 / mês',
      promotionalPrice: 'R$ 397,00 / mês',
      installmentText: 'sem fidelidade contratual abusiva',
      priceInCents: 39700,
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
      description: 'Atendimento automático no seu WhatsApp para responder dúvidas frequentes, enviar catálogo ou tabela de preços, qualificar clientes e agendar horários no piloto automático.',
      deliverables: [
        'Menu interativo e respostas automáticas em menos de 5 segundos no WhatsApp',
        'Encaminhamento de notificações de novos leads no Telegram ou E-mail',
        'Agendamento automático de consultas, reuniões ou orçamentos 24h por dia',
        'Sem mensalidades abusivas de plataformas de terceiros',
        'Transição humanizada para atendimento manual com histórico preservado'
      ],
      technologies: ['WhatsApp Business API', 'Telegram Bot API', 'N8N', 'Webhooks', 'Node.js'],
      marketPrice: 'R$ 1.800 a R$ 3.800',
      promotionalPrice: 'R$ 590,00',
      installmentText: 'taxa única de implementação (sem mensalidade)',
      priceInCents: 59000,
      popular: false
    },
    {
      id: 'edicao-videos-profissional',
      category: 'video',
      title: 'EDIÇÃO PROFISSIONAL DE VÍDEO & REELS',
      badge: 'Edição Cuidadosa de Alta Retenção',
      icon: Video,
      accentColor: 'border-amber-500/30 hover:border-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      description: 'Transforme gravações brutas em vídeos magnéticos com cortes precisos de silêncios, legendas dinâmicas palavra por palavra no estilo Hormozi e zooms de retenção máxima.',
      deliverables: [
        'Edição manual cuidadosa feita diretamente por Luciano Tavares Silva',
        'Corte preciso de pausas, respirações e silêncios (jump-cuts dinâmicos)',
        'Legendas dinâmicas palavra por palavra no estilo Hormozi / TikTok Pop',
        'Zooms dinâmicos, efeitos sonoros (swoosh/pop) e trilha de fundo sem royalties',
        'Entrega rápida em formato 9:16 (Reels/Shorts/TikTok) pronta para publicação'
      ],
      technologies: ['Adobe Premiere Pro', 'CapCut Pro', 'DaVinci Resolve', 'Edição Manual'],
      marketPrice: 'R$ 800 a R$ 1.800',
      promotionalPrice: 'R$ 290,00',
      installmentText: 'pacote inicial de vídeos promocional',
      priceInCents: 29000,
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
      marketPrice: 'R$ 1.900 a R$ 3.900',
      promotionalPrice: 'R$ 690,00',
      installmentText: 'ou em até 12x no cartão via Stripe',
      priceInCents: 69000,
      popular: false
    }
  ];

  const filteredOfferings = selectedCategory === 'todos' 
    ? offerings 
    : offerings.filter(o => o.category === selectedCategory);

  const handleStripeCheckout = async (item: OfferingItem) => {
    setSelectedCheckoutItem(item);
    setIsProcessingStripe(true);
    setPaymentSuccess(false);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: item.id,
          title: item.title,
          priceInCents: item.priceInCents,
          customerEmail: customerEmail || undefined
        })
      });

      const data = await res.json();
      setIsProcessingStripe(false);

      if (data.url && data.mode === 'live_stripe') {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setIsProcessingStripe(false);
    }
  };

  const handleSimulateCardPayment = () => {
    setIsProcessingStripe(true);
    setTimeout(() => {
      setIsProcessingStripe(false);
      setPaymentSuccess(true);
    }, 1200);
  };

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
            <span>VALORES PROMOCIONAIS DE ENTRADA · INTEGRAÇÃO STRIPE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            SERVIÇOS, PACOTES & <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">PREÇOS DIRETOS</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Como estou iniciando o posicionamento da agência, todos os valores foram definidos <strong>abaixo da média de mercado</strong> para entregar resultados rápidos e construir parcerias duradouras. Pagamento seguro via <strong>Stripe</strong> com Cartão em até 12x ou PIX.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
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

                {/* Price Comparison Box & Action CTAs */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  
                {/* Price Comparison Row */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0f1112] border border-white/10">
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Média de mercado</div>
                      <div className="text-xs font-mono font-bold text-slate-500 line-through">{item.marketPrice}</div>
                    </div>
                    <div className="text-right space-y-0.5">
                      <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Nosso valor</div>
                      <div className="text-lg font-mono font-extrabold text-cyan-300">{item.promotionalPrice}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStripeCheckout(item)}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-md cursor-pointer uppercase tracking-wider"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Contratar (Pagamento Seguro)</span>
                    </button>

                    <button
                      onClick={() => onOpenWhatsAppWithMessage(`Olá! Gostaria de saber mais sobre "${item.title}".`)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer font-mono"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Dúvidas? Falar no WhatsApp</span>
                    </button>
                  </div>

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
              <span>COMBO ECOSSISTEMA COMPLETO · SUPER DESCONTO</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
              LANDING PAGE + BOT WHATSAPP 24H + GESTÃO DE REDES
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              De R$ 3.800 por apenas <strong>R$ 1.190,00</strong>. Tenha uma página veloz trazendo visitantes, um bot atendendo e qualificando contatos 24 horas por dia e postagens no Instagram e Facebook.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => handleStripeCheckout({
                id: 'combo-ecossistema-completo',
                category: 'websites',
                title: 'COMBO ECOSSISTEMA COMPLETO (SITE + BOT + REDES)',
                badge: 'Super Combo de Expansão',
                icon: Zap,
                accentColor: 'border-emerald-500',
                badgeBg: 'bg-emerald-500/20 text-emerald-300',
                description: 'Pacote completo de presença, automação e redes sociais.',
                deliverables: ['Landing Page', 'Bot WhatsApp 24h', 'Gestão Instagram e Facebook'],
                technologies: ['React', 'WhatsApp API', 'Meta API', 'Stripe'],
                marketPrice: 'R$ 3.800,00',
                promotionalPrice: 'R$ 1.190,00',
                installmentText: 'ou em até 12x no cartão via Stripe',
                priceInCents: 119000,
                popular: true
              })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-xl shadow-cyan-500/20 cursor-pointer uppercase tracking-wider"
            >
              <CreditCard className="w-4 h-4 fill-slate-950" />
              <span>Contratar Combo (Stripe)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Gostaria de fechar o Combo Ecossistema Completo (Site + Bot + Redes) pelo valor especial de R$ 1.190.')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer font-mono"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chamar no WhatsApp</span>
            </button>
          </div>
        </motion.div>

      </div>

      {/* Stripe Checkout Modal */}
      {selectedCheckoutItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#121517] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl text-slate-200">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase font-sans">
                    Checkout Seguro · Stripe
                  </h3>
                  <p className="text-[10px] text-cyan-400 font-mono">
                    Criptografia SSL de 256 bits · Foco em Dados
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCheckoutItem(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white uppercase font-sans">
                  Pagamento Confirmado via Stripe!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Obrigado por contratar <strong>{selectedCheckoutItem.title}</strong>! O titular Luciano Tavares Silva iniciará o alinhamento técnico do seu projeto imediatamente.
                </p>
                <button
                  onClick={() => {
                    setSelectedCheckoutItem(null);
                    onOpenWhatsAppWithMessage(`Olá Luciano! Acabei de realizar o pagamento de ${selectedCheckoutItem.title} via Stripe e gostaria de iniciar os detalhes do projeto.`);
                  }}
                  className="px-6 py-3 rounded-full bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/25"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Abrir Conversa de Início no WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Product Summary */}
                <div className="p-4 rounded-2xl bg-[#090b0d] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Serviço Selecionado:</span>
                    <h4 className="text-sm font-bold text-white font-sans">{selectedCheckoutItem.title}</h4>
                    <span className="text-[10px] text-cyan-400 font-mono">{selectedCheckoutItem.installmentText}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block font-mono">{selectedCheckoutItem.marketPrice}</span>
                    <span className="text-lg font-extrabold text-cyan-300 font-mono">{selectedCheckoutItem.promotionalPrice}</span>
                  </div>
                </div>

                {/* Customer Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>E-mail para envio do recibo e nota:</span>
                    <span className="text-cyan-400 font-bold">Obrigatório</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="seuemail@empresa.com.br"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Payment Methods Badges */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Formas de Pagamento Disponíveis:
                  </span>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      <span>Cartão de Crédito (até 12x)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      ⚡ PIX Instantâneo
                    </span>
                    <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      📄 Boleto Bancário
                    </span>
                  </div>
                </div>

                {/* Guarantee Note */}
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Garantia incondicional de 7 dias com entrega técnica direta por Luciano Tavares Silva.</span>
                </div>

                {/* Submit Action */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenWhatsAppWithMessage(`Olá Luciano! Gostaria de tirar uma dúvida antes de finalizar o pagamento de "${selectedCheckoutItem.title}" no Stripe.`)}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Dúvidas? Falar no WhatsApp</span>
                  </button>

                  <button
                    onClick={handleSimulateCardPayment}
                    disabled={isProcessingStripe}
                    className={`px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      isProcessingStripe
                        ? 'bg-cyan-500/50 text-slate-950 cursor-wait'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/25 hover:scale-102'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isProcessingStripe ? 'Conectando ao Stripe...' : 'Pagar Agora com Stripe'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
