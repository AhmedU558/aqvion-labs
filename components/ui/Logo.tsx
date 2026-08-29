import Image from "next/image";
import Link from "next/link";
import { brandAssets, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const markSize: Record<LogoSize, number> = { sm: 28, md: 34, lg: 44 };
const wordSize: Record<LogoSize, string> = {
  sm: "text-[0.9375rem]",
  md: "text-[1.0625rem]",
  lg: "text-[1.375rem]",
};

export type LogoProps = {
  size?: LogoSize;
  /** Render the typeset company name beside the mark. */
  withWordmark?: boolean;
  /** Wrap the lockup in a link. Pass `null` for a non-interactive lockup. */
  href?: string | null;
  /** Load eagerly — set on the navbar instance only. */
  priority?: boolean;
  className?: string;
};

/**
 * The AQVION LABS lockup.
 *
 * The mark is always the supplied artwork rendered as an image — it is never
 * reconstructed in CSS or SVG, never re-proportioned, and never substituted
 * with an icon. The wordmark beside it is typeset company name, not a
 * redrawing of the logo, and can be swapped for an official lockup file by
 * pointing `brandAssets` at it.
 */
export function Logo({
  size = "md",
  withWordmark = true,
  href = "/",
  priority = false,
  className,
}: LogoProps) {
  const px = markSize[size];

  const lockup = (
    <span className={cn("group/logo inline-flex items-center gap-2.5", className)}>
      <span
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: px, height: px }}
      >
        {/* Contact glow. Sits behind the mark so the ring reads as lit rather
            than printed, and lifts slightly on hover. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-45 blur-md transition-opacity duration-[var(--duration-base)] ease-[var(--ease-precise)] group-hover/logo:opacity-80"
          style={{ background: "var(--gradient-brand)" }}
        />
        <Image
          src={brandAssets.mark}
          alt={withWordmark ? "" : brandAssets.alt}
          aria-hidden={withWordmark || undefined}
          width={px}
          height={px}
          priority={priority}
          sizes={`${px}px`}
          className="relative h-full w-full select-none"
        />
      </span>

      {withWordmark && (
        <span
          className={cn(
            "font-sans leading-none whitespace-nowrap select-none",
            wordSize[size],
          )}
        >
          <span className="font-semibold tracking-[-0.01em] text-foreground">
            {siteConfig.shortName}
          </span>{" "}
          <span className="font-normal tracking-[0.16em] text-muted">LABS</span>
        </span>
      )}
    </span>
  );

  if (href === null) {
    return lockup;
  }

  return (
    <Link
      href={href}
      aria-label={siteConfig.name}
      className="inline-flex rounded-md focus-visible:outline-offset-4"
    >
      {lockup}
    </Link>
  );
}
