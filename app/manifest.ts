import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Travelo · India & Germany",
    short_name: "Travelo",
    description: "Discover cities, heritage and landscapes across India and Germany.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#1B2978",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
