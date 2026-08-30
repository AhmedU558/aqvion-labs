"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { TagLine } from "@/components/ui/TagLine";
import { caseStudies } from "@/data/proof";
import { cn } from "@/lib/utils";

/**
 * The homepage case-study carousel.
 *
 * One study at a time, advanced by hand. It does **not** auto-rotate: content
 * that moves on its own is the single most common accessibility failure in a
 * carousel — it steals reading time from anyone who is slower than the timer,
 * and there is no honest way to pick that timer for everyone.
 *
 * The slide region is a polite live region, so advancing announces the new
 * study rather than silently swapping it underneath a screen reader.
 *
 * /work carries the full set as an open list; this is the homepage teaser.
 */
export function CaseStudyCarousel() {
  const [active, setActive] = useState(0);
  const total = caseStudies.length;
  const study = caseStudies[active];

  const go = (delta: number) => setActive((current) => (current + delta + total) % total);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="mt-14 lg:mt-16"
    >
      <SampleNotice className="mb-10 max-w-3xl" />

      <div className="border-t border-border pt-10 lg:pt-12">
        {/* Live region: advancing announces the new study. */}
        <div aria-live="polite" aria-atomic="true">
          <article
            key={study.index}
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${total}: ${study.title}`}
            className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16"
          >
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-4">
                <span className="label-mono font-medium text-primary-bright" data-numeric>
                  {study.index}
                </span>
                <span className="label-mono">{study.sector}</span>
              </div>

              <h3 className="mt-5 text-h2 text-foreground">{study.title}</h3>

              <p className="mt-4 font-mono text-[0.8125rem] tracking-[0.04em] text-muted">
                {study.client}
              </p>

              <TagLine tags={study.stack} className="mt-6" />
            </div>

            <dl className="mt-10 grid gap-8 lg:col-span-7 lg:mt-0 lg:grid-cols-3 lg:gap-8">
              {[
                { term: "Challenge", detail: study.challenge },
                { term: "Approach", detail: study.approach },
                { term: "Outcome", detail: study.outcome },
              ].map((entry) => (
                <div key={entry.term}>
                  <dt className="label-mono border-t border-border pt-4">{entry.term}</dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {entry.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        {/* Controls -------------------------------------------------------- */}
        <div className="mt-12 flex items-center justify-between gap-6 border-t border-border pt-6">
          <div className="flex items-center gap-3">
            <CarouselButton label="Previous case study" onClick={() => go(-1)}>
              <ChevronLeft aria-hidden className="size-4" />
            </CarouselButton>
            <CarouselButton label="Next case study" onClick={() => go(1)}>
              <ChevronRight aria-hidden className="size-4" />
            </CarouselButton>

            <span className="label-mono ml-2" data-numeric>
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 py-1 text-[0.875rem] text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
          >
            All work
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 text-faint transition-[color,transform] duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </Link>
        </div>

        {/* Position rail. Decorative — the count above carries the same fact. */}
        <div aria-hidden className="mt-5 flex gap-1.5">
          {caseStudies.map((entry, position) => (
            <span
              key={entry.index}
              className={cn(
                "h-px flex-1 transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                position === active ? "bg-[image:var(--gradient-brand)]" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border-strong text-muted transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] hover:border-border-glow hover:bg-surface-elevated hover:text-foreground focus-visible:outline-offset-4"
    >
      {children}
    </button>
  );
}
