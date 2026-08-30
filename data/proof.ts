/**
 * Proof — case studies, testimonials and company facts.
 *
 * ⚠ EVERYTHING IN THIS FILE IS SAMPLE CONTENT. ⚠
 *
 * The CONTENT RULE that governs the rest of the site (see data/site.ts) forbids
 * inventing clients, metrics, outcomes, awards or endorsements. Nothing here is
 * a real AQVION LABS engagement, a real person, or a real number.
 *
 * It exists so the case-study, testimonial and facts systems can be designed,
 * reviewed and signed off before the real material arrives. To make that
 * impossible to miss:
 *
 *   1. `SAMPLE_CONTENT` below is `true`. While it is, every section built from
 *      this file renders a visible notice saying the content is not real.
 *   2. Every organisation named here is one of the canonical fictional
 *      companies used industry-wide for demo data — Contoso, Northwind,
 *      Fabrikam, Litware, Tailwind Traders. None is a real client, and none is
 *      a real company that could be mistaken for one.
 *   3. Every person named here is fictional.
 *
 * TO GO LIVE: replace the arrays with real, permitted material and set
 * `SAMPLE_CONTENT` to `false`. Do not set it to `false` while any of this
 * placeholder content is still present.
 */

/** While true, every section built from this file renders a sample notice. */
export const SAMPLE_CONTENT = true;

export const sampleNotice =
  "Sample content. These case studies, quotes and figures are illustrative placeholders, not real AQVION LABS engagements — they are here so the layout can be reviewed before the real material is added.";

/* ────────────────────────────────────────────────────────────── case studies */

export type CaseStudy = {
  index: string;
  /** Fictional organisation. Replace with a real, permitted client name. */
  client: string;
  sector: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
  /** Which capability this belongs to — links the study to /services/<id>. */
  capability: string;
};

export const caseStudyIntro = {
  index: "06",
  eyebrow: "Selected work",
  title: "Systems built for the real world.",
  description:
    "How complex problems became working technology — the constraint, the design decision, and what changed once it shipped.",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    client: "Contoso Financial",
    sector: "Financial services",
    title: "Loan assessment that explains itself",
    challenge:
      "Assessment sat across three systems and a spreadsheet. Two analysts reviewing the same application could reach different answers, and neither could reconstruct why weeks later.",
    approach:
      "A decision service that reads the applicant record once, applies policy as versioned rules, and records the inputs behind every outcome. A model scores the ambiguous middle; clear accepts and declines never reach a person.",
    outcome:
      "Assessment became reproducible and auditable. Analyst time moved to the cases that genuinely needed judgement.",
    stack: ["DECISION SYSTEMS", "ML", "AUDIT"],
    capability: "ai",
  },
  {
    index: "02",
    client: "Northwind Logistics",
    sector: "Logistics",
    title: "Dispatch that reroutes itself",
    challenge:
      "Route planning ran overnight against the previous day's data. Every disruption after 6am was handled by phone, and the plan drifted further from reality as the day went on.",
    approach:
      "An event-driven planner fed by live vehicle and order state. It replans continuously, and escalates to a controller only when the change crosses a threshold a human should approve.",
    outcome:
      "Planning became continuous instead of nightly. Controllers moved from rebuilding the plan to approving exceptions.",
    stack: ["AUTOMATION", "EVENTS", "OPTIMISATION"],
    capability: "automation",
  },
  {
    index: "03",
    client: "Fabrikam Health",
    sector: "Healthcare",
    title: "One patient record from eleven systems",
    challenge:
      "Clinical, scheduling and billing data lived in eleven systems with no shared identifier. Reporting was assembled by hand each month and rarely agreed with itself.",
    approach:
      "A data platform with explicit identity resolution, modelled once with lineage retained end to end. Metrics defined in one place so every report computes them the same way.",
    outcome:
      "Reporting became a query rather than a monthly assembly job. Two reports of the same measure now agree.",
    stack: ["DATA PLATFORM", "LINEAGE", "ANALYTICS"],
    capability: "data",
  },
  {
    index: "04",
    client: "Litware Retail",
    sector: "Retail & commerce",
    title: "A storefront that survives its own peak",
    challenge:
      "The platform was provisioned for peak all year and still degraded during it. Releases were manual, infrequent, and treated as events.",
    approach:
      "Rebuilt as containerised services with capacity that follows demand, defined as code so any environment can be rebuilt from the repository. Build, test and release became one automated path.",
    outcome:
      "Capacity now tracks demand instead of the annual maximum, and shipping became routine rather than scheduled.",
    stack: ["CLOUD-NATIVE", "KUBERNETES", "DEVOPS"],
    capability: "cloud",
  },
  {
    index: "05",
    client: "Tailwind Traders",
    sector: "Enterprise software",
    title: "A support desk that reads the manual",
    challenge:
      "Support answered the same questions repeatedly from a knowledge base nobody could search, while genuinely novel issues waited behind them in the queue.",
    approach:
      "A retrieval layer over the existing documentation, answering in the agent's console with the source passage attached. Anything it cannot ground in a document it refuses and routes on.",
    outcome:
      "Repeat questions resolved in the first touch, with the source visible. Novel issues stopped queueing behind them.",
    stack: ["RAG", "LLM", "RETRIEVAL"],
    capability: "ai",
  },
];

/* ────────────────────────────────────────────────────────────── testimonials */

export type Testimonial = {
  quote: string;
  /** Fictional person. Replace with a real, attributed and permitted quote. */
  name: string;
  role: string;
  company: string;
};

export const testimonialIntro = {
  index: "07",
  eyebrow: "What clients say",
  title: "Engineering you can hand over.",
} as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "They spent the first fortnight understanding our constraints instead of proposing a rebuild. What they delivered fits the organisation we actually are.",
    name: "Dana Whitfield",
    role: "Chief Technology Officer",
    company: "Contoso Financial",
  },
  {
    quote:
      "The handover was the part that surprised us. Documentation, runbooks, and a team that could operate it without ringing anyone.",
    name: "Marcus Oyelaran",
    role: "Director of Operations",
    company: "Northwind Logistics",
  },
  {
    quote:
      "They were candid about what would not work. That saved us a quarter we would otherwise have spent finding out ourselves.",
    name: "Priya Raghunathan",
    role: "Head of Data",
    company: "Fabrikam Health",
  },
];

/* ─────────────────────────────────────────────────────────── company facts */

export type CompanyFact = {
  value: string;
  label: string;
};

/**
 * Placeholder figures. Every one of these must be replaced with a verified
 * number before `SAMPLE_CONTENT` is set to false — unverifiable statistics are
 * the single easiest way for a site like this to lose credibility.
 */
export const companyFacts: CompanyFact[] = [
  { value: "2026", label: "Founded" },
  { value: "10", label: "Systems delivered" },
  { value: "4", label: "Countries served" },
  { value: "12", label: "Engineers" },
];

/* ────────────────────────────────────────────────────────────── client band */

/**
 * The scrolling client band.
 *
 * Real client logos need both the artwork and written permission to display it,
 * so this carries the same fictional organisations as the case studies above,
 * set as wordmarks. Replace with real marks — as images, in `public/clients/` —
 * once permission is in hand.
 */
export const clientBand = {
  eyebrow: "Working with",
  names: [
    "Contoso Financial",
    "Northwind Logistics",
    "Fabrikam Health",
    "Litware Retail",
    "Tailwind Traders",
    "Adventure Works",
    "Wide World Importers",
  ],
} as const;
