import { artist } from "@/content/artist";

/**
 * Link that opens a new message to the artist directly in Gmail on the web
 * (no email app or site form involved), with optional subject and body.
 */
export function gmailComposeUrl(subject?: string, body?: string) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: artist.email });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Spread onto an <a> to open Gmail compose in a new tab. */
export function gmailLinkProps(subject?: string, body?: string) {
  return {
    href: gmailComposeUrl(subject, body),
    target: "_blank",
    rel: "noopener noreferrer",
  } as const;
}
