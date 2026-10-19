"use client";

import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { favorites, useFavorites } from "@/lib/favorites";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DOTS = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2);

/** Save/remove a destination. Filling the heart fires a small 6-dot burst. */
export function HeartButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const saved = useFavorites().includes(slug);
  const [burst, setBurst] = useState(0);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = favorites.toggle(slug);
    if (nowSaved) {
      setBurst((b) => b + 1);
      toast(`${name} saved to favorites`, () => favorites.remove(slug));
    } else {
      toast(`${name} removed`, () => favorites.add(slug));
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full bg-white/55 text-navy backdrop-blur-[10px] transition-transform duration-150 active:scale-[0.97]",
        className,
      )}
    >
      <motion.span key={String(saved)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={spring.snappy}>
        <Heart size={20} strokeWidth={1.5} className={cn(saved && "fill-accent text-accent")} />
      </motion.span>
      <AnimatePresence>
        {burst > 0 &&
          DOTS.map((a, i) => (
            <motion.span
              key={`${burst}-${i}`}
              aria-hidden
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(a) * 20, y: Math.sin(a) * 20, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="pointer-events-none absolute size-1.5 rounded-full bg-accent"
            />
          ))}
      </AnimatePresence>
    </button>
  );
}
