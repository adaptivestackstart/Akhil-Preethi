"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { wedding } from "@/lib/wedding";

export function FinalInvitation() {
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "success">("idle");

  const handleDownload = async () => {
    if (downloadState !== "idle") return;
    setDownloadState("downloading");
    
    // Smooth preparation animation delay
    await new Promise(r => setTimeout(r, 1600));
    
    // Actual file download
    const link = document.createElement('a');
    link.href = '/Akhil&Preethi.png';
    link.download = 'Akhil_Preethi_Invitation.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloadState("success");
    
    // Auto-close modal elegantly
    setTimeout(() => {
      setIsWishModalOpen(false);
      setTimeout(() => setDownloadState("idle"), 600);
    }, 2500);
  };
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

  const frameDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 1.2, ease: "easeInOut" } 
    },
  };

  const checkDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } 
    },
  };

  return (
    <section className="relative flex flex-col items-center px-5 pt-24 pb-12 md:px-12 md:pt-32 md:pb-16 w-full max-w-4xl mx-auto text-center">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center"
      >
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
          {/* Paper Note Background */}
          <div className="absolute inset-0 bg-paper-dark/30 sketch-border rotate-1 pointer-events-none" />
          
          <div className="relative z-10 px-8 py-16 flex flex-col items-center text-center">
            <motion.p variants={fadeUp} className="font-serif text-2xl text-ink leading-relaxed mb-12">
              {wedding.copy.closing}
            </motion.p>
            
            <motion.div variants={fadeUp} className="w-16 h-px bg-ink/30 sketch-border mb-12" />
            
            <div className="relative overflow-hidden py-2 mb-6">
              <motion.h2 variants={textReveal} className="font-script text-5xl md:text-6xl text-ink">
                Akhil & Preethi
              </motion.h2>
            </div>
            
            <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.3em] uppercase text-ink/70 mt-2">
              {wedding.date.display}
            </motion.p>

            <motion.p variants={fadeUp} className="font-serif text-lg italic text-ink/80 mt-12">
              {wedding.copy.closingWait}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-16 flex justify-center w-full group interactive">
              <a href="#" className="relative inline-flex items-center justify-center px-8 py-3 text-ink font-sans text-sm tracking-[0.2em] uppercase font-medium">
                <span className="relative z-10">RSVP</span>
                {/* Hand-drawn button frame */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none text-ink overflow-visible z-0">
                  <motion.rect
                    x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    variants={frameDraw}
                  />
                  <rect
                    x="0" y="4" width="calc(100%)" height="calc(100% - 8px)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="opacity-40"
                  />
                </svg>
                {/* Hand-drawn ink stroke expands underneath */}
                <div className="absolute -inset-1 bg-olive/10 sketch-border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* The new Wish Us button */}
        <motion.div variants={fadeUp} className="mt-20 flex justify-center w-full group interactive">
          <button 
            onClick={() => setIsWishModalOpen(true)}
            className="relative inline-flex items-center justify-center px-12 py-4 text-ink font-sans text-sm tracking-[0.2em] uppercase font-medium"
          >
            <span className="relative z-10">Wish Us</span>
            <svg className="absolute inset-0 w-full h-full pointer-events-none text-ink overflow-visible z-0">
              <motion.rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" fill="none" stroke="currentColor" strokeWidth="1.5" variants={frameDraw} />
              <rect x="0" y="4" width="calc(100%)" height="calc(100% - 8px)" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
            </svg>
            <div className="absolute -inset-1 bg-olive/10 sketch-border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100" />
          </button>
        </motion.div>
        
      </motion.div>

      {/* Elegant Wish Us Modal */}
      <AnimatePresence>
        {isWishModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-paper/80 backdrop-blur-md p-4"
            onClick={() => downloadState === "idle" && setIsWishModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-paper-dark sketch-border p-10 md:p-14 flex flex-col items-center text-center shadow-2xl"
            >
              <h3 className="font-script text-4xl text-ink mb-4">Send Wishes</h3>
              <p className="font-serif text-ink/70 mb-10 text-sm">
                Keep our invitation as a beautiful memory.
              </p>

              <div className="relative w-full h-[60px] flex justify-center items-center">
                <AnimatePresence mode="wait">
                  {downloadState === "idle" && (
                    <motion.button
                      key="btn-idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={handleDownload}
                      className="relative inline-flex items-center justify-center px-6 py-3 text-ink font-sans text-xs tracking-[0.15em] uppercase font-medium group interactive"
                    >
                      <span className="relative z-10">Download Invitation</span>
                      <div className="absolute inset-0 border border-ink/30 sketch-border group-hover:border-ink/60 transition-colors" />
                    </motion.button>
                  )}

                  {downloadState === "downloading" && (
                    <motion.div
                      key="btn-downloading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-3 text-ink"
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" className="overflow-visible">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
                        <motion.circle 
                          cx="20" cy="20" r="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          variants={lineDraw}
                          initial="hidden"
                          animate="visible"
                        />
                      </svg>
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Preparing...</span>
                    </motion.div>
                  )}

                  {downloadState === "success" && (
                    <motion.div
                      key="btn-success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 text-olive"
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" className="overflow-visible">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                        <motion.path 
                          d="M12,20 L18,26 L28,14" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          variants={checkDraw}
                          initial="hidden"
                          animate="visible"
                        />
                      </svg>
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Downloaded</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Close Button */}
              {downloadState === "idle" && (
                <button 
                  onClick={() => setIsWishModalOpen(false)}
                  className="absolute top-4 right-4 text-ink/50 hover:text-ink transition-colors p-2 interactive"
                >
                  <span className="sr-only">Close</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1,1 L13,13 M1,13 L13,1" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
