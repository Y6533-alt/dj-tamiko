import { ArrowUpRight, Mail } from "lucide-react";

import { CopyButton } from "@/components/site/copy-button";
import { PageIntro } from "@/components/site/section";
import { SocialLinks, hasSocialLinks } from "@/components/site/social-links";
import { buttonVariants } from "@/components/ui/button";
import { artist } from "@/content/artist";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${artist.name} for bookings, music collaborations, label and A&R, and general inquiries.`,
  path: "/contact",
});

/**
 * No form backend is configured, so inquiries go straight to email.
 * Each type pre-fills a subject line and a short checklist.
 */
const inquiryTypes = [
  {
    title: "Bookings",
    description: "Clubs, festivals, private and brand events.",
    subject: "Booking inquiry",
    body: "Event name:\nDate:\nCity / venue:\nSet length & time:\nExpected capacity:\nBudget / fee range:\n",
  },
  {
    title: "Music Collaboration",
    description: "Co-productions, vocals, remixes.",
    subject: "Music collaboration",
    body: "Project:\nYour role / links to your work:\nTimeline:\n",
  },
  {
    title: "Label / A&R",
    description: "Releases, signings, promo requests.",
    subject: "Label / A&R inquiry",
    body: "Label / company:\nWhat you're looking for:\n",
  },
  {
    title: "General Inquiry",
    description: "Press, interviews and everything else.",
    subject: "General inquiry",
    body: "",
  },
];

const mailto = (subject: string, body: string) =>
  `mailto:${artist.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Get in touch" title="Let’s connect.">
        <p>Bookings, collaborations and business inquiries.</p>
      </PageIntro>

      <section aria-labelledby="email-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-surface p-8 sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
            <h2 id="email-heading" className="relative font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">
              Email
            </h2>
            <a
              href={`mailto:${artist.email}`}
              className="relative mt-4 block font-display text-[clamp(1.35rem,5.4vw,3.5rem)] leading-tight font-bold break-all text-ink hover:text-accent"
            >
              {artist.email}
            </a>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${artist.email}`} className={buttonVariants()}>
                <Mail aria-hidden /> Get in touch
              </a>
              <CopyButton text={artist.email} label="Copy email" />
            </div>
          </div>

          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight sm:text-4xl">What’s it about?</h2>
          <p className="mt-3 text-ink-muted">Pick a topic to open a pre-filled email.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {inquiryTypes.map((t) => (
              <li key={t.title}>
                <a
                  href={mailto(t.subject, t.body)}
                  className="group flex h-full items-start justify-between gap-4 rounded-[var(--radius-card)] border border-white/[0.08] bg-background-2 p-6 transition-colors hover:border-accent/50 hover:bg-surface"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold">{t.title}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{t.description}</span>
                  </span>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          {hasSocialLinks && (
            <>
              <h2 className="mt-20 font-display text-3xl font-bold tracking-tight">Follow</h2>
              <SocialLinks className="mt-6" />
            </>
          )}
        </div>
      </section>
    </>
  );
}
