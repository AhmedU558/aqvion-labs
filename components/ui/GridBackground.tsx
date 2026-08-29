import { cn } from "@/lib/utils";

export type GridBackgroundProps = {
  /** Cell size in pixels. */
  cell?: number;
  /** Fade the grid out towards the bottom, the top, or radially. */
  fade?: "bottom" | "top" | "radial" | "none";
  /** 0–1. The grid should be felt more than seen. */
  opacity?: number;
  className?: string;
};

/**
 * The engineering substrate: a faint measured grid behind content.
 *
 * Decorative and `aria-hidden`. It is masked rather than clipped so it
 * dissolves into the background instead of ending on a visible edge.
 */
export function GridBackground({
  cell = 72,
  fade = "bottom",
  opacity = 0.5,
  className,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 grid-lines",
        fade === "bottom" && "mask-fade-b",
        fade === "top" && "mask-fade-t",
        fade === "radial" && "mask-fade-radial",
        className,
      )}
      style={{ backgroundSize: `${cell}px ${cell}px`, opacity }}
    />
  );
}
