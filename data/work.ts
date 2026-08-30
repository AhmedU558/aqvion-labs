/**
 * Selected work — representative system concepts.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented as a client
 * result. Titles and descriptions are exactly as supplied. These entries are
 * representative AQVION work concepts, not named engagements, and they carry
 * no clients, metrics, awards or outcomes.
 *
 * Tags are nouns taken from each supplied sentence, set in the same monospace
 * register as Solutions. The `field` key only selects a graphic treatment —
 * it is not a claim about the system.
 */

export type WorkField = "operations" | "data" | "product" | "cloud";

export type WorkProject = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  field: WorkField;
};

export const workIntro = {
  index: "06",
  eyebrow: "Selected work",
  title: "Systems built for the real world.",
  description:
    "A selection of products, platforms, and intelligent systems engineered to solve complex problems.",
} as const;

export const workProjects: WorkProject[] = [
  {
    index: "01",
    title: "Intelligent Operations Platform",
    description: "AI-powered workflows, automation, and operational intelligence.",
    tags: ["WORKFLOWS", "AUTOMATION", "INTELLIGENCE"],
    field: "operations",
  },
  {
    index: "02",
    title: "Enterprise Data Platform",
    description: "Connected data infrastructure, analytics, and machine learning systems.",
    tags: ["DATA", "ANALYTICS", "ML"],
    field: "data",
  },
  {
    index: "03",
    title: "AI Product Experience",
    description: "An intelligent digital product combining modern UX, AI, and automation.",
    tags: ["UX", "AI", "AUTOMATION"],
    field: "product",
  },
  {
    index: "04",
    title: "Cloud-Native Business Platform",
    description: "Scalable software infrastructure designed for complex enterprise operations.",
    tags: ["CLOUD", "INFRASTRUCTURE", "ENTERPRISE"],
    field: "cloud",
  },
];
