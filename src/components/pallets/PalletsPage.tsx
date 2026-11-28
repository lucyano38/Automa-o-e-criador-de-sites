import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Factory,
  Layers,
  MapPin,
  MessageSquare,
  Package,
  Ruler,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import {
  PALLET_FAQ,
  PALLET_MATERIALS,
  PALLET_MODELS,
  PALLET_SIZES,
  PALLET_STATES,
  PALLET_STEPS,
  PalletMaterial,
  PalletState,
} from '../../data/pallets';
import { PalletCalculator } from './PalletCalculator';
import { PalletIllustration } from './PalletIllustration';

interface PalletsPageProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
  onNavigate: (path: string) => void;
}

const SEO_TITLE = 'Pallets para Empresas | Madeira, Plástico e Compensado · Foco em Dados';
const SEO_DESCRIPTION =
  'Catálogo técnico de pallets para empresas: PBR, EPAL, plástico e compensado. Estime a carga por caminhão, informe o CEP e receba disponibilidade, preço por lote, frete e prazo no WhatsApp.';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): () => void {
  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const previous = existing?.getAttribute('content') ?? null;

  if (existing) {
    existing.setAttribute('content', content);
  } else {
    const tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }

  return () => {
    const current = document.head.querySelector<HTMLMetaElement>(selector);
    if (!current) return;
    if (previous === null) {
      current.remove();
    } else {
      current.setAttribute('content', previous);
    }
  };
}

function upsertCanonical(href: string): () => void {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const previous = existing?.getAttribute('href') ?? null;

  if (existing) {
    existing.setAttribute('href', href);
  } else {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = href;
    document.head.appendChild(link);
  }

  return () => {
    const current = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!current) return;
    if (previous === null) {
      current.remove();
    } else {
      current.setAttribute('href', previous);
    }
  };
}

