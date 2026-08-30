/**
 * Capabilities — the homepage Solutions section, /services, and the six
 * per-capability pages all read from this one file.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. Titles,
 * descriptions and the sub-capability *names* are taken from capability copy
 * supplied by AQVION LABS: each `offers` list is the enumeration already
 * present in that capability's own description.
 *
 * The one-line `summary` under each sub-capability is newly written. It
 * describes what the discipline is, in the same register as the rest of the
 * site — it attaches no client, metric, outcome, timeline or guarantee to
 * anything. Those lines are the only copy here not supplied verbatim, and are
 * marked for sign-off in README.md.
 */

export type SubCapability = {
  name: string;
  summary: string;
};

export type Capability = {
  /** Doubles as the anchor on /services and the /services/<slug> route. */
  id: string;
  /** Two-digit technical index. Metadata about the row, not a list marker. */
  index: string;
  title: string;
  description: string;
  /** Page-level headline for /services/<slug>. */
  lede: string;
  /**
   * Short technical markers. Written exactly as they should appear — the row
   * does not transform their case, so "LLMs" keeps its lowercase plural.
   */
  tags: string[];
  /** The enumeration from `description`, expanded into page sections. */
  offers: SubCapability[];
};

/** Copy for the section opener. */
export const solutionsIntro = {
  index: "02",
  eyebrow: "What we build",
  title: "Intelligence engineered into the enterprise.",
  description:
    "AQVION LABS combines AI, automation, software engineering, data, cloud infrastructure, and product thinking to turn complex problems into scalable technology.",
} as const;

