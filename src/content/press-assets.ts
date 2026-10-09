import type { PressAsset } from "./types";

/**
 * Downloadable EPK assets. A download button only appears for entries
 * whose file exists under /public and is approved for distribution.
 */
export const pressAssets: PressAsset[] = [
  {
    id: "press-photo-01",
    title: "Press photo — Shattered mirror",
    description: "Portrait on red. Approved for press and promotional use.",
    file: "/press/dj-tamiko-press-photo-01.jpg",
    preview: "/images/artist/tamiko-shattered-mirror.jpg",
    kind: "photo",
    meta: "JPG · 412 × 512 px",
    approvedForDistribution: true,
  },
  // TODO(content): high-resolution press photos, logo pack (SVG/PNG), one-sheet PDF.
];
