export type PalletMaterial = 'madeira' | 'plastico' | 'compensado';
export type PalletState = 'novo' | 'recondicionado';

export interface PalletModel {
  id: string;
  name: string;
  shortName: string;
  material: PalletMaterial;
  materialLabel: string;
  dimensions: {
    lengthMm: number;
    widthMm: number;
    label: string;
  };
  heightMm: number;
  weightKg: number;
  /** Capacidade de referência para carga em movimento (empilhadeira/transpaleteira). */
  loadDynamicKg: number;
  /** Capacidade de referência para carga estática (apoiada no chão). */
  loadStaticKg: number;
  states: PalletState[];
  applications: string[];
  highlights: string[];
  entries: string;
  treatment: string;
  availability: string;
  priceLabel: string;
}

/**
 * Catálogo técnico de referência.
 * Preços, estoque e disponibilidade por lote são confirmados na cotação —
 * nada aqui deve ser lido como oferta firme de venda.
 */
export const PALLET_MODELS: PalletModel[] = [
  {
    id: 'pbr-1000x1200',
    name: 'Pallet PBR 1000 × 1200',
    shortName: 'PBR 1000 × 1200',
    material: 'madeira',
    materialLabel: 'Madeira',
    dimensions: { lengthMm: 1000, widthMm: 1200, label: '1000 × 1200 mm' },
    heightMm: 145,
    weightKg: 22,
    loadDynamicKg: 1000,
    loadStaticKg: 1500,
    states: ['novo', 'recondicionado'],
    applications: ['Logística geral', 'Indústria', 'Distribuição'],
    highlights: [
      'Padrão brasileiro para operações internas e transporte',
      'Boa relação entre resistência e custo por posição',
      'Disponível em lote novo ou recondicionado, conforme estoque',
    ],
    entries: '2 entradas',
    treatment: 'Madeira maciça: para exportação, confirmar exigência de tratamento ISPM-15 no destino.',
    availability: 'Sob consulta',
    priceLabel: 'Preço sob consulta',
  },
  {
    id: 'epal-800x1200',
    name: 'Pallet EPAL Euro 800 × 1200',
    shortName: 'EPAL 800 × 1200',
    material: 'madeira',
    materialLabel: 'Madeira',
    dimensions: { lengthMm: 800, widthMm: 1200, label: '800 × 1200 mm' },
    heightMm: 144,
    weightKg: 25,
    loadDynamicKg: 1500,
    loadStaticKg: 4000,
    states: ['novo', 'recondicionado'],
    applications: ['Exportação', 'Automotivo', 'Logística geral'],
    highlights: [
      'Formato europeu com ampla aceitação em cadeias internacionais',
      'Quatro entradas, facilita o acesso de empilhadeira',
      'Lotes recondicionados passam por seleção e reparo',
    ],
    entries: '4 entradas',
    treatment: 'Madeira maciça: exportação normalmente exige selo ISPM-15. Confirmar regra do país de destino.',
    availability: 'Sob consulta',
    priceLabel: 'Preço sob consulta',
  },
  {
    id: 'plastico-1000x1200',
    name: 'Pallet plástico 1000 × 1200',
    shortName: 'Plástico 1000 × 1200',
    material: 'plastico',
    materialLabel: 'Plástico',
    dimensions: { lengthMm: 1000, widthMm: 1200, label: '1000 × 1200 mm' },
    heightMm: 150,
    weightKg: 14,
    loadDynamicKg: 1000,
    loadStaticKg: 2500,
    states: ['novo'],
    applications: ['Alimentos', 'Farmacêutico', 'Câmara fria'],
    highlights: [
      'Superfície lavável, indicada para áreas com controle de higiene',
      'Não absorve umidade e não solta farpas',
      'Dispensa tratamento fitossanitário de madeira',
    ],
    entries: '4 entradas',
    treatment: 'Sem tratamento fitossanitário de madeira. Verificar compatibilidade com o processo de higienização.',
    availability: 'Sob consulta',
    priceLabel: 'Preço sob consulta',
  },
  {
    id: 'compensado-1000x1200',
    name: 'Pallet de compensado 1000 × 1200',
    shortName: 'Compensado 1000 × 1200',
    material: 'compensado',
    materialLabel: 'Compensado',
    dimensions: { lengthMm: 1000, widthMm: 1200, label: '1000 × 1200 mm' },
    heightMm: 130,
    weightKg: 15,
    loadDynamicKg: 800,
    loadStaticKg: 2000,
    states: ['novo'],
    applications: ['Exportação', 'Embalagem', 'One-way'],
    highlights: [
      'Alternativa leve para embalagem e embarques de uso único',
      'Compensado é madeira processada — costuma dispensar ISPM-15',
      'Boa opção quando o custo do retorno do pallet não compensa',
    ],
    entries: '2 entradas',
    treatment: 'Madeira processada: em geral dispensa ISPM-15, mas a exigência deve ser confirmada com o destino.',
    availability: 'Sob consulta',
    priceLabel: 'Preço sob consulta',
  },
  {
    id: 'madeira-1200x1200',
    name: 'Pallet de madeira reforçado 1200 × 1200',
    shortName: 'Reforçado 1200 × 1200',
    material: 'madeira',
    materialLabel: 'Madeira',
    dimensions: { lengthMm: 1200, widthMm: 1200, label: '1200 × 1200 mm' },
    heightMm: 150,
    weightKg: 30,
    loadDynamicKg: 1200,
    loadStaticKg: 2500,
    states: ['novo', 'recondicionado'],
    applications: ['Construção', 'Indústria', 'Cargas pesadas'],
    highlights: [
      'Estrutura reforçada para cargas mais exigentes',
      'Área de apoio maior, útil para volumes largos',
      'Disponibilidade e capacidade final confirmadas por lote',
    ],
    entries: '2 entradas',
    treatment: 'Madeira maciça: verificar tratamento e condição dos blocos antes de cada embarque.',
    availability: 'Sob consulta',
    priceLabel: 'Preço sob consulta',
  },
  {
    id: 'estrado-1000x1200',
    name: 'Estrado one-way 1000 × 1200',
    shortName: 'Estrado one-way',
    material: 'madeira',
    materialLabel: 'Madeira leve',
    dimensions: { lengthMm: 1000, widthMm: 1200, label: '1000 × 1200 mm' },
    heightMm: 120,
    weightKg: 12,
    loadDynamicKg: 500,
    loadStaticKg: 1000,
    states: ['novo'],
    applications: ['Embalagem', 'Exportação', 'One-way'],
    highlights: [
      'Solução leve para embarques sem retorno de pallet',
      'Reduz peso e custo em cargas de baixa exigência estrutural',
      'Indicado para operações de uso único',
    ],
    entries: '2 entradas',
    treatment: 'Madeira maciça: para exportação, confirmar necessidade de ISPM-15 conforme o destino.',
    availability: 'Sob consulta',
    priceLabel: 'Preço sob consulta',
  },
];

