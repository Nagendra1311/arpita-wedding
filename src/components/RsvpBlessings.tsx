"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Send, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { triggerCelebration } from "./CelebrationEffects";

export function RsvpBlessings() {
  const { couple, rsvp } = weddingConfig;
  const [guestName, setGuestName] = useState("");
  const [customWish, setCustomWish] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCelebration(0.5, 0.7);

    const greeting = guestName.trim() ? `Dearest ${couple.fullName}, this is ${guestName.trim()}!\n\n` : `Dearest ${couple.fullName}!\n\n`;
    const messageBody = customWish.trim() || rsvp.defaultMessage;
    const fullText = encodeURIComponent(`${greeting}${messageBody}\n\n#ManniKiMini`);

    const waUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${fullText}`;
    window.open(waUrl, "_blank");
    setSent(true);
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#D4AF37]/50 text-[#4A0E2E] mb-3">
          <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
            Wishes & Blessings
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E2E] tracking-wider uppercase">
          Send Your Blessings
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="rotate-45 w-1.5 h-1.5 bg-[#D4AF37]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className="font-cormorant italic text-sm md:text-base text-[#7A1D49] max-w-md mx-auto">
          Your love, presence, and blessings make our forever truly complete.
        </p>
      </div>

      {/* Interactive Form Card */}
      <div className="max-w-lg mx-auto rounded-3xl p-1 bg-gradient-to-b from-[#D4AF37] via-[#AA7A1E] to-[#4A0E2E] shadow-xl">
        <form
          onSubmit={handleSendWhatsApp}
          className="rounded-[22px] bg-white p-6 sm:p-8 flex flex-col gap-4 border border-[#D4AF37]/30 text-center"
        >
          <div>
            <label className="block text-left font-serif text-xs uppercase tracking-wider text-[#4A0E2E] font-semibold mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Uncle Sharma / Priya & Family"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-slate-800 text-sm font-sans"
            />
          </div>

          <div>
            <label className="block text-left font-serif text-xs uppercase tracking-wider text-[#4A0E2E] font-semibold mb-1">
              Personal Message / Blessing for {couple.fullName}
            </label>
            <textarea
              rows={3}
              placeholder="Heartiest congratulations Arpita & Manish! Wishing you both a lifetime of love and happiness..."
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-slate-800 text-sm font-sans resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-serif text-xs uppercase tracking-widest font-bold shadow-lg hover:brightness-105 active:scale-95 transition-all mt-2"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Send Blessing on WhatsApp</span>
          </button>

          <p className="font-cormorant italic text-xs text-[#7A1D49] mt-2">
            Opens WhatsApp with your prefilled heartfelt wishes directly to the couple!
          </p>
        </form>
      </div>
    </section>
  );
}
