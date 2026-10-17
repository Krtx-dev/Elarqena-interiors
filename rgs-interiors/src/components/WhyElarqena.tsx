"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyElarqena() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const reasons = [
    {
      id: "01",
      title: "DETAIL MATTERS",
      desc: "Every inch is measured, every joint is seamless. We pride ourselves on the perfection of our finish."
    },
    {
      id: "02",
      title: "MADE FOR YOUR SPACE",
      desc: "No templated designs. Everything is customised to your lifestyle, ergonomics, and aesthetic preferences."
    },
    {
      id: "03",
      title: "BUILT WITH CARE",
      desc: "We select only the best materials to ensure your interiors remain beautiful and functional for years."
    },
    {
      id: "04",
      title: "COMMUNICATION THROUGHOUT",
      desc: "Clear updates, transparent pricing, and active collaboration from the first sketch to final handover."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.reason-item');
      
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-[var(--section-py)] px-[var(--px-outer)] bg-white text-brand-text" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-text max-w-2xl">
            Why our clients choose us.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {reasons.map((reason, i) => (
            <div key={i} className="reason-item flex flex-col md:flex-row gap-6 items-start">
              <span className="text-brand-stone font-serif text-3xl md:text-4xl leading-none">
                {reason.id}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-wide uppercase mb-4">{reason.title}</h3>
                <p className="text-brand-text/70 leading-relaxed text-lg">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
