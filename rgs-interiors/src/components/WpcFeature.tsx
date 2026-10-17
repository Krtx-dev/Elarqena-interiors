"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Parallax from "@/components/Parallax";

gsap.registerPlugin(ScrollTrigger);

export default function WpcFeature({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImage = images.length > 15 ? images[15] : (images.length > 0 ? images[0] : "");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.wpc-animate');
      
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
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
    <section ref={containerRef} className="py-[var(--section-py-tight)] px-[var(--px-outer)] bg-brand-bg text-brand-text">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden w-full aspect-square md:aspect-[21/9] rounded-sm mb-12">
          {bgImage && (
            <Parallax speed={0.3} className="w-full h-full">
              <Image
                src={bgImage.startsWith('http') ? bgImage : `/images/${bgImage}`}
                alt="WPC Modular Kitchen"
                fill
                unoptimized={bgImage.startsWith("http")}
                sizes="100vw"
                className="object-cover"
              />
            </Parallax>
          )}
          <div className="absolute inset-0 bg-black/10" />
          
          <div className="wpc-animate absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-white/95 backdrop-blur-md px-10 py-8 max-w-sm rounded-sm shadow-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-walnut mb-3 block">
              Feature Offer
            </span>
            <h3 className="text-2xl md:text-3xl font-serif mb-4">WPC Modular Kitchens</h3>
            <p className="text-sm opacity-80 leading-relaxed font-medium">
              100% Water-resistant and termite-resistant focused modular kitchen solutions designed for Indian cooking conditions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start mt-14">
          <div className="md:col-span-5 wpc-animate">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1]">
              Built for everyday life.
            </h2>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 pt-2">
            {[
              { title: "Water Resistant", desc: "Perfect for heavy daily usage and frequent cleaning." },
              { title: "Termite Resistant", desc: "Advanced long-lasting core materials." },
              { title: "Durable Build", desc: "Constructed to withstand intense wear and tear." },
              { title: "Custom Layouts", desc: "Tailored perfectly to your precise floor plan." }
            ].map((feature, i) => (
              <div key={i} className="wpc-animate border-l-2 border-brand-walnut/30 pl-8 py-2 hover:border-brand-walnut transition-colors">
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="opacity-70 text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
