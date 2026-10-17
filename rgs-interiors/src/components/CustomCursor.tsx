"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!mounted) return;

    // Only show custom cursor on desktop
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const xSetDot = gsap.quickSetter(dot, "x", "px");
    const ySetDot = gsap.quickSetter(dot, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xSetDot(mouse.x);
      ySetDot(mouse.y);
    };

    window.addEventListener("mousemove", onMouseMove);

    const updateCursor = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    };

    gsap.ticker.add(updateCursor);

    // Hover effects on links and buttons
    const links = document.querySelectorAll("a, button, .cursor-pointer");
    
    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(0,0,0,0.1)", backdropFilter: "blur(4px)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };
    
    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "transparent", backdropFilter: "none", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    links.forEach(link => {
      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", onMouseEnter);
        link.removeEventListener("mouseleave", onMouseLeave);
      });
      gsap.ticker.remove(updateCursor);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-brand-text/30 rounded-full pointer-events-none z-[100] hidden lg:block mix-blend-difference" 
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-text rounded-full pointer-events-none z-[100] hidden lg:block mix-blend-difference" 
      />
    </>
  );
}
