"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Music, Sun, Heart } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function EventSchedule() {
  const { events, couple } = weddingConfig;

  // Calendar dates for January 2027 (Jan 1, 2027 is Friday)
  const daysInMonth = 31;
  const startDayOffset = 5; // Friday (0=Sun, 1=Mon, ..., 5=Fri)
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#D4AF37]/50 text-[#4A0E2E] mb-3">
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            Itinerary & Dates
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E2E] tracking-wider uppercase">
          Wedding Schedule
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="rotate-45 w-1.5 h-1.5 bg-[#D4AF37]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className="font-cormorant italic text-sm md:text-base text-[#7A1D49] max-w-md mx-auto">
          Mark your calendars for two days of sacred rituals, dance, and joyous festivities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: AUTHENTIC JANUARY 2027 CALENDAR (Card Design) */}
        <div className="lg:col-span-5 w-full flex flex-col items-center">
          <div className="w-full max-w-sm rounded-3xl p-1 bg-gradient-to-b from-[#D4AF37] via-[#AA7A1E] to-[#4A0E2E] shadow-lg">
            <div className="rounded-[22px] bg-white p-5 text-center border border-[#D4AF37]/30">
              
              {/* Calendar Binder Rings Graphic */}
              <div className="flex justify-center gap-3 -mt-8 mb-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-3 h-6 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#7A1D49] shadow-sm border border-white" />
                ))}
              </div>

              {/* Month Header */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-[#D4AF37] text-sm">✦</span>
                <h3 className="font-serif text-xl font-bold tracking-widest text-[#4A0E2E] uppercase">
                  JANUARY 2027
                </h3>
                <span className="text-[#D4AF37] text-sm">✦</span>
              </div>

              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-1 text-[10px] font-serif font-bold text-[#7A1D49] pb-2 border-b border-[#4A0E2E]/10">
                {daysOfWeek.map((day) => (
                  <div key={day} className="py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-xs font-serif mt-2">
                {/* Empty slots for Friday start */}
                {Array.from({ length: startDayOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                ))}

                {/* Days 1 to 31 */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isSangeet = dayNum === 17;
                  const isWedding = dayNum === 18;

                  return (
                    <div
                      key={dayNum}
                      className={`relative flex items-center justify-center h-8 w-8 mx-auto rounded-full transition-all ${
                        isSangeet
                          ? "bg-[#0D9488] text-white font-bold shadow-md ring-2 ring-[#0D9488]/40 animate-pulse"
                          : isWedding
                          ? "bg-[#4A0E2E] text-white font-bold shadow-md ring-2 ring-[#D4AF37] animate-pulse"
                          : "text-[#4A0E2E]/80 hover:bg-[#FDF0F5]"
                      }`}
                    >
                      <span>{dayNum}</span>
                      {isWedding && (
                        <span className="absolute -top-1 -right-1 text-[9px]">👑</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Calendar Legend Tags matching card */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-[#4A0E2E]/15">
                <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                  <div className="text-left">
                    <span className="font-serif text-[11px] font-bold text-[#0D9488] block leading-tight">
                      17th Jan &bull; Sangeet
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#4A0E2E]/10 border border-[#4A0E2E]/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4A0E2E]" />
                  <div className="text-left">
                    <span className="font-serif text-[11px] font-bold text-[#4A0E2E] block leading-tight">
                      18th Jan &bull; Wedding
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: TIMELINE EVENT CARDS */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {events.map((evt, idx) => {
            const isHaldi = evt.title === "Haldi";
            const isSangeet = evt.title === "Sangeet";
            const isWedding = evt.title === "Wedding";

            return (
              <motion.div
                key={evt.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative rounded-2xl p-0.5 bg-gradient-to-r from-[#D4AF37]/50 via-white to-[#4A0E2E]/30 shadow-md"
              >
                <div className="rounded-[15px] bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#D4AF37]/25">
                  <div className="flex items-start gap-3.5">
                    {/* Event Icon Circle */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: evt.accentColor }}
                    >
                      {isSangeet && <Music className="w-6 h-6" />}
                      {isHaldi && <Sun className="w-6 h-6" />}
                      {isWedding && <Heart className="w-6 h-6 fill-white" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-serif text-lg font-bold uppercase tracking-wider"
                          style={{ color: evt.accentColor }}
                        >
                          {evt.title}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {evt.theme}
                        </span>
                      </div>

                      <p className="font-cormorant italic text-xs text-[#7A1D49] mt-0.5">
                        {evt.subTitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-serif text-slate-700">
                        <div className="flex items-center gap-1 text-[#4A0E2E] font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#4A0E2E] font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{evt.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attire Badge */}
                  <div className="sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#7A1D49] block">
                      Attire
                    </span>
                    <span className="font-cormorant italic text-xs font-semibold text-[#4A0E2E] block">
                      {evt.dressCode.split("(")[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
