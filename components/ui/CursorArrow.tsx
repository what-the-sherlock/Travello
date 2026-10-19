"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState, type ReactNode } from "react";
import { spring } from "@/lib/motion";

/**
 * Travelo card hover: an orange arrow disc follows the pointer over the image.
 * Pointer-only (hover-capable devices); on touch it simply never appears.
 */
export function CursorArrow({ children, className }: { children: ReactNode; className?: string }) {
  const [over, setOver] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);

  return (
    <div
      className={className}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.jump(e.clientX - r.left);
        y.jump(e.clientY - r.top);
        setOver(true);
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setOver(false)}
    >
      {children}
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none absolute top-0 left-0 z-10">
        <AnimatePresence>
          {over && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={spring.snappy}
              className="-mt-[41px] -ml-[41px] flex size-[82px] items-center justify-center rounded-full bg-accent text-white"
            >
              <ArrowUpRight size={24} strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
