"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Clock, RotateCcw, Heart, Eye } from "lucide-react";
import { triggerCelebration, playChimeSound } from "./CelebrationEffects";
import { weddingConfig } from "@/config/weddingConfig";

export function ScratchCardDate() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const isScratchingRef = useRef(false);
  const lastCheckTimeRef = useRef(0);

  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
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
    const w = rect.width || 360;
    const h = rect.height || 390;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    ctx.save();
    ctx.scale(dpr, dpr);

    // Reset composite operation to draw foil
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
    const drawCorner = (cx: number, cy: number) => {
      ctx.fillStyle = "#4A0E2E";
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(10, 10);
    drawCorner(w - 10, 10);
    drawCorner(w - 10, h - 10);
    drawCorner(10, h - 10);

    // 4. Center Gold Wax Seal Emblem
    const centerX = w / 2;
    const centerY = h / 2 - 12;

    const sealGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 44);
    sealGrad.addColorStop(0, "#FFFBEB");
    sealGrad.addColorStop(0.7, "#D4AF37");
    sealGrad.addColorStop(1, "#785311");
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 42, 0, Math.PI * 2);
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
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", centerX, centerY + 64);

    ctx.fillStyle = "#4A0E2E";
    ctx.font = "italic 300 12px 'Cormorant Garamond', serif";
    ctx.fillText("Rub finger or mouse to unveil the wedding date", centerX, centerY + 84);

    ctx.restore();

    setIsScratched(false);
    setScratchPercent(0);
    lastPointRef.current = null;
    isScratchingRef.current = false;
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  // Trigger grand reveal with confetti & celebration
  const triggerReveal = useCallback(() => {
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
  }, []);

  // Check scratch progress with throttling
  const checkScratchProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = Date.now();
    if (now - lastCheckTimeRef.current < 120) return;
    lastCheckTimeRef.current = now;

    const step = 24;
    const w = canvas.width;
    const h = canvas.height;
    if (w <= 0 || h <= 0) return;

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let totalSamples = 0;
      let clearedSamples = 0;

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const index = (y * w + x) * 4 + 3;
          totalSamples++;
          if (pixels[index] < 128) {
            clearedSamples++;
          }
        }
      }

      const percent = Math.min(100, Math.round((clearedSamples / totalSamples) * 100));
      setScratchPercent(percent);

      if (percent >= 30) {
        triggerReveal();
      }
    } catch {
      // ignore security exceptions if any
    }
  }, [isScratched, triggerReveal]);

  // Accurate Scratch Action with Line Interpolation and Correct DPI Mapping
  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isScratched) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setHasInteracted(true);
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      const radius = 38 * Math.max(scaleX, 1);
      ctx.lineWidth = radius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (lastPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      lastPointRef.current = { x, y };

      checkScratchProgress();
    },
    [isScratched, checkScratchProgress]
  );

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isScratchingRef.current = true;
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratchingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    checkScratchProgress();
  };

  // Touch Handlers with passive-safe touch event handling
  const handleTouchStart = (e: React.TouchEvent) => {
    isScratchingRef.current = true;
    lastPointRef.current = null;
    if (e.touches[0]) {
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratchingRef.current) return;
    if (e.touches[0]) {
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    checkScratchProgress();
  };

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
        className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#4A0E2E] shadow-[0_25px_60px_rgba(212,175,55,0.28)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.38)] transition-all duration-300"
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
              style={{ touchAction: "none" }}
              className="absolute inset-0 w-full h-full cursor-crosshair z-20 rounded-[20px]"
            />
          )}

          {/* HINT OVERLAY: Animated floating finger guide before first interaction */}
          {!hasInteracted && !isScratched && (
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 w-full px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#4A0E2E]/95 text-white backdrop-blur-md border border-[#FDE68A] shadow-lg"
              >
                <motion.span
                  animate={{ x: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-base"
                >
                  👉
                </motion.span>
                <span className="font-serif text-[11px] tracking-wider uppercase text-[#FDE68A]">
                  Rub with finger or mouse
                </span>
              </motion.div>

              {/* Instant reveal shortcut button for convenience */}
              <button
                onClick={triggerReveal}
                className="pointer-events-auto inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-[#4A0E2E] text-[10px] font-serif uppercase tracking-wider font-bold border border-[#D4AF37] shadow-md transition-all active:scale-95"
              >
                <Eye className="w-3 h-3 text-[#D4AF37]" />
                <span>Tap To Reveal Directly</span>
              </button>
            </div>
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
