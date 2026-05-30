import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  Play, Pause, RotateCcw, Sliders, Monitor, Film, Sparkles, 
  Volume2, Settings, Scissors, BarChart3, Layers, Tv, RefreshCw, ZoomIn
} from 'lucide-react';
import { playClickSound, playTickSound } from '../utils/audio';

interface ColorGradeOption {
  id: string;
  name: string;
  filterClass: string;
  description: string;
  accent: string;
}

interface RatioOption {
  id: string;
  name: string;
  ratio: string;
  widthClass: string;
  heightClass: string;
}

interface FXOption {
  id: string;
  name: string;
  element: ReactNode;
}

export default function InteractiveConsole() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentGrade, setCurrentGrade] = useState<string>('cinematic');
  const [currentRatio, setCurrentRatio] = useState<string>('16-9');
  const [enabledFX, setEnabledFX] = useState<string[]>(['grain']);
  const [currentTime, setCurrentTime] = useState<number>(12.4);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [soundVolume, setSoundVolume] = useState<number>(80);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const maxTime = 30.0;

  // Timeline scrubber update loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= maxTime) {
            return 0.0;
          }
          return parseFloat((prev + 0.1).toFixed(1));
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const colorGrades: ColorGradeOption[] = [
    { 
      id: 'cinematic', 
      name: 'Teal & Orange', 
      filterClass: 'contrast-125 brightness-95 saturate-110 hue-rotate-5 sepia-15', 
      description: 'The standard Hollywood look: warm skin tones with rich teal shadows.',
      accent: 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
    },
    { 
      id: 'cyberpunk', 
      name: 'Cyber Neon', 
      filterClass: 'contrast-135 saturate-150 hue-rotate-[320deg] brightness-105', 
      description: 'High contrast with highly saturated vibrant magentas & deep neons.',
      accent: 'border-fuchsia-400 text-fuchsia-400 bg-fuchsia-950/20'
    },
    { 
      id: 'vintage', 
      name: '70s Film Noir', 
      filterClass: 'grayscale sepia-25 brightness-90 contrast-110', 
      description: 'Elegant monochrome film styling with rich contrast and deep grain.',
      accent: 'border-amber-600 text-amber-500 bg-amber-950/15'
    },
    { 
      id: 'raw', 
      name: 'Log Profile (Raw)', 
      filterClass: 'brightness-110 contrast-75 saturate-50', 
      description: 'Desaturated, flat coloring, optimized for maximum dynamic grading.',
      accent: 'border-slate-500 text-slate-400 bg-slate-900/40'
    }
  ];

  const aspectRatios: RatioOption[] = [
    { id: '16-9', name: '16:9 Landscape', ratio: '1.77', widthClass: 'w-full', heightClass: 'aspect-video' },
    { id: '9-16', name: '9:16 vertical (Shorts)', ratio: '0.56', widthClass: 'w-48 mx-auto', heightClass: 'aspect-[9/16]' },
    { id: '1-1', name: '1:1 Square (Feed)', ratio: '1', widthClass: 'w-64 mx-auto', heightClass: 'aspect-square' }
  ];

  const handleToggleFX = (id: string) => {
    playTickSound();
    if (enabledFX.includes(id)) {
      setEnabledFX(enabledFX.filter(x => x !== id));
    } else {
      setEnabledFX([...enabledFX, id]);
    }
  };

  const selectedRatio = aspectRatios.find(r => r.id === currentRatio) || aspectRatios[0];
  const selectedGrade = colorGrades.find(g => g.id === currentGrade) || colorGrades[0];

  return (
    <div className="bg-[#1a1a1a]/65 border border-white/5 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-xl hover:border-white/10 transition-all duration-300">
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-white/5 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#2dd4bf]/10 text-[#2dd4bf]">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
              Workbench Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Interactive timeline & grading board. Tune rendering configs below!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
            Renderer v2.4
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Viewport & Controls Area (LHS: 7 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-4">
          
          {/* Main Monitor Display Context */}
          <div className="bg-slate-950 rounded-xl border border-slate-800/60 overflow-hidden relative shadow-2xl flex items-center justify-center p-3 sm:p-5 min-h-[220px] max-h-[380px]">
            
            {/* Monitor Top Status Info */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <div className="text-[10px] font-mono text-slate-400 bg-black/70 px-2 py-0.5 rounded-md border border-slate-800/60 backdrop-blur-sm flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></span>
                <span>MONITOR_01</span>
              </div>
              <div className="text-[10px] font-mono text-slate-300 bg-black/70 px-2.5 py-0.5 rounded-md border border-white/5 backdrop-blur-sm">
                FPS: <span className="text-[#2dd4bf] font-bold">24.0</span>
              </div>
            </div>

            {/* Simulated Frame Canvas viewport container */}
            <div className={`relative transition-all duration-300 overflow-hidden rounded-lg shadow-inner ${selectedRatio.widthClass} ${selectedRatio.heightClass}`}>
              
              {/* Actual Video Canvas visual (Pure CSS generated loop representing video assets) */}
              <div 
                className={`absolute inset-0 bg-slate-900 flex items-center justify-center transition-all duration-300 ${selectedGrade.filterClass}`}
                style={{
                  transform: `scale(${zoomLevel})`
                }}
              >
                {/* Simulated Moving Video Elements */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/80 z-10 pointer-events-none" />
                
                {/* 1. Abstract Motion Backdrop */}
                {isPlaying && (
                  <div className="absolute inset-0 opacity-40 mix-blend-color-dodge pointer-events-none animate-pulse">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-cyan-700 filter blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-indigo-700 filter blur-3xl animate-bounce" />
                  </div>
                )}
                
                {/* 2. Graphic Vector Object representing graphic element */}
                <div className="relative text-center shrink shadow-md p-6 z-10 bg-slate-950/30 rounded-lg border border-slate-800/10 backdrop-blur-xs">
                  <div className="text-white text-md font-bold tracking-widest font-sans mb-1 scale-95 uppercase flex items-center justify-center gap-2">
                    <Film className="h-5 w-5 text-teal-400 shrink-0" />
                    YA_EDIT_HQ
                  </div>
                  <div className="text-[10px] font-mono text-teal-400 tracking-wider">
                    CUT {currentTime.toFixed(1)}s ● FRAME {Math.floor(currentTime * 24)}
                  </div>
                </div>

                {/* 3. Cine Bars Overlay wrapper */}
                <div className="absolute top-0 inset-x-0 h-4 bg-black pointer-events-none z-10 scale-102" />
                <div className="absolute bottom-0 inset-x-0 h-4 bg-black pointer-events-none z-10 scale-102" />

                {/* Active Custom Overlays */}
                {/* Light Leak overlay */}
                {enabledFX.includes('leak') && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-rose-500/25 via-amber-300/35 to-transparent mix-blend-screen animate-pulse" />
                )}
                
                {/* Retro grain effect overlay */}
                {enabledFX.includes('grain') && (
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:8px_8px] mix-blend-overlay" />
                )}

                {/* Glitch Overlay effect */}
                {enabledFX.includes('glitch') && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-difference overflow-hidden text-cyan-400 text-[10px] select-none opacity-40">
                    <div className="absolute inset-0 bg-red-500/10 transform translate-x-0.5" />
                    <div className="absolute inset-0 bg-cyan-500/15 transform -translate-x-0.5" />
                  </div>
                )}
              </div>

              {/* Volume status label overlay */}
              <div className="absolute bottom-3 left-4 flex items-center gap-1 font-mono text-[9px] text-slate-350 bg-black/65 px-1.5 py-0.5 rounded border border-slate-800/50 z-20 pointer-events-none">
                <Volume2 className="h-3 w-3 text-teal-400 shrink-0" />
                <span>{soundVolume > 0 ? `${soundVolume}%` : 'MUTED'}</span>
              </div>
            </div>
            
            {/* Direct Warning overlay if paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-slate-900/90 border border-slate-800 text-slate-200 px-4 py-2 rounded-lg text-xs font-mono shadow-xl flex items-center gap-2">
                  <Pause className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                  <span>PREVIEW PAUSED</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Live Timeline Controls */}
          <div className="bg-slate-950/70 border border-slate-800/60 rounded-xl p-4 flex flex-col gap-3">
            
            {/* Scrubber & Bar visual timeline */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400">
                00:00
              </span>
              <div className="relative flex-1 group">
                {/* Scrubber background line */}
                <input 
                  type="range"
                  min="0"
                  max={maxTime}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => { playTickSound(); setCurrentTime(parseFloat(e.target.value)); }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2dd4bf] focus:outline-none"
                />
                
                {/* Highlighted portion bar */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-400 rounded-l-lg pointer-events-none" 
                  style={{ width: `${(currentTime / maxTime) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-300">
                00:{(maxTime).toFixed(1)}
              </span>
            </div>

            {/* Controls Bar Row */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Playback Buttons Group */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { playClickSound(); setIsPlaying(!isPlaying); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all duration-200 ${
                    isPlaying 
                      ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  }`}
                  id="btn-play-pause"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3 w-3" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 fill-teal-400" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { playClickSound(); setCurrentTime(0.0); setIsPlaying(true); }}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Rewind to start"
                  id="btn-rewind"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Status indicators */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400">Scale:</span>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      onClick={() => { playTickSound(); setZoomLevel(prev => Math.max(0.75, prev - 0.25)); }}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-900"
                    >
                      -
                    </button>
                    <span className="text-[10px] font-mono text-slate-300 w-8 text-center bg-slate-950 px-1 border border-slate-800/80 rounded py-0.5">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button 
                      type="button"
                      onClick={() => { playTickSound(); setZoomLevel(prev => Math.min(2, prev + 0.25)); }}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400">Audio:</span>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolume}
                    onChange={(e) => { playTickSound(); setSoundVolume(Number(e.target.value)); }}
                    className="w-16 h-1 bg-slate-850 rounded appearance-none cursor-pointer accent-teal-400"
                  />
                </div>
              </div>

              {/* Current Time Badge */}
              <div className="text-right">
                <div className="text-xs font-mono font-bold tracking-tight text-white">
                  00:{currentTime < 10 ? `0${currentTime.toFixed(1)}` : currentTime.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Graphic Peak Levels Equalizer Simulation (moving with timing index) */}
            <div className="flex gap-1 h-8 items-end justify-between px-1 bg-slate-950/80 rounded-md border border-slate-900 p-1">
              {[...Array(32)].map((_, i) => {
                // Generate relative random heights synced dynamically with player logic
                const timingFreq = Math.sin(currentTime * 2 + i) * Math.cos(currentTime * 0.5 + i * 2);
                const heightLimit = Math.max(10, Math.floor(((timingFreq + 1) / 2) * 100)); // percentage 10% to 100%
                
                return (
                  <div 
                    key={i} 
                    className="w-[3%] bg-gradient-to-t from-teal-500/40 via-cyan-400 to-teal-400 rounded-sm transition-all duration-150"
                    style={{ 
                      height: isPlaying ? `${heightLimit}%` : '5%',
                      opacity: isPlaying ? 0.85 : 0.4
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Editing Settings Controls (RHS: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Section: Selected Grade details */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
              <Tv className="h-3 w-3 text-teal-400" /> Color Correction LUT
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {colorGrades.map((grade) => (
                <button
                  key={grade.id}
                  id={`btn-lut-${grade.id}`}
                  onClick={() => setCurrentGrade(grade.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                    currentGrade === grade.id 
                      ? `${grade.accent} border-teal-500/80 shadow-md` 
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700/60'
                  }`}
                >
                  <p className="font-bold">{grade.name}</p>
                </button>
              ))}
            </div>

            <div className="bg-slate-950/40 border border-slate-850 p-3 rounded-lg mt-2">
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                <span className="font-semibold text-slate-200">Result:</span> {selectedGrade.description}
              </p>
            </div>
          </div>

          {/* Section: Aspect Ratio controls */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
              <Monitor className="h-3 w-3 text-teal-400" /> Frame Aspect Ratio
            </h4>

            <div className="flex flex-col gap-1.5">
              {aspectRatios.map((r) => (
                <button
                  key={r.id}
                  id={`btn-ratio-${r.id}`}
                  onClick={() => setCurrentRatio(r.id)}
                  className={`px-3 py-2 rounded-lg text-left border text-xs flex items-center justify-between transition-all ${
                    currentRatio === r.id 
                      ? 'bg-[#2dd4bf]/10 text-white border-teal-500/80 font-semibold' 
                      : 'bg-[#0f0f0f]/60 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <span>{r.name}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-300">
                    {r.id === '16-9' ? '1.77' : r.id === '9-16' ? '0.56' : '1.00'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Motion FX Overlay Switches */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-teal-400" /> Production Overlays
            </h4>

            <div className="flex flex-col gap-1.5 bg-slate-950/65 border border-slate-850 p-3 rounded-xl">
              {[
                { id: 'grain', name: 'Original 35mm Retro Grain' },
                { id: 'leak', name: 'Lens Flare & Light Leak Overlay' },
                { id: 'glitch', name: 'RGB Color Fringe/Glitch' }
              ].map((fx) => {
                const isActive = enabledFX.includes(fx.id);
                return (
                  <button
                    key={fx.id}
                    id={`btn-fx-${fx.id}`}
                    onClick={() => handleToggleFX(fx.id)}
                    className="flex items-center justify-between text-xs w-full py-1 text-left cursor-pointer group"
                  >
                    <span className={`transition-colors font-light ${isActive ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {fx.name}
                    </span>
                    
                    {/* Toggle pill */}
                    <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors relative ${isActive ? 'bg-[#2dd4bf]' : 'bg-slate-800'}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-white transition-all transform ${isActive ? 'translate-x-3.5' : 'translate-x-0'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Preset Action */}
          <div className="p-3 bg-[#2dd4bf]/5 rounded-xl border border-[#2dd4bf]/25">
            <h5 className="text-[10px] font-mono font-bold tracking-wider text-[#2dd4bf] uppercase mb-1">
              Active Client Preset
            </h5>
            <p className="text-[11px] text-slate-350 leading-relaxed font-light">
              This interactive rendering canvas simulates how Yash adjusts video outputs for Youtube, Instagram Reels, and Cine TV campaigns live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
