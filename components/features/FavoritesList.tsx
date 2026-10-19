"use client";

import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { getDestination } from "@/content/destinations";
import { useFavorites } from "@/lib/favorites";
import { duration, spring, staggerDelay } from "@/lib/motion";
import { DestinationCard } from "./DestinationCard";

export function FavoritesList() {
  const saved = useFavorites()
    .map((s) => getDestination(s))
    .filter((d) => d !== undefined);

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card bg-white px-6 py-16 text-center shadow-sm">
        <Heart size={48} strokeWidth={1.25} aria-hidden />
        <p className="font-serif text-h3">Nothing saved yet</p>
        <p className="max-w-[400px] text-navy/65">Tap the heart on any destination to keep it here for later.</p>
        <ButtonLink href="/explore" variant="dark" className="mt-2">
          Find destinations
        </ButtonLink>
      </div>
    );
  }

  return (
    <motion.ul layout className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {saved.map((d, i) => (
          <motion.li
            key={d.slug}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { ...spring.travelo, delay: staggerDelay(i) } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: duration.fast } }}
          >
            <DestinationCard d={d} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
