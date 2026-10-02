"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import Image from "next/image";

interface WeddingIntroProps {
  onStateChange: (state: "loading" | "drawing" | "complete" | "transitioning" | "finished") => void;
}

export function WeddingIntro({ onStateChange }: WeddingIntroProps) {
  const [scope, animate] = useAnimate();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    onStateChange("loading");
    let loaded = false;
    
    const finish = () => {
      if (!loaded) {
        loaded = true;
        setFontsLoaded(true);
      }
    };

    if (document.fonts) {
      document.fonts.ready.then(finish).catch(finish);
    }
    
    const timeout = setTimeout(finish, 1500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isMounted = true;
    
    const runTimeline = async () => {
      try {
        onStateChange("drawing");

        if (prefersReducedMotion) {
          animate(".intro-white-overlay", { opacity: 0 }, { duration: 0 });
          animate(".intro-paper", { opacity: 1 }, { duration: 0 });
          animate(".flower-asset", { opacity: 0.6, scale: 1 }, { duration: 0 });
          animate(".intro-draw", { pathLength: 1 }, { duration: 0 });
          animate(".handwritten-mask", { strokeDashoffset: 0 }, { duration: 0 });
          animate(".wedding-text", { opacity: 1, filter: "blur(0px)" }, { duration: 0 });
          
          await new Promise(r => setTimeout(r, 1000));
          if (!isMounted) return;
          
          onStateChange("transitioning");
          animate(scope.current, { opacity: 0 }, { duration: 0.5 });
          await new Promise(r => setTimeout(r, 500));
          return;
        }

        // 0.0s - 0.5s: Pure white screen
        await new Promise(r => setTimeout(r, 500));
        if (!isMounted) return;

        // 0.5s - 0.9s: Transition to Ivory Paper
        animate(".intro-white-overlay", { opacity: 0 }, { duration: 0.4, ease: "easeOut" });
        await new Promise(r => setTimeout(r, 400));
        if (!isMounted) return;

        // 0.9s - 1.7s: Botanical drawing
        animate(".ink-dot-1", { scale: 1, opacity: 0.8 }, { duration: 0.1 });
        animate(".botanical-path", { pathLength: 1 }, { duration: 0.5, ease: "easeInOut" });
        await new Promise(r => setTimeout(r, 800));
        animate(".ink-dot-1", { scale: 0, opacity: 0 }, { duration: 0.1 });
        if (!isMounted) return;

        // 1.7s - 2.5s: Flower assets slowly fading in like they belong on the paper
        animate(".flower-1", { opacity: 0.45, scale: 1 }, { duration: 0.5, ease: "easeOut" });
        animate(".flower-2", { opacity: 0.5, scale: 1 }, { duration: 0.5, ease: "easeOut" });
        animate(".flower-3", { opacity: 0.35, scale: 1 }, { duration: 0.5, ease: "easeOut" });
        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) return;

        // 2.5s - 3.2s: Invitation Frame (Top, Right, Bottom, Left)
        animate(".ink-dot-2", { scale: 1, opacity: 0.8 }, { duration: 0.1 });
        animate(".frame-top", { pathLength: 1 }, { duration: 0.175, ease: "linear" });
        await new Promise(r => setTimeout(r, 175));
        animate(".frame-right", { pathLength: 1 }, { duration: 0.175, ease: "linear" });
        await new Promise(r => setTimeout(r, 175));
        animate(".frame-bottom", { pathLength: 1 }, { duration: 0.175, ease: "linear" });
        await new Promise(r => setTimeout(r, 175));
        animate(".frame-left", { pathLength: 1 }, { duration: 0.175, ease: "linear" });
        await new Promise(r => setTimeout(r, 175));
        animate(".ink-dot-2", { scale: 0, opacity: 0 }, { duration: 0.1 });
        if (!isMounted) return;

        // 3.2s - 4.1s: AKHIL Handwriting
        animate(".mask-akhil", { strokeDashoffset: 0 }, { duration: 0.9, ease: "easeInOut" });
        await new Promise(r => setTimeout(r, 900));
        if (!isMounted) return;

        // 4.1s - 4.25s: &
        animate(".mask-amp", { strokeDashoffset: 0 }, { duration: 0.15, ease: "easeInOut" });
        await new Promise(r => setTimeout(r, 150));
        if (!isMounted) return;

        // 4.25s - 5.2s: PREETHI Handwriting
        animate(".mask-preethi", { strokeDashoffset: 0 }, { duration: 0.95, ease: "easeInOut" });
        await new Promise(r => setTimeout(r, 950));
        if (!isMounted) return;

        // 5.2s - 5.6s: Heart
        animate(".heart-path", { pathLength: 1 }, { duration: 0.4, ease: "easeOut" });
        await new Promise(r => setTimeout(r, 400));
        if (!isMounted) return;

        // 5.6s - 6.0s: WEDDING INVITATION text reveal
        animate(".wedding-text", { opacity: 1, filter: "blur(0px)" }, { duration: 0.4, ease: "easeOut" });
        await new Promise(r => setTimeout(r, 400));
        if (!isMounted) return;

        onStateChange("complete");

        // 6.0s - 6.7s: Hold completed invitation
        await new Promise(r => setTimeout(r, 700));
        if (!isMounted) return;

        // 6.7s - 7.7s: Transition into existing website
        onStateChange("transitioning");
        
        animate(".intro-frame-group", { scale: 1.05, opacity: 0 }, { duration: 1.0, ease: [0.4, 0, 0.2, 1] });
        animate(".intro-paper", { scale: 1.05 }, { duration: 1.0, ease: [0.4, 0, 0.2, 1] });
        animate(scope.current, { opacity: 0 }, { duration: 1.0, ease: [0.4, 0, 0.2, 1] });
        
        await new Promise(r => setTimeout(r, 1000));
      } catch (error) {
        console.error("Intro animation error:", error);
      } finally {
        if (isMounted) {
          onStateChange("finished");
        }
      }
    };
    
    runTimeline();
    
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, fontsLoaded, scope]);

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F5EFE3] pointer-events-auto"
    >
      {/* 1. Ivory Paper Background */}
      <div className="intro-paper absolute inset-0 bg-[#F5EFE3] z-[1]">
        {/* Extremely subtle paper grain */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-multiply" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* 2. White Opening Screen Overlay (Fades out to reveal Ivory Paper) */}
      <div className="intro-white-overlay absolute inset-0 bg-white z-[5]" />

      {/* 3. Content Container */}
      <div className="relative w-full max-w-[90vw] md:max-w-[600px] aspect-[3/4] md:aspect-square flex flex-col items-center justify-center z-10 intro-frame-group">
        
        {/* Flower Assets */}
        <Image 
          src="/flower_1.jpg" 
          alt="" 
          width={400} 
          height={400} 
          className="flower-1 flower-asset absolute top-[-5%] left-[-10%] w-[50%] md:w-[45%] opacity-0 scale-95 pointer-events-none mix-blend-multiply"
          style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          priority
        />
        <Image 
          src="/flowers_2.jpg" 
          alt="" 
          width={400} 
          height={400} 
          className="flower-2 flower-asset absolute bottom-[-5%] right-[-10%] w-[50%] md:w-[45%] opacity-0 scale-95 pointer-events-none mix-blend-multiply"
          style={{ WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          priority
        />
        <Image 
          src="/flower_3.jpg" 
          alt="" 
          width={300} 
          height={300} 
          className="flower-3 flower-asset absolute top-[25%] right-[-10%] w-[35%] opacity-0 scale-95 pointer-events-none mix-blend-multiply"
          style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", filter: "contrast(1.1) brightness(0.95) grayscale(20%)" }}
          priority
        />

        {/* Ink Dots */}
        <div className="ink-dot-1 absolute w-[3px] h-[3px] bg-[#1E1C18] rounded-full z-20 opacity-0 scale-0 top-[15%] left-[15%]" />
        <div className="ink-dot-2 absolute w-[3px] h-[3px] bg-[#1E1C18] rounded-full z-20 opacity-0 scale-0 top-[5%] left-[5%]" />

        {/* Botanical Drawing (Top Left) */}
        <svg className="absolute w-24 h-24 md:w-32 md:h-32 top-[10%] left-[10%] pointer-events-none text-[#73735c] opacity-70 overflow-visible z-20" viewBox="0 0 100 100">
          <motion.path
            className="intro-draw botanical-path"
            d="M 90 90 Q 50 60 20 20 M 70 75 Q 50 45 30 35 M 40 50 Q 25 35 10 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
          />
        </svg>

        {/* Hand-drawn Frame */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#1E1C18] opacity-[0.35] z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path className="intro-draw frame-top" d="M 5 5 L 95 5" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 1.5" initial={{ pathLength: 0 }} />
          <motion.path className="intro-draw frame-right" d="M 95 5 L 95 95" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 1.5" initial={{ pathLength: 0 }} />
          <motion.path className="intro-draw frame-bottom" d="M 95 95 L 5 95" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 1.5" initial={{ pathLength: 0 }} />
          <motion.path className="intro-draw frame-left" d="M 5 95 L 5 5" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 1.5" initial={{ pathLength: 0 }} />
        </svg>

        {/* Central Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
          
          {/* SVG Text and Handwriting Masks */}
          <svg className="w-full max-w-[400px] h-auto overflow-visible mt-2 md:mt-4 z-30" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <mask id="akhil-mask">
                <motion.path className="handwritten-mask mask-akhil" d="M 50 120 L 120 20 L 160 120 L 140 70 L 200 120 L 200 20 L 200 120 L 230 70 L 250 120 L 250 20 L 250 120 L 280 70 L 280 120 L 310 70 L 310 120 L 330 20 L 330 120 L 360 70" fill="none" stroke="white" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3000" strokeDashoffset="3000" />
              </mask>
              <mask id="amp-mask">
                <motion.path className="handwritten-mask mask-amp" d="M 240 180 L 160 180 L 160 120 L 240 120 L 160 180 L 240 180" fill="none" stroke="white" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" strokeDashoffset="1000" />
              </mask>
              <mask id="preethi-mask">
                <motion.path className="handwritten-mask mask-preethi" d="M 30 300 L 30 200 L 90 200 L 90 250 L 30 250 L 80 300 L 80 250 L 110 250 L 110 300 L 140 280 L 170 280 L 170 250 L 140 250 L 140 300 L 170 300 L 200 280 L 230 280 L 230 250 L 200 250 L 200 300 L 230 300 L 260 300 L 260 180 L 260 300 L 250 240 L 280 240 L 260 300 L 310 300 L 310 180 L 310 300 L 340 240 L 340 300 L 370 240 L 370 300 L 390 240 L 410 300" fill="none" stroke="white" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3000" strokeDashoffset="3000" />
              </mask>
            </defs>
          
            <text x="200" y="80" textAnchor="middle" dominantBaseline="middle" mask="url(#akhil-mask)" className="font-script text-[80px]" fill="#1E1C18">Akhil</text>
            <text x="200" y="160" textAnchor="middle" dominantBaseline="middle" mask="url(#amp-mask)" className="font-script text-[50px]" fill="#b0976d">&amp;</text>
            <text x="200" y="260" textAnchor="middle" dominantBaseline="middle" mask="url(#preethi-mask)" className="font-script text-[80px]" fill="#1E1C18">Preethi</text>
          </svg>

          {/* Heart */}
          <div className="flex justify-center items-center h-12 w-full mt-2 md:mt-4 relative">
             <svg className="absolute w-8 h-8 text-[#b0976d] overflow-visible" viewBox="0 0 50 50">
               <motion.path
                className="intro-draw heart-path"
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

          {/* WEDDING INVITATION */}
          <div className="wedding-text opacity-0 mt-6 md:mt-8">
            <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#1E1C18] font-medium leading-none text-center m-0 p-0" style={{ filter: "blur(4px)" }}>
              Wedding Invitation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
