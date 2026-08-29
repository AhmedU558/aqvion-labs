import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * Crawler policy.
 *
 * The site is fully indexable. Next.js internals and API routes are excluded
 * so crawl budget goes to real pages. Individual routes can opt out via their
 * own `robots` metadata rather than being listed here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
