import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { companyPractices } from "@/data/company";
import { prefetchFor } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const colorShift = "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]";

/**
 * What we do — titles from the company brief, descriptions reused from
 * existing capability copy, destinations that already exist.
 */
export function PracticeIndex() {
  return (
    <ul className="mt-16 border-b border-border lg:mt-20">
      {companyPractices.map((practice) => (
        <Reveal key={practice.index} as="li" className="group border-t border-border">
          <Link
            href={practice.href}
            prefetch={prefetchFor(practice.href)}
            className="relative flex flex-col gap-4 py-9 focus-visible:outline-offset-4 sm:gap-5 lg:flex-row lg:items-baseline lg:gap-10 lg:py-12"
          >
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
                {practice.index}
              </span>
              <h3 className="text-h3 text-foreground">{practice.title}</h3>
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-muted lg:flex-1">
              {practice.description}
            </p>
            <ArrowRight
              aria-hidden
              className={cn(
                "size-4 shrink-0 self-start text-faint lg:self-center",
                "transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
                "group-hover:translate-x-0.5 group-hover:text-accent",
              )}
            />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
