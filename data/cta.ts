/**
 * Closing conversion — let's build.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. Headline,
 * description and labels are exactly as supplied. No outcomes, timelines,
 * availability claims or contact details are attached, because none were
 * provided for this section.
 */

export const ctaIntro = {
  index: "07",
  eyebrow: "Let's build",
  title: "Have a complex problem?",
  titleLine: "Let's engineer the answer.",
  description:
    "Tell us what you're trying to build, automate, or transform. We'll help turn the problem into a practical technology roadmap.",
} as const;

export const ctaActions = {
  primary: {
    label: "Start a conversation",
    href: "/contact",
  },
  secondary: {
    label: "Explore capabilities",
    href: "#solutions",
  },
} as const;
