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
    <nav aria-label="Destination sections" className="sticky top-[var(--header-offset,var(--header-h))] z-30 border-b border-line bg-white/90 backdrop-blur transition-[top] duration-240 ease-out">
      <ul className="container-page flex sm:gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="relative flex-1 sm:flex-none">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 items-center justify-center gap-1.5 px-1 text-sm whitespace-nowrap transition-colors sm:gap-2 sm:px-4 sm:text-base",
                  active ? "text-navy" : "text-navy/60 hover:text-navy",
                )}
              >
                <Icon size={20} strokeWidth={1.5} aria-hidden />
                {label}
              </Link>
              {active && (
                <motion.span layoutId="subnav" transition={spring.snappy} className="absolute inset-x-2 bottom-0 h-0.5 bg-accent sm:inset-x-4" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
