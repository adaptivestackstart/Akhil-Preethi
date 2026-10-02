"use client";

import Image from "next/image";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { useRef } from "react";
import { WeddingCountdown } from "@/components/WeddingCountdown";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Subtle cinematic parallax for the image
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scalePhoto = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.5,
      },
    },
  };

  const textReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: { 
      clipPath: "inset(0 0% 0 0)", 
      opacity: 1,
      transition: { duration: 1.2, ease: "linear" } 
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  const photoContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
      },
    },
  };

  const borderDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" } 
    },
  };

  const photoReveal: Variants = {
    hidden: { clipPath: "inset(10% 10% 10% 10%)", filter: "blur(4px)", opacity: 0, rotate: 0 },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)", 
      filter: "blur(0px)", 
      opacity: 1, 
      rotate: -1,
      transition: { duration: 1.2, ease: "easeOut" } 
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center pt-20 pb-16 paper-grain overflow-hidden"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center text-center z-10 w-full max-w-4xl px-4"
      >
        {/* Background Floral Assets */}
        <motion.div variants={fadeUp} className="absolute inset-0 pointer-events-none z-[-1]">
          <Image 
            src="/flower_1.jpg" 
            alt="" 
            width={500} 
            height={500} 
            className="absolute top-[-5%] left-[-15%] md:left-[-5%] w-[60%] md:w-[45%] opacity-30 pointer-events-none mix-blend-multiply rotate-[-15deg]"
            style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
            priority
          />
          <Image 
            src="/flowers_2.jpg" 
            alt="" 
            width={500} 
            height={500} 
            className="absolute bottom-[-5%] right-[-15%] md:right-[-5%] w-[60%] md:w-[45%] opacity-30 pointer-events-none mix-blend-multiply rotate-[10deg]"
            style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
            priority
          />
        </motion.div>

        <motion.p 
          variants={textReveal}
          className="font-script text-3xl md:text-4xl text-olive mb-6 rotate-[-2deg]"
        >
          With love, we invite you...
        </motion.p>

        <motion.h1 variants={fadeUp} className="font-script text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-ink leading-none mb-2 gold-foil-text" data-text="Akhil">
          Akhil
        </motion.h1>
        <motion.p variants={fadeUp} className="font-script text-4xl sm:text-5xl md:text-6xl text-gold my-2 md:my-0">
          &
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-script text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-ink leading-none mt-2 mb-12 gold-foil-text" data-text="Preethi">
          Preethi
        </motion.h1>

        <motion.div 
          variants={photoContainer}
          className="relative w-full max-w-md mx-auto group interactive mt-4"
        >
          {/* Hand-drawn frame effect behind */}
          <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none text-ink opacity-40 z-0 overflow-visible">
            <motion.rect
              x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={borderDraw}
            />
            <motion.rect
              x="2" y="8" width="calc(100% - 4px)" height="calc(100% - 16px)"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              variants={borderDraw}
            />
          </svg>
          
          {/* Photo on paper */}
          <motion.div 
            variants={photoReveal}
            style={{ y: yPhoto, scale: scalePhoto }}
            className="relative aspect-[4/5] photo-paper transition-transform duration-500 ease-out z-10 shadow-md"
          >
            <Image
              src={wedding.images.together1.src}
              alt="Akhil and Preethi"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-[50%_25%] grayscale-[20%] sepia-[10%] contrast-[1.05]"
            />
            {/* Hand-drawn tape corner top-left */}
            <div className="absolute -top-3 -left-4 w-12 h-4 bg-paper/60 backdrop-blur-sm -rotate-[15deg] shadow-sm z-20" />
            <div className="absolute -top-3 -right-4 w-10 h-3 bg-paper/60 backdrop-blur-sm rotate-[20deg] shadow-sm z-20" />
          </motion.div>

          {/* Simple leaf illustration top right */}
          <svg className="absolute -top-12 -right-12 w-20 h-20 opacity-60 pointer-events-none text-ink z-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M10,90 Q40,60 80,20 Q60,40 40,80 Q30,90 10,90 M45,65 Q60,50 85,45 Q70,60 45,65 M65,45 Q75,30 90,25 Q80,45 65,45" 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              variants={borderDraw}
            />
          </svg>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20 flex flex-col items-center gap-3">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-ink/80 font-medium">
            Wedding Invitation
          </p>
          <div className="w-8 h-[1px] bg-ink/40 sketch-border" />
          <p className="font-serif text-xl md:text-2xl text-ink gold-foil-text" data-text="15 November">
            15 November
          </p>
          <WeddingCountdown />
        </motion.div>

        {/* Continuous line out of Hero */}
        <div className="mt-12 h-24 w-px bg-transparent">
          <svg className="w-full h-full text-ink opacity-30 overflow-visible" viewBox="0 0 2 100">
             <motion.path 
                d="M1,0 Q3,50 1,100" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                fill="none"
                variants={borderDraw}
              />
          </svg>
        </div>

      </motion.div>
    </section>
  );
}
