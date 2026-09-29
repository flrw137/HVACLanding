# Implementation Guide

> How to rebuild this site from scratch, in the right order, with the traps called out. Written for
> a competent frontend developer who will be handed this repository and a rebrand brief.

---

## 0. Before you write any code

### 0.1 Read these 19 files, in this order

| Order | File | What you take from it |
|---|---|---|
| 1 | `project-overview.md` | scope, inventory, the rebrand policy |
| 2 | `design-system.md` | ⭐ **the tokens** — colours, type, spacing, radii. Everything else derives from this. |
| 3 | `ui-rules.md` | the class-string conventions and the do/don't list |
| 4 | `responsive-rules.md` | the 5 breakpoints and the fixed-offset arithmetic |
| 5 | `component-library.md` | the 19 components, what each renders |
| 6 | `pages.md` | the 11 pages, section by section |
| 7 | `content-structure.md` | the 5 data modules and the 49 records |
| 8 | `architecture.md` | the file tree, the route table, the data flow |
| 9 | `forms-and-conversion.md` | the one form, and what it takes to make it real |
| 10 | `motion-and-interactions.md` | the hero, Lenis, the 20 motion behaviours |
| 11 | `accessibility.md` | the 7 blocking defects — build these in, don't bolt them on |
| 12 | `seo-and-metadata.md` | the metadata layer and the JSON-LD to add |
| 13 | `performance.md` | the image/font budget |
| 14 | `assets.md` | the 14 images, the 3 fonts, the favicon |
| 15 | `responsive-rules.md` §7 | the 5-width test matrix |
| 16 | `tech-stack.md` | versions, config, and what to drop |
| 17 | `replication-checklist.md` | the acceptance criteria |
| 18 | `site-map.md` | routes and redirects |
| 19 | `progress-tracker.md` | status |

**Then read the source in this order:** `tailwind.config.ts` → `src/index.css` → `src/types/index.ts`
→ `src/App.tsx` → `src/components/layout/Layout.tsx` → `src/data/*.ts` → components → pages.
**`DESIGN.md` is not a source of truth** — it names different fonts (Roboto / IBM Plex Mono),
a different navbar height (76px), a different palette, and a different type scale. Where it
conflicts with code, code wins.

### 0.2 Settle these 6 questions before starting

| Question | Why it matters | Reference impl. did |
|---|---|---|
| **Is the form real?** | Determines whether you need a backend, a CRM, or an email service. | ❌ Not real — `setTimeout` + a random ticket |
| **Where does content live?** | A non-technical editor changing a service title decides your whole data architecture. | 5 hardcoded TS modules |
| **How many pages/records?** | Determines static vs CMS. | 11 page components, 49 records, **22 canonical indexable URLs** (8 static + 6 service slugs + 8 case-study slugs) |
| **Where is it hosted?** | Determines `base`, the SPA rewrite, and whether `BrowserRouter` is safe. | Unspecified — and that's why deep links may 404 |
| **Is there a design system to follow?** | 47 tokens are already defined. Rebuilding them from scratch is pure waste. | Tailwind `theme.extend` |
| **Do you need i18n?** | If yes, no rewrite; if no, don't build the abstraction. | Single locale, hardcoded copy |

---

## 1. Scaffold

```bash
npm create vite@latest <brand> -- --template react-ts
cd <brand>
npm i
npm i react-router-dom lenis lucide-react
npm i -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

**Pin to the same majors the reference uses** so the design-system values transfer unchanged:

| Package | Use | Reference |
|---|---|---|
| `vite` | build | 6.x (7.x is current — fine) |
| `react` / `react-dom` | UI | 19.x |
| `react-router-dom` | routing | 7.x |
| `typescript` | types | 5.7+, `strict` |
| `tailwindcss` | CSS | **3.4.x** — do **not** jump to v4 unless you are re-expressing `theme.extend` as `@theme` |
| `lenis` | smooth scroll | 1.3.x |
| `lucide-react` | icons | latest |
| `autoprefixer`, `postcss` | CSS | latest |
| `@types/node` | `NodeJS.Timeout`, `path` | 22.x |

**Do not install** `gsap`, `framer-motion`, `clsx`/`tailwind-merge` (unless you adopt `cn()`),
`react-hook-form`, `zod`, or a state library. None are needed.

### 1.1 `tsconfig.app.json` — copy the reference verbatim

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"]
}
```

