import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type PlatformLink = { platform: string; url: string };

/**
 * Text-labelled outbound links to listening platforms. Text labels are
 * used instead of brand logos to avoid misusing trademarks.
 */
export function MusicPlatformLinks({
  links,
  releaseTitle,
  className,
}: {
  links: PlatformLink[];
  releaseTitle?: string;
  className?: string;
}) {
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((l) => (
        <li key={l.platform}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="print-show-url inline-flex h-11 items-center gap-1.5 rounded-full border border-white/15 px-4 text-xs font-semibold tracking-[0.12em] text-ink uppercase transition-colors hover:border-accent/70 hover:text-accent"
          >
            {l.platform}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only">
              {releaseTitle ? ` — listen to ${releaseTitle}` : ""} (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
