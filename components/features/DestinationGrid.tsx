"use client";

import { MapPinOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Chip } from "@/components/ui/Chip";
import type { Destination } from "@/content/destinations";
import { duration, spring, staggerDelay } from "@/lib/motion";
import { DestinationCard } from "./DestinationCard";

export function DestinationGrid({
  destinations,
  categories,
}: {
  destinations: Destination[];
  categories: { id: string; label: string }[];
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = params.get("category") ?? "all";
  const list = active === "all" ? destinations : destinations.filter((d) => d.categories.includes(active));

  const select = (id: string) =>
    router.replace(id === "all" ? pathname : `${pathname}?category=${id}`, { scroll: false });

  return (
    <>
      <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
        {[{ id: "all", label: "All" }, ...categories].map((c) => (
          <Chip key={c.id} group="category" active={active === c.id} onClick={() => select(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {list.length} destinations shown
      </p>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-card bg-white py-16 text-center shadow-sm">
          <MapPinOff size={48} strokeWidth={1.25} aria-hidden />
          <p className="text-h3 font-serif">Nothing here yet</p>
          <p className="text-navy/65">No destinations match this category.</p>
          <Chip onClick={() => select("all")}>Show all</Chip>
        </div>
      ) : (
        <motion.ul layout className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((d, i) => (
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
      )}
    </>
  );
}
