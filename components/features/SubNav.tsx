"use client";

import { BookOpen, Images, Map, PlayCircle } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Sticky links between a destination's guide, videos, gallery and the map. */
export function SubNav({
  base,
  slug,
  hasVideos,
  hasGallery,
}: {
  base: string;
  slug: string;
  hasVideos: boolean;
  hasGallery: boolean;
}) {
  const pathname = usePathname();
  const links = [
    { href: base, label: "Guide", icon: BookOpen },
    ...(hasVideos ? [{ href: `${base}/videos`, label: "Videos", icon: PlayCircle }] : []),
    ...(hasGallery ? [{ href: `${base}/gallery`, label: "Gallery", icon: Images }] : []),
    { href: `/map?focus=${slug}`, label: "Map", icon: Map },
  ];
  return (
    <nav aria-label="Destination sections" className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <ul className="container-page flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="relative">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 items-center gap-2 px-4 whitespace-nowrap transition-colors",
                  active ? "text-navy" : "text-navy/60 hover:text-navy",
                )}
              >
                <Icon size={20} strokeWidth={1.5} aria-hidden />
                {label}
              </Link>
              {active && (
                <motion.span layoutId="subnav" transition={spring.snappy} className="absolute inset-x-4 bottom-0 h-0.5 bg-accent" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
