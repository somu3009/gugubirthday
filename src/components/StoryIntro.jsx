import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function StoryIntro() {
  const { storyIntro, metYear } = loveConfig;

  return (
    <section
      id="beginning"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 z-10"
    >
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Story Text Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-6 text-left"
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 font-cinzel text-xs tracking-widest uppercase w-fit shadow-[0_0_15px_rgba(244,114,182,0.15)]">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>{storyIntro.heading}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white leading-tight">
            How It All <span className="text-rose-400 font-serif-romantic italic">Began</span>
          </h2>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            <div className="p-4 rounded-xl glass-panel border-l-4 border-rose-500 space-y-2">
              <p className="font-medium text-rose-200">"{storyIntro.line1}"</p>
              <p className="font-medium text-pink-200">"{storyIntro.line2}"</p>
              <p className="font-medium text-purple-200">"{storyIntro.line3}"</p>
            </div>

            <p>{storyIntro.line4}</p>

            <div className="pt-2">
              <p className="text-slate-200 font-medium">"{storyIntro.line5}"</p>
              <p className="font-serif-romantic text-xl sm:text-2xl text-rose-300 italic font-semibold mt-1">
                "{storyIntro.line6}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Real Instagram Conversation Screenshot Memory Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center w-full"
        >
          {/* Glowing Aura Behind Image Frame */}
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-600/30 via-pink-600/20 to-purple-600/30 rounded-[36px] blur-2xl opacity-70 pointer-events-none" />

          {/* Glass Card Container for Screenshot */}
          <div className="relative w-full max-w-[360px] sm:max-w-[380px] rounded-[32px] glass-panel border border-rose-500/30 p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl bg-[#0e0818]/95 overflow-hidden group">
            {/* Screenshot Header Tag */}
            <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-500 via-rose-500 to-purple-600 p-[1.5px]">
                  <div className="w-full h-full bg-[#0c0814] rounded-full flex items-center justify-center text-[10px] font-bold text-rose-200">
                    G
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white tracking-wide">Instagram DM • {metYear}</p>
                  <p className="text-[10px] text-rose-300/80">Original Memory</p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-rose-400" />
            </div>

            {/* Real Screenshot Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner">
              <img
                src="/images/gugu-chat.jpeg"
                alt="Original Instagram Chat with Gugu"
                className="w-full h-auto max-h-[580px] sm:max-h-[640px] object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Memory Footer Pill */}
            <div className="pt-3 mt-2 border-t border-white/10 text-center">
              <div className="inline-flex items-center gap-1.5 text-[11px] text-rose-300/90 font-medium">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>The first page of our story</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
