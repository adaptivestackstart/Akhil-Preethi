"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HanddrawnLine } from "@/components/HanddrawnLine";

export function CoupleSection() {
  return (
    <section id="beginning" className="relative flex flex-col items-center px-5 py-32 w-full mx-auto overflow-hidden">
      {/* Background Floral Asset */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src="/flower_3.jpg" 
          alt="" 
          width={400} 
          height={400} 
          className="absolute top-[20%] right-[-20%] md:right-[-5%] w-[60%] md:w-[35%] opacity-20 pointer-events-none mix-blend-multiply rotate-[15deg]"
          style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          priority
        />
      </motion.div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <HanddrawnLine path="M50,0 Q60,40 40,80 Q30,120 50,160" height={160} />
      </div>

      <div className="mt-20 flex flex-col items-center text-center z-10">
        <motion.h2 
          className="font-sans text-xs tracking-[0.4em] uppercase text-ink/70 font-medium mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1 }}
        >
          The Beginning
        </motion.h2>

        <div className="flex flex-col items-center w-full max-w-lg">
          {/* AKHIL */}
          <div className="relative overflow-hidden py-2 px-4">
            <motion.h1
              className="font-script text-7xl md:text-8xl text-ink"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, ease: "linear" }}
            >
              Akhil
            </motion.h1>
          </div>

          {/* + */}
          <motion.p 
            className="font-script text-4xl text-olive my-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
          >
            +
          </motion.p>

          {/* PREETHI */}
          <div className="relative overflow-hidden py-2 px-4">
             <motion.h1
              className="font-script text-7xl md:text-8xl text-ink"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.8, ease: "linear", delay: 2.2 }}
            >
              Preethi
            </motion.h1>
          </div>

          {/* Connecting Heart */}
          <div className="mt-8 relative w-full flex justify-center">
             <svg viewBox="0 0 100 150" className="w-24 h-[150px] text-gold overflow-visible">
              <motion.path 
                d="M50,20 C10,-20 -20,40 50,80 C120,40 90,-20 50,20 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 4.2 }}
              />
              {/* Line continuing downwards */}
              <motion.path 
                d="M50,80 Q50,110 50,150" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "linear", delay: 5.7 }}
              />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
