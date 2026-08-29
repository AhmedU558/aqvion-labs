import type { MetadataRoute } from "next";
import { footerNav, legalNav, primaryCta, primaryNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";

/**
 * The sitemap is generated from the navigation data, not maintained by hand.
 *
 * Routes carry a `built` flag; only routes that actually exist are emitted, so
 * the sitemap can never advertise a 404. As each page ships, flip its flag in
 * data/navigation.ts and it appears here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const candidates = [primaryCta, ...primaryNav, ...footerNav.flatMap((c) => c.links), ...legalNav];

  const built = Array.from(
    new Map(
      candidates.filter((route) => route.built).map((route) => [route.href, route]),
    ).values(),
  );

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...built.map((route) => ({
      url: `${siteConfig.url}${route.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.href.startsWith("/services") ? 0.8 : 0.6,
    })),
  ];
}
