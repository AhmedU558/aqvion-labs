import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TagLine } from "@/components/ui/TagLine";
import { capabilities, type Capability } from "@/data/solutions";
import { cn } from "@/lib/utils";

/**
 * Heading level for the item titles.
 *
 * `h3` is correct on the homepage, where a section supplies the `h2` above
 * these rows. Inner pages render their SectionHeading as the page `h1`, so
 * they pass `h2` — otherwise the outline skips a level.
 */
export type HeadingLevel = "h2" | "h3";

/**
 * The six-capability specification list shared by the homepage Solutions
 * section and /services. Copy stays in data/solutions.ts.
 *
 * Each row links to its own capability page, so the hover treatment here is
 * describing a real destination rather than decorating a dead element.
 */
export function CapabilityIndex({ headingLevel = "h3" }: { headingLevel?: HeadingLevel }) {
  return (
    <ul className="mt-16 border-b border-border lg:mt-24">
      {capabilities.map((capability) => (
        <li
          key={capability.id}
          id={capability.id}
          className="border-t border-border"
        >
          {/* The id lives on the static `li`, not the motion node: a transform
              on the hash target would offset scroll-into-view under the nav. */}
          <Reveal className="group">
            <CapabilityRow capability={capability} headingLevel={headingLevel} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

const colorShift = "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]";

function CapabilityRow({
  capability,
  headingLevel: Heading,
}: {
  capability: Capability;
  headingLevel: HeadingLevel;
}) {
  const { index, title, description, tags } = capability;

  return (
    <Link
      href={`/services/${capability.id}`}
      className="relative block focus-visible:outline-offset-2"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[image:var(--gradient-brand)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)] group-hover:scale-x-100"
      />

      <div className="flex flex-col gap-4 py-9 sm:gap-5 lg:flex-row lg:items-baseline lg:gap-10 lg:py-14">
        <div className="flex items-baseline gap-4 lg:w-[34%] lg:shrink-0">
          <span
            className={cn(
              "label-mono shrink-0 font-medium text-muted-strong",
              "group-hover:text-primary-bright",
              colorShift,
            )}
            data-numeric
          >
            {index}
          </span>
          <Heading className="text-h3 text-foreground">{title}</Heading>
        </div>

        <p className="text-[0.9375rem] leading-relaxed text-muted lg:flex-1">{description}</p>

        <div className="flex items-start justify-between gap-4 lg:w-[19%] lg:shrink-0">
          <TagLine
            tags={tags}
            className={cn("min-w-0 group-hover:text-muted lg:flex-1 lg:text-right", colorShift)}
          />
          <ArrowRight
            aria-hidden
            className={cn(
              "size-4 shrink-0 translate-y-0.5 text-faint lg:hidden",
              "transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
              "group-hover:translate-x-0.5 group-hover:text-accent",
            )}
          />
        </div>
      </div>
    </Link>
  );
}
