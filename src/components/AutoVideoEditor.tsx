import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Scissors,
  Type,
  Maximize2,
  Music,
  Download,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Flame,
  MessageSquare,
  Upload,
  Layers,
  Settings,
  ChevronRight,
  TrendingUp,
  Smile,
  ZoomIn,
  Film,
  FileText
} from 'lucide-react';
import { sampleVideoPresets, musicTracks, captionStylePresets } from '../data/videoPresets';
import { VideoPresetSample, AutoVideoSettings } from '../types';

interface AutoVideoEditorProps {
  onOpenWhatsAppWithMessage: (message?: string) => void;
}

export const AutoVideoEditor: React.FC<AutoVideoEditorProps> = ({
  onOpenWhatsAppWithMessage,
}) => {
  // State for active video
  const [selectedPreset, setSelectedPreset] = useState<VideoPresetSample>(sampleVideoPresets[0]);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [customVideoName, setCustomVideoName] = useState<string>('');
  
  // Playback state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(sampleVideoPresets[0].duration);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isProcessingAutoEdit, setIsProcessingAutoEdit] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  // Auto-edit configuration settings
  const [settings, setSettings] = useState<AutoVideoSettings>({
    autoJumpCuts: true,
    autoCaptions: true,
    captionStyle: 'hormozi',
    captionFontSize: 16,
    autoZoomIn: true,
    autoEmojis: true,
    backgroundMusicVolume: 25,
    selectedBgm: 'lofi-upbeat',
    aspectRatio: '9:16',
    viralityScore: 94,
  });

  // AI Script Generator state
  const [aiTopic, setAiTopic] = useState<string>('Como automatizar atendimento no WhatsApp para fechar mais vendas');
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [generatedScriptData, setGeneratedScriptData] = useState<any>(null);
  const [activeTabTool, setActiveTabTool] = useState<'editor' | 'script-ai' | 'presets'>('editor');

  // Video time update listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      video.currentTime = 0;
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [selectedPreset, customVideoUrl]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Video play error:', err);
      });
    }
  };

  // Seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  // Handle custom video upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setCustomVideoName(file.name);
      setIsPlaying(false);
      setCurrentTime(0);
      
      // Run quick auto-edit simulation
      simulateAutoEditProcess();
    }
  };

  // Auto-edit re-processing simulation
  const simulateAutoEditProcess = () => {
    setIsProcessingAutoEdit(true);
    setTimeout(() => {
      setIsProcessingAutoEdit(false);
    }, 1200);
  };

  // Get active caption at current time
  const currentCaption = selectedPreset.captions.find(
    (c) => currentTime >= c.startTime && currentTime <= c.endTime
  );

  // Active caption styling config
  const activeStylePreset = captionStylePresets.find(s => s.id === settings.captionStyle) || captionStylePresets[0];

  // AI Script Generation Handler
  const handleGenerateAiScript = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingScript(true);
    try {
      const res = await fetch('/api/auto-video/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          format: settings.aspectRatio,
          style: 'Dinâmico, retenção alta, estilo Alex Hormozi',
        }),
      });
      const data = await res.json();
      setGeneratedScriptData(data);
    } catch (e) {
      console.error('Error generating video script:', e);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Export SRT subtitles
  const handleExportSRT = () => {
    let srtContent = '';
    selectedPreset.captions.forEach((cap, index) => {
      const formatTime = (seconds: number) => {
        const date = new Date(0);
        date.setMilliseconds(seconds * 1000);
        return date.toISOString().substring(11, 23).replace('.', ',');
      };

      srtContent += `${index + 1}\n`;
      srtContent += `${formatTime(cap.startTime)} --> ${formatTime(cap.endTime)}\n`;
      srtContent += `${cap.text} ${settings.autoEmojis && cap.emoji ? cap.emoji : ''}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `legendas-automaticas-${selectedPreset.id}.srt`;
    link.click();
    setExportSuccess('Legendas .SRT baixadas com sucesso!');
    setTimeout(() => setExportSuccess(null), 3500);
  };

  // Copy full script to clipboard
  const handleCopyScript = () => {
    const textToCopy = selectedPreset.captions
      .map(c => `[${c.startTime}s - ${c.endTime}s] ${c.text}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <section id="editor-video-ia" className="py-16 md:py-24 bg-[#0c0e0f] relative border-t border-white/10 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-emerald-500/15 to-amber-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>ESTÚDIO DE EDIÇÃO AUTOMÁTICA DE VÍDEO & CORTES COM IA</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans">
            EDITE SEUS VÍDEOS COM <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">IA EM SEGUNDOS</span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Cortes automáticos de silêncio, legendas dinâmicas no estilo Alex Hormozi, zooms estratégicos e ganchos virais para Instagram Reels, TikTok e YouTube Shorts.
          </p>

          {/* Sub Navigation Tool Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTabTool('editor')}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTabTool === 'editor'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Editor & Player em Tempo Real</span>
            </button>

            <button
              onClick={() => setActiveTabTool('script-ai')}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTabTool === 'script-ai'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gerador de Roteiros & Ganchos IA</span>
            </button>

            <button
              onClick={() => setActiveTabTool('presets')}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTabTool === 'presets'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Modelos & Exemplos Prontos</span>
            </button>
          </div>
        </motion.div>

        {/* TOOL 1: Main Video Editor & Real-Time Player Interface */}
        {activeTabTool === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Video Stage & Player (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Video Player Container */}
              <div className="relative rounded-3xl bg-[#141719] border border-white/10 shadow-2xl p-4 sm:p-6 overflow-hidden">
                
                {/* Top Status Bar & Ratio Selector */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      {customVideoUrl ? `Vídeo Personalizado: ${customVideoName}` : selectedPreset.title}
                    </span>
                  </div>

                  {/* Format Pills */}
                  <div className="flex items-center gap-1 bg-[#0c0e0f] p-1 rounded-xl border border-white/10">
                    {(['9:16', '16:9', '1:1'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => {
                          setSettings(prev => ({ ...prev, aspectRatio: ratio }));
                          simulateAutoEditProcess();
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold transition-all cursor-pointer ${
                          settings.aspectRatio === ratio
                            ? 'bg-cyan-400 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Screen Wrapper with dynamic aspect ratio */}
                <div className="relative w-full flex items-center justify-center bg-black/80 rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[460px] border border-white/10 group">
                  
                  {/* Processing Overlay when editing changes */}
                  <AnimatePresence>
                    {isProcessingAutoEdit && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
                      >
                        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase">
                          Aplicando Cortes & Legendas IA...
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actual HTML5 Video Element */}
                  <div className={`relative transition-all duration-500 overflow-hidden flex items-center justify-center ${
                    settings.aspectRatio === '9:16'
                      ? 'w-[270px] sm:w-[300px] h-[480px] sm:h-[530px] rounded-2xl shadow-2xl border-2 border-white/20'
                      : settings.aspectRatio === '1:1'
                      ? 'w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-2xl shadow-2xl border-2 border-white/20'
                      : 'w-full h-[320px] sm:h-[420px] rounded-xl'
                  }`}>
                    
                    <video
                      ref={videoRef}
                      src={customVideoUrl || selectedPreset.videoUrl}
                      playsInline
                      muted={isMuted}
                      loop
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        settings.autoZoomIn && currentCaption?.effect === 'zoom'
                          ? 'scale-115'
                          : 'scale-100'
                      }`}
                      onClick={togglePlay}
                    />

                    {/* Virality Score Badge Overlay */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-mono font-black shadow-lg">
                      <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>RETENÇÃO: {settings.viralityScore}%</span>
                    </div>

                    {/* Dynamic Auto-Generated Subtitles Overlay */}
                    {settings.autoCaptions && currentCaption && (
                      <motion.div
                        key={currentCaption.id}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-12 left-3 right-3 z-20 flex flex-col items-center text-center pointer-events-none px-2"
                      >
                        <div
                          style={{
                            backgroundColor: activeStylePreset.bgColor,
                            fontSize: `${settings.captionFontSize}px`,
                          }}
                          className={`px-4 py-2.5 rounded-xl ${activeStylePreset.border} ${activeStylePreset.fontFamily} shadow-2xl max-w-full backdrop-blur-md`}
                        >
                          <span style={{ color: activeStylePreset.textColor }}>
                            {currentCaption.text.split(' ').map((word, wIdx) => {
                              const isHighlight = currentCaption.highlightWord && 
                                currentCaption.highlightWord.toLowerCase().includes(word.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''));
                              
                              return (
                                <span
                                  key={wIdx}
                                  style={{
                                    color: isHighlight ? activeStylePreset.highlightColor : activeStylePreset.textColor,
                                    textShadow: isHighlight ? '0 0 12px rgba(250, 204, 21, 0.6)' : 'none',
                                  }}
                                  className={isHighlight ? 'scale-105 inline-block mx-0.5 font-black underline decoration-yellow-400/50' : 'mx-0.5'}
                                >
                                  {word}{' '}
                                </span>
                              );
                            })}
                          </span>
                          
                          {/* Auto Contextual Emoji */}
                          {settings.autoEmojis && currentCaption.emoji && (
                            <span className="inline-block ml-1.5 text-lg animate-bounce">
                              {currentCaption.emoji}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Big Center Play/Pause Button on Hover */}
                    {!isPlaying && (
                      <button
                        onClick={togglePlay}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer z-20"
                        title="Reproduzir Vídeo"
                      >
                        <Play className="w-7 h-7 fill-slate-950 ml-1" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Timeline & Custom Playback Controls */}
                <div className="mt-4 space-y-3">
                  
                  {/* Scrubber Range Input */}
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  {/* Multi-Track Timeline Visualizer (Video, Captions, B-Roll, Audio) */}
                  <div className="p-3 rounded-2xl bg-[#0c0e0f] border border-white/10 space-y-2">
                    
                    {/* Track 1: Jump-Cuts & Silences Removed */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <Scissors className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="w-16 shrink-0 uppercase font-bold">Cortes IA:</span>
                      <div className="flex-1 h-3.5 rounded bg-slate-900 overflow-hidden flex gap-1 p-0.5">
                        <div className="h-full bg-cyan-500/50 rounded flex-1"></div>
                        <div className="h-full bg-transparent w-2 border-x border-red-500/50" title="Silêncio removido"></div>
                        <div className="h-full bg-cyan-500/50 rounded flex-2"></div>
                        <div className="h-full bg-transparent w-1.5 border-x border-red-500/50" title="Hesitação cortada"></div>
                        <div className="h-full bg-cyan-500/50 rounded flex-1"></div>
                      </div>
                    </div>

                    {/* Track 2: Subtitle Segments */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <Type className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="w-16 shrink-0 uppercase font-bold">Legendas:</span>
                      <div className="flex-1 h-3.5 rounded bg-slate-900 flex gap-1 p-0.5 overflow-hidden">
                        {selectedPreset.captions.map((cap) => {
                          const isActive = currentTime >= cap.startTime && currentTime <= cap.endTime;
                          return (
                            <div
                              key={cap.id}
                              style={{ flex: (cap.endTime - cap.startTime) }}
                              className={`h-full rounded text-[8px] flex items-center justify-center font-extrabold uppercase truncate px-1 transition-colors ${
                                isActive ? 'bg-amber-400 text-slate-950' : 'bg-amber-400/30 text-amber-200'
                              }`}
                            >
                              {cap.highlightWord || 'Texto'}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Track 3: Background Audio Track */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <Music className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="w-16 shrink-0 uppercase font-bold">Trilha BGM:</span>
                      <div className="flex-1 h-3.5 rounded bg-slate-900 flex items-center px-2">
                        <div className="w-full h-1 bg-emerald-500/40 rounded flex items-center justify-between">
                          <span className="text-[8px] text-emerald-300 font-bold">{selectedPreset.soundtrack}</span>
                          <span className="text-[8px] text-emerald-400">Vol: {settings.backgroundMusicVolume}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Playback Control Buttons Row */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-400/20"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                        <span>{isPlaying ? 'Pausar' : 'Reproduzir'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            setCurrentTime(0);
                          }
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        title="Reiniciar"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                        title={isMuted ? 'Ativar Áudio' : 'Mutar Áudio'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </button>

                      <span className="text-xs font-mono font-bold text-slate-400">
                        {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                      </span>
                    </div>

                    {/* Upload Personal Video Button */}
                    <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-xs font-mono font-bold cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Testar Meu Vídeo</span>
                      <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

              </div>

              {/* Notification Banner on Export */}
              <AnimatePresence>
                {exportSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{exportSuccess}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Right Column: AI Auto-Editing Controls & Customizer (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card: Auto-Editing Toggles */}
              <div className="rounded-3xl p-6 bg-[#141719] border border-white/10 shadow-2xl space-y-5">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-base font-extrabold text-white uppercase font-sans">
                      Automações de Edição
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
                    1-Click AI
                  </span>
                </div>

                {/* Auto Feature Toggles */}
                <div className="space-y-3.5">
                  
                  {/* Toggle 1: Auto Jump-cuts */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0e0f] border border-white/10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Scissors className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Corte Automático de Silêncios</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Remove pausas mortas para ritmo veloz e dinâmico.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSettings(prev => ({ ...prev, autoJumpCuts: !prev.autoJumpCuts }));
                        simulateAutoEditProcess();
                      }}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                        settings.autoJumpCuts ? 'bg-cyan-400' : 'bg-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                        settings.autoJumpCuts ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Toggle 2: Auto Subtitles */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0e0f] border border-white/10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Type className="w-3.5 h-3.5 text-amber-400" />
                        <span>Legendas Dinâmicas Sincronizadas</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Transcrição palavra por palavra com destaque visual.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSettings(prev => ({ ...prev, autoCaptions: !prev.autoCaptions }));
                        simulateAutoEditProcess();
                      }}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                        settings.autoCaptions ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                        settings.autoCaptions ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Toggle 3: Auto Zoom In */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0e0f] border border-white/10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Auto Zoom Dinâmico (Retenção)</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Aplica aproximações pontuais para prender a atenção.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSettings(prev => ({ ...prev, autoZoomIn: !prev.autoZoomIn }));
                        simulateAutoEditProcess();
                      }}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                        settings.autoZoomIn ? 'bg-emerald-400' : 'bg-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                        settings.autoZoomIn ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Toggle 4: Auto Emojis */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0e0f] border border-white/10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Smile className="w-3.5 h-3.5 text-pink-400" />
                        <span>Emojis & Ícones Contextuais</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Insere ilustrações automáticas baseadas na fala.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSettings(prev => ({ ...prev, autoEmojis: !prev.autoEmojis }));
                        simulateAutoEditProcess();
                      }}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                        settings.autoEmojis ? 'bg-pink-400' : 'bg-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                        settings.autoEmojis ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Subtitle Style Presets Grid */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                    Estilo Visual das Legendas:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {captionStylePresets.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => {
                          setSettings(prev => ({ ...prev, captionStyle: style.id as any }));
                          simulateAutoEditProcess();
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          settings.captionStyle === style.id
                            ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-[#0c0e0f] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <div className="font-extrabold text-[11px] uppercase tracking-wide truncate">
                          {style.name}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate mt-0.5">
                          {style.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Soundtrack / BGM Selection */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Trilha de Fundo Sem Royalties:
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {settings.backgroundMusicVolume}%
                    </span>
                  </div>
                  <select
                    value={settings.selectedBgm}
                    onChange={(e) => {
                      setSettings(prev => ({ ...prev, selectedBgm: e.target.value }));
                      simulateAutoEditProcess();
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#0c0e0f] border border-white/10 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400"
                  >
                    {musicTracks.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} — ({m.mood})
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Card: Export Options & Direct WhatsApp Custom Proposal */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 border border-cyan-400/30 shadow-2xl space-y-4">
                
                <div className="space-y-1">
                  <div className="text-xs font-mono font-extrabold text-cyan-300 uppercase tracking-wider">
                    Exportação & Produção em Escala
                  </div>
                  <h4 className="text-lg font-black text-white uppercase font-sans">
                    Quer Seus Vídeos Editados no Piloto Automático?
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Plano mensal por apenas <strong>R$ 290,00/mês</strong> com edição profissional para <strong>até 5 vídeos por mês</strong> (Reels, TikToks e Shorts) prontos para postar e converter clientes todos os dias.
                  </p>
                </div>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleExportSRT}
                    className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-[#141719] hover:bg-[#1a1e20] text-slate-200 border border-white/10 text-xs font-bold font-mono uppercase transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Baixar .SRT</span>
                  </button>

                  <button
                    onClick={handleCopyScript}
                    className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-[#141719] hover:bg-[#1a1e20] text-slate-200 border border-white/10 text-xs font-bold font-mono uppercase transition-all cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copiedScript ? 'Copiado!' : 'Copiar Roteiro'}</span>
                  </button>
                </div>

                {/* Direct WhatsApp Call to Action */}
                <button
                  onClick={() => onOpenWhatsAppWithMessage(`Olá Luciano! Gostei da ferramenta de Edição Automática de Vídeos e quero contratar o plano mensal de edição de vídeos (R$ 290,00/mês para até 5 vídeos).`)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-black text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Contratar Plano Mensal (Até 5 Vídeos · R$ 290/mês)</span>
                </button>

              </div>

            </div>

          </div>
        )}

        {/* TOOL 2: AI Script & Viral Hook Generator */}
        {activeTabTool === 'script-ai' && (
          <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-[#141719] border border-white/10 shadow-2xl space-y-6">
            
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inteligência Artificial de Roteirização Viral</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
                Gerador de Roteiros, Ganchos & Cortes Automáticos
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                Digite o tema do seu nicho ou negócio e a IA criará a estrutura completa com ganchos magnéticos (0-3s), falas, sugestões de B-Roll e hashtags.
              </p>
            </div>

            {/* Prompt Input Form */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Tema ou Ideia do Vídeo:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ex: Como atrair clientes para clínica odontológica pelo Instagram"
                  className="flex-1 px-4 py-3.5 rounded-2xl bg-[#0c0e0f] border border-white/15 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 placeholder-slate-500"
                />
                <button
                  onClick={handleGenerateAiScript}
                  disabled={isGeneratingScript}
                  className="px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20 disabled:opacity-50"
                >
                  {isGeneratingScript ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Gerando Roteiro...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Gerar com IA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Display */}
            {generatedScriptData && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-4 border-t border-white/10"
              >
                {/* Metrics header */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0c0e0f] border border-white/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Potencial Viral</span>
                    <div className="text-lg font-black text-amber-400 flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{generatedScriptData.viralityScore || 94}%</span>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Duração Estimada</span>
                    <div className="text-lg font-black text-cyan-300">
                      {generatedScriptData.estimatedDuration || '45 segundos'}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Estilo de Legenda</span>
                    <div className="text-lg font-black text-emerald-300">
                      {generatedScriptData.suggestedCaptionsStyle || 'Hormozi Pop'}
                    </div>
                  </div>
                </div>

                {/* Viral Hooks (0-3 seconds) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Ganchos Magnéticos Iniciais (0 a 3 segundos):</span>
                  </h4>
                  <div className="space-y-2">
                    {generatedScriptData.hooks?.map((h: string, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-200 text-xs font-bold">
                        Option #{idx + 1}: "{h}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* Segments & Timestamps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" />
                    <span>Estrutura de Cenas, Falas & B-Roll:</span>
                  </h4>
                  <div className="space-y-3">
                    {generatedScriptData.segments?.map((seg: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#0c0e0f] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold">{seg.timestamp}</span>
                          <span className="text-slate-400 font-bold">{seg.scene}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-100 font-medium">
                          <strong>Fala:</strong> "{seg.dialogue}"
                        </p>
                        {seg.brollSuggestion && (
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 bg-white/5 p-2 rounded-lg">
                            <Layers className="w-3 h-3 text-emerald-400" />
                            <span>B-Roll: {seg.brollSuggestion}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action to apply to player */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveTabTool('editor');
                      simulateAutoEditProcess();
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20"
                  >
                    <Video className="w-4 h-4" />
                    <span>Testar Este Roteiro no Player Visual</span>
                  </button>

                  <button
                    onClick={() => onOpenWhatsAppWithMessage(`Olá Luciano! Criei o roteiro "${generatedScriptData.title || aiTopic}" na ferramenta do site e quero gravar e enviar para você editar profissionalmente.`)}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-400/20"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Enviar Roteiro para Luciano no WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* TOOL 3: Presets Gallery */}
        {activeTabTool === 'presets' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVideoPresets.map((preset) => (
              <div
                key={preset.id}
                className={`p-6 rounded-3xl bg-[#141719] border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  selectedPreset.id === preset.id
                    ? 'border-cyan-400 shadow-xl shadow-cyan-400/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                    <img
                      src={preset.thumbnailUrl}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 text-[10px] font-mono font-bold">
                      {preset.format}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                      {preset.category}
                    </span>
                    <h4 className="text-lg font-black text-white uppercase font-sans">
                      {preset.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {preset.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPreset(preset);
                    setCustomVideoUrl(null);
                    setActiveTabTool('editor');
                    simulateAutoEditProcess();
                  }}
                  className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-400/20"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Carregar Este Modelo no Editor</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
