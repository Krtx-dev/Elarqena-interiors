"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Magnetic from "@/components/Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[var(--px-outer)] transition-all duration-500 text-brand-text",
        scrolled
          ? "bg-brand-bg/85 backdrop-blur-md py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
          : "bg-transparent py-6 md:py-8"
      )}
    >
      <div className="flex flex-col text-xs font-bold tracking-[0.2em] uppercase leading-tight">
        <span>Elarqena</span>
        <span>Interiors</span>
      </div>

      <div className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-widest uppercase">
        {["Projects", "Services", "About", "Reviews", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
            <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-text scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </a>
        ))}
      </div>

      <Magnetic>
        <a
          href="#contact"
          className={cn(
            "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border flex items-center gap-2 hover:scale-105",
            scrolled
              ? "border-brand-text bg-brand-text text-brand-bg hover:bg-transparent hover:text-brand-text"
              : "border-brand-text/20 bg-brand-text text-brand-bg hover:bg-transparent hover:text-brand-text hover:border-brand-text"
          )}
        >
          Start a Project
          <span className="text-[10px] hidden sm:inline-block">↗</span>
        </a>
      </Magnetic>
    </nav>
  );
}
