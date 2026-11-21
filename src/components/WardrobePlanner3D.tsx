"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shirt, Sparkles, Heart } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function WardrobePlanner3D() {
  const { events, couple } = weddingConfig;

  return (
    <section className="relative w-full max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/60 via-white to-[#FBCFE8]/40 shadow-[0_20px_50px_rgba(212,175,55,0.18)]"
      >
        <div className="rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF6FA] to-[#FCEDF2] p-6 sm:p-10 border border-[#FDE68A]/40 text-center">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 text-[#9F1239] text-xs font-serif uppercase tracking-[0.25em] font-semibold">
              <span className="h-[1px] w-8 bg-[#9F1239]/40" />
              <Shirt className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Wardrobe Planner</span>
              <Shirt className="w-3.5 h-3.5 text-[#B45309]" />
              <span className="h-[1px] w-8 bg-[#9F1239]/40" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#4A0E2E] tracking-wider mt-2">
              Attire Inspirations
            </h2>
            <p className="font-cormorant italic text-sm text-[#7A1D49] mt-1">
              Curated color palettes and dress ideas for our celebratory rituals.
            </p>
          </div>

          {/* 3D CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt, idx) => {
              const isHaldi = evt.title === "Haldi";
              const isSangeet = evt.title === "Sangeet";
              const isWedding = evt.title === "Wedding";

              return (
                <motion.div
                  key={evt.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="rounded-2xl p-5 bg-white/80 hover:bg-white backdrop-blur-md border border-[#FDE68A]/50 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex flex-col justify-between text-center transition-all duration-300"
                >
                  <div>
                    {/* Badge */}
                    <div
                      className="inline-block px-4 py-1 rounded-full text-white font-serif text-[11px] uppercase tracking-widest font-semibold mb-3 shadow-sm"
                      style={{ backgroundColor: evt.accentColor }}
                    >
                      {evt.title}
                    </div>

                    <p className="font-serif text-xs font-bold text-[#4A0E2E] tracking-wider">
                      {evt.date} &bull; {evt.time}
                    </p>

                    {/* Theme box */}
                    <div className="my-3 p-2.5 rounded-xl bg-[#4A0E2E]/5 border border-[#4A0E2E]/10">
                      <span className="text-[10px] font-serif uppercase tracking-widest text-[#7A1D49] block">
                        Theme
                      </span>
                      <span className="font-serif text-sm font-bold text-[#4A0E2E] block mt-0.5">
                        {evt.theme}
                      </span>
                    </div>

                    {/* Dress Code */}
                    <p className="font-cormorant italic text-sm font-semibold text-[#521334]">
                      {evt.dressCode}
                    </p>
                  </div>

                  {/* Suggested Color Palette Swatches */}
                  <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-col items-center">
                    <span className="text-[9px] font-serif uppercase tracking-widest text-stone-500 mb-1.5 font-semibold">
                      Suggested Palette
                    </span>
                    <div className="flex items-center gap-2">
                      {isSangeet && (
                        <>
                          <div className="w-5 h-5 rounded-full bg-[#3D0C26] border-2 border-white shadow-sm" title="Burgundy" />
                          <div className="w-5 h-5 rounded-full bg-[#581C87] border-2 border-white shadow-sm" title="Plum" />
                          <div className="w-5 h-5 rounded-full bg-[#D4AF37] border-2 border-white shadow-sm" title="Gold Sequins" />
                        </>
                      )}
                      {isHaldi && (
                        <>
                          <div className="w-5 h-5 rounded-full bg-[#FACC15] border-2 border-white shadow-sm" title="Bright Yellow" />
                          <div className="w-5 h-5 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm" title="Marigold" />
                          <div className="w-5 h-5 rounded-full bg-[#FEF08A] border-2 border-white shadow-sm" title="Pastel Lemon" />
                        </>
                      )}
                      {isWedding && (
                        <>
                          <div className="w-5 h-5 rounded-full bg-[#881337] border-2 border-white shadow-sm" title="Royal Crimson" />
                          <div className="w-5 h-5 rounded-full bg-[#D4AF37] border-2 border-white shadow-sm" title="Gold Zari" />
                          <div className="w-5 h-5 rounded-full bg-[#701A75] border-2 border-white shadow-sm" title="Silk Brocade" />
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Suggestive note */}
          <div className="mt-8 p-3.5 rounded-2xl bg-white/70 border border-[#FDE68A]/60 max-w-md mx-auto">
            <p className="font-cormorant italic text-xs sm:text-sm text-[#4A0E2E]">
              &ldquo;The guide is suggestive, so please feel free to dress comfortably!&rdquo;
            </p>
            <p className="font-serif text-[11px] uppercase tracking-wider text-[#7A1D49] font-bold mt-0.5">
              We cannot wait to celebrate with you ❤️ {couple.hashtag}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
