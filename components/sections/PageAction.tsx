import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ctaActions } from "@/data/cta";
import { prefetchFor } from "@/data/navigation";

/**
 * The site's existing conversion action, reused on inner pages so Contact
 * stays one destination with one label.
 */
export function PageAction() {
  return (
    <Button
      href={ctaActions.primary.href}
      prefetch={prefetchFor(ctaActions.primary.href)}
      variant="primary"
      size="lg"
      className="group w-full focus-visible:outline-offset-4 sm:w-auto"
    >
      {ctaActions.primary.label}
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-precise)] group-hover:translate-x-0.5"
      />
    </Button>
  );
}
