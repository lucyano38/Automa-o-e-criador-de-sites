# Integração aditiva — Editor Pro no focoemdados.com.br

Nada foi removido ou substituído. O `AutoVideoEditor.tsx` (demonstração visual) continua intacto e sem call sites, exatamente como estava.

## O que foi adicionado

| Arquivo | Mudança |
|---|---|
| `src/components/VideoEditorPro.tsx` | Novo componente da aba: login Google do assinante, consulta de assinatura, CTA de checkout, contador de 5 vídeos/mês e iframe do editor real |
| `src/App.tsx` | Nova rota `/editor-pro` com guard de usuário autenticado (não usa o guard `isOwner`, então clientes pagantes entram) |
| `src/components/Header.tsx` | Item de menu público **EDITOR PRO** que navega para `/editor-pro` |
| `src/components/PrivateNavbar.tsx` | Item **Editor Pro de Vídeos** no menu interno |
| `server.ts` | Endpoints novos `/api/create-editor-pro-checkout`, `/api/editor-pro/access`, `/api/editor-pro/consume`; webhook atualiza `editorProAccess` em `checkout.session.completed`, `customer.subscription.*`; `PORT` agora configurável |
| `.env.example` | `VITE_VIDEO_EDITOR_URL` e `SITE_API_URL` |
| `video-editor-service/` | Código validado do editor real (Node + FFmpeg), com gate de cota em `POST /jobs`, `download-model.ps1` e `.env.example` |

## Como funciona

1. O assinante entra com Google (qualquer e-mail; o login de titular continua separado).
2. `GET /api/editor-pro/access` lê `editorProAccess/{uid}` e devolve `active`, `used`, `remaining` (limite 5). O titular (`lucyano.pci@gmail.com`) tem acesso sem assinatura.
3. Sem assinatura, o botão chama `POST /api/create-editor-pro-checkout`: Stripe `mode: 'subscription'`, `unit_amount: 2990` (R$ 29,90), `recurring.interval: 'month'`.
4. O webhook grava `editorProAccess/{uid}` como `active` e zera a cota; `customer.subscription.updated/deleted` mantém status e `currentPeriodEnd`.
5. Com acesso ativo, a aba mostra o editor real em um iframe. O token de ID do Firebase vai na query string; o `public/index.html` do serviço o reenvia como header `x-foco-id-token`.
6. O serviço de edição, se `SITE_API_URL` estiver definido, chama `POST /api/editor-pro/consume` antes de enfileirar cada job. Sem `SITE_API_URL`, funciona livre (modo local).

## Configuração necessária antes de publicar

- Definir `VITE_VIDEO_EDITOR_URL` com a URL pública do serviço de edição e `SITE_API_URL` com `https://focoemdados.com.br` no Vercel.
- Definir `SITE_API_URL` no servidor de edição apontando para o focoemdados.com.br.
- O serviço de edição **não roda em Vercel serverless** (precisa de FFmpeg, sistema de arquivos e processos longos). Hospede-o em um servidor Node/VPS/Railway/Render/Fly.io e rode `download-model.ps1` uma vez (modelo ~488 MB).
- Stripe: o checkout usa `price_data` recorrente, então não exige Price ID pré-criado, mas a conta precisa ter cobrança recorrente habilitada.
- Webhook: registrar os eventos `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated` e `customer.subscription.deleted`.

## Validação feita

- `npm run lint` (tsc --noEmit): OK.
- `npm run build` (vite build + esbuild): OK — apenas avisos já existentes (chunk > 500 kB e `import.meta` no bundle CJS).
- `GET /api/editor-pro/access` sem token: 401.
- `POST /api/create-editor-pro-checkout` sem chave Stripe: `gateway_ready`, `priceInCents: 2990`.
- `node --check` no `video-editor-service/server.js`: OK.

## Banners extras e legendas (rodada posterior)
- `video-editor-service/smart-banners.js`: gera gancho inicial, banner por tópico, destaques (números, perguntas, dicas, avisos, passos), chamada final e lower-third opcional — todos com temas e posições diferentes.
- `video-editor-service/transcribe.js`: exporta `normalize`; `render.js` usa o plano de banners e grava legendas em arquivo ASS com `PlayResX/PlayResY` explícitos (evita fonte gigante em 1080x1920).
- Interface do serviço (`public/index.html`): novos checkboxes para gancho, destaques, chamada final, lower-third e legendas, com seletor de tamanho (padrão 64 px).
- Validado: 7 banners gerados no vídeo-teste, legendas legíveis, fluxo público upload 201 / job 100% / download 200 (2,6 MB).

## Melhorias de banners e efeitos (ultima rodada)
- `smart-banners.js`: frases de impacto (citações curtas), cartões de divisão entre assuntos e destaque de números/palavras-chave nas legendas ASS (cor laranja).
- `effects.js` + `render.js`: tonalidades `cinematic`, `vibrant`, `vintage` e `bw`; normalização de áudio `loudnorm` com fade de entrada e saída.
- Interface: checkboxes para frases de impacto, cartões de seção e normalização de áudio; seletor de tonalidade.
- No vídeo-teste o plano chegou a 11 banners; fluxo público validado com upload 201, job 100% e download 200 (2,6 MB).

## Imagens da internet e legenda duplicada (ultima rodada)
- `image-sources.js`: download de URLs informadas e busca automatica de imagem por assunto na API publica da Wikipédia (sem chave).
- `render.js`: imagens entram como camadas de banner (`webImages`), padrao no centro para nao colidir com os banners de destaque.
- `smart-banners.js`: eventos ASS sobrepostos foram eliminados (segmentos que colapsam apos cortes de silencio). Validado no video real: 53 eventos, 0 sobreposicoes.
- Interface: opcoes de imagens da internet e aviso «O video ja tem legenda - nao adicionar outra» (desliga as legendas do editor quando o video ja vem legendado).
- Video real re-renderizado sem a segunda legenda e com imagens: 115,7s, 38 cortes, 1080x1920, H.264 + AAC.

## Correcao de "Servidor indisponivel"
- `transcribe.js` e `banner-generator.js` usavam execucoes sincronas (`execFileSync`); durante a transcricao o Node ficava bloqueado e nao respondia ao polling do navegador.
- Ambos passaram a usar `execFile` prometido (`await`); `render.js` agora espera a geracao de cada banner.
- Teste de responsividade: durante um job com transcricao, o pior tempo de resposta de `/jobs/:id` foi 29 ms (antes, estourava o tempo limite). Job completo seguiu terminando normalmente.

## Não verificado

- Fluxo real de cobrança recorrente (depende de chave Stripe válida e webhook).
- Leitura/escrita real no Firestore (depende de credenciais de produção).
- A cota usa `set` com `merge` no Firestore, não transação atômica; em caso de cliques simultâneos pode haver divergência de até 1 vídeo.
