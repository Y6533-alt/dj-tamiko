"use client";

import * as React from "react";
import { AlertCircle, Check, CheckCircle2, Loader2, Mail, Send } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { artist } from "@/content/artist";
import { inquiryTypes, type InquiryTypeId } from "@/content/inquiry-types";
import { cn } from "@/lib/utils";

/**
 * Contact form. Submissions are delivered to the artist's inbox by
 * Web3Forms (static-site friendly; its access key is public by design).
 * Without NEXT_PUBLIC_WEB3FORMS_KEY the form falls back to opening the
 * visitor's email app with everything pre-filled.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() ?? "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [type, setType] = React.useState<InquiryTypeId>("bookings");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Errors>({});
  const formRef = React.useRef<HTMLFormElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const ids = React.useId();

  const current = inquiryTypes.find((t) => t.id === type) ?? inquiryTypes[0];

  const pickType = (id: InquiryTypeId) => {
    setType(id);
    if (status !== "sending") setStatus("idle");
    // Bring the form into view and start typing straight away.
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameRef.current?.focus({ preventScroll: true });
    });
  };

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";
    if (message.length < 10) e.message = "Please write a short message (at least 10 characters).";
    if (message.length > 5000) e.message = "Please keep the message under 5,000 characters.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field.
    if (data.get("botcheck")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();
    const subject = `${current.subject} — ${name} (via website)`;

    if (!ACCESS_KEY) {
      // No delivery service configured: hand off to the email app, pre-filled.
      const body = `${message}\n\n— ${name} <${email}>`;
      window.location.href = `mailto:${artist.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject,
          from_name: `${artist.name} website`,
          name,
          email,
          replyto: email,
          inquiry_type: current.title,
          message,
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
      // Only report success once the service confirms delivery.
      if (res.ok && json?.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field =
    "mt-2 block w-full rounded-xl border bg-background-2 px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 outline-none transition-colors focus:border-accent focus-visible:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      <div role="radiogroup" aria-label="What's it about?" className="grid gap-4 sm:grid-cols-2">
        {inquiryTypes.map((t) => {
          const selected = t.id === type;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => pickType(t.id)}
              className={cn(
                "group flex h-full items-start justify-between gap-4 rounded-[var(--radius-card)] border p-6 text-left transition-colors",
                selected
                  ? "border-accent/70 bg-surface"
                  : "border-white/[0.08] bg-background-2 hover:border-accent/40 hover:bg-surface",
              )}
            >
              <span>
                <span className="block font-display text-xl font-semibold">{t.title}</span>
                <span className="mt-1 block text-sm text-ink-muted">{t.description}</span>
              </span>
              <span
                aria-hidden
                className={cn(
                  "mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                  selected ? "border-accent bg-accent text-accent-foreground" : "border-white/25 text-transparent",
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-labelledby={`${ids}-title`}
        className="mt-8 scroll-mt-28 rounded-[var(--radius-card)] border border-white/[0.08] bg-surface p-6 sm:p-10"
      >
        <h3 id={`${ids}-title`} className="font-display text-2xl font-semibold">
          {current.title}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">Your message goes straight to {artist.name}.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${ids}-name`} className="text-sm font-medium">
              Name
            </label>
            <input
              ref={nameRef}
              id={`${ids}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${ids}-name-err` : undefined}
              className={cn(field, errors.name ? "border-red-400/80" : "border-white/10")}
            />
            {errors.name && (
              <p id={`${ids}-name-err`} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${ids}-email`} className="text-sm font-medium">
              Email
            </label>
            <input
              id={`${ids}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${ids}-email-err` : undefined}
              className={cn(field, errors.email ? "border-red-400/80" : "border-white/10")}
            />
            {errors.email && (
              <p id={`${ids}-email-err`} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor={`${ids}-message`} className="text-sm font-medium">
            Message
          </label>
          <p id={`${ids}-hint`} className="mt-1 text-sm text-ink-muted">
            {current.hint}
          </p>
          <textarea
            id={`${ids}-message`}
            name="message"
            rows={6}
            required
            maxLength={5000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={`${ids}-hint${errors.message ? ` ${ids}-message-err` : ""}`}
            className={cn(field, "resize-y", errors.message ? "border-red-400/80" : "border-white/10")}
          />
          {errors.message && (
            <p id={`${ids}-message-err`} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot (spam protection) — hidden from people and assistive tech. */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status === "sending"} className={buttonVariants()}>
            {status === "sending" ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {!ACCESS_KEY && (
            <span className="text-xs text-ink-muted">Opens your email app with your message ready to send.</span>
          )}
        </div>

        <div role="status" aria-live="polite" className="mt-6 empty:hidden">
          {status === "sent" && (
            <p className="flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Thanks — your message was sent. You’ll get a reply at the email you entered.
            </p>
          )}
          {status === "error" && (
            <p className="flex flex-wrap items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>
                Sorry, the message couldn’t be sent. Please try again, or email{" "}
                <a href={`mailto:${artist.email}`} className="inline-flex items-center gap-1 underline underline-offset-4">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  {artist.email}
                </a>
                .
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