`noUnusedLocals` is what makes the reference fail its own build. **Keep it** — it is why the
codebase has no type errors — and delete unused imports as you go.

### 1.2 `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    target: 'es2020',
    rollupOptions: { output: { manualChunks: {
      react: ['react', 'react-dom', 'react-router-dom'],
      motion: ['lenis'],
      icons: ['lucide-react'],
    }}},
  },
  esbuild: { drop: ['console', 'debugger'] },
});
```

(The reference's `__dirname` in an ESM package works only because Vite pre-bundles the config. If
you use `.mts` or a native loader, use `import.meta.dirname`.)

### 1.3 PostCSS

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

---

## 2. Port the design system (day 1)

Copy **`tailwind.config.ts` essentially verbatim** (111 lines) and change only the brand values. It
contains exactly five `theme.extend` groups — `colors` (47), `borderRadius` (6), `spacing` (10),
`fontFamily` (15), `fontSize` (12) — plus `darkMode: 'class'`, a `content` glob array, and
`plugins: []`.

**Do not expect anything else.** There is **no** `aspectRatio`, `transitionDuration`, `keyframes`,
`screens`, `zIndex`, `boxShadow`, `fontWeight`, or `container` group. All the durations
(`100/150/200/300/500/700/1000`), aspect behaviour, and the Ken Burns keyframe come from Tailwind
defaults or from `src/index.css`.

**The one structural decision you must understand before porting:** `fontFamily` and `fontSize`
**share the same 12 token names**, so `font-headline-sm` emits `font-family` and
`text-headline-sm` emits `size/line-height/letter-spacing/font-weight`. Copy that overlap — it is
the best idea in the config — but read `design-system.md` §2.1 first, because the reference
codebase only uses the `font-*` half and therefore leaves ~90% of the authored metrics dead.

**What to change on a rebrand:**

| Token group | Change |
|---|---|
| `primary`, `primary-container` | the brand accent — keep the light/dark pair and the ≥4.5:1 ratio against white |
| `secondary` | keep it at ~6:1 against white for body-adjacent text |
| `on-surface`, `surface-container-*` | usually keep; they are an accessible neutral ramp |
| `outline` | keep, and actually **use** it for borders (see `accessibility.md` §4) |
| `fontFamily` | your three families — **and add a real fallback chain**; the reference falls back to bare `sans-serif` |
| `fontSize` | keep the **structure** (display / headline / body / label / button), change the numbers. Add the 10px and 12px steps that the reference reaches for with `text-[10px]`/`text-[12px]` |
| `spacing.margin` / `margin-desktop` | the mobile / `lg` gutters (16px / 48px) |
| `borderRadius.DEFAULT` | 2px is nearly square — most mechanical brands will want 4–6px |
| — | **the container**: there is no `container` key. Add `maxWidth: { container: '1320px' }` (or keep `max-w-[1320px]`) so the measure is named rather than hardcoded 55× |
| — | **the Ken Burns keyframe** lives in `index.css`, not the config — gate it on `prefers-reduced-motion` there |

Copy **`src/index.css`** (71 lines) and make 4 edits:

1. Add the `prefers-reduced-motion` block from `accessibility.md` §2.4.
2. **Remove `html { scroll-behavior: smooth }`** if you keep Lenis — they conflict.
3. Keep `.border-structural` but **verify its contrast** (the reference's `#e2e4e8` fails 3:1).
4. Replace the `input:focus { outline: 1px solid #111315 !important }` rule with a proper global
   `:focus-visible` ring.

---

## 3. Build the shell (day 1–2)

**Order matters: shell first, so the fixed-offset arithmetic is right from the start.**

