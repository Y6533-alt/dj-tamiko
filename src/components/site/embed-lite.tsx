"use client";

import * as React from "react";
import { Play } from "lucide-react";

export type EmbedSource = { provider: "youtube" | "spotify"; id: string };

/**
 * Click-to-load player for YouTube or Spotify. Nothing loads from the
 * provider (and nothing plays) until the visitor presses play.
 */
export function EmbedLite({
  source,
  title,
  children,
}: {
  source: EmbedSource;
  title: string;
  /** Poster shown before activation (the release artwork). */
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState(false);
  const isYouTube = source.provider === "youtube";
  const providerName = isYouTube ? "YouTube" : "Spotify";

  if (active) {
    return isYouTube ? (
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0`}
          title={`${title} — YouTube video player`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    ) : (
      <iframe
        src={`https://open.spotify.com/embed/track/${source.id}?utm_source=generator&theme=0`}
        title={`${title} — Spotify player`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="h-[352px] w-full rounded-[var(--radius-card)] border-0"
      />
    );
  }

  return (
    <div className="relative">
      {children}
      <button
        type="button"
        onClick={() => setActive(true)}
        className="no-print group/play absolute inset-0 flex items-center justify-center rounded-[var(--radius-card)]"
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_10px_40px_-6px_rgb(240_166_106/0.7)] transition-transform duration-200 group-hover/play:scale-110">
          <Play className="ml-1 h-6 w-6 fill-current" aria-hidden />
        </span>
        <span className="sr-only">
          Play {title} on this page (loads {providerName})
        </span>
      </button>
    </div>
  );
}
