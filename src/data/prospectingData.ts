import { CnaeNicheOption, ProspectLead } from '../types';

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

// Rich initial base with multiple niches and close distances (0.6 km to 4.8 km)
export const INITIAL_PROSPECT_LEADS: ProspectLead[] = [
  // 1. SEM SITE - Clínica Odontológica (1.2 km)
  {
    id: 'lead-001',
    companyName: 'Studio Odonto Sorriso & Estética Ltda',
    tradeName: 'Studio Odonto Sorriso',
    cnpj: '48.912.304/0001-82',
    cnae: '8630-5/04',
    cnaeDescription: 'Atividade odontológica com consultas e procedimentos estéticos',
    niche: 'saude',
    distanceKm: 1.2,
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
        'Sem agendamento online rápido ou botão de WhatsApp direto',
        'Perde pacientes para clínicas vizinhas que têm site moderno',
      ],
      keyWeakness: 'Inexistência de presença digital própria; depende apenas de placa de rua e indicação.',
      conversionOpportunity: 'Criação de Landing Page de Alta Conversão + Google Meu Negócio otimizado + Botão WhatsApp 24h.',
    },
    customPitch: `Olá, equipe da Studio Odonto Sorriso! Tudo bem? Vi que vocês têm excelente avaliação de 4.8 estrelas no Google, mas notei que vocês ainda não possuem um site profissional com botão direto para WhatsApp. Hoje, pacientes que pesquisam alinhadores ou implantes no bairro acabam agendando com quem tem página rápida. Criamos páginas modernas que colocam sua clínica no topo e convertem visitantes em agendamentos diretos. Posso enviar um modelo demonstrativo sem compromisso?`,
  },

  // 2. COM SITE DESATUALIZADO - Escritório de Advocacia (1.8 km)
  {
    id: 'lead-002',
    companyName: 'Menezes & Barros Sociedade de Advogados',
    tradeName: 'Menezes & Barros Advogados',
    cnpj: '24.183.910/0001-44',
    cnae: '6911-7/01',
    cnaeDescription: 'Serviços advocatícios nas áreas trabalhista e cível',
    niche: 'advocacia',
    distanceKm: 1.8,
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
        'Alerta de "Site Não Seguro" no navegador (sem certificado SSL HTTPS)',
        'Carregamento lento: 5.8 segundos no 4G móvel',
        'Formulário de contato quebrado sem direcionamento para WhatsApp',
      ],
      keyWeakness: 'Site passa imagem de desatualização e insegurança jurídica para clientes corporativos.',
      conversionOpportunity: 'Redesign Moderno com Autoridade Visual + Certificado SSL + Botão Flutuante de WhatsApp + Otimização de Velocidade 98+.',
    },
    customPitch: `Olá, Dr. Menezes e equipe! Analisando a presença de escritórios jurídicos na região, acessei o site menezesbarrosadv.com.br e percebi que no celular ele ainda não é responsivo e acusa aviso de "Não Seguro" por falta de SSL, além de não ter botão rápido de WhatsApp. Isso afasta clientes corporativos. Desenvolvemos sites modernos para advocacia com design sóbrio, carregamento instantâneo e integração direta de WhatsApp. Gostaria de ver uma prévia de modernização?`,
  },

  // 3. SEM SITE - Restaurante & Cantina (2.1 km)
  {
    id: 'lead-003',
    companyName: 'Cantina Famiglia Bellini Gastronomia Eireli',
    tradeName: 'Cantina Bellini Trattoria',
    cnpj: '33.512.980/0001-19',
    cnae: '5611-2/01',
    cnaeDescription: 'Restaurantes e similares com serviço completo',
    niche: 'gastronomia',
    distanceKm: 2.1,
    address: 'Rua Treze de Maio, 450',
    neighborhood: 'Bixiga',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 98144-8832',
    whatsappDirect: '5511981448832',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.7,
    reviewCount: 240,
    estimatedMonthlyLoss: 14500,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Sem cardápio digital próprio (depende de PDF em link quebrado no Instagram)',
        'Não possui site para reservas de mesas ou eventos familiares',
        'Taxas pesadas pagas a marketplaces de delivery por falta de canal próprio',
      ],
      keyWeakness: 'Sem presença web própria com cardápio interativo e reserva rápida no WhatsApp.',
      conversionOpportunity: 'Site Gastronômico Imersivo com Cardápio Interativo + Galeria de Pratos + Sistema de Reserva via WhatsApp.',
    },
    customPitch: `Olá, equipe da Cantina Bellini! Vocês têm um dos pratos mais elogiados do bairro, mas quem pesquisa vocês no Google não encontra um site oficial com cardápio interativo e botão de reserva rápida. Criamos websites gastronômicos modernos com fotos de alta qualidade, cardápio digital e reservas automáticas no WhatsApp para fidelizar o cliente sem pagar comissão para terceiros. Posso enviar uma demonstração?`,
  },

  // 4. COM SITE DESATUALIZADO - Clínica de Estética (2.6 km)
  {
    id: 'lead-004',
    companyName: 'Harmonia & Pele Estética Facial e Corporal',
    tradeName: 'Harmonia & Pele Estética',
    cnpj: '39.401.782/0001-50',
    cnae: '9602-5/02',
    cnaeDescription: 'Atividades de estética e outros serviços de beleza',
    niche: 'estetica',
    distanceKm: 2.6,
    address: 'Rua Oscar Freire, 1120',
    neighborhood: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 99182-3309',
    whatsappDirect: '5511991823309',
    hasWebsite: true,
    websiteUrl: 'http://harmoniaepele-sp.com',
    urgencyLevel: 'media',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.9,
    reviewCount: 88,
    estimatedMonthlyLoss: 9200,
    auditDetails: {
      mobileFriendly: true,
      sslActive: true,
      loadSpeedSeconds: 4.2,
      hasWhatsAppButton: false,
      googleLighthouseScore: 48,
      modernityIssues: [
        'Fotos pesadas que demoram mais de 4 segundos para carregar no celular',
        'Falta de botão direto de WhatsApp com mensagem pré-configurada de avaliação',
        'Visual genérico de template antigo que não transmite sofisticação',
      ],
      keyWeakness: 'Tempo de carregamento alto afasta clientes exigentes que buscam estética premium.',
      conversionOpportunity: 'Redesign Sofisticado em tons Dark/Emerald + Galeria Otimizada + CTA de Agendamento Imediato.',
    },
    customPitch: `Olá, equipe da Harmonia & Pele! Admiro o trabalho de estética avançada de vocês. Dei uma olhada no site harmoniaepele-sp.com e notei que as fotos de procedimentos demoram mais de 4 segundos no celular e falta um botão flutuante para agendamento direto de avaliação. Com um redesign leve e botão inteligente no WhatsApp, a conversão de pacientes sobe bastante. Quer ver como modernizamos a presença online de clínicas de estética?`,
  },

  // 5. SEM SITE - Oficina Mecânica Especializada (0.9 km)
  {
    id: 'lead-005',
    companyName: 'Auto Center Precision & Diagnóstico Automotivo',
    tradeName: 'Auto Center Precision',
    cnpj: '18.774.209/0001-31',
    cnae: '4520-0/01',
    cnaeDescription: 'Serviços de manutenção e reparação mecânica',
    niche: 'automotivo',
    distanceKm: 0.9,
    address: 'Rua Vergueiro, 2300',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 97412-5501',
    whatsappDirect: '5511974125501',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.6,
    reviewCount: 52,
    estimatedMonthlyLoss: 16000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Sem página na internet para agendamento de revisão e troca de óleo',
        'Motoristas da região que pesquisam "oficina mecânica perto de mim" não encontram a loja',
        'Não exibe especialidades de marcas e certificações da equipe',
      ],
      keyWeakness: 'Sem presença digital, perde clientes com sinistros e revisões para autocenters de rede.',
      conversionOpportunity: 'Site Ágil com Botão de Socorro/Guincho Rápido + Agendamento de Revisão no WhatsApp + Lista de Serviços.',
    },
    customPitch: `Olá, equipe do Auto Center Precision! Vi que vocês são muito bem avaliados na região da Vila Mariana, mas hoje não têm um site profissional no ar. Quando um motorista quebra o carro ou precisa de revisão urgente, ele busca no Google e clica na primeira oficina que tem WhatsApp imediato. Criamos sites expressos para oficinas que geram orçamentos diários no seu WhatsApp. Posso mandar uma ideia rápida de modelo?`,
  },

  // 6. COM SITE DESATUALIZADO - Construtora & Reformas (3.4 km)
  {
    id: 'lead-006',
    companyName: 'Vanguard Engenharia & Projetos Civis Ltda',
    tradeName: 'Vanguard Engenharia',
    cnpj: '29.301.844/0001-65',
    cnae: '4120-4/00',
    cnaeDescription: 'Construção de edifícios e reformas residenciais',
    niche: 'construcao',
    distanceKm: 3.4,
    address: 'Av. Brigadeiro Faria Lima, 1800',
    neighborhood: 'Pinheiros',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 98831-4490',
    whatsappDirect: '5511988314490',
    hasWebsite: true,
    websiteUrl: 'http://vanguardeng-reformas.com.br',
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.5,
    reviewCount: 31,
    estimatedMonthlyLoss: 35000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 6.1,
      hasWhatsAppButton: false,
      googleLighthouseScore: 29,
      modernityIssues: [
        'Site antigo em PHP antigo com carregamento de mais de 6 segundos',
        'Galeria de fotos de obras antigas sem zoom e sem visual moderno',
        'Não possui certificado de segurança SSL',
        'Sem formulário dinâmico de solicitação de orçamento de m² de reforma',
      ],
      keyWeakness: 'Site passa impressão de empresa estagnada, perdendo obras de alto padrão para concorrentes.',
      conversionOpportunity: 'Portal Corporativo Moderno + Portfólio de Obras em Alta Resolução + Calculadora de Orçamento no WhatsApp.',
    },
    customPitch: `Olá, engenheiros da Vanguard Engenharia! Tudo bem? Estive avaliando o site vanguardeng-reformas.com.br e notei que a página é de arquitetura antiga e não abre com agilidade no smartphone, além de faltar segurança HTTPS e botão direto de WhatsApp. Para clientes que investem em obras e reformas de alto padrão, um site ultramoderno transmite a segurança necessária para fechar contratos de dezenas de milhares de reais. Gostariam de ver uma versão atualizada do site de vocês?`,
  },

  // 7. SEM SITE - Loja & Boutique de Roupas (1.5 km)
  {
    id: 'lead-007',
    companyName: 'Donna Bella Moda Feminina & Acessórios',
    tradeName: 'Donna Bella Boutique',
    cnpj: '35.192.401/0001-72',
    cnae: '4781-4/00',
    cnaeDescription: 'Comércio varejista de artigos do vestuário e acessórios',
    niche: 'comercio',
    distanceKm: 1.5,
    address: 'Rua Augusta, 1920',
    neighborhood: 'Cerqueira César',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 98223-1100',
    whatsappDirect: '5511982231100',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.7,
    reviewCount: 65,
    estimatedMonthlyLoss: 7800,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Vende apenas no balcão físico e no Direct do Instagram que fica desorganizado',
        'Não tem catálogo online para clientes verem tamanhos e coleções novas',
        'Falta de link na bio profissional que direcione compras diretamente para o WhatsApp',
      ],
      keyWeakness: 'Depende de responder cliente por cliente manualmente sem catálogo de produtos.',
      conversionOpportunity: 'Catálogo Digital Estilo Vitrine + Integração de Pedido Fácil no WhatsApp + Posicionamento no Google.',
    },
    customPitch: `Oi pessoal da Donna Bella Boutique! Acompanho as novidades de vocês na Augusta e percebi que vocês não têm um catálogo online onde as clientes possam ver os looks da semana e pedir no WhatsApp com 1 clique. Ficar respondendo preço uma a uma no direct consome tempo. Desenvolvemos vitrines digitais leves que aumentam as vendas da loja pelo WhatsApp. Posso mandar uma prévia de como ficaria a vitrine de vocês?`,
  },

  // 8. COM SITE DESATUALIZADO - Contabilidade & Consultoria Fiscal (2.9 km)
  {
    id: 'lead-008',
    companyName: 'Líder Contabilidade & Gestão Empresarial Eireli',
    tradeName: 'Líder Contabilidade',
    cnpj: '19.412.003/0001-99',
    cnae: '6920-6/01',
    cnaeDescription: 'Atividades de contabilidade e consultoria fiscal',
    niche: 'contabilidade',
    distanceKm: 2.9,
    address: 'Rua São Bento, 365 - 11º Andar',
    neighborhood: 'Centro Histórico',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 97100-3320',
    whatsappDirect: '5511971003320',
    hasWebsite: true,
    websiteUrl: 'http://lidercontabil-sp.com.br',
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.3,
    reviewCount: 15,
    estimatedMonthlyLoss: 18000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: true,
      loadSpeedSeconds: 5.2,
      hasWhatsAppButton: false,
      googleLighthouseScore: 38,
      modernityIssues: [
        'Design corporativo datado de 2012 com textos longos e burocráticos',
        'Sem botão para abertura rápida de CNPJ ou migração de MEI para ME',
        'Não possui canal ágil para pequenas e médias empresas conversarem no WhatsApp',
      ],
      keyWeakness: 'Site burocrático e lento que não atrai novas empresas e startups da região.',
      conversionOpportunity: 'Site Moderno Foco em BPO Financeiro + Simulador de Economia Tributária + Botão WhatsApp de Atendimento Rápido.',
    },
    customPitch: `Olá, contadores da Líder Contabilidade! Sabiam que a maioria dos empreendedores que busca contabilidade hoje procura atendimento moderno e sem burocracia no Google? O site atual de vocês tem layout antigo e não possui botão de abertura fácil de CNPJ no WhatsApp. Criamos sites modernos para escritórios contábeis que geram novos contratos recorrentes todos os meses. Quer ver como fica uma versão moderna do site da Líder?`,
  },

  // 9. SEM SITE - Pet Shop & Clínica Veterinária (0.7 km)
  {
    id: 'lead-009',
    companyName: 'Vida Animal Hospital Veterinário & Pet Care',
    tradeName: 'Vida Animal Pet & Vet',
    cnpj: '31.289.442/0001-10',
    cnae: '7500-1/00',
    cnaeDescription: 'Atividades veterinárias e comércio de artigos para animais',
    niche: 'pets',
    distanceKm: 0.7,
    address: 'Rua Pamplona, 730',
    neighborhood: 'Jardim Paulista',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 99341-2099',
    whatsappDirect: '5511993412099',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.8,
    reviewCount: 110,
    estimatedMonthlyLoss: 11000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Sem site de emergência 24h para tutores com cães/gatos passando mal',
        'Sem agendamento online de banho, tosa e vacinas',
        'Perde buscas no Google para hospitais veterinários distantes com site indexado',
      ],
      keyWeakness: 'Sem presença online rápida, tutores em situação de emergência recorrem a outro hospital.',
      conversionOpportunity: 'Site de Atendimento Emergencial 24h + Botão WhatsApp de Plantão + Agendamento de Estética Pet.',
    },
    customPitch: `Olá, equipe da Vida Animal! Vocês têm uma avaliação excelente no Jardim Paulista, mas não contam com um site oficial no Google com botão direto de plantão veterinário. Quando um tutor passa por uma emergência com o pet à noite, ele digita "veterinário 24h perto de mim" no Google e clica no primeiro botão de WhatsApp. Ter um site rápido garante que esses clientes cheguem direto a vocês. Posso enviar um modelo demonstrativo?`,
  },

  // 10. COM SITE DESATUALIZADO - Academia & Fitness (1.9 km)
  {
    id: 'lead-010',
    companyName: 'Titanium Box Centro de Treinamento e Crossfit',
    tradeName: 'Titanium Box Crossfit',
    cnpj: '36.812.903/0001-20',
    cnae: '9313-1/00',
    cnaeDescription: 'Atividades de condicionamento físico e treinamento funcional',
    niche: 'fitness',
    distanceKm: 1.9,
    address: 'Rua Haddock Lobo, 400',
    neighborhood: 'Cerqueira César',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 98765-4321',
    whatsappDirect: '5511987654321',
    hasWebsite: true,
    websiteUrl: 'http://titaniumbox-fit.com.br',
    urgencyLevel: 'media',
    leadStatus: 'novo',
    opportunityType: 'modernizar_site',
    googleRating: 4.8,
    reviewCount: 94,
    estimatedMonthlyLoss: 13500,
    auditDetails: {
      mobileFriendly: true,
      sslActive: true,
      loadSpeedSeconds: 4.9,
      hasWhatsAppButton: false,
      googleLighthouseScore: 42,
      modernityIssues: [
        'Sem botão direto para agendar "Aula Experimental Gratuita" no WhatsApp',
        'Grade de horários ilegível na tela do celular',
        'Vídeos de treino travando e pesando no carregamento móvel',
      ],
      keyWeakness: 'Falta de CTA de alta conversão para aula experimental rápida no WhatsApp.',
      conversionOpportunity: 'Página de Alta Conversão + Grade Interativa de Treinos + Botão "Garantir Aula Experimental" no WhatsApp.',
    },
    customPitch: `Fala pessoal da Titanium Box! A estrutura de vocês é fera, mas o site de vocês não tem um botão fácil para o aluno garantir aquela aula experimental no WhatsApp, além da grade de horários ficar pequena no celular. Com uma landing page veloz focada em conversão, vocês lotam as turmas de funcional e musculação. Querem ver como modernizamos a página de vocês para captar novos alunos?`,
  },

  // 11. SEM SITE - Imobiliária de Bairro (2.4 km)
  {
    id: 'lead-011',
    companyName: 'Prime Imóveis & Consultoria Patrimonial Ltda',
    tradeName: 'Prime Imóveis Consultoria',
    cnpj: '27.441.902/0001-88',
    cnae: '6821-8/01',
    cnaeDescription: 'Corretagem na compra, venda e avaliação de imóveis residenciais',
    niche: 'imoveis',
    distanceKm: 2.4,
    address: 'Av. Ibirapuera, 2030',
    neighborhood: 'Moema',
    city: 'São Paulo',
    state: 'SP',
    phone: '(11) 99122-8700',
    whatsappDirect: '5511991228700',
    hasWebsite: false,
    urgencyLevel: 'alta',
    leadStatus: 'novo',
    opportunityType: 'criar_site',
    googleRating: 4.6,
    reviewCount: 22,
    estimatedMonthlyLoss: 28000,
    auditDetails: {
      mobileFriendly: false,
      sslActive: false,
      loadSpeedSeconds: 0,
      hasWhatsAppButton: false,
      googleLighthouseScore: 0,
      modernityIssues: [
        'Depende exclusivamente de portais terceirizados caros pagando mensalidades altas',
        'Não tem catálogo próprio para divulgar coberturas e lançamentos no WhatsApp',
        'Falta de página de captura para proprietários que querem cadastrar imóveis',
      ],
      keyWeakness: 'Refém dos portais imobiliários caros sem construir marca própria no Google.',
      conversionOpportunity: 'Portal Imobiliário Próprio + Vitrine de Lançamentos + Integração Direta com WhatsApp dos Corretores.',
    },
    customPitch: `Olá, corretores da Prime Imóveis Moema! Pagar mensalidades caras nos grandes portais imobiliários sem ter um site próprio faz vocês perderem clientes que preferem falar direto com a imobiliária do bairro. Desenvolvemos sites imobiliários modernos, leves e integrados com WhatsApp, com vitrine de imóveis e formulário para proprietários cadastrarem imóveis sem complicação. Vamos marcar 10 minutos para eu mostrar como funciona?`,
  },
];

