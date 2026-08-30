import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NetworkBand } from "@/components/ui/NetworkBand";
import { Reveal } from "@/components/ui/Reveal";
import { ctaActions, ctaIntro } from "@/data/cta";
import { prefetchFor } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Let's build.
 *
 * The homepage's first real conversion moment. It is a closing statement —
 * oversized type, a hairline, and one committed action — not a banner with
 * two equal pills on a gradient. The signal around the primary CTA is the
 * same node-and-rail language as Process and Technology: a path that lights
 * when the system is touched.
 *
 * Primary action goes to /contact. Secondary is an in-page jump to #solutions.
 */
export function Cta() {
  return (
    <section
      id="lets-build"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-t border-border pt-16 pb-[var(--spacing-section-sm)] md:pt-20 md:pb-[var(--spacing-section)]"
    >
      {/* Atmosphere only — masked so the mesh dissolves before it reaches the
          type, and never competes with the closing statement. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(80%_70%_at_70%_50%,#000_0%,transparent_75%)]"
      >
        <NetworkBand />
      </div>

      <Container className="relative">
        <Reveal y={12}>
          <div className="flex items-center gap-3">
            <span className="label-mono text-primary-bright" data-numeric>
              {ctaIntro.index}
            </span>
            <span aria-hidden className="h-px w-8 bg-border-strong" />
            <span className="label-mono">{ctaIntro.eyebrow}</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="cta-title"
            className="mt-6 max-w-[18ch] text-h1 text-foreground sm:mt-8 sm:max-w-[20ch]"
          >
            <span className="block">{ctaIntro.title}</span>
            <span className="block">{ctaIntro.titleLine}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[34rem] text-lead text-muted sm:mt-8">
            {ctaIntro.description}
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-12 sm:mt-16">
          <CtaActions />
        </Reveal>
      </Container>
    </section>
  );
}

const arrow =
  "size-4 shrink-0 transition-transform duration-[var(--duration-fast)] " +
  "ease-[var(--ease-precise)] group-hover:translate-x-0.5";

function CtaActions() {
  return (
    <div>
      <div aria-hidden className="hairline mb-10 opacity-40 sm:mb-12" />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="group/signal flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <MobileSignal />
          <SignalRail side="start" />

          <MagneticButton className="w-full sm:w-auto">
            <Button
              href={ctaActions.primary.href}
              prefetch={prefetchFor(ctaActions.primary.href)}
              variant="primary"
              size="lg"
              className="group w-full focus-visible:outline-offset-4 sm:w-auto"
            >
              {ctaActions.primary.label}
              <ArrowRight aria-hidden className={arrow} />
            </Button>
          </MagneticButton>

          <SignalRail side="end" />
        </div>

        <Button
          href={ctaActions.secondary.href}
          prefetch={prefetchFor(ctaActions.secondary.href)}
          variant="link"
          className="self-start focus-visible:outline-offset-4 sm:self-auto"
        >
          {ctaActions.secondary.label}
        </Button>
      </div>
    </div>
  );
}

/**
 * A short run of the process rail, flanking the primary action. The line
 * wipes in and the port goes cyan on hover — transform and color only.
 */
/** Phones keep a single fading run above the button instead of side rails. */
function MobileSignal() {
  return (
    <span className="flex w-full items-center sm:hidden">
      <SignalNode />
      <span className="relative ml-2 h-px flex-1">
        <span className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_0%,var(--color-border)_40%,transparent_100%)]" />
      </span>
    </span>
  );
}

function SignalRail({ side }: { side: "start" | "end" }) {
  const isStart = side === "start";

  return (
    <span
      className={cn(
        "hidden items-center sm:flex",
        isStart ? "w-10" : "w-16",
      )}
    >
      {isStart && <SignalNode />}
      <span className="relative mx-2 h-px flex-1">
        <span className="absolute inset-0 bg-border" />
        <span
          className={cn(
            "absolute inset-0 scale-x-0 bg-[image:var(--gradient-brand)]",
            "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-precise)]",
            "group-hover/signal:scale-x-100",
            isStart ? "origin-right" : "origin-left",
          )}
        />
      </span>
      {!isStart && <SignalNode />}
    </span>
  );
}

function SignalNode() {
  return (
    <span
      className={cn(
        "flex size-2.5 shrink-0 items-center justify-center rounded-full",
        "border border-border-strong bg-background",
        "transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-precise)]",
        "group-hover/signal:scale-110 group-hover/signal:border-accent",
      )}
    >
      <span
        className={cn(
          "size-1 rounded-full bg-faint transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]",
          "group-hover/signal:bg-accent group-hover/signal:shadow-[0_0_8px_var(--color-accent)]",
        )}
      />
    </span>
  );
}
