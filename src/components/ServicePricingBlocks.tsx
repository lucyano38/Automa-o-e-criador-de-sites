import React from 'react';
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
  Film
} from 'lucide-react';

interface ServicePricingBlocksProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const ServicePricingBlocks: React.FC<ServicePricingBlocksProps> = ({ onOpenWhatsAppWithMessage }) => {
  const offerings = [
    {
      id: 'site-simples',
      title: 'CRIAÇÃO DE SITE PROFISSIONAL',
      badge: 'Site Institucional & Presença Digital',
      icon: Globe,
      accentColor: 'border-cyan-500/30 hover:border-cyan-400',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      description: 'Ideal para profissionais liberais, pequenos negócios e empresas que precisam de uma página limpa, veloz e altamente confiável na internet.',
      deliverables: [
        'Até 3 seções/páginas (Início, Sobre/Serviços, Contato)',
        'Layout 100% Responsivo (Perfeito no Celular e Computador)',
        'Botão flutuante do WhatsApp integrado para atendimento imediato',
        'Carregamento rápido em menos de 1 segundo (Google PageSpeed 95+)'
      ],
      marketPrice: 'R$ 1.200 a R$ 2.500',
      lucianoPrice: 'R$ 490,00',
      customTag: 'A partir de ou Sob Medida',
      popular: false
    },
    {
      id: 'landing-page',
      title: 'LANDING PAGE DE ALTA CONVERSÃO',
      badge: 'Página de Vendas & Foco em Leads',
      icon: Rocket,
      accentColor: 'border-cyan-400 hover:border-cyan-300 shadow-cyan-500/10',
      badgeBg: 'bg-cyan-500 text-slate-950 font-extrabold',
      description: 'Desenvolvida estrategicamente para campanhas no Google e Instagram Ads para transformar visitantes em clientes compradores.',
      deliverables: [
        'Copywriting & Headline estratégica com proposta de valor clara',
        'Formulário de captura e botão de WhatsApp com mensagem pronta',
        'Instalação de Pixels (Meta Ads, Google Ads e Analytics)',
        'Design moderno, veloz e otimizado para gerar contatos diários'
      ],
      marketPrice: 'R$ 1.500 a R$ 3.500',
      lucianoPrice: 'R$ 590,00',
      customTag: 'A partir de ou Sob Medida',
      popular: true
    },
    {
      id: 'loja-virtual',
      title: 'E-COMMERCE & LOJA VIRTUAL',
      badge: 'Catálogo de Produtos & Vendas Online',
      icon: ShoppingBag,
      accentColor: 'border-purple-500/30 hover:border-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      description: 'Sua loja funcionando 24h por dia para receber pedidos, mostrar seus produtos e aceitar pagamentos com praticidade.',
      deliverables: [
        'Catálogo organizado com fotos, preços e opções de produtos',
        'Carrinho de compras e recebimento de pedidos no WhatsApp',
        'Integração com pagamento seguro via Pix e Cartão de Crédito',
        'Painel simples para você atualizar estoque e adicionar produtos'
      ],
      marketPrice: 'R$ 2.800 a R$ 6.000',
      lucianoPrice: 'R$ 1.200,00',
      customTag: 'A partir de ou Sob Medida',
      popular: false
    },
    {
      id: 'automacao-atendimento',
      title: 'AUTOMAÇÃO DE ATENDIMENTO 24H',
      badge: 'Bot WhatsApp & Telegram Inteligente',
      icon: Bot,
      accentColor: 'border-emerald-500/30 hover:border-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      description: 'Atendimento automático no seu WhatsApp para responder dúvidas, qualificar clientes e enviar orçamento enquanto você dorme.',
      deliverables: [
        'Menu interativo e respostas automáticas instantâneas no WhatsApp',
        'Encaminhamento de leads e notificações em tempo real no Telegram/E-mail',
        'Agendamento automático de consultas, reuniões ou serviços',
        'Sem mensalidades abusivas de plataformas de terceiros'
      ],
      marketPrice: 'R$ 1.800 a R$ 4.500',
      lucianoPrice: 'R$ 690,00',
      customTag: 'A partir de ou Sob Medida',
      popular: false
    },
    {
      id: 'edicao-video-ia',
      title: 'EDIÇÃO AUTOMÁTICA DE VÍDEO & REELS',
      badge: 'Cortes Dinâmicos, Legendas & Retenção',
      icon: Video,
      accentColor: 'border-amber-500/30 hover:border-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      description: 'Transforme gravações brutas em vídeos virais e magnéticos com legendas Alex Hormozi, cortes de silêncio e zooms de retenção.',
      deliverables: [
        'Corte automático de pausas e silêncios (jump-cuts de alta retenção)',
        'Legendas dinâmicas palavra por palavra no estilo Hormozi / TikTok',
        'Auto Zoom dinâmico e inserção de emojis/B-rolls contextuais',
        'Pacotes avulsos ou mensais para Reels, Shorts e TikTok prontos para postar'
      ],
      marketPrice: 'R$ 1.200 a R$ 3.000 / mês',
      lucianoPrice: 'R$ 390,00',
      customTag: 'Pacote a partir de ou Por Vídeo',
      popular: false
    }
  ];

  return (
    <section id="servicos-precos" className="py-16 md:py-24 bg-[#0d0f10] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOLUÇÕES COM COMPARAÇÃO TRANSPARENTE DE PREÇOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            SOLUÇÕES & <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">VALORES TRANSPARENTES</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Desenvolvimento de alta tecnologia com custo-benefício direto e garantia de qualidade do titular.
          </p>
        </motion.div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {offerings.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`relative rounded-3xl p-7 sm:p-8 bg-[#15181a] border ${item.accentColor} transition-all duration-300 shadow-2xl flex flex-col justify-between group`}
              >
                {/* Popular Ribbon Tag */}
                {item.popular && (
                  <div className="absolute -top-3 right-6 px-3.5 py-1 rounded-full bg-cyan-400 text-slate-950 font-mono font-extrabold text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-950" />
                    <span>Mais Solicitado</span>
                  </div>
                )}

                <div>
                  {/* Top Header: Badge & Title */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="space-y-1.5">
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

                  {/* Short Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Deliverables Checklist (Clean & Direct) */}
                  <div className="space-y-3 py-4 border-t border-white/10 mb-6">
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
                </div>

                {/* Price Comparison Box & Action CTA */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  
                  {/* Price Comparison Row */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0f1112] border border-white/10">
                    {/* Market Price */}
                    <div className="space-y-0.5 border-r border-white/10 pr-2">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-500" />
                        <span>Preço de Mercado</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-slate-400 line-through">
                        {item.marketPrice}
                      </div>
                    </div>

                    {/* Luciano Price */}
                    <div className="space-y-0.5 pl-1">
                      <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <TrendingDown className="w-3 h-3 text-emerald-400" />
                        <span>Comigo (Luciano)</span>
                      </div>
                      <div className="text-base sm:text-xl font-mono font-extrabold text-cyan-300">
                        {item.lucianoPrice}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onOpenWhatsAppWithMessage(`Olá Luciano! Gostaria de um orçamento para "${item.title}".`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-extrabold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Pedir Orçamento de {item.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Combo / Highlight Banner */}
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
              <span>COMBO PROMOCIONAL COMPLETO</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
              LANDING PAGE + AUTOMAÇÃO DE WHATSAPP 24H
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Tenha uma página profissional trazendo clientes e um bot de mensagens respondendo instantaneamente 24 horas por dia.
            </p>
          </div>

          <button
            onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Vi o Combo Promocional "Landing Page + Automação de WhatsApp" no site e quero saber os detalhes.')}
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
