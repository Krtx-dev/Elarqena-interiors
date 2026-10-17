"use client";

import { useState, useRef } from "react";
import gsap from "gsap";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      text: "Extreme attention to detail and high quality finish.",
      author: "Vinoth Kumar",
      type: "Google Review"
    },
    {
      text: "Very professional team. They delivered exactly what was promised on time.",
      author: "Praveen M",
      type: "Google Review"
    },
    {
      text: "The modular kitchen they built for us is both beautiful and highly functional.",
      author: "Sindhuja R",
      type: "Google Review"
    },
    {
      text: "Top-notch carpentry work. They understand the client's needs perfectly.",
      author: "Karthikeyan",
      type: "Google Review"
    }
  ];

  const nextReview = () => {
    // Crossfade out
    const tl = gsap.timeline();
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIndex((prev) => (prev + 1) % reviews.length);
        // Crossfade in
        gsap.fromTo([quoteRef.current, authorRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        );
      }
    });
  };

  const prevReview = () => {
    const tl = gsap.timeline();
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        gsap.fromTo([quoteRef.current, authorRef.current],
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        );
      }
    });
  };

  return (
    <section className="py-[var(--section-py)] px-[var(--px-outer)] bg-brand-bg text-brand-text border-t border-brand-text/10" id="reviews">
      <div className="max-w-[var(--max-w-content)] mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-start">
        
        {/* Left: Score */}
        <div className="w-full md:w-1/3 flex flex-col">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl md:text-7xl font-serif text-brand-walnut">4.9</span>
            <span className="text-3xl font-serif text-brand-stone">/ 5</span>
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase mt-4">Google Rating</span>
          <span className="text-sm opacity-60 font-medium tracking-wide mt-1">84 Verified Reviews</span>
          
          <div className="flex items-center gap-4 mt-12">
            <button onClick={prevReview} className="w-12 h-12 rounded-full border border-brand-text/20 flex items-center justify-center hover:bg-brand-text hover:text-brand-bg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={nextReview} className="w-12 h-12 rounded-full border border-brand-text/20 flex items-center justify-center hover:bg-brand-text hover:text-brand-bg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Right: Big Quote */}
        <div className="w-full md:w-2/3 md:pl-12 lg:pl-24">
          <div className="min-h-[250px] flex flex-col justify-center relative">
            <span className="absolute -top-8 -left-8 text-8xl font-serif text-brand-stone/30 leading-none">&ldquo;</span>
            
            <h3 ref={quoteRef} className="text-3xl md:text-5xl lg:text-[4rem] font-serif leading-[1.1] text-brand-text mb-12 relative z-10">
              {reviews[index].text}
            </h3>
            
            <div ref={authorRef} className="flex flex-col relative z-10">
              <span className="text-lg font-bold tracking-wide uppercase">{reviews[index].author}</span>
              <span className="text-sm opacity-60 font-medium tracking-widest uppercase">{reviews[index].type}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
