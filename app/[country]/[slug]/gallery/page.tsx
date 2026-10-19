import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/features/Gallery";
import { SubNav } from "@/components/features/SubNav";
import { PageHero } from "@/components/ui/PageHero";
import { allParams, getFullDestination } from "@/lib/data";

export const generateStaticParams = () =>
  allParams().filter(({ slug }) => (getFullDestination(slug)?.gallery.length ?? 0) > 0);
// Fully prerendered pages: let navigation wait for them (also lets the image morph pair up).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[country]/[slug]/gallery">): Promise<Metadata> {
  const d = getFullDestination((await params).slug);
  return d ? { title: `${d.name} gallery` } : {};
}

export default async function GalleryPage({ params }: PageProps<"/[country]/[slug]/gallery">) {
  const { country, slug } = await params;
  const d = getFullDestination(slug);
  if (!d || d.country !== country || d.gallery.length === 0) notFound();

  return (
    <>
      <PageHero title={`${d.name} gallery`} image={d.image} back={{ href: `/${country}/${slug}`, label: d.name }} />
      <SubNav base={`/${country}/${slug}`} slug={slug} hasVideos={d.videos.length > 0} hasGallery={d.gallery.length > 0} />
      <section className="section-y bg-mist">
        <div className="container-page">
          <Gallery images={d.gallery} />
        </div>
      </section>
    </>
  );
}
