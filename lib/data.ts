import { details, type Details, type Nearby } from "@/content/details";
import { destinations, getDestination, type Country, type Destination } from "@/content/destinations";
import media from "@/content/media.json";

export type Video = { youtubeId: string; title: string; duration: string; channel: string };
export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  caption: string;
  credit: string;
  license: string;
  page: string;
};

const mediaBySlug = media as Record<string, { videos: Video[]; gallery: GalleryImage[] }>;

/** Great-circle distance in km. */
function km([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) {
  const r = Math.PI / 180;
  const a =
    Math.sin(((lat2 - lat1) * r) / 2) ** 2 +
    Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lng2 - lng1) * r) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

/** The three closest other places in our own data, for places without hand-written nearby lists. */
function computeNearby(d: Destination): (Nearby & { slug: string })[] {
  return destinations
    .filter((o) => o.slug !== d.slug && o.country === d.country)
    .map((o) => ({ o, dist: km(d.coordinates, o.coordinates) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3)
    .map(({ o, dist }) => ({ name: o.name, slug: o.slug, distance: `${Math.round(dist)} km`, coordinates: o.coordinates }));
}

export type FullDestination = Destination &
  Partial<Omit<Details, "nearby">> & {
    nearby: (Nearby & { slug?: string })[];
    videos: Video[];
    gallery: GalleryImage[];
  };

export function getFullDestination(slug: string): FullDestination | undefined {
  const d = getDestination(slug);
  if (!d) return undefined;
  const curatedDetails = details[slug];
  const m = mediaBySlug[slug];
  return {
    ...d,
    ...curatedDetails,
    nearby: curatedDetails?.nearby ?? computeNearby(d),
    videos: m?.videos ?? [],
    gallery: m?.gallery ?? ((d as { gallery?: GalleryImage[] }).gallery ?? []),
  };
}

export const isCountry = (c: string): c is Country => c === "india" || c === "germany";

export const countryName = (c: Country) => (c === "india" ? "India" : "Germany");

export const isRemote = (src: string) => src.startsWith("http");

export const CATEGORIES: Record<Country, { id: string; label: string }[]> = {
  india: [
    { id: "cities", label: "Cities" },
    { id: "heritage", label: "Heritage" },
    { id: "nature", label: "Nature" },
    { id: "beaches", label: "Beaches" },
    { id: "mountains", label: "Mountains" },
  ],
  germany: [
    { id: "cities", label: "Cities" },
    { id: "castles", label: "Castles" },
    { id: "nature", label: "Nature" },
    { id: "history", label: "History" },
    { id: "mountains", label: "Mountains" },
  ],
};

export const allParams = () => destinations.map((d) => ({ country: d.country, slug: d.slug }));
