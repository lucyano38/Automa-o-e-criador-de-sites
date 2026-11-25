import React, { useCallback, useEffect, useState } from 'react';
import {
  Video, AudioLines, TrendingUp, Radar, ArrowRight, Check, LockKeyhole,
  Sun, Moon, Globe2, CreditCard, RefreshCw, ExternalLink, Scissors,
  Captions, WandSparkles, Sparkles, AlertCircle, CheckCircle2, Zap
} from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
import { BrowserEditor } from './BrowserEditor';

type Lang = 'pt' | 'en' | 'es';
type Theme = 'dark' | 'light';

interface Access { active: boolean; used: number; remaining: number; limit: number; isOwner: boolean }

const EDITOR_URL = import.meta.env.VITE_VIDEO_EDITOR_URL || 'http://localhost:3001';
const OWNER_EMAIL = 'lucyano.pci@gmail.com';

const I18N: Record<Lang, Record<string, string>> = {
  pt: {
    badge: 'ESTÚDIO DE CRIADORES', title: 'Tudo que você precisa para criar. Em um só lugar.',
    subtitle: 'Cortes inteligentes, legendas e banners por assunto em um fluxo simples. R$ 29,90/mês, até 5 vídeos.',
    start: 'Começar agora', sign: 'Assinar por R$ 29,90/mês', modules: 'Ferramentas', modulesSub: 'Os módulos que transformam seu conteúdo.',
    active: 'DISPONÍVEL', soon: 'EM BREVE', how: 'Como funciona', how1: 'Envie seu vídeo', how1d: 'Upload direto pelo navegador, sem instalar nada.',
    how2: 'Escolha os efeitos', how2d: 'Cortes, legendas, banners por assunto e acabamento.', how3: 'Baixe e publique', how3d: 'MP4 vertical pronto para Reels, Shorts e feed.',
    stats: 'resultados que importam', pricing: 'Plano simples, sem surpresas', priceNote: 'Cobrança mensal · cancele quando quiser',
    included: 'Incluído no plano', checkout: 'Abrir pagamento', yourStudio: 'Seu estúdio', remaining: 'vídeos restantes este mês',
    openEditor: 'Abrir editor em nova aba', serverDown: 'O servidor do Editor Pro ainda não está publicado. Avise o administrador.',
    faq: 'Perguntas frequentes', footer: 'Feito para quem produz conteúdo todos os dias.'
  },
  en: {
    badge: 'CREATOR STUDIO', title: 'Everything you need to create. In one place.',
    subtitle: 'Smart cuts, captions and topic banners in one simple flow. $29.90/month, up to 5 videos.',
    start: 'Get started', sign: 'Subscribe for $29.90/month', modules: 'Tools', modulesSub: 'The modules that transform your content.',
    active: 'AVAILABLE', soon: 'COMING SOON', how: 'How it works', how1: 'Upload your video', how1d: 'Direct browser upload, nothing to install.',
    how2: 'Pick your effects', how2d: 'Cuts, captions, topic banners and finishing.', how3: 'Download and publish', how3d: 'Vertical MP4 ready for Reels, Shorts and feed.',
    stats: 'results that matter', pricing: 'Simple pricing, no surprises', priceNote: 'Monthly billing · cancel anytime',
    included: 'Included in the plan', checkout: 'Open checkout', yourStudio: 'Your studio', remaining: 'videos left this month',
    openEditor: 'Open editor in new tab', serverDown: 'The Editor Pro server is not published yet. Contact the administrator.',
    faq: 'Frequently asked questions', footer: 'Built for people who create every day.'
  },
  es: {
    badge: 'ESTUDIO DE CREADORES', title: 'Todo lo que necesitas para crear. En un solo lugar.',
    subtitle: 'Cortes inteligentes, subtítulos y banners por tema en un flujo simple. R$ 29,90/mes, hasta 5 vídeos.',
    start: 'Empezar ahora', sign: 'Suscribirme por R$ 29,90/mes', modules: 'Herramientas', modulesSub: 'Los módulos que transforman tu contenido.',
    active: 'DISPONIBLE', soon: 'PRÓXIMAMENTE', how: 'Cómo funciona', how1: 'Sube tu vídeo', how1d: 'Subida directa desde el navegador, sin instalar nada.',
    how2: 'Elige los efectos', how2d: 'Cortes, subtítulos, banners por tema y acabado.', how3: 'Descarga y publica', how3d: 'MP4 vertical listo para Reels, Shorts y feed.',
    stats: 'resultados que importan', pricing: 'Precio simple, sin sorpresas', priceNote: 'Cobro mensual · cancela cuando quieras',
    included: 'Incluido en el plan', checkout: 'Abrir pago', yourStudio: 'Tu estudio', remaining: 'vídeos restantes este mes',
    openEditor: 'Abrir editor en otra pestaña', serverDown: 'El servidor del Editor Pro aún no está publicado. Avisa al administrador.',
    faq: 'Preguntas frecuentes', footer: 'Hecho para quien crea contenido todos los días.'
  }
};

