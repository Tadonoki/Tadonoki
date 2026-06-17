"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExpItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  location: string;
  desc: string;
  image: string;
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  const experienceData: ExpItem[] = [
    {
      id: 1,
      role: "Data Analyst Intern",
      company: "PT PLN (Persero)",
      duration: "Feb 2024 - Present",
      location: "Palembang, Indonesia",
      desc: "Assisted in analyzing operational and business data to support reporting and decision-making processes. Worked on data cleaning, visualization, and dashboard development using Excel, SQL, and Power BI to improve reporting efficiency and deliver actionable insights.",
      image: "/images/Assets-exp/intern pln.jpg.jpeg",
    },
    {
      id: 2,
      role: "Head IT & Operator PKKMB UNSRI 2024",
      company: "Sriwijaya University · Committee",
      duration: "Aug 2024",
      location: "Palembang, Indonesia",
      desc: "Managed and validated data for more than 8,900 new students while organizing student information into over 150 operational groups to improve coordination efficiency during PKKMB UNSRI 2024. Also coordinated IT systems and data flow throughout the event to ensure smooth technical operations and minimize disruptions.",
      image: "/images/Assets-exp/Head IT & Operator PKKMB UNSRI.jpg",
    },
    {
      id: 3,
      role: "IT Specialist",
      company: "Intel Fasilkom Unsri · Freelance",
      duration: "May 2024",
      location: "Palembang, Indonesia",
      desc: "Developed interactive web interfaces focused on structured data presentation and accessibility while improving user experience through optimized layouts and efficient data flow. Collaborated with cross-functional teams to support better user interaction and engagement during the event.",
      image: "/images/Assets-exp/International English Festival.png",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;

    // GSAP Context with scope
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Bypass all ScrollTriggers completely for instant, lag-free load
        if (activeLineRef.current) gsap.set(activeLineRef.current, { height: "100%", scaleY: 1 });
        if (timelineRef.current) {
          const cards = timelineRef.current.querySelectorAll(".timeline-card-wrapper");
          const imgWrappers = timelineRef.current.querySelectorAll(".timeline-img-wrapper");
          const dots = timelineRef.current.querySelectorAll(".timeline-dot");
          const imgs = timelineRef.current.querySelectorAll(".exp-img");

          gsap.set(cards, { opacity: 1, y: 0 });
          gsap.set(imgWrappers, { opacity: 1, y: 0, scale: 1 });
          gsap.set(dots, { opacity: 1, scale: 1 });
          gsap.set(imgs, { clipPath: "inset(0 0% 0 0)", scale: 1 });
        }
      } else {
        // Desktop: High performance timeline growing scroll line (uses scaleY to prevent forced reflow)
        if (activeLineRef.current && timelineRef.current) {
          gsap.set(activeLineRef.current, { height: "100%", transformOrigin: "top" });
          gsap.fromTo(
            activeLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 80%",
                end: "bottom 70%",
                scrub: true,
              },
            }
          );
        }

        // Desktop: Group and batch animation triggers (1 ScrollTrigger per item)
        if (timelineRef.current) {
          const items = timelineRef.current.querySelectorAll(".timeline-item");
          items.forEach((item) => {
            const card = item.querySelector(".timeline-card-wrapper");
            const imgWrapper = item.querySelector(".timeline-img-wrapper");
            const dot = item.querySelector(".timeline-dot");
            const img = item.querySelector(".exp-img");

            const itemTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              }
            });

            itemTl
              .fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" })
              .fromTo(card, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
              .fromTo(imgWrapper, { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, "-=0.5");

            if (img) {
              itemTl.fromTo(
                img,
                { clipPath: "inset(0 100% 0 0)", scale: 1.12 },
                { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.8, ease: "power3.out" },
                "-=0.5"
              );
            }
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Experience
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Professional Roles & Organizational Milestones
          </p>
        </div>

        {/* Vertical Timeline Wrapper - Enlarged to max-w-5xl for side-panel structures */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          
          {/* Static Center Line (Dark Navy background spacer) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy-900 pointer-events-none transform md:-translate-x-1/2"></div>
          
          {/* Active Center Line (Draws on Scroll!) */}
          <div
            ref={activeLineRef}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-cyan to-cyber-emerald pointer-events-none transform md:-translate-x-1/2 origin-top h-0 z-10"
          ></div>

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-12">
            {experienceData.map((item, idx) => (
              <div
                key={item.id}
                className={`timeline-item relative flex flex-col md:flex-row items-center justify-between pl-12 md:pl-0 pb-12 md:pb-8 ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot that pops on arrival - top on mobile, vertically centered on desktop */}
                <div className="timeline-dot absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-cyber-cyan border-4 border-navy-950 transform -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 shadow-lg shadow-cyber-cyan/50 opacity-0 scale-0"></div>

                {/* Sibling A: Image Column (Always top on mobile, alternating left/right on desktop) */}
                <div className="timeline-img-wrapper w-full md:w-1/2 px-4 md:px-8 opacity-0">
                  <div className="glass-card rounded-xl border border-navy-800/80 hover:border-cyber-cyan/35 hover:shadow-[0_0_25px_rgba(100,255,218,0.08)] hover:scale-[1.015] transition-all duration-500 overflow-hidden relative aspect-[16/10] sm:aspect-[16/9] md:h-[220px] lg:h-[240px] xl:h-[250px] w-full group shadow-lg">
                    <Image
                      src={item.image}
                      alt={`${item.role} cover`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="exp-img w-full h-full object-cover object-center absolute inset-0"
                      style={{ clipPath: "inset(0 100% 0 0)" }}
                    />
                    {/* Interactive overlay glow */}
                    <div className="absolute inset-0 bg-cyber-cyan/5 opacity-30 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Sibling B: Card Column (Always bottom on mobile, alternating opposite of image on desktop) */}
                <div className="timeline-card-wrapper w-full md:w-1/2 px-4 md:px-8 mt-6 md:mt-0 opacity-0">
                  <div className="glass-card rounded-xl p-6 sm:p-8 border border-navy-800/80 hover:border-cyber-cyan/35 hover:shadow-[0_0_25px_rgba(100,255,218,0.08)] hover:scale-[1.015] transition-all duration-500 text-left shadow-lg">
                    {/* Header Row */}
                    <div className="flex items-center gap-2 text-cyber-cyan text-xs font-bold uppercase tracking-wider font-heading mb-3">
                      <Briefcase size={14} />
                      {item.company}
                    </div>

                    {/* Role Title */}
                    <h3 className="text-lg sm:text-xl font-heading font-extrabold text-text-primary mb-2 leading-snug group-hover:text-cyber-cyan transition-colors">
                      {item.role}
                    </h3>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-muted mb-4 font-heading">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar size={13} className="text-cyber-blue" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin size={13} className="text-cyber-emerald" />
                        {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
