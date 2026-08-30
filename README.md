# AQVION LABS — Website

**CODE • CREATE • INNOVATE**

The official website for AQVION LABS. This repository currently contains the
**foundation and the hero**. Solutions, Industries, Work, About, Insights and
Contact are not built yet.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build + TypeScript check
npm run lint
```

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Motion | Framer Motion |
| Icons | Lucide React |

No UI kit, no component library, no animation library beyond Framer Motion.

---

## Structure

```
app/                    Routes, metadata, icons, robots, sitemap, OG image
components/
  ui/                   Button, MagneticButton, Reveal, SectionHeading,
                        Logo, Glow, GridBackground, HeroEyebrow, HeroActions,
                        SystemStatus, ScrollIndicator
  layout/               Container, Navbar, Footer
  sections/             Hero, IntelligenceField
data/                   site.ts, navigation.ts — content lives here, not in JSX
lib/                    utils.ts (cn), fonts.ts, motion.ts,
                        intelligence-field.ts (hero field geometry)
styles/                 tokens.css, base.css, utilities.css, hero.css
public/brand/           Official mark and its derivatives
brand-reference/        Source material, not shipped to the browser
scripts/                One-off asset generation
```

---

## Design system

Everything visual is defined once, in `styles/tokens.css`, and consumed as both
Tailwind utilities (`bg-surface`, `text-muted`, `text-h2`) and CSS variables
(`var(--color-surface)`).

**Colour.** The palette is *sampled from the official mark* rather than chosen
freehand, so the interface and the logo occupy the same colour space:

| Token | Value | Source in the mark |
|---|---|---|
| `background` | `#04060D` | just above the mark's black field |
| `surface` | `#0A0F1B` | interior of the disc |
| `primary` | `#1552F0` | ring, lower-left |
| `indigo` | `#4B32E8` | ring, right |
| `secondary` | `#8B4FF8` | ring, upper-right |
| `accent` | `#2FB8FF` | the cyan dashes and dots |
| `silver` | `#C9D0DD` | the extruded "A" |

The blue→violet gradient is an **accent**: hairlines, small marks, one or two
words of a heading. It is never a page background.

**Type.** Geist for everything editorial; JetBrains Mono strictly for technical
signal — section numbers, eyebrows, metadata, categories. The display scale is
fluid (`clamp`) with tight leading and negative tracking, so headings stay
architectural from 375px to 1440px.

**Motion.** One easing family, one entrance. Elements rise 24px and settle;
nothing bounces, spins or pulses. `prefers-reduced-motion` is honoured in both
CSS and JavaScript — reveals resolve to their final state rather than being
skipped, and a `<noscript>` rule cancels the hidden state entirely.

---

## Brand assets

`public/brand/aqvion-mark.png` is the **source of truth** and is never modified.
Every other file is a mechanical derivative produced by
`node scripts/gen-brand-assets.mjs`, which only scales the artwork or knocks the
surrounding black field out to transparency:

| File | Purpose |
|---|---|
| `aqvion-mark.png` | 1254px master, exactly as supplied |
| `aqvion-mark-alpha.png` | master with a transparent field |
| `aqvion-mark-{512,256,96}.png` | delivery sizes |
| `app/icon.png`, `app/apple-icon.png` | favicons |

The mark is never redrawn, re-typeset, re-proportioned, distorted, or replaced
with an icon. The `Logo` component renders the supplied image; the "AQVION LABS"
text beside it is typeset company name, not a reconstruction of the logo.

> The generation script uses `sharp`, which is already present as a Next.js
> image-optimisation dependency. It is deliberately not added to
> `package.json` — the script is run by hand when the master artwork changes.

`brand-reference/aqvion-logo-animation.gif` is reference material for the
intended motion language (48 frames, ~2.67s loop). It is **not** used in the
product; its timing is encoded as `--duration-sweep` so the animated logo can be
rebuilt in CSS/Framer Motion over the real asset.

---

## The hero

### Intelligence Field

