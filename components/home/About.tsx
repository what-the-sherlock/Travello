"use client";

import { MapPin, PlayCircle, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { countries } from "@/content/destinations";
import { reveal, staggerDelay } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="section-y bg-mist">
      <div className="container-page flex flex-col items-center gap-[60px]">
        <div className="flex max-w-[710px] flex-col items-center gap-8 text-center">
          <SectionLabel>about us</SectionLabel>
          <ScrollWords
            className="text-[clamp(1.75rem,1.4rem+1.3vw,2.5rem)] leading-[1.12] text-navy"
            text="Travelo brings together the monuments, landscapes and everyday culture of India and Germany, with clear guides, video walkthroughs and maps to help you decide where to go first."
          />
          <motion.div {...reveal()}>
            <ButtonLink href="/about" variant="dark">
              More about us
            </ButtonLink>
          </motion.div>
        </div>

        <ul className="grid w-full gap-4 sm:grid-cols-3 lg:max-w-[880px]">
          <ValueCard i={0} icon={<DropPin />} title="Explore New Places">
            Over a hundred destinations, from Mughal tombs and tiger reserves to Bavarian castles and Alpine lakes.
          </ValueCard>
          <ValueCard i={1} title="Learn Local Culture" image={countries.india.image} icon={<WavingPerson />}>
            Festivals, food and the stories behind each place, so you arrive knowing what makes it matter.
          </ValueCard>
          <ValueCard i={2} icon={<NudgePlay />} title="Watch Video Guides">
            Short video walkthroughs from travellers on the ground, so you can see a place before you go.
          </ValueCard>
        </ul>
      </div>
    </section>
  );
}

function ValueCard({
  i,
  icon,
  title,
  image,
  children,
}: {
  i: number;
  icon: ReactNode;
  title: string;
  image?: { src: string; alt: string };
  children: string;
}) {
  const dark = Boolean(image);
  return (
    <motion.li
      {...reveal(staggerDelay(i))}
      className={`group relative flex min-h-[220px] w-full flex-col justify-end gap-6 overflow-hidden rounded-card p-6 shadow-sm sm:min-h-[340px] sm:gap-10 sm:p-5 lg:p-[26px] ${
        dark ? "text-white" : "bg-white text-navy"
      }`}
    >
      {image && (
        <>
          <Image src={image.src} alt="" fill sizes="280px" className="-z-0 object-cover" />
          {/* Travelo's blurred bottom mask under the text */}
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent to-[rgba(1,5,23,0.55)] backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
        </>
      )}
      <span className="relative mb-auto">{icon}</span>
      <div className="relative flex flex-col gap-2.5">
        <h3 className="text-h3 leading-tight">{title}</h3>
        <p className={dark ? "text-white/75" : "text-navy/65"}>{children}</p>
      </div>
    </motion.li>
  );
}

/* Icon micro-animations on card hover, each under 400ms */
const iconProps = { size: 48, strokeWidth: 1.25, "aria-hidden": true } as const;

function DropPin() {
  return (
    <span className="block transition-transform duration-[350ms] ease-out group-hover:translate-y-1.5">
      <MapPin {...iconProps} />
    </span>
  );
}

function NudgePlay() {
  return (
    <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
      <PlayCircle {...iconProps} />
    </span>
  );
}

function WavingPerson() {
  return (
    <span className="block origin-bottom transition-transform duration-[350ms] ease-out group-hover:-rotate-12">
      <Users {...iconProps} />
    </span>
  );
}
