import { Container } from "@/components/layout/Container";
import { IntelligenceField } from "@/components/sections/IntelligenceField";
import { HeroActions } from "@/components/ui/HeroActions";
import { HeroEyebrow } from "@/components/ui/HeroEyebrow";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { SystemStatus } from "@/components/ui/SystemStatus";

/**
 * The AQVION LABS hero.
 *
 * A server component by design: the headline, supporting copy and calls to
 * action are in the initial HTML at full opacity. The activation sequence in
 * styles/hero.css enhances that entrance when it runs, but nothing here is ever
 * waiting on JavaScript to become visible.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--nav-height))] flex-col"
    >
      <IntelligenceField />

      <Container className="hero-body relative z-10 flex flex-1 flex-col justify-center">
        <div className="max-w-2xl lg:max-w-[62%] xl:max-w-[46rem]">
          <div data-hero-step="eyebrow">
            <HeroEyebrow owner="AQVION LABS" detail="TECHNOLOGY & INNOVATION" />
          </div>

          <h1
            id="hero-title"
            data-hero-step="headline"
            className="hero-headline mt-7 text-foreground sm:mt-8"
          >
            We engineer intelligent systems for the businesses shaping tomorrow.
          </h1>

          <p
            data-hero-step="copy"
            className="mt-6 max-w-[33em] text-lead text-muted sm:mt-8"
          >
            AI, automation, software engineering, and digital products built to solve complex
            problems and create lasting advantage.
          </p>

          <div data-hero-step="actions" className="mt-9 sm:mt-10">
            <HeroActions
              primary={{ label: "Start a Project", href: "/contact" }}
              secondary={{ label: "Explore Our Work", href: "/work" }}
            />
          </div>
        </div>
      </Container>

      <Container className="relative z-10 pb-6 sm:pb-8">
        <div className="flex items-end justify-between gap-6">
          <div data-hero-step="status" className="hidden md:block">
            <SystemStatus label="AQVION INTELLIGENCE FIELD" state="OPERATIONAL" />
          </div>

          <div data-hero-step="scroll">
            <ScrollIndicator label="SCROLL TO EXPLORE" href="#beyond-the-hero" />
          </div>
        </div>
      </Container>
    </section>
  );
}
