"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoldRule } from "@/components/GoldRule";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

const WEDDING_AT = new Date(wedding.date.iso).getTime();

function remaining() {
  const diff = Math.max(0, WEDDING_AT - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function snapshot() {
  const t = remaining();
  return `${t.days}:${t.hours}:${t.minutes}:${t.seconds}`;
}

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  // Server snapshot is always "0:0:0:0" so SSR and hydration match exactly.
  // The client snapshot fires immediately after mount with the real value.
  const raw = useSyncExternalStore(subscribe, snapshot, () => "0:0:0:0");
  const [days, hours, minutes, seconds] = raw.split(":").map(Number);

  const units = [
    { label: "Days", value: pad(days) },
    { label: "Hours", value: pad(hours) },
    { label: "Minutes", value: pad(minutes) },
    { label: "Seconds", value: pad(seconds) },
  ];

  return (
    <section className="bg-paper px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            {wedding.copy.countdown}
          </h2>
        </Reveal>
        <GoldRule className="my-10" />
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {units.map((unit) => (
            <div key={unit.label}>
              <div className="relative h-16 overflow-hidden font-serif text-5xl text-ink sm:text-6xl">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={unit.value}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {unit.value}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-gold-deep">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
