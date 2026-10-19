"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/WordReveal";
import { appear, duration, ease, spring } from "@/lib/motion";
import heroImg from "@/public/images/travelo/hero.webp";
import { HeroCards } from "./HeroCards";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-night">
      {/* Background settles from 1.1× to 1× on load, as in Travelo */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: duration.hero * 2, ease: ease.out }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={heroImg}
          alt="Aerial view of two wooden boats anchored in turquoise water beside a small palm-covered island"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-night/45 via-transparent to-navy-night/25" />
      </motion.div>

      {/* Top row: copy left, destination card right */}
      <div className="container-page flex flex-1 flex-col gap-10 pt-[calc(var(--header-h)+48px)] lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-150">
          <WordReveal as="h1" onMount text="Discover the Beauty of India & Germany" className="text-display text-white" />
          <motion.p {...appear(0.6)} className="mt-4.5 max-w-122.5 text-lead text-white/85">
            Explore palaces and ghats, castles and forests, with honest guides, video walkthroughs and maps for
            fourteen of the two countries&rsquo; most loved places.
          </motion.p>
          <motion.div {...appear(0.75)} className="mt-9">
            <ButtonLink href="/explore">Start exploring</ButtonLink>
          </motion.div>
        </div>

        <motion.div {...appear(0.9)} className="hidden md:block">
          <HeroCards />
        </motion.div>
      </div>

      {/* Giant brand wordmark across the bottom edge */}
      <motion.p
        aria-hidden
        initial={{ y: "40%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring.travelo, delay: 0.4 }}
        className="container-page mt-10 text-center font-sans text-[clamp(4rem,19vw,17rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-white select-none"
      >
        TRAVELO
      </motion.p>
    </section>
  );
}
