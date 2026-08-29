import { cn } from "@/lib/utils";

export type HeroEyebrowProps = {
  /** Rendered before the separator — the owner of the statement. */
  owner: string;
  /** Rendered after it — what the statement is about. */
  detail: string;
  className?: string;
};

/**
 * The hero's technical label. Monospace, wide tracking, low contrast: this is
 * metadata about the page, not a headline in its own right.
 */
export function HeroEyebrow({ owner, detail, className }: HeroEyebrowProps) {
  return (
    <p className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="h-px w-8 shrink-0 bg-[image:var(--gradient-brand)] sm:w-12"
      />
      <span className="label-mono text-[0.625rem] tracking-[0.15em] text-muted-strong sm:text-label sm:tracking-[0.18em]">
        {owner}
        <span aria-hidden className="mx-2 text-faint">
          /
        </span>
        <span className="text-faint">{detail}</span>
      </span>
    </p>
  );
}
