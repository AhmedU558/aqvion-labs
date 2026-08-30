import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { TagLine } from "@/components/ui/TagLine";
import { cn } from "@/lib/utils";

export type RevealCardProps = {
  /** Two-digit technical index, kept in the monospace register. */
  index: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  tags?: string[];
  /** Turns the whole card into a link. Omit for a non-interactive card. */
  href?: string;
  /** Label for the action that appears on reveal. */
  action?: string;
  className?: string;
};

/**
 * A card that holds its detail back until you look at it.
 *
 * At rest it is a dark plate carrying an index, an icon and a title. On hover —
 * or on keyboard focus, which is why the state is driven by `focus-within` as
 * well — a restrained brand gradient washes in, the icon steps aside, and the
 * description and action rise into the space it leaves.
 *
 * Three things keep it honest rather than decorative:
 *
 *   1. **Nothing reflows.** The card has a fixed minimum height and the detail
 *      expands through a `grid-template-rows` transition inside it, so the row
 *      never changes height and neighbouring cards never move.
 *   2. **Touch gets the full card.** There is no hover on a phone, so under
 *      `(hover: none)` the detail is simply always visible — the content is
 *      never behind an interaction the device cannot perform.
 *   3. **The gradient stays an accent.** It is a wash at partial opacity over
 *      the surface, not a flood fill, and only ever on the one card being
 *      pointed at.
 *
 * A card with no `href` is not focusable, so it renders `--static`: its detail
 * is always open. Holding content behind a hover is only reasonable when there
 * is an interaction to perform — otherwise it is simply information a keyboard
 * user can never reach.
 */
export function RevealCard({
  index,
  title,
  description,
  icon: Icon,
  tags,
  href,
  action = "Explore",
  className,
}: RevealCardProps) {
  const interactive = Boolean(href);

  const content = (
    <>
      {/* Technical substrate. Present at rest, dissolving as the wash arrives —
          the card is never a blank plate. */}
      <span aria-hidden className="reveal-card__pattern" />

      {/* Brand wash. Sits under the content and fades in with the reveal. */}
      <span aria-hidden className="reveal-card__wash" />

      {/* Hairline that draws across the top edge, matching the section rules. */}
      <span aria-hidden className="reveal-card__rule" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="label-mono text-primary-bright" data-numeric>
            {index}
          </span>
          {/* Registration mark, in the same instrumentation language as the
              hero field's alignment ticks. */}
          <span aria-hidden className="reveal-card__bracket" />
        </div>

        {/* The glyph holds the open field at rest so the card reads as composed
            rather than empty, then steps aside for the detail. */}
        {Icon && (
          <span aria-hidden className="reveal-card__glyph">
            <span className="reveal-card__ring" />
            <Icon className="reveal-card__icon" strokeWidth={1} />
          </span>
        )}

        {/* Bottom-anchored on a link card, so the detail opens upward into the
            space above it; top-anchored on a static card, where everything is
            already visible and the titles should line up across the row. */}
        <div className="reveal-card__body">
          <h3 className="text-h3 text-foreground">{title}</h3>

          <div className="reveal-card__detail">
            <div className="overflow-hidden">
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-strong">
                {description}
              </p>

              {tags && tags.length > 0 && <TagLine tags={tags} className="mt-5" />}

              {interactive && (
                <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] text-foreground">
                  {action}
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-precise)] group-hover/card:translate-x-0.5"
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const classes = cn(
    "reveal-card group/card",
    interactive ? "reveal-card--link" : "reveal-card--static",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <article className={classes}>{content}</article>;
}
