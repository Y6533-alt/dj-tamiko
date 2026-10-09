import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Download, FileText, ImageIcon } from "lucide-react";

import type { PressAsset } from "@/content/types";
import { buttonVariants } from "@/components/ui/button";
import { asset as withBase } from "@/lib/site";

/** True only when the asset is approved and its file is actually present in /public (checked at build time). */
export function isDownloadable(asset: PressAsset) {
  if (!asset.approvedForDistribution) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", asset.file));
  } catch {
    return false;
  }
}

export function PressAssetCard({ asset }: { asset: PressAsset }) {
  const fileName = asset.file.split("/").pop();
  return (
    <article className="print-break-inside-avoid flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-surface">
      <div className="relative aspect-[4/5] bg-surface-2">
        {asset.preview ? (
          <Image
            src={withBase(asset.preview)}
            alt=""
            fill
            sizes="(min-width: 768px) 30vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">
            {asset.kind === "photo" ? <ImageIcon className="h-10 w-10" aria-hidden /> : <FileText className="h-10 w-10" aria-hidden />}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display font-semibold">{asset.title}</h3>
        {asset.description && <p className="mt-1 text-sm text-ink-muted">{asset.description}</p>}
        {asset.meta && <p className="mt-2 text-xs tracking-wide text-ink-muted">{asset.meta}</p>}
        <a
          href={withBase(asset.file)}
          download={fileName}
          className={buttonVariants({ variant: "outline", size: "sm", className: "no-print mt-5 self-start" })}
        >
          <Download aria-hidden />
          Download
          <span className="sr-only"> {asset.title}</span>
        </a>
      </div>
    </article>
  );
}
