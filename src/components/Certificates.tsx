"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Eye, X, ZoomIn, ChevronDown, ChevronUp } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  desc: string;
  thumbImage: string;
  fullImage: string;
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalImgRef = useRef<HTMLImageElement>(null);

  const certificatesData: Certificate[] = [
    {
      id: 1,
      title: "Certified Data Analyst (CDA)",
      issuer: "BNSP",
      desc: "National professional certification validating competencies in data analysis, data interpretation, reporting, and analytical problem-solving based on industry standards.",
      thumbImage: "/images/assets/sertfikat_bnsp.png",
      fullImage: "/images/assets/BNSP_Kgs Muhammad Luthfi Khailani_page-0001.jpg",
    },
    {
      id: 2,
      title: "Data Analyst Training (CDA)",
      issuer: "Syntaxnesia",
      desc: "Intensive data analyst training covering data cleaning, exploratory data analysis, dashboard development, and business insight generation using modern analytical tools.",
      thumbImage: "/images/assets/sertifikat-syntaxnesia.png",
      fullImage: "/images/assets/sertifikat-syntaxnesia.png",
    },
    {
      id: 3,
      title: "Data Analyst Python & SQL",
      issuer: "Udemy",
      desc: "Learned data analysis workflows using Python and SQL, including data manipulation, querying, visualization, and analytical techniques for business data processing.",
      thumbImage: "/images/assets/sertifikat-udemy.png",
      fullImage: "/images/assets/sertifikat-udemy.png",
    },
    {
      id: 4,
      title: "Data Engineering: Beginner to Advanced",
      issuer: "Kelas.work",
      desc: "Studied data engineering fundamentals including ETL pipelines, data architecture, database systems, and scalable data processing workflows from beginner to advanced level.",
      thumbImage: "/images/assets/sertifikat-kelaswork.png",
      fullImage: "/images/assets/sertifikat-kelaswork.png",
    },
    {
      id: 5,
      title: "Fashion Store Sales Analysis with SQL",
      issuer: "Ngulik Data",
      desc: "Performed SQL-based sales analysis on fashion retail datasets, focusing on transaction trends, customer behavior, revenue insights, and data-driven business decisions.",
      thumbImage: "/images/assets/sertfikat_ngulikdata.png",
      fullImage: "/images/assets/sertfikat_ngulikdata.png",
    },
    {
      id: 6,
      title: "Python for Data Analysis Bootcamp",
      issuer: "MySkill",
      desc: "Learned Python fundamentals for data analysis including data cleaning, manipulation, visualization, and exploratory data analysis using libraries such as Pandas and NumPy.",
      thumbImage: "/images/assets/sertifikat-myskill.png",
      fullImage: "/images/assets/sertifikat-myskill.png",
    },
  ];

  const visibleCertificates = showAll ? certificatesData : certificatesData.slice(0, 3);

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

  // Handle smooth animation on visible certificates change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { scale: 0.95, opacity: 0, y: 25 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [showAll]);

  // Animating the modal zoom-in overlay using GSAP when selected
  useEffect(() => {
    if (selectedCert && modalRef.current && modalImgRef.current) {
      document.body.style.overflow = "hidden"; // disable scroll
      
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        modalImgRef.current,
        { scale: 0.8, y: 30 },
        { scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    } else {
      document.body.style.overflow = "unset"; // enable scroll
    }
  }, [selectedCert]);

  const closeModal = () => {
    if (modalRef.current && modalImgRef.current) {
      gsap.to(modalImgRef.current, {
        scale: 0.8,
        y: 30,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSelectedCert(null);
        },
      });
    }
  };

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Certifications
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Validated Credentials & Achievements
          </p>
        </div>

        {/* Certificates Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visibleCertificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-navy-950 border-b border-navy-800/40 cursor-pointer"
              >
                <img
                  src={cert.thumbImage}
                  alt={cert.title}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Visual View Overlay */}
                <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-cyber-cyan/15 flex items-center justify-center text-cyber-cyan">
                    <ZoomIn size={22} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyber-cyan font-heading">
                    Inspect Certificate
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-1.5 text-cyber-cyan text-xs font-bold uppercase tracking-wider font-heading mb-3">
                    <Award size={14} />
                    {cert.issuer}
                  </div>
                  
                  <h3 className="text-lg font-heading font-bold text-text-primary mb-3 leading-snug group-hover:text-cyber-cyan transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {cert.desc}
                  </p>
                </div>

                {/* Inspect Action Trigger */}
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-heading text-text-secondary hover:text-cyber-cyan transition-colors pt-4 border-t border-navy-800/30 text-left"
                >
                  <Eye size={14} />
                  View Credentials
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View All Toggle Button */}
        {certificatesData.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setShowAll(!showAll);
                if (showAll) {
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
                  <span>View All Certificates ({certificatesData.length})</span>
                  <ChevronDown size={15} className="text-cyber-cyan animate-bounce" />
                </>
              )}
            </button>
          </div>
        )}

      </div>

      {/* Full Screen Lightbox Modal Overlay */}
      {selectedCert && (
        <div
          ref={modalRef}
          className="fixed inset-0 w-full h-full z-50 bg-navy-950/95 flex justify-center items-center p-6 backdrop-blur-md"
        >
          {/* Close Area */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={closeModal}></div>

          {/* Modal Header */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-left pointer-events-none">
            <div className="max-w-[70%]">
              <span className="text-xs font-bold uppercase tracking-widest text-cyber-cyan font-heading">
                {selectedCert.issuer}
              </span>
              <h4 className="text-lg sm:text-xl font-heading font-bold text-text-primary mt-1 leading-tight">
                {selectedCert.title}
              </h4>
            </div>
            <button
              onClick={closeModal}
              className="w-12 h-12 rounded-full bg-navy-900 border border-navy-800 flex items-center justify-center text-text-primary hover:text-cyber-cyan hover:scale-105 pointer-events-auto transition-all duration-300"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Certificate Zoom Container */}
          <div className="relative max-w-4xl w-full max-h-[75vh] flex justify-center items-center z-10 mt-12 pointer-events-none">
            <img
              ref={modalImgRef}
              src={selectedCert.fullImage}
              alt={`${selectedCert.title} - Large Image`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg border border-navy-850 shadow-2xl pointer-events-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
