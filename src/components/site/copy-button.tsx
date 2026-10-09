"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const [state, setState] = React.useState<"idle" | "copied" | "error">("idle");

  React.useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2200);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "no-print", className)}
      >
        {state === "copied" ? <Check aria-hidden /> : <Copy aria-hidden />}
        {state === "copied" ? "Copied" : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "error" ? "Copy failed — select the text manually" : ""}
      </span>
    </>
  );
}
