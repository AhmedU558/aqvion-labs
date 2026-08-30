import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactValue } from "@/components/ui/ContactValue";
import { GridBackground } from "@/components/ui/GridBackground";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactIntro } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { routeMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = routeMetadata("/contact", "Contact", contactIntro.description);

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="section-y relative isolate">
      <GridBackground fade="radial" cell={72} opacity={0.28} />

      <Container className="relative">
        <SectionHeading
          as="h1"
          headingId="contact-title"
          index={contactIntro.index}
          eyebrow={contactIntro.eyebrow}
          title={contactIntro.title}
          description={contactIntro.description}
        />

        {/* The form is above the fold on a conversion route: do not gate it
            behind a reveal the way a mid-page homepage block is. */}
        <div className="mt-12 grid gap-16 lg:mt-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <h2 className="label-mono">Direct</h2>
            <div className="mt-5 space-y-3">
              <ContactValue label="Email" value={siteConfig.contact.email} />
              <ContactValue label="Phone" value={siteConfig.contact.phone} />
              <ContactValue label="Office" value={siteConfig.contact.addressLines[0]} />
            </div>

            <div className="mt-14">
              <ContactSignal />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

/** A short process rail — atmosphere, not a second call to action. */
function ContactSignal() {
  return (
    <div aria-hidden>
      <div className="flex items-center">
        {["01", "02", "03"].map((index, position) => (
          <span key={index} className={cn("flex items-center", position < 2 && "flex-1")}>
            <span className="flex size-2.5 shrink-0 items-center justify-center rounded-full border border-border-strong bg-background">
              <span
                className={cn(
                  "size-1 rounded-full",
                  position === 1 ? "bg-accent shadow-[0_0_8px_var(--color-accent)]" : "bg-faint",
                )}
              />
            </span>
            {position < 2 && <span className="mx-3 h-px flex-1 bg-border" />}
          </span>
        ))}
      </div>
      <p className="label-mono mt-5 text-faint">
        Problem
        <span className="mx-2 text-border-strong">→</span>
        System
        <span className="mx-2 text-border-strong">→</span>
        Roadmap
      </p>
    </div>
  );
}
