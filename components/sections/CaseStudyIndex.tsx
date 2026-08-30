import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { TagLine } from "@/components/ui/TagLine";
import { caseStudies, type CaseStudy } from "@/data/proof";
import { getCapability } from "@/data/solutions";
import type { HeadingLevel } from "@/components/sections/CapabilityIndex";

/**
 * Case studies as engineering records rather than marketing tiles.
 *
 * Each entry is read in three moves — constraint, decision, result — because
 * that is the shape of the question a prospective client is actually asking.
 * Copy lives in data/proof.ts.
 */
export function CaseStudyIndex({ headingLevel = "h3" }: { headingLevel?: HeadingLevel }) {
  return (
    <>
      <SampleNotice className="mt-12 max-w-3xl" />

      <ol className="mt-12 border-b border-border lg:mt-16">
        {caseStudies.map((study) => (
          <Reveal key={study.index} as="li" className="border-t border-border">
            <StudyRow study={study} headingLevel={headingLevel} />
          </Reveal>
        ))}
      </ol>
    </>
  );
}

function StudyRow({
  study,
  headingLevel: Heading,
}: {
  study: CaseStudy;
  headingLevel: HeadingLevel;
}) {
  const { index, client, sector, title, challenge, approach, outcome, stack } = study;
  const capability = getCapability(study.capability);

  return (
    <article className="py-10 lg:py-14">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Identity ------------------------------------------------------- */}
        <div className="lg:col-span-4">
          <div className="flex items-baseline gap-4">
            <span className="label-mono shrink-0 font-medium text-primary-bright" data-numeric>
              {index}
            </span>
            <span className="label-mono">{sector}</span>
          </div>

          <Heading className="mt-5 text-h3 text-foreground">{title}</Heading>

          <p className="mt-3 font-mono text-[0.8125rem] tracking-[0.04em] text-muted">{client}</p>

          <TagLine tags={stack} className="mt-6" />

          {capability && (
            <Link
              href={`/services/${capability.id}`}
              className="group/cap mt-6 inline-flex items-center gap-2 py-1 text-[0.8125rem] text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground focus-visible:outline-offset-4"
            >
              {capability.title}
              <ArrowRight
                aria-hidden
                className="size-3.5 shrink-0 text-faint transition-[color,transform] duration-[var(--duration-fast)] group-hover/cap:translate-x-0.5 group-hover/cap:text-accent"
              />
            </Link>
          )}
        </div>

        {/* Record ---------------------------------------------------------- */}
        <dl className="mt-10 grid gap-8 lg:col-span-8 lg:mt-0 lg:grid-cols-3 lg:gap-10">
          {[
            { term: "Challenge", detail: challenge },
            { term: "Approach", detail: approach },
            { term: "Outcome", detail: outcome },
          ].map((entry) => (
            <div key={entry.term}>
              <dt className="label-mono border-t border-border pt-4">{entry.term}</dt>
              <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{entry.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
