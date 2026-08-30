import { isPlaceholder } from "@/data/site";

/**
 * A contact detail, or an unmistakable placeholder when the real value has
 * not been supplied. Nothing here is ever invented.
 */
export function ContactValue({ label, value }: { label: string; value: string }) {
  if (isPlaceholder(value)) {
    return (
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
        <span className="w-14 shrink-0 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
          {label}
        </span>
        <span className="rounded-xs border border-dashed border-border-strong px-2 py-0.5 font-mono text-[0.6875rem] tracking-[0.1em] text-faint">
          AWAITING COMPANY DETAILS
        </span>
      </p>
    );
  }

  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
      <span className="w-14 shrink-0 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
        {label}
      </span>
      <span className="text-muted">{value}</span>
    </p>
  );
}
