# Architecture

> A **flat, one-level component tree with a single layout shell.** There is no context, no
> provider, no store, no HOC, no render-prop, no route loader, no error boundary, no Suspense
> boundary, and no code splitting. 38 files, 5,657 lines. The whole architecture fits on one page.

---

## 1. File tree (complete)

```
dtvbc/
├── index.html                        20 L   fonts, favicon data-URI, #root
├── package.json                      30 L   3 scripts, 8 deps, 7 devDeps
├── package-lock.json                        resolved versions
├── postcss.config.js                  6 L   tailwindcss + autoprefixer
├── tailwind.config.ts                      111 L  ⭐ authoritative tokens: 47 colours, 3 font
                                                 families (15 keys), 12 fontSize keys, 10 spacing
                                                 keys, 6 borderRadius keys. NO aspectRatio, NO
                                                 transitionDuration, NO custom keyframes,
                                                 NO zIndex, NO screens, NO container class.
├── tsconfig.json                     10 L   solution file, 0 options
├── tsconfig.app.json                42 L   strict app project
├── tsconfig.node.json               20 L   strict vite.config project
├── vite.config.ts                    12 L   @vitejs/plugin-react + @ alias
├── DESIGN.md                                legacy brief — LOSES conflicts to code
└── src/
    ├── main.tsx                       9 L   createRoot + StrictMode
    ├── App.tsx                       42 L   ⭐ BrowserRouter + all 15 routes
    ├── index.css                     71 L   ⭐ base type, keyframes, raw border classes, focus rule
    ├── types/
    │   └── index.ts                 129 L   ⭐ 9 interfaces, the whole data contract    ├── data/
    │   ├── servicesData.ts          295 L   ⭐ SERVICES (6)
    │   ├── caseStudiesData.ts       291 L   ⭐ CASE_STUDIES (8)
    │   ├── serviceAreasData.ts      143 L   ⭐ SERVICE_HUBS (9)
    │   ├── maintenanceData.ts       176 L   ⭐ 4 exports (6/7/3/5)
    │   └── reviewsData.ts            58 L   ⭐ REVIEWS (5)
    ├── components/
    │   ├── common/
    │   │   ├── SEO.tsx              17 L   ⭐ document.title + description side effect
    │   │   ├── ScrollToTop.tsx      13 L   window.scrollTo on pathname change
    │   │   ├── SectionHeader.tsx    57 L   eyebrow + h2 + optional lead, h2 not h1
    │   │   ├── Badge.tsx            43 L   4 `variant` values
    │   │   └── Button.tsx           64 L   ⚠ DEAD — 0 imports anywhere
    │   ├── layout/
    │   │   ├── Layout.tsx           47 L   ⭐ the shell: Lenis + Navbar + main + Footer
    │   │   ├── Navbar.tsx          228 L   ⭐ 7 links + mega dropdown + mobile drawer
    │   │   └── Footer.tsx          202 L   4-col directory + bottom bar
    │   ├── home/
    │   │   ├── HeroSlider.tsx      168 L   ⭐ 5 slides, 7s autoplay, Ken Burns
    │   │   ├── MetricsRibbon.tsx    54 L   4 metrics
    │   │   ├── CapabilitiesGrid.tsx 101 L  4 capability tiles
    │   │   ├── QualityArchitecture.tsx 135 L  P.E. block + 7 standards
    │   │   ├── FeaturedCaseStudies.tsx 131 L  3 case cards
    │   │   └── PartnerGrid.tsx      46 L   6 OEM names, text only
    │   ├── maintenance/
    │   │   ├── PipelineSection.tsx  52 L   6 steps
    │   │   ├── ChecklistSection.tsx 94 L   7 interactive rows
    │   │   └── TierMatrixSection.tsx 135 L 3 tiers + 5 FAQ accordion
    │   └── contact/
    │       ├── SubmittalForm.tsx   397 L   ⭐ the only real "logic" in the app
    │       └── DispatchDirectory.tsx 128 L  9 hubs + phones
    └── pages/
        ├── HomePage.tsx              24 L   pure composition, no logic
        ├── ServicesPage.tsx         154 L
        ├── ServiceDetailPage.tsx    237 L   useParams + fallback Navigate
        ├── MaintenancePage.tsx      151 L
        ├── CaseStudiesPage.tsx      348 L   sector filter
        ├── CaseStudyDetailPage.tsx  500 L   ⭐ largest file; useParams + 4 optional fields
        ├── ServiceAreasPage.tsx     175 L   state filter
        ├── AboutPage.tsx            224 L
        ├── FinancingPage.tsx        201 L
        ├── ContactPage.tsx           83 L   ⭐ composes SubmittalForm + DispatchDirectory
        └── NotFoundPage.tsx          42 L
```

