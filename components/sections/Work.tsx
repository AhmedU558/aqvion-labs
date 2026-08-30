import { Container } from "@/components/layout/Container";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workIntro } from "@/data/work";

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
      aria-label={workIntro.eyebrow}
      className="relative border-t border-border pt-[var(--spacing-section-sm)] pb-16 md:pt-[var(--spacing-section)] md:pb-20"
    >
      <Container>
        <SectionHeading
          index={workIntro.index}
          eyebrow={workIntro.eyebrow}
          title={workIntro.title}
          description={workIntro.description}
        />

        <WorkIndex />
      </Container>
    </section>
  );
}
