"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export function FamilySection() {
  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const lineDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 1.5, ease: "linear" } 
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative flex flex-col items-center px-5 py-24 md:px-12 md:py-32 w-full max-w-4xl mx-auto text-center">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center relative"
      >
        {/* Background Floral Asset */}
        <motion.div variants={fadeUp} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image 
            src="/flower_1.jpg" 
            alt="" 
            width={400} 
            height={400} 
            className="absolute top-[20%] left-[-20%] md:left-[-10%] w-[60%] md:w-[40%] opacity-[0.25] pointer-events-none mix-blend-multiply rotate-[-15deg]"
            style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          />
        </motion.div>
        {/* The connecting line from previous section */}
        <div className="w-24 h-[120px] mb-8">
          <svg className="w-full h-full text-ink overflow-visible" viewBox="0 0 100 120">
            <motion.path 
              d="M50,0 Q40,40 50,80 Q60,120 50,160" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              variants={lineDraw}
            />
          </svg>
        </div>

        <div className="mt-16 w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8">
          {/* Bride's Family */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col items-center">
            <h3 className="font-script text-5xl md:text-6xl text-ink mb-6 leading-none">
              Preethi Chandran
            </h3>
            <div className="space-y-4">
              <p className="font-serif text-lg text-ink/90 italic">
                Daughter of Chandran M & Priyamvadha P
              </p>
              <p className="font-sans text-sm tracking-widest uppercase text-ink/70">
                Puzhakkal House<br/>
                Kizhakkencherry<br/>
                Palakkad
              </p>
            </div>
          </motion.div>

          {/* Hand-drawn Divider */}
          <div className="flex-shrink-0 flex items-center justify-center rotate-0 md:rotate-90 md:w-32 my-8 md:my-0">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="text-olive overflow-visible">
              <motion.path 
                d="M10,20 Q30,10 60,20 Q90,30 110,20" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                variants={lineDraw}
              />
              <motion.path 
                d="M55,15 L65,25 M65,15 L55,25" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                variants={lineDraw}
              />
            </svg>
          </div>

          {/* Groom's Family */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col items-center">
            <h3 className="font-script text-5xl md:text-6xl text-ink mb-6 leading-none">
              Akhil Sekhar
            </h3>
            <div className="space-y-4">
              <p className="font-serif text-lg text-ink/90 italic">
                Son of Chandrashekharan PK and Omana NG
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
