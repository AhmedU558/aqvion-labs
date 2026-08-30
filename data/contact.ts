/**
 * Contact page copy.
 *
 * CONTENT RULE — as in data/site.ts, nothing here is invented. Headline and
 * description are exactly as supplied. Live email, phone and address are read
 * from siteConfig.contact and are still placeholders until the company
 * supplies them. This form has no delivery channel yet.
 */

export const contactIntro = {
  index: "08",
  eyebrow: "Start a conversation",
  title: "Let's build something intelligent.",
  description:
    "Have a problem worth solving? Tell us what you're building, automating, or transforming.",
} as const;

export const contactFormCopy = {
  name: "Name",
  email: "Email",
  company: "Company",
  message: "Project / message",
  submit: "Send message",
  unavailable:
    "This form is not connected to a delivery channel yet. Nothing was sent.",
  /* Shown above the fields, so nobody composes an enquiry before learning
     it has nowhere to go. */
  notice:
    "This form is not connected yet — submissions are not delivered. Use the direct contact details until it is live.",
} as const;
