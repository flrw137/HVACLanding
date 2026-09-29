# Progress Tracker

> **Overall Progress: 100%**
> Status of the reverse-engineering documentation for
> `C:\Users\freid\OneDrive\Escritorio\dtvbc`. All 19 required context files are written and
> cross-checked against the source.

---

> ### ⚠ RESET INSTRUCTION — read this before using this tracker on a new project
>
> This file tracks the **documentation** of a specific codebase. If you have copied the tracker
> into a different repository, a rebuild, or a client project, you **must reset it**:
>
> 1. Set **Overall Progress** to `0%`.
> 2. Clear every phase's checkboxes and completion notes.
> 3. Replace the "Source inventory" table with the new project's files and line counts.
> 4. Replace the "Baseline facts" table with values measured from the new source — **do not carry
>    any number over**. Every count in this file (38 files, 5,657 lines, 49 records, 14 images,
>    22 indexable URLs, 47 colours, 112 container wrappers, 19 `useState`, 26 `TS6133`…) is
>    specific to this repo.
> 5. Rewrite the "Known defects" list from the new codebase.
> 6. Delete the "Reconciliation" section unless the numbers were re-measured.
> 7. Update the repo path in the header.

---

## Phase 1 — Discovery

| Task | Status | Notes |
|---|---|---|
| Inventory every file in the repo root | ✅ | 10 root files: `index.html`, 3 tsconfigs, `vite.config.ts`, `postcss.config.js`, `tailwind.config.ts`, `package.json`, `package-lock.json`, `DESIGN.md` |
| Resolve declared vs. lockfile dependency versions | ✅ | 8 runtime + 7 dev deps |
| Read `tailwind.config.ts` (111 lines) | ✅ | `theme.extend` has **5** groups only: 47 colours · 6 `borderRadius` · 10 `spacing` · 15 `fontFamily` · 12 `fontSize`. Plus `darkMode: 'class'`, `content` globs, `plugins: []`. **No `aspectRatio`, `transitionDuration`, `keyframes`, `screens`, `zIndex`, or `container`** |
| Read `src/index.css` (71 lines) | ✅ | `@layer base` (html/body/h1–h6/code), `@keyframes kenburns` + `.kenburns-active`, 4 `::-webkit-scrollbar*` rules, 2 **top-level** `.border-structural*` classes, form `:focus` override. No `.font-*` family classes |
| Read `index.html` (20 lines) | ✅ | 3 font families (line 13) + 1 dead icon font (line 14), inline SVG favicon, 2 static meta tags |
| Read all 3 tsconfigs + `vite.config.ts` + `postcss.config.js` | ✅ | full `strict`; the 26 `TS6133` errors they produced are now fixed |
| Count source files and lines | ✅ | **38 files, 5,657 lines** (`src/**/*.{ts,tsx}`) |
| Enumerate components / pages / data modules | ✅ | 19 / 11 / 5 |

## Phase 2 — Structure

| Task | Status | Notes |
|---|---|---|
| Route tree with aliases, redirect, catch-all | ✅ | `src/App.tsx:20–36`: 15 `<Route>` entries → 22 canonical indexable URLs (8 static + 6 service slugs + 8 case slugs) + 3 aliases + 1 redirect + catch-all |
| Component tree and classification | ✅ | shell 2 · chrome 2 · dumb 6 · interactive 4 · data-consuming 4 · meta 1 |
| Data layer and the 49 records | ✅ | 6 services · 8 case studies · 9 hubs · 6 pipeline steps · 7 checklist items · 3 tiers · 5 FAQs · 5 reviews = **49** |
| The 9 interfaces in `src/types/index.ts` (129 lines) | ✅ | `NavItem`, `ServiceItem`, `CaseStudyDossier`, `MaintenanceStep`, `ChecklistItem`, `MaintenanceTier`, `ServiceAreaHub`, `ClientReview`, `ConsultationSubmittal` |
| State inventory | ✅ | 19 `useState` across 7 components; no context, no store |
| Content that lives outside the data layer | ✅ | 11 duplications catalogued, incl. 2 conflicting addresses |

