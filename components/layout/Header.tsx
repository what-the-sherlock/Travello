"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavorites } from "@/lib/favorites";
import { duration, ease, spring, staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/india", label: "India" },
  { href: "/germany", label: "Germany" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];

export const openSearch = () => window.dispatchEvent(new Event("open-search"));

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const favs = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Remember which page the menu was opened on; navigating away closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const setMenuOpen = (open: boolean) => setMenuPath(open ? pathname : null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only over the home hero
  const solid = scrolled || pathname !== "/";

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : 0 }}
        transition={{ duration: duration.base, ease: ease.out }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-240",
          solid ? "border-line bg-surface shadow-sm" : "border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <Logo light={!solid} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center px-3 text-[17px] transition-colors duration-150",
                        solid ? (active ? "text-navy" : "text-navy/75 hover:text-navy") : "text-white/90 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={spring.snappy}
                        className={cn("absolute inset-x-3 bottom-1.5 h-px", solid ? "bg-navy" : "bg-white")}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={cn("flex items-center gap-1", solid ? "text-navy" : "text-white")}>
            <IconButton label="Search destinations (Ctrl K)" onClick={openSearch}>
              <Search size={20} strokeWidth={1.5} />
            </IconButton>
            <Link
              href="/favorites"
              aria-label={`Favorites, ${favs.length} saved`}
              className="relative flex size-11 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.97]"
            >
              <Heart size={20} strokeWidth={1.5} />
              <AnimatePresence>
                {favs.length > 0 && (
                  <motion.span
                    key={favs.length}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={spring.snappy}
                    className="absolute top-1 right-1 flex size-[18px] items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white"
                  >
                    {favs.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <ButtonLink href="/explore" variant={solid ? "dark" : "light"} className="ml-2 hidden lg:inline-flex">
              Start exploring
            </ButtonLink>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 flex size-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  animate={menuOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={spring.snappy}
                  className={cn("absolute top-0 left-0 h-[1.5px] w-5", menuOpen ? "bg-navy" : "bg-current")}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute top-1.5 left-0 h-[1.5px] w-5 bg-current"
                />
                <motion.span
                  animate={menuOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={spring.snappy}
                  className={cn("absolute top-3 left-0 h-[1.5px] w-5", menuOpen ? "bg-navy" : "bg-current")}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-navy-night/50 lg:hidden"
            />
            <motion.nav
              aria-label="Mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: duration.slow, ease: ease.out }}
              className="fixed inset-y-0 right-0 z-40 w-[min(320px,85vw)] bg-surface px-6 pt-24 shadow-lg lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + staggerDelay(i), duration: duration.base, ease: ease.out }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex min-h-12 items-center font-serif text-3xl tracking-[-0.045em]",
                        isActive(pathname, item.href) ? "text-navy" : "text-navy/75",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.97]"
    >
      {children}
    </button>
  );
}
