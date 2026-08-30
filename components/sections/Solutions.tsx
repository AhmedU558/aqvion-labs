import { Container } from "@/components/layout/Container";
import { CapabilityCards } from "@/components/sections/CapabilityCards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutionsIntro } from "@/data/solutions";

/**
 * What we build.
 *
 * Laid out as a specification sheet rather than a grid of cards. Six capability
 * cards would give every discipline the same visual weight as a pricing tier
 * and read as a template; a ruled index reads as an engineering document, which
 * is the register the rest of the site is written in.
 *
 * The list itself lives in CapabilityIndex so /services can reuse the same
 * rows without duplicating copy or markup.
 */
export function Solutions() {
  return (
    <section
      id="solutions"
      aria-label={solutionsIntro.eyebrow}
      className="section-y relative border-t border-border"
    >
      <Container>
        <SectionHeading
          index={solutionsIntro.index}
          eyebrow={solutionsIntro.eyebrow}
          title={solutionsIntro.title}
          description={solutionsIntro.description}
        />

        <CapabilityCards />
      </Container>
    </section>
  );
}
