import { MusicEmptyState } from "@/components/site/latest-release";
import { ReleaseCard } from "@/components/site/release-card";
import { PageIntro } from "@/components/site/section";
import { artist } from "@/content/artist";
import { getPublicReleases } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Music",
  description: `Releases by ${artist.name} — ${artist.genres.join(", ").toLowerCase()}. Stream on your preferred platform.`,
  path: "/music",
});

export default function MusicPage() {
  const releases = getPublicReleases();

  return (
    <>
      <PageIntro eyebrow={artist.genres.join(" / ")} title="Music">
        <p>Official releases by {artist.name}. Every link opens the track on its streaming platform.</p>
      </PageIntro>

      <section aria-labelledby="releases-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="releases-heading" className="sr-only">
            Releases
          </h2>
          {releases.length > 0 ? (
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {releases.map((r) => (
                <li key={r.id} className="reveal">
                  <ReleaseCard release={r} />
                </li>
              ))}
            </ul>
          ) : (
            <MusicEmptyState />
          )}
        </div>
      </section>
    </>
  );
}
