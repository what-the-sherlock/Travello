import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubNav } from "@/components/features/SubNav";
import { VideoGuide } from "@/components/features/VideoGuide";
import { PageHero } from "@/components/ui/PageHero";
import { allParams, getFullDestination } from "@/lib/data";

export const generateStaticParams = () =>
  allParams().filter(({ slug }) => (getFullDestination(slug)?.videos.length ?? 0) > 0);
// Fully prerendered pages: let navigation wait for them (also lets the image morph pair up).
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[country]/[slug]/videos">): Promise<Metadata> {
  const d = getFullDestination((await params).slug);
  return d ? { title: `${d.name} video guide` } : {};
}

export default async function VideosPage({ params }: PageProps<"/[country]/[slug]/videos">) {
  const { country, slug } = await params;
  const d = getFullDestination(slug);
  if (!d || d.country !== country || d.videos.length === 0) notFound();

  return (
    <>
      <PageHero title={`${d.name} video guide`} image={d.image} back={{ href: `/${country}/${slug}`, label: d.name }} />
      <SubNav base={`/${country}/${slug}`} slug={slug} hasVideos={d.videos.length > 0} hasGallery={d.gallery.length > 0} />
      <section className="section-y bg-mist">
        <div className="container-page">
          <VideoGuide videos={d.videos} />
        </div>
      </section>
    </>
  );
}
