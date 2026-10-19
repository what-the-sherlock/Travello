"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CursorArrow } from "@/components/ui/CursorArrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal } from "@/components/ui/WordReveal";
import { featured } from "@/content/destinations";
import { reveal } from "@/lib/motion";
import { ArrowButton } from "./HeroCards";

/** Travelo "Featured tours": dark section with a snap-scrolling gallery of large cards. */
export function Featured() {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: number) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 22), behavior: "smooth" });
  };

  return (
    <section className="section-y overflow-hidden bg-navy-night text-white">
      <div className="container-page flex flex-col items-center gap-[50px]">
        <div className="flex max-w-[640px] flex-col items-center gap-6 text-center">
          <SectionLabel light>featured destinations</SectionLabel>
          <WordReveal text="Explore Our Most Popular Destinations" className="text-h2 text-white" />
          <motion.p {...reveal(0.2)} className="text-lead text-white/85">
            Hand-picked places from both countries, each with a guide, a gallery and a video walkthrough.
          </motion.p>
        </div>

        <div className="w-screen">
          <ul
            ref={track}
            className="flex snap-x snap-mandatory gap-[22px] overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]"
            style={{ paddingInline: "calc(50% - min(410px, 42.5vw))" }}
          >
            {featured.map((d) => (
              <li key={d.slug} className="w-[min(820px,85vw)] shrink-0 snap-center">
                <Link href={`/${d.country}/${d.slug}`} className="group block">
                  <CursorArrow className="relative aspect-[16/10] overflow-hidden rounded-card">
                    <Image
                      src={d.image.src}
                      alt={d.image.alt}
                      fill
                      sizes="(min-width: 1024px) 820px, 85vw"
                      className="object-cover transition-transform duration-450 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/55 px-3.5 py-1.5 text-[15px] text-navy-night backdrop-blur-[10px]">
                      {d.tag}
                    </span>
                  </CursorArrow>
                  <p className="mt-4 flex items-center gap-3 font-serif text-h3 tracking-[-0.045em]">
                    <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                    {d.name}
                    <span className="font-sans text-[15px] tracking-normal text-white/60">
                      {d.country === "india" ? "India" : "Germany"}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center gap-2.5">
            <ArrowButton label="Previous destinations" onClick={() => scroll(-1)}>
              <ChevronLeft size={20} strokeWidth={1.5} />
            </ArrowButton>
            <ArrowButton label="Next destinations" onClick={() => scroll(1)}>
              <ChevronRight size={20} strokeWidth={1.5} />
            </ArrowButton>
          </div>
        </div>

        <motion.div
          {...reveal()}
          className="flex w-full flex-col items-center gap-6 border-t border-white/15 pt-10 md:flex-row md:justify-between"
        >
          <p className="max-w-[420px] text-center text-lead text-white/85 md:text-left">
            Every destination comes with what to see, when to go and how to get there.
          </p>
          <ButtonLink href="/explore">See all destinations</ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
