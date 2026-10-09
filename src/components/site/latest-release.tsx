import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import type { Release } from "@/content/types";
import { artist } from "@/content/artist";
import { formatReleaseDate, getEmbedSource, getListenLinks } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { MusicPlatformLinks } from "./music-platform-links";
import { ReleaseArtwork } from "./release-card";
import { EmbedLite } from "./embed-lite";

export function LatestRelease({ release }: { release: Release }) {
  const links = getListenLinks(release);
  const primary = links[0];
  const date = formatReleaseDate(release.releaseDate);
  const embed = getEmbedSource(release);
  const artwork = (
    <ReleaseArtwork
      release={release}
      sizes="(min-width: 768px) 40vw, 90vw"
      className="shadow-[0_40px_80px_-30px_rgb(240_166_106/0.35)]"
    />
  );

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-14">
      {embed ? (
        <EmbedLite source={embed} title={release.title}>
          {artwork}
        </EmbedLite>
      ) : (
        artwork
      )}
      <div>
        <p className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">Latest release</p>
        <h3 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{release.title}</h3>
        {release.credit && <p className="mt-2 text-lg text-accent-soft">{release.credit}</p>}
        <dl className="mt-5 grid gap-1 text-sm text-ink-muted">
          {release.label && (
            <div className="flex gap-2">
              <dt className="sr-only">Label</dt>
              <dd>{release.label}</dd>
            </div>
          )}
          {date && (
            <div className="flex gap-2">
              <dt className="sr-only">Release date</dt>
              <dd>{date}</dd>
            </div>
          )}
          {release.genres.length > 0 && (
            <div className="flex gap-2">
              <dt className="sr-only">Genres</dt>
              <dd className="tracking-[0.14em] text-accent-soft uppercase">{release.genres.join(" / ")}</dd>
            </div>
          )}
        </dl>
        {primary && (
          <a
            href={primary.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ className: "mt-8" })}
          >
            Stream now
            <ArrowRight aria-hidden />
            <span className="sr-only"> on {primary.platform} (opens in a new tab)</span>
          </a>
        )}
        {links.length > 1 && <MusicPlatformLinks links={links.slice(1)} releaseTitle={release.title} className="mt-5" />}
      </div>
    </div>
  );
}

/** Shown wherever music would appear while no approved release exists yet. */
export function MusicEmptyState({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-surface/60 p-8 sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <p className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">Music</p>
      <p className={compact ? "mt-3 font-display text-2xl font-semibold" : "mt-3 font-display text-3xl font-semibold sm:text-4xl"}>
        Releases will appear here as they go live.
      </p>
      <p className="mt-3 max-w-xl text-ink-muted">
        For promos, previews and label submissions, reach out directly.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={`mailto:${artist.email}?subject=${encodeURIComponent("Promo request")}`} className={buttonVariants()}>
          <Mail aria-hidden />
          Request promos
        </a>
        <Link href="/epk" className={buttonVariants({ variant: "outline" })}>
          View EPK
        </Link>
      </div>
    </div>
  );
}
