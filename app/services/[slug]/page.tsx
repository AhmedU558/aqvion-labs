import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageAction } from "@/components/sections/PageAction";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagLine } from "@/components/ui/TagLine";
import { capabilities, getCapability } from "@/data/solutions";
import { routeMetadata } from "@/lib/metadata";

/**
 * A single capability.
 *
 * One route per capability rather than one combined page: each is a real
 * destination with its own metadata, its own sub-capability detail and its own
 * place in the sitemap. The overview at /services stays as the index.
 */

export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.id }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};

  return routeMetadata(`/services/${capability.id}`, capability.title, capability.description);
}

export default async function CapabilityPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  const position = capabilities.findIndex((entry) => entry.id === capability.id);
  const previous = capabilities[position - 1];
  const next = capabilities[position + 1];

  return (
    <>
      <section aria-labelledby="capability-title" className="section-y relative">
        <Container>
          <Reveal y={12}>
            <Link
              href="/services"
              className="label-mono inline-flex items-center gap-2 py-1 transition-colors duration-[var(--duration-fast)] hover:text-muted"
            >
              <ArrowLeft aria-hidden className="size-3" />
              All capabilities
            </Link>
          </Reveal>

          <SectionHeading
            as="h1"
            headingId="capability-title"
            index={capability.index}
            eyebrow="Capability"
            title={capability.title}
            description={capability.lede}
            className="mt-8"
          />

          <Reveal delay={0.1}>
            <TagLine tags={capability.tags} className="mt-10 max-w-md" />
          </Reveal>
        </Container>
      </section>

      <section
        aria-labelledby="capability-offers"
        className="section-y relative border-t border-border"
      >
        <Container>
          <SectionHeading
            headingId="capability-offers"
            index="01"
            eyebrow="What we offer"
            title={`Inside ${capability.title}.`}
          />

          <ul className="mt-16 border-b border-border lg:mt-24">
            {capability.offers.map((offer, offerIndex) => (
              <Reveal key={offer.name} as="li" className="border-t border-border">
                <article className="flex flex-col gap-4 py-9 lg:flex-row lg:items-baseline lg:gap-10 lg:py-12">
                  <div className="flex items-baseline gap-4 lg:w-[38%] lg:shrink-0">
                    <span className="label-mono shrink-0 font-medium text-muted-strong" data-numeric>
                      {String(offerIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h3 text-foreground">{offer.name}</h3>
                  </div>
                  <p className="text-[0.9375rem] leading-relaxed text-muted lg:flex-1">
                    {offer.summary}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="capability-next"
        className="section-y relative border-t border-border"
      >
        <Container>
          <SectionHeading
            headingId="capability-next"
            index="02"
            eyebrow="Next"
            title="Start a conversation."
            description="Tell us what you're trying to build, automate, or transform."
            action={<PageAction />}
          />

          {/* Sideways movement through the capability set, so a visitor who
              landed here from search has somewhere to go other than back. */}
          <nav aria-label="Other capabilities" className="mt-16 grid gap-px bg-border sm:grid-cols-2">
            {[previous, next].map((entry, side) =>
              entry ? (
                <Link
                  key={entry.id}
                  href={`/services/${entry.id}`}
                  className="group flex items-center justify-between gap-4 bg-background px-6 py-7 transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)] hover:bg-surface"
                >
                  <span>
                    <span className="label-mono block">{side === 0 ? "Previous" : "Next"}</span>
                    <span className="mt-2 block text-[1.125rem] text-muted-strong transition-colors group-hover:text-foreground">
                      {entry.title}
                    </span>
                  </span>
                  {side === 0 ? (
                    <ArrowLeft aria-hidden className="size-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                  ) : (
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                  )}
                </Link>
              ) : (
                <span key={side} className="hidden bg-background sm:block" />
              ),
            )}
          </nav>
        </Container>
      </section>
    </>
  );
}
