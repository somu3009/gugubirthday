import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Heart } from 'lucide-react';
import loveConfig from '../config/loveConfig';

export default function InitialLoader({ onComplete, onUnlock }) {
  const { passwordGate } = loveConfig;
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const hiddenInputRef = useRef(null);

  // Focus hidden input on mount
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  // Handle PIN submission verification
  const handleVerify = (enteredPin) => {
    const codeToVerify = enteredPin !== undefined ? enteredPin : pin;
    if (codeToVerify === passwordGate.correctPin) {
      setErrorMsg('');
      setIsUnlocked(true);
      if (onUnlock) {
        onUnlock();
      }
      setTimeout(() => {
        onComplete();
      }, 1200);
    } else {
      setErrorMsg(passwordGate.errorMsg);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 600);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(val);
    if (errorMsg) setErrorMsg('');

    // Auto verify when 4 digits entered
    if (val.length === 4) {
      handleVerify(val);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (pin.length === 4) {
        handleVerify(pin);
      } else {
        setErrorMsg(passwordGate.errorMsg);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
      onClick={() => hiddenInputRef.current?.focus()}
      className="fixed inset-0 z-50 bg-[#050308] flex flex-col items-center justify-center p-6 text-center overflow-hidden selection:bg-rose-500/30"
    >
      {/* BACKGROUND EFFECTS: Midnight Purple, Burgundy & Romantic Stars (NO PHOTOS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-rose-950/40 via-purple-900/30 to-pink-950/30 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-pink-950/20 blur-[140px]" />

        {/* Twinkling Stars */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.2) % 3,
              ease: 'easeInOut'
            }}
            style={{
              top: `${(i * 17 + 5) % 95}%`,
              left: `${(i * 23 + 3) % 95}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
            }}
            className="absolute rounded-full bg-rose-200 shadow-[0_0_8px_rgba(254,205,211,0.8)]"
          />
        ))}

        {/* Floating Heart & Sparkle Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.6, 0],
              x: [(i % 2 === 0 ? -15 : 15), (i % 2 === 0 ? 15 : -15)]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear'
            }}
            style={{ left: `${10 + i * 11}%` }}
            className="absolute text-rose-400/40 pointer-events-none"
          >
            {i % 2 === 0 ? (
              <Heart className="w-3.5 h-3.5 fill-rose-400/30" />
            ) : (
              <Sparkles className="w-3 h-3 text-amber-300/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Hidden PIN Input for Keyboard & Mobile Touch */}
      <input
        ref={hiddenInputRef}
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={4}
        value={pin}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        aria-label="Secret Code PIN"
        autoFocus
      />

      {/* MAIN PASSWORD GATE CONTAINER */}
      <div className="relative z-10 max-w-md mx-auto w-full flex flex-col items-center gap-6">

        {/* 1. Animated Lock Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border transition-all duration-500 shadow-lg ${
            isUnlocked
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-300/50 shadow-[0_0_35px_rgba(16,185,129,0.6)]'
              : 'bg-gradient-to-tr from-rose-700/80 via-purple-800/80 to-pink-700/80 border-rose-400/40 shadow-[0_0_35px_rgba(225,29,72,0.5)]'
          }`}>
            {isUnlocked ? (
              <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-bounce" />
            ) : (
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-rose-100" />
            )}
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
        </motion.div>

        {/* 2. Top Romantic Header Lines */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-1.5"
        >
          <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-white tracking-wide">
            {isUnlocked ? passwordGate.welcomeTitle : passwordGate.topLine}
          </h2>
          <p className="font-serif-romantic italic text-rose-300 text-sm sm:text-base font-light">
            {isUnlocked ? passwordGate.welcomeSub : passwordGate.subLine}
          </p>
        </motion.div>

        {/* 3. Glassmorphism Secret Code Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 shadow-[0_20px_50px_rgba(225,29,72,0.25)] bg-[#0f0717]/90 backdrop-blur-xl flex flex-col items-center gap-6"
        >
          <div className="space-y-1 text-center">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              {passwordGate.cardTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              {passwordGate.cardHint}
            </p>
          </div>

          {/* 4-Digit Individual PIN Display Boxes [ _ ] [ _ ] [ _ ] [ _ ] */}
          <motion.div
            animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={() => hiddenInputRef.current?.focus()}
            className="flex items-center justify-center gap-3 sm:gap-4 cursor-pointer my-2"
          >
            {[0, 1, 2, 3].map((idx) => {
              const digit = pin[idx];
              const isFilled = digit !== undefined;
              return (
                <div
                  key={idx}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                    isUnlocked
                      ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.4)] text-emerald-200'
                      : isFilled
                      ? 'border-rose-400 bg-rose-500/20 shadow-[0_0_20px_rgba(244,114,182,0.4)] scale-105 text-white'
                      : errorMsg
                      ? 'border-rose-500/80 bg-rose-950/40 text-rose-300'
                      : 'border-white/20 bg-white/5 text-slate-400 hover:border-rose-400/50'
                  }`}
                >
                  {isFilled ? (
                    <span className="font-cinzel text-2xl sm:text-3xl font-bold">
                      {digit}
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500/40" />
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Error Message Display */}
          <AnimatePresence>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-rose-300 text-xs sm:text-sm font-medium font-serif-romantic italic -mt-2"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* 4. Unlock Button */}
          <button
            onClick={() => handleVerify()}
            className="w-full py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-sm sm:text-base tracking-wide shadow-[0_0_25px_rgba(225,29,72,0.5)] hover:shadow-[0_0_40px_rgba(225,29,72,0.85)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 border border-rose-400/40 cursor-pointer backdrop-blur-md"
          >
            {isUnlocked ? (
              <>
                <Unlock className="w-5 h-5 text-white animate-pulse" />
                <span>Unlocking... ❤️</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                <span>{passwordGate.buttonText}</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
