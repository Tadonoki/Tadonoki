"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Sparkles, ShoppingBag, ExternalLink, Globe, Code } from "lucide-react";
import Image from "next/image";
import ParticleBackground from "./ParticleBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WebApp {
  id: number;
  name: string;
  url: string;
  desc: string;
  tech: string[];
  icon: React.ReactNode;
  themeColor: string; // custom accent hover glow
  image: string;
}

export default function WebApps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const webAppsData: WebApp[] = [
    {
      id: 1,
      name: "URL2Code",
      url: "https://url2codee.vercel.app",
      desc: "AI-powered platform that converts website layouts into clean HTML, CSS, and JavaScript through visual analysis and browser automation.",
      tech: ["Next.js", "Gemini AI", "Playwright", "Neon DB", "Better Auth"],
      icon: <Code className="text-cyber-cyan" size={18} />,
      themeColor: "group-hover:border-cyber-cyan/40 hover:shadow-cyber-cyan/5",
      image: "/images/Assets-mywebsite/URL2Code.png"
    },
    {
      id: 2,
      name: "Querix",
      url: "https://querix.vercel.app/",
      desc: "Interactive SQL learning platform for beginners and aspiring Data Analysts with real-world practice environments.",
      tech: ["Next.js", "React", "SQL Engine", "Tailwind CSS"],
      icon: <Database className="text-cyber-cyan" size={18} />,
      themeColor: "group-hover:border-cyber-cyan/40 hover:shadow-cyber-cyan/5",
      image: "/images/Assets-mywebsite/Querix.png"
    },
    {
      id: 3,
      name: "AutoInsight AI",
      url: "https://autoinsight-ai.vercel.app/",
      desc: "Upload CSV files and instantly generate AI-powered dashboards, insights, and visual reports.",
      tech: ["Next.js", "AI Analytics", "CSV Parser", "Data Visualizer"],
      icon: <Sparkles className="text-cyber-blue" size={18} />,
      themeColor: "group-hover:border-cyber-blue/40 hover:shadow-cyber-blue/5",
      image: "/images/Assets-mywebsite/AutoInsight AI.png"
    },
    {
      id: 4,
      name: "ScentLab Store",
      url: "https://scentlab-store.vercel.app/",
      desc: "Premium e-commerce storefront for aromatherapy and scented candle products with a modern shopping experience.",
      tech: ["React", "State Management", "Checkout Pipeline", "Tailwind CSS"],
      icon: <ShoppingBag className="text-cyber-purple" size={18} />,
      themeColor: "group-hover:border-cyber-purple/40 hover:shadow-cyber-purple/5",
      image: "/images/Assets-mywebsite/Scentlab_store.png"
    }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Staggered reveal for cards with subtle image zoom on entrance
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="webapps"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Web Applications
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Featured Full-Stack Visual Engineering & Tools
          </p>
        </div>

        {/* Web Apps Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {webAppsData.map((app) => (
            <div
              key={app.id}
              className={`glass-card rounded-xl overflow-hidden border border-navy-800/60 transition-all duration-300 flex flex-col justify-between group ${app.themeColor} opacity-0 h-[410px]`}
            >
              {/* Card Image Header - 40-45% of height */}
              <div className="relative h-[175px] w-full overflow-hidden bg-navy-950 border-b border-navy-800/40 flex-shrink-0">
                <Image
                  src={app.image}
                  alt={`${app.name} - Web Application Demonstration Preview`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Tech Accent overlay */}
                <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Live App Indicator */}
                <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[8px] font-extrabold uppercase tracking-widest text-cyber-cyan font-heading bg-navy-900/90 backdrop-blur-sm border border-navy-800 px-2.5 py-0.5 rounded select-none z-10">
                  <Globe size={8} className="animate-pulse" />
                  LIVE APP
                </span>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex flex-col justify-between flex-grow overflow-hidden">
                <div className="flex flex-col">
                  {/* Header Row */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-7 h-7 rounded bg-navy-900 border border-navy-800 flex items-center justify-center flex-shrink-0">
                      {app.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-heading font-extrabold text-text-primary group-hover:text-cyber-cyan transition-colors truncate">
                      {app.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed mb-3.5 line-clamp-3 min-h-[48px]">
                    {app.desc}
                  </p>
                </div>

                {/* Technologies & Trigger links */}
                <div className="flex flex-col">
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {app.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-navy-900 border border-navy-800/60 text-text-secondary text-[9px] font-semibold uppercase tracking-wider rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Outbound link */}
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-cyber-cyan hover:bg-cyber-cyan/95 text-navy-950 font-bold rounded text-xs flex items-center justify-center gap-1.5 transition-all duration-300 font-heading uppercase tracking-wider shadow-md shadow-cyber-cyan/5 hover:shadow-cyber-cyan/25 hover:-translate-y-0.5"
                  >
                    Visit Website
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
