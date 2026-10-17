"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Parallax({ children, speed = 1, className = "" }: { children: ReactNode, speed?: number, className?: string }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const y = window.innerHeight * speed * 0.1;

      gsap.fromTo(targetRef.current,
        { y: -y },
        {
          y: y,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={triggerRef} className={`overflow-hidden ${className}`}>
      <div ref={targetRef} className="h-[120%] w-full -top-[10%] relative">
        {children}
      </div>
    </div>
  );
}
