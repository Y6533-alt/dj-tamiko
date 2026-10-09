/**
 * Public site URL. Set NEXT_PUBLIC_SITE_URL (e.g. https://example.com)
 * once the real domain is configured; canonical URLs, the sitemap and
 * structured data use it. Until then nothing claims a production domain.
 */
const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl: string | null = raw ? raw.replace(/\/+$/, "") : null;

/** Sub-path the site is served from (e.g. "/dj-tamiko-site" on GitHub Pages), or "". */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/**
 * Base for absolute metadata URLs. Next already prefixes `basePath`, so it
 * is stripped here to avoid "/dj-tamiko-site/dj-tamiko-site/…".
 */
export const metadataBaseUrl = new URL(
  siteUrl && basePath && siteUrl.endsWith(basePath) ? siteUrl.slice(0, -basePath.length) || siteUrl : siteUrl ?? "http://localhost:3000",
);

/**
 * Prefix a /public path with the base path. next/link adds it automatically;
 * images, plain <img> and file download links do not.
 */
export function asset(path: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/epk", label: "EPK" },
  { href: "/contact", label: "Contact" },
] as const;
