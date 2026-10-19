import type { Metadata } from "next";
import { FavoritesList } from "@/components/features/FavoritesList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal } from "@/components/ui/WordReveal";

export const metadata: Metadata = { title: "Favorites" };

export default function FavoritesPage() {
  return (
    <section className="min-h-[70vh] bg-mist pt-[calc(var(--header-h)+56px)] pb-[var(--section-y)]">
      <div className="container-page flex flex-col gap-12">
        <div className="flex flex-col items-start gap-4">
          <SectionLabel>saved places</SectionLabel>
          <WordReveal as="h1" onMount text="Your favorites" className="text-h2" />
        </div>
        <FavoritesList />
      </div>
    </section>
  );
}
