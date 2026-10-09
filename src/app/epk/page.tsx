import Image from "next/image";
import { Mail } from "lucide-react";

import { approvedBioText, ArtistBio } from "@/components/site/artist-bio";
import { CopyButton } from "@/components/site/copy-button";
import { MusicPlatformLinks } from "@/components/site/music-platform-links";
import { PrintButton } from "@/components/site/print-button";
import { ReleaseArtwork } from "@/components/site/release-card";
import { SocialLinks, hasSocialLinks } from "@/components/site/social-links";
import { buttonVariants } from "@/components/ui/button";
import { artist, artistPhotos, bio } from "@/content/artist";
import { formatReleaseDate, getGroupedReleases, getListenLinks, getPublicReleases } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { asset } from "@/lib/site";
import { gmailLinkProps } from "@/lib/email";

export const metadata = pageMetadata({
  title: "EPK — Electronic Press Kit",
  description: `Official electronic press kit for ${artist.name}: biography, music, press photos and booking contact.`,
  path: "/epk",
});

function EpkBlock({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="print-break-inside-avoid border-t border-white/[0.08] py-12 sm:py-16">
      <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
        <h2 id={id} className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function EpkPage() {
  const releases = getPublicReleases();
  const groups = getGroupedReleases();
  const labels = [...new Set(releases.filter((r) => r.published).map((r) => r.label).filter(Boolean))] as string[];
  const photos = artistPhotos.filter((p) => p.approved);
  const shortBio = approvedBioText("short");
  const longBio = approvedBioText("long");

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 sm:pt-36 lg:px-8">
      {/* Profile */}
      <header className="grid items-end gap-10 pb-12 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            Electronic press kit
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">{artist.name}</h1>
          <p className="mt-4 text-lg text-ink-muted">{artist.role}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Genres">
            {artist.genres.map((g) => (
              <li key={g} className="rounded-full border border-accent/40 px-4 py-1.5 text-sm text-accent-soft">
                {g}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a {...gmailLinkProps("Booking inquiry")} className={buttonVariants({ size: "sm", className: "no-print" })}>
              <Mail aria-hidden /> Booking inquiry
            </a>
            <PrintButton />
          </div>
        </div>
        {photos[0] && (
          <div className="relative aspect-[412/468] w-full max-w-64 overflow-hidden rounded-[var(--radius-card)]">
            <Image src={asset(photos[0].src)} alt={photos[0].alt} fill priority sizes="16rem" className="object-cover" />
          </div>
        )}
      </header>

      <EpkBlock id="epk-bio" title="Biography">
        <ArtistBio variant="long" />
        <div className="mt-6 flex flex-wrap gap-3">
          {shortBio && <CopyButton text={shortBio} label="Copy short bio" />}
          {longBio && longBio !== shortBio && <CopyButton text={longBio} label="Copy full bio" />}
        </div>
        {!bio.long.some((p) => p.approved) && (
          <p className="no-print mt-4 text-xs text-ink-muted">Extended biography available on request.</p>
        )}
      </EpkBlock>

      <EpkBlock id="epk-music" title="Discography">
        {groups.length > 0 ? (
          <>
            <p className="font-display text-lg font-semibold text-ink">
              {groups.map((g) => `${g.releases.length} ${g.releases.length === 1 ? g.title.replace(/s$/, "") : g.title}`).join(" · ")}
            </p>
            <div className="mt-10 grid gap-12">
              {groups.map((g) => (
                <div key={g.id}>
                  <h3 className="font-display text-xs font-semibold tracking-[0.24em] text-ink-muted uppercase">{g.title}</h3>
                  <ul className="mt-5 grid gap-x-8 gap-y-7 md:grid-cols-2">
                    {g.releases.map((r) => {
                      const typeLine = r.tracks?.length ? `${r.tracks.length} tracks` : null;
                      const meta = [r.credit, typeLine, r.label, formatReleaseDate(r.releaseDate)].filter(Boolean).join(" · ");
                      return (
                        <li key={r.id} className="print-break-inside-avoid grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
                          <ReleaseArtwork release={r} sizes="5.5rem" className="rounded-xl" />
                          <div className="min-w-0">
                            <h4 className="font-display text-lg font-semibold">{r.title}</h4>
                            {meta && <p className="text-sm text-ink-muted">{meta}</p>}
                            <MusicPlatformLinks links={getListenLinks(r)} releaseTitle={r.title} className="mt-3" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-ink-muted">
            Release information will be listed here. Promos and unreleased material are available on request via{" "}
            <a className="text-accent underline underline-offset-4 hover:text-ink" {...gmailLinkProps()}>
              {artist.email}
            </a>
            .
          </p>
        )}
      </EpkBlock>

      {labels.length > 0 && (
        <EpkBlock id="epk-labels" title="Labels">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
            {labels.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </EpkBlock>
      )}

      {photos.length > 0 && (
        <EpkBlock id="epk-photos" title="Photos">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <div
                key={p.src}
                className="print-break-inside-avoid relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08]"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
              >
                <Image
                  src={asset(p.src)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </EpkBlock>
      )}

      {hasSocialLinks && (
        <EpkBlock id="epk-links" title="Links">
          <SocialLinks />
        </EpkBlock>
      )}

      <EpkBlock id="epk-contact" title="Contact">
        <p className="text-ink-muted">Bookings, collaborations, label and A&amp;R inquiries:</p>
        <a
          {...gmailLinkProps()}
          className="mt-3 inline-block font-display text-2xl font-semibold break-all text-ink hover:text-accent sm:text-3xl"
        >
          {artist.email}
        </a>
        <div className="mt-5">
          <CopyButton text={artist.email} label="Copy email" />
        </div>
      </EpkBlock>
    </div>
  );
}