export const capabilities: Capability[] = [
  {
    id: "ai",
    index: "01",
    title: "AI & Intelligent Systems",
    description:
      "AI agents, LLM applications, RAG, computer vision, NLP, intelligent decision systems.",
    lede: "Systems that reason over your own information.",
    tags: ["AGENTS", "LLMs", "RAG", "VISION"],
    offers: [
      {
        name: "AI Agents",
        summary:
          "Software that plans a task, calls the tools it needs and reports what it did — built against your systems rather than a demo environment.",
      },
      {
        name: "LLM Applications",
        summary:
          "Language models applied to a defined job, with the prompts, evaluation and guardrails that make the behaviour repeatable.",
      },
      {
        name: "Retrieval-Augmented Generation",
        summary:
          "Answers grounded in your documents and data, with the retrieval layer, indexing and citation path engineered as part of the system.",
      },
      {
        name: "Computer Vision",
        summary:
          "Extracting structure from images and video — detection, classification and inspection wired into an operational workflow.",
      },
      {
        name: "Natural Language Processing",
        summary:
          "Turning unstructured text into something a system can act on: classification, extraction, summarisation and routing.",
      },
      {
        name: "Intelligent Decision Systems",
        summary:
          "Models and rules combined so a decision can be made consistently, explained afterwards, and adjusted as conditions change.",
      },
    ],
  },
  {
    id: "automation",
    index: "02",
    title: "Intelligent Automation",
    description: "Intelligent workflows, process automation, and integrations.",
    lede: "Work that runs itself, and tells you when it cannot.",
    tags: ["WORKFLOW", "RPA", "INTEGRATION", "AI"],
    offers: [
      {
        name: "Intelligent Workflows",
        summary:
          "Processes that route themselves on the content of the work, escalating to a person at the points where judgement is actually required.",
      },
      {
        name: "Process Automation",
        summary:
          "Mapping a manual process end to end, then rebuilding it as software with the exceptions handled rather than ignored.",
      },
      {
        name: "Robotic Process Automation",
        summary:
          "Automating interaction with systems that have no usable interface, where replacing the system is not on the table.",
      },
      {
        name: "Systems Integration",
        summary:
          "Making separate platforms behave as one — the contracts, queues and reconciliation that keep data consistent between them.",
      },
    ],
  },
  {
    id: "software",
    index: "03",
    title: "Software Engineering",
    description: "Production web applications, APIs, enterprise platforms, SaaS.",
    lede: "Software built to be run, not just delivered.",
    tags: ["WEB", "API", "SAAS", "ENTERPRISE"],
    offers: [
      {
        name: "Web Applications",
        summary:
          "Production applications with the performance, accessibility and browser behaviour treated as requirements rather than polish.",
      },
      {
        name: "APIs & Services",
        summary:
          "Interfaces designed for the systems that will consume them — versioned, documented, and stable enough to build against.",
      },
      {
        name: "Enterprise Platforms",
        summary:
          "Long-lived systems with the access control, audit trail and operational tooling that an organisation needs to own them.",
      },
      {
        name: "SaaS Products",
        summary:
          "Multi-tenant products with the boundaries, billing hooks and release process a subscription business runs on.",
      },
    ],
  },
  {
    id: "data",
    index: "04",
    title: "Data & AI Engineering",
    description: "Data platforms, ML systems, analytics, pipelines, AI infrastructure.",
    lede: "The layer everything intelligent is built on.",
    tags: ["DATA", "ML", "ANALYTICS", "PIPELINES"],
    offers: [
      {
        name: "Data Platforms",
        summary:
          "A single place your data lands, with modelling, lineage and access rules that survive the next team to touch it.",
      },
      {
        name: "Machine Learning Systems",
        summary:
          "Models treated as software — trained, versioned, deployed, monitored, and retrained when the data moves.",
      },
      {
        name: "Analytics",
        summary:
          "Metrics defined once and computed the same way everywhere, so two reports of the same thing agree.",
      },
      {
        name: "Data Pipelines",
        summary:
          "Ingestion and transformation that is observable and recoverable — a failure is visible and re-runnable, not silent.",
      },
      {
        name: "AI Infrastructure",
        summary:
          "The serving, evaluation and cost controls that keep a model useful once it is carrying real traffic.",
      },
    ],
  },
  {
    id: "cloud",
    index: "05",
    title: "Cloud & Infrastructure",
    description: "Cloud-native systems, DevOps, containers, scalable infrastructure.",
    lede: "Infrastructure you can reason about.",
    tags: ["AWS", "AZURE", "KUBERNETES", "DEVOPS"],
    offers: [
      {
        name: "Cloud-Native Systems",
        summary:
          "Architectures designed for the platform they run on, rather than a server-room design moved into a cloud account.",
      },
      {
        name: "DevOps",
        summary:
          "Build, test and release as one automated path, so shipping is routine instead of an event.",
      },
      {
        name: "Containers & Orchestration",
        summary:
          "Workloads packaged and scheduled so environments match and capacity follows demand.",
      },
      {
        name: "Scalable Infrastructure",
        summary:
          "Capacity, failure modes and cost planned together — defined as code so the environment can be rebuilt from it.",
      },
    ],
  },
  {
    id: "products",
    index: "06",
    title: "Digital Products",
    description: "Product strategy, UX, engineering, deployment.",
    lede: "From the problem to something in people's hands.",
    tags: ["UX", "PRODUCT", "ENGINEERING", "SCALE"],
    offers: [
      {
        name: "Product Strategy",
        summary:
          "Deciding what to build and what to leave out — the problem, the audience, and the smallest thing that proves it works.",
      },
      {
        name: "Experience Design",
        summary:
          "Interface and interaction designed against real use, with accessibility and edge cases part of the design rather than a later pass.",
      },
      {
        name: "Product Engineering",
        summary:
          "Building the product to a standard that lets it keep changing after launch instead of hardening into something nobody edits.",
      },
      {
        name: "Deployment & Iteration",
        summary:
          "Getting it live, watching how it is actually used, and shipping the next version on that evidence.",
      },
    ],
  },
];

/** Lookup for the /services/<slug> route. */
export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((capability) => capability.id === slug);
}
