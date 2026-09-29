# Accessibility

> **This is the weakest dimension of the reference implementation.** There is no accessibility
> layer, no focus management, no `prefers-reduced-motion` support, and no ARIA beyond two icon
> labels. The underlying semantics are decent — real `<form>`, real `<label for>`, real `<button>`,
> real `<nav>`/`<main>`/`<footer>` landmarks, 10/10 label-`id` pairs — but almost every layer
> above that is missing. Target on a rebuild: **WCAG 2.2 AA.**

---

## 1. Scorecard

| Area | Status | Notes |
|---|---|---|
| Landmarks | ✅ | `<nav>`, `<main>`, `<footer>` are unique per page. Header/footer are siblings of `<main>`, which is valid. |
| Page language | ✅ | `<html lang="en">` |
| Page title | ⚠ | present on all 11 pages but 8 duplicate the brand (see `seo-and-metadata.md`) |
| Headings | ❌ | **3 of 11 pages have no `<h1>` at all** — `/services`, `/service-areas`, `/financing`; plus 2 heading-level skips on `/` and `/contact` (see §2.8). `<h1>` exists only on `AboutPage`, `CaseStudiesPage`, `CaseStudyDetailPage`, `ContactPage`, `MaintenancePage`, `NotFoundPage`, `ServiceDetailPage`. `SectionHeader` always emits `<h2>`, and **its `<h2>` carries no `text-*` class**, so all 13 section headings render at the UA default 24px bold instead of the intended 36/40/56px. |
| Skip link | ❌ **missing** | 2,254 lines of page JSX, up to 5 stacked sections, no way to bypass the header |
| Focus visible | ⚠ **form fields only** | `index.css:68–71` gives `input/textarea/select:focus` a `1px solid #111315 !important` outline. **Links, buttons, checkboxes and everything else have no focus style at all** — UA default only, and several browsers show nothing on the crimson buttons. |
| Focus management | ❌ | no focus trap (drawer), no focus restoration, no focus move on route change or on form submit |
| Keyboard operability | ❌ | mega menu is hover-only; checklist rows are `<div onClick>` |
| ARIA | ❌ **effectively none** | Measured across all 38 source files: **exactly one `aria-*` attribute exists** — `aria-label="Toggle mobile menu"` (`Navbar.tsx`). And **zero `role=` attributes**. Also 0 `aria-expanded`, 0 `aria-controls`, 0 `aria-live`, 0 `aria-pressed`, 0 `aria-current`, 0 `aria-invalid`, 0 `aria-describedby`. |
| Colour contrast | ⚠ | 3 likely failures (§4) |
| Colour-only meaning | ⚠ | 12 `animate-pulse` status dots + 1 `animate-ping` badge dot carry state by colour + motion alone |
| Form labels | ✅ **10/10** | every field has `htmlFor`/`id` |
| Form errors | ❌ | no `role="alert"` on the `SubmittalForm.tsx:126–131` panel, no `aria-invalid`, no `aria-describedby` |
| Images / `alt` | ⚠ | all 10 `<img>` have `alt`, but 7 use the record title (duplicating the adjacent heading) and the hero's is a marketing sentence |
| Motion | ❌ **zero `prefers-reduced-motion`** | autoplay hero, infinite Ken Burns, 2 infinite pulse/ping loops, Lenis smooth scroll |
| Zoom / reflow | ✅ | no fixed pixel widths on containers; `overflow-x: hidden` on `body` masks overflow rather than fixing it |
| Target size | ⚠ | several 28–32px tap targets (dots, `h-11` = 44px fields are fine) |
| Timing | ❌ | the 800ms submit and 7s autoplay have no pause/extend control |
| Language of parts | ✅ | no foreign-language content |
| Page titles on 404 | ❌ | no description; and no `noindex` |

---

## 2. Blocking defects (must fix before launch)

### 2.1 No skip link

There is no "skip to content" affordance. A keyboard user must `Tab` through, on every page:
1. the utility strip links (2) + phone + licence
2. the 7 nav links + the Services dropdown trigger
3. the mega-menu contents when open
4. the mobile drawer's 7 links + 6 service links + 2 CTAs, when open

