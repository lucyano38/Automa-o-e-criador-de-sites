import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useFirebase, OWNER_EMAIL } from '../contexts/FirebaseContext';

interface LoginPageProps {
  onSuccessRedirect: () => void;
  onGoHome: () => void;
  redirectReason?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onSuccessRedirect, 
  onGoHome,
  redirectReason 
}) => {
  const { signInWithGoogle, loginAsOwnerDirect, authError, clearAuthError } = useFirebase();
  const [emailInput, setEmailInput] = useState<string>(OWNER_EMAIL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessSuccess, setAccessSuccess] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    clearAuthError();
    const success = await signInWithGoogle();
    setIsLoading(false);
    if (success) {
      setAccessSuccess(true);
      setTimeout(() => {
        onSuccessRedirect();
      }, 700);
    }
  };

  const handleDirectOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearAuthError();
    const success = loginAsOwnerDirect(emailInput);
    setIsLoading(false);
    if (success) {
      setAccessSuccess(true);
      setTimeout(() => {
        onSuccessRedirect();
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-[#090b0d] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-slate-100 font-sans">
      
      {/* Ambient Cyber Neon Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

      <div className="relative w-full max-w-md rounded-3xl bg-[#111417]/95 border border-cyan-500/30 p-8 space-y-6 shadow-2xl backdrop-blur-xl">
        
        {/* Top Back to Home Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site Público</span>
          </button>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            RESTRICTED AREA
          </span>
        </div>

        {/* Security Lock Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
              Autenticação de Acesso
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Ecossistema Interno · Foco em Dados
            </p>
          </div>
        </div>

        {/* Redirect Notice if redirected from a private route */}
        {redirectReason && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Área Restrita:</strong> {redirectReason}
            </div>
          </div>
        )}

        {/* Success Alert */}
        {accessSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Autenticação confirmada! Redirecionando para o ecossistema...</span>
          </div>
        )}

        {/* Error Alert */}
        {authError && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{authError}</div>
          </div>
        )}

        {/* Login Method 1: Google Sign In */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading || accessSuccess}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-white text-slate-950 hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-lg shadow-white/10 hover:scale-102 cursor-pointer font-sans uppercase tracking-wider"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Entrar com Conta Google</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
            <div className="h-px bg-white/10 flex-1"></div>
            <span>OU ACESSO DIRETO</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
        </div>

        {/* Login Method 2: Direct Owner Email */}
        <form onSubmit={handleDirectOwnerLogin} className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>E-mail do Titular:</span>
              <span className="text-cyan-400 font-bold">Autorizado</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="lucyano.pci@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || accessSuccess}
            className="w-full py-3.5 px-4 rounded-xl font-black text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-102 cursor-pointer font-sans uppercase tracking-wider"
          >
            <KeyRound className="w-4 h-4 fill-slate-950" />
            <span>Acessar Ecossistema</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="pt-2 border-t border-white/10 text-center space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Acesso protegido para Luciano Tavares Silva</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            E-mails de suporte: atendimento@focoemdados.com.br · {OWNER_EMAIL}
          </div>
        </div>

      </div>

    </div>
  );
};
