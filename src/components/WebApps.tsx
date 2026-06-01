"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Sparkles, ShoppingBag, ExternalLink, Globe } from "lucide-react";
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
  features: string[];
  image: string;
}

export default function WebApps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const webAppsData: WebApp[] = [
    {
      id: 1,
      name: "Querix",
      url: "https://querix.vercel.app/",
      desc: "An interactive educational platform designed specifically for Data Analysts to learn, practice, and master SQL queries in a visual, hands-on environment.",
      tech: ["Next.js", "React", "SQL Engine", "Tailwind CSS"],
      icon: <Database className="text-cyber-cyan" size={20} />,
      themeColor: "group-hover:border-cyber-cyan/40 hover:shadow-cyber-cyan/5",
      features: ["Visual Query Builders", "SQL Sandbox Engine", "Data Analyst Practice Sets"],
      image: "/images/Assets-mywebsite/Querix.png"
    },
    {
      id: 2,
      name: "AutoInsight AI",
      url: "https://autoinsight-ai.vercel.app/",
      desc: "An advanced AI-powered data assistant that automatically ingests raw CSV spreadsheets, analyzes columns, and compiles full-featured business dashboards instantly with natural language.",
      tech: ["Next.js", "AI Analytics", "CSV Parser", "Data Visualizer"],
      icon: <Sparkles className="text-cyber-blue" size={20} />,
      themeColor: "group-hover:border-cyber-blue/40 hover:shadow-cyber-blue/5",
      features: ["Autonomous CSV Cleaning", "Natural Language Queries", "Instant Dashboard Generation"],
      image: "/images/Assets-mywebsite/AutoInsight AI.png"
    },
    {
      id: 3,
      name: "ScentLab Store",
      url: "https://scentlab-store.vercel.app/",
      desc: "A premium, fully responsive modern e-commerce storefront dedicated to selling aromatherapy and scented candle products with optimized customer journeys.",
      tech: ["React", "State Management", "Checkout Pipeline", "Tailwind CSS"],
      icon: <ShoppingBag className="text-cyber-purple" size={20} />,
      themeColor: "group-hover:border-cyber-purple/40 hover:shadow-cyber-purple/5",
      features: ["Responsive Storefront", "Fluid Cart Pipelines", "Aesthetic Product Showcases"],
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {webAppsData.map((app) => (
            <div
              key={app.id}
              className={`glass-card rounded-xl overflow-hidden border border-navy-800/60 transition-all duration-300 flex flex-col justify-between group ${app.themeColor} opacity-0`}
            >
              {/* Card Image Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950 border-b border-navy-800/40">
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
                <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-cyber-cyan font-heading bg-navy-900/90 backdrop-blur-sm border border-navy-800 px-2.5 py-1 rounded select-none z-10">
                  <Globe size={10} className="animate-pulse" />
                  LIVE APP
                </span>
              </div>

              {/* Card Contents */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  {/* Header Row */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded bg-navy-900 border border-navy-800 flex items-center justify-center">
                      {app.icon}
                    </div>
                    <h3 className="text-lg font-heading font-extrabold text-text-primary group-hover:text-cyber-cyan transition-colors">
                      {app.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 min-h-[64px]">
                    {app.desc}
                  </p>

                  {/* Custom list details */}
                  <ul className="space-y-2 mb-8 text-left">
                    {app.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-text-muted flex items-center gap-2 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/70"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies & Trigger links */}
                <div>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {app.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-navy-900 border border-navy-800/60 text-text-secondary text-[10px] font-semibold uppercase tracking-wider rounded"
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
                    className="w-full py-3 bg-cyber-cyan hover:bg-cyber-cyan/95 text-navy-950 font-bold rounded text-xs flex items-center justify-center gap-1.5 transition-all duration-300 font-heading uppercase tracking-wider shadow-md shadow-cyber-cyan/5 hover:shadow-cyber-cyan/25 hover:-translate-y-0.5"
                  >
                    Visit Website
                    <ExternalLink size={13} />
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