That is **15–25 tab stops before `<main>`**, on all 11 pages.

**Fix** — first child of `Layout`'s root, visually hidden until focused:

```tsx
<a href="#main"
   className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2
              focus:bg-primary-container focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
  Skip to main content
</a>
<main id="main" tabIndex={-1} className="…">
```

### 2.2 The mega menu is unusable by keyboard

```tsx
<div className="relative h-full flex items-center"
     onMouseEnter={() => setIsServicesOpen(true)}
     onMouseLeave={() => setIsServicesOpen(false)}>
```

| Requirement | Status |
|---|---|
| `onFocus` / `onBlur` to open | ❌ |
| `onClick` / `onKeyDown` toggle | ❌ |
| `aria-expanded` on the trigger | ❌ |
| `aria-haspopup="true"` | ❌ |
| `aria-controls` pointing at the panel | ❌ |
| `Escape` to close | ❌ |
| Arrow-key traversal | ❌ (and unnecessary — these are plain links) |
| The trigger is a `<NavLink>` with `to="/services"` | ⚠ clicking it navigates *away* instead of opening the panel |

**Result: the 6-item services panel is completely unreachable without a mouse.** On a laptop
trackpad it is usable by accident; with a keyboard, a switch device, or a screen reader it does
not exist.

**Fix:**

```tsx
const [servicesId] = useId();
<button type="button" aria-expanded={isServicesOpen} aria-controls={servicesId}
        aria-haspopup="true" onClick={() => setIsServicesOpen(v => !v)}
        onKeyDown={e => e.key === 'Escape' && setIsServicesOpen(false)} …>
<div id={servicesId} hidden={!isServicesOpen} …>
```

…or switch the whole thing to the CSS-only `group-hover` + `focus-within` pattern, which needs no
JavaScript at all:

```html
<div class="group relative">
  <Link class="group-focus-within:underline" …>Services <ChevronDown class="group-hover:rotate-180 group-focus-within:rotate-180"/></Link>
  <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
```

### 2.3 The mobile drawer has no focus trap, no role, no Escape

```tsx
{isMobileMenuOpen && (
  <div className="xl:hidden fixed inset-0 z-50 …"> … </div>
)}
```

| Missing | Consequence |
|---|---|
| `role="dialog"` + `aria-modal="true"` + `aria-label` | the drawer is announced as nothing |
| focus moved into the drawer on open | focus stays on the toggle, which is now behind an overlay |
| `Tab` cycling confined to the drawer | `Tab` walks into the page content *underneath* the overlay |
| `Escape` to close | no keyboard escape hatch |
| focus restored to the toggle on close | focus is lost to `<body>` |
| `overflow: hidden` / `lenis.stop()` on `<body>` | the page scrolls behind the drawer (see `motion-and-interactions.md` §5.1) |
| inert / `aria-hidden` on the background | a screen reader reads the whole page behind the drawer |

The drawer contains 7 nav links + a 6-item services list + 2 full-width CTAs = **15 focusable
elements** that must be managed.

### 2.4 `prefers-reduced-motion` is absent — zero matches in `src/`

Everything below runs regardless of the OS setting:

| Motion | Where | Risk |
|---|---|---|
| 7s auto-advancing cross-fade (1000ms) | `HeroSlider` | WCAG 2.2.2 (pause, stop, hide) |
| `kenburns` infinite scale 1.00→1.05 | `index.css` | vestibular |
| `animate-pulse` status dot (12 places) | various | distraction |
| `animate-ping` badge dot | `TierMatrixSection` | distraction |
| 5 image `scale-105` hovers + card lifts | ~6 components | minor |
| Lenis 1.1s smooth scroll | `Layout` | vestibular |