```
src/
  main.tsx          createRoot + StrictMode
  App.tsx           BrowserRouter + Routes (all routes up front)
  components/layout/Layout.tsx
  components/layout/Navbar.tsx
  components/layout/Footer.tsx
  components/common/ScrollToTop.tsx
  components/common/SEO.tsx
  components/common/SkipLink.tsx        ← NEW, don't forget
  data/siteConfig.ts                     ← NEW, do this first
```

### 3.1 `siteConfig.ts` — the single most important addition

The reference duplicates company data in 5+ places and has **two conflicting HQ addresses**. Fix
that at the root:

```ts
export const site = {
  name: 'Vertex Solutions',
  legalName: 'Vertex Solutions Mechanical Engineering LLC',
  tagline: 'Mechanical & Industrial HVAC',
  phone: { display: '(317) 555-0140', href: 'tel:+13175550140' },
  tollFree: { display: '(800) 555-0194', href: 'tel:+18005550194' },
  email: { estimating: 'estimating@…', service: 'service@…' },
  address: { street: '4200 Precision Way, Suite 800', city: 'Indianapolis', state: 'IN', zip: '46240' },
  licence: { hvac: '#HVAC-MECH-48209', pe: '#PE-104928-IN' },
  hours: '24/7/365 Emergency Dispatch',
  regions: ['IN', 'OH', 'KY'],
  social: [],
} as const;
```

Then `grep` for the old strings and confirm every occurrence is gone.

### 3.2 The header offset — get this right immediately

```tsx
// Navbar
<div className="hidden sm:block h-8">{/* utility strip */}</div>
<div className="h-[72px]">{/* main bar */}</div>

// Layout
<main id="main" tabIndex={-1} className="flex-1 w-full pt-[72px] sm:pt-[104px]">
```

32 + 72 = 104. **The two numbers live in two files and are connected only by a comment.** If you
change one, change both, and check at 639/640px.

### 3.3 `ScrollToTop` — fix the Lenis interop

```tsx
// ❌ reference: native scrollTo while Lenis owns the scroll position
window.scrollTo({ top: 0, behavior: 'instant' });

// ✅ rebuild: put the Lenis instance in a context/ref
lenis.scrollTo(0, { immediate: true });
```

Use React Router 7's `<ScrollRestoration />` if you migrate, or keep the manual component but
share the instance.

### 3.4 The Navbar — build the a11y version first

The reference mega menu is hover-only and keyboard-inaccessible. Do it properly the first time:

- trigger is a **`<button>`** with `aria-expanded`, `aria-controls`, `aria-haspopup`
- `onClick` toggles; `onKeyDown Escape` closes; `onBlur` (with a relatedTarget check) closes
- the panel is `id`-referenced and `hidden={!open}`
- the chevron rotates on `aria-expanded`, via a real `group` class (the reference's
  `group-hover:rotate-180` never fires — no `group` on the ancestor)
- the mobile drawer gets `role="dialog"`, `aria-modal`, a focus trap, `Escape`, focus restore,
  and `lenis.stop()` / `lenis.start()`

### 3.5 `SEO` — write the full version now

```tsx
// title + description + canonical + og:* + twitter:* + optional noindex + jsonLd
// + a cleanup that removes tags the current page doesn't need
// + a 60-character title budget
// + ONE brand suffix, guarded by an includes() check
```

See `seo-and-metadata.md` §6 for the full prop shape and the tag list. Do this in the shell
phase, not at the end — retrofitting 11 pages of metadata is painful.

---

## 4. Build the data layer (day 2)

Port the 5 modules and `src/types/index.ts` (9 interfaces, 129 lines). Keep the
`export const X: Interface[] = [...]` annotation pattern and the `sector` union type.

**Changes to make while porting:**

| Change | Why |
|---|---|
| Add `siteConfig.ts` (done in §3.1) | kill the duplication |
| Reuse `siteConfig` in `serviceAreasData` and everywhere else | kill the two-address bug |
| Give each `MaintenanceTier` a `classification` | fix the `?tier=` loss |
| Collapse `sector` + `sectorBadge` to one field | the two taxonomies can drift |
| Decide whether `rating` on `REVIEWS` is rendered | it currently isn't |
| Add `updatedAt` to services and case studies | needed for `sitemap` and `article:published_time` |
| Keep every `[BRAND-SPECIFIC]` string flagged | so the rebrand pass can find them |

