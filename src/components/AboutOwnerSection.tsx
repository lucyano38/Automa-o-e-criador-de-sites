import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  MessageSquare, 
  ArrowRight, 
  Linkedin, 
  BarChart3, 
  ExternalLink, 
  Zap,
  Code2,
  Terminal,
  Cpu
} from 'lucide-react';

interface AboutOwnerSectionProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const AboutOwnerSection: React.FC<AboutOwnerSectionProps> = ({ onOpenWhatsAppWithMessage }) => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      id="sobre" 
      className="py-20 md:py-28 bg-[#101214] relative border-t border-white/10"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGENHARIA & PROPÓSITO · FOCO EM DADOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            DISCIPLINA, ENGENHARIA & <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">ALTA PERFORMANCE</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Inteligência de dados, automações de atendimento 24/7 e arquiteturas digitais desenhadas para escala e conversão comercial contínua.
          </p>
        </motion.div>

        {/* Narrative & Authority Layout (Clean Tech Without Photos) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="rounded-3xl p-8 sm:p-12 bg-[#15181b] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden"
        >
          {/* Top Quote Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-emerald-500/10 to-amber-500/15 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Princípio de Trabalho & Determinação</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
              "Não existem limites quando há foco, disciplina inabalável e a tecnologia certa."
            </p>
          </div>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              O ecossistema <strong>Foco em Dados (focoemdados.com.br)</strong> é fruto de uma disciplina extrema, atenção cirúrgica aos detalhes e uma dedicação profunda à engenharia de software e análise de dados para o crescimento de negócios.
            </p>
            <p>
              Desenvolvemos websites de alta velocidade, robôs de atendimento automático 24h para WhatsApp e Telegram, gestão estratégica de conteúdo e sistemas de inteligência comercial. Tudo é conduzido com transparência total, comunicação ágil e foco absoluto em gerar retorno mensurável para cada cliente.
            </p>
          </div>

          {/* Managed Portals Card */}
          <div className="p-6 rounded-2xl bg-[#0e1011] border border-cyan-500/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Portais Oficiais do Ecossistema:</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Contato Oficial: <span className="text-white font-bold">atendimento@focoemdados.com.br</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <a 
                href="https://focoemdados.com.br" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-200 group-hover:text-purple-300">focoemdados.com.br</div>
                    <div className="text-[10px] text-slate-500">Inteligência de Dados, Prospecção & Automação B2B</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
              </a>

              <a 
                href="https://soscuidadores.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-200 group-hover:text-amber-300">soscuidadores.com</div>
                    <div className="text-[10px] text-slate-500">Portal Nacional de Cuidadores & Saúde</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
              </a>
            </div>
          </div>

          {/* Clear Commitments Checklist */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Nossos Compromissos de Engenharia & Entrega:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-200">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Comunicação e Atendimento Direto:</strong>
                  <span>Sem intermediários ou atendentes genéricos. Você fala diretamente com quem programa e implementa.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Velocidade & Performance Extrema:</strong>
                  <span>Websites com tempo de abertura inferior a 1 segundo e carregamento instantâneo.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Automações que Vendem 24h:</strong>
                  <span>Robôs de WhatsApp que qualificam leads e enviam propostas no piloto automático enquanto você dorme.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Transparência e Suporte Contínuo:</strong>
                  <span>Código limpo, seguro, entrega no prazo combinado e acompanhamento próximo.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/luciano-tavares41"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold transition-all"
              >
                <Linkedin className="w-4 h-4 fill-blue-400" />
                <span>LinkedIn Oficial</span>
              </a>
            </div>

            <button
              onClick={() => onOpenWhatsAppWithMessage('Olá! Conheci a plataforma Foco em Dados e gostaria de solicitar um orçamento para meu projeto.')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Solicitar Orçamento no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </motion.section>
  );
};
