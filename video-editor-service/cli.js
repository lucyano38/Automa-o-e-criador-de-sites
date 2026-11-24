'use strict';

const fs = require('fs');
const path = require('path');
const { renderJob, probe } = require('./render');
const { detectSilenceAndGetCuts } = require('./auto-cut');

const arg = process.argv[2];

if (!arg || arg === '--help' || arg === '-h') {
  console.log(`
Uso do Editor de Vídeo para Instagram:

1. Renderizar um job:
   node cli.js job.json

2. Detectar silêncios em um vídeo (Jump Cut):
   node cli.js --detect-silence caminho/do/video.mp4

3. Gerar um modelo de job para Instagram:
   node cli.js --example
  `);
  process.exit(0);
}

if (arg === '--example') {
  const example = {
    input: "storage/uploads/seu_video.mp4",
    output: {
      file: "storage/outputs/video-instagram.mp4",
      preset: "instagram_reels",
      fit: "blur"
    },
    autoCut: {
      silence: true,
      noiseDb: -30,
      minDuration: 0.4
    },
    topicBanners: {
      enabled: true,
      language: 'pt',
      username: '@seu.perfil',
      position: 'top',
      hook: true,
      highlights: true,
      cta: true,
      lowerThird: false,
      quotes: true,
      dividers: false,
      maxHighlights: 4,
      maxQuotes: 2
    },
    captions: {
      enabled: true,
      fontSize: 64,
      color: '#FFFFFF',
      marginV: 120
    },
    effects: {
      zoom: true,
      zoomMax: 1.06,
      color: true,
      grade: 'cinematic',
      audioNormalize: true,
      sharpen: true,
      vignette: true,
      cinemaBar: true
    },
    progressBar: {
      enabled: true,
      position: "bottom",
      color: "#fcb045"
    },
    professionalBanner: {
      title: "COMO EDITAR VÍDEOS RÁPIDO",
      subtitle: "Dica que ninguém te conta!",
      username: "@seu.perfil",
      theme: "instagram_gradient",
      position: "top"
    }
  };

  const outPath = 'job-instagram-exemplo.json';
  fs.writeFileSync(outPath, JSON.stringify(example, null, 2), 'utf8');
  console.log('Modelo gerado em: ' + outPath);
  process.exit(0);
}

if (arg === '--detect-silence') {
  const videoFile = process.argv[3];
  if (!videoFile) {
    console.error('Especifique o arquivo de vídeo: node cli.js --detect-silence video.mp4');
    process.exit(1);
  }

  probe(videoFile)
    .then(info => {
      console.log(`Analisando áudio do vídeo (${info.duration.toFixed(1)}s)...`);
      return detectSilenceAndGetCuts(videoFile, info.duration);
    })
    .then(res => {
      console.log(`\nSilêncios removidos: ${res.removedCount} pausas (${res.removedSeconds}s eliminados)`);
      console.log(`Cortes de fala ativa: ${res.cuts.length} trechos gerados:`);
      console.dir(res.cuts, { depth: null });
    })
    .catch(err => {
      console.error('Erro na detecção de silêncio:', err.message);
      process.exit(1);
    });
  return;
}

// Execução padrão via arquivo JSON
const spec = JSON.parse(fs.readFileSync(arg, 'utf8'));
const paths = {
  input: spec.input,
  banners: (spec.banners || []).map(b => b.file),
  output: (spec.output && spec.output.file) || 'saida-instagram.mp4'
};

renderJob(spec, paths, p => process.stdout.write('\rProgresso da Renderização: ' + p + '%'))
  .then(r => console.log('\n✅ Pronto: ' + paths.output + ' (' + r.duration.toFixed(1) + 's total, ' + (r.cutsCount || 1) + ' trechos)'))
  .catch(e => { console.error('\n❌ Erro: ' + e.message); process.exit(1); });
