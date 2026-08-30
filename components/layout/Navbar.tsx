"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  prefetchFor,
  primaryCta,
  primaryNav,
  servicesMenu,
  servicesOverview,
  type NavLink,
} from "@/data/navigation";
import { easing, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  /* The bar has only two states, so a threshold beats tracking scroll offset. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* While the panel is open it behaves as a modal surface: the rest of the
     document is made inert so keyboard and screen-reader users cannot reach
     content sitting behind an opaque overlay, and focus is moved into the
     panel. The header stays reachable — it holds the close button. */
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const outside = [document.querySelector("main"), document.querySelector("footer")];
    for (const el of outside) el?.setAttribute("inert", "");

    /* The panel is committed in the same render as this effect, so it can be
       focused directly — no animation frame, which would never fire if the tab
       were backgrounded at the moment the menu opened. */
    document.querySelector<HTMLElement>("#mobile-navigation a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      for (const el of outside) el?.removeAttribute("inert");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <header
        onMouseLeave={() => setServicesOpen(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter]",
          "duration-[var(--duration-base)] ease-[var(--ease-precise)]",
          scrolled || menuOpen || servicesOpen
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
              {primaryNav.map((item) =>
                item.href === servicesOverview.href ? (
                  <li key={item.href} onMouseEnter={() => setServicesOpen(true)}>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((open) => !open)}
                      className={cn(
                        navItemClass,
                        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
                        "focus-visible:outline-offset-4",
                        isActive(item.href) || servicesOpen ? "text-foreground" : "text-muted",
                        "hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "ml-1.5 size-3 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
                          servicesOpen && "rotate-180",
                        )}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3.5 bottom-1 h-px origin-left bg-[image:var(--gradient-brand)]",
                          "transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)]",
                          isActive(item.href) || servicesOpen ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </button>
                  </li>
                ) : (
                  <li key={item.href} onMouseEnter={() => setServicesOpen(false)}>
                    <DesktopNavItem item={item} active={isActive(item.href)} />
                  </li>
                ),
              )}
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
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:bg-surface-elevated lg:hidden"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </Container>

          <div
          id="services-menu"
          inert={!servicesOpen}
          className={cn(
            "absolute inset-x-0 top-full hidden border-b border-border lg:block",
            "bg-background/95 backdrop-blur-xl",
            "transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-precise)]",
            servicesOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <Container>
            <div className="grid grid-cols-3 gap-x-10 gap-y-px py-10">
              {servicesMenu.map((entry) => (
                <Link
                  key={entry.href}
                  href={entry.href}
                  prefetch={prefetchFor(entry.href)}
                  onClick={() => setServicesOpen(false)}
                  className="group/item rounded-md px-3 py-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] hover:bg-surface focus-visible:outline-offset-2"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.9375rem] text-muted-strong transition-colors group-hover/item:text-foreground">
                      {entry.label}
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 shrink-0 translate-y-px text-faint transition-[color,transform] duration-[var(--duration-fast)] group-hover/item:translate-x-0.5 group-hover/item:text-accent"
                    />
                  </span>
                  {entry.description && (
                    <span className="mt-1.5 block max-w-[24rem] text-[0.8125rem] leading-relaxed text-muted">
                      {entry.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border py-5">
              <span className="label-mono">Six capabilities, one engineering practice</span>
              <Link
                href={servicesOverview.href}
                prefetch={prefetchFor(servicesOverview.href)}
                onClick={() => setServicesOpen(false)}
                className="group/all inline-flex items-center gap-2 py-1 text-[0.875rem] text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
              >
                {servicesOverview.label}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover/all:translate-x-0.5"
                />
              </Link>
            </div>
          </Container>
        </div>

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

const navItemClass =
  "group relative inline-flex h-9 items-center rounded-md px-3.5 text-sm";

/**
 * Unbuilt destinations stay in the bar so the IA is visible, but they are not
 * links. Same type, size and colour as an inactive item — no hover hairline,
 * no navigation, not in the tab order.
 */
function DesktopNavItem({ item, active }: { item: NavLink; active: boolean }) {
  const available = item.built !== false;
  const labelClass = cn(
    navItemClass,
    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)]",
    available && "focus-visible:outline-offset-4",
    active ? "text-foreground" : "text-muted",
    available && !active && "hover:text-foreground",
    !available && "cursor-default",
  );

  const hairline = (
    <span
      aria-hidden
      className={cn(
        "absolute inset-x-3.5 bottom-1 h-px origin-left bg-[image:var(--gradient-brand)]",
        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-precise)]",
        active ? "scale-x-100" : available ? "scale-x-0 group-hover:scale-x-100" : "scale-x-0",
      )}
    />
  );

  if (!available) {
    return (
      <span aria-disabled="true" className={labelClass}>
        {item.label}
        {hairline}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      prefetch={prefetchFor(item.href)}
      aria-current={active ? "page" : undefined}
      className={labelClass}
    >
      {item.label}
      {hairline}
    </Link>
  );
}

function MobileNavLabel({
  item,
  index,
  active,
}: {
  item: NavLink;
  index: number;
  active: boolean;
}) {
  return (
    <>
      <span className="label-mono w-6 shrink-0" data-numeric>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className={cn("text-h3", active ? "text-foreground" : "text-muted-strong")}>
        {item.label}
      </span>
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
                    {item.built !== false ? (
                      <Link
                        href={item.href}
                        prefetch={prefetchFor(item.href)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={onNavigate}
                        className="flex items-baseline gap-4 py-5 focus-visible:outline-offset-4"
                      >
                        <MobileNavLabel item={item} index={index} active={isActive(item.href)} />
                      </Link>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="flex cursor-default items-baseline gap-4 py-5"
                      >
                        <MobileNavLabel item={item} index={index} active={false} />
                      </span>
                    )}

                    {/* The capability pages are reachable on phones too — the
                        depth of the site should not be desktop-only. */}
                    {item.href === servicesOverview.href && (
                      <ul className="mb-5 ml-10 flex flex-col border-l border-border pl-5">
                        {servicesMenu.map((entry) => (
                          <li key={entry.href}>
                            <Link
                              href={entry.href}
                              prefetch={prefetchFor(entry.href)}
                              onClick={onNavigate}
                              className="block py-2 text-[0.9375rem] text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground focus-visible:outline-offset-4"
                            >
                              {entry.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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
