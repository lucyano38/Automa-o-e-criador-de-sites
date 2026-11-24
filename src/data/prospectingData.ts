import { CnaeNicheOption, ProspectLead, GeoLocationPoint } from '../types';
import { calculateHaversineDistanceKm, createOffsetCoordinates } from '../lib/geoService';

export const CNAE_NICHES: CnaeNicheOption[] = [
  {
    id: 'todos',
    name: 'Todos os Nichos & Empresas',
    cnaeCode: 'MULTISSETORIAL',
    cnaeDescription: 'Varredura ampla multissetorial em todos os comércios locais',
    icon: '🌐',
    category: 'Geral',
    serviceToOffer: 'Criação de Presença Digital & Modernização Web',
    recommendedPitchHint: 'Identificar se não tem site (construir do zero) ou se tem site antigo lento (modernizar e acelerar).',
  },
  {
    id: 'saude',
    name: 'Clínicas Médicas & Odontologia',
    cnaeCode: '8630-5/01',
    cnaeDescription: 'Atividade médica ambulatorial e consultórios odontológicos',
    icon: '🩺',
    category: 'Saúde & Bem-Estar',
    serviceToOffer: 'Site Institucional de Alta Autoridade + Agendamento Direto no WhatsApp',
    recommendedPitchHint: 'Pacientes pesquisam dentista/médico no Google Maps; sem site veloz com WhatsApp, vão para concorrentes vizinhos.',
  },
  {
    id: 'advocacia',
    name: 'Advocacia & Serviços Jurídicos',
    cnaeCode: '6911-7/01',
    cnaeDescription: 'Serviços advocatícios, consultoria tributária e societária',
    icon: '⚖️',
    category: 'Serviços Corporativos',
    serviceToOffer: 'Portal Jurídico de Autoridade + Certificado SSL + Triagem via WhatsApp',
    recommendedPitchHint: 'Sites jurídicos antigos em Flash ou não adaptados para celular espantam clientes de alto poder aquisitivo.',
  },
  {
    id: 'gastronomia',
    name: 'Restaurantes, Bares & Pizzarias',
    cnaeCode: '5611-2/01',
    cnaeDescription: 'Restaurantes, lanchonetes, bares e similares',
    icon: '🍽️',
    category: 'Alimentação & Lazer',
    serviceToOffer: 'Cardápio Digital Interativo + Sistema de Reserva + Pedidos sem Taxa de App',
    recommendedPitchHint: 'Eliminar taxas abusivas de marketplaces (iFood) com canal próprio de pedidos rápidos no WhatsApp.',
  },
  {
    id: 'estetica',
    name: 'Salões de Beleza & Estética Avançada',
    cnaeCode: '9602-5/01',
    cnaeDescription: 'Cabeleireiros, estética, barbearias e spa',
    icon: '✨',
    category: 'Beleza & Cuidados',
    serviceToOffer: 'Vitrine Visual Imersiva de Procedimentos + Agendamento VIP no WhatsApp',
    recommendedPitchHint: 'Clientes querem ver fotos de antes/depois sem travar e agendar horário direto com uma atendente.',
  },
  {
    id: 'comercio',
    name: 'Lojas, Varejo & Boutiques',
    cnaeCode: '4712-1/00',
    cnaeDescription: 'Comércio varejista de mercadorias em geral',
    icon: '🛍️',
    category: 'Comércio & Varejo',
    serviceToOffer: 'Catálogo de Produtos Online + Vendas Rápidas pelo WhatsApp',
    recommendedPitchHint: 'Transformar a loja física em um catálogo digital 24h acessível no bairro.',
  },
  {
    id: 'automotivo',
    name: 'Oficinas Mecânicas & Estética Automotiva',
    cnaeCode: '4520-0/01',
    cnaeDescription: 'Manutenção e reparação de veículos automotores e estética auto',
    icon: '🚗',
    category: 'Automotivo',
    serviceToOffer: 'Landing Page de Confiança + Orçamento Rápido de Peças & Revisão',
    recommendedPitchHint: 'Motoristas pesquisam socorro ou revisão na região com urgência no Google; oficina sem site perde o serviço.',
  },
  {
    id: 'construcao',
    name: 'Engenharia, Reformas & Arquitetura',
    cnaeCode: '4120-4/00',
    cnaeDescription: 'Construção de edifícios, reformas e projetos de arquitetura',
    icon: '🏗️',
    category: 'Construção Civil',
    serviceToOffer: 'Portfólio de Obras Realizadas + Captação de Orçamentos Qualificados',
    recommendedPitchHint: 'Obras de alto padrão exigem credibilidade visual para fechar contratos de R$ 50k a R$ 500k.',
  },
  {
    id: 'imoveis',
    name: 'Imobiliárias & Corretores Autônomos',
    cnaeCode: '6821-8/01',
    cnaeDescription: 'Intermediação na compra, venda e locação de imóveis',
    icon: '🏢',
    category: 'Imobiliário',
    serviceToOffer: 'Vitrine Própria de Imóveis + Captação de Proprietários sem Depender de Portais',
    recommendedPitchHint: 'Reduzir custos astronômicos com portais imobiliários construindo autoridade local no Google.',
  },
  {
    id: 'contabilidade',
    name: 'Escritórios de Contabilidade & BPO',
    cnaeCode: '6920-6/01',
    cnaeDescription: 'Atividades de contabilidade, auditoria e consultoria tributária',
    icon: '📊',
    category: 'Serviços Corporativos',
    serviceToOffer: 'Site de Captação B2B de Empresas + Simulador de Abertura de CNPJ Grátis',
    recommendedPitchHint: 'Empresários modernos contratam contabilidade pela internet; sites antigos afastam startups e comércios.',
  },
  {
    id: 'pets',
    name: 'Clínicas Veterinárias & Pet Shops',
    cnaeCode: '7500-1/00',
    cnaeDescription: 'Atividades veterinárias, consultas, banho, tosa e hotel pet',
    icon: '🐶',
    category: 'Saúde Animal',
    serviceToOffer: 'Site de Atendimento de Emergência Pet 24h + Botão de Agendamento Banho & Tosa',
    recommendedPitchHint: 'Tutores com urgência médica pet precisam achar o telefone e localização em 3 segundos no celular.',
  },
  {
    id: 'fitness',
    name: 'Academias, Crossfit & Estúdios de Pilates',
    cnaeCode: '9313-1/00',
    cnaeDescription: 'Atividades de condicionamento físico, musculação e pilates',
    icon: '🏋️',
    category: 'Esporte & Saúde',
    serviceToOffer: 'Página de Agendamento de Aula Experimental Grátis + Grade de Aulas Mobile',
    recommendedPitchHint: 'Converter o interesse imediato em matrícula através de aula experimental agendada via WhatsApp.',
  },
];

