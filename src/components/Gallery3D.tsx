"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

export function Gallery3D() {
  const images = [
    {
      src: "/images/gallery_mehendi.jpg",
      title: "Bridal Henna",
      caption: "Intricate patterns woven with love and sacred traditions.",
    },
    {
      src: "/images/story_2.jpg",
      title: "Sunset Serenade",
      caption: "Hand in hand, watching our dreams unfold into reality.",
    },
    {
      src: "/images/venue_palace.jpg",
      title: "Royal Mandap",
      caption: "The majestic celebration palace illuminated for our wedding night.",
    },
    {
      src: "/images/gallery_rings.jpg",
      title: "Sacred Bands",
      caption: "Eternal gold rings symbolizing an unbreakable vow.",
    },
  ];

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const prev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + images.length) % images.length);
    }
  };

  const next = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % images.length);
    }
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        {/* Section Heading */}
        <div className="flex items-center justify-center gap-2 text-[#9F1239] text-xs font-serif uppercase tracking-[0.25em] font-semibold mb-2">
          <span className="h-[1px] w-8 bg-[#9F1239]/40" />
          <Heart className="w-3.5 h-3.5 fill-[#BE123C] text-[#BE123C]" />
          <span>Our Gallery</span>
          <Heart className="w-3.5 h-3.5 fill-[#BE123C] text-[#BE123C]" />
          <span className="h-[1px] w-8 bg-[#9F1239]/40" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#4A0E2E] tracking-wider mb-8">
          Captured Moments of Joy
        </h2>

        {/* 4 CARDS GRID WITH 3D TILT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((item, idx) => (
            <Card3DTilt key={idx} intensity={14} glare={true} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => setActiveIdx(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.18)] border-2 border-white/90 hover:border-[#FDE68A] cursor-pointer bg-stone-100 transition-all duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 250px"
                />
                
                {/* 3D Gold Corner Accents */}
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#FDE68A]" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                  <span className="font-serif text-xs font-bold text-white tracking-wider">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-white/90 line-clamp-1">
                    {item.caption}
                  </span>
                </div>
              </motion.div>
            </Card3DTilt>
          ))}
        </div>
      </motion.div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-50 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-50 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-50 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={activeIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40">
                <Image
                  src={images[activeIdx].src}
                  alt={images[activeIdx].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>

              <div className="mt-4 text-center text-white px-4">
                <h3 className="font-serif text-xl font-bold tracking-wider text-[#FDE68A]">
                  {images[activeIdx].title}
                </h3>
                <p className="font-cormorant italic text-sm text-stone-300 mt-1">
                  {images[activeIdx].caption}
                </p>
                <span className="text-[11px] font-serif text-stone-400 mt-2 block">
                  {activeIdx + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
