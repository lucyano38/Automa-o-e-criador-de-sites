'use strict';

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function getFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const winget = path.join(
      process.env.LOCALAPPDATA || '',
      'Microsoft', 'WinGet', 'Packages',
      'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe',
      'ffmpeg-9.1-full_build', 'bin', 'ffmpeg.exe'
    );
    if (fs.existsSync(winget)) return winget;
  } catch (_) {}
  return 'ffmpeg';
}

function detectSilenceAndGetCuts(inputPath, totalDuration, opts = {}) {
  const noiseDb = typeof opts.noiseDb === 'number' ? opts.noiseDb : -30;
  const minDuration = typeof opts.minDuration === 'number' ? opts.minDuration : 0.4;
  const padding = typeof opts.padding === 'number' ? opts.padding : 0.08;
  const FFMPEG = getFfmpeg();

  return new Promise((resolve, reject) => {
    const args = [
      '-hide_banner',
      '-vn',
      '-i', inputPath,
      '-af', `silencedetect=noise=${noiseDb}dB:d=${minDuration}`,
      '-f', 'null',
      '-'
    ];

    const proc = spawn(FFMPEG, args);
    let output = '';

    proc.stderr.on('data', chunk => {
      output += chunk.toString();
    });

    proc.on('error', err => {
      reject(new Error('Erro ao executar detecção de silêncio: ' + err.message));
    });

    proc.on('close', code => {
      if (code !== 0 && !output.includes('silence_start')) {
        return reject(new Error('Detecção de silêncio falhou com código ' + code));
      }

      const silences = [];
      let currentStart = null;

      const regex = /silence_(start|end):\s*([0-9.]+)/g;
      let match;

      while ((match = regex.exec(output)) !== null) {
        const type = match[1];
        const time = parseFloat(match[2]);

        if (type === 'start') {
          currentStart = time;
        } else if (type === 'end' && currentStart !== null) {
          silences.push({ start: currentStart, end: time });
          currentStart = null;
        }
      }

      if (currentStart !== null && currentStart < totalDuration) {
        silences.push({ start: currentStart, end: totalDuration });
      }

      if (silences.length === 0) {
        return resolve({
          cuts: [{ start: 0, end: totalDuration }],
          removedSeconds: 0,
          removedCount: 0
        });
      }

      const speechCuts = [];
      let lastEnd = 0;
      let removedSeconds = 0;

      for (const sil of silences) {
        const segEnd = Math.max(0, sil.start - padding);
        const segStart = Math.min(totalDuration, sil.end + padding);

        if (segEnd > lastEnd) {
          speechCuts.push({
            start: Number(lastEnd.toFixed(3)),
            end: Number(segEnd.toFixed(3))
          });
        }

        removedSeconds += Math.max(0, sil.end - sil.start);
        lastEnd = Math.max(lastEnd, segStart);
      }

      if (lastEnd < totalDuration) {
        speechCuts.push({
          start: Number(lastEnd.toFixed(3)),
          end: Number(totalDuration.toFixed(3))
        });
      }

      const cleanCuts = speechCuts.filter(c => (c.end - c.start) >= 0.2);

      resolve({
        cuts: cleanCuts.length > 0 ? cleanCuts : [{ start: 0, end: totalDuration }],
        removedSeconds: Number(removedSeconds.toFixed(2)),
        removedCount: silences.length
      });
    });
  });
}

function splitForInstagram(totalDuration, mode = 'reels_60') {
  let partSeconds = 60;
  if (typeof mode === 'number') {
    partSeconds = Math.max(5, mode);
  } else if (mode === 'stories_15') {
    partSeconds = 15;
  } else if (mode === 'reels_90') {
    partSeconds = 90;
  } else if (mode === 'feed_60') {
    partSeconds = 60;
  }

  const parts = [];
  let currentStart = 0;
  let partNumber = 1;

  while (currentStart < totalDuration) {
    const currentEnd = Math.min(totalDuration, currentStart + partSeconds);
    parts.push({
      part: partNumber,
      start: Number(currentStart.toFixed(2)),
      end: Number(currentEnd.toFixed(2)),
      duration: Number((currentEnd - currentStart).toFixed(2)),
      label: `Parte ${partNumber} (${Math.round(currentEnd - currentStart)}s)`
    });

    currentStart = currentEnd;
    partNumber++;
  }

  return parts;
}

module.exports = {
  detectSilenceAndGetCuts,
  splitForInstagram,
  getFfmpeg
};
