"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate wordmark upwards from the bottom
      gsap.fromTo('.footer-wordmark', 
        { yPercent: 50, opacity: 0 },
        { 
          yPercent: 0, 
          opacity: 1, 
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative bg-brand-text text-brand-bg pt-24 lg:pt-32 pb-10 overflow-hidden px-[var(--px-outer)] flex flex-col justify-between" id="contact">
      <div className="max-w-[var(--max-w-content)] mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-start mb-20 lg:mb-24">
        
        <div className="max-w-2xl">
          <h2 className="text-[length:var(--text-display)] font-serif leading-[1.05] tracking-tight mb-8">
            Let&apos;s make<br/>your space<br/><i className="text-brand-stone">yours.</i>
          </h2>
          <p className="text-xl md:text-2xl opacity-70 font-light max-w-md mb-12">
            Tell us what you&apos;re planning. We bring precision and passion to every project.
          </p>
          <Magnetic>
            <a href="mailto:contact@rgsinteriors.com" className="inline-flex items-center justify-center bg-brand-bg text-brand-text px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Start a Project <span className="ml-3 text-lg leading-none">→</span>
            </a>
          </Magnetic>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 lg:pt-8">
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-brand-stone/50 mb-6 block">Call</h4>
            <a href="tel:+919688836074" className="text-xl md:text-2xl font-serif hover:text-brand-stone transition-colors">+91 96888 36074</a>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-brand-stone/50 mb-6 block">Visit</h4>
            <address className="not-italic text-xl md:text-2xl font-serif leading-relaxed">
              312, Singanallur,<br/>
              Nehru Park Road,<br/>
              Coimbatore 641017
            </address>
          </div>
        </div>
      </div>

      <div className="relative w-full z-0 pointer-events-none mt-auto">
        <div className="footer-wordmark text-[14vw] font-bold tracking-tighter uppercase leading-[0.8] text-brand-bg opacity-5 text-center whitespace-nowrap">
          ELARQENA INTERIORS
        </div>
      </div>
      
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-brand-bg/10 text-xs font-bold tracking-widest uppercase opacity-50 mt-12 gap-4 text-center sm:text-left">
        <p>© {new Date().getFullYear()} Elarqena Interiors.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