**Totals:** 38 files, 5,657 lines. `pages/` = 2,254 L (40%), `components/` = 2,251 L (40%),
`data/` = 971 L (17%), `types/` = 129 L (2%), `App.tsx` + `main.tsx` = 52 L (1%).
Largest file: `CaseStudyDetailPage.tsx` at 500 L (8.8% of all source).

---

## 2. Render tree

```
#root
└── App                                         BrowserRouter
    └── Routes
        └── Route "/"  →  <Layout>              ← the only layout route
            ├── <ScrollToTop/>                  pathname side effect
            ├── <Navbar/>                       fixed, h-8 strip + h-[72px] bar
            ├── <main className="pt-[72px] sm:pt-[104px]">
            │   └── <Outlet/>                   ← the page swaps here
            │       └── HomePage | ServicesPage | ServiceDetailPage | …
            └── <Footer/>
```

**Exactly one `<Outlet>`.** The Navbar and Footer mount once and never re-render on navigation
(they hold their own `isMobileMenuOpen` / `isServicesOpen` / `isScrolled` state, and both reset on
`useLocation().pathname` change). Only `<main>`'s subtree changes.

### Page composition (what each page mounts)

| Page | Components it renders |
|---|---|
| `HomePage` | `HeroSlider`, `MetricsRibbon`, `CapabilitiesGrid`, `QualityArchitecture`, `FeaturedCaseStudies`, `PartnerGrid` |
| `ServicesPage` | `SectionHeader`, 6 × service row (inline JSX, 4 `feature` bullets each) |
| `ServiceDetailPage` | `Badge`, 2-col narrative, `features` checklist, `equipmentHandled`, `deliverables` right rail, `specs` table, 3 `faqs`, related-service links |
| `MaintenancePage` | `SectionHeader`, `PipelineSection`, `ChecklistSection`, `TierMatrixSection` |
| `CaseStudiesPage` | `SectionHeader`, sector filter row, dossier grid, metrics ribbon, `REVIEWS` grid |
| `CaseStudyDetailPage` | `Badge`, dossier hero, `equipmentSchedule`, `outcome`, optional `fullNarrative`/`challenge`/`scopeOfWork`/`executionPhases`/`verificationNotes`, related services |
| `ServiceAreasPage` | `SectionHeader`, state filter, 9 hub cards, coverage copy |
| `AboutPage` | story, `QualityArchitecture` P.E. block, licence, standards |
| `FinancingPage` | terms, tiers-as-cards, FAQ-ish copy |
| `ContactPage` | `SubmittalForm` (7/5 split) + `DispatchDirectory` |
| `NotFoundPage` | 404 copy, no description meta |

---

## 3. The data layer

```
src/types/index.ts   9 interfaces  ← the single contract
        ▲
        │ imported as `import type { … } from '../types'`
        │
src/data/*.ts        5 modules, 49 records, all `export const`
        ▲
        │ imported as plain values (NOT type-only)
        │
  pages + components          ← 15 of 19 components read from here
```

| Rule | Reality |
|---|---|
| Modules | Plain `.ts`, no `default` export, all named `export const` |
| Type annotations | `export const SERVICES: ServiceItem[] = [...]` — annotated |
| Import style | `import { SERVICES } from '../data/servicesData'` |
| Types | `import type { ServiceItem } from '../types'` in the data files; pages usually do **not** annotate their local map results |
| Validation | **none** — no runtime schema check, no `satisfies`, no zod |
| Mutations | **none** — every export is treated as read-only. No `map`+spread writes, no `Object.assign`, no in-place edits |
| Async | **none** — zero `fetch`, zero `await`, zero `Promise` outside the form's fake timer |
| Sorting/filtering | done in the page, not the data layer (e.g. `SERVICE_HUBS.filter(h => …)`) |
| Derivation | done in the page (e.g. `hub.dispatchHotline.replace(/[^0-9]/g, '')` for the `tel:` href) |

> [REUSABLE] **Annotations without validation.** `const SERVICES: ServiceItem[] = [...]` means
> TypeScript catches a missing or misspelled field at build time but not a wrong *value* (a
> 5-member `sector` string, a `year` of `"23"`). That is the correct trade for a 49-record
> hand-authored dataset, and it is why the typecheck errors are all *unused imports* rather than
> *type mismatches*.

---

## 4. State management — there is none

