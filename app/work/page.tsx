import { Container } from "@/components/layout/Container";
import { CaseStudyIndex } from "@/components/sections/CaseStudyIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudyIntro } from "@/data/proof";
import { routeMetadata } from "@/lib/metadata";

export const metadata = routeMetadata("/work", "Work", caseStudyIntro.description);

export default function WorkPage() {
  return (
    <section aria-labelledby="work-title" className="section-y relative">
      <Container>
        <SectionHeading
          as="h1"
          headingId="work-title"
          index={caseStudyIntro.index}
          eyebrow={caseStudyIntro.eyebrow}
          title={caseStudyIntro.title}
          description={caseStudyIntro.description}
        />

        <CaseStudyIndex headingLevel="h2" />
      </Container>
    </section>
  );
}
