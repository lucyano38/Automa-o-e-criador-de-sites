import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Globe,
  Sparkles,
  Linkedin,
  Phone
} from 'lucide-react';

interface ContactSectionProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: 'Website / Landing Page',
    budget: 'R$ 1.000 ~ R$ 3.000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá Luciano! Meu nome é *${formData.name}* (${formData.contact}).\n\nInteresse: *${formData.projectType}*\nOrçamento Estimado: *${formData.budget}*\n\nDetalhes do Projeto:\n"${formData.message}"`;
    onOpenWhatsAppWithMessage(msg);
    setSubmitted(true);
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      id="contato" 
      className="py-20 bg-slate-950 relative border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Atendimento Direto com Luciano</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vamos Tirar Seu Projeto do Papel?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Entre em contato para desenvolver um novo website, criar automações de WhatsApp/Telegram ou produzir posts profissionais para o Instagram do seu negócio.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Contact Info (Left - 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Disponível para Novos Projetos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Converse diretamente com <strong>Luciano Tavares Silva</strong>. Atendimento personalizado para entender e implementar seu projeto com agilidade.
              </p>

              <div className="space-y-3 pt-2">
                {/* WhatsApp Direct */}
                <button
                  onClick={() => onOpenWhatsAppWithMessage('Olá Luciano! Vi seu site e gostaria de conversar sobre um projeto.')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/50 transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <MessageSquare className="w-5 h-5 fill-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300">WhatsApp Direto</div>
                      <div className="text-xs text-emerald-400 font-mono font-bold">(11) 99441-1307</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* LinkedIn Profile */}
                <a
                  href="https://www.linkedin.com/in/luciano-tavares41"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-blue-950/50 border border-slate-800 hover:border-blue-500/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      <Linkedin className="w-5 h-5 fill-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-300">LinkedIn Profissional</div>
                      <div className="text-xs text-blue-400 font-mono">/in/luciano-tavares41</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email Profissional */}
                <a
                  href="mailto:atendimento@focoemdados.com.br"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300">E-mail Profissional</div>
                      <div className="text-xs text-cyan-400 font-mono font-bold">atendimento@focoemdados.com.br</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email Suporte */}
                <a
                  href="mailto:lucyano.pci@gmail.com"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">E-mail de Suporte</div>
                      <div className="text-xs text-amber-300 font-mono">lucyano.pci@gmail.com</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Telefone Adicional */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Telefone de Contato</div>
                    <div className="text-xs text-cyan-400 font-mono">(11) 97061-0078</div>
                  </div>
                </div>

                {/* Portais do Ecossistema */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                    Portais Oficiais:
                  </div>
                  <div className="space-y-1 text-xs text-slate-300 font-mono">
                    <div className="flex items-center justify-between">
                      <span>• focoemdados.com.br</span>
                      <a href="https://focoemdados.com.br" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Principal</a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• soscuidadores.com</span>
                      <a href="https://soscuidadores.com" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Visitar</a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Atendimento Nacional</div>
                    <div className="text-xs text-slate-400">Brasil (Projetos Remotos)</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Message Form (Right - 7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
            
            <h3 className="text-xl font-bold text-white mb-6">
              Enviar Detalhes da Sua Demanda
            </h3>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Mensagem Enviada via WhatsApp!</h4>
                <p className="text-xs text-slate-300">
                  Seu aplicativo de WhatsApp foi aberto com os dados preenchidos. O Luciano responderá em instantes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-400 underline font-mono cursor-pointer"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      Seu Nome <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      WhatsApp ou E-mail <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: (11) 99876-5432"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      Tipo de Serviço
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="Website / Landing Page">Website / Landing Page</option>
                      <option value="Postagens & Gestão Instagram e Facebook">Postagens & Gestão Instagram e Facebook</option>
                      <option value="Edição Profissional de Vídeo & Reels">Edição Profissional de Vídeo & Reels</option>
                      <option value="Automação WhatsApp / Telegram">Automação WhatsApp / Telegram</option>
                      <option value="Análise de Dados & BI">Análise de Dados & BI</option>
                      <option value="Projeto Completo (Web + Redes + Automação)">Projeto Completo (Web + Redes + Automação)</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      Orçamento Estimado
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="Abaixo de R$ 1.500">Abaixo de R$ 1.500</option>
                      <option value="R$ 1.500 ~ R$ 3.500">R$ 1.500 ~ R$ 3.500</option>
                      <option value="R$ 3.500 ~ R$ 7.000">R$ 3.500 ~ R$ 7.000</option>
                      <option value="Acima de R$ 7.000">Acima de R$ 7.000</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold block">
                    Resumo do Projeto
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte brevemente o que precisa..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Enviar para Luciano no WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </motion.section>
  );
};
