import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { DestinationGrid } from "@/components/features/DestinationGrid";
import { PageHero } from "@/components/ui/PageHero";
import { byCountry, countries } from "@/content/destinations";
import { CATEGORIES, isCountry } from "@/lib/data";

export const generateStaticParams = () => [{ country: "india" }, { country: "germany" }];

export async function generateMetadata({ params }: PageProps<"/[country]">): Promise<Metadata> {
  const { country } = await params;
  if (!isCountry(country)) return {};
  return { title: countries[country].name, description: countries[country].blurb };
}

export default async function CountryPage({ params }: PageProps<"/[country]">) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  const data = countries[country];

  return (
    <>
      <PageHero
        title={`Explore ${data.name}`}
        image={data.image}
        back={{ href: "/explore", label: "All countries" }}
        imageWrap={(img) => (
          <ViewTransition name={`country-${country}`} share="morph" default="none">
            {img}
          </ViewTransition>
        )}
      >
        <p className="mt-4 max-w-[520px] text-lead text-white/85">{data.blurb}</p>
      </PageHero>
      <section className="section-y bg-mist">
        <div className="container-page">
          <Suspense>
            <DestinationGrid destinations={byCountry(country)} categories={CATEGORIES[country]} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
