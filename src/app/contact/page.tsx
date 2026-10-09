import { Mail } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
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
              <a href="#message" className={buttonVariants()}>
                <Mail aria-hidden /> Send a message
              </a>
              <CopyButton text={artist.email} label="Copy email" />
            </div>
          </div>

          <h2 id="message" className="mt-20 scroll-mt-28 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What’s it about?
          </h2>
          <p className="mt-3 text-ink-muted">Choose a topic and send your message right here.</p>
          <div className="mt-8">
            <ContactForm />
          </div>

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
