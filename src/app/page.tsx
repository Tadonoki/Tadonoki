"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import WebApps from "@/components/WebApps";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

// Dynamically load heavy client-only/animation-heavy components for dramatic Lighthouse performance gain
const DataPlayground = dynamic(() => import("@/components/DataPlayground"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] flex items-center justify-center text-text-muted font-mono text-xs">Loading Interactive Arena...</div>
});

const Dashboards = dynamic(() => import("@/components/Dashboards"), {
  ssr: false,
  loading: () => <div className="min-h-[250px] flex items-center justify-center text-text-muted font-mono text-xs">Loading Dashboards...</div>
});

const Certificates = dynamic(() => import("@/components/Certificates"), {
  ssr: false,
  loading: () => <div className="min-h-[250px] flex items-center justify-center text-text-muted font-mono text-xs">Loading Credentials...</div>
});

const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] flex items-center justify-center text-text-muted font-mono text-xs">Loading Communications Hub...</div>
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-cyber-cyan/35 selection:text-white relative">
      {/* Premium GSAP Data Analyst Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Dynamic Glassmorphic Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Modular Portfolio Sections */}
        <Hero />
        
        <About />
        
        {/* Unified Technical Journey Section Wrapper (Continuous starlight space background) */}
        <div className="relative overflow-hidden w-full" style={{ backgroundColor: "#050814" }}>
          {/* Cohesive Soft Cyber-Cyan & Blue Atmospheric Glows */}
          <div className="absolute top-[5%] right-[10%] w-[600px] h-[600px] bg-cyber-blue/4 rounded-full blur-[150px] pointer-events-none select-none z-0"></div>
          <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-cyber-cyan/4 rounded-full blur-[140px] pointer-events-none select-none z-0"></div>
          <div className="absolute top-[40%] left-[10%] w-[550px] h-[550px] bg-cyber-cyan/3 rounded-full blur-[160px] pointer-events-none select-none z-0"></div>
          <div className="absolute top-[70%] right-[5%] w-[600px] h-[600px] bg-cyber-blue/3 rounded-full blur-[150px] pointer-events-none select-none z-0"></div>

          {/* Unified Constellation HUD Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none select-none z-0"></div>



          <Skills />
          <Experience />
          <Projects />
          
          {/* Section Separator Mini Games */}
          <DataPlayground />
          
          <WebApps />
          <Dashboards />
          <Certificates />
        </div>
        
        <Contact />
      </main>

      {/* Modern Footer summary and exploratory stats */}
      <Footer />
    </div>
  );
}
