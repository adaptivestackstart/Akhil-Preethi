"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse coordinates
    const mouse = { x: 0, y: 0 };
    // Ring coordinates for smooth follow
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Check if hovering an interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, .interactive, input, textarea");

      if (isInteractive) {
        gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.out" });
        gsap.to(ring, { 
          scale: 1.5, 
          opacity: 0.5,
          borderWidth: "1px",
          borderColor: "#d4af37", // gold
          duration: 0.4, 
          ease: "power3.out" 
        });
      } else {
        gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
        gsap.to(ring, { 
          scale: 1, 
          opacity: 0.3,
          borderWidth: "1px",
          borderColor: "#1a1c1a", // ink
          duration: 0.4, 
          ease: "power3.out" 
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // GSAP Ticker for smooth ring follow
    const updateRing = () => {
      // Dot follows instantly
      gsap.set(dot, { x: mouse.x, y: mouse.y });

      // Ring follows with easing (lerp)
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };
    
    gsap.ticker.add(updateRing);

    // Magnetic buttons setup
    const updateMagnets = () => {
      const buttons = document.querySelectorAll("a, button, .interactive");
      buttons.forEach((btn) => {
        if (btn.hasAttribute("data-magnetic")) return;
        btn.setAttribute("data-magnetic", "true");

        const b = btn as HTMLElement;
        b.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = b.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(b, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        
        b.addEventListener("mouseleave", () => {
          gsap.to(b, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });
    };

    // Run initially and set an interval to catch dynamically added buttons
    updateMagnets();
    const magnetInterval = setInterval(updateMagnets, 1000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(updateRing);
      clearInterval(magnetInterval);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference" 
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-ink/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference" 
      />
    </>
  );
}
