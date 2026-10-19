import { Compass, Heart, Map, PlayCircle, Plane } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";
import { DrawnUnderline } from "./DrawnUnderline";

const FEATURES = [
  { icon: Compass, label: "Discover Destinations" },
  { icon: PlayCircle, label: "Watch Video Guides" },
  { icon: Map, label: "Explore on Map" },
  { icon: Heart, label: "Save Your Favorites" },
  { icon: Plane, label: "Enjoy the Journey" },
];

const LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/india", label: "India" },
  { href: "/germany", label: "Germany" },
  { href: "/map", label: "Map" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 border-b border-line py-10 sm:grid-cols-5 sm:gap-x-3 [&>li:last-child]:col-span-2 [&>li:last-child]:justify-center sm:[&>li:last-child]:col-span-1 sm:[&>li:last-child]:justify-start">
          {FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm font-medium text-navy sm:flex-col sm:text-center lg:flex-row lg:text-left">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-tint">
                <Icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-6 py-12 text-center">
          <p className="relative font-serif text-h2 text-navy">
            Your next destination is just a click away!
            <DrawnUnderline />
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-11 items-center px-2 text-navy/75 hover:text-navy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 text-sm text-navy/60 sm:flex-row">
          <Logo />
          <p className="text-center sm:text-right">A travel discovery project. Photos from Wikimedia Commons.</p>
        </div>
      </div>
    </footer>
  );
}
