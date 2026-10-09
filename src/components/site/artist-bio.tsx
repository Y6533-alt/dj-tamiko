import { bio } from "@/content/artist";

/** Renders only approved biography copy. */
export function ArtistBio({ variant = "long" }: { variant?: "short" | "long" }) {
  const longParas = bio.long.filter((p) => p.approved);
  const paragraphs =
    variant === "short" || longParas.length === 0
      ? [bio.short].filter((p) => p.approved)
      : longParas;

  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink/90">
      {paragraphs.map((p, i) => (
        <p key={i}>{p.text}</p>
      ))}
      {variant === "long" && bio.direction.approved && <p className="text-ink-muted">{bio.direction.text}</p>}
    </div>
  );
}

export function approvedBioText(variant: "short" | "long" = "short") {
  if (variant === "long") {
    const longParas = bio.long.filter((p) => p.approved).map((p) => p.text);
    if (longParas.length) return longParas.join("\n\n");
  }
  return bio.short.approved ? bio.short.text : "";
}
