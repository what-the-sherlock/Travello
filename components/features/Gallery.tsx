"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/data";
import { duration, ease, spring } from "@/lib/motion";

// Wikimedia serves standard thumbnail widths; 960px is plenty for grid tiles.
const small = (src: string) => src.replace("/1920px-", "/960px-");

/** Even 4:3 grid + lightbox (keys, swipe, Esc / swipe-down to close). */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      {/* 2 columns when that fills rows evenly (2 or 4 photos), otherwise 3 */}
      <ul className={`grid gap-4 sm:grid-cols-2 ${images.length % 2 === 0 && images.length <= 4 ? "" : "lg:grid-cols-3"}`}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${i + 1}: ${img.caption}`}
              className="group block aspect-[4/3] w-full overflow-hidden rounded-card bg-tint"
            >
              <motion.img
                layoutId={`photo-${i}`}
                src={small(img.src)}
                alt={img.caption}
                width={img.width}
                height={img.height}
                loading="lazy"
                className="size-full object-cover transition-transform duration-450 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-navy/60">Photos from Wikimedia Commons; credits are shown in the viewer.</p>

      <AnimatePresence>
        {open !== null && <Lightbox images={images} index={open} setIndex={setOpen} />}
      </AnimatePresence>
    </>
  );
}

function Lightbox({
  images,
  index,
  setIndex,
}: {
  images: GalleryImage[];
  index: number;
  setIndex: (i: number | null) => void;
}) {
  const img = images[index];
  const go = useCallback(
    (step: number) => setIndex((index + step + images.length) % images.length),
    [index, images.length, setIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, setIndex]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.base }}
      className="fixed inset-0 z-50 flex flex-col bg-navy-night/95"
      onClick={() => setIndex(null)}
    >
      <div className="flex items-center justify-between p-4 text-white" onClick={(e) => e.stopPropagation()}>
        <span>
          {index + 1} / {images.length}
        </span>
        <button type="button" autoFocus aria-label="Close" onClick={() => setIndex(null)} className="flex size-11 items-center justify-center rounded-full bg-white/10">
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
        <motion.img
          key={img.src}
          layoutId={`photo-${index}`}
          src={img.src}
          alt={img.caption}
          transition={spring.soft}
          drag
          dragSnapToOrigin
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (info.offset.y > 120) setIndex(null);
            else if (info.offset.x < -80) go(1);
            else if (info.offset.x > 80) go(-1);
          }}
          onDoubleClick={(e) => e.currentTarget.classList.toggle("scale-[1.8]")}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full touch-none rounded-sm object-contain transition-transform duration-240"
        />
        <NavButton side="left" onClick={() => go(-1)} />
        <NavButton side="right" onClick={() => go(1)} />
      </div>

      <motion.p
        key={`cap-${index}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.base, ease: ease.out }}
        className="p-4 text-center text-sm text-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        {img.caption}
        <span className="block text-white/50">
          {img.credit && `${img.credit} · `}
          {img.license} ·{" "}
          <a href={img.page} target="_blank" rel="noreferrer" className="underline">
            source
          </a>
        </span>
      </motion.p>
    </motion.div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:flex ${side === "left" ? "left-4" : "right-4"}`}
    >
      <Icon size={24} strokeWidth={1.5} />
    </button>
  );
}