The signature visual is an **architectural systems diagram**, not a particle
effect. It reads left to right as `DATA → INTELLIGENCE → ACTION`: paths enter
from outside the frame, dock onto alignment rings around the emblem, and leave
again as output.

Geometry is authored in `lib/intelligence-field.ts` in **emblem-radius units**
with the origin at the centre of the mark, so the composition holds its
proportions from 375px to 1440px. Segments run on 0°, 45° and 90° only.
Separate path sets are authored for desktop and for phones — mobile is a lower
density composition, not a scaled-down desktop one.

It renders on **two canvases**:

| Canvas | Contents | Cost |
|---|---|---|
| structure | depth planes, alignment arcs, instrumentation ticks, frame brackets, path strokes, nodes | painted once per layout change, then a pure composited layer |
| flow | pulse heads, comet trails, node activation | **only the rectangles touched last frame are cleared** |

Measured cost: **0.138ms per frame — 0.8% of a 60fps budget.** The field never
repaints as a whole, and the loop is parked entirely when the hero scrolls out
of view or the tab is hidden.

Depth comes from three layers parallaxing at different rates (grid 0.35, canvas
0.75, emblem 1.2 of an 11px maximum), driven by transform writes only. Disabled
for coarse pointers and reduced motion.

### Activation sequence

Runs **once per browser session**, ~2.0s, declared as a readable timeline in
`styles/hero.css`:

```
0.02s  a single point of light on black
0.30s  scan rings expand — technical geometry appears
0.34s  the grid resolves
0.42s  structures, paths and nodes come up
0.68s  the emblem resolves
0.95s  a controlled light sweep crosses the mark
0.95s  headline, then supporting copy, then the calls to action
1.76s  system status and scroll cue settle
```

The scan rings are transform-and-opacity only — deliberately *not* an animated
blur or mask, which would repaint a full-viewport layer every frame.

The sweep uses `mix-blend-mode: overlay`, which brightens light areas and leaves
dark ones alone, so the highlight catches the silver "A" while the interior of
the disc stays dark. (`screen` lifted the whole disc into a visible grey block.)

### Progressive enhancement

The sequence is **opt-in**. A small inline script in `app/layout.tsx` runs before
first paint and sets `data-hero-intro="run"` on `<html>`; `styles/hero.css` only
animates while that attribute is present. So:

- **No JavaScript** — hero renders complete and immediately.
- **Returning visitor** — no attribute, no animation, instant paint.
- **Reduced motion** — the script returns early; the global rule in
  `styles/base.css` zeroes both animation durations *and delays*.
- **sessionStorage unavailable** — the failure is caught and the sequence simply
  plays.

The headline is server-rendered at full opacity in the initial HTML. Nothing
above the fold is ever held at `opacity: 0` waiting for React.

---

## Capability pages

Six routes, one per capability, generated from `data/solutions.ts`:

```
/services            index of all six
/services/ai         AI & Intelligent Systems
/services/automation Intelligent Automation
/services/software   Software Engineering
/services/data       Data & AI Engineering
/services/cloud      Cloud & Infrastructure
/services/products   Digital Products
```

Adding or renaming a capability in `data/solutions.ts` updates the page, the
`/services` index, the homepage Solutions section, the footer column, the
Services mega-menu and the sitemap. There is no second list to keep in step.

### Copy awaiting sign-off

Everything on these pages is supplied AQVION copy **except** the one-line
`summary` under each sub-capability in `data/solutions.ts`. The sub-capability
*names* are the enumerations already present in each capability's supplied
description; the summaries were written to describe what each discipline is.

They attach no client, metric, outcome, timeline or guarantee to anything — but
they are the only words on the site not supplied verbatim, so they should be
read and approved or rewritten.

---

## Interaction patterns

Adapted from a reference site the client supplied, rebuilt in this design system
rather than copied. All four are transform/opacity only, so none of them costs a
repaint.

