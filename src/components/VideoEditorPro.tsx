import React, { useCallback, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  Video,
  Sparkles,
  Scissors,
  WandSparkles,
  LockKeyhole,
  LogIn,
  CreditCard,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { auth, useFirebase } from '../contexts/FirebaseContext';

interface EditorAccess {
  active: boolean;
  plan: string;
  limit: number;
  used: number;
  remaining: number;
  isOwner: boolean;
}

const PRICE_LABEL = 'R$ 29,90 / mês';
const EDITOR_URL = import.meta.env.VITE_VIDEO_EDITOR_URL || 'http://localhost:3001';

/**
 * Aba aditiva do Editor Pro. Nao substitui o AutoVideoEditor (demonstracao).
 * Acesso: usuario autenticado + assinatura ativa; limite de 5 videos/mes.
 */
export const VideoEditorPro: React.FC = () => {
  const { user, loading } = useFirebase();
  const [access, setAccess] = useState<EditorAccess | null>(null);
  const [checking, setChecking] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loadAccess = useCallback(async () => {
    if (!user) return;
    setChecking(true);
    setAuthError(null);
    try {
      const idToken = await user.getIdToken();
      setToken(idToken);
      const res = await fetch('/api/editor-pro/access', {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Nao foi possivel consultar sua assinatura.');
      setAccess(data);
    } catch (err: any) {
      setAuthError(err?.message || 'Erro ao consultar acesso.');
      setAccess(null);
    } finally {
      setChecking(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && user) loadAccess();
  }, [loading, user, loadAccess]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('checkout_status');
    if (status === 'success') {
      setNotice('Assinatura confirmada! Atualizando seu acesso ao Editor Pro...');
      window.history.replaceState({}, '', '/editor-pro');
      setTimeout(() => loadAccess(), 1500);
    } else if (status === 'cancelled') {
      setNotice('Checkout cancelado. Nenhuma cobranca foi feita.');
      window.history.replaceState({}, '', '/editor-pro');
    }
  }, [loadAccess]);

  const handleCustomerSignIn = async () => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setAuthError(err?.message || 'Falha ao entrar com Google.');
    }
  };

  const handleCheckout = async () => {
    if (!user) return;
    setCheckoutLoading(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/create-editor-pro-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: user.email || '',
          customerName: user.displayName || user.email || '',
          userId: user.uid
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao iniciar o checkout.');
      if (data.url) {
        window.location.href = data.url;
      } else {
        setNotice('Ambiente de pagamento ainda nao configurado. ' + (data.message || ''));
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Falha ao iniciar o checkout.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading || checking) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#141719] p-10 text-center">
        <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-xs font-mono text-cyan-300 uppercase tracking-widest">Verificando acesso...</p>
      </div>
    );
  }

  // 1) Sem login: botao de entrada (nao usa o login de titular).
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 p-8 text-center space-y-5">
        <LockKeyhole className="w-10 h-10 text-cyan-400 mx-auto" />
        <h2 className="text-2xl font-black text-white uppercase">Editor Pro</h2>
        <p className="text-slate-300 text-sm">
          Entre com sua conta Google para acessar a edição automática de vídeos: cortes de silêncio,
          banners por assunto e efeitos profissionais.
        </p>
        {authError && <p className="text-red-300 text-xs font-mono">{authError}</p>}
        <button
          onClick={handleCustomerSignIn}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-400/20"
        >
          <LogIn className="w-4 h-4" />
          Entrar com Google
        </button>
      </div>
    );
  }

  // 2) Logado sem assinatura: plano de R$ 29,90.
  if (!access?.active) {
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        {notice && (
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
            {notice}
          </div>
        )}
        <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 p-8 space-y-6">
          <div className="text-center space-y-2">
            <Video className="w-10 h-10 text-cyan-400 mx-auto" />
            <h2 className="text-2xl font-black text-white uppercase">Editor Pro — {PRICE_LABEL}</h2>
            <p className="text-slate-300 text-sm">
              Edite até <strong className="text-cyan-300">5 vídeos por mês</strong> com IA:
              cortes automáticos de silêncio, banners que acompanham cada assunto falado e efeitos de acabamento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Scissors, title: 'Cortes IA', desc: 'Remove silêncios e pausas' },
              { icon: WandSparkles, title: 'Banners por assunto', desc: 'Transcrição e tópicos automáticos' },
              { icon: Sparkles, title: 'Efeitos Pro', desc: 'Zoom, cor, nitidez e vignette' }
            ].map((f) => (
              <div key={f.title} className="p-4 rounded-2xl bg-[#0c0e0f] border border-white/10 space-y-1">
                <f.icon className="w-5 h-5 text-emerald-400" />
                <div className="text-xs font-bold text-white uppercase">{f.title}</div>
                <div className="text-[10px] text-slate-400">{f.desc}</div>
              </div>
            ))}
          </div>

          {authError && (
            <div className="flex items-center gap-2 text-red-300 text-xs font-mono">
              <AlertCircle className="w-4 h-4" /> {authError}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="flex-1 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20 disabled:opacity-50"
            >
              {checkoutLoading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Abrindo pagamento...</>
              ) : (
                <><CreditCard className="w-4 h-4" /> Assinar por {PRICE_LABEL}</>
              )}
            </button>
            <button
              onClick={loadAccess}
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono font-bold cursor-pointer"
            >
              Já assinei — verificar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3) Assinatura ativa: mostra o editor real com o token na URL.
  const editorSrc = `${EDITOR_URL}/?token=${encodeURIComponent(token || '')}`;
  return (
    <div className="space-y-5">
      {notice && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#141719] border border-white/10">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-white uppercase">
            {access.isOwner ? 'Acesso do titular' : 'Editor Pro ativo'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-300">
            <strong className="text-cyan-300">{access.remaining}</strong> de {access.limit} vídeos restantes este mês
          </span>
          <div className="w-28 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              style={{ width: `${Math.round((access.used / access.limit) * 100)}%` }}
            />
          </div>
          <button
            onClick={loadAccess}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
            title="Atualizar cota"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0c0e0f]">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
          <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
            Estúdio de edição automática
          </span>
          <a
            href={editorSrc}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white"
          >
            Abrir em nova aba <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <iframe
          src={editorSrc}
          title="Editor Pro de Vídeos"
          className="w-full border-0"
          style={{ minHeight: 900 }}
          allow="autoplay; fullscreen; microphone"
        />
      </div>
    </div>
  );
};
