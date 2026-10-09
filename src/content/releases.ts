import type { Release } from "./types";

/**
 * Release library. To add a release:
 *   1. Put square artwork in /public/images/releases/ (≥1500×1500, JPG/WebP).
 *   2. Add one record below with `published: true` once it's approved.
 * Pages pick it up automatically — no component changes needed.
 *
 * Current records come from the official YouTube channel (@REALDJTAMIKO).
 * - Artwork is the YouTube video thumbnail (16:9, shown uncropped via
 *   `artworkFit: "contain"`). Replace with official square covers when available.
 * - `releaseDate` is the YouTube publish date; update if the official
 *   release date differs.
 * - Genres are left empty until the artist confirms them per track.
 */
export const releases: Release[] = [
  {
    id: "on-you-alive",
    title: "On You (Alive)",
    artwork: "/images/releases/on-you-alive.jpg",
    artworkAlt: "Artwork for On You (Alive): a red planet above the words “Songs From Mars” on a dark background.",
    artworkFit: "contain",
    releaseDate: "2025-03-13",
    genres: [],
    youtubeUrl: "https://www.youtube.com/watch?v=WNk3Ak7uqGk",
    featured: true,
    status: "released",
    published: true,
  },
  {
    id: "dance-alone",
    title: "Dance Alone",
    artwork: "/images/releases/dance-alone.jpg",
    artworkAlt: "Artwork for Dance Alone: the title above a crowd in front of a glowing concert stage.",
    artworkFit: "contain",
    releaseDate: "2023-11-03",
    genres: [],
    youtubeUrl: "https://www.youtube.com/watch?v=7GHhmbDEqaA",
    status: "released",
    published: true,
  },
  {
    id: "towline-tamiko-remix",
    title: "Towline (Tamiko Remix)",
    credit: "Tamiko x Guineer",
    artwork: "/images/releases/towline-tamiko-remix.jpg",
    artworkAlt: "Artwork for Towline: red typewriter lettering reading “Towline — Tamiko x Guineer” on black.",
    artworkFit: "contain",
    releaseDate: "2023-09-23",
    genres: [],
    youtubeUrl: "https://www.youtube.com/watch?v=PDHyx6VEXLA",
    status: "released",
    published: true,
  },
  {
    id: "the-latin-dance",
    title: "The Latin Dance",
    credit: "Prod. by Line House",
    artwork: "/images/releases/the-latin-dance.jpg",
    artworkAlt: "Artwork for The Latin Dance: hand-lettered title on an orange sun over turquoise waves.",
    artworkFit: "contain",
    releaseDate: "2023-08-09",
    genres: [],
    youtubeUrl: "https://www.youtube.com/watch?v=YTuDHInb04A",
    status: "released",
    published: true,
  },
  {
    // Development placeholder — unpublished, never shown publicly.
    id: "example-release",
    title: "Example Release (placeholder)",
    artwork: "/images/releases/placeholder-artwork.svg",
    artworkAlt: "Placeholder artwork",
    genres: ["Deep House"],
    status: "draft",
    published: false,
    placeholder: true,
  },
];
