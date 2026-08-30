import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type Principle = {
  index: string;
  title: string;
};

const colorShift = "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]";

/**
 * A numbered list of short principles. Used for beliefs and thinking —
 * statements, not cards.
 */
export function PrincipleList({ items }: { items: readonly Principle[] }) {
  return (
    <ol className="mt-16 border-b border-border lg:mt-20">
      {items.map((item) => (
        <Reveal key={item.index} as="li" className="group border-t border-border">
          <div className="relative flex items-baseline gap-5 py-8 sm:gap-8 lg:py-10">
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[image:var(--gradient-brand)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)] group-hover:scale-x-100"
            />
            <span
              className={cn(
                "label-mono shrink-0 font-medium text-muted-strong",
                "group-hover:text-primary-bright",
                colorShift,
              )}
              data-numeric
            >
              {item.index}
            </span>
            <p className="text-h3 text-foreground">{item.title}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