**Fix** — CSS block in `index.css` **plus** a JS gate for the autoplay:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important; animation-iteration-count: 1 !important;
    transition-duration: .01ms !important; scroll-behavior: auto !important;
  }
  .kenburns-active { animation: none; }
}
```

```ts
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// …and expose a visible Pause/Play control regardless (WCAG 2.2.2)
```

### 2.5 Checklist rows are clickable `<div>`s

`ChecklistSection` renders each of the 7 items as a `<div onClick={…}>`. Not focusable, no
`role="checkbox"`, no `aria-checked`, no keyboard handler, no visible focus ring.

**Fix:** `<button type="button" role="checkbox" aria-checked={checked} …>` — or a real
`<input type="checkbox">` with a styled `<label>` and `sr-only` text.

### 2.6 The FAQ accordion exposes no state

`TierMatrixSection` toggles `openFaq` but the trigger has **no `aria-expanded`, no
`aria-controls`, and the answer panel has no `id`**. A screen reader cannot tell which FAQ is open.

**Fix:** `aria-expanded={openFaq === i}` · `aria-controls={`faq-panel-${i}`}` · `id={`faq-panel-${i}`}`
· `role="region"` · `aria-labelledby` on the panel.

### 2.7 Form error is not announced and not associated

The red panel (`SubmittalForm:126–131`) has no `role="alert"`, focus is not moved to it, and
`projectScope` is never marked `aria-invalid` or linked with `aria-describedby`. The panel is also
~250px above the offending field.

**Fix:** `role="alert"` on the summary, `aria-invalid` + `aria-describedby` on the field, and
per-field messages that render next to the field.

### 2.8 The heading outline is broken on 5 of 11 pages

Measured by walking the actual render tree (page markup + the components it renders, in order):

| Page | Rendered outline | Defect |
|---|---|---|
| `/` (`HomePage`) | `h1` → **`h3`** → `h2` `h3` → `h2` `h3` `h4`×3 → `h2` `h3`×2 | **`PartnerGrid` emits a bare `<h3>` with no preceding `<h2>`** — it is the only home section that does not use `SectionHeader`. `MetricsRibbon` emits no heading at all. |
| `/contact` | `h1` → **`h3`** → **`h4`** | **Two skips.** `SubmittalForm` renders an `<h3>` with no `h2` above it, and the page's own `<h4>` follows it directly. `ContactPage` is the only page that uses neither `SectionHeader` nor a wrapped section component. |
| `/services` | **`h2`** `h3`×2 | **No `<h1>`.** Starts at `h2` from `SectionHeader`. |
| `/service-areas` | **`h2`** `h3`×2 | **No `<h1>`.** |
| `/financing` | **`h2`**×2 `h3`×4 `h4`×2 | **No `<h1>`.** |
| `/about` | `h1` `h2` `h3`×3 `h4`×4 | ✅ |
| `/case-studies` | `h1` `h2`×2 `h3`×2 `h4`×3 | ✅ |
| `/case-studies/:slug` | `h1` `h2`×8 `h3` | ✅ |
| `/maintenance-plans` | `h1` `h2` `h3` `h2` `h2` `h3` `h3` `h3` | ✅ |
| `/services/:slug` | `h1` `h2` `h3`×3 `h4` | ✅ |
| `*` (`NotFoundPage`) | `h1` | ✅ |

**Three pages have no `<h1>` at all** — `/services`, `/service-areas`, `/financing`. `HomePage`
gets one only because `HeroSlider` supplies it. Every other page's `h1` is hand-written in the
page file with a bare `font-*` class and no `text-*`, so **all 7 page H1s also render at the UA
default 32px bold** rather than the intended 36–56px — the same defect as `SectionHeader`, in
`design-system.md` §2.1a.

**Fix:** one `<h1>` per page, and make the section-heading component the *only* producer of `<h2>`
so the outline cannot skip.

---

## 3. Non-blocking defects

| # | Issue | Where | Fix |
|---|---|---|---|
| 1 | **The hero mounts 5 full-bleed images simultaneously** (inactive slides are `opacity-0`, not removed). The headline is **not** the problem — it is a single `<h1>` whose text is swapped by state — but all 5 images are fetched and all 5 `alt`s land in the a11y tree | `HeroSlider` | render only the active slide, or `aria-hidden` + `inert` + `loading="lazy"` on the rest |
| 2 | **No global `:focus-visible` styling** | `index.css:68–71` has a `1px solid #111315 !important` rule for `input:focus, textarea:focus, select:focus` — **form fields only.** Links, buttons and everything else get only the UA default. | Add a 2px `outline-primary-container` + `outline-offset-2` `:focus-visible` rule globally; replace the `!important` form rule rather than extending it |
| 3 | **No focus restoration on route change** — focus stays on the link that was clicked, which is then unmounted | `ScrollToTop` | Move focus to `<main tabIndex={-1}>` on `pathname` change |
| 4 | **Breadcrumbs are a `div` with `<Link>`s**, not `<nav aria-label="Breadcrumb">` + an ordered list | `ServiceDetailPage`, `CaseStudyDetailPage` | `<nav aria-label="Breadcrumb"><ol>…` |
| 5 | **No `aria-current="page"`** on the active nav link — `NavLink` sets `aria-current` by default in v7, so this is ✅ **for the 7 top-level links only**; the mobile drawer and the footer column links are plain `<Link>`s | `Navbar`, `Footer` | add `NavLink` or set `aria-current` manually |
| 6 | **`<button>` with no `type` inside a form defaults to `type="submit"`** — the "Submit Another Technical Request" button is outside a `<form>`, so this is safe today, but the pattern is a trap | `SubmittalForm:113` | always write `type="button"` |
| 7 | **Tap targets under 44px**: the hero tab buttons, the slider dots (`h-1.5`/`w-6`), the filter pills, the FAQ chevrons | various | raise hit area with padding or a pseudo-element |
| 8 | **`<select>` elements have no custom chevron and rely on the UA one** — fine, but the `cursor-pointer` is on the select and the visual height is `h-11` (44px) ✅ | `SubmittalForm` | — |
| 9 | **Colour-only state**: the 12 `animate-pulse` dots across `MetricsRibbon`/`PartnerGrid`/`FeaturedCaseStudies` and the `animate-ping` dot in `TierMatrixSection` convey "live/active" by colour + motion alone | various | pair with text |
| 10 | **`window.matchMedia` is never used** | global | needed for reduced-motion, dark mode, and print |
| 11 | **No `<html>` `class` toggling for `darkMode: 'class'`** | `tailwind.config.ts` | the config declares `darkMode: 'class'` but exactly **1 `dark:` variant exists** (an unrendered `Badge` tone). Either implement it or remove the declaration. |
| 12 | **The mega menu, the 5 hero dots, the checklist rows, and the FAQ headers are all unlabelled, unroled controls** | `Navbar`, `HeroSlider`, `ChecklistSection`, `TierMatrixSection` | the **only** `aria-*` in the codebase is `aria-label="Toggle mobile menu"`. Everything else needs `aria-expanded` / `aria-controls` / `role="button"` / `tabindex` |
| 13 | **No `<table>` semantics** for the 6-row `specs` tables — they are `<div>` stacks | `ServiceDetailPage` | a real `<table>` with `<th scope="row">` for label/value pairs |
| 14 | **The 5-star rating is not exposed** — `rating` is in the data but never rendered | `CaseStudiesPage` | `aria-label="5 out of 5"` |
| 15 | **No `lang` on abbreviations** | — | acceptable |
| 16 | **No `<noscript>` fallback** | `index.html` | add one; the app is 100% client-rendered |

