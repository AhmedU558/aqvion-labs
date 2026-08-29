import { siteConfig } from "./site";

export type NavLink = {
  label: string;
  href: string;
  /** Short descriptor for expanded navigation and footers. */
  description?: string;
  /** False while the destination route has not been built yet. */
  built?: boolean;
};

/** Primary navigation. Five destinations — an enterprise IA, not a link dump. */
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services", built: false },
  { label: "Work", href: "/work", built: false },
  { label: "Approach", href: "/approach", built: false },
  { label: "Insights", href: "/insights", built: false },
  { label: "Company", href: "/company", built: false },
];

export const primaryCta: NavLink = {
  label: "Start a project",
  href: "/contact",
  built: false,
};

export type FooterColumn = {
  /** Monospace section number rendered above the column heading. */
  index: string;
  heading: string;
  links: NavLink[];
};

export const footerNav: FooterColumn[] = [
  {
    index: "01",
    heading: "Capabilities",
    links: [
      { label: "AI Engineering", href: "/services/ai-engineering", built: false },
      { label: "Intelligent Automation", href: "/services/automation", built: false },
      { label: "Software Engineering", href: "/services/software-engineering", built: false },
      { label: "Data Platforms", href: "/services/data-platforms", built: false },
      { label: "Cloud Infrastructure", href: "/services/cloud-infrastructure", built: false },
      { label: "Digital Products", href: "/services/digital-products", built: false },
    ],
  },
  {
    index: "02",
    heading: "Company",
    links: [
      { label: "About", href: "/company", built: false },
      { label: "Approach", href: "/approach", built: false },
      { label: "Careers", href: "/careers", built: false },
      { label: "Contact", href: "/contact", built: false },
    ],
  },
  {
    index: "03",
    heading: "Resources",
    links: [
      { label: "Insights", href: "/insights", built: false },
      { label: "Engineering Notes", href: "/insights/engineering", built: false },
      { label: "Work", href: "/work", built: false },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy", built: false },
  { label: "Terms", href: "/terms", built: false },
  { label: "Cookies", href: "/cookies", built: false },
];

export const socialNav = siteConfig.social;

/**
 * Next.js prefetches every <Link> that scrolls into view. While a destination
 * route does not exist yet, that prefetch returns 404 and fills the console
 * with errors, so links to unbuilt routes opt out until their page ships.
 *
 * Flipping a route's `built` flag to true re-enables prefetching for it — and
 * adds it to the sitemap — with no other change.
 */
const allRoutes: NavLink[] = [
  primaryCta,
  ...primaryNav,
  ...footerNav.flatMap((column) => column.links),
  ...legalNav,
];

export function prefetchFor(href: string): false | undefined {
  if (href === "/" || href.startsWith("#")) return undefined;
  return allRoutes.find((route) => route.href === href)?.built ? undefined : false;
}
