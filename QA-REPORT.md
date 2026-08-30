# AQVION LABS — Pre-Launch QA Audit

**Date:** 2026-08-30
**Build:** Next.js 16.3.3 · 15 static routes · production server (dev server not used for any finding)
**Scope:** 7 pages + 404 + robots / sitemap / manifest / OG image / icons
**Widths tested:** 1440 · 1366 · 1280 · 1024 · 768 · 430 · 390 · 375
**Engine:** Chromium only

---

## Resolution status — updated 2026-08-30

All findings addressed except QA-08, which is folded into the site-expansion work.

| ID | Severity | Status | Verified by |
|---|---|---|---|
| QA-01 | High | **Fixed** | 0 clipped tag lists at 1024/1280/1440/375/390 (was 6/4/4/6/4) |
| QA-02 | High | **Fixed** | `inert` blocks focus behind the panel; focus enters panel on open and returns to the toggle on Escape |
| QA-03 | Medium | **Fixed** | `--color-faint` → `#6F7B94`, 4.76:1. Contrast failures 13 → 0 |
| QA-04 | Medium | **Fixed** | No heading-level skip on any of the 7 routes |
| QA-05 | Medium | **Fixed** | Arrow icon and hover affordances removed from Work rows |
| QA-06 | Medium | **Fixed** | Unbuilt routes render as `[SOON]` text, not links |
| QA-07 | Medium | **Fixed** | `public/` 2.5 MB → 360 KB; masters return 404 |
| QA-08 | Medium | *Deferred* | Requires new page content — part of the site-expansion phase |
| QA-09 | Low | **Fixed** | 404 title is now "Page not found — AQVION LABS", `noindex` |
| QA-10 | Low | **Fixed** | `aria-controls` removed; 0 occurrences across all routes |
| QA-11 | Low | **Partly fixed** | Commit-on-focus removed. `aria-pressed` semantics and the mobile no-op highlight accepted as-is |
| QA-12 | Low | **Fixed** | Notice rendered above the form fields |
| QA-13 | Low | **Fixed** | Document overflow at 1024 resolved by QA-01 (scrollWidth now equals clientWidth) |
| QA-14 | Low | **Fixed** | Footer links padded to clear the 24px minimum |

Re-verified after the fixes: `tsc` clean, ESLint clean, production build clean across 15 routes,
no console errors, no heading skips, no clipped content at any tested width.

One pre-existing warning remains (not introduced by these fixes and not previously reported):
Next.js preloads the navbar logo at `w=48` and the browser then selects a different candidate,
producing an "preloaded but not used" console warning. Cosmetic; worth tuning the `sizes`
attribute on the navbar `Logo` at some point.

---

## Verdict

| Severity | Count |
|---|---|
| High | 2 |
| Medium | 6 |
| Low | 6 |
| **Blocking** | **0** |

**Recommendation: ship after fixing QA-01 and QA-02.**

The build is structurally sound — it type-checks, lints and builds clean, produces no console
output or failed requests in production, and holds the project's content rule completely: across
twelve data files there is not one invented client, metric, award, certification or case study.

The two high findings are both user-facing. **QA-01 loses visible text** at 1024px and 375–390px —
the most common laptop and phone widths in the tested set. **QA-02 leaves the mobile menu without
focus containment**, so keyboard and screen-reader users can tab into content hidden behind the
overlay. Both are contained fixes in a small number of files.

---

## Findings

Ordered by severity. Every measurement was taken from the production build.

---

### QA-01 · HIGH · Technology tag lists overflow their column and are cut off at the viewport edge

**Area:** Responsive layout
**Affects:** 1024–1279 desktop, 375–390 mobile
**Files:** `CapabilityIndex.tsx`, `Technology.tsx`, `IndustrySelector.tsx`, `WorkIndex.tsx`

Tag strings are assembled from separate `<span>` separators with no whitespace between them, so
the browser has no line-break opportunity anywhere in the string. Inside a fixed `lg:w-[19%]`
column the string cannot wrap, so it overflows and is clipped — silently, because `body` carries
`overflow-x: hidden`.

```
Solutions / CapabilityIndex — text lost past viewport edge
  1024   6 of 6 rows clip   worst 91px over box   34–42px cut off
  1280   4 of 6 rows clip   worst 42px over box   gutter broken
  1440   4 of 6 rows clip   worst 39px over box   gutter broken

Technology + Industries — mobile
   375   up to 47px of tag text cut off
   390   up to 32px of tag text cut off
   430   clean

e.g. "UX/PRODUCT/ENGINEERING/SCALE"
     box 173px · content 264px · 42px past viewport
```

