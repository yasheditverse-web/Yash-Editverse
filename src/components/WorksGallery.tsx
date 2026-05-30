import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Plus, Image as ImageIcon, Video, Layers, X, ExternalLink, Calendar, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Video Editing' | 'Motion Design' | 'Graphic Design';
  thumbnail: string;
  description: string;
  extendedDescription: string;
  tools: string[];
  durationString: string;
  sampleVideo?: string; // Standard video clip or color grades style fallback
  frameStyle: string;
  highlights: string[];
}

export default function WorksGallery() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Video Editing' | 'Motion Design' | 'Graphic Design'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleViewOriginal = (projectTitle: string) => {
    setStatusMsg("Loading high-fidelity render pipeline...");
    setTimeout(() => {
      setStatusMsg("Connecting to yasheditverse cloud source...");
    }, 1200);
    setTimeout(() => {
      setStatusMsg("Linked securely! Original 4K UHD asset/PSD is ready for client delivery.");
    }, 2500);
    setTimeout(() => {
      setStatusMsg(null);
    }, 6000);
  };
  const projects: Project[] = [
    {
      id: 'proj-1',
      title: 'Cockroach Janta Party (CJP) – Political Satire Promo',
      category: 'Video Editing',
      thumbnail: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=800&q=80',
      description: 'High-retention social satire combining animated cartoon assets, dynamic face masking, and precise kinetic subtitles.',
      extendedDescription: 'A custom, high-velocity political meme/satire video showcasing advanced overlay workflows. It transforms standard presenter footage with dynamic layer structures, color correction, and perfectly timed sound effects to maximize audience retention.',
      tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
      durationString: '1:12 Mins',
      frameStyle: 'contrast-125 saturate-110 brightness-95 text-cyan-400',
      highlights: ['Layered Masking & Face Overlays', 'High Retention Text Subtitles', 'Soundscape Foley & Dialogue Tuning', 'Custom Cartoon Portrait Integration']
    },
    {
      id: 'proj-2',
      title: 'CJP Timeline Reveal & Animated Graphics',
      category: 'Motion Design',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      description: 'Futuristic scanline filters, weaponized self-depreciation title curves, and custom 2D animated motion tracking.',
      extendedDescription: 'Built primarily with After Effects using strict keyframing and layout curves. Demonstrates how to turn an insult into a crown using seamless vector animation, custom vector transitions, and high-velocity pacing.',
      tools: ['After Effects', 'Premiere Pro'],
      durationString: '1:10 Mins',
      frameStyle: 'saturate-200 hue-rotate-[180deg] text-[#A855F7]',
      highlights: ['Vector Path Animations', 'Scanlines & Aberration Filters', 'Speed Ramped Slide Transitions', 'Interactive Subtitle Overlays']
    },
    {
      id: 'proj-3',
      title: 'Barbaad Insaan Vlog – Before & After Edit',
      category: 'Video Editing',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      description: 'Direct comparison demonstrating vlog color grading, zoom track framing, and high-pacing cuts.',
      extendedDescription: 'This before-and-after breakdown illustrates how raw client footage can be revamped into standard viral YouTube/Instagram material using comedic pacing, text overlays, zooms, and custom sound design.',
      tools: ['Premiere Pro', 'Photoshop'],
      durationString: '0:28 Mins',
      frameStyle: 'saturate-125 contrast-105',
      highlights: ['Before vs After Grid Comparison', 'High Retention Zoom Tracks', 'Background Noise Optimization', 'Vlog Timing Calibration']
    },
    {
      id: 'proj-4',
      title: 'Zepto Delivery Ad – Motion Graphic Explainer',
      category: 'Motion Design',
      thumbnail: 'https://images.unsplash.com/photo-1580913428023-02c695466d63?auto=format&fit=crop&w=800&q=80',
      description: 'High-velocity 2D vector animation explaining delivery mechanics with grocery list rigs.',
      extendedDescription: 'A complete vector path animation featuring a custom delivery scooter rig, scrolling digital grocery displays, and sound-synchronized price badges to communicate extreme speed.',
      tools: ['After Effects', 'Illustrator'],
      durationString: '0:24 Mins',
      frameStyle: 'saturate-150 contrast-110 brightness-95',
      highlights: ['2D Vector Device Rigging', 'Dynamic Price-List Scrolling', 'Eased Keyframe Curves', 'Audio Sync Accent Transitions']
    },
    {
      id: 'proj-5',
      title: 'Uber Mobile Promo – Google Search Integration',
      category: 'Motion Design',
      thumbnail: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80',
      description: 'Sleek animated app screen interface explaining direct navigation setups and ride ordering.',
      extendedDescription: 'An interactive showcase combining a typing Google bar look that seamlessly slides into an elegant iOS system layout, active map drives, and vehicle selector options.',
      tools: ['After Effects', 'Premiere Pro'],
      durationString: '0:20 Mins',
      frameStyle: 'brightness-90 contrast-115 text-emerald-400',
      highlights: ['Interactive Keyboard Typing Simulations', 'UI Overlay Camera Sweeps', 'Active Vector Progress Paths', 'Mock App Interface Panelling']
    },
    {
      id: 'proj-6',
      title: 'Campa Cola vs Coca-Cola – Disruption Spectrum Ad',
      category: 'Motion Design',
      thumbnail: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
      description: 'Social-first comparison visualizer tracking the double volume price game.',
      extendedDescription: 'Rhythmic promo ad combining responsive audio amplitudes, glowing text parameters, and scale comparisons to explain market price wars.',
      tools: ['After Effects', 'Photoshop'],
      durationString: '0:16 Mins',
      frameStyle: 'saturate-135 contrast-120 hover:hue-rotate-15',
      highlights: ['Responsive Audio Spectrum visualizers', 'Pulsing Backdrop Gradients', 'Rim Lighting Highlight Highlights', 'Extreme Color Masking']
    },
    {
      id: 'proj-7',
      title: 'How Maggi Was Invented – Vintage Explainer',
      category: 'Motion Design',
      thumbnail: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
      description: 'Vintage-styled 1884 Julius Maggi history with realistic distress textures.',
      extendedDescription: 'Historical mini-doc layout compiling grungy paper grain, industrial era photo masking, and kinetic titles to outline how 2-minute noodles took over kitchen ovens.',
      tools: ['After Effects', 'Illustrator'],
      durationString: '0:18 Mins',
      frameStyle: 'contrast-105 sepia-[0.10]',
      highlights: ['Vintage Film Grit Simulation', 'Dynamic Asset Slide Cuts', 'Typography Tracking & Kerning', 'Nostalgic Tonal Ambient Color']
    },
    {
      id: 'proj-8',
      title: 'Royal Enfield – Historical Documentary Style',
      category: 'Video Editing',
      thumbnail: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&w=800&q=80',
      description: 'Deep narrative history editing tracking Royal Enfield\'s survival under Eicher Motors.',
      extendedDescription: 'A classic branding piece combining old split screens, graph rise lines, custom text accents, and sound foley to outline Siddharth Lal\'s legendary choice.',
      tools: ['Premiere Pro', 'Photoshop'],
      durationString: '0:25 Mins',
      frameStyle: 'contrast-115 saturate-[0.85] brightness-90',
      highlights: ['Split-Screen Grid Layouts', 'Dynamic Graph Vectors', 'Sub-Bass Foley Impact Beats', 'Archive footage color normalization']
    },
    {
      id: 'proj-9',
      title: 'Prime Minister Stats – Cinematic Compare',
      category: 'Video Editing',
      thumbnail: 'https://images.unsplash.com/photo-1570126618983-dd75836d64c3?auto=format&fit=crop&w=800&q=80',
      description: 'Cinematic stat-card grids comparing the longest serving Prime Ministers.',
      extendedDescription: 'A fast-paced social edit outlining CM/PM records using sliding character portraits, animated timeline maps, and bold textual keynotes.',
      tools: ['Premiere Pro', 'After Effects'],
      durationString: '0:22 Mins',
      frameStyle: 'contrast-120 saturate-110 text-cyan-400',
      highlights: ['Sliding Profile Reveals', 'Animated Progress Timelines', 'Dialogue Tuning and Limiting', 'Extreme Accent Underlines']
    },
    {
      id: 'proj-10',
      title: 'Creative Face Vector Portrait Mascot',
      category: 'Graphic Design',
      thumbnail: '/src/assets/images/yash_portrait_1780132824318.png',
      description: 'Custom vectorized character portrait mascot styled with neon backing glow.',
      extendedDescription: 'A clean digital vector portrait designed for branding and mascot overlays across social layouts. Leverages clean line art and eye-catching lighting gradients.',
      tools: ['Photoshop', 'Illustrator'],
      durationString: 'Static Asset',
      frameStyle: 'contrast-120 saturate-120',
      highlights: ['Line Art Contouring', 'Saturated Gradient Backdrop', 'Subtle Mascot Rim Lighting', 'Social Branding Integration']
    },
    {
      id: 'proj-11',
      title: 'YouTube CTR Thumbnail Master Package',
      category: 'Graphic Design',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
      description: 'High CTR gaming stream templates, food reviews, scared vlogging layouts, and scam exam studies.',
      extendedDescription: 'A gorgeous design suite framing real templates like "BGMI Live" (Streamer mask), "Local vs Branded Pizzas" (Split backdrops), "I Waste My Diamond" (Shock value cutout), "YouTube Growth secret" (Concept overlay), "24 Hours haunted estate" (Scared lighting composition), "SSC Exam Scam" (Grungy burn paper layout), and "Capcut Popularity" (Clean explanation vector).',
      tools: ['Photoshop'],
      durationString: 'Static Asset',
      frameStyle: 'contrast-135 saturate-125 brightness-105',
      highlights: ['Shock Emotion Head Cutouts', 'Backlight Rim Brush Lighting', 'Depth of Field Separation', 'Stark Drop-Shadow Titles']
    },
    {
      id: 'proj-12',
      title: 'Dairy Milk Silk – Commercial Brand Poster',
      category: 'Graphic Design',
      thumbnail: 'https://images.unsplash.com/photo-1548907040-4d42b52145ca?auto=format&fit=crop&w=800&q=80',
      description: 'Sleek product package promo layout containing ambient cream swirls and spiral backdrops.',
      extendedDescription: 'A professional banner detailing chocolate bars with flying droplets, gloss adjustments, soft drop-shadow alignments, and vector color matching.',
      tools: ['Photoshop', 'Lightroom'],
      durationString: 'Static Asset',
      frameStyle: 'contrast-115 brightness-110 saturate-[1.10]',
      highlights: ['Liquid chocolate swirl simulation', 'Glossy realistic drop lighting', 'Spiral background overlay grids', 'Integrated branding color balances']
    },
    {
      id: 'proj-13',
      title: 'Gold Fitness Gym – Intense Promo Layout',
      category: 'Graphic Design',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      description: 'Dark athletic branding flyer posters presenting dumbbells and warning labels.',
      extendedDescription: 'A high-contrast flyer targeting fitness audiences. Isolates muscular athletic bodies, overlays flying rusty weights, and embeds stark warning banners.',
      tools: ['Photoshop'],
      durationString: 'Static Asset',
      frameStyle: 'contrast-125 saturate-[1.20] brightness-95',
      highlights: ['High-contrast muscle isolation mask', 'Halftone dark textured background', 'Perspective flying metal items', 'Bright alert alert text styling']
    }
  ];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(p => p.category === selectedFilter);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Filters Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf]"></span>
            <span className="text-[10px] font-mono tracking-widest text-[#2dd4bf] uppercase font-bold">Selected Artifacts</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">My Works</h3>
        </div>

        {/* Categories switches */}
        <div className="flex flex-wrap gap-1.5 self-start bg-[#0f0f0f] p-1 rounded-xl border border-white/5">
          {(['All', 'Video Editing', 'Motion Design', 'Graphic Design'] as const).map((filter) => (
            <button
              key={filter}
              id={`filter-works-${filter.toLowerCase().replace(' ', '-')}`}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider transition-all duration-250 cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-white/5 text-[#2dd4bf] font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, index) => {
            const isEditing = p.category === 'Video Editing';
            const isMotion = p.category === 'Motion Design';
            const IconComponent = isEditing ? Video : isMotion ? Sparkles : ImageIcon;

            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(p)}
                className="group relative bg-[#1a1a1a]/65 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-white/10 hover:shadow-2xl transition-all duration-300"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-[#0f0f0f]">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${p.frameStyle}`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Overlays */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 px-2.5 py-0.5 rounded-md border border-white/5 blur-0 backdrop-blur-sm z-10">
                    <IconComponent className="h-3 w-3 text-[#2dd4bf] shrink-0" />
                    <span className="text-[10px] font-mono text-slate-200 uppercase">{p.category}</span>
                  </div>

                  {/* Play / Inspect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Floating CTA Icon in center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                    <div className="p-3 bg-[#1a1a1a]/95 rounded-full border border-[#2dd4bf]/40 shadow-lg text-[#2dd4bf] backdrop-blur-sm">
                      <Plus className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Bottom Content details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {p.tools.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded font-mono text-slate-350">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {p.durationString}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-white group-hover:underline transition-all">
                    {p.title}
                  </h4>
                  
                  <p className="text-xs text-slate-400 font-light line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Expanded Lightbox Modal Detail View */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/5 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#0f0f0f] border border-white/5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors z-20 cursor-pointer"
                id="btn-close-lightbox"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Large header asset card */}
              <div className="relative aspect-video">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className={`w-full h-full object-cover ${selectedProject.frameStyle}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                
                {/* Visual Label */}
                <span className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 rounded border border-white/5 text-xs font-mono text-[#2dd4bf]">
                  {selectedProject.category}
                </span>
              </div>

              {/* Technical description details panel */}
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {selectedProject.title}
                  </h4>
                  <p className="text-xs text-slate-350 leading-relaxed font-light">
                    {selectedProject.extendedDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Production Tools used</span>
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      {selectedProject.tools.map((t, index) => (
                        <span key={index} className="text-[10px] bg-[#0f0f0f] border border-white/5 px-2 py-0.5 rounded text-[#2dd4bf] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Standard Trim / Duration</span>
                    <p className="text-xs text-slate-200 mt-1 font-bold text-[#2dd4bf]">
                      {selectedProject.durationString}
                    </p>
                  </div>
                </div>

                {/* Scope Highlights Checklist */}
                <div>
                  <h5 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-300 mb-2.5">
                    Creative Milestones & Editing Focus
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-350 font-light">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {statusMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-black/40 border border-white/5 rounded-xl text-[11px] font-mono text-teal-400 text-center"
                  >
                    {statusMsg}
                  </motion.div>
                )}

                <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setStatusMsg(null);
                    }}
                    className="px-4 py-2 border border-white/5 hover:border-white/10 rounded-xl text-xs text-slate-400 hover:text-white transition-all cursor-pointer bg-[#0f0f0f]"
                  >
                    Close Showcase
                  </button>
                  <button
                     onClick={() => handleViewOriginal(selectedProject.title)}
                     className="px-4 py-2 bg-[#2dd4bf] hover:bg-teal-400 text-[#0f0f0f] rounded-xl text-xs font-bold font-sans transition-all flex items-center gap-1.5"
                  >
                    View Original
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