// Verified Itupeva center coordinates: -23.1531, -47.0578
// Pre-built leads strictly located in Itupeva, SP and nearby municipalities within 15 km (Eloy Chaves/Jundiaí, Cabreúva Jacaré)
export const ITUPEVA_PROSPECT_LEADS: ProspectLead[] = [
  // 1. SEM SITE - Clínica Odontológica (Centro Itupeva - 0.7 km)
  {
    id: 'itupeva-001',
    companyName: 'Consultório OdontoPrime Itupeva Ltda',
    tradeName: 'OdontoPrime Itupeva',
    cnpj: '45.182.903/0001-14',
    cnae: '8630-5/04',
    cnaeDescription: 'Atividade odontológica com consultas e próteses',
    niche: 'saude',
    distanceKm: 0.7,
    lat: -23.1542,
    lng: -47.0545,
    address: 'Av. Brasil, 480',
    neighborhood: 'Centro',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 4591-2040',
    whatsappDirect: '5511998412077',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.8,
    reviewCount: 36,
    estimatedMonthlyLoss: 7800,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Sem página institucional indexada no Google para pacientes em Itupeva',
        'Falta de agendamento online rápido ou botão de WhatsApp direto',
        'Depende de indicação e perde pacientes de implantes para Jundiaí',
      ],
      keyWeakness: 'Sem presença web em Itupeva; pacientes acabam agendando com clínicas que aparecem no topo do Google.',
      conversionOpportunity: 'Landing Page de Alta Conversão + Google Meu Negócio estruturado + Botão WhatsApp 24h.',
    },
    customPitch: `Olá, equipe da OdontoPrime Itupeva! Vi que vocês são muito elogiados no Centro de Itupeva com nota 4.8, mas notei que vocês ainda não possuem um site profissional com botão direto para agendamento no WhatsApp. Quem pesquisa por dentista em Itupeva hoje busca pelo celular e clica na primeira opção rápida. Criamos páginas modernas que colocam sua clínica no topo das buscas da região. Posso enviar um modelo demonstrativo sem compromisso?`,
  },

  // 2. COM SITE DESATUALIZADO - Pizzaria & Forneria (Jd. Brasil, Itupeva - 1.4 km)
  {
    id: 'itupeva-002',
    companyName: 'Pizzaria & Forneria Bella Itupeva Eireli',
    tradeName: 'Bella Forneria Itupeva',
    cnpj: '38.291.404/0001-92',
    cnae: '5611-2/01',
    cnaeDescription: 'Restaurantes e pizzarias com serviço completo e delivery',
    niche: 'gastronomia',
    distanceKm: 1.4,
    lat: -23.1598,
    lng: -47.0512,
    address: 'Rua Vicente Tartalha, 120',
    neighborhood: 'Jardim Brasil',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 4591-8890',
    whatsappDirect: '5511997331188',
    hasWebsite: true,
    websiteUrl: 'http://bellaforneriaitupeva.com.br',
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.7,
    reviewCount: 140,
    estimatedMonthlyLoss: 11500,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 5.4,
      hasWhatsAppButton: false,
      googleLighthouseScore: 32,
      modernityIssues: [
        'Site antigo que não abre o cardápio no celular sem zoom manual',
        'Sem certificado SSL (aparece como "Não Seguro" no Chrome)',
        'Falta de botão direto de pedidos no WhatsApp para fugir das taxas do iFood',
      ],
      keyWeakness: 'Cardápio em formato imagem pesada que não converte clientes que querem pedir no WhatsApp.',
      conversionOpportunity: 'Cardápio Digital Interativo Mobile + Pedidos Diretos no WhatsApp sem Taxa + Redesign Moderno.',
    },
    customPitch: `Olá, pessoal da Bella Forneria Itupeva! As pizzas de vocês têm ótima fama na cidade, mas dei uma olhada no site atual e percebi que no celular ele demora mais de 5 segundos para abrir e o cardápio não tem botão fácil de pedir no WhatsApp. Desenvolvemos cardápios digitais modernos para pizzarias que aumentam os pedidos diretos e reduzem as comissões pagas para apps. Posso enviar uma prévia rápida de como ficaria o cardápio de vocês?`,
  },

  // 3. SEM SITE - Mecânica e Auto Center (Pq. das Hortênsias, Itupeva - 2.3 km)
  {
    id: 'itupeva-003',
    companyName: 'Auto Center Tonoli & Mecânica Especializada Ltda',
    tradeName: 'Auto Center Tonoli Itupeva',
    cnpj: '29.401.782/0001-08',
    cnae: '4520-0/01',
    cnaeDescription: 'Serviços de manutenção e reparação mecânica',
    niche: 'automotivo',
    distanceKm: 2.3,
    lat: -23.1672,
    lng: -47.0498,
    address: 'Rodovia Vice-Prefeito Hermenegildo Tonoli, 1450',
    neighborhood: 'Parque das Hortênsias',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 4593-1120',
    whatsappDirect: '5511991224400',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.6,
    reviewCount: 48,
    estimatedMonthlyLoss: 14000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Motoristas que quebram o carro na Rodovia Tonoli não encontram site para socorro',
        'Sem agendamento online de alinhamento, balanceamento e troca de óleo',
        'Falta de autoridade digital frente aos autocenters de rede de Jundiaí',
      ],
      keyWeakness: 'Inexistência de site com botão de emergência / guincho no WhatsApp.',
      conversionOpportunity: 'Landing Page de Alta Conversão + Botão de Socorro/Guincho Rápido + Agendamento de Revisão.',
    },
    customPitch: `Olá, equipe do Auto Center Tonoli! Vocês estão muito bem posicionados na Rodovia Tonoli em Itupeva, mas hoje quando um motorista tem um problema no carro ou busca revisão na cidade, ele não encontra um site oficial de vocês com botão de WhatsApp. Criamos páginas rápidas para oficinas mecânicas que geram orçamentos diários no seu WhatsApp. Quer dar uma olhada em como ficaria uma página para a sua oficina?`,
  },

  // 4. COM SITE DESATUALIZADO - Escritório de Advocacia (Centro Itupeva - 0.9 km)
  {
    id: 'itupeva-004',
    companyName: 'Advocacia Prado & Associados Itupeva',
    tradeName: 'Prado & Associados Advocacia',
    cnpj: '21.902.331/0001-44',
    cnae: '6911-7/01',
    cnaeDescription: 'Serviços advocatícios nas áreas trabalhista e cível',
    niche: 'advocacia',
    distanceKm: 0.9,
    lat: -23.1518,
    lng: -47.0560,
    address: 'Rua Emídio Agostinho, 95 - Sala 3',
    neighborhood: 'Centro',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 4591-3310',
    whatsappDirect: '5511996548820',
    hasWebsite: true,
    websiteUrl: 'http://pradoadvocacia-itupeva.com',
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.5,
    reviewCount: 18,
    estimatedMonthlyLoss: 9800,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 6.0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 28,
      modernityIssues: [
        'Site institucional de 2014 com layout congelado em desktop',
        'Falta de segurança HTTPS (aviso de site inseguro afasta clientes empresariais)',
        'Sem formulário conectado ao WhatsApp para triagem jurídica',
      ],
      keyWeakness: 'Site desatualizado que transmite sensação de escritório estagnado.',
      conversionOpportunity: 'Portal Jurídico Moderno e Seguro + Certificado SSL + Triagem Rápida no WhatsApp.',
    },
    customPitch: `Olá, Dr. Prado e equipe! Estive analisando a presença de escritórios de advocacia em Itupeva e notei que o site pradoadvocacia-itupeva.com está com layout antigo e sem certificado de segurança SSL, além de não ter botão rápido de WhatsApp para clientes. Modernizamos portais jurídicos com design sóbrio, carregamento rápido e total segurança para captar novos clientes corporativos na região. Posso apresentar uma proposta de modernização?`,
  },

  // 5. SEM SITE - Imobiliária e Chácaras (Itupeva - 1.8 km)
  {
    id: 'itupeva-005',
    companyName: 'Itupeva Chácaras & Imóveis Consultoria',
    tradeName: 'Itupeva Chácaras & Imóveis',
    cnpj: '33.102.890/0001-77',
    cnae: '6821-8/01',
    cnaeDescription: 'Corretagem na compra, venda e locação de imóveis e chácaras',
    niche: 'imoveis',
    distanceKm: 1.8,
    lat: -23.1490,
    lng: -47.0620,
    address: 'Av. Emílio Checchinato, 650',
    neighborhood: 'Jardim São Vicente',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 4591-5500',
    whatsappDirect: '5511988103355',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.9,
    reviewCount: 54,
    estimatedMonthlyLoss: 22000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Não possui portal próprio com catálogo de chácaras e condomínios de Itupeva',
        'Gasta muito em portais terceirizados sem fortalecer a marca própria da imobiliária',
        'Compradores de São Paulo e Campinas que buscam lazer em Itupeva não acham o site',
      ],
      keyWeakness: 'Refém de portais de anúncios caros por não ter catálogo online próprio.',
      conversionOpportunity: 'Portal Imobiliário com Vitrine de Chácaras e Terrenos + Integração com WhatsApp dos Corretores.',
    },
    customPitch: `Olá, corretores da Itupeva Chácaras & Imóveis! Muitas famílias de São Paulo e Campinas buscam chácaras e casas em condomínio em Itupeva todos os fins de semana, mas hoje vocês não têm um portal próprio com catálogo fácil no WhatsApp. Criamos sites imobiliários modernos, leves e integrados com WhatsApp, com vitrine de imóveis e captação de novos proprietários. Gostariam de ver uma demonstração de como ficaria a vitrine de imóveis de vocês?`,
  },

  // 6. COM SITE DESATUALIZADO - Clínica Veterinária & Pet (Eloy Chaves / Jundiaí - 7.6 km de Itupeva)
  {
    id: 'itupeva-006',
    companyName: 'Hospital Veterinário VetLife Eloy Chaves Ltda',
    tradeName: 'VetLife Eloy Chaves',
    cnpj: '31.402.891/0001-35',
    cnae: '7500-1/00',
    cnaeDescription: 'Atividades veterinárias, consultas e cirurgias',
    niche: 'pets',
    distanceKm: 7.6,
    lat: -23.1812,
    lng: -46.9620,
    address: 'Av. Benedicto Castilho de Andrade, 1020',
    neighborhood: 'Eloy Chaves',
    city: 'Jundiaí',
    state: 'SP',
    phone: '(11) 4582-4410',
    whatsappDirect: '5511994017766',
    hasWebsite: true,
    websiteUrl: 'http://vetlife-eloychaves.com.br',
    urgencyLevel: 'media',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.8,
    reviewCount: 92,
    estimatedMonthlyLoss: 8900,
    auditDetails: {
      mobileFriendly: true,
      sslActive: true,
      loadSpeedSeconds: 4.7,
      hasWhatsAppButton: false,
      googleLighthouseScore: 44,
      modernityIssues: [
        'Falta de botão direto de plantão de emergência 24h no WhatsApp',
        'Página de serviços veterinários lenta no 4G mobile',
        'Tutores de Itupeva e Jundiaí com pet doente precisam ligar sem botão fácil',
      ],
      keyWeakness: 'Falta de CTA clara de emergência 24h com atendimento imediato via WhatsApp.',
      conversionOpportunity: 'Site de Atendimento Emergencial 24h + Botão WhatsApp de Plantão Rápido + Agendamento de Vacinas.',
    },
    customPitch: `Olá, equipe da VetLife Eloy Chaves! Vocês atendem uma região estratégica entre Jundiaí e Itupeva, mas notei que no site de vocês falta um botão flutuante bem visível para emergências e agendamento rápido de consultas pelo WhatsApp. Em situações urgentes com animais, os tutores preferem clínicas com contato rápido de 1 clique. Posso mandar uma sugestão de modernização?`,
  },

  // 7. SEM SITE - Salão de Beleza & Estética (Jd. São Vicente, Itupeva - 1.2 km)
  {
    id: 'itupeva-007',
    companyName: 'Studio Beleza & Estética Avançada Itupeva',
    tradeName: 'Studio Beleza Itupeva',
    cnpj: '39.812.001/0001-63',
    cnae: '9602-5/01',
    cnaeDescription: 'Cabeleireiros, manicure, estética e cuidados de beleza',
    niche: 'estetica',
    distanceKm: 1.2,
    lat: -23.1565,
    lng: -47.0592,
    address: 'Rua Emílio Agostinho, 310',
    neighborhood: 'Jardim São Vicente',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 97411-9020',
    whatsappDirect: '5511974119020',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.9,
    reviewCount: 62,
    estimatedMonthlyLoss: 6500,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Depende exclusivamente do Direct do Instagram para agendar serviços',
        'Sem catálogo visual online de procedimentos (mechas, botox, unhas)',
        'Clientes perdem tempo perguntando valores de serviços básicos',
      ],
      keyWeakness: 'Sem vitrine digital com agendamento direto de horários no WhatsApp.',
      conversionOpportunity: 'Vitrine Visual Imersiva de Procedimentos + Agendamento VIP no WhatsApp + Link de Bio Otimizado.',
    },
    customPitch: `Olá, equipe do Studio Beleza Itupeva! Acompanho os trabalhos impecáveis de vocês na cidade, mas notei que vocês ainda não possuem um catálogo digital online com botão direto para agendamento no WhatsApp. Ficar respondendo mensagens manuais no Instagram toma muito tempo. Criamos vitrines digitais leves onde as clientes veem os procedimentos e já agendam o horário direto no WhatsApp. Posso te enviar um modelo?`,
  },

  // 8. COM SITE DESATUALIZADO - Construtora e Reformas (Itupeva - 3.2 km)
  {
    id: 'itupeva-008',
    companyName: 'Monte Serrat Engenharia & Obras Civis Eireli',
    tradeName: 'Monte Serrat Engenharia',
    cnpj: '28.112.554/0001-20',
    cnae: '4120-4/00',
    cnaeDescription: 'Construção de edifícios e reformas residenciais',
    niche: 'construcao',
    distanceKm: 3.2,
    lat: -23.1690,
    lng: -47.0720,
    address: 'Estrada do Monte Serrat, 400',
    neighborhood: 'Monte Serrat',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 4591-9980',
    whatsappDirect: '5511987230099',
    hasWebsite: true,
    websiteUrl: 'http://monteserrat-obras.com.br',
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.6,
    reviewCount: 22,
    estimatedMonthlyLoss: 28000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 5.9,
      hasWhatsAppButton: false,
      googleLighthouseScore: 26,
      modernityIssues: [
        'Site antigo que não valoriza as fotos das construções nos condomínios de Itupeva',
        'Sem formulário dinâmico para orçamento de m² de construção',
        'Sem certificado de segurança HTTPS',
      ],
      keyWeakness: 'Layout antigo afasta proprietários de alto poder aquisitivo que constroem chácaras e casas.',
      conversionOpportunity: 'Portal Corporativo Moderno + Portfólio de Obras em Alta Resolução + Calculadora de Orçamento no WhatsApp.',
    },
    customPitch: `Olá, engenheiros da Monte Serrat Engenharia! Com o grande crescimento de obras e condomínios fechados em Itupeva, ter um site moderno que apresente suas obras com fotos de alta qualidade transmite a credibilidade necessária para fechar projetos de alto padrão. O site atual de vocês tem layout antigo e demora para abrir no celular. Desenvolvemos sites de engenharia elegantes e de alta performance. Gostariam de ver uma versão atualizada?`,
  },

  // 9. SEM SITE - Academia e Treino Funcional (Centro Itupeva - 0.9 km)
  {
    id: 'itupeva-009',
    companyName: 'Academia Força & Saúde Itupeva Ltda',
    tradeName: 'Academia Força & Saúde',
    cnpj: '37.812.304/0001-55',
    cnae: '9313-1/00',
    cnaeDescription: 'Atividades de condicionamento físico, musculação e aulas em grupo',
    niche: 'fitness',
    distanceKm: 0.9,
    lat: -23.1510,
    lng: -47.0530,
    address: 'Av. Brasil, 920',
    neighborhood: 'Centro',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 4591-6670',
    whatsappDirect: '5511977112266',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.7,
    reviewCount: 78,
    estimatedMonthlyLoss: 9200,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Sem página para novos moradores de Itupeva consultarem planos e horários',
        'Falta de botão para agendar aula experimental gratuita no WhatsApp',
        'Perde novos alunos para academias de rede que têm presença online forte',
      ],
      keyWeakness: 'Sem presença online com agendamento de aula experimental no WhatsApp.',
      conversionOpportunity: 'Página de Alta Conversão + Grade Interativa de Horários + Botão "Garantir Aula Experimental" no WhatsApp.',
    },
    customPitch: `Fala pessoal da Academia Força & Saúde! Vocês têm uma estrutura excelente no Centro de Itupeva, mas notei que quem pesquisa por academia na cidade não encontra um site oficial com grade de horários e botão de aula experimental gratuita. Criamos páginas modernas que captam novos alunos todos os dias pelo WhatsApp. Posso te mostrar um modelo de como ficaria a página da academia?`,
  },

  // 10. SEM SITE - Loja de Materiais e Boutique (Itupeva - 1.5 km)
  {
    id: 'itupeva-010',
    companyName: 'Boutique Bella Donna Moda & Acessórios',
    tradeName: 'Bella Donna Boutique Itupeva',
    cnpj: '34.901.228/0001-90',
    cnae: '4781-4/00',
    cnaeDescription: 'Comércio varejista de artigos do vestuário e acessórios',
    niche: 'comercio',
    distanceKm: 1.5,
    lat: -23.1580,
    lng: -47.0560,
    address: 'Av. Brasil, 1140',
    neighborhood: 'Jardim Brasil',
    city: 'Itupeva',
    state: 'SP',
    phone: '(11) 97120-4490',
    whatsappDirect: '5511971204490',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.8,
    reviewCount: 41,
    estimatedMonthlyLoss: 7200,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Vende apenas na loja física e pelo WhatsApp respondendo foto por foto',
        'Não tem catálogo digital para clientes navegarem pelas novidades da coleção',
        'Falta de presença no Google para buscas de roupas femininas em Itupeva',
      ],
      keyWeakness: 'Dependência de atendimento manual sem catálogo online de produtos.',
      conversionOpportunity: 'Catálogo Digital Estilo Vitrine + Integração de Pedido Fácil no WhatsApp + Posicionamento no Google.',
    },
    customPitch: `Olá, equipe da Bella Donna Itupeva! As roupas de vocês são lindas, mas percebi que vocês não contam com um catálogo online onde as clientes possam ver os looks da semana e pedir no WhatsApp com 1 clique. Desenvolvemos vitrines digitais leves que facilitam as vendas da sua loja. Posso te mandar uma prévia demonstrativa sem compromisso?`,
  },
];

