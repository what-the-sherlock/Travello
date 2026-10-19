// Destination content: 14 hand-curated places plus ~100 generated ones
// (content/places.json, built by `npm run fetch:places` from Wikidata/Wikipedia/Commons).
import generated from "./places.json";

export type Country = "india" | "germany";

export type Destination = {
  slug: string;
  country: Country;
  name: string;
  region: string;
  /** Short theme shown on cards, e.g. "Royal Heritage" */
  tag: string;
  categories: string[];
  description: string;
  coordinates: [lng: number, lat: number];
  image: Photo;
  /** "curated" = hand-written guide; "generated" = from Wikimedia APIs */
  source: "curated" | "generated";
  wikipedia?: string;
};

export type Photo = {
  src: string;
  alt: string;
  /** Smaller version for cards (remote photos only) */
  thumb?: string;
  credit?: string;
  license?: string;
  page?: string;
};

const img = (slug: string, alt: string) => ({ src: `/images/destinations/${slug}.webp`, alt });

const curated: Omit<Destination, "source">[] = [
  // India
  {
    slug: "agra",
    country: "india",
    name: "Agra",
    region: "Uttar Pradesh",
    tag: "Mughal Heritage",
    categories: ["heritage", "cities"],
    description:
      "Home to the Taj Mahal, Shah Jahan's white-marble memorial to Mumtaz Mahal, Agra was the seat of the Mughal empire for much of the 16th and 17th centuries. The red sandstone Agra Fort and the abandoned city of Fatehpur Sikri sit within easy reach.",
    coordinates: [78.0421, 27.1751],
    image: img("agra", "The Taj Mahal's white marble dome and minarets reflected in the long garden pool"),
  },
  {
    slug: "jaipur",
    country: "india",
    name: "Jaipur",
    region: "Rajasthan",
    tag: "Royal Heritage",
    categories: ["heritage", "cities"],
    description:
      "Rajasthan's Pink City was laid out in 1727 on a grid of broad avenues and bazaars. Its hilltop Amber Fort, the honeycomb façade of the Hawa Mahal and the Jantar Mantar observatory make it the easiest place to step into Rajput history.",
    coordinates: [75.7873, 26.9124],
    image: img("jaipur", "Amber Fort's sandstone walls and terraces rising above Maota Lake near Jaipur"),
  },
  {
    slug: "delhi",
    country: "india",
    name: "Delhi",
    region: "National Capital Territory",
    tag: "Capital Stories",
    categories: ["cities", "heritage"],
    description:
      "India's capital layers a thousand years of empires: the lanes of Old Delhi and the Red Fort, the Qutub Minar, and Lutyens' wide colonial boulevards. Humayun's Tomb, the garden mausoleum that inspired the Taj, is one of its quietest corners.",
    coordinates: [77.209, 28.6139],
    image: img("delhi", "An octagonal Mughal-era tomb with a domed roof in the gardens of the Humayun's Tomb complex, Delhi"),
  },
  {
    slug: "varanasi",
    country: "india",
    name: "Varanasi",
    region: "Uttar Pradesh",
    tag: "Sacred Ghats",
    categories: ["heritage", "cities"],
    description:
      "One of the world's oldest living cities, Varanasi stretches along stone ghats that step down into the Ganges. Dawn boat rides and the evening Ganga Aarti at Dashashwamedh Ghat show the city's spiritual rhythm at its most vivid.",
    coordinates: [83.0104, 25.3176],
    image: img("varanasi", "Stone ghats and riverside temples along the Ganges in Varanasi"),
  },
  {
    slug: "kerala",
    country: "india",
    name: "Kerala",
    region: "South India",
    tag: "Backwater Calm",
    categories: ["nature", "beaches"],
    description:
      "A green strip between the Arabian Sea and the Western Ghats, Kerala is known for its palm-lined backwaters, best explored by converted rice-barge houseboat. Inland, tea estates climb the hills around Munnar; on the coast, Kochi mixes spice markets and Portuguese churches.",
    coordinates: [76.3388, 9.4981],
    image: img("kerala", "Traditional houseboats moored on palm-fringed Kerala backwaters"),
  },
  {
    slug: "goa",
    country: "india",
    name: "Goa",
    region: "West Coast",
    tag: "Coastal Escape",
    categories: ["beaches", "nature"],
    description:
      "India's smallest state packs in more than 100 km of Arabian Sea coastline. Beyond the beaches of Palolem and Agonda lie Portuguese-era churches in Old Goa, spice plantations, and the pastel lanes of Panaji's Fontainhas quarter.",
    coordinates: [74.0236, 15.0097],
    image: img("goa", "The crescent of Palolem Beach in South Goa, lined with palm trees"),
  },
  {
    slug: "himachal-pradesh",
    country: "india",
    name: "Himachal Pradesh",
    region: "Western Himalaya",
    tag: "Mountain Air",
    categories: ["mountains", "nature"],
    description:
      "Himachal runs from pine-forested hill stations like Shimla and Manali up to the high-altitude desert of Spiti Valley. Ancient Buddhist monasteries, apple orchards and some of India's most dramatic mountain roads make it a favourite for slow travel.",
    coordinates: [77.1734, 31.1048],
    image: img("himachal", "The Spiti River winding through a wide, barren Himalayan valley in Himachal Pradesh"),
  },

  // Germany
  {
    slug: "berlin",
    country: "germany",
    name: "Berlin",
    region: "Berlin",
    tag: "Modern History",
    categories: ["cities", "history"],
    description:
      "Germany's capital wears its 20th-century history openly, from the Brandenburg Gate and the Reichstag dome to the surviving stretches of the Berlin Wall. Museum Island, a restless art scene and leafy neighbourhoods like Kreuzberg balance the weight of the past.",
    coordinates: [13.405, 52.52],
    image: img("berlin", "The Brandenburg Gate in Berlin in soft morning light"),
  },
  {
    slug: "munich",
    country: "germany",
    name: "Munich",
    region: "Bavaria",
    tag: "Bavarian Capital",
    categories: ["cities", "history"],
    description:
      "Bavaria's capital pairs grand Baroque churches and royal palaces with beer gardens and the vast English Garden. The Alps sit on the horizon, close enough for a day trip, and every autumn the city hosts Oktoberfest.",
    coordinates: [11.582, 48.1351],
    image: img("munich", "Marienplatz in Munich with the Neues Rathaus tower and the twin domes of the Frauenkirche"),
  },
  {
    slug: "neuschwanstein",
    country: "germany",
    name: "Neuschwanstein",
    region: "Bavaria",
    tag: "Fairytale Castle",
    categories: ["castles", "mountains"],
    description:
      "King Ludwig II's 19th-century castle perches on a rocky ridge above the Pöllat Gorge, its white turrets framed by the Bavarian Alps. Nearby Hohenschwangau Castle and the clear waters of the Alpsee complete one of Germany's most photographed landscapes.",
    coordinates: [10.7498, 47.5576],
    image: img("neuschwanstein", "Neuschwanstein Castle on its forested ridge with the Bavarian countryside beyond"),
  },
  {
    slug: "black-forest",
    country: "germany",
    name: "Black Forest",
    region: "Baden-Württemberg",
    tag: "Forest Trails",
    categories: ["nature", "mountains"],
    description:
      "The Schwarzwald's dense fir forests, rolling hills and glacial lakes cover much of south-western Germany. It is walking country, dotted with half-timbered villages, cuckoo-clock workshops and the spa town of Baden-Baden.",
    coordinates: [8.2, 48.0],
    image: img("black-forest", "Sunrise over the rolling, forested hills of the Black Forest near Schonach"),
  },
  {
    slug: "cologne",
    country: "germany",
    name: "Cologne",
    region: "North Rhine-Westphalia",
    tag: "Gothic Landmark",
    categories: ["cities", "history"],
    description:
      "Cologne's twin-spired Gothic cathedral took more than six centuries to finish and still dominates the Rhine skyline. The city is also known for its Roman roots, a lively old town of brewhouses and one of Europe's biggest carnivals.",
    coordinates: [6.9603, 50.9375],
    image: img("cologne", "Cologne Cathedral's twin spires rising behind the Hohenzollern Bridge over the Rhine"),
  },
  {
    slug: "hamburg",
    country: "germany",
    name: "Hamburg",
    region: "Hamburg",
    tag: "Harbour City",
    categories: ["cities", "history"],
    description:
      "Germany's great port city is built around water, from the Alster lakes to the Elbe harbour. The red-brick warehouses of the Speicherstadt, the Elbphilharmonie concert hall and the fish market on Sunday mornings show its maritime character.",
    coordinates: [9.9937, 53.5511],
    image: img("hamburg", "Red-brick warehouses of Hamburg's Speicherstadt lit up along a canal at dusk"),
  },
  {
    slug: "dresden",
    country: "germany",
    name: "Dresden",
    region: "Saxony",
    tag: "Baroque Revival",
    categories: ["cities", "history"],
    description:
      "Saxony's capital on the Elbe was rebuilt after its wartime destruction, and its Baroque skyline of the Frauenkirche, Zwinger palace and Semperoper is once again intact. The Old Masters gallery holds Raphael's Sistine Madonna.",
    coordinates: [13.7373, 51.0504],
    image: img("dresden", "Dresden's Baroque skyline lit up at night along the Elbe river"),
  },
];