const MODULES = [
  { key: 'clips', icon: Scissors, active: true },
  { key: 'audio', icon: AudioLines, active: false },
  { key: 'trend', icon: TrendingUp, active: false },
  { key: 'outlier', icon: Radar, active: false }
];
const MODULE_TEXT: Record<string, Record<Lang, { name: string; desc: string }>> = {
  clips: { pt: { name: 'Clips AI', desc: '1 vídeo longo, infinitos clipes. Cortes, legendas e formato vertical.' }, en: { name: 'Clips AI', desc: '1 long video, endless clips. Cuts, captions and vertical format.' }, es: { name: 'Clips AI', desc: '1 vídeo largo, infinitos clips. Cortes, subtítulos y formato vertical.' } },
  audio: { pt: { name: 'Audio Lab', desc: 'Narrações com vozes de IA em vários idiomas.' }, en: { name: 'Audio Lab', desc: 'AI voiceovers in multiple languages.' }, es: { name: 'Audio Lab', desc: 'Narraciones con voces IA en varios idiomas.' } },
  trend: { pt: { name: 'Trend Scanner', desc: 'Descubra temas emergentes antes da concorrência.' }, en: { name: 'Trend Scanner', desc: 'Spot emerging topics before your competitors.' }, es: { name: 'Trend Scanner', desc: 'Descubre temas emergentes antes que la competencia.' } },
  outlier: { pt: { name: 'Outlier Monitor', desc: 'Veja o que está bombando no seu nicho.' }, en: { name: 'Outlier Monitor', desc: 'See what is breaking out in your niche.' }, es: { name: 'Outlier Monitor', desc: 'Mira lo que está explotando en tu nicho.' } }
};

