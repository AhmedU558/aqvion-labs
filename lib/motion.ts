import type { Transition, Variants } from "framer-motion";

/**
 * AQVION LABS motion language.
 *
 * Motion should read as precision and activation — a system coming online —
 * never as decoration. Three rules:
 *
 *   1. Distance is short. 16–28px of travel, never more.
 *   2. Easing decelerates. Elements arrive and settle; they do not bounce.
 *   3. Nothing loops in the reader's field of view except the brand sweep.
 *
 * Durations and easings mirror the CSS tokens in styles/tokens.css so that
 * Framer Motion and plain CSS transitions stay in step.
 */

export const easing = {
  /** UI state changes: hover, press, open/close. */
  precise: [0.32, 0.72, 0, 1],
  /** Entrances: content arriving on scroll. */
  flow: [0.22, 1, 0.36, 1],
  /** Symmetric in/out — for things that toggle. */
  activate: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  instant: 0.12,
  fast: 0.18,
  base: 0.32,
  slow: 0.62,
  /** One full cycle of the brand light sweep (matches the reference loop). */
  sweep: 2.67,
} as const;

export const transition = {
  precise: { duration: duration.base, ease: easing.precise },
  flow: { duration: duration.slow, ease: easing.flow },
  fast: { duration: duration.fast, ease: easing.precise },
} satisfies Record<string, Transition>;

/** Standard entrance: rise and resolve. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.flow },
};

/** Entrance without travel — for elements whose position must not shift. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.flow },
};

/**
 * Parent wrapper that releases children in sequence. Pair with `revealVariants`
 * on each child; do not set a delay on the children themselves.
 */
export function staggerVariants(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Viewport config shared by every scroll-triggered reveal. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;
