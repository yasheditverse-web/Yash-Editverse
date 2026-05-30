import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code, Video, LayoutList, Mail, Users, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onContactClick: () => void;
  activeSection: string;
}

export default function Header({ onContactClick, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', icon: Compass },
    { label: 'Skills', href: '#skills', icon: Code },
    { label: 'Works', href: '#works', icon: LayoutList },
    { label: 'Services', href: '#services', icon: Video },
    { label: 'Contact', href: '#contact', icon: Mail }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans ${
          scrolled 
            ? 'bg-[#1a1a1a]/85 border-b border-white/5 backdrop-blur-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Title (Left) */}
          <a h-id="brand-logo" href="#home" className="flex items-center gap-2 group">
            <span className="font-extrabold text-[#ffffff] text-sm tracking-wider uppercase font-sans">
              YASH CHAURASIYA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/30 border border-slate-800/40 p-1.5 rounded-full backdrop-blur-xs">
            {navItems.map((item) => (
              <a
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-xs transition-all tracking-wider ${
                  activeSection === item.label.toLowerCase()
                    ? 'bg-slate-800 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact Me CTA Action buttons (Right) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onContactClick}
              id="btn-header-contact"
              className="px-5 py-2 rounded-xl text-xs font-semibold tracking-wider text-slate-100 hover:text-white border border-[#14b8a6]/40 hover:border-[#2dd4bf] hover:shadow-[0_0_15px_rgba(20,184,166,0.25)] bg-[#14b8a6]/5 hover:bg-[#14b8a6]/20 transition-all duration-300 flex items-center gap-1.5"
            >
              Contact me
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="btn-mobile-menu-toggle"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu slide panel with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-[52px] inset-x-0 bg-[#1a1a1a] border-b border-white/5 shadow-2xl z-40 md:hidden overflow-hidden font-sans"
          >
            <div className="px-5 py-6 flex flex-col gap-5">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                        activeSection === item.label.toLowerCase()
                          ? 'bg-[#14b8a6]/10 text-white font-semibold border-l-2 border-[#14b8a6]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/'
                      }`}
                    >
                      <Icon className="h-4 w-4 text-[#14b8a6]" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <button
                onClick={() => { setIsOpen(false); onContactClick(); }}
                className="w-full py-3.5 rounded-xl text-center bg-gradient-to-r from-teal-500 to-cyan-500 font-bold tracking-wider text-xs text-slate-950 uppercase shadow-lg hover:shadow-teal-500/15 hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
              >
                Contact me
                <ArrowUpRight className="h-4 w-4 text-slate-950" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
