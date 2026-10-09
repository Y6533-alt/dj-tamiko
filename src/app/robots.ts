import type { MetadataRoute } from "next";

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
