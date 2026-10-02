"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cinematicEase } from "@/lib/wedding";
import { PetalField } from "@/components/PetalField";

type WeddingDoorIntroProps = {
  onComplete: () => void;
};

const DUST = Array.from({ length: 18 }).map((_, i) => ({
  left: `${(i * 13) % 100}%`,
  top: `${(i * 19) % 90}%`,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.4,
}));

export function WeddingDoorIntro({ onComplete }: WeddingDoorIntroProps) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const timers = [
      window.setTimeout(() => setOpen(true), 2600),
      // Card rises shortly after the doors are fully open
      window.setTimeout(() => setCardVisible(true), 4800),
      window.setTimeout(() => setLeaving(true), 11500),
      window.setTimeout(() => onComplete(), 13200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.section
          key="doors"
          role="dialog"
          aria-label="Wedding entrance"
          className="fixed inset-0 z-[80] overflow-hidden bg-night"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: cinematicEase }}
        >
          <Hall open={open} cardVisible={cardVisible} />
          <button
            type="button"
            onClick={onComplete}
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.32em] text-ivory/55"
          >
            Enter invitation
          </button>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}

function Hall({ open, cardVisible }: { open: boolean; cardVisible: boolean }) {
  return (
    <div className="absolute inset-0 perspective-[1400px]">
      <motion.div
        className="absolute inset-0 origin-center"
        initial={{ scale: 1.02, y: 10 }}
        animate={{ scale: 1.12, y: 0 }}
        transition={{ duration: 13, ease: cinematicEase }}
      >
        {/* Dark hall background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#3a2a18_0%,#120d09_70%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,12,8,0.2) 0%, transparent 30%, rgba(8,5,3,0.7) 100%)",
          }}
        />

        {/* Outer frame border */}
        <div className="absolute inset-x-[8%] top-[9%] bottom-[7%] rounded-[2px] border border-[#c4a574]/20 shadow-[0_0_80px_rgba(176,141,87,0.12)]" />
        {/* Lintel beam */}
        <div className="absolute inset-x-[10%] top-[12%] h-9 wood-grain opacity-90" />
        <Garland />

        {/* Door frame area */}
        <div className="absolute inset-x-[10%] top-[18%] bottom-[9%]">
          {/* Warm amber background behind doors */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 58%, #e8c484 0%, #8a5a28 38%, #2a1a10 78%)",
            }}
          />

          {/* ── Invitation card — rises up once doors are open ── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: cardVisible ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ zIndex: 5 }}
          >
            {/* Soft warm glow behind the card */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(232,196,100,0.18) 0%, rgba(12,7,3,0.72) 70%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 32 }}
              animate={{
                opacity: cardVisible ? 1 : 0,
                scale: cardVisible ? 1 : 0.88,
                y: cardVisible ? 0 : 32,
              }}
              transition={{ duration: 1.4, ease: cinematicEase, delay: 0.1 }}
              className="relative z-10 flex h-full w-full items-center justify-center px-3 py-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Elegant Green Wedding Invitation.png"
                alt="Akhil & Preethi Wedding Invitation"
                className="h-full max-h-full w-auto max-w-full rounded-sm object-contain"
                style={{
                  boxShadow:
                    "0 8px 48px rgba(0,0,0,0.65), 0 2px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(196,165,116,0.18)",
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* The two door leaves — swing open on top of the card */}
          <div
            className="absolute inset-0 flex"
            style={{ perspective: "1400px", transformStyle: "preserve-3d", zIndex: 10 }}
          >
            <DoorLeaf side="left" open={open} />
            <DoorLeaf side="right" open={open} />
          </div>
        </div>

        {/* Global golden bloom when doors open */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: open ? 0.5 : 0 }}
          transition={{ duration: 2.4 }}
          style={{
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(232, 196, 132, 0.28), transparent 46%)",
          }}
        />
      </motion.div>

      <PetalField count={10} />
      {DUST.map((d, i) => (
        <span
          key={i}
          className="dust absolute rounded-full bg-ivory/50"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function DoorLeaf({ side, open }: { side: "left" | "right"; open: boolean }) {
  const isLeft = side === "left";
  return (
    <motion.div
      className="relative h-full w-1/2 wood-grain"
      style={{
        transformOrigin: isLeft ? "left center" : "right center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        boxShadow: isLeft
          ? "inset -18px 0 28px rgba(0,0,0,0.35)"
          : "inset 18px 0 28px rgba(0,0,0,0.35)",
      }}
      animate={{ rotateY: open ? (isLeft ? -82 : 82) : 0 }}
      transition={{ duration: 3.4, ease: [0.45, 0.05, 0.2, 1] }}
    >
      <div className="absolute inset-4 border border-[#c4a574]/25 door-carve" />
      <div className="absolute inset-8 border border-[#2a160c]/50" />
      <Carving />
      <div
        className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full"
        style={{
          [isLeft ? "right" : "left"]: "18px",
          background:
            "radial-gradient(circle at 30% 30%, #f0d9a6, #a67c3d 55%, #6b4a1e)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.45)",
        }}
      />
      <div
        className="absolute inset-y-0 w-px bg-[#c4a574]/20"
        style={{ [isLeft ? "right" : "left"]: 0 }}
      />
    </motion.div>
  );
}

function Carving() {
  return (
    <svg
      className="absolute left-1/2 top-[28%] h-[38%] w-[54%] -translate-x-1/2 opacity-70"
      viewBox="0 0 120 180"
      fill="none"
      aria-hidden="true"
    >
      <rect x="8" y="8" width="104" height="164" stroke="#c4a574" strokeWidth="1.1" opacity=".55" />
      <circle cx="60" cy="90" r="28" stroke="#c4a574" strokeWidth="1.1" />
      <path
        d="M60 62c8 10 14 18 14 28s-6 18-14 28c-8-10-14-18-14-28s6-18 14-28Z"
        stroke="#c4a574"
        strokeWidth="1"
      />
      <path d="M32 90h56M60 62v56" stroke="#c4a574" strokeWidth=".6" opacity=".8" />
      <path d="M24 28h72M24 152h72" stroke="#c4a574" strokeWidth=".7" opacity=".6" />
    </svg>
  );
}

function Garland() {
  return (
    <svg
      className="absolute inset-x-[9%] top-[10%] z-10 h-16 w-[82%]"
      viewBox="0 0 800 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 18c80 28 140-10 200 8 70 22 110-18 180-2 80 18 130-16 210 4 60 14 110-10 170 6"
        stroke="#c9a36a"
        strokeWidth="1.4"
        opacity=".7"
      />
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 40 + i * 54;
        const y = 22 + ((i % 3) - 1) * 6;
        return (
          <g key={i} opacity=".85">
            <ellipse
              cx={x}
              cy={y}
              rx="7"
              ry="11"
              fill="#efe6d4"
              transform={`rotate(${i % 2 ? 18 : -16} ${x} ${y})`}
            />
            <circle cx={x} cy={y + 10} r="2.2" fill="#c9a36a" />
          </g>
        );
      })}
    </svg>
  );
}
