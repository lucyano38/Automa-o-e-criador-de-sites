import React from 'react';
import { Project } from '../types';
import { X, CheckCircle2, ArrowRight, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenWhatsAppWithMessage }) => {
  if (!project) return null;

  const handleRequestSimilar = () => {
    const msg = `Olá Luciano! Vi o case de sucesso *"${project.title}"* (${project.client}) no seu portfólio. Gostaria de um orçamento para um projeto com escopo semelhante no meu negócio!`;
    onOpenWhatsAppWithMessage(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-8 glass-card rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {project.platform}
              </span>
              <span className="text-xs font-mono text-slate-300">Cliente: {project.client}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">{m.value}</div>
                <div className="text-[11px] text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution Breakdown */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold mb-1">
                O Desafio Inicial:
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.fullCaseStudy.challenge}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold mb-1">
                A Solução Desenvolvida:
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.fullCaseStudy.solution}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">
                Resultados Medidos:
              </h4>
              <div className="space-y-2">
                {project.fullCaseStudy.results.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stack Tags */}
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-2">Tecnologias Utilizadas:</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Quer resultados semelhantes na sua operação?
            </span>
            <button
              onClick={handleRequestSimilar}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Solicitar Projeto Semelhante</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
