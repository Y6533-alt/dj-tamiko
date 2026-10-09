import { Mail, MessageCircle } from "lucide-react";

import { CopyButton } from "@/components/site/copy-button";
import { PageIntro } from "@/components/site/section";
import { SocialLinks, hasSocialLinks } from "@/components/site/social-links";
import { buttonVariants } from "@/components/ui/button";
import { artist } from "@/content/artist";
import { inquiryTypes } from "@/content/inquiry-types";
import { gmailLinkProps } from "@/lib/email";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${artist.name} for bookings, music collaborations, label and A&R, and general inquiries.`,
  path: "/contact",
});

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
              {...gmailLinkProps()}
              className="relative mt-4 block font-display text-[clamp(1.35rem,5.4vw,3.5rem)] leading-tight font-bold break-all text-ink hover:text-accent"
            >
              {artist.email}
              <span className="sr-only"> (opens Gmail in a new tab)</span>
            </a>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a {...gmailLinkProps()} className={buttonVariants()}>
                <Mail aria-hidden /> Get in touch
                <span className="sr-only"> (opens Gmail in a new tab)</span>
              </a>
              <CopyButton text={artist.email} label="Copy email" />
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-background-2 p-8 sm:p-12">
            <div>
              <h2 className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">Instagram</h2>
              <a
                href={`https://www.instagram.com/${artist.instagram}/`}
                target="_blank"
                rel="noopener noreferrer me"
                className="mt-4 block font-display text-[clamp(1.35rem,4.5vw,2.75rem)] leading-tight font-bold break-all text-ink hover:text-accent"
              >
                @{artist.instagram}
                <span className="sr-only"> (opens Instagram in a new tab)</span>
              </a>
              <p className="mt-2 text-ink-muted">Prefer DMs? Message directly on Instagram.</p>
            </div>
            <a
              href={`https://ig.me/m/${artist.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <MessageCircle aria-hidden /> Send a DM
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </div>

          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight sm:text-4xl">What’s it about?</h2>
          <p className="mt-3 text-ink-muted">Pick a topic to start an email in Gmail.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {inquiryTypes.map((t) => (
              <li key={t.id}>
                <a
                  {...gmailLinkProps(t.subject, t.body)}
                  className="group flex h-full items-start justify-between gap-4 rounded-[var(--radius-card)] border border-white/[0.08] bg-background-2 p-6 transition-colors hover:border-accent/50 hover:bg-surface"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold">{t.title}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{t.description}</span>
                  </span>
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform group-hover:scale-110" aria-hidden />
                  <span className="sr-only"> — email in Gmail (opens in a new tab)</span>
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