// Generated places that duplicate a curated one under a different name
const ALIASES = new Set(["neuschwanstein-castle", "new-delhi", "himachal-pradesh"]);
const curatedSlugs = new Set(curated.map((d) => d.slug));

export const destinations: Destination[] = [
  ...curated.map((d) => ({ ...d, source: "curated" as const })),
  // JSON types coordinates as number[]; the generator always writes [lng, lat]
  ...(generated as unknown as Omit<Destination, "source">[])
    .filter((d) => !curatedSlugs.has(d.slug) && !ALIASES.has(d.slug))
    .map((d) => ({ ...d, source: "generated" as const })),
];

export const featuredSlugs = ["agra", "neuschwanstein", "kerala", "berlin", "jaipur", "black-forest"];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
export const byCountry = (country: Country) => destinations.filter((d) => d.country === country);
export const featured = featuredSlugs.map((s) => getDestination(s)!);

export const countries: Record<Country, { name: string; blurb: string; image: { src: string; alt: string } }> = {
  india: {
    name: "India",
    blurb: "Mughal monuments, sacred rivers, backwaters and Himalayan valleys.",
    image: img("agra", "The Taj Mahal at Agra"),
  },
  germany: {
    name: "Germany",
    blurb: "Fairytale castles, forested hills and cities rebuilt with character.",
    image: img("neuschwanstein", "Neuschwanstein Castle in Bavaria"),
  },
};
