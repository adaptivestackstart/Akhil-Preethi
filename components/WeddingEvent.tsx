"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { wedding } from "@/lib/wedding";

export function WeddingEvent() {
  const { ceremony } = wedding;

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.2 },
    },
  };

  const lineDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 1.5, ease: "linear" } 
    },
  };

  const fadeUpGroup: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  const mapButtonDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 1.2, ease: "easeInOut" } 
    },
  };

  return (
    <section
      id="wedding"
      className="relative flex flex-col items-center px-5 py-24 md:px-12 md:py-32 w-full max-w-4xl mx-auto"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center relative"
      >
        {/* Background Floral Asset */}
        <motion.div variants={fadeUpGroup} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image 
            src="/flower_3.jpg" 
            alt="" 
            width={400} 
            height={400} 
            className="absolute top-[30%] left-[-20%] md:left-[-10%] w-[60%] md:w-[40%] opacity-[0.25] pointer-events-none mix-blend-multiply rotate-[-15deg]"
            style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          />
        </motion.div>
        {/* The connecting line from previous section */}
        <div className="w-24 h-[120px] mb-8">
          <svg className="w-full h-full text-ink overflow-visible" viewBox="0 0 100 120">
            <motion.path 
              d="M50,0 Q30,60 50,120" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              variants={lineDraw}
            />
          </svg>
        </div>

        <div className="relative w-full flex flex-col items-center max-w-lg mx-auto">
          
          <div className="flex flex-col items-center text-center z-10">
            
            {/* The Date Circle */}
            <div className="relative flex items-center justify-center w-32 h-32 mb-2">
              <motion.h3 
                className="font-serif text-6xl text-ink z-10"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5 } } // Number is there instantly or fades in quick before circle draws
                }}
              >
                15
              </motion.h3>
              <svg className="absolute inset-0 w-full h-full pointer-events-none text-olive overflow-visible" viewBox="0 0 100 100" fill="none">
                <motion.path 
                  d="M50,10 C75,10 90,30 90,50 C90,75 70,90 50,90 C25,90 10,70 10,50 C10,25 30,10 50,10 Z" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={lineDraw}
                />
              </svg>
            </div>
            
            <motion.h3 variants={fadeUpGroup} className="font-serif text-3xl md:text-5xl text-ink tracking-widest mt-2">
              NOVEMBER
            </motion.h3>
            
            <motion.p variants={fadeUpGroup} className="font-script text-3xl md:text-4xl text-gold mt-4 -rotate-2">
              Wedding Day
            </motion.p>
          </div>

          {/* Line continues down to Muhurtham */}
          <div className="w-12 h-20 my-8">
             <svg className="w-full h-full text-ink overflow-visible" viewBox="0 0 50 80">
              <motion.path 
                d="M25,0 Q10,40 25,80" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                variants={lineDraw}
              />
            </svg>
          </div>

          <motion.div variants={fadeUpGroup} className="flex flex-col items-center text-center px-6 py-10 relative group interactive w-full">
            {/* Paper Note Background for Muhurtham/Venue */}
            <div className="absolute inset-0 bg-paper-dark/30 sketch-border -rotate-1 pointer-events-none" />
            <div className="absolute inset-0 sketch-border-2 opacity-50 rotate-1 pointer-events-none" />
            
            <p className="font-sans text-xs uppercase tracking-[0.3em] font-medium text-ink/70 relative z-10">
              {ceremony.muhurtham}
            </p>
            <div className="w-12 h-px bg-ink/30 sketch-border my-4 relative z-10" />
            <p className="font-serif text-2xl text-ink relative z-10">
              {ceremony.time}
            </p>

            <div className="mt-8 flex flex-col items-center relative z-10">
              <h4 className="font-serif text-3xl text-ink mb-2">
                {ceremony.venue}
              </h4>
              <p className="font-serif text-xl text-ink/80 italic">
                {ceremony.place}
              </p>
              <p className="font-sans text-sm uppercase tracking-widest text-ink/70 mt-2">
                {ceremony.locality}
              </p>
            </div>
          </motion.div>

          {/* Google Map Button */}
          <motion.div variants={fadeUpGroup} className="mt-12">
            <a 
              href="https://share.google/43rLRQ94WRMphi1gq" 
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
      </motion.div>
    </section>
  );
}
