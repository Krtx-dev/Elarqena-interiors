"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.statement-line span');
      const copy = document.querySelector('.statement-copy');
      
      gsap.set(lines, { yPercent: 100 });
      gsap.set(copy, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      tl.to(lines, {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out"
      })
      .to(copy, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6");
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-[var(--section-py-lg)] px-[var(--px-outer)] bg-brand-bg flex items-center justify-center">
      <div className="max-w-[var(--max-w-content)] w-full mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-[length:var(--text-display)] font-serif leading-[1.05] tracking-tight text-brand-text mb-12 uppercase max-w-5xl mx-auto">
          <div className="statement-line mask-line overflow-hidden"><span className="inline-block">We don&apos;t design</span></div>
          <div className="statement-line mask-line overflow-hidden"><span className="inline-block text-brand-stone italic">for a photo.</span></div>
          <div className="statement-line mask-line overflow-hidden"><span className="inline-block">We design for</span></div>
          <div className="statement-line mask-line overflow-hidden"><span className="inline-block">everyday life.</span></div>
        </h2>

        <p className="statement-copy text-lg md:text-xl text-brand-text/70 max-w-xl mx-auto leading-relaxed font-medium">
          Our approach focuses on the reality of how a space is used, prioritizing durability, functional flow, and precision craftsmanship alongside beautiful aesthetics.
        </p>

      </div>
    </section>
  );
}
