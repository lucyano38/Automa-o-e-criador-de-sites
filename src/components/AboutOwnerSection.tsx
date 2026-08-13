import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  MessageSquare, 
  Instagram, 
  ArrowRight,
  Linkedin,
  BarChart3,
  ExternalLink,
  Zap
} from 'lucide-react';

interface AboutOwnerSectionProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const AboutOwnerSection: React.FC<AboutOwnerSectionProps> = ({ onOpenWhatsAppWithMessage }) => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#121414] relative min-h-[85vh]">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-500/40 text-amber-400 text-xs font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Titular e Desenvolvedor do Projeto</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Conheça <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Luciano Tavares Silva</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Desenvolvedor de Software, Especialista em Automações de Atendimento e Titular de Portais Relevantes.
          </p>
        </motion.div>

        {/* Content Layout: Photos + Biography & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Photos Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4"
          >
            
            {/* Wheelchair Workout Photo (Primary) */}
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl bg-white/5 backdrop-blur-md group p-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950">
                <img 
                  src="/src/assets/images/luciano_wheelchair_superman_1786639407347.jpg" 
                  alt="Luciano Tavares Silva em seu treino com cadeira de rodas"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0e1010]/90 border border-amber-500/30 text-xs text-amber-300 font-mono flex items-center justify-between">
                  <span>♿ Dev Tetraplégico & Superação</span>
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    Titular do Site
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Portrait Photo (Secondary) + Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-md bg-white/5 backdrop-blur-md group p-1.5">
                <div className="relative rounded-xl overflow-hidden h-36 bg-slate-950">
                  <img 
                    src="/src/assets/images/luciano_enhanced_profile_1786639208752.jpg" 
                    alt="Luciano Tavares Silva Portrait"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-[10px] text-amber-400 font-mono font-bold">
                    Luciano Tavares
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Compromisso</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Foco total em entregas no prazo, clareza no atendimento e código sem enrolação.
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/luciano-tavares41"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-400 hover:underline"
                >
                  <Linkedin className="w-3 h-3 fill-blue-400" />
                  <span>Perfil no LinkedIn ➜</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Narrative & Clear Business Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                História de Superação & Foco
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                "Não existem limites quando há foco, disciplina e a tecnologia certa."
              </h3>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Sou uma pessoa <strong>tetraplégica</strong> e o titular responsável por este site e por todos os projetos aqui apresentados. A minha condição física nunca foi um obstáculo — pelo contrário, ela desenvolveu em mim uma disciplina de ferro, atenção meticulosa aos detalhes e uma capacidade única de resolução de problemas.
              </p>
              <p>
                Trabalho diariamente desenvolvendo soluções digitais de alto impacto para empresas, profissionais autônomos e empreendedores. Tudo é feito de forma transparente, direta e focada em gerar resultados financeiros para o seu negócio.
              </p>
            </div>

            {/* Managed Portals Credentials Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 space-y-2 backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Portais Oficiais Sob Minha Liderança:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a 
                  href="https://soscuidadores.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#0e1010] border border-amber-500/20 hover:border-amber-400 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-amber-300">soscuidadores.com</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a 
                  href="https://focoemdados.com.br" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#0e1010] border border-purple-500/20 hover:border-purple-400 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-purple-300">focoemdados.com.br</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Clear Commitments */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                O que você pode esperar ao contratar o Luciano:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Comunicação Direta:</strong> Atendimento via WhatsApp direto com o titular.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Websites Rápidos:</strong> Foco em converter visitantes em clientes pagantes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Automação 24h:</strong> Robôs de WhatsApp que trabalham enquanto você descansa.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Transparência Total:</strong> Prazos cumpridos e suporte dedicado.</span>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Vi sua história como titular e gostaria de solicitar um orçamento para meu projeto.')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Conversar Diretamente com Luciano no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

