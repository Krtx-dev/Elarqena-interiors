"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import Parallax from "@/components/Parallax";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.work-item');
      
      items.forEach((item) => {
        const image = item.querySelector('.work-image-container');
        const content = item.querySelector('.work-content');
        
        gsap.set(image, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(content, { opacity: 0, y: 30 });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });
        
        tl.to(image, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.out"
        })
        .to(content, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=1");
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: "01",
      title: "MODULAR KITCHEN",
      desc: "Coimbatore",
      img: images.length > 1 ? images[1] : "",
      imgClass: "w-full md:w-[78%] aspect-[4/3] mb-5",
      containerClass: "col-span-12 md:col-span-10 flex flex-col items-start",
      align: "start"
    },
    {
      id: "02",
      title: "WARDROBE SYSTEM",
      desc: "Mettupalayam",
      img: images.length > 2 ? images[2] : "",
      imgClass: "w-full md:w-[66%] aspect-[3/4] mt-4 md:ml-auto",
      containerClass: "col-span-12 md:col-span-10 md:col-start-3 flex flex-col",
      align: "start md:items-start"
    },
    {
      id: "03",
      title: "LIVING SPACE",
      desc: "Pollachi",
      img: images.length > 3 ? images[3] : "",
      imgClass: "w-full md:w-[92%] aspect-[16/9] mb-5 mx-auto",
      containerClass: "col-span-12 flex flex-col items-center text-center",
      align: "center"
    }
  ];

  return (
    <section ref={containerRef} className="py-[var(--section-py)] px-[var(--px-outer)] bg-brand-bg" id="projects">
      <div className="max-w-[var(--max-w-content)] mx-auto">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-brand-text/10 pb-8 gap-6">
          <h2 className="text-[length:var(--text-section)] font-serif text-brand-text leading-none tracking-tight">
            Selected Work
          </h2>
          <a href="#gallery" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-brand-walnut transition-colors">
            View Gallery
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </div>

        <div className="grid grid-cols-12 gap-y-20 lg:gap-y-24">
          {projects.map((proj) => (
            <div key={proj.id} className={cn("work-item group cursor-pointer", proj.containerClass)}>
              
              {/* Conditional rendering for layout variety */}
              {proj.id === "02" && (
                <div className="work-content mb-5 flex flex-col items-start md:ml-0 md:mr-auto pl-0 md:pl-[10%] w-full">
                   <span className="text-brand-stone font-serif text-4xl mb-3 inline-block">{proj.id}</span>
                   <h3 className="text-2xl md:text-4xl font-serif tracking-wide mb-2 text-brand-text group-hover:translate-x-3 transition-transform duration-500">{proj.title}</h3>
                   <p className="text-brand-text/60 text-sm tracking-widest uppercase font-bold">{proj.desc}</p>
                </div>
              )}

              <div className={cn("work-image-container relative overflow-hidden rounded-sm", proj.imgClass)}>
                <Parallax speed={0.5} className="w-full h-full bg-brand-stone/20">
                  {proj.img && (
                    <Image
                      src={proj.img.startsWith('http') ? proj.img : `/images/${proj.img}`}
                      alt={proj.title}
                      fill
                      unoptimized={proj.img.startsWith("http")}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                    />
                  )}
                </Parallax>
                
                {/* Custom Hover Cursor area for desktop */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 hidden lg:flex items-center justify-center pointer-events-none transition-opacity duration-500">
                   <div className="w-24 h-24 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-center leading-none text-brand-text text-[10px] font-bold tracking-widest uppercase scale-75 group-hover:scale-100 transition-transform duration-[0.5s] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                     View<br/>Project
                   </div>
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
              </div>
              
              {proj.id !== "02" && (
                <div className={cn("work-content mt-5 flex flex-col w-full", proj.id === "03" ? "items-center" : "items-start")}>
                  <span className="text-brand-stone font-serif text-4xl mb-3 inline-block">{proj.id}</span>
                  <h3 className={cn("text-2xl md:text-4xl font-serif tracking-wide mb-2 text-brand-text transition-transform duration-500", proj.id === "03" ? "" : "group-hover:translate-x-3")}>{proj.title}</h3>
                  <p className="text-brand-text/60 text-sm tracking-widest uppercase font-bold">{proj.desc}</p>
                </div>
              )}
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
