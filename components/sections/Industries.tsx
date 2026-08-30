import { Container } from "@/components/layout/Container";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesIntro } from "@/data/industries";

/**
 * Where we create impact.
 *
 * An editorial selector rather than a grid of industry cards. Cards would give
 * five sectors the same tile weight and say nothing about focus; a numbered
 * index with one reading surface is the same specification register as
 * Solutions, applied to where the work lands.
 *
 * The interactive split lives in IndustrySelector so this file can stay a
 * server component. Hero, Solutions, Process and Technology are untouched.
 */
export function Industries() {
  return (
    <section
      id="industries"
      aria-label={industriesIntro.eyebrow}
      className="section-y relative border-t border-border"
    >
      <Container>
        <SectionHeading
          index={industriesIntro.index}
          eyebrow={industriesIntro.eyebrow}
          title={industriesIntro.title}
          description={industriesIntro.description}
        />

        <IndustryCards />
      </Container>
    </section>
  );
}
