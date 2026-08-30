import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { approachStages } from "@/data/approach";
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
 * The five-stage methodology as a specification rail, not a card grid.
 *
 * Always vertical: five equal columns would squeeze the sequence. The rail
 * runs in the left gutter and the node's fill punches the hole, so the path
 * reads as one run — the same construction as Process on phones.
 */
export function ApproachFramework({ headingLevel: Heading = "h3" }: { headingLevel?: HeadingLevel }) {
  const lastIndex = approachStages.length - 1;

  return (
    <section aria-label="Approach framework" className="section-y relative border-t border-border">
      <Container>
        <ol>
          {approachStages.map((stage, position) => (
            <Reveal key={stage.index} as="li" className="group">
              <div className="flex gap-5 sm:gap-8">
                <div aria-hidden className="relative w-2.5 shrink-0">
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 w-px -translate-x-1/2",
                      position === 0 ? "top-[1.0625rem]" : "top-0",
                      position === lastIndex
                        ? "bg-[linear-gradient(to_bottom,var(--color-border)_0%,var(--color-border)_38%,transparent_100%)]"
                        : "bg-border",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-3 left-1/2 flex size-2.5 -translate-x-1/2 items-center justify-center",
                      "rounded-full border border-border-strong bg-background",
                      "transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                      "group-hover:scale-110 group-hover:border-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1 rounded-full bg-faint transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                        "group-hover:bg-accent group-hover:shadow-[0_0_8px_var(--color-accent)]",
                      )}
                    />
                  </span>
                </div>

                <div
                  className={cn(
                    "min-w-0 flex-1 pb-12 lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-10",
                    position === lastIndex ? "lg:pb-0" : "lg:pb-16",
                  )}
                >
                  <span
                    className={cn(
                      "block font-mono text-[2rem] leading-none text-faint lg:col-span-2 lg:text-[2.25rem]",
                      "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                      "group-hover:text-silver",
                    )}
                    data-numeric
                  >
                    {stage.index}
                  </span>
                  <Heading className="mt-4 text-h3 text-foreground lg:col-span-4 lg:mt-0">
                    {stage.title}
                  </Heading>
                  <p className="mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted lg:col-span-6 lg:mt-0 lg:max-w-none">
                    {stage.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