export const CreatorStudio: React.FC = () => {
  const { user, loading } = useFirebase();
  const [lang, setLang] = useState<Lang>('pt');
  const [theme, setTheme] = useState<Theme>('dark');
  const [access, setAccess] = useState<Access | null>(null);
  const [checking, setChecking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const t = I18N[lang];
  const cx = (dark: string, light: string) => (theme === 'dark' ? dark : light);

  const loadAccess = useCallback(async () => {
    if (!user) return;
    setChecking(true);
    setNotice(null);
    try {
      const idToken = await user.getIdToken();
      setToken(idToken);
      const res = await fetch('/api/editor-pro/access', { headers: { Authorization: `Bearer ${idToken}` } });
      if (!res.ok) throw new Error(t.serverDown);
      setAccess(await res.json());
    } catch (err: any) {
      setNotice(err?.message || t.serverDown);
      setAccess(null);
    } finally {
      setChecking(false);
    }
  }, [user, t.serverDown]);

  useEffect(() => { if (!loading && user) loadAccess(); }, [loading, user, loadAccess]);

  const handleCheckout = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/create-editor-pro-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerEmail: user.email || '', customerName: user.displayName || user.email || '', userId: user.uid })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setNotice(data.message || t.serverDown);
    } catch (err: any) {
      setNotice(err?.message || t.serverDown);
    }
  };

  const hero = cx('from-[#0b1016] via-[#111827] to-[#0b1016]', 'from-white via-slate-50 to-white');
  const card = cx('bg-[#11161d] border-white/10', 'bg-white border-slate-200 shadow-sm');
  const text = cx('text-white', 'text-slate-900');
  const muted = cx('text-slate-400', 'text-slate-600');

  return (
    <div className={`space-y-16 pb-20 ${cx('text-slate-100', 'text-slate-900')}`}>
      <div className={`relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br ${hero} p-6 sm:p-10`}>
        <div className="absolute -top-24 -right-16 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">{t.badge}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Tema" className={`p-2 rounded-lg border ${cx('border-white/10 bg-white/5 text-slate-300', 'border-slate-200 bg-slate-100 text-slate-700')} cursor-pointer`}>
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className={`flex items-center gap-1 rounded-lg border px-2 py-1 ${cx('border-white/10 bg-white/5', 'border-slate-200 bg-slate-100')}`}>
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              {(['pt', 'en', 'es'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-mono font-bold uppercase px-1.5 cursor-pointer ${lang === l ? 'text-cyan-300' : muted}`}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mt-10 max-w-3xl space-y-5">
          <h1 className={`text-3xl sm:text-5xl font-black leading-tight tracking-tight ${text}`}>
            {t.title.split(' ').slice(0, 4).join(' ')} <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">{t.title.split(' ').slice(4).join(' ')}</span>
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${muted}`}>{t.subtitle}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#studio" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider cursor-pointer">
              {t.start} <ArrowRight className="w-4 h-4" />
            </a>
            <span className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-mono ${cx('border-white/10 text-slate-300', 'border-slate-200 text-slate-700')}`}><Check className="w-4 h-4 text-emerald-400" /> R$ 29,90 / mês</span>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-6 space-y-1">
          <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${text}`}>{t.modules}</h2>
          <p className={`text-xs ${muted}`}>{t.modulesSub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map(m => {
            const Icon = m.icon;
            const info = MODULE_TEXT[m.key][lang];
            return (
              <div key={m.key} className={`relative p-5 rounded-2xl border space-y-3 ${card} ${m.active ? 'border-cyan-400/40' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.active ? 'bg-cyan-400/15 text-cyan-300' : cx('bg-white/5 text-slate-500', 'bg-slate-100 text-slate-400')}`}><Icon className="w-5 h-5" /></div>
                <div className={`font-extrabold text-sm ${text}`}>{info.name}</div>
                <p className={`text-[11px] leading-relaxed ${muted}`}>{info.desc}</p>
                <span className={`inline-block text-[9px] font-mono font-bold tracking-wider px-2 py-1 rounded-full ${m.active ? 'bg-emerald-500/15 text-emerald-300' : cx('bg-white/5 text-slate-500', 'bg-slate-100 text-slate-500')}`}>{m.active ? t.active : t.soon}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight mb-6 ${text}`}>{t.how}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[[Video, t.how1, t.how1d], [WandSparkles, t.how2, t.how2d], [Sparkles, t.how3, t.how3d]].map(([Icon, title, desc], i) => {
            const I = Icon as React.ComponentType<{ className?: string }>;
            return (
              <div key={i} className={`p-5 rounded-2xl border space-y-2 ${card}`}>
                <div className="text-[10px] font-mono text-cyan-400 font-bold">PASSO 0{i + 1}</div>
                <I className="w-6 h-6 text-emerald-400" />
                <div className={`font-bold text-sm ${text}`}>{title as string}</div>
                <p className={`text-[11px] ${muted}`}>{desc as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="studio" className="scroll-mt-6">
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${card}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className={`text-xl font-black uppercase tracking-tight ${text}`}>{t.yourStudio}</h2>
              <p className={`text-xs mt-1 ${muted}`}>{t.priceNote}</p>
            </div>
            {access && (
              <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${cx('border-emerald-400/30 bg-emerald-500/10', 'border-emerald-300 bg-emerald-50')}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono"><strong className="text-cyan-300">{access.remaining}</strong>/{access.limit} {t.remaining}</span>
              </div>
            )}
          </div>

          {notice && (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{notice}</span>
            </div>
          )}

          <BrowserEditor />

          <div className={`border-t pt-5 ${cx('border-white/10', 'border-slate-200')}`}>
          {checking ? (
            <div className={`p-10 text-center text-xs font-mono ${muted}`}>...</div>
          ) : !access?.active ? (
            <div className="flex flex-wrap gap-3">
              <button onClick={handleCheckout} disabled={!user} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs font-mono uppercase cursor-pointer disabled:opacity-50">
                <CreditCard className="w-4 h-4" /> {t.sign}
              </button>
              <button onClick={loadAccess} disabled={!user} className={`px-5 py-3 rounded-xl border text-xs font-mono cursor-pointer disabled:opacity-50 ${cx('border-white/10 text-slate-300', 'border-slate-200 text-slate-700')}`}>
                <RefreshCw className="w-4 h-4 inline mr-2" /> {t.checkout}
              </button>
              {!user && <span className={`text-xs self-center ${muted}`}><LockKeyhole className="w-3 h-3 inline mr-1" /> Google</span>}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-end">
                <a href={`${EDITOR_URL}/?token=${encodeURIComponent(token || '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300 hover:text-white">
                  {t.openEditor} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0b0f14]">
                <iframe src={`${EDITOR_URL}/?token=${encodeURIComponent(token || '')}`} title="Editor Pro" className="w-full border-0" style={{ minHeight: 760 }} allow="autoplay; fullscreen; microphone" />
              </div>
            </div>
          )}
          </div>
        </div>
      </section>

      <section>
        <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight mb-4 ${text}`}>{t.pricing}</h2>
        <div className={`max-w-md p-6 rounded-3xl border-2 border-cyan-400/40 ${card}`}>
          <div className="flex items-baseline gap-2"><Zap className="w-5 h-5 text-amber-400" /><span className={`text-3xl font-black ${text}`}>R$ 29,90</span><span className={`text-xs ${muted}`}>/ mês</span></div>
          <ul className={`mt-4 space-y-2 text-xs ${muted}`}>
            {['5 vídeos por mês', 'Cortes automáticos de silêncio', 'Legendas e banners por assunto', 'Efeitos e imagens da internet'].map(x => (
              <li key={x} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> {x}</li>
            ))}
          </ul>
          <button onClick={handleCheckout} disabled={!user && access?.active !== true} className="mt-6 w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs font-mono uppercase cursor-pointer disabled:opacity-50">{t.checkout}</button>
          <p className={`mt-2 text-[10px] text-center ${muted}`}>{t.priceNote}</p>
        </div>
      </section>

      <section>
        <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight mb-4 ${text}`}>{t.faq}</h2>
        <div className={`rounded-2xl border divide-y ${cx('border-white/10 divide-white/10', 'border-slate-200 divide-slate-200')} ${card}`}>
          {[
            ['Preciso saber editar?', 'Não. O editor faz cortes, legendas e banners automaticamente.'],
            ['Funciona no celular?', 'Sim, pelo navegador, sem instalar programa.'],
            ['Posso cancelar?', 'Sim, quando quiser, sem fidelidade.'],
            ['Qual o limite?', 'Até 5 vídeos por mês no plano de R$ 29,90.']
          ].map(([q, a]) => (
            <details key={q} className="p-4">
              <summary className={`cursor-pointer text-xs font-bold ${text}`}>{q}</summary>
              <p className={`mt-2 text-[11px] ${muted}`}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className={`text-center text-[10px] font-mono ${muted}`}>{t.footer} · {lang.toUpperCase()} · {OWNER_EMAIL}</p>
    </div>
  );
};
