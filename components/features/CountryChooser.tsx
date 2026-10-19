"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, ViewTransition } from "react";
import { byCountry, countries, type Country } from "@/content/destinations";
import { reveal, spring, staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MAX_TILT = 4;

export function CountryChooser() {
  const [hovered, setHovered] = useState<Country | null>(null);

  return (
    <ul className="grid w-full gap-5 md:grid-cols-2">
      {(Object.keys(countries) as Country[]).map((c, i) => (
        <motion.li key={c} {...reveal(staggerDelay(i))}>
          <motion.div animate={{ opacity: hovered && hovered !== c ? 0.7 : 1 }}>
            <CountryCard country={c} onHover={(on) => setHovered(on ? c : null)} />
          </motion.div>
        </motion.li>
      ))}
    </ul>
  );
}

function CountryCard({ country, onHover }: { country: Country; onHover: (on: boolean) => void }) {
  const data = countries[country];
  const count = byCountry(country).length;
  const rx = useSpring(useMotionValue(0), spring.soft);
  const ry = useSpring(useMotionValue(0), spring.soft);

  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}>
      <Link
        href={`/${country}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-panel sm:aspect-[5/6]"
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => {
          onHover(false);
          rx.set(0);
          ry.set(0);
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * MAX_TILT);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * MAX_TILT);
        }}
      >
        <ViewTransition name={`country-${country}`} share="morph" default="none">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-450 ease-out group-hover:scale-[1.04]"
          />
        </ViewTransition>
        <div className="absolute inset-0 bg-linear-to-t from-navy-night/80 via-navy-night/10 to-transparent" />
        <span className="absolute top-5 left-5 rounded-full bg-white/55 px-3.5 py-1.5 text-[15px] text-navy-night backdrop-blur-[10px]">
          {count} destinations
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white md:p-8">
          <div>
            <h2 className="text-display leading-none">{data.name}</h2>
            <p className="mt-3 max-w-[340px] text-white/85">{data.blurb}</p>
          </div>
          <span
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-full",
              country === "india" ? "bg-navy text-white" : "bg-white text-navy",
            )}
          >
            <ArrowUpRight
              size={24}
              strokeWidth={1.5}
              className="transition-transform duration-450 ease-out group-hover:rotate-45"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
