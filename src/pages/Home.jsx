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
  const [showFallback, setShowFallback] = useState(false);
  const audioRef = useRef(null);

  // Called when password is submitted: ensures audio stays paused at 0:00
  const handlePasswordUnlock = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 1;
    }
  };

  // Called when birthday video finishes or is skipped: plays audio from EXACTLY 0:00
  const handleVideoEnded = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 1;
      audio.loop = true;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setShowFallback(false);
          })
          .catch((error) => {
            console.warn("Audio autoplay blocked on video end:", error);
            setShowFallback(true);
          });
      }
    }
    setStage('website');
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
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
            onUnlock={handlePasswordUnlock}
            onComplete={() => setStage('video')}
          />
        )}

        {stage === 'video' && (
          <VideoReveal
            key="video"
            onComplete={handleVideoEnded}
          />
        )}
      </AnimatePresence>

      {/* Stage 3: Main Birthday Website Content */}
      {stage === 'website' && (
        <>
          {/* Floating Music Player Control */}
          <MusicPlayer audioRef={audioRef} showFallback={showFallback} setShowFallback={setShowFallback} />

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
