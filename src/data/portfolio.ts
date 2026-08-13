import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'sos-cuidadores',
    title: 'SOS Cuidadores - Portal de Apoio, Cuidadores & Saúde',
    client: 'SOS Cuidadores (Projeto sob Comando de Luciano)',
    category: 'platform',
    platform: 'soscuidadores.com',
    projectUrl: 'https://soscuidadores.com',
    description: 'Plataforma web para acolhimento, gestão de cadastros, conteúdos informativos de saúde e apoio direto na conexão de cuidadores qualificados com famílias.',
    fullCaseStudy: {
      challenge: 'Facilitar o acesso a cuidados humanizados e conectar famílias a cuidadores com agilidade, segurança e suporte contínuo.',
      solution: 'Desenvolvimento de portal acessível com triagem rápida de necessidades, formulários integrados a notificações diretas no WhatsApp/Telegram e canal de suporte dedicado.',
      results: [
        '+10.000 Famílias e Cuidadores Conectados',
        'Tempo de Resposta ao Usuário < 5 minutos',
        'Plataforma Acessível, Leve e Responsiva para Mobile'
      ]
    },
    metrics: [
      { label: 'Acessos & Apoio', value: '10.000+' },
      { label: 'Tempo Resposta', value: '< 5 min' },
      { label: 'Satisfação', value: '4.9/5.0' }
    ],
    tags: ['Website', 'Acessibilidade', 'WhatsApp API', 'Formulários Inteligentes', 'SEO'],
    imageUrl: '/src/assets/images/sos_cuidadores_preview_1786575237737.jpg',
    featured: true
  },
  {
    id: 'foco-em-dados',
    title: 'Foco em Dados - Análise de Dados & Dashboards de BI',
    client: 'Foco em Dados (Projeto sob Comando de Luciano)',
    category: 'data',
    platform: 'focoemdados.com.br',
    projectUrl: 'https://focoemdados.com.br',
    description: 'Solução completa de Inteligência de Negócios e Análise de Dados que consolida métricas de vendas, leads e marketing em dashboards em tempo real.',
    fullCaseStudy: {
      challenge: 'Dados de vendas e campanhas espalhados em diferentes planilhas e plataformas geravam lentidão e falta de clareza nas decisões estratégicas.',
      solution: 'Desenvolvimento de painéis visuais interativos com extração automática de dados, consolidação de KPIs e alertas inteligentes no Telegram.',
      results: [
        'Visão 360° em Tempo Real de Todos os Indicadores de Desempenho',
        'Economia de +40 Horas Mensais em Relatórios Manuais',
        'Alertas de Variação de Métricas via Bot no Telegram'
      ]
    },
    metrics: [
      { label: 'Horas Economizadas', value: '40h/mês' },
      { label: 'Acurácia de Dados', value: '100%' },
      { label: 'Painéis Ativos', value: 'Tempo Real' }
    ],
    tags: ['Data Analytics', 'BI', 'Dashboards', 'Telegram Bot', 'SQL', 'Python/Node'],
    imageUrl: '/src/assets/images/foco_em_dados_preview_1786575253931.jpg',
    featured: true
  },
  {
    id: 'landing-page-alta-conversao',
    title: 'Landing Page de Alta Conversão & Agendamento Direto',
    client: 'Clínica & Serviços Especializados',
    category: 'website',
    platform: 'React + Tailwind + WhatsApp API',
    description: 'Página de vendas focada na conversão de tráfego pago (Google Ads/Meta Ads) em contatos diretos no WhatsApp com qualificação de leads.',
    fullCaseStudy: {
      challenge: 'A página anterior era genérica, demorava para carregar no celular e perdia 70% dos visitantes antes do contato.',
      solution: 'Criação de Landing Page com tempo de carregamento < 0.8s, copy persuasiva, prova social em destaque e botão flutuante de WhatsApp direcionando para atendimento.',
      results: [
        '+185% de Aumento nas Conversões de Visitantes para WhatsApp',
        'Score 98/100 no Google PageSpeed Mobile',
        'Custo por Aquisição de Lead (CPA) reduzido em 42%'
      ]
    },
    metrics: [
      { label: 'Taxa Conversão', value: '+185%' },
      { label: 'Speed Score', value: '98/100' },
      { label: 'Redução CPA', value: '-42%' }
    ],
    tags: ['Landing Page', 'Tailwind CSS', 'WhatsApp API', 'Copywriting', 'Conversion Rate'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'automacao-whatsapp-telegram-bot',
    title: 'Bot Multicanal WhatsApp & Telegram para Atendimento 24/7',
    client: 'Empresa de Serviços & Atendimento',
    category: 'automation',
    platform: 'N8N + WhatsApp API + Telegram API',
    description: 'Automação inteligente que atende dúvidas frequentes, recebe solicitações, envia lembretes automáticos e notifica a equipe interna no Telegram.',
    fullCaseStudy: {
      challenge: 'Gargalo no atendimento comercial em horários de pico e falta de registros organizados dos contatos recebidos.',
      solution: 'Implementação de fluxo automatizado no N8N conectando a API do WhatsApp e do Telegram com armazenamento em planilha de controle em tempo real.',
      results: [
        'Atendimento instantâneo 24 horas por dia, 7 dias por semana',
        'Redução de 75% no tempo de espera do cliente',
        'Notificação em tempo real no Telegram sobre novos leads qualificados'
      ]
    },
    metrics: [
      { label: 'Atendimento', value: '24/7 Instantâneo' },
      { label: 'Redução Espera', value: '-75%' },
      { label: 'Notificações', value: 'Tempo Real' }
    ],
    tags: ['WhatsApp Bot', 'Telegram Bot', 'N8N', 'Webhooks', 'Automações'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'posts-design-instagram-estrategia',
    title: 'Criação de Conteúdo, Carrosséis & Estratégia Visual Instagram',
    client: 'Perfis Profissionais & Marcas no Instagram',
    category: 'social',
    platform: 'Canva Pro + Figma + Copywriting',
    description: 'Pacote de design para redes sociais focado em criar autoridade, ensinar o público e transformar seguidores em clientes no Instagram.',
    fullCaseStudy: {
      challenge: 'Perfil com baixo engajamento e artes desalinhadas da proposta profissional que não geravam vendas diretas.',
      solution: 'Criação de linha editorial com carrosséis educativos em alta definição, artes para stories interativos e padronização visual sofisticada.',
      results: [
        '+230% no Alcance Orgânico do Perfil',
        'Aumento expressivo nas mensagens diretas (DM) solicitando orçamentos',
        'Identidade visual marcante que gera autoridade imediata'
      ]
    },
    metrics: [
      { label: 'Alcance Orgânico', value: '+230%' },
      { label: 'Conversão DM', value: '3.5x Maior' },
      { label: 'Posts Entregues', value: '100% Otimizados' }
    ],
    tags: ['Instagram', 'Design Gráfico', 'Carrosséis', 'Copywriting', 'Branding'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    featured: false
  }
];
