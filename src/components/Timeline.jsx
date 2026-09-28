import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function Timeline() {
  const { timeline } = loveConfig;

  return (
    <section id="timeline" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 z-10">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 font-cinzel text-xs tracking-widest uppercase">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <span>Our Story Arc</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
            Our Little <span className="text-rose-400 font-serif-romantic italic">Timeline</span>
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-xl">
            Every step that brought us from a single Instagram message to here.
          </p>
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-0">
          {/* Central Glowing Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/20 via-pink-500/60 to-purple-500/20 shadow-[0_0_15px_rgba(244,114,182,0.4)]" />

          <div className="space-y-12 sm:space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-1.5 z-20 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                      className="w-8 h-8 rounded-full bg-[#0d0716] border-2 border-rose-400 flex items-center justify-center shadow-[0_0_20px_#e11d48]"
                    >
                      <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40" />
                    </motion.div>
                  </div>

                  {/* Content Box */}
                  <div
                    className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                      isEven ? 'sm:pr-12 text-left sm:text-right' : 'sm:pl-12 text-left'
                    }`}
                  >
                    <div className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group">
                      <div className="flex items-center gap-2 mb-2 font-cinzel text-xs font-bold tracking-widest text-rose-300 uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                        <span>{item.year}</span>
                      </div>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
