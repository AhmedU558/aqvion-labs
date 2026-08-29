"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { prefetchFor, primaryCta, primaryNav } from "@/data/navigation";
import { easing, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* The bar has only two states, so a threshold beats tracking scroll offset. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter]",
          "duration-[var(--duration-base)] ease-[var(--ease-precise)]",
          scrolled || menuOpen
            ? "border-b border-border bg-background/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <nav
            aria-label="Primary"
            className="flex h-[var(--nav-height)] items-center justify-between gap-6"
          >
            <Logo priority />

            {/* Desktop navigation -------------------------------------------- */}
            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={prefetchFor(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex h-9 items-center rounded-md px-3.5 text-sm",
                      "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
                      isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {/* Hairline that draws in from the left on hover. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 bottom-1 h-px origin-left bg-[image:var(--gradient-brand)]",
                        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions -------------------------------------------------------- */}
            <div className="flex items-center gap-2">
              <MagneticButton className="hidden lg:inline-flex">
                <Button
                href={primaryCta.href}
                prefetch={prefetchFor(primaryCta.href)}
                size="sm"
                variant="secondary"
                className="group"
              >
                  {primaryCta.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-muted transition-[transform,color] duration-[var(--duration-fast)] ease-[var(--ease-precise)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Button>
              </MagneticButton>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:bg-surface-elevated lg:hidden"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </Container>

        {/* Bottom hairline — only present once the bar has a background. */}
        <div
          aria-hidden
          className={cn(
            "hairline absolute inset-x-0 bottom-0 transition-opacity duration-[var(--duration-base)]",
            scrolled || menuOpen ? "opacity-40" : "opacity-0",
          )}
        />
      </header>

      {/* Deliberately a sibling of the header rather than a child: the header
          carries a backdrop-filter, which makes it the containing block for
          fixed-position descendants and would collapse this panel to nothing. */}
      <MobileMenu
        open={menuOpen}
        reduceMotion={Boolean(reduceMotion)}
        isActive={isActive}
        onNavigate={() => setMenuOpen(false)}
      />
    </>
  );
}

/**
 * Full-height mobile panel.
 *
 * Laid out for the thumb rather than scaled down from desktop: large tap
 * targets, generous type, section numbering, and the primary action pinned to
 * the bottom of the sheet.
 *
 * The panel closes from its own links rather than by watching the pathname, so
 * navigation drives the state directly instead of through an effect.
 */
function MobileMenu({
  open,
  reduceMotion,
  isActive,
  onNavigate,
}: {
  open: boolean;
  reduceMotion: boolean;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-navigation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={transition.precise}
          className="fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-40 overflow-y-auto border-t border-border bg-background/96 backdrop-blur-2xl lg:hidden"
        >
          <Container className="flex min-h-full flex-col justify-between py-10">
            <nav aria-label="Primary, mobile">
              <ul className="flex flex-col">
                {primaryNav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.04 * index, ease: easing.flow }}
                    className="border-b border-border"
                  >
                    <Link
                      href={item.href}
                      prefetch={prefetchFor(item.href)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={onNavigate}
                      className="flex items-baseline gap-4 py-5"
                    >
                      <span className="label-mono w-6 shrink-0" data-numeric>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-h3",
                          isActive(item.href) ? "text-foreground" : "text-muted-strong",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-12">
              <Button
                href={primaryCta.href}
                prefetch={prefetchFor(primaryCta.href)}
                variant="primary"
                size="lg"
                onClick={onNavigate}
                className="w-full"
              >
                {primaryCta.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
              <p className="label-mono mt-6 text-center">CODE &bull; CREATE &bull; INNOVATE</p>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
