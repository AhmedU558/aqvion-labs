import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--duration-fast)] " +
  "ease-[var(--ease-precise)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const variants: Record<ButtonVariant, string> = {
  /* Solid electric blue. One per view — this is the commitment action. */
  primary:
    "bg-primary text-white shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] " +
    "hover:bg-primary-bright hover:shadow-glow",

  /* Bordered. The default for secondary navigation and most calls to action. */
  secondary:
    "border border-border-strong bg-surface/70 text-foreground backdrop-blur-sm " +
    "hover:border-border-glow hover:bg-surface-elevated",

  /* No chrome until hover. */
  ghost: "text-muted hover:bg-surface-elevated hover:text-foreground",

  /* Inline text action with a rule that draws in on hover. */
  link:
    "rounded-none px-0 text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px " +
    "after:origin-left after:scale-x-0 after:bg-[image:var(--gradient-brand)] " +
    "after:transition-transform after:duration-[var(--duration-base)] after:ease-[var(--ease-precise)] " +
    "hover:after:scale-x-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    /** Forwarded to next/link. Pass false for routes that do not exist yet. */
    prefetch?: boolean;
  };

export type ButtonProps = AsButton | AsLink;

/**
 * The one button in the system.
 *
 * Renders a `next/link` when given `href` and a native `button` otherwise, so
 * navigation and actions stay visually identical without duplicating styles.
 * Absolute and `mailto:` destinations fall through to a plain anchor.
 */
export function Button(props: ButtonProps) {
  const { variant = "secondary", size = "md", className, children, ...rest } = props;

  const classes = cn(
    base,
    variants[variant],
    variant === "link" ? "h-auto" : sizes[size],
    className,
  );

  if (typeof rest.href === "string") {
    const { href, prefetch, ...anchorProps } = rest as Omit<AsLink, keyof CommonProps>;

    if (/^[a-z]+:/i.test(href) || href.startsWith("//")) {
      return (
        <a href={href} rel="noreferrer noopener" className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} prefetch={prefetch} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<AsButton, keyof CommonProps>)}>
      {children}
    </button>
  );
}
