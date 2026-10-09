import { releases } from "@/content/releases";
import { heroAtmosphere, heroCoverPositions } from "@/content/hero-images";
import type { Release } from "@/content/types";
import { asset } from "@/lib/site";
import type { StreamImage } from "@/components/ui/image-stream-hero";
import type { EmbedSource } from "@/components/site/embed-lite";

/**
 * Set SHOW_DRAFT_CONTENT=true locally to preview unpublished records
 * (they render with a "Draft preview" badge). Never set it in production.
 */
export const showDrafts = process.env.SHOW_DRAFT_CONTENT === "true";

const byDateDesc = (a: Release, b: Release) =>
  (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "");

/** Releases visible on the public site. */
export function getPublicReleases(): Release[] {
  return releases.filter((r) => r.published || showDrafts).sort(byDateDesc);
}

const isOwn = (r: Release) => r.role !== "collaboration";

/** Catalog sections shown on /music and the EPK, in display order. */
export type ReleaseGroupId = "albums" | "eps" | "singles" | "collaborations" | "youtube";
export const releaseGroups: { id: ReleaseGroupId; title: string }[] = [
  { id: "albums", title: "Albums" },
  { id: "eps", title: "EPs" },
  { id: "singles", title: "Singles" },
  { id: "collaborations", title: "Collaborations" },
  { id: "youtube", title: "On YouTube" },
];

export function getReleaseGroup(r: Release): ReleaseGroupId {
  if (!r.spotifyUrl && !r.appleMusicUrl && !r.soundcloudUrl && r.youtubeUrl) return "youtube";
  if (!isOwn(r)) return "collaborations";
  if (r.type === "album") return "albums";
  if (r.type === "ep") return "eps";
  return "singles";
}

/** Public releases split into the catalog sections; empty sections are omitted. */
export function getGroupedReleases() {
  const list = getPublicReleases();
  return releaseGroups
    .map((g) => ({ ...g, releases: list.filter((r) => getReleaseGroup(r) === g.id) }))
    .filter((g) => g.releases.length > 0);
}

export const releaseTypeLabel: Record<Release["type"], string> = { album: "Album", ep: "EP", single: "Single" };

/** Latest *official* release of the artist's own (collaborations excluded). */
export function getLatestRelease(): Release | null {
  const list = getPublicReleases().filter(isOwn);
  return (
    list.find((r) => r.featured && r.status === "released") ??
    list.find((r) => r.status === "released") ??
    (showDrafts ? list[0] ?? null : null)
  );
}

/** Up to `limit` tracks for the home page, featured first, never duplicated. */
export function getFeaturedReleases(limit = 4, excludeId?: string): Release[] {
  const list = getPublicReleases().filter((r) => r.id !== excludeId);
  const featured = list.filter((r) => r.featured);
  const rest = list.filter((r) => !r.featured);
  return [...featured, ...rest].slice(0, limit);
}

/** About page: every album/EP plus the latest own single. */
export function getSelectedReleases(): Release[] {
  const list = getPublicReleases().filter(isOwn);
  const longform = list.filter((r) => r.type === "album" || r.type === "ep");
  const latestSingle = list.find((r) => r.type === "single" && r.status === "released");
  return latestSingle ? [latestSingle, ...longform] : longform;
}

export function getListenLinks(r: Release) {
  return [
    { platform: "Spotify", url: r.spotifyUrl },
    { platform: "Apple Music", url: r.appleMusicUrl },
    { platform: "SoundCloud", url: r.soundcloudUrl },
    { platform: "YouTube", url: r.youtubeUrl },
  ].filter((l): l is { platform: string; url: string } => Boolean(l.url));
}

/** Extracts a YouTube video id from watch, youtu.be or embed URLs. */
export function getYouTubeId(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com")) {
      return u.searchParams.get("v") ?? u.pathname.match(/\/(?:embed|shorts)\/([\w-]+)/)?.[1] ?? null;
    }
  } catch {}
  return null;
}

/** Preferred in-page player for a release: Spotify (track or album) first, then YouTube. */
export function getEmbedSource(r: Release): EmbedSource | null {
  const spotify = r.spotifyUrl?.match(/open\.spotify\.com\/(track|album)\/([A-Za-z0-9]+)/);
  if (spotify) return { provider: "spotify", kind: spotify[1] as "track" | "album", id: spotify[2] };
  const youtubeId = getYouTubeId(r.youtubeUrl);
  return youtubeId ? { provider: "youtube", id: youtubeId } : null;
}

export function formatReleaseDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Corridor images: published release artwork interleaved with approved photos/atmosphere. */
export function getHeroImages(): StreamImage[] {
  const seen = new Set<string>();
  const covers: StreamImage[] = getPublicReleases()
    .filter((r) => r.published && !r.placeholder)
    // Several tracks can share one cover (same EP); show each image once.
    .filter((r) => {
      const key = r.artwork.replace(/^.*\//, "");
      return !seen.has(key) && seen.add(key);
    })
    .map((r) => ({ src: asset(r.artwork), position: heroCoverPositions[r.id] ?? "50% 50%" }));
  const base: StreamImage[] = heroAtmosphere.map((i) => ({ src: asset(i.src), position: i.position }));
  if (covers.length === 0) return base;
  const out: StreamImage[] = [];
  const n = Math.max(covers.length, base.length);
  for (let i = 0; i < n; i++) {
    if (covers[i]) out.push(covers[i]);
    if (base[i]) out.push(base[i]);
  }
  return out;
}
