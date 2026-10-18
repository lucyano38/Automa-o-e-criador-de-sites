import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

const SUGGESTIONS = [
  'Quero um orçamento',
  'Preciso de uma automação',
  'Como funciona o painel?',
  'Quero editar vídeos com IA'
];

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [quickText, setQuickText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isError, setIsError] = useState(false);

  // Typewriter effect for placeholder
  React.useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentString = SUGGESTIONS[currentIndex % SUGGESTIONS.length];
      
      if (isDeleting) {
        setPlaceholder(currentString.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholder(currentString.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 30 : 100;

      if (!isDeleting && charIndex === currentString.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex++;
        typeSpeed = 500;
      }

      timeout = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  const handleSendQuick = (text: string) => {
    if (text.trim().length < 5) {
      setIsError(true);
      setTimeout(() => setIsError(false), 300);
      return;
    }

    const msg = text.trim()
      ? `Olá Luciano! ${text}`
      : 'Olá Luciano! Vi seu site e gostaria de conversar sobre um projeto de website, automação ou Instagram.';
    onOpenWhatsAppWithMessage(msg);
    setOpenDrawer(false);
    setQuickText('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuick(quickText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick Greeting Popover Drawer */}
      {openDrawer && (
        <div className="mb-3 w-80 sm:w-96 glass-card rounded-2xl p-5 border border-emerald-500/40 shadow-2xl animate-fade-in text-left space-y-4">
          <div className="flex items-start justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                L
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Luciano</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="text-[10px] text-slate-400">Online · Resposta rápida no WhatsApp</div>
              </div>
            </div>
            <button
              onClick={() => setOpenDrawer(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            👋 Olá! Precisa de um website, automação no WhatsApp/Telegram ou artes para Instagram? Como posso te ajudar hoje?
          </div>

          {/* Sugestões Rápidas */}
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSendQuick(suggestion)}
                className="px-3 py-1.5 rounded-full bg-slate-800 text-[10px] text-slate-300 hover:bg-emerald-900/50 hover:text-emerald-300 transition-colors border border-slate-700 hover:border-emerald-500/50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-2">
            <textarea
              id="floating-whatsapp-textarea"
              rows={3}
              placeholder={placeholder}
              value={quickText}
              onChange={(e) => {
                setQuickText(e.target.value);
                if (isError) setIsError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendQuick(quickText);
                }
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-slate-100 placeholder-slate-500 text-xs focus:outline-none resize-none leading-relaxed transition-colors ${
                isError ? 'border-red-500 animate-shake' : 'border-slate-800 focus:border-emerald-500'
              }`}
            />
            <button
              id="floating-whatsapp-submit-btn"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
              <span>Enviar no WhatsApp</span>
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpenDrawer(!openDrawer)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
        aria-label="Abrir WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
        
        {openDrawer ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <MessageSquare className="w-6 h-6 fill-slate-950 stroke-[1.5]" />
        )}
      </button>

    </div>
  );
};
