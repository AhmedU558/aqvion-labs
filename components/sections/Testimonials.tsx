import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialIntro, testimonials } from "@/data/proof";

/**
 * Client quotes.
 *
 * Set as an editorial row rather than a carousel: three quotes that can all be
 * read at once beat one quote and a pair of arrows. Copy lives in
 * data/proof.ts, and every quote there is currently a placeholder.
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section-y relative border-t border-border"
    >
      <Container>
        <SectionHeading
          headingId="testimonials-title"
          index={testimonialIntro.index}
          eyebrow={testimonialIntro.eyebrow}
          title={testimonialIntro.title}
        />

        <SampleNotice className="mt-12 max-w-3xl" />

        <ul className="mt-12 grid gap-px bg-border md:grid-cols-3 lg:mt-16">
          {testimonials.map((entry, position) => (
            <Reveal
              key={entry.name}
              as="li"
              delay={0.06 * position}
              className="bg-background p-8 lg:p-10"
            >
              <figure className="flex h-full flex-col justify-between gap-8">
                <blockquote className="text-[1.0625rem] leading-relaxed text-muted-strong">
                  <span aria-hidden className="mr-1 text-primary-bright">
                    &ldquo;
                  </span>
                  {entry.quote}
                  <span aria-hidden className="text-primary-bright">
                    &rdquo;
                  </span>
                </blockquote>

                <figcaption className="border-t border-border pt-5">
                  <span className="block text-[0.9375rem] text-foreground">{entry.name}</span>
                  <span className="label-mono mt-2 block">{entry.role}</span>
                  <span className="mt-1.5 block font-mono text-[0.75rem] tracking-[0.04em] text-muted">
                    {entry.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
