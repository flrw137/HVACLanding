# Replication Checklist

> Acceptance criteria for a faithful rebuild. Work top to bottom. Every item is verifiable.
> Mark `[x]` only when you can demonstrate it.

---

## 0. Reference-verified facts (do not "correct" these)

| Fact | Value | Verified from |
|---|---|---|
| Source files | **38** | directory listing |
| Source lines | **5,657** | per-file line count |
| Components | **19** (2 layout, 2 common-live, 1 common-dead, 6 home, 3 maintenance, 2 contact, 3 more) | `src/components/**` |
| Page components | **11** | `src/pages/*.tsx` |
| Data modules | **5** | `src/data/*.ts` |
| Interfaces | **9** in 129 lines | `src/types/index.ts` |
| Route entries | **15** (11 pages + 3 aliases + 1 redirect + 1 catch-all) | `src/App.tsx` |
| Canonical indexable URLs | **22** (8 static + 6 service detail + 8 case detail) | route table + data |
| Services / case studies | **6 / 8** | data |
| Service hubs | **9** (3 IN, 3 OH, 3 KY; 1 HQ) | data |
| Maintenance content | **6** steps, **7** checklist, **3** tiers, **5** FAQs | data |
| Reviews | **5** | data |
| Content records total | **49** | data |
| Unique images / references | **14 / 22** | 4 files |
| Fonts | **3** used (Inter, JetBrains Mono, Space Grotesk) + **1** dead (Material Symbols) | `index.html` |
| Colours in the palette | **47** | `tailwind.config.ts` |
| Container width | `max-w-[1320px]`, **55** occurrences | class strings |
| Gutters | 16px `< 1024px`, 48px `≥ 1024px` | `px-margin` / `lg:px-margin-desktop` |
| Navbar height | 32px strip + 72px bar; `<main>` `pt-[72px] sm:pt-[104px]` | `Navbar` / `Layout` |
| Breakpoints | Tailwind defaults; **no `2xl` usage** | `tailwind.config.ts` |
| Hero | 5 slides, 7000ms, 1000ms cross-fade, 12s Ken Burns, progress bar, tab strip | `HeroSlider` |
| Form | 10 fields, **9 required**, ≥25-char scope, 800ms fake submit, `VTX-PE-######` | `SubmittalForm` |
| Smooth scroll | Lenis, `duration: 1.1`, expo-out | `Layout` |
| `useState` calls | **11** across 6 components | per-file scan |
| Dead imports (build blockers) | **26** `TS6133` — now **0**, `npm run build` passes | `tsc --noEmit` |
| Dead dependencies | `gsap`, `clsx`, `tailwind-merge` | import audit |
| Dead component | `src/components/common/Button.tsx` | import audit |
| Dead query params | `?service=`, `?financing=` | param audit |
| Conflicting addresses | **2** | `serviceAreasData` / `Footer` vs `DispatchDirectory` |

---

## 1. Infrastructure

- [ ] Vite + React 19 + TS scaffolded; `"type": "module"`
- [ ] `tsconfig.app.json` copied verbatim (`strict`, `noUnusedLocals`, `noUnusedParameters`, `jsx: react-jsx`, `paths: @/*`)
- [ ] `tsconfig.json` is a solution file with 0 options, referencing the 2 projects
- [ ] `postcss.config.js` = `tailwindcss` + `autoprefixer`, ESM `export default`
- [ ] `vite.config.ts` has the React plugin + the `@` alias
- [ ] `index.html` has `<!DOCTYPE html>`, `<html lang="en">`, charset, viewport, `<div id="root">`
- [ ] `<body>` classes: `bg-surface-container-lowest text-on-surface font-body-md antialiased selection:bg-primary-container selection:text-white`
- [ ] **`npx tsc --noEmit -p tsconfig.app.json` is clean** (the reference has 25 errors)
- [ ] `npm run build` succeeds
- [ ] `npm run dev` and `npm run preview` both work
- [ ] `src/vite-env.d.ts` exists (the reference is missing it)
- [ ] No ESLint/Prettier in the reference — decide and document whether you add them

## 2. Design system

