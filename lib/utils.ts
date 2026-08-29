import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about the custom font sizes declared in
 * styles/tokens.css. Without this it cannot tell `text-h2` (a size) from
 * `text-foreground` (a colour), assumes both are colours, and silently drops
 * the size when the two appear together.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "lead", "label", "meta"] }],
      /* Same reasoning for the custom shadows: these are box-shadows, not
         shadow colours. */
      shadow: [{ shadow: ["glow", "glow-strong", "panel"] }],
    },
  },
});

/**
 * Merge conditional class names, letting later Tailwind utilities win over
 * earlier ones. Every component that accepts a `className` prop routes through
 * this so callers can always override internal styling.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
