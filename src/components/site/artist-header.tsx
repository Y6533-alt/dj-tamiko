"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { artist } from "@/content/artist";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ArtistHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjusted during render).
  const [menuPath, setMenuPath] = React.useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = !isHome || scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-white/[0.07] bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/60 to-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-[0.18em] text-ink sm:text-xl"
          aria-label={`${artist.name} — home`}
        >
          DJ <span className="text-accent">{artist.wordmark}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-11 items-center px-4 font-display text-xs font-semibold tracking-[0.2em] uppercase transition-colors",
                    isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-4 bottom-2 h-px bg-accent" aria-hidden />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-white/[0.07] bg-background/95 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-12 items-center rounded-lg px-3 font-display text-sm font-semibold tracking-[0.2em] uppercase",
                  isActive(item.href) ? "text-accent" : "text-ink hover:bg-white/5",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
