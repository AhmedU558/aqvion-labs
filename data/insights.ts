/**
 * Insights — the editorial index.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. Topics and
 * descriptions are exactly as supplied. There are no articles, authors, dates
 * or read-times because none have been provided. The library is empty on
 * purpose, and it says so.
 */

export type InsightTopic = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export const insightsIntro = {
  index: "02",
  eyebrow: "Insights",
  title: "Ideas for building what comes next.",
  description:
    "Perspectives on artificial intelligence, software engineering, intelligent systems, automation, data, and emerging technology.",
} as const;

export const insightTopics: InsightTopic[] = [
  {
    id: "ai",
    index: "01",
    title: "AI & Intelligence",
    description:
      "Intelligent systems, AI applications, LLMs, agents, and applied machine intelligence.",
  },
  {
    id: "software",
    index: "02",
    title: "Software Engineering",
    description:
      "Architecture, systems engineering, product development, reliability, and technical craft.",
  },
  {
    id: "automation",
    index: "03",
    title: "Automation",
    description:
      "Intelligent workflows, operational systems, orchestration, and process transformation.",
  },
  {
    id: "data",
    index: "04",
    title: "Data",
    description: "Data platforms, analytics, information architecture, and decision systems.",
  },
  {
    id: "emerging",
    index: "05",
    title: "Emerging Technology",
    description: "New technologies, technical opportunities, and ideas shaping future products.",
  },
];

export const insightsLibrary = {
  index: "03",
  eyebrow: "Insights library",
  title: "Articles will appear here when they are published.",
  description:
    "This space is reserved for writing from AQVION LABS. Nothing is listed yet because no articles have been supplied.",
} as const;
