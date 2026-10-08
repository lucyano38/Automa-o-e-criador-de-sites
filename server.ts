import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Insights, Tips & Project Updates by Luciano Tavares Silva
  app.get('/api/insights', (req, res) => {
    const insightsData = [
      {
        id: '1',
        category: 'automacao',
        categoryLabel: 'Automação WhatsApp & Telegram',
        title: 'Como responder leads em menos de 10 segundos no WhatsApp',
        summary: 'Integrando formulários web diretamente com Webhooks da API do WhatsApp, reduzimos o tempo de resposta a zero e aumentamos o fechamento de reuniões em até 40%.',
        readTime: '2 min de leitura',
        date: 'Recente',
        author: 'Luciano Tavares Silva',
        tags: ['WhatsApp Bot', 'Webhooks', 'Automação'],
        keyTakeaway: 'Leads atendidos nos primeiros 5 minutos possuem 9x mais chances de converter do que os atendidos após 30 minutos.',
        linkUrl: '#automacoes'
      },
      {
        id: '2',
        category: 'conversao',
        categoryLabel: 'Websites & Performance',
        title: 'O impacto de uma Landing Page com carregamento < 1s nas vendas',
        summary: 'Sites lentos em conexões móveis perdem até 30% do tráfego antes mesmo da página abrir. Arquiteturas com React e Vite entregam carregamento instantâneo.',
        readTime: '3 min de leitura',
        date: 'Recente',
        author: 'Luciano Tavares Silva',
        tags: ['React', 'Performance', 'SEO'],
        keyTakeaway: 'Performance técnica é uma estratégia direta de vendas, não apenas um capricho técnico.',
        linkUrl: '#servicos'
      },
      {
        id: '3',
        category: 'projeto',
        categoryLabel: 'Projetos Sob Comando',
        title: 'SOS Cuidadores: Sistema de Alertas em Tempo Real via Telegram',
        summary: 'No soscuidadores.com, desenvolvemos um fluxo que dispara notificações imediatas para a equipe assim que um novo pedido de apoio é registrado no portal.',
        readTime: '2 min de leitura',
        date: 'Projeto Ativo',
        author: 'Luciano Tavares Silva',
        tags: ['soscuidadores.com', 'Telegram Bot', 'Notificações'],
        keyTakeaway: 'Acelerar o tempo de resposta humaniza o atendimento em momentos de vulnerabilidade.',
        linkUrl: 'https://soscuidadores.com'
      },
      {
        id: '4',
        category: 'instagram',
        categoryLabel: 'Estratégia para Instagram',
        title: 'Estrutura de Carrossel no Instagram focada em atração para o WhatsApp',
        summary: 'Design e copywriting para Instagram devem ter um objetivo claro: levar o seguidor do feed para uma conversa direta no seu WhatsApp.',
        readTime: '3 min de leitura',
        date: 'Recente',
        author: 'Luciano Tavares Silva',
        tags: ['Instagram', 'Carrossel', 'Design'],
        keyTakeaway: 'O último slide de um carrossel educativo deve ter uma chamada de ação clara e irresistível.',
        linkUrl: '#servicos'
      },
      {
        id: '5',
        category: 'dados',
        categoryLabel: 'Análise de Dados & BI',
        title: 'Centralização de Métricas no Foco em Dados sem trabalho manual',
        summary: 'Elimine o hábito de copiar e colar dados em planilhas. Automações conectam formulários e vendas em painéis de BI atualizados em tempo real.',
        readTime: '2 min de leitura',
        date: 'Projeto Ativo',
        author: 'Luciano Tavares Silva',
        tags: ['focoemdados.com.br', 'Business Intelligence', 'Dashboards'],
        keyTakeaway: 'Decisões guiadas por dados em tempo real evitam investimentos sem retorno.',
        linkUrl: 'https://focoemdados.com.br'
      },
      {
        id: '6',
        category: 'automacao',
        categoryLabel: 'Automação & Qualificação',
        title: 'Filtro automático de leads para otimizar o tempo da equipe comercial',
        summary: 'Perder tempo com contatos fora do perfil consome a equipe. Bots no WhatsApp fazem a triagem inicial e entregam apenas contatos qualificados.',
        readTime: '3 min de leitura',
        date: 'Dica Prática',
        author: 'Luciano Tavares Silva',
        tags: ['Triagem', 'Qualificação', 'CRM'],
        keyTakeaway: 'Automação de triagem economiza até 15 horas semanais da equipe de vendas.',
        linkUrl: '#calculadora'
      }
    ];

    const { category } = req.query;
    if (category && category !== 'all') {
      const filtered = insightsData.filter(i => i.category === category);
      return res.json({ insights: filtered, total: filtered.length });
    }

    res.json({ insights: insightsData, total: insightsData.length });
  });

  // API Route: AI Auto Video Editor & Script / Hook Generator
  app.post('/api/auto-video/generate-script', async (req, res) => {
    try {
      const { topic, format, targetAudience, style } = req.body;

      if (!topic) {
        return res.status(400).json({ error: 'Informe o tema ou ideia do vídeo.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback intelligent script and auto-edit structure
        return res.json({
          source: 'fallback',
          title: `Vídeo Estratégico: ${topic}`,
          viralityScore: 92,
          estimatedDuration: '45 segundos',
          aspectRatio: format || '9:16',
          hooks: [
            `Pare de perder clientes por não ter ${topic}! Veja isso agora:`,
            `O maior segredo para dominar ${topic} em menos de 1 minuto.`,
            `Se você ainda faz isso com ${topic}, está perdendo dinheiro.`
          ],
          segments: [
            {
              timestamp: '00:00 - 00:05',
              scene: 'Gancho Visual + Zoom Rápido (1.2x)',
              dialogue: `Você sabia que a maioria das pessoas erra feio quando o assunto é ${topic}?`,
              brollSuggestion: 'Corte rápido com texto piscando em amarelo/verde e efeito sonoro swoosh.',
              captionText: 'VOCÊ SABIA DISSO?! 😱',
              captionHighlight: 'VOCÊ SABIA'
            },
            {
              timestamp: '00:05 - 00:18',
              scene: 'Problema & Identificação (Câmera Normal)',
              dialogue: `O grande erro é tentar resolver tudo no manual sem uma estrutura automática e profissional.`,
              brollSuggestion: 'Tela mostrando processos lentos e notificação de alerta.',
              captionText: 'O erro clássico de fazer tudo no manual...',
              captionHighlight: 'ERRO CLÁSSICO'
            },
            {
              timestamp: '00:18 - 00:35',
              scene: 'Solução Prática & Demonstração (Corte Dinâmico)',
              dialogue: `Com a automação certa, você economiza horas por dia e atrai clientes 24 horas por dia no piloto automático.`,
              brollSuggestion: 'Gráfico de crescimento acelerado e notificações de novos leads no WhatsApp.',
              captionText: 'Atendimento e vendas no piloto automático 24h! 🚀',
              captionHighlight: 'PILOTO AUTOMÁTICO'
            },
            {
              timestamp: '00:35 - 00:45',
              scene: 'Chamada para Ação / CTA (Zoom In + Botão WhatsApp)',
              dialogue: `Quer aplicar isso no seu negócio hoje mesmo? Clica no link da bio ou me chama no WhatsApp!`,
              brollSuggestion: 'Seta animada apontando para a bio ou botão de contato.',
              captionText: 'Fale com o Luciano no WhatsApp agora mesmo! 👉',
              captionHighlight: 'CLIQUE NO LINK'
            }
          ],
          suggestedCaptionsStyle: 'Hormozi Pop (Amarelo / Verde)',
          recommendedBgm: 'Upbeat Tech Modern Lofi',
          hashtags: ['#marketingdigital', '#automacao', '#conversao', '#negociosdigitais', '#reelsbrasil']
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Você é um editor de vídeo profissional e estrategista de vídeos curtos virais (Reels, TikTok, Shorts e VSLs).
Gere uma estrutura completa de edição automática e roteiro de alta retenção para o seguinte vídeo:
- Tema/Assunto: ${topic}
- Formato desejado: ${format || '9:16 (Vertical Reels/TikTok)'}
- Público Alvo: ${targetAudience || 'Empreendedores e Clientes em Potencial'}
- Estilo: ${style || 'Dinâmico, com cortes rápidos, legendas magnéticas e alto impacto'}

Retorne APENAS um JSON válido no seguinte formato:
{
  "title": "string",
  "viralityScore": 94,
  "estimatedDuration": "45-60s",
  "aspectRatio": "9:16",
  "hooks": ["gancho 1", "gancho 2", "gancho 3"],
  "segments": [
    {
      "timestamp": "00:00 - 00:05",
      "scene": "descrição do corte / transição visual",
      "dialogue": "fala exata do apresentador",
      "brollSuggestion": "sugestão de B-Roll / imagem de apoio",
      "captionText": "texto da legenda dinâmica",
      "captionHighlight": "palavra a destacar"
    }
  ],
  "suggestedCaptionsStyle": "Hormozi Pop",
  "recommendedBgm": "Nome do estilo musical de fundo",
  "hashtags": ["#tag1", "#tag2", "#tag3"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json({ source: 'gemini_ai', ...parsed });
      } catch (e) {
        return res.status(500).json({ error: 'Erro ao formatar roteiro de vídeo.' });
      }
    } catch (err: any) {
      console.error('Auto Video API error:', err);
      res.status(500).json({ error: 'Erro ao gerar edição automática de vídeo.' });
    }
  });

  // API Route: AI E-Commerce & Automation Diagnostic
  app.post('/api/diagnostic', async (req, res) => {
    try {
      const { storeName, storePlatform, monthlyOrders, currentChallenges, goals } = req.body;

      if (!storeName || !currentChallenges) {
        return res.status(400).json({ error: 'Por favor preencha o nome da empresa/loja e o principal desafio.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback intelligent diagnostic generation if no key provided
        return res.json({
          source: 'structured_fallback',
          summary: `Diagnóstico Técnico Preliminar para ${storeName} (${storePlatform || 'Negócio / Projeto Digital'})`,
          executiveSummary: `Com base em ${monthlyOrders || 'sua operação atual'} e nos desafios descritos ("${currentChallenges}"), Luciano identificou 3 oportunidades estratégicas para acelerar suas conversões e automatizar atendimentos.`,
          bottlenecks: [
            {
              title: 'Atendimento Lento ou Perda de Leads',
              description: 'Visitantes que chegam ao seu site ou perfil do Instagram e não recebem resposta imediata no WhatsApp tendem a fechar negócio com concorrentes.',
              impact: 'Estimativa de até 35% de potenciais clientes perdidos sem automação no WhatsApp/Telegram.'
            },
            {
              title: 'Site / Landing Page Lenta ou Genérica',
              description: 'Páginas sem carregamento instantâneo (< 1s) ou sem chamadas de conversão diretas reduzem drasticamente o retorno do seu investimento.',
              impact: 'Baixa taxa de conversão de cliques em contatos reais.'
            },
            {
              title: 'Trabalho Manual Repetitivo de Dados',
              description: 'Digitar dados de formulários manualmente em planilhas ou enviar lembretes um a um toma horas valiosas da sua semana.',
              impact: 'Entre 15 e 25 horas semanais gastas em processos que poderiam ser 100% automatizados.'
            }
          ],
          recommendedArchitecture: [
            'Landing Page / Website de Alta Conversão: Layout moderno, responsivo, otimizado para mobile com carregamento ultrarrápido.',
            'Bot de Atendimento no WhatsApp & Telegram: Resposta instantânea, agendamentos automáticos e triagem de dúvidas 24h/dia.',
            'Integração de Webhooks & Formulários: Envio automático de contatos do site para seu Telegram ou planilha em tempo real.',
            'Design & Conteúdo Estratégico para Instagram: Carrosséis e artes profissionais para gerar autoridade e engajamento.'
          ],
          estimatedRoi: {
            hoursSavedPerMonth: 50,
            revenueBoostPercentage: '20% a 40%',
            paybackTime: 'Aproximadamente 2 a 4 semanas'
          },
          nextSteps: 'Fale direto com o Luciano no WhatsApp para ajustar a proposta e os prazos do seu projeto.'
        });
      }

      // Initialize Gemini API
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Você é o assistente virtual do Luciano, desenvolvedor especialista em Websites, Landing Pages de Alta Conversão, Automações de WhatsApp & Telegram, Integração de Sistemas/Webhooks e Design de Posts para Instagram. Ele também é o responsável pelos portais soscuidadores.com e focoemdados.com.br.

Gere um diagnóstico técnico e comercial em formato JSON estrito para o seguinte cliente:
- Nome/Empresa: ${storeName}
- Atuação / Plataforma: ${storePlatform || 'Não especificada'}
- Movimentação / Volume: ${monthlyOrders || 'Em crescimento'}
- Principais Desafios: ${currentChallenges}
- Objetivos: ${goals || 'Aumentar conversão, automatizar atendimento no WhatsApp/Telegram e profissionalizar a presença digital'}

Retorne APENAS um objeto JSON válido (sem markdown de código) com o seguinte esquema:
{
  "summary": "string - Título do diagnóstico",
  "executiveSummary": "string - Resumo executivo objetivo focado em resultados, automação e presença digital",
  "bottlenecks": [
    { "title": "string", "description": "string", "impact": "string" }
  ],
  "recommendedArchitecture": [
    "string - Solução prática (ex: Landing Page de Alta Conversão, Bot WhatsApp/Telegram, Automação de Formulário, Artes para Instagram)"
  ],
  "estimatedRoi": {
    "hoursSavedPerMonth": 40,
    "revenueBoostPercentage": "20% a 35%",
    "paybackTime": "2 a 4 semanas"
  },
  "nextSteps": "string - Chamada direta para conversar com o Luciano no WhatsApp"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json({ source: 'gemini_ai', ...parsed });
      } catch (e) {
        return res.json({
          source: 'gemini_raw',
          summary: `Diagnóstico para ${storeName}`,
          executiveSummary: text,
          bottlenecks: [],
          recommendedArchitecture: [],
          estimatedRoi: { hoursSavedPerMonth: 40, revenueBoostPercentage: '20%', paybackTime: '1 mês' },
          nextSteps: 'Entre em contato via WhatsApp para alinhamento.'
        });
      }
    } catch (err: any) {
      console.error('Diagnostic API error:', err);
      res.status(500).json({ error: 'Erro ao gerar diagnóstico técnico. Tente novamente ou chame no WhatsApp.' });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Douglas Felix App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
