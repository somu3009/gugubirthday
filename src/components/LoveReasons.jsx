import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Sparkles, Shield, Smile, Sun, Crown, Star } from 'lucide-react';
import loveConfig from '../config/loveConfig';

const iconMap = {
  Heart: Heart,
  Music: Music,
  Sparkles: Sparkles,
  ShieldHeart: Shield,
  Smile: Smile,
  Sun: Sun,
  Crown: Crown
};

export default function LoveReasons() {
  const { thingsILove, thingsILoveHeading, thingsILoveSubheading, nickname } = loveConfig;

  return (
    <section id="reasons" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-28 z-10">
      <div className="max-w-5xl mx-auto w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 font-cinzel text-xs tracking-widest uppercase">
            <Star className="w-3.5 h-3.5 text-rose-400" />
            <span>Birthday Wishes</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
            {thingsILoveHeading}
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg max-w-xl">
            {thingsILoveSubheading}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thingsILove.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Heart;
            const isHighlight = item.highlight;

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass-card glass-card-hover p-6 rounded-3xl relative overflow-hidden flex flex-col text-left justify-between ${
                  isHighlight
                    ? 'md:col-span-2 lg:col-span-3 border-2 border-rose-500/50 bg-gradient-to-r from-rose-950/60 via-purple-950/60 to-pink-950/60 text-center items-center py-10'
                    : ''
                }`}
              >
                {/* Glowing Background Dot */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />

                <div className={isHighlight ? 'flex flex-col items-center gap-3' : 'space-y-3'}>
                  <div className={`p-3 rounded-2xl w-fit ${isHighlight ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-rose-400 border border-white/10'}`}>
                    <IconComponent className={`w-6 h-6 ${isHighlight ? 'w-8 h-8 text-rose-400 animate-pulse' : ''}`} />
                  </div>

                  <h3 className={`font-cinzel font-bold text-white ${isHighlight ? 'text-3xl sm:text-4xl text-rose-200 font-extrabold' : 'text-xl sm:text-2xl'}`}>
                    {item.title}
                  </h3>

                  <p className={`text-slate-300 font-light ${isHighlight ? 'text-lg sm:text-xl font-serif-romantic italic text-rose-100 max-w-lg' : 'text-sm sm:text-base leading-relaxed'}`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
