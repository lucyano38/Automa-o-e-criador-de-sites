import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Loader2,
  Calendar,
  User,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import { Skeleton } from './Skeleton';

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
  const [isLoading, setIsLoading] = useState(false);

  // Financial Barrier Customer Data Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCpfCnpj, setCustomerCpfCnpj] = useState<string>('');
  const [paymentTab, setPaymentTab] = useState<'hosted' | 'card'>('hosted');

  // Direct Card Gateway Form State
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [installments, setInstallments] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [stripeConfig, setStripeConfig] = useState<{ isConfigured: boolean; mode: string } | null>(null);

  useEffect(() => {
    fetch('/api/stripe-config')
      .then((res) => res.json())
      .then((data) => setStripeConfig(data))
      .catch((err) => console.error('Stripe config fetch error:', err));
  }, []);

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

  // Input Formatters
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 19);
    return digits.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  };

  const formatCpfCnpj = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 14);
    if (digits.length <= 11) {
      return digits.replace(/(\d{3})(\d{3})?(\d{3})?(\d{0,2})?/, (_, a, b, c, d) => {
        let res = a;
        if (b) res += `.${b}`;
        if (c) res += `.${c}`;
        if (d) res += `-${d}`;
        return res;
      });
    }
    return digits.replace(/(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{0,2})?/, (_, a, b, c, d, e) => {
      let res = a;
      if (b) res += `.${b}`;
      if (c) res += `.${c}`;
      if (d) res += `/${d}`;
      if (e) res += `-${e}`;
      return res;
    });
  };

  const getCardBrand = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (/^4/.test(clean)) return 'Visa';
    if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    if (/^(4011|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(clean)) return 'Elo';
    if (/^(606282|3841)/.test(clean)) return 'Hipercard';
    return 'Cartão de Crédito';
  };

  const openCheckoutModal = (item: OfferingItem) => {
    setSelectedCheckoutItem(item);
    setErrorMessage(null);
    setConfirmedOrder(null);
    setIsProcessingStripe(false);
    // Prefill test card if not configured to facilitate verification
    if (!stripeConfig?.isConfigured && !cardNumber) {
      setCardNumber('4242 4242 4242 4242');
      setCardExpiry('12/28');
      setCardCvc('123');
    }
  };

  // 1. Stripe Hosted Checkout Flow
  const handleInitiateStripeHostedCheckout = async () => {
    if (!selectedCheckoutItem) return;
    setErrorMessage(null);

    // Validation
    if (!customerName.trim() || customerName.trim().length < 3) {
      setErrorMessage('Por favor, informe seu nome completo ou razão social.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      setErrorMessage('Informe um e-mail válido para envio do recibo e nota fiscal.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Informe um WhatsApp/telefone com DDD (mínimo 10 dígitos).');
      return;
    }

    const cleanCpfCnpj = customerCpfCnpj.replace(/\D/g, '');
    if (cleanCpfCnpj.length !== 11 && cleanCpfCnpj.length !== 14) {
      setErrorMessage('Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.');
      return;
    }

    setIsProcessingStripe(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedCheckoutItem.id,
          title: selectedCheckoutItem.title,
          priceInCents: selectedCheckoutItem.priceInCents,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: cleanPhone,
          customerCpfCnpj: cleanCpfCnpj
        })
      });

      const data = await res.json();
      setIsProcessingStripe(false);

      if (data.url && data.mode === 'live_stripe') {
        window.location.href = data.url;
        return;
      }

      if (!data.isStripeConfigured) {
        // Stripe secret key not yet injected in environment
        setErrorMessage('A chave STRIPE_SECRET_KEY não foi encontrada nas variáveis de ambiente. Você pode utilizar a aba "Cartão Direto" abaixo para processar com segurança e validar a compra.');
        setPaymentTab('card');
      }
    } catch (err: any) {
      setIsProcessingStripe(false);
      setErrorMessage('Erro ao conectar com o serviço Stripe: ' + (err.message || 'Tente novamente.'));
    }
  };

  // 2. Direct Card Gateway Flow
  const handleProcessDirectCardPayment = async () => {
    if (!selectedCheckoutItem) return;
    setErrorMessage(null);

    if (!customerName.trim() || customerName.trim().length < 3) {
      setErrorMessage('Por favor, informe o nome completo ou razão social.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      setErrorMessage('Informe um e-mail válido para envio da nota e recibo.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Informe um WhatsApp válido com DDD.');
      return;
    }

    const cleanCpfCnpj = customerCpfCnpj.replace(/\D/g, '');
    if (cleanCpfCnpj.length !== 11 && cleanCpfCnpj.length !== 14) {
      setErrorMessage('Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.');
      return;
    }

    const cleanCard = cardNumber.replace(/\D/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 19) {
      setErrorMessage('Digite os 16 dígitos do cartão de crédito.');
      return;
    }

    if (!cardHolder.trim()) {
      setErrorMessage('Informe o nome impresso no cartão.');
      return;
    }

    const [expMonth, expYear] = cardExpiry.split('/').map(s => parseInt(s, 10));
    if (!expMonth || !expYear || expMonth < 1 || expMonth > 12) {
      setErrorMessage('Data de validade inválida. Digite no formato MM/AA.');
      return;
    }

    if (cardCvc.replace(/\D/g, '').length < 3) {
      setErrorMessage('Código de segurança (CVC/CVV) inválido.');
      return;
    }

    setIsProcessingStripe(true);

    try {
      const res = await fetch('/api/process-direct-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedCheckoutItem.id,
          title: selectedCheckoutItem.title,
          priceInCents: selectedCheckoutItem.priceInCents,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: cleanPhone,
          customerCpfCnpj: cleanCpfCnpj,
          cardNumber: cleanCard,
          cardExpiry,
          cardCvc,
          installments
        })
      });

      const data = await res.json();
      setIsProcessingStripe(false);

      if (!res.ok || data.error) {
        setErrorMessage(data.error || 'Erro ao processar pagamento com cartão.');
        return;
      }

      // Success! Update confirmed order and save in local CRM deals
      setConfirmedOrder(data);

      try {
        const saved = localStorage.getItem('foco_crm_deals_v1');
        const deals = saved ? JSON.parse(saved) : [];
        const newDeal = {
          id: data.orderId,
          empresa: customerName.trim(),
          contatoNome: customerName.trim(),
          telefone: customerPhone,
          email: customerEmail.trim().toLowerCase(),
          nicho: 'Cliente Direto (Stripe)',
          cidade: 'Brasil',
          valor: data.amount,
          stage: 'Fechado',
          servico: selectedCheckoutItem.title,
          dataCriacao: new Date().toLocaleDateString('pt-BR'),
          ultimaInteracao: 'Pagamento Concluído via Stripe Gateway',
          observacoes: `Pedido ${data.orderId} aprovado em ${installments}x de R$ ${data.installmentValue?.toFixed(2)}. Cartão final ${data.cardLast4}.`
        };
        localStorage.setItem('foco_crm_deals_v1', JSON.stringify([newDeal, ...deals]));
      } catch (storageErr) {
        console.error('Storage sync error:', storageErr);
      }
    } catch (err: any) {
      setIsProcessingStripe(false);
      setErrorMessage('Falha ao processar pagamento no servidor: ' + (err.message || 'Tente novamente.'));
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      id="servicos-precos" 
      className="py-16 md:py-24 bg-[#0d0f10] relative border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative rounded-3xl p-7 sm:p-8 bg-[#15181a] border border-slate-800 h-[500px]">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-6" />
                <Skeleton className="h-40 w-full mb-6" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))
          ) : (
            filteredOfferings.map((item, index) => {
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
                  {item.popular && (
                    <div className="absolute -top-3 right-6 px-3.5 py-1 rounded-full bg-cyan-400 text-slate-950 font-mono font-extrabold text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-slate-950" />
                      <span>Destaque / Mais Solicitado</span>
                    </div>
                  )}

                  <div>
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

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>

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

                    <div className="pt-2 pb-4 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-4">
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

                    <div className="space-y-2">
                      <button
                        onClick={() => openCheckoutModal(item)}
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
            })
          )}
        </div>

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
              onClick={() => openCheckoutModal({
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

      {selectedCheckoutItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 rounded-3xl bg-[#121518] border border-cyan-500/40 p-5 sm:p-7 space-y-5 shadow-2xl text-slate-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase font-sans">
                    Checkout Seguro · Stripe
                  </h3>
                  <p className="text-[10px] text-cyan-400 font-mono">
                    Barreira Financeira Criptografada SSL 256 bits · Foco em Dados
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCheckoutItem(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* View 1: Confirmed Order Receipt */}
            {confirmedOrder ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white uppercase font-sans">
                  Pagamento Confirmado via Stripe!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Obrigado por contratar <strong>{confirmedOrder.serviceTitle}</strong>! Sua compra foi autenticada e automatizada com sucesso no sistema.
                </p>

                <div className="p-4 rounded-xl bg-[#090b0d] border border-white/10 text-left font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Protocolo:</span>
                    <span className="font-bold text-cyan-400">{confirmedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Titular:</span>
                    <span className="font-bold text-white">{confirmedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Valor Total:</span>
                    <span className="font-bold text-emerald-400">
                      R$ {confirmedOrder.amount?.toFixed(2)} {confirmedOrder.installments > 1 ? `(${confirmedOrder.installments}x de R$ ${confirmedOrder.installmentValue?.toFixed(2)})` : '(À vista)'}
                    </span>
                  </div>
                  {confirmedOrder.cardLast4 && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cartão:</span>
                      <span className="text-slate-300">Final •••• {confirmedOrder.cardLast4}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCheckoutItem(null);
                      const msg = `Olá Luciano! Acabei de concluir a contratação de "${confirmedOrder.serviceTitle}" via Stripe!\n\n📋 *Protocolo:* ${confirmedOrder.orderId}\n💰 *Valor:* R$ ${confirmedOrder.amount?.toFixed(2)}\n👤 *Titular:* ${confirmedOrder.customerName}\n\nPodemos iniciar o projeto imediatamente?`;
                      onOpenWhatsAppWithMessage(msg);
                    }}
                    className="w-full py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/25 transition-transform hover:scale-101"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Abrir Conversa de Início no WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setSelectedCheckoutItem(null)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs cursor-pointer"
                  >
                    Fechar Recibo
                  </button>
                </div>
              </div>
            ) : (
              /* View 2: Financial Barrier & Payment Options */
              <div className="space-y-4">
                
                {/* Service Summary Card */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#090b0d] border border-white/10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Serviço Selecionado:</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-sans uppercase">{selectedCheckoutItem.title}</h4>
                    <span className="text-[10px] text-cyan-400 font-mono">{selectedCheckoutItem.installmentText}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block font-mono">{selectedCheckoutItem.marketPrice}</span>
                    <span className="text-base sm:text-xl font-extrabold text-cyan-300 font-mono">{selectedCheckoutItem.promotionalPrice}</span>
                  </div>
                </div>

                {/* Section: Customer Details (Mandatory for invoice & contract) */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
                    1. Dados Cadastrais do Comprador (Nota Fiscal e Contrato)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 flex items-center gap-1">
                        <User className="w-3 h-3 text-cyan-400" />
                        <span>Nome Completo / Razão Social:</span>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: Carlos Silva ou Empresa Ltda"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-cyan-400" />
                        <span>E-mail para Recibo & NF:</span>
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="seuemail@empresa.com.br"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        <span>WhatsApp / Telefone com DDD:</span>
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(formatPhone(e.target.value))}
                        placeholder="(11) 99441-1307"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-cyan-400" />
                        <span>CPF ou CNPJ:</span>
                      </label>
                      <input
                        type="text"
                        value={customerCpfCnpj}
                        onChange={(e) => setCustomerCpfCnpj(formatCpfCnpj(e.target.value))}
                        placeholder="000.000.000-00 ou CNPJ"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Payment Method Selector Tabs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                      2. Escolha a Modalidade de Pagamento Stripe
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      SSL Criptografado
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { setPaymentTab('hosted'); setErrorMessage(null); }}
                      className={`p-3 rounded-2xl border text-xs font-mono font-bold transition-all text-left flex flex-col gap-1 cursor-pointer ${
                        paymentTab === 'hosted'
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-cyan-400">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Stripe Checkout</span>
                      </div>
                      <span className="text-[10px] text-slate-300 font-normal">
                        Redirecionamento para Cartão em até 12x, PIX e Boleto
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setPaymentTab('card'); setErrorMessage(null); }}
                      className={`p-3 rounded-2xl border text-xs font-mono font-bold transition-all text-left flex flex-col gap-1 cursor-pointer ${
                        paymentTab === 'card'
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-purple-400">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Cartão Direto</span>
                      </div>
                      <span className="text-[10px] text-slate-300 font-normal">
                        Preenchimento no site via Gateway Seguro
                      </span>
                    </button>
                  </div>

                  {/* Tab 1: Stripe Hosted Checkout */}
                  {paymentTab === 'hosted' && (
                    <div className="p-4 rounded-2xl bg-[#090b0d] border border-white/10 space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300 font-bold">Checkout Hospedado Stripe:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                          Cartão · PIX · Boleto
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                        Ao clicar em prosseguir, você será direcionado para o ambiente oficial de pagamento do <strong>Stripe</strong>. A liberação do seu serviço é automatizada no sistema via Webhooks logo após a confirmação.
                      </p>

                      {stripeConfig && !stripeConfig.isConfigured && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-mono flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                          <span>
                            Chave <code>STRIPE_SECRET_KEY</code> pendente nas variáveis de ambiente. Você pode usar a aba <strong>"Cartão Direto"</strong> para testar a validação do gateway e automação no sistema.
                          </span>
                        </div>
                      )}

                      <button
                        onClick={handleInitiateStripeHostedCheckout}
                        disabled={isProcessingStripe}
                        className={`w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          isProcessingStripe
                            ? 'bg-cyan-500/50 text-slate-950 cursor-wait'
                            : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/25 hover:scale-101'
                        }`}
                      >
                        {isProcessingStripe ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Preparando Sessão Stripe...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 fill-slate-950" />
                            <span>Ir para o Stripe Checkout Oficial</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Tab 2: Direct Card Gateway */}
                  {paymentTab === 'card' && (
                    <div className="p-4 rounded-2xl bg-[#090b0d] border border-white/10 space-y-3 animate-fade-in font-mono text-xs">
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-300 font-bold uppercase">
                          Dados do Cartão de Crédito
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                          {getCardBrand(cardNumber)}
                        </span>
                      </div>

                      {/* Card Number Input */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">Número do Cartão:</label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={23}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs tracking-wider focus:outline-none focus:border-cyan-400 pl-9"
                          />
                          <CreditCard className="w-4 h-4 text-cyan-400 absolute left-3 top-3 pointer-events-none" />
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">Nome impresso no Cartão:</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          placeholder="EX: CARLOS E MENDES"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      {/* Expiry, CVC & Installments Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[11px] text-slate-400">Validade (MM/AA):</label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            placeholder="12/28"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 text-center"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] text-slate-400">CVC / CVV:</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="123"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 text-center tracking-widest"
                          />
                        </div>

                        <div className="space-y-1 col-span-2 sm:col-span-1">
                          <label className="text-[11px] text-slate-400">Parcelas:</label>
                          <select
                            value={installments}
                            onChange={(e) => setInstallments(Number(e.target.value))}
                            className="w-full px-2 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
                          >
                            <option value={1}>1x à vista (R$ {((selectedCheckoutItem.priceInCents) / 100).toFixed(2)})</option>
                            <option value={2}>2x de R$ {((selectedCheckoutItem.priceInCents) / 200).toFixed(2)}</option>
                            <option value={3}>3x de R$ {((selectedCheckoutItem.priceInCents) / 300).toFixed(2)}</option>
                            <option value={6}>6x de R$ {((selectedCheckoutItem.priceInCents) / 600).toFixed(2)}</option>
                            <option value={10}>10x de R$ {((selectedCheckoutItem.priceInCents) / 1000).toFixed(2)}</option>
                            <option value={12}>12x de R$ {((selectedCheckoutItem.priceInCents) / 1200).toFixed(2)}</option>
                          </select>
                        </div>
                      </div>

                      {/* Test credentials helper */}
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
                        <span>Cartão de Validação / Testes Stripe:</span>
                        <code className="text-cyan-400 font-bold">4242 4242 4242 4242</code>
                      </div>

                      <button
                        onClick={handleProcessDirectCardPayment}
                        disabled={isProcessingStripe}
                        className={`w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          isProcessingStripe
                            ? 'bg-cyan-500/50 text-slate-950 cursor-wait'
                            : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/25 hover:scale-101'
                        }`}
                      >
                        {isProcessingStripe ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Validando Cartão no Stripe...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 fill-slate-950" />
                            <span>
                              Pagar {selectedCheckoutItem.promotionalPrice} via Stripe
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-start gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Guarantee & WhatsApp Helper */}
                <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Garantia de 7 dias com entrega técnica por Luciano Tavares Silva.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenWhatsAppWithMessage(`Olá Luciano! Gostaria de tirar uma dúvida antes de concluir o pagamento de "${selectedCheckoutItem.title}" no Stripe.`)}
                    className="hover:text-cyan-400 flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Falar no WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </motion.section>
  );
};
