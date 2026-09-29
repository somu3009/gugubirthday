import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer({ audioRef, showFallback, setShowFallback }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef?.current;
    if (audio) {
      setIsPlaying(!audio.paused);
      setIsMuted(audio.muted);

      const handlePlay = () => {
        setIsPlaying(true);
        if (setShowFallback) setShowFallback(false);
      };
      const handlePause = () => setIsPlaying(false);
      const handleVolumeChange = () => setIsMuted(audio.muted);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('volumechange', handleVolumeChange);

      if (!audio.paused) {
        setIsPlaying(true);
      }

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('volumechange', handleVolumeChange);
      };
    }
  }, [audioRef, setShowFallback]);

  const togglePlay = () => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 1;
      audio.play().then(() => {
        setIsPlaying(true);
        if (setShowFallback) setShowFallback(false);
      }).catch((err) => {
        console.warn("Play toggle failed:", err);
      });
    }
  };

  const handleFallbackClick = () => {
    const audio = audioRef?.current;
    if (audio) {
      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 1;
      audio.play().then(() => {
        setIsPlaying(true);
        if (setShowFallback) setShowFallback(false);
      }).catch((err) => {
        console.warn("Fallback play failed:", err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const audio = audioRef?.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Autoplay Fallback Prompt (only if browser blocked unmuted autoplay on video end) */}
      <AnimatePresence>
        {showFallback && !isPlaying && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={handleFallbackClick}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-rose-600/90 text-white font-medium text-xs shadow-lg backdrop-blur-md border border-rose-400/40 cursor-pointer hover:bg-rose-500 transition-colors animate-pulse"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Tap to play music 🎵</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Control Button Container */}
      <div className="relative group">
        {/* Glowing Aura when playing */}
        {isPlaying && (
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 rounded-full blur-md opacity-75 animate-pulse" />
        )}

        <div className="relative flex items-center gap-2 glass-panel px-4 py-2.5 rounded-full border border-rose-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Equalizer Visual Animation */}
          {isPlaying && !isMuted && (
            <div className="flex items-end gap-0.5 h-4 w-4 mr-1">
              <motion.span
                className="w-1 bg-rose-400 rounded-full"
                animate={{ height: ['20%', '100%', '40%'] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.span
                className="w-1 bg-purple-400 rounded-full"
                animate={{ height: ['60%', '20%', '90%'] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.span
                className="w-1 bg-pink-400 rounded-full"
                animate={{ height: ['40%', '80%', '30%'] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          )}

          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
            className="flex items-center gap-2 text-rose-200 hover:text-white font-medium text-xs tracking-wider uppercase transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-rose-400" />
            ) : (
              <Play className="w-4 h-4 text-rose-400 fill-rose-400/30" />
            )}
            <span className="hidden sm:inline">
              {isPlaying ? 'Our Song' : 'Play Song'}
            </span>
          </button>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-white/10" />

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="text-rose-300/70 hover:text-rose-200 transition-colors p-1"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
