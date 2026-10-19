"use client";

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CursorArrow } from "@/components/ui/CursorArrow";
import { featured } from "@/content/destinations";
import { duration, ease } from "@/lib/motion";

/** Travelo's hero "tour" slideshow: one white card at a time with prev/next arrows. */
export function HeroCards() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const d = featured[i];
  const go = (step: number) => {
    setDir(step);
    setI((n) => (n + step + featured.length) % featured.length);
  };

  return (
    <div className="flex w-[360px] flex-col items-end gap-3">
      <div className="relative h-[320px] w-full overflow-hidden rounded-panel">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={d.slug}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="absolute inset-0"
          >
            <Link
              href={`/${d.country}/${d.slug}`}
              className="flex h-full flex-col rounded-panel bg-white p-3 pb-6 shadow-sm"
            >
              <CursorArrow className="relative flex-1 overflow-hidden rounded-[22px]">
                <Image src={d.image.src} alt={d.image.alt} fill sizes="336px" className="object-cover" />
              </CursorArrow>
              <div className="px-3 pt-4">
                <p className="font-serif text-h3 leading-none tracking-[-0.045em] text-navy">{d.name}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[15px] text-navy/70">
                  <MapPin size={16} strokeWidth={1.5} aria-hidden />
                  {d.region}, {d.country === "india" ? "India" : "Germany"}
                </p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-2">
        <ArrowButton label="Previous destination" onClick={() => go(-1)}>
          <ChevronLeft size={20} strokeWidth={1.5} />
        </ArrowButton>
        <ArrowButton label="Next destination" onClick={() => go(1)}>
          <ChevronRight size={20} strokeWidth={1.5} />
        </ArrowButton>
      </div>
    </div>
  );
}

export function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-[transform,background-color] duration-150 hover:bg-white/20 active:scale-[0.97]"
    >
      {children}
    </button>
  );
}
