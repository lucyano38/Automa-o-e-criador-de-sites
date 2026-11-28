import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  Info,
  Layers,
  MapPin,
  MessageSquare,
  Package,
  Truck,
} from 'lucide-react';
import { PALLET_MODELS } from '../../data/pallets';
import {
  TRUCKS,
  buildPalletQuoteMessage,
  estimateLoad,
  formatCep,
  getCepInfo,
  loadsNeeded,
} from '../../lib/palletQuote';

interface PalletCalculatorProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const PalletCalculator: React.FC<PalletCalculatorProps> = ({
  selectedModelId,
  onSelectModel,
  onOpenWhatsAppWithMessage,
}) => {
  const [quantity, setQuantity] = useState<number>(100);
  const [cep, setCep] = useState<string>('');
  const [truckId, setTruckId] = useState<string>('truck');
  const [layers, setLayers] = useState<number>(4);

  const model = useMemo(
    () => PALLET_MODELS.find((item) => item.id === selectedModelId) ?? PALLET_MODELS[0],
    [selectedModelId]
  );
  const truck = useMemo(
    () => TRUCKS.find((item) => item.id === truckId) ?? TRUCKS[1],
    [truckId]
  );
  const cepInfo = useMemo(() => getCepInfo(cep), [cep]);
  const estimate = useMemo(() => estimateLoad(model, truck, layers), [model, truck, layers]);
  const needed = useMemo(() => loadsNeeded(quantity, estimate.perTruck), [quantity, estimate.perTruck]);

  const handleSend = () => {
    const message = buildPalletQuoteMessage({
      model,
      quantity: Math.max(1, Math.floor(quantity) || 1),
      cepInfo,
      truck,
      layers,
      estimate,
      needed,
    });
    onOpenWhatsAppWithMessage(message);
  };

  return (
    <section id="calculadora-pallets" className="scroll-mt-28 px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <Calculator className="w-3.5 h-3.5" />
              Calculadora de carga
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Quantos pallets cabem na sua carga?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Escolha o modelo, a quantidade e o CEP. A estimativa considera a área do veículo,
              as camadas de empilhamento e o peso dos próprios pallets.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded-xl px-4 py-3 max-w-sm">
            Estimativa operacional. A carga final depende do peso total, da altura e da amarração.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-3 rounded-2xl bg-[#11161c] border border-white/10 p-5 sm:p-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="space-y-2 block">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-cyan-400" />
                  Modelo de pallet
                </span>
                <select
                  value={model.id}
                  onChange={(event) => onSelectModel(event.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {PALLET_MODELS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.shortName} · {item.materialLabel}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 block">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Quantidade desejada
                </span>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={quantity === 0 ? '' : quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </label>

              <label className="space-y-2 block">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  CEP de entrega
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cep}
                  onChange={(event) => setCep(formatCep(event.target.value))}
                  placeholder="00000-000"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
                <span className={`text-[10px] font-mono ${cepInfo.valid ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {cepInfo.valid
                    ? `${cepInfo.state} · Região ${cepInfo.region}`
                    : 'Usado para orientar prazo e frete na cotação.'}
                </span>
              </label>

              <label className="space-y-2 block">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-cyan-400" />
                  Veículo
                </span>
                <select
                  value={truck.id}
                  onChange={(event) => setTruckId(event.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {TRUCKS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-500 font-mono block">{truck.note}</span>
              </label>

              <label className="space-y-2 block">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Camadas por pilha
                </span>
                <select
                  value={layers}
                  onChange={(event) => setLayers(Number(event.target.value))}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                    <option key={value} value={value}>
                      {value} {value === 1 ? 'camada' : 'camadas'}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-500 font-mono block">
                  Respeite o limite de altura e a estabilidade da pilha.
                </span>
              </label>
            </div>

            <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 flex gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 leading-relaxed">
                O cálculo usa as dimensões de <strong className="text-white">{model.dimensions.label}</strong>{' '}
                e a capacidade de referência de <strong className="text-white">{model.loadDynamicKg.toLocaleString('pt-BR')} kg</strong> em movimento.
                Lotes reais podem variar. Nenhum valor de frete é estimado sem confirmação da transportadora.
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-[#0f1419] border border-cyan-500/30 p-5 sm:p-7 flex flex-col gap-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300">
                Resultado da simulação
              </span>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white leading-none">
                  {estimate.perTruck}
                </span>
                <span className="text-xs text-slate-300 font-mono pb-1">pallets / carga</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {estimate.positionsPerLayer} posições no piso × {layers} camada(s) · limite por {estimate.limitedBy}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/30 border border-white/10 p-3.5">
                <div className="text-[10px] font-mono uppercase text-slate-400">Sua quantidade</div>
                <div className="text-xl font-black text-white mt-1">
                  {Math.max(0, Math.floor(quantity) || 0)}
                </div>
              </div>
              <div className="rounded-xl bg-black/30 border border-white/10 p-3.5">
                <div className="text-[10px] font-mono uppercase text-slate-400">Cargas necessárias</div>
                <div className="text-xl font-black text-orange-300 mt-1">{needed}</div>
              </div>
            </div>

            <div className="rounded-xl bg-black/25 border border-white/10 p-3.5 space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400">Destino</div>
              <div className="text-sm font-bold text-white">
                {cepInfo.valid ? `${cepInfo.state} · ${cepInfo.region}` : 'CEP ainda não informado'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {cepInfo.valid
                  ? 'Frete e prazo confirmados na cotação.'
                  : 'Informe o CEP para direcionar a cotação.'}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSend}
              className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Enviar cotação no WhatsApp
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-slate-500 text-center font-mono">
              Você revisa a mensagem antes de enviar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
