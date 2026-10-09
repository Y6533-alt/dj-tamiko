import Image from "next/image";
import { Mail } from "lucide-react";

import { approvedBioText, ArtistBio } from "@/components/site/artist-bio";
import { CopyButton } from "@/components/site/copy-button";
import { MusicPlatformLinks } from "@/components/site/music-platform-links";
import { PressAssetCard, isDownloadable } from "@/components/site/press-asset-card";
import { PrintButton } from "@/components/site/print-button";
import { ReleaseArtwork } from "@/components/site/release-card";
import { SocialLinks, hasSocialLinks } from "@/components/site/social-links";
import { buttonVariants } from "@/components/ui/button";
import { artist, artistPhotos, bio } from "@/content/artist";
import { pressAssets } from "@/content/press-assets";
import { formatReleaseDate, getListenLinks, getPublicReleases } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

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
  const labels = [...new Set(releases.filter((r) => r.published).map((r) => r.label).filter(Boolean))] as string[];
  const photos = artistPhotos.filter((p) => p.approved);
  const downloads = pressAssets.filter(isDownloadable);
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
            <a href={`mailto:${artist.email}?subject=${encodeURIComponent("Booking inquiry")}`} className={buttonVariants({ size: "sm", className: "no-print" })}>
              <Mail aria-hidden /> Booking inquiry
            </a>
            <PrintButton />
          </div>
        </div>
        {photos[0] && (
          <div className="relative aspect-[412/512] w-full max-w-64 overflow-hidden rounded-[var(--radius-card)]">
            <Image src={photos[0].src} alt={photos[0].alt} fill priority sizes="16rem" className="object-cover" />
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

      <EpkBlock id="epk-music" title="Selected music">
        {releases.length > 0 ? (
          <ul className="grid gap-8">
            {releases.slice(0, 6).map((r) => {
              const meta = [r.label, formatReleaseDate(r.releaseDate)].filter(Boolean).join(" · ");
              return (
                <li key={r.id} className="print-break-inside-avoid grid grid-cols-[5.5rem_minmax(0,1fr)] gap-5 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <ReleaseArtwork release={r} sizes="7rem" className="rounded-xl" />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                    {meta && <p className="text-sm text-ink-muted">{meta}</p>}
                    <MusicPlatformLinks links={getListenLinks(r)} releaseTitle={r.title} className="mt-3" />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-ink-muted">
            Release information will be listed here. Promos and unreleased material are available on request via{" "}
            <a className="print-show-url text-accent underline underline-offset-4 hover:text-ink" href={`mailto:${artist.email}`}>
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

      {downloads.length > 0 && (
        <EpkBlock id="epk-press" title="Press assets">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((a) => (
              <PressAssetCard key={a.id} asset={a} />
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
          href={`mailto:${artist.email}`}
          className="print-show-url mt-3 inline-block font-display text-2xl font-semibold break-all text-ink hover:text-accent sm:text-3xl"
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
