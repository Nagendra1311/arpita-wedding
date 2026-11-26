"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Calendar, ChevronDown, Film } from "lucide-react";
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
      
      {/* BACKGROUND COUPLE HERO IMAGE - MAXIMUM CLARITY WITHOUT OVERLAYS */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple_hero.jpg"
          alt="Arpita & Manish Wedding Celebration"
          fill
          priority
          className="object-cover object-top opacity-85 sm:opacity-90 filter brightness-95 saturate-110"
          sizes="100vw"
        />
        {/* Clean, soft vignette overlays for readability without obstructing the couple */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF0F4] via-[#4A0E2E]/30 to-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,223,186,0.2)_0%,transparent_70%)]" />
      </div>

      {/* TOP ROYAL NAVIGATION BAR */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-5 pb-2 flex items-center justify-between">
        
        {/* Auspicious Invocation Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#FDE68A]/40 text-[#FDE68A] shadow-md">
          <span className="text-xs">🕉️</span>
          <span className="font-serif text-[11px] sm:text-xs font-semibold tracking-widest text-[#FFF9E6]">
            {shloka.sanskritTop}
          </span>
        </div>

        {/* Video Teaser Button */}
        <Link
          href="/video"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-serif text-[11px] sm:text-xs uppercase tracking-wider font-semibold shadow-md transition-all active:scale-95"
        >
          <Film className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span>Teaser</span>
        </Link>
      </div>

      {/* CENTER HERO CONTENT: COUPLE NAME & ROMANTIC HEADINGS */}
      <div className="relative z-20 w-full max-w-lg mx-auto px-6 py-4 flex flex-col items-center text-center">
        
        {/* Couple Monogram Badge A ♡ M directly above Together Forever */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-[#FDE68A]/70 shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-3">
          <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-[#FDE68A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {couple.bride[0]}
          </span>
          <Heart className="w-4 h-4 fill-[#F43F5E] text-[#F43F5E] drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
          <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-[#FDE68A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {couple.groom[0]}
          </span>
        </div>

        {/* "Together Forever" Banner */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[#FDE68A] text-xs font-serif uppercase tracking-[0.28em] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="h-[1px] w-6 bg-[#FDE68A]/80" />
          <Heart className="w-3 h-3 fill-[#FDE68A]" />
          <span>Together Forever</span>
          <Heart className="w-3 h-3 fill-[#FDE68A]" />
          <span className="h-[1px] w-6 bg-[#FDE68A]/80" />
        </div>

        {/* Large Couple Names in Royal Luxury Typography */}
        <div className="my-1">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] leading-tight">
            {couple.bride}
            <span className="block text-3xl sm:text-4xl text-[#FDE68A] font-cormorant italic font-normal -my-1 drop-shadow-[0_0_12px_rgba(253,230,138,0.6)]">
              &amp;
            </span>
            {couple.groom}
          </h1>
        </div>

        {/* Romantic Subtitle */}
        <p className="font-cormorant italic text-base sm:text-lg text-white font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mt-1">
          Two hearts... One beautiful journey...
        </p>

        {/* Heart Flourish Divider */}
        <div className="flex items-center justify-center gap-2 my-3 text-white/80">
          <span className="h-[1px] w-12 bg-white/60" />
          <Heart className="w-3.5 h-3.5 text-[#FDE68A] fill-[#FDE68A]" />
          <span className="h-[1px] w-12 bg-white/60" />
        </div>

        {/* 4 FROSTED GLASS COUNTDOWN CARDS */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-[360px] my-3">
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Minutes", val: timeLeft.minutes },
            { label: "Seconds", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center bg-black/45 hover:bg-black/60 backdrop-blur-xl border border-white/50 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-300 transform hover:-translate-y-1 hover:border-[#FDE68A]"
            >
              {/* Glass Top Bevel Highlight */}
              <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />

              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {item.val.toString().padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-wider text-[#FDE68A] font-serif uppercase mt-0.5 font-bold drop-shadow">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wedding Day Date Pill */}
        <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-lg border border-[#FDE68A]/60 text-white shadow-lg text-xs font-serif tracking-wider font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span>Our Wedding Day &bull; {event.weddingDate}</span>
        </div>
      </div>

      {/* CLEAN SCROLL DOWN CHEVRON BUTTON */}
      <div className="relative z-20 pb-6 flex justify-center">
        <button
          onClick={scrollToStory}
          className="w-11 h-11 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all cursor-pointer group"
          aria-label="Scroll to Love Story"
        >
          <ChevronDown className="w-5 h-5 text-white group-hover:text-[#FDE68A] transition-colors" />
        </button>
      </div>
    </section>
  );
}
