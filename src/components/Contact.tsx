"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, MessageSquare, ExternalLink } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SocialContact {
  name: string;
  actionText: string;
  url: string;
  img: string;
  color: string;
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialGridRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const socials: SocialContact[] = [
    {
      name: "WhatsApp",
      actionText: "Chat",
      url: "https://wa.me/6289654746962",
      img: "/images/assets-contact/wa-contact.png",
      color: "hover:border-emerald-500/30",
    },
    {
      name: "LinkedIn",
      actionText: "Connect",
      url: "https://www.linkedin.com/in/kgs-m-luthfi-khailani/",
      img: "/images/assets-contact/linkedin-contact.png",
      color: "hover:border-blue-500/30",
    },
    {
      name: "GitHub",
      actionText: "View Code",
      url: "https://github.com/Tadonoki",
      img: "/images/assets-contact/github-contact.png",
      color: "hover:border-slate-400/30",
    },
    {
      name: "Facebook",
      actionText: "Follow",
      url: "https://www.facebook.com/kinglupione/",
      img: "/images/assets-contact/fb-contact.png",
      color: "hover:border-blue-600/30",
    },
    {
      name: "Instagram",
      actionText: "Follow",
      url: "https://www.instagram.com/lutfi_world/",
      img: "/images/assets-contact/ig-contact.png",
      color: "hover:border-pink-500/30",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // GSAP Context with scope
    const ctx = gsap.context(() => {
      // 1. Form slide up from left
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Social grid nodes reveal staggered from right
      if (socialGridRef.current) {
        const cards = socialGridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: socialGridRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xeedwnww", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setToast({ message: "Message sent successfully", type: "success" });
        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      } else {
        setToast({ message: "Failed to send message", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Failed to send message", type: "error" });
    } finally {
      setIsSubmitting(false);
      // Auto-hide toast after 4 seconds
      setTimeout(() => {
        setToast(null);
      }, 4000);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#020308" }}
    >
      {/* Deep space glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyber-blue/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-cyber-cyan/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-[#7c3aed]/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff01 1px, transparent 1px), linear-gradient(to bottom, #ffffff01 1px, transparent 1px)",
          backgroundSize: "6rem 6rem",
        }}
      />

      {/* Beautiful High-Performance Space Particle Background */}
      <ParticleBackground
        count={25}
        speedMultiplier={0.15}
        minSize={0.4}
        maxSize={1.4}
        colors={["#ffffff", "#38bdf8", "#818cf8"]}
        twinkle={true}
        drift={true}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-cyber-cyan mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-text-muted mt-3 uppercase tracking-widest font-semibold">
            Connect With Me
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form (Col 6) */}
          <div className="lg:col-span-6">
            <form
              ref={formRef}
              onSubmit={handleFormSubmit}
              className="glass-card rounded-xl p-8 border border-navy-800/80 text-left relative overflow-hidden opacity-0"
            >
              <h3 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                <MessageSquare className="text-cyber-cyan" size={20} />
                Send a Message
              </h3>

              {isSent && (
                <div className="mb-6 p-4 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/20 text-cyber-emerald text-sm flex items-center gap-3 animate-fadeIn">
                  <CheckCircle2 size={18} />
                  <span>Your message was sent successfully! I will reply as soon as possible.</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 bg-navy-950 border border-navy-800 text-text-primary text-sm rounded outline-none focus:border-cyber-cyan/50 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 bg-navy-950 border border-navy-800 text-text-primary text-sm rounded outline-none focus:border-cyber-cyan/50 transition-colors"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col">
                  <label htmlFor="subject" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter message subject"
                    disabled={isSubmitting}
                    className="px-4 py-3 bg-navy-950 border border-navy-800 text-text-primary text-sm rounded outline-none focus:border-cyber-cyan/50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 bg-navy-950 border border-navy-800 text-text-primary text-sm rounded outline-none focus:border-cyber-cyan/50 transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full py-3.5 bg-cyber-cyan hover:bg-cyber-cyan/90 text-navy-950 font-bold rounded flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-heading transition-all duration-300 shadow-md shadow-cyber-cyan/5 disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-cyber-cyan/20"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Platform Connection Cards (Col 6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-xl font-heading font-bold text-text-primary mb-6 text-left">
              Direct Communication Channels
            </h3>
            
            <div
              ref={socialGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {socials.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card rounded-lg p-5 border border-navy-800 flex items-center justify-between transition-all duration-300 group opacity-0 ${soc.color}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-navy-950/60 p-2 flex items-center justify-center border border-navy-800/40">
                      <Image
                        src={soc.img}
                        alt={`${soc.name} Connection logo`}
                        width={32}
                        height={32}
                        loading="lazy"
                        className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="flex flex-col text-left">
                      <span className="text-base font-heading font-bold text-text-primary">
                        {soc.name}
                      </span>
                      <span className="text-xs text-text-muted">
                        Connect Directly
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-cyan flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-heading">
                    {soc.actionText}
                    <ExternalLink size={10} />
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Premium Glassmorphic Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[999] px-6 py-4 rounded-xl backdrop-blur-md border shadow-2xl flex items-center gap-3 transition-all duration-300 transform scale-100 hover:scale-102 font-heading font-bold text-xs tracking-wider uppercase ${
            toast.type === "success"
              ? "bg-[#022c22]/90 border-emerald-500/40 text-emerald-400 shadow-emerald-950/20"
              : "bg-[#450a0a]/90 border-red-500/40 text-red-400 shadow-red-950/20"
          }`}
          style={{
            animation: "slideIn 0.3s ease-out forwards",
            boxShadow: toast.type === "success" ? "0 0 20px rgba(16, 185, 129, 0.15)" : "0 0 20px rgba(239, 68, 68, 0.15)"
          }}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={16} className="text-emerald-400" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-red-400 flex items-center justify-center text-[10px] font-extrabold text-red-400">!</div>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </section>
  );
}
