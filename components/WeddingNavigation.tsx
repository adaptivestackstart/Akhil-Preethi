"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

type WeddingNavigationProps = {
  visible: boolean;
};

export function WeddingNavigation({ visible }: WeddingNavigationProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!visible) return null;

  const navItems = [
    { id: "story", label: "Our Story" },
    { id: "wedding", label: "Wedding" },
    { id: "reception", label: "Reception" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <>
      <motion.nav
        aria-label="Wedding invitation"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: hidden && !open ? 0 : 1, y: hidden && !open ? -16 : 0 }}
        transition={{ duration: 0.55 }}
        className="fixed left-6 top-8 z-[60] hidden md:block"
      >
        <ul className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <li key={item.id} className="group relative">
              <button
                type="button"
                onClick={() => go(item.id)}
                className="font-script text-xl text-ink/70 hover:text-ink transition-colors interactive"
              >
                {item.label}
              </button>
              {/* Hand-drawn underline on hover */}
              <svg className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M5,5 Q50,8 95,4" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-olive" />
              </svg>
            </li>
          ))}
        </ul>
      </motion.nav>

    </>
  );
}