**Counting the content:** 6 services, 8 case studies, 9 hubs, 6 pipeline steps, 7 checklist items,
3 tiers, 5 FAQs, 5 reviews = **49 records**. That yields **22 canonical indexable URLs** (8 static
+ 6 service slugs + 8 case-study slugs) plus 3 duplicate aliases, 1 redirect, and the 404.

---

## 5. Build the pages (day 3–5)

Suggested order, cheapest to hardest:

| Day | Page | Why |
|---|---|---|
| 3 | `NotFoundPage` (42 L) | smallest, teaches the `SectionHeader` + page-header pattern |
| 3 | `ServicesPage` (154 L) | the card/row pattern, used again twice |
| 3 | `ServiceDetailPage` (237 L) | the `useParams` + `Navigate` fallback pattern |
| 3 | `MaintenancePage` (151 L) | composes 3 existing components |
| 4 | `ContactPage` (83 L) | composes the form + directory |
| 4 | `AboutPage` (224 L) · `FinancingPage` (201 L) | static editorial layout |
| 4 | `ServiceAreasPage` (175 L) | the filter pattern |
| 4 | `CaseStudiesPage` (348 L) | the filter pattern again + `REVIEWS` |
| 5 | `CaseStudyDetailPage` (500 L) | largest; the optional-fields pattern |
| 5 | `HomePage` (24 L) | pure composition — do it **last**, once the sections exist |

**Two rules for pages:**

1. **One `<h1>` per page, provided by the page itself.** `SectionHeader` emits `<h2>`; do not
   rely on it for the top heading. (Exception: the homepage's H1 is the hero's, and you must
   ensure only one is in the a11y tree.)
2. **Every page starts with `<SEO … />` as its first child.**

**Fix while you're there:**

- `FeaturedCaseStudies` links to `/case-studies` instead of `/case-studies/${study.slug}` — a
  hard bug. Every card must go to its own dossier.
- 3 alias routes (`/maintenance-process`, `/company-and-trust`, `/request-consultation`) should be
  `<Navigate replace>`, not duplicate pages.
- Bad `:slug` should render a 404 (or at least `noindex`), not silently redirect to the index.

---

## 6. The form (day 5)

Read `forms-and-conversion.md` in full before touching it. Minimum viable rebuild:

1. **A real endpoint.** Formspree/Netlify Forms/a serverless function/a CRM web hook — anything
   but `setTimeout`.
2. **Delete the false claims**: "Received & Encrypted", "Commercial NDA encrypted transmission",
   "< 4 Hours Guaranteed", and the named P.E. — unless they are true.
3. **Cut to 5 required fields**; move `facilityType`, `estimatedTimeline`, `budgetScope` to a
   post-submit qualification step.
4. Add `autocomplete`, `inputMode`, `enterKeyHint`, and a `phone` pattern.
5. Fix the a11y: `role="alert"`, `aria-invalid`, `aria-describedby`, focus to the confirmation,
   `<fieldset>`/`<legend>` grouping.
6. Fix the handoff: read `?tier=`, `?service=`, `?financing=`, and echo the context into the
   confirmation and the `projectScope` placeholder.
7. Add a honeypot + server-side rate limit; add a consent checkbox and a real `/privacy` route.
8. Keep the `DispatchDirectory` next to the form — the dual path (spec sheet + phone) is the
   best conversion idea in the project.

---

## 7. Assets (day 5–6)

