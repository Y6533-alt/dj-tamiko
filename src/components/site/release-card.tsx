import Image from "next/image";

import type { Release } from "@/content/types";
import { formatReleaseDate, getListenLinks } from "@/lib/content";
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

export function ReleaseCard({ release, headingLevel = "h3" }: { release: Release; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const links = getListenLinks(release);
  const date = formatReleaseDate(release.releaseDate);
  const meta = [release.label, date, release.status === "upcoming" ? "Upcoming" : null].filter(Boolean);

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
      </div>
    </article>
  );
}
