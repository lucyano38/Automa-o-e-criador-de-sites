import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Globe, 
  Laptop, 
  Smartphone, 
  Tablet, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  Zap, 
  Award, 
  Clock, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  ChevronRight, 
  RefreshCw, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  User, 
  DollarSign, 
  Share2, 
  Edit3, 
  Eye, 
  Settings, 
  X,
  Layers,
  ShoppingBag,
  Star
} from 'lucide-react';

interface DomainSuggestion {
  domain: string;
  tld: string;
  type: string;
  status: string;
  price: string;
  recommended: boolean;
  registerUrl: string;
}

interface SiteTheme {
  paletteName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBg: string;
  textColor: string;
}

interface GeneratedSite {
  businessName: string;
  niche: string;
  tagline: string;
  theme: SiteTheme;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: Array<{ label: string; value: string }>;
  };
  benefits: Array<{ title: string; description: string; icon: string }>;
  services: Array<{ title: string; price: string; description: string; features: string[] }>;
  testimonials: Array<{ name: string; role: string; city: string; comment: string; rating: number }>;
  ctaSection: {
    title: string;
    description: string;
    buttonText: string;
    guarantee: string;
  };
  footer: {
    cnpj: string;
    address: string;
    phone: string;
    whatsapp: string;
    copyright: string;
  };
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  field?: 'niche' | 'companyName' | 'primaryGoal' | 'preferredColors' | 'additionalNotes';
}

interface AiSiteBuilderScreenProps {
  onOpenWhatsAppWithMessage?: (msg: string) => void;
}

