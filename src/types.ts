export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'website' | 'automation' | 'social' | 'data' | 'platform';
  platform: string;
  description: string;
  fullCaseStudy: {
    challenge: string;
    solution: string;
    results: string[];
    architectureDiagram?: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  imageUrl: string;
  projectUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  popularFor: string;
}

export interface TriggerNode {
  id: string;
  name: string;
  icon: string;
  platform: string;
  description: string;
}

export interface ActionNode {
  id: string;
  name: string;
  icon: string;
  platform: string;
  description: string;
  hoursSaved: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  storeUrl?: string;
  avatar: string;
  text: string;
  rating: number;
  highlightMetric: string;
}

export interface DiagnosticResult {
  source?: string;
  summary: string;
  executiveSummary: string;
  bottlenecks: {
    title: string;
    description: string;
    impact: string;
  }[];
  recommendedArchitecture: string[];
  estimatedRoi: {
    hoursSavedPerMonth: number;
    revenueBoostPercentage: string;
    paybackTime: string;
  };
  nextSteps: string;
}

export interface CalculatorState {
  storeType: string;
  customTheme: boolean;
  speedOptimization: boolean;
  erpIntegration: boolean;
  whatsappAutomation: boolean;
  abandonedCart: boolean;
  aiChatbot: boolean;
  paymentGateways: string[];
  estimatedMonthlyOrders: number;
}

export interface InsightItem {
  id: string;
  category: 'conversao' | 'automacao' | 'instagram' | 'projeto' | 'dados';
  categoryLabel: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  keyTakeaway: string;
  linkUrl?: string;
}

export interface VideoCaptionSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  highlightWord?: string;
  emoji?: string;
  effect?: 'zoom' | 'bounce' | 'shake' | 'flash' | 'none';
}

export interface VideoPresetSample {
  id: string;
  title: string;
  category: string;
  format: '9:16' | '16:9' | '1:1';
  duration: number;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  hook: string;
  captions: VideoCaptionSegment[];
  soundtrack: string;
}

export interface AutoVideoSettings {
  autoJumpCuts: boolean;
  autoCaptions: boolean;
  captionStyle: 'hormozi' | 'neon' | 'minimal' | 'pop' | 'cyber';
  captionFontSize: number;
  autoZoomIn: boolean;
  autoEmojis: boolean;
  backgroundMusicVolume: number;
  selectedBgm: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  viralityScore: number;
}

export interface ProspectAuditDetails {
  mobileFriendly: boolean;
  sslActive: boolean;
  loadSpeedSeconds: number;
  hasWhatsAppButton: boolean;
  googleLighthouseScore: number;
  modernityIssues: string[];
  keyWeakness: string;
  conversionOpportunity: string;
}

export interface ProspectLead {
  id: string;
  companyName: string;
  tradeName: string;
  cnpj: string;
  cnae: string;
  cnaeDescription: string;
  niche: string;
  distanceKm: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  whatsappDirect: string;
  hasWebsite: boolean;
  websiteUrl?: string;
  urgencyLevel: 'alta' | 'media' | 'baixa';
  leadStatus: 'novo' | 'contatado' | 'proposta' | 'fechado';
  opportunityType: 'criar_site' | 'modernizar_site' | 'automacao_expansao';
  auditDetails: ProspectAuditDetails;
  estimatedMonthlyLoss: number;
  customPitch: string;
  googleRating?: number;
  reviewCount?: number;
}

export interface CnaeNicheOption {
  id: string;
  name: string;
  cnaeCode: string;
  cnaeDescription: string;
  icon: string;
  category: string;
  serviceToOffer: string;
  recommendedPitchHint: string;
}

export interface ProspectingFilters {
  nicheId: string;
  radiusKm: number;
  websiteFilter: 'todos' | 'sem_site' | 'com_site';
  urgencyFilter: 'todos' | 'alta' | 'media';
  searchQuery: string;
  locationCity: string;
}


