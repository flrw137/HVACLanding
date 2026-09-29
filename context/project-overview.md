# Project Overview

> **Scope of this folder.** Every other file in `/context` documents the **reference implementation**
> (this repository). `progress-tracker.md` is the exception: it is an *operational* tracker that must be
> reset when this folder is copied into a new project.

---

## 1. What this website is

A **multi-page marketing and lead-generation website for Vertex Solutions**, a fictional
commercial & industrial **mechanical HVAC engineering** contractor.

It is a client-side-rendered React single-page application with real URL routing. Every route is
hand-authored JSX. There is no CMS, no backend, no database, no API.

### Business type

> [BRAND-SPECIFIC]
> Commercial / industrial / enterprise mechanical HVAC contractor — **not** residential HVAC.
> Serves facility directors, hospital chief engineers, plant engineers, CFOs and property managers.
> Positioning is *engineering firm*, not *equipment dealer* and not *truck rolls for a $199 tune-up*.

> [HVAC-TEMPLATE]
> The site is deliberately written for **B2B / commercial** audiences. If you are adapting this
> template to a residential HVAC company you must re-tone every piece of copy: replace
> "central plant", "ASHRAE 90.1", "NEBB TAB", "P.E. stamped submittal", "chiller tonnage" with
> "furnace", "SEER rating", "annual tune-up", "same-day install". The *layout* survives; the
> *vocabulary* does not.

### Primary purpose

Move a qualified commercial prospect from a landing page to one of two actions:

1. **Submit a project submittal** via a 10-field specification form (`/contact`).
2. **Call the 24/7 dispatch hotline** — `(800) 555-0194` — surfaced in the utility bar, the navbar
   CTA cluster, the mobile drawer, the footer, and a CTA strip on nearly every page.

### Target audience

Facility operations directors, hospital/healthcare chief engineers, manufacturing plant engineers,
cold-chain logistics directors, commercial property managers, and the CFOs who sign capital
requests. They are technical buyers: they know what a RTU is, they read tonnage figures, and they
distrust contractors who cannot cite a standard.

### Primary conversion goal

> [HVAC-TEMPLATE] **Qualified consultation request** (high-friction, high-value) is the primary goal.
> The phone call is the secondary, faster, higher-urgency path.

### Brand positioning

> [BRAND-SPECIFIC] "Vertex Solutions Mechanical Engineering Corporation" — lic `#HVAC-MECH-48209`,
> PE license `#PE-104928-IN`, HQ Indianapolis IN, tri-state coverage (IN · OH · KY).

The stated differentiator, repeated in five different places, is **"100% self-performed"** —
no subcontracting, no dealer resale, direct licensed P.E. accountability. Supporting proof points:
0.00 EMR, 15.2-year average technician tenure, NEBB-certified TAB, ASME Section IV welds,
guaranteed 2-hour dispatch SLA, 240+ commissioned plants.

---

## 2. What makes this site feel the way it does

This is the single most important section for a rebuilding agent. "Modern and professional" is
useless. Here is the mechanical cause of the look:

1. **A three-family monospace/grotesk/display type system, not one font.**
   Space Grotesk (geometric) for every heading, Inter for every paragraph and button, and —
   critically — **JetBrains Mono for every piece of metadata, label, eyebrow, tab, chip, spec row,
   and unit.** The monospace layer is the dominant signal. It makes the site read like an
   instrument panel or a submittal document rather than a home-services brochure. Roughly a third
   of visible text on any given page is set in JetBrains Mono, uppercase, at 11–12px.

2. **Hairline borders instead of shadows.**
   Cards are `bg-white` + `border border-structural` (`#e2e4e8`). Elevation is expressed as a
   1px line, not a blur. Shadows appear only on hover (`hover:shadow-md/lg/xl`) and on a handful
   of elevated surfaces. This is what produces the "engineering drawing" flatness.

3. **A single saturated crimson used as a scarce resource.**
   `#c8102e` (`primary-container`) appears on: primary buttons, the 6px status dots, active
   underline on the current nav item, active filter buttons' borders, the leader avatar, the hero
   progress bar, icon strokes, and metric highlights. It is *never* used for a large background
   fill or a decorative wash. Scarcity is what makes it read as signal rather than decoration.

4. **Numbered specification labels.**
   `SPEC 01 // WATER-COOLED CENTRIFUGAL CHILLER PLANTS`, `01 // Project Overview`,
   `ERROR 404 // DIAGNOSTIC ROUTE FAULT`, `05 // Execution Sequence`, `DOSSIER #2024-IND-01`.
   Almost every section opens with a monospace, uppercase, letter-spaced, crimson eyebrow prefixed
   by a number. This is the strongest single brand cue and it is used on **every** page.

5. **A dark, image-backed hero with a tab bar, not a static banner.**
   Five stacked full-bleed photographs cross-fading under two gradient scrims, a 1px crimson
   progress bar at the very top, and a bottom rail of 5 numbered tabs. Content is left-aligned in
   a `max-w-3xl` column over the left two-thirds.

6. **Alternating section backgrounds.**
   Sections alternate `bg-white` ↔ `bg-surface-container-lowest` ↔ `bg-surface-container-low` and
   are separated by `border-b border-structural`. There is never a gradient section background and
   never a full-bleed color block except the dark CTA band on the case-study detail page.

7. **Dense, technical copy with real units.**
   "±2.5% Design Flow", "EPA Section 608 Universal · AHRI 550/590", "400 TR N+1",
   "-28.0% KWH CONSUMPTION", "0.02\" WG Cascade Differential Pressure". Specificity is the
   persuasion device. No vague "high quality service" claims anywhere.

