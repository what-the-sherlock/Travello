// Generates content/places.json from free Wikimedia APIs (no keys):
//   Wikidata SPARQL -> notable places per country, ranked by Wikipedia coverage
//   Wikipedia REST  -> short descriptions
//   Commons API     -> high-resolution photos (originals >= 1600px wide only)
// Run: npm run fetch:places   (takes a few minutes; re-run any time to refresh)

import { writeFileSync } from "node:fs";

const PER_COUNTRY = 50;
const MAX_CITIES = 18; // keep room for monuments and landscapes
const MIN_WIDTH = 1600;
const UA = { "User-Agent": "TraveloStudentProject/1.0 (educational, non-commercial)" };

const COUNTRIES = { india: "Q668", germany: "Q183" };

// Wikidata class -> our category, per country
const TYPES = {
  Q515: "cities", Q1549591: "cities", Q200250: "cities",
  Q57821: "heritage", Q16560: "palace", Q842402: "heritage", Q162875: "heritage", Q32815: "heritage",
  Q23413: "castle", Q751876: "castle", Q2977: "history", Q16970: "history", Q4989906: "history",
  Q46169: "nature", Q23397: "nature", Q34038: "nature", Q179049: "nature", Q4421: "nature",
  Q40080: "beaches",
  Q8502: "mountains", Q1015390: "mountains", Q46831: "mountains",
};
const mapCategory = (cat, country) => {
  if (cat === "palace" || cat === "castle") return country === "india" ? "heritage" : "castles";
  if (cat === "heritage" || cat === "history") return country === "india" ? "heritage" : "history";
  return cat;
};
const TAG = {
  cities: "City", heritage: "Heritage Site", castles: "Castle & Palace", history: "Landmark",
  nature: "Nature", beaches: "Beach", mountains: "Mountains",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, as = "json") {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { ...UA, Accept: "application/json" } });
    if (res.status === 429 || res.status >= 500) {
      await sleep(15000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return as === "json" ? res.json() : res.text();
  }
  throw new Error(`Gave up on ${url}`);
}

function sparql(countryQ) {
  const values = Object.keys(TYPES).map((q) => `wd:${q}`).join(" ");
  return `
SELECT ?item ?coord ?image ?commonsCat ?sitelinks ?article (GROUP_CONCAT(DISTINCT ?typeQ) AS ?types) WHERE {
  VALUES ?type { ${values} }
  ?item wdt:P31 ?type; wdt:P17 wd:${countryQ}; wdt:P625 ?coord; wdt:P18 ?image; wikibase:sitelinks ?sitelinks.
  ?article schema:about ?item; schema:isPartOf <https://en.wikipedia.org/>.
  OPTIONAL { ?item wdt:P373 ?commonsCat }
  BIND(STRAFTER(STR(?type), "entity/") AS ?typeQ)
}
GROUP BY ?item ?coord ?image ?commonsCat ?sitelinks ?article
ORDER BY DESC(?sitelinks) LIMIT 220`;
}

const slugify = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const stripHtml = (s = "") => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

/** Commons imageinfo for up to 50 File: titles at once. */
async function imageInfo(titles) {
  const out = {};
  for (let i = 0; i < titles.length; i += 50) {
    const p = new URLSearchParams({
      action: "query", format: "json", titles: titles.slice(i, i + 50).join("|"),
      prop: "imageinfo", iiprop: "url|size|extmetadata", iiurlwidth: "1920", origin: "*",
    });
    const r = await get(`https://commons.wikimedia.org/w/api.php?${p}`);
    const norm = Object.fromEntries((r.query.normalized ?? []).map((n) => [n.to, n.from]));
    for (const pg of Object.values(r.query.pages)) {
      if (pg.imageinfo) out[norm[pg.title] ?? pg.title] = toImage(pg);
    }
    await sleep(500);
  }
  return out;
}

function toImage(pg) {
  const ii = pg.imageinfo[0];
  const md = ii.extmetadata ?? {};
  return {
    src: ii.thumburl,
    thumb: ii.thumburl.replace("/1920px-", "/960px-"),
    width: ii.width,
    height: ii.height,
    caption: stripHtml(md.ImageDescription?.value).slice(0, 160) || pg.title.slice(5).replace(/\.\w+$/, ""),
    credit: stripHtml(md.Artist?.value).slice(0, 80),
    license: md.LicenseShortName?.value ?? "",
    page: ii.descriptionurl,
  };
}

