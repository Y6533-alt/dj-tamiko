import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true (set by .github/workflows/deploy-pages.yml) builds a
 * static export into /out. NEXT_PUBLIC_BASE_PATH is the repo sub-path,
 * e.g. "/dj-tamiko-site". Local `npm run dev` / `build` / `start` are unaffected.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

// Cache Components are off: every page is static, and static export
// requires `dynamic = "force-static"` on metadata routes, which they forbid.
const nextConfig: NextConfig = {
  ...(isPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    // GitHub Pages has no image-optimization server.
    images: { unoptimized: true },
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
