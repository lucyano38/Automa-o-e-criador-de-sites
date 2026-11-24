# Editor de Vídeo Profissional para Instagram

Editor de vídeo automatizado com foco em **Instagram Reels, Stories e Feed**. Sem nenhuma dependência npm externa: construído 100% com **Node.js puro + FFmpeg**.

---

## 🚀 Novas Funcionalidades Adicionadas

### 1. ✂️ Cortes Automáticos (Jump Cut Dinâmico)
- **Remoção Automática de Silêncios:** Detecta pausas e momentos de hesitação via análise de decibéis do áudio (`silencedetect`), recortando o vídeo apenas nos momentos de fala ativa.
- **Divisão Inteligente:** Suporte a divisão automática de vídeos longos em partes ideais para Reels (60s / 90s) ou Stories (15s).

### 2. 🎨 Banners Profissionais de Alto Impacto
- **Headlines e Chamadas de Ação:** Título chamativo + subtítulo estilizados diretamente no vídeo.
- **Identificação de Perfil:** Badge com ícone oficial do Instagram e seu `@perfil`.
- **Zonas de Segurança (Safe Zones):** O banner é posicionado automaticamente fora das áreas cobertas pela interface do Instagram (foto de perfil, botões de curtir/comentar e descrição).
- **Temas Visuais:**
  - `instagram_gradient` (Gradiente Oficial Instagram)
  - `dark_neon` (Estilo Dark / Tech)
  - `gold_luxury` (Preto & Dourado Premium)
  - `youtube_punch` (Amarelo & Preto de Alta Conversão)
  - `clean_white` (Minimalista Moderno)

### 3. ⏱️ Barra de Progresso de Retenção
- Adiciona uma barra animada no rodapé que acompanha o tempo do vídeo de 0% a 100%, comprovadamente aumentando a retenção de espectadores no Instagram.

### 4. 📐 Presets Otimizados para Instagram
- `instagram_reels`: 1080x1920 (9:16 vertical)
- `instagram_feed_portrait`: 1080x1350 (4:5 retrato - maior área de tela no feed)
- `instagram_feed_square`: 1080x1080 (1:1 quadrado)

### 5. 🧠 Banners por Assunto e Destaques (Transcrição IA)
- O áudio é transcrito com o filtro **Whisper** do FFmpeg (`transcribe.js`).
- Os trechos são agrupados em tópicos (`segmentTopics`) e um plano de banners é criado em `smart-banners.js`:
  - **Gancho** nos primeiros 3s;
  - **Um banner por assunto** falado, no intervalo exato do tópico;
  - **Destaques** quando a fala contém números, perguntas, dicas, avisos ou passos (até 4 por padrão);
  - **Chamada final** para salvar/compartilhar nos últimos 4s;
  - **Lower-third** opcional com o `@perfil` no início;
  - **Frases de impacto** (citações curtas ditas no vídeo) e **cartões de divisão** entre assuntos (opcionais).
- Cada banner usa um tema visual diferente e os tempos são remapeados após os cortes de silêncio.
- Configuração: `topicBanners: { enabled, language, username, position, hook, highlights, cta, lowerThird, maxHighlights, gapThreshold, maxTopicSeconds }`.
- Modelo padrão: `models/ggml-small.bin` (português). Para trocar, defina `model` no job ou `WHISPER_MODEL`.

### 5.2 🖼️ Imagens da internet
- URLs informadas manualmente e/ou busca automática de imagens relacionadas aos assuntos pela API pública da Wikipédia (`image-sources.js`, sem chave).
- Cada imagem entra como camada de banner no intervalo do tópico (ou em fatias equalitárias para URLs manuais).
- Configuração: `webImages: { enabled, auto, urls, position, widthPct, maxImages }`.
- Se o vídeo já tiver legenda queimada, use `captions: { enabled: false }` (opção «O vídeo já tem legenda» na interface) para não gerar uma segunda legenda.

### 5.1 📝 Legendas profissionais
- A mesma transcrição gera um arquivo **ASS** com `PlayResX/PlayResY` explícitos, evitando que o libass amplify a fonte em vídeos 1080x1920.
- Legendas queimadas com contorno e sombra, sincronizadas após os cortes.
- Configuração: `captions: { enabled: true, fontSize: 64, color: '#FFFFFF', marginV: 120 }`.

### 6. ✨ Efeitos Profissionais
- **Zoom cinematográfico lento** (`zoompan`) com limite configurável.
- **Correção de cor**: contraste, saturação e brilho (`eq`).
- **Nitidez** suave (`unsharp`) e **vignette** (`vignette`).
- **Barras cinematográficas** (topo e rodapé).
- **Normalização de áudio** (loudnorm) com fade suave no início e fim.
- **Tonalidades**: `natural`, `cinematic`, `vibrant`, `vintage`, `bw` (preto e branco).
- Configuração: `effects: { zoom, zoomMax, color, grade, audioNormalize, contrast, saturation, sharpen, vignette, cinemaBar }`.
- Desative tudo com `effects: { enabled: false }`.

---

## 💻 Como Usar

### Pela Interface Web (Recomendado)
1. Inicie o servidor:
   ```bash
   npm start
   ```
2. Abra seu navegador em:
   ```
   http://localhost:3000
   ```
3. Arraste seu vídeo, escolha o formato do Instagram, digite o título do banner e clique em **Gerar Vídeo para Instagram 🚀**.

### Pela Linha de Comando (CLI)
1. Gerar um arquivo de exemplo configurado para Instagram:
   ```bash
   node cli.js --example
   ```
2. Testar detecção de silêncio em um vídeo:
   ```bash
   node cli.js --detect-silence seu_video.mp4
   ```
3. Renderizar um job:
   ```bash
   node cli.js job-instagram-exemplo.json
   ```

---

## ⚙️ Requisitos
- Node.js >= 18 (`node -v`)
- FFmpeg instalado no PATH (`ffmpeg -version`)
  - No Windows, instale via: `winget install Gyan.FFmpeg`
- Modelo Whisper em `models/ggml-small.bin` (já incluído) para banners inteligentes
  - Outros modelos: https://huggingface.co/ggerganov/whisper.cpp/tree/main
  - `ggml-tiny.bin` é mais rápido e menos preciso; `ggml-small.bin` é o padrão
- Windows com PowerShell para geração dos banners PNG (fallback via FFmpeg se indisponível)
