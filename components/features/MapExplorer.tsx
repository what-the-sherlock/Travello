"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { destinations, getDestination, type Country } from "@/content/destinations";
import { details } from "@/content/details";
import { countryName, isRemote } from "@/lib/data";
import { cn } from "@/lib/utils";

const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-tint" />,
});

export type Layer = "destinations" | "nearby";
export const LAYERS: { id: Layer; label: string; color: string }[] = [
  { id: "destinations", label: "Destinations", color: "bg-accent" },
  { id: "nearby", label: "Nearby places", color: "bg-navy/60" },
];

export function MapExplorer() {
  const focusSlug = useSearchParams().get("focus");
  const focused = focusSlug ? getDestination(focusSlug) : undefined;
  const [country, setCountry] = useState<Country>(focused?.country ?? "india");
  const [layers, setLayers] = useState<Layer[]>(["destinations"]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(focused?.slug ?? null);

  const list = destinations.filter((d) => d.country === country);
  const nearby = list.flatMap((d) => (details[d.slug]?.nearby ?? []).map((n) => ({ ...n, of: d.name })));

  return (
    <div className="flex h-[calc(100svh-var(--header-h))] flex-col-reverse lg:flex-row">
      <aside className="flex h-[45%] flex-col border-t border-line bg-white lg:h-full lg:w-[380px] lg:border-t-0 lg:border-r">
        <div className="flex flex-col gap-4 border-b border-line p-5">
          <div role="group" aria-label="Country" className="flex rounded-full bg-tint p-1">
            {(["india", "germany"] as Country[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={country === c}
                onClick={() => {
                  setCountry(c);
                  setSelected(null);
                }}
                className={cn(
                  "min-h-11 flex-1 rounded-full transition-colors",
                  country === c ? "bg-navy text-white" : "text-navy/70",
                )}
              >
                {countryName(c)}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Map layers" className="flex flex-wrap gap-4 text-[15px]">
            {LAYERS.map((l) => (
              <label key={l.id} className="flex min-h-11 cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={layers.includes(l.id)}
                  onChange={() =>
                    setLayers((ls) => (ls.includes(l.id) ? ls.filter((x) => x !== l.id) : [...ls, l.id]))
                  }
                  className="size-4 accent-[var(--navy)]"
                />
                <span aria-hidden className={cn("size-3 rounded-full", l.color)} />
                {l.label}
              </label>
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto p-3">
          {list.map((d) => (
            <li key={d.slug}>
              <button
                type="button"
                onMouseEnter={() => setHovered(d.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(d.slug)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected(d.slug)}
                aria-pressed={selected === d.slug}
                className={cn(
                  "flex w-full items-center gap-4 rounded-card p-2 text-left transition-colors",
                  selected === d.slug || hovered === d.slug ? "bg-mist" : "",
                )}
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-sm">
                  <Image src={d.image.thumb ?? d.image.src} unoptimized={isRemote(d.image.src)} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-serif text-xl tracking-[-0.045em]">{d.name}</span>
                  <span className="text-sm text-navy/60">{d.tag}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="relative flex-1">
        <MapCanvas
          country={country}
          destinations={layers.includes("destinations") ? list : []}
          nearby={layers.includes("nearby") ? nearby : []}
          hovered={hovered}
          setHovered={setHovered}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}
