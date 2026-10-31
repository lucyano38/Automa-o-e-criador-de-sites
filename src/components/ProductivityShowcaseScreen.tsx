import React, { useState } from 'react';
import { 
  Laptop, 
  ExternalLink, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Monitor, 
  Tv, 
  Usb, 
  BatteryCharging, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Clock, 
  ThumbsUp, 
  Share2, 
  Info,
  Tag,
  Star
} from 'lucide-react';

interface ProductivityShowcaseScreenProps {
  onOpenWhatsAppWithMessage?: (msg: string) => void;
}

export const ProductivityShowcaseScreen: React.FC<ProductivityShowcaseScreenProps> = ({
  onOpenWhatsAppWithMessage
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showHubDetailsModal, setShowHubDetailsModal] = useState<boolean>(false);

  // Official Shopee Affiliate Link for Featured Hub USB-C 4 in 1
  const FEATURED_HUB_LINK = 'https://s.shopee.com.br/3qOJDFeali';

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = [
    { id: 'todos', label: 'Todos os Itens' },
    { id: 'conectividade', label: 'Conectividade & Portas' },
    { id: 'ergonomia', label: 'Ergonomia & Saúde' },
    { id: 'monitores', label: 'Monitores & Iluminação' },
    { id: 'audio-video', label: 'Áudio & Vídeo' }
  ];

  const products = [
    {
      id: 'hub-usbc-4em1',
      featured: true,
      category: 'conectividade',
      title: 'Adaptador Hub USB-C 4 em 1 (HDMI 4K, VGA, USB 3.0 e Power Delivery 100W)',
      shortDesc: 'Aumente imediatamente a capacidade do seu notebook: conecte telas 4K, projetores de reuniões, periféricos velozes e carregue seu computador com até 100W em uma só porta.',
      fullDesc: 'Transforme uma única porta USB-C em uma estação de trabalho completa. Permite conectar um monitor Ultra HD 4K via HDMI ou projetores convencionais via VGA para apresentações com clientes, transferir dados ultrarrápidos em USB 3.0 de 5Gbps e manter o notebook recarregando com estabilidade total através do USB-C Power Delivery 100W.',
      badgeText: '★ RECOMENDAÇÃO #1 · CURADORIA FOCO EM DADOS',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      rating: 4.9,
      reviewsCount: 1420,
      affiliateUrl: FEATURED_HUB_LINK,
      buttonText: 'Garantir na Shopee com Desconto',
      priceEstimate: 'Oferta especial Shopee Brasil',
      shippingBadge: 'Frete Grátis & Estoque Nacional',
      specs: [
        { label: 'HDMI 4K @ 30Hz', detail: 'Imagens ultra nítidas em monitores e TVs 4K' },
        { label: 'VGA Full HD 1080p', detail: 'Compatibilidade com projetores e telas legadas' },
        { label: 'USB 3.0 SuperSpeed', detail: 'Taxa de até 5Gbps para mouses, teclados e pen drives' },
        { label: 'Power Delivery 100W', detail: 'Carregamento pass-through contínuo sem perder a porta' },
        { label: 'Chassi em Alumínio', detail: 'Dissipação térmica passiva sem ruído' }
      ],
      productivityBenefit: 'Economiza até 40 minutos diários eliminando a troca de cabos e viabilizando trabalho com multitelas para cruzamento de dados e prospecção.',
      imageSvg: (
        <div className="relative w-full rounded-xl overflow-hidden border border-cyan-500/30 group bg-slate-900 shadow-xl">
          <a
            href={FEATURED_HUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative h-64 bg-slate-950 overflow-hidden cursor-pointer"
            title="Ver Hub USB-C 4 em 1 com desconto na Shopee"
          >
            <img
              src="/assets/aistudio/sg-11134301-7rdxp-mdbgafdnksu8e7_resize_w1920_nl_da083a10.webp"
              alt="Hub USB-C 4 em 1 HDMI 4K VGA USB 3.0 PD 100W"
              className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-cyan-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded shadow">
              FOTO OFICIAL DO PRODUTO
            </div>
            <div className="absolute bottom-3 right-3 bg-slate-900/90 text-cyan-300 text-[11px] font-mono px-2.5 py-1 rounded border border-cyan-500/40 shadow flex items-center gap-1">
              <span>Ver na Shopee</span>
              <span>↗</span>
            </div>
          </a>
          <div className="p-2.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
            <a
              href={FEATURED_HUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <img
                src="/assets/aistudio/sg-11134301-7rdxt-mdbgq5ed9wlc2e_resize_w1920_nl_1f787ac0.webp"
                alt="Hub USB-C 4 em 1 vista lateral"
                className="w-8 h-8 object-cover rounded border border-cyan-500/40"
              />
              <span className="text-[11px] font-mono text-cyan-400">Ver chassi em alumínio & conexões ↗</span>
            </a>
            <span className="text-[10px] text-slate-500 font-mono">100W PD + 4K</span>
          </div>
        </div>
      )
    },
    {
      id: 'suporte-notebook',
      featured: false,
      category: 'ergonomia',
      title: 'Suporte Articulado Ergonômico de Alumínio para Notebook',
      shortDesc: 'Ajuste de altura e ângulo militar que coloca a tela no campo visual natural, aliviando a tensão cervical em jornadas de prospecção e fechamento.',
      fullDesc: 'Construído em liga de alumínio reforçado com almofadas de silicone antiderrapante. Facilita a refrigeração do notebook por fluxo de ar livre e mantém postura ergonômica ideal de acordo com as normas de saúde do trabalho.',
      badgeText: 'ERGONOMIA AVANÇADA',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      rating: 4.8,
      reviewsCount: 950,
      affiliateUrl: 'https://shopee.com.br/search?keyword=suporte%20articulado%20notebook%20aluminio',
      buttonText: 'Ver Opções com Desconto na Shopee',
      priceEstimate: 'Excelente custo-benefício',
      shippingBadge: 'Estoque Brasil · Envio Rápido',
      specs: [
        { label: 'Estrutura em Alumínio', detail: 'Suporta laptops de até 17 polegadas sem oscilar' },
        { label: 'Ângulo Ajustável', detail: 'Ajuste contínuo de elevação de 5cm a 30cm' },
        { label: 'Ventilação Passiva', detail: 'Evita estrangulamento térmico do processador' },
        { label: 'Base Antiderrapante', detail: 'Protege a mesa e firma a digitação' }
      ],
      productivityBenefit: 'Elimina dores lombares e fadiga no pescoço após longas horas gerenciando leads e contatos no CRM.',
      imageSvg: (
        <div className="w-full h-44 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <Laptop className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">Suporte Ajustável 360°</span>
            <p className="text-[10px] text-slate-400 mt-1">Compatível com MacBooks, Dells, ThinkPads e Positivo</p>
          </div>
        </div>
      )
    },
    {
      id: 'mouse-vertical',
      featured: false,
      category: 'ergonomia',
      title: 'Mouse Ergonômico Vertical Sem Fio (Sensor Óptico 2.4G & Bluetooth)',
      shortDesc: 'Postura anatômica em 57° que reduz a compressão do túnel do carpo durante a navegação massiva por planilhas e plataformas de vendas.',
      fullDesc: 'Desenvolvido para profissionais digitais que passam mais de 6 horas por dia utilizando o cursor. Os botões laterais de avanço e retorno aceleram a navegação entre abas de CRM, WhatsApp Web e relatórios.',
      badgeText: 'PREVENÇÃO LER / DORT',
      badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      rating: 4.8,
      reviewsCount: 810,
      affiliateUrl: 'https://shopee.com.br/search?keyword=mouse%20vertical%20ergonomico%20sem%20fio',
      buttonText: 'Ver na Shopee com Desconto',
      priceEstimate: 'Preço acessível',
      shippingBadge: 'Cupom Shopee Ativo',
      specs: [
        { label: 'Ângulo de 57°', detail: 'Alinhamento natural dos tendões do antebraço' },
        { label: 'DPI Ajustável (800-1600)', detail: 'Precisão milimétrica em telas de alta densidade' },
        { label: 'Cliques Silenciosos', detail: 'Sem ruído incômodo em chamadas e reuniões' },
        { label: 'Conexão Híbrida', detail: 'Dongle USB + Bluetooth 5.0' }
      ],
      productivityBenefit: 'Permite rolar e selecionar dezenas de leads sem fadiga nos tendões ou cansaço no punho.',
      imageSvg: (
        <div className="w-full h-44 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-2">
              <Sliders className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">Ângulo Biomecânico de 57°</span>
            <p className="text-[10px] text-slate-400 mt-1">Conforto imediato no punho e antebraço</p>
          </div>
        </div>
      )
    },
    {
      id: 'luminaria-screenbar',
      featured: false,
      category: 'monitores',
      title: 'Luminária Screenbar LED para Monitor (Luz Anti-Reflexo USB com Dimmer)',
      shortDesc: 'Iluminação focal no teclado e mesa sem reflexos indesejados no monitor. Ideal para sessões noturnas de análise e programação sem cansaço nos olhos.',
      fullDesc: 'Encaixa-se no topo da moldura de qualquer monitor tradicional ou curvo. Possui 3 temperaturas de cor (quente, neutra e fria) e ajuste contínuo de brilho tátil, alimentando-se de qualquer porta USB.',
      badgeText: 'CONFORTO VISUAL',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      rating: 4.9,
      reviewsCount: 640,
      affiliateUrl: 'https://shopee.com.br/search?keyword=screenbar%20led%20monitor%20usb',
      buttonText: 'Ver na Shopee com Desconto',
      priceEstimate: 'Excelente investimento',
      shippingBadge: 'Envio Seguro',
      specs: [
        { label: 'Feixe Assimétrico', detail: 'Zero reflexo ou brilho direto no display' },
        { label: '3 Temperaturas de Cor', detail: '3000K, 4500K e 6500K para foco ou relaxamento' },
        { label: 'Controle Tátil Touch', detail: 'Ajuste de intensidade com um toque' },
        { label: 'Alimentação USB 5V', detail: 'Pode ser ligada diretamente no Hub USB-C' }
      ],
      productivityBenefit: 'Reduz o ressecamento e a queimação ocular durante análises profundas de dados em ambientes com baixa luz.',
      imageSvg: (
        <div className="w-full h-44 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
              <Eye className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">Zero Reflexo na Tela</span>
            <p className="text-[10px] text-slate-400 mt-1">Conforto visual certificado para longas sessões</p>
          </div>
        </div>
      )
    },
    {
      id: 'webcam-1080p',
      featured: false,
      category: 'audio-video',
      title: 'Webcam Profissional Full HD 1080p com Microfone Estéreo & Tampa de Privacidade',
      shortDesc: 'Apresente seus projetos e feche vendas por videochamada transmitindo autoridade visual, nitidez cinematográfica e áudio cristalino.',
      fullDesc: 'Câmera com correção automática de pouca luz, foco automático dinâmico e microfones duplos com redução de ruído de fundo. Perfeita para reuniões no Google Meet, Zoom e transmissões ao vivo.',
      badgeText: 'AUTORIDADE EM REUNIÕES',
      badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      rating: 4.7,
      reviewsCount: 520,
      affiliateUrl: 'https://shopee.com.br/search?keyword=webcam%20full%20hd%201080p%20microfone',
      buttonText: 'Ver na Shopee com Desconto',
      priceEstimate: 'Melhor custo para call de vendas',
      shippingBadge: 'Pronta Entrega',
      specs: [
        { label: 'Resolução 1080p 30/60fps', detail: 'Imagens límpidas sem granulação' },
        { label: 'Microfone Duplo Estéreo', detail: 'Captação direcional de voz com filtro de eco' },
        { label: 'Tampa Física de Segurança', detail: 'Garante privacidade absoluta quando desligada' },
        { label: 'Suporte Articulado', detail: 'Encaixe em monitor ou tripé universal de mesa' }
      ],
      productivityBenefit: 'Aumenta a taxa de conversão em demonstrações de software ao transmitir seriedade e postura corporativa.',
      imageSvg: (
        <div className="w-full h-44 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">Full HD 1080p + Cancelamento de Ruído</span>
            <p className="text-[10px] text-slate-400 mt-1">Imprescindível para fechar clientes em reuniões online</p>
          </div>
        </div>
      )
    },
    {
      id: 'teclado-mecanico-compacto',
      featured: false,
      category: 'ergonomia',
      title: 'Teclado Mecânico Compacto Sem Fio (Bluetooth / 2.4G & Cabo USB-C)',
      shortDesc: 'Digitação rápida, silenciosa e precisa com design compacto que libera mais espaço na mesa para amplitude livre do mouse.',
      fullDesc: 'Design clean sem teclado numérico lateral excessivo para manter os braços alinhados aos ombros. Conecta-se em até 3 dispositivos simultaneamente (notebook, tablet e smartphone).',
      badgeText: 'PRECISÃO & ESPAÇO LIVRE',
      badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
      rating: 4.8,
      reviewsCount: 770,
      affiliateUrl: 'https://shopee.com.br/search?keyword=teclado%20mecanico%20compacto%20sem%20fio%20bluetooth',
      buttonText: 'Ver na Shopee com Desconto',
      priceEstimate: 'Excelente durabilidade',
      shippingBadge: 'Frete Promocional',
      specs: [
        { label: 'Conexão Tripla', detail: 'Bluetooth 5.0 + Dongle 2.4Ghz + Cabo USB-C' },
        { label: 'Layout Compacto 75%', detail: 'Todas as setas e funções mantendo a mesa organizada' },
        { label: 'Switches Macios', detail: 'Resposta tátil prazerosa sem cliques barulhentos' },
        { label: 'Bateria de Longa Duração', detail: 'Semanas de uso contínuo com uma única carga' }
      ],
      productivityBenefit: 'Permite digitar propostas comerciais e scripts de abordagem com maior velocidade e zero fadiga digital.',
      imageSvg: (
        <div className="w-full h-44 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2">
              <Zap className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">Layout Compacto 75% Multi-Device</span>
            <p className="text-[10px] text-slate-400 mt-1">Troca instantânea entre computador e celular</p>
          </div>
        </div>
      )
    }
  ];

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'todos') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner / Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0b1723] via-[#0f1f2e] to-[#0a141d] border border-cyan-500/30 p-6 md:p-8 shadow-2xl shadow-cyan-950/40 overflow-hidden">
        
        {/* Subtle grid pattern & glowing orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          
          {/* Badges bar */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Vitrine de Produtividade & Afiliados Shopee
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Homologado para Foco em Dados
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              Links Oficiais com Desconto
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Kit de Produtividade & <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Setup recomendado</span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Equipamentos e periféricos selecionados para quem opera prospecção ativa, fechamento comercial e análise de dados em alto volume. Projetados para eliminar gargalos físicos, viabilizar multitelas e manter sua saúde postural 100% preservada.
          </p>

          {/* Quick Stats bar */}
          <div className="mt-6 pt-5 border-t border-cyan-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <div className="text-slate-400">Tempo Médio Poupado</div>
              <div className="text-cyan-300 font-bold text-sm">+4.5 horas / semana</div>
            </div>
            <div>
              <div className="text-slate-400">Hub Recomendado</div>
              <div className="text-emerald-300 font-bold text-sm">4 em 1 com PD 100W</div>
            </div>
            <div>
              <div className="text-slate-400">Canal de Compra</div>
              <div className="text-white font-bold text-sm">Shopee Oficial Brasil</div>
            </div>
            <div>
              <div className="text-slate-400">Suporte ao Ecossistema</div>
              <div className="text-amber-300 font-bold text-sm">Comissão Reinvestida</div>
            </div>
          </div>

        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950 font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ===================================================================== */}
      {/* FEATURED PRODUCT HIGHLIGHT CARD (#1 - Hub USB-C 4 em 1) */}
      {/* ===================================================================== */}
      {(selectedCategory === 'todos' || selectedCategory === 'conectividade') && (
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1622] via-[#0f1d2c] to-[#0a1219] border-2 border-cyan-500/50 p-6 md:p-8 shadow-2xl shadow-cyan-950/60 transition-all">
          
          {/* Top highlight ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-extrabold tracking-wide shadow-sm">
              <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              DESTAQUE ABSOLUTO · O CORAÇÃO DO SEU SETUP
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                4.9 / 5.0
              </span>
              <span className="text-slate-400">(1.420+ profissionais usam)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual representation */}
            <div className="lg:col-span-5">
              {products[0].imageSvg}
              
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Envio do Brasil (Sem Taxa)
                </span>
                <span className="text-[11px] font-mono text-cyan-400/80">Código: 3qOJDFeali</span>
              </div>
            </div>

            {/* Information & Action Callout */}
            <div className="lg:col-span-7 space-y-4">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {products[0].title}
                </h2>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  {products[0].shortDesc}
                </p>
              </div>

              {/* Specs Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {products[0].specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0"></div>
                    <div>
                      <div className="text-xs font-bold text-white">{spec.label}</div>
                      <div className="text-[11px] text-slate-400 leading-tight">{spec.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Productivity impact callout */}
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <strong className="text-cyan-300 block mb-0.5">Impacto Direto na Produtividade:</strong>
                  {products[0].productivityBenefit}
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* Official Shopee Affiliate Button (MANDATORY EXACT LINK) */}
                <a
                  href={FEATURED_HUB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:via-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Garantir na Shopee com Desconto</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                {/* Copy Link Button */}
                <button
                  onClick={() => handleCopyLink(FEATURED_HUB_LINK, 'hub-main')}
                  className="px-4 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-cyan-500/40 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                  title="Copiar link oficial da Shopee"
                >
                  {copiedId === 'hub-main' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copiar Link</span>
                    </>
                  )}
                </button>

              </div>

              {/* Affiliate Disclosure Notice */}
              <p className="text-[11px] text-slate-400 font-mono">
                * Link de afiliado oficial do ecossistema Foco em Dados na Shopee. Você garante o melhor preço com descontos ativos e ajuda a manter a evolução da nossa plataforma.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* COMPREHENSIVE PRODUCT GRID */}
      {/* ===================================================================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Equipamentos Homologados para o Setup
            </h3>
            <p className="text-xs text-slate-400">
              Cards com especificações técnicas e links para garantir as melhores condições na Shopee.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30">
            {filteredProducts.length} itens encontrados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const isFeatured = prod.id === 'hub-usbc-4em1';
            return (
              <div
                key={prod.id}
                className={`flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 ${
                  isFeatured 
                    ? 'bg-gradient-to-b from-[#0f1f2e] to-[#0c1622] border-2 border-cyan-400/60 shadow-xl shadow-cyan-950/50' 
                    : 'bg-[#11161d] border border-slate-800 hover:border-cyan-500/40 hover:bg-[#131b24]'
                }`}
              >
                <div>
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${prod.badgeColor}`}>
                      {prod.badgeText}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>

                  {/* Product visual preview */}
                  <div className="mb-4">
                    {prod.imageSvg}
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-bold text-white leading-tight mb-2">
                    {prod.title}
                  </h4>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {prod.shortDesc}
                  </p>

                  {/* Key Highlights / Specs */}
                  <div className="space-y-1.5 mb-4 pt-2 border-t border-white/5">
                    {prod.specs.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-semibold text-slate-200">{s.label}:</span>
                        <span className="text-slate-400 truncate">{s.detail}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span>{prod.shippingBadge}</span>
                    <span className="text-emerald-400 font-bold">{prod.priceEstimate}</span>
                  </div>

                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      isFeatured
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20'
                        : 'bg-white/10 hover:bg-cyan-500/20 text-white hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30'
                    }`}
                  >
                    <span>{prod.buttonText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleCopyLink(prod.affiliateUrl, prod.id)}
                    className="w-full text-center text-[10px] text-slate-400 hover:text-slate-200 py-1 transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    {copiedId === prod.id ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Link copiado para a área de transferência!
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copiar link de recomendação
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* WHY THIS SETUP MATTERS FOR B2B PROSPECTING */}
      {/* ===================================================================== */}
      <div className="rounded-2xl bg-[#0f141b] border border-cyan-500/20 p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Laptop className="w-5 h-5 text-cyan-400" />
          Por que recomendamos essa infraestrutura para membros do Foco em Dados?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          A diferença entre uma equipe de prospecção com faturamento comum e uma operação escalável está na ergonomia e na velocidade de resposta. O tempo perdido conectando cabos soltos, tolerando telas pequenas ou sofrendo com dores musculares impacta diretamente a taxa de conversão.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Visão Multitelas 4K</h4>
            <p className="text-xs text-slate-400">
              Mantenha o painel do Google Maps e Receita Federal em uma tela enquanto dispara mensagens de WhatsApp no monitor principal sem alternar abas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Carga Rápida 100W PD</h4>
            <p className="text-xs text-slate-400">
              O Hub 4 em 1 alimenta seu laptop sem gastar portas adicionais, prevenindo quedas de bateria repentinas durante apresentações de propostas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Postura & Saúde no Trabalho</h4>
            <p className="text-xs text-slate-400">
              Com o suporte de notebook e mouse vertical, a ergonomia previne lesões por esforço repetitivo (LER) e fadiga muscular no final do dia.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