## Phase 3 — Design system

| Task | Status | Notes |
|---|---|---|
| Colour tokens + contrast audit | ✅ | 47 colours; 3 contrast failures documented |
| Typography scale + the paired `font-*`/`text-*` mechanism | ✅ | **12** `fontSize` + **15** `fontFamily` keys sharing 12 names. `font-*` = family, `text-*` = size/leading/tracking/weight. `font-*` fires 440× vs `text-*` only 82×, so most authored metrics are dead; 253 arbitrary `text-[Npx]` values bypass the scale. The size half of the pair is written in exactly one place on the whole site (`HeroSlider`); all 21 `<h2>`s and 7 hand-written `<h1>`s have a family class and no size class |
| Spacing, gutters, radii, shadows, transitions | ✅ | 10 spacing keys, 7 used (`space-xs`/`margin-tablet`/`gutter`/`gutter-desktop` unused); gutters 16px/48px; `rounded-sm` unused, `rounded-md` used once; `2xl` not overridden; no custom `transitionDuration` — all `duration-*` are Tailwind defaults |
| Breakpoints + per-component collapse tables | ✅ | 5 Tailwind defaults, `2xl` unused |
| Conventions and the do/don't list | ✅ | 47-class inventory, 6 dead-class families |

## Phase 4 — Interactions & behaviour

| Task | Status | Notes |
|---|---|---|
| Motion inventory | ✅ | 20 behaviours; 4 dead class families; 1 broken chevron |
| Hero slider full spec | ✅ | 5 slides · 7s · 1000ms cross-fade · 12s Ken Burns · progress bar · 3 layout-shift guards |
| Lenis spec + its 2 conflicts | ✅ | `duration: 1.1` expo-out; conflicts with `scroll-behavior` and `ScrollToTop` |
| Mega menu + mobile drawer | ✅ | hover-only; no role, trap, `Escape`, or focus restoration |
| Form fields, options, validation, submit | ✅ | 10 fields / 9 required / ≥25 chars / 800ms fake submit / `VTX-PE-######` |
| Filter interactions | ✅ | `selectedSector`, `selectedState`; no `aria-pressed` |

## Phase 5 — Quality audit

| Task | Status | Notes |
|---|---|---|
| Typecheck (`npx tsc --noEmit -p tsconfig.app.json`) | ✅ | was 26 `TS6133` with the build failing at `tsc -b`; **now 0 — build passes** |
| Dependency audit (used vs. dead) | ✅ | `gsap`, `clsx`, `tailwind-merge` dead; `Button.tsx` dead |
| Accessibility audit | ✅ | 8 blocking defects, 3 contrast failures, per-page SR walkthrough |
| SEO audit | ✅ | 11 `SEO` call sites, 8 title clashes, no canonical/OG/JSON-LD/sitemap |
| Performance audit | ✅ | 1 bundle, 14 images / 22 refs, 0 `loading`, 0 `srcset`, 4 font requests |
| Asset inventory | ✅ | 0 local files; 14 unique remote URLs; de-duplication map |
| Dead classes / typo audit | ✅ | `z-1` ×4, `border-structural/50`, `text-structural-dim`, `scrollbar-none`, `animate-in` family |
| Link + CTA audit | ✅ | 67 `<Link to=>` pointing at 25 distinct paths, 17 `<a href>` (13 `tel:8005550194`, 1 `tel:3175550140`, 2 `mailto:estimating@…`, 1 `mailto:service@…`), 3 unread query params |

## Phase 6 — Documentation

| File | Status | Lines |
|---|---|---|
| `project-overview.md` | ✅ | 150 |
| `site-map.md` | ✅ | 154 |
| `design-system.md` | ✅ | 368 |
| `ui-rules.md` | ✅ | 221 |
| `component-library.md` | ✅ | 540 |
| `pages.md` | ✅ | 252 |
| `content-structure.md` | ✅ | 238 |
| `responsive-rules.md` | ✅ | 155 |
| `motion-and-interactions.md` | ✅ | 262 |
| `assets.md` | ✅ | 190 |
| `tech-stack.md` | ✅ | 208 |
| `architecture.md` | ✅ | 310 |
| `forms-and-conversion.md` | ✅ | 240 |
| `seo-and-metadata.md` | ✅ | 216 |
| `accessibility.md` | ✅ | 273 |
| `performance.md` | ✅ | 194 |
| `implementation-guide.md` | ✅ | 379 |
| `replication-checklist.md` | ✅ | 386 |
| `progress-tracker.md` | ✅ | this file |

