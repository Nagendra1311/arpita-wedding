"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, X, Sparkles, BookOpen } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { Card3DTilt } from "./Card3DTilt";

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
      <Card3DTilt intensity={6} glare={false}>
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/80 via-[#FFF9FB] to-[#FBCFE8]/60 shadow-[0_25px_60px_rgba(212,175,55,0.22)]">
          <div className="relative rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F8] to-[#FCEDF2] p-6 sm:p-10 border border-[#FDE68A]/50 overflow-hidden">
            
            {/* Subtle floral watermark accents in corners */}
            <div className="pointer-events-none absolute -top-8 -right-8 w-44 h-44 rounded-full bg-[#FDA4AF]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-[#FDE68A]/30 blur-3xl" />

            {/* Section Heading */}
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
              <div className="md:col-span-6 flex justify-center py-4" style={{ perspective: "1000px" }}>
                <div className="relative w-72 sm:w-80 h-76">
                  
                  {/* Polaroid 1 (Left, Tilted -7deg) */}
                  <motion.div
                    initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
                    whileInView={{ rotate: -6, scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    whileHover={{ rotate: -1, scale: 1.06, zIndex: 30 }}
                    className="absolute top-2 left-0 w-48 sm:w-52 p-3 pb-8 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.22)] border border-[#FDE68A]/60 cursor-pointer transform transition-all duration-300"
                  >
                    {/* Golden washi tape top clip */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-gradient-to-r from-[#D4AF37]/50 via-[#FDE68A]/80 to-[#D4AF37]/50 rounded-sm shadow-sm rotate-2" />

                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-100 shadow-inner">
                      <Image
                        src="/images/story_1.jpg"
                        alt="Arpita and Manish together by the golden waters"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="220px"
                      />
                    </div>
                    {/* Polaroid caption text */}
                    <p className="font-cormorant italic text-xs text-stone-700 text-center mt-2.5 font-bold">
                      By the golden waters &bull; 2025
                    </p>
                  </motion.div>

                  {/* Polaroid 2 (Right Overlapping, Tilted +6deg) */}
                  <motion.div
                    initial={{ rotate: 8, scale: 0.9, opacity: 0 }}
                    whileInView={{ rotate: 5, scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    whileHover={{ rotate: 0, scale: 1.06, zIndex: 30 }}
                    className="absolute top-10 right-0 w-48 sm:w-52 p-3 pb-8 bg-white rounded-2xl shadow-[0_25px_45px_rgba(0,0,0,0.26)] border border-[#FDE68A]/60 cursor-pointer z-10 transform transition-all duration-300"
                  >
                    {/* Decorative 3D gold wax seal stamp */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-tr from-[#B45309] via-[#D4AF37] to-[#FEF08A] border-2 border-white shadow-md flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-white text-white drop-shadow-sm" />
                    </div>

                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-100 shadow-inner">
                      <Image
                        src="/images/story_2.jpg"
                        alt="Couple heart hands against sunset"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="220px"
                      />
                    </div>
                    {/* Polaroid caption text */}
                    <p className="font-cormorant italic text-xs text-stone-700 text-center mt-2.5 font-bold">
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
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-serif text-xs uppercase tracking-widest font-bold shadow-[0_6px_22px_rgba(180,83,9,0.35)] hover:brightness-110 active:scale-95 transition-all transform hover:-translate-y-0.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Our Story</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Card3DTilt>

      {/* FULL STORY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FDF2F7] p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.35)] max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-6">
                <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#B45309] font-bold">
                  The Journey of {couple.fullName}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E2E] mt-1">
                  Our Complete Love Story
                </h3>
                <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto mt-2" />
              </div>

              {/* Milestones Timeline */}
              <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#D4AF37] before:to-[#FDA4AF]">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-[#B45309] to-[#FDE68A] border-2 border-white shadow-sm" />
                    
                    <span className="text-[11px] font-serif uppercase tracking-wider font-bold text-[#B45309] block">
                      {m.year}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#4A0E2E]">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 text-center">
                <p className="font-cormorant italic text-base text-[#4A0E2E] font-semibold">
                  &ldquo;Cannot wait to celebrate with you on 18th January 2027!&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
