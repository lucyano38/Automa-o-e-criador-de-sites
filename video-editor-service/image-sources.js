'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const UA = 'Mozilla/5.0 (compatible; FocoEmDadosVideoEditor/1.0)';

function extFromContentType(ct, url) {
  const c = String(ct || '').toLowerCase();
  if (c.includes('png')) return '.png';
  if (c.includes('webp')) return '.webp';
  if (c.includes('jpeg') || c.includes('jpg')) return '.jpg';
  if (c.includes('gif')) return '.gif';
  const m = String(url).match(/\.(png|jpe?g|webp|gif)(?:\?|$)/i);
  return m ? '.' + m[1].toLowerCase().replace('jpeg', 'jpg') : '.jpg';
}

async function downloadToFile(url, outDir) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'image/*,*/*' },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000)
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('image/') && !/\.(png|jpe?g|webp|gif)/i.test(url)) {
    throw new Error('A URL nao aponta para uma imagem');
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) throw new Error('Imagem muito pequena');
  const name = `webimg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}${extFromContentType(ct, url)}`;
  const out = path.join(outDir, name);
  fs.writeFileSync(out, buf);
  return out;
}

/**
 * Busca uma imagem relacionada ao termo na Wikipédia (API publica, sem chave).
 * Retorna o caminho local ou null se nao encontrar.
 */
async function searchWikipediaImage(query, outDir) {
  const q = String(query || '').trim().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').slice(0, 80);
  if (q.length < 3) return null;
  const api = 'https://pt.wikipedia.org/w/api.php?'
    + new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: q,
      gsrlimit: '3',
      prop: 'pageimages',
      pithumbsize: '900',
      format: 'json',
      origin: '*'
    });

  const res = await fetch(api, {
    headers: { 'User-Agent': UA },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000)
  });
  if (!res.ok) throw new Error('Busca HTTP ' + res.status);
  const data = await res.json();
  const pages = Object.values((data.query && data.query.pages) || {});
  const withThumb = pages
    .map(p => p.thumbnail && p.thumbnail.source)
    .filter(Boolean);
  if (!withThumb.length) return null;
  return await downloadToFile(withThumb[0], outDir);
}

module.exports = { downloadToFile, searchWikipediaImage };
