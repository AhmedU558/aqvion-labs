import { Container } from "@/components/layout/Container";
import { ApproachFramework } from "@/components/sections/ApproachFramework";
import { PageAction } from "@/components/sections/PageAction";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approachClose, approachIntro } from "@/data/approach";
import { routeMetadata } from "@/lib/metadata";

export const metadata = routeMetadata("/approach", "Approach", approachIntro.description);

export default function ApproachPage() {
  return (
    <>
      <section aria-labelledby="approach-title" className="section-y relative">
        <Container>
          <SectionHeading
            as="h1"
            headingId="approach-title"
            index={approachIntro.index}
            eyebrow={approachIntro.eyebrow}
            title={approachIntro.title}
            description={approachIntro.description}
          />
        </Container>
      </section>

      <ApproachFramework headingLevel="h2" />

      <section aria-labelledby="approach-close-title" className="section-y relative border-t border-border">
        <Container>
          <SectionHeading
            headingId="approach-close-title"
            index={approachClose.index}
            eyebrow={approachClose.eyebrow}
            title={approachClose.title}
            description={approachClose.description}
            action={<PageAction />}
          />
        </Container>
      </section>
    </>
  );
}
