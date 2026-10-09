"use client";

import { Printer } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={buttonVariants({ variant: "outline", size: "sm", className: "no-print" })}
    >
      <Printer aria-hidden />
      Print / Save PDF
    </button>
  );
}
