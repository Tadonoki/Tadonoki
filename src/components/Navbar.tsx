"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Web Apps", href: "#webapps" },
    { label: "Dashboards", href: "#dashboards" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // GSAP Context for memory cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Slide down nav container
      tl.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Stagger desktop items
      if (menuListRef.current) {
        const items = menuListRef.current.children;
        tl.fromTo(
          items,
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Fade-in CTA
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert(); // clean up all GSAP bindings to avoid memory leaks
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header ref={containerRef}>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glassmorphism py-4 shadow-lg shadow-navy-950/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="text-2xl font-heading font-bold text-text-primary tracking-wide hover:opacity-85 transition-opacity"
          >
            Tadonoki<span className="text-cyber-cyan font-extrabold">.</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            <ul ref={menuListRef} className="flex items-center gap-8">
              {menuItems.slice(0, -1).map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-sm font-medium text-text-secondary hover:text-cyber-cyan transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              ref={ctaRef}
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="px-5 py-2 text-xs font-semibold tracking-wider text-cyber-cyan border border-cyber-cyan rounded hover:bg-cyber-cyan/10 transition-all duration-300 flex items-center gap-1 group font-heading uppercase"
            >
              Contact Me
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-text-primary hover:text-cyber-cyan transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Full Screen Menu Overlay */}
        <div
          className={`fixed inset-0 top-0 left-0 w-full h-screen bg-navy-950/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center transition-all duration-500 lg:hidden ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-text-primary hover:text-cyber-cyan"
          >
            <X size={30} />
          </button>

          <ul className="flex flex-col gap-6 text-center">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                style={{
                  transitionDelay: `${idx * 75}ms`,
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                }}
                className="transition-all duration-500"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="text-2xl font-heading font-semibold text-text-primary hover:text-cyber-cyan transition-colors block py-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