At 1280 and above the text is not lost but breaks the right gutter by ~30–40px, so the tag column
no longer aligns with the rest of the layout grid.

**Fix:** Give the string break opportunities at the separators — emit whitespace around the
separator span, or add `<wbr>` between tags. One change to a shared pattern resolves all four
components and both breakpoint ranges.

---

### QA-02 · HIGH · Mobile navigation overlay does not contain focus

**Area:** Accessibility
**Criteria:** WCAG 2.4.3, WCAG 2.4.11
**Files:** `Navbar.tsx`

With the menu open the panel exposes 6 focusable elements, but 30 more remain reachable behind it
— the hero calls to action, the scroll cue and the entire footer. `<main>` is neither `inert` nor
`aria-hidden`, focus is never moved into the panel on open, and on close it lands on `<body>`
rather than returning to the toggle.

```
Measured at 390px, menu open
  panel focusables            6
  focusables reachable behind 30   ← Start a Project, Explore Our Work,
                                     scroll cue, all footer links
  main[inert]                 false
  main[aria-hidden]           null
  focus moved into panel      false
  focus restored on close     false  (lands on body)

Working correctly: aria-expanded toggles, body scroll
lock applies and releases, Escape closes.
```

**Fix:** Set `inert` on `<main>` and `<footer>` while the panel is open, move focus to the first
item on open, and return it to the toggle button on close.

---

### QA-03 · MEDIUM · The `--color-faint` token fails AA for normal-size text

**Area:** Accessibility — contrast
**Criteria:** WCAG 1.4.3 (AA)
**Files:** `styles/tokens.css` (30 uses across 14 files)

Every other text token passes comfortably. `--color-faint` does not, and it carries real
information: section eyebrows, the system status readout, the scroll cue, tag lists, footer
contact labels, the copyright line and the `AWAITING COMPANY DETAILS` placeholder markers.

```
Token contrast against --color-background (#04060D)
  foreground        #F2F5FA   18.53:1   pass
  silver            #C9D0DD   13.07:1   pass
  muted-strong      #B4BDCD   10.70:1   pass
  muted             #8B95A9    6.72:1   pass
  faint             #5A6478    3.40:1   FAIL   (needs 4.5:1)
  faint on surface  #0A0F1B    3.22:1   FAIL

13 failing elements on the homepage alone.
```

**Fix:** Lighten the token to `#6F7B94` — 4.79:1 on background and 4.53:1 on surface, same hue
family, one line in `styles/tokens.css`. The current value would only be compliant if every use
were large text, which it is not.

---

### QA-04 · MEDIUM · Heading level skips from h1 to h3 on three inner pages

**Area:** Accessibility — semantics
**Criteria:** WCAG 1.3.1
**Affects:** `/services`, `/work`, `/approach`

The item components hard-code `<h3>`. That is correct on the homepage, where each section supplies
an `<h2>` above them — but on inner pages `SectionHeading` renders as `<h1>` and the h2 level
disappears.

```
Heading level sequence per route
  /            1,2,3,3,3…      ok
  /insights    1,2,3,3,3…      ok
  /company     1,2,2,3,3…      ok
  /contact     1,2,2,2…        ok
  /services    1,3,3,3…        SKIP 1→3
  /work        1,3,3,3…        SKIP 1→3
  /approach    1,3,3,3…        SKIP 1→3
```

`/insights` and `/company` avoid it only because those pages happen to add their own `h2`.

**Fix:** Give the item components a heading-level prop defaulting to `h3`, and pass `h2` from the
inner pages.

---

### QA-05 · MEDIUM · Work rows advertise interactivity they do not have

**Area:** Interaction design
**Files:** `WorkIndex.tsx`

Each of the four project rows carries an arrow icon that slides on hover, a brand gradient
hairline that draws in, and a title that brightens — the full vocabulary of a link. None of them
is a link, none is keyboard-reachable, and the cursor stays `auto`. A visitor who hovers and
clicks gets nothing.

```
4 rows · hover affordances present, no destination
  contains link       false
  inside link         false
  arrow icon          true
  group-hover styling true
  cursor              auto
```

The component comment confirms it is deliberate — there are no individual case-study routes yet.

