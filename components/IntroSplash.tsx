"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";

interface IntroSplashProps {
  onStateChange: (state: "loading" | "drawing" | "complete" | "transitioning" | "finished") => void;
}

export function IntroSplash({ onStateChange }: IntroSplashProps) {
  const [scope, animate] = useAnimate();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onStateChange("loading");
    if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setTimeout(() => setFontsLoaded(true), 500); // Fallback
    }
  }, [onStateChange]);

  useEffect(() => {
    if (!fontsLoaded) return;

    let isMounted = true;

    const runTimeline = async () => {
      onStateChange("drawing");

      // 0.0s - 0.6s: Empty paper
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;

      // 0.6s - 1.2s: First ink stroke (botanical)
      animate(".ink-dot", { scale: 1, opacity: 0.8 }, { duration: 0.2 });
      await animate(".botanical-path", { pathLength: 1 }, { duration: 0.6, ease: "easeInOut" });
      if (!isMounted) return;

      // 1.2s - 1.8s: Decorative frame (Top -> Right -> Bottom -> Left)
      await animate(".frame-top", { pathLength: 1 }, { duration: 0.15, ease: "linear" });
      await animate(".frame-right", { pathLength: 1 }, { duration: 0.15, ease: "linear" });
      await animate(".frame-bottom", { pathLength: 1 }, { duration: 0.15, ease: "linear" });
      await animate(".frame-left", { pathLength: 1 }, { duration: 0.15, ease: "linear" });
      if (!isMounted) return;

      // 1.8s - 3.3s: Handwritten names
      await animate(".name-akhil", { clipPath: "inset(0 0% 0 0)" }, { duration: 0.6, ease: "linear" });
      await animate(".ampersand", { clipPath: "inset(0 0% 0 0)" }, { duration: 0.3, ease: "linear" });
      await animate(".name-preethi", { clipPath: "inset(0 0% 0 0)" }, { duration: 0.6, ease: "linear" });
      if (!isMounted) return;

      // 3.3s - 3.8s: Heart + underline
      await animate(".heart-path", { pathLength: 1 }, { duration: 0.4, ease: "easeInOut" });
      animate(".underline-path", { pathLength: 1 }, { duration: 0.4, ease: "easeOut" });
      
      // Line continues downwards seamlessly
      await animate(".drop-path", { pathLength: 1 }, { duration: 0.4, ease: "linear" });
      if (!isMounted) return;

      // 3.8s - 4.5s: "WEDDING INVITATION" text reveal
      await animate(".wedding-text", { opacity: 1, filter: "blur(0px)" }, { duration: 0.7, ease: "easeOut" });
      if (!isMounted) return;

      onStateChange("complete");

      // Hold pause
      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;

      // Transition out
      onStateChange("transitioning");
      
      // Border expands outward, paper scales, fade out
      animate(".frame-svg", { scale: 1.05, opacity: 0 }, { duration: 1.0, ease: "easeInOut" });
      await animate(scope.current, { opacity: 0 }, { duration: 1.0, ease: "easeInOut" });
      
      if (!isMounted) return;
      onStateChange("finished");
    };

    runTimeline();

    return () => {
      isMounted = false;
    };
  }, [animate, fontsLoaded, onStateChange, scope]);

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper paper-grain overflow-hidden"
    >
      <div className="relative w-full max-w-sm md:max-w-md aspect-[3/4] md:aspect-square flex flex-col items-center justify-center">
        
        {/* Ink Dot */}
        <div className="ink-dot absolute w-1.5 h-1.5 bg-ink rounded-full z-10 opacity-0 scale-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Decorative Frame */}
        <svg className="frame-svg absolute inset-0 w-full h-full pointer-events-none text-ink opacity-30 z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path className="frame-top" d="M 5 5 L 95 5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" initial={{ pathLength: 0 }} />
          <motion.path className="frame-right" d="M 95 5 L 95 95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" initial={{ pathLength: 0 }} />
          <motion.path className="frame-bottom" d="M 95 95 L 5 95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" initial={{ pathLength: 0 }} />
          <motion.path className="frame-left" d="M 5 95 L 5 5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" initial={{ pathLength: 0 }} />
        </svg>

        {/* Botanical Branch (Top Left Corner) */}
        <svg className="absolute w-32 h-32 -top-8 -left-8 pointer-events-none text-olive opacity-60 overflow-visible z-10" viewBox="0 0 100 100">
          <motion.path
            className="botanical-path"
            d="M 100 100 Q 50 50 10 30 M 80 85 Q 60 50 40 40 M 45 65 Q 30 40 15 35"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
          />
        </svg>

        {/* Fixed Layout Central Content */}
        {/* No bouncing, no height changes, exactly centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 gap-4 mt-8">
          
          <motion.div className="name-akhil" initial={{ clipPath: "inset(0 100% 0 0)" }}>
            <h1 className="font-script text-6xl md:text-8xl text-ink leading-none">
              Akhil
            </h1>
          </motion.div>
          
          <motion.div className="ampersand flex justify-center items-center" initial={{ clipPath: "inset(0 100% 0 0)" }}>
            <p className="font-script text-3xl md:text-5xl text-gold leading-none">
              &
            </p>
          </motion.div>
          
          <motion.div className="name-preethi" initial={{ clipPath: "inset(0 100% 0 0)" }}>
            <h1 className="font-script text-6xl md:text-8xl text-ink leading-none">
              Preethi
            </h1>
          </motion.div>

          <div className="flex justify-center items-center h-12 w-full mt-2 relative">
             <svg className="absolute w-12 h-12 text-gold overflow-visible" viewBox="0 0 50 50">
               <motion.path
                className="heart-path"
                d="M 25 15 C 25 15 20 5 10 10 C 0 15 0 25 10 35 C 15 40 25 45 25 45 C 25 45 35 40 40 35 C 50 25 50 15 40 10 C 30 5 25 15 25 15 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
              />
             </svg>
          </div>

          <motion.div className="wedding-text" initial={{ opacity: 0, filter: "blur(4px)" }}>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink font-medium leading-none">
              Wedding Invitation
            </p>
          </motion.div>

          <div className="flex justify-center w-full mt-4 h-[50px] relative">
            <svg className="absolute w-full h-[150px] text-ink opacity-40 overflow-visible" viewBox="0 0 200 150">
               <motion.path
                className="underline-path"
                d="M 50 5 Q 100 0 150 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
              />
              <motion.path
                className="drop-path"
                d="M 100 5 Q 100 50 100 150"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
              />
            </svg>
          </div>

        </div>
      </div>

      <button
        onClick={() => onStateChange("finished")}
        className="absolute bottom-10 font-sans text-[10px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink transition-colors z-50 interactive"
      >
        Skip Intro
      </button>
    </motion.div>
  );
}
