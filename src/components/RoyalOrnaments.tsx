"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";

/**
 * Traditional Indian Luxury Mandala Watermark
 * Features concentric floral petals, chakras, and sacred geometry
 */
export function MandalaBackground({
  size = 500,
  opacity = 0.08,
  className = "",
  reverse = false,
}: {
  size?: number;
  opacity?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute select-none flex items-center justify-center ${
        reverse ? "animate-spin-slow-reverse" : "animate-spin-slow"
      } ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#D4AF37]"
      >
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />

        {/* 12 Outer Petals */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={`petal-${i}`} transform={`rotate(${i * 30} 100 100)`}>
            <path
              d="M100 20 C108 38 116 55 100 70 C84 55 92 38 100 20 Z"
              stroke="currentColor"
              strokeWidth="0.75"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <circle cx="100" cy="22" r="1.5" fill="currentColor" />
          </g>
        ))}

        {/* Middle Ring & Rays */}
        <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* 8 Inner Lotus Petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`lotus-${i}`} transform={`rotate(${i * 45} 100 100)`}>
            <path
              d="M100 50 C106 62 110 75 100 85 C90 75 94 62 100 50 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <circle cx="100" cy="52" r="1.2" fill="currentColor" />
          </g>
        ))}

        {/* Central Core & Star */}
        <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        <circle cx="100" cy="100" r="6" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

/**
 * Royal Corner Flourish for luxury cards
 */
export function RoyalCornerFlourish({
  position = "top-left",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale-x-[-1] right-2 top-2";
      case "bottom-left":
        return "scale-y-[-1] left-2 bottom-2";
      case "bottom-right":
        return "scale-[-1] right-2 bottom-2";
      default:
        return "left-2 top-2";
    }
  };

  return (
    <div className={`pointer-events-none absolute select-none z-10 w-8 h-8 opacity-45 ${getTransform()} ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-[#D4AF37]">
        <path
          d="M2 38 V14 C2 7.37 7.37 2 14 2 H38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 34 V16 C6 10.48 10.48 6 16 6 H34"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <circle cx="14" cy="14" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * Shimmer Divider with golden diamond
 */
export function ShimmerDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-3 select-none ${className}`}>
      <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
      <div className="relative rotate-45 w-2 h-2 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]">
        <div className="absolute inset-0.5 bg-[#FFF9E6]" />
      </div>
      <div className="h-[1px] w-14 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
    </div>
  );
}
