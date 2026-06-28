"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Download, ArrowRight, BarChart2, Database, Shield } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const badgeParallaxRef = useRef<HTMLDivElement>(null);
  const badgeIdleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slides = [
    "/images/assets/tadoo.png",
    "/images/assets/tadoo1.png",
    "/images/assets/tadoo2.png",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Entrance Animations & Idle Loop
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 1024;

    // GSAP Context with Scope
    const ctx = gsap.context(() => {
      // 1. Tagline typing loop
      const words = ["Hi! I am a Data Enthusiast", "Welcome to My Portfolio", "I Love Uncovering Insights"];
      let textObj = { value: "" };
      let textTimeline = gsap.timeline({ repeat: -1 });
      
      words.forEach((word) => {
        textTimeline.to(textObj, {
          duration: 1.8,
          value: word,
          onUpdate: () => {
            if (typingTextRef.current) {
              typingTextRef.current.textContent = textObj.value;
            }
          },
          ease: "power1.inOut",
        });
        textTimeline.to(textObj, {
          duration: 1.2,
        });
        textTimeline.to(textObj, {
          duration: 1.2,
          value: "",
          onUpdate: () => {
            if (typingTextRef.current) {
              typingTextRef.current.textContent = textObj.value;
            }
          },
          ease: "power1.inOut",
        });
      });

      // 2. Entrance Slide Up Timeline
      const entranceTl = gsap.timeline();
      entranceTl
        .fromTo(
          subTitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );

      // Staggered CTA buttons
      if (btnGroupRef.current) {
        const buttons = btnGroupRef.current.children;
        entranceTl.fromTo(
          buttons,
          { scale: 0.95, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "back.out(1.5)" },
          "-=0.4"
        );
      }

      if (isMobile) {
        // Mobile only simple lightweight fade in for badge
        gsap.fromTo(
          badgeParallaxRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
        );
        gsap.set(badgeIdleRef.current, { y: 0, rotation: 0 });
      } else {
        // 3. Drop-in entrance for the badge parallax container
        entranceTl.fromTo(
          badgeParallaxRef.current,
          { y: -650, rotation: -12, opacity: 0 },
          { 
            y: 0, 
            rotation: 0, 
            opacity: 1, 
            duration: 1.4, 
            ease: "elastic.out(0.8, 0.65)" 
          },
          "-=0.6"
        );

        // 4. Idle swing + vertical float on the idle container
        gsap.to(badgeIdleRef.current, {
          rotation: 1.8,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% -120px",
        });

        gsap.to(badgeIdleRef.current, {
          y: -12,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // 5. Floating Backdrop Data Particles loop
        if (dotsRef.current) {
          const dots = dotsRef.current.children;
          Array.from(dots).forEach((dot) => {
            const randomX = gsap.utils.random(-30, 30);
            const randomY = gsap.utils.random(-40, 40);
            const randomDur = gsap.utils.random(4, 8);
            const randomDelay = gsap.utils.random(0, 2);

            gsap.to(dot, {
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
      }
    }, containerRef);

    return () => ctx.revert(); // clean up GSAP on unmount
  }, []);

  // Mousemove 3D Parallax Tilt (Only on Desktop)
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!badgeParallaxRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xOffset = (x / rect.width - 0.5) * 2; // -1 to 1
      const yOffset = (y / rect.height - 0.5) * 2; // -1 to 1
      
      gsap.to(badgeParallaxRef.current, {
        x: xOffset * 22,
        y: yOffset * 22,
        rotationY: xOffset * 16,
        rotationX: -yOffset * 16,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!badgeParallaxRef.current) return;
      gsap.to(badgeParallaxRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    const el = containerRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleContactScroll = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-36 pb-16 lg:pt-28 lg:pb-16 overflow-hidden"
      style={{ perspective: "1000px", backgroundColor: "#030712" }}
    >
      {/* Space Orbit Launch Backdrop */}
      {/* Earth atmosphere edge glow at bottom - departure from Earth */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#0c4a6e]/15 via-[#164e63]/8 to-transparent pointer-events-none"></div>
      {/* Deep space radial glows */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-cyber-blue/8 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[15%] right-[15%] w-[450px] h-[450px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-[10%] w-[500px] h-[500px] bg-cyber-cyan/4 rounded-full blur-[160px] pointer-events-none"></div>
      {/* Constellation HUD grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none"></div>
      {/* Beautiful High-Performance Space Particle Background */}
      <ParticleBackground
        count={85}
        speedMultiplier={0.7}
        minSize={0.6}
        maxSize={2.4}
        colors={["#ffffff", "#38bdf8", "#00f0ff", "#a855f7", "#c084fc"]}
        twinkle={true}
        drift={true}
      />

      {/* Floating Data Particles backdrop */}
      <div ref={dotsRef} className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-cyber-cyan/30 blur-[1px]"></div>
        <div className="absolute top-1/5 right-1/3 w-3 h-3 rounded-full bg-cyber-blue/40 blur-[1px]"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-cyber-purple/35 blur-[1px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3.5 h-3.5 rounded-full bg-cyber-cyan/25 blur-[1px]"></div>
        <div className="absolute top-1/2 left-[15%] w-2 h-2 rounded-full bg-cyber-blue/30"></div>
        <div className="absolute bottom-[15%] right-[15%] w-2.5 h-2.5 rounded-full bg-cyber-purple/30"></div>
        <div className="absolute top-1/4 right-[10%] w-2 h-2 rounded-full bg-cyber-cyan/40"></div>
        <div className="absolute top-[40%] right-[20%] w-3 h-3 rounded-full bg-cyber-blue/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Copywriting Left (Col 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Tagline */}
          <div
            ref={subTitleRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-xs font-semibold tracking-wider uppercase mb-6 w-fit font-heading"
          >
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            Available for Full-time & Projects
          </div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-text-primary leading-[1.1] mb-6"
          >
            Kgs M Luthfi Khailani
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-text-secondary">
              <span ref={typingTextRef} className="typing-cursor text-gradient-cyan-blue"></span>
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl"
          >
            Hi, I&apos;m Kgs M Luthfi Khailani, an aspiring Data Analyst currently building my portfolio website. I am passionate about analyzing data, uncovering patterns, and creating visualizations to support data-driven decision making.
          </p>

          {/* Buttons */}
          <div ref={btnGroupRef} className="flex flex-row flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-center w-full sm:w-auto">
            <a
              href="/assets/Kgs Muhammad Luthfi Khailani-CV.pdf"
              download="Kgs Muhammad Luthfi Khailani-CV.pdf"
              className="px-4 py-3 sm:px-6 sm:py-3.5 bg-cyber-cyan hover:bg-cyber-cyan/90 text-navy-950 font-bold rounded shadow-lg shadow-cyber-cyan/10 hover:shadow-cyber-cyan/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider font-heading flex-1 sm:flex-none"
            >
              Download CV
              <Download size={14} className="sm:w-4 sm:h-4" />
            </a>
            
            <button
              onClick={handleContactScroll}
              className="px-4 py-3 sm:px-6 sm:py-3.5 bg-transparent hover:bg-navy-800 text-text-primary font-semibold rounded border border-navy-700 hover:border-navy-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider font-heading flex-1 sm:flex-none"
            >
              Get in Touch
              <ArrowRight size={14} className="text-cyber-cyan sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Micro Stats / Badges */}
          <div className="mt-12 pt-8 border-t border-navy-800/60 grid grid-cols-3 gap-6 max-w-md text-left">
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-heading text-cyber-cyan">3.95</span>
              <span className="text-xs text-text-muted mt-1 uppercase tracking-wider">GPA (IS Degree)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-heading text-cyber-blue">8+</span>
              <span className="text-xs text-text-muted mt-1 uppercase tracking-wider">Analytics Projects</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-heading text-cyber-emerald">6+</span>
              <span className="text-xs text-text-muted mt-1 uppercase tracking-wider">Certificates</span>
            </div>
          </div>
        </div>

        {/* Access Badge Lanyard Container Right (Col 5) */}
        <div 
          className="lg:col-span-5 flex justify-center items-center py-6 lg:py-12 relative min-h-[300px] lg:min-h-[480px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Lanyard Strap SVG */}
          {!isMobile && (
            <svg 
              className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-48 h-[160px] pointer-events-none z-10 overflow-visible" 
              viewBox="0 0 200 200"
            >
              {/* Hanging Lanyard Cord in Cyber Cyan */}
              <path 
                d="M 100 -50 L 60 170 Q 100 200 140 170 Z" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                opacity="0.5" 
              />
              <path 
                d="M 100 -50 L 60 170 Q 100 200 140 170" 
                fill="none" 
                stroke="#64ffda" 
                strokeWidth="1" 
                strokeLinecap="round" 
                opacity="0.8" 
              />
              {/* Metallic badge clamp connector */}
              <circle cx="100" cy="180" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
              <rect x="94" y="180" width="12" height="18" rx="2" fill="url(#metallicGradient)" stroke="#94a3b8" strokeWidth="1" />
              
              <defs>
                <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f1f5f9" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Badge Outer Parallax Container */}
          <div 
            ref={badgeParallaxRef} 
            className="opacity-0 relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Badge Inner Idle Floating & Swinging Container */}
            <div 
              ref={badgeIdleRef}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Premium Analyst ID access Badge */}
              <div 
                className="w-[260px] sm:w-[330px] p-4 sm:p-5 pt-6 sm:pt-8 rounded-2xl border border-navy-700/60 bg-navy-900/65 backdrop-blur-lg shadow-2xl relative flex flex-col items-center select-none"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              >
                {/* Lanyard punch slot hole visual overlay */}
                {!isMobile && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-navy-950 border border-navy-800 shadow-inner z-20"></div>
                )}

                {/* ID Header area */}
                <div className="w-full flex items-center justify-between border-b border-navy-800/60 pb-3 mb-4 text-left">
                  <div className="flex items-center gap-1.5">
                    <Shield size={12} className="text-cyber-cyan" />
                    <span className="text-[9px] font-bold tracking-widest text-text-secondary uppercase font-heading">
                      Analyst Access
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] font-bold tracking-wider text-emerald-500 uppercase font-heading">
                      Online
                    </span>
                  </div>
                </div>

                {/* Avatar Slider Frame wrapper */}
                <div 
                  className="relative w-full aspect-square rounded-xl overflow-hidden bg-navy-950 border border-navy-800/80 mb-5 group shadow-inner"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {/* Visual Laser Scanning Effect */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_8px_#64ffda] z-20 animate-[scan_3s_ease-in-out_infinite]"></div>

                  {/* Dot sliders indicator */}
                  <div className="absolute bottom-3 right-3 z-20 flex gap-1.5 bg-navy-950/80 backdrop-blur-md px-2.5 py-1.2 rounded-full border border-navy-800/60">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentSlide === idx ? "bg-cyber-cyan w-4.5" : "bg-navy-700"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Slider viewports */}
                  <div className="relative w-full h-full">
                    {slides.map((src, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ease-in-out ${
                          currentSlide === idx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`Luthfi Badge Profile Image ${idx + 1}`}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio & Details Area */}
                <div 
                  className="w-full text-center mb-4"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <h3 className="text-xl font-heading font-extrabold text-text-primary tracking-wide leading-tight mb-1">
                    LUTHFI KHAILANI
                  </h3>
                  <p className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase font-heading">
                    DATA ANALYST // DEPT
                  </p>
                </div>

                {/* Tech chip & Barcode footer block */}
                <div 
                  className="w-full flex items-center justify-between border-t border-navy-800/40 pt-4 mt-1"
                  style={{ transform: "translateZ(25px)" }}
                >
                  {/* Simulated Gold access Microchip */}
                  <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border border-amber-300/40 p-1 flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 opacity-30">
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                      <div className="border border-navy-950"></div>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-navy-950/20 bg-amber-400/20 backdrop-blur-[0.5px]"></div>
                  </div>

                  {/* ID Barcode scanner lines */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-0.5 h-6 opacity-60">
                      <div className="w-[1.5px] h-full bg-text-muted"></div>
                      <div className="w-[3px] h-full bg-text-muted"></div>
                      <div className="w-[1px] h-full bg-text-muted"></div>
                      <div className="w-[2px] h-full bg-text-muted"></div>
                      <div className="w-[1px] h-full bg-text-muted"></div>
                      <div className="w-[4.5px] h-full bg-text-muted"></div>
                      <div className="w-[1px] h-full bg-text-muted"></div>
                      <div className="w-[2.5px] h-full bg-text-muted"></div>
                      <div className="w-[1px] h-full bg-text-muted"></div>
                      <div className="w-[3px] h-full bg-text-muted"></div>
                      <div className="w-[1.2px] h-full bg-text-muted"></div>
                    </div>
                    <span className="text-[7px] font-mono tracking-widest text-text-muted">
                      ID-2026-LNK
                    </span>
                  </div>
                </div>

                {/* Subtle outer glow effect inside card */}
                <div className="absolute inset-0 border border-cyber-cyan/5 rounded-2xl pointer-events-none group-hover:border-cyber-cyan/15 transition-colors duration-500"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
