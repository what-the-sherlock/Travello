import { ExternalLink, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { DestinationTabs } from "@/components/features/DestinationTabs";
import { HeartButton } from "@/components/features/HeartButton";
import { ShareButton } from "@/components/features/ShareButton";
import { SubNav } from "@/components/features/SubNav";
import { PageHero } from "@/components/ui/PageHero";
import { allParams, countryName, getFullDestination } from "@/lib/data";

export const generateStaticParams = allParams;
// Fully prerendered pages: let navigation wait for them (also lets the image morph pair up).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[country]/[slug]">): Promise<Metadata> {
  const d = getFullDestination((await params).slug);
  return d ? { title: d.name, description: d.description, openGraph: { images: [d.image.src] } } : {};
}

export default async function DestinationPage({ params }: PageProps<"/[country]/[slug]">) {
  const { country, slug } = await params;
  const d = getFullDestination(slug);
  if (!d || d.country !== country) notFound();

  return (
    <>
      <PageHero
        title={d.name}
        image={d.image}
        back={{ href: `/${d.country}`, label: countryName(d.country) }}
        imageWrap={(img) => (
          <ViewTransition name={`dest-${d.slug}`} share="morph" default="none">
            {img}
          </ViewTransition>
        )}
      >
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="mr-2 flex items-center gap-1.5 text-white/85">
            <MapPin size={20} strokeWidth={1.5} aria-hidden />
            {d.region}, {countryName(d.country)}
          </p>
          <HeartButton slug={d.slug} name={d.name} />
          <ShareButton title={d.name} />
        </div>
        {d.image.credit && (
          <p className="mt-6 text-sm text-white/60">
            Photo: {d.image.credit}
            {d.image.license && `, ${d.image.license}`}
          </p>
        )}
      </PageHero>

      <SubNav base={`/${d.country}/${d.slug}`} slug={d.slug} hasVideos={d.videos.length > 0} hasGallery={d.gallery.length > 0} />

      <section className="section-y bg-mist">
        <div className="container-page">
          <p className="max-w-[760px] font-serif text-[clamp(1.4rem,1.2rem+0.8vw,1.9rem)] leading-snug tracking-[-0.03em]">
            {d.description}
          </p>
          {d.wikipedia && (
            <a
              href={d.wikipedia}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-navy/70 underline-offset-4 hover:underline"
            >
              Read more on Wikipedia <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
            </a>
          )}
          <DestinationTabs
            name={d.name}
            center={d.coordinates}
            attractions={d.attractions}
            bestMonths={d.bestMonths}
            bestTimeNotes={d.bestTimeNotes}
            monthNotes={d.monthNotes}
            howToReach={d.howToReach}
            nearby={d.nearby}
            countryPath={`/${d.country}`}
          />
        </div>
      </section>
    </>
  );
}
