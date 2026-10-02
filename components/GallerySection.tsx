"use client";

import Image from "next/image";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { ReactNode } from "react";

function TiltPhoto({ children, variants, aspect = "aspect-[3/4]" }: { children: ReactNode, variants: Variants, aspect?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className={`relative ${aspect} photo-paper z-10 shadow-md group-hover:shadow-xl transition-shadow duration-500 interactive`}
    >
      {children}
    </motion.div>
  );
}

export function GallerySection() {
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

  const frameDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 0.6, ease: "easeInOut" } 
    },
  };

  const photoReveal1: Variants = {
    hidden: { clipPath: "inset(10% 10% 10% 10%)", filter: "blur(4px)", opacity: 0, rotate: 0 },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)", 
      filter: "blur(0px)", 
      opacity: 1, 
      rotate: -2,
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const photoReveal2: Variants = {
    hidden: { clipPath: "inset(10% 10% 10% 10%)", filter: "blur(4px)", opacity: 0, rotate: 0 },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)", 
      filter: "blur(0px)", 
      opacity: 1, 
      rotate: 3,
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section
      id="gallery"
      className="relative flex flex-col items-center px-5 py-24 md:px-12 md:py-32 w-full max-w-6xl mx-auto"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full flex flex-col items-center relative"
      >
        {/* Background Floral Assets */}
        <motion.div variants={fadeUp} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image 
            src="/flowers_2.jpg" 
            alt="" 
            width={400} 
            height={400} 
            className="absolute top-[30%] left-[-20%] md:left-[-10%] w-[60%] md:w-[40%] opacity-[0.25] pointer-events-none mix-blend-multiply rotate-[10deg]"
            style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          />
        </motion.div>
        {/* The connecting line from previous section */}
        <div className="w-24 h-[200px] mb-8">
          <svg className="w-full h-full text-ink overflow-visible" viewBox="0 0 100 200">
            <motion.path 
              d="M50,0 Q60,50 40,100 Q30,150 50,200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              variants={lineDraw}
            />
          </svg>
        </div>

        <div className="mt-4 w-full mb-20 text-center flex flex-col items-center">
          <div className="relative overflow-hidden py-2 px-4">
            <motion.h2 variants={textReveal} className="font-script text-5xl md:text-7xl text-ink">
              Moments Together
            </motion.h2>
          </div>
          {/* Underline drawn */}
          <div className="flex justify-center mt-4">
            <svg width="200" height="20" viewBox="0 0 200 20" fill="none" className="text-olive overflow-visible">
              <motion.path 
                d="M10,10 Q100,5 190,15" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                variants={lineDraw}
              />
            </svg>
          </div>
        </div>

        <div className="relative w-full flex flex-col md:flex-row gap-20 md:gap-8 justify-center items-center md:h-[600px] z-10">
          
          {/* Photo 1 */}
          <div className="relative w-[85%] md:w-[45%] md:absolute md:left-[5%] md:top-[10%] group">
            {/* Frame draws first */}
            <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none text-ink opacity-40 z-0 overflow-visible">
              <motion.rect
                x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                variants={frameDraw}
              />
            </svg>
            
            <TiltPhoto variants={photoReveal1}>
              <Image
                src={wedding.images.together1.src}
                alt="Akhil and Preethi"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[50%_20%] grayscale-[25%] sepia-[10%] transition-all duration-700"
              />
            </TiltPhoto>
            
            <motion.div variants={fadeUp} className="absolute -bottom-10 left-0 w-full text-center">
              <p className="font-script text-2xl text-ink">In this light</p>
            </motion.div>
          </div>

          {/* Photo 2 */}
          <div className="relative w-[85%] md:w-[40%] md:absolute md:right-[5%] md:top-[20%] group">
            {/* Frame draws first */}
            <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none text-ink opacity-40 z-0 overflow-visible">
              <motion.rect
                x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                variants={frameDraw}
              />
            </svg>
            
            <TiltPhoto variants={photoReveal2} aspect="aspect-[4/5]">
              <Image
                src={wedding.images.together2.src}
                alt="Akhil and Preethi"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[50%_18%] grayscale-[25%] sepia-[10%] transition-all duration-700"
              />
            </TiltPhoto>
            
            <motion.div variants={fadeUp} className="absolute -bottom-10 left-0 w-full text-center">
              <p className="font-script text-2xl text-ink">Forever</p>
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}