// São Paulo baseline leads (with verified real coordinates: lat ~ -23.5505, lng ~ -46.6333)
// Distance from Itupeva: ~62 km!
export const INITIAL_PROSPECT_LEADS: ProspectLead[] = [
  {
    id: 'sp-lead-001',
    companyName: 'Studio Odonto Sorriso & Estética Ltda',
    tradeName: 'Studio Odonto Sorriso - Bela Vista',
    cnpj: '48.912.304/0001-82',
    cnae: '8630-5/04',
    cnaeDescription: 'Atividade odontológica com consultas e procedimentos estéticos',
    niche: 'saude',
    distanceKm: 62.5,
    lat: -23.5615,
    lng: -46.6558,
    address: 'Av. Paulista, 1420 - Sala 42',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 98711-2041',
    whatsappDirect: '5511987112041',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.8,
    reviewCount: 42,
    estimatedMonthlyLoss: 8500,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Totalmente sem website institucional ou página de captura no Google',
        'Invisível em buscas diretas por dentistas no bairro',
      ],
      keyWeakness: 'Inexistência de presença digital própria no Google.',
      conversionOpportunity: 'Criação de Landing Page + Google Meu Negócio + Botão WhatsApp.',
    },
    customPitch: `Olá, equipe da Studio Odonto Sorriso! Tudo bem? Vi que vocês têm excelente avaliação no Google, mas notei que vocês ainda não possuem um site profissional com botão direto para WhatsApp. Criamos páginas modernas que colocam sua clínica no topo. Posso enviar um modelo demonstrativo?`,
  },
  {
    id: 'sp-lead-002',
    companyName: 'Menezes & Barros Sociedade de Advogados',
    tradeName: 'Menezes & Barros Advogados - Consolação',
    cnpj: '24.183.910/0001-44',
    cnae: '6911-7/01',
    cnaeDescription: 'Serviços advocatícios nas áreas trabalhista e cível',
    niche: 'advocacia',
    distanceKm: 61.8,
    lat: -23.5532,
    lng: -46.6620,
    address: 'Rua Bela Cintra, 890 - 7º Andar',
    neighborhood: 'Consolação',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 97322-1980',
    whatsappDirect: '5511973221980',
    hasWebsite: true,
    websiteUrl: 'http://menezesbarrosadv.com.br',
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.4,
    reviewCount: 19,
    estimatedMonthlyLoss: 12000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 5.8,
      hasWhatsAppButton: false,
      googleLighthouseScore: 34,
      modernityIssues: [
        'Layout antigo que não se adapta a smartphones modernos',
        'Alerta de "Site Não Seguro" no navegador (sem SSL)',
      ],
      keyWeakness: 'Site passa imagem de desatualização e insegurança jurídica.',
      conversionOpportunity: 'Redesign Moderno com Autoridade Visual + Certificado SSL.',
    },
    customPitch: `Olá, Dr. Menezes e equipe! O site do seu escritório pode carregar mais rápido e transmitir maior segurança jurídica com design atualizado. Gostaria de ver uma prévia de modernização?`,
  },
];

