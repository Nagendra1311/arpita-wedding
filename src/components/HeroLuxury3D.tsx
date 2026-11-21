"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Calendar, ChevronDown, Menu, Film, Sparkles, Wifi, Battery, Signal } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function HeroLuxury3D() {
  const { couple, event } = weddingConfig;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentTimeStr, setCurrentTimeStr] = useState("9:41");

  useEffect(() => {
    // Current phone clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    updateTime();

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
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#2B0B1D] via-[#4A0E2E] to-[#FAF0F4]">
      
      {/* BACKGROUND COUPLE HERO IMAGE WITH WARM ROMANTIC LIGHTING */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple_hero.jpg"
          alt="Arpita & Manish Wedding Celebration"
          fill
          priority
          className="object-cover object-top opacity-55 mix-blend-screen scale-105 filter saturate-125"
          sizes="100vw"
        />
        {/* Soft Warm Rose Gold & Ambient Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF0F4] via-[#4A0E2E]/40 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,223,186,0.35)_0%,transparent_70%)]" />
      </div>

      {/* TOP MOBILE STATUS & BRAND HEADER */}
      <div className="relative z-20 w-full max-w-md mx-auto px-6 pt-3 flex flex-col">
        {/* Phone Status Bar (9:41, Signal, Wifi, Battery) */}
        <div className="flex items-center justify-between text-white/80 text-xs font-semibold tracking-tight pb-3">
          <span>{currentTimeStr}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Brand Bar: Monogram & Video Backup Button */}
        <div className="flex items-center justify-between mt-1">
          {/* Couple Monogram N ♡ S style */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-sm"
          >
            <span className="font-serif text-base font-bold tracking-widest text-[#FDE68A]">
              A
            </span>
            <Heart className="w-3 h-3 fill-[#F43F5E] text-[#F43F5E]" />
            <span className="font-serif text-base font-bold tracking-widest text-[#FDE68A]">
              M
            </span>
          </motion.div>

          {/* Video Teaser Button */}
          <Link
            href="/video"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-serif text-xs uppercase tracking-wider font-medium shadow-md transition-all active:scale-95"
          >
            <Film className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Video Teaser</span>
          </Link>
        </div>
      </div>

      {/* CENTER HERO CONTENT: COUPLE NAME & ROMANTIC HEADINGS */}
      <div className="relative z-20 w-full max-w-md mx-auto px-6 py-6 flex flex-col items-center text-center">
        
        {/* "Together Forever" Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-2 text-[#FDE68A] text-xs font-serif uppercase tracking-[0.28em] font-medium drop-shadow"
        >
          <span className="h-[1px] w-6 bg-[#FDE68A]/60" />
          <Heart className="w-3 h-3 fill-[#FDE68A]" />
          <span>Together Forever</span>
          <Heart className="w-3 h-3 fill-[#FDE68A]" />
          <span className="h-[1px] w-6 bg-[#FDE68A]/60" />
        </motion.div>

        {/* Large Couple Names in Royal Luxury Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="my-1"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] leading-tight">
            {couple.bride}
            <span className="block text-3xl sm:text-4xl text-[#FDE68A] font-cormorant italic font-normal -my-1">
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
          className="font-cormorant italic text-base sm:text-lg text-white/95 tracking-wide drop-shadow mt-1"
        >
          Two hearts... One beautiful journey...
        </motion.p>

        {/* Heart Flourish Divider */}
        <div className="flex items-center justify-center gap-2 my-4 text-white/60">
          <span className="h-[1px] w-12 bg-white/40" />
          <Heart className="w-3.5 h-3.5 text-[#FDE68A] fill-[#FDE68A]" />
          <span className="h-[1px] w-12 bg-white/40" />
        </div>

        {/* 4 FROSTED GLASS FLOATING COUNTDOWN CARDS (Exact match to design image) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-4 gap-2.5 w-full max-w-[340px] my-2"
        >
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Minutes", val: timeLeft.minutes },
            { label: "Seconds", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-2.5 flex flex-col items-center justify-center bg-white/25 hover:bg-white/35 backdrop-blur-xl border border-white/50 shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition-all transform hover:-translate-y-1"
            >
              {/* Glass Bevel Highlight */}
              <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
                {item.val.toString().padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-wider text-white/90 font-serif uppercase mt-0.5 font-medium">
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
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/40 text-white shadow-md text-xs font-serif tracking-wider font-semibold"
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
          className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll to Love Story"
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </section>
  );
}