export const PALLET_MATERIALS: { id: 'todos' | PalletMaterial; label: string }[] = [
  { id: 'todos', label: 'Todos os materiais' },
  { id: 'madeira', label: 'Madeira' },
  { id: 'plastico', label: 'Plástico' },
  { id: 'compensado', label: 'Compensado' },
];

export const PALLET_SIZES: { id: string; label: string }[] = [
  { id: 'todas', label: 'Todas as medidas' },
  { id: '1000x1200', label: '1000 × 1200 mm' },
  { id: '800x1200', label: '800 × 1200 mm' },
  { id: '1200x1200', label: '1200 × 1200 mm' },
];

export const PALLET_STATES: { id: 'todos' | PalletState; label: string }[] = [
  { id: 'todos', label: 'Novo ou recondicionado' },
  { id: 'novo', label: 'Novo' },
  { id: 'recondicionado', label: 'Recondicionado' },
];

export const PALLET_FAQ = [
  {
    question: 'Vocês vendem pallets novos e recondicionados?',
    answer:
      'Trabalhamos com as duas opções. O estado disponível muda conforme o lote e a região, por isso a confirmação é feita na cotação — junto com quantidade mínima, prazo e condição de cada pallet.',
  },
  {
    question: 'Como recebo o preço e o frete?',
    answer:
      'Informe o modelo, a quantidade e o CEP na calculadora. A solicitação chega pelo WhatsApp com esses dados já organizados; a equipe confirma disponibilidade, valor por lote, frete e prazo.',
  },
  {
    question: 'Existe quantidade mínima de compra?',
    answer:
      'O mínimo depende do modelo, do estoque e da distância de entrega. Lotes pequenos podem ser atendidos quando há carga consolidada na região. A condição é confirmada na proposta.',
  },
  {
    question: 'Pallet de madeira precisa de tratamento ISPM-15?',
    answer:
      'Para exportação, madeira maciça normalmente exige tratamento térmico e selo ISPM-15. Compensado e plástico costumam dispensar, mas a exigência varia por país. Sempre confirme a regra do destino antes do embarque.',
  },
  {
    question: 'As capacidades de carga do catálogo são garantidas?',
    answer:
      'Os números são referências técnicas do modelo. A capacidade real depende do lote, do estado de conservação, da distribuição do peso e do tipo de movimentação. A ficha do lote prevalece sobre a referência do catálogo.',
  },
  {
    question: 'A entrega é feita em todo o Brasil?',
    answer:
      'O atendimento é nacional, mas disponibilidade e prazo dependem do CEP, do volume e do veículo. Regiões com carga consolidada costumam ter prazo melhor. Consulte com o CEP antes de fechar.',
  },
];

export const PALLET_STEPS = [
  {
    title: 'Escolha o modelo',
    description: 'Compare medida, material, entradas e capacidade de referência de cada pallet.',
  },
  {
    title: 'Informe quantidade e CEP',
    description: 'A calculadora estima quantos pallets cabem por carga e quantas cargas o seu volume exige.',
  },
  {
    title: 'Receba a cotação',
    description: 'O pedido chega no WhatsApp com todos os dados. A equipe confirma disponibilidade, frete e prazo.',
  },
];
