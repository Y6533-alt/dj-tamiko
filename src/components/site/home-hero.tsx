import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";

import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { buttonVariants } from "@/components/ui/button";
import { artist } from "@/content/artist";
import { getHeroImages, getLatestRelease, getListenLinks } from "@/lib/content";

const PORTRAIT_PATHS = [
  {
    media: "(max-aspect-ratio: 4/5)",
    path: { exitHeight: 110, railExit: 24, railBirth: -6, turnExit: 24 },
  },
];

export function HomeHero() {
  const images = getHeroImages();
  const latest = getLatestRelease();
  const listen = latest?.published ? getListenLinks(latest)[0] : undefined;

  return (
    <ImageStreamHero
      images={images}
      cards={9}
      speed={18}
      axis={55}
      className="min-h-[100svh] bg-background"
      // Portrait screens: tighter rails and a taller exit so cards stay large on
      // narrow viewports. Exit cards still leave fully past the edges (no reset jumps).
      mediaPaths={PORTRAIT_PATHS}
      aria-label="Introduction"
      role="region"
    >
      {/* Warm light at the vanishing point + edge vignettes; the corridor stays visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_32%_at_50%_55%,rgb(240_166_106/0.22),transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_10_13/0.88)_0%,rgb(10_10_13/0.2)_30%,transparent_45%,transparent_62%,rgb(10_10_13/0.35)_78%,rgb(10_10_13/0.95)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-between px-4 pt-24 pb-24 text-center sm:px-6 sm:pt-28 sm:pb-20">
        <div className="flex flex-col items-center">
          <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-[11px] font-semibold tracking-[0.28em] text-accent-soft uppercase sm:text-sm sm:tracking-[0.32em]">
            {artist.genres.map((g, i) => (
              <span key={g} className="whitespace-nowrap">
                {i > 0 && (
                  <span aria-hidden className="mr-3 text-accent">
                    /
                  </span>
                )}
                {g}
              </span>
            ))}
          </p>
          <h1 className="mt-3 font-display text-[clamp(3.6rem,15vw,11.5rem)] leading-[0.9] font-bold tracking-[-0.02em] text-ink [text-shadow:0_6px_40px_rgb(0_0_0/0.55)]">
            <span className="sr-only">DJ </span>
            {artist.wordmark}
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-display text-xl font-medium text-ink [text-shadow:0_2px_20px_rgb(0_0_0/0.7)] sm:text-2xl">
            {artist.tagline}
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            {listen ? (
              <a href={listen.url} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
                <Headphones aria-hidden />
                Listen now
                <span className="sr-only"> on {listen.platform} (opens in a new tab)</span>
              </a>
            ) : (
              <Link href="/music" className={buttonVariants()}>
                <Headphones aria-hidden />
                Listen now
              </Link>
            )}
            <Link href="/epk" className={buttonVariants({ variant: "outline" })}>
              Explore EPK
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </ImageStreamHero>
  );
}
