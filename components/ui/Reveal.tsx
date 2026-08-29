"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { revealVariants, staggerVariants, transition, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  /** Travel distance in pixels. Zero produces a pure fade. */
  y?: number;
  as?: ElementType;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "initial" | "whileInView">;

/**
 * The site's single scroll entrance: rise 24px and resolve, once.
 *
 * With `prefers-reduced-motion` the element renders in its final state
 * immediately — content is never gated behind an animation that will not play.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduceMotion) {
    const Tag = as as ElementType;
    return (
      <Tag data-reveal className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      data-reveal
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { ...transition.flow, delay } },
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export type RevealGroupProps = {
  children: ReactNode;
  /** Seconds between each child's entrance. */
  stagger?: number;
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Releases its children in sequence. Children opt in by being wrapped in
 * `RevealItem` — plain children are not animated.
 */
export function RevealGroup({
  children,
  stagger = 0.08,
  delay = 0,
  as = "div",
  className,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerVariants(stagger, delay)}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag data-reveal variants={revealVariants} className={cn(className)}>
      {children}
    </MotionTag>
  );
}
