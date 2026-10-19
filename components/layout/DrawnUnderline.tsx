"use client";

import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";

export function DrawnUnderline() {
  return (
    <svg
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute -bottom-2 left-[10%] h-3 w-[80%]"
    >
      <motion.path
        d="M2 8 C 80 2, 180 2, 298 7"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: duration.hero, ease: ease.out }}
      />
    </svg>
  );
}
