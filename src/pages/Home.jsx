import React, { useState } from 'react';
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

  return (
    <div className="relative min-h-screen bg-[#07050b] text-slate-100 overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* Background Animated Canvas */}
      <ParticlesBackground />

      {/* Desktop Custom Trailing Cursor */}
      <CustomCursor />

      {/* Stage 1: Password Gate & Stage 2: Video Intro Reveal */}
      <AnimatePresence mode="wait">
        {stage === 'locked' && (
          <InitialLoader key="loader" onComplete={() => setStage('video')} />
        )}

        {stage === 'video' && (
          <VideoReveal key="video" onComplete={() => setStage('website')} />
        )}
      </AnimatePresence>

      {/* Stage 3: Main Birthday Website Content */}
      {stage === 'website' && (
        <>
          {/* Floating Music Player Control */}
          <MusicPlayer />

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
