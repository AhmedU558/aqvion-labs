import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Glow } from "@/components/ui/Glow";
import { GridBackground } from "@/components/ui/GridBackground";
import { HeroEyebrow } from "@/components/ui/HeroEyebrow";
import { prefetchFor } from "@/data/navigation";

/**
 * 404.
 *
 * Deliberately small: one statement, one way out. It reuses the hero's eyebrow
 * and the footer's atmosphere so an unmatched URL still reads as part of the
 * site rather than as a framework default.
 *
 * A server component with nothing held at `opacity: 0` — the same rule the hero
 * follows. `SectionHeading` was the obvious candidate here but it gates its
 * content behind a scroll-triggered `Reveal`, which would hide a page whose
 * entire purpose is to be read immediately.
 *
 * No `metadata` export: Next.js only honours one from `global-not-found`, and
 * it already injects `noindex` for anything returning a 404.
 */
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate flex min-h-[calc(100svh-var(--nav-height))] items-center overflow-hidden"
    >
      <GridBackground fade="radial" opacity={0.3} />
      <Glow
        tone="mixed"
        size="lg"
        intensity={0.08}
        className="-top-[22rem] left-1/2 -translate-x-1/2"
      />

      <Container className="relative py-20 sm:py-24">
        <div className="max-w-xl">
          <HeroEyebrow owner="AQVION LABS" detail="SYSTEM RESPONSE" />

          <h1 id="not-found-title" className="mt-7 text-h1 text-foreground sm:mt-8">
            Page not found.
          </h1>

          <p className="mt-6 text-lead text-muted sm:mt-7">
            The requested destination does not exist or has moved.
          </p>

          <div className="mt-9 sm:mt-10">
            <Button
              href="/"
              prefetch={prefetchFor("/")}
              variant="primary"
              size="lg"
              className="group w-full sm:w-auto"
            >
              Return Home
              <ArrowRight
                aria-hidden
                className="size-4 shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-precise)] group-hover:translate-x-0.5"
              />
            </Button>
          </div>

          <div aria-hidden className="hairline mt-12 sm:mt-14" />

          <p className="label-mono mt-5">
            Error
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-primary-bright" data-numeric>
              404
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
