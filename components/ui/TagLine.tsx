import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type TagLineProps = {
  tags: string[];
  className?: string;
};

/**
 * The separator that joins two tags.
 *
 * A non-breaking space binds the slash to the tag before it, and the trailing
 * ordinary space is the only break opportunity — so a line can break between
 * tags, never before a slash and never mid-word.
 */
const SEPARATOR = "\u00A0/ ";

/**
 * A monospace list of technical markers.
 *
 * Without the break opportunities above, the whole string is a single
 * unbreakable token: it overflows any fixed-width column it is placed in and
 * gets clipped at the viewport edge.
 */
export function TagLine({ tags, className }: TagLineProps) {
  return (
    <p
      className={cn(
        "font-mono text-[0.6875rem] leading-[1.9] tracking-[0.14em] text-faint",
        className,
      )}
    >
      {tags.map((tag, position) => (
        <Fragment key={tag}>
          {position > 0 && (
            <span aria-hidden className="text-border-strong">
              {SEPARATOR}
            </span>
          )}
          {tag}
        </Fragment>
      ))}
    </p>
  );
}
