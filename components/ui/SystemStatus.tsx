import { cn } from "@/lib/utils";

export type SystemStatusProps = {
  label: string;
  state: string;
  className?: string;
};

/**
 * An atmospheric readout, deliberately at the very bottom of the visual
 * hierarchy. It reports the state of the field, and nothing depends on it.
 */
export function SystemStatus({ label, state, className }: SystemStatusProps) {
  return (
    <p className={cn("flex flex-col gap-1.5", className)}>
      <span className="label-mono text-[0.625rem] text-faint">{label}</span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
        />
        <span className="label-mono text-[0.625rem] text-muted">{state}</span>
      </span>
    </p>
  );
}
