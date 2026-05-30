import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, Youtube, MapPin, 
  Sparkles, Video, ArrowUpRight, Flame, Download, Compass, 
  Tv, Code, LayoutList, Mail, Users, AppWindow, Star, 
  MessageSquare, ChevronRight, CheckCircle2, ChevronDown
} from 'lucide-react';

import Header from './components/Header';
import SkillsPanel from './components/SkillsPanel';
import InteractiveConsole from './components/InteractiveConsole';
import WorksGallery from './components/WorksGallery';
import ContactForm from './components/ContactForm';
import { playClickSound, playTickSound } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [viewMode, setViewMode] = useState<'mockup' | 'full'>('mockup');
  const [activeTab, setActiveTab] = useState<'works' | 'console'>('works');

  // Portrait photo from our generated image asset
  const portraitPhoto = '/src/assets/images/yash_portrait_1780132824318.png';

  // Section Observer for active scroll updates
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'works', 'services', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    alert("Synthesizing Yash Chaurasiya's creative portfolio CV. Dynamic PDF layout download launched!");
  };

  return (
    <div className={`min-h-screen bg-[#0f0f0f] transition-all duration-300 relative ${viewMode === 'mockup' ? 'py-8 px-4 sm:px-6 md:py-16 md:px-12' : ''}`}>
      
      {/* Viewport Control Panel Bar (Floating) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1a1a1a]/95 border border-white/10 p-1.5 rounded-full shadow-2xl backdrop-blur-md">
        <button
          onClick={() => { playClickSound(); setViewMode('mockup'); }}
          id="btn-toggle-view-mockup"
          className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 ${
            viewMode === 'mockup' 
              ? 'bg-[#2dd4bf] text-[#0f0f0f] font-bold' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <AppWindow className="h-3 w-3" />
          <span>MOCKUP PREVIEW</span>
        </button>
        <button
          onClick={() => { playClickSound(); setViewMode('full'); }}
          id="btn-toggle-view-full"
          className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 ${
            viewMode === 'full' 
              ? 'bg-[#2dd4bf] text-[#0f0f0f] font-bold' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Star className="h-3 w-3" />
          <span>FULL WEBSITE</span>
        </button>
      </div>

      {/* Main presentation frame */}
      <div 
        className={`transition-all duration-500 ${
          viewMode === 'mockup' 
            ? 'max-w-6xl mx-auto bg-[#1a1a1a] border border-white/5 rounded-[48px] shadow-[0_30px_100px_rgba(0,0,0,0.85)] relative overflow-hidden' 
            : 'w-full bg-[#1a1a1a]'
        }`}
      >
        {/* Mock Bezel top indicator (Only in Mockup Mode) */}
        {viewMode === 'mockup' && (
          <div className="bg-[#1a1a1a] px-6 py-2.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-[#2dd4bf]/80"></span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 bg-[#0f0f0f] px-5 py-0.5 rounded-md border border-white/5">
              https://yash-chaurasiya.work/portfolio
            </div>
            <span className="text-[10px] font-mono text-[#2dd4bf] font-bold">
              REV_2026
            </span>
          </div>
        )}

        {/* Responsive Navbar Header */}
        <Header 
          onContactClick={() => handleScrollToSection('contact')} 
          activeSection={activeSection} 
        />

        {/* Hero Section Container */}
        <section 
          id="home" 
          className="pt-24 sm:pt-32 pb-16 px-6 sm:px-12 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Lighting Background glows */}
          <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-[#2dd4bf]/5 filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#2dd4bf]/5 filter blur-[120px] pointer-events-none" />

          {/* Left Column intro (LHS: 7 rows) */}
          <div className="md:col-span-7 space-y-6 relative z-10">
            
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf] animate-ping"></span>
              <span className="text-xs uppercase tracking-widest font-mono text-slate-400 font-semibold">
                Available for remote booking / campaigns
              </span>
            </div>

            {/* Custom Heading exactly as requested in detail customization */}
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-bold font-sans text-slate-300 block">
                Hi, There!
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                I'm <span className="text-white font-extrabold">YASH</span>{' '}
                <span className="text-[#2dd4bf]">CHAURASIYA</span>
              </h1>
            </div>

            {/* Job Title / Descriptor precisely modified as requested */}
            <div className="flex items-center flex-wrap gap-2 py-1 font-mono text-[10px] md:text-xs">
              <span className="px-2.5 py-1 rounded bg-[#2dd4bf]/15 text-[#2dd4bf] font-semibold tracking-wider">
                VIDEO EDITOR
              </span>
              <span className="text-slate-600 font-bold">|</span>
              <span className="px-2.5 py-1 rounded bg-[#0f0f0f] border border-white/5 text-slate-350 font-semibold tracking-wider">
                MOTION DESIGNER
              </span>
              <span className="text-slate-600 font-bold">|</span>
              <span className="px-2.5 py-1 rounded bg-[#0f0f0f] border border-white/5 text-slate-350 font-semibold tracking-wider">
                GRAPHICS DESIGNER
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-xl">
              I am a 22-year-old creative creator who stepped into the world of editing and design in mid-2025. Since then, it has been an intense and rewarding journey of growth. Today, I work at a strong intermediate level—well past the basics and consistently moving toward full professional mastery. My expertise lies in crafting engaging stories and visuals through Video Editing, Motion Graphics, Poster Making, and Eye-Catching Thumbnail Design. Armed with a solid grip on Premiere Pro, After Effects, and Photoshop, I am currently dedicated to daily practice and refining my craft. I bridge the gap between imagination and reality, always pushing my creative boundaries to deliver high-quality content that stands out.
            </p>

            {/* Social Grid matching the layout perfectly */}
            <div className="flex items-center gap-4">
              {[
                { 
                  icon: (props: any) => <Youtube {...props} />, 
                  url: 'https://youtube.com', 
                  label: 'Youtube channel' 
                },
                { 
                  icon: (props: any) => <Instagram {...props} />, 
                  url: 'https://instagram.com', 
                  label: 'Instagram page' 
                },
                { 
                  icon: (props: any) => (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ), 
                  url: 'https://facebook.com', 
                  label: 'Facebook page' 
                },
                { 
                  icon: (props: any) => (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5c-1.5 0-3-1-3-2.5 0-1.2.8-2 2-2h1v1c0 1.2-.8 2-2 2-.5 0-1-.3-1-.8 0-.6.4-1.2 1-1.2h.5V11h-.5c-1.5 0-2.5.8-2.5 2 0 1.5 1.5 2.5 3 2.5.8 0 1.5-.3 2-.8v.8c0 .5-.5.8-1 .8zm2.5-3.5h-1v-1c0-.5.5-.8 1-.8s1 .3 1 .8a1 1 0 0 1-1 1.2z" />
                    </svg>
                  ), 
                  url: 'https://threads.net', 
                  label: 'Threads network' 
                },
                { 
                  icon: (props: any) => (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768" />
                      <path d="M20 4l-6.768 6.768" />
                    </svg>
                  ), 
                  url: 'https://x.com', 
                  label: 'X (Twitter) profile' 
                }
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClickSound()}
                    className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/2 text-slate-400 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/40 bg-[rgba(255,255,255,0.02)] transition-all duration-200"
                    title={soc.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => { playClickSound(); handleScrollToSection('contact'); }}
                id="btn-hero-hire"
                className="px-6 py-3 rounded-xl bg-[#2dd4bf] hover:bg-teal-400 text-[#0f0f0f] font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-[#2dd4bf]/20 active:scale-98"
              >
                Hire me
              </button>
              <button
                onClick={() => { playTickSound(); handleDownloadCV(); }}
                id="btn-hero-cv"
                className="px-6 py-3 rounded-xl border border-white/5 hover:border-white/10 bg-[#0f0f0f] text-slate-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
              >
                <Download className="h-4 w-4 text-[#2dd4bf]" />
                Download CV
              </button>
            </div>
          </div>

          {/* Right Column Portrait matching the layout (RHS: 5 rows) */}
          <div className="md:col-span-5 relative flex justify-center z-10 mt-8 md:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-full md:h-auto md:aspect-square max-w-[340px] rounded-[1.5rem] overflow-hidden group border border-white/5 hover:border-[#2dd4bf]/40 transition-all duration-500 p-2.5 bg-[#0f0f0f]">
              
              {/* Backlight Ambient Glow panel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2dd4bf]/10 via-[#0f0f0f] to-[#0f0f0f] z-0" />

              {/* Portrait Image with no-referrer constraint */}
              <div className="relative w-full h-full rounded-[1rem] overflow-hidden bg-[#1a1a1a] aspect-square animate-none">
                <img
                  src={portraitPhoto}
                  alt="Yash Chaurasiya Close Up Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 object-center"
                  onError={(e) => {
                    // Fallback visual in case path does not mount instantly
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const div = document.createElement('div');
                      div.className = 'absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-teal-950/20 to-[#0f0f0f] flex flex-col items-center justify-center text-center p-6';
                      div.innerHTML = `
                        <div class="p-3 bg-[#2dd4bf]/10 rounded-full text-[#2dd4bf] mb-2 border border-[#2dd4bf]/20">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        </div>
                        <h4 class="text-sm font-bold text-white font-sans">YASH CHAURASIYA</h4>
                        <p class="text-[10px] text-slate-400 font-mono mt-1 uppercase">Creative Video Suite Active</p>
                      `;
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              {/* Glowing overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Badge representing India origin studio */}
              <div className="absolute bottom-4 left-4 bg-[#0f0f0f]/90 border border-white/5 px-3 py-1 rounded-lg text-[10px] font-mono text-slate-200 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#2dd4bf]" />
                <span>CITY UP, INDIA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Adobe Skills Panel Core Indicator block */}
        <section id="skills" className="py-12 px-6 sm:px-12 md:px-16 border-t border-white/5">
          <SkillsPanel />
        </section>

        {/* Dynamic Studio Segment: Works Toggle & Workbench */}
        <section id="works" className="py-16 px-6 sm:px-12 md:px-16 border-t border-white/5 space-y-10">
          
          {/* Module Toolbar Selector */}
          <div className="flex items-center justify-center">
            <div className="flex bg-[#0f0f0f] p-1 rounded-xl border border-white/5">
              <button
                onClick={() => { playClickSound(); setActiveTab('works'); }}
                id="btn-active-works"
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === 'works' 
                    ? 'bg-[#2dd4bf] text-[#0f0f0f] font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span>PORTFOLIO GALLERIES</span>
              </button>
              <button
                onClick={() => { playClickSound(); setActiveTab('console'); }}
                id="btn-active-workbench"
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === 'console' 
                    ? 'bg-[#2dd4bf] text-[#0f0f0f] font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tv className="h-3.5 w-3.5" />
                <span>INTERACTIVE WORKBENCH</span>
              </button>
            </div>
          </div>

          {/* Module Body Content Render */}
          <AnimatePresence mode="wait">
            {activeTab === 'works' ? (
              <motion.div
                key="tab-works"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <WorksGallery />
              </motion.div>
            ) : (
              <motion.div
                key="tab-console"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <InteractiveConsole />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section: Services list */}
        <section id="services" className="py-16 px-6 sm:px-12 md:px-16 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf]"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#2dd4bf] uppercase font-bold">Scope of hire</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Services Offered</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Video Editing',
                desc: 'Full cinematic production: multi-cam sync, pacing, audio dialogues cleanup, deep color grades, and optimized timelines for YouTube, Instagram & Promo ads.',
                tools: 'Adobe Premiere Pro',
                highlights: ['Audio transitions sync', 'Multi-ratio delivery', 'Lumetri LUT color sets']
              },
              {
                title: 'Motion Graphics',
                desc: 'Kinetic intros, HUD title graphics, fluid UI animations, logo reveals, and custom animations optimized for dynamic presentation decks.',
                tools: 'Adobe After Effects',
                highlights: ['Eased custom keyframe curves', 'Alfa format transparent loops', 'Custom motion tracking and tracking loops']
              },
              {
                title: 'Thumbnail and Poster',
                desc: 'Eye-catching layouts optimized for visibility: custom character depth masking, backlight glow structures, and geometric fonts.',
                tools: 'Adobe Photoshop',
                highlights: ['Backlight rim lighting brush', 'Denoised assets compositing', 'Custom canvas crop schemes']
              }
            ].map((srv, idx) => (
              <div key={idx} className="bg-[#0f0f0f]/60 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="pb-3 border-b border-white/5 flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-[#2dd4bf]">
                      MODULE_0{idx + 1}
                    </span>
                    <Sparkles className="h-4.5 w-4.5 text-slate-550 group-hover:text-[#2dd4bf] transition-colors" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-white">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {srv.desc}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400">
                    Tools: <span className="text-slate-300 font-medium">{srv.tools}</span>
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 space-y-2">
                  {srv.highlights.map((hlt, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-350">
                      <span className="h-1 w-1 bg-[#2dd4bf] rounded-full shrink-0" />
                      <span>{hlt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Contact Booking planner */}
        <section id="contact" className="py-16 px-6 sm:px-12 md:px-16 border-t border-white/5">
          <ContactForm />
        </section>

        {/* Bottom Footer block precisely matched to copyright details */}
        <footer className="bg-[#1a1a1a]/40 border-t border-white/5 px-6 sm:px-12 md:px-16 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-slate-400 relative">
          
          <div className="space-y-1">
            <span className="font-bold text-slate-200 uppercase tracking-widest text-[11px] block text-[#2dd4bf]">
              YASH CHAURASIYA
            </span>
            <p className="font-light">
              Copyright © 2026 – Made by Yash Chaurasiya
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <a href="#home" className="hover:text-white transition-colors">Return Top</a>
            <span>•</span>
            <a href="#works" className="hover:text-white transition-colors">Showcases</a>
            <span>•</span>
            <a href="#skills" className="hover:text-white transition-colors">Ecosystem</a>
          </div>

          {/* Glowing Animated/Floating Fire 🔥 emoji overlay exactly at the lower-right side of container as in image_2.png */}
          {viewMode === 'mockup' && (
            <div className="absolute right-[-10px] bottom-[30px] sm:bottom-[30px] sm:right-[-12px] z-30">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.05, 1],
                  rotate: [0, 4, -4, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="p-2 sm:p-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-sm relative cursor-pointer group"
                title="Yash Creative Fire 🔥"
                onClick={() => alert("Keep the artistic fire burning! Yash is available for high-octane visual edits!")}
              >
                <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_#f59e0b]" />
                <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 bg-slate-950 font-mono text-[9px] text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  EDIT_FIRE ON
                </span>
              </motion.div>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
