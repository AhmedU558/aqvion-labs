import { Container } from "@/components/layout/Container";
import { FactStrip } from "@/components/sections/FactStrip";
import { PageAction } from "@/components/sections/PageAction";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { PrincipleList } from "@/components/sections/PrincipleList";
import { ContactValue } from "@/components/ui/ContactValue";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyBeliefs, companyIntro, companyThinking } from "@/data/company";
import { contactIntro } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { routeMetadata } from "@/lib/metadata";

export const metadata = routeMetadata("/company", "Company", companyIntro.description);

export default function CompanyPage() {
  return (
    <>
      <section aria-labelledby="company-title" className="section-y relative">
        <Container>
          <SectionHeading
            as="h1"
            headingId="company-title"
            index={companyIntro.index}
            eyebrow={companyIntro.eyebrow}
            title={companyIntro.title}
            description={companyIntro.description}
          />

          <FactStrip className="mt-16 lg:mt-20" />
        </Container>
      </section>

      <section aria-labelledby="beliefs-title" className="section-y relative border-t border-border">
        <Container>
          <SectionHeading
            headingId="beliefs-title"
            index={companyBeliefs.index}
            eyebrow={companyBeliefs.eyebrow}
            title="What we believe."
          />
          <PrincipleList items={companyBeliefs.items} />
        </Container>
      </section>

      <section aria-labelledby="practices-title" className="section-y relative border-t border-border">
        <Container>
          <SectionHeading
            headingId="practices-title"
            index="02"
            eyebrow="What we do"
            title="Artificial intelligence, software, automation, data, and emerging technology."
          />
          <PracticeIndex />
        </Container>
      </section>

      <section aria-labelledby="thinking-title" className="section-y relative border-t border-border">
        <Container>
          <SectionHeading
            headingId="thinking-title"
            index={companyThinking.index}
            eyebrow={companyThinking.eyebrow}
            title="How we think."
          />
          <PrincipleList items={companyThinking.items} />
        </Container>
      </section>

      <section aria-labelledby="company-close-title" className="section-y relative border-t border-border">
        <Container>
          <SectionHeading
            headingId="company-close-title"
            index="04"
            eyebrow="Direct"
            title={contactIntro.title}
            description={contactIntro.description}
            action={<PageAction />}
          />

          <div className="mt-12 space-y-3">
            <ContactValue label="Email" value={siteConfig.contact.email} />
            <ContactValue label="Phone" value={siteConfig.contact.phone} />
            <ContactValue label="Office" value={siteConfig.contact.addressLines[0]} />
          </div>
        </Container>
      </section>
    </>
  );
}
