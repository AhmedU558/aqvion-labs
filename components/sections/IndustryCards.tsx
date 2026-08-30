import { Atom, HeartPulse, Landmark, ShoppingBag, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealCard } from "@/components/ui/RevealCard";
import { industries } from "@/data/industries";

/**
 * Industry grid.
 *
 * These cards carry no destination — there are no per-industry pages, and a
 * card that looks clickable but goes nowhere is worse than one that does not
 * pretend. They reveal their detail on approach and stop there.
 */
const icons: Record<string, LucideIcon> = {
  "01": Landmark,
  "02": HeartPulse,
  "03": ShoppingBag,
  "04": Truck,
  "05": Atom,
};

export function IndustryCards() {
  return (
    <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
      {industries.map((industry, position) => (
        <Reveal key={industry.index} as="li" delay={0.05 * (position % 3)} className="flex">
          <RevealCard
            className="w-full"
            index={industry.index}
            title={industry.title}
            description={industry.description}
            tags={industry.tags}
            icon={icons[industry.index]}
          />
        </Reveal>
      ))}
    </ul>
  );
}
