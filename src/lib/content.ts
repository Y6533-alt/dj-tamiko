import { releases } from "@/content/releases";
import { heroAtmosphere, heroCoverPositions } from "@/content/hero-images";
import type { Release } from "@/content/types";
import { asset } from "@/lib/site";
import type { StreamImage } from "@/components/ui/image-stream-hero";

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

/** Latest *official* release: published and actually released. */
export function getLatestRelease(): Release | null {
  const list = getPublicReleases();
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

export function formatReleaseDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Corridor images: published release artwork interleaved with approved photos/atmosphere. */
export function getHeroImages(): StreamImage[] {
  const covers: StreamImage[] = getPublicReleases()
    .filter((r) => r.published && !r.placeholder)
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
