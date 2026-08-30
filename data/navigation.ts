import { capabilities } from "./solutions";
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
  { label: "Services", href: "/services", built: true },
  { label: "Approach", href: "/approach", built: true },
  { label: "Work", href: "/work", built: true },
  { label: "Insights", href: "/insights", built: true },
  { label: "Company", href: "/company", built: true },
];

/**
 * The Services mega-menu.
 *
 * Built from the capability data so a new capability appears here, on
 * /services, in the footer and in the sitemap from one edit — there is no
 * second list to keep in step.
 */
export const servicesMenu: NavLink[] = capabilities.map((capability) => ({
  label: capability.title,
  href: `/services/${capability.id}`,
  description: capability.description,
  built: true,
}));

export const servicesOverview: NavLink = {
  label: "All capabilities",
  href: "/services",
  built: true,
};

export const primaryCta: NavLink = {
  label: "Start a project",
  href: "/contact",
  built: true,
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
      { label: "AI & Intelligent Systems", href: "/services/ai", built: true },
      { label: "Intelligent Automation", href: "/services/automation", built: true },
      { label: "Software Engineering", href: "/services/software", built: true },
      { label: "Data & AI Engineering", href: "/services/data", built: true },
      { label: "Cloud & Infrastructure", href: "/services/cloud", built: true },
      { label: "Digital Products", href: "/services/products", built: true },
    ],
  },
  {
    index: "02",
    heading: "Company",
    links: [
      { label: "About", href: "/company", built: true },
      { label: "Approach", href: "/approach", built: true },
      { label: "Careers", href: "/careers", built: false },
      { label: "Contact", href: "/contact", built: true },
    ],
  },
  {
    index: "03",
    heading: "Resources",
    links: [
      { label: "Insights", href: "/insights", built: true },
      { label: "Engineering Notes", href: "/insights/engineering", built: false },
      { label: "Work", href: "/work", built: true },
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
  const path = href.split("#")[0];
  return allRoutes.some((route) => route.built && route.href.split("#")[0] === path)
    ? undefined
    : false;
}
