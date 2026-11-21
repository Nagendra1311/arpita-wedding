"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Film, Heart, ArrowUp, Share2, Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { RosePetals3D } from "./RosePetals3D";
import { HeroLuxury3D } from "./HeroLuxury3D";
import { LoveStory3D } from "./LoveStory3D";
import { WeddingEvents3D } from "./WeddingEvents3D";
import { ScratchCardDate } from "./ScratchCardDate";
import { Venue3D } from "./Venue3D";
import { RsvpEnvelope3D } from "./RsvpEnvelope3D";
import { Gallery3D } from "./Gallery3D";
import { WardrobePlanner3D } from "./WardrobePlanner3D";
import { CardImageGallery } from "./CardImageGallery";

export function WeddingCardPage() {
  const { couple, event, shloka, family } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9FB] text-[#2C061A] selection:bg-[#FDE68A] selection:text-[#4A0E2E] overflow-x-hidden font-sans">
      
      {/* 3D FLOATING ROSE PETALS (Canvas with 3D depth-of-field) */}
      <RosePetals3D />

      {/* 1. HERO SECTION (3D GLASSMORPHIC DESIGN MATCHING ATTACHED IMAGE) */}
      <HeroLuxury3D />

      {/* AUSPICIOUS GANESH INVOCATION & BLESSINGS BANNER */}
      <section className="relative py-8 px-4 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="p-4 rounded-3xl bg-white/70 backdrop-blur-md border border-[#FDE68A]/60 shadow-[0_8px_25px_rgba(212,175,55,0.12)]"
        >
          <div className="inline-block p-1.5 px-3 rounded-full bg-[#4A0E2E]/10 text-[#4A0E2E] text-xs font-serif uppercase tracking-widest font-bold mb-2">
            🕉️ {shloka.sanskritTop}
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#7A1D49] leading-relaxed whitespace-pre-line font-medium max-w-md mx-auto">
            {shloka.sanskritMain}
          </p>
          <div className="mt-3 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-600 font-serif">
            <span>D/o {family.brideParents}</span>
            <span className="text-[#D4AF37]">&bull;</span>
            <span>S/o {family.groomParents}</span>
          </div>
        </motion.div>
      </section>

      {/* 2. OUR LOVE STORY (3D POLAROIDS MATCHING ATTACHED IMAGE) */}
      <LoveStory3D />

      {/* 3. WEDDING EVENTS (HORIZONTAL TIMELINE WITH GLOWING 3D ORBS) */}
      <WeddingEvents3D />

      {/* 4. INTERACTIVE SCRATCH CARD DATE REVEAL */}
      <section className="py-6">
        <div className="text-center mb-2 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#FDE68A] text-[#4A0E2E] mb-2">
            <span className="text-xs">✨</span>
            <span className="font-serif text-[11px] uppercase tracking-widest font-bold">
              Special Moment
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#4A0E2E] uppercase tracking-wider">
            Scratch To Reveal The Marriage Date
          </h2>
          <p className="font-cormorant italic text-xs md:text-sm text-[#7A1D49] mt-0.5">
            Gently rub with finger or mouse to uncover the auspicious muhurat!
          </p>
        </div>

        {/* 3D Scratch Card */}
        <ScratchCardDate />
      </section>

      {/* 5. WEDDING VENUE (3D ARCHED PALACE CARD) */}
      <Venue3D />

      {/* 6. WILL YOU BE THERE? (3D ENVELOPE WITH EMBOSSED WAX SEAL) */}
      <RsvpEnvelope3D />

      {/* 7. OUR GALLERY (3D ROUNDED PHOTO CARDS WITH LIGHTBOX) */}
      <Gallery3D />

      {/* 8. WARDROBE PLANNER SECTION */}
      <WardrobePlanner3D />

      {/* 9. PRINTED INVITATION LEAFLETS VIEWER */}
      <CardImageGallery />

      {/* 10. LUXURY 3D FOOTER (MATCHING BOTTOM OF DESIGN REFERENCE) */}
      <footer className="relative w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF1F6] to-[#FFE4EC] pt-12 pb-16 px-4 text-center border-t border-[#FDE68A]/40 overflow-hidden">
        
        {/* Soft floating background glow */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-[#FDA4AF]/20 blur-3xl -z-10" />

        <div className="max-w-md mx-auto flex flex-col items-center">
          
          {/* Quote matching image */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="font-cormorant italic text-xl sm:text-2xl text-[#4A0E2E] font-medium leading-relaxed mb-2"
          >
            &ldquo;Together is a wonderful place to be...&rdquo; ♡
          </motion.p>

          {/* Couple & Date */}
          <p className="font-serif text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#7A1D49] mb-4">
            {couple.fullName} &bull; {event.weddingDate}
          </p>

          {/* Social Icons matching design */}
          <div className="flex items-center justify-center gap-3 my-4">
            {[
              { icon: Instagram, label: "Instagram", url: "https://instagram.com" },
              { icon: Youtube, label: "YouTube", url: "https://youtube.com" },
              { icon: Facebook, label: "Facebook", url: "https://facebook.com" },
              { icon: MessageCircle, label: "WhatsApp", url: `https://wa.me/${weddingConfig.rsvp.whatsappNumber}` },
            ].map((soc, i) => {
              const IconComp = soc.icon;
              return (
                <a
                  key={i}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#B45309]/15 hover:bg-[#B45309]/30 text-[#B45309] border border-[#B45309]/30 flex items-center justify-center transition-all duration-300 shadow-sm transform hover:scale-110"
                  aria-label={soc.label}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Couple Hashtag Badge */}
          <div className="mt-2 inline-block px-4 py-1 rounded-full bg-white/70 border border-[#FDE68A] text-xs font-serif tracking-widest text-[#B45309] font-bold shadow-sm">
            {couple.hashtag}
          </div>

          {/* Watch Video Teaser Button Shortcut */}
          <div className="mt-6">
            <Link
              href="/video"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#4A0E2E] border border-[#D4AF37] font-serif text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Watch Video Invitation Backup &rarr;</span>
            </Link>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="mt-8 flex items-center gap-1.5 text-[11px] font-serif uppercase tracking-widest text-[#7A1D49] hover:text-[#4A0E2E] transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