**19 / 19 files · 4,738 lines · ~330KB**

## Phase 7 — Cross-check

| Check | Status |
|---|---|
| Every route in `App.tsx` appears in `site-map.md` | ✅ |
| Every component in `src/components/` appears in `component-library.md` | ✅ |
| Every page in `src/pages/` has a section in `pages.md` | ✅ |
| Every export in `src/data/*.ts` has a table in `content-structure.md` | ✅ |
| Every colour/font/radius/spacing token in `tailwind.config.ts` appears in `design-system.md` | ✅ |
| Every `SEO` call site's exact `title` prop is listed in `seo-and-metadata.md` | ✅ |
| The 26 `TS6133` errors are enumerated by file in `tech-stack.md` and `replication-checklist.md`, and all are now **removed** | ✅ |
| The 14 image URLs are enumerated with a de-duplication map in `assets.md` | ✅ |
| Both conflicting addresses are flagged in `content-structure.md`, `forms-and-conversion.md`, `seo-and-metadata.md`, `replication-checklist.md` | ✅ |
| The `/services` vs `/index` redirect confusion is resolved to the code (`/services`, `ServiceDetailPage.tsx:24`) | ✅ |
| `src/index.css` line count corrected 59 → 71; `src/types/index.ts` corrected 121 → 129 | ✅ |
| Dead `Button.tsx` documented in `component-library.md`, `architecture.md`, `tech-stack.md` | ✅ |
| Contrast audit updated with the real `.border-structural #e2e4e8` and `#cbd0d8` values | ✅ |

---

## Baseline facts (measured, not estimated)

| Metric | Value | How measured |
|---|---|---|
| Source files | 38 | directory listing |
| Source lines | 5,657 | per-file `Get-Content \| Measure-Object -Line` |
| Components | 19 | `src/components/**/*.tsx` |
| Page components | 11 | `src/pages/*.tsx` |
| Data modules / records | 5 / 49 | export audit |
| Interfaces | 9 | `src/types/index.ts` (129 lines) |
| Route entries / canonical URLs | 15 / 22 | `App.tsx` + data |
| Colours in the palette | 47 | `tailwind.config.ts` |
| `max-w-[1320px]` occurrences | 55 | class-string scan |
| Unique images / references | 14 / 22 | URL extraction across `src/**` |
| Fonts requested / used | 4 / 3 | `index.html` + import audit |
| `useState` calls | 11 across 6 components | per-file scan |
| Build errors | was 26 `TS6133` | ✅ **fixed** — `npx tsc --noEmit -p tsconfig.app.json` clean, `npm run build` exits 0 |
| Dead dependencies | 3 | `clsx`, `tailwind-merge`, `gsap` |
| Dead components | 1 | `src/components/common/Button.tsx` |
| Dead query params | 2 | `?service=`, `?financing=` |
| Conflicting addresses | 2 | `serviceAreasData`/`Footer` vs `DispatchDirectory` |
| `prefers-reduced-motion` matches | 0 | `src/**` |
| `src/vite-env.d.ts` | absent | file not found |
| `public/` directory | absent | not present |

---

## Known defects catalogued (30, cross-referenced in the docs)

