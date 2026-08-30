/**
 * Where we create impact — industry areas.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. Titles and
 * descriptions are exactly as supplied by AQVION LABS. No clients, case
 * studies, partnerships, certifications, statistics or outcomes are attached
 * to them, because none have been provided.
 *
 * Tags are not new claims. Each one is a noun taken from that industry's own
 * supplied sentence, set in the same monospace register the Solutions rows use.
 */

export type Industry = {
  /** Two-digit technical index. */
  index: string;
  title: string;
  description: string;
  /** Nouns lifted from `description`. Rendered without a case transform. */
  tags: string[];
};

export const industriesIntro = {
  index: "05",
  eyebrow: "Where we create impact",
  title: "Technology that moves the business forward.",
  description:
    "We build intelligent systems for organizations where technology is critical to growth, efficiency, and competitive advantage.",
} as const;

export const industries: Industry[] = [
  {
    index: "01",
    title: "Financial Services",
    description:
      "Intelligent platforms, automation, analytics, and AI systems for complex financial operations.",
    tags: ["PLATFORMS", "AUTOMATION", "ANALYTICS", "AI"],
  },
  {
    index: "02",
    title: "Healthcare",
    description:
      "Digital systems, intelligent workflows, data platforms, and AI-enabled experiences.",
    tags: ["DIGITAL", "WORKFLOWS", "DATA", "AI"],
  },
  {
    index: "03",
    title: "Retail & Commerce",
    description:
      "Personalization, automation, commerce platforms, analytics, and intelligent customer experiences.",
    tags: ["PERSONALIZATION", "AUTOMATION", "COMMERCE", "ANALYTICS"],
  },
  {
    index: "04",
    title: "Logistics & Operations",
    description:
      "Optimization, workflow automation, predictive systems, and connected operations.",
    tags: ["OPTIMIZATION", "AUTOMATION", "PREDICTIVE", "OPERATIONS"],
  },
  {
    index: "05",
    title: "Emerging Technology",
    description:
      "AI-first products, intelligent applications, and new technology ventures.",
    tags: ["AI-FIRST", "APPLICATIONS", "VENTURES"],
  },
];
