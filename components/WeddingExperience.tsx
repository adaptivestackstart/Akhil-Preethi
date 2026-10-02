"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Cursor } from "@/components/Cursor";
import { HeroSection } from "@/components/HeroSection";
import { CoupleSection } from "@/components/CoupleSection";
import { StorySection } from "@/components/StorySection";
import { WeddingEvent } from "@/components/WeddingEvent";
import { ReceptionEvent } from "@/components/ReceptionEvent";
import { FamilySection } from "@/components/FamilySection";
import { VenueSection } from "@/components/VenueSection";
import { GallerySection } from "@/components/GallerySection";
import { FinalInvitation } from "@/components/FinalInvitation";
import { WeddingNavigation } from "@/components/WeddingNavigation";

import { WeddingIntro } from "@/components/WeddingIntro";
import { WeddingCanvas } from "@/components/WeddingCanvas";

export function WeddingExperience() {
  const [introState, setIntroState] = useState<"loading" | "drawing" | "complete" | "transitioning" | "finished">("loading");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 1.0;

    // Try to play if we are at the hero section
    if (introState === "transitioning" || introState === "finished") {
      audio.play().catch(() => {});
    }

    const unlockAudio = () => {
      if (!audio) return;
      if (introState === "transitioning" || introState === "finished") {
        audio.play().catch(() => {});
      } else if (audio.paused) {
        // Unlock hack for iOS/Safari: play and immediately pause during the intro
        audio.play().then(() => {
          audio.pause();
        }).catch(() => {});
      }
    };

    // Attach to window to catch literally any interaction
    window.addEventListener("click", unlockAudio, { capture: true });
    window.addEventListener("touchstart", unlockAudio, { capture: true });

    return () => {
      window.removeEventListener("click", unlockAudio, { capture: true });
      window.removeEventListener("touchstart", unlockAudio, { capture: true });
    };
  }, [introState]);

  useEffect(() => {
    if (introState === "loading" || introState === "drawing" || introState === "complete") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [introState]);

  return (
    <div className="relative paper-grain min-h-[100svh]">
      <audio ref={audioRef} src="/audio/wedding.mp3" loop preload="auto" className="absolute opacity-0 pointer-events-none w-0 h-0" />
      <Cursor />
      <WeddingCanvas introState={introState} />
      
      <AnimatePresence>
        {introState !== "finished" && (
          <WeddingIntro onStateChange={(state) => setIntroState(state)} />
        )}
      </AnimatePresence>

      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to invitation
      </a>
      
      {/* Main website is rendered underneath, but its entrance is controlled by introState */}
      <div 
        className="relative transition-opacity duration-1000 z-10"
        style={{ 
          opacity: introState === "finished" || introState === "transitioning" ? 1 : 0,
          pointerEvents: introState === "finished" || introState === "transitioning" ? "auto" : "none" 
        }}
      >
        {introState === "finished" && (
          <>
            <WeddingNavigation visible={true} />
          </>
        )}
        <main className="overflow-x-hidden">
          <HeroSection />
          <CoupleSection />
          <StorySection />
          <WeddingEvent />
          <ReceptionEvent />
          <FamilySection />
          <VenueSection />
          <GallerySection />
          <FinalInvitation />
        </main>
      </div>
    </div>
  );
}
