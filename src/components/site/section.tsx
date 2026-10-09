import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  headingId,
  action,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  headingId?: string;
  action?: React.ReactNode;
}) {
  const hid = headingId ?? (id ? `${id}-heading` : undefined);
  return (
    <section id={id} aria-labelledby={hid} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <div>
            {eyebrow && (
              <p className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">{eyebrow}</p>
            )}
            <h2 id={hid} className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h2>
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.06] pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div
        aria-hidden
        className="no-print pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,rgb(240_166_106/0.16),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgb(216_183_160/0.08),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-semibold tracking-[0.3em] text-accent uppercase">{eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight break-words sm:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-ink-muted">{children}</div>}
      </div>
    </div>
  );
}
