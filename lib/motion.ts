// Single source of truth for motion values. Use these instead of ad-hoc numbers.
// Travelo-derived values are taken from the reference site's Framer config (see DESIGN.md).
import type { Transition } from "motion/react";

export const duration = {
  fast: 0.15,
  base: 0.24,
  slow: 0.45,
  hero: 0.9,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const spring = {
  snappy: { type: "spring", stiffness: 420, damping: 32 },
  soft: { type: "spring", stiffness: 180, damping: 24 },
  /** Travelo text/appear spring: heavily damped, no overshoot. */
  travelo: { type: "spring", stiffness: 200, damping: 80, mass: 1 },
} as const satisfies Record<string, Transition>;

export const STAGGER = 0.05;
export const MAX_STAGGERED = 8;

/** Delay for the i-th sibling; items past MAX_STAGGERED appear together. */
export const staggerDelay = (i: number) => Math.min(i, MAX_STAGGERED) * STAGGER;

/** Travelo word-by-word reveal: each word un-blurs and rises 20px. */
export const WORD_STAGGER = 0.06;
export const wordHidden = { opacity: 0, y: 20, filter: "blur(8px)" };
export const wordShown = { opacity: 1, y: 0, filter: "blur(0px)" };

/** Travelo block appear (paragraphs, buttons): fade + 30px rise. */
export const appear = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring.travelo, delay },
  }) as const;

/** Same as `appear` but triggered once at 20% in view. */
export const reveal = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { ...spring.travelo, delay },
  }) as const;

/** Press feedback for every clickable. */
export const press = {
  whileTap: { scale: 0.97 },
  transition: spring.snappy,
} as const;
