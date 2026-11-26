"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Check, X, Sparkles, MessageCircle, Phone } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { triggerCelebration } from "./CelebrationEffects";
import { Card3DTilt } from "./Card3DTilt";
import { RoyalCornerFlourish, MandalaBackground } from "./RoyalOrnaments";

export function RsvpEnvelope3D() {
  const { couple, rsvp } = weddingConfig;
  const [showWishesModal, setShowWishesModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [customWish, setCustomWish] = useState("");
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

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
      <Card3DTilt intensity={6} glare={false}>
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A]/80 via-white to-[#FBCFE8]/60 shadow-[0_25px_60px_rgba(212,175,55,0.2)]">
          <div className="rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF2F6] to-[#FCEBF1] p-6 sm:p-10 border border-[#FDE68A]/50 text-center relative overflow-hidden">
            {/* Corner Ornaments */}
            <RoyalCornerFlourish position="top-left" />
            <RoyalCornerFlourish position="top-right" />
            <RoyalCornerFlourish position="bottom-left" />
            <RoyalCornerFlourish position="bottom-right" />

            {/* Subtle Mandala Background */}
            <MandalaBackground size={420} opacity={0.06} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* LEFT: 3D INTERACTIVE ENVELOPE WITH OPENING FLAP */}
              <div className="md:col-span-5 flex justify-center py-4">
                <div
                  className="relative w-56 sm:w-64 aspect-[1.35/1] cursor-pointer select-none group"
                  style={{ perspective: "1000px" }}
                  onMouseEnter={() => setIsEnvelopeOpen(true)}
                  onMouseLeave={() => setIsEnvelopeOpen(false)}
                  onClick={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
                >
                  {/* Envelope Base Body */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#FFF1F2] to-[#FFE4E6] p-2 border-2 border-white shadow-[0_20px_45px_rgba(244,63,94,0.22)] flex items-center justify-center overflow-hidden">
                    {/* Interior Lining Gold Shimmer */}
                    <div className="absolute inset-2 rounded-xl bg-gradient-to-tr from-[#FDE68A]/20 via-[#BE123C]/10 to-[#FDE68A]/30" />
                    
                    {/* Fold lines SVG */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" fill="none">
                      <path d="M0 150 L85 80" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1.5" />
                      <path d="M200 150 L115 80" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1.5" />
                    </svg>

                    {/* Inside Invitation Letter (Slides Up when open) */}
                    <motion.div
                      animate={{
                        y: isEnvelopeOpen ? -36 : 0,
                        scale: isEnvelopeOpen ? 1.04 : 0.95,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute inset-x-4 top-4 bottom-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF5F8] border border-[#D4AF37]/60 shadow-lg p-3 flex flex-col items-center justify-center z-10"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] mb-1" />
                      <span className="font-serif text-[11px] font-bold text-[#4A0E2E] uppercase tracking-wider">
                        {couple.fullName}
                      </span>
                      <span className="font-cormorant italic text-[10px] text-[#7A1D49]">
                        Cordially Invites You
                      </span>
                      <span className="font-serif text-[9px] text-[#D4AF37] font-bold tracking-widest mt-1">
                        18 JAN 2027
                      </span>
                    </motion.div>
                  </div>

                  {/* 3D Top Flap that rotates open */}
                  <motion.div
                    animate={{
                      rotateX: isEnvelopeOpen ? -140 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                    className="absolute inset-x-0 top-0 h-1/2 z-20 pointer-events-none"
                  >
                    <svg className="w-full h-full drop-shadow-md" viewBox="0 0 200 75" preserveAspectRatio="none">
                      <polygon points="0,0 200,0 100,75" fill="#FFE4E6" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>

                    {/* 3D Embossed Gold Wax Seal (Mounted on the flap point) */}
                    <motion.div
                      animate={{
                        scale: isEnvelopeOpen ? 0.8 : 1,
                        opacity: isEnvelopeOpen ? 0.3 : 1,
                      }}
                      className="absolute top-[48px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#FFFBEB] via-[#D4AF37] to-[#785311] p-0.5 shadow-[0_8px_20px_rgba(180,83,9,0.4)] flex items-center justify-center border-2 border-[#FEF3C7] pointer-events-auto cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEnvelopeOpen(!isEnvelopeOpen);
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#946A17] via-[#D4AF37] to-[#FFFBEB] flex items-center justify-center shadow-inner">
                        <Heart className="w-5 h-5 fill-[#FFFBEB] text-[#FFFBEB] drop-shadow-md" />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* RIGHT: WILL YOU BE THERE HEADING & BUTTONS */}
              <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
                <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E2E] tracking-wide">
                  Will You Be There?
                </h3>

                <p className="font-cormorant italic text-base sm:text-lg text-[#7A1D49] mt-2 mb-6">
                  Your presence will make our day even more special.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                  {/* Yes, I'm Attending */}
                  <button
                    onClick={handleAttending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-serif text-xs uppercase tracking-wider font-bold shadow-[0_6px_22px_rgba(180,83,9,0.35)] hover:brightness-110 active:scale-95 transition-all transform hover:-translate-y-0.5"
                  >
                    <Heart className="w-4 h-4 fill-white text-white" />
                    <span>Yes, I&apos;m Attending</span>
                  </button>

                  {/* Send Blessings */}
                  <button
                    onClick={() => setShowWishesModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#4A0E2E] border border-[#FDE68A] font-serif text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Send Wishes</span>
                  </button>
                </div>

                {/* RSVP Contact info */}
                <div className="mt-5 pt-3 border-t border-[#4A0E2E]/10 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-serif text-[#7A1D49]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                    <span>WhatsApp / Call:</span>
                    <a
                      href={`https://wa.me/${rsvp.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A0E2E] hover:text-[#B45309] font-bold underline"
                    >
                      {rsvp.phoneFormatted || "+91 70658 91834"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card3DTilt>

      {/* SEND WISHES MODAL */}
      <AnimatePresence>
        {showWishesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowWishesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FDF2F7] p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-2xl"
            >
              <button
                onClick={() => setShowWishesModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#B45309] font-bold">
                  Warmest Blessings
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#4A0E2E] mt-1">
                  Send Your Wishes
                </h3>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Rahul & Family"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                    Number of Guests Attending
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-sm bg-white"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4+">4+ Guests (Family)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                    Your Blessing / Message
                  </label>
                  <textarea
                    rows={3}
                    value={customWish}
                    onChange={(e) => setCustomWish(e.target.value)}
                    placeholder="Wishing you a lifetime of love and happiness together..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-sm bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white font-serif text-xs uppercase tracking-wider font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  Send Blessing via WhatsApp &rarr;
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
