"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { wedding } from "@/lib/wedding";

export function StorySection() {
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

  const heartDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 1, ease: "easeInOut" } 
    },
  };

  const textReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: { 
      clipPath: "inset(0 0% 0 0)", opacity: 1, 
      transition: { duration: 1, ease: "linear" } 
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  const photoReveal: Variants = {
    hidden: { clipPath: "inset(10% 10% 10% 10%)", filter: "blur(4px)", opacity: 0, rotate: 0 },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)", 
      filter: "blur(0px)", 
      opacity: 1, 
      rotate: 2,
      transition: { duration: 1.2, ease: "easeOut" } 
    },
  };

  return (
    <section
      id="story"
      className="relative px-5 py-24 md:px-12 md:py-32 w-full max-w-6xl mx-auto flex flex-col"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full h-full flex flex-col items-center"
      >
        {/* Background Floral Assets */}
        <motion.div variants={fadeUp} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image 
            src="/flower_1.jpg" 
            alt="" 
            width={400} 
            height={400} 
            className="absolute top-[10%] left-[-20%] md:left-[-10%] w-[60%] md:w-[40%] opacity-[0.25] pointer-events-none mix-blend-multiply rotate-[-10deg]"
            style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          />
          <Image 
            src="/flowers_2.jpg" 
            alt="" 
            width={400} 
            height={400} 
            className="absolute bottom-[10%] right-[-20%] md:right-[-10%] w-[60%] md:w-[40%] opacity-[0.25] pointer-events-none mix-blend-multiply rotate-[20deg]"
            style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          />
        </motion.div>
        {/* The connecting line from previous section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[200px]">
          <svg className="w-full h-full text-ink overflow-visible" viewBox="0 0 100 200">
            <motion.path 
              d="M50,0 Q60,50 40,100 Q30,150 50,200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              variants={lineDraw}
            />
          </svg>
        </div>

        <div className="mt-40 grid md:grid-cols-[40%_1fr] gap-12 md:gap-20 items-center w-full">
          {/* Photo Area */}
          <motion.div variants={fadeUp} className="relative group interactive h-full flex items-center justify-center">
            {/* Hand-drawn frame effect behind */}
            <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none text-ink opacity-40 z-0 overflow-visible">
              <motion.rect
                x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                variants={lineDraw}
              />
              <motion.rect
                x="2" y="8" width="calc(100% - 4px)" height="calc(100% - 16px)"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                variants={lineDraw}
              />
            </svg>

            <motion.div variants={photoReveal} className="relative w-full aspect-[3/4] photo-paper transition-transform duration-500 z-10 shadow-md">
              <Image
                src={wedding.images.story.src}
                alt="Akhil and Preethi"
                fill
                sizes="(max-width: 768px) 80vw, 35vw"
                className="object-cover object-[50%_15%] grayscale-[15%] sepia-[5%]"
              />
              <div className="absolute -bottom-1 -right-3 w-16 h-5 bg-paper/70 backdrop-blur-sm -rotate-[25deg] shadow-sm z-20" />
            </motion.div>
            
            {/* Arrow pointing to text */}
            <svg className="hidden md:block absolute top-1/2 -right-16 w-24 h-12 text-ink opacity-60 pointer-events-none" viewBox="0 0 100 50" fill="none">
              <motion.path 
                d="M0,25 Q40,10 80,30" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                variants={lineDraw}
              />
              <motion.path 
                d="M70,20 L80,30 L70,40" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                variants={lineDraw}
              />
            </svg>
          </motion.div>

          {/* Text Area */}
          <div className="relative">
            {/* Lined paper background effect */}
            <div className="absolute inset-0 top-16 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, var(--color-ink) 31px, var(--color-ink) 32px)', opacity: 0.05, backgroundSize: '100% 32px' }} />
            
            <div className="relative z-10 pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative overflow-hidden py-2">
                  <motion.h2 variants={textReveal} className="font-script text-5xl md:text-6xl text-ink">
                    Our Story
                  </motion.h2>
                </div>
                {/* Hand drawn heart */}
                <svg className="w-8 h-8 text-olive opacity-80 overflow-visible" viewBox="0 0 100 100" fill="none">
                  <motion.path 
                    d="M50,80 Q20,60 15,35 Q10,10 35,10 Q50,25 50,40 Q50,25 65,10 Q90,10 85,35 Q80,60 50,80" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    variants={heartDraw}
                  />
                </svg>
              </div>
              
              <motion.p variants={fadeUp} className="font-serif text-xl md:text-2xl leading-[32px] text-ink/90">
                {wedding.copy.storyLead}
              </motion.p>
              
              <div className="mt-8 space-y-4">
                {[
                  { t: "A meeting", d: "A quiet moment that asked to be remembered." },
                  { t: "A knowing", d: "Conversation turned into companionship." },
                  { t: "A promise", d: "Two families, one day, a lifetime ahead." },
                ].map((item, i) => (
                  <motion.div variants={fadeUp} key={item.t} className="flex gap-4 group interactive">
                    <div className="pt-2 relative flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full border border-ink bg-paper group-hover:bg-ink transition-colors" />
                      {i !== 2 && <div className="w-px h-full bg-ink/30 sketch-border mt-1 min-h-[30px]" />}
                    </div>
                    <div className="pb-4">
                      <p className="font-script text-2xl text-ink">
                        {item.t}
                      </p>
                      <p className="font-serif text-lg text-ink/80 mt-1">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
