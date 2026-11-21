"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Music, Sun, Utensils, Sparkles, Clock, Calendar } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function WeddingEvents3D() {
  const eventsList = [
    {
      title: "Sangeet Night",
      date: "17 Jan 2027",
      time: "7:00 PM Onwards",
      theme: "Glam Night",
      dress: "Indo-Western / Contemporary",
      icon: Music,
      color: "#BE123C",
      glowColor: "rgba(190, 18, 60, 0.35)",
    },
    {
      title: "Haldi Ceremony",
      date: "18 Jan 2027",
      time: "10:00 AM Onwards",
      theme: "Bright & Cheerful",
      dress: "Yellow / Pastel / Floral",
      icon: Sun,
      color: "#D97706",
      glowColor: "rgba(217, 119, 6, 0.35)",
    },
    {
      title: "Wedding Ceremony",
      date: "18 Jan 2027",
      time: "7:00 PM Onwards",
      theme: "Traditional",
      dress: "Traditional (Saree / Kurta)",
      icon: Heart,
      color: "#881337",
      glowColor: "rgba(136, 19, 55, 0.45)",
      isMain: true,
    },
    {
      title: "Reception Feast",
      date: "18 Jan 2027",
      time: "8:30 PM Onwards",
      theme: "Grand Dinner",
      dress: "Celebratory Attire",
      icon: Utensils,
      color: "#B45309",
      glowColor: "rgba(180, 83, 9, 0.35)",
    },
  ];

  return (
    <section className="relative w-full max-w-4xl mx-auto py-14 px-4">
      {/* 3D Glass Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/70 via-white to-[#FBCFE8]/50 shadow-[0_20px_50px_rgba(212,175,55,0.18)]"
      >
        <div className="rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF6FA] to-[#FCEDF2] p-6 sm:p-10 border border-[#FDE68A]/40 text-center">
          
          {/* Header matching design */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 text-[#9F1239] text-xs font-serif uppercase tracking-[0.25em] font-semibold">
              <span className="h-[1px] w-8 bg-[#9F1239]/40" />
              <Heart className="w-3.5 h-3.5 fill-[#BE123C] text-[#BE123C]" />
              <span>Wedding Events</span>
              <Heart className="w-3.5 h-3.5 fill-[#BE123C] text-[#BE123C]" />
              <span className="h-[1px] w-8 bg-[#9F1239]/40" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#4A0E2E] tracking-wider mt-2">
              Be a Part of Our Special Celebrations
            </h2>
            <p className="font-cormorant italic text-sm text-[#7A1D49] mt-1">
              Two days of heartfelt rituals, music, joy, and blessings.
            </p>
          </div>

          {/* HORIZONTAL TIMELINE CONNECTING LINE ON DESKTOP & MOBILE */}
          <div className="relative">
            {/* Horizontal Gold Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-[#D97706]/20 via-[#D4AF37] to-[#881337]/30 z-0" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {eventsList.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: idx * 0.12, duration: 0.6 }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    className="flex flex-col items-center p-3 rounded-2xl bg-white/60 hover:bg-white/90 backdrop-blur-md border border-[#FDE68A]/50 shadow-md transition-all duration-300"
                  >
                    {/* Glowing Circular Glass Orb */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] mb-3 relative"
                      style={{
                        background: `linear-gradient(135deg, #FFFFFF, ${item.glowColor})`,
                        boxShadow: `0 8px 25px ${item.glowColor}`,
                      }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: item.color }}
                      />
                      {item.isMain && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BE123C] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#BE123C]"></span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#4A0E2E] leading-tight">
                      {item.title}
                    </h3>

                    {/* Date & Time */}
                    <p className="font-serif text-xs font-semibold text-[#B45309] mt-1">
                      {item.date}
                    </p>
                    <p className="text-[11px] text-stone-600 font-medium mt-0.5">
                      {item.time}
                    </p>

                    {/* Theme Pill */}
                    <div className="mt-2.5 px-2.5 py-0.5 rounded-full bg-[#4A0E2E]/10 border border-[#4A0E2E]/15 text-[10px] font-serif uppercase tracking-wider text-[#4A0E2E] font-medium">
                      {item.theme}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
