"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Film, ArrowUp, Instagram, Youtube, Facebook, MessageCircle, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { GoldenParticles } from "./GoldenParticles";
import { BackgroundMusic } from "./BackgroundMusic";
import { HeroLuxury3D } from "./HeroLuxury3D";
import { LoveStory3D } from "./LoveStory3D";
import { WeddingEvents3D } from "./WeddingEvents3D";
import { ScratchCardDate } from "./ScratchCardDate";
import { Venue3D } from "./Venue3D";
import { RsvpEnvelope3D } from "./RsvpEnvelope3D";
import { Gallery3D } from "./Gallery3D";
import { WardrobePlanner3D } from "./WardrobePlanner3D";
import { CardImageGallery } from "./CardImageGallery";
import { Card3DTilt } from "./Card3DTilt";
import { RoyalCornerFlourish, ShimmerDivider, MandalaBackground } from "./RoyalOrnaments";

export function WeddingCardPage() {
  const { couple, event, shloka, family } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9FB] text-[#2C061A] selection:bg-[#FDE68A] selection:text-[#4A0E2E] overflow-x-hidden font-sans">
      
      {/* 3D FLOATING GOLDEN AMBIENT STARDUST (Gently drifts upwards, replaces falling top leaves) */}
      <GoldenParticles density={28} />

      {/* AUTOPLAYING ROYAL WEDDING BACKGROUND MUSIC (With Floating Disc & Equalizer Control) */}
      <BackgroundMusic />

      {/* 1. HERO SECTION (3D GLASSMORPHIC DESIGN WITH CARD TILT & COUNTDOWN) */}
      <HeroLuxury3D />

      {/* AUSPICIOUS GANESH INVOCATION & BLESSINGS BANNER */}
      <section className="relative py-10 px-4 text-center max-w-2xl mx-auto">
        <Card3DTilt intensity={4} glare={true}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/95 via-[#FFFDF9]/90 to-[#FFF3F7]/95 backdrop-blur-md border border-[#FDE68A]/80 shadow-[0_16px_45px_rgba(212,175,55,0.22)] overflow-hidden group hover:shadow-[0_22px_60px_rgba(212,175,55,0.3)] transition-all"
          >
            {/* Corner Gold Flourishes */}
            <RoyalCornerFlourish position="top-left" />
            <RoyalCornerFlourish position="top-right" />
            <RoyalCornerFlourish position="bottom-left" />
            <RoyalCornerFlourish position="bottom-right" />

            {/* Subtle rotating mandala watermark */}
            <MandalaBackground size={320} opacity={0.06} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Top gold reflection line */}
            <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-gradient-to-r from-[#4A0E2E]/10 via-[#4A0E2E]/5 to-[#4A0E2E]/10 text-[#4A0E2E] text-xs font-serif uppercase tracking-widest font-bold mb-3 border border-[#D4AF37]/50 shadow-sm animate-pulse-glow-gold">
              <span className="text-sm">🕉️</span>
              <span className="tracking-[0.25em]">{shloka.sanskritTop}</span>
              <span className="text-sm">🕉️</span>
            </div>

            <p className="font-serif text-sm sm:text-base text-[#7A1D49] leading-relaxed whitespace-pre-line font-semibold max-w-lg mx-auto drop-shadow-sm">
              {shloka.sanskritMain}
            </p>

            <ShimmerDivider className="my-3 opacity-70" />

            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-700 font-serif font-medium">
              <span>D/o {family.brideParents}</span>
              <span className="text-[#D4AF37] font-bold">&bull;</span>
              <span>S/o {family.groomParents}</span>
            </div>
          </motion.div>
        </Card3DTilt>
      </section>

      {/* 2. OUR LOVE STORY (3D POLAROIDS WITH INTERACTIVE DEPTH) */}
      <LoveStory3D />

      {/* 3. WEDDING EVENTS (3D GLASS CEREMONIAL CARDS) */}
      <WeddingEvents3D />

      {/* 4. INTERACTIVE SCRATCH CARD DATE REVEAL */}
      <section className="py-8">
        <div className="text-center mb-3 px-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#FDE68A] text-[#4A0E2E] mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
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

      {/* 9. PRINTED INVITATION CARD VIEWER */}
      <CardImageGallery />

      {/* 10. LUXURY 3D FOOTER */}
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

          {/* Social Icons with 3D elevation */}
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
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-[#D4AF37] hover:text-[#2C061A] text-[#B45309] border border-[#D4AF37]/40 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(180,83,9,0.15)] transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(212,175,55,0.35)]"
                  aria-label={soc.label}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Couple Hashtag Badge */}
          <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-white/80 border border-[#FDE68A] text-xs font-serif tracking-widest text-[#B45309] font-bold shadow-sm">
            {couple.hashtag}
          </div>

          {/* Watch Video Teaser Button Shortcut */}
          <div className="mt-6">
            <Link
              href="/video"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#4A0E2E] border border-[#D4AF37] font-serif text-xs uppercase tracking-wider font-bold shadow-[0_4px_16px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.35)] transition-all active:scale-95 transform hover:-translate-y-0.5"
            >
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Watch Video Invitation &rarr;</span>
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
