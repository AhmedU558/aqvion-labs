import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processIntro, processStages, type ProcessStage } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * How we engineer.
 *
 * An architectural path rather than four cards. The stages sit on a single
 * hairline rail, each marked by a node built from the same parts the hero's
 * Intelligence Field uses for its junctions — a ring with an inner dot that
 * goes cyan when the system is touched. Read left to right the rail states
 * DISCOVER → ARCHITECT → ENGINEER → EVOLVE, in the same register the hero uses
 * for DATA → INTELLIGENCE → ACTION.
 *
 * The final segment fades out instead of terminating, because Evolve has no end
 * — the same reason the hero's emit paths leave the frame rather than stopping.
 *
 * The composition is asymmetric by section: the opener is held to a reading
 * measure on the left while the rail spans the full content width beneath it.
 *
 * Phones get a genuine vertical progression — the rail rotates into the left
 * gutter and the node punches through it — not a squeezed row of four.
 */
export function Process() {
  const lastIndex = processStages.length - 1;

  return (
    <section
      id="process"
      aria-label={processIntro.eyebrow}
      className="section-y relative border-t border-border"
    >
      <Container>
        <SectionHeading
          index={processIntro.index}
          eyebrow={processIntro.eyebrow}
          title={processIntro.title}
          description={processIntro.description}
        />

        {/* An ordered list: the sequence is the content, not just a layout.
            No column gap — each stage pads its own content instead, which lets
            the rail run edge to edge without the grid punching holes in it. */}
        <ol className="mt-16 lg:mt-24 lg:grid lg:grid-cols-4">
          {processStages.map((stage, position) => (
            <Reveal
              key={stage.index}
              as="li"
              delay={position * 0.07}
              className="group lg:pr-8"
            >
              <Stage
                stage={stage}
                isFirst={position === 0}
                isLast={position === lastIndex}
              />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

const easeBase = "duration-[var(--duration-base)] ease-[var(--ease-precise)]";

/** Solid for most of its run, then dissolved — never a hard stop. */
const railFadeRight =
  "bg-[linear-gradient(to_right,var(--color-border)_0%,var(--color-border)_45%,transparent_100%)]";
const railFadeDown =
  "bg-[linear-gradient(to_bottom,var(--color-border)_0%,var(--color-border)_38%,transparent_100%)]";

function Stage({
  stage,
  isFirst,
  isLast,
}: {
  stage: ProcessStage;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { index, title, description } = stage;

  return (
    <div className="flex gap-5 lg:block lg:gap-0">
      {/* Rail gutter — phones and tablets. The line is drawn through the whole
          stage and the node's opaque fill interrupts it, so one element gives
          both the incoming and outgoing run. */}
      <div aria-hidden className="relative w-2.5 shrink-0 lg:hidden">
        <span
          className={cn(
            "absolute bottom-0 left-1/2 w-px -translate-x-1/2",
            /* The first stage starts at its own node's centre; there is nothing
               above it for the rail to arrive from. */
            isFirst ? "top-[1.0625rem]" : "top-0",
            isLast ? railFadeDown : "bg-border",
          )}
        />
        {/* top-3 puts the node's centre on the optical centre of the 2rem
            index beside it. */}
        <StageNode className="absolute top-3 left-1/2 -translate-x-1/2" />
      </div>

      {/* The stage's bottom spacing lives here rather than on the row: a flex
          item only stretches to its container's content box, so padding the row
          would stop the rail short of the next node. */}
      <div className="min-w-0 flex-1 pb-12 lg:pb-0">
        <span
          className={cn(
            "block font-mono text-[2rem] leading-none text-faint lg:text-[2.75rem]",
            "group-hover:text-silver",
            "transition-colors",
            easeBase,
          )}
          data-numeric
        >
          {index}
        </span>

        {/* Rail — desktop. The negative margin lets the segment cross the cell's
            own padding so it arrives flush at the next node instead of stopping
            short. As on phones the line is drawn straight through and the node's
            opaque fill punches the hole, which is what keeps the four segments
            reading as one path. */}
        <div aria-hidden className="relative mt-7 hidden h-2.5 items-center lg:-mr-8 lg:flex">
          <span
            className={cn(
              "absolute inset-x-0 top-1/2 h-px -translate-y-1/2",
              isLast ? railFadeRight : "bg-border",
            )}
          />
          {/* The stage's own run of the path, lit on hover. Transform only. */}
          <span
            className={cn(
              "absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 scale-x-0",
              "bg-[image:var(--gradient-brand)]",
              "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-precise)]",
              "group-hover:scale-x-100",
            )}
          />
          {/* Positioned so it paints over the line rather than under it. */}
          <StageNode className="relative" />
        </div>

        <h3 className="mt-4 text-h3 text-foreground lg:mt-7">{title}</h3>

        {/* Below lg the stages are stacked full width, where an unconstrained
            line would run past a comfortable measure. The grid handles it from
            lg up, so the cap is lifted there. */}
        <p className="mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted lg:max-w-none">
          {description}
        </p>
      </div>
    </div>
  );
}

/**
 * A junction on the path. Deliberately the same construction as the nodes in
 * lib/intelligence-field.ts — an outer ring, an inner dot, cyan on activation —
 * so the process reads as part of the same system as the hero.
 */
function StageNode({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-2.5 shrink-0 items-center justify-center rounded-full",
        "border border-border-strong bg-background",
        "transition-[border-color,transform]",
        "group-hover:scale-110 group-hover:border-accent",
        easeBase,
        className,
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
  );
}
