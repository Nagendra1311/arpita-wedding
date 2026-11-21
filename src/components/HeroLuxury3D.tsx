"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Calendar, ChevronDown, Film, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function HeroLuxury3D() {
  const { couple, event, shloka } = weddingConfig;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Wedding countdown
    const target = new Date(event.weddingDateIso).getTime();
    const updateCountdown = () => {
      const diff = target - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.weddingDateIso]);

  const scrollToStory = () => {
    const el = document.getElementById("our-love-story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1F0615] via-[#3B0A24] to-[#FAF0F4]">
      
      {/* BACKGROUND COUPLE HERO IMAGE - CLEARLY VISIBLE AS PREVIOUSLY */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple_hero.jpg"
          alt="Arpita & Manish Wedding Celebration"
          fill
          priority
          className="object-cover object-top opacity-80 sm:opacity-85 filter brightness-95 saturate-115 scale-100 transition-transform duration-1000"
          sizes="100vw"
        />
        {/* Soft Warm Rose Gold & Ambient Vignette Overlays that preserve photo clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF0F4] via-[#4A0E2E]/35 to-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,223,186,0.25)_0%,transparent_65%)]" />
      </div>

      {/* TOP ROYAL NAVIGATION & BRAND BAR */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-5 pb-2 flex items-center justify-between">
        
        {/* Auspicious Invocation Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-[#FDE68A]/40 text-[#FDE68A] shadow-md"
        >
          <span className="text-xs">🕉️</span>
          <span className="font-serif text-[11px] sm:text-xs font-semibold tracking-widest text-[#FFF9E6]">
            {shloka.sanskritTop}
          </span>
        </motion.div>

        {/* Video Teaser Button */}
        <Link
          href="/video"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-serif text-[11px] sm:text-xs uppercase tracking-wider font-semibold shadow-md transition-all active:scale-95"
        >
          <Film className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span>Teaser</span>
        </Link>
      </div>

      {/* CENTER HERO CONTENT: COUPLE NAME & ROMANTIC 3D HEADINGS */}
      <div className="relative z-20 w-full max-w-lg mx-auto px-6 py-4 flex flex-col items-center text-center">
        
        {/* Couple Monogram Badge A ♡ M directly above Together Forever */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#FDE68A]/60 shadow-[0_4px_18px_rgba(0,0,0,0.5)] mb-3"
        >
          <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-[#FDE68A] drop-shadow">
            {couple.bride[0]}
          </span>
          <Heart className="w-3.5 h-3.5 fill-[#F43F5E] text-[#F43F5E] drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-[#FDE68A] drop-shadow">
            {couple.groom[0]}
          </span>
        </motion.div>

        {/* "Together Forever" Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-2 text-[#FDE68A] text-xs font-serif uppercase tracking-[0.28em] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          <span className="h-[1px] w-6 bg-[#FDE68A]/80" />
          <Heart className="w-3 h-3 fill-[#FDE68A]" />
          <span>Together Forever</span>
          <Heart className="w-3 h-3 fill-[#FDE68A]" />
          <span className="h-[1px] w-6 bg-[#FDE68A]/80" />
        </motion.div>

        {/* Large Couple Names in Royal Luxury Typography with 3D Depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="my-1"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] leading-tight">
            {couple.bride}
            <span className="block text-3xl sm:text-4xl text-[#FDE68A] font-cormorant italic font-normal -my-1 drop-shadow-[0_0_12px_rgba(253,230,138,0.6)]">
              &amp;
            </span>
            {couple.groom}
          </h1>
        </motion.div>

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cormorant italic text-base sm:text-lg text-white font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mt-1"
        >
          Two hearts... One beautiful journey...
        </motion.p>

        {/* Heart Flourish Divider */}
        <div className="flex items-center justify-center gap-2 my-3 text-white/80">
          <span className="h-[1px] w-12 bg-white/60" />
          <Heart className="w-3.5 h-3.5 text-[#FDE68A] fill-[#FDE68A]" />
          <span className="h-[1px] w-12 bg-white/60" />
        </div>

        {/* 4 FROSTED GLASS FLOATING COUNTDOWN CARDS WITH 3D DEPTH */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-[350px] my-2"
        >
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Minutes", val: timeLeft.minutes },
            { label: "Seconds", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center bg-black/40 hover:bg-black/55 backdrop-blur-xl border border-white/50 shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-[0_18px_35px_rgba(212,175,55,0.35)]"
            >
              {/* Glass Top Bevel Highlight */}
              <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {item.val.toString().padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-wider text-[#FDE68A] font-serif uppercase mt-0.5 font-bold drop-shadow">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Wedding Day Date Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-lg border border-[#FDE68A]/60 text-white shadow-lg text-xs font-serif tracking-wider font-semibold"
        >
          <Calendar className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span>Our Wedding Day &bull; {event.weddingDate}</span>
        </motion.div>
      </div>

      {/* FLOATING GLASS SCROLL DOWN CHEVRON BUTTON */}
      <div className="relative z-20 pb-6 flex justify-center">
        <motion.button
          onClick={scrollToStory}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-11 h-11 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all cursor-pointer group"
          aria-label="Scroll to Love Story"
        >
          <ChevronDown className="w-5 h-5 text-white group-hover:text-[#FDE68A] transition-colors" />
        </motion.button>
      </div>
    </section>
  );
}
