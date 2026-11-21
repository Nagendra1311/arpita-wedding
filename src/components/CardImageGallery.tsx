"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Layers } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { Card3DTilt } from "./Card3DTilt";

export function CardImageGallery() {
  const { cardImages, couple } = weddingConfig;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cover" | "details">("cover");

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#D4AF37]/50 text-[#4A0E2E] mb-3">
          <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            Original Invitation Card
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E2E] tracking-wider uppercase">
          Royal Wedding Invitation
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="rotate-45 w-1.5 h-1.5 bg-[#D4AF37]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className="font-cormorant italic text-sm md:text-base text-[#7A1D49] max-w-md mx-auto">
          Tap on either card to view in full crystal-clear resolution.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab("cover")}
            className={`px-5 py-2 rounded-full font-serif text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "cover"
                ? "bg-[#4A0E2E] text-[#F3E5AB] shadow-md border border-[#D4AF37]"
                : "bg-white/80 text-[#4A0E2E] border border-[#4A0E2E]/20 hover:bg-white"
            }`}
          >
            Front Cover Card
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-5 py-2 rounded-full font-serif text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "details"
                ? "bg-[#4A0E2E] text-[#F3E5AB] shadow-md border border-[#D4AF37]"
                : "bg-white/80 text-[#4A0E2E] border border-[#4A0E2E]/20 hover:bg-white"
            }`}
          >
            Ceremony Details Card
          </button>
        </div>
      </div>

      {/* Card Display Container with 3D Tilt */}
      <div className="flex justify-center">
        <Card3DTilt intensity={8} glare={true} className="max-w-2xl w-full">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedImage(activeTab === "cover" ? cardImages.cover : cardImages.details)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(74,14,46,0.22)] border-2 border-[#D4AF37]/60 w-full bg-black/5"
          >
            {/* Card Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[1.414/1]">
              <Image
                src={activeTab === "cover" ? cardImages.cover : cardImages.details}
                alt={`${couple.fullName} Wedding Invitation Card`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[#4A0E2E] font-serif text-xs uppercase tracking-wider font-semibold shadow-lg backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Tap to Enlarge</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Card3DTilt>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            >
              <div className="relative w-full h-full max-h-[85vh]">
                <Image
                  src={selectedImage}
                  alt="Expanded Wedding Invitation Card"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow-lg cursor-pointer"
                aria-label="Close enlarged card"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
