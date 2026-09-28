import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Birthday', href: '#beginning' },
    { name: 'Memories', href: '#memories' },
    { name: 'Wishes', href: '#reasons' }
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 rounded-full glass-panel px-6 py-3 border border-white/10 flex items-center justify-between w-full max-w-4xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
          scrolled ? 'bg-[#0f0918]/80 border-rose-500/20 backdrop-blur-md' : 'bg-[#0c0814]/40'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand signature */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, '#hero')}
          className="flex items-center gap-2 font-cinzel font-bold text-rose-200 text-sm tracking-widest hover:text-white transition-colors"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>❤️ GUGU</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xs tracking-wider uppercase text-slate-300 hover:text-rose-300 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden text-rose-200 p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed top-20 inset-x-4 glass-panel border border-rose-500/20 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-center md:hidden backdrop-blur-xl bg-[#0d0716]/95 z-50"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="font-cinzel text-xs text-rose-300 tracking-widest uppercase">Navigation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium tracking-wide text-slate-200 hover:text-rose-400 py-2 transition-colors border-b border-white/5 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
