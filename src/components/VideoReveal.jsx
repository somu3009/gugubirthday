import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

export default function VideoReveal({ onComplete }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;

    // Attempt playing with audio enabled (leveraging the PIN entry user gesture)
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay, fallback to muted + prompt
          video.muted = true;
          setIsMuted(true);
          setShowSoundPrompt(true);
          video.play().catch((err) => console.log('Autoplay error:', err));
        });
    }
  }, []);

  const handleToggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        setShowSoundPrompt(false);
      }
    }
  };

  const handleEnded = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
    }, 500);
  };

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden w-screen h-screen select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/video/gugu-birthday-intro.mp4"
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-contain max-w-full max-h-full pointer-events-auto"
      />

      {/* Subtle Sound Prompt Toast if Unmuted Autoplay Blocked */}
      {showSoundPrompt && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleToggleSound}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-rose-600/90 text-white font-medium text-xs sm:text-sm shadow-lg backdrop-blur-md border border-rose-300/30 flex items-center gap-2 cursor-pointer hover:bg-rose-500 transition-colors"
        >
          <Volume2 className="w-4 h-4 animate-bounce" />
          <span>Tap for sound 🔊</span>
        </motion.button>
      )}

      {/* Minimal Top-Right Volume Control */}
      <button
        onClick={handleToggleSound}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-rose-400" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Minimal Bottom-Right Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-50 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white text-xs font-light tracking-wide backdrop-blur-md border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100"
      >
        <span>Skip</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