| Asset | Action |
|---|---|
| 14 images | Source your own. Export AVIF + WebP, 640/1024/1600w, ≤150KB for a hero, ≤60KB for a card. Put them in `public/img/` (or `src/assets/` if you want hashing). |
| 3 fonts | Self-host WOFF2, latin-only subsets, `preload` Space Grotesk 600 + Inter 400. |
| Material Symbols | **Delete the request.** |
| Favicon | **Redesign.** The reference is a hazard-warning triangle — wrong for an engineering firm. Ship `.svg` + `favicon.ico` + `apple-touch-icon.png` + a `site.webmanifest`. |
| Logotype | Keep it as live text. Add an inline SVG mark only if the brand has one. |
| `alt` text | `alt=""` for the 14 images that duplicate an adjacent heading; real descriptions for the rest. |

---

## 8. QA before you call it done

### 8.1 The 5-width matrix (`responsive-rules.md` §7)

| Width | Check |
|---|---|
| 375 | 1-col everywhere; drawer overflows and scrolls; hero tab strip scrolls horizontally |
| 640 | utility strip appears; header = 104px; **`<main>` still clears it** |
| 768 | 2-up card grids; maintenance gallery → 3; the `md` separator appears |
| 1100 | **the awkward band** — full 12-col layout + 48px gutters + 56px type + **no menu links** |
| 1440 | the design target; mega dropdown hover; 3-up tiers; 4/3/3/2 footer |

Plus the three 1px boundaries: **639↔640**, **1023↔1024**, **1279↔1280**.

### 8.2 Typecheck and build

```bash
npx tsc --noEmit -p tsconfig.app.json   # must be clean — the reference has 25 TS6133
npm run build                          # must succeed
npm run preview
```

### 8.3 Keyboard pass — mouse unplugged

- Tab from a cold page load: can you reach `<main>` in ≤ 2 stops? (skip link)
- Open the Services menu with `Enter`. Close it with `Escape`. Does focus return?
- Open the mobile drawer at 375px: can you `Tab` past it? Does `Escape` close it? Does the page
  scroll behind it?
- Tab through the maintenance checklist: are the 7 rows reachable?
- Tab through the FAQ: can you tell which one is open?
- Submit the contact form with 10 characters: **do you hear** the error? Can you see it? Is the
  offending field marked?
- Submit successfully: where is focus? Is the confirmation announced?

### 8.4 Reduced motion

- macOS: System Settings → Accessibility → Display → Reduce Motion
- Windows: Settings → Accessibility → Visual effects → Animation effects off
- DevTools: Rendering → Emulate `prefers-reduced-motion: reduce`
- Verify: the hero does not auto-advance, Ken Burns is off, the pulse/ping dots are off, Lenis is
  off (or instant), and the slide-change transition is instant.

### 8.5 Deploy smoke test

```bash
npm run build && npm run preview
# then, against the REAL deployment, not preview:
curl -I https://<host>/services/ac-repair     # must be 200, not 404
curl -I https://<host>/case-studies/apex-logistics-hub
curl -I https://<host>/nonexistent-page       # must be 404 (or a 200 SPA shell — your call)
```

Check the SPA rewrite works on the real host. Then paste the URL into the
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to verify the OG tags.

### 8.6 Content audit

```bash
# every hardcoded brand string must be gone
grep -rn "Vertex Solutions" src/ index.html
grep -rn "555-01" src/                    # phone numbers
grep -rn "Precision Way\|Innovation Pkwy" src/   # the two addresses
grep -rn "Keller\|ASHRAE Distinguished" src/      # the P.E. identity
grep -rn "Apex\|St. Jude\|BioVance\|Keystone" src/ # fake client names
grep -rn "rgba(0,0,0,#c8102e,#9e001f" src/        # raw brand hexes outside the config
```

The last one matters: `tech-stack.md` notes the form's error panel uses raw Tailwind palette
colours, and 10 input borders use a hard-coded `#cbd0d8`. Brand hexes belong in
`tailwind.config.ts` only.

---

## 9. Traps — the 20 things that will bite you

