import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">This page drifted off.</h1>
      <p className="mt-4 text-ink-muted">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        Back home
      </Link>
    </div>
  );
}
