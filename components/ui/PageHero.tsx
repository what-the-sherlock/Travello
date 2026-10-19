import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { WordReveal } from "./WordReveal";

/** Compact image banner used by country, about and sub-pages. */
export function PageHero({
  title,
  kicker,
  image,
  back,
  children,
  imageWrap,
}: {
  title: string;
  kicker?: string;
  image: { src: string; alt: string };
  back?: { href: string; label: string };
  children?: ReactNode;
  /** Optional wrapper around the image, e.g. a ViewTransition */
  imageWrap?: (img: ReactNode) => ReactNode;
}) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority
      sizes="100vw"
      unoptimized={image.src.startsWith("http")}
      className="object-cover"
    />
  );
  return (
    <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-navy-night md:min-h-[520px]">
      <div className="absolute inset-0 -z-10">
        {imageWrap ? imageWrap(img) : img}
        <div className="absolute inset-0 bg-linear-to-t from-navy-night/80 via-navy-night/20 to-navy-night/40" />
      </div>
      <div className="container-page pt-[calc(var(--header-h)+40px)] pb-10 text-white md:pb-14">
        {back && (
          <Link
            href={back.href}
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-white/85 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} strokeWidth={1.5} aria-hidden />
            {back.label}
          </Link>
        )}
        {kicker && <p className="mb-3 text-white/80">{kicker}</p>}
        <WordReveal as="h1" onMount text={title} className="text-display text-white" />
        {children}
      </div>
    </section>
  );
}
