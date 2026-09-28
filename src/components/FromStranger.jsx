import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function FromStranger() {
  const { fromStranger } = loveConfig;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center overflow-hidden z-10">
      {/* Background Radial Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-rose-900/30 via-pink-900/20 to-purple-950/30 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-12">
        {/* Step 1: At first... */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="space-y-2"
        >
          <span className="text-xs sm:text-sm font-cinzel text-rose-400 tracking-widest uppercase font-semibold">
            {fromStranger.step1}
          </span>
          <p className="text-xl sm:text-3xl text-slate-300 font-light">
            "{fromStranger.step1Sub}"
          </p>
        </motion.div>

        {/* Step 2: Then... */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-2"
        >
          <span className="text-xs sm:text-sm font-cinzel text-pink-400 tracking-widest uppercase font-semibold">
            {fromStranger.step2}
          </span>
          <p className="text-xl sm:text-3xl text-slate-200 font-light">
            "{fromStranger.step2Sub}"
          </p>
        </motion.div>

        {/* Step 3: Then... */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="space-y-2"
        >
          <span className="text-xs sm:text-sm font-cinzel text-purple-400 tracking-widest uppercase font-semibold">
            {fromStranger.step3}
          </span>
          <p className="text-xl sm:text-3xl text-rose-200 font-serif-romantic italic font-medium">
            "{fromStranger.step3Sub}"
          </p>
        </motion.div>

        {/* Step 4: Somewhere along the way... */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-slate-400 font-light text-base sm:text-xl italic"
        >
          {fromStranger.step4}
        </motion.div>

        {/* Highlight climax: YOU BECAME MY GUGU ❤️ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: 0.8, type: 'spring', damping: 20 }}
          className="relative mt-4 p-8 sm:p-12 rounded-3xl glass-panel border border-rose-500/40 shadow-[0_0_60px_rgba(225,29,72,0.3)] bg-[#12081c]/80 backdrop-blur-xl max-w-3xl w-full"
        >
          {/* Floating Heart Particles around Gugu */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2, y: 60 }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  y: [-20, -120],
                  x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 80 + 20)
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="absolute text-rose-500/70"
                style={{
                  left: `${(i + 1) * 7.5}%`,
                  bottom: '10%'
                }}
              >
                <Heart className="w-5 h-5 fill-rose-500" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <Sparkles className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              YOU BECAME MY{' '}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-600 bg-clip-text text-transparent font-serif-romantic italic">
                GUGU
              </span>{' '}
              <span className="inline-block text-rose-500">❤️</span>
            </h2>
            <p className="text-rose-200/90 text-sm sm:text-base font-light tracking-widest uppercase mt-2">
              The moment everything changed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
