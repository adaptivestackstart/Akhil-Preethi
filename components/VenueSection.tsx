"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { wedding } from "@/lib/wedding";

export function VenueSection() {
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

  const markerPulse: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: [0.8, 1.2, 1],
      opacity: 1,
      transition: { duration: 0.5, delay: 1, ease: "easeOut" }
    }
  };

  const mapButtonDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 0.6, ease: "easeInOut" } 
    },
  };

  return (
    <section className="relative flex flex-col items-center px-5 py-24 md:px-12 md:py-32 w-full max-w-4xl mx-auto">
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
            src="/flower_3.jpg" 
            alt="" 
            width={400} 
            height={400} 
            className="absolute top-[50%] right-[-20%] md:right-[-10%] w-[60%] md:w-[40%] opacity-[0.25] pointer-events-none mix-blend-multiply rotate-[20deg]"
            style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          />
        </motion.div>
        {/* The connecting line from previous section */}
        <div className="w-24 h-[120px] mb-8">
          <svg className="w-full h-full text-ink overflow-visible" viewBox="0 0 100 120">
            <motion.path 
              d="M50,0 Q60,40 50,80 Q40,120 50,160" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              variants={lineDraw}
            />
          </svg>
        </div>

        <div className="relative overflow-hidden py-2 mb-16">
          <motion.h2 variants={textReveal} className="font-script text-5xl md:text-6xl text-ink">
            The Journey
          </motion.h2>
        </div>

        <div className="relative w-full max-w-2xl flex flex-col items-center pb-20">
          
          {/* Wedding Venue */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 w-full text-center md:text-left">
            <motion.div variants={markerPulse} className="flex flex-col items-center mt-2 relative">
              <svg width="60" height="60" viewBox="0 0 40 40" className="text-olive overflow-visible z-10 relative">
                <motion.path 
                  d="M20,5 Q35,5 35,20 Q35,30 20,38 Q5,30 5,20 Q5,5 20,5 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={lineDraw}
                />
                <motion.path 
                  d="M20,15 A5,5 0 1,0 20,25 A5,5 0 1,0 20,15 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={lineDraw}
                />
              </svg>
              {/* Subtle pulsing glow behind marker */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-olive/20 blur-md pointer-events-none"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            <motion.div variants={fadeUpGroup} className="flex-1 flex flex-col items-center md:items-start">
              <h3 className="font-serif text-2xl md:text-3xl text-ink mb-2">
                {wedding.ceremony.venue}
              </h3>
              <p className="font-serif text-lg text-ink/80 italic mb-1">
                {wedding.ceremony.place}
              </p>
              <p className="font-sans text-sm tracking-widest uppercase text-ink/70 mb-6">
                {wedding.ceremony.locality}
              </p>
              
              <a 
                href={wedding.ceremony.maps}
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
                  View Marriage Location
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

          {/* Hand drawn winding road connecting them */}
          <div className="relative w-full flex justify-center py-12 h-48 md:h-56">
            <svg viewBox="0 0 100 150" className="w-32 h-full text-ink opacity-40 overflow-visible">
              <motion.path 
                d="M50,0 Q90,40 50,75 Q10,110 50,150" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeDasharray="6 6"
                variants={lineDraw}
              />
            </svg>
          </div>

          {/* Reception Venue */}
          <div className="relative flex flex-col md:flex-row-reverse items-center md:items-start gap-4 md:gap-8 w-full text-center md:text-right">
            <motion.div variants={markerPulse} className="flex flex-col items-center mt-2 relative">
              <svg width="60" height="60" viewBox="0 0 40 40" className="text-olive overflow-visible z-10 relative">
                <motion.path 
                  d="M20,5 Q35,5 35,20 Q35,30 20,38 Q5,30 5,20 Q5,5 20,5 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={lineDraw}
                />
                <motion.path 
                  d="M20,15 A5,5 0 1,0 20,25 A5,5 0 1,0 20,15 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  variants={lineDraw}
                />
              </svg>
              {/* Subtle pulsing glow behind marker */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-olive/20 blur-md pointer-events-none"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </motion.div>
            
            <motion.div variants={fadeUpGroup} className="flex-1 flex flex-col items-center md:items-end">
              <h3 className="font-serif text-2xl md:text-3xl text-ink mb-2">
                {wedding.reception.venue}
              </h3>
              <p className="font-sans text-sm tracking-widest uppercase text-ink/70 mb-6">
                {wedding.reception.locality}
              </p>
              
              <a 
                href={wedding.reception.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center md:flex-row-reverse gap-3 px-6 py-3 group cursor-pointer"
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
          
        </div>
      </motion.div>
    </section>
  );
}
