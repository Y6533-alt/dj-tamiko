import { ArrowUpRight } from "lucide-react";

import { socialLinks } from "@/content/artist";
import type { SocialPlatform } from "@/content/types";
import { cn } from "@/lib/utils";

const labels: Record<SocialPlatform, string> = {
  spotify: "Spotify",
  instagram: "Instagram",
  youtube: "YouTube",
  soundcloud: "SoundCloud",
  tiktok: "TikTok",
  "apple-music": "Apple Music",
};

/** Renders only verified links from content/artist.ts; renders nothing when none exist. */
export function SocialLinks({ className }: { className?: string }) {
  if (socialLinks.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {socialLinks.map((s) => (
        <li key={s.platform}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer me"
            className="print-show-url inline-flex h-11 items-center gap-1.5 rounded-full border border-white/15 px-4 text-xs font-semibold tracking-[0.12em] uppercase text-ink transition-colors hover:border-accent/70 hover:text-accent"
          >
            {labels[s.platform]}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export const hasSocialLinks = socialLinks.length > 0;
