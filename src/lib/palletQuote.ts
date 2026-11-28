import { PalletModel } from '../data/pallets';

export interface TruckSpec {
  id: string;
  name: string;
  floorLengthMm: number;
  floorWidthMm: number;
  payloadKg: number;
  note: string;
}

export const TRUCKS: TruckSpec[] = [
  {
    id: 'vuc',
    name: 'VUC · 6,5 m',
    floorLengthMm: 6500,
    floorWidthMm: 2200,
    payloadKg: 3000,
    note: 'Ideal para entregas urbanas e lotes menores.',
  },
  {
    id: 'truck',
    name: 'Truck · 12 m',
    floorLengthMm: 12000,
    floorWidthMm: 2400,
    payloadKg: 12000,
    note: 'Equilíbrio entre volume e custo por pallet.',
  },
  {
    id: 'carreta',
    name: 'Carreta · 14 m',
    floorLengthMm: 14000,
    floorWidthMm: 2400,
    payloadKg: 27000,
    note: 'Para grandes lotes e rotas de longa distância.',
  },
];

export interface CepInfo {
  valid: boolean;
  cep: string;
  state: string | null;
  region: string | null;
}

interface CepRange {
  from: number;
  to: number;
  state: string;
  region: string;
}

// Faixas oficiais de CEP por estado (prefixo numérico).
const CEP_RANGES: CepRange[] = [
  { from: 1000000, to: 19999999, state: 'SP', region: 'Sudeste' },
  { from: 20000000, to: 28999999, state: 'RJ', region: 'Sudeste' },
  { from: 29000000, to: 29999999, state: 'ES', region: 'Sudeste' },
  { from: 30000000, to: 39999999, state: 'MG', region: 'Sudeste' },
  { from: 40000000, to: 48999999, state: 'BA', region: 'Nordeste' },
  { from: 49000000, to: 49999999, state: 'SE', region: 'Nordeste' },
  { from: 50000000, to: 56999999, state: 'PE', region: 'Nordeste' },
  { from: 57000000, to: 57999999, state: 'AL', region: 'Nordeste' },
  { from: 58000000, to: 58999999, state: 'PB', region: 'Nordeste' },
  { from: 59000000, to: 59999999, state: 'RN', region: 'Nordeste' },
  { from: 60000000, to: 63999999, state: 'CE', region: 'Nordeste' },
  { from: 64000000, to: 64999999, state: 'PI', region: 'Nordeste' },
  { from: 65000000, to: 65999999, state: 'MA', region: 'Nordeste' },
  { from: 66000000, to: 69999999, state: 'PA', region: 'Norte' },
  { from: 70000000, to: 72799999, state: 'DF', region: 'Centro-Oeste' },
  { from: 72800000, to: 72999999, state: 'GO', region: 'Centro-Oeste' },
  { from: 73000000, to: 73699999, state: 'DF', region: 'Centro-Oeste' },
  { from: 73700000, to: 76799999, state: 'GO', region: 'Centro-Oeste' },
  { from: 76800000, to: 76999999, state: 'RO', region: 'Norte' },
  { from: 77000000, to: 77999999, state: 'TO', region: 'Norte' },
  { from: 78000000, to: 78899999, state: 'MT', region: 'Centro-Oeste' },
  { from: 78900000, to: 78999999, state: 'RO', region: 'Norte' },
  { from: 79000000, to: 79999999, state: 'MS', region: 'Centro-Oeste' },
  { from: 80000000, to: 87999999, state: 'PR', region: 'Sul' },
  { from: 88000000, to: 89999999, state: 'SC', region: 'Sul' },
  { from: 90000000, to: 99999999, state: 'RS', region: 'Sul' },
];

export const STATE_NAMES: Record<string, string> = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

export function formatCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function getCepInfo(rawCep: string): CepInfo {
  const digits = rawCep.replace(/\D/g, '');
  const cep = formatCep(digits);
  if (digits.length !== 8) {
    return { valid: false, cep, state: null, region: null };
  }
  const numeric = Number(digits);
  const match = CEP_RANGES.find((range) => numeric >= range.from && numeric <= range.to);
  if (!match) {
    return { valid: false, cep, state: null, region: null };
  }
  return { valid: true, cep, state: match.state, region: match.region };
}

export interface LoadEstimate {
  positionsPerLayer: number;
  byVolume: number;
  byWeight: number;
  perTruck: number;
  limitedBy: 'altura' | 'peso';
}

/**
 * Estimativa operacional: quantas unidades cabem por carga considerando
 * área do piso, camadas informadas e o peso dos próprios pallets.
 */
export function estimateLoad(model: PalletModel, truck: TruckSpec, layers: number): LoadEstimate {
  const safeLayers = Math.max(1, Math.min(8, Math.floor(layers) || 1));
  const length = model.dimensions.lengthMm;
  const width = model.dimensions.widthMm;

  const orientationA =
    Math.floor(truck.floorLengthMm / length) * Math.floor(truck.floorWidthMm / width);
  const orientationB =
    Math.floor(truck.floorLengthMm / width) * Math.floor(truck.floorWidthMm / length);
  const positionsPerLayer = Math.max(0, orientationA, orientationB);

  const byVolume = positionsPerLayer * safeLayers;
  const byWeight = Math.floor(truck.payloadKg / Math.max(1, model.weightKg));
  const perTruck = Math.max(0, Math.min(byVolume, byWeight));

  return {
    positionsPerLayer,
    byVolume,
    byWeight,
    perTruck,
    limitedBy: byWeight < byVolume ? 'peso' : 'altura',
  };
}

export function loadsNeeded(quantity: number, perTruck: number): number {
  if (!Number.isFinite(quantity) || quantity <= 0 || perTruck <= 0) return 0;
  return Math.ceil(quantity / perTruck);
}

export function buildPalletQuoteMessage(params: {
  model: PalletModel;
  quantity: number;
  cepInfo: CepInfo;
  truck: TruckSpec;
  layers: number;
  estimate: LoadEstimate;
  needed: number;
}): string {
  const { model, quantity, cepInfo, truck, layers, estimate, needed } = params;
  const location = cepInfo.valid
    ? `${cepInfo.cep} · ${cepInfo.state} (${cepInfo.region})`
    : 'CEP a informar';

  return [
    'Olá! Quero uma cotação de pallets pelo site.',
    '',
    `Modelo: ${model.name} (${model.dimensions.label}, ${model.materialLabel})`,
    `Quantidade desejada: ${quantity} unidades`,
    `CEP de entrega: ${location}`,
    `Veículo considerado: ${truck.name}`,
    `Camadas por pilha: ${layers}`,
    '',
    `Estimativa: até ${estimate.perTruck} pallets por carga · ${needed} carga(s) para o volume informado.`,
    '',
    'Pode confirmar disponibilidade, preço por lote, frete e prazo?',
  ].join('\n');
}
