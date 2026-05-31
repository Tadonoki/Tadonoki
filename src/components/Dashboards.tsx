"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart, AreaChart, PieChart, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Dashboard {
  id: number;
  title: string;
  tool: "Power BI" | "Looker Studio";
  desc: string;
  tags: string[];
  url: string;
  icon: React.ReactNode;
  themeColor: string; // custom border hover
}

export default function Dashboards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const dashboardsData: Dashboard[] = [
    {
      id: 1,
      title: "iPhone SE Sales Dashboard",
      tool: "Power BI",
      desc: "Analyzed iPhone SE 2022 sales performance in Indonesia from 2023 to 2025 using Power BI. Covers sales trends, regional distribution, profit margins, customer segmentation, and payment method analytics.",
      tags: ["Power BI", "Sales Analysis", "Dashboard"],
      url: "https://drive.google.com/file/d/1dZVdprHNJ1V0_kqvrIXBtR5o8oTPELoc/view?usp=sharing",
      icon: <BarChart className="text-amber-500" size={24} />,
      themeColor: "group-hover:border-amber-500/40 hover:shadow-amber-500/5",
    },
    {
      id: 2,
      title: "Credit Card Customer Dashboard",
      tool: "Looker Studio",
      desc: "Built an interactive Google Looker Studio dashboard to analyze credit card customer behavior, transaction volume distribution, customer satisfaction score indicators, education level, occupation, and expenses.",
      tags: ["Looker Studio", "Customer Analysis", "BI Report"],
      url: "https://datastudio.google.com/reporting/5e27fa32-444b-415b-869d-947e16bbbaca",
      icon: <AreaChart className="text-blue-500" size={24} />,
      themeColor: "group-hover:border-blue-500/40 hover:shadow-blue-500/5",
    },
    {
      id: 3,
      title: "E-Commerce Transaction Dashboard",
      tool: "Looker Studio",
      desc: "Designed a Google Looker Studio dashboard for e-commerce transaction data, visualising total revenue, net profits, product discounts, item quantities, payment channel percentages, and customer retention summaries.",
      tags: ["Looker Studio", "E-Commerce", "Sales Report"],
      url: "https://datastudio.google.com/reporting/0a29638a-fc8e-4a15-8d35-a134ba683b3d",
      icon: <PieChart className="text-emerald-500" size={24} />,
      themeColor: "group-hover:border-emerald-500/40 hover:shadow-emerald-500/5",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="dashboards"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Featured Dashboards
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Interactive Business Intelligence Reports
          </p>
        </div>

        {/* Dashboard Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dashboardsData.map((dash) => (
            <div
              key={dash.id}
              className={`glass-card rounded-xl p-8 border border-navy-800/60 transition-all duration-300 flex flex-col justify-between group ${dash.themeColor}`}
            >
              <div>
                {/* Header Row */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-navy-900 border border-navy-800/80 flex items-center justify-center">
                    {dash.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-navy-900 border border-navy-800/60 ${
                    dash.tool === "Power BI" ? "text-amber-500" : "text-blue-400"
                  }`}>
                    {dash.tool}
                  </span>
                </div>

                {/* Dashboard Title */}
                <h3 className="text-lg sm:text-xl font-heading font-bold text-text-primary mb-3 leading-snug group-hover:text-cyber-cyan transition-colors">
                  {dash.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {dash.desc}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div>
                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {dash.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-navy-900 border border-navy-800/50 text-text-muted text-[10px] font-semibold uppercase tracking-wider rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Let's Check Outbound Link */}
                <a
                  href={dash.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-heading text-cyber-cyan hover:text-text-primary transition-colors py-2 border-b border-cyber-cyan/30 hover:border-text-primary"
                >
                  Let&apos;s check it
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
