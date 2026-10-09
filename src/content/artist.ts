import type { ArtistPhoto, BioBlock, SocialLink } from "./types";

/**
 * Central artist configuration. Edit this file to update the artist
 * profile across every page.
 *
 * Content rule: only add facts the artist has approved. Never invent
 * releases, labels, performances, support or statistics.
 */
export const artist = {
  /** Always keep the Ø. */
  name: "DJ TAMIKØ",
  wordmark: "TAMIKØ",
  role: "Electronic music producer & DJ",
  genres: ["Deep House", "Tropical House", "Chill House"],
  tagline: "Melodies that move you.",
  email: "tamirshpmusic@gmail.com",
  /** Path to an approved logo file under /public, or null to use the text wordmark. */
  logo: null as string | null,
} as const;

/**
 * Bio copy. `short` is a factual line built only from confirmed details
 * (name, role, genres). Replace with the artist's approved biography.
 */
export const bio: { short: BioBlock; long: BioBlock[]; direction: BioBlock } = {
  short: {
    text: "DJ TAMIKØ is an electronic music producer and DJ working across deep house, tropical house and chill house.",
    approved: true,
  },
  // TODO(content): add the approved long-form English biography as paragraphs.
  long: [
    {
      text: "PLACEHOLDER — long biography paragraph awaiting the artist's approved copy.",
      approved: false,
    },
  ],
  direction: {
    text: "Warm, melodic house music built on deep grooves, sunlit chords and an unhurried, atmospheric pulse.",
    // TODO(content): confirm this musical-direction line with the artist.
    approved: true,
  },
};

/** Only real, verified profile URLs. Empty until supplied. */
export const socialLinks: SocialLink[] = [
  { platform: "youtube", url: "https://www.youtube.com/@REALDJTAMIKO" },
  // { platform: "spotify", url: "https://open.spotify.com/artist/..." },
  // { platform: "instagram", url: "https://www.instagram.com/..." },
];

export const artistPhotos: ArtistPhoto[] = [
  {
    src: "/images/artist/tamiko-shattered-mirror.jpg",
    alt: "DJ TAMIKØ in a black outfit looking up at the camera through shards of a broken mirror, against a deep red backdrop.",
    width: 412,
    height: 512,
    // TODO(content): add photographer credit if required.
    approved: true,
  },
];

export const primaryPhoto = artistPhotos.find((p) => p.approved) ?? null;