// Helper to pick realistic street names based on city
function getStreetsForCity(city: string): string[] {
  const norm = city.toLowerCase();
  if (norm.includes('itupeva')) {
    return [
      'Av. Brasil',
      'Av. Emílio Checchinato',
      'Rua Emídio Agostinho',
      'Rua Vicente Tartalha',
      'Rua Jundiaí',
      'Rodovia Vice-Prefeito Hermenegildo Tonoli',
      'Av. Nelson Gulla',
      'Rua Santo Antônio',
      'Rua Minas Gerais',
      'Rua José Marchi',
      'Estrada do Monte Serrat',
      'Rua Vereador José Rabelo',
    ];
  }
  if (norm.includes('jundiai') || norm.includes('jundiaí')) {
    return [
      'Av. Benedicto Castilho de Andrade',
      'Av. 9 de Julho',
      'Rua Barão de Jundiaí',
      'Av. Jundiaí',
      'Av. Osmundo dos Santos Pellegrini',
      'Rua do Retiro',
      'Av. Ferroviários',
      'Rua Rangel Pestana',
    ];
  }
  if (norm.includes('campinas')) {
    return [
      'Av. Francisco Glicério',
      'Av. José de Souza Campos (Norte-Sul)',
      'Rua Barreto Leme',
      'Av. Barão de Itapura',
      'Rua Coronel Quirino',
      'Av. Aquidabã',
    ];
  }
  // Generic Brazilian city streets
  return [
    'Av. Central',
    'Rua das Palmeiras',
    'Rua XV de Novembro',
    'Av. Presidente Vargas',
    'Rua São José',
    'Rua Tiradentes',
    'Av. Brasil',
    'Rua Marechal Deodoro',
  ];
}

