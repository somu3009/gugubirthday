import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, Sparkles, Calendar } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function Hero() {
  const { heroMessage, herName, nickname } = loveConfig;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-12 overflow-hidden text-center"
    >
      {/* Glowing Heart Background Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.65, 0.35]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-rose-600/30 via-pink-600/20 to-purple-800/30 blur-[100px]"
        />
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute opacity-15"
        >
          <Heart className="w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] text-rose-500 fill-rose-500/10 stroke-[0.5]" />
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Date Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-rose-500/30 text-rose-300 font-cinzel text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(244,114,182,0.15)]"
        >
          <Calendar className="w-4 h-4 text-rose-400" />
          <span>{heroMessage.date}</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
        >
          Happy Birthday,{' '}
          <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-rose-500 bg-clip-text text-transparent font-serif-romantic italic font-semibold drop-shadow-[0_0_25px_rgba(244,114,182,0.4)]">
            {nickname}
          </span>{' '}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-rose-500"
          >
            ❤️
          </motion.span>
        </motion.h1>

        {/* Subtitle Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="space-y-3 max-w-2xl text-slate-300 font-light text-base sm:text-xl leading-relaxed"
        >
          <p>{heroMessage.subtitle}</p>
          <p className="text-rose-200/90 font-serif-romantic italic text-lg sm:text-2xl font-medium">
            "{heroMessage.pauseSubtitle}"
          </p>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <p className="text-xs sm:text-sm tracking-widest uppercase text-slate-400 font-medium">
            {heroMessage.scrollPrompt}
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-2 rounded-full glass-panel border border-rose-500/20 text-rose-300"
          >
            <ChevronDown className="w-5 h-5 text-rose-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
