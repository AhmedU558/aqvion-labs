/**
 * Approach — how AQVION turns complexity into systems.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. Stages and
 * descriptions are the supplied conceptual framework. No durations, team
 * sizes, outcomes or guarantees are attached.
 */

export type ApproachStage = {
  index: string;
  title: string;
  description: string;
};

export const approachIntro = {
  index: "01",
  eyebrow: "Approach",
  title: "Engineering intelligence with purpose.",
  description:
    "We combine strategic thinking, technical depth, and intelligent systems engineering to turn complex challenges into technology that creates lasting value.",
} as const;

export const approachStages: ApproachStage[] = [
  {
    index: "01",
    title: "Understand",
    description:
      "Deeply understand the business, users, systems, constraints, and opportunity before engineering the solution.",
  },
  {
    index: "02",
    title: "Architect",
    description:
      "Translate complexity into a clear technical architecture designed for reliability, intelligence, and scale.",
  },
  {
    index: "03",
    title: "Engineer",
    description:
      "Build the system with disciplined engineering, intelligent automation, and measurable technical quality.",
  },
  {
    index: "04",
    title: "Integrate",
    description:
      "Connect technology into the existing business, workflows, data, and operational environment.",
  },
  {
    index: "05",
    title: "Evolve",
    description:
      "Continuously improve the system as requirements, technology, and the organization evolve.",
  },
];

/** Closing statement — restates the Evolve stage, not a new claim. */
export const approachClose = {
  index: "06",
  eyebrow: "Philosophy",
  title: "Technology that remains useful.",
  description:
    "The last stage is not a finish line. Systems stay inside the business — so they are designed to improve as requirements, technology, and the organization evolve.",
} as const;
