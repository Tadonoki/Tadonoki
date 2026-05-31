"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  speedX: number;
  speedY: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ParticleBackgroundProps {
  count?: number;
  speedMultiplier?: number;
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  twinkle?: boolean;
  drift?: boolean;
}

export default function ParticleBackground({
  count = 40,
  speedMultiplier = 0.5,
  minSize = 0.5,
  maxSize = 2,
  colors = ["#ffffff", "#00f0ff", "#00a3ff", "#7e22ce"],
  twinkle = true,
  drift = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Setup canvas size
    const resizeCanvas = () => {
      const parent = containerRef.current || canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      // Handle high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-initialize particles to spread nicely on resize
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const alpha = Math.random() * 0.6 + 0.2; // Opacity between 0.2 and 0.8
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          color,
          alpha,
          baseAlpha: alpha,
          speedX: (Math.random() * 0.4 - 0.2) * speedMultiplier,
          speedY: (Math.random() * 0.4 - 0.2) * speedMultiplier,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Draw and animate loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle (drift)
        if (drift) {
          p.x += p.speedX;
          p.y += p.speedY;

          // Boundary check & wrap-around
          if (p.x < -p.size) p.x = width + p.size;
          if (p.x > width + p.size) p.x = -p.size;
          if (p.y < -p.size) p.y = height + p.size;
          if (p.y > height + p.size) p.y = -p.size;
        }

        // Twinkle (shimmer)
        if (twinkle) {
          p.twinklePhase += p.twinkleSpeed;
          // Sine wave modulation for smooth shimmering
          p.alpha = p.baseAlpha + Math.sin(p.twinklePhase) * 0.15;
          if (p.alpha < 0.05) p.alpha = 0.05;
          if (p.alpha > 0.95) p.alpha = 0.95;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Custom color processing: handle hex, rgb, rgba
        ctx.fillStyle = hexToRgba(p.color, p.alpha);
        ctx.shadowBlur = p.size > 1.2 ? 6 : 0;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset for performance
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Helper to convert hex colors to RGBA
    function hexToRgba(hex: string, alpha: number): string {
      if (hex.startsWith("#")) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      if (hex.startsWith("rgba")) {
        return hex;
      }
      if (hex.startsWith("rgb")) {
        return hex.replace("rgb", "rgba").replace(")", `, ${alpha})`);
      }
      return `rgba(255, 255, 255, ${alpha})`;
    }

    // Set up resize listener
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Intersection Observer for battery performance (only animate when visible)
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            animate();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);

    // Initial play if visible
    if (isVisible) {
      animate();
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [count, speedMultiplier, minSize, maxSize, colors, twinkle, drift]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
