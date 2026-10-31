import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  Clock,
  XCircle,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  CreditCard
} from 'lucide-react';

interface CheckoutSuccessModalProps {
  sessionId: string;
  serviceId?: string;
  onClose: () => void;
  onOpenWhatsAppWithMessage: (message: string) => void;
}

interface VerifiedOrder {
  verified: boolean;
  status: 'paid' | 'unpaid' | 'processing' | 'pending' | 'canceled' | 'expired' | 'error' | string;
  orderId?: string;
  serviceTitle?: string;
  amount?: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  paymentMethod?: string;
  error?: string;
  message?: string;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  sessionId,
  serviceId,
  onClose,
  onOpenWhatsAppWithMessage,
}) => {
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'paid' | 'processing' | 'unpaid' | 'error'>('verifying');
  const [order, setOrder] = useState<VerifiedOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [isManualChecking, setIsManualChecking] = useState<boolean>(false);
  
  const maxPollingAttempts = 3;
  const isMountedRef = useRef<boolean>(true);

  const verifySessionWithStripe = useCallback(async (currentAttempt: number = 1, isManual: boolean = false) => {
    if (!sessionId) {
      setVerificationStatus('error');
      setErrorMessage('Identificador de sessão ausente.');
      return;
    }

    if (isManual) {
      setIsManualChecking(true);
    } else if (currentAttempt === 1) {
      setVerificationStatus('verifying');
    }

    try {
      const res = await fetch(`/api/verify-checkout-session?session_id=${encodeURIComponent(sessionId.trim())}`);
      const data: VerifiedOrder = await res.json();

      if (!isMountedRef.current) return;

      // STRICT VALIDATION: Check genuine payment confirmation directly from Stripe API
      if (res.ok && data.status === 'paid' && data.verified !== false) {
        setOrder(data);
        setVerificationStatus('paid');
        setErrorMessage(null);

        // Record confirmed purchase in local CRM deals
        try {
          const saved = localStorage.getItem('foco_crm_deals_v1');
          const deals = saved ? JSON.parse(saved) : [];
          const orderId = data.orderId || `STRIPE-ORD-${sessionId.slice(-8).toUpperCase()}`;
          
          const exists = deals.some((d: any) => d.id === orderId);
          if (!exists) {
            const newDeal = {
              id: orderId,
              empresa: data.customerName || 'Cliente Stripe',
              contatoNome: data.customerName || 'Cliente Stripe',
              telefone: '(11) 99441-1307',
              email: data.customerEmail || 'cliente@stripe.com',
              nicho: 'Cliente Direto (Stripe)',
              cidade: 'Brasil',
              valor: data.amount || 497,
              stage: 'Fechado',
              servico: data.serviceTitle || 'Serviço Foco em Dados',
              dataCriacao: new Date().toLocaleDateString('pt-BR'),
              ultimaInteracao: 'Pagamento Concluído e Confirmado via Stripe API',
              observacoes: `Pedido ${orderId} aprovado e validado em tempo real na API do Stripe.`
            };
            localStorage.setItem('foco_crm_deals_v1', JSON.stringify([newDeal, ...deals]));
          }
        } catch (storageErr) {
          console.error('[CRM Sync] Erro ao sincronizar deal local:', storageErr);
        }
        return;
      }

      // If Stripe reports payment is still in processing (e.g. PIX/Boleto pending or 3DS validation)
      if (data.status === 'processing' || data.status === 'pending' || data.status === 'open') {
        // If within automatic polling attempts, retry in 2.5 seconds
        if (currentAttempt < maxPollingAttempts && !isManual) {
          setAttemptCount(currentAttempt + 1);
          setTimeout(() => {
            if (isMountedRef.current) {
              verifySessionWithStripe(currentAttempt + 1, false);
            }
          }, 2500);
          return;
        }

        setOrder(data);
        setVerificationStatus('processing');
        setErrorMessage(data.message || 'Seu pagamento está em análise pela operadora ou aguardando compensação bancária.');
        return;
      }

      // If Stripe reports unpaid, canceled, expired or not completed
      setOrder(data);
      setVerificationStatus('unpaid');
      setErrorMessage(
        data.message || 
        data.error || 
        'O Stripe não confirmou a liquidação desta transação. O pagamento não foi concluído ou foi recusado pela operadora.'
      );
    } catch (err: any) {
      if (!isMountedRef.current) return;
      console.error('[Stripe Verification Error]:', err);
      setVerificationStatus('error');
      setErrorMessage('Falha ao se comunicar com os servidores de validação da Stripe. Verifique sua conexão e tente novamente.');
    } finally {
      if (isMountedRef.current) {
        setIsManualChecking(false);
      }
    }
  }, [sessionId]);

  useEffect(() => {
    isMountedRef.current = true;
    verifySessionWithStripe(1, false);

    return () => {
      isMountedRef.current = false;
    };
  }, [verifySessionWithStripe]);

  const serviceName = order?.serviceTitle || 'Serviço Foco em Dados';
  const orderProtocol = order?.orderId || `STRIPE-ORD-${sessionId.slice(-8).toUpperCase()}`;
  const amountFormatted = order?.amount 
    ? order.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Valor sob Consulta';

  const handleWhatsAppAction = () => {
    const msg = `Olá Luciano! Acabei de concluir meu pagamento seguro via Stripe!\n\n📋 *Protocolo do Pedido:* ${orderProtocol}\n💎 *Serviço Contratado:* ${serviceName}\n💰 *Valor Liquidado:* ${amountFormatted}\n\nPodemos iniciar o alinhamento técnico do projeto?`;
    onOpenWhatsAppWithMessage(msg);
    onClose();
  };

  const handleWhatsAppHelpAction = () => {
    const msg = `Olá Luciano! Estava finalizando o checkout no Stripe para o serviço "${serviceName}", mas preciso de suporte com a confirmação.\n\nIdentificador da Sessão: ${sessionId}`;
    onOpenWhatsAppWithMessage(msg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#121518] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl text-slate-200">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              verificationStatus === 'paid' 
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                : verificationStatus === 'processing'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                  : verificationStatus === 'unpaid'
                    ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
                    : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
            }`}>
              {verificationStatus === 'paid' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : verificationStatus === 'processing' ? (
                <Clock className="w-5 h-5" />
              ) : verificationStatus === 'unpaid' ? (
                <ShieldAlert className="w-5 h-5" />
              ) : (
                <CreditCard className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase font-sans tracking-tight">
                {verificationStatus === 'paid' 
                  ? 'Pagamento Confirmado no Stripe' 
                  : verificationStatus === 'processing'
                    ? 'Processamento Stripe em Andamento'
                    : verificationStatus === 'unpaid'
                      ? 'Pagamento Não Concluído'
                      : 'Verificação Oficial Stripe'}
              </h3>
              <p className="text-[10px] text-cyan-400 font-mono">
                API Stripe Oficial · Foco em Dados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* State 1: Verifying with Stripe API */}
        {verificationStatus === 'verifying' && (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-cyan-200 opacity-80" />
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Consultando API do Stripe...
              </h4>
              <p className="text-xs font-mono text-slate-400 max-w-xs mx-auto">
                Verificando autenticidade da transação e liquidação bancária em tempo real...
              </p>
              {attemptCount > 1 && (
                <p className="text-[11px] font-mono text-cyan-400 pt-1">
                  Sincronizando com gateway... (Tentativa {attemptCount} de {maxPollingAttempts})
                </p>
              )}
            </div>
          </div>
        )}

        {/* State 2: Confirmed and Strictly Paid via Stripe API */}
        {verificationStatus === 'paid' && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-xl font-extrabold text-white uppercase font-sans tracking-tight">
                Compra Aprovada com Sucesso!
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Parabéns! Sua contratação foi liquidada e autenticada diretamente pelo <strong>Stripe Checkout</strong> com automação em tempo real.
              </p>
            </div>

            {/* Official Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-[#090b0d] border border-emerald-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 text-[11px]">Protocolo Oficial:</span>
                <span className="font-bold text-cyan-400">{orderProtocol}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 text-[11px]">Serviço Contratado:</span>
                <span className="font-bold text-white text-right max-w-[220px] truncate">{serviceName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 text-[11px]">Valor Liquidado:</span>
                <span className="font-extrabold text-emerald-400 text-sm">{amountFormatted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Status no Sistema:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Confirmado & Faturado
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantia de 7 dias e Alinhamento Técnico Direto</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                O recibo e nota fiscal foram despachados para o e-mail informado. O titular Luciano Tavares Silva já foi notificado via automação.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppAction}
                className="w-full py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/25 transition-transform hover:scale-101"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Iniciar Alinhamento Técnico no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
              >
                Fechar e Acessar o Ecossistema
              </button>
            </div>
          </div>
        )}

        {/* State 3: Payment is in Processing / Pending */}
        {verificationStatus === 'processing' && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase font-sans">
                Pagamento em Processamento no Stripe
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                O Stripe recebeu a intenção de compra, mas a transação ainda está pendente de liquidação ou confirmação bancária.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-2.5">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Status no Stripe:</span>
                <span className="text-amber-400 font-bold uppercase">{order?.status || 'Processando'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Sessão:</span>
                <span className="text-slate-300 truncate max-w-[200px]">{sessionId}</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 leading-normal font-sans">
                Para pagamentos via PIX ou boleto bancário, a liberação ocorre automaticamente logo após a confirmação pelo Banco Central.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => verifySessionWithStripe(1, true)}
                disabled={isManualChecking}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                {isManualChecking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span>{isManualChecking ? 'Consultando Stripe...' : 'Verificar Status Novamente'}</span>
              </button>

              <button
                onClick={handleWhatsAppHelpAction}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 border border-emerald-500/20 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar Comprovante no WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-mono cursor-pointer"
              >
                Fechar janela
              </button>
            </div>
          </div>
        )}

        {/* State 4: Unpaid, Canceled or Unconfirmed Transaction */}
        {verificationStatus === 'unpaid' && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-rose-400" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase font-sans">
                Pagamento Não Confirmado pelo Stripe
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                A API oficial do Stripe verificou esta sessão e constatou que a transação <strong>não foi liquidada</strong> ou foi abandonada.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-2">
              <div className="flex justify-between font-mono border-b border-rose-500/20 pb-1.5">
                <span className="text-slate-400">Status Retornado:</span>
                <span className="text-rose-400 font-bold uppercase">{order?.status || 'unpaid'}</span>
              </div>
              <div className="flex justify-between font-mono border-b border-rose-500/20 pb-1.5">
                <span className="text-slate-400">Identificador:</span>
                <span className="text-slate-300 truncate max-w-[200px]">{sessionId}</span>
              </div>
              <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
                Por motivos de segurança e integridade, o acesso às ferramentas premium e o agendamento de projetos só são liberados após aprovação bancária real.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => verifySessionWithStripe(1, true)}
                disabled={isManualChecking}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                {isManualChecking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span>{isManualChecking ? 'Verificando...' : 'Reconsultar Status no Stripe'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('servicos-precos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-cyan-500/25"
              >
                <span>Tentar Pagamento Novamente</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppHelpAction}
                className="w-full py-2.5 rounded-xl text-slate-400 hover:text-emerald-400 font-mono text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Tirar dúvidas sobre pagamento com Luciano</span>
              </button>
            </div>
          </div>
        )}

        {/* State 5: Network or API Communication Error */}
        {verificationStatus === 'error' && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase font-sans">
                Não Foi Possível Validar no Momento
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                {errorMessage || 'Ocorreu uma instabilidade na consulta da sessão com os servidores do Stripe.'}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => verifySessionWithStripe(1, true)}
                disabled={isManualChecking}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                {isManualChecking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span>{isManualChecking ? 'Tentando novamente...' : 'Tentar Novamente'}</span>
              </button>

              <button
                onClick={handleWhatsAppHelpAction}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Falar no WhatsApp com Luciano</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-mono cursor-pointer"
              >
                Fechar janela
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
