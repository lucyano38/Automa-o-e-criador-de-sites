import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  CreditCard, 
  RefreshCw,
  CheckCircle2,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

interface IntegratedSiteChatbotProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
  onNavigateToPlans?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'ai',
    text: 'Olá! Sou o Assistente Oficial do **Foco em Dados** (focoemdados.com.br). Posso responder a qualquer dúvida técnica ou comercial sobre nossos serviços de websites, automação de WhatsApp 24h, gestão de redes sociais, preços promocionais e pagamentos integrados via Stripe. Como posso te ajudar agora?',
    time: 'Agora'
  }
];

const SUGGESTED_QUESTIONS = [
  'Quanto custa uma Landing Page ou Website?',
  'Como funciona a automação de WhatsApp 24h?',
  'Quais as formas de pagamento via Stripe?',
  'Qual a stack técnica utilizada?',
  'Qual o prazo médio de entrega?'
];

export const IntegratedSiteChatbot: React.FC<IntegratedSiteChatbotProps> = ({
  onOpenWhatsAppWithMessage,
  onNavigateToPlans
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/site-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages
            .filter(m => m.id !== 'welcome-1')
            .map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json();
      const replyText = data?.reply || (
        'O **Foco em Dados** (focoemdados.com.br) oferece soluções completas de Presença Digital e Automação B2B:\n\n' +
        '• **Landing Page de Alta Conversão**: R$ 497,00 (ou até 12x via Stripe)\n' +
        '• **Website Institucional**: R$ 790,00\n' +
        '• **Automação de WhatsApp 24h**: R$ 590,00 (taxa única de setup)\n' +
        '• **Gestão de Redes Sociais**: R$ 397,00/mês\n\n' +
        'Você pode contratar com segurança pelo Stripe ou tirar dúvidas específicas diretamente aqui no chat!'
      );

      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'O **Foco em Dados** (focoemdados.com.br) desenvolve Websites e Landing Pages ultrarrápidas, Automação de WhatsApp 24h e Gestão de Redes Sociais com preços promocionais de entrada e pagamento 100% seguro em até 12x ou PIX via **Stripe**!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format bold markdown and lists cleanly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, lIdx) => {
      // Process bold markers **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.replace(/^[\s•-]+/, '').trim() : line;

      if (isBullet) {
        return (
          <div key={lIdx} className="flex items-start gap-1.5 my-0.5 text-slate-200">
            <span className="text-cyan-400 mt-1 select-none font-bold text-xs">•</span>
            <span className="flex-1">{formattedParts}</span>
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={lIdx} className="h-1.5" />;
      }

      return (
        <p key={lIdx} className="my-0.5 leading-relaxed">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[440px] h-[580px] max-h-[85vh] rounded-3xl bg-[#0f1113]/98 border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl mb-4 animate-fade-in text-slate-100">
          
          {/* Top Bar */}
          <div className="p-4 bg-[#14171a] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-md shadow-cyan-500/20">
                  <div className="w-full h-full bg-[#0d0f10] rounded-[10px] flex items-center justify-center text-cyan-400 font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#14171a] absolute -bottom-0.5 -right-0.5 animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-white text-sm">Consultor IA Oficial</h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    GEMINI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  Foco em Dados · Responde qualquer dúvida
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenWhatsAppWithMessage('Olá! Estava no chat do Foco em Dados e gostaria de tirar uma dúvida personalizada.')}
                className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors cursor-pointer"
                title="Falar no WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Fechar Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Questions Chips */}
          <div className="px-4 py-2.5 bg-[#090b0d] border-b border-white/5 flex gap-2 overflow-x-auto scrollbar-none text-[11px] font-mono">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 whitespace-nowrap transition-all cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed shadow-md ${
                    m.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-sm'
                      : 'bg-[#181b1e] text-slate-200 border border-white/10 rounded-tl-sm'
                  }`}
                >
                  {renderFormattedText(m.text)}
                </div>
                <span className="text-[9px] font-mono text-slate-500 pt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#181b1e] border border-white/10 max-w-[80%] text-slate-400 text-xs font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Processando resposta com Gemini...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Direct Action Links within Chat */}
          <div className="px-4 py-2 bg-[#121517] border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <button
              onClick={() => {
                const el = document.getElementById('servicos-precos');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onNavigateToPlans) onNavigateToPlans();
                setIsOpen(false);
              }}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Ver Preços (Stripe)</span>
            </button>

            <button
              onClick={() => onOpenWhatsAppWithMessage('Olá! Estava navegando pelo site e gostaria de solicitar um atendimento.')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Falar no WhatsApp</span>
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0d0f10] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Pergunte qualquer dúvida técnica ou comercial..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-xs shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer uppercase tracking-wider font-sans"
        title="Assistente IA Oficial · Responde qualquer dúvida"
      >
        <div className="relative">
          <Bot className="w-5 h-5 fill-slate-950" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 border border-slate-950 absolute -top-1 -right-1 animate-ping"></span>
        </div>

        <span className="hidden sm:inline">
          {isOpen ? 'Fechar Assistente' : 'Pergunte Qualquer Coisa · IA'}
        </span>

        <Sparkles className="w-4 h-4 fill-slate-950 hidden sm:inline" />
      </button>

    </div>
  );
};