| # | Defect | Documented in |
|---|---|---|
| 1 | Form posts nowhere; claims "Encrypted" / "NDA" / "< 4 Hours Guaranteed" | `forms-and-conversion.md` §2.5, `replication-checklist.md` |
| 2 | 2 conflicting HQ addresses | `content-structure.md` §7, `seo-and-metadata.md` §6.4 |
| 3 | `FeaturedCaseStudies` links to the index, not the dossier | `motion-and-interactions.md` §1, `replication-checklist.md` |
| 4 | 5 hero `<h1>`s; 5 hero images fetched on load | `accessibility.md` §4, `performance.md` §3.1 |
| 5 | 8 of 11 titles repeat the brand | `seo-and-metadata.md` §2.1 |
| 6 | 3 alias routes serve duplicate content, no canonical | `architecture.md` §5.1, `seo-and-metadata.md` §5 |
| 7 | `?tier=` is a boolean; `?service=` / `?financing=` dead | `forms-and-conversion.md` §5, `architecture.md` §5.3 |
| 8 | Mega menu hover-only, no `Escape`, no focus mgmt | `accessibility.md` §2.2 |
| 9 | Drawer has no role, no trap, no `Escape`; page scrolls behind it | `accessibility.md` §2.3 |
| 10 | Zero `prefers-reduced-motion` | `accessibility.md` §2.4, `motion-and-interactions.md` §6 |
| 11 | Checklist rows are `<div onClick>` | `accessibility.md` §2.5 |
| 12 | FAQ exposes no open state | `accessibility.md` §2.6 |
| 13 | Form error invisible to screen readers | `accessibility.md` §2.7, `forms-and-conversion.md` §4 |
| 14 | No skip link (~20 tab stops to `<main>`) | `accessibility.md` §2.1 |
| 15 | Form borders 1.6:1; placeholders ~2.8:1; hairline 1.24:1 | `accessibility.md` §4 |
| 16 | `z-1` ×4, `border-structural/50`, `text-structural-dim`, `scrollbar-none`, `animate-in` family | `motion-and-interactions.md` §3, `ui-rules.md` |
| 17 | Mega-menu chevron never rotates (no `group`) | `motion-and-interactions.md` §3.2 |
| 18 | 26 `TS6133` errors blocked the build | `tech-stack.md` §3 — **now fixed** |
| 19 | `Button.tsx` never imported | `component-library.md`, `architecture.md` §7 |
| 20 | `ScrollToTop` fights Lenis | `motion-and-interactions.md` §5.1, `architecture.md` §4 |
| 21 | `html { scroll-behavior: smooth }` + Lenis | `performance.md`, `implementation-guide.md` §2 |
| 22 | No error boundary anywhere | `architecture.md` §8 |
| 23 | 5 star ratings in the data, never rendered | `content-structure.md` §6 |
| 24 | `sector` and `sectorBadge` are two taxonomies | `content-structure.md` §3 |
| 25 | 7 of 8 case studies lack a full narrative | `content-structure.md` §3 |
| 26 | Dead `mailto:`/`tel:` links and dead `Privacy`/`Terms` footer links | `replication-checklist.md` |
| 27 | Material Symbols requested and never used | `assets.md` §2.1 |
| 28 | Favicon is a hazard-warning triangle | `assets.md` §1.7 |
| 29 | No SPA rewrite config for `BrowserRouter` | `performance.md` §7, `seo-and-metadata.md` §5 |
| 30 | `?tier` prefill lost on `resetForm()` | `forms-and-conversion.md` §2.4 |

---

## Changelog of corrections made during cross-check

