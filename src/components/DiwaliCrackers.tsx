"use client";

import React, { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

export function DiwaliCrackers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const setCanvasSize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width || window.innerWidth || 800;
      const h = rect.height || 700;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return { w, h };
    };

    let { w, h } = setCanvasSize() || { w: 800, h: 700 };

    const handleResize = () => {
      const res = setCanvasSize();
      if (res) {
        w = res.w;
        h = res.h;
      }
    };

    window.addEventListener("resize", handleResize);

    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];

    const festiveColors = [
      "#FFD700", // Bright Gold
      "#FF6D00", // Vibrant Saffron / Marigold
      "#FF1744", // Royal Festive Crimson
      "#FFF176", // Lemon Sparkler
      "#00E676", // Emerald Anar Green
      "#E040FB", // Festive Magenta
      "#FFFFFF", // Diamond White Spark
    ];

    // Create an explosion burst
    const explode = (ex: number, ey: number, baseColor?: string) => {
      const count = Math.floor(Math.random() * 20) + 40; // 40-60 sparks
      const chosenColor = baseColor || festiveColors[Math.floor(Math.random() * festiveColors.length)];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.2;
        const color = Math.random() > 0.35 ? chosenColor : "#FFFFFF";

        sparks.push({
          x: ex,
          y: ey,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.018 + 0.014,
          size: Math.random() * 2.8 + 1.2,
          trail: [],
        });
      }
    };

    // Launch a rocket cracker shooting up
    const launchRocket = () => {
      const startX = Math.random() * (w * 0.8) + w * 0.1;
      const startY = h - 10;
      const targetY = Math.random() * (h * 0.5) + 40;
      const color = festiveColors[Math.floor(Math.random() * festiveColors.length)];

      rockets.push({
        x: startX,
        y: startY,
        targetY,
        vy: -(Math.random() * 3 + 6.5),
        color,
      });
    };

    // Fountain / Anar spark effect from bottom corners
    const emitAnarSparks = () => {
      // Left Anar fountain
      for (let i = 0; i < 2; i++) {
        const angle = -Math.PI / 2 + (Math.random() * 0.7 - 0.35);
        const speed = Math.random() * 4 + 2;
        sparks.push({
          x: Math.random() * 40 + 20,
          y: h - 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: Math.random() > 0.5 ? "#FFD700" : "#FFF",
          alpha: 0.9,
          decay: 0.035,
          size: Math.random() * 2 + 1,
          trail: [],
        });
      }

      // Right Anar fountain
      for (let i = 0; i < 2; i++) {
        const angle = -Math.PI / 2 + (Math.random() * 0.7 - 0.35);
        const speed = Math.random() * 4 + 2;
        sparks.push({
          x: w - (Math.random() * 40 + 20),
          y: h - 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: Math.random() > 0.5 ? "#FFA000" : "#FFF",
          alpha: 0.9,
          decay: 0.035,
          size: Math.random() * 2 + 1,
          trail: [],
        });
      }
    };

    // Initial bursts
    explode(w * 0.25, h * 0.25, "#FFD700");
    explode(w * 0.75, h * 0.3, "#FF1744");

    let lastRocketTime = Date.now();
    let lastDirectBurstTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const now = Date.now();

      // Launch rockets periodically
      if (now - lastRocketTime > 1200) {
        launchRocket();
        lastRocketTime = now;
      }

      // Occasional random mid-air bursts
      if (now - lastDirectBurstTime > 1900) {
        explode(
          Math.random() * (w * 0.8) + w * 0.1,
          Math.random() * (h * 0.45) + 50
        );
        lastDirectBurstTime = now;
      }

      // Emit continuous anar fountain crackles
      emitAnarSparks();

      // Update & Draw Rockets
      for (let r = rockets.length - 1; r >= 0; r--) {
        const rock = rockets[r];
        rock.y += rock.vy;

        // Sparkle tail behind rocket
        ctx.save();
        ctx.beginPath();
        ctx.arc(rock.x, rock.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF";
        ctx.shadowBlur = 10;
        ctx.shadowColor = rock.color;
        ctx.fill();
        ctx.restore();

        // Dropping sparks from rocket tail
        if (Math.random() > 0.3) {
          sparks.push({
            x: rock.x + (Math.random() * 4 - 2),
            y: rock.y + (Math.random() * 4 + 2),
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 1.5 + 0.5,
            color: "#FFD700",
            alpha: 0.8,
            decay: 0.05,
            size: 1.5,
            trail: [],
          });
        }

        // Explode when rocket reaches target height
        if (rock.y <= rock.targetY || rock.vy >= 0) {
          explode(rock.x, rock.y, rock.color);
          rockets.splice(r, 1);
        }
      }

      // Update & Draw Sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.trail.push({ x: sp.x, y: sp.y });
        if (sp.trail.length > 4) sp.trail.shift();

        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.07; // gravity
        sp.vx *= 0.98; // air drag
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparks.splice(s, 1);
          continue;
        }

        // Draw spark with trailing light
        ctx.save();
        ctx.globalAlpha = Math.max(0, sp.alpha);

        // Draw spark trail
        if (sp.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(sp.trail[0].x, sp.trail[0].y);
          for (let t = 1; t < sp.trail.length; t++) {
            ctx.lineTo(sp.trail[t].x, sp.trail[t].y);
          }
          ctx.strokeStyle = sp.color;
          ctx.lineWidth = sp.size * 0.7;
          ctx.stroke();
        }

        // Draw spark head with glowing halo
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = sp.color;
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