**Fix:** Until case-study routes exist, drop the arrow and the hover treatment so the rows read as
an index rather than a set of links.

---

### QA-06 · MEDIUM · Five footer links lead to a 404

**Area:** Content / navigation
**Files:** `data/navigation.ts`

`/careers`, `/insights/engineering`, `/privacy`, `/terms` and `/cookies` are all correctly flagged
`built: false` — so they are kept out of the sitemap and are not prefetched — but they still
render as ordinary clickable links in the global footer. The 404 page they land on is well
designed, which softens the failure without removing it. Privacy and Terms in particular are links
visitors deliberately seek out.

**Fix:** Either ship stub pages, or have the footer render unbuilt entries as plain text until
their `built` flag flips — the data to do so is already there.

---

### QA-07 · MEDIUM · 2.1 MB of unused brand masters ship in `public/`

**Area:** Payload
**Files:** `public/brand/`, `data/site.ts`

The two master artwork files are declared in `brandAssets` but referenced by no component. The
interface only ever requests the 512px derivative. Both masters are nonetheless deployed and
publicly reachable.

```
public/ total                    2.5 MB
  aqvion-mark.png        1017 KB   200 OK   unreferenced
  aqvion-mark-alpha.png  1095 KB   200 OK   unreferenced
  aqvion-mark-512.png     262 KB   the only file requested
  aqvion-mark-256.png      80 KB   manifest
  aqvion-mark-96.png       16 KB   manifest
```

**Fix:** Move the masters alongside `brand-reference/`, outside `public/`, and point the
generation script at the new location. It removes 84% of the public asset weight and stops the
masters being crawlable.

---

### QA-08 · MEDIUM · `/services` and `/work` are strict subsets of the homepage

**Area:** SEO
**Affects:** `/services`, `/work`

Both render the same heading, the same description and the same component as their homepage
section, with nothing added. Two URLs therefore carry substantially identical primary content, and
the homepage carries all of it plus five more sections.

```
Main-content text volume
  /            4261 chars   26 headings
  /company     1291 chars   10 headings
  /approach     979 chars    7 headings
  /services     890 chars    7 headings   subset of /
  /insights     879 chars    8 headings
  /work         637 chars    5 headings   subset of /
  /contact      313 chars    2 headings   (form page)
```

**Fix:** Give each inner page material the homepage does not carry. If they are meant to stay as
landing targets for now, that is a reasonable pre-launch position — but it is worth deciding
deliberately rather than discovering it after indexing.

---

### QA-09 · LOW · The 404 page inherits the homepage title

**Area:** SEO
**Files:** `app/not-found.tsx`

Every real route exports its own metadata; `not-found.tsx` does not, so a missing page is titled
"AQVION LABS — AI, Automation & Software Engineering". The page itself is on-brand and offers a
clear route home.

**Fix:** Export `metadata` with a "Page not found" title.

---

### QA-10 · LOW · Menu toggle references an element that does not exist when closed

**Area:** Accessibility
**Affects:** all 7 routes

The hamburger carries `aria-controls="mobile-navigation"`, but the panel is only mounted while
open, so the reference dangles in the default state on every page. Impact on assistive technology
is minimal; validators will flag it.

**Fix:** Render the panel always and toggle its visibility, or drop `aria-controls` and rely on
`aria-expanded` alone.

---

### QA-11 · LOW · Industries selector: three small semantic and mobile issues

**Area:** Interaction / accessibility
**Files:** `IndustrySelector.tsx`

The control works and does expose state — `aria-pressed` updates correctly and the panel is a
polite live region that announces changes. Three refinements remain:

1. `onFocus` commits the selection, so tabbing through the five buttons fires five live-region
   announcements.
2. `aria-pressed` is toggle semantics on a control that is really single-select; a tablist or
   radiogroup would describe it more accurately.
3. Below `lg` the panel is hidden and each row already carries its own description, so tapping a
   row changes only a highlight — a large tap target with no effect.

**Fix:** Commit on click and arrow keys rather than focus; consider tab semantics; and render the
rows as static content rather than buttons below `lg`.

---

### QA-12 · LOW · The contact form only discloses it cannot send after submission

**Area:** Content / UX
**Files:** `ContactForm.tsx`

The form is honest — it validates, then reports "This form is not connected to a delivery channel
yet. Nothing was sent." rather than faking success, which is exactly right. But the button reads
"Send message", so a visitor composes a full enquiry before learning it goes nowhere.

