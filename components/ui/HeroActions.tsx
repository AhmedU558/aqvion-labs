import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { prefetchFor } from "@/data/navigation";
import { cn } from "@/lib/utils";

export type HeroAction = {
  label: string;
  href: string;
};

export type HeroActionsProps = {
  primary: HeroAction;
  secondary: HeroAction;
  className?: string;
};

const arrow =
  "size-4 shrink-0 transition-transform duration-[var(--duration-fast)] " +
  "ease-[var(--ease-precise)] group-hover:translate-x-0.5";

/**
 * The hero's two calls to action. The hierarchy is unambiguous: one solid, one
 * bordered. Full width on phones so both stay comfortably tappable.
 */
export function HeroActions({ primary, secondary, className }: HeroActionsProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4", className)}>
      <MagneticButton className="w-full sm:w-auto">
        <Button
          href={primary.href}
          prefetch={prefetchFor(primary.href)}
          variant="primary"
          size="lg"
          className="group w-full sm:w-auto"
        >
          {primary.label}
          <ArrowRight aria-hidden className={arrow} />
        </Button>
      </MagneticButton>

      <MagneticButton className="w-full sm:w-auto">
        <Button
          href={secondary.href}
          prefetch={prefetchFor(secondary.href)}
          variant="secondary"
          size="lg"
          className="group w-full sm:w-auto"
        >
          {secondary.label}
          <ArrowRight aria-hidden className={cn(arrow, "text-muted group-hover:text-accent")} />
        </Button>
      </MagneticButton>
    </div>
  );
}