No context, no provider, no store, no `useReducer`, no external library. **19 `useState` calls across 7 components
across 6 components**, all component-local:

| Component | Variables |
|---|---|
| `HeroSlider` | `currentSlide` |
| `Navbar` | `isMobileMenuOpen`, `isServicesOpen`, `isScrolled` |
| `ChecklistSection` | `checkedItems: number[]` |
| `TierMatrixSection` | `openFaq: number \| null` |
| `CaseStudiesPage` | `selectedSector` |
| `ServiceAreasPage` | `selectedState` |
| `SubmittalForm` | `formData` (10 fields), `isSubmitting`, `submittedTicket`, `errorMessage` |

Consequences: **nothing survives navigation**, there is no way for the Navbar to know what the
Footer shows, and any cross-component communication must go through the URL.

### The two "global" side effects

| Effect | Implementation | Notes |
|---|---|---|
| **Scroll restoration** | `ScrollToTop` reads `useLocation().pathname` and calls `window.scrollTo({ top: 0, behavior: 'instant' })` in a `useEffect` | keys on `pathname` only, so `?tier=` changes don't scroll-reset. **Does not coordinate with Lenis** — see `motion-and-interactions.md` §5.1 |
| **Document metadata** | `SEO` writes `document.title` and the first `meta[name="description"]` on every render, with **no cleanup** | 11 call sites, 8 of which double-append `\| Vertex Solutions`. See `seo-and-metadata.md` |

> These two are the *entire* global-state surface. A rebuild's first architectural act should be
> a `siteConfig.ts` + a `ScrollToTop` that talks to Lenis — not a state library.

---

## 5. Navigation & URL contract

### 5.1 Route table (`src/App.tsx`)

| Path | Component | Kind |
|---|---|---|
| `/` | `HomePage` | index |
| `/services` | `ServicesPage` | index |
| `/services/:slug` | `ServiceDetailPage` | dynamic, 6 valid slugs |
| `/maintenance-plans` | `MaintenancePage` | canonical |
| `/maintenance-process` | `MaintenancePage` | **alias** — same component |
| `/case-studies` | `CaseStudiesPage` | index |
| `/case-studies/:slug` | `CaseStudyDetailPage` | dynamic, 8 valid slugs |
| `/reviews` | `<Navigate to="/case-studies" replace />` | **redirect**, no component |
| `/service-areas` | `ServiceAreasPage` | index |
| `/about` | `AboutPage` | canonical |
| `/company-and-trust` | `AboutPage` | **alias** — same component |
| `/financing` | `FinancingPage` | index |
| `/contact` | `ContactPage` | canonical |
| `/request-consultation` | `ContactPage` | **alias** — same component |
| `*` | `NotFoundPage` | catch-all |

**15 route entries → 11 unique page components.** 3 aliases + 1 redirect + 1 catch-all.

⚠ **The 3 aliases render byte-identical pages with no canonical tag and no redirect.** Because
`SEO` writes no `<link rel="canonical">`, `/about` and `/company-and-trust` are both indexable
duplicate content. The correct fix is `<Navigate replace>` for all three, matching what
`/reviews` already does.

### 5.2 Dynamic slug resolution

Both detail pages use the **same three-step pattern**:

```tsx
const { slug } = useParams();
const service = SERVICES.find(s => s.slug === slug);
if (!service) return <Navigate to="/services" replace />;   // or "/case-studies"
```

`ServiceDetailPage` → fallback `/services`; `CaseStudyDetailPage` → fallback `/case-studies`.
Note: **no 404 page for a bad slug** — a mistyped deep link silently redirects to the index
instead of telling the visitor anything.

### 5.3 Query-string contract

| Param | Producer | Consumer | Status |
|---|---|---|---|
| `?tier=` | `TierMatrixSection` → `/contact?tier=${tier.id}` (`tier-01\|02\|03`) | `SubmittalForm` | ✅ consumed, but as a **boolean** only |
| `?service=` | `ServicesPage` CTAs → `/contact?service=${slug}` | nobody | ❌ **dead param** |
| `?financing=` | `FinancingPage` CTA → `/contact?financing=true` | nobody | ❌ **dead param** |

The bug in full: `SubmittalForm` does
`if (searchParams.get('tier')) setProjectClassification('Preventive Maintenance Agreement')`, so
all three tier CTAs produce an identical prefilled form. See
`forms-and-conversion.md` §5.

---

## 6. Styling architecture

