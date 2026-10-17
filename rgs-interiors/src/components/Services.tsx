"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function Services({ images }: { images: string[] }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const services = [
    { name: "Modular Kitchens", img: images.length > 7 ? images[7] : "", desc: "Tailored to your daily workflow and aesthetic preferences." },
    { name: "Wardrobes & Storage", img: images.length > 8 ? images[8] : "", desc: "Maximized space utility with premium finishes." },
    { name: "Living Spaces", img: images.length > 9 ? images[9] : "", desc: "Elegant living rooms and custom TV units." },
    { name: "Custom Carpentry", img: images.length > 10 ? images[10] : "", desc: "Bespoke furniture and built-in joinery." },
    { name: "Full Home Interiors", img: images.length > 11 ? images[11] : "", desc: "End-to-end interior execution for your entire home." },
    { name: "Commercial Interiors", img: images.length > 12 ? images[12] : "", desc: "Offices, retail spaces, and specialized environments." },
  ];

  return (
    <section className="py-[var(--section-py)] px-[var(--px-outer)] bg-brand-bg text-brand-text" id="services">
      <div className="max-w-[var(--max-w-content)] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left: Interactive List */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <div className="mb-10 md:mb-12">
            <h2 className="text-[length:var(--text-section)] font-serif leading-none tracking-tight">
              Our Services
            </h2>
          </div>
          
          <div className="border-t border-brand-text/10">
            {services.map((svc, i) => (
              <div 
                key={i}
                className="group border-b border-brand-text/10 py-6 md:py-7 flex flex-col cursor-pointer hover:bg-brand-stone/10 px-4 -mx-4 transition-colors"
                onMouseEnter={() => setHoveredIndex(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-brand-stone font-serif text-xl opacity-60">
                      0{i + 1}
                    </span>
                    <h3 className={cn(
                      "text-3xl md:text-4xl xl:text-5xl font-serif tracking-tight text-brand-text transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      hoveredIndex === i ? "translate-x-4 md:translate-x-6 text-brand-walnut" : ""
                    )}>
                      {svc.name}
                    </h3>
                  </div>
                  <div className={cn(
                    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-brand-walnut",
                    hoveredIndex === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
                
                {/* Description reveal */}
                <div className={cn(
                  "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  hoveredIndex === i ? "grid-rows-[1fr] mt-6 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
                )}>
                  <p className="overflow-hidden text-brand-text/70 text-lg md:text-xl font-medium pl-16 md:pl-20 max-w-lg">
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dynamic Image */}
        <div className="w-full lg:w-[45%]">
          <div className="relative aspect-[4/5] lg:aspect-[3/4] max-h-[760px] w-full overflow-hidden bg-brand-stone/20 rounded-sm shadow-xl lg:sticky lg:top-28">
            {services.map((svc, i) => (
              <div 
                key={i}
                className={cn(
                  "absolute inset-0 w-full h-full origin-bottom transition-all duration-[1.2s] ease-[cubic-bezier(0.87,0,0.13,1)]",
                  hoveredIndex === i ? "z-10 clip-path-full" : "z-0 clip-path-hidden opacity-0 scale-110"
                )}
                style={{
                  clipPath: hoveredIndex === i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"
                }}
              >
                {svc.img && (
                  <Image
                    src={svc.img.startsWith('http') ? svc.img : `/images/${svc.img}`}
                    alt={svc.name}
                    fill
                    unoptimized={svc.img.startsWith("http")}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