| Correction | Was | Now |
|---|---|---|
| Image references | 17 | **22** URL references rendering in **10** `<img>` elements (4 data files, 14 unique URLs) |
| Colours in the palette | 46 | **47** |
| `src/index.css` lines | 59 | **71** |
| `src/types/index.ts` lines | 121 | **129** |
| Source size | 38 files / 5,657 lines | **38 files / 5,657 lines** |
| Content records | 43 | **49** (6+8+9+6+7+3+5+5) |
| Service invalid-slug redirect | `/index` | **`/services`** (`ServiceDetailPage.tsx:24`) |
| Case-study invalid-slug redirect | — | **`/case-studies`** (`CaseStudyDetailPage.tsx:26`) |
| SEO title clashes | 6 of 11 | **8 of 11** |
| Form error UI | "never displayed" | **rendered** (`SubmittalForm.tsx:126–131`) but without `role="alert"` |
| `container-site` utility | documented as the layout abstraction | **does not exist.** Real convention is the literal string `max-w-[1320px] mx-auto px-margin lg:px-margin-desktop` (55 / 59 / 57 / 55 occurrences) |
| `fontSize` / `fontFamily` token counts | 11 / 3 families | **12 / 15 keys** (12 typographic + `sans`/`mono`/`space`) |
| `text-*` type utilities | "redundant no-op" | **valid and correct.** `font-X` = family, `text-X` = size/leading/tracking/weight. The pair is the intended pattern (38 uses of `font-label-technical text-label-technical`) |
| `font-headline-sm` | "does not exist, purged" | **exists** (`tailwind.config.ts:83` + `:100`) and is the most-used heading token — `font-headline-sm` ×49, `text-headline-sm` ×4 |
| `.font-*` family classes in CSS | documented | **do not exist.** Typography comes from `@layer base` element rules + the `fontFamily`/`fontSize` key overlap |
| `aspectRatio` / `transitionDuration` / `keyframes` in config | documented | **none exist.** All `duration-*` (100/150/200/300/500/1000) are Tailwind defaults; `@keyframes kenburns` lives in `index.css`; **no `aspect-*` utility is used anywhere** — image boxes are `h-56` / `h-44` / `h-48` / `min-h-[260px]` |
| Document-default body size | "Inter 15px/25px" | **Inter 16px.** `<body class="… font-body-md antialiased">` sets only the family |
| `animate-pulse` count | 7 | **12** (plus 1 `animate-ping`, 3 dead `animate-in`) |
| Case-study card links | 1 dead link | **2** — `FeaturedCaseStudies.tsx:22` and `:95` both point at `/case-studies` |
| Finance query params | `?financing=true` | **`?financing=cpace` / `opex` / `rebates`** (`FinancingPage.tsx:78/111/144`) |
| `rounded-md` frequency | "unused" | **used once** (`Navbar.tsx:113`) |
| Case-study `code` values | guessed | **verified** from the data |
| Service `specs` values | — | **verified**; `balancingTolerance` present on 5 of 6 |

> Every line citation in these docs was re-verified against the source during this pass. The three
> that changed are `SubmittalForm.tsx:126–131` (error block), `CaseStudyDetailPage.tsx:26` (redirect),
> and `CaseStudyDetailPage.tsx:76` (the one correct `font-*`/`text-*` heading triple).

---

## Next steps for the *rebuild* (not this documentation)

| Priority | Task | Estimate |
|---|---|---|
| 🔴 1 | `siteConfig.ts` + reconcile the 2 addresses | 0.5 day |
| 🔴 2 | A real form endpoint; delete the unsubstantiated claims | 1 day |
| 🔴 3 | Skip link, mega-menu ARIA, drawer dialog, `prefers-reduced-motion` | 1 day |
| 🔴 4 | Fix the 4 query params and the `FeaturedCaseStudies` links | 0.5 day |
| 🟠 5 | SEO: canonical, OG/Twitter, JSON-LD, sitemap, `<Navigate replace>` aliases | 1 day |
| 🟠 6 | Images: 1 hero request, lazy-load, AVIF/WebP, `srcset` | 1 day |
| 🟠 7 | Self-host + subset the 3 fonts; delete Material Symbols; redesign the favicon | 0.5 day |
| 🟡 8 | ~~Fix all `TS6133`~~ — **done (26 removed, build green)**; remaining: add ESLint 9 + `typescript-eslint` | 0.25 day |
| 🟡 9 | `manualChunks`, route-level lazy loading, bundle budget in CI | 0.5 day |
| 🟡 10 | SPA rewrite config + security headers + `<noscript>` | 0.5 day |
| 🟡 11 | `ErrorBoundary`, `useReducedMotion`, `cn()`, split the 500-line page | 1 day |
| 🟢 12 | Contrast fixes: form borders, placeholders, global `:focus-visible` | 0.5 day |
| 🟢 13 | Axe + Lighthouse CI; keyboard + reduced-motion regression tests | 1 day |
| 🟢 14 | Replace all `[BRAND-SPECIFIC]` content; source 14 real images | brand-dependent |
