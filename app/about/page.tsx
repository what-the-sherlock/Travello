import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { countries } from "@/content/destinations";

export const metadata: Metadata = {
  title: "About us",
  description: "Why Travelo exists and how the India & Germany guides are put together.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" image={countries.germany.image}>
        <p className="mt-4 max-w-[520px] text-lead text-white/85">
          A small guide to two very different countries, made for people deciding where to go next.
        </p>
      </PageHero>

      <section className="section-y">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <SectionLabel>our story</SectionLabel>
            <h2 className="text-h2">Two countries, one starting point</h2>
            <p className="text-lead text-navy/75">
              India and Germany sit far apart on the map but draw many of the same travellers: people who love old
              cities, layered history and landscapes worth walking through. Travelo started as a way to put both side by
              side, so you can compare a Rajasthani fort with a Bavarian castle before you book anything.
            </p>
          </div>
          <div className="flex flex-col items-start gap-5">
            <SectionLabel>our mission</SectionLabel>
            <h2 className="text-h2">Clear, honest, easy to browse</h2>
            <p className="text-lead text-navy/75">
              Every destination page answers the same questions: what to see, when to go, how to get there and what is
              nearby. Photos come from Wikimedia Commons photographers and videos from independent creators on YouTube.
              We don&rsquo;t sell trips; this site is for discovery only.
            </p>
          </div>
        </div>
      </section>

      <About />
    </>
  );
}
