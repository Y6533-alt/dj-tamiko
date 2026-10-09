import type { MetadataRoute } from "next";

import { metadataBaseUrl, navItems } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = metadataBaseUrl.origin;
  return navItems.map((item) => ({
    url: `${base}${item.href === "/" ? "" : item.href}`,
    changeFrequency: item.href === "/music" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
