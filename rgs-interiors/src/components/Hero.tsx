"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  
  const bgImage = images.length > 0 ? (images[0].startsWith('http') ? images[0] : `/images/${images[0]}`) : "";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      
      gsap.set(wordmarkRef.current, { opacity: 0, y: 10 });
      gsap.set(imageRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(imgInnerRef.current, { scale: 1.04 });
      
      const headlines = gsap.utils.toArray<HTMLElement>('.hero-headline .mask-line span');
      gsap.set(headlines, { yPercent: 100 });
      gsap.set(metaRef.current?.children || [], { opacity: 0, y: 20 });
      
      tl.to(wordmarkRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
        .to(imageRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut" }, "-=0.5")
        .to(imgInnerRef.current, { scale: 1, duration: 2, ease: "power2.out" }, "-=1.6")
        .to(headlines, { yPercent: 0, duration: 1.2, stagger: 0.15 }, "-=1.2")
        .to(metaRef.current?.children || [], { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, "-=0.8");
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[720px] h-[100svh] max-h-[960px] bg-brand-bg pt-24 md:pt-28 px-[var(--px-outer)] pb-8 flex flex-col justify-between">
      
      {/* Top Wordmark & Labels */}
      <div ref={wordmarkRef} className="flex justify-between items-start text-xs font-bold tracking-[0.2em] uppercase z-10 relative text-brand-text">
        <div className="hidden sm:flex flex-col gap-1 opacity-70">
          <span>Custom interiors</span>
          <span>Built in Coimbatore</span>
        </div>
        <div className="text-right hidden sm:block">
          <span>Interior Design × Carpentry</span><br/>
          <span className="opacity-60">Coimbatore</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col lg:flex-row items-end lg:items-center mt-8 lg:mt-0 z-10 pointer-events-none">
        
        {/* Large Typography overlapping the image */}
        <div ref={linesRef} className="hero-headline w-full lg:w-[58%] z-20 text-brand-text lg:-mr-[8%] pb-6 lg:pb-0 pointer-events-auto">
          <h1 className="text-[length:var(--text-hero)] font-serif leading-[0.95] tracking-tight">
            <div className="mask-line"><span className="inline-block">Spaces,</span></div>
            <div className="mask-line"><span className="inline-block">made personal.</span></div>
          </h1>
        </div>

        {/* 60-70% Viewport Image */}
        <div className="w-full lg:w-[52%] h-[46vh] min-h-[320px] lg:h-[72vh] lg:min-h-0 relative overflow-hidden rounded-sm pointer-events-auto" ref={imageRef}>
          {bgImage && (
            <Image
              ref={imgInnerRef}
              src={bgImage}
              alt="Premium Interior Design"
              fill
              priority
              unoptimized={bgImage.startsWith("http")}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>

      {/* Bottom Metadata */}
      <div ref={metaRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-end text-xs font-bold tracking-[0.15em] uppercase mt-8 lg:mt-6 z-10 relative gap-5 text-brand-text">
        <div>
          <span>4.9 Google Rating</span><br/>
          <span className="opacity-60">84 Reviews</span>
        </div>
        <div className="sm:text-center">
          <span>Coimbatore</span><br/>
          <span className="opacity-60">Mettupalayam • Pollachi</span>
        </div>
        <div className="text-left sm:text-right">
          <a href="#projects" className="group flex items-center gap-2 hover:text-brand-walnut transition-colors cursor-pointer pointer-events-auto">
            Explore Projects
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>
      </div>

    </section>
  );
}
