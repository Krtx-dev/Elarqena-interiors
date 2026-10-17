"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function Gallery({ images }: { images: string[] }) {
  const [filter, setFilter] = useState("ALL");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const filters = ["ALL", "KITCHENS", "WARDROBES", "LIVING"];
  
  // Use images after the first 15 (which are used in Hero/Showcase/etc)
  const galleryImages = images.length > 15 ? images.slice(15) : images;

  // We will assign pseudo-random aspect ratios for masonry look
  const aspects = [
    "aspect-square", // 1:1
    "aspect-[4/5]", // 4:5
    "aspect-[16/10]", // 16:10
    "aspect-[3/4]", // 3:4
    "aspect-square", 
    "aspect-[4/3]" // 4:3
  ];

  return (
    <section className="py-[var(--section-py)] px-[var(--px-outer)] bg-brand-bg text-brand-text border-t border-brand-stone/40" id="gallery">
      <div className="max-w-[var(--max-w-content)] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-[length:var(--text-section)] font-serif mb-4">Project Gallery</h2>
            <p className="opacity-70 max-w-sm text-lg">A selection of our completed residential and commercial projects.</p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-8">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "text-xs font-bold tracking-[0.2em] uppercase pb-1 border-b-2 transition-colors",
                  filter === f ? "border-brand-text text-brand-text" : "border-transparent text-brand-text/50 hover:text-brand-text"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {galleryImages.map((img, i) => (
            <div 
              key={i} 
              className={cn("group relative w-full overflow-hidden rounded-sm cursor-pointer break-inside-avoid", aspects[i % aspects.length])}
              onClick={() => setLightboxImg(img)}
            >
              <Image
                src={img.startsWith('http') ? img : `/images/${img}`} 
                alt="Project Gallery"
                fill
                unoptimized={img.startsWith("http")}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="text-white text-xs font-bold tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Full Image ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-xl flex items-center justify-center p-4 transition-all duration-500",
          lightboxImg ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setLightboxImg(null)}
      >
        <button 
          className="absolute top-8 right-8 text-brand-text p-4 hover:opacity-50 transition-opacity"
          onClick={() => setLightboxImg(null)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        {lightboxImg && (
          <Image
            src={lightboxImg.startsWith('http') ? lightboxImg : `/images/${lightboxImg}`} 
            alt="Fullscreen View"
            width={1600}
            height={1100}
            unoptimized={lightboxImg.startsWith("http")}
            sizes="100vw"
            className="max-w-full max-h-full object-contain shadow-2xl rounded-sm scale-95 animate-in zoom-in duration-500 ease-out"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
          />
        )}
      </div>
    </section>
  );
}
