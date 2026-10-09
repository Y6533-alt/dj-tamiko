import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import type { Release } from "@/content/types";
import { formatReleaseDate, getListenLinks, releaseTypeLabel } from "@/lib/content";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MusicPlatformLinks } from "./music-platform-links";

export function DraftBadge({ release }: { release: Release }) {
  if (release.published && !release.placeholder) return null;
  return (
    <span className="absolute top-3 left-3 z-10 rounded-full bg-black/80 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-accent uppercase ring-1 ring-accent/60">
      Draft preview · not public
    </span>
  );
}

export function ReleaseArtwork({
  release,
  sizes,
  priority,
  className,
}: {
  release: Release;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const contain = release.artworkFit === "contain";
  const svg = release.artwork.endsWith(".svg");
  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-surface", className)}>
      <DraftBadge release={release} />
      {contain && (
        // Blurred fill of the same art so non-square artwork sits uncropped in the square frame.
        <Image
          src={asset(release.artwork)}
          alt=""
          aria-hidden
          fill
          sizes="64px"
          unoptimized={svg}
          className="scale-125 object-cover opacity-55 blur-2xl"
        />
      )}
      <Image
        src={asset(release.artwork)}
        alt={release.artworkAlt ?? `Artwork for ${release.title}`}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={svg}
        className={cn(
          "transition-transform duration-500 group-hover:scale-[1.03]",
          contain ? "object-contain drop-shadow-[0_12px_30px_rgb(0_0_0/0.5)]" : "object-cover",
        )}
      />
    </div>
  );
}

/** Collapsible, numbered tracklist; each track links to its own Spotify page. */
export function Tracklist({ release, open = false }: { release: Release; open?: boolean }) {
  const tracks = release.tracks ?? [];
  return (
    <details open={open} className="group/tl mt-5 border-t border-white/[0.08] pt-4">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase hover:text-ink [&::-webkit-details-marker]:hidden">
        Tracklist ({tracks.length})
        <ChevronDown className="h-4 w-4 transition-transform group-open/tl:rotate-180" aria-hidden />
      </summary>
      <ol className="mt-2 grid gap-0.5">
        {tracks.map((t, i) => {
          const label = (
            <>
              <span className="w-6 shrink-0 text-right text-xs tabular-nums text-ink-muted">{i + 1}</span>
              <span className="min-w-0 flex-1">
                {t.title}
                {t.credit && <span className="text-ink-muted"> · {t.credit}</span>}
              </span>
            </>
          );
          return (
            <li key={`${i}-${t.title}`}>
              {t.spotifyUrl ? (
                <a
                  href={t.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-10 items-center gap-3 rounded-lg px-1 text-sm text-ink/90 transition-colors hover:bg-white/5 hover:text-accent"
                >
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
                  <span className="sr-only"> — listen on Spotify (opens in a new tab)</span>
                </a>
              ) : (
                <span className="flex min-h-10 items-center gap-3 px-1 text-sm text-ink/90">{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </details>
  );
}

export function ReleaseCard({
  release,
  headingLevel = "h3",
  showTracklist = false,
}: {
  release: Release;
  headingLevel?: "h2" | "h3";
  /** Show an expandable tracklist for albums / EPs (used on /music). */
  showTracklist?: boolean;
}) {
  const Heading = headingLevel;
  const links = getListenLinks(release);
  const date = formatReleaseDate(release.releaseDate);
  const tracks = release.tracks ?? [];
  const typeLine =
    release.type !== "single"
      ? `${releaseTypeLabel[release.type]}${tracks.length ? ` · ${tracks.length} tracks` : ""}`
      : null;
  const meta = [typeLine, release.label, date, release.status === "upcoming" ? "Upcoming" : null].filter(Boolean);

  return (
    <article className="group print-break-inside-avoid flex flex-col">
      <ReleaseArtwork release={release} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw" />
      <div className="mt-4 flex flex-1 flex-col">
        <Heading className="font-display text-lg font-semibold tracking-wide text-ink">{release.title}</Heading>
        {release.credit && <p className="mt-0.5 text-sm text-accent-soft">{release.credit}</p>}
        {meta.length > 0 && <p className="mt-1 text-sm text-ink-muted">{meta.join(" · ")}</p>}
        {release.genres.length > 0 && (
          <p className="mt-1 text-xs tracking-[0.14em] text-accent-soft uppercase">{release.genres.join(" / ")}</p>
        )}
        {links.length > 0 ? (
          <MusicPlatformLinks links={links} releaseTitle={release.title} className="mt-4" />
        ) : (
          <p className="mt-4 text-xs text-ink-muted">Listening links coming soon.</p>
        )}
        {showTracklist && tracks.length > 0 && <Tracklist release={release} />}
      </div>
    </article>
  );
}
