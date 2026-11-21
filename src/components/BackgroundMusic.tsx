"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const userPausedRef = useRef(false);

  const musicSrc = weddingConfig.media?.musicSrc || "/music/music.mp3";
  const { couple } = weddingConfig;

  // Unmute & play with full sound
  const playWithSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;

    audio.muted = false;
    audio.volume = 0.8;

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {
          // If unmuted playback is blocked without user gesture
          // Start playing muted so it streams, and prompt user
          audio.muted = true;
          audio.play().catch(() => {});
          setIsPlaying(false);
          setNeedsGesture(true);
        });
    }
  }, []);

  // Explicit user pause
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Toggle button clicked
  const togglePlay = () => {
    if (isPlaying) {
      userPausedRef.current = true;
      pauseAudio();
    } else {
      userPausedRef.current = false;
      playWithSound();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Attempt to play with sound immediately when website opens
    playWithSound();

    // 2. Global gesture unlock: ANY first click, tap, pointerdown, or touch on the website
    // immediately unmutes and starts audio automatically!
    const handleUserGesture = () => {
      if (!userPausedRef.current) {
        const el = audioRef.current;
        if (el) {
          el.muted = false;
          el.volume = 0.8;
          el.play()
            .then(() => {
              setIsPlaying(true);
              setNeedsGesture(false);
            })
            .catch(() => {});
        }
      }
    };

    const gestureEvents = [
      "click",
      "touchstart",
      "touchend",
      "pointerdown",
      "mousedown",
      "keydown",
    ];

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
      document.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
    });

    // 3. Resume when user returns to tab
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !userPausedRef.current) {
        audioRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture, true);
        document.removeEventListener(evt, handleUserGesture, true);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [playWithSound]);

  return (
    <>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={musicSrc}
        autoPlay
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          if (userPausedRef.current) {
            setIsPlaying(false);
          }
        }}
      />

      {/* TOP INVITATION SOUND PROMPT (Displays only if browser strictly blocks initial silent sound) */}
      <AnimatePresence>
        {needsGesture && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={togglePlay}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] cursor-pointer"
          >
            <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#4A0E2E] via-[#5D123A] to-[#4A0E2E] text-[#FDE68A] border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(0,0,0,0.5)] animate-bounce">
              <Music className="w-4 h-4 animate-spin" />
              <span className="font-serif text-xs font-bold uppercase tracking-wider">
                Tap anywhere to play wedding music 🎶
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING 3D LUXURY MUSIC CONTROLLER */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-5 right-5 z-50 select-none"
      >
        <button
          onClick={togglePlay}
          className={`group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-xl border shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer active:scale-95 ${
            isPlaying
              ? "bg-gradient-to-r from-[#3B0A24]/95 via-[#4A0E2E]/95 to-[#2B0B1D]/95 border-[#FDE68A] text-[#FDE68A]"
              : "bg-white/90 hover:bg-white border-[#D4AF37]/50 text-[#4A0E2E]"
          }`}
          aria-label={isPlaying ? "Mute Background Music" : "Play Wedding Music"}
          title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        >
          {/* Rotating Vinyl Record with Monogram */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className={`w-full h-full rounded-full border-2 flex items-center justify-center shadow-md ${
                isPlaying
                  ? "border-[#FDE68A] bg-gradient-to-tr from-[#1B0511] via-[#4A0E2E] to-[#1B0511]"
                  : "border-[#4A0E2E]/40 bg-[#FDF2F7]"
              }`}
            >
              <span className={`text-[9px] font-serif font-bold ${isPlaying ? "text-[#FDE68A]" : "text-[#4A0E2E]"}`}>
                {couple.initials || "AM"}
              </span>
            </motion.div>

            {/* Center vinyl spindle */}
            <div className={`absolute w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#FDE68A]" : "bg-[#4A0E2E]"}`} />
          </div>

          {/* Status Label */}
          <div className="flex flex-col text-left pr-1">
            <span className="font-serif text-[11px] sm:text-xs font-bold uppercase tracking-wider leading-tight">
              {isPlaying ? "Music Playing" : "Tap for Music"}
            </span>
            <span
              className={`text-[9px] font-cormorant italic tracking-wide leading-tight ${
                isPlaying ? "text-[#FDE68A]/80" : "text-stone-500"
              }`}
            >
              {isPlaying ? "Wedding Song" : "Tap to Play"}
            </span>
          </div>

          {/* Equalizer Wave Animation or Mute Icon */}
          {isPlaying ? (
            <div className="flex items-center gap-0.5 h-3.5 pl-0.5">
              {[0.4, 0.95, 0.65, 1, 0.5].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [0.25, h, 0.2] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + i * 0.12,
                    ease: "easeInOut",
                  }}
                  className="w-0.5 h-full bg-[#FDE68A] rounded-full origin-bottom"
                />
              ))}
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-[#B45309]" />
          )}
        </button>
      </motion.div>
    </>
  );
}
