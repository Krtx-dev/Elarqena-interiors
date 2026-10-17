"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: "01", title: "Consultation" },
    { id: "02", title: "Measure & Plan" },
    { id: "03", title: "Design & Material Selection" },
    { id: "04", title: "Build & Installation" },
    { id: "05", title: "Final Handover" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            }
          }
        );
      }

      const items = gsap.utils.toArray<HTMLElement>('.process-step');
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-[var(--section-py)] px-[var(--px-outer)] bg-brand-bg text-brand-text overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">Our Process</h2>
        
        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-8 left-0 right-0 h-[1px] bg-brand-stone/30 hidden md:block" />
          
          {/* Animated Line */}
          <div 
            ref={lineRef}
            className="absolute top-8 left-0 right-0 h-[2px] bg-brand-walnut hidden md:block origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="process-step relative flex flex-col md:items-center md:text-center group">
                <div className="w-16 h-16 rounded-full bg-white border border-brand-stone flex items-center justify-center text-xl font-serif text-brand-walnut mb-6 z-10 md:mx-auto shadow-sm group-hover:border-brand-walnut transition-colors">
                  {step.id}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wide">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
