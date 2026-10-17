"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Materials() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Need some detail images. Using unsplash images for materials
  const mat1 = "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=800"; // Close up cabinet
  const mat2 = "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&q=80&w=800"; // Wood texture
  const mat3 = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"; // Hinge/metal detail

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      // Parallax collage
      gsap.to('.mat-img-1', {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.to('.mat-img-2', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.to('.mat-img-3', {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });
      
      const copy = document.querySelector('.mat-copy');
      gsap.to(copy, {
        y: 40,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-[var(--section-py-lg)] px-[var(--px-outer)] bg-brand-walnut text-brand-bg relative overflow-hidden" id="about">
      <div className="max-w-[var(--max-w-content)] mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Collage */}
          <div className="w-full lg:w-1/2 relative min-h-[430px] md:min-h-[560px] lg:min-h-[620px] flex items-center justify-center">
            
            <div className="mat-img-1 absolute left-0 top-[10%] w-[55%] aspect-[3/4] z-10 overflow-hidden shadow-2xl rounded-sm">
              <Image src={mat1} alt="Material Detail" fill unoptimized sizes="(max-width: 1024px) 55vw, 28vw" className="object-cover scale-105" />
            </div>
            
            <div className="mat-img-2 absolute right-0 bottom-[10%] w-[45%] aspect-square z-20 overflow-hidden shadow-2xl rounded-sm">
              <Image src={mat2} alt="Wood Texture" fill unoptimized sizes="(max-width: 1024px) 45vw, 23vw" className="object-cover" />
            </div>

            <div className="mat-img-3 absolute left-[20%] bottom-[5%] w-[35%] aspect-[4/3] z-30 overflow-hidden shadow-xl border-4 border-brand-walnut rounded-sm">
              <Image src={mat3} alt="Hardware Detail" fill unoptimized sizes="(max-width: 1024px) 35vw, 18vw" className="object-cover" />
            </div>

          </div>

          {/* Right: Copy */}
          <div className="w-full lg:w-1/2 flex flex-col mat-copy mt-4 lg:mt-0 lg:pl-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60 mb-6 block">Craftsmanship</span>
            <h2 className="text-[length:var(--text-section)] font-serif leading-[1.05] mb-8">
              Details make<br/>the difference.
            </h2>
            <div className="flex flex-col gap-6 text-lg md:text-xl opacity-90 max-w-lg leading-relaxed font-light">
              <p>
                From the precise selection of marine-grade core materials to the seamless alignment of soft-close hinges, true quality is found in the things you interact with every single day.
              </p>
              <p>
                We source premium laminates, durable edge-banding, and robust hardware to ensure that what looks beautiful today continues to perform flawlessly for years to come.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
