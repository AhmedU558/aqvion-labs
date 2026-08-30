import { Container } from "@/components/layout/Container";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { clientBand } from "@/data/proof";

/**
 * The client band.
 *
 * A continuous marquee rather than a static logo grid, because a grid of seven
 * wordmarks has an obvious first and last and invites counting. The track is
 * duplicated and translated by exactly half its width, so the loop has no seam.
 *
 * The animation is a single transform on one element — the cheapest thing the
 * compositor can be asked to do — and it stops entirely on hover and under
 * `prefers-reduced-motion`, where the band simply becomes a static row.
 */
export function ClientMarquee() {
  const track = [...clientBand.names, ...clientBand.names];

  return (
    <section aria-labelledby="clients-title" className="relative border-t border-border py-16 lg:py-20">
      <Container>
        <h2 id="clients-title" className="label-mono text-center">
          {clientBand.eyebrow}
        </h2>
        <SampleNotice className="mx-auto mt-6 max-w-3xl" />
      </Container>

      {/* Full-bleed: the band should run past the container gutters. */}
      <div className="marquee mt-10 lg:mt-12">
        <ul className="marquee__track" aria-hidden>
          {track.map((name, position) => (
            <li key={`${name}-${position}`} className="marquee__item">
              {name}
            </li>
          ))}
        </ul>

        {/* The visible track is decorative duplication; this is what a screen
            reader actually reads, once. */}
        <ul className="sr-only">
          {clientBand.names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
