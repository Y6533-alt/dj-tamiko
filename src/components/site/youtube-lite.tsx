"use client";

import * as React from "react";
import { Play } from "lucide-react";

/**
 * Click-to-load YouTube player. Nothing loads from YouTube (and nothing
 * plays) until the visitor presses play; uses the privacy-enhanced domain.
 */
export function YouTubeLite({
  videoId,
  title,
  children,
}: {
  videoId: string;
  title: string;
  /** Poster shown before activation (the release artwork). */
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState(false);

  if (active) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`${title} — YouTube video player`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
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
        <span className="sr-only">Play {title} on this page (loads YouTube)</span>
      </button>
    </div>
  );
}
