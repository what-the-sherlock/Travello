"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// reducedMotion="user": Motion swaps transforms for fades when the OS asks for reduced motion.
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
