import type { MetadataRoute } from "next";

// Generated once at build time (required for the static GitHub Pages export).
export const dynamic = "force-static";

import { navItems, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // siteUrl may include a sub-path (GitHub Pages), so join as strings.
  const base = siteUrl ?? "http://localhost:3000";
  return navItems.map((item) => ({
    url: `${base}${item.href === "/" ? "/" : `${item.href}/`}`,
    changeFrequency: item.href === "/music" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
