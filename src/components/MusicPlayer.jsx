import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const synthTimerRef = useRef(null);

  // Fallback procedural soft romantic audio synthesizer using Web Audio API
  const startSynthMusic = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Gentle romantic chord sequence frequencies: C4, G4, A4, F4, E4
      const notes = [
        [261.63, 329.63, 392.00], // C major
        [220.00, 261.63, 329.63], // A minor
        [174.61, 220.00, 261.63], // F major
        [196.00, 246.94, 293.66]  // G major
      ];
      let step = 0;

      const playChord = () => {
        if (!synthCtxRef.current || synthCtxRef.current.state !== 'running') return;
        const currentChord = notes[step % notes.length];
        step++;

        currentChord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 4);
        });
      };

      playChord();
      synthTimerRef.current = setInterval(playChord, 3500);
      setUsingFallback(true);
    } catch (e) {
      console.warn("Synth fallback unavailable:", e);
    }
  };

  const stopSynthMusic = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state === 'running') {
      synthCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      stopSynthMusic();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setUsingFallback(false);
      }).catch((err) => {
        console.log("Audio file play failed or missing, starting gentle ambient fallback:", err);
        startSynthMusic();
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
    }
    if (synthCtxRef.current) {
      if (!isMuted) {
        stopSynthMusic();
      } else if (isPlaying && usingFallback) {
        startSynthMusic();
      }
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    return () => {
      stopSynthMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src="/music/our-song.mp3"
        loop
        preload="auto"
        onError={() => {
          console.log("Custom MP3 /music/our-song.mp3 not found. Will use procedural audio synth on play.");
        }}
      />

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
