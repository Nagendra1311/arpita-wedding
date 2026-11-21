"use client";

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw, Play, Pause, Calendar, MessageCircle, Heart, Share2 } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export interface PortraitVideoPlayerHandle {
  playVideo: () => Promise<void>;
  primeAudio: () => void;
  pauseVideo: () => void;
}

interface PortraitVideoPlayerProps {
  isVisible: boolean;
  onVideoEnded?: () => void;
}

export const PortraitVideoPlayer = forwardRef<PortraitVideoPlayerHandle, PortraitVideoPlayerProps>(
  ({ isVisible, onVideoEnded }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const ambientVideoRef = useRef<HTMLVideoElement | null>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const [showTapIndicator, setShowTapIndicator] = useState<"play" | "pause" | null>(null);
    const [needsUnmuteTap, setNeedsUnmuteTap] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);

    const { couple, event, media, rsvp } = weddingConfig;

    // Expose methods to parent container via ref
    useImperativeHandle(ref, () => ({
      primeAudio: () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = false;
        video.volume = 1.0;
        // Prime interaction on tap: brief play-and-pause or load
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            video.pause();
            video.currentTime = 0;
          }).catch((err) => {
            console.log("Audio prime catch (handled gracefully):", err);
          });
        }
      },
      playVideo: async () => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = 0;
        video.muted = false;
        video.volume = 1.0;

        try {
          await video.play();
          setIsPlaying(true);
          setIsMuted(false);
          setNeedsUnmuteTap(false);

          if (ambientVideoRef.current) {
            ambientVideoRef.current.currentTime = 0;
            ambientVideoRef.current.play().catch(() => {});
          }
        } catch (error) {
          console.warn("Unmuted autoplay restricted by browser policy; trying muted fallback:", error);
          // Fallback to muted playback if browser strictly blocks initial sound
          video.muted = true;
          setIsMuted(true);
          setNeedsUnmuteTap(true);
          try {
            await video.play();
            setIsPlaying(true);
            if (ambientVideoRef.current) {
              ambientVideoRef.current.play().catch(() => {});
            }
          } catch (e) {
            console.error("Video playback error:", e);
          }
        }
      },
      pauseVideo: () => {
        const video = videoRef.current;
        if (video) {
          video.pause();
          setIsPlaying(false);
        }
        if (ambientVideoRef.current) {
          ambientVideoRef.current.pause();
        }
      },
    }));

    // Synchronize video progress
    const handleTimeUpdate = () => {
      const video = videoRef.current;
      if (!video) return;
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      const video = videoRef.current;
      if (video) {
        setDuration(video.duration);
        setIsReady(true);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      if (onVideoEnded) onVideoEnded();
    };

    // Toggle Play/Pause on single tap anywhere on video
    const handleTogglePlay = () => {
      const video = videoRef.current;
      if (!video) return;

      if (needsUnmuteTap) {
        // First tap also unmutes if it was muted by browser policy
        video.muted = false;
        setIsMuted(false);
        setNeedsUnmuteTap(false);
      }

      if (video.paused) {
        video.play().then(() => {
          setIsPlaying(true);
          setShowTapIndicator("play");
          setTimeout(() => setShowTapIndicator(null), 600);
        }).catch(() => {});
        if (ambientVideoRef.current) ambientVideoRef.current.play().catch(() => {});
      } else {
        video.pause();
        setIsPlaying(false);
        setShowTapIndicator("pause");
        setTimeout(() => setShowTapIndicator(null), 600);
        if (ambientVideoRef.current) ambientVideoRef.current.pause();
      }
    };

    // Toggle Mute/Unmute
    const handleToggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;

      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) setNeedsUnmuteTap(false);
    };

    // Replay Video
    const handleReplay = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;

      setHasEnded(false);
      video.currentTime = 0;
      video.muted = false;
      setIsMuted(false);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});

      if (ambientVideoRef.current) {
        ambientVideoRef.current.currentTime = 0;
        ambientVideoRef.current.play().catch(() => {});
      }
    };

    return (
      <div className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-black">
        {/* DESKTOP AMBIENT BACKDROP: Blurred reflection of the video to give theater immersion */}
        <div className="hidden md:block pointer-events-none absolute inset-0 overflow-hidden opacity-35 filter blur-3xl scale-125">
          <video
            ref={ambientVideoRef}
            src={media.videoSrc}
            muted
            playsInline
            loop
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* PORTRAIT VIDEO CONTAINER (Full-bleed on mobile, luxury 9:16 portrait theater frame on desktop) */}
        <div
          onClick={handleTogglePlay}
          className="relative w-full h-full md:max-w-[460px] md:h-[92vh] md:max-h-[880px] md:rounded-3xl md:overflow-hidden md:border md:border-gold-500/25 md:shadow-[0_0_60px_rgba(0,0,0,0.95)] flex items-center justify-center cursor-pointer select-none bg-black transition-all duration-500"
        >
          {/* Main Portrait Video */}
          <video
            ref={videoRef}
            src={media.videoSrc}
            playsInline
            webkit-playsinline="true"
            x5-video-player-type="h5"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            className="w-full h-full object-cover md:object-contain bg-black"
          />

          {/* TAP FEEDBACK INDICATOR (Subtle gold play/pause flash) */}
          <AnimatePresence>
            {showTapIndicator && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center z-30"
              >
                <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-gold-400/50 flex items-center justify-center text-gold-300 shadow-[0_0_30px_rgba(212,179,94,0.4)]">
                  {showTapIndicator === "play" ? (
                    <Play className="w-8 h-8 fill-gold-300 translate-x-0.5" />
                  ) : (
                    <Pause className="w-8 h-8 fill-gold-300" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* UNMUTE PROMPT PILL (Displays only if browser forced initial audio mute) */}
          <AnimatePresence>
            {needsUnmuteTap && !hasEnded && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                    setIsMuted(false);
                    setNeedsUnmuteTap(false);
                  }
                }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-40 px-5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-gold-400/80 text-gold-200 flex items-center gap-2.5 shadow-[0_4px_25px_rgba(212,179,94,0.35)] cursor-pointer hover:border-gold-300 transition-all active:scale-95 animate-pulse-subtle"
              >
                <VolumeX className="w-4 h-4 text-gold-300 animate-bounce" />
                <span className="font-serif text-xs tracking-[0.2em] uppercase font-medium">
                  Tap for Audio
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TOP MINIMALIST LUXURY BAR (Discreet sound & replay controls) */}
          <div className="absolute top-4 left-0 right-0 z-30 px-5 flex items-center justify-between pointer-events-none">
            {/* Left: Couple Monogram watermark */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-gold-500/20 text-gold-300">
              <span className="font-serif text-[11px] tracking-[0.25em] uppercase font-semibold">
                {couple.initials}
              </span>
            </div>

            {/* Right: Sound Control Button */}
            <button
              onClick={handleToggleMute}
              className="pointer-events-auto p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-gold-500/30 text-gold-300 hover:text-gold-100 hover:border-gold-300 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.6)] active:scale-90"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-gold-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-gold-300" />
              )}
            </button>
          </div>

          {/* BOTTOM HAIRLINE GOLD PROGRESS BAR */}
          <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-200 shadow-[0_0_10px_#d4b35e]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>

          {/* LUXURY CELEBRATION END-CARD (Appears when video ends) */}
          <AnimatePresence>
            {hasEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-black/85 via-luxury-950/95 to-black/95 backdrop-blur-md select-text"
              >
                {/* Golden Monogram Crest in End Card */}
                <div className="w-20 h-20 rounded-full border border-gold-400/60 bg-gold-500/10 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(212,179,94,0.3)]">
                  <span className="font-serif text-2xl tracking-widest text-gold-200 font-medium">
                    {couple.initials}
                  </span>
                </div>

                <p className="font-cormorant italic text-gold-200/80 text-sm tracking-[0.2em] uppercase">
                  {event.tagline}
                </p>

                <h2 className="font-serif text-2xl md:text-3xl text-gold-100 tracking-[0.16em] uppercase my-2 drop-shadow-[0_2px_12px_rgba(212,179,94,0.4)]">
                  {couple.fullName}
                </h2>

                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent my-3" />

                <p className="font-serif text-xs md:text-sm text-gold-300 tracking-[0.2em] uppercase">
                  {event.date}
                </p>
                <p className="font-cormorant italic text-xs md:text-sm text-gold-200/70 tracking-widest mt-1">
                  {event.venue} &bull; {event.city}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full max-w-xs">
                  {/* Replay Button */}
                  <button
                    onClick={handleReplay}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-luxury-950 font-serif text-xs tracking-[0.22em] uppercase font-semibold shadow-[0_4px_20px_rgba(212,179,94,0.4)] hover:brightness-110 active:scale-95 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Replay Video
                  </button>

                  {/* WhatsApp RSVP / Blessings Button */}
                  {rsvp.enableRsvpButton && rsvp.rsvpLink && (
                    <a
                      href={rsvp.rsvpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black/60 border border-gold-400/50 text-gold-200 font-serif text-xs tracking-[0.2em] uppercase font-medium hover:border-gold-300 hover:text-white transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 text-gold-300" />
                      Send Blessings
                    </a>
                  )}
                </div>

                <p className="font-cormorant italic text-gold-200/40 text-[11px] tracking-widest mt-8">
                  We look forward to celebrating with you
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

PortraitVideoPlayer.displayName = "PortraitVideoPlayer";