**Fix:** Say so above the form, or hide the form and show the direct contact route until a
delivery channel exists.

---

### QA-13 · LOW · 42px of real horizontal overflow is masked rather than resolved

**Area:** Layout hygiene
**Affects:** 1024

At 1024 the document is 42px wider than the viewport. It is invisible and unscrollable because
`body` sets `overflow-x: hidden`, so there is no user-facing symptom — but that rule is currently
load-bearing, and it will hide the next overflow regression just as effectively.

```
clientWidth 1009 · scrollWidth 1051 · delta 42
  user can scroll horizontally   false
  source  .hero-field__grid  inset:-2%  (clipped)
          span.mx-1.5        12px       (see QA-01)
```

**Fix:** Resolve QA-01, then re-measure — the remaining contributor is decorative and already
clipped by its own container.

---

### QA-14 · LOW · Footer link targets are under 24px tall

**Area:** Accessibility
**Criteria:** WCAG 2.5.8

Footer navigation links measure 18px tall and legal links 15–16px, below the 24px minimum target
size. They most likely pass under the spacing exemption — vertical pitch is about 30px, so the
24px exclusion circles do not overlap — but the margin is thin, and the legal row is the tightest.

**Fix:** Add vertical padding to the footer link rows to clear the minimum outright rather than
relying on the exemption.

---

## Verified working

Areas actively tested that returned no defects. Recorded so the next pass knows what was covered
and what a regression would look like.

| Area | Result |
|---|---|
| Static gate | `tsc --noEmit` clean, ESLint clean, production build clean across 15 static routes |
| Runtime | Zero console output on every route in production. No hydration warnings. No failed network requests |
| Content rule | Twelve data files scanned: no invented clients, metrics, awards, certifications, partnerships or case studies. Placeholders render as visible markers |
| Metadata | Unique title, canonical and description per route. Exactly one `h1` per page. Valid Organization JSON-LD with only real fields |
| Sitemap & robots | 7 real URLs, hash fragments stripped and deduped, unbuilt routes correctly excluded. Manifest serves with correct icons |
| No-JavaScript | Every element hidden for animation carries `data-reveal`, and the `noscript` override cancels the hidden state |
| Reduced motion | Durations, delays and iteration counts all zeroed; reveals forced visible. The hero intro is opt-in behind an attribute, so it never arms |
| Canvas performance | 0.20 ms per frame — 1.2% of a 60fps budget. Only 2 infinite animations on the page, both compositor-only |
| Anchor navigation | All 11 fragment targets exist. Anchors land at exactly the 108px scroll-padding, clearing the 85px fixed navbar |
| Form accessibility | Labelled controls, `aria-invalid`, `aria-describedby`, `role="alert"` errors, focus moved to the first invalid field |
| Document basics | `lang="en"`, zoom permitted, theme-color and color-scheme set. No duplicate IDs, no missing alt, no unnamed controls |
| Responsive | No user-visible horizontal scrolling at any tested width. Layout holds at 768, 430 and 1366 with no findings |

---

## Not covered

Limits of this pass. Each of these needs a human or a different harness before launch — none is a
finding, and none should be read as a pass.

| Area | Why |
|---|---|
| Reduced motion, end to end | No OS-level emulation available. The CSS rules and the JavaScript guards were verified in the shipped build, but the setting was never actually switched on |
| Real keyboard operation | The automation surface does not hold document focus, so `Tab` never moved. Focus order was inspected structurally and the `:focus-visible` rule confirmed in the build; it was not driven by hand |
| Animation at true frame rate | The test browser reported the document as hidden, which correctly parks the field loop, smooth scrolling and the scroll-cue fade. Each was verified by invoking its handler directly, not by watching it run |
| Cross-browser | Chromium only. `mask-composite`, `contain: paint`, `mix-blend-mode: overlay` and the `translate` property all carry Safari and Firefox risk and are unverified there |
| Screen readers | Semantics were audited from the accessibility tree. No NVDA, JAWS or VoiceOver session was run — QA-02 and QA-11 in particular deserve one |
| Real devices & field data | All widths were emulated. No touch device, no throttled network, and no Core Web Vitals measurement — LCP in particular is worth confirming on the first paint of a cold session |

---

## Colophon

Audit performed against the production build served locally. Measurements are reproducible from
the same build; the development server was not used for any finding. Findings are numbered for
tracking and remain stable across revisions of this report. No source files were modified — this
was a read-only audit.
