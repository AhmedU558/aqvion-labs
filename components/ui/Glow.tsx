import { cn } from "@/lib/utils";

type GlowTone = "primary" | "violet" | "cyan" | "mixed";
type GlowSize = "sm" | "md" | "lg" | "xl";

const tones: Record<GlowTone, string> = {
  primary: "var(--color-primary)",
  violet: "var(--color-secondary)",
  cyan: "var(--color-accent)",
  mixed: "var(--color-indigo)",
};

const sizes: Record<GlowSize, string> = {
  sm: "h-64 w-64",
  md: "h-[28rem] w-[28rem]",
  lg: "h-[42rem] w-[42rem]",
  xl: "h-[60rem] w-[60rem]",
};

export type GlowProps = {
  tone?: GlowTone;
  size?: GlowSize;
  /** 0–1. Kept low by default; glow is atmosphere, not a light source. */
  intensity?: number;
  /** Slow, barely perceptible movement. Off by default. */
  animated?: boolean;
  className?: string;
};

/**
 * A soft radial wash of brand colour.
 *
 * Always decorative and always `aria-hidden`. Positioned by the caller — this
 * component only owns its own shape and falloff.
 */
export function Glow({
  tone = "primary",
  size = "lg",
  intensity = 0.16,
  animated = false,
  className,
}: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[72px] will-change-transform",
        sizes[size],
        animated && "motion-safe:animate-drift",
        className,
      )}
      style={{
        /* The gradient carries most of the falloff; the blur only removes the
           last of the banding. Kept at 72px — a 120px blur on an element this
           large costs several milliseconds a frame for no visible gain. */
        background: `radial-gradient(circle at center, ${tones[tone]} 0%, color-mix(in oklab, ${tones[tone]} 40%, transparent) 36%, transparent 72%)`,
        opacity: intensity,
      }}
    />
  );
}
