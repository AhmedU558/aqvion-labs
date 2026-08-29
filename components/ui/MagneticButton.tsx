"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MagneticButtonProps = {
  children: ReactNode;
  /** Maximum travel in pixels. Kept small — this is a hint, not a toy. */
  strength?: number;
  className?: string;
};

/**
 * Wraps an interactive element so it leans a few pixels toward the cursor.
 *
 * The effect is deliberately restrained: the control acknowledges the pointer,
 * it does not chase it. Disabled entirely for coarse pointers (there is no
 * hover on touch) and for `prefers-reduced-motion`.
 */
export function MagneticButton({ children, strength = 8, className }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 260, damping: 22, mass: 0.4 };
  const translateX = useSpring(x, spring);
  const translateY = useSpring(y, spring);

  // The inner content trails the wrapper slightly, which reads as depth.
  const contentX = useTransform(translateX, (v) => v * 0.35);
  const contentY = useTransform(translateY, (v) => v * 0.35);

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    x.set((offsetX / (bounds.width / 2)) * strength);
    y.set((offsetY / (bounds.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x: translateX, y: translateY }}
      className={cn("inline-flex", className)}
    >
      <motion.span style={{ x: contentX, y: contentY }} className="inline-flex">
        {children}
      </motion.span>
    </motion.span>
  );
}
