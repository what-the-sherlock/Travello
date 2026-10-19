import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/lib/brand";

export const alt = "Travelo: discover the beauty of India and Germany";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site-wide share image: the Travelo hero photo with the headline, in the site's navy.
export default async function OpengraphImage() {
  const bg = await readFile(join(process.cwd(), "public/images/travelo/og-bg.jpg"));
  const src = `data:image/jpeg;base64,${bg.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background: "linear-gradient(90deg, rgba(10,19,69,0.88) 0%, rgba(10,19,69,0.55) 55%, rgba(10,19,69,0.1) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#fff" }}>
            <svg width="52" height="48" viewBox="0 0 48 44" fill="#fff">
              {LOGO_PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
            <span style={{ fontSize: 40, letterSpacing: "-0.05em" }}>Travelo</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>
            <div style={{ fontSize: 72, lineHeight: 1.05, color: "#fff", letterSpacing: "-0.04em" }}>
              Discover the Beauty of India & Germany
            </div>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)" }}>
              Over 100 places with guides, photo galleries and maps
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
