"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shirt, Sparkle, Heart } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function WardrobePlanner() {
  const { events, couple } = weddingConfig;

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#D4AF37]/50 text-[#4A0E2E] mb-3">
          <Shirt className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            Style & Attire Guide
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E2E] tracking-wider uppercase">
          Wardrobe Planner
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="rotate-45 w-1.5 h-1.5 bg-[#D4AF37]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className="font-cormorant italic text-sm md:text-base text-[#7A1D49] max-w-md mx-auto">
          Dress inspirations curated for each sacred ritual to celebrate together in color and joy.
        </p>
      </div>

      {/* Wardrobe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((evt, idx) => {
          const isHaldi = evt.title === "Haldi";
          const isSangeet = evt.title === "Sangeet";
          const isWedding = evt.title === "Wedding";

          return (
            <motion.div
              key={evt.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative rounded-3xl p-0.5 bg-gradient-to-b from-[#D4AF37] via-[#AA7A1E]/40 to-[#4A0E2E]/20 shadow-[0_8px_30px_rgba(74,14,46,0.12)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.25)] transition-all duration-300 flex flex-col"
            >
              <div className="h-full rounded-[22px] bg-gradient-to-b from-white via-[#FFFBFD] to-[#FDF4F8] p-6 flex flex-col justify-between border border-[#D4AF37]/30 text-center relative overflow-hidden">
                {/* Background soft color glow */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20"
                  style={{ backgroundColor: evt.accentColor }}
                />

                <div>
                  {/* Event Badge */}
                  <div className="inline-block px-4 py-1 rounded-full text-white font-serif text-[11px] uppercase tracking-widest font-semibold mb-3 shadow-sm"
                    style={{ backgroundColor: evt.accentColor }}
                  >
                    {evt.title}
                  </div>

                  {/* Date & Time */}
                  <p className="font-serif text-xs font-semibold text-[#4A0E2E] tracking-wider uppercase">
                    {evt.date}
                  </p>
                  <p className="font-cormorant italic text-xs text-[#7A1D49] tracking-widest mb-4">
                    {evt.time}
                  </p>

                  {/* Visual Theme Pill */}
                  <div className="my-3 p-3 rounded-2xl bg-[#4A0E2E]/5 border border-[#4A0E2E]/10">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#7A1D49] block mb-0.5">
                      Theme
                    </span>
                    <span className="font-serif text-sm font-bold text-[#4A0E2E] block">
                      {evt.theme}
                    </span>
                  </div>

                  {/* Dress Code Detail */}
                  <div className="mt-3 text-xs text-[#521334] font-medium leading-relaxed">
                    <span className="block font-serif text-[11px] text-[#7A1D49] uppercase tracking-wider mb-1">
                      Attire Recommendation:
                    </span>
                    <p className="font-cormorant text-base italic text-[#4A0E2E] font-semibold">
                      {evt.dressCode}
                    </p>
                  </div>

                  {/* Color Palette Swatches */}
                  <div className="mt-4 pt-3 border-t border-[#4A0E2E]/10 flex flex-col items-center">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#7A1D49] mb-1.5">
                      Suggested Palette
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isSangeet && (
                        <>
                          <div className="w-5 h-5 rounded-full bg-[#3D0C26] border border-white shadow-sm" title="Royal Burgundy" />
                          <div className="w-5 h-5 rounded-full bg-[#581C87] border border-white shadow-sm" title="Plum" />
                          <div className="w-5 h-5 rounded-full bg-[#D4AF37] border border-white shadow-sm" title="Gold Sequins" />
                        </>
                      )}
                      {isHaldi && (
                        <>
                          <div className="w-5 h-5 rounded-full bg-[#FACC15] border border-white shadow-sm" title="Bright Yellow" />
                          <div className="w-5 h-5 rounded-full bg-[#F59E0B] border border-white shadow-sm" title="Marigold" />
                          <div className="w-5 h-5 rounded-full bg-[#FEF08A] border border-white shadow-sm" title="Pastel Lemon" />
                        </>
                      )}
                      {isWedding && (
                        <>
                          <div className="w-5 h-5 rounded-full bg-[#881337] border border-white shadow-sm" title="Royal Crimson" />
                          <div className="w-5 h-5 rounded-full bg-[#D4AF37] border border-white shadow-sm" title="Metallic Gold" />
                          <div className="w-5 h-5 rounded-full bg-[#701A75] border border-white shadow-sm" title="Banarasi Silk" />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtitle / Note */}
                <div className="mt-5 text-[11px] font-cormorant italic text-[#7A1D49]/80">
                  {evt.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gentle suggestive note from card */}
      <div className="mt-8 p-4 rounded-2xl bg-white/70 border border-[#D4AF37]/40 text-center max-w-xl mx-auto shadow-sm">
        <p className="font-cormorant italic text-sm md:text-base text-[#4A0E2E] font-medium">
          &ldquo;The guide is suggestive, so please feel free to dress comfortably!&rdquo;
        </p>
        <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#7A1D49] font-bold mt-1">
          We cannot wait to celebrate with you ❤️ {couple.hashtag}
        </p>
      </div>
    </section>
  );
}
