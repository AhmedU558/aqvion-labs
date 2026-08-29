import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Scaffold. The scroll cue needs somewhere to land, and the hero's
          scroll-away behaviour needs something to scroll against. Solutions,
          Industries, Work, About, Insights and Contact are not built yet. */}
      <section id="beyond-the-hero" className="relative border-t border-border py-24">
        <Container>
          <p className="label-mono">Next</p>
          <p className="mt-5 max-w-2xl text-lead text-muted">
            The homepage sections land here. Nothing beyond the hero has been built yet.
          </p>
        </Container>
      </section>
    </>
  );
}