---

## 4. Colour contrast — measured against the token values

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `on-surface #191c1d` | `surface-container-lowest #fff` | **16.9:1** | ✅ AAA |
| `on-surface` | `surface-container-low #f3f4f5` | **15.6:1** | ✅ AAA |
| `secondary #5d5e61` | `#ffffff` | **6.6:1** | ✅ AA (all sizes) |
| `secondary` | `#f3f4f5` | **6.1:1** | ✅ AA |
| `secondary` | `surface-container #e6e8ea` | **5.3:1** | ✅ AA (≥4.5) |
| `primary-container #c8102e` | `#ffffff` | **5.9:1** | ✅ AA — the crimson on white is the primary button; passes |
| `on-primary #ffffff` | `primary #9e001f` | **9.4:1** | ✅ AAA (button hover state) |
| `on-primary` | `primary-container` | **5.9:1** | ✅ AA (the *default* submit button) |
| `outline #906f6e` | `#ffffff` | **4.6:1** | ✅ AA — but this token is **never used in the codebase** |
| ⚠ `label-technical` 12px `#5d5e61` at `opacity-60` (`placeholder:text-secondary/60`) | `#ffffff` | **~2.8:1** | ❌ **fails** — the placeholder text on all 6 text fields |
| ⚠ `text-[11px] text-secondary` helper text | `#ffffff` | **6.6:1** | ✅ but **11px** is below the practical minimum; 6.6:1 meets AA, the size does not meet AAA |
| ⚠ `primary #9e001f` on `primary-container #c8102e` (e.g. crimson-on-crimson) | — | **~1.2:1** | ❌ **fails** — never intentionally used, but no guard prevents it |
| ⚠ `.border-structural` `#e2e4e8` (the site's own hairline token) | `#ffffff` | **1.24:1** | ❌ **fails 1.4.11 non-text contrast (3:1)** — this is the border on *every* card, panel, input, footer column and section in the codebase |
| ⚠ `.border-structural-dim` `#cbd0d8` | `#ffffff` | **1.6:1** | ❌ fails 1.4.11 — and this is the intended *emphasis* border, so it is also failing at the wrong end of the scale |
| ⚠ `#cbd0d8` hard-coded input borders (10×) | `#ffffff` | **1.6:1** | ❌ **fails 1.4.11 non-text contrast (3:1)** — every form field border, and the hex is duplicated instead of using `.border-structural-dim` |
| ⚠ `border-b-2 border-on-surface` (active nav) | `#ffffff` | **16.9:1** | ✅ fine — this is the *only* border in the system that passes |
| ⚠ `red-700 #b91c1c` on `red-50 #fef2f2` (the error panel) | — | **8.0:1** | ✅ contrast fine, ❌ **no `role="alert"`** |

**Actionable contrast fixes:**

3. **All non-text borders.** `.border-structural` is `#e2e4e8` (1.24:1 on white) and it is the
   border on every card, panel, input, breadcrumb strip, footer column and form field. WCAG 1.4.11
   requires **3:1** for any boundary that is the only way to identify a control. Either darken the
   hairline to ≈`#949494` (3:1) for interactive boundaries, or accept that the *label* is the
   accessible name (which it is — the 10/10 `for`/`id` pairing means the borders are decorative and
   arguably exempt; the 10 hard-coded `#cbd0d8` field borders are the stronger case, since a bare
   input with a 1.6:1 border is a real usability problem regardless).
4. **`placeholder:text-secondary/60` → full `secondary` or `secondary/80`.** At 15px/18px these
   placeholders fail 1.4.3. This is also a *conversion* problem: a 2.8:1 placeholder is close to
   invisible on a phone in daylight.
5. `outline #906f6e` exists in the palette, is unused, and passes 4.6:1 — it was presumably the
   intended border colour. Consider it for emphasis boundaries.

---

## 5. Screen-reader experience, page by page

| Page | First thing announced | Problems |
|---|---|---|
| `/` | "Vertex Solutions, main … " then the single hero H1 | 5 images announced at once, autoplay with no `aria-live` on slide change, and the H1's text mutates under the user |
| `/services` | nav → "Commercial HVAC Services" | clean |
| `/services/:slug` | nav → H1 → breadcrumb `<div>` | breadcrumb not a `<nav>`; `specs` table not a table |
| `/maintenance-plans` | nav → H1 → FAQ accordion | accordion state invisible; checklist rows unreachable |
| `/case-studies` | nav → H1 → filter pills → grid | filter pills are `<button>`s without `aria-pressed`; `rating` unexposed |
| `/case-studies/:slug` | nav → H1 → breadcrumb | same breadcrumb issue; 5 optional content blocks render with no headings when absent |
| `/service-areas` | nav → H1 → state filter → hub cards | filter pills lack `aria-pressed`; `tel:` links announce raw numbers |
| `/about` | nav → H1 | clean; the P.E. pull-quote is a `<blockquote>` ✅ |
| `/financing` | nav → H1 | clean |
| `/contact` | nav → H1 → the 10-field form | error not announced; confirmation not announced; no fieldset grouping |
| `*` | nav → "Page Not Found" | no description, no `noindex` |

### Filter buttons (2 pages)

`CaseStudiesPage` and `ServiceAreasPage` both render a row of sector/state filters. If they are
`<button>`s, add `aria-pressed={selected === sector}` (or `role="tab"` + a `tablist` if they
genuinely switch panels). They should also announce the result count, e.g.
`aria-live="polite"` on a "Showing 3 of 8 case studies" line — currently a screen-reader user
presses a filter and hears **nothing**.

---

## 6. Keyboard map of the current site

| Key | Works? | Where |
|---|---|---|
| `Tab` / `Shift+Tab` | ⚠ | everything, in DOM order; no skip link; no focus ring; no trap in the drawer |
| `Enter` / `Space` on links & buttons | ✅ | all real `<a>`/`<button>` elements |
| `Enter` in a form text field | ✅ | native submit (triggers the 25-char check) |
| `Tab` in a `<select>` | ✅ | native |
| `↓`/`→` in the mega menu | ❌ | not implemented; the panel isn't reachable anyway |
| `Escape` | ❌ | nothing listens for it anywhere in the codebase |
| Arrow keys in the hero | ❌ | not implemented; the tab buttons are individually tabbable |
| `Home` / `End` / `PageUp` / `PageDown` | ⚠ | intercepted by Lenis (which is correct) but with no way to disable it |
| `Space` to scroll | ❠ | Lenis `smoothWheel: true` may swallow it |

---

## 7. Rebuild priority list

### P0 — before launch
1. Skip link + `<main id="main" tabIndex={-1}>`
2. Mega menu: `aria-expanded` / `aria-controls` / click-toggle / `Escape` (or `focus-within` CSS)
3. Drawer: `role="dialog"`, `aria-modal`, focus trap, `Escape`, focus restore, `lenis.stop()`, `inert` on the background
4. `prefers-reduced-motion` CSS block + hero pause control + gate the autoplay
5. Checklist rows → real checkboxes
6. FAQ → `aria-expanded` / `aria-controls` / panel `id`
7. Form → `role="alert"`, `aria-invalid`, `aria-describedby`, per-field messages, focus to the confirmation
8. Input borders to a ≥3:1 token; placeholders to full `secondary`

### P1 — high value, low cost
9. Global `:focus-visible` ring
10. Focus management on route change (focus `<main>`)
11. `aria-hidden` + `inert` on inactive hero slides → fixes the 5-images-in-the-a11y-tree problem
12. `aria-pressed` on the 2 filter rows + a polite live region for result counts
13. `aria-label` on the slider dot buttons and every icon-only control
14. Breadcrumbs → `<nav aria-label="Breadcrumb"><ol>`

### P2 — polish
15. `specs` tables → real `<table>` with `scope`
16. Star ratings → `aria-label="N out of 5"`
17. Status dots → pair colour with text
18. Tap targets ≥44px
19. `type="button"` on every non-submit button
20. Either implement `darkMode: 'class'` or remove it from the config

### Audit tooling to add
```
npm i -D @axe-core/cli eslint-plugin-jsx-a11y
npx axe http://localhost:5173/ --tags wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa
```
…plus a manual pass: tab through every page at 320px width with the mouse unplugged, and run
VoiceOver/NVDA over the contact form and the mega menu. **Both of the P0 defects above are
invisible to axe** because they are keyboard- and focus-order problems, not attribute problems.

---

## 8. What to keep from the reference

| Keep | Why |
|---|---|
| `<label htmlFor>` + `id` on all 10 fields | Correct, consistent, and rarer than it should be |
| Real `<form>` + `onSubmit` + `preventDefault` | Correct |
| `aria-label` on the 2 icon-only buttons | The pattern is right; there are just too few instances |
| Unique `<nav>`/`<main>`/`<footer>` landmarks | Correct |
| `html lang="en"` | Correct |
| `required` as a real HTML attribute | Screen readers announce it for free |
| Semantic colour tokens (contrast-audited above) | The palette is sound; only the borders and placeholders fail |
| `<blockquote>` for the P.E. pull-quote | Correct |
| Native `<select>` | Keyboard- and screen-reader-correct with zero JS |