```
tailwind.config.ts          ⭐ theme.extend only — 5 keys:
                             colors (47, semantic names)
                             fontFamily (15 keys — 12 typographic tokens + sans/mono/space)
                             fontSize (12 keys, each with lineHeight + letterSpacing + fontWeight)
                             spacing (10 keys — space-xs..xl, margin, margin-tablet,
                                      margin-desktop, gutter, gutter-desktop)
                             borderRadius (6 keys)
                             + darkMode: 'class'  + content globs  + plugins: []
src/index.css               71 lines. Base rules are INSIDE @layer base;
                              everything from @keyframes down is TOP-LEVEL (unlayered):
  @layer base {              @tailwind ×3 · html{font-family,color,background,
                              scroll-behavior} · body{margin,padding,overflow-x}
                              h1..h6{font-family: Space Grotesk}
                              code,pre,.font-mono,[data-mono]{font-family: JetBrains Mono} }
  (top level)                @keyframes kenburns + .kenburns-active
                              ::-webkit-scrollbar{,-track,-thumb,-thumb:hover}
                              .border-structural, .border-structural-dim
                              input:focus, textarea:focus, select:focus

  ⚠ The unlayered .border-structural rules therefore OUTRANK Tailwind's own
    layered border-color utilities, so `border-structural/50` cannot win.
    ↓ plus
component class strings     the actual styling — 100% of the visual design lives here
```

**There is no component-scoped CSS, no CSS module, no styled-component, and no `cva`.** Two
components do hand-rolled variant logic:

| Component | How variants work |
|---|---|
| `Badge.tsx` | a plain object keyed by a `variant` prop (`neutral` | `crimson` | `dark` | `success`) mapping to literal class strings, selected by a ternary. `crimson` and `success` are **never rendered** anywhere |
| `Button.tsx` | a `variants` object + `sizes` object of literal class strings, joined by string concat — **but the component is never imported** |
| `Navbar` / `Footer` / `TierMatrixSection` / `FeaturedCaseStudies` | hand-written ternaries inside the JSX, e.g. `className={isActive ? 'text-primary …' : 'text-on-surface …'}` |

**The only layout convention in the codebase is a repeated 3-class string, not a utility:**

```html
<div class="max-w-[1320px] mx-auto px-margin lg:px-margin-desktop">
```

`max-w-[1320px]` appears **55 times**, `px-margin` **112 times**, `lg:px-margin-desktop`
**55 times** — always together, in 19 of the 22 source files. There is **no `.container-site`
class and no `container` key in the config**; `1320px` is an arbitrary value. It is nevertheless
perfectly consistent, which is the thing that matters. When rebuilding, either add
`maxWidth: { container: '1320px' }` + a `.container-site` component class, or keep the raw
string — **but do not mix the two forms.**

---

## 7. Component classification (19 components)

| Tier | Components | Character |
|---|---|---|
| **Shell (2)** | `Layout`, `ScrollToTop` | mount once; side effects only |
| **Chrome (2)** | `Navbar`, `Footer` | site-wide navigation & directory; own local state |
| **Dumb presentational (6)** | `SectionHeader`, `Badge`, `Button`(dead), `MetricsRibbon`, `PartnerGrid`, `PipelineSection` | props in, JSX out, no state |
| **Interactive (4)** | `HeroSlider`, `ChecklistSection`, `TierMatrixSection`, `SubmittalForm` | own `useState` + `useEffect` |
| **Data-consuming (4)** | `CapabilitiesGrid`, `QualityArchitecture`, `FeaturedCaseStudies`, `DispatchDirectory` | read a `src/data` export directly |
| **Filtered (2)** | *(inside pages)* `CaseStudiesPage`, `ServiceAreasPage` | filter a data export by local state |
| **Meta (1)** | `SEO` | renders `null`, mutates `document` |

**No component is generic.** There is not one prop-driven, reusable-at-N-sites component. Every
"component" is a page fragment with a fixed data source. `SectionHeader` is the only one that
accepts purely-variable content.

> [REUSABLE LESSON] A rebuild should keep the **shape** (shell → chrome → sections → data) and
> change the **granularity**: extract `Card`, `Stat`, `CTA`, `Section` primitives so the 11 pages
> stop being 2,254 lines of bespoke JSX. But do **not** over-abstract: the flat tree is a
> strength here — there is nothing to trace.

---

## 8. Error handling, loading, and data fetching — all absent

