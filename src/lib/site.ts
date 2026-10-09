/**
 * Public site URL. Set NEXT_PUBLIC_SITE_URL (e.g. https://example.com)
 * once the real domain is configured; canonical URLs, the sitemap and
 * structured data use it. Until then nothing claims a production domain.
 */
const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl: string | null = raw ? raw.replace(/\/+$/, "") : null;

/** Base used for absolute metadata URLs; falls back to localhost in development. */
export const metadataBaseUrl = new URL(siteUrl ?? "http://localhost:3000");

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/epk", label: "EPK" },
  { href: "/contact", label: "Contact" },
] as const;
