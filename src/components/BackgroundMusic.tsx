"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Music, Disc } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const musicSrc = weddingConfig.media?.musicSrc || "/music/music.mp3";
  const { couple } = weddingConfig;

  // Start playback safely
  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy; will unlock on first user click/touch
          setIsPlaying(false);
        });
    }
  }, []);

  // Pause playback
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Toggle Play / Pause
  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.75;
    }

    // Attempt immediate autoplay on mount
    startAudio();

    // Browser Autoplay Policy: unlock audio on the very first user interaction
    const handleFirstGesture = () => {
      setHasInteracted(true);
      startAudio();
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("scroll", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, [startAudio]);

  return (
    <>
      {/* Hidden HTML5 Audio Element streaming music.mp3 */}
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="auto"
        playsInline
        onCanPlay={() => setIsLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* FLOATING 3D LUXURY MUSIC CONTROLLER */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-5 right-5 z-50 select-none"
      >
        <button
          onClick={togglePlay}
          className={`group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-xl border shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer active:scale-95 ${
            isPlaying
              ? "bg-gradient-to-r from-[#3B0A24]/95 via-[#4A0E2E]/95 to-[#2B0B1D]/95 border-[#FDE68A] text-[#FDE68A]"
              : "bg-white/90 hover:bg-white border-[#D4AF37]/50 text-[#4A0E2E]"
          }`}
          aria-label={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
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
