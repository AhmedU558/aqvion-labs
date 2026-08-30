import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { GridBackground } from "@/components/ui/GridBackground";
import { HeroEyebrow } from "@/components/ui/HeroEyebrow";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { TagLine } from "@/components/ui/TagLine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  technologyCore,
  technologyDomains,
  technologyFlow,
  technologyIntro,
  type TechnologyDomain,
} from "@/data/technology";
import { cn } from "@/lib/utils";

/**
 * Technology.
 *
 * A system map rather than a grid of cards: a central spine carrying the
 * AQVION core, with the five technology domains branching off it. Cards would
 * give five unrelated disciplines the same weight and say nothing about how
 * they connect, which is the entire point of the section.
 *
 * The core sits at the head of the spine because that is where it belongs
 * architecturally — everything below hangs off it — and the spine fades in
 * beneath it rather than butting against it, so the layer reads as descending
 * from the core instead of being bolted to it.
 *
 * Domains alternate left and right of the spine on desktop, which produces the
 * asymmetric composition and lets each block sit at a comfortable measure
 * instead of being stretched across the full field.
 *
 * The DATA → INTELLIGENCE → SOFTWARE → AUTOMATION → SCALE sequence is printed
 * once, in the core, as a readable chain. Tagging each domain with its stage
 * was the obvious alternative and it fails on contact: "Automation" is both a
 * stage and a domain, so two of the five rows would print the word twice.
 *
 * Phones drop to a single stack with the spine in the left gutter — a genuine
 * vertical architecture, not the desktop diagram compressed.
 *
 * A server component. The only client code is the shared reveal.
 */
export function Technology() {
  return (
    <section
      id="technology"
      aria-label={technologyIntro.eyebrow}
      className="section-y relative border-t border-border"
    >
      <Container>
        <SectionHeading
          index={technologyIntro.index}
          eyebrow={technologyIntro.eyebrow}
          title={technologyIntro.title}
          description={technologyIntro.description}
        />
      </Container>

      {/* The field the map is drawn on. `isolate` keeps the substrate and the
          glow behind the content without either escaping the section. */}
      {/* No Glow here. The core is already lit from behind by the mark's own
          contact gradient in Logo, which is a 34px blur rather than a promoted
          448px one, and this brief asks for no excessive glow. The grid carries
          the atmosphere on its own. */}
      <div className="relative isolate mt-16 lg:mt-24">
        <GridBackground fade="radial" cell={72} opacity={0.4} />

        <Container className="relative">
          <Core />
          <DomainMap />
        </Container>
      </div>
    </section>
  );
}

/** Left-aligned on phones so it shares an edge with the stack beneath it. */
function Core() {
  return (
    <Reveal className="flex flex-col items-start lg:items-center">
      <Logo size="md" withWordmark={false} href={null} />

      <HeroEyebrow
        owner={technologyCore.owner}
        detail={technologyCore.detail}
        className="mt-6"
      />

      <p className="label-mono mt-6 leading-[2] lg:text-center">
        {technologyFlow.map((stage, position) => (
          <Fragment key={stage}>
            {position > 0 && (
              <span aria-hidden className="mx-2 text-border-strong">
                &rarr;
              </span>
            )}
            <span className="text-muted-strong">{stage}</span>
          </Fragment>
        ))}
      </p>
    </Reveal>
  );
}

/**
 * The spine. Fades in at the top so it emerges from the core and out at the
 * bottom so the layer does not terminate on a hard edge — the same reasoning
 * the hero uses for paths that leave the frame.
 */
const spine =
  "bg-[linear-gradient(to_bottom,transparent_0%,var(--color-border)_5%,var(--color-border)_86%,transparent_100%)]";

const easeBase = "duration-[var(--duration-base)] ease-[var(--ease-precise)]";

function DomainMap() {
  return (
    <ol className="relative mt-14 lg:mt-20">
      <span
        aria-hidden
        className={cn(
          "absolute top-0 bottom-0 left-3 w-px -translate-x-1/2 lg:left-1/2",
          spine,
        )}
      />

      {technologyDomains.map((domain, position) => (
        <Reveal
          key={domain.id}
          as="li"
          delay={position * 0.06}
          className="group relative pb-14 lg:pb-16"
        >
          {/* Alternating sides give the map its rhythm; three left, two right. */}
          <Domain domain={domain} isLeft={position % 2 === 0} />
        </Reveal>
      ))}
    </ol>
  );
}

function Domain({ domain, isLeft }: { domain: TechnologyDomain; isLeft: boolean }) {
  const { title, stack } = domain;

  return (
    <>
      {/* Port on the spine. Same construction as the junctions in the hero's
          Intelligence Field — an outer ring, an inner dot, cyan on contact. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-2.5 left-3 flex size-2.5 -translate-x-1/2 items-center justify-center",
          "rounded-full border border-border-strong bg-background lg:left-1/2",
          "transition-[border-color,transform] group-hover:scale-110 group-hover:border-accent",
          easeBase,
        )}
      >
        <span
          className={cn(
            "size-1 rounded-full bg-faint transition-colors",
            "group-hover:bg-accent group-hover:shadow-[0_0_8px_var(--color-accent)]",
            easeBase,
          )}
        />
      </span>

      {/* The branch from spine to block. Desktop only: on phones the block sits
          directly beside the spine and a connector would be drawing 20px of
          line for no gain. */}
      <div
        aria-hidden
        className={cn(
          "absolute top-[0.9375rem] hidden h-px w-14 lg:block",
          isLeft ? "right-1/2" : "left-1/2",
        )}
      >
        <span className="absolute inset-0 bg-border" />
        {/* Lit on hover, wiping outward from the spine. Transform only. */}
        <span
          className={cn(
            "absolute inset-0 scale-x-0 bg-[image:var(--gradient-brand)]",
            "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-precise)]",
            "group-hover:scale-x-100",
            isLeft ? "origin-right" : "origin-left",
          )}
        />
      </div>

      <div
        className={cn(
          "pl-10",
          isLeft
            ? "lg:w-1/2 lg:pr-14 lg:pl-0 lg:text-right"
            : "lg:ml-auto lg:w-1/2 lg:pl-14",
        )}
      >
        <h3 className="text-h3 text-foreground">{title}</h3>

        <TagLine
          tags={stack}
          className={cn("mt-4 leading-[2] transition-colors group-hover:text-muted", easeBase)}
        />
      </div>
    </>
  );
}
