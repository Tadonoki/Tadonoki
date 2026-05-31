"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Database, LineChart, PieChart, FileSpreadsheet, Percent, BarChart, ChevronDown, ChevronUp } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const marqueeLogos = [
    { src: "/images/assets-tools/excel.png", alt: "Excel" },
    { src: "/images/assets-tools/sql.png", alt: "SQL" },
    { src: "/images/assets-tools/py.png", alt: "Python" },
    { src: "/images/assets-tools/looker.png", alt: "Looker Studio" },
    { src: "/images/assets-tools/powerbi.png", alt: "Power BI" },
  ];

  const skillCards = [
    {
      title: "Python",
      icon: <Terminal className="text-cyber-cyan" size={24} />,
      desc: "Python is one of the main tools I use for data analysis, including data cleaning, manipulation, and visualization. I utilize libraries such as Pandas, NumPy, Matplotlib, Seaborn, and Plotly to explore datasets and generate insights.",
      color: "border-t-cyber-cyan",
      value: "90%",
      glow: "hover:shadow-cyber-cyan/5",
    },
    {
      title: "SQL",
      icon: <Database className="text-cyber-blue" size={24} />,
      desc: "SQL is essential for querying and managing data from relational databases. I use SQL to extract, transform, and analyze data through joins, aggregations, and filtering to support data-driven decisions.",
      color: "border-t-cyber-blue",
      value: "95%",
      glow: "hover:shadow-cyber-blue/5",
    },
    {
      title: "Looker Studio",
      icon: <PieChart className="text-cyber-purple" size={24} />,
      desc: "I use Looker Studio to build interactive dashboards and visual reports that help present data insights clearly and support better decision-making.",
      color: "border-t-cyber-purple",
      value: "85%",
      glow: "hover:shadow-cyber-purple/5",
    },
    {
      title: "Power BI",
      icon: <LineChart className="text-cyber-cyan" size={24} />,
      desc: "Power BI allows me to create interactive dashboards and reports, enabling real-time insights and helping stakeholders understand key metrics effectively.",
      color: "border-t-cyber-cyan",
      value: "90%",
      glow: "hover:shadow-cyber-cyan/5",
    },
    {
      title: "Excel",
      icon: <FileSpreadsheet className="text-cyber-emerald" size={24} />,
      desc: "I use Excel for data analysis tasks such as data cleaning, pivot tables, and basic statistical analysis to quickly explore and summarize datasets.",
      color: "border-t-cyber-emerald",
      value: "80%",
      glow: "hover:shadow-cyber-emerald/5",
    },
    {
      title: "Statistics & Analytics",
      icon: <Percent className="text-cyber-blue" size={24} />,
      desc: "I have a basic understanding of statistical concepts such as descriptive statistics, simple analysis techniques, and hypothesis testing to support reliable data interpretation.",
      color: "border-t-cyber-blue",
      value: "75%",
      glow: "hover:shadow-cyber-blue/5",
    },
    {
      title: "Data Visualization",
      icon: <BarChart className="text-cyber-purple" size={24} />,
      desc: "I create clear, aesthetic, and simple visualizations to communicate data insights effectively using charts, graphs, and dashboards that immediately capture critical trends.",
      color: "border-t-cyber-purple",
      value: "88%",
      glow: "hover:shadow-cyber-purple/5",
    },
  ];

  const visibleSkills = showAll ? skillCards : skillCards.slice(0, 3);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Initial ScrollTrigger reveal (occurs on mount)
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle smooth animation on visible skills change (either first load scroll trigger or expand toggle click)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (cardContainerRef.current) {
        const cards = cardContainerRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.95, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
        );

        const progressBars = cardContainerRef.current.querySelectorAll(".skill-progress-bar");
        progressBars.forEach((bar) => {
          const val = bar.getAttribute("data-value") || "0%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: val,
              duration: 1.5,
              ease: "power2.out",
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [showAll]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Tools & Skills
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Essential Stack & Competencies
          </p>
        </div>

        {/* Infinite Logo Marquee Row */}
        <div className="mb-20 py-8 border-y border-navy-800/40 relative overflow-hidden bg-navy-950/20 backdrop-blur-sm rounded-lg">
          <div className="flex w-full">
            <div className="animate-marquee flex items-center gap-16 md:gap-24">
              {marqueeLogos.concat(marqueeLogos).map((logo, idx) => (
                <div
                  key={idx}
                  className="w-24 md:w-32 h-12 flex justify-center items-center opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain filter brightness-90 contrast-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Competencies Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
            Core Skills & Methodologies
          </h3>
          <p className="text-base text-text-secondary leading-relaxed">
            Key analytical concepts and visual reporting competencies that define my expertise. I focus on bringing clarity to datasets, uncovering strategic performance indicators, and presenting results through sleek interactive dashboards.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleSkills.map((skill, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-xl p-8 border-t-4 ${skill.color} ${skill.glow} flex flex-col justify-between opacity-0 group`}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center mb-6 group-hover:scale-108 group-hover:rotate-3 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-heading font-bold text-text-primary mb-3">
                  {skill.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full">
                <div className="flex justify-between items-center text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted mb-2">
                  <span>Proficiency</span>
                  <span className="text-cyber-cyan">{skill.value}</span>
                </div>
                <div className="w-full h-1.5 bg-navy-950 border border-navy-800 rounded-full overflow-hidden">
                  <div
                    className="skill-progress-bar h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full w-0"
                    data-value={skill.value}
                  ></div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Toggle Button */}
        {skillCards.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) {
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = cardContainerRef.current?.getBoundingClientRect().top || 0;
                  const elementPosition = elementRect - bodyRect;
                  window.scrollTo({
                    top: elementPosition - offset - 100, // slight offset to focus on intro
                    behavior: "smooth",
                  });
                }
              }}
              className="px-6 py-3.5 bg-transparent hover:bg-navy-800 text-text-primary border border-navy-700 hover:border-cyber-cyan font-bold rounded text-xs tracking-wider uppercase font-heading transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp size={15} className="text-cyber-cyan" />
                </>
              ) : (
                <>
                  <span>View All Skills ({skillCards.length})</span>
                  <ChevronDown size={15} className="text-cyber-cyan animate-bounce" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
