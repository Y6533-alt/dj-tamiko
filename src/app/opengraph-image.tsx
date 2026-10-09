import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import { artist, primaryPhoto } from "@/content/artist";

export const alt = `${artist.name} — ${artist.genres.join(" / ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  let photo: string | null = null;
  if (primaryPhoto) {
    const buf = await readFile(path.join(process.cwd(), "public", primaryPhoto.src));
    photo = `data:image/jpeg;base64,${buf.toString("base64")}`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(80% 90% at 85% 50%, #3a2420 0%, #0A0A0D 70%)",
          color: "#F5F5F7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", flex: 1 }}>
          <div style={{ fontSize: 24, letterSpacing: 8, color: "#F0A66A", textTransform: "uppercase" }}>
            {artist.genres.join("  /  ")}
          </div>
          <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -4, lineHeight: 1, marginTop: 18 }}>
            {artist.wordmark}
          </div>
          <div style={{ fontSize: 36, color: "#D8B7A0", marginTop: 24 }}>{artist.tagline}</div>
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" width={412} height={512} style={{ alignSelf: "center", marginRight: 72, borderRadius: 24, objectFit: "cover" }} />
        )}
      </div>
    ),
    size,
  );
}
