import { MusicEmptyState } from "@/components/site/latest-release";
import { ReleaseCard } from "@/components/site/release-card";
import { PageIntro } from "@/components/site/section";
import { artist } from "@/content/artist";
import { getGroupedReleases } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Music",
  description: `Albums, singles and collaborations by ${artist.name}. Stream every release on your preferred platform.`,
  path: "/music",
});

const groupNotes: Partial<Record<string, string>> = {
  collaborations: "Releases by other artists featuring DJ TAMIKØ.",
  youtube: "Available on YouTube.",
};

export default function MusicPage() {
  const groups = getGroupedReleases();

  return (
    <>
      <PageIntro eyebrow={artist.genres.join(" / ")} title="Music">
        <p>Official releases by {artist.name}. Every link opens the track on its streaming platform.</p>
      </PageIntro>

      {groups.length > 0 ? (
        <>
          <nav aria-label="Catalog sections" className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-semibold tracking-[0.12em] text-ink uppercase transition-colors hover:border-accent/70 hover:text-accent"
                  >
                    {g.title}
                    <span className="text-ink-muted tabular-nums">{g.releases.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="scroll-mt-24 py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.06] pb-4 sm:mb-10">
                  <div>
                    <h2 id={`${g.id}-heading`} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      {g.title}
                    </h2>
                    {groupNotes[g.id] && <p className="mt-2 text-sm text-ink-muted">{groupNotes[g.id]}</p>}
                  </div>
                  <p className="text-sm text-ink-muted tabular-nums">
                    {g.releases.length} {g.releases.length === 1 ? "release" : "releases"}
                  </p>
                </div>
                <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {g.releases.map((r) => (
                    <li key={r.id} className="reveal">
                      <ReleaseCard release={r} showTracklist />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </>
      ) : (
        <section aria-label="Releases" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MusicEmptyState />
          </div>
        </section>
      )}
    </>
  );
}
