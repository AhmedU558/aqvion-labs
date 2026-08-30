import { Reveal } from "@/components/ui/Reveal";
import { insightTopics } from "@/data/insights";
import { cn } from "@/lib/utils";

const colorShift = "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]";

/**
 * Featured topics as a ruled editorial index — the same specification
 * register as CapabilityIndex, not a topic-card gallery.
 */
export function TopicIndex() {
  return (
    <ol className="mt-6 border-b border-border">
      {insightTopics.map((topic) => (
        <li key={topic.id} id={topic.id} className="border-t border-border">
          <Reveal className="group">
            <article className="relative flex flex-col gap-4 py-9 sm:gap-5 lg:flex-row lg:items-baseline lg:gap-10 lg:py-12">
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[image:var(--gradient-brand)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)] group-hover:scale-x-100"
            />
            <div className="flex items-baseline gap-4 lg:w-[34%] lg:shrink-0">
              <span
                className={cn(
                  "label-mono shrink-0 font-medium text-muted-strong",
                  "group-hover:text-primary-bright",
                  colorShift,
                )}
                data-numeric
              >
                {topic.index}
              </span>
              <h3 className="text-h3 text-foreground">{topic.title}</h3>
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-muted lg:flex-1">
              {topic.description}
            </p>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
