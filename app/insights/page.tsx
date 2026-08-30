import { Container } from "@/components/layout/Container";
import { PageAction } from "@/components/sections/PageAction";
import { TopicIndex } from "@/components/sections/TopicIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insightsIntro, insightsLibrary } from "@/data/insights";
import { routeMetadata } from "@/lib/metadata";

export const metadata = routeMetadata("/insights", "Insights", insightsIntro.description);

export default function InsightsPage() {
  return (
    <>
      <section aria-labelledby="insights-title" className="section-y relative">
        <Container>
          <SectionHeading
            as="h1"
            headingId="insights-title"
            index={insightsIntro.index}
            eyebrow={insightsIntro.eyebrow}
            title={insightsIntro.title}
            description={insightsIntro.description}
          />

          <h2 className="label-mono mt-16 lg:mt-24">Featured topics</h2>
          <TopicIndex />
        </Container>
      </section>

      <section
        aria-labelledby="insights-library-title"
        className="section-y relative border-t border-border"
      >
        <Container>
          <SectionHeading
            headingId="insights-library-title"
            index={insightsLibrary.index}
            eyebrow={insightsLibrary.eyebrow}
            title={insightsLibrary.title}
            description={insightsLibrary.description}
            action={<PageAction />}
          />
        </Container>
      </section>
    </>
  );
}
