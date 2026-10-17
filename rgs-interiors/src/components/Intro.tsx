"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;
      const lines = textRef.current.querySelectorAll(".intro-line span");
      
      gsap.fromTo(
        lines,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-[var(--section-py)] px-[var(--px-outer)] bg-brand-bg text-brand-text">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        
        <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.3] flex-1">
          <div className="intro-line overflow-hidden"><span className="inline-block">“Good interiors are not</span></div>
          <div className="intro-line overflow-hidden"><span className="inline-block">only about how a</span></div>
          <div className="intro-line overflow-hidden"><span className="inline-block">room looks. They are</span></div>
          <div className="intro-line overflow-hidden"><span className="inline-block">about how naturally</span></div>
          <div className="intro-line overflow-hidden text-brand-walnut"><span className="inline-block">it works for you.”</span></div>
        </h2>
        
        <div className="w-full md:w-1/3 pt-4">
          <p className="text-lg opacity-80 leading-relaxed font-sans">
            At Elarqena Interiors, we create customised, functional interiors focused on exceptional workmanship, premium materials, and meticulous attention to detail. Every space is built for everyday living.
          </p>
        </div>

      </div>
    </section>
  );
}
