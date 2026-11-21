"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, X, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function LoveStory3D() {
  const { couple } = weddingConfig;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const milestones = [
    {
      year: "The First Hello",
      title: "Where Magic Began",
      desc: "A serendipitous meeting that turned into coffee, endless conversations, and realizing we had found our missing piece.",
    },
    {
      year: "Best Friends First",
      title: "Growing Together",
      desc: "Through late-night chats, shared dreams, food adventures, and laughter, our bond grew stronger every single day.",
    },
    {
      year: "The Proposal",
      title: "She Said Yes!",
      desc: "Under the sunset sky with hearts beating fast, Manish asked the question that changed forever. And Arpita said YES!",
    },
    {
      year: "18 January 2027",
      title: "Two Souls, One Forever",
      desc: "Now, ready to take the sacred seven steps and begin our lifetime of happiness, surrounded by your blessings.",
    },
  ];

  return (
    <section id="our-love-story" className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* 3D Glassmorphism Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/60 via-white to-[#FBCFE8]/40 shadow-[0_20px_50px_rgba(212,175,55,0.18)]"
      >
        <div className="relative rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F8] to-[#FCEDF2] p-6 sm:p-10 border border-[#FDE68A]/40 overflow-hidden">
          
          {/* Subtle floral watermark accents in corners */}
          <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-[#FDA4AF]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-[#FDE68A]/25 blur-2xl" />

          {/* Section Heading matching reference */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-[#9F1239] text-xs font-serif uppercase tracking-[0.25em] font-semibold">
              <span className="h-[1px] w-8 bg-[#9F1239]/40" />
              <Heart className="w-3.5 h-3.5 fill-[#BE123C] text-[#BE123C]" />
              <span>Our Love Story</span>
              <Heart className="w-3.5 h-3.5 fill-[#BE123C] text-[#BE123C]" />
              <span className="h-[1px] w-8 bg-[#9F1239]/40" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#4A0E2E] tracking-wider mt-2">
              How Our Forever Began
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: 3D OVERLAPPING TILTED POLAROID PHOTOS */}
            <div className="md:col-span-6 flex justify-center py-4">
              <div className="relative w-72 sm:w-80 h-72">
                
                {/* Polaroid 1 (Left, Tilted -6deg) */}
                <motion.div
                  initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
                  whileInView={{ rotate: -6, scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  whileHover={{ rotate: -2, scale: 1.05, zIndex: 30 }}
                  className="absolute top-2 left-0 w-48 sm:w-52 p-3 pb-8 bg-white rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.22)] border border-stone-200 cursor-pointer transform transition-all duration-300"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-stone-100">
                    <Image
                      src="/images/story_1.jpg"
                      alt="Arpita and Manish together by the sunset lake"
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                  {/* Polaroid caption text */}
                  <p className="font-cormorant italic text-xs text-stone-600 text-center mt-2 font-semibold">
                    By the golden waters &bull; 2025
                  </p>
                </motion.div>

                {/* Polaroid 2 (Right Overlapping, Tilted +5deg) */}
                <motion.div
                  initial={{ rotate: 8, scale: 0.9, opacity: 0 }}
                  whileInView={{ rotate: 4, scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                  className="absolute top-10 right-0 w-48 sm:w-52 p-3 pb-8 bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-stone-200 cursor-pointer z-10 transform transition-all duration-300"
                >
                  {/* Decorative cute gold heart sticker on top of polaroid */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FDE68A] border border-white shadow-sm flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 fill-[#BE123C] text-[#BE123C]" />
                  </div>

                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-stone-100">
                    <Image
                      src="/images/story_2.jpg"
                      alt="Couple heart hands against sunset"
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                  {/* Polaroid caption text */}
                  <p className="font-cormorant italic text-xs text-stone-600 text-center mt-2 font-semibold">
                    Two hearts, one soul ♡
                  </p>
                </motion.div>
              </div>
            </div>

            {/* RIGHT: STORY TEXT & READ STORY BUTTON */}
            <div className="md:col-span-6 flex flex-col justify-center text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium mb-3">
                  It all started with a simple conversation, turned into endless chats, and grew into a beautiful bond. Today, we are not just partners, but best friends for life.
                </p>

                <p className="font-cormorant italic text-lg sm:text-xl text-[#9F1239] font-bold mb-6">
                  &ldquo;And this is just the beginning... ♡&rdquo;
                </p>

                {/* Read Our Story Button */}
                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-serif text-xs uppercase tracking-widest font-bold shadow-[0_6px_20px_rgba(180,83,9,0.35)] hover:brightness-110 active:scale-95 transition-all"
                  >
                    <span>Read Our Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* LOVE STORY MILESTONES MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FDF2F7] p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#BE123C]/10 border border-[#BE123C]/30 flex items-center justify-center mx-auto mb-2 text-[#BE123C]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#4A0E2E]">
                  Our Journey to Forever
                </h3>
                <p className="font-cormorant italic text-sm text-[#7A1D49]">
                  Arpita &amp; Manish &bull; #ManniKiMini
                </p>
              </div>

              {/* Milestones Timeline */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-[#D4AF37]/40">
                {milestones.map((m, i) => (
                  <div key={i} className="relative flex items-start gap-4 pl-10">
                    <div className="absolute left-3.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#BE123C] border-2 border-white shadow-sm" />
                    <div>
                      <span className="text-[10px] font-serif uppercase tracking-widest text-[#B45309] font-bold">
                        {m.year}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#4A0E2E]">
                        {m.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
