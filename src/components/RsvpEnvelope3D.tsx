"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Check, X, MessageCircle, Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { triggerCelebration } from "./CelebrationEffects";

export function RsvpEnvelope3D() {
  const { couple, rsvp } = weddingConfig;
  const [showWishesModal, setShowWishesModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [customWish, setCustomWish] = useState("");

  const handleAttending = () => {
    triggerCelebration(0.5, 0.6);
    const msg = encodeURIComponent(
      `Dear ${couple.fullName}, we are delighted to attend your wedding celebration! Wishing you both a lifetime of love and joy! ❤️\n\n#ManniKiMini`
    );
    window.open(`https://wa.me/${rsvp.whatsappNumber}?text=${msg}`, "_blank");
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCelebration(0.5, 0.6);
    const namePart = guestName.trim() ? `From: ${guestName.trim()}\n` : "";
    const wishBody = customWish.trim() || "Sending you our heartfelt blessings on your special day!";
    const msg = encodeURIComponent(
      `Dearest ${couple.fullName},\n\n${namePart}${wishBody}\n\nWith love and blessings for #ManniKiMini!`
    );
    window.open(`https://wa.me/${rsvp.whatsappNumber}?text=${msg}`, "_blank");
    setShowWishesModal(false);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/60 via-white to-[#FBCFE8]/40 shadow-[0_20px_50px_rgba(212,175,55,0.18)]"
      >
        <div className="rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF2F6] to-[#FCEBF1] p-6 sm:p-10 border border-[#FDE68A]/40 text-center relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: 3D ENVELOPE WITH 3D EMBOSSED GOLD HEART WAX SEAL */}
            <div className="md:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ rotate: -2, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="relative w-48 sm:w-56 aspect-[1.35/1] rounded-2xl bg-gradient-to-b from-[#FFF1F2] to-[#FFE4E6] p-2 border-2 border-white shadow-[0_15px_35px_rgba(244,63,94,0.18)] flex items-center justify-center cursor-pointer"
                onClick={handleAttending}
              >
                {/* Envelope Flap Fold Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" fill="none">
                  {/* Flap Triangles */}
                  <path d="M0 0 L100 85 L200 0" stroke="rgba(244, 63, 94, 0.25)" strokeWidth="1.5" />
                  <path d="M0 150 L80 75" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1.2" />
                  <path d="M200 150 L120 75" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1.2" />
                </svg>

                {/* 3D Embossed Gold Wax Seal */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#FFFBEB] via-[#D4AF37] to-[#785311] p-1 shadow-[0_8px_20px_rgba(180,83,9,0.35)] flex items-center justify-center border-2 border-[#FEF3C7]">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#946A17] via-[#D4AF37] to-[#FFFBEB] flex items-center justify-center shadow-inner">
                    <Heart className="w-6 h-6 fill-[#FFFBEB] text-[#FFFBEB] drop-shadow-md" />
                  </div>
                </div>

                {/* Delicate pink rose petal decoration */}
                <div className="absolute -bottom-2 -left-2 text-xl pointer-events-none">🌸</div>
                <div className="absolute -top-2 -right-2 text-xl pointer-events-none">✨</div>
              </motion.div>
            </div>

            {/* RIGHT: WILL YOU BE THERE HEADING & BUTTONS */}
            <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E2E] tracking-wide">
                Will You Be There?
              </h3>

              <p className="font-cormorant italic text-base sm:text-lg text-[#7A1D49] mt-2 mb-6">
                Your presence will make our day even more special.
              </p>

              {/* Action Buttons matching design */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                {/* Yes, I'm Attending (Amber/Gold Button) */}
                <button
                  onClick={handleAttending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-serif text-xs uppercase tracking-wider font-bold shadow-[0_6px_20px_rgba(180,83,9,0.35)] hover:brightness-110 active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Yes, I&apos;m Attending</span>
                </button>

                {/* Send Blessings (Glassmorphic Pill) */}
                <button
                  onClick={() => setShowWishesModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-[#4A0E2E] font-serif text-xs uppercase tracking-wider font-bold shadow-sm active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#B45309]" />
                  <span>Send Blessings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BLESSINGS POPUP MODAL */}
      <AnimatePresence>
        {showWishesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWishesModal(false)}
            className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FDF2F7] p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-2xl"
            >
              <button
                onClick={() => setShowWishesModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <Heart className="w-8 h-8 fill-[#BE123C] text-[#BE123C] mx-auto mb-2" />
                <h3 className="font-serif text-2xl font-bold text-[#4A0E2E]">
                  Send Your Love &amp; Wishes
                </h3>
                <p className="font-cormorant italic text-xs text-[#7A1D49]">
                  For {couple.fullName} (#ManniKiMini)
                </p>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-left text-xs font-serif uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh &amp; Family"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-left text-xs font-serif uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                    Your Heartfelt Blessing
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Wishing you a lifetime of joy, laughter and togetherness..."
                    value={customWish}
                    onChange={(e) => setCustomWish(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D4AF37] text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-serif text-xs uppercase tracking-wider font-bold shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
