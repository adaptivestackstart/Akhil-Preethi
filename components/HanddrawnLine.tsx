"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HanddrawnLineProps {
  path: string;
  width?: number;
  height?: number;
  className?: string;
}

export function HanddrawnLine({ path, width = 100, height = 200, className = "" }: HanddrawnLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Small delay before starting the line drawing to make it feel more natural
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative flex justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <motion.path
          d={path}
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          // Subtle roughening of the line
          className="opacity-80"
          initial={{ pathLength: 0 }}
        />
        {/* Subtle double stroke effect for hand-drawn feel */}
        <motion.path
          d={path}
          stroke="var(--ink)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          className="opacity-40 translate-x-[0.5px] translate-y-[0.5px]"
          initial={{ pathLength: 0 }}
        />
      </svg>
    </div>
  );
}
