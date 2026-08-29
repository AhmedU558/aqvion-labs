import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "narrow" | "default" | "wide" | "full";

const widths: Record<ContainerWidth, string> = {
  /** Long-form reading measure — roughly 68 characters. */
  narrow: "max-w-3xl",
  /** The standard content field: 1280px inside a 1440px viewport. */
  default: "max-w-[var(--container-max)]",
  /** For full-bleed grids and imagery that need more room. */
  wide: "max-w-[90rem]",
  full: "max-w-none",
};

export type ContainerProps = {
  as?: ElementType;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
};

/**
 * The single horizontal rhythm of the site.
 *
 * Gutters step up with the viewport (20 / 32 / 48px) so mobile is laid out
 * deliberately rather than being a squeezed desktop.
 */
export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", widths[width], className)}>
      {children}
    </Tag>
  );
}
