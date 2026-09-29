import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground';
import CustomCursor from '../components/CustomCursor';
import MusicPlayer from '../components/MusicPlayer';
import InitialLoader from '../components/InitialLoader';
import VideoReveal from '../components/VideoReveal';
import Hero from '../components/Hero';
import StoryIntro from '../components/StoryIntro';
import FromStranger from '../components/FromStranger';
import Timeline from '../components/Timeline';
import Memories from '../components/Memories';
import LoveReasons from '../components/LoveReasons';
import UniverseSection from '../components/UniverseSection';
import Footer from '../components/Footer';

export default function Home() {
  // Stage Flow: "locked" (Password Screen) -> "video" (Fullscreen Intro) -> "website" (Birthday Site)
  const [stage, setStage] = useState('locked');
  const audioRef = useRef(null);
  const audioTimerRef = useRef(null);

  // Called synchronously during password unlock user gesture: starts audio MUTED
  const handleStartAudioMuted = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.volume = 1;
      audio.loop = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Background audio start failed:", err);
        });
      }
    }
  };

  // Called when video finishes or is skipped: holds 5 seconds, then unmutes and plays audio
  const handleVideoComplete = () => {
    setStage('website');

    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    audioTimerRef.current = setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.muted = false;
        audio.volume = 1;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("5-second delayed audio play failed:", err);
          });
        }
      }
    }, 5000);
  };

  // Clean up timer and audio on unmount
  useEffect(() => {
    return () => {
      if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07050b] text-slate-100 overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* Persistent Single Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/song.mp3"
        loop
        preload="auto"
      />

      {/* Background Animated Canvas */}
      <ParticlesBackground />

      {/* Desktop Custom Trailing Cursor */}
      <CustomCursor />

      {/* Stage 1: Password Gate & Stage 2: Video Intro Reveal */}
      <AnimatePresence mode="wait">
        {stage === 'locked' && (
          <InitialLoader
            key="loader"
            onUnlock={handleStartAudioMuted}
            onComplete={() => setStage('video')}
          />
        )}

        {stage === 'video' && (
          <VideoReveal
            key="video"
            onComplete={handleVideoComplete}
          />
        )}
      </AnimatePresence>

      {/* Stage 3: Main Birthday Website Content */}
      {stage === 'website' && (
        <>
          {/* Floating Music Player Control */}
          <MusicPlayer audioRef={audioRef} />

          {/* Story Flow Sections */}
          <main className="relative z-10">
            <Hero />
            <StoryIntro />
            <FromStranger />
            <Timeline />
            <Memories />
            <LoveReasons />
            <UniverseSection />
          </main>

          {/* Footer Signature */}
          <Footer />
        </>
      )}
    </div>
  );
}
