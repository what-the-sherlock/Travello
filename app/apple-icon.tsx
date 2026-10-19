import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1B2978" }}>
        <svg width="112" height="103" viewBox="0 0 48 44" fill="#fff">
          {LOGO_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
