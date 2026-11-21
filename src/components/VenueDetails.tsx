"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Copy, Check, Car, ExternalLink } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export function VenueDetails() {
  const { event } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#D4AF37]/50 text-[#4A0E2E] mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            Location & Venue
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E2E] tracking-wider uppercase">
          Wedding Venue
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="rotate-45 w-1.5 h-1.5 bg-[#D4AF37]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
      </div>

      {/* Royal Venue Card */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#D4AF37] via-[#AA7A1E] to-[#4A0E2E] shadow-xl max-w-2xl mx-auto">
        <div className="rounded-[22px] bg-gradient-to-b from-white via-[#FCF3F7] to-[#FDF4F8] p-8 text-center border border-[#D4AF37]/40 relative overflow-hidden">
          
          {/* Palace Motif Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A0E2E] to-[#7A1D49] text-[#F3E5AB] flex items-center justify-center mx-auto mb-4 border border-[#D4AF37] shadow-md">
            <MapPin className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#4A0E2E] tracking-wider uppercase">
            {event.venueName}
          </h3>

          <p className="font-serif text-sm md:text-base text-slate-700 max-w-md mx-auto my-3 leading-relaxed">
            {event.venueAddress}
          </p>

          <p className="font-cormorant italic text-sm text-[#7A1D49] mt-2 mb-6">
            Valet parking and warm hospitality await your graceful presence.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            {/* Google Maps Link */}
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#4A0E2E] text-[#F3E5AB] font-serif text-xs uppercase tracking-widest font-semibold border border-[#D4AF37] hover:brightness-110 shadow-md transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#D4AF37]" />
              <span>Get Directions</span>
            </a>

            {/* Copy Address */}
            <button
              onClick={handleCopyAddress}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#4A0E2E] font-serif text-xs uppercase tracking-wider font-semibold border border-[#4A0E2E]/30 hover:bg-[#FDF0F5] transition-all active:scale-95 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#7A1D49]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
