"use client";

import { Clock, MapPin, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { destinations, type Country } from "@/content/destinations";
import { details } from "@/content/details";
import { countryName } from "@/lib/data";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const RECENT_KEY = "ige-recent-searches";

// Searchable text per destination: name, region, tag, categories and attraction names.
const INDEX = destinations.map((d) => ({
  d,
  text: [d.name, d.region, d.tag, ...d.categories, ...(details[d.slug]?.attractions ?? []).map((a) => a.name)]
    .join(" ")
    .toLowerCase(),
}));

function readRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** Ctrl/⌘K search over destinations, attractions and categories. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = () => {
      setRecent(readRecent());
      setQ("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("open-search", show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-search", show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return INDEX.filter(({ text }) => words.every((w) => text.includes(w))).map((x) => x.d);
  }, [q]);

  const go = (slug: string) => {
    const d = destinations.find((x) => x.slug === slug);
    if (!d) return;
    const next = [d.name, ...recent.filter((r) => r !== d.name)].slice(0, 5);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
    setOpen(false);
    router.push(`/${d.country}/${d.slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === "Enter" && results[active]) go(results[active].slug);
  };

  const groups = (["india", "germany"] as Country[])
    .map((c) => ({ c, items: results.filter((d) => d.country === c) }))
    .filter((g) => g.items.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-navy-night/40 px-4 pt-[12vh] backdrop-blur-[4px]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search destinations"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: duration.base, ease: ease.out }}
            onAnimationComplete={() => input.current?.focus()}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] overflow-hidden rounded-card bg-white shadow-lg"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search size={20} strokeWidth={1.5} aria-hidden />
              <input
                ref={input}
                autoFocus
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search places, sights or themes…"
                aria-label="Search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `opt-${results[active].slug}` : undefined}
                className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-navy/40"
              />
              <kbd className="rounded border border-line px-1.5 text-xs text-navy/50">Esc</kbd>
            </div>

            <div id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {!q && recent.length > 0 && (
                <div className="p-2">
                  <p className="px-2 pb-2 text-sm text-navy/50">Recent</p>
                  {recent.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setQ(r)}
                      className="flex min-h-11 w-full items-center gap-3 rounded-sm px-2 text-left hover:bg-mist"
                    >
                      <Clock size={16} strokeWidth={1.5} aria-hidden /> {r}
                    </button>
                  ))}
                </div>
              )}
              {q && results.length === 0 && <p className="p-6 text-center text-navy/60">No matches for &ldquo;{q}&rdquo;</p>}
              {groups.map((g) => (
                <div key={g.c} className="p-2">
                  <p className="flex items-center gap-2 px-2 pb-2 text-sm text-navy/50">
                    <span aria-hidden className={cn("h-2.5 w-4 rounded-[2px]", g.c === "india" ? "bg-[linear-gradient(#FF9933_33%,#fff_33%_66%,#138808_66%)]" : "bg-[linear-gradient(#000_33%,#DD0000_33%_66%,#FFCE00_66%)]")} />
                    {countryName(g.c)}
                  </p>
                  {g.items.map((d) => {
                    const i = results.indexOf(d);
                    return (
                      <button
                        key={d.slug}
                        id={`opt-${d.slug}`}
                        role="option"
                        aria-selected={i === active}
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(d.slug)}
                        className={cn("flex min-h-12 w-full items-center gap-3 rounded-sm px-2 text-left", i === active && "bg-mist")}
                      >
                        <MapPin size={16} strokeWidth={1.5} aria-hidden />
                        <span className="font-serif text-lg tracking-[-0.03em]">{d.name}</span>
                        <span className="text-sm text-navy/50">{d.tag}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