8. **Monospace spec tables inside cards.**
   The pattern `label (uppercase secondary) … value (on-surface or primary bold)` separated by
   `justify-between` in a `bg-surface-container-low` inset box recurs ~12 times across the site
   (SLA cards, tier cards, hub cards, service specs, dossier facts).

### Overall visual direction

Editorial × technical. High information density, generous but disciplined whitespace, generous
line-height on body copy (1.6–1.7 ratio), no decorative illustration, no stock photos of smiling
technicians, no gradients as brand devices, no glassmorphism, no rounded-pill buttons.

### Overall UX philosophy

- The site is built to be **scanned, not read**. Numeric metrics, tables, and labelled chips come
  before paragraphs.
- The reader is never more than one scroll from a phone number or a contact form.
- Interaction is minimal and confident: hover border darkening, 1px card lift, cross-fade.
  No parallax, no scroll-jacking, no reveal-on-scroll choreography.
- Friction is intentionally concentrated in exactly one place: the specification form. Everything
  else is a fast read.

---

## 3. Technical architecture at a glance

| Question | Answer |
|---|---|
| Framework | React 19 + React Router 7 (`BrowserRouter`, hash-free, HTML5 history) |
| Build tool | Vite 6 |
| Language | TypeScript 5.7, `strict: true` |
| Styling | Tailwind CSS 3.4 with a fully custom token layer in `tailwind.config.ts` |
| Routing | Client-side, 15 `<Route>` entries nested under a shared `<Layout />` |
| Site type | **Static SPA.** All content is compile-time TypeScript constants |
| Backend | **None.** No server, no API routes, no serverless functions |
| Database | **None** |
| Forms | Client-side only; submission is a `setTimeout` simulation. Nothing is transmitted |
| Environment variables | **None used** |
| Deployment config | **None found** (`vercel.json`, `netlify.toml`, `.github/`, `public/` all absent) |
| Hosted assets | Zero local image files. All 14 photographs are remote Google CDN URLs |
| Fonts | Google Fonts `<link>` in `index.html` — no self-hosting, no `@font-face` |
| Smooth scroll | Lenis, initialised once in `Layout.tsx` |
| Animation library | **None active.** `gsap`, `clsx`, `tailwind-merge` are installed but never imported |

### Implementation constraints that matter when rebuilding

1. **`BrowserRouter` requires SPA fallback rewrites.** Any static host must rewrite unknown paths
   to `index.html` or deep links 404. No `_redirects`/`vercel.json` exists in the repo, so this is
   currently an unhandled deployment risk.
2. **Fixed navbar + hardcoded main offset.** `Layout.tsx` sets `pt-[72px] sm:pt-[104px]` to clear
   a fixed header of `32px` (utility bar, hidden below `sm`) + `72px` (main bar). Changing the
   navbar height without changing this number breaks every page.
3. **Remote images have no intrinsic dimensions.** No `width`/`height` on any `<img>`, no
   `loading="lazy"`. See `performance.md`.
4. **Tailwind `content` is `./src/**/*.{js,ts,jsx,tsx}` + `./index.html`.** Any new file outside
   `src` with utility classes will not be compiled.
5. **`tsconfig.app.json` sets `noUnusedLocals: true`**, and the current source has 26 unused-import
   errors. `npm run build` therefore fails at the `tsc -b` step today. See `progress-tracker.md`.

---

## 4. Brand-specific vs HVAC-template vs reusable

Use these markers throughout all context files:

| Marker | Meaning | Examples in this project |
|---|---|---|
| `> [BRAND-SPECIFIC]` | Belongs to Vertex Solutions. Replace on every new site. | Company name, logo mark, phone numbers, addresses, license numbers, 9 service hubs, 8 case studies, 5 testimonials, named P.E., all 14 images, all metric figures |
| `> [HVAC-TEMPLATE]` | HVAC-industry pattern. Keep the *shape*, replace the *content*. | Emergency dispatch CTA, service-page template (features / equipment / deliverables / FAQs), maintenance tier matrix, service-area hub grid, financing/rebate page, ASHRAE/NEBB/ASME credential language, 2-hour SLA |
| `> [REUSABLE]` | Applies to any local-service or B2B-services marketing site. | Navbar with utility bar + mega dropdown, hero slider with tab bar, container system, type scale, border/shadow discipline, filter chips, accordion, spec-table card, CTA band, breadcrumb strip, footer directory |

### The most reusable ideas (highest value to carry over)

1. **Utility strip + main bar + fixed offset.** Two-tier fixed header; the top strip carries
   licence/coverage + hotline, the main bar carries wordmark + nav + primary CTA.
2. **Mega dropdown built from the same data array as the services index.** No duplicate nav config.
3. **Numbered monospace eyebrow as the universal section opener.** One pattern, every page.
4. **Tab-bar hero slider** where the tab bar is the primary control (no prev/next arrows).
5. **Spec-table inset card** (`label … value` rows on `bg-surface-container-low`).
6. **Interactive checklist with a live "n of 7 confirmed" meter** as a non-form engagement device.
7. **Tiered pricing matrix with a "Most Popular" middle tier** for maintenance agreements.
8. **Sector/state filter chips** on index pages (`useState` string filter, no library).
9. **Alternating white/gray sections separated by hairline bottom borders** instead of spacing alone.
10. **Previous/next pager on detail pages** with wrap-around.

### Non-goals for a rebuild

Do **not** add: a CMS, a database, an API, a form backend, auth, analytics, a cookie banner, a
design-token build step, a component library package, dark mode (the `darkMode: 'class'` setting in
`tailwind.config.ts` is configured, but the only `dark:` variant in the codebase is an unrendered
`Badge` tone), a state-management library, or a scroll-animation library.
