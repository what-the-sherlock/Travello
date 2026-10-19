import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { CursorArrow } from "@/components/ui/CursorArrow";
import type { Destination } from "@/content/destinations";
import { isRemote } from "@/lib/data";
import { HeartButton } from "./HeartButton";

/** Grid card. The image shares a view-transition name with the detail hero so it morphs on navigation. */
export function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link href={`/${d.country}/${d.slug}`} className="group block">
      <CursorArrow className="relative aspect-[4/3] overflow-hidden rounded-card bg-tint">
        <ViewTransition name={`dest-${d.slug}`} share="morph" default="none">
          <Image
            src={d.image.thumb ?? d.image.src}
            unoptimized={isRemote(d.image.src)}
            alt={d.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-450 ease-out group-hover:scale-[1.03]"
          />
        </ViewTransition>
        <span className="absolute top-4 left-4 rounded-full bg-white/55 px-3.5 py-1.5 text-[15px] text-navy-night backdrop-blur-[10px]">
          {d.tag}
        </span>
        <span className="absolute top-3 right-3 z-20">
          <HeartButton slug={d.slug} name={d.name} />
        </span>
      </CursorArrow>
      <div className="mt-4 flex items-baseline gap-3">
        <span aria-hidden className="size-1.5 shrink-0 translate-y-[-3px] rounded-full bg-accent" />
        <h3 className="text-h3 leading-none">{d.name}</h3>
        {d.region !== "India" && d.region !== "Germany" && <span className="text-[15px] text-navy/60">{d.region}</span>}
      </div>
    </Link>
  );
}
