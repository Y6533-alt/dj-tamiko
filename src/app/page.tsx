import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArtistBio } from "@/components/site/artist-bio";
import { ContactSection } from "@/components/site/contact-section";
import { HomeHero } from "@/components/site/home-hero";
import { LatestRelease, MusicEmptyState } from "@/components/site/latest-release";
import { ReleaseCard } from "@/components/site/release-card";
import { Section } from "@/components/site/section";
import { SocialLinks, hasSocialLinks } from "@/components/site/social-links";
import { buttonVariants } from "@/components/ui/button";
import { artist, bio, primaryPhoto, socialLinks } from "@/content/artist";
import { getFeaturedReleases, getLatestRelease } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { asset, siteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  description: `${bio.short.text} Listen, explore the EPK and get in touch for bookings and collaborations.`,
  path: "/",
});

function StructuredData() {
  // MusicGroup is schema.org's type for musical acts, including solo artists.
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    genre: [...artist.genres],
    description: bio.short.text,
    email: `mailto:${artist.email}`,
  };
  if (siteUrl) {
    data.url = siteUrl;
    if (primaryPhoto) data.image = `${siteUrl}${primaryPhoto.src}`;
  }
  if (socialLinks.length) data.sameAs = socialLinks.map((s) => s.url);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function HomePage() {
  const latest = getLatestRelease();
  const featured = getFeaturedReleases(4, latest?.id);

  return (
    <>
      <StructuredData />
      <HomeHero />

      <Section id="music" eyebrow="New music" title={latest ? "Latest release" : "Music"}>
        <div className="reveal">{latest ? <LatestRelease release={latest} /> : <MusicEmptyState />}</div>
      </Section>

      {featured.length > 0 && (
        <Section
          id="featured"
          eyebrow="Selected"
          title="Featured music"
          className="bg-background-2"
          action={
            <Link href="/music" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              All music <ArrowRight aria-hidden />
            </Link>
          }
        >
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((r) => (
              <div key={r.id} className="reveal">
                <ReleaseCard release={r} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section id="about" eyebrow="The artist" title={`About ${artist.name}`}>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          {primaryPhoto && (
            <div className="reveal relative mx-auto aspect-[412/512] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] md:max-w-none">
              <Image
                src={asset(primaryPhoto.src)}
                alt={primaryPhoto.alt}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[var(--radius-card)]" />
            </div>
          )}
          <div className="reveal">
            <ArtistBio variant="long" />
            <Link href="/about" className={buttonVariants({ variant: "outline", className: "mt-8" })}>
              Read the full bio <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {hasSocialLinks && (
        <Section id="follow" eyebrow="Follow" title="Find TAMIKØ online" className="bg-background-2">
          <SocialLinks />
        </Section>
      )}

      <ContactSection />
    </>
  );
}