// Dynamic generator that guarantees high-quality, realistic prospects for ANY city, neighborhood, or radius typed by the user!
export function generateDynamicProspects(
  locationQuery: string,
  radiusKm: number,
  nicheId: string = 'todos'
): ProspectLead[] {
  const cleanLocation = locationQuery.trim() || 'Minha Região';
  
  // Extract city and state guess
  const parts = cleanLocation.split(/[,-/]/).map((p) => p.trim());
  const cityGuess = parts[0] || 'São Paulo';
  const neighborhoodGuess = parts.length > 1 ? parts[1] : 'Centro';
  const stateGuess = parts.length > 2 ? parts[2].slice(0, 2).toUpperCase() : 'SP';

  // Realistic DDD mapping
  const dddMap: Record<string, string> = {
    'sp': '11', 'são paulo': '11', 'campinas': '19', 'santos': '13',
    'rj': '21', 'rio de janeiro': '21', 'niterói': '21',
    'mg': '31', 'belo horizonte': '31', 'uberlândia': '34',
    'pr': '41', 'curitiba': '41', 'londrina': '43',
    'rs': '51', 'porto alegre': '51', 'caxias do sul': '54',
    'sc': '48', 'florianópolis': '48', 'joinville': '47',
    'ba': '71', 'salvador': '71',
    'df': '61', 'brasília': '61',
    'pe': '81', 'recife': '81',
    'ce': '85', 'fortaleza': '85',
    'go': '62', 'goiânia': '62',
  };

  const lowerQuery = cleanLocation.toLowerCase();
  let ddd = '11';
  for (const [key, val] of Object.entries(dddMap)) {
    if (lowerQuery.includes(key)) {
      ddd = val;
      break;
    }
  }

  // Business templates for every niche
  const nicheTemplates: Record<string, {
    names: string[];
    cnae: string;
    desc: string;
    streets: string[];
    lossWithout: number;
    lossOutdated: number;
    offerWithout: string;
    offerOutdated: string;
  }> = {
    saude: {
      names: ['Clínica Odonto Prime', 'Instituto Médico Integrado', 'Consultório Dra. Camila Saúde', 'Centro Odontológico Bem Estar', 'Clínica BellaFace Harmonização'],
      cnae: '8630-5/01',
      desc: 'Atividade médica ambulatorial e odontologia especializada',
      streets: ['Av. Central', 'Rua das Palmeiras', 'Rua São José', 'Av. Presidente Vargas', 'Rua XV de Novembro'],
      lossWithout: 9500,
      lossOutdated: 6200,
      offerWithout: 'Landing Page de Consultório + Agendamento Direto no WhatsApp + Google Local',
      offerOutdated: 'Redesign Ágil para Celular + Botão Flutuante de WhatsApp + Certificado SSL',
    },
    advocacia: {
      names: ['Almeida & Prado Sociedade de Advogados', 'Juris Consultoria & Advocacia', 'Santos & Faria Advogados Associados', 'Dra. Vanessa Advocacia Especializada'],
      cnae: '6911-7/01',
      desc: 'Serviços advocatícios e consultoria societária',
      streets: ['Rua Riachuelo', 'Av. Rio Branco', 'Rua da Quitanda', 'Rua Marechal Deodoro'],
      lossWithout: 14000,
      lossOutdated: 8500,
      offerWithout: 'Site Institucional de Alta Autoridade + Triagem Rápida no WhatsApp',
      offerOutdated: 'Modernização de Layout Corporativo + Segurança SSL + Alta Velocidade 98+',
    },
    gastronomia: {
      names: ['Pizzaria Forno a Lenha Bella', 'Restaurante Sabor da Vila', 'Boteco & Grill Gourmet', 'Hamburgueria Artesanal Roots', 'Café & Bistrô Aromas'],
      cnae: '5611-2/01',
      desc: 'Restaurantes e lanchonetes com serviço gastronômico',
      streets: ['Rua Augusta', 'Rua das Flores', 'Av. Principal', 'Rua do Comércio'],
      lossWithout: 16000,
      lossOutdated: 9000,
      offerWithout: 'Cardápio Digital Interativo + Sistema de Pedidos sem Taxa via WhatsApp',
      offerOutdated: 'Site Gastronômico Imersivo com Fotos Leves + Botão de Reserva Rápida',
    },
    estetica: {
      names: ['Espaço Beleza Pura Salão & Spa', 'Studio Vip Sobrancelhas e Make', 'Harmoniza Estética Facial', 'Barbearia Retrô dos Amigos'],
      cnae: '9602-5/01',
      desc: 'Cabeleireiros, barbearias e estética avançada',
      streets: ['Av. Brasil', 'Rua dos Pinheiros', 'Rua do Ouro', 'Av. Independência'],
      lossWithout: 8200,
      lossOutdated: 5400,
      offerWithout: 'Vitrine Visual dos Procedimentos + Agendamento VIP no WhatsApp',
      offerOutdated: 'Redesign Elegante + Carregamento Rápido de Fotos + CTA de Agendamento',
    },
    comercio: {
      names: ['Boutique Elegance Moda', 'Empório & Conveniência Central', 'Ótica Visão Perfeita', 'Loja Estilo Casa & Decoração'],
      cnae: '4712-1/00',
      desc: 'Comércio varejista em geral',
      streets: ['Rua do Comércio', 'Av. Getúlio Vargas', 'Rua Marechal Floriano', 'Rua Barão do Rio Branco'],
      lossWithout: 11000,
      lossOutdated: 7000,
      offerWithout: 'Catálogo de Produtos Online + Link de Compra Rápida no WhatsApp',
      offerOutdated: 'Loja Vitrine Responsiva + Otimização de Busca no Bairro',
    },
    automotivo: {
      names: ['Mecânica Central de Injeção Eletrônica', 'Auto Center & Pneus Confiança', 'Oficina dos Amigos Funilaria e Pintura', 'Oficina Mecânica Especializada Turbo'],
      cnae: '4520-0/01',
      desc: 'Serviços mecânicos e manutenção de veículos',
      streets: ['Av. Industrial', 'Rua dos Ferroviários', 'Av. dos Estados', 'Rodovia Local Km 2'],
      lossWithout: 15000,
      lossOutdated: 8900,
      offerWithout: 'Landing Page de Confiança + Botão de Socorro Rápido no WhatsApp',
      offerOutdated: 'Site Ágil com Formulário de Orçamento de Peças e Revisão',
    },
    construcao: {
      names: ['Aliança Reformas & Construções', 'Mestre de Obras & Pinturas Express', 'Projetos & Design Arquitetura', 'Construtora Horizonte Urbano'],
      cnae: '4120-4/00',
      desc: 'Construção civil, reformas e acabamentos',
      streets: ['Av. Engenheiro Carlos', 'Rua das Acácias', 'Av. Castelo Branco'],
      lossWithout: 25000,
      lossOutdated: 18000,
      offerWithout: 'Portfólio de Obras Realizadas + Captação de Orçamentos no WhatsApp',
      offerOutdated: 'Site Corporativo de Autoridade + Galeria em Alta Definição',
    },
    imoveis: {
      names: ['Imobiliária Horizonte Imóveis', 'Corretora Solidez Imóveis e Aluguéis', 'Habitar Gestão Imobiliária', 'Imobiliária Prime Seleção'],
      cnae: '6821-8/01',
      desc: 'Intermediação e venda de imóveis',
      streets: ['Av. das Américas', 'Rua das Hortênsias', 'Av. Sete de Setembro'],
      lossWithout: 32000,
      lossOutdated: 22000,
      offerWithout: 'Portal de Imóveis Próprio + Vitrine de Lançamentos no WhatsApp',
      offerOutdated: 'Redesign Moderno com Busca de Imóveis Leve no Celular',
    },
    contabilidade: {
      names: ['Exata Contabilidade & BPO', 'Solução Fiscal Escritório Contábil', 'Confiance Assessoria Empresarial'],
      cnae: '6920-6/01',
      desc: 'Serviços contábeis e fiscais',
      streets: ['Rua Álvares Penteado', 'Av. Afonso Pena', 'Rua Bahia'],
      lossWithout: 17500,
      lossOutdated: 12000,
      offerWithout: 'Site de Captação B2B + Botão de Abertura de CNPJ Grátis no WhatsApp',
      offerOutdated: 'Modernização Institucional com Simulador Tributário',
    },
    pets: {
      names: ['Clínica Veterinária Amigo Fiel', 'Pet Care & Banho Amor de Quatro Patas', 'Hospital Veterinário ProntoVet 24h'],
      cnae: '7500-1/00',
      desc: 'Atividades veterinárias e pet shop',
      streets: ['Rua dos Bem-Te-Vis', 'Av. Dr. Arnaldo', 'Rua Santa Catarina'],
      lossWithout: 10500,
      lossOutdated: 6500,
      offerWithout: 'Site de Plantão Emergencial 24h + Agendamento de Banho e Tosa',
      offerOutdated: 'Página Leve com Botão de WhatsApp de Plantão Rápido',
    },
    fitness: {
      names: ['PowerFit Academia & Musculação', 'Studio Pilates & Corpo em Movimento', 'CT Guerreiros Funcional e Lutas'],
      cnae: '9313-1/00',
      desc: 'Condicionamento físico e treinos funcionais',
      streets: ['Rua dos Esportes', 'Av. Getúlio Vargas', 'Rua Dom Pedro II'],
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

  // Generate leads for each selected niche
  for (const nKey of selectedNiches) {
    const template = nicheTemplates[nKey] || nicheTemplates.saude;
    
    // Generate 2 to 4 leads per niche (half without site, half with outdated site)
    const countToGenerate = nicheId === 'todos' ? 2 : 5;

    for (let i = 0; i < countToGenerate; i++) {
      const isWithoutWebsite = i % 2 === 0;
      const baseName = template.names[i % template.names.length];
      const street = template.streets[i % template.streets.length];
      const streetNumber = Math.floor(Math.random() * 1800) + 50;
      
      // Calculate realistic distance within the chosen radius
      // Ensures leads are distributed nicely: some very close (0.5 - 1.5 km), some medium
      const distance = Math.max(0.4, Math.round(((i + 1) / (countToGenerate + 1) * radiusKm * 0.85 + 0.3) * 10) / 10);
      
      const phoneSuffix = Math.floor(1000 + Math.random() * 9000);
      const phoneMiddle = Math.floor(98000 + Math.random() * 1999);
      const phoneFormatted = `(${ddd}) ${phoneMiddle}-${phoneSuffix}`;
      const whatsappClean = `55${ddd}${phoneMiddle}${phoneSuffix}`;
      
      const cnpjRandom = `${Math.floor(10 + Math.random() * 89)}.${Math.floor(100 + Math.random() * 899)}.${Math.floor(100 + Math.random() * 899)}/0001-${Math.floor(10 + Math.random() * 89)}`;

      const fakeDomain = isWithoutWebsite ? undefined : `http://${baseName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${cityGuess.toLowerCase().slice(0, 4)}.com.br`;

      const lead: ProspectLead = {
        id: `gen-lead-${leadCounter++}-${Date.now()}`,
        companyName: `${baseName} Ltda`,
        tradeName: `${baseName} - ${neighborhoodGuess}`,
        cnpj: cnpjRandom,
        cnae: template.cnae,
        cnaeDescription: template.desc,
        niche: nKey,
        distanceKm: distance,
        address: `${street}, ${streetNumber}`,
        neighborhood: neighborhoodGuess,
        city: cityGuess,
        state: stateGuess,
        phone: phoneFormatted,
        whatsappDirect: whatsappClean,
        hasWebsite: !isWithoutWebsite,
        websiteUrl: fakeDomain,
        urgencyLevel: isWithoutWebsite ? 'alta' : 'media',
        leadStatus: 'novo',
        opportunityType: isWithoutWebsite ? 'criar_site' : 'modernizar_site',
        googleRating: Math.round((4.2 + Math.random() * 0.7) * 10) / 10,
        reviewCount: Math.floor(15 + Math.random() * 120),
        estimatedMonthlyLoss: isWithoutWebsite ? template.lossWithout : template.lossOutdated,
        auditDetails: {
          mobileFriendly: !isWithoutWebsite && Math.random() > 0.5,
          sslActive: !isWithoutWebsite && Math.random() > 0.6,
          loadSpeedSeconds: isWithoutWebsite ? 0 : Math.round((4.0 + Math.random() * 2.8) * 10) / 10,
          hasWhatsAppButton: false,
          googleLighthouseScore: isWithoutWebsite ? 0 : Math.floor(25 + Math.random() * 30),
          modernityIssues: isWithoutWebsite
            ? [
                `Inexistência de website oficial indexado para buscas em ${cityGuess}`,
                'Não possui botão direto de WhatsApp integrado para orçamentos rápidos',
                'Depende de indicações e fluxo físico de pedestres no bairro',
              ]
            : [
                'Carregamento superior a 4.5 segundos no 4G móvel',
                'Layout não adaptado adequadamente para telas de celulares modernos',
                'Falta de botão flutuante com mensagem pré-configurada no WhatsApp',
                'Visual antigo que gera perda de credibilidade perante a concorrência',
              ],
          keyWeakness: isWithoutWebsite
            ? `Totalmente sem presença digital própria no Google da região de ${cityGuess}.`
            : 'Site desatualizado e lento que afasta novos clientes que buscam pelo celular.',
          conversionOpportunity: isWithoutWebsite
            ? template.offerWithout
            : template.offerOutdated,
        },
        customPitch: isWithoutWebsite
          ? `Olá, equipe da ${baseName}! Vi que vocês oferecem um excelente atendimento na região de ${cityGuess}, mas notei que quando alguém pesquisa pelos seus serviços no Google, vocês ainda não contam com um site oficial com botão de WhatsApp. Criamos websites modernos de alta performance que posicionam sua empresa no topo das buscas locais e geram novos clientes todos os dias. Posso enviar um modelo demonstrativo sem compromisso?`
          : `Olá, equipe da ${baseName}! Estive analisando a presença digital de empresas da região de ${cityGuess} e percebi que o site de vocês pode carregar bem mais rápido no celular e converter mais visitantes com um botão dinâmico de WhatsApp. Modernizamos sites para empresas da sua área aumentando os agendamentos imediatos. Gostariam de ver uma prévia de modernização?`,
      };

      generatedLeads.push(lead);
    }
  }

  // Sort by closest distance first
  return generatedLeads.sort((a, b) => a.distanceKm - b.distanceKm);
}
