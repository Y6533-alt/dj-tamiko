import type { StreamImageEntry } from "./types";

/**
 * Images for the homepage corridor (decorative, aria-hidden).
 *
 * - "artist-photo": approved artist photography.
 * - "release-artwork": official covers — added automatically from published releases.
 * - "atmosphere": original abstract artwork made for this site (no licensing
 *   constraints). Never presented as artist photos or release covers.
 */
/** Corridor framing for release art (portrait cards crop the 16:9 thumbnails). */
export const heroCoverPositions: Record<string, string> = {
  "on-you-alive": "50% 30%",
  "dance-alone": "50% 70%",
  "towline-tamiko-remix": "50% 50%",
  "the-latin-dance": "50% 45%",
};

export const heroAtmosphere: StreamImageEntry[] = [
  { src: "/images/artist/tamiko-shattered-mirror.jpg", kind: "artist-photo", position: "50% 30%" },
  { src: "/images/atmosphere/dusk-horizon.svg", kind: "atmosphere" },
  { src: "/images/atmosphere/tide-lines.svg", kind: "atmosphere" },
  { src: "/images/atmosphere/palm-shadow.svg", kind: "atmosphere", position: "55% 50%" },
  { src: "/images/artist/tamiko-shattered-mirror.jpg", kind: "artist-photo", position: "50% 15%" },
  { src: "/images/atmosphere/sun-rings.svg", kind: "atmosphere" },
  { src: "/images/atmosphere/lagoon-haze.svg", kind: "atmosphere" },
  { src: "/images/atmosphere/night-grain.svg", kind: "atmosphere" },
];
