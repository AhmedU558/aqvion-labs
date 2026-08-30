import { Brain, Cloud, Code2, Database, Layers, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealCard } from "@/components/ui/RevealCard";
import { capabilities } from "@/data/solutions";

/**
 * The homepage capability grid.
 *
 * Cards here, a ruled index on /services. That is deliberate: the homepage is
 * being scanned by someone deciding whether to keep reading, and a card that
 * opens on approach rewards that scan; /services is being read by someone who
 * already knows what they want, and a dense index serves them better. It also
 * means the two pages are no longer the same content twice.
 *
 * Icons are chosen per capability rather than repeated, so the row reads as six
 * distinct disciplines at a glance.
 */
const icons: Record<string, LucideIcon> = {
  ai: Brain,
  automation: Workflow,
  software: Code2,
  data: Database,
  cloud: Cloud,
  products: Layers,
};

export function CapabilityCards() {
  return (
    <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
      {capabilities.map((capability, position) => (
        <Reveal key={capability.id} as="li" delay={0.05 * (position % 3)} className="flex">
          <RevealCard
            className="w-full"
            index={capability.index}
            title={capability.title}
            description={capability.description}
            tags={capability.tags}
            icon={icons[capability.id]}
            href={`/services/${capability.id}`}
            action="Explore capability"
          />
        </Reveal>
      ))}
    </ul>
  );
}
