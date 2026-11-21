"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface OpenInvitationButtonProps {
  onOpen: () => void;
  isOpening: boolean;
}

export function OpenInvitationButton({ onOpen, isOpening }: OpenInvitationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 flex flex-col items-center mt-8 md:mt-10"
    >
      {/* Outer Breathing Gold Glow Ring */}
      <motion.div
        animate={{
          scale: isOpening ? [1, 1.4, 1.8] : [1, 1.05, 1],
          opacity: isOpening ? [0.6, 0.2, 0] : [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: isOpening ? 1.5 : 3.2,
          repeat: isOpening ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-r from-gold-500/30 via-gold-300/40 to-gold-500/30 blur-md"
        aria-hidden="true"
      />

      <button
        onClick={onOpen}
        disabled={isOpening}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center gap-3 px-8 py-3.5 md:px-10 md:py-4 rounded-full bg-gradient-to-b from-luxury-850/90 via-luxury-900/95 to-luxury-950/95 text-gold-200 border border-gold-400/60 shadow-[0_4px_25px_rgba(196,155,56,0.25)] hover:border-gold-300 hover:shadow-[0_0_35px_rgba(212,179,94,0.45)] transition-all duration-500 active:scale-95 cursor-pointer backdrop-blur-md overflow-hidden"
      >
        {/* Shimmer Light Streak on Button */}
        <motion.div
          animate={{
            x: ["-150%", "200%"],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        {/* Decorative Sparkle / Heart Icon */}
        <span className="relative flex items-center justify-center text-gold-400 group-hover:text-gold-200 transition-colors duration-300">
          {isOpening ? (
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold-300" />
            </motion.div>
          ) : (
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:rotate-12" />
          )}
        </span>

        {/* Button Typography */}
        <span className="font-serif text-xs md:text-sm tracking-[0.28em] font-medium uppercase text-gold-100 group-hover:text-white transition-colors duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {isOpening ? "Opening Invitation..." : "Open Invitation"}
        </span>

        {/* Subtle right ornament */}
        <span className="relative flex items-center justify-center text-gold-400/60 group-hover:text-gold-300 transition-colors duration-300">
          <Heart className="w-3.5 h-3.5 fill-gold-400/20 group-hover:fill-gold-300/40 transition-all duration-300" />
        </span>
      </button>

      {/* Gentle helper hint under button */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : 0.6 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="font-cormorant italic text-[11px] md:text-xs tracking-[0.18em] text-gold-200/50 mt-3 uppercase"
      >
        Tap to experience the celebration
      </motion.p>
    </motion.div>
  );
}
