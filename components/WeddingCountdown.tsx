"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { wedding } from "@/lib/wedding";

const CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akhil+%26+Preethi+Wedding&dates=20261115T044500Z/20261115T143000Z&details=Join+us+for+our+wedding+celebration.&location=MD+Palace,+Thiruvara+Temple,+Vadakkencherry`;

const emptySubscribe = () => () => {};

export function WeddingCountdown() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Suppress hydration mismatch by rendering empty on server
  if (!isClient) return <div className="h-24" />;

  const targetDate = new Date(wedding.date.iso).getTime();
  const distance = targetDate - now;

  let days = 0, hours = 0, minutes = 0, seconds = 0;
  
  if (distance > 0) {
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  return (
    <div className="flex flex-col items-center mt-8 space-y-8 z-20">
      {/* Add to calendar button */}
      <a 
        href={CALENDAR_URL} 
        target="_blank" 
        rel="noopener noreferrer"
        className="interactive group relative inline-flex items-center justify-center px-6 py-2 border border-olive/30 hover:border-olive/80 transition-colors text-ink/70 hover:text-ink text-xs tracking-[0.2em] uppercase font-sans overflow-hidden"
      >
        <span className="relative z-10">Add to Calendar</span>
        <div className="absolute inset-0 bg-olive/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-500" />
      </a>

      {/* Countdown - Using script font as requested */}
      <div className="flex gap-4 md:gap-8 items-center text-center">
        <div className="flex flex-col">
          <span className="font-script text-4xl md:text-5xl text-olive">{String(days).padStart(2, '0')}</span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mt-1">Days</span>
        </div>
        <span className="font-serif text-2xl text-olive/40 pb-4">:</span>
        <div className="flex flex-col">
          <span className="font-script text-4xl md:text-5xl text-olive">{String(hours).padStart(2, '0')}</span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mt-1">Hours</span>
        </div>
        <span className="font-serif text-2xl text-olive/40 pb-4">:</span>
        <div className="flex flex-col">
          <span className="font-script text-4xl md:text-5xl text-olive">{String(minutes).padStart(2, '0')}</span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mt-1">Mins</span>
        </div>
        <span className="font-serif text-2xl text-olive/40 pb-4">:</span>
        <div className="flex flex-col">
          <span className="font-script text-4xl md:text-5xl text-olive">{String(seconds).padStart(2, '0')}</span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-ink/50 mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
}
