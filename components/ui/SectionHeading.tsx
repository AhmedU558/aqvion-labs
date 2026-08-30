import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type SectionHeadingProps = {
  /** Monospace section number, e.g. "01". Part of the technical language. */
  index?: string;
  /** Short uppercase eyebrow above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Actions rendered opposite the heading on wide viewports. */
  action?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  /** Forwarded to the heading element — used as the page's accessible name. */
  headingId?: string;
  className?: string;
};

/**
 * The standard section opener: technical metadata, an architectural title, and
 * an optional supporting paragraph held to a readable measure.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  align = "start",
  as: Tag = "h2",
  headingId,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        centered && "lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {(index || eyebrow) && (
          <Reveal y={12}>
            <div
              className={cn(
                "flex items-center gap-3",
                centered && "justify-center",
              )}
            >
              {index && (
                <span className="label-mono text-primary-bright" data-numeric>
                  {index}
                </span>
              )}
              {index && eyebrow && (
                <span aria-hidden className="h-px w-8 bg-border-strong" />
              )}
              {eyebrow && <span className="label-mono">{eyebrow}</span>}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.06}>
          <Tag id={headingId} className={cn("mt-5 text-h2 text-foreground")}>
            {title}
          </Tag>
        </Reveal>

        {description && (
          <Reveal delay={0.12}>
            <p className="mt-5 text-lead text-muted">{description}</p>
          </Reveal>
        )}
      </div>

      {action && (
        <Reveal delay={0.16} className={cn("shrink-0", centered && "mx-auto")}>
          {action}
        </Reveal>
      )}
    </div>
  );
}
