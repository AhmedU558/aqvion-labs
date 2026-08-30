import { TriangleAlert } from "lucide-react";
import { SAMPLE_CONTENT, sampleNotice } from "@/data/proof";
import { cn } from "@/lib/utils";

/**
 * Marks a section whose content is illustrative rather than real.
 *
 * Renders nothing once `SAMPLE_CONTENT` is false, so removing every notice is
 * a one-line change in data/proof.ts — and, just as importantly, forgetting to
 * make that change leaves the notices visible rather than silently shipping
 * invented client work as if it were genuine.
 */
export function SampleNotice({ className }: { className?: string }) {
  if (!SAMPLE_CONTENT) return null;

  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-xs border border-dashed border-border-strong",
        "bg-surface/60 px-4 py-3",
        className,
      )}
    >
      <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-muted" />
      <span className="text-[0.8125rem] leading-relaxed text-muted">
        <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-strong uppercase">
          Sample content
        </span>
        <span className="mt-1 block">{sampleNotice.replace("Sample content. ", "")}</span>
      </span>
    </p>
  );
}
