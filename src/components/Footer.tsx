"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const tools = ["Power BI", "SQL", "Python", "Excel", "Looker Studio", "Pandas", "NumPy", "Plotly"];
  const exploring = [
    "📊 Advanced Power BI",
    "🐍 Python Automation",
    "🗄️ SQL Optimization",
    "🤖 Machine Learning",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // GSAP Context with scope
    const ctx = gsap.context(() => {
      // 1. Subtle moving data nodes / particles in background
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle) => {
          const randomX = gsap.utils.random(-25, 25);
          const randomY = gsap.utils.random(-25, 25);
          const randomDur = gsap.utils.random(5, 9);
          const randomDelay = gsap.utils.random(0, 1.5);

          gsap.to(particle, {
            x: `+=${randomX}`,
            y: `+=${randomY}`,
            duration: randomDur,
            delay: randomDelay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={containerRef}
      className="border-t border-navy-900 pt-16 pb-8 relative overflow-hidden text-left"
      style={{ backgroundColor: "#010204" }}
    >
      {/* Very faint central glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyber-cyan/2 rounded-full blur-[160px] pointer-events-none" />

      {/* Tiny void stars */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[10%] left-[8%] w-[1px] h-[1px] rounded-full bg-white/12" />
        <div className="absolute top-[6%] right-[22%] w-[1.5px] h-[1.5px] rounded-full bg-white/8" />
        <div className="absolute top-[25%] left-[55%] w-[1px] h-[1px] rounded-full bg-white/15" />
        <div className="absolute top-[40%] right-[12%] w-[1.5px] h-[1.5px] rounded-full bg-white/10" />
        <div className="absolute top-[55%] left-[30%] w-[1px] h-[1px] rounded-full bg-white/20" />
        <div className="absolute top-[70%] right-[40%] w-[1.5px] h-[1.5px] rounded-full bg-white/8" />
        <div className="absolute top-[80%] left-[75%] w-[1px] h-[1px] rounded-full bg-white/12" />
        <div className="absolute top-[90%] left-[18%] w-[1.5px] h-[1.5px] rounded-full bg-white/15" />
      </div>

      {/* Floating Data Particles backdrop */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-cyber-cyan/20 blur-[0.5px]"></div>
        <div className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-cyber-blue/15 blur-[0.5px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-cyber-purple/20"></div>
        <div className="absolute bottom-1/4 right-[25%] w-2.5 h-2.5 rounded-full bg-cyber-cyan/15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-navy-900">
          
          {/* Column 1: Brand & Bio (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-heading font-bold text-text-primary tracking-wide mb-4">
                Luthfi<span className="text-cyber-cyan font-extrabold">.</span>
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                Data Analyst passionate about transforming raw data into meaningful insights through dashboards, analytics, and business intelligence solutions.
              </p>
            </div>
          </div>

          {/* Column 2: Tools & Tech (Col 4) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary font-heading mb-4">
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs bg-navy-900 border border-navy-800 text-text-secondary rounded"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Currently Exploring (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary font-heading mb-4">
              Currently Exploring
            </h4>
            <ul className="space-y-2.5">
              {exploring.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs font-semibold text-text-secondary flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-xs text-text-muted">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Kgs M Luthfi Khailani — Rebuilt with React, Next.js, Tailwind CSS & GSAP ❤️
          </p>
          
          <button
            onClick={handleScrollTop}
            className="w-10 h-10 rounded-full bg-navy-900 border border-navy-800 flex items-center justify-center text-text-secondary hover:text-cyber-cyan hover:scale-105 transition-all duration-300 shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
