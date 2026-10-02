"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function MusicControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let active = true;
    const audio = new Audio("/audio/wedding.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.28;
    audioRef.current = audio;

    let cleanupListeners = () => {};

    const tryPlay = async () => {
      try {
        await audio.play();
        if (active) setPlaying(true);
      } catch (err) {
        if (!active) return;
        
        const playOnInteraction = () => {
          // Attempt to play immediately on interaction
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              if (active) {
                setPlaying(true);
                cleanupListeners();
              }
            }).catch(() => {
              // Still blocked or interrupted, keep listeners attached
            });
          }
        };
        
        // Listen to all possible user activation events
        const events = ['click', 'touchstart', 'pointerup', 'keydown'];
        
        cleanupListeners = () => {
          events.forEach(e => document.removeEventListener(e, playOnInteraction, true));
        };
        
        events.forEach(e => document.addEventListener(e, playOnInteraction, { capture: true, passive: true }));
      }
    };

    tryPlay();

    return () => {
      active = false;
      cleanupListeners();
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  return null;
}
