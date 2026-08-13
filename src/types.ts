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

