"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Presentation, Database, BarChart3, Filter, LineChart, ChevronDown, ChevronUp } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  category: "Python" | "Power BI" | "Looker" | "Excel";
  tags: string[];
  image: string;
  desc: string;
  stats: string[];
  articleUrl: string;
  slidesUrl: string | null;
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projectsData: Project[] = [
    {
      id: 1,
      title: "Analisis Kinerja Penjualan iPhone SE 2022 di Indonesia (2023–2025) dengan menggunakan Power BI",
      category: "Power BI",
      tags: ["Power BI", "Dashboard", "Sales Analysis"],
      image: "/images/assets/PROJECT1.jpg",
      desc: "Analyzed iPhone SE 2022 sales performance in Indonesia (2023–2025) using Power BI. Built an interactive dashboard to explore sales trends, regional performance, and customer segmentation, providing insights to support data-driven business decisions.",
      stats: ["1+ Reports", "15,500+ Records"],
      articleUrl: "https://medium.com/@khailanilupi2005/analisis-kinerja-penjualan-iphone-se-2022-di-indonesia-2023-2025-dengan-menggunakan-power-bi-7a07c5785fbc",
      slidesUrl: "https://drive.google.com/file/d/1p2WF2xD5Ab7O1FYslcvpXXquHNH2Dws7/view?usp=sharing"
    },
    {
      id: 2,
      title: "Analisis Data Pelanggan Kartu Kredit dan Dashboard Interaktif menggunakan Google Looker Studio",
      category: "Looker",
      tags: ["Looker", "Dashboard", "Customer Behavior"],
      image: "/images/assets/PROJECT2.jpg",
      desc: "Analyzed customer data to understand purchasing behavior and customer segmentation. Developed an interactive dashboard in Looker Studio to highlight key insights, helping identify patterns and support targeted marketing strategies.",
      stats: ["2+ Datasets", "5,054+ Records"],
      articleUrl: "https://medium.com/@khailanilupi2005/analisis-data-pelanggan-kartu-kredit-dan-dashboard-interaktif-menggunakan-google-looker-studio-1bd2772a1ed1",
      slidesUrl: "https://drive.google.com/file/d/1oe7I7t_tXiQTV_jmBe9mnc27DFGM4DPh/view?usp=sharing"
    },
    {
      id: 3,
      title: "Analisis Data Transaksi E-Commerce dan Dashboard Penjualan Interaktif menggunakan Google Looker Studio",
      category: "Looker",
      tags: ["Looker", "E-Commerce", "Dashboard"],
      image: "/images/assets/PROJECT3.jpg",
      desc: "Analyzed e-commerce transaction data to identify sales trends and customer purchasing behavior. Built an interactive dashboard in Looker Studio to visualize key metrics and support data-driven decision making.",
      stats: ["5,884+ Records", "Sales Report"],
      articleUrl: "https://medium.com/@khailanilupi2005/analisis-data-transaksi-e-commerce-dan-dashboard-penjualan-interaktif-menggunakan-google-looker-456ca4feae57",
      slidesUrl: "https://drive.google.com/file/d/1G5n_s9qL0QygYEE_M2k381YVJNJCitHz/view?usp=sharing"
    },
    {
      id: 4,
      title: "How the World Changed in 55 Years: Exploring GDP, Life Expectancy, and Inequality with Plotly",
      category: "Python",
      tags: ["Python", "Pandas", "Plotly", "Gapminder"],
      image: "/images/assets/PROJECT4.jpg",
      desc: "Explored global development trends using Gapminder data, focusing on GDP, life expectancy, and population. Created interactive visualizations with Python and Plotly to uncover patterns and compare changes across countries over time.",
      stats: ["1,704+ Records", "Interactive Plotly"],
      articleUrl: "https://medium.com/@khailanilupi2005/how-the-world-changed-in-55-years-exploring-gdp-life-expectancy-and-inequality-with-plotly-3ab9fb5a5926",
      slidesUrl: "https://drive.google.com/file/d/1tq3Y7jHd-mXINuzI5IjkNskaKodPvYy1/view?usp=sharing"
    },
    {
      id: 5,
      title: "Predicting the 2026 UEFA Champions League Winner Using Match Statistics (Data Analyst)",
      category: "Python",
      tags: ["Python", "Pandas", "Seaborn", "UCL Stats"],
      image: "/images/assets/PROJECT5.png",
      desc: "Analyzed historical match data to explore patterns and factors influencing team performance in the UEFA Champions League. Used Python (Pandas, Seaborn) to perform exploratory data analysis and visualize key trends.",
      stats: ["144+ Matches", "Year 2026 Predictions"],
      articleUrl: "https://medium.com/@khailanilupi2005/predicting-the-2026-uefa-champions-league-winner-using-match-statistics-data-analyst-a035c625b1bd",
      slidesUrl: "https://drive.google.com/file/d/1qoa3nLjcWBd2LRHhx-5kuA279M8TUPBB/view?usp=sharing"
    },
    {
      id: 6,
      title: "Exploratory Sales Data Analysis dan Interactive Dashboard menggunakan Microsoft Excel",
      category: "Excel",
      tags: ["Excel", "Dashboard", "Sales Analysis"],
      image: "/images/assets/PROJECT6.png",
      desc: "Performed exploratory analysis on sales data using Microsoft Excel. Built an interactive dashboard with pivot tables and charts to identify sales trends and summarize key business metrics.",
      stats: ["15,500+ Records", "Pivot Tables"],
      articleUrl: "https://medium.com/@khailanilupi2005/exploratory-sales-data-analysis-dan-interactive-dashboard-menggunakan-microsoft-excel-869f0c6e2227",
      slidesUrl: null
    },
    {
      id: 7,
      title: "Exploratory Data Analysis: Garis Kemiskinan Indonesia 2025 (BPS)",
      category: "Python",
      tags: ["Python", "Pandas", "Colab", "Demographics"],
      image: "/images/assets/PROJECT7.png",
      desc: "Conducted exploratory data analysis on Indonesia’s poverty line data (BPS 2025) to identify trends and regional patterns. Used Python (Pandas, Colab) to process data and generate visual insights for better understanding of socioeconomic conditions.",
      stats: ["Poverty Trends", "BPS Datasets"],
      articleUrl: "https://medium.com/@khailanilupi2005/exploratory-data-analysis-garis-kemiskinan-indonesia-2025-bps-b784cd05657e",
      slidesUrl: null
    },
    {
      id: 8,
      title: "Analisis Tren Persentase Perokok Berdasarkan Kelompok Usia Periode 2021–2023",
      category: "Python",
      tags: ["Python", "Colab", "Data Visualization"],
      image: "/images/assets/PROJECT8.png",
      desc: "Analyzed smoking prevalence trends by age group (2021–2023) to identify patterns across different demographics. Utilized Python for data processing and visualization to highlight key insights and support data-driven awareness.",
      stats: ["Age Demographics", "Trend Analysis"],
      articleUrl: "https://medium.com/@khailanilupi2005/exploratory-sales-data-analysis-dan-interactive-dashboard-menggunakan-microsoft-excel-869f0c6e2227",
      slidesUrl: null
    }
  ];

  // Apply filters
  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter(proj => proj.category === filter);

  // Apply default limit (4) unless expanded
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Main section ScrollTrigger reveal
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

  // Handle smooth animation on filter or expand change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.95, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filter, showAll]);

  // Reset showAll if filter changes (so we don't start expanded on another filter)
  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  const categories = ["All", "Python", "Power BI", "Looker", "Excel"];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            My Projects
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Data Analysis Case Studies & Explorations
          </p>
        </div>

        {/* Categories Filtering Navbar */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-800 text-text-secondary text-xs font-semibold mr-2 font-heading uppercase">
            <Filter size={14} className="text-cyber-cyan" />
            Filter
          </div>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-bold rounded uppercase tracking-wider font-heading border transition-all duration-300 ${
                filter === cat
                  ? "bg-cyber-cyan text-navy-950 border-cyber-cyan shadow-md shadow-cyber-cyan/10"
                  : "bg-navy-900 text-text-secondary border-navy-800 hover:text-cyber-cyan hover:border-navy-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          {visibleProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card rounded-xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Project Image Frame */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950 border-b border-navy-800/40">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {/* Tech Badge */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-navy-900/90 backdrop-blur-md border border-navy-800 text-cyber-cyan text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1.5 z-10">
                  <LineChart size={10} className="text-cyber-cyan animate-pulse" />
                  {proj.category}
                </span>
              </div>

              {/* Card Contents */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  {/* Tag badging */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-navy-800/60 text-text-muted text-[10px] font-semibold uppercase tracking-wider rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-3 leading-snug group-hover:text-cyber-cyan transition-colors">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {proj.desc}
                  </p>
                </div>

                {/* Footer details + Action links */}
                <div>
                  {/* Project Stats row */}
                  {proj.stats.length > 0 && (
                    <div className="flex flex-wrap gap-4 items-center mb-6 pt-4 border-t border-navy-800/30 text-xs text-text-muted">
                      {proj.stats.map((stat, idx) => (
                        <span key={idx} className="flex items-center gap-1.5">
                          {idx === 0 ? <Database size={13} className="text-cyber-blue" /> : <BarChart3 size={13} className="text-cyber-emerald" />}
                          {stat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buttons row */}
                  <div className="flex flex-wrap gap-3 items-center">
                    <a
                      href={proj.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-cyber-cyan hover:bg-cyber-cyan/90 text-navy-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all duration-300 font-heading uppercase tracking-wider"
                    >
                      <BookOpen size={14} />
                      Read Article
                    </a>
                    {proj.slidesUrl && (
                      <a
                        href={proj.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-text-primary border border-navy-700 hover:border-navy-600 font-semibold rounded text-xs flex items-center gap-1.5 transition-all duration-300 font-heading uppercase tracking-wider"
                      >
                        <Presentation size={14} className="text-cyber-cyan" />
                        View Slides
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Toggle Button */}
        {filteredProjects.length > 4 && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) {
                  // smooth scroll back up to projects section start
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = containerRef.current?.getBoundingClientRect().top || 0;
                  const elementPosition = elementRect - bodyRect;
                  window.scrollTo({
                    top: elementPosition - offset,
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
                  <span>View All Projects ({filteredProjects.length})</span>
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
