"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Mail, Terminal, Activity, Compass, Code, Brain } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  // Counter refs
  const countProjectsRef = useRef<HTMLSpanElement>(null);
  const countToolsRef = useRef<HTMLSpanElement>(null);
  const countRecordsRef = useRef<HTMLSpanElement>(null);

  // Deterministic star positions to avoid Next.js hydration mismatches
  const starPositions = [
    { x: 8, y: 12, size: 1.5 }, { x: 22, y: 7, size: 1 }, { x: 36, y: 24, size: 2.2 },
    { x: 49, y: 15, size: 1.2 }, { x: 61, y: 6, size: 1 }, { x: 79, y: 19, size: 1.8 },
    { x: 92, y: 11, size: 1 }, { x: 4, y: 35, size: 2.5 }, { x: 17, y: 44, size: 1.2 },
    { x: 31, y: 33, size: 1.5 }, { x: 43, y: 48, size: 1 }, { x: 55, y: 28, size: 2.2 },
    { x: 68, y: 39, size: 1.2 }, { x: 84, y: 49, size: 1.6 }, { x: 96, y: 37, size: 1 },
    { x: 11, y: 63, size: 1.8 }, { x: 26, y: 71, size: 1 }, { x: 38, y: 58, size: 2 },
    { x: 51, y: 76, size: 1.5 }, { x: 64, y: 65, size: 1.2 }, { x: 77, y: 81, size: 2 },
    { x: 88, y: 68, size: 1 }, { x: 3, y: 91, size: 1.5 }, { x: 20, y: 86, size: 2.4 },
    { x: 33, y: 94, size: 1 }, { x: 46, y: 84, size: 1.2 }, { x: 59, y: 89, size: 1.8 },
    { x: 72, y: 93, size: 1 }, { x: 86, y: 87, size: 1.5 }, { x: 98, y: 90, size: 2 },
    { x: 52, y: 21, size: 1.2 }, { x: 14, y: 54, size: 1 }, { x: 81, y: 29, size: 1.8 },
    { x: 58, y: 74, size: 1.5 }, { x: 24, y: 18, size: 1 }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // GSAP Context with scope
    const ctx = gsap.context(() => {
      // 1. Blinking stars loop
      if (starsRef.current) {
        const stars = starsRef.current.children;
        Array.from(stars).forEach((star) => {
          gsap.to(star, {
            opacity: gsap.utils.random(0.15, 0.95),
            duration: gsap.utils.random(1.2, 3.2),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // 2. Profile card slide and fade reveal from left
      gsap.fromTo(
        leftCardRef.current,
        { x: -70, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Biography text stagger reveal from right
      gsap.fromTo(
        rightCardRef.current,
        { x: 70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Staggered bottom boxes reveal (Education + Location)
      if (bottomGridRef.current) {
        const boxes = bottomGridRef.current.children;
        gsap.fromTo(
          boxes,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 5. Staggered Count-Up Numbers using GSAP ScrollTrigger
      const counterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: leftCardRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      const counts = { projects: 0, tools: 0, records: 0 };

      counterTimeline
        .to(counts, {
          projects: 8,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            if (countProjectsRef.current) {
              countProjectsRef.current.textContent = `${Math.floor(counts.projects)}+`;
            }
          },
        })
        .to(counts, {
          tools: 5,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            if (countToolsRef.current) {
              countToolsRef.current.textContent = `${Math.floor(counts.tools)}+`;
            }
          },
        }, "-=1.2")
        .to(counts, {
          records: 15500,
          duration: 2.0,
          ease: "power3.out",
          onUpdate: () => {
            if (countRecordsRef.current) {
              countRecordsRef.current.textContent = `${Math.floor(counts.records).toLocaleString()}+`;
            }
          },
        }, "-=1.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 relative overflow-hidden text-left"
    >
      {/* Earth Atmosphere Backdrop - Planet Earth Data Sphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#020810]">
        {/* Earth atmospheric blue glows */}
        <div className="absolute top-[-5%] right-[10%] w-[550px] h-[550px] bg-[#0369a1]/10 rounded-full blur-[140px] opacity-60"></div>
        <div className="absolute bottom-[5%] left-[3%] w-[500px] h-[500px] bg-[#0e7490]/8 rounded-full blur-[130px] opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-cyber-cyan/5 rounded-full blur-[180px] opacity-40"></div>
        {/* Earth horizon glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-[#0c4a6e]/12 via-[#155e75]/6 to-transparent"></div>
        {/* Subtle green landmass accent */}
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-[#065f46]/4 rounded-full blur-[120px]"></div>
        
        {/* Constellation HUD digital grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem]"></div>

        {/* Beautiful Subtle Space Particle Background */}
        <ParticleBackground
          count={45}
          speedMultiplier={0.3}
          minSize={0.5}
          maxSize={1.8}
          colors={["#38bdf8", "#06b6d4", "#ffffff"]}
          twinkle={true}
          drift={true}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20 relative">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full shadow-[0_0_8px_#64ffda]"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Decrypted Identity & Background
          </p>
        </div>

        {/* Top Section: Holographic profile + Terminal Log Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          
          {/* Holographic Access Profile Card (Col 5) */}
          <div
            ref={leftCardRef}
            className="lg:col-span-5 glass-card rounded-xl p-8 flex flex-col items-center justify-between text-center opacity-0 relative overflow-hidden border border-navy-700/50 bg-navy-900/40"
          >
            {/* HUD Scan Line Laser Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] bg-cyber-cyan/35 shadow-[0_0_8px_#64ffda] top-0 animate-[scan_4.5s_ease-in-out_infinite]"></div>
            </div>

            {/* Profile Avatar Frame with Brackets */}
            <div className="mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan to-cyber-blue rounded-full blur-[10px] opacity-40 group-hover:opacity-85 transition-opacity duration-300"></div>
              
              {/* Sci-fi HUD corners */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyber-cyan rounded-tl"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyber-cyan rounded-tr"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-cyber-cyan rounded-bl"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-cyber-cyan rounded-br"></div>

              <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-navy-700/80 p-1.5 bg-navy-950">
                <img
                  src="/images/assets/tadoo1.png"
                  alt="Kgs M Luthfi Khailani Hologram Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Status Indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-navy-900/90 border border-navy-700 text-[8px] font-mono tracking-widest text-cyber-cyan uppercase px-2 py-0.5 rounded shadow-lg backdrop-blur-sm">
                SYS: ACTIVE
              </div>
            </div>

            <div className="w-full relative z-10">
              <h3 className="text-2xl font-heading font-extrabold text-text-primary mb-1">
                Kgs M Luthfi Khailani
              </h3>
              <p className="text-xs font-bold tracking-widest text-cyber-cyan uppercase font-heading mb-6">
                Aspiring Data Analyst
              </p>
              
              {/* Dynamic HUD Counters Container */}
              <div className="grid grid-cols-3 gap-3 py-4 px-2 border-y border-navy-800/80 rounded bg-navy-950/45 text-center mb-6 shadow-inner relative">
                <div className="flex flex-col">
                  <span ref={countProjectsRef} className="text-xl font-extrabold font-heading text-cyber-cyan">0+</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-muted mt-1 font-bold">Projects</span>
                </div>
                <div className="flex flex-col">
                  <span ref={countToolsRef} className="text-xl font-extrabold font-heading text-cyber-blue">0+</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-muted mt-1 font-bold">Core Tools</span>
                </div>
                <div className="flex flex-col">
                  <span ref={countRecordsRef} className="text-xl font-extrabold font-heading text-cyber-emerald">0+</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-muted mt-1 font-bold">Records</span>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                &ldquo;I transform raw data into insights using Python, SQL, and modern BI tools. I build dashboards, run statistical analyses, and craft data stories that drive decisions.&rdquo;
              </p>
            </div>
          </div>

          {/* Decrypted Biography Log Feed Terminal (Col 7) */}
          <div
            ref={rightCardRef}
            className="lg:col-span-7 glass-card rounded-xl p-8 flex flex-col justify-between opacity-0 relative border border-navy-700/50 bg-navy-900/40 overflow-hidden"
          >
            {/* Target Ring HUD Orbit overlay (Right top) */}
            <div className="absolute top-6 right-6 w-24 h-24 pointer-events-none select-none opacity-20 hidden md:block">
              <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#64ffda" strokeWidth="0.6" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="4 2" />
                <path d="M 50 5 L 50 95 M 5 50 L 95 50" stroke="#475569" strokeWidth="0.6" />
              </svg>
            </div>

            <div>
              {/* Terminal Log Header */}
              <div className="flex items-center gap-2 border-b border-navy-800/80 pb-4 mb-6">
                <Terminal size={16} className="text-cyber-cyan" />
                <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                  BIOGRAPHY_FEED // ACTIVE_DECRYPT.LOG
                </span>
              </div>

              <h3 className="text-xl font-heading font-extrabold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-cyber-cyan">_</span> Who I Am
              </h3>
              
              <div className="space-y-4">
                <p className="text-base text-text-secondary leading-relaxed font-medium">
                  I am a highly motivated Data Analyst with a solid foundation in Information Systems. I specialize in the complete data pipeline—from cleaning and manipulating raw datasets to statistical analysis, data storytelling, and building business intelligence dashboards.
                </p>
                <p className="text-base text-text-secondary leading-relaxed font-medium">
                  With a passion for quantitative problem-solving and business metrics, I help organizations interpret complex datasets, identify operational trends, and optimize decisions.
                </p>
              </div>
            </div>

            {/* Competency tags & primary interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-navy-800/80 mt-8">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyber-cyan font-heading mb-3 flex items-center gap-1.5">
                  <Code size={12} />
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "SQL", "Power BI", "Looker Studio", "Excel", "Data Wrangling"].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-navy-950 border border-navy-800/80 hover:border-cyber-cyan/30 text-text-secondary rounded font-mono font-medium transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyber-cyan font-heading mb-3 flex items-center gap-1.5">
                  <Brain size={12} />
                  Primary Interests
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  Data Analytics, Business Intelligence, Data Wrangling, Dashboard Development, Web Technologies.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Circuit Board Timeline + Geospatial location Grid */}
        <div ref={bottomGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Cyber Education board Box */}
          <div className="glass-card rounded-xl p-8 opacity-0 border border-navy-700/50 bg-navy-900/40 relative">
            <h3 className="text-lg font-heading font-extrabold text-text-primary mb-6 flex items-center gap-3">
              <GraduationCap className="text-cyber-cyan" size={22} />
              Education Journey
            </h3>

            {/* Glowing Trace Circuit Line SVG inside timeline */}
            <div className="absolute left-[34px] top-24 bottom-12 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-blue to-navy-950 pointer-events-none">
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-cyber-cyan/50 shadow-[0_0_8px_#64ffda] z-10 animate-pulse"></div>
            </div>

            <div className="space-y-8 relative ml-4 pl-8">
              {/* College */}
              <div className="relative text-left">
                {/* Cyber pulsing radar node */}
                <span className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-cyber-cyan/20 border border-cyber-cyan flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping absolute"></span>
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan z-10"></span>
                </span>
                
                <h4 className="text-base font-extrabold text-text-primary leading-snug">
                  B.S. Information Systems
                </h4>
                <div className="text-sm text-cyber-cyan font-bold mt-0.5 font-heading">
                  Sriwijaya University — GPA 3.95
                </div>
                <div className="text-[10px] font-mono font-bold text-text-muted mt-1 uppercase tracking-wider bg-navy-950/60 px-2 py-0.5 rounded w-fit">
                  2022 - 2026
                </div>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed font-medium">
                  Specialized in data modeling, database design, system analysis, and advanced IT architectures.
                </p>
              </div>

              {/* High School */}
              <div className="relative text-left">
                <span className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-cyber-blue z-10"></span>
                </span>
                
                <h4 className="text-base font-extrabold text-text-primary leading-snug">
                  Senior High School 2 Palembang
                </h4>
                <div className="text-sm text-text-secondary mt-0.5">
                  Natural Sciences Major
                </div>
                <div className="text-[10px] font-mono font-bold text-text-muted mt-1 uppercase tracking-wider bg-navy-950/60 px-2 py-0.5 rounded w-fit">
                  2019 - 2021
                </div>
              </div>
            </div>
          </div>

          {/* Geospatial mapping location hub & Socials Grid */}
          <div className="glass-card rounded-xl p-8 flex flex-col justify-between opacity-0 border border-navy-700/50 bg-navy-900/40 relative">
            <div>
              <h3 className="text-lg font-heading font-extrabold text-text-primary mb-6 flex items-center gap-3">
                <Compass className="text-cyber-cyan animate-[spin_10s_linear_infinite]" size={22} />
                Geospatial & Contacts
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-navy-950 border border-navy-800 flex items-center justify-center text-cyber-cyan group-hover:border-cyber-cyan/30 transition-colors shadow-inner">
                    <MapPin size={16} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Location HUB</span>
                    <span className="text-sm text-text-primary font-bold">Palembang, South Sumatra, Indonesia</span>
                    <span className="text-[8px] font-mono text-cyber-cyan/70 mt-0.5">
                      LAT: -2.9167° S // LONG: 104.7500° E
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-navy-950 border border-navy-800 flex items-center justify-center text-cyber-cyan group-hover:border-cyber-cyan/30 transition-colors shadow-inner">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Data Comms / Email</span>
                    <a
                      href="mailto:khailanilupi2005@gmail.com"
                      className="text-sm text-text-primary font-bold hover:text-cyber-cyan transition-colors"
                    >
                      khailanilupi2005@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Social Connections links row */}
            <div className="pt-8 border-t border-navy-800/80 mt-8">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-text-muted mb-4 text-left flex items-center gap-1.5">
                <Activity size={12} className="text-cyber-blue animate-pulse" />
                Establish Secured Platform Connection
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/kgs-m-luthfi-khailani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold bg-navy-950 hover:bg-cyber-cyan hover:text-navy-950 text-text-primary border border-navy-850 hover:border-cyber-cyan rounded-lg flex items-center gap-2 transition-all duration-300 font-heading shadow-inner hover:-translate-y-0.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Tadonoki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold bg-navy-950 hover:bg-cyber-cyan hover:text-navy-950 text-text-primary border border-navy-850 hover:border-cyber-cyan rounded-lg flex items-center gap-2 transition-all duration-300 font-heading shadow-inner hover:-translate-y-0.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/lutfi_world/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold bg-navy-950 hover:bg-cyber-cyan hover:text-navy-950 text-text-primary border border-navy-850 hover:border-cyber-cyan rounded-lg flex items-center gap-2 transition-all duration-300 font-heading shadow-inner hover:-translate-y-0.5"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
