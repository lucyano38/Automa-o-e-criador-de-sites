import React, { useState } from 'react';
import { ExternalLink, Sparkles, Check, Star, Zap, ShieldCheck } from 'lucide-react';

export function ShopeeAffiliates() {
  const defaultAffiliateUrl = 'https://s.shopee.com.br/3qOJDFeali';

  const products = [
    {
      id: 'hub-usbc',
      title: 'Adaptador Hub USB-C 4 em 1 (HDMI 4K, VGA, USB 3.0 e PD 100W)',
      description: 'Conecte múltiplos monitores, carregue seu notebook rapidamente e expanda suas portas USB com facilidade.',
      price: 'R$ 79,90',
      rating: 4.9,
      reviews: 1420,
      badge: 'MAIS VENDIDO',
      affiliateUrl: defaultAffiliateUrl,
      images: [
        '/assets/aistudio/sg-11134301-7rdxp-mdbgafdnksu8e7_resize_w1920_nl_da083a10.webp',
        'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
        '/assets/aistudio/sg-11134301-7rdxt-mdbgq5ed9wlc2e_resize_w1920_nl_1f787ac0.webp'
      ]
    },
    {
      id: 'suporte-notebook',
      title: 'Suporte Ergonômico Dobrável em Alumínio para Notebook & Tablet',
      description: 'Melhore sua postura e evite dores no pescoço. Altura ajustável, leve e portátil para home office e viagens.',
      price: 'R$ 49,90',
      rating: 4.8,
      reviews: 980,
      badge: 'ERGONOMIA',
      affiliateUrl: defaultAffiliateUrl,
      images: [
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'mouse-vertical',
      title: 'Mouse Ergonômico Vertical Sem Fio 2.4G com DPI Ajustável',
      description: 'Posição neutra do punho que elimina a fadiga e previne lesões por esforço repetitivo (LER) em jornadas longas.',
      price: 'R$ 65,00',
      rating: 4.9,
      reviews: 830,
      badge: 'SAÚDE & FOCO',
      affiliateUrl: defaultAffiliateUrl,
      images: [
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [key: string]: number }>({
    'hub-usbc': 0,
    'suporte-notebook': 0,
    'mouse-vertical': 0
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleImageChange = (productId: string, index: number) => {
    setActiveImageIndexes(prev => ({ ...prev, [productId]: index }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📦</span> Kit Produtividade & Setup Recomendado
        </h3>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 w-fit">
          Shopee Afiliados · Curadoria Verificada
        </span>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Ferramentas e gadgets essenciais para elevar a sua produtividade no home office e no atendimento.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const currentImgIdx = activeImageIndexes[product.id] || 0;
          const currentImgUrl = product.images[currentImgIdx];

          return (
            <div
              key={product.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all group shadow-lg"
            >
              <div>
                {/* Image Container with Link */}
                <div className="mb-4">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Clique para abrir na Shopee com desconto"
                    className="block relative bg-slate-900 h-48 rounded-lg overflow-hidden border border-slate-800 group-hover:border-cyan-500/40 transition-all cursor-pointer shadow-inner"
                  >
                    <img
                      src={currentImgUrl}
                      alt={product.title}
                      className="w-full h-full object-cover p-1 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-cyan-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
                      {product.badge}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-2 right-2 bg-slate-900/95 text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-slate-900/90 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1 shadow">
                      <span>Ver na Shopee</span>
                      <span>↗</span>
                    </div>
                  </a>

                  {/* Thumbnail switcher if multiple images */}
                  {product.images.length > 1 && (
                    <div className="flex items-center gap-2 mt-2">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleImageChange(product.id, idx)}
                          className={`h-10 w-10 rounded border p-0.5 transition-all overflow-hidden cursor-pointer ${
                            currentImgIdx === idx
                              ? 'border-cyan-400 bg-cyan-950/50 ring-1 ring-cyan-400'
                              : 'border-slate-800 bg-slate-900 opacity-60 hover:opacity-100 hover:border-slate-700'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover rounded"
                          />
                        </button>
                      ))}
                      <span className="text-[10px] text-slate-500 font-mono ml-auto">
                        ({product.reviews}+ avaliações)
                      </span>
                    </div>
                  )}
                </div>

                <h4 className="font-semibold text-white text-base mb-1.5 leading-snug">
                  {product.title}
                </h4>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Condição Shopee:</span>
                  <span className="text-emerald-400 font-bold">Frete Grátis & Desconto</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <span>🛒 Garantir com Desconto</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyLink(product.affiliateUrl, product.id)}
                    className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono flex items-center justify-center transition-all cursor-pointer"
                    title="Copiar link de afiliado"
                  >
                    {copiedId === product.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
