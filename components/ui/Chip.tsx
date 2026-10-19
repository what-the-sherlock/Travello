"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Pill button. Pass the same `group` to a set of chips so the active background slides between them. */
export function Chip({
  active,
  group,
  onClick,
  children,
}: {
  active?: boolean;
  group?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative min-h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-colors duration-150 active:scale-[0.97]",
        active ? "text-white" : "border border-line bg-surface text-navy/75 hover:text-navy",
      )}
    >
      {active && (
        <motion.span
          layoutId={group ? `chip-${group}` : undefined}
          transition={spring.snappy}
          className="absolute inset-0 rounded-full bg-navy"
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}
