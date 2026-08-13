import { Service } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'websites-landing-pages',
    icon: 'Globe',
    title: 'Websites & Landing Pages de Alta Conversão',
    subtitle: 'Design Exclusivo, Ultrarrápido & Focado em Vendas',
    description: 'Desenvolvimento de landing pages, sites institucionais e portais sob medida focados na melhor experiência do usuário, tempo de carregamento inferior a 1 segundo, SEO impecável e altíssima conversão de visitantes em clientes.',
    deliverables: [
      'Design e Layout 100% Exclusivo, Moderno e Responsivo',
      'Otimização Extrema de Carregamento (Google PageSpeed 95+)',
      'Integração Direta com Botão WhatsApp e Formulários de Captura',
      'Estruturação de SEO Avançada para Ranqueamento no Google',
      'Instalação de Pixels (Meta/Google Analytics) para Rastreamento'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3', 'SEO'],
    popularFor: 'Empresas, profissionais liberais e negócios que desejam uma presença digital marcante que converte visitas em contatos'
  },
  {
    id: 'automacoes-whatsapp-telegram',
    icon: 'MessageSquare',
    title: 'Automações para WhatsApp & Telegram',
    subtitle: 'Chatbots Inteligentes, Notificações & Réguas de Relacionamento',
    description: 'Sistemas automatizados de mensagens para atender clientes, agendar horários, disparar lembretes, enviar notificações e gerenciar grupos com praticidade e resposta instantânea 24h/dia.',
    deliverables: [
      'Chatbot interativo com menus e respostas rápidas no WhatsApp/Telegram',
      'Lembretes automáticos para agendamentos, consultas e confirmações',
      'Disparo automatizado de notificações de vendas ou formulários recebidos',
      'Integração direta de mensagens com Webhooks, CRMs e Planilhas',
      'Transição suave para atendimento humano com histórico completo'
    ],
    technologies: ['WhatsApp API', 'Telegram Bot API', 'N8N', 'Make', 'Node.js', 'Webhooks'],
    popularFor: 'Negócios com alto volume de contatos diários no WhatsApp e Telegram que buscam agilidade sem perda de qualidade'
  },
  {
    id: 'automacoes-sistemas-webhooks',
    icon: 'Workflow',
    title: 'Automações de Sites & Integrações de Sistemas',
    subtitle: 'Conecte seu Site a Planilhas, CRMs e Bancos de Dados',
    description: 'Conectores sob medida que integram formulários do seu site com planilhas inteligentes, sistemas de gestão, grupos do Telegram e banco de dados, eliminando 100% da digitação manual.',
    deliverables: [
      'Encaminhamento automático de leads do site para WhatsApp/Telegram',
      'Sincronização em tempo real de cadastros com Google Sheets e CRMs',
      'Criação de Webhooks seguros para disparo de ações automáticas',
      'Envio automatizado de relatórios e resumos executivos por e-mail/mensagem',
      'Arquitetura confiável com registro de logs para auditoria'
    ],
    technologies: ['N8N', 'Make (Integromat)', 'REST APIs', 'Node.js', 'Express', 'Webhooks'],
    popularFor: 'Empresas que perdem horas diárias repassando informações entre formulários, e-mails e planilhas'
  },
  {
    id: 'criacao-posts-instagram',
    icon: 'Instagram',
    title: 'Criação de Posts & Design para Instagram',
    subtitle: 'Artes Profissionais, Carrosséis Educativos & Identidade Visual',
    description: 'Desenvolvimento de conteúdo visual estratégico para redes sociais. Criação de posts estáticos, carrosséis explicativos e identidade marcante para destacar sua marca e gerar engajamento.',
    deliverables: [
      'Artes profissionais e carrosséis explicativos de alta conversão',
      'Padronização visual (paleta de cores, tipografia e elementos da marca)',
      'Copywriting estratégico para legendas e chamadas para ação (CTA)',
      'Formatos prontos otimizados para Feed (1080x1350) e Stories',
      'Calendário mensal de postagens organizadas para publicação'
    ],
    technologies: ['Canva Pro', 'Figma', 'Photoshop', 'Copywriting', 'Instagram Marketing'],
    popularFor: 'Profissionais e marcas que desejam manter o perfil ativo, atraente e autoritário no Instagram'
  },
  {
    id: 'analise-dados-dashboards',
    icon: 'BarChart3',
    title: 'Análise de Dados & Dashboards (Foco em Dados)',
    subtitle: 'Painéis Visuais em Tempo Real & Métricas Estratégicas',
    description: 'Especialidade desenvolvida no portal focoemdados.com.br. Construção de dashboards visuais e tratamento de dados para acompanhar indicadores de desempenho e tomar decisões inteligentes.',
    deliverables: [
      'Dashboards visuais interativos para acompanhamento de vendas e leads',
      'Centralização de dados de múltiplos canais em um único painel',
      'Alertas automatizados no Telegram/WhatsApp para variações de KPIs',
      'Relatórios gerenciais periódicos com insights de crescimento'
    ],
    technologies: ['Foco em Dados Engine', 'Data Analytics', 'BI', 'SQL', 'Recharts', 'Node.js'],
    popularFor: 'Gestores e empreendedores que precisam visualizar métricas com clareza para escalar seus negócios'
  }
];

export const WORKFLOW_NODES = {
  triggers: [
    { id: 't1', name: 'Formulário do Site Preenchido', icon: 'FileText', platform: 'Website / Landing Page', description: 'Ativado quando um visitante envia o formulário de contato no site.' },
    { id: 't2', name: 'Nova Mensagem no WhatsApp', icon: 'MessageSquare', platform: 'WhatsApp Business', description: 'Ativado quando um novo cliente envia mensagem para o número da empresa.' },
    { id: 't3', name: 'Comando no Telegram', icon: 'Send', platform: 'Telegram Bot', description: 'Ativado via comando /status, /agendar ou recebimento de arquivo.' },
    { id: 't4', name: 'Novo Seguidor / Lead Instagram', icon: 'Instagram', platform: 'Instagram DM / Direct', description: 'Ativado ao receber interação no post ou palavra-chave na DM.' }
  ],
  actions: [
    { id: 'a1', name: 'Notificar Luciano / Equipe no Telegram', icon: 'Bell', platform: 'Telegram Bot API', description: 'Envia alerta imediato com os dados do lead no grupo do Telegram.', hoursSaved: 20 },
    { id: 'a2', name: 'Enviar Resposta Automática no WhatsApp', icon: 'MessageSquare', platform: 'WhatsApp API', description: 'Dispara apresentação, portfólio e link de agendamento instantaneamente.', hoursSaved: 25 },
    { id: 'a3', name: 'Salvar Registro no Banco de Dados', icon: 'Database', platform: 'Foco em Dados DB / Sheets', description: 'Armazena histórico de contatos e métricas para análise posterior.', hoursSaved: 15 },
    { id: 'a4', name: 'Ativar Agente de Atendimento IA', icon: 'Sparkles', platform: 'Gemini AI Assistant', description: 'Responde dúvidas técnicas e qualifica a necessidade do cliente.', hoursSaved: 30 },
    { id: 'a5', name: 'Disparar Material em PDF / Link de Post', icon: 'Image', platform: 'Instagram / Automation Engine', description: 'Entrega e-book ou carrossel solicitado automaticamente na DM.', hoursSaved: 18 }
  ]
};
