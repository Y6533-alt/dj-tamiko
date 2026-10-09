import type { Metadata } from "next";

import { artist } from "@/content/artist";
import { basePath, siteUrl } from "./site";

/** Per-page metadata with canonical URLs only once a real domain is configured. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} · ${artist.name}` : `${artist.name} — Deep, Tropical & Chill House`;
  // Page URLs aren't prefixed with basePath by Next (unlike image files), and
  // exports use trailing slashes.
  const trailing = process.env.GITHUB_PAGES === "true" && path !== "/" ? "/" : "";
  const url = `${basePath}${path}${trailing}`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: siteUrl ? { canonical: url } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: artist.name,
      type: path === "/" ? "website" : "profile",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
