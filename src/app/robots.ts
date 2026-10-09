import type { MetadataRoute } from "next";

// Generated once at build time (required for the static GitHub Pages export).
export const dynamic = "force-static";

import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Until the real domain is configured, keep previews out of search engines.
  if (!siteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
