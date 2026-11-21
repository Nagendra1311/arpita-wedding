"use client";

import React, { useEffect, useRef } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  shape: "rect" | "circle" | "petal";
  opacity: number;
}

export function triggerCelebration(xPercent = 0.5, yPercent = 0.4) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = [
    "#D4AF37", // Metallic Gold
    "#F3E5AB", // Champagne
    "#E6CA65", // Warm Gold
    "#E11D48", // Rose Red
    "#FDA4AF", // Rose Petal Pink
    "#F59E0B", // Marigold Amber
    "#FFFFFF", // Shimmering White
  ];

  const pieces: ConfettiPiece[] = [];
  const startX = width * xPercent;
  const startY = height * yPercent;

  for (let i = 0; i < 110; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 12 + 5;
    pieces.push({
      x: startX,
      y: startY,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.cos(angle) * velocity,
      speedY: Math.sin(angle) * velocity - 4, // initial pop up
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.6 ? "petal" : Math.random() > 0.3 ? "rect" : "circle",
      opacity: 1,
    });
  }

  let animationFrameId: number;
  const gravity = 0.28;
  const drag = 0.98;

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    let activePieces = 0;

    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i];
      p.speedX *= drag;
      p.speedY = p.speedY * drag + gravity;
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.007;

      if (p.opacity > 0 && p.y < height + 50) {
        activePieces++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 2, p.size, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    if (activePieces > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  };

  render();
}

// Gentle pleasant celebration audio synthesized using Web Audio API
export function playChimeSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Harmonious Major chord chime)

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.1 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.1);
      osc.stop(ctx.currentTime + index * 0.1 + 0.9);
    });
  } catch (e) {
    // Audio autoplay restrictions or unsupported
  }
}
