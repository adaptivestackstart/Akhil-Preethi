"use client";

import { wedding } from "@/lib/wedding";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export function ReceptionEvent() {
  const { reception } = wedding;

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const lineDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 0.5, ease: "linear" } 
    },
  };

  const illDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 0.6, ease: "easeInOut" } 
    },
  };

  const textReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: { 
      clipPath: "inset(0 0% 0 0)", opacity: 1, 
      transition: { duration: 1, ease: "linear" } 
    },
  };

  const fadeUpGroup: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const mapButtonDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 0.6, ease: "easeInOut" } 
    },
  };

  return (
    <section
      id="reception"
      className="relative flex flex-col items-center px-5 py-24 md:px-12 md:py-32 w-full max-w-4xl mx-auto text-center"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full flex flex-col items-center relative"
      >
        {/* Background Floral Asset */}
        <motion.div variants={fadeUpGroup} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image 
            src="/flowers_2.jpg" 
            alt="" 
            width={400} 
            height={400} 
            className="absolute top-[20%] right-[-20%] md:right-[-10%] w-[60%] md:w-[40%] opacity-[0.25] pointer-events-none mix-blend-multiply rotate-[15deg]"
            style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          />
        </motion.div>
        {/* The connecting line from previous section */}
        <div className="w-24 h-[120px] mb-8">
          <svg className="w-full h-full text-ink overflow-visible" viewBox="0 0 100 120">
            <motion.path 
              d="M50,0 Q70,40 40,80 Q30,120 50,160" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              variants={lineDraw}
            />
          </svg>
        </div>

        <div className="mt-4 w-full max-w-2xl mx-auto flex flex-col items-center">
          
          {/* Hand drawn celebration illustration (a simple wine glass / clinking glasses) */}
          <div className="relative w-24 h-24 mb-6 group interactive">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-ink opacity-80 group-hover:opacity-100 transition-opacity overflow-visible">
              {/* Glass 1 */}
              <motion.path 
                d="M30,30 L45,60 L45,80 M35,80 L55,80 M30,30 Q45,25 60,30" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                variants={illDraw}
              />
              {/* Glass 2 */}
              <motion.path 
                d="M70,35 L55,65 L55,85 M45,85 L65,85 M70,35 Q55,30 40,35" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="opacity-70"
                variants={illDraw}
              />
              {/* Sparkles */}
              <motion.path d="M50,15 L50,25 M45,20 L55,20" stroke="var(--color-olive)" strokeWidth="1.5" strokeLinecap="round" variants={illDraw} />
              <motion.path d="M25,45 L30,50 M20,50 L25,55" stroke="var(--color-olive)" strokeWidth="1.5" strokeLinecap="round" variants={illDraw} />
              <motion.path d="M75,25 L80,30 M80,25 L75,30" stroke="var(--color-olive)" strokeWidth="1.5" strokeLinecap="round" variants={illDraw} />
            </svg>
          </div>

          <div className="relative overflow-hidden py-2 mb-6">
            <motion.h3 variants={textReveal} className="font-script text-5xl md:text-6xl text-ink">
              {reception.title}
            </motion.h3>
          </div>

          <motion.div variants={fadeUpGroup} className="space-y-4">
            <p className="font-serif text-2xl text-ink">
              {reception.time}
            </p>
            <div className="flex justify-center my-4">
              <div className="w-16 h-px bg-ink/30 sketch-border" />
            </div>
            <div>
              <p className="font-serif text-xl text-ink">
                {reception.venue}
              </p>
              <p className="font-sans text-sm tracking-widest uppercase text-ink/70 mt-2">
                {reception.locality}
              </p>
            </div>
          </motion.div>

          {/* Google Map Button */}
          <motion.div variants={fadeUpGroup} className="mt-12">
            <a 
              href="https://share.google/btC01sg3z642sqvXK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-6 py-3 group cursor-pointer"
            >
              <svg className="w-5 h-5 text-ink pointer-events-none" viewBox="0 0 24 24" fill="none">
                <motion.path 
                  d="M12 2C8 2 5 5.5 5 10C5 15.5 12 22 12 22C12 22 19 15.5 19 10C19 5.5 16 2 12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={mapButtonDraw}
                />
                <motion.circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" variants={mapButtonDraw} />
              </svg>
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-ink">
                View Reception Location
              </span>
              
              {/* Animated underline */}
              <svg className="absolute bottom-1 left-0 w-full h-2 text-ink/40 pointer-events-none overflow-visible" viewBox="0 0 200 10" preserveAspectRatio="none">
                <motion.path 
                  d="M0,5 Q100,0 200,5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeLinecap="round" 
                  variants={mapButtonDraw}
                />
                {/* Hover line */}
                <path 
                  d="M0,8 Q100,3 200,8" 
                  stroke="var(--color-olive)" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeLinecap="round" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
