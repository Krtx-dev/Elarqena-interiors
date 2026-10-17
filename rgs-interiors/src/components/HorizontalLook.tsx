"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function HorizontalLook({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // We need 6 images for this strip. Use from the gallery pool.
  const gallery = images.slice(15, 25);
  
  const items = [
    { img: gallery.length > 0 ? gallery[0] : "", aspect: "aspect-[3/4]", label: "Kitchen Details" },
    { img: gallery.length > 1 ? gallery[1] : "", aspect: "aspect-video", label: "Living Layout" },
    { img: gallery.length > 2 ? gallery[2] : "", aspect: "aspect-square", label: "Storage" },
    { img: gallery.length > 3 ? gallery[3] : "", aspect: "aspect-[9/16]", label: "Wardrobe Finish" },
    { img: gallery.length > 4 ? gallery[4] : "", aspect: "aspect-[4/3]", label: "Material Texture" },
    { img: gallery.length > 5 ? gallery[5] : "", aspect: "aspect-square", label: "Lighting" },
  ];

  return (
    <section ref={containerRef} className="py-[var(--section-py-tight)] bg-brand-bg overflow-hidden relative">
      <div className="px-[var(--px-outer)] mb-10">
        <h2 className="text-[length:var(--text-section)] font-serif text-brand-text leading-none">
          A closer look.
        </h2>
      </div>

      <div 
        className="w-full flex items-center overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-[var(--px-outer)] pr-[var(--px-outer)]"
      >
        <div ref={trackRef} className="flex items-start gap-6 md:gap-8 lg:gap-10 w-max">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-4 snap-center shrink-0 w-[74vw] sm:w-[46vw] md:w-[34vw] lg:w-[26vw] xl:w-[22vw] max-w-[420px]">
              <div className={cn("relative overflow-hidden rounded-sm bg-brand-stone/20 w-full", item.aspect)}>
                {item.img && (
                  <Image
                    src={item.img.startsWith('http') ? item.img : `/images/${item.img}`} 
                    alt={item.label}
                    fill
                    unoptimized={item.img.startsWith("http")}
                    sizes="(max-width: 640px) 74vw, (max-width: 1024px) 34vw, 26vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-500" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-text/60">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
