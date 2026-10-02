"use client";

import { motion } from "framer-motion";
import { GoldRule } from "@/components/GoldRule";
import { cinematicEase, wedding } from "@/lib/wedding";

export function InvitationIntro() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center bg-paper px-6 py-24 text-center"
    >
      <div className="absolute inset-x-8 top-8 bottom-8 border border-gold/15 md:inset-x-16 md:top-12 md:bottom-12" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: cinematicEase }}
        className="relative max-w-xl"
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-gold-deep">
          {wedding.copy.invitationLine}
        </p>
        <GoldRule className="my-8" />
        <h2 className="font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl md:text-7xl">
          {wedding.names.groom}
        </h2>
        <p className="my-4 font-serif text-2xl italic text-gold-deep">&</p>
        <h2 className="font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl md:text-7xl">
          {wedding.names.bride}
        </h2>
        <GoldRule className="my-8" />
        <p className="font-sans text-sm font-light tracking-[0.08em] text-brown sm:text-base">
          {wedding.copy.inviteYou}
        </p>
      </motion.div>
    </section>
  );
}
