"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Clock, RotateCcw, Heart, CheckCircle2, Share2 } from "lucide-react";
import { triggerCelebration, playChimeSound } from "./CelebrationEffects";
import { weddingConfig } from "@/config/weddingConfig";

export function ScratchCardDate() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { couple, event } = weddingConfig;

  // Countdown Calculation
  useEffect(() => {
    const targetDate = new Date(event.weddingDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.weddingDateIso]);

  // Draw Gold Foil on Canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Reset composite operation
    ctx.globalCompositeOperation = "source-over";

    // 1. Base Rich Champagne Rose Gold Metallic Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, "#D4AF37");
    goldGrad.addColorStop(0.25, "#FDE68A");
    goldGrad.addColorStop(0.5, "#AA7A1E");
    goldGrad.addColorStop(0.75, "#FBE7A1");
    goldGrad.addColorStop(1, "#85581A");

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Ornate Inner Gold Foil Border
    ctx.strokeStyle = "#4A0E2E";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    // Dotted pattern border
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = "rgba(74, 14, 46, 0.4)";
    ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.setLineDash([]);

    // 3. Corner Ornaments
    const drawCorner = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.fillStyle = "#4A0E2E";
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(10, 10, 0);
    drawCorner(w - 10, 10, 90);
    drawCorner(w - 10, h - 10, 180);
    drawCorner(10, h - 10, 270);

    // 4. Center Gold Wax Seal Emblem
    const centerX = w / 2;
    const centerY = h / 2 - 12;

    const sealGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 44);
    sealGrad.addColorStop(0, "#FFFBEB");
    sealGrad.addColorStop(0.7, "#D4AF37");
    sealGrad.addColorStop(1, "#785311");
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#4A0E2E";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Monogram inside seal
    ctx.fillStyle = "#4A0E2E";
    ctx.font = "bold 22px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AM", centerX, centerY);

    // 5. Instruction Typography on Gold Foil
    ctx.fillStyle = "#3D0C26";
    ctx.font = "bold 13px 'Montserrat', sans-serif";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", centerX, centerY + 62);

    ctx.fillStyle = "#4A0E2E";
    ctx.font = "italic 300 12px 'Cormorant Garamond', serif";
    ctx.fillText("Rub finger or mouse to unveil the wedding date", centerX, centerY + 82);

    setIsScratched(false);
    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // Scratch Action
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setHasInteracted(true);
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = "destination-out";

    // Scratch with feather-edge gradient circle
    const radius = 32 * dpr;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(0.65, "rgba(0, 0, 0, 0.9)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  };

  // Check how much percentage of the foil has been scratched
  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const step = 18;
    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const pixels = imgData.data;
    let totalSamples = 0;
    let clearedSamples = 0;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const index = (y * w + x) * 4 + 3; // alpha channel
        totalSamples++;
        if (pixels[index] < 128) {
          clearedSamples++;
        }
      }
    }

    const percent = Math.round((clearedSamples / totalSamples) * 100);
    setScratchPercent(percent);

    if (percent >= 38 && !isScratched) {
      triggerReveal();
    }
  };

  // Trigger grand reveal with confetti & celebration
  const triggerReveal = () => {
    setIsScratched(true);
    setScratchPercent(100);
    triggerCelebration(0.5, 0.45);
    playChimeSound();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };
  const handleMouseUp = () => setIsDrawing(false);

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      e.preventDefault();
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const handleTouchEnd = () => setIsDrawing(false);

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Wedding: ${couple.fullName} (#ManniKiMini)`);
    const details = encodeURIComponent(
      `Celebrating the wedding of ${couple.fullName}!\nVenue: ${event.venueName}, ${event.venueAddress}\nTagline: ${event.tagline}`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270118T123000Z/20270118T183000Z&details=${details}&location=${location}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto my-6 px-3"
    >
      {/* Container Frame with 3D Luxury Glass Arch styling */}
      <div
        ref={containerRef}
        className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#4A0E2E] shadow-[0_20px_50px_rgba(212,175,55,0.25)]"
      >
        <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FCF3F7] to-[#FDF0F5] border-2 border-[#D4AF37]/50 min-h-[390px] flex flex-col items-center justify-between p-6 text-center select-none shadow-inner">
          
          {/* UNDERNEATH: REVEALED WEDDING DATE CARD */}
          <div className="w-full flex flex-col items-center justify-center py-2">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0E2E]/10 border border-[#4A0E2E]/20 text-[#4A0E2E] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-serif text-[11px] uppercase tracking-widest font-semibold">
                Save The Auspicious Date
              </span>
            </div>

            {/* Couple Monogram / Shubh Vivah */}
            <h4 className="font-cormorant italic text-sm text-[#7A1D49] tracking-widest font-medium">
              Shubh Vivah &bull; The Wedding of
            </h4>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#4A0E2E] tracking-wider mt-0.5 mb-2">
              {couple.fullName}
            </h3>

            {/* BIG HIGHLIGHTED DATE */}
            <div className="my-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#4A0E2E] via-[#5D123A] to-[#4A0E2E] text-white shadow-[0_8px_25px_rgba(74,14,46,0.35)] border border-[#D4AF37]/60 w-full max-w-[290px]">
              <div className="flex items-center justify-center gap-2 text-[#FDE68A] font-serif text-xs uppercase tracking-[0.2em] mb-1 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>Monday Evening</span>
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                18 <span className="text-[#FDE68A] text-2xl font-light">|</span> JAN <span className="text-[#FDE68A] text-2xl font-light">|</span> 2027
              </div>
              <p className="text-[11px] text-[#F3E5AB] font-serif tracking-widest uppercase mt-1">
                Auspicious Muhurat
              </p>
            </div>

            {/* LIVE COUNTDOWN TIMER */}
            <div className="w-full mt-3 pt-3 border-t border-[#4A0E2E]/15">
              <div className="flex items-center justify-center gap-1.5 text-xs font-serif text-[#7A1D49] tracking-widest uppercase mb-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Countdown to the Big Day</span>
              </div>

              <div className="grid grid-cols-4 gap-2 w-full max-w-[290px] mx-auto">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINS", val: timeLeft.minutes },
                  { label: "SECS", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/90 border border-[#D4AF37]/40 shadow-sm"
                  >
                    <span className="font-serif text-lg font-bold text-[#4A0E2E]">
                      {item.val.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] tracking-wider text-[#7A1D49] font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 w-full max-w-[290px]">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#4A0E2E] text-[#F3E5AB] border border-[#D4AF37] font-serif text-xs uppercase tracking-wider font-medium shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Add to Calendar</span>
              </a>

              {isScratched && (
                <button
                  onClick={initCanvas}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-white text-[#4A0E2E] border border-[#4A0E2E]/30 font-serif text-[11px] uppercase tracking-wider hover:bg-[#FDF0F5] transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Scratch Again</span>
                </button>
              )}
            </div>
          </div>

          {/* TOP SCRATCHABLE GOLD FOIL CANVAS */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 w-full h-full cursor-pointer z-20 touch-none rounded-[20px]"
            />
          )}

          {/* HINT OVERLAY: Animated floating finger guide before first interaction */}
          {!hasInteracted && !isScratched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#4A0E2E]/95 text-white backdrop-blur-md border border-[#FDE68A] shadow-lg"
            >
              <motion.span
                animate={{ x: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-base"
              >
                👉
              </motion.span>
              <span className="font-serif text-[11px] tracking-wider uppercase text-[#FDE68A]">
                Rub here to reveal
              </span>
            </motion.div>
          )}

          {/* PROGRESS INDICATOR PILL */}
          {hasInteracted && !isScratched && scratchPercent > 0 && (
            <div className="pointer-events-none absolute top-3 right-3 z-30 px-2.5 py-0.5 rounded-full bg-[#4A0E2E]/95 text-[#FDE68A] text-[10px] font-serif border border-[#D4AF37]/60 shadow">
              {scratchPercent}% Uncovered
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