export const PalletsPage: React.FC<PalletsPageProps> = ({
  onOpenWhatsAppWithMessage,
  onNavigate,
}) => {
  const [material, setMaterial] = useState<'todos' | PalletMaterial>('todos');
  const [size, setSize] = useState<string>('todas');
  const [palletState, setPalletState] = useState<'todos' | PalletState>('todos');
  const [selectedModelId, setSelectedModelId] = useState<string>(PALLET_MODELS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = SEO_TITLE;

    const restores = [
      upsertMeta('name', 'description', SEO_DESCRIPTION),
      upsertMeta('property', 'og:title', SEO_TITLE),
      upsertMeta('property', 'og:description', SEO_DESCRIPTION),
      upsertMeta('property', 'og:url', 'https://focoemdados.com.br/pallets'),
      upsertMeta('property', 'og:type', 'website'),
      upsertMeta('name', 'twitter:title', SEO_TITLE),
      upsertMeta('name', 'twitter:description', SEO_DESCRIPTION),
      upsertCanonical('https://focoemdados.com.br/pallets'),
    ];

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'pallets-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Pallets para empresas',
          serviceType: 'Fornecimento de pallets de madeira, plástico e compensado',
          description: SEO_DESCRIPTION,
          provider: {
            '@type': 'Organization',
            name: 'Foco em Dados',
            url: 'https://focoemdados.com.br',
            telephone: '+55-11-99441-1307',
          },
          areaServed: { '@type': 'Country', name: 'Brasil' },
          url: 'https://focoemdados.com.br/pallets',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Início',
              item: 'https://focoemdados.com.br/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Pallets B2B',
              item: 'https://focoemdados.com.br/pallets',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: PALLET_FAQ.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      script.remove();
    };
  }, []);

  const filteredModels = useMemo(
    () =>
      PALLET_MODELS.filter((model) => {
        if (material !== 'todos' && model.material !== material) return false;
        if (size !== 'todas') {
          const modelSize = `${model.dimensions.lengthMm}x${model.dimensions.widthMm}`;
          if (modelSize !== size) return false;
        }
        if (palletState !== 'todos' && !model.states.includes(palletState)) return false;
        return true;
      }),
    [material, size, palletState]
  );

  const handleQuoteModel = (modelId: string) => {
    setSelectedModelId(modelId);
    document.getElementById('calculadora-pallets')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0d0f10] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" aria-hidden="true" />
        <div
          className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-cyan-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-orange-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-20">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Foco em Dados · voltar ao início
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-orange-300 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-full">
                <Package className="w-3.5 h-3.5" />
                Novo nicho · Pallets B2B
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.08]">
                Pallets para empresas, com cotação em minutos.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Pallets de madeira, plástico e compensado para indústria, distribuição e exportação.
                Informe o modelo, a quantidade e o CEP: devolvemos disponibilidade, preço por lote,
                frete e prazo pelo WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleQuoteModel(PALLET_MODELS[0].id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Boxes className="w-4 h-4" />
                  Montar minha cotação
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenWhatsAppWithMessage(
                      'Olá! Vim pela seção de pallets do site e quero falar sobre um lote de pallets para minha empresa.'
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-xs transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  Falar no WhatsApp
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { value: '6', label: 'modelos técnicos' },
                  { value: '3', label: 'veículos' },
                  { value: '100%', label: 'cotação por lote' },
                  { value: 'BR', label: 'atendimento sob consulta' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-lg font-black text-white">{item.value}</div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide leading-tight mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-[#121a21] to-[#0b0f13] border border-cyan-500/25 p-5 sm:p-7 shadow-2xl">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  <span>Ficha visual</span>
                  <span className="text-cyan-300">PBR · 1000 × 1200</span>
                </div>
                <PalletIllustration material="madeira" className="w-full h-auto" />
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[
                    { icon: Ruler, label: '1000 × 1200 mm' },
                    { icon: ShieldCheck, label: 'até 1.000 kg' },
                    { icon: Layers, label: '2 entradas' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-1 rounded-lg bg-black/30 border border-white/10 px-2 py-2.5 text-center"
                    >
                      <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[9px] font-mono text-slate-300 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-mono text-center mt-3">
                Imagem ilustrativa. Fotos e ficha do lote são enviadas na cotação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-white/10 bg-[#0a0d10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BadgeCheck, text: 'Catálogo com ficha técnica' },
            { icon: MapPin, text: 'Cotação orientada por CEP' },
            { icon: Factory, text: 'Preço fechado por lote' },
            { icon: Truck, text: 'Frete e prazo confirmados' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <item.icon className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section id="catalogo-pallets" className="scroll-mt-28 px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-3 max-w-2xl mb-8">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <Boxes className="w-3.5 h-3.5" />
              Catálogo técnico
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Escolha o pallet certo para a sua operação.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Medidas e capacidades são referências do modelo. A disponibilidade, o estado e o
              preço de cada lote são confirmados na cotação.
            </p>
          </div>

          {/* Filters */}
          <div className="rounded-2xl bg-[#11161c] border border-white/10 p-4 sm:p-5 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="space-y-1.5 block">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Material
                </span>
                <select
                  value={material}
                  onChange={(event) => setMaterial(event.target.value as 'todos' | PalletMaterial)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {PALLET_MATERIALS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5 block">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Medida
                </span>
                <select
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {PALLET_SIZES.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1.5 block">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Estado
                </span>
                <select
                  value={palletState}
                  onChange={(event) => setPalletState(event.target.value as 'todos' | PalletState)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {PALLET_STATES.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400">
                {filteredModels.length} de {PALLET_MODELS.length} modelos
              </span>
              <button
                type="button"
                onClick={() => {
                  setMaterial('todos');
                  setSize('todas');
                  setPalletState('todos');
                }}
                className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          </div>

          {filteredModels.length === 0 ? (
            <div className="rounded-2xl bg-[#11161c] border border-white/10 p-10 text-center space-y-3">
              <p className="text-sm text-slate-300">
                Nenhum modelo combina com esses filtros.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMaterial('todos');
                  setSize('todas');
                  setPalletState('todos');
                }}
                className="text-xs font-bold text-cyan-300 hover:text-cyan-200"
              >
                Ver o catálogo completo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredModels.map((model) => (
                <article
                  key={model.id}
                  className="group flex flex-col rounded-2xl bg-[#11161c] border border-white/10 hover:border-cyan-500/40 transition-all overflow-hidden"
                >
                  <div className="relative bg-gradient-to-br from-[#131b22] to-[#0c1116] p-4 border-b border-white/5">
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {model.materialLabel}
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/30">
                        {model.availability}
                      </span>
                    </div>
                    <PalletIllustration
                      material={model.material}
                      label={`Pallet ${model.shortName}`}
                      className="w-full h-auto max-h-[150px] mt-3"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-4 sm:p-5 gap-4">
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                        {model.name}
                      </h3>
                      <p className="text-[11px] font-mono text-cyan-300">
                        {model.dimensions.label} · {model.entries}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-black/25 border border-white/10 px-2.5 py-2">
                        <div className="text-[9px] font-mono uppercase text-slate-500">Carga dinâmica</div>
                        <div className="text-xs font-bold text-white">
                          até {model.loadDynamicKg.toLocaleString('pt-BR')} kg
                        </div>
                      </div>
                      <div className="rounded-lg bg-black/25 border border-white/10 px-2.5 py-2">
                        <div className="text-[9px] font-mono uppercase text-slate-500">Carga estática</div>
                        <div className="text-xs font-bold text-white">
                          até {model.loadStaticKg.toLocaleString('pt-BR')} kg
                        </div>
                      </div>
                      <div className="rounded-lg bg-black/25 border border-white/10 px-2.5 py-2">
                        <div className="text-[9px] font-mono uppercase text-slate-500">Peso aprox.</div>
                        <div className="text-xs font-bold text-white">{model.weightKg} kg</div>
                      </div>
                      <div className="rounded-lg bg-black/25 border border-white/10 px-2.5 py-2">
                        <div className="text-[9px] font-mono uppercase text-slate-500">Altura</div>
                        <div className="text-xs font-bold text-white">{model.heightMm} mm</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {model.applications.map((application) => (
                        <span
                          key={application}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10"
                        >
                          {application}
                        </span>
                      ))}
                    </div>

                    <details className="group/details rounded-lg bg-white/5 border border-white/10">
                      <summary className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] font-bold text-slate-300 cursor-pointer list-none">
                        Ficha técnica
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform group-open/details:rotate-180" />
                      </summary>
                      <div className="px-3 pb-3 space-y-2 text-[11px] text-slate-400 leading-relaxed">
                        <ul className="space-y-1">
                          {model.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="pt-1 border-t border-white/10">{model.treatment}</p>
                      </div>
                    </details>

                    <div className="mt-auto pt-1 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          {model.priceLabel}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">
                          NF e prazo na proposta
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuoteModel(model.id)}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer"
                      >
                        Orçar este modelo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-white/10 bg-[#0a0d10] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-8">Como funciona a cotação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PALLET_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl bg-[#11161c] border border-white/10 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-black text-sm flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-extrabold text-white">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <PalletCalculator
        selectedModelId={selectedModelId}
        onSelectModel={setSelectedModelId}
        onOpenWhatsAppWithMessage={onOpenWhatsAppWithMessage}
      />

      {/* Coverage + commercial conditions */}
      <section className="border-y border-white/10 bg-[#0a0d10] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-300">
              <MapPin className="w-3.5 h-3.5" />
              Cobertura e condições
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Atendimento nacional, confirmado por CEP.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              O frete depende do CEP, do volume, do veículo e da disponibilidade do lote na região.
              Por isso não publicamos uma tabela fixa: a cotação reúne esses dados e volta com uma
              condição comercial objetiva.
            </p>
            <ul className="space-y-2.5 pt-1">
              {[
                'Preço por lote, com quantidade mínima definida na proposta.',
                'Frete e prazo informados após a conferência do CEP.',
                'Ficha do lote com estado, medidas e capacidade de referência.',
                'Documentação fiscal e condições de pagamento na proposta.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#11161c] border border-cyan-500/25 p-5 sm:p-7 space-y-4">
            <div className="flex items-center gap-2 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Antes de fechar
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Capacidades do catálogo são referências técnicas. A carga real deve respeitar a ficha
              do lote, a distribuição de peso, a altura máxima e a amarração. Para exportação,
              confirme o tratamento exigido pelo país de destino.
            </p>
            <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2">
              <div className="text-[10px] font-mono uppercase text-slate-400">Resumo do processo</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Disponibilidade</span>
                <span className="font-bold text-white">sob consulta</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Preço</span>
                <span className="font-bold text-white">por lote</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Frete</span>
                <span className="font-bold text-white">conferido por CEP</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                onOpenWhatsAppWithMessage(
                  'Olá! Quero confirmar a disponibilidade de pallets para a minha empresa. Posso informar o CEP e a quantidade.'
                )
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Falar com a equipe
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq-pallets" className="scroll-mt-28 px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 mb-8">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <MessageSquare className="w-3.5 h-3.5" />
              Perguntas frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dúvidas comuns antes de comprar pallets.
            </h2>
          </div>

          <div className="space-y-3">
            {PALLET_FAQ.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
                  className="rounded-xl bg-[#11161c] border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 text-xs text-slate-400 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-cyan-500/15 via-[#101820] to-orange-500/10 border border-cyan-500/30 p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Tem um lote para comprar ou quer comparar modelos?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Envie quantidade e CEP. A equipe confirma disponibilidade, preço por lote, frete e prazo
              sem compromisso.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleQuoteModel(selectedModelId)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-xs transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Calcular carga
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenWhatsAppWithMessage(
                  'Olá! Quero uma cotação de pallets. Vou informar modelo, quantidade e CEP.'
                )
              }
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Pedir cotação
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
