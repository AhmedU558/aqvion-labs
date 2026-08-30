/**
 * How we engineer — the delivery process.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. These are the
 * four stages and their descriptions as supplied by AQVION LABS. No durations,
 * deliverable counts, team sizes, outcomes or guarantees are attached to them,
 * because none have been provided.
 */

export type ProcessStage = {
  /** Two-digit stage number. Rendered as a large technical index. */
  index: string;
  title: string;
  description: string;
};

/** Copy for the section opener. */
export const processIntro = {
  index: "03",
  eyebrow: "How we engineer",
  title: "From complex problems to intelligent systems.",
  description:
    "We combine strategy, engineering, artificial intelligence, and automation into one disciplined process — from the first problem definition to production and continuous improvement.",
} as const;

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "Understand the business problem, users, systems, constraints, and opportunity.",
  },
  {
    index: "02",
    title: "Architect",
    description:
      "Design the technical architecture, AI strategy, data flows, integrations, and product experience.",
  },
  {
    index: "03",
    title: "Engineer",
    description:
      "Build, integrate, test, and deploy production-ready software and intelligent systems.",
  },
  {
    index: "04",
    title: "Evolve",
    description:
      "Measure, optimize, automate, and continuously improve the system as the business grows.",
  },
];
