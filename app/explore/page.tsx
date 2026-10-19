import type { Metadata } from "next";
import { CountryChooser } from "@/components/features/CountryChooser";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal } from "@/components/ui/WordReveal";

export const metadata: Metadata = {
  title: "Choose a country",
  description: "Start with India or Germany and browse their destinations.",
};

export default function ExplorePage() {
  return (
    <section className="bg-mist pt-[calc(var(--header-h)+56px)] pb-[var(--section-y)]">
      <div className="container-page flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionLabel>start here</SectionLabel>
          <WordReveal as="h1" onMount text="Which country would you like to explore first?" className="max-w-[700px] text-h2" />
        </div>
        <CountryChooser />
      </div>
    </section>
  );
}
