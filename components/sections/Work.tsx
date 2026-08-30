import { Container } from "@/components/layout/Container";
import { CaseStudyCarousel } from "@/components/sections/CaseStudyCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudyIntro } from "@/data/proof";

/**
 * Selected work.
 *
 * An editorial case-study sequence rather than a portfolio grid. The rows live
 * in WorkIndex so /work can reuse them. They remain representative system
 * concepts, not named client engagements, and they are not links — individual
 * case-study routes do not exist yet.
 */
export function Work() {
  return (
    <section
      id="work"
      aria-label={caseStudyIntro.eyebrow}
      className="relative border-t border-border pt-[var(--spacing-section-sm)] pb-16 md:pt-[var(--spacing-section)] md:pb-20"
    >
      <Container>
        <SectionHeading
          index={caseStudyIntro.index}
          eyebrow={caseStudyIntro.eyebrow}
          title={caseStudyIntro.title}
          description={caseStudyIntro.description}
        />

        <CaseStudyCarousel />
      </Container>
    </section>
  );
}