| Pattern | Where | Notes |
|---|---|---|
| **Reveal card** | Solutions, Industries | `RevealCard` + `styles/cards.css`. Detail expands via `grid-template-rows: 0fr → 1fr` inside a fixed-height card, so a row never reflows. Driven by `:hover` **and** `:focus-within`, so keyboard gets the same reveal. Under `(hover: none)` the detail is simply always open — nothing is hidden behind an interaction a phone cannot perform. |
| **Case-study carousel** | Homepage Work | `CaseStudyCarousel`. Manual advance only — no auto-rotation, which is the most common carousel accessibility failure. Slide region is a polite live region. |
| **Client marquee** | Homepage | `ClientMarquee`. One transform on a doubled track translated `-50%`, so the loop is seamless. Pauses on hover; becomes a static wrapped row under reduced motion. |
| **Network band** | Closing CTA | `NetworkBand`. Deliberately lighter than the hero field: node count capped, DPR capped at 1.5, loop paused off-screen and on hidden tab, one static frame under reduced motion. |

`RevealCard` has two variants, and the distinction matters:

- **`--link`** (Solutions) has a destination, so it holds its detail back until
  hover *or keyboard focus*, then opens.
- **`--static`** (Industries) has none. Nothing can focus it, so nothing is
  hidden: the detail is always open and the wash sits at a low constant level.
  Content behind a hover is only reasonable when there is an interaction to
  perform — otherwise it is information a keyboard user can never reach.

The resting state carries the site's own technical language — a scoped measured
grid, a corner registration tick, and the capability icon inside an alignment
ring echoing the hero emblem — so a card is never a title on an empty plate.

### Tuning the hero field

`PULSE_SPEED_SCALE` in `lib/intelligence-field.ts` is one dial for how lively
the field feels. The per-path `speed` values hold the *relative* rhythm — an
ingest spine runs quicker than a structural bus — and the scale multiplies all
of them, so the composition keeps its balance whichever way you move it.
Currently `1.6`, which puts pulses at roughly 58–116 px/sec on a 1440 viewport.

The drifting nodes in `NetworkBand` (closing CTA) are a separate system with
their own dial, `DRIFT` — peak px/sec per node, currently `11`. The two are
tuned together so the band and the hero read as one site.

`min-height` is set from the **open** measurement, not the resting one: the
tallest revealed card is 374px, so the floor sits at 384px. Reserve less and the
reveal grows the card and shunts the whole grid row. If the copy ever gets
longer, re-measure and raise it.

The homepage uses cards; `/services` keeps the ruled index. That is deliberate —
a homepage is scanned, a services page is read — and it also means the two are no
longer the same content twice.

---

## Sample content — must be replaced before launch

`data/proof.ts` holds the case studies, testimonials and company facts. **All of
it is illustrative placeholder material**, not real AQVION LABS work:

- Every organisation named is a canonical fictional company used industry-wide
  for demo data — Contoso, Northwind, Fabrikam, Litware, Tailwind Traders.
- Every person quoted is fictional.
- Every figure in `companyFacts` is invented.

While `SAMPLE_CONTENT` is `true`, each of those sections renders a visible
notice telling the reader the content is not real. Forgetting to remove it
leaves the notice showing rather than silently publishing invented client work.

**To go live:** replace the arrays with real, permitted material, then set
`SAMPLE_CONTENT` to `false`. Do not set it to `false` while any placeholder
content remains — attributing work to a company you have not worked for, or
publishing a quote nobody gave, is a trademark and advertising problem as well
as a credibility one.

---

## Content rule

Clients, revenue, awards, certifications, partnerships, statistics and case
studies are **never invented**. Anything not yet supplied by the company is
marked `PLACEHOLDER` in `data/site.ts` and rendered as a visible
"awaiting company details" marker, so it cannot ship by accident.

---

## SEO

- Title template, description, keywords, canonical, OpenGraph and Twitter card
  in `app/layout.tsx`
- `app/opengraph-image.tsx` renders the social card from the design tokens
- `app/robots.ts` and `app/sitemap.ts`

The sitemap is generated from `data/navigation.ts` and emits only routes whose
`built` flag is `true`, so it can never advertise a page that 404s. As each page
ships, flip its flag.
