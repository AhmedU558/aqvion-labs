/**
 * Technology — the capability map.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. The five domains
 * and their stacks are exactly as supplied by AQVION LABS. No versions,
 * certifications, partner tiers, team counts or maturity claims are attached to
 * them, because none have been provided.
 *
 * Casing: domain names are stored in title case so they typeset as headings
 * alongside the rest of the site, which is a typographic decision rather than a
 * content one. Stack entries are stored exactly as written — including "LLMs"
 * and "CI/CD" — and are rendered without a case transform, so the data stays
 * faithful to the source.
 */

export type TechnologyDomain = {
  id: string;
  title: string;
  /** Technical markers, rendered as a slash-separated monospace list. */
  stack: string[];
};

/** Copy for the section opener. */
export const technologyIntro = {
  index: "04",
  eyebrow: "Technology",
  title: "The intelligence layer behind modern business.",
  description:
    "We bring together artificial intelligence, software, data, and infrastructure to build systems that learn, automate, and scale.",
} as const;

/**
 * The core of the map. "Intelligence layer" is the section's own headline and
 * sits in the same register as the hero's "AQVION INTELLIGENCE FIELD" — it is
 * descriptive, not a product name.
 */
export const technologyCore = {
  owner: "AQVION",
  detail: "INTELLIGENCE LAYER",
} as const;

/**
 * What the layer runs, in order. Rendered as a single readable chain rather
 * than mapped onto the domains one by one: "Automation" is both a stage here
 * and a domain below, so per-domain stage tags would print the word twice.
 */
export const technologyFlow = [
  "DATA",
  "INTELLIGENCE",
  "SOFTWARE",
  "AUTOMATION",
  "SCALE",
] as const;

export const technologyDomains: TechnologyDomain[] = [
  {
    id: "ai",
    title: "AI & Machine Intelligence",
    stack: ["LLMs", "AGENTS", "RAG", "COMPUTER VISION", "NLP"],
  },
  {
    id: "software",
    title: "Software Engineering",
    stack: ["WEB", "API", "SAAS", "ENTERPRISE", "MICROSERVICES"],
  },
  {
    id: "data",
    title: "Data & ML",
    stack: ["DATA PLATFORMS", "ML PIPELINES", "ANALYTICS", "MLOPS"],
  },
  {
    id: "automation",
    title: "Automation",
    stack: ["WORKFLOWS", "INTEGRATIONS", "RPA", "ORCHESTRATION"],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    stack: ["AWS", "AZURE", "KUBERNETES", "DEVOPS", "CI/CD"],
  },
];
