import React, { useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Upload, Play, Download, Loader2, Scissors, Captions, Palette, CheckCircle2, AlertCircle } from 'lucide-react';

type Preset = 'reels' | 'square' | 'horizontal';
type Fit = 'crop' | 'pad';

const PRESETS: Record<Preset, { w: number; h: number; label: string }> = {
  reels: { w: 1080, h: 1920, label: 'Reels / Stories 9:16' },
  square: { w: 1080, h: 1080, label: 'Feed quadrado 1:1' },
  horizontal: { w: 1920, h: 1080, label: 'Horizontal 16:9' }
};

const GRADES: Record<string, string> = {
  natural: '',
  cinematic: 'eq=contrast=1.12:saturation=0.88',
  vibrant: 'eq=contrast=1.08:saturation=1.35',
  vintage: 'eq=contrast=0.92:saturation=0.75,colorbalance=rs=0.05:bs=-0.05',
  bw: 'hue=s=0:eq=contrast=1.1'
};

function makeBanner(title: string, subtitle: string, width: number, height: number): string | null {
  if (!title && !subtitle) return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const g = ctx.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, '#7c3aed');
  g.addColorStop(0.5, '#e11d48');
  g.addColorStop(1, '#f59e0b');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  if (title) {
    ctx.font = '900 78px Arial, sans-serif';
    ctx.fillText(title.toUpperCase(), width / 2, subtitle ? 100 : 130, width - 80);
  }
  if (subtitle) {
    ctx.fillStyle = '#fef08a';
    ctx.font = '700 46px Arial, sans-serif';
    ctx.fillText(subtitle, width / 2, 180, width - 80);
  }
  return canvas.toDataURL('image/png');
}

export const BrowserEditor: React.FC = () => {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [preset, setPreset] = useState<Preset>('reels');
  const [fit, setFit] = useState<Fit>('crop');
  const [grade, setGrade] = useState('cinematic');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const load = async () => {
    if (loaded) return true;
    setBusy(true);
    setMessage('Carregando motor de edição (≈32 MB, só na primeira vez)...');
    try {
      const ffmpeg = new FFmpeg();
      ffmpeg.on('progress', ({ progress: p }) => setProgress(Math.round(p * 100)));
      const coreURL = await toBlobURL('https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js', 'text/javascript');
      const wasmURL = await toBlobURL('https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm', 'application/wasm');
      await ffmpeg.load({ coreURL, wasmURL });
      ffmpegRef.current = ffmpeg;
      setLoaded(true);
      setMessage(null);
      return true;
    } catch (err: any) {
      setMessage('Não foi possível carregar o motor: ' + (err?.message || err));
      return false;
    } finally {
      setBusy(false);
    }
  };

  const render = async () => {
    if (!file) return;
    if (!(await load())) return;
    const ffmpeg = ffmpegRef.current!;
    setBusy(true);
    setProgress(0);
    setOutput(null);
    setMessage('Renderizando...');
    try {
      const ext = (file.name.split('.').pop() || 'mp4').toLowerCase();
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));

      const { w, h } = PRESETS[preset];
      const filters: string[] = [];
      if (fit === 'crop') {
        filters.push(`scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}`);
      } else {
        filters.push(`scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:black`);
      }
      if (GRADES[grade]) filters.push(GRADES[grade]);
      const banner = makeBanner(title, subtitle, w, 220);
      if (banner) {
        await ffmpeg.writeFile('banner.png', await fetchFile(banner));
        filters.push('overlay=(W-w)/2:40');
      }
      filters.push('fps=30');

      const args: string[] = [];
      if (start > 0) args.push('-ss', String(start));
      args.push('-i', `input.${ext}`);
      if (end > start) args.push('-t', String(end - start));
      args.push('-vf', filters.join(','));
      args.push('-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p');
      args.push('-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', 'output.mp4');

      try { await ffmpeg.deleteFile('output.mp4'); } catch { /* primeira renderizacao */ }
      await ffmpeg.exec(args);
      const data = await ffmpeg.readFile('output.mp4');
      const blob = new Blob([data as any], { type: 'video/mp4' });
      setOutput(URL.createObjectURL(blob));
      setMessage('Vídeo pronto!');
    } catch (err: any) {
      setMessage('Falha na renderização: ' + (err?.message || err));
    } finally {
      setBusy(false);
    }
  };

  const field = 'w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400';
  const label = 'block text-[10px] font-mono text-slate-400 uppercase mb-1';

  return (
    <div className="p-5 rounded-2xl border border-cyan-400/20 bg-[#0c1117] space-y-5">
      <div className="flex items-center gap-2">
        <Scissors className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">Editor rápido no navegador</span>
        <span className="ml-auto text-[9px] font-mono text-slate-500">sem servidor · arquivos ficam no seu aparelho</span>
      </div>

      <div className="border-2 border-dashed border-white/15 rounded-xl p-5 text-center">
        <input type="file" accept="video/*" id="be-file" className="hidden" onChange={e => { setFile(e.target.files?.[0] || null); setOutput(null); }} />
        <label htmlFor="be-file" className="cursor-pointer inline-flex items-center gap-2 text-xs font-mono text-cyan-300">
          <Upload className="w-4 h-4" /> {file ? file.name : 'Escolher vídeo (mp4, mov, webm)'}
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label className={label}>Formato</label><select className={field} value={preset} onChange={e => setPreset(e.target.value as Preset)}>{Object.entries(PRESETS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
        <div><label className={label}>Enquadramento</label><select className={field} value={fit} onChange={e => setFit(e.target.value as Fit)}><option value="crop">Preencher (crop)</option><option value="pad">Barras pretas</option></select></div>
        <div><label className={label}>Cor</label><select className={field} value={grade} onChange={e => setGrade(e.target.value)}>{Object.keys(GRADES).map(k => <option key={k} value={k}>{k}</option>)}</select></div>
        <div><label className={label}>Início (s)</label><input className={field} type="number" min="0" value={start} onChange={e => setStart(Number(e.target.value) || 0)} /></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div><label className={label}>Fim (s · 0 = até o fim)</label><input className={field} type="number" min="0" value={end} onChange={e => setEnd(Number(e.target.value) || 0)} /></div>
        <div><label className={label}>Título do banner</label><input className={field} value={title} onChange={e => setTitle(e.target.value)} placeholder="SEU TÍTULO" /></div>
        <div><label className={label}>Subtítulo</label><input className={field} value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Assista até o final" /></div>
      </div>

      <button onClick={render} disabled={!file || busy} className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs font-mono uppercase cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> {progress ? `${progress}%` : 'Carregando...'}</> : <><Play className="w-4 h-4" /> Gerar vídeo</>}
      </button>

      {message && <div className={`flex items-center gap-2 text-[11px] font-mono ${output ? 'text-emerald-300' : 'text-amber-300'}`}>{output ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />} {message}</div>}

      {output && (
        <div className="space-y-2">
          <video src={output} controls className="w-full max-h-[420px] rounded-xl bg-black" />
          <a href={output} download="video-editado.mp4" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs cursor-pointer"><Download className="w-4 h-4" /> Baixar MP4</a>
        </div>
      )}
      <p className="text-[9px] text-slate-500 font-mono">Dica: vídeos curtos (até ~30 s) renderizam mais rápido. Nada é enviado para a internet.</p>
    </div>
  );
};