- [ ] `tailwind.config.ts` has 47 colours with **semantic** names (`on-surface`, `primary-container`, `surface-container-low*`, `outline`) — no palette names
- [ ] `primary #9e001f` / `primary-container #c8102e` / `secondary #5d5e61` / `on-surface #191c1d` / `inverse-surface #2e3132` present
- [ ] `fontFamily` has **15** keys: the 12 typographic tokens (`display-xl`, `display-xl-mobile`, `headline-lg`, `headline-lg-mobile`, `headline-md`, `headline-sm`, `body-lg`, `body-md`, `body-sm`, `button-text`, `label-technical`, `label-mono-sm`) + `sans` / `mono` / `space`
- [ ] `fontSize` has **12** keys with the same names, each as `['<size>', { lineHeight, letterSpacing, fontWeight }]`
- [ ] **The `font-X` = family / `text-X` = metric overlap is preserved** — this is the mechanism, not a coincidence
- [ ] Font stacks have a real fallback chain (the reference has only bare `sans-serif`/`monospace`)
- [ ] `spacing` has 10 keys: `space-xs`(4px) `space-sm`(8px) `space-md`(16px) `space-lg`(24px) `space-xl`(40px) `margin`(16px) `margin-tablet`(32px) `margin-desktop`(48px) `gutter`(24px) `gutter-desktop`(32px)
- [ ] `margin` = 16px is the mobile gutter; `margin-desktop` = 48px is the `lg` gutter
- [ ] Radii: `DEFAULT 2px`, `sm 2px`, `md 4px`, `lg 8px`, `xl 12px`; **`2xl` is NOT overridden** (Tailwind's 16px applies)
- [ ] `darkMode: 'class'` — **either implement `dark:` variants or remove the key** (the reference has 0)
- [ ] `content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']`
- [ ] `plugins: []`
- [ ] `src/index.css` (71 lines): `@tailwind` ×3, `html` base (Inter, colour, `scroll-behavior`), `body` base, `h1..h6` family rule, `code,pre,.font-mono,[data-mono]` rule, `@keyframes kenburns` + `.kenburns-active`, `::-webkit-scrollbar` ×4, `.border-structural` (`#e2e4e8`), `.border-structural-dim` (`#cbd0d8`), `input:focus, textarea:focus, select:focus`
- [ ] **`prefers-reduced-motion` block added** (missing in the reference)
- [ ] Global `:focus-visible` ring added (the reference only styles form fields)
- [ ] `html { scroll-behavior: smooth }` removed if Lenis is used — the two conflict
- [ ] Container: the `max-w-[1320px] mx-auto px-margin lg:px-margin-desktop` string is consistent on all 55 occurrences (or extracted into one class — but not both forms mixed)

## 3. Shell

- [ ] `main.tsx` = `createRoot` + `React.StrictMode` + `./index.css`
- [ ] `App.tsx` = `BrowserRouter` + one layout `Route path="/"` + `<Outlet/>`
- [ ] `Layout.tsx` = `ScrollToTop` + `Navbar` + `<main>` + `Footer`, `min-h-screen flex flex-col`
- [ ] `<main>` offset: `pt-[72px] sm:pt-[104px]` — matches the navbar height exactly
- [ ] `ScrollToTop` runs on `pathname` change and **coordinates with Lenis** (the reference does not)
- [ ] Skip link as the first focusable element (missing in the reference)
- [ ] Lenis: `duration: 1.1`, expo-out `(t) => Math.min(1, 1.001 - Math.pow(2, -10*t))`, `orientation: 'vertical'`, `smoothWheel: true`; rAF loop cancelled + `destroy()` on unmount
- [ ] Lenis gated on `prefers-reduced-motion`

## 4. Navbar

- [ ] `fixed top-0 left-0 w-full z-50` + `border-b border-structural` + `transition-shadow duration-200`
- [ ] Utility strip `h-8 hidden sm:block`, with the pulsing dot, the region/licence line, the "24/7 Commercial Dispatch" label and the `tel:` link
- [ ] Main bar `h-[72px]` with the wordmark, the 7 links, and the CTA cluster
- [ ] Wordmark sub-line `xl:hidden` (hidden at ≥1280)
- [ ] **7 nav links, in order:** Overview `/` · Services `/services` (dropdown) · Case Studies `/case-studies` · Maintenance Process `/maintenance-plans` · Service Areas `/service-areas` · Why Choose Us `/about` · Financing `/financing`
- [ ] Desktop nav `hidden xl:flex`; hamburger `xl:hidden`
- [ ] CTA "Request Consultation" → `/contact`, visible at **all** widths
- [ ] Active link: `text-on-surface border-primary-container font-semibold`; inactive `text-secondary hover:text-on-surface border-transparent`
- [ ] Mega dropdown: `top-[71px]`, `w-[540px]`, `grid-cols-2`, `rounded-lg shadow-xl`, header row + "View All Services →", 6 service tiles with dot + `shortTitle` + `line-clamp-1` summary
- [ ] Mega dropdown `z-50`
- [ ] **Keyboard-operable** (the reference is hover-only): `aria-expanded`, `aria-controls`, click toggle, `Escape` (missing in the reference)
- [ ] **`group` present on the wrapper** so the chevron actually rotates (the reference's `group-hover:rotate-180` is dead)
- [ ] Dropdown and drawer entry animations **actually work** (the reference's `animate-in`/`fade-in`/`slide-in-from-top-*` are dead — no `tailwindcss-animate`)
- [ ] Mobile drawer: hotline card, 7 links with `ArrowRight`, a "Core HVAC Services" 6-link list, "Schedule Site Assessment" → `/contact`, and a `tel:` CTA
- [ ] Drawer: `max-h-[85vh] overflow-y-auto`
- [ ] **Drawer is a proper dialog**: `role="dialog"`, `aria-modal`, focus trap, `Escape`, focus restore, `lenis.stop()`, background `inert` (all missing in the reference)
- [ ] Hamburger has `aria-label="Toggle mobile menu"`
- [ ] Both menus close on `pathname` change
- [ ] `isScrolled` → `shadow-xs` at `scrollY > 20`; listener removed on unmount

## 5. Footer

- [ ] 4 columns at `lg` (4/3/3/2), 1 column below, 2 columns at `md`–`lg`
- [ ] Column 1: wordmark + description + the 2 `mailto:` addresses
- [ ] Column 2: the 6 service links from `SERVICES`
- [ ] Column 3: the 5 page links
- [ ] Column 4: contact block + the HQ address + hours
- [ ] Licence numbers present (`#HVAC-MECH-48209`, `#PE-104928-IN`)
- [ ] Certification names (ASHRAE / NEBB / ASME) as **text**, not logos
- [ ] Legal bar: copyright + `Privacy Policy` / `Terms` links (⚠ dead links in the reference — no such routes)
- [ ] Address matches `siteConfig` — the reference's second address is wrong

## 6. Data layer

- [ ] `src/types/index.ts` with 9 interfaces: `ServiceItem`, `CaseStudyDossier`, `ServiceAreaHub`, `MaintenanceStep`, `ChecklistItem`, `MaintenanceTier`, `ClientReview`, `ConsultationSubmittal`, + 1
- [ ] `sector` is a 6-member union, all 6 present in the data
- [ ] `SERVICES` = 6, `CASE_STUDIES` = 8, `SERVICE_HUBS` = 9, `MAINTENANCE_PIPELINE` = 6, `READINESS_CHECKLIST` = 7, `MAINTENANCE_TIERS` = 3, `TECHNICAL_FAQS` = 5, `REVIEWS` = 5
- [ ] All exports are `const` with a type annotation, no `default`, no mutation
- [ ] `siteConfig.ts` exists and is the single source for name/phone/email/address/licence/P.E./hours
- [ ] **No brand string appears in more than one file** (verify with `grep`)
- [ ] Every `[BRAND-SPECIFIC]` value is flagged for the rebrand pass
- [ ] `MaintenanceTier` carries a `classification` so `?tier=` survives the handoff

## 7. HomePage

- [ ] 24 lines, pure composition, 6 children in this order: `HeroSlider` → `MetricsRibbon` → `CapabilitiesGrid` → `QualityArchitecture` → `FeaturedCaseStudies` → `PartnerGrid`
- [ ] No page-level state

### HeroSlider
- [ ] 5 slides, `currentSlide` state, `useRef` for the interval
- [ ] `setInterval(…, 7000)`, cleared on unmount, **reset on manual tab click**
- [ ] `currentSlide = (p + 1) % 5`
- [ ] Cross-fade: all slides mounted, `opacity-100` / `opacity-0 pointer-events-none`, `transition-opacity duration-1000 ease-in-out`
- [ ] `kenburns-active` on the active slide only
- [ ] Gradient scrim + `min-h-[660px] lg:min-h-[740px]`
- [ ] **Layout-shift guards**: `<h1>` `min-h-[90px] sm:min-h-[140px]`, `<p>` `min-h-[60px]`
- [ ] Progress bar: `h-1` track + `width: ${(currentSlide+1)/5*100}%`, `transition-all duration-300`
- [ ] 5 tab buttons, `md:w-auto`, `overflow-x-auto` below `md`
- [ ] CTA row: "View Our Capabilities" → `/services`, "Request Technical Consultation" → `/contact`
- [ ] **Only the active slide is announced/loaded** (fix: render one slide, or `aria-hidden` + `inert` + `loading="lazy"` on the rest)
- [ ] **Pause control + `prefers-reduced-motion` gate** (both missing in the reference)
- [ ] `z-1` replaced with a real value (`z-10`/`z-20`)

### MetricsRibbon
- [ ] 4 metrics, `grid-cols-2 md:grid-cols-4`, `gap-6 lg:gap-8`
- [ ] Value in display type, label in mono uppercase
- [ ] 12 `animate-pulse` dots + 1 `animate-ping` dot → gated on reduced motion

### CapabilitiesGrid
- [ ] 4 tiles, `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- [ ] Each: numbered mono index, title, description, `hover:border-on-surface hover:shadow-lg`, `transition-all duration-200`, `hover:-translate-y-0.5`

### QualityArchitecture
- [ ] 2-col at `lg` (7 / 5)
- [ ] P.E. identity, pull-quote in a `<blockquote>`, licence, 7 standards
- [ ] CTA → `/about`

### FeaturedCaseStudies
- [ ] 3 cards, `grid-cols-1 md:grid-cols-3`
- [ ] `relative h-56 w-full overflow-hidden bg-surface-dim` image box + `w-full h-full object-cover`, `group-hover:scale-105`, `transition-transform duration-500`
- [ ] sector badge, year, title, excerpt
- [ ] **Each card links to `/case-studies/${slug}`** — the reference links all 3 to `/case-studies` ⚠

### PartnerGrid
- [ ] 6 OEM names as text (Carrier, Trane, Daikin, Bosch, York, JCI)
- [ ] `flex-col md:flex-row items-center`
- [ ] Tiles 2-up → 3-up

## 8. ServicesPage

- [ ] `SectionHeader` + 6 service rows
- [ ] Row = `grid lg:grid-cols-12` — image `lg:col-span-5`, text `lg:col-span-7`
- [ ] Row shows `category` badge, `title`, `summary`, **first 4** `features`
- [ ] `specs.standard` as a mono technical line
- [ ] CTA → `/services/${slug}` **and** → `/contact?service=${slug}`
- [ ] The `?service=` param is actually read by the form (dead in the reference)
- [ ] Metrics ribbon of 4
- [ ] CTA band → `/contact`

## 9. ServiceDetailPage

- [ ] `useParams<{slug}>` + `SERVICES.find(s => s.slug === slug)`
- [ ] Miss → `Navigate to="/services" replace` (⚠ make it a 404 + `noindex`, not a redirect)
- [ ] Breadcrumb strip: Home / Services / title
- [ ] Hero: `eyebrow`, `title`, `summary`, 2 CTAs
- [ ] 8 / 4 split at `lg`; mobile is stacked
- [ ] Full `description`
- [ ] `features` checklist (all, not 4)
- [ ] `equipmentHandled` and `deliverables` in the right rail
- [ ] `specs` table: `standard`, `responseSLA`, `warranty`, and `balancingTolerance` **only if present** (5 of 6 services have it)
- [ ] `faqs` accordion (3 per service)
- [ ] Related services from `relatedServiceSlugs`/slug matches; empty state if none
- [ ] `<SEO title={`${title} | Vertex Solutions`} description={summary} />` → fixed suffix handling
- [ ] 10/10 unused imports deleted — **done** (this file alone had 5)

## 10. MaintenancePage

- [ ] `SectionHeader` + `PipelineSection` + `ChecklistSection` + `TierMatrixSection`
- [ ] Page header image; 3-tile gallery `grid-cols-1 md:grid-cols-3`
- [ ] `text-structural-dim` replaced with a real token (dead in the reference)
- [ ] `SectionHeader` / `CheckCircle2` unused imports deleted

### PipelineSection
- [ ] 6 steps, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] Each: large crimson numeral (`font-display-xl-mobile text-primary font-bold`), `phase` chip, `title`, `description`, then 2 `justify-between` rows (`deliverable`, `testingOrStandard`)

### ChecklistSection
- [ ] 7 items, `grid-cols-1 md:grid-cols-2`
- [ ] `checkedItems: number[]` state, live count against `READINESS_CHECKLIST.length`
- [ ] **Real checkboxes** (`role="checkbox"` + `aria-checked`, keyboard-operable) — the reference uses `<div onClick>`

### TierMatrixSection
- [ ] 3 tiers, `grid-cols-1 lg:grid-cols-3`
- [ ] The `isPopular` tier: `border-primary-container ring-1 shadow-xl` + a "Most Popular Scope" ribbon
- [ ] `cadence`, `responseWindow`, `slaBadge`, `inclusions` (with crimson `Check` tiles), `actionLabel` as the CTA text
- [ ] CTA → `/contact?tier=${tier.id}`
- [ ] The form actually receives the tier (dead in the reference)
- [ ] 5 FAQs, `openFaq` initialised to `0`
- [ ] **Accordion has `aria-expanded` / `aria-controls` / panel `id`** (all missing in the reference)
- [ ] `border-structural/50` replaced with a real class (dead in the reference)

## 11. CaseStudiesPage

- [ ] `SectionHeader`, sector filter, dossier grid, metrics ribbon, `REVIEWS` grid
- [ ] `selectedSector` state, default `'All'`; 7 buttons (All + 6 sectors)
- [ ] Filter pills have `aria-pressed` + a polite live region announcing the result count (missing in the reference)
- [ ] Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] Each card: `sectorBadge`, `year`, `code`, `title`, `location`, primary/secondary metrics
- [ ] **Cards link to `/case-studies/${slug}`**
- [ ] `REVIEWS`: 5 in a `grid-cols-3` (3 + 2), `verificationBadge` rendered, `rating` either rendered with an `aria-label` or removed from the data
- [ ] `Badge`, `Clock`, `ShieldCheck`, `Building2`, `ArrowRight` unused imports deleted

## 12. CaseStudyDetailPage

- [ ] `useParams` + `CASE_STUDIES.find(s => s.slug === slug)`; miss → 404 + `noindex`
- [ ] Breadcrumb strip
- [ ] Hero: `sectorBadge`, `code` as `DOSSIER #{code}`, `title`, `location`, `year`, `facilityFootprint`
- [ ] Primary + secondary metric blocks
- [ ] `overview`
- [ ] `equipmentSchedule` as a list
- [ ] `outcome`
- [ ] `challenge`, `scopeOfWork`, `fullNarrative`, `executionPhases[]`, `verificationNotes` — **each guarded**, because 7 of 8 records don't have all of them
- [ ] Previous / next dossier links (`/case-studies/${prevStudy.slug}` / `${nextStudy.slug}`)
- [ ] Related services from `relatedServiceSlugs`; empty state if absent
- [ ] CTA → `/contact?caseStudy=${slug}` (new — the reference loses the context)
- [ ] **At 500 lines this should be split** into `CaseStudyHero`, `CaseStudyNarrative`, `MetricPair`, `RelatedServices`

## 13. ServiceAreasPage

- [ ] `SectionHeader`, `selectedState` state, filter (All / IN / OH / KY), 9 hub cards
- [ ] `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] Each card: `code`, `city`, `state`, `coverageRadius`, `avgResponseTime`, `keyFacilitiesServed[]`
- [ ] `tel:` href derived: `hub.dispatchHotline.replace(/[^0-9]/g, '')`
- [ ] The `isHQ` card shows the address and is visually distinguished
- [ ] Filter has `aria-pressed` + a live result count
- [ ] `Badge`, `Clock`, `ShieldCheck`, `Building2`, `ArrowRight` unused imports deleted

## 14. AboutPage

- [ ] Story, mission, timeline
- [ ] `QualityArchitecture`-style P.E. block (3rd copy of the identity in the reference — dedupe)
- [ ] Licence numbers
- [ ] Standards list
- [ ] CTA → `/contact`
- [ ] `Badge`, `Users`, `ArrowRight` unused imports deleted

## 15. FinancingPage

- [ ] Terms, 3 programmes, FAQ-ish copy
- [ ] 3 CTAs → `/contact?financing=cpace` · `?financing=opex` · `?financing=rebates`
- [ ] **All 3 params read by the form** (all 3 are dead in the reference)
- [ ] `Badge`, `DollarSign`, `ShieldCheck`, `Phone`, `Calculator` unused imports deleted

## 16. ContactPage

- [ ] 7 / 5 split at `lg`; stacked below
- [ ] Left: `SubmittalForm`. Right: `DispatchDirectory`
- [ ] Page header, response-time promise, trust signals
- [ ] `SectionHeader`, `Phone`, `CheckCircle2` unused imports deleted
- [ ] **On mobile, the phone directory should come before the form** (10 fields is a wall)

## 17. SubmittalForm

- [ ] 10 fields, 9 `required` (`budgetScope` optional) — then **cut to 5** for the rebuild
- [ ] `useSearchParams`; reads `?tier=`, `?service=`, `?financing=`, `?caseStudy=`
- [ ] `handleChange` via `setFormData(prev => ({ ...prev, [name]: value }))`
- [ ] `handleSubmit`: `preventDefault`, ≥25-char `projectScope` check, submitting state
- [ ] **A real `fetch`** to a real endpoint (the reference has a `setTimeout`)
- [ ] **A real error path** with a `try/catch` and a rendered failure state (missing in the reference)
- [ ] Success panel: `CheckCircle2`, a heading, a real reference number, the SLA, a "submit another" reset
- [ ] `resetForm` also re-reads the query params (the reference loses the prefill)
- [ ] `setTimeout` cleared on unmount
- [ ] Form chrome: "Protocol Intake" / "Submittal Specification Form" / `REV 4.2` header, `bg-white p-6 sm:p-10 rounded-xl border`
- [ ] 5 rows of 2-up fields + 2 full-width fields
- [ ] 6 / 7 / 4 / 4 `<select>` option sets copied (the qualification logic — see `content-structure.md`)
- [ ] `projectScope` placeholder names York YK, Trane Intellipak, BACnet — keep
- [ ] Submit button: "Submit Request for Review" → "Encrypting & Routing..." while submitting, `disabled`
- [ ] `Lock` + "Commercial NDA encrypted transmission" — **remove or substantiate**
- [ ] **`role="alert"` on the error panel, `aria-invalid` + `aria-describedby` on the field** (missing in the reference)
- [ ] `autocomplete` on all 5 contact fields
- [ ] `pattern` on `phone`
- [ ] Confirmation moves focus and is announced
- [ ] Honeypot + consent checkbox
- [ ] 10/10 `htmlFor`/`id` pairs (this is already correct — don't break it)
- [ ] Input borders use a ≥3:1 token, not hard-coded `#cbd0d8`

## 18. DispatchDirectory

- [ ] 9 hubs from `SERVICE_HUBS`, grouped by state
- [ ] "24/7 Dispatch Hotline" block with the toll-free `tel:`
- [ ] Per-hub `tel:` derived by stripping non-digits
- [ ] **Address must match `siteConfig`** (the reference has 2 conflicting ones)
- [ ] Hub city list must not be re-typed by hand (the reference re-types it)

## 19. SEO

- [ ] One `<SEO>` per page, as the first child
- [ ] `title` + `description` + `canonical` + `og:title/description/image/url/type/site_name` + `twitter:card/title/description/image`
- [ ] Tags are **removed** on unmount if the next page doesn't set them
- [ ] The brand suffix appears **exactly once** (the reference duplicates it on 8 of 11)
- [ ] Every title ≤ 60 chars; every description 120–160 chars
- [ ] `NotFoundPage` has a description **and** `noindex`
- [ ] 3 aliases are `<Navigate replace>` (not duplicate pages)
- [ ] Bad `:slug` → 404 + `noindex`, not a redirect
- [ ] JSON-LD: `HVACBusiness` on `/`, `/service-areas`, `/contact`; `Service` ×6; `Article` ×8; `BreadcrumbList` ×25
- [ ] `Review` markup **only if the reviews are real**
- [ ] `public/robots.txt` + a generated `public/sitemap.xml` (25 URLs)
- [ ] `index.html` has `robots`, `theme-color`, `author`, `apple-touch-icon`, `manifest`
- [ ] Validate the share preview in the Facebook and LinkedIn inspectors against the real deployment

## 20. Accessibility

- [ ] Skip link
- [ ] Global `:focus-visible` ring
- [ ] Mega menu keyboard-operable + `Escape` + focus return
- [ ] Drawer: `role="dialog"`, `aria-modal`, focus trap, `Escape`, focus restore, `lenis.stop()`, `inert` background
- [ ] Checklist rows are real checkboxes
- [ ] FAQ has `aria-expanded` / `aria-controls` / panel `id`
- [ ] Form errors: `role="alert"` + `aria-invalid` + `aria-describedby` + focus
- [ ] Exactly **one** `<h1>` per page, owned by the page (currently 3 pages have none: `/services`, `/service-areas`, `/financing`)
- [ ] No heading-level skips (currently `/` via `PartnerGrid`, `/contact` twice)
- [ ] Focus moves to `<main tabIndex={-1}>` on route change
- [ ] Breadcrumbs are `<nav aria-label="Breadcrumb"><ol>`
- [ ] Filter pills have `aria-pressed` + a live result count
- [ ] `prefers-reduced-motion` in CSS **and** JS; hero has a pause control
- [ ] `prefers-reduced-motion` in JS stops Lenis
- [ ] Form field borders ≥3:1
- [ ] Placeholders ≥4.5:1
- [ ] All `alt` decided: `alt=""` for the 14 duplicates, real descriptions for the rest
- [ ] Every icon-only control has an `aria-label`
- [ ] Every non-submit `<button>` has `type="button"`
- [ ] Tap targets ≥44px
- [ ] `specs` tables are real `<table>`s with `scope`
- [ ] Axe clean at WCAG 2.2 AA on all 11 pages

## 21. Performance

- [ ] **1 hero image request, not 5**
- [ ] `loading="lazy"` + `decoding="async"` on the 17 below-fold images
- [ ] `fetchpriority="high"` on the LCP image
- [ ] AVIF + WebP with `<picture>` and `srcset` at 640/1024/1600w
- [ ] `width`/`height` on every image
- [ ] Fonts self-hosted, latin-only subsets, WOFF2
- [ ] `preload` for Space Grotesk 600 and Inter 400
- [ ] **Material Symbols request deleted**
- [ ] `manualChunks` for react / motion / icons
- [ ] Route-level `React.lazy` (optional — the pages are small)
- [ ] LCP < 2.0s on 4G; CLS < 0.05; INP < 200ms
- [ ] Initial JS ≤ 120KB gzip; CSS ≤ 20KB gzip
- [ ] SPA rewrite on the real host — `/services/ac-repair` returns 200
- [ ] `Cache-Control` set (hashed assets immutable, HTML no-cache)
- [ ] Security headers: CSP, `X-Content-Type-Options`, `Referrer-Policy`
- [ ] `<noscript>` block

## 22. Content accuracy

- [ ] Service slugs are exactly: `ac-repair`, `heating-furnace-repair`, `maintenance-tune-up`, `emergency-hvac-service`, `indoor-air-quality`, `commercial-hvac`
- [ ] Case slugs are exactly: `apex-logistics-hub`, `st-jude-ambulatory-chiller`, `keystone-tower-rooftop`, `oakridge-campus-hydronic-boiler`, `foundry-precision-cnc`, `grand-marquis-fan-coil`, `biovance-cleanroom-pressurization`, `crossdock-regional-low-gwp`
- [ ] Dossier codes are `2024-IND-01`, `2024-HLT-02`, `2023-OFC-03`, `2023-EDU-04`, `2024-IND-05`, `2023-HSP-06`, `2024-HLT-07`, `2024-CLD-08`
- [ ] 6 eyebrows are `SPEC 01` … `SPEC 06` with `//` separators
- [ ] Standards vocabulary is real: ASHRAE 90.1/111/170/180, NEBB, ASME IV, EPA 608, ISO 14644, NADCA, OSHA, SMACNA, BACnet
- [ ] No banned marketing vocabulary: *amazing, best, #1, top-rated, affordable, friendly, unbeatable, state-of-the-art*
- [ ] Mono labels are UPPERCASE; CTAs are verb-first Title Case
- [ ] **All `[BRAND-SPECIFIC]` values replaced** — company, phones, address, licence, P.E., metrics, OEM list, 5 reviews, 14 images
- [ ] **All 5 fake client names replaced** (Apex, St. Jude, Keystone, Grand Marquis, BioVance) — they resemble real institutions
- [ ] The 2 conflicting addresses reconciled to one
- [ ] Legal claims verified or removed: "Encrypted", "NDA", "< 4 Hours Guaranteed", "Guaranteed 2-Hour", "99.98% MTBF"

## 23. Final QA

- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds
- [ ] Tested at **375 / 640 / 768 / 1100 / 1440**
- [ ] Tested at **639↔640**, **1023↔1024**, **1279↔1280**
- [ ] Keyboard pass with the mouse unplugged, on all 11 pages
- [ ] Reduced-motion pass (OS setting + DevTools emulation)
- [ ] `grep -rn "<OldBrand>"` returns nothing
- [ ] Deep links return 200 on the real host
- [ ] OG preview verified on the real deployment
- [ ] `robots.txt` and `sitemap.xml` reachable
- [ ] Axe clean, WCAG 2.2 AA
- [ ] Lighthouse ≥ 90 on Performance / Accessibility / Best Practices / SEO

---

## Known defects the rebuild must NOT reproduce

| # | Defect | Fix |
|---|---|---|
| 1 | The lead form posts nowhere but tells the user it was "Received & Encrypted" | real endpoint + honest copy |
| 2 | 2 conflicting HQ addresses | `siteConfig` |
| 3 | `FeaturedCaseStudies` → the index, not the dossier | `/case-studies/${slug}` |
| 4 | 5 hero `<h1>`s, 5 hero image requests | render one slide |
| 5 | 8 of 11 titles repeat the brand | one guarded suffix |
| 6 | 3 alias routes serve duplicate content with no canonical | `<Navigate replace>` |
| 7 | `?tier=` is a boolean; `?service=` and `?financing=` are dead | read all four params |
| 8 | Hover-only mega menu, no `Escape`, no focus management | proper disclosure widget |
| 9 | Drawer has no `role`, no trap, no `Escape`, page scrolls behind it | proper dialog |
| 10 | Zero `prefers-reduced-motion` | CSS block + JS gate + pause control |
| 11 | Checklist rows are `<div onClick>` | real checkboxes |
| 12 | FAQ exposes no open state | `aria-expanded` / `aria-controls` |
| 13 | Form errors are invisible to screen readers | `role="alert"` + `aria-invalid` |
| 14 | No skip link; ~20 tab stops to `<main>` | skip link |
| 15 | Form field borders at 1.6:1; placeholders at ~2.8:1 | token colours |
| 16 | `z-1` (invalid), `border-structural/50` (dead), `text-structural-dim` (dead), `scrollbar-none` (dead), `animate-in`/`fade-in`/`slide-in-from-top-*`/`zoom-in-95` (dead) | real utilities |
| 17 | Mega-menu chevron never rotates (no `group` on the wrapper) | add `group` |
| 18 | 26 `TS6133` errors blocked the build | delete the imports — **done** |
| 19 | `Button.tsx` exists and is never imported | use it or delete it |
| 20 | `ScrollToTop` fights Lenis (native `window.scrollTo`) | share the instance |
| 21 | `html { scroll-behavior: smooth }` + Lenis | pick one |
| 22 | No error boundary anywhere | add one |
| 23 | 5 star ratings in the data, never rendered | render or remove |
| 24 | `sector` and `sectorBadge` are two taxonomies | collapse to one |
| 25 | 7 of 8 case studies lack a full narrative | fill the data or guard the render |
| 26 | 3 dead `mailto:`/`tel:` links and dead `Privacy`/`Terms` footer links | fix or remove |
| 27 | Material Symbols font requested and never used | delete |
| 28 | Favicon is a hazard-warning triangle | redesign |
| 29 | No SPA rewrite config | add `_redirects`/`vercel.json` |
| 30 | `?tier` prefill lost on `resetForm()` | re-read the params |