| Concern | Reality |
|---|---|
| Error boundary | **none.** A throw in any page unmounts the whole app to a blank `<div id="root">` |
| `try/catch` | **none** in the entire codebase |
| Loading state | **none** — there is nothing async |
| Suspense | **none** |
| `React.lazy` / dynamic import | **none** — one bundle |
| Retry / error UI | **none** |
| 404 | `NotFoundPage` exists for unmatched routes only; a bad `:slug` redirects to the index instead |
| Form validation error UI | ✅ **present** — `SubmittalForm:126–131` renders `errorMessage` in a red `AlertCircle` panel |
| Form *submission* error UI | ❌ **absent** — there is no `try/catch` anywhere, and the fake `setTimeout` cannot fail, so a real network failure would have no code path to render an error |

> ⚠ **The red error panel is not announced.** It renders with `bg-red-50 border-red-200 text-red-700`
> and no `role="alert"` / `aria-live`, so a screen reader gets nothing when the 25-character
> validation fires. It is also the only place in the codebase using raw Tailwind palette colours
> instead of the design tokens. **Do not copy this pattern** — add `role="alert"` and route the
> colours through the token layer.

---

## 9. Build & deployment architecture

| Aspect | Reality |
|---|---|
| Dev | Vite dev server, HMR via `@vitejs/plugin-react` |
| Build | `tsc -b && vite build` — **currently fails at `tsc -b` with 25 unused-import errors** |
| Output | `dist/` — `index.html` + 1 JS chunk + 1 CSS chunk. **No manualChunks, no code splitting** |
| Routing on host | requires an SPA rewrite to `/index.html`; **no config file provides one** |
| `base` | `/` (default) — not sub-path safe |
| SSR / prerender | **none** — the HTML shell is all a non-JS crawler sees |
| Env vars | **none read anywhere**; no `.env`, no `.env.example` |
| CI | **none** — no `.github/`, no pipeline |
| Lint / format / test | **none** |
| Docker / hosting | **none** — no `Dockerfile`, `netlify.toml`, `vercel.json` |

---

## 10. Architectural assessment

### What is genuinely well made

1. **The data/UI split.** 49 typed records in 5 pure modules, zero mutation, zero async. Content
   edits never touch JSX logic.
2. **The token system.** Semantic names (`on-surface`, `primary-container`,
   `surface-container-low`) instead of palette names, extended through `theme.extend`. A rebrand
   is a ~30-line `tailwind.config.ts` edit.
3. **The one-level layout.** 15 routes, 1 shell, 1 `<Outlet>`. Nothing to trace.
4. **Strict TypeScript.** Under `strict` + `noUnusedLocals` + `noUnusedParameters` the only
   failures are dead imports — no type errors at all.
5. **The `max-w-[1320px] mx-auto px-margin lg:px-margin-desktop` string.** Repeated verbatim 55 times instead of extracted — but the repetition is what keeps the gutters perfectly consistent across every page.
6. **`useParams` + `Navigate` fallback.** Slug 404s degrade gracefully instead of rendering `undefined`.

### What is genuinely weak

1. **No data-fetching story at all.** The lead form posts nowhere. There is no API contract, no
   CMS, no email. A rebuild that needs real leads is writing the entire backend integration from
   zero.
2. **No error boundary, no error UI, no loading UI.** One throw = blank page.
3. **Company data is duplicated in 5+ places**, including **two conflicting HQ addresses**.
   There is no `siteConfig` — the single most likely source of a rebrand bug.
4. **Alias routes serve duplicate content** with no canonical tag and no redirect.
5. **Accessibility debt is systematic** (no skip link, no focus-visible, no reduced-motion, a
   hover-only mega menu). See `accessibility.md`.
6. **SEO is a 17-line side effect** rather than a metadata layer: no canonical, no OG, no
   JSON-LD, and a suffix bug on 8 of 11 pages. See `seo-and-metadata.md`.
7. **No tests, no lint, no CI** — nothing catches the 25 build errors, the `z-1` class, the
   `text-structural-dim` typo, or the mega-menu keyboard trap.
8. **Zero code splitting** despite Lenis, Router and a large Lucide tree.
9. **One 500-line page** (`CaseStudyDetailPage`) that mixes data lookup, five optional content
   blocks, and related-service linking.

### The single highest-value refactor for a rebuild

```
src/data/siteConfig.ts     ← company, licence, P.E., phones, emails, addresses, nav links
src/lib/cn.ts             ← clsx + tailwind-merge
src/lib/useReducedMotion.ts
src/components/ui/        ← Button (revive), Card, Badge, Container, Section, Stat
src/components/ErrorBoundary.tsx
src/routes.tsx            ← with <Navigate replace> aliases + a real 404 for bad slugs
```

…then re-point the 5 existing data files and 19 components at it. That is roughly a day's work and
it removes every defect in the two lists above at the source.
