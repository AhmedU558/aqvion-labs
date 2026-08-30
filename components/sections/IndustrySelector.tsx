"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { GridBackground } from "@/components/ui/GridBackground";
import { Reveal } from "@/components/ui/Reveal";
import { TagLine } from "@/components/ui/TagLine";
import { industries, type Industry } from "@/data/industries";
import { cn } from "@/lib/utils";

/**
 * Editorial industry selector.
 *
 * Desktop is a split composition: the list is the index, the panel is the
 * reading surface. Hover previews; click and keyboard focus commit. Leaving
 * the list returns the panel to the committed industry so the state cannot
 * get stuck on a fly-over.
 *
 * Mobile drops the panel entirely. Each row carries its own description and
 * tags, so the section is a vertical specification list rather than a
 * squeezed two-column diagram.
 */
export function IndustrySelector() {
  const [selected, setSelected] = useState(industries[0].index);
  const [hovered, setHovered] = useState<string | null>(null);

  const activeIndex = hovered ?? selected;
  const active = industries.find((industry) => industry.index === activeIndex) ?? industries[0];

  return (
    <div
      className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-20"
      onMouseLeave={() => setHovered(null)}
    >
      <ol className="border-b border-border lg:col-span-7">
        {industries.map((industry) => {
          const isActive = industry.index === activeIndex;
          const isSelected = industry.index === selected;

          return (
            <Reveal key={industry.index} as="li" className="border-t border-border">
              <IndustryRow
                industry={industry}
                isActive={isActive}
                isSelected={isSelected}
                onPreview={() => setHovered(industry.index)}
                onCommit={() => setSelected(industry.index)}
              />
            </Reveal>
          );
        })}
      </ol>

      <Reveal className="hidden lg:col-span-5 lg:block">
        <IndustryPanel industry={active} />
      </Reveal>
    </div>
  );
}

const colorShift = "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]";

function IndustryRow({
  industry,
  isActive,
  isSelected,
  onPreview,
  onCommit,
}: {
  industry: Industry;
  isActive: boolean;
  isSelected: boolean;
  onPreview: () => void;
  onCommit: () => void;
}) {
  const { index, title, description, tags } = industry;

  return (
    <div className="group relative">
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 -top-px h-px origin-left bg-[image:var(--gradient-brand)]",
          "transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)]",
          isActive ? "scale-x-100" : "scale-x-0",
        )}
      />

      <button
        type="button"
        aria-pressed={isSelected}
        onMouseEnter={onPreview}
        onClick={onCommit}
        className={cn(
          "w-full rounded-none py-8 text-left",
          "focus-visible:outline-offset-4 lg:py-10",
        )}
      >
        <span className="flex items-baseline gap-4 sm:gap-6">
          <span
            className={cn(
              "label-mono shrink-0 font-medium",
              isActive ? "text-primary-bright" : "text-muted-strong",
              colorShift,
            )}
            data-numeric
          >
            {index}
          </span>

          <span
            className={cn(
              "min-w-0 flex-1 text-[1.5rem] leading-[1.15] tracking-[-0.025em] sm:text-[1.75rem] lg:text-[2rem]",
              isActive ? "text-foreground" : "text-muted-strong",
              colorShift,
            )}
          >
            {title}
          </span>

          <ArrowRight
            aria-hidden
            className={cn(
              "size-4 shrink-0 self-center text-faint",
              "transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
              isActive && "translate-x-0.5 text-accent",
            )}
          />
        </span>

        {/* Complete on phones and tablets. The desktop panel takes this over
            so the list can stay a clean index of names. */}
        <span className="mt-4 block lg:hidden">
          <span className="block max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted">
            {description}
          </span>
          <TagLine tags={tags} className="mt-4" />
        </span>
      </button>
    </div>
  );
}

function IndustryPanel({ industry }: { industry: Industry }) {
  const { index, title, description, tags } = industry;

  return (
    <aside
      aria-live="polite"
      className="relative lg:sticky lg:top-[calc(var(--nav-height)+2rem)]"
    >
      <div className="relative overflow-hidden border-t border-border pt-10">
        <GridBackground fade="radial" cell={72} opacity={0.35} />

        <div className="relative">
          <span
            className="block font-mono text-[4.5rem] leading-none text-faint xl:text-[5.5rem]"
            data-numeric
          >
            {index}
          </span>

          <p className="label-mono mt-8 text-muted-strong">{title}</p>

          <p className="mt-5 max-w-[28rem] text-[0.9375rem] leading-relaxed text-muted">
            {description}
          </p>

          <TagLine tags={tags} className="mt-8" />

          <PositionRail active={index} />
        </div>
      </div>
    </aside>
  );
}


/**
 * Five ports on a hairline — the same node language as Process and Technology.
 * The lit port is the only thing that moves when the selection changes.
 */
function PositionRail({ active }: { active: string }) {
  return (
    <ol aria-hidden className="mt-12 flex items-center">
      {industries.map((industry, position) => {
        const isActive = industry.index === active;
        const isLast = position === industries.length - 1;

        return (
          <li key={industry.index} className={cn("flex items-center", !isLast && "flex-1")}>
            <span
              className={cn(
                "flex size-2.5 shrink-0 items-center justify-center rounded-full border bg-background",
                "transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                isActive
                  ? "scale-110 border-accent"
                  : "border-border-strong",
              )}
            >
              <span
                className={cn(
                  "size-1 rounded-full transition-colors duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                  isActive
                    ? "bg-accent shadow-[0_0_8px_var(--color-accent)]"
                    : "bg-faint",
                )}
              />
            </span>
            {!isLast && <span className="mx-2 h-px flex-1 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}
