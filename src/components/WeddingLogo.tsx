"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

interface WeddingLogoProps {
  isOpening?: boolean;
}

export function WeddingLogo({ isOpening = false }: WeddingLogoProps) {
  const { couple, event } = weddingConfig;

  return (
    <div className="relative flex flex-col items-center justify-center text-center select-none">
      {/* Background Soft Golden Halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isOpening ? [0.6, 0.9, 0.7] : [0.4, 0.65, 0.4],
          scale: isOpening ? 1.25 : [1, 1.08, 1],
        }}
        transition={{
          duration: isOpening ? 2.5 : 4.5,
          repeat: isOpening ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -inset-16 md:-inset-28 rounded-full bg-gradient-to-r from-gold-500/20 via-gold-300/35 to-gold-600/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Intricate Royal Crest & Monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
        animate={{
          opacity: 1,
          scale: isOpening ? 1.08 : 1,
          y: 0,
        }}
        transition={{
          duration: isOpening ? 2.5 : 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* SVG Royal Emblem / Crest */}
        <div className="relative mb-4 md:mb-6">
          <svg
            className="w-40 h-40 md:w-52 md:h-52 filter drop-shadow-[0_0_20px_rgba(212,179,94,0.45)] transition-all duration-700"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdfbf7" />
                <stop offset="25%" stopColor="#e5cc8f" />
                <stop offset="50%" stopColor="#d4b35e" />
                <stop offset="75%" stopColor="#aa8029" />
                <stop offset="100%" stopColor="#f2e3be" />
              </linearGradient>

              <linearGradient id="goldRing" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#86611e" />
                <stop offset="30%" stopColor="#e5cc8f" />
                <stop offset="70%" stopColor="#d4b35e" />
                <stop offset="100%" stopColor="#654718" />
              </linearGradient>

              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d4b35e" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#c49b38" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#080706" stopOpacity="0" />
              </radialGradient>

              <filter id="royalGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle center ambient radial glow */}
            <circle cx="100" cy="100" r="75" fill="url(#centerGlow)" />

            {/* Outer dotted ornate ring */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="url(#goldRing)"
              strokeWidth="1.2"
              strokeDasharray="2 6"
              className="opacity-75"
            />

            {/* Outer thin continuous ring */}
            <circle
              cx="100"
              cy="100"
              r="84"
              stroke="url(#goldMetallic)"
              strokeWidth="0.8"
              className="opacity-90"
            />

            {/* Inner filigree corner fleurons / motifs */}
            {/* Top crown ornament */}
            <path
              d="M100 24L104 31H96L100 24ZM100 32C96 32 94 36 94 38H106C106 36 104 32 100 32Z"
              fill="url(#goldMetallic)"
            />
            {/* Bottom ornament */}
            <path
              d="M100 176L96 169H104L100 176ZM100 168C104 168 106 164 106 162H94C94 164 96 168 100 168Z"
              fill="url(#goldMetallic)"
            />
            {/* Left flourish */}
            <path
              d="M24 100L31 96V104L24 100Z"
              fill="url(#goldMetallic)"
            />
            {/* Right flourish */}
            <path
              d="M176 100L169 96V104L176 100Z"
              fill="url(#goldMetallic)"
            />

            {/* Royal Laurel / Botanical Wreath Leaves */}
            <g stroke="url(#goldMetallic)" strokeWidth="1" fill="none" opacity="0.85">
              {/* Left wreath arc */}
              <path d="M46 135 C32 105, 32 65, 52 42" strokeLinecap="round" />
              <path d="M40 120 C34 116, 36 108, 42 112" />
              <path d="M35 100 C30 96, 33 88, 38 92" />
              <path d="M36 80 C32 76, 37 68, 41 72" />
              <path d="M42 60 C40 55, 46 48, 50 53" />

              {/* Right wreath arc */}
              <path d="M154 135 C168 105, 168 65, 148 42" strokeLinecap="round" />
              <path d="M160 120 C166 116, 164 108, 158 112" />
              <path d="M165 100 C170 96, 167 88, 162 92" />
              <path d="M164 80 C168 76, 163 68, 159 72" />
              <path d="M158 60 C160 55, 154 48, 150 53" />
            </g>

            {/* Inner octagon / diamond accents */}
            <circle
              cx="100"
              cy="100"
              r="68"
              stroke="url(#goldRing)"
              strokeWidth="0.8"
              strokeDasharray="8 4"
              className="opacity-60"
            />

            {/* Royal Monogram Initials */}
            <text
              x="100"
              y="114"
              textAnchor="middle"
              fontFamily="'Cinzel', 'Playfair Display', serif"
              fontSize="38"
              fontWeight="600"
              letterSpacing="2"
              fill="url(#goldMetallic)"
              filter="url(#royalGlow)"
              className="tracking-wider select-none"
            >
              {couple.initials}
            </text>

            {/* Elegant Amperstand / Knot divider below initials */}
            <path
              d="M86 128 C92 125, 96 130, 100 128 C104 126, 108 131, 114 128"
              stroke="url(#goldMetallic)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            <circle cx="100" cy="128" r="1.5" fill="url(#goldMetallic)" />
          </svg>
        </div>

        {/* Tagline / Introduction */}
        <p className="font-cormorant italic text-gold-200/80 text-sm md:text-base tracking-[0.2em] uppercase mb-1.5 font-light">
          {event.tagline}
        </p>

        {/* Full Couple Names in Luxurious Gold Foil Serif */}
        <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-[0.18em] uppercase font-medium bg-gradient-to-r from-gold-100 via-gold-300 to-gold-100 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,179,94,0.35)] py-1">
          {couple.fullName}
        </h1>

        {/* Elegant separator line with diamond motif */}
        <div className="flex items-center gap-3 my-3 opacity-80">
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent via-gold-400 to-gold-300" />
          <div className="rotate-45 w-1.5 h-1.5 bg-gold-300 border border-gold-200 shadow-[0_0_8px_#d4b35e]" />
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent via-gold-400 to-gold-300" />
        </div>

        {/* Event Date & Venue */}
        <div className="flex flex-col items-center gap-1">
          <p className="font-serif text-xs md:text-sm tracking-[0.28em] text-gold-300/90 uppercase font-light">
            {event.date}
          </p>
          <p className="font-cormorant italic text-xs md:text-sm tracking-[0.16em] text-gold-200/60 font-light">
            {event.venue} &bull; {event.city}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
