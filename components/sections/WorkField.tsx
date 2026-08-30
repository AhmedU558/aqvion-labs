import { cn } from "@/lib/utils";
import type { WorkField as WorkFieldId } from "@/data/work";

/**
 * The graphic half of a case-study row.
 *
 * Four restrained architectural diagrams — workflow, layers, core, strata —
 * drawn in the same node language as Process and Technology. They are system
 * sketches, not screenshots, so they cannot be mistaken for a named client.
 *
 * Hover only moves transform and stroke. Reduced motion zeroes those
 * transitions globally in styles/base.css.
 */
export function WorkField({ field }: { field: WorkFieldId }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border border-border bg-background-secondary">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--color-border-strong) 55%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--color-border-strong) 55%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, #000 0%, #000 42%, transparent 78%)",
        }}
      />

      <svg
        viewBox="0 0 400 250"
        className={cn(
          "absolute inset-0 h-full w-full text-faint",
          "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-precise)]",
          "group-hover:translate-x-1",
        )}
        aria-hidden
      >
        {field === "operations" && <OperationsSketch />}
        {field === "data" && <DataSketch />}
        {field === "product" && <ProductSketch />}
        {field === "cloud" && <CloudSketch />}
      </svg>
    </div>
  );
}

const node = {
  fill: "var(--color-background)",
  stroke: "var(--color-faint)",
};

function Port({
  cx,
  cy,
  active = false,
}: {
  cx: number;
  cy: number;
  active?: boolean;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={node.fill}
        stroke={active ? "var(--color-accent)" : node.stroke}
        strokeWidth="1.25"
      />
      <circle
        cx={cx}
        cy={cy}
        r={2}
        fill={active ? "var(--color-accent)" : "var(--color-faint)"}
      />
    </g>
  );
}

/** A path with a branch — operations as a workflow, not a dashboard. */
function OperationsSketch() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M40 125 H160" />
      <path d="M160 125 H240" />
      <path d="M240 125 C280 125 290 70 330 70" />
      <path d="M240 125 C280 125 290 180 330 180" />
      <Port cx={40} cy={125} />
      <Port cx={160} cy={125} />
      <Port cx={240} cy={125} active />
      <Port cx={330} cy={70} />
      <Port cx={330} cy={180} />
    </g>
  );
}

/** Three connected planes — data moving between strata. */
function DataSketch() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="70" y="44" width="260" height="48" />
      <rect x="70" y="101" width="260" height="48" />
      <rect x="70" y="158" width="260" height="48" />
      <path d="M200 92 V101" />
      <path d="M200 149 V158" />
      <Port cx={200} cy={68} />
      <Port cx={200} cy={125} active />
      <Port cx={200} cy={182} />
    </g>
  );
}

/** A core with four satellites — a product, not a constellation. */
function ProductSketch() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="200" cy="125" r="28" />
      <path d="M200 97 V70" />
      <path d="M200 153 V180" />
      <path d="M172 125 H145" />
      <path d="M228 125 H255" />
      <Port cx={200} cy={125} active />
      <Port cx={200} cy={70} />
      <Port cx={200} cy={180} />
      <Port cx={145} cy={125} />
      <Port cx={255} cy={125} />
    </g>
  );
}

/** Horizontal strata — infrastructure as stacked runs, not a cloud icon. */
function CloudSketch() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M50 70 H350" />
      <path d="M80 125 H320" />
      <path d="M110 180 H290" />
      <path d="M140 70 V125" />
      <path d="M260 125 V180" />
      <Port cx={140} cy={70} />
      <Port cx={260} cy={125} active />
      <Port cx={200} cy={180} />
    </g>
  );
}
