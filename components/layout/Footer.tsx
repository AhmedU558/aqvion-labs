import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Glow } from "@/components/ui/Glow";
import { GridBackground } from "@/components/ui/GridBackground";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { footerNav, legalNav, prefetchFor, socialNav } from "@/data/navigation";
import { isPlaceholder, siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-secondary">
      {/* Atmosphere. Anchored below the fold so it reads as the page settling. */}
      <GridBackground fade="top" opacity={0.35} />
      <Glow
        tone="primary"
        size="xl"
        intensity={0.1}
        className="-bottom-[34rem] left-1/2 -translate-x-1/2"
      />

      <Container className="relative">
        <div className="grid gap-14 pt-20 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-24">
          {/* Identity ------------------------------------------------------ */}
          <div className="lg:col-span-5 lg:pr-10">
            <Reveal y={16}>
              <Logo size="lg" />
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                {siteConfig.positioning}
              </p>
              <p className="label-mono mt-8 text-muted-strong">{siteConfig.tagline}</p>
            </Reveal>
          </div>

          {/* Navigation ---------------------------------------------------- */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((column, columnIndex) => (
              <Reveal key={column.heading} y={16} delay={0.05 * columnIndex}>
                <nav aria-label={column.heading}>
                  <div className="flex items-center gap-2.5">
                    <span className="label-mono text-primary-bright" data-numeric>
                      {column.index}
                    </span>
                    <h2 className="text-[0.8125rem] font-medium tracking-[0.02em] text-foreground">
                      {column.heading}
                    </h2>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          prefetch={prefetchFor(link.href)}
                          className="text-[0.875rem] text-muted transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            ))}
          </div>
        </div>

        <div aria-hidden className="hairline" />

        {/* Contact -------------------------------------------------------- */}
        <div className="grid gap-8 py-10 sm:grid-cols-2">
          <div>
            <h2 className="label-mono">Contact</h2>
            <div className="mt-4 space-y-2 text-sm">
              <ContactValue label="Email" value={siteConfig.contact.email} />
              <ContactValue label="Phone" value={siteConfig.contact.phone} />
              <ContactValue label="Office" value={siteConfig.contact.addressLines[0]} />
            </div>
          </div>

          <div className="sm:justify-self-end">
            <h2 className="label-mono">Elsewhere</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {socialNav.map((profile) => (
                <li key={profile.label}>
                  {isPlaceholder(profile.href) ? (
                    <span className="text-faint" title="Awaiting the official profile URL">
                      {profile.label}
                      <span className="ml-1.5 font-mono text-[0.625rem] tracking-wider text-faint">
                        [TBC]
                      </span>
                    </span>
                  ) : (
                    <a
                      href={profile.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
                    >
                      {profile.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className="hairline" />

        {/* Legal ---------------------------------------------------------- */}
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.75rem] tracking-[0.02em] text-faint">
            &copy; <span data-numeric>{year}</span> {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={prefetchFor(link.href)}
                  className="font-mono text-[0.75rem] tracking-[0.02em] text-faint transition-colors duration-[var(--duration-fast)] hover:text-muted-strong"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

/**
 * Renders a contact detail, or an unmistakable placeholder when the real value
 * has not been supplied yet. Nothing here is ever invented.
 */
function ContactValue({ label, value }: { label: string; value: string }) {
  if (isPlaceholder(value)) {
    return (
      <p className="flex items-baseline gap-3">
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
    <p className="flex items-baseline gap-3">
      <span className="w-14 shrink-0 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
        {label}
      </span>
      <span className="text-muted">{value}</span>
    </p>
  );
}
