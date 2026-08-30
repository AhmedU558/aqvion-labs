/**
 * Company — who AQVION LABS is.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. Headlines,
 * beliefs and principles are as supplied. What we do reuses capability copy
 * already on the site. No founding year, headcount, offices, revenue, clients,
 * investors, certifications, awards or partnerships are attached.
 */

export const companyIntro = {
  index: "03",
  eyebrow: "Company",
  title: "We build the systems behind ambitious ideas.",
  description:
    "AQVION LABS is a technology engineering company focused on artificial intelligence, software systems, automation, data, and emerging technology.",
} as const;

export const companyBeliefs = {
  index: "01",
  eyebrow: "What we believe",
  items: [
    { index: "01", title: "Technology should solve real problems." },
    { index: "02", title: "Intelligence should create leverage." },
    { index: "03", title: "Engineering should create reliability." },
    { index: "04", title: "Systems should be built to evolve." },
  ],
} as const;

export type CompanyPractice = {
  index: string;
  title: string;
  description: string;
  href: string;
};

/**
 * Titles from the company brief. Descriptions are the matching capability
 * copy already published on /services — not new claims.
 */
export const companyPractices: CompanyPractice[] = [
  {
    index: "01",
    title: "AI & Intelligent Systems",
    description:
      "AI agents, LLM applications, RAG, computer vision, NLP, intelligent decision systems.",
    href: "/services#ai",
  },
  {
    index: "02",
    title: "Software Engineering",
    description: "Production web applications, APIs, enterprise platforms, SaaS.",
    href: "/services#software",
  },
  {
    index: "03",
    title: "Automation & Operations",
    description: "Intelligent workflows, process automation, and integrations.",
    href: "/services#automation",
  },
  {
    index: "04",
    title: "Data & Analytics",
    description: "Data platforms, ML systems, analytics, pipelines, AI infrastructure.",
    href: "/services#data",
  },
  {
    index: "05",
    title: "Emerging Technology",
    description:
      "AI-first products, intelligent applications, and new technology ventures.",
    href: "/insights#emerging",
  },
];

export const companyThinking = {
  index: "03",
  eyebrow: "How we think",
  items: [
    { index: "01", title: "Build with clarity." },
    { index: "02", title: "Engineer with discipline." },
    { index: "03", title: "Design for change." },
    { index: "04", title: "Keep complexity useful." },
  ],
} as const;
