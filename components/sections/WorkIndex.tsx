import { WorkField } from "@/components/sections/WorkField";
import { Reveal } from "@/components/ui/Reveal";
import { TagLine } from "@/components/ui/TagLine";
import { workProjects, type WorkProject } from "@/data/work";
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
 * The editorial case-study sequence shared by the homepage Work section and
 * /work. Copy stays in data/work.ts. Rows are not links — there are no
 * individual case-study routes yet.
 */
export function WorkIndex({ headingLevel = "h3" }: { headingLevel?: HeadingLevel }) {
  return (
    <ol className="mt-16 border-b border-border lg:mt-24">
      {workProjects.map((project, position) => (
        <Reveal key={project.index} as="li" className="border-t border-border">
          <ProjectRow
            project={project}
            reverse={position % 2 === 1}
            headingLevel={headingLevel}
          />
        </Reveal>
      ))}
    </ol>
  );
}

const colorShift = "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]";

function ProjectRow({
  project,
  reverse,
  headingLevel: Heading,
}: {
  project: WorkProject;
  reverse: boolean;
  headingLevel: HeadingLevel;
}) {
  const { index, title, description, tags, field } = project;

  return (
    <article className="relative py-10 lg:py-12">
      <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-16 xl:gap-20">
        <div
          className={cn(
            "min-w-0 lg:col-span-6",
            reverse ? "lg:order-1" : "lg:order-2",
          )}
        >
          <span
            className={cn(
              "block font-mono text-[2.25rem] leading-none text-faint lg:text-[3rem]",
                colorShift,
            )}
            data-numeric
          >
            {index}
          </span>

          <Heading
            className={cn(
              "mt-5 text-[1.5rem] leading-[1.15] tracking-[-0.025em] text-muted-strong",
              "sm:text-[1.75rem] lg:mt-6 lg:text-[2rem]",
                colorShift,
            )}
          >
            {title}
          </Heading>

          <p className="mt-4 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted">
            {description}
          </p>

          <div className="mt-6">
            <TagLine tags={tags} />
          </div>
        </div>

        <div
          className={cn(
            "mt-8 lg:col-span-6 lg:mt-0",
            reverse ? "lg:order-2" : "lg:order-1",
          )}
        >
          <WorkField field={field} />
        </div>
      </div>
    </article>
  );
}