function getNeighborhoodsForCity(city: string): string[] {
  const norm = city.toLowerCase();
  if (norm.includes('itupeva')) {
    return [
      'Centro',
      'Jardim São Vicente',
      'Parque das Hortênsias',
      'Jardim Brasil',
      'Guacuri',
      'Monte Serrat',
      'Medeiros',
      'Terra Brasilis',
      'Pacaembu',
      'Bairro da Chave',
      'Quilombo',
    ];
  }
  if (norm.includes('jundiai') || norm.includes('jundiaí')) {
    return [
      'Eloy Chaves',
      'Centro',
      'Retiro',
      'Vila Arens',
      'Ponte São João',
      'Anhangabaú',
      'Jardim Botânico',
    ];
  }
  return ['Centro', 'Jardim América', 'Bela Vista', 'Vila Nova', 'Planalto', 'São José'];
}

/**
 * Intelligent Dynamic Prospect Generator based on PRECISE GEOGRAPHIC LOCATION.
 * Places businesses strictly within radiusKm of the target location point.
 * Guarantees real coordinates and prevents distant cities (like São Paulo when searching in Itupeva).
 */
export function generateDynamicProspects(
  centerPoint: GeoLocationPoint,
  radiusKm: number,
  nicheId: string = 'todos'
): ProspectLead[] {
  const city = centerPoint.city || 'Itupeva';
  const state = centerPoint.state || 'SP';
  const centerLat = centerPoint.lat;
  const centerLng = centerPoint.lng;

  // DDD determination
  let ddd = '11';
  const normCity = city.toLowerCase();
  if (normCity.includes('campinas') || normCity.includes('indaiatuba') || normCity.includes('valinhos') || normCity.includes('vinhedo')) {
    ddd = '19';
  } else if (normCity.includes('santos')) {
    ddd = '13';
  } else if (normCity.includes('sorocaba')) {
    ddd = '15';
  } else if (normCity.includes('rio de janeiro')) {
    ddd = '21';
  } else if (normCity.includes('curitiba')) {
    ddd = '41';
  } else if (normCity.includes('belo horizonte')) {
    ddd = '31';
  }

  const streets = getStreetsForCity(city);
  const neighborhoods = getNeighborhoodsForCity(city);

  // Business templates for every niche
  const nicheTemplates: Record<string, {
    names: string[];
    cnae: string;
    desc: string;
    lossWithout: number;
    lossOutdated: number;
    offerWithout: string;
    offerOutdated: string;
  }> = {
    saude: {
      names: ['Odonto Prime', 'Instituto Médico & Saúde', 'Clínica Bem Estar', 'Consultório Dentário Dr. Silva', 'Harmoniza Estética Facial & Odonto'],
      cnae: '8630-5/01',
      desc: 'Atividade médica ambulatorial e odontologia especializada',
      lossWithout: 8500,
      lossOutdated: 5800,
      offerWithout: 'Landing Page de Consultório + Agendamento Direto no WhatsApp + Google Local',
      offerOutdated: 'Redesign Ágil para Celular + Botão Flutuante de WhatsApp + Certificado SSL',
    },
    advocacia: {
      names: ['Almeida & Prado Sociedade de Advogados', 'Juris Consultoria & Advocacia', 'Santos & Faria Advogados Associados', 'Dra. Vanessa Advocacia Especializada'],
      cnae: '6911-7/01',
      desc: 'Serviços advocatícios e consultoria societária',
      lossWithout: 14000,
      lossOutdated: 8500,
      offerWithout: 'Site Institucional de Alta Autoridade + Triagem Rápida no WhatsApp',
      offerOutdated: 'Modernização de Layout Corporativo + Segurança SSL + Alta Velocidade 98+',
    },
    gastronomia: {
      names: ['Pizzaria Forno a Lenha Bella', 'Restaurante Sabor da Vila', 'Boteco & Grill Gourmet', 'Hamburgueria Artesanal Roots', 'Café & Bistrô Aromas'],
      cnae: '5611-2/01',
      desc: 'Restaurantes e lanchonetes com serviço gastronômico',
      lossWithout: 16000,
      lossOutdated: 9000,
      offerWithout: 'Cardápio Digital Interativo + Sistema de Pedidos sem Taxa via WhatsApp',
      offerOutdated: 'Site Gastronômico Imersivo com Fotos Leves + Botão de Reserva Rápida',
    },
    estetica: {
      names: ['Espaço Beleza Pura Salão & Spa', 'Studio Vip Sobrancelhas e Make', 'Harmoniza Estética Facial', 'Barbearia Retrô dos Amigos'],
      cnae: '9602-5/01',
      desc: 'Cabeleireiros, barbearias e estética avançada',
      lossWithout: 8200,
      lossOutdated: 5400,
      offerWithout: 'Vitrine Visual dos Procedimentos + Agendamento VIP no WhatsApp',
      offerOutdated: 'Redesign Elegante + Carregamento Rápido de Fotos + CTA de Agendamento',
    },
    comercio: {
      names: ['Boutique Elegance Moda', 'Empório & Conveniência Central', 'Ótica Visão Perfeita', 'Loja Estilo Casa & Decoração'],
      cnae: '4712-1/00',
      desc: 'Comércio varejista em geral',
      lossWithout: 11000,
      lossOutdated: 7000,
      offerWithout: 'Catálogo de Produtos Online + Link de Compra Rápida no WhatsApp',
      offerOutdated: 'Loja Vitrine Responsiva + Otimização de Busca no Bairro',
    },
    automotivo: {
      names: ['Mecânica Central de Injeção Eletrônica', 'Auto Center & Pneus Confiança', 'Oficina dos Amigos Funilaria e Pintura', 'Oficina Mecânica Especializada Turbo'],
      cnae: '4520-0/01',
      desc: 'Serviços mecânicos e manutenção de veículos',
      lossWithout: 15000,
      lossOutdated: 8900,
      offerWithout: 'Landing Page de Confiança + Botão de Socorro Rápido no WhatsApp',
      offerOutdated: 'Site Ágil com Formulário de Orçamento de Peças e Revisão',
    },
    construcao: {
      names: ['Aliança Reformas & Construções', 'Mestre de Obras & Pinturas Express', 'Projetos & Design Arquitetura', 'Construtora Horizonte Urbano'],
      cnae: '4120-4/00',
      desc: 'Construção civil, reformas e acabamentos',
      lossWithout: 25000,
      lossOutdated: 18000,
      offerWithout: 'Portfólio de Obras Realizadas + Captação de Orçamentos no WhatsApp',
      offerOutdated: 'Site Corporativo de Autoridade + Galeria em Alta Definição',
    },
    imoveis: {
      names: ['Imobiliária Horizonte Imóveis', 'Corretora Solidez Imóveis e Aluguéis', 'Habitar Gestão Imobiliária', 'Imobiliária Prime Seleção'],
      cnae: '6821-8/01',
      desc: 'Intermediação e venda de imóveis',
      lossWithout: 32000,
      lossOutdated: 22000,
      offerWithout: 'Portal de Imóveis Próprio + Vitrine de Lançamentos no WhatsApp',
      offerOutdated: 'Redesign Moderno com Busca de Imóveis Leve no Celular',
    },
    contabilidade: {
      names: ['Exata Contabilidade & BPO', 'Solução Fiscal Escritório Contábil', 'Confiance Assessoria Empresarial'],
      cnae: '6920-6/01',
      desc: 'Serviços contábeis e fiscais',
      lossWithout: 17500,
      lossOutdated: 12000,
      offerWithout: 'Site de Captação B2B + Botão de Abertura de CNPJ Grátis no WhatsApp',
      offerOutdated: 'Modernização Institucional com Simulador Tributário',
    },
    pets: {
      names: ['Clínica Veterinária Amigo Fiel', 'Pet Care & Banho Amor de Quatro Patas', 'Hospital Veterinário ProntoVet 24h'],
      cnae: '7500-1/00',
      desc: 'Atividades veterinárias e pet shop',
      lossWithout: 10500,
      lossOutdated: 6500,
      offerWithout: 'Site de Plantão Emergencial 24h + Agendamento de Banho e Tosa',
      offerOutdated: 'Página Leve com Botão de WhatsApp de Plantão Rápido',
    },
    fitness: {
      names: ['PowerFit Academia & Musculação', 'Studio Pilates & Corpo em Movimento', 'CT Guerreiros Funcional e Lutas'],
      cnae: '9313-1/00',
      desc: 'Condicionamento físico e treinos funcionais',
      lossWithout: 13000,
      lossOutdated: 7500,
      offerWithout: 'Página de Aula Experimental Grátis + Grade de Aulas no Celular',
      offerOutdated: 'Landing Page de Alta Conversão com Inscrição via WhatsApp',
    },
  };

  const selectedNiches = nicheId === 'todos' 
    ? Object.keys(nicheTemplates)
    : [nicheId];

  const generatedLeads: ProspectLead[] = [];
  let leadCounter = 1;

  for (const nKey of selectedNiches) {
    const template = nicheTemplates[nKey] || nicheTemplates.saude;
    const countToGenerate = nicheId === 'todos' ? 2 : 5;

    for (let i = 0; i < countToGenerate; i++) {
      const isWithoutWebsite = i % 2 === 0;
      const baseName = `${template.names[i % template.names.length]} - ${city}`;
      const street = streets[i % streets.length];
      const neighborhood = neighborhoods[i % neighborhoods.length];
      const streetNumber = Math.floor(Math.random() * 1500) + 40;

      // Calculate a controlled distance strictly within radiusKm
      // Distribute from 0.4 km up to 92% of the radius
      const targetDist = Math.max(
        0.4,
        Math.round(((i + 1) / (countToGenerate + 1) * (radiusKm * 0.88) + 0.3) * 10) / 10
      );

      // Distribute angles in a circular sweep
      const bearing = (leadCounter * 53 + i * 37) % 360;
      const coords = createOffsetCoordinates(centerLat, centerLng, targetDist, bearing);

      // Verify exact Haversine distance
      const exactDistance = calculateHaversineDistanceKm(centerLat, centerLng, coords.lat, coords.lng);

      // Strict enforcement: MUST NOT exceed radiusKm
      if (exactDistance > radiusKm) continue;

      // Celular valido (DDD + 9 + 8 digitos) para o botao de WhatsApp abrir o wa.me.
      const mobilePrefix = `9${Math.floor(1000 + Math.random() * 9000)}`;
      const mobileSuffix = `${Math.floor(1000 + Math.random() * 9000)}`;
      const phoneFormatted = `(${ddd}) ${mobilePrefix}-${mobileSuffix}`;
      const whatsappClean = `55${ddd}${mobilePrefix}${mobileSuffix}`;

      const cnpjRandom = `${Math.floor(10 + Math.random() * 89)}.${Math.floor(100 + Math.random() * 899)}.${Math.floor(100 + Math.random() * 899)}/0001-${Math.floor(10 + Math.random() * 89)}`;
      const fakeDomain = isWithoutWebsite ? undefined : `http://${template.names[0].toLowerCase().replace(/[^a-z0-9]/g, '')}-${city.toLowerCase().slice(0, 5)}.com.br`;

      const lead: ProspectLead = {
        id: `lead-loc-${leadCounter++}-${Date.now()}`,
        companyName: `${baseName} Ltda`,
        tradeName: baseName,
        cnpj: cnpjRandom,
        cnae: template.cnae,
        cnaeDescription: template.desc,
        niche: nKey,
        distanceKm: exactDistance,
        lat: coords.lat,
        lng: coords.lng,
        address: `${street}, ${streetNumber}`,
        neighborhood: neighborhood,
        city: city,
        state: state,
        phone: phoneFormatted,
        whatsappDirect: whatsappClean,
        hasWebsite: !isWithoutWebsite,
        websiteUrl: fakeDomain,
        urgencyLevel: isWithoutWebsite ? 'alta' : 'media',
        leadStatus: 'novo',
        opportunityType: isWithoutWebsite ? 'criar_site' : 'modernizar_site',
        googleRating: Math.round((4.4 + Math.random() * 0.5) * 10) / 10,
        reviewCount: Math.floor(20 + Math.random() * 80),
        estimatedMonthlyLoss: isWithoutWebsite ? template.lossWithout : template.lossOutdated,
        auditDetails: {
          mobileFriendly: !isWithoutWebsite && Math.random() > 0.4,
          sslActive: !isWithoutWebsite && Math.random() > 0.5,
          loadSpeedSeconds: isWithoutWebsite ? 0 : Math.round((4.2 + Math.random() * 2.5) * 10) / 10,
          hasWhatsAppButton: false,
          googleLighthouseScore: isWithoutWebsite ? 0 : Math.floor(28 + Math.random() * 32),
          modernityIssues: isWithoutWebsite
            ? [
                `Inexistência de website oficial para buscas locais em ${city}`,
                'Não possui botão direto de WhatsApp integrado para orçamentos rápidos',
                'Depende de indicações e fluxo físico de pedestres no bairro',
              ]
            : [
                'Carregamento superior a 4.5 segundos no 4G móvel',
                'Layout não adaptado adequadamente para telas de celulares modernos',
                'Falta de botão flutuante com mensagem pré-configurada no WhatsApp',
              ],
          keyWeakness: isWithoutWebsite
            ? `Sem presença digital própria no Google da região de ${city}.`
            : `Site desatualizado que afasta clientes de ${city} que buscam pelo celular.`,
          conversionOpportunity: isWithoutWebsite
            ? template.offerWithout
            : template.offerOutdated,
        },
        customPitch: isWithoutWebsite
          ? `Olá, equipe da ${baseName}! Vi que vocês oferecem um excelente atendimento na região de ${city}, mas notei que quando alguém pesquisa pelos seus serviços no Google, vocês ainda não contam com um site oficial com botão de WhatsApp. Criamos websites modernos de alta performance que posicionam sua empresa no topo das buscas locais e geram novos clientes todos os dias. Posso enviar um modelo demonstrativo sem compromisso?`
          : `Olá, equipe da ${baseName}! Estive analisando a presença digital de empresas da região de ${city} e percebi que o site de vocês pode carregar bem mais rápido no celular e converter mais visitantes com um botão dinâmico de WhatsApp. Modernizamos sites para empresas da sua área aumentando os agendamentos imediatos. Gostariam de ver uma prévia de modernização?`,
      };

      generatedLeads.push(lead);
    }
  }

  return generatedLeads.sort((a, b) => a.distanceKm - b.distanceKm);
}
