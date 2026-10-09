"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * ImageStreamHero
 *
 * Two mirrored rails of image cards are born at a distant point on the
 * central axis, grow through CSS perspective and sweep outward past the
 * screen edges. Pure CSS animation: one generated @keyframes per rail,
 * per component instance. All geometry is expressed in `cqw`, so the
 * corridor scales with the hero's width independently of text layout.
 */

export type StreamImage = {
  src: string;
  alt?: string;
  /** Optional CSS object-position, e.g. "50% 20%", to keep key artwork in frame. */
  position?: string;
};

export type CorridorPath = {
  /** CSS perspective distance (cqw). */
  perspective: number;
  /** Card width (cqw). */
  cardWidth: number;
  /** Card height (cqw). */
  cardHeight: number;
  /** Card corner radius (cqw). */
  cardRadius: number;
  /** Apparent card height at birth (cqw). */
  birthHeight: number;
  /** Apparent card height at exit (cqw). */
  exitHeight: number;
  /** Horizontal rail offset at birth (cqw). Negative = starts across the axis. */
  railBirth: number;
  /** Horizontal rail offset at exit (cqw). */
  railExit: number;
  /** Exponent shaping how early the rails open outward. */
  fan: number;
  /** Card rotation at birth (deg). */
  turnBirth: number;
  /** Card rotation at exit (deg). */
  turnExit: number;
  /** Number of keyframe samples along the path. */
  stops: number;
};

export interface ImageStreamHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StreamImage[];
  /** Cards per rail. Default 9. */
  cards?: number;
  /** Seconds for one card to travel the full path. Default 18. */
  speed?: number;
  /** Vertical position of the corridor axis, in % of the hero height. Default 55. */
  axis?: number;
  /** Geometry overrides. */
  path?: Partial<CorridorPath>;
  /** Render the built-in pause / resume control. Default true. */
  showMotionControl?: boolean;
  /** Extra classes for the pause / resume control. */
  motionControlClassName?: string;
  /**
   * Optional geometry overrides per CSS media query, e.g. a tighter, taller
   * corridor for portrait phones. Compiled to @media rules — no JS resize logic.
   */
  mediaPaths?: { media: string; path: Partial<CorridorPath> }[];
}

export const DEFAULT_CORRIDOR_PATH: CorridorPath = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

const DEFAULT_CARDS = 9;
const DEFAULT_SPEED = 18;
const DEFAULT_AXIS = 55;

