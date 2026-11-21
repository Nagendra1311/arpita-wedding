"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldenParticles } from "@/components/GoldenParticles";
import { WeddingLogo } from "@/components/WeddingLogo";
import { OpenInvitationButton } from "@/components/OpenInvitationButton";
import { PortraitVideoPlayer, PortraitVideoPlayerHandle } from "@/components/PortraitVideoPlayer";
import { weddingConfig } from "@/config/weddingConfig";

export function WeddingInvitationContainer() {
  const [stage, setStage] = useState<"SEALED" | "OPENING" | "PLAYING">("SEALED");
  const videoPlayerRef = useRef<PortraitVideoPlayerHandle | null>(null);

  const { animation } = weddingConfig;

  // Handle guest tapping "Open Invitation"
  const handleOpenInvitation = () => {
    if (stage !== "SEALED") return;

    // 1. Prime audio context immediately within user tap event (critical for mobile iOS/Android)
    if (videoPlayerRef.current) {
      videoPlayerRef.current.primeAudio();
    }

    // 2. Set stage to OPENING - keeps logo visible for 2-3 seconds as specified
    setStage("OPENING");

    const holdMs = (animation.logoHoldDurationSeconds || 2.5) * 1000;

    setTimeout(() => {
      // 3. Smoothly fade logo out and automatically start portrait video with original audio
      setStage("PLAYING");
      if (videoPlayerRef.current) {
        videoPlayerRef.current.playVideo();
      }
    }, holdMs);
  };

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-[#060504] select-none">
      {/* BACKGROUND VIDEO PLAYER (Active underneath and reveals upon logo fade-out) */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <PortraitVideoPlayer
          ref={videoPlayerRef}
          isVisible={stage === "PLAYING"}
        />
      </div>

      {/* FULL-SCREEN LUXURY OVERLAY (Logo, Golden Glow, and Open Invitation Button) */}
      <AnimatePresence>
        {stage !== "PLAYING" && (
          <motion.div
            key="luxury-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: animation.fadeOutDurationSeconds || 1.0,
              ease: [0.4, 0, 0.2, 1], // Smooth luxury cubic-bezier ease
            }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#080706] via-[#050403] to-[#0a0806]"
          >
            {/* Ambient golden dust particles drifting in luxury background */}
            <GoldenParticles density={50} />

            {/* Subtle luxury vignette gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]"
              aria-hidden="true"
            />

            {/* Center Logo & Monogram with Golden Glow Effect */}
            <div className="relative z-20 flex flex-col items-center justify-center max-w-lg w-full">
              <WeddingLogo isOpening={stage === "OPENING"} />

              {/* Open Invitation Button */}
              <OpenInvitationButton
                onOpen={handleOpenInvitation}
                isOpening={stage === "OPENING"}
              />
            </div>

            {/* Corner Decorative Royal Border Accents */}
            <div className="pointer-events-none absolute top-6 left-6 w-8 h-8 border-t border-l border-gold-400/30 opacity-70" />
            <div className="pointer-events-none absolute top-6 right-6 w-8 h-8 border-t border-r border-gold-400/30 opacity-70" />
            <div className="pointer-events-none absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold-400/30 opacity-70" />
            <div className="pointer-events-none absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold-400/30 opacity-70" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
