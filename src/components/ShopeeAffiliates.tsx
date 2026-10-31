import React, { useState } from 'react';

export function ShopeeAffiliates() {
  const affiliateUrl = 'https://s.shopee.com.br/3qOJDFeali';

  const productImages = [
    {
      url: '/assets/aistudio/sg-11134301-7rdxp-mdbgafdnksu8e7_resize_w1920_nl_da083a10.webp',
      label: 'Visão Técnica & Portas (4K HDMI, VGA, USB 3.0, PD 100W)',
      badge: 'Portas & Recursos'
    },
    {
      url: '/assets/aistudio/sg-11134301-7rdxt-mdbgq5ed9wlc2e_resize_w1920_nl_1f787ac0.webp',
      label: 'Acabamento Metálico & Conectores Multifuncionais',
      badge: 'Chassi Alumínio'
    }
  ];

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

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
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all group">
          <div>
            {/* Clickable Image Preview directly linked to Shopee */}
            <div className="mb-4">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Clique na foto para abrir a oferta com desconto na Shopee"
                className="block relative bg-slate-900 h-48 rounded-md overflow-hidden border border-slate-800 group-hover:border-cyan-500/40 transition-all cursor-pointer shadow-inner"
              >
                <img
                  src={productImages[selectedImgIndex].url}
                  alt={productImages[selectedImgIndex].label}
                  className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlays on Image */}
                <div className="absolute top-2 left-2 bg-amber-500/90 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded shadow">
                  🔥 OFERTA SHOPEE
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-900/90 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1 shadow">
                  <span>Abrir Produto</span>
                  <span>↗</span>
                </div>
              </a>

              {/* Thumbnails switcher to inspect both real photos */}
              <div className="flex items-center gap-2 mt-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`h-11 w-11 rounded border p-0.5 transition-all overflow-hidden cursor-pointer ${
                      selectedImgIndex === idx
                        ? 'border-cyan-400 bg-cyan-950/50 ring-1 ring-cyan-400'
                        : 'border-slate-800 bg-slate-900 opacity-60 hover:opacity-100 hover:border-slate-700'
                    }`}
                    title={img.label}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
                <span className="text-[11px] text-slate-500 font-mono ml-auto">
                  Foto {selectedImgIndex + 1} de {productImages.length}
                </span>
              </div>
            </div>

            <h4 className="font-semibold text-white text-base mb-1">
              Adaptador Hub USB-C 4 em 1 (HDMI 4K, VGA, USB 3.0 e PD 100W)
            </h4>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Conecte múltiplos monitores, carregue seu notebook rapidamente e expanda suas portas USB com facilidade.
            </p>
          </div>

          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm py-2.5 px-4 rounded-lg text-center transition-colors block cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            🛒 Garantir na Shopee com Desconto
          </a>
        </div>
      </div>
    </div>
  );
}
