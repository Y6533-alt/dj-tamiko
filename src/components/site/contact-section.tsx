import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

/** Closing call-to-action used on the home page. */
export function ContactSection() {
  return (
    <section aria-labelledby="connect-heading" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_100%,rgb(240_166_106/0.22),transparent_70%)]"
      />
      <div className="reveal relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 id="connect-heading" className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
          Let’s connect.
        </h2>
        <p className="mt-5 text-lg text-ink-muted">Bookings, collaborations and business inquiries.</p>
        <Link href="/contact" className={buttonVariants({ className: "mt-10" })}>
          Get in touch
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </section>
  );
}
