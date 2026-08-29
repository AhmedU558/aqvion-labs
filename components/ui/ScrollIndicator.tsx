"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type ScrollIndicatorProps = {
  label: string;
  /** Anchor the cue scrolls to. */
  href: string;
  className?: string;
};

const FADE_DISTANCE = 160;

/**
 * A quiet scroll cue. It dissolves as soon as the visitor starts scrolling —
 * once the gesture has been made, the hint has done its job.
 *
 * The fade is a direct opacity write from a passive scroll listener rather than
 * a subscription to an animation loop: scroll events already fire at most once
 * per frame, opacity is composited, and this keeps working when the page is not
 * being animated. Once invisible the cue is also taken out of the tab order, so
 * keyboard users cannot land on a link they cannot see.
 *
 * The travelling bead is a transform-only CSS animation and stops entirely
 * under `prefers-reduced-motion`; the label alone still carries the meaning.
 */
export function ScrollIndicator({ label, href, className }: ScrollIndicatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const opacity = Math.max(0, 1 - window.scrollY / FADE_DISTANCE);
      el.style.opacity = String(opacity);
      el.style.visibility = opacity < 0.04 ? "hidden" : "visible";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
        className,
      )}
    >
      <a
        href={href}
        className="group inline-flex items-center gap-3 rounded-md py-1 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)]"
      >
        <span className="label-mono text-[0.625rem] transition-colors group-hover:text-muted">
          {label}
        </span>
        <span
          aria-hidden
          className="relative block h-9 w-px overflow-hidden bg-[linear-gradient(to_bottom,transparent,var(--color-border-strong)_35%,transparent)]"
        >
          <span className="scroll-cue__bead absolute inset-x-0 top-0 block h-3 bg-[linear-gradient(to_bottom,transparent,var(--color-accent))]" />
        </span>
      </a>
    </div>
  );
}
