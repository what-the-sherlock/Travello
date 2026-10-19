"use client";

import { ArrowRight, CalendarDays, ChevronDown, Compass, Landmark, MapPinned, Plane, Car, TrainFront } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import type { Details } from "@/content/details";
import { duration, ease, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MiniMap = dynamic(() => import("./MiniMap"), {
  ssr: false,
  loading: () => <div className="h-full min-h-[320px] animate-pulse rounded-card bg-tint" />,
});

const TABS = [
  { id: "attractions", label: "Attractions", icon: Landmark },
  { id: "best-time", label: "Best Time", icon: CalendarDays },
  { id: "reach", label: "How to Reach", icon: Compass },
  { id: "nearby", label: "Nearby Places", icon: MapPinned },
] as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type NearbyItem = Details["nearby"][number] & { slug?: string };
type Props = Partial<Omit<Details, "nearby">> & {
  name: string;
  center: [number, number];
  nearby: NearbyItem[];
  /** Base path for nearby links, e.g. "/india" */
  countryPath: string;
};

export function DestinationTabs(props: Props) {
  // Only show tabs that have content for this place
  const tabs = TABS.filter((t) =>
    t.id === "attractions" ? props.attractions?.length
    : t.id === "best-time" ? props.bestMonths?.length
    : t.id === "reach" ? props.howToReach
    : props.nearby.length,
  );
  const [tab, setTab] = useState(0);
  const [dir, setDir] = useState(1);

  const select = (i: number) => {
    setDir(i > tab ? 1 : -1);
    setTab(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (tab + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    select(next);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div className="mt-12">
      <div role="tablist" aria-label={`${props.name} guide`} onKeyDown={onKeyDown} className="flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "relative flex min-h-14 items-center gap-2 px-4 whitespace-nowrap transition-colors",
              tab === i ? "text-navy" : "text-navy/60 hover:text-navy",
            )}
          >
            <t.icon size={20} strokeWidth={1.5} aria-hidden />
            {t.label}
            {tab === i && (
              <motion.span layoutId="tab-underline" transition={spring.snappy} className="absolute inset-x-4 -bottom-px h-0.5 bg-navy" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={tab}
          id={`panel-${tabs[tab].id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tabs[tab].id}`}
          initial={{ opacity: 0, x: 8 * dir }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 * dir }}
          transition={{ duration: duration.base, ease: ease.out }}
          className="pt-10"
        >
          {tabs[tab].id === "attractions" && <Attractions items={props.attractions!} />}
          {tabs[tab].id === "best-time" && (
            <BestTime months={props.bestMonths!} notes={props.bestTimeNotes ?? ""} monthNotes={props.monthNotes ?? {}} />
          )}
          {tabs[tab].id === "reach" && <Reach how={props.howToReach!} />}
          {tabs[tab].id === "nearby" && (
            <NearbyList center={props.center} name={props.name} nearby={props.nearby} countryPath={props.countryPath} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Attractions({ items }: { items: Details["attractions"] }) {
  return (
    <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-4">
      {items.map((a, i) => (
        <li key={a.name} className="flex w-[78vw] shrink-0 snap-start flex-col gap-3 rounded-card bg-white p-6 shadow-sm md:w-auto">
          <span className="font-serif text-h3 text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-h3 leading-tight">{a.name}</h3>
          <p className="text-navy/65">{a.description}</p>
        </li>
      ))}
    </ul>
  );
}

function BestTime({ months, notes, monthNotes }: { months: number[]; notes: string; monthNotes: Details["monthNotes"] }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-8">
      <ol className="grid grid-cols-6 gap-2 md:grid-cols-12">
        {MONTHS.map((m, i) => {
          const n = i + 1;
          const ideal = months.includes(n);
          return (
            <li key={m} className="relative">
              <button
                type="button"
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(n)}
                onBlur={() => setHover(null)}
                onClick={() => setHover(hover === n ? null : n)}
                aria-label={`${m}: ${ideal ? "ideal" : "off-season"}. ${monthNotes[n] ?? ""}`}
                className={cn(
                  "flex h-16 w-full flex-col items-center justify-center rounded-sm text-[15px] transition-colors",
                  ideal ? "bg-navy text-white" : "bg-white text-navy/60 shadow-sm",
                )}
              >
                {m}
                {ideal && <span aria-hidden className="mt-1 size-1.5 rounded-full bg-accent" />}
              </button>
              <AnimatePresence>
                {hover === n && monthNotes[n] && (
                  <motion.span
                    role="tooltip"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration.fast }}
                    className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[180px] -translate-x-1/2 rounded-sm bg-navy-night px-3 py-2 text-center text-sm text-white shadow-lg"
                  >
                    {monthNotes[n]}
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
      <p className="max-w-[680px] text-lead text-navy/80">{notes}</p>
    </div>
  );
}

function Reach({ how }: { how: Details["howToReach"] }) {
  const rows = [
    { id: "air", label: "By air", icon: Plane, text: how.air },
    { id: "rail", label: "By rail", icon: TrainFront, text: how.rail },
    { id: "road", label: "By road", icon: Car, text: how.road },
  ];
  const [open, setOpen] = useState<string | null>("air");
  return (
    <ul className="flex max-w-[760px] flex-col gap-3">
      {rows.map((r) => {
        const isOpen = open === r.id;
        return (
          <li key={r.id} className="rounded-card bg-white shadow-sm">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : r.id)}
              className="flex min-h-16 w-full items-center gap-4 px-6 text-left"
            >
              <r.icon size={24} strokeWidth={1.5} aria-hidden />
              <span className="flex-1 font-serif text-h3 tracking-[-0.045em]">{r.label}</span>
              <ChevronDown size={20} strokeWidth={1.5} className={cn("transition-transform duration-240", isOpen && "rotate-180")} />
            </button>
            {/* grid-template-rows 0fr → 1fr for a smooth height animation */}
            <div className={cn("grid transition-[grid-template-rows] duration-240 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <p className="overflow-hidden px-6 text-navy/70">
                <span className="block pb-6">{r.text}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function NearbyList({
  center,
  name,
  nearby,
  countryPath,
}: {
  center: [number, number];
  name: string;
  nearby: NearbyItem[];
  countryPath: string;
}) {
  const [focus, setFocus] = useState<[number, number]>(center);
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <ul className="flex flex-col gap-3">
        {nearby.map((n) => (
          <li key={n.name}>
            <button
              type="button"
              onMouseEnter={() => setFocus(n.coordinates)}
              onFocus={() => setFocus(n.coordinates)}
              onClick={() => setFocus(n.coordinates)}
              className="flex w-full items-center justify-between gap-4 rounded-card bg-white px-6 py-5 text-left shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
            >
              <span className="font-serif text-h3 tracking-[-0.045em]">{n.name}</span>
              <span className="text-[15px] text-navy/60">{n.distance}</span>
            </button>
            {n.slug && (
              <Link href={`${countryPath}/${n.slug}`} className="ml-6 inline-flex min-h-11 items-center gap-1 text-[15px] underline-offset-4 hover:underline">
                View {n.name} <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="h-[360px] overflow-hidden rounded-card">
        <MiniMap
          focus={focus}
          pins={[{ name, coordinates: center, main: true }, ...nearby.map((n) => ({ name: n.name, coordinates: n.coordinates }))]}
        />
      </div>
    </div>
  );
}
