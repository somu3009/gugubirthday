import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Moon, Sparkles } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function UniverseSection() {
  const { universeSection, nickname } = loveConfig;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-28 z-10 text-center overflow-hidden">
      {/* Glowing Moon / Heart Cosmos Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-purple-950/40 via-rose-950/30 to-slate-950 blur-[130px]"
        />
        <div className="absolute top-1/4 opacity-20">
          <Moon className="w-48 h-48 sm:w-80 sm:h-80 text-rose-300 stroke-[0.7]" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 font-cinzel text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(244,114,182,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>{universeSection.heading}</span>
        </motion.div>

        {/* Line by Line Cinematic Reveal */}
        <div className="space-y-6 text-slate-200">
          {universeSection.lines.map((line, index) => {
            const isLast = index === universeSection.lines.length - 1;
            const isSub = line.startsWith('My ') || line.startsWith('And all');

            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                className={
                  isLast
                    ? 'font-cinzel text-2xl sm:text-4xl text-rose-200 font-bold mt-8 p-6 rounded-2xl glass-panel border border-rose-500/40 shadow-[0_0_30px_rgba(225,29,72,0.25)]'
                    : isSub
                    ? 'text-lg sm:text-2xl text-rose-300/90 font-serif-romantic italic font-medium'
                    : 'text-xl sm:text-3xl font-light text-slate-100'
                }
              >
                {line}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
