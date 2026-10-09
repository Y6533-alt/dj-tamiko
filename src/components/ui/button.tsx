import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-display text-sm font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-[#f5b986] active:translate-y-px shadow-[0_8px_30px_-8px_rgb(240_166_106/0.55)]",
        outline:
          "border border-white/20 bg-black/25 text-ink backdrop-blur-sm hover:border-accent-soft/70 hover:bg-white/5",
        ghost: "text-ink-muted hover:text-ink hover:bg-white/5",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
