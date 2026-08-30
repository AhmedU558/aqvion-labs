import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/**
 * Metadata for an inner route.
 *
 * The root layout hard-codes homepage openGraph/twitter titles and a
 * canonical of `/`. Without an override, /services, /work and /contact would
 * advertise the homepage to crawlers and social cards.
 */
export function routeMetadata(path: string, title: string, description: string): Metadata {
  const socialTitle = `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
    },
    twitter: {
      title: socialTitle,
      description,
    },
  };
}
