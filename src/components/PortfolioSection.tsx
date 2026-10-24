import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolio';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { ProjectCarousel } from './ProjectCarousel';
import { FolderGit2, ArrowUpRight, Sparkles, ExternalLink, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface PortfolioSectionProps {
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenWhatsAppWithMessage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'both' | 'carousel' | 'grid'>('both');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'platform', label: 'Portais Sob Meu Comando' },
    { id: 'website', label: 'Websites & Landing Pages' },
    { id: 'automation', label: 'Automações WhatsApp / Telegram' },
    { id: 'social', label: 'Posts & Instagram' },
    { id: 'data', label: 'Análise de Dados & BI' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      id="portfolio" 
      className="py-16 md:py-24 bg-[#121414] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-amber-500/30 text-amber-400 text-xs font-mono shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Portfólio & Portais Oficiais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Casos Reais de Sucesso &{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Resultados Práticos
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Navegue pelos principais trabalhos desenvolvidos por Luciano, com detalhes de tecnologia usada, métricas de resultado e link de demonstração ao vivo.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10"
        >
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[#0e1010] p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'both' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Destaques + Grade</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'carousel' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Apenas Carrossel</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Apenas Grade</span>
            </button>
          </div>
        </motion.div>

        {(viewMode === 'both' || viewMode === 'carousel') && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <ProjectCarousel
              projects={filteredProjects}
              onSelectProject={(project) => setSelectedProject(project)}
              onOpenWhatsAppWithMessage={onOpenWhatsAppWithMessage}
            />
          </motion.div>
        )}

        {(viewMode === 'both' || viewMode === 'grid') && (
          <div className="space-y-6 pt-4">
            {viewMode === 'both' && (
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-amber-400" />
                  <span>Todos os Projetos na Categoria</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">{filteredProjects.length} projeto(s)</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 h-[400px]">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-5 space-y-4">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                    className="rounded-2xl overflow-hidden flex flex-col justify-between group bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/50 transition-all shadow-xl"
                  >
                    <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1010] via-slate-950/40 to-transparent"></div>
                      
                      <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#0e1010]/90 text-amber-400 border border-amber-500/40 backdrop-blur-sm">
                        {project.platform}
                      </span>

                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[11px] font-mono text-amber-300 font-semibold block">{project.client}</span>
                        <h3 className="text-sm font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#0e1010] border border-white/10 text-center">
                        {project.metrics.map((m, idx) => (
                          <div key={idx}>
                            <div className="text-xs font-bold font-mono text-amber-400">{m.value}</div>
                            <div className="text-[9px] text-slate-400 truncate">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-mono text-amber-400/90 font-semibold block">
                          Tecnologia Usada:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0e1010] text-slate-300 border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 space-y-2">
                        {project.projectUrl ? (
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-400">Link de Demonstração:</span>
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 hover:underline"
                            >
                              <span>Demonstração Ao Vivo</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ) : (
                          <div className="text-[10px] font-mono text-slate-500 italic">
                            Link de demonstração sob consulta
                          </div>
                        )}

                        <div className="pt-1 flex items-center gap-2">
                          {project.projectUrl && (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 transition-all cursor-pointer"
                              title="Acessar demonstração ao vivo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0e1010] hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-white/10 hover:border-amber-400 transition-all cursor-pointer"
                          >
                            <span>Ver Case & Detalhes</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
      
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenWhatsAppWithMessage={onOpenWhatsAppWithMessage}
      />
    </motion.section>
  );
};
