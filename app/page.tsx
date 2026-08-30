import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";
import { Technology } from "@/components/sections/Technology";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Cta } from "@/components/sections/Cta";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* The hero's scroll cue targets #beyond-the-hero. Keeping the anchor here
          lands it on Solutions without editing the approved hero; once the cue
          is retargeted to #solutions this line goes away.

          Approach, Insights, Company and legal pages are not built yet. */}
      <div id="beyond-the-hero" />

      <Solutions />
      <Process />
      <Technology />
      <Industries />
      <ClientMarquee />
      <Work />
      <Testimonials />
      <Cta />
    </>
  );
}
