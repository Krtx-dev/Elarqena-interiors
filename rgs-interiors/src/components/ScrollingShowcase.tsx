"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingShowcase({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  
  const slides = useMemo(() => [
    {
      title: "MODULAR KITCHENS",
      desc: "Custom kitchens designed around daily use, storage and durability.",
      category: "RESIDENTIAL",
      location: "COIMBATORE",
      img: images.length > 4 ? images[4] : "",
    },
    {
      title: "CUSTOM WARDROBES",
      desc: "Precision fitted storage systems to maximize your space.",
      category: "INTERIORS",
      location: "METTUPALAYAM",
      img: images.length > 5 ? images[5] : "",
    },
    {
      title: "LIVING SPACES",
      desc: "Warm materials and seamless layouts for modern living.",
      category: "RENOVATION",
      location: "POLLACHI",
      img: images.length > 6 ? images[6] : "",
    },
    {
      title: "COMMERCIAL",
      desc: "Refined office and retail spaces built to perform.",
      category: "COMMERCIAL",
      location: "COIMBATORE",
      img: images.length > 7 ? images[7] : "",
    }
  ], [images]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      slides.forEach((_, i) => {
        if (i === 0) return;
        gsap.set(`.slide-text-${i}`, { opacity: 0, y: 30 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * (slides.length - 1) * 0.72)}`,
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animate from slide 1 to slide N
      slides.forEach((_, i) => {
        if (i === 0) return; // slide 0 is already visible

        // The timeline controls the crossfade / wipe
        // Previous slide texts out
        tl.to(`.slide-text-${i - 1}`, { y: -30, opacity: 0, duration: 0.5, stagger: 0.05 }, `step${i}`)
          // Next slide texts in
          .fromTo(`.slide-text-${i}`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, `step${i}+=0.2`)
          
          // Previous image exits upward via clip-path
          .to(`.slide-img-${i - 1}`, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power2.inOut" }, `step${i}`)
          // Next image reveals from bottom
          .fromTo(`.slide-img-${i}`, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1, ease: "power2.inOut" }, `step${i}`)
          
          // Progress rail update
          .to(`.rail-dot-${i - 1}`, { opacity: 0.3, duration: 0.2 }, `step${i}`)
          .to(`.rail-dot-${i}`, { opacity: 1, duration: 0.2 }, `step${i}`);
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      document.fonts?.ready.then(refresh);

      return () => window.removeEventListener("load", refresh);
    }, containerRef);
    return () => ctx.revert();
  }, [slides]);

  return (
    <section ref={containerRef} className="relative bg-brand-bg" id="services-showcase">
      <div ref={pinRef} className="hidden lg:flex h-[82vh] min-h-[680px] max-h-[860px] w-full overflow-hidden max-w-[var(--max-w-content)] mx-auto">
        
        {/* LEFT: 38% Content */}
        <div className="w-[38%] h-full flex flex-col justify-center px-[var(--px-outer)] relative">
          
          {/* Rail */}
          <div className="absolute left-[var(--px-outer)] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            {slides.map((_, i) => (
              <div key={`rail-${i}`} className="flex items-center gap-4">
                <span className={cn(`rail-dot-${i} text-xs font-serif transition-colors duration-300`, i === 0 ? "opacity-100" : "opacity-30")}>
                  0{i + 1}
                </span>
                {i < slides.length - 1 && <div className="h-6 w-[1px] bg-brand-text/20 ml-2" />}
              </div>
            ))}
          </div>

          <div className="pl-16 xl:pl-24 relative w-full h-full">
            {slides.map((slide, i) => (
              <div key={i} className="absolute inset-0 flex flex-col justify-center w-full pr-8 pointer-events-none">
                
                <div className="flex flex-col gap-6">
                  <div className={`slide-text-${i}`}>
                    <span className="text-brand-stone font-serif text-2xl mb-4 block">0{i + 1} / 0{slides.length}</span>
                    <h3 className="text-4xl xl:text-5xl font-serif leading-[1.1] text-brand-text">{slide.title}</h3>
                  </div>
                  
                  <div className={`slide-text-${i}`}>
                    <p className="text-lg opacity-80 leading-relaxed max-w-sm">{slide.desc}</p>
                  </div>
                  
                  <div className={`slide-text-${i} flex flex-col gap-1 text-[10px] font-bold tracking-[0.2em] uppercase text-brand-text/60 mt-2`}>
                    <span>{slide.category}</span>
                    <span>{slide.location}</span>
                  </div>

                  <div className={`slide-text-${i} mt-4`}>
                    <a href="#gallery" className="group inline-flex pointer-events-auto items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-brand-walnut transition-colors">
                      Explore Project
                      <span className="group-hover:translate-x-1 transition-transform group-hover:-translate-y-1">↗</span>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: 62% Imagery */}
        <div className="w-[62%] h-full relative p-5 pl-0">
          <div className="w-full h-full relative overflow-hidden rounded-sm">
            {slides.map((slide, i) => (
              <div 
                key={i} 
                className={cn(
                  `slide-img-${i} absolute inset-0 w-full h-full`,
                  i === 0 ? "z-10" : "z-20"
                )}
                style={i !== 0 ? { clipPath: "inset(100% 0% 0% 0%)" } : {}}
              >
                {slide.img && (
                  <Image
                    src={slide.img.startsWith('http') ? slide.img : `/images/${slide.img}`}
                    alt={slide.title}
                    fill
                    unoptimized={slide.img.startsWith("http")}
                    sizes="62vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Mobile Fallback - stack naturally */}
      <div className="lg:hidden flex flex-col gap-12 py-[var(--section-py-tight)] px-[var(--px-outer)]">
        {slides.map((slide, i) => (
          <div key={`mob-${i}`} className="flex flex-col gap-5">
            <div className="aspect-[4/3] max-h-[360px] w-full relative overflow-hidden rounded-sm">
              {slide.img && (
                <Image
                  src={slide.img.startsWith('http') ? slide.img : `/images/${slide.img}`}
                  alt={slide.title}
                  fill
                  unoptimized={slide.img.startsWith("http")}
                  sizes="100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <span className="text-brand-stone font-serif text-2xl mb-4 block">0{i + 1} / 0{slides.length}</span>
              <h3 className="text-3xl font-serif mb-4 leading-tight">{slide.title}</h3>
              <p className="text-base opacity-80 mb-6">{slide.desc}</p>
              <a href="#gallery" className="text-xs font-bold uppercase tracking-widest border-b border-brand-text/30 pb-1">Explore Project ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
