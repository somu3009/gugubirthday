import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function Footer() {
  const { footer, nickname, myName } = loveConfig;

  return (
    <footer className="relative py-16 px-4 z-10 border-t border-rose-500/20 text-center bg-[#06030a]">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
        {/* Heart Icon */}
        <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/30">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
        </div>

        {/* Footer Text */}
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
          {footer.madeWith}
        </h3>

        <div className="flex items-center gap-3 text-sm text-slate-300 font-light">
          <span>{footer.forText}</span>
          <span className="text-rose-400">•</span>
          <span>{footer.fromText}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-rose-300 font-cinzel text-xs tracking-widest mt-2">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>{footer.dateTag}</span>
        </div>
      </div>
    </footer>
  );
}
