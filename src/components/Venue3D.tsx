"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation, Copy, Check, MessageCircle } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { Card3DTilt } from "./Card3DTilt";

export function Venue3D() {
  const { event } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto py-12 px-4">
      <Card3DTilt intensity={6} glare={false}>
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/80 via-white to-[#FBCFE8]/60 shadow-[0_25px_60px_rgba(212,175,55,0.2)]">
          <div className="rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF6FA] to-[#FCEDF2] p-6 sm:p-8 border border-[#FDE68A]/50 overflow-hidden">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* LEFT: 3D ARCHED PALACE IMAGE */}
              <div className="md:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.22)] border-2 border-white group">
                <Image
                  src="/images/venue_palace.jpg"
                  alt={event.venueName}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                
                {/* 3D Royal Arch Overlay Border */}
                <div className="absolute inset-0 border-[6px] border-[#D4AF37]/30 rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-serif tracking-wider border border-white/30 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#FDE68A]" />
                  <span>{event.venueName}</span>
                </div>
              </div>

              {/* RIGHT: VENUE DETAILS & ACTION BUTTONS */}
              <div className="md:col-span-6 flex flex-col justify-center text-center md:text-left">
                
                {/* Header pill */}
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-[#9F1239] text-xs font-serif uppercase tracking-[0.2em] font-semibold mb-2">
                  <MapPin className="w-4 h-4 text-[#B45309]" />
                  <span>Wedding Venue</span>
                </div>

                {/* Palace Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E2E] tracking-wide">
                  {event.venueName}
                </h3>

                {/* Address */}
                <p className="flex items-start justify-center md:justify-start gap-1.5 text-xs sm:text-sm text-stone-600 mt-2 font-medium">
                  <MapPin className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                  <span>{event.venueAddress}</span>
                </p>

                {/* Poetic description */}
                <p className="font-cormorant italic text-sm text-[#7A1D49] my-4 leading-relaxed">
                  &ldquo;A grand venue for our special day, filled with love, laughter and unforgettable memories.&rdquo;
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1">
                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-serif text-xs uppercase tracking-wider font-bold shadow-[0_6px_20px_rgba(180,83,9,0.35)] hover:brightness-110 active:scale-95 transition-all transform hover:-translate-y-0.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>View on Maps &rarr;</span>
                  </a>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-[#4A0E2E] border border-stone-300 hover:bg-stone-50 font-serif text-xs uppercase tracking-wider font-semibold shadow-sm transition-all active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Contact & Assistance */}
                <div className="mt-4 pt-3 border-t border-[#4A0E2E]/10 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-serif text-[#7A1D49]">
                  <span className="text-stone-500">Need directions?</span>
                  <a
                    href={`https://wa.me/${weddingConfig.rsvp.whatsappNumber}?text=${encodeURIComponent("Hello! Could you please guide me with the directions to " + event.venueName + "?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
                    <span>WhatsApp / Call: {weddingConfig.rsvp.phoneFormatted}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card3DTilt>
    </section>
  );
}