function finiteOr(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

/** Merge overrides with defaults and repair values that would break the geometry. */
function resolvePath(overrides?: Partial<CorridorPath>): CorridorPath {
  const d = DEFAULT_CORRIDOR_PATH;
  const o = overrides ?? {};
  const positive = (v: unknown, fb: number) => {
    const n = finiteOr(v, fb);
    return n > 0 ? n : fb;
  };
  return {
    perspective: positive(o.perspective, d.perspective),
    cardWidth: positive(o.cardWidth, d.cardWidth),
    cardHeight: positive(o.cardHeight, d.cardHeight),
    cardRadius: Math.max(0, finiteOr(o.cardRadius, d.cardRadius)),
    birthHeight: positive(o.birthHeight, d.birthHeight),
    exitHeight: positive(o.exitHeight, d.exitHeight),
    railBirth: finiteOr(o.railBirth, d.railBirth),
    railExit: finiteOr(o.railExit, d.railExit),
    fan: positive(o.fan, d.fan),
    turnBirth: finiteOr(o.turnBirth, d.turnBirth),
    turnExit: finiteOr(o.turnExit, d.turnExit),
    stops: Math.min(120, Math.max(2, Math.round(finiteOr(o.stops, d.stops)))),
  };
}

const fmt = (n: number) => Number(n.toFixed(4)).toString();

/** Sample the corridor path into a @keyframes rule for one rail direction. */
function buildKeyframes(name: string, dir: 1 | -1, p: CorridorPath) {
  const growth = p.exitHeight / p.birthHeight;
  const birthScale = p.birthHeight / p.cardHeight;
  const frames: string[] = [];

  for (let i = 0; i <= p.stops; i++) {
    const u = i / p.stops;
    const scale = birthScale * Math.pow(growth, u);
    // Translating along Z under `perspective` produces this apparent scale.
    const z = p.perspective * (1 - 1 / scale);
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    // Fade in over the first sample only, so births never pop.
    const opacity = i === 0 ? 0 : 1;
    frames.push(
      `${fmt(u * 100)}%{transform:translate3d(${fmt(dir * rail)}cqw,0,${fmt(z)}cqw) rotateY(${fmt(-dir * turn)}deg);opacity:${opacity}}`,
    );
  }

  return `@keyframes ${name}{${frames.join("")}}`;
}

/** Keyframes plus sizing rules for one geometry, scoped to a component instance. */
function geometryCss(scope: string, suffix: string, p: CorridorPath) {
  const right = `${scope}-r${suffix}`;
  const left = `${scope}-l${suffix}`;
  return [
    buildKeyframes(right, 1, p),
    buildKeyframes(left, -1, p),
    `.${scope} [data-stage]{perspective:${fmt(p.perspective)}cqw}`,
    `.${scope} [data-rail]{width:${fmt(p.cardWidth)}cqw;height:${fmt(p.cardHeight)}cqw;margin-left:${fmt(-p.cardWidth / 2)}cqw;margin-top:${fmt(-p.cardHeight / 2)}cqw;border-radius:${fmt(p.cardRadius)}cqw}`,
    `.${scope} [data-rail="r"]{animation-name:${right}}`,
    `.${scope} [data-rail="l"]{animation-name:${left}}`,
  ].join("\n");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function ImageStreamHero({
  images,
  cards = DEFAULT_CARDS,
  speed = DEFAULT_SPEED,
  axis = DEFAULT_AXIS,
  path,
  showMotionControl = true,
  motionControlClassName,
  mediaPaths,
  className,
  style,
  children,
  ...props
}: ImageStreamHeroProps) {
  const rawId = React.useId();
  const scope = React.useMemo(() => `isr-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [rawId]);

  const geometry = React.useMemo(() => resolvePath(path), [path]);
  const cardCount = Math.min(40, Math.max(1, Math.round(finiteOr(cards, DEFAULT_CARDS))));
  const duration = (() => {
    const s = finiteOr(speed, DEFAULT_SPEED);
    return s > 0 ? s : DEFAULT_SPEED;
  })();
  const axisPct = Math.min(100, Math.max(0, finiteOr(axis, DEFAULT_AXIS)));

  const validImages = React.useMemo(
    () => (Array.isArray(images) ? images.filter((img) => img && typeof img.src === "string" && img.src) : []),
    [images],
  );
  const hasImages = validImages.length > 0;

  const css = React.useMemo(() => {
    const variants = (mediaPaths ?? [])
      .filter((m) => m && typeof m.media === "string" && m.media.trim())
      .map(
        (m, i) =>
          `@media ${m.media}{${geometryCss(scope, `-m${i}`, resolvePath({ ...path, ...m.path }))}}`,
      );
    return [
      geometryCss(scope, "", geometry),
      ...variants,
      // Reduced motion: freeze in place at the staggered, populated positions.
      `@media (prefers-reduced-motion: reduce){.${scope} [data-rail]{animation-play-state:paused}}`,
    ].join("\n");
  }, [scope, geometry, path, mediaPaths]);

  const prefersReduced = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = React.useState<boolean | null>(null);
  const paused = userPaused ?? prefersReduced;

  // Pause decorative motion while the hero is offscreen.
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = React.useState(false);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playState: React.CSSProperties["animationPlayState"] =
    paused || offscreen ? "paused" : userPaused === false ? "running" : undefined;

  const renderRail = (rail: "l" | "r") =>
    Array.from({ length: cardCount }, (_, index) => {
      const image = validImages[index % validImages.length];
      return (
        <div
          key={`${rail}-${index}`}
          data-rail={rail}
          className="absolute overflow-hidden bg-surface"
          style={{
            left: "50%",
            top: `${axisPct}%`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
            opacity: 0,
            animationDuration: `${duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
            animationDelay: `${-(index * duration) / cardCount}s`,
            // `undefined` lets the reduced-motion media query apply.
            animationPlayState: playState,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative, sized by cqw, many tiny instances */}
          <img
            src={image.src}
            alt=""
            draggable={false}
            decoding="async"
            loading="eager"
            // Visible at first paint but decorative: don't compete with the headline font.
            fetchPriority="low"
            className="h-full w-full object-cover select-none"
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      );
    });

  return (
    <div
      ref={rootRef}
      className={cn("relative isolate overflow-hidden", scope, className)}
      style={{ containerType: "inline-size", ...style }}
      data-paused={paused ? "true" : "false"}
      {...props}
    >
      <style>{css}</style>

      {hasImages && (
        <div
          aria-hidden="true"
          data-stage=""
          className="pointer-events-none absolute inset-0 -z-10 select-none"
          style={{ perspectiveOrigin: `50% ${axisPct}%`, transformStyle: "preserve-3d" }}
        >
          {renderRail("l")}
          {renderRail("r")}
        </div>
      )}

      {children}

      {hasImages && showMotionControl && (
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          aria-label={paused ? "Play background animation" : "Pause background animation"}
          className={cn(
            "no-print absolute right-4 bottom-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-ink backdrop-blur-md transition-colors hover:bg-black/65 sm:right-6 sm:bottom-6",
            motionControlClassName,
          )}
        >
          {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
        </button>
      )}
    </div>
  );
}

export default ImageStreamHero;