/** Up to 8 good landscape photos from the place's Commons category. */
async function gallery(category, exclude) {
  if (!category) return [];
  const p = new URLSearchParams({
    action: "query", format: "json", generator: "categorymembers", gcmtitle: `Category:${category}`,
    gcmtype: "file", gcmlimit: "40", prop: "imageinfo", iiprop: "url|size|extmetadata", iiurlwidth: "1920", origin: "*",
  });
  const r = await get(`https://commons.wikimedia.org/w/api.php?${p}`);
  return Object.values(r.query?.pages ?? {})
    .filter((pg) => pg.imageinfo?.[0]?.thumburl && /\.(jpe?g|png|webp|tiff?)$/i.test(pg.title))
    .filter((pg) => pg.imageinfo[0].width >= MIN_WIDTH && pg.imageinfo[0].width >= pg.imageinfo[0].height * 0.66)
    .map(toImage)
    .filter((img) => img.page !== exclude)
    .slice(0, 8);
}

async function country(name, q) {
  console.log(`\n${name}: querying Wikidata…`);
  const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(sparql(q))}`;
  const rows = (await get(url)).results.bindings;

  // Pick top places, capping cities so landmarks and landscapes get in
  const picked = [];
  let cities = 0;
  for (const r of rows) {
    const cats = [...new Set(r.types.value.split(" ").map((t) => TYPES[t]).filter(Boolean).map((c) => mapCategory(c, name)))];
    if (!cats.length) continue;
    if (cats.includes("cities")) {
      if (cities >= MAX_CITIES) continue;
      cities++;
    }
    const [lng, lat] = r.coord.value.replace(/^Point\(|\)$/g, "").split(" ").map(Number);
    picked.push({
      qid: r.item.value.split("/").pop(),
      title: decodeURIComponent(r.article.value.split("/wiki/")[1]),
      file: "File:" + decodeURIComponent(r.image.value.split("/").pop()).replace(/_/g, " "),
      commonsCat: r.commonsCat?.value,
      categories: cats,
      coordinates: [+lng.toFixed(4), +lat.toFixed(4)],
      sitelinks: +r.sitelinks.value,
    });
    if (picked.length >= PER_COUNTRY * 1.4) break; // spare candidates for ones that fail the photo check
  }

  console.log(`${name}: checking ${picked.length} hero photos…`);
  const heroes = await imageInfo(picked.map((p) => p.file));

  const places = [];
  for (const p of picked) {
    if (places.length >= PER_COUNTRY) break;
    const hero = heroes[p.file];
    if (!hero || hero.width < MIN_WIDTH) continue;

    const summary = await get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(p.title)}`).catch(() => null);
    if (!summary?.extract || summary.type === "disambiguation") continue;
    // Keep the first 2–3 sentences
    const sentences = summary.extract.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [summary.extract];
    const description = sentences.slice(0, 3).join("").trim();
    const region = summary.description?.match(/in ([^,]+(?:, [^,]+)?)(?:, (India|Germany))?$/)?.[1] ?? (name === "india" ? "India" : "Germany");

    let photos = [];
    try {
      photos = await gallery(p.commonsCat, hero.page);
    } catch (e) {
      console.warn(`  gallery failed for ${p.title}: ${e.message}`);
    }

    places.push({
      slug: slugify(summary.title),
      wikidata: p.qid,
      country: name,
      name: summary.title,
      region,
      tag: TAG[p.categories[0]],
      categories: p.categories,
      description,
      coordinates: p.coordinates,
      image: { src: hero.src, thumb: hero.thumb, alt: hero.caption, credit: hero.credit, license: hero.license, page: hero.page },
      gallery: photos,
      wikipedia: summary.content_urls?.desktop?.page,
    });
    console.log(`  ${places.length}. ${summary.title} (${p.categories.join(", ")}, ${photos.length} photos)`);
    await sleep(300);
  }
  return places;
}

const all = [];
for (const [name, q] of Object.entries(COUNTRIES)) all.push(...(await country(name, q)));
writeFileSync(new URL("../content/places.json", import.meta.url), JSON.stringify(all, null, 1));
console.log(`\nWrote ${all.length} places to content/places.json`);