| # | Trap | Where | Symptom |
|---|---|---|---|
| 1 | Navbar height vs. `<main>` padding in two files | `Navbar` / `Layout` | first section hidden under the header |
| 2 | The nav switches at `xl` (1280), not `lg` (1024) | `Navbar` | 1024–1279px has no menu links |
| 3 | `z-1` is not a Tailwind class | `HeroSlider` ×2, `CaseStudyDetailPage`, `ServiceDetailPage` | hero scrims lose their z-order the moment you reorder |
| 4 | `border-structural/50` produces no CSS | `TierMatrixSection` | dark 1px rule instead of 50% grey |
| 5 | `text-structural-dim` doesn't exist | `MaintenancePage:26` | separator inherits the wrong colour |
| 6 | `scrollbar-none` / `animate-in` / `fade-in` / `slide-in-from-top-*` / `zoom-in-95` are dead | 4 places | nothing animates; scrollbar still shows |
| 7 | No `group` on the mega-menu wrapper | `Navbar` | `group-hover:rotate-180` never fires |
| 8 | `FeaturedCaseStudies` links to the index | `FeaturedCaseStudies` | all 3 cards go to `/case-studies` |
| 9 | `?tier=` is a boolean | `SubmittalForm` | 3 tier CTAs → 1 identical form |
| 10 | `?service=` and `?financing=` are never read | 2 pages | 2 CTAs lose all context |
| 11 | 5 hero slides stay in the DOM | `HeroSlider` | 5 full-bleed images fetched + 5 `alt`s announced; the H1 itself is state-swapped and fine |
| 12 | `useEffect` in `ScrollToTop` runs on `pathname` **and** the first render | `ScrollToTop` | a harmless but noisy extra scroll on load |
| 13 | `sector` is a 6-member union + a separate filter array | `CaseStudiesPage` | adding a sector needs 2 edits or the filter breaks |
| 14 | Optional fields on `CaseStudyDossier` are unchecked | `CaseStudyDetailPage` | `undefined` rendered as "undefined" or a crash |
| 15 | `SEO` appends its suffix unconditionally | `SEO` | 8 of 11 titles repeat the brand |
| 16 | `SEO` has no cleanup | `SEO` | tags leak between routes |
| 17 | `NotFoundPage` has no description | `NotFoundPage` | the 404 advertises the home page |
| 18 | 2 conflicting HQ addresses | 3 files | the wrong one ships |
| 19 | `html { scroll-behavior: smooth }` + Lenis | `index.css` / `Layout` | fighting scroll behaviours |
| 20 | `Button.tsx` exists and is never imported | `common/Button.tsx` | 25 TS6133 errors; a "component library" that isn't one |

---

## 10. Definition of done

- [ ] `npx tsc --noEmit` clean; `npm run build` succeeds
- [ ] No `grep` hits for any previous brand's name, phone, address, licence, or client
- [ ] 22 canonical URLs in the sitemap, each with a unique title ≤ 60 chars and a description 120–160 chars
- [ ] The 3 aliases (`/maintenance-process`, `/company-and-trust`, `/request-consultation`) either `301` to
      their canonical or carry `<link rel="canonical">` — never both rendering the same content indexable
- [ ] `canonical` on all 25; the 3 aliases are `<Navigate replace>`; 404 is `noindex`
- [ ] OG + Twitter tags on every page; JSON-LD on the homepage, each service, and each case study
- [ ] `robots.txt` and a generated `sitemap.xml` (from the data files, so it can't drift)
- [ ] Skip link works; the mega menu is keyboard-operable; the drawer traps and restores focus
- [ ] The checklist is real checkboxes; the FAQ has `aria-expanded`/`aria-controls`
- [ ] Form errors announce; a successful submit moves focus and announces
- [ ] The form posts somewhere real; no unsubstantiated "encrypted"/"guaranteed" claims
- [ ] `prefers-reduced-motion` honoured in CSS **and** JS; the hero has a pause control
- [ ] 1 hero image request, `loading="lazy"` on the rest, AVIF/WebP with `srcset`
- [ ] Fonts self-hosted and subset; no Material Symbols request
- [ ] 5-width test matrix passes, including the three 1px boundaries
- [ ] Deep links return 200 on the real host
- [ ] Axe clean at WCAG 2.2 AA on all 11 pages
- [ ] `robots.txt`, `404` behaviour, and OG previews verified on the real deployment