export const AiSiteBuilderScreen: React.FC<AiSiteBuilderScreenProps> = ({ onOpenWhatsAppWithMessage }) => {
  // Chat & input state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [chatInput, setChatInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [sandboxModalOpen, setSandboxModalOpen] = useState<boolean>(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // Form parameters
  const [niche, setNiche] = useState<string>('Clínica Odontológica');
  const [companyName, setCompanyName] = useState<string>('Sorriso Real');
  const [primaryGoal, setPrimaryGoal] = useState<string>('Agendamento de Consultas pelo WhatsApp');
  const [preferredColors, setPreferredColors] = useState<string>('Cyber Cyan & Dark Slate');
  const [additionalNotes, setAdditionalNotes] = useState<string>('Atendimento 24h e especialistas em implantes');

  // Affiliate code custom settings (stored in localStorage)
  const [hostingerCode, setHostingerCode] = useState<string>(() => {
    return localStorage.getItem('affiliate_hostinger_code') || 'FOCOEMDADOS';
  });
  const [hostgatorCode, setHostgatorCode] = useState<string>(() => {
    return localStorage.getItem('affiliate_hostgator_code') || 'FOCOEMDADOS';
  });

  // Generated results state
  const [siteData, setSiteData] = useState<GeneratedSite | null>(null);
  const [domainSuggestions, setDomainSuggestions] = useState<DomainSuggestion[]>([]);
  const [provisionalUrl, setProvisionalUrl] = useState<string>('');
  const [previewId, setPreviewId] = useState<string>('');

  // Initial guided conversation history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Olá! Sou o Construtor Inteligente de Sites do Foco em Dados. Vou guiar você em 4 passos rápidos para gerar um site profissional com alta conversão, sugerir domínios disponíveis e preparar sua monetização de hospedagem com links de afiliados.',
      timestamp: 'Agora'
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Para começar: Qual é o nicho ou ramo de atuação da empresa que vamos criar o site?',
      timestamp: 'Agora',
      options: [
        '🦷 Clínica Odontológica / Estética',
        '⚖️ Advocacia & Assessoria Jurídica',
        '🍕 Restaurante & Pizzaria Artesanal',
        '🚗 Oficina Mecânica & Auto Center',
        '🏗️ Construtora & Arquitetura',
        '🏋️ Academia & Personal Trainer',
        '🛒 Loja de Moda / E-commerce Local',
        '💻 Consultoria & Serviços B2B'
      ],
      field: 'niche'
    }
  ]);

  // Handle guided question answers
  const handleSelectOption = (option: string, field?: string) => {
    const cleanOption = option.replace(/^[^\s]+\s/, ''); // remove emoji prefix for clean text
    const targetField = field || (currentStep === 1 ? 'niche' : currentStep === 2 ? 'companyName' : currentStep === 3 ? 'primaryGoal' : 'preferredColors');

    if (targetField === 'niche') {
      setNiche(cleanOption);
      addMessageAndAdvance(cleanOption, 2, 'Qual é o nome da empresa ou marca do seu cliente?');
    } else if (targetField === 'companyName') {
      setCompanyName(cleanOption);
      addMessageAndAdvance(cleanOption, 3, 'Qual o principal objetivo do site?', [
        'Agendamento de Consultas pelo WhatsApp',
        'Captação de Orçamentos e Propostas Rápidas',
        'Venda Direta com Cardápio/Catálogo Online',
        'Autoridade e Posicionamento Regional no Google'
      ], 'primaryGoal');
    } else if (targetField === 'primaryGoal') {
      setPrimaryGoal(cleanOption);
      addMessageAndAdvance(cleanOption, 4, 'Qual paleta de cores ou identidade visual você prefere?', [
        'Cyber Cyan & Dark Slate (#06b6d4 e #0d0f10)',
        'Gold Prestige & Deep Noir (#eab308 e #0a0a0c)',
        'Emerald Growth & Graphite (#10b981 e #111827)',
        'Royal Blue & Corporate Navy (#3b82f6 e #0f172a)',
        'Ruby Crimson & Slate Dark (#f43f5e e #0f172a)'
      ], 'preferredColors');
    } else if (targetField === 'preferredColors') {
      setPreferredColors(cleanOption);
      addMessageAndAdvance(cleanOption, 5, 'Perfeito! Todas as informações foram coletadas. Clique no botão abaixo para gerar o site, calcular os domínios e criar seu link provisório de teste.');
    }
  };

  const handleSendCustomText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const text = chatInput.trim();
    setChatInput('');

    if (currentStep === 1) {
      setNiche(text);
      addMessageAndAdvance(text, 2, 'Excelente! E qual é o nome oficial da empresa ou marca?');
    } else if (currentStep === 2) {
      setCompanyName(text);
      addMessageAndAdvance(text, 3, 'Qual o objetivo principal que o site deve cumprir?', [
        'Agendamento de Consultas pelo WhatsApp',
        'Captação de Orçamentos e Propostas Rápidas',
        'Venda Direta com Cardápio/Catálogo Online',
        'Autoridade e Posicionamento Regional no Google'
      ], 'primaryGoal');
    } else if (currentStep === 3) {
      setPrimaryGoal(text);
      addMessageAndAdvance(text, 4, 'Qual paleta de cores ou estilo visual combina mais?', [
        'Cyber Cyan & Dark Slate (#06b6d4 e #0d0f10)',
        'Gold Prestige & Deep Noir (#eab308 e #0a0a0c)',
        'Emerald Growth & Graphite (#10b981 e #111827)',
        'Royal Blue & Corporate Navy (#3b82f6 e #0f172a)'
      ], 'preferredColors');
    } else if (currentStep === 4) {
      setPreferredColors(text);
      addMessageAndAdvance(text, 5, 'Tudo pronto! Clique em "Gerar Site Profissional com IA" para processar a estrutura completa.');
    } else {
      setAdditionalNotes(text);
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: 'user', text, timestamp: 'Agora' },
        { id: String(Date.now() + 1), sender: 'ai', text: 'Nota adicional registrada! Você já pode gerar ou atualizar a estrutura do site.', timestamp: 'Agora' }
      ]);
    }
  };

  const addMessageAndAdvance = (userText: string, nextStep: number, nextQuestion: string, options?: string[], field?: any) => {
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'user',
        text: userText,
        timestamp: 'Agora'
      },
      {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: nextQuestion,
        timestamp: 'Agora',
        options,
        field
      }
    ]);
    setCurrentStep(nextStep);
  };

  // Trigger site generation API call
  const triggerGenerateSite = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          companyName,
          primaryGoal,
          preferredColors,
          additionalNotes
        })
      });

      const data = await response.json();
      if (data.site) {
        setSiteData(data.site);
        setDomainSuggestions(data.domainSuggestions || []);
        setProvisionalUrl(data.provisionalUrl || `https://preview.focoemdados.com.br/s/${data.previewId || 'demo'}`);
        setPreviewId(data.previewId || 'demo');

        // Add confirmation message to chat
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            sender: 'ai',
            text: `🎉 Site para "${companyName}" gerado com sucesso! Confira o preview dinâmico ao lado, verifique as opções de domínio sugeridas e use seu link de afiliado para monetizar a publicação com a Hostinger ou HostGator.`,
            timestamp: 'Agora'
          }
        ]);
      }
    } catch (err) {
      console.error('Error generating site:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate an initial site on mount if none exists
  useEffect(() => {
    if (!siteData) {
      triggerGenerateSite();
    }
  }, []);

  // Save affiliate codes
  const handleSaveAffiliateCodes = () => {
    localStorage.setItem('affiliate_hostinger_code', hostingerCode);
    localStorage.setItem('affiliate_hostgator_code', hostgatorCode);
    setSettingsOpen(false);
  };

  // Copy provisional preview link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(provisionalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Copy domain
  const handleCopyDomain = (domain: string) => {
    navigator.clipboard.writeText(domain);
    setCopiedDomain(domain);
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  // Export full HTML code
  const handleExportHtml = () => {
    if (!siteData) return;

    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteData.businessName} - ${siteData.tagline}</title>
  <meta name="description" content="${siteData.hero.subheadline}">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0d0f10] text-slate-100 font-sans antialiased">
  <!-- Header -->
  <header class="border-b border-white/10 bg-[#0a0c0e]/90 backdrop-blur sticky top-0 z-50 py-4 px-6">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-cyan-400 font-black text-xl">⚡</span>
        <span class="font-extrabold text-white text-lg tracking-tight uppercase">${siteData.businessName}</span>
      </div>
      <a href="https://wa.me/${siteData.footer.whatsapp}?text=Ol%C3%A1!+Vi+o+site+e+gostaria+de+um+or%C3%A7amento" target="_blank" class="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider">
        ${siteData.hero.primaryCta}
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 px-6 text-center max-w-4xl mx-auto">
    <span class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase mb-4 inline-block">
      ${siteData.hero.badge}
    </span>
    <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
      ${siteData.hero.headline}
    </h1>
    <p class="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
      ${siteData.hero.subheadline}
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="https://wa.me/${siteData.footer.whatsapp}" target="_blank" class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20">
        ${siteData.hero.primaryCta}
      </a>
      <a href="#servicos" class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/15">
        ${siteData.hero.secondaryCta}
      </a>
    </div>
  </section>

  <!-- Benefícios -->
  <section class="py-16 px-6 max-w-6xl mx-auto border-t border-white/5">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      ${siteData.benefits.map((b) => `
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
          <div class="text-cyan-400 font-bold text-lg mb-2">⚡ ${b.title}</div>
          <p class="text-slate-400 text-sm leading-relaxed">${b.description}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Serviços -->
  <section id="servicos" class="py-16 px-6 max-w-6xl mx-auto border-t border-white/5">
    <h2 class="text-2xl sm:text-3xl font-black text-center text-white mb-10">Soluções & Preços Transparentes</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${siteData.services.map((s) => `
        <div class="p-6 rounded-2xl bg-[#13171b] border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-bold text-white mb-1">${s.title}</h3>
            <div class="text-2xl font-black text-cyan-400 mb-4">${s.price}</div>
            <p class="text-slate-300 text-xs mb-6">${s.description}</p>
            <ul class="space-y-2 mb-6">
              ${s.features.map((f) => `<li class="text-xs text-slate-300 flex items-center gap-2"><span class="text-cyan-400">✓</span> ${f}</li>`).join('')}
            </ul>
          </div>
          <a href="https://wa.me/${siteData.footer.whatsapp}" class="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase text-center">
            Contratar Agora
          </a>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Depoimentos -->
  <section class="py-16 px-6 max-w-5xl mx-auto border-t border-white/5">
    <h2 class="text-2xl font-black text-center text-white mb-10">O Que Dizem Nossos Clientes</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${siteData.testimonials.map((t) => `
        <div class="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div class="text-amber-400 mb-2">★★★★★</div>
          <p class="text-slate-300 text-xs italic mb-4">"${t.comment}"</p>
          <div class="font-bold text-white text-xs">${t.name}</div>
          <div class="text-slate-500 text-[11px]">${t.role} · ${t.city}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Rodapé -->
  <footer class="py-12 px-6 border-t border-white/10 text-center text-slate-500 text-xs">
    <p class="text-slate-400 font-bold mb-1">${siteData.businessName} - ${siteData.footer.address}</p>
    <p class="mb-4">${siteData.footer.cnpj} · Tel: ${siteData.footer.phone}</p>
    <p>${siteData.footer.copyright}</p>
  </footer>
</body>
</html>`;

    // Download as index.html
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-site.html`;
    link.click();
    URL.revokeObjectURL(url);

    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  // Helper for rendering icons dynamically
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'Award': return <Award className="w-5 h-5 text-emerald-400" />;
      case 'Clock': return <Clock className="w-5 h-5 text-amber-400" />;
      case 'Target': return <Target className="w-5 h-5 text-purple-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-teal-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  // Tracking affiliate URLs
  const hostingerAffiliateUrl = `https://www.hostinger.com.br/hospedagem-de-sites?ref=${encodeURIComponent(hostingerCode)}&utm_source=focoemdados&utm_medium=sitebuilder&utm_campaign=client_website`;
  const hostgatorAffiliateUrl = `https://www.hostgator.com.br/hospedagem-de-sites?promo=${encodeURIComponent(hostgatorCode)}&utm_source=focoemdados&utm_medium=sitebuilder&utm_campaign=client_website`;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>MÓDULO IA & AFILIADOS</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
              ATIVO · ECOSSISTEMA PRIVADO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Construtor de Sites por IA & Afiliados</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
            Converse com a IA para estruturar uma landing page de alta conversão para seu cliente, gere links provisórios de teste, encontre domínios .com.br disponíveis e monetize com comissões de hospedagem Hostinger e HostGator.
          </p>
        </div>

        {/* Quick Config Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all cursor-pointer"
            title="Configurar Links de Afiliados"
          >
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span>Afiliados ({hostingerCode})</span>
          </button>

          <button
            onClick={triggerGenerateSite}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Gerando...' : 'Regerar Site'}</span>
          </button>
        </div>
      </div>

      {/* Affiliate Settings Drawer (if toggled) */}
      {settingsOpen && (
        <div className="p-5 rounded-2xl bg-[#0a0c0e] border border-cyan-500/40 space-y-4 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Configuração dos Códigos de Afiliado (Hostinger & HostGator)</span>
            </div>
            <button 
              onClick={() => setSettingsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Insira o seu código de afiliado ou token de referência. Os botões de contratação de hospedagem nos previews serão parametrizados automaticamente com esses dados para você receber as comissões.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1">Código / Ref Hostinger</label>
              <input
                type="text"
                value={hostingerCode}
                onChange={(e) => setHostingerCode(e.target.value)}
                placeholder="Ex: FOCOEMDADOS ou seu ID de afiliado"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1">Código / Promo HostGator</label>
              <input
                type="text"
                value={hostgatorCode}
                onChange={(e) => setHostgatorCode(e.target.value)}
                placeholder="Ex: FOCOEMDADOS ou cupom de afiliado"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleSaveAffiliateCodes}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Salvar Configuração de Afiliados
            </button>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout: Left Chat Wizard / Right Interactive Dynamic Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Guided AI Chat & Wizard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0c0e] border border-cyan-500/20 shadow-xl flex flex-col h-[640px]">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs">Assistente IA de Arquitetura Web</div>
                  <div className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online · Perfil Consultivo B2B
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: '1',
                      sender: 'ai',
                      text: 'Vamos recomeçar! Qual é o nicho ou segmento de atuação da nova empresa?',
                      timestamp: 'Agora',
                      options: [
                        '🦷 Clínica Odontológica / Estética',
                        '⚖️ Advocacia & Assessoria Jurídica',
                        '🍕 Restaurante & Pizzaria Artesanal',
                        '🚗 Oficina Mecânica & Auto Center',
                        '🏗️ Construtora & Arquitetura',
                        '🛒 Loja de Moda / E-commerce Local'
                      ],
                      field: 'niche'
                    }
                  ]);
                  setCurrentStep(1);
                }}
                className="text-slate-400 hover:text-cyan-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                title="Limpar conversa e reiniciar fluxo"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium rounded-tr-sm shadow-md'
                        : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    
                    {/* Render Quick-Select Chips */}
                    {msg.options && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(opt, msg.field)}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-[11px] transition-all text-left cursor-pointer font-sans"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-600 font-mono mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isGenerating && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono animate-pulse">
                  <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>A IA está arquitetando a copy, estruturando o layout e gerando domínios...</span>
                </div>
              )}
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSendCustomText} className="pt-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  currentStep === 1 ? 'Ex: Pizzaria Artesanal...' :
                  currentStep === 2 ? 'Ex: Bella Massa...' :
                  currentStep === 3 ? 'Ex: Pedidos pelo WhatsApp...' :
                  'Digite ou clique nas opções acima...'
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 font-bold transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Action to Generate if Ready */}
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between">
              <div className="text-[10px] font-mono text-slate-400">
                Empresa ativa: <span className="text-white font-bold">{companyName || 'Sorriso Real'}</span>
              </div>
              <button
                onClick={triggerGenerateSite}
                disabled={isGenerating}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Atualizar Site</span>
              </button>
            </div>

          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-400 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-bold text-xs">Mecanismo de Prova Real para Vendas</div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Você pode enviar o <strong>Link Provisório</strong> diretamente para a empresa pelo WhatsApp. Quando o cliente aprova o preview visual, você o orienta a contratar a hospedagem com seu link de afiliado, lucrando na venda do site e na assinatura da hospedagem!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Dynamic Interactive Preview & Monetization */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preview Controls Bar */}
          <div className="p-3.5 rounded-2xl bg-[#0a0c0e] border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            
            {/* Device View Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded-lg transition-all ${deviceView === 'desktop' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
                title="Visualização Computador / Desktop"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-1.5 rounded-lg transition-all ${deviceView === 'tablet' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
                title="Visualização Tablet"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded-lg transition-all ${deviceView === 'mobile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
                title="Visualização Smartphone / Celular"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Visualizar Link Provisório (Sandbox) */}
              <button
                onClick={() => setSandboxModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visualizar Link Provisório</span>
              </button>

              {/* Copiar Link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-mono transition-all cursor-pointer"
                title="Copiar URL provisória de demonstração"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
              </button>

              {/* Exportar HTML */}
              <button
                onClick={handleExportHtml}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition-all cursor-pointer"
                title="Baixar arquivo index.html pronto para hospedar"
              >
                {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{copiedHtml ? 'Exportado!' : 'Exportar HTML'}</span>
              </button>

            </div>
          </div>

          {/* Browser Mockup Window Wrapper */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#0d0f10] overflow-hidden shadow-2xl shadow-black/80 flex flex-col">
            
            {/* Browser Address Bar */}
            <div className="bg-[#0a0c0e] px-4 py-2.5 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/60 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/60 inline-block"></span>
              </div>
              
              <div className="flex-1 max-w-md bg-slate-900/90 border border-white/10 rounded-lg px-3 py-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 truncate">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-semibold">https://</span>
                  <span className="text-slate-200 truncate">{provisionalUrl.replace('https://', '') || 'preview.focoemdados.com.br/s/sorriso-real-7x29'}</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-bold shrink-0 ml-2">PROVISÓRIO</span>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={handleCopyLink}
                  className="p-1 rounded text-slate-400 hover:text-white"
                  title="Copiar URL"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dynamic Site Content Render Container */}
            <div className={`transition-all duration-300 mx-auto w-full ${
              deviceView === 'desktop' ? 'max-w-full' :
              deviceView === 'tablet' ? 'max-w-[768px] border-x border-cyan-500/20' :
              'max-w-[375px] border-x border-cyan-500/20 shadow-2xl'
            }`}>
              
              {siteData ? (
                <div className="bg-[#0d0f10] text-slate-100 font-sans text-xs selection:bg-cyan-500/30 selection:text-cyan-300">
                  
                  {/* Dynamic Site Navbar */}
                  <div className="px-4 py-3 bg-[#0a0c0e]/95 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xs">
                        ⚡
                      </div>
                      <span className="font-extrabold text-white text-sm tracking-tight uppercase">
                        {siteData.businessName}
                      </span>
                    </div>

                    <a 
                      href={`https://wa.me/${siteData.footer.whatsapp}?text=${encodeURIComponent(`Olá! Vi o site da ${siteData.businessName} e gostaria de mais informações.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-[11px] uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>{siteData.hero.primaryCta}</span>
                    </a>
                  </div>

                  {/* Dynamic Site Hero */}
                  <div className="py-12 px-5 text-center bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase mb-3 inline-block">
                      {siteData.hero.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3 leading-snug">
                      {siteData.hero.headline}
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                      {siteData.hero.subheadline}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                      <a
                        href={`https://wa.me/${siteData.footer.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
                      >
                        {siteData.hero.primaryCta}
                      </a>
                      <a
                        href="#servicos"
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/15"
                      >
                        {siteData.hero.secondaryCta}
                      </a>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-4 border-t border-white/10">
                      {siteData.hero.metrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-base font-black text-cyan-400">{m.value}</div>
                          <div className="text-[10px] text-slate-400 leading-tight">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Benefits Grid */}
                  <div className="py-10 px-5 border-t border-white/5">
                    <div className="text-center mb-6">
                      <h3 className="text-base font-extrabold text-white">Por Que Escolher a {siteData.businessName}?</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Diferenciais estruturados para a sua tranquilidade</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {siteData.benefits.map((b, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shrink-0">
                            {renderIcon(b.icon)}
                          </div>
                          <div>
                            <div className="text-white font-bold text-xs">{b.title}</div>
                            <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{b.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Services / Pricing */}
                  <div id="servicos" className="py-10 px-5 border-t border-white/5 bg-slate-950/40">
                    <div className="text-center mb-6">
                      <h3 className="text-base font-extrabold text-white">Planos & Atendimentos em Destaque</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Transparência e valores acessíveis</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {siteData.services.map((s, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#13171b] border border-cyan-500/20 flex flex-col justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">{s.title}</div>
                            <div className="text-lg font-black text-cyan-400 my-2">{s.price}</div>
                            <p className="text-slate-400 text-[10px] mb-3">{s.description}</p>
                            <ul className="space-y-1 mb-4">
                              {s.features.map((f, fIdx) => (
                                <li key={fIdx} className="text-[10px] text-slate-300 flex items-center gap-1.5">
                                  <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <a
                            href={`https://wa.me/${siteData.footer.whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse no serviço: ${s.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 rounded-lg bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold text-center uppercase"
                          >
                            Contratar
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Testimonials */}
                  <div className="py-10 px-5 border-t border-white/5">
                    <div className="text-center mb-6">
                      <h3 className="text-base font-extrabold text-white">Avaliações de Clientes Verificados</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Depoimentos reais de quem confia na marca</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {siteData.testimonials.map((t, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
                            {'★'.repeat(t.rating)}
                          </div>
                          <p className="text-slate-300 text-[11px] italic mb-3">"{t.comment}"</p>
                          <div className="text-white font-bold text-[11px]">{t.name}</div>
                          <div className="text-slate-500 text-[10px]">{t.role} · {t.city}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final CTA Banner */}
                  <div className="py-10 px-5 text-center bg-gradient-to-r from-cyan-950/40 via-slate-900 to-cyan-950/40 border-t border-white/10">
                    <h3 className="text-base sm:text-lg font-black text-white mb-2">{siteData.ctaSection.title}</h3>
                    <p className="text-slate-300 text-xs mb-4 max-w-md mx-auto">{siteData.ctaSection.description}</p>
                    <a
                      href={`https://wa.me/${siteData.footer.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de conversar com a equipe da ${siteData.businessName}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
                    >
                      {siteData.ctaSection.buttonText}
                    </a>
                    <div className="text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{siteData.ctaSection.guarantee}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="py-6 px-5 border-t border-white/10 bg-[#0a0c0e] text-center text-slate-500 text-[10px]">
                    <div className="text-slate-300 font-bold mb-0.5">{siteData.businessName}</div>
                    <div className="mb-2">{siteData.footer.cnpj} · {siteData.footer.address} · {siteData.footer.phone}</div>
                    <div>{siteData.footer.copyright}</div>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 text-xs font-mono">
                  Carregando ou aguardando resposta da IA...
                </div>
              )}

            </div>
          </div>

          {/* Section: Suggested Domains Generator */}
          <div className="p-5 rounded-2xl bg-[#0a0c0e] border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Opções de Domínios Disponíveis para "{companyName}"
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sugestões automáticas calculadas pela IA prontas para registro no Registro.br ou na Hospedagem.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[11px] font-mono font-bold self-start sm:self-auto">
                {domainSuggestions.length} Opções Mapeadas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {domainSuggestions.map((dom, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    dom.recommended
                      ? 'bg-cyan-500/10 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="font-mono font-bold text-white text-xs flex items-center gap-1.5 truncate">
                      <span className="text-cyan-400">🌐</span>
                      <span className="truncate">{dom.domain}</span>
                    </div>
                    {dom.recommended && (
                      <span className="px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shrink-0">
                        Top Escolha
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2.5">
                    <span>{dom.type}</span>
                    <span className="text-emerald-400 font-bold">{dom.price}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-2">
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Disponível
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyDomain(dom.domain)}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-mono transition-colors cursor-pointer"
                        title="Copiar domínio"
                      >
                        {copiedDomain === dom.domain ? 'Copiado!' : 'Copiar'}
                      </button>
                      <a
                        href={dom.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold flex items-center gap-1"
                      >
                        <span>Checar</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Affiliate Integration (Hostinger & HostGator) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a0c0e] to-cyan-950/40 border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden">
            
            {/* Ambient cyber glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>MONETIZAÇÃO DE HOSPEDAGEM & AFILIADOS</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2">
              Publicar na Web com Domínio Próprio e Hospedagem Profissional
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Ao contratar uma hospedagem com os links recomendados abaixo, seu cliente ganha <strong>Domínio .com.br Grátis por 1 ano</strong>, <strong>SSL vitalício ilimitado</strong> e você recebe a sua <strong>comissão de afiliado</strong> (rastreada via cupom <code className="text-cyan-400 bg-white/5 px-1 py-0.5 rounded">{hostingerCode}</code>). O site gerado pela IA pode ser importado e publicado instantaneamente!
            </p>

            {/* Affiliate Providers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Hostinger Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-white text-base">Hostinger Brasil</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold font-mono">
                      ATÉ 75% OFF
                    </span>
                  </div>
                  <div className="text-xs text-purple-300 font-mono mb-2">
                    A partir de R$ 9,99/mês
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300 mb-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Domínio Grátis por 1 ano (.com ou .com.br)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Certificado SSL vitalício ilimitado</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Painel hPanel moderno e veloz</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Comissão de até 40% para você</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={hostingerAffiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md shadow-purple-500/20"
                >
                  <span>Contratar Hostinger (Comissão Ativa)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* HostGator Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-white text-base">HostGator Brasil</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                      SUPORTE 24/7
                    </span>
                  </div>
                  <div className="text-xs text-amber-300 font-mono mb-2">
                    A partir de R$ 11,69/mês
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300 mb-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Domínio Grátis no primeiro ano</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>cPanel tradicional com suporte em Português</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Contas de e-mail profissionais ilimitadas</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Comissão de afiliado com repasse regular</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={hostgatorAffiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                >
                  <span>Contratar HostGator (Comissão Ativa)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Practical Workflow explanation */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Passo a passo: 1. Cliente aprova preview ➔ 2. Contrata hospedagem pelo seu link ➔ 3. Você publica o HTML em 3 minutos!</span>
              </div>
              <button
                onClick={handleExportHtml}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 font-mono text-xs flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3 h-3 text-cyan-400" />
                <span>Exportar index.html</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Sandbox Modal: Visualizar Link Provisório */}
      {sandboxModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-2 sm:p-6 animate-fade-in">
          
          {/* Sandbox Top Bar */}
          <div className="bg-[#0a0c0e] rounded-t-2xl border border-cyan-500/30 p-3 sm:px-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block"></span>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-xs font-mono text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Ambiente Sandbox Provisório:</span>
                <span className="text-white font-bold">{provisionalUrl}</span>
              </div>
            </div>

            {/* Sandbox Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
              </button>

              <button
                onClick={() => {
                  const shareMsg = `Olá! Criei um preview provisório exclusivo do novo website profissional da ${companyName}. Dá uma olhada em primeira mão: ${provisionalUrl}`;
                  if (onOpenWhatsAppWithMessage) {
                    onOpenWhatsAppWithMessage(shareMsg);
                  } else {
                    window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`, '_blank');
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enviar no WhatsApp</span>
              </button>

              <button
                onClick={() => setSandboxModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Fechar Sandbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sandbox Body (Full Simulated Browser View) */}
          <div className="flex-1 bg-[#0d0f10] rounded-b-2xl border-x border-b border-cyan-500/30 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
              
              {/* Sandbox Alert Notice */}
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Este é o preview exato que o seu cliente visualizará. O design é 100% responsivo e os botões de ação estão configurados.</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-cyan-400 text-slate-950 px-2 py-0.5 rounded shrink-0">
                  SANDBOX ATIVO
                </span>
              </div>

              {/* Render Full Page in Sandbox */}
              {siteData && (
                <div className="bg-[#0a0c0e] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl space-y-12">
                  
                  {/* Hero Sandbox */}
                  <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase inline-block">
                      {siteData.hero.badge}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      {siteData.hero.headline}
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {siteData.hero.subheadline}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <a
                        href={`https://wa.me/${siteData.footer.whatsapp}?text=${encodeURIComponent(`Olá! Quero atendimento na ${siteData.businessName}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
                      >
                        {siteData.hero.primaryCta}
                      </a>
                      <a
                        href="#sandbox-servicos"
                        className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/15"
                      >
                        {siteData.hero.secondaryCta}
                      </a>
                    </div>
                  </div>

                  {/* Benefícios Sandbox */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {siteData.benefits.map((b, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                        <div className="mb-2">{renderIcon(b.icon)}</div>
                        <div className="text-white font-bold text-xs mb-1">{b.title}</div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{b.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Serviços Sandbox */}
                  <div id="sandbox-servicos" className="space-y-4">
                    <h3 className="text-lg font-black text-white text-center">Nossos Principais Pacotes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {siteData.services.map((s, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-[#13171b] border border-cyan-500/20 flex flex-col justify-between">
                          <div>
                            <div className="text-sm font-bold text-white">{s.title}</div>
                            <div className="text-xl font-black text-cyan-400 my-2">{s.price}</div>
                            <p className="text-slate-300 text-xs mb-4">{s.description}</p>
                            <ul className="space-y-1.5 mb-6">
                              {s.features.map((f, fIdx) => (
                                <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <a
                            href={`https://wa.me/${siteData.footer.whatsapp}?text=${encodeURIComponent(`Tenho interesse em: ${s.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs text-center uppercase"
                          >
                            Contratar Pacote
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Depoimentos Sandbox */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-white text-center">Depoimentos dos Clientes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {siteData.testimonials.map((t, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="text-amber-400 text-xs mb-1">{'★'.repeat(t.rating)}</div>
                          <p className="text-slate-300 text-xs italic mb-3">"{t.comment}"</p>
                          <div className="text-white font-bold text-xs">{t.name}</div>
                          <div className="text-slate-500 text-[10px]">{t.role} · {t.city}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rodapé Sandbox */}
                  <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
                    <p className="text-slate-300 font-bold mb-1">{siteData.businessName} - {siteData.footer.address}</p>
                    <p className="mb-2">{siteData.footer.cnpj} · Tel: {siteData.footer.phone}</p>
                    <p>{siteData.footer.copyright}</p>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
