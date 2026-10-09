import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { ArtistBio } from "@/components/site/artist-bio";
import { ReleaseCard } from "@/components/site/release-card";
import { PageIntro, Section } from "@/components/site/section";
import { SocialLinks, hasSocialLinks } from "@/components/site/social-links";
import { buttonVariants } from "@/components/ui/button";
import { artist, bio, primaryPhoto } from "@/content/artist";
import { getFeaturedReleases } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: bio.short.text,
  path: "/about",
});

export default function AboutPage() {
  const selected = getFeaturedReleases(3);

  return (
    <>
      <PageIntro eyebrow={artist.role} title={artist.name} />

      <section aria-labelledby="bio-heading" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:px-8">
          {primaryPhoto && (
            <figure className="relative mx-auto aspect-[412/512] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] md:sticky md:top-28 md:max-w-none">
              <Image
                src={primaryPhoto.src}
                alt={primaryPhoto.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
              {primaryPhoto.credit && (
                <figcaption className="absolute right-3 bottom-3 rounded bg-black/60 px-2 py-1 text-[11px] text-ink-muted">
                  Photo: {primaryPhoto.credit}
                </figcaption>
              )}
            </figure>
          )}

          <div>
            <h2 id="bio-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Biography
            </h2>
            <div className="mt-6">
              <ArtistBio variant="long" />
            </div>

            <h2 className="mt-14 font-display text-2xl font-bold tracking-tight">Musical direction</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {artist.genres.map((g) => (
                <li
                  key={g}
                  className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent-soft"
                >
                  {g}
                </li>
              ))}
            </ul>

            {hasSocialLinks && (
              <>
                <h2 className="mt-14 font-display text-2xl font-bold tracking-tight">Listen & follow</h2>
                <SocialLinks className="mt-5" />
              </>
            )}

            <div className="mt-14 flex flex-wrap gap-3">
              <Link href="/epk" className={buttonVariants()}>
                Explore EPK <ArrowRight aria-hidden />
              </Link>
              <a href={`mailto:${artist.email}`} className={buttonVariants({ variant: "outline" })}>
                <Mail aria-hidden /> Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {selected.length > 0 && (
        <Section id="selected" eyebrow="Discography" title="Selected releases" className="bg-background-2">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {selected.map((r) => (
              <ReleaseCard key={r.id} release={r} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
