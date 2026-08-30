import { Reveal } from "@/components/ui/Reveal";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { companyFacts } from "@/data/proof";
import { cn } from "@/lib/utils";

/**
 * Company facts.
 *
 * Four figures, set in the monospace register the rest of the site uses for
 * measured values. Every number here is a placeholder — see data/proof.ts.
 * Unverifiable statistics are the fastest way for a site like this to lose the
 * credibility the rest of it is working to build, so these must be replaced
 * with figures the company can stand behind rather than merely edited.
 */
export function FactStrip({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <SampleNotice className="max-w-3xl" />

      <dl className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {companyFacts.map((fact, position) => (
          <Reveal
            key={fact.label}
            delay={0.05 * position}
            className="bg-background px-6 py-8 lg:px-8 lg:py-10"
          >
            <dt className="label-mono">{fact.label}</dt>
            <dd
              className="mt-4 font-mono text-[2rem] leading-none text-foreground lg:text-[2.5rem]"
              data-numeric
            >
              {fact.value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
