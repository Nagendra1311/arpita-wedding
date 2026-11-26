"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Music, Sun, Utensils, Calendar, Clock, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { Card3DTilt } from "./Card3DTilt";
import { DiwaliCrackers } from "./DiwaliCrackers";

export function WeddingEvents3D() {
  const eventsList = [
    {
      title: "Sangeet",
      subTitle: "Musical Night of Celebration",
      date: "17ᵗʰ January 2027",
      time: "Evening",
      timingDetail: "7:00 PM Onwards",
      theme: "Glam Night",
      dress: "Indo-Western / Contemporary",
      icon: Music,
      color: "#BE123C",
      glowColor: "rgba(190, 18, 60, 0.35)",
      bgGradient: "from-[#BE123C]/10 via-[#FFF5F8] to-[#FCEDF2]",
      calDate: "20270117T133000Z/20270117T183000Z",
    },
    {
      title: "Haldi",
      subTitle: "Auspicious Turmeric Blessing",
      date: "18ᵗʰ January 2027",
      time: "Morning",
      timingDetail: "10:00 AM Onwards",
      theme: "Bright & Cheerful",
      dress: "Yellow / Pastel / Floral",
      icon: Sun,
      color: "#D97706",
      glowColor: "rgba(217, 119, 6, 0.35)",
      bgGradient: "from-[#D97706]/10 via-[#FFFDF9] to-[#FFFBEB]",
      calDate: "20270118T043000Z/20270118T083000Z",
    },
    {
      title: "Wedding",
      subTitle: "The Sacred Vows & Phere",
      date: "18ᵗʰ January 2027",
      time: "Evening",
      timingDetail: "7:00 PM Onwards",
      theme: "Traditional",
      dress: "Traditional (Saree / Kurta / Sherwani)",
      icon: Heart,
      color: "#881337",
      glowColor: "rgba(136, 19, 55, 0.45)",
      isMain: true,
      bgGradient: "from-[#881337]/15 via-[#FFF1F2] to-[#FFE4E6]",
      calDate: "20270118T133000Z/20270118T183000Z",
    },
  ];

  const getCalendarLink = (title: string, calDate: string) => {
    const text = encodeURIComponent(`${title} - ${weddingConfig.couple.fullName} Wedding`);
    const details = encodeURIComponent(
      `Celebrating ${title} of ${weddingConfig.couple.fullName}!\nVenue: ${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`
    );
    const location = encodeURIComponent(`${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${calDate}&details=${details}&location=${location}`;
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto py-14 px-4 overflow-hidden">
      {/* DIWALI CRACKERS & SPARKLERS FESTIVE BACKGROUND */}
      <DiwaliCrackers />

      <Card3DTilt intensity={5} glare={false}>
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/80 via-white to-[#FBCFE8]/60 shadow-[0_25px_60px_rgba(212,175,55,0.2)]">
          <div className="rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF6FA] to-[#FCEDF2] p-6 sm:p-10 border border-[#FDE68A]/50 text-center">
            
            {/* Header */}
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

            {/* HORIZONTAL TIMELINE CONNECTING LINE ON DESKTOP */}
            <div className="relative">
              <div className="hidden md:block absolute top-10 left-12 right-12 h-0.5 bg-gradient-to-r from-[#D97706]/30 via-[#D4AF37] to-[#881337]/30 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {eventsList.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <Card3DTilt key={item.title} intensity={10} glare={true} className="h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ delay: idx * 0.15, duration: 0.6 }}
                        className={`h-full flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b ${item.bgGradient} backdrop-blur-md border border-[#FDE68A]/60 shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300 relative group overflow-hidden`}
                      >
                        {/* Gold bevel line on top */}
                        <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                        {/* Top Section */}
                        <div className="flex flex-col items-center">
                          {/* 3D Glowing Orb Icon */}
                          <div
                            className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-white mb-3 transition-transform duration-300 group-hover:scale-110"
                            style={{
                              backgroundColor: item.color,
                              boxShadow: `0 8px 25px ${item.glowColor}`,
                            }}
                          >
                            <IconComponent className="w-7 h-7 text-white drop-shadow-md" />
                            {item.isMain && (
                              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDE68A] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FDE68A] items-center justify-center text-[9px] font-bold text-[#881337]">
                                  ★
                                </span>
                              </span>
                            )}
                          </div>

                          {/* Event Title */}
                          <h3 className="font-serif text-xl font-extrabold text-[#4A0E2E] tracking-wider uppercase">
                            {item.title}
                          </h3>

                          {/* Date */}
                          <div className="mt-1 font-serif text-xs font-bold text-[#881337] tracking-wider">
                            {item.date}
                          </div>

                          {/* Time & Timing Detail */}
                          <div className="my-2 py-1 px-3.5 rounded-full bg-white/80 border border-[#D4AF37]/50 text-xs font-serif text-[#7A1D49] font-bold flex items-center gap-1.5 shadow-sm">
                            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{item.time} ({item.timingDetail})</span>
                          </div>

                          {/* Theme Box */}
                          <div className="mt-3 p-3 rounded-xl bg-white/70 border border-[#D4AF37]/30 w-full text-center shadow-inner">
                            <div className="mb-1.5">
                              <span className="text-[10px] uppercase font-serif tracking-widest text-[#B45309] block font-bold">
                                Theme
                              </span>
                              <span className="font-serif text-sm font-bold text-[#4A0E2E] block">
                                {item.theme}
                              </span>
                            </div>
                            <div className="pt-1.5 border-t border-[#D4AF37]/20">
                              <span className="text-[10px] uppercase font-serif tracking-wider text-stone-500 block font-semibold">
                                Dress Code
                              </span>
                              <span className="font-cormorant italic text-xs font-bold text-[#7A1D49] block mt-0.5">
                                {item.dress}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Add to Calendar Button */}
                        <div className="mt-4 pt-2">
                          <a
                            href={getCalendarLink(item.title, item.calDate)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-white/95 hover:bg-[#D4AF37] hover:text-[#2C061A] text-[#7A1D49] text-xs font-serif uppercase tracking-wider font-bold border border-[#D4AF37]/60 shadow-sm transition-all duration-300"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Add to Calendar</span>
                          </a>
                        </div>
                      </motion.div>
                    </Card3DTilt>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Card3DTilt>
    </section>
  );
}
