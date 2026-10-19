import type { Metadata } from "next";
import { Suspense } from "react";
import { MapExplorer } from "@/components/features/MapExplorer";

export const metadata: Metadata = {
  title: "Map",
  description: "See every destination and the places nearby on one map of India and Germany.",
};

export default function MapPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <h1 className="sr-only">Destination map</h1>
      <Suspense>
        <MapExplorer />
      </Suspense>
    </div>
  );
}
