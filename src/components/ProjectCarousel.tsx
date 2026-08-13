import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Code2, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2,
  Globe,
  MessageSquare,
  Play,
  Pause
} from 'lucide-react';

interface ProjectCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenWhatsAppWithMessage: (msg: string) => void;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  onSelectProject,
  onOpenWhatsAppWithMessage
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const featuredProjects = projects.filter(p => p.featured || true);
  const total = featuredProjects.length;

  // Auto-play timer
  useEffect(() => {
    if (!isAutoplay || total === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, total]);

  if (total === 0) return null;

  const currentProject = featuredProjects[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="relative rounded-3xl bg-white/5 border border-amber-500/30 p-4 sm:p-6 lg:p-8 backdrop-blur-md shadow-2xl my-8 overflow-hidden"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Bar inside Carousel */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Carrossel de Projetos em Destaque
          </span>
        </div>

        {/* Controls & Slide Counter */}
        <div className="flex items-center gap-3">
          {/* Slide Indicator Text */}
          <span className="text-xs font-mono text-slate-400 bg-[#0e1010] px-3 py-1 rounded-full border border-white/10">
            <span className="text-amber-400 font-bold">{currentIndex + 1}</span> / {total}
          </span>

          {/* Autoplay Toggle */}
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs flex items-center gap-1 transition-all cursor-pointer"
            title={isAutoplay ? 'Pausar rotação automática' : 'Ativar rotação automática'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {/* Nav Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-[#0e1010] hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-white/10 transition-all cursor-pointer shadow-md"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-[#0e1010] hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-white/10 transition-all cursor-pointer shadow-md"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10 transition-all duration-300">
        
        {/* Left Aspect Image Showcase */}
        <div className="lg:col-span-5 relative group">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 border border-white/10 shadow-2xl">
            <img
              src={currentProject.imageUrl}
              alt={currentProject.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1010] via-transparent to-transparent opacity-80"></div>
            
            {/* Category / Platform Badge */}
            <span className="absolute top-3 left-3 text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#0e1010]/90 text-amber-400 border border-amber-500/40 backdrop-blur-md shadow-lg">
              {currentProject.platform}
            </span>

            {/* Direct Live Link Badge if available */}
            {currentProject.projectUrl && (
              <a
                href={currentProject.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1 shadow-md"
              >
                <Globe className="w-3 h-3" />
                <span>Ao Vivo</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}

            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0e1010]/90 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] font-mono text-amber-400 font-semibold block">{currentProject.client}</span>
              <h4 className="text-sm font-bold text-white truncate">{currentProject.title}</h4>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-7 space-y-4 text-left">
          
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
              {currentProject.client}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {currentProject.title}
            </h3>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            {currentProject.description}
          </p>

          {/* Key Metrics Highlight Row */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#0e1010] border border-white/10 text-center">
            {currentProject.metrics.map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-base font-extrabold font-mono text-amber-400">{m.value}</div>
                <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Explicit Sections required: Tecnologia Usada & Link de Demonstração */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            
            {/* Tecnologia Usada */}
            <div className="p-3 rounded-xl bg-[#0e1010] border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Tecnologia Usada:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentProject.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-200 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Link de Demonstração */}
            <div className="p-3 rounded-xl bg-[#0e1010] border border-emerald-500/20 space-y-2 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span>Link de Demonstração:</span>
              </div>

              {currentProject.projectUrl ? (
                <a
                  href={currentProject.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold transition-all group"
                >
                  <span className="truncate">{currentProject.projectUrl.replace('https://', '')}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ) : (
                <div className="text-[11px] font-mono text-slate-400 italic py-1">
                  Demonstração disponível mediante solicitação direta.
                </div>
              )}
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectProject(currentProject)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md cursor-pointer"
            >
              <span>Ver Case Completo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenWhatsAppWithMessage(`Olá Luciano! Vi o projeto "${currentProject.title}" no seu carrossel e gostaria de um orçamento similar.`)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
              <span>Solicitar Projeto Similar</span>
            </button>
          </div>

        </div>

      </div>

      {/* Pagination Dots Nav */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-white/10">
        {featuredProjects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? 'w-8 bg-amber-400 shadow-md shadow-amber-500/30'
                : 'w-2.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Ir para o slide ${idx + 1}: ${proj.title}`}
          />
        ))}
      </div>

    </div>
  );
};
