"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayAngle: number;
  opacity: number;
  blur: number;
  color: string;
}

export function RosePetals3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const petalColors = [
      "#F472B6", // Soft rose pink
      "#FB7185", // Blush crimson
      "#FDA4AF", // Delicate petal
      "#FECDD3", // Pastel rose
      "#E11D48", // Rich rose red
    ];

    const petals: Petal[] = [];
    const count = Math.min(28, Math.floor(w / 35));

    for (let i = 0; i < count; i++) {
      const isForeground = Math.random() > 0.75;
      petals.push({
        x: Math.random() * w,
        y: Math.random() * h - h,
        size: isForeground ? Math.random() * 12 + 16 : Math.random() * 8 + 8,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: isForeground ? Math.random() * 1.2 + 0.8 : Math.random() * 0.7 + 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        swayAmplitude: Math.random() * 1.5 + 0.5,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        opacity: isForeground ? Math.random() * 0.4 + 0.5 : Math.random() * 0.3 + 0.25,
        blur: isForeground ? 0 : Math.random() * 1.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      // Draw elegant 3D organic curved rose petal
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.7, p.size * 1.1, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(-p.size * 1.1, p.size * 0.4, -p.size * 0.8, -p.size * 0.7, 0, -p.size);

      // Gradient for 3D curved lighting
      const grad = ctx.createLinearGradient(-p.size / 2, -p.size, p.size / 2, p.size);
      grad.addColorStop(0, "#FFF1F2");
      grad.addColorStop(0.35, p.color);
      grad.addColorStop(1, "#BE123C");

      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate center vein
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.8);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * p.swayAmplitude + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > h + 40) {
          p.y = -40;
          p.x = Math.random() * w;
        }
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;

        drawPetal(ctx, p);
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
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
