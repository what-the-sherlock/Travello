"use client";

import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";

/** Accent underline that grows from the left when scrolled into view (transform only). */
export function DrawnUnderline() {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: duration.hero, ease: ease.out }}
      className="absolute -bottom-3 left-[calc(50%-3rem)] block h-[3px] w-24 origin-left rounded-full bg-accent"
    />
  );
}
