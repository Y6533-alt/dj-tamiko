import Link from "next/link";
import { Mail } from "lucide-react";

import { artist } from "@/content/artist";
import { gmailLinkProps } from "@/lib/email";
import { navItems } from "@/lib/site";
import { SocialLinks } from "./social-links";

export function ArtistFooter() {
  return (
    <footer className="no-print border-t border-white/[0.07] bg-background-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.18em]">
            DJ <span className="text-accent">{artist.wordmark}</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{artist.genres.join(" · ")}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-ink-muted uppercase">Explore</h2>
          <ul className="mt-3 grid gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-9 items-center text-sm text-ink hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-ink-muted uppercase">Contact</h2>
          <a
            {...gmailLinkProps()}
            className="mt-3 inline-flex min-h-9 items-center gap-2 text-sm break-all text-ink hover:text-accent"
          >
            <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            {artist.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-8 text-xs leading-relaxed text-ink-muted sm:px-6 lg:px-8">
          <p className="font-medium text-ink/80">
            © {new Date().getFullYear()} {artist.name}. All rights reserved.
          </p>
          <p className="max-w-4xl">
            All music, recordings, compositions, artwork, photos and other content on this website are protected by
            copyright and are the property of {artist.name} and, where applicable, the respective co-artists and rights
            holders.
          </p>
          <p className="max-w-4xl">
            No music or content may be used without the prior written permission of the artist. This includes, without
            limitation, copying, downloading, re-uploading, distributing, remixing, sampling, editing, synchronising with
            video or film, broadcasting, public performance, and any commercial or promotional use. Unauthorised use may
            constitute copyright infringement.
          </p>
          <p>
            For licensing, permission or usage requests, contact{" "}
            <a
              {...gmailLinkProps("Licensing / permission request")}
              className="text-ink/80 underline underline-offset-4 hover:text-accent"
            >
              {artist.email}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
