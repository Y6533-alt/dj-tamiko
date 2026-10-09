# DJ TAMIKØ — official website & EPK

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui conventions · lucide-react.

Routes: `/` · `/music` · `/about` · `/epk` · `/contact` (plus `/sitemap.xml`, `/robots.txt`, `/opengraph-image`).
All pages are statically prerendered.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm run start   # production check
```

Requires Node.js 20.9+.

## Editing content (no component changes needed)

All content lives in typed files under `src/content/`:

| File | What it holds |
| --- | --- |
| `artist.ts` | Name, genres, tagline, email, **bio** (short / long / musical direction), **social links**, artist photos |
| `releases.ts` | Release library (one record per release) |
| `press-assets.ts` | EPK downloads (button only appears when the file exists **and** `approvedForDistribution: true`) |
| `hero-images.ts` | Homepage corridor imagery + framing for release covers |

**Add a release:** put artwork in `public/images/releases/`, add one record to `releases.ts`
with `published: true`. Latest release, featured tracks, the Music page, the EPK and the hero
corridor update automatically. `status` (released / upcoming / draft) is separate from
`published` (editorial approval) — unpublished records never appear publicly.

- Square covers: `artworkFit: "cover"` (default). Non-square art (e.g. YouTube thumbnails):
  `artworkFit: "contain"` shows it uncropped on a blurred fill.
- `featured: true` picks the home-page "Latest release".
- Preview unpublished records locally: `SHOW_DRAFT_CONTENT=true npm run dev` (they show a
  "Draft preview · not public" badge). Never set this in production.

**Bio:** only blocks with `approved: true` render. Replace the long-bio placeholder in
`artist.ts` with the approved text and set `approved: true`.

**Social links:** add only real profile URLs to `socialLinks` in `artist.ts`.

## Key components

- `src/components/ui/image-stream-hero.tsx` — the 3D corridor hero (pure CSS keyframes
  generated per instance; `cards`, `speed`, `axis`, `path`, `mediaPaths` props). Reduced
  motion freezes cards at their staggered positions; a pause/play button is built in; motion
  pauses when the hero is offscreen. `mediaPaths` supplies a taller, tighter corridor for
  portrait screens.
- `src/components/ui/button.tsx` — shadcn-style button (`cva`); `cn` lives in `src/lib/utils.ts`.
- `src/components/site/*` — header, footer, release card, latest release, platform links,
  bio, press asset card, contact CTA, click-to-load YouTube player.

`components/ui` holds reusable primitives so `npx shadcn add <component>` drops new ones in the
same place (see `components.json`, alias `@/` → `src/`).

## SEO

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) once the real domain exists. Until then the
site emits `noindex` and `robots.txt` disallows crawling, so previews never get indexed, and no
canonical URLs are claimed. With it set: canonical URLs, absolute OG URLs, sitemap reference
and `MusicGroup` structured data with `url`/`image`.

## Deploy — GitHub Pages (configured)

`.github/workflows/deploy-pages.yml` builds a static export and publishes it on every push to
`main`. One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

- The workflow sets `GITHUB_PAGES=true`, the repo sub-path (`NEXT_PUBLIC_BASE_PATH`) and the
  public URL (`NEXT_PUBLIC_SITE_URL`) automatically.
- Use `asset("/images/...")` from `@/lib/site` for any new `<Image>`/`<img>`/file link so it
  works under the sub-path (`next/link` handles it automatically).
- Test the export locally: `GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/dj-tamiko-site npm run build`
  → output in `out/`.
- Custom domain: add it in Settings → Pages, then set `NEXT_PUBLIC_SITE_URL` to it and clear
  the base path in the workflow.

## Deploy — alternative: Vercel

Zero-config for Next.js (keeps image optimization), on an artist-owned account.

1. Push this repo to GitHub (artist-owned account).
2. Import it in Vercel → framework auto-detected → Deploy.
3. Add env var `NEXT_PUBLIC_SITE_URL=https://<real-domain>` and redeploy.
4. Connect the artist-owned domain in Vercel → Domains.

Any Node host works too: `npm run build && npm run start`.

## Analytics (optional, not installed)

If wanted, use a privacy-friendly option (e.g. Vercel Web Analytics or Plausible). Count
outbound listening-link clicks as *clicks*, not streams.
