import type { MetadataRoute } from "next";
import { destinations } from "@/content/destinations";
import { getFullDestination } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/explore", "/india", "/germany", "/map", "/about"].map((p) => ({ url: `${SITE_URL}${p}` }));
  const places = destinations.flatMap((d) => {
    const full = getFullDestination(d.slug)!;
    const base = `${SITE_URL}/${d.country}/${d.slug}`;
    return [
      { url: base },
      ...(full.videos.length ? [{ url: `${base}/videos` }] : []),
      ...(full.gallery.length ? [{ url: `${base}/gallery` }] : []),
    ];
  });
  return [...pages, ...places];
}
