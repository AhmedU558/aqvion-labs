import { Container } from "@/components/layout/Container";
import { CapabilityIndex } from "@/components/sections/CapabilityIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutionsIntro } from "@/data/solutions";
import { routeMetadata } from "@/lib/metadata";

export const metadata = routeMetadata("/services", "Services", solutionsIntro.description);

export default function ServicesPage() {
  return (
    <section aria-labelledby="services-title" className="section-y relative">
      <Container>
        <SectionHeading
          as="h1"
          headingId="services-title"
          index={solutionsIntro.index}
          eyebrow="Services"
          title={solutionsIntro.title}
          description={solutionsIntro.description}
        />

        <CapabilityIndex headingLevel="h2" />
      </Container>
    </section>
  );
}
