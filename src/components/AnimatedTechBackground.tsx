import React, { useState, useEffect, useRef } from 'react';
import { Laptop, Globe, Sparkles, Sliders, Eye, SunMedium } from 'lucide-react';
import laptopBg from '../assets/images/laptop_saas_dashboard_1792423119884.jpg';
import globeBg from '../assets/images/cyber_globe_dissolve_1792423134729.jpg';

export type TechBackgroundMode = 'hybrid' | 'laptop' | 'globe';

interface AnimatedTechBackgroundProps {
  className?: string;
  defaultMode?: TechBackgroundMode;
  showControls?: boolean;
  opacity?: number;
  enableParallax?: boolean;
}

export const AnimatedTechBackground: React.FC<AnimatedTechBackgroundProps> = ({
  className = '',
  defaultMode = 'hybrid',
  showControls = true,
  opacity: defaultOpacity = 0.78,
  enableParallax = true,
}) => {
  const [mode, setMode] = useState<TechBackgroundMode>(defaultMode);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0); // 0 = laptop, 1 = globe
  const [intensity, setIntensity] = useState<number>(defaultOpacity);
  const [showControlPanel, setShowControlPanel] = useState<boolean>(false);
  
  // Mouse parallax state
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatic alternating transition in 'hybrid' mode
  useEffect(() => {
    if (mode !== 'hybrid') return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 7000); // Transitions every 7 seconds

    return () => clearInterval(interval);
  }, [mode]);

  // Adjust active image based on fixed mode
  useEffect(() => {
    if (mode === 'laptop') {
      setActiveImageIndex(0);
    } else if (mode === 'globe') {
      setActiveImageIndex(1);
    }
  }, [mode]);

  // Mouse move handler for gentle depth parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableParallax || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18; // -9px to +9px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;  // -7px to +7px
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      {/* Visual Container with Parallax Translation */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {/* IMAGE 1: Photorealistic Laptop SaaS Analytics Dashboard */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: mode === 'laptop' ? intensity : mode === 'globe' ? 0 : activeImageIndex === 0 ? intensity : 0,
          }}
        >
          <img 
            src={laptopBg} 
            alt="Laptop SaaS Analytics Dashboard"
            className="w-full h-full object-cover object-center animate-kenburns scale-105 filter brightness-110 contrast-110 saturate-[1.25]"
          />
        </div>

        {/* IMAGE 2: 3D Holographic Globe Dissolving into Cyber Particles */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: mode === 'globe' ? intensity : mode === 'laptop' ? 0 : activeImageIndex === 1 ? intensity : 0,
          }}
        >
          <img 
            src={globeBg} 
            alt="3D Holographic Globe Dissolving in Cyber Data"
            className="w-full h-full object-cover object-center animate-kenburns scale-105 filter brightness-115 contrast-115 saturate-[1.3]"
          />
        </div>
      </div>

      {/* Cyber Telemetry Scanline Beam */}
      <div className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-scanline pointer-events-none"></div>

      {/* Ambient Radial Glow Lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[380px] bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none animate-tech-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[340px] bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none animate-tech-pulse" style={{ animationDelay: '3s' }}></div>

      {/* Translucent Edge Frame (Smoothly fades to dark borders without hiding the central scene) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f10] via-transparent to-[#0d0f10]/35 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0d0f10_92%)] pointer-events-none"></div>
      
      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-15 pointer-events-none"></div>

      {/* Interactive Background Controls (Pointer events enabled on buttons only) */}
      {showControls && (
        <div className="absolute top-4 right-4 z-30 pointer-events-auto flex items-center gap-1.5 p-1 rounded-2xl bg-[#090b0c]/80 backdrop-blur-md border border-cyan-500/40 shadow-2xl text-xs">
          
          <button
            type="button"
            onClick={() => setMode('hybrid')}
            className={`px-2.5 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'hybrid'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Alterna automaticamente entre o Laptop SaaS e o Globo em Desmanche"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Híbrido Animado</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('laptop')}
            className={`px-2.5 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'laptop'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Fixar no Laptop com Dashboard SaaS e Gráficos"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Laptop SaaS</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('globe')}
            className={`px-2.5 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'globe'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Fixar no Globo 3D Holográfico se Desmanchando"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Globo Cyber</span>
          </button>

          {/* Quick Intensity / Brightness selector */}
          <button
            type="button"
            onClick={() => setShowControlPanel(!showControlPanel)}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 ${
              showControlPanel
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'text-slate-300 hover:text-white border-transparent hover:bg-white/10'
            }`}
            title="Ajustar intensidade / luminosidade da imagem de fundo"
          >
            <SunMedium className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] font-bold text-cyan-300 hidden md:inline">
              {Math.round(intensity * 100)}%
            </span>
            <Sliders className="w-3 h-3 text-slate-400" />
          </button>

          {/* Quick Intensity Popover */}
          {showControlPanel && (
            <div className="absolute top-full right-0 mt-2 p-3.5 rounded-2xl bg-[#0d1012]/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl w-56 space-y-3 z-40 text-left">
              <div className="flex items-center justify-between text-[11px] text-slate-200 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Nitidez do Fundo:</span>
                </span>
                <span className="font-mono text-cyan-300 font-bold">{Math.round(intensity * 100)}%</span>
              </div>
              
              <input
                type="range"
                min="0.30"
                max="0.95"
                step="0.05"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="grid grid-cols-3 gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => setIntensity(0.85)}
                  className={`px-1.5 py-1 rounded text-[10px] font-medium border text-center transition-all cursor-pointer ${
                    intensity >= 0.80 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'text-slate-400 border-white/5 hover:bg-white/5'
                  }`}
                >
                  Nítido 85%
                </button>
                <button
                  type="button"
                  onClick={() => setIntensity(0.70)}
                  className={`px-1.5 py-1 rounded text-[10px] font-medium border text-center transition-all cursor-pointer ${
                    intensity >= 0.65 && intensity < 0.80 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'text-slate-400 border-white/5 hover:bg-white/5'
                  }`}
                >
                  Médio 70%
                </button>
                <button
                  type="button"
                  onClick={() => setIntensity(0.45)}
                  className={`px-1.5 py-1 rounded text-[10px] font-medium border text-center transition-all cursor-pointer ${
                    intensity < 0.65 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'text-slate-400 border-white/5 hover:bg-white/5'
                  }`}
                >
                  Suave 45%
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
