/**
 * Content types. Shaped so a headless CMS can replace the local data
 * files later without touching components.
 */

export type ReleaseStatus = "released" | "upcoming" | "draft";

/** Release format, as listed on the streaming platforms. */
export type ReleaseType = "album" | "ep" | "single";

export type Track = {
  title: string;
  /** Featured/co-artist credit for this track, if any. */
  credit?: string;
  spotifyUrl?: string;
};

export type Release = {
  /** URL-safe unique id, e.g. "golden-hour". */
  id: string;
  title: string;
  type: ReleaseType;
  /**
   * "main": DJ TAMIKØ's own release. "collaboration": released by another
   * artist with DJ TAMIKØ credited — listed separately on /music.
   */
  role?: "main" | "collaboration";
  /** Tracklist for albums / EPs, in order. */
  tracks?: Track[];
  /** Artist / producer credit line, e.g. "Tamiko x Guineer". */
  credit?: string;
  /** Path under /public (square artwork, ideally 1500×1500 or larger). */
  artwork: string;
  artworkAlt?: string;
  /**
   * "cover" fills the square frame (true square covers). "contain" shows
   * non-square art (e.g. 16:9 video thumbnails) uncropped on a blurred fill.
   */
  artworkFit?: "cover" | "contain";
  /** ISO date "YYYY-MM-DD". Leave undefined if unknown. */
  releaseDate?: string;
  label?: string;
  genres: string[];
  /** Spotify track URL for singles, album URL for albums / EPs. */
  spotifyUrl?: string;
  soundcloudUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  /** Highlight on the home page. */
  featured?: boolean;
  /** Lifecycle of the music itself. */
  status: ReleaseStatus;
  /**
   * Editorial approval. Only `published: true` records ever appear on the
   * public site, independent of `status`.
   */
  published: boolean;
  /** Marks example/development records so they can never be mistaken for real content. */
  placeholder?: boolean;
};

export type SocialPlatform = "spotify" | "instagram" | "youtube" | "soundcloud" | "tiktok" | "apple-music";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type BioBlock = {
  text: string;
  /** Only approved copy is rendered publicly. */
  approved: boolean;
};

export type ArtistPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
  approved: boolean;
};

export type PressAsset = {
  id: string;
  title: string;
  description?: string;
  /** Path under /public. The download button only renders when this exists and is approved. */
  file: string;
  kind: "photo" | "logo" | "document" | "audio";
  /** Human-readable format/size, e.g. "JPG · 412 × 512". */
  meta?: string;
  preview?: string;
  approvedForDistribution: boolean;
};

export type StreamImageEntry = {
  src: string;
  /** Decorative only — corridor is aria-hidden. */
  kind: "artist-photo" | "release-artwork" | "atmosphere";
  position?: string;
};
