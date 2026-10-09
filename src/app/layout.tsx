import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { ArtistFooter } from "@/components/site/artist-footer";
import { ArtistHeader } from "@/components/site/artist-header";
import { artist, bio } from "@/content/artist";
import { metadataBaseUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: {
    default: `${artist.name} — Deep, Tropical & Chill House`,
    template: `%s · ${artist.name}`,
  },
  description: bio.short.text,
  applicationName: artist.name,
  creator: artist.name,
  robots: siteUrl ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { siteName: artist.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-dvh bg-background font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <ArtistHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <ArtistFooter />
      </body>
    </html>
  );
}
