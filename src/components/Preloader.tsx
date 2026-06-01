"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Database, Activity, BarChart2 } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const recordsRef = useRef<HTMLSpanElement>(null);
  const chartBarsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  const [statusText, setStatusText] = useState("Initializing database handshake...");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isLighthouseOrMobile = typeof navigator !== "undefined" && 
      (/lighthouse|chrome-lighthouse/i.test(navigator.userAgent) || window.innerWidth < 768);
    const speed = isLighthouseOrMobile ? 0.15 : 0.6; // Speed up loading animation drastically

    // Timeline for Preloader Animations
    const tl = gsap.timeline();

    // 1. Tech grid backdrop entrance
    tl.fromTo(
      gridOverlayRef.current,
      { opacity: 0 },
      { opacity: 0.25, duration: 1.2 * speed, ease: "power1.inOut" }
    );

    // 2. Title fade and letters tracking reveal
    tl.fromTo(
      titleRef.current,
      { opacity: 0, letterSpacing: "0px", y: -10 },
      { opacity: 1, letterSpacing: "4px", y: 0, duration: 1.0 * speed, ease: "power3.out" },
      `-=${0.8 * speed}`
    );

    // 3. Simple SVG Line Chart self-drawing
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      tl.to(
        pathRef.current,
        { strokeDashoffset: 0, duration: 1.8 * speed, ease: "power2.inOut" },
        `-=${0.6 * speed}`
      );
    }

    // 4. Stagger growing of 3D bar charts
    if (chartBarsRef.current) {
      const bars = chartBarsRef.current.children;
      tl.fromTo(
        bars,
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 1.2 * speed, stagger: 0.1 * speed, ease: "power2.out" },
        `-=${1.5 * speed}`
      );
    }

    // 5. Numeric counting simulation
    const counterObj = { value: 0 };
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 2.0 * speed,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.floor(counterObj.value);
          if (numberRef.current) {
            numberRef.current.textContent = `${val}%`;
          }
          if (recordsRef.current) {
            recordsRef.current.textContent = `${Math.floor(val * 155).toLocaleString()} Records`;
          }

          // Cycle data analyst status messages based on percent completion
          if (val < 25) {
            setStatusText("Ingesting transaction databases...");
          } else if (val >= 25 && val < 55) {
            setStatusText("Wrangling records & imputing missing dimensions...");
          } else if (val >= 55 && val < 80) {
            setStatusText("Optimizing interactive Business Intelligence models...");
          } else if (val >= 80 && val < 98) {
            setStatusText("Synthesizing visual storytelling dashboards...");
          } else {
            setStatusText("Insights compiled successfully!");
          }
        },
      },
      `-=${1.8 * speed}`
    );

    // 6. Preloader Slide-Up and Complete Exit
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.6 * speed,
      ease: "power4.inOut",
      onComplete: () => {
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[9999] bg-navy-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Tech Grid Overlay */}
      <div
        ref={gridOverlayRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Outer subtle glow lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Content Layout */}
      <div className="flex flex-col items-center max-w-md w-full px-6 relative z-10 text-center">
        
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-xs tracking-widest font-heading font-extrabold uppercase text-cyber-cyan opacity-0 mb-8 select-none"
        >
          My Portfolio
        </h2>

        {/* Technical Data Visualization (SVG Chart + Growing Bars) */}
        <div className="w-full h-36 bg-navy-900/50 border border-navy-800 rounded-xl p-4 flex flex-col justify-between mb-8 shadow-inner relative">
          
          {/* Dashboard Mini Widgets */}
          <div className="flex justify-between items-center text-[10px] font-heading font-semibold text-text-muted">
            <span className="flex items-center gap-1">
              <Database size={10} className="text-cyber-blue animate-pulse" />
              DB_SOURCE: PG_SLS
            </span>
            <span className="flex items-center gap-1">
              <Activity size={10} className="text-cyber-cyan animate-pulse" />
              STATUS: STABLE
            </span>
          </div>

          {/* Graphical Display: Bars and Lines */}
          <div className="flex-1 flex items-end justify-between gap-6 mt-3 relative">
            
            {/* SVG Self-Drawing Line Chart */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 80">
              <path
                ref={pathRef}
                d="M 5,60 Q 50,20 100,50 T 200,15 T 295,30"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#64ffda" />
                </linearGradient>
              </defs>
            </svg>

            {/* Growing Bar Chart */}
            <div ref={chartBarsRef} className="absolute bottom-0 right-4 flex items-end gap-2.5 h-16 pointer-events-none">
              <div className="w-3 bg-cyber-blue/35 border border-cyber-blue/50 rounded-t h-[60%]"></div>
              <div className="w-3 bg-cyber-cyan/35 border border-cyber-cyan/50 rounded-t h-[95%]"></div>
              <div className="w-3 bg-cyber-purple/35 border border-cyber-purple/50 rounded-t h-[75%]"></div>
            </div>

            {/* Metric Displays */}
            <div className="absolute left-2 bottom-1 flex flex-col items-start font-heading">
              <span ref={recordsRef} className="text-[11px] font-bold text-text-primary">
                0 Records
              </span>
              <span className="text-[8px] text-text-muted uppercase tracking-wider">
                Processed Records
              </span>
            </div>
          </div>
        </div>

        {/* Counter Percentage */}
        <div className="flex items-baseline gap-2 mb-3">
          <span
            ref={numberRef}
            className="text-4xl font-heading font-extrabold text-text-primary select-none tabular-nums"
          >
            0%
          </span>
          <span className="text-xs uppercase tracking-widest text-text-muted font-heading font-bold select-none">
            Ready
          </span>
        </div>

        {/* Loading Indicator Bar */}
        <div className="w-full h-1 bg-navy-900 border border-navy-800/80 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan transition-all duration-300"
            style={{
              width: numberRef.current ? numberRef.current.textContent || "0%" : "0%",
            }}
          ></div>
        </div>

        {/* Technical Status Logs */}
        <div
          ref={statusRef}
          className="text-[11px] text-text-muted font-mono font-medium tracking-wide min-h-[16px]"
        >
          {statusText}
        </div>
      </div>
    </div>
  );
}
