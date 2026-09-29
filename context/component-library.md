# Component Library

> **19 files** under `src/components/` — 5 `common`, 3 `layout`, 6 `home`, 3 `maintenance`,
> 2 `contact`. There is no `index.ts` barrel; every import is a direct relative path.

| # | File | LOC | Exported as | Consumed by | Live? |
|---|---|---|---|---|---|
| 1 | `common/SEO.tsx` | 20 | `SEO` | all 11 pages | ✅ |
| 2 | `common/SectionHeader.tsx` | 57 | `SectionHeader` | 13 renderings in 11 files: 5 pages (`AboutPage`, `CaseStudiesPage` ×2, `FinancingPage` ×2, `ServiceAreasPage`, `ServicesPage`) + 6 section components (`CapabilitiesGrid`, `FeaturedCaseStudies`, `QualityArchitecture`, `ChecklistSection`, `PipelineSection`, `TierMatrixSection`) | ✅ |
| 3 | `common/Badge.tsx` | 43 | `Badge` | 5 files (9 renderings) | ✅ |
| 4 | `common/Button.tsx` | 73 | `Button` | **nobody** | ⚠️ dead |
| 5 | `common/ScrollToTop.tsx` | 16 | `ScrollToTop` | `Layout` | ✅ |
| 6 | `layout/Layout.tsx` | 47 | `Layout` | `App.tsx` | ✅ |
| 7 | `layout/Navbar.tsx` | 243 | `Navbar` | `Layout` | ✅ |
| 8 | `layout/Footer.tsx` | 211 | `Footer` | `Layout` | ✅ |
| 9 | `home/HeroSlider.tsx` | 183 | `HeroSlider` | `HomePage` | ✅ |
| 10 | `home/MetricsRibbon.tsx` | 56 | `MetricsRibbon` | `HomePage` | ✅ |
| 11 | `home/PartnerGrid.tsx` | 46 | `PartnerGrid` | `HomePage` | ✅ |
| 12 | `home/CapabilitiesGrid.tsx` | 107 | `CapabilitiesGrid` | `HomePage` | ✅ |
| 13 | `home/QualityArchitecture.tsx` | 145 | `QualityArchitecture` | `HomePage` | ✅ |
| 14 | `home/FeaturedCaseStudies.tsx` | 141 | `FeaturedCaseStudies` | `HomePage` | ✅ |
| 15 | `maintenance/PipelineSection.tsx` | 57 | `PipelineSection` | `MaintenancePage` | ✅ |
| 16 | `maintenance/ChecklistSection.tsx` | 101 | `ChecklistSection` | `MaintenancePage` | ✅ |
| 17 | `maintenance/TierMatrixSection.tsx` | 148 | `TierMatrixSection` | `MaintenancePage` | ✅ |
| 18 | `contact/SubmittalForm.tsx` | 421 | `SubmittalForm` | `ContactPage` | ✅ |
| 19 | `contact/DispatchDirectory.tsx` | 136 | `DispatchDirectory` | `ContactPage` | ✅ |

> There are also many *page-local* components defined inline inside the 11 page files. Those are
> documented per page in `pages.md`.

---

## 1. `common/SEO.tsx`

The entire SEO system. **20 lines, two `document` mutations, zero dependencies.**

```tsx
interface SEOProps { title: string; description?: string }

useEffect(() => {
  document.title = `${title} | Vertex Solutions Mechanical Engineering`;
  if (description) {
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', description);
  }
}, [title, description]);
return null;
```

| Aspect | Reality |
|---|---|
| Renders | `null` |
| Title | Always appends `" \| Vertex Solutions Mechanical Engineering"` |
| Description | **Mutates the existing `<meta name="description">` in `index.html` in place.** It never *creates* one, so if you remove that tag from `index.html` descriptions silently stop working. |
| Coverage | **11 of 11 pages** render it, including both detail templates (`title={`${service.title} \| Vertex Solutions`}` / `${study.title}`) |
| Cleanup | **None.** No `useEffect` return, so the previous page's description lingers until the next page mounts. Not observable in an SPA, but it means a hard refresh on a detail page works only because `index.html` has a static fallback. |

> ⚠ **[Real bug] Title-brand doubling.** 6 of the 11 call sites already end in `| Vertex Solutions`,
> so the rendered `<title>` becomes e.g.
> `Documented Case Studies & Portfolio | Vertex Solutions | Vertex Solutions Mechanical Engineering`.
> Affected: `AboutPage`, `CaseStudiesPage`, `CaseStudyDetailPage`, `ContactPage`, `FinancingPage`,
> `NotFoundPage`, `ServiceAreasPage`, `ServiceDetailPage`. Only `HomePage`, `MaintenancePage` and
> `ServicesPage` pass a clean title. Fix when rebuilding: strip a trailing `| Vertex Solutions`
> before appending, or drop the suffix and put the brand in the call sites.

> ⚠ There is **no OG/Twitter/canonical/hreflang/JSON-LD/robots** handling anywhere.

---

## 2. `common/SectionHeader.tsx`

The universal section opener. 7 props: `eyebrow?`, `title`, `description?`, `align?`, `badge?`,
`dark?`, `className?`.

```html
<div class="flex flex-col items-start text-left {className}">
  <div class="inline-flex items-center gap-2 mb-space-sm">          <!-- if eyebrow -->
    <span class="w-2 h-2 rounded-full bg-primary-container shrink-0"></span>
    <span class="font-label-technical text-label-technical tracking-widest uppercase
                 font-semibold text-primary">{eyebrow}</span>
    {badge}
  </div>
  <h2 class="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl
             tracking-tight leading-tight mb-space-sm text-on-surface">{title}</h2>
  <p class="font-body-md sm:font-body-lg max-w-3xl leading-relaxed text-secondary">{description}</p>
</div>
```

| Prop | Behaviour |
|---|---|
| `eyebrow` omitted | The whole eyebrow row disappears (dot + label + badge). |
| `align="center"` | Switches to `items-center text-center`. **Never used in the codebase.** |
| `dark` | `text-inverse-primary` eyebrow, `text-white` h2, `text-surface-dim` description. **Never used.** |
| `badge` | Renders after the eyebrow text, inline. **Never used.** |
| `className` | The common usage is `mb-12` or `max-w-4xl`. |

**Used in 13 places:** `ServicesPage`, `CaseStudiesPage` ×2, `ServiceAreasPage`, `FinancingPage` ×2,
`AboutPage`, `PipelineSection`, `ChecklistSection`, `TierMatrixSection`, `CapabilitiesGrid`,
`QualityArchitecture`, `FeaturedCaseStudies`.
**Imported but unused in 3:** `ContactPage`, `MaintenancePage`, `ServiceDetailPage` (these 3 are
part of the 25 typecheck errors).

---

## 3. `common/Badge.tsx`

Small monospace chip. 2 sizes × 4 variants, plus a pulse dot.

| Prop | Default | Values |
|---|---|---|
| `variant` | `neutral` | `neutral` · `crimson` · `dark` · `success` |
| `size` | `md` | `sm` (`text-[10px] px-2 py-0.5`) · `md` (`text-label-mono-sm px-2.5 py-1`) |
| `hasPulse` | `false` | renders a 1.5px `animate-ping` + solid dot pair — **⚠ never passed by any of the 9 usages, so the codebase's only `animate-ping` never renders** |
| `className` | `''` | appended |

Base: `inline-flex items-center gap-1.5 font-label-mono-sm uppercase rounded tracking-wider`.

Measured usage: **9 renderings across 5 files** — `Footer` ×5 (`neutral`), `FeaturedCaseStudies`,
`CaseStudiesPage`, `CaseStudyDetailPage`, `ServicesPage` ×1 each (`dark`). No call site passes
`size` or `hasPulse`, so the `sm` size branch and the entire pulse-dot branch are dead.

| Variant | Classes | Where |
|---|---|---|
| `neutral` | `bg-surface-container-low text-secondary border border-structural` | Footer cert band ×5 |
| `dark` | `bg-inverse-surface/80 text-inverse-on-surface border border-white/10 backdrop-blur-sm` | sector badge over images (`ServicesPage`, `CaseStudiesPage`, `CaseStudyDetailPage`), `FeaturedCaseStudies` |
| `crimson` | `bg-[#ffdad8] text-primary border border-[#e5bdbb] font-semibold` | **Never used** — the crimson chips are hand-written instead |
| `success` | `bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]` | **Never used** |

> Hand-rolled equivalents of the unused `crimson` variant exist in 5 places:
> `text-primary bg-[#ffdad8] px-2 py-0.5 rounded font-semibold` — in `QualityArchitecture`
> (PE license), `DispatchDirectory` (SLA < 4 Hours), `ServiceAreasPage` (hub code),
> `ContactPage` (PE license), `FeaturedCaseStudies`/`SubmittalForm` (`REV 4.2`).
> **Refactor opportunity:** use `Badge variant="crimson"` instead.

---

## 4. `common/Button.tsx` — DEAD CODE

A complete, well-built polymorphic button (5 variants × 3 sizes, `to`/`href`/`<button>` polymorphism,
left/right icon slots) that **nothing imports**. Every button on the site is hand-written.

Variants: `primary` (crimson, `shadow-sm hover:shadow active:bg-[#8E0B20]`), `secondary`
(white + `border-structural hover:border-on-surface`), `ghost` (transparent + hover fill),
`dark-outline` (`bg-white/10 backdrop-blur-sm border-white/25`), `dark-solid` (white, bold).
Sizes: `sm` `px-3.5 py-1.5 text-[13px]`, `md` `px-5 py-2.5 text-[14px]`,
`lg` `px-6 py-3.5 text-[15px]`.
Base: `inline-flex items-center justify-center font-button-text transition-all duration-150
rounded-lg select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer`.
External `href`s get `target="_blank" rel="noopener noreferrer"` (correct).

> **[REUSABLE — keep this file when rebuilding, then actually use it.]** It is the single best
> abstraction in the repo. Migrating the ~40 hand-written buttons onto it is a pure-win refactor
> that changes no visual output. Note `duration-150` here vs the `transition-colors` (default 150ms)
> used inline — they are equivalent.

---

## 5. `common/ScrollToTop.tsx`

```tsx
const { pathname } = useLocation();
useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
```

16 lines, renders `null`. Mounted once in `Layout` **above** the `<Navbar />`.

> ⚠ **Interacts badly with Lenis.** `Layout` initialises Lenis, which takes over scrolling and
> maintains its own internal `targetScroll`. Calling native `window.scrollTo` on route change can
> leave Lenis's internal state out of sync, producing a visible snap or a "scroll jumps back"
> glitch on deep navigation. The correct fix is `lenis.scrollTo(0, { immediate: true })`.
> `ScrollToTop` is currently a sibling of the Lenis instance, not a child, so it has no access to
> it — the two are architecturally coupled but not actually wired together.
> Also note it keys on `pathname` only, so `?tier=` / `?service=` changes do not reset scroll
> (which is the desired behaviour here).

---

## 6. `layout/Layout.tsx`

```tsx
<div className="flex flex-col min-h-screen bg-surface-container-lowest text-on-surface">
  <ScrollToTop />
  <Navbar />
  <main className="flex-1 w-full pt-[72px] sm:pt-[104px]"><Outlet /></main>
  <Footer />
</div>
```

- **`min-h-screen` + `flex-1` on `<main>`** is what keeps the footer at the bottom on short pages
  (e.g. `/financing`, `/about`) instead of floating mid-viewport.
- **The `pt-[72px] sm:pt-[104px]` offset is hardcoded** and must equal the navbar's real height:
  32px utility strip (`hidden sm:block`) + 72px main bar. **Change one, change both.** The
  original `DESIGN.md` says 76px and is wrong.
- Lenis config: `duration: 1.1`, `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
  (expo-out), `orientation: 'vertical'`, `smoothWheel: true`. Driven by a self-rescheduling
  `requestAnimationFrame` loop; cleanup cancels the frame id and calls `lenis.destroy()`.
- ⚠ The RAF loop is created inside the `useEffect` but there is **no `lenis.stop()` on route
  change** and no `lenis.scrollTo` for hash/in-page anchors. Lenis also does not coordinate with
  the `html { scroll-behavior: smooth }` rule in `index.css` (they conflict; Lenis wins).

---

## 7. `layout/Navbar.tsx` — the most complex component (243 lines)

Three local `useState` hooks: `isMobileMenuOpen`, `isServicesOpen`, `isScrolled`.
Three `useEffect`s: reset both menus on `pathname` change; attach/detach a `scroll` listener that
sets `isScrolled = window.scrollY > 20`.

### 7.1 Utility strip — `hidden sm:block`, `h-8`

`bg-surface-container-low border-b border-structural px-margin lg:px-margin-desktop`, inner
`max-w-[1320px] flex items-center justify-between font-label-mono-sm text-label-mono-sm text-secondary`.

- Left: `w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse` + `Midwest Regional
  Engineering (IN · OH · KY) • Lic #HVAC-MECH-48209`
- Right: `24/7 Commercial Dispatch:` + `tel:8005550194` in `text-on-surface font-medium
  hover:text-primary`

> Below 640px the strip disappears entirely — hence the `sm:pt-[104px]` pairing in `Layout`.

### 7.2 Main bar — `h-[72px]`, `fixed` via the parent `<header>`

`<header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-structural
transition-shadow duration-200">` with `isScrolled && 'shadow-xs'` on the inner bar.

**Logo (left).** `<Link to="/">` → `w-8 h-8 rounded bg-primary-container text-white
group-hover:bg-primary` containing an inline 24×24 SVG, `stroke-width 2.5`, path
`M12 2L2 22h20L12 2zm0 6l4.5 10H7.5L12 8z` — a hollow triangle with an inner notch, i.e. a
stylised **"V" for Vertex**. Wordmark: `font-headline-sm text-headline-sm uppercase tracking-tight
text-on-surface leading-none` = "Vertex Solutions". Sub-line:
`xl:hidden font-label-mono-sm text-[10px] text-secondary uppercase tracking-widest mt-0.5` =
"Mechanical & Industrial HVAC".

> **[BRAND-SPECIFIC]** The logo is a hand-drawn inline SVG with no `<title>`/`<svg>` title and no
> accessible name beyond the link's text content. A rebuild should supply an accessible name.

**Desktop nav — `hidden xl:flex items-center gap-6 h-full`.** 7 links from the inline `navLinks`
array (`Navbar.tsx:25–33`). Each is `h-full inline-flex items-center border-b-2 font-button-text
text-button-text transition-colors` with:
- active → `text-on-surface border-primary-container font-semibold`
- idle → `text-secondary hover:text-on-surface border-transparent`
- the Services link additionally force-activates on `location.pathname.startsWith('/services')`
  so sub-pages keep the parent highlighted.

**CTA cluster.** `<Link to="/contact">` crimson `px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg
text-[13px] sm:text-[14px] shadow-none` labelled **Request Consultation**, then the hamburger
`xl:hidden p-2 rounded-lg` with `aria-label="Toggle mobile menu"` and `Menu`/`X` at `w-6 h-6`.

### 7.3 Services mega dropdown

Opened by `onMouseEnter`/`onMouseLeave` on a `relative h-full flex items-center` wrapper.

```html
<div class="absolute top-[71px] left-1/2 -translate-x-1/2 w-[540px] bg-white
            border border-structural rounded-lg shadow-xl p-4 grid grid-cols-2 gap-2 z-50
            animate-in fade-in slide-in-from-top-1 duration-150">
```

- `top-[71px]` is 1px above the 72px bar so the dropdown visually detaches from the header edge.
- Header row `col-span-2 pb-2 mb-1 border-b border-structural`: `COMMERCIAL HVAC DISCIPLINES` +
  `View All Services →` (`text-primary hover:underline font-semibold`).
- 6 items iterated from `SERVICES` (shared with the services index — no duplicate nav config):
  `p-2.5 rounded-md hover:bg-surface-container-low` → crimson 1.5px dot (which
  `group-hover:scale-125`), `shortTitle` (`text-[13px] font-semibold group-hover:text-primary`),
  and `summary` clamped to `line-clamp-1` at `text-[11px] text-secondary ml-3.5`.

> ⚠ **Three defects:** (a) hover-only — no `onClick`, no `onFocus`, no `Escape`, no
> `aria-expanded`/`aria-haspopup`, so it is unusable by keyboard or touch; (b) the
> `ChevronDown` carries `group-hover:rotate-180` but no `group` class is ever applied to the
> `NavLink`, so the chevron never rotates; (c) `animate-in fade-in slide-in-from-top-1` are
> **`tailwindcss-animate` classes that do not exist** — the dropdown appears instantly with no
> transition (see `motion-and-interactions.md`).

### 7.4 Mobile drawer — `xl:hidden`, only when `isMobileMenuOpen`

`bg-white border-b border-structural px-margin py-6 shadow-2xl animate-in
slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto`. Four stacked blocks:

1. **Dispatch callout** — `bg-surface-container-low p-3 rounded-lg border border-structural
   font-label-mono-sm text-[12px] flex items-center justify-between`, pulsing crimson dot,
   `24/7 Dispatch Hotline`, and `tel:8005550194` in `text-primary font-semibold`.
2. **7 nav items** — `py-2.5 px-3 rounded-lg font-button-text text-[15px]`, each with a
   right-hand `<ArrowRight className="w-4 h-4 opacity-50" />`; active →
   `bg-surface-container-low text-primary font-semibold`.
3. **`Core HVAC Services`** — `pt-2 border-t border-structural`, label
   `font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary`, then a
   `grid grid-cols-1 sm:grid-cols-2 gap-1.5` of the same 6 `SERVICES` as
   `py-2 px-3 rounded text-[13px]` rows with a crimson dot.
4. **Two full-width CTAs** — `Schedule Site Assessment` (crimson) and
   `Call Emergency Line (800) 555-0194` (`bg-surface-container-low border border-structural` with
   a crimson `Phone`).

> ⚠ **Defects:** the drawer is **not a dialog** — no `role="dialog"`, no `aria-modal`, no focus
> trap, no `Escape` handler, no scroll lock, and focus is not moved into it on open. Because
> `max-h-[85vh] overflow-y-auto` applies to a non-scrolling-positioned element that is not
> `position: fixed`, long menus can be clipped by the viewport rather than scrolling. Closing is
> only possible via the toggle, a nav click (the `pathname` effect), or a scroll out of the
> hover area. `shadow-2xl` on a non-fixed panel also reads oddly.

---

## 8. `layout/Footer.tsx` — 211 lines

`bg-surface-container-low border-t border-structural text-secondary font-body-sm text-body-sm`.

### 8.1 Directory grid — `grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12`

| Span | Column | Contents |
|---|---|---|
| `lg:col-span-4` | Brand | Logo + wordmark (`Mechanical Engineering Corp.`), a `max-w-sm` paragraph, then a `pt-2 border-t border-structural` contact block of 3 rows: `MapPin` address, `Phone` `tel:8005550194`, `Mail` `estimating@vertexsolutionshvac.com` — each `text-on-surface font-label-mono-sm text-[12px]` with a crimson `w-4 h-4` icon |
| `lg:col-span-3` | Mechanical Services | 6 `<Link>`s → specific service detail routes (`space-y-2 font-body-sm`) |
| `lg:col-span-3` | Engineering Protocols | 6 non-link rows, each `flex items-center gap-2` with a `w-1.5 h-1.5 rounded-full bg-primary-container` dot |
| `lg:col-span-2` | Company & Trust | 6 `<Link>`s; the last (`Request Intake Form →`) is `font-semibold text-primary` |

### 8.2 Certification band — `mt-12 pt-8 border-t border-structural flex flex-col lg:flex-row`

A `max-w-xl` block (`Regional Coverage & Response SLA` + a paragraph naming 6 hubs) beside 5
`<Badge variant="neutral">` items: `ASHRAE 90.1`, `NEBB TAB`, `OSHA 30`, `EPA UNIVERSAL`, `ASME IV`.

### 8.3 Legal sub-footer — `bg-surface-container border-t border-structural py-4`

`© {new Date().getFullYear()} Vertex Solutions Mechanical Engineering Corporation. Lic
#HVAC-MECH-48209. All rights reserved.` beside 3 links separated by `•`: `Safety Protocols` (→`/about`),
`Engineering Licensure` (→`/about`), `Commercial Confidentiality / NDA` (→`/contact`).

> ⚠ **There is no `/privacy` and no `/terms` route.** A real deployment must add them. The
> footer's three legal links are navigational placeholders.
> ⚠ `Footer` reads `4200 Precision Way, Suite 800, Indianapolis, IN 46240` while
> `DispatchDirectory` reads `4820 Innovation Parkway, Suite 100, Indianapolis, IN 46268` — see
> `content-structure.md` §6.

---

## 9. `home/HeroSlider.tsx` — 183 lines

The site's signature component. `<section className="relative w-full min-h-[660px] lg:min-h-[740px]
flex flex-col justify-between overflow-hidden bg-inverse-surface text-inverse-on-surface
select-none">`.

**Layer stack (bottom → top):**

1. `absolute inset-0 z-0 overflow-hidden` — all 5 slides rendered simultaneously, each
   `absolute inset-0 transition-opacity duration-1000 ease-in-out` +
   `opacity-100` / `opacity-0 pointer-events-none`. The `<img>` gets `kenburns-active` only when active.
2. Two scrims, both `absolute inset-0 z-1 pointer-events-none`:
   - `bg-gradient-to-r from-inverse-surface/95 via-inverse-surface/85 to-inverse-surface/40`
   - `bg-gradient-to-t from-inverse-surface via-transparent to-inverse-surface/50`
3. Progress bar `absolute top-0 left-0 right-0 h-1 bg-white/15 z-30` with an inner
   `bg-primary-container transition-all duration-300` whose `width` is
   `((currentSlide + 1) / 5) * 100%` set inline.
4. Content `relative z-10 max-w-[1320px] … pt-16 sm:pt-20 lg:pt-24 pb-12 flex-1 flex flex-col
   justify-center`, inner `max-w-3xl`.
5. Tab bar `relative z-20 w-full bg-inverse-surface/85 backdrop-blur-md border-t border-white/10`.

> ⚠ **`z-1` is not a Tailwind class** (the default scale is 0/10/20/30/40/50) and the config adds
> no `zIndex` extension. Both scrims therefore have **no z-index** and only paint above the images
> by DOM order. It works, but it is load-bearing-by-accident. **4 occurrences of `z-1` in the
> codebase** — `HeroSlider` ×2 (gradient scrim + Ken Burns frame), `ServiceDetailPage`, and
> `CaseStudyDetailPage`.
> Use `z-10` for the scrims and bump the content to `z-20` / tabs to `z-30` in a rebuild.

**Content block.** Eyebrow pill `inline-flex items-center gap-2 mb-space-md bg-inverse-surface/80
border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm` containing an
`animate-pulse w-2 h-2 rounded-full bg-primary-container` dot and the `SPEC nn // …` string in
`text-inverse-primary`. Then `<h1>` at
`font-display-xl-mobile sm:font-headline-lg lg:font-display-xl` with `min-h-[90px] sm:min-h-[140px] flex items-center`
and `transition-all duration-300` (the reserved heights stop the crossfade from jumping), then a
`max-w-2xl mb-space-xl min-h-[60px]` subhead in `text-surface-dim`, then two CTAs:
`Request Technical Consultation` (crimson, `shadow-lg`, `ArrowRight`) and
`View Commercial Projects` (`bg-white/10 border border-white/30 backdrop-blur-sm`, `Layers`).

**Tab bar.** `flex items-center gap-1.5 sm:gap-3 overflow-x-auto w-full md:w-auto scrollbar-none py-1`
containing 5 `<button>`s, each `px-3 py-1.5 rounded-lg font-label-mono-sm text-label-mono-sm
transition-all duration-200 text-left whitespace-nowrap border-l-2`:
- selected → `bg-white/15 text-white border-primary-container font-semibold` + number in `text-inverse-primary font-bold`
- idle → `text-surface-dim hover:text-white hover:bg-white/5 border-transparent`

> ⚠ `scrollbar-none` is **not defined anywhere** (no plugin), so the overflow strip keeps the
> browser's default scrollbar. The 6px custom `::-webkit-scrollbar` in `index.css` is a WebKit-only
> rule with **no `scrollbar-width`/`scrollbar-color` Firefox fallback**.

**Autoplay.** `setInterval(nextSlide, 7000)` re-created on every `currentSlide` change (dependency
array `[currentSlide]`), cleared on unmount. `nextSlide` wraps with `(prev + 1) % 5`. There is
**no** pause-on-hover, no `prefers-reduced-motion` guard, no touch/swipe support, and no
`aria-live`/pause button — an accessibility gap on an auto-rotating region.

---

## 10. `home/MetricsRibbon.tsx` — 56 lines

`w-full bg-surface-container-low border-b border-structural py-8 px-margin lg:px-margin-desktop`,
inner `grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8`.

Four hard-coded metrics, each `flex flex-col border-l-2 border-structural pl-4 py-1`:

| Value | Label | Detail | Highlight |
|---|---|---|---|
| `240+` | Turnkey Builds | Midwest Commercial Plants | no |
| `96.4%` | SLA Retention | Multi-Year Service Accounts | no |
| `2 HR` | Midwest Dispatch | Guaranteed Emergency SLA | **yes** |
| `0.00` | EMR Incident Rate | Zero Lost-Time Incidents | no |

Value: `font-display-xl-mobile sm:font-headline-lg lg:font-display-xl leading-none tracking-tight`
→ `text-primary` if highlighted, else `text-on-surface`. Label:
`font-label-mono-sm text-label-mono-sm uppercase text-on-surface font-semibold mt-2`. Detail:
`font-body-sm text-[12px] text-secondary mt-0.5`.

> The identical 4-metric pattern (with crimson `border-l-2`) is re-implemented in
> `QualityArchitecture` (3 cells, `border-primary-container`), `CaseStudiesPage`, and
> `CaseStudyDetailPage` — **4 copies of the same markup, 0 shared component.** Prime refactor
> candidate.

---

## 11. `home/PartnerGrid.tsx` — 46 lines

`bg-white border-b border-structural py-12 px-margin lg:px-margin-desktop`, then
`flex flex-col md:flex-row items-start md:items-center justify-between gap-6`.

- Left `shrink-0 max-w-xs`: `OEM Integration` eyebrow, `<h3>Authorized Factory Partners</h3>`,
  a `text-[13px]` sub-line.
- Right `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full` — 6 tiles
  `bg-surface-container-low border border-structural p-3.5 rounded-lg flex flex-col items-center
  justify-center text-center hover:border-on-surface transition-all group` with a
  `text-[18px] font-bold` name (`group-hover:text-primary`) and a `text-[10px] line-clamp-2` spec.

> [BRAND-SPECIFIC] The 6 tiles are text-only brand names (Carrier, Trane, Daikin, Bosch,
> York / JCI, Lennox). **No logo images are used** — deliberately, to avoid trademark-art
> licensing. A rebuild should keep text-only treatment.

---

## 12. `home/CapabilitiesGrid.tsx` — 107 lines

`bg-surface-container-lowest py-16 lg:py-24 … border-b border-structural`.

Header row: `flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6` →
`SectionHeader eyebrow="ENGINEERED DISCIPLINES" title="Mechanical Capabilities"` beside a tertiary
`View All Engineering Services →` link.

Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` — 4 cards, each
`bg-white border border-structural p-6 rounded-lg flex flex-col justify-between
hover:border-on-surface hover:-translate-y-0.5 transition-all duration-200 group shadow-xs
hover:shadow-md`.

Card anatomy: header `flex items-center justify-between mb-6 pb-4 border-b` with
`{number} / {tag}` in mono uppercase and a `w-8 h-8 rounded bg-surface-container-low` icon tile
holding a `w-5 h-5 text-primary` Lucide icon; `<h3 class="font-headline-sm text-[20px]
group-hover:text-primary">`; a `font-body-sm text-secondary leading-relaxed mb-6` description; then
`pt-4 border-t flex items-center justify-between` with a `bg-surface-container-low px-2 py-0.5
rounded` mono spec chip and a `Learn More →` tertiary link.

> The 4 items map to `/services/commercial-hvac`, `/services/ac-repair`, `/maintenance-plans`,
> `/services/emergency-hvac-service`; icons `Wrench`, `RefreshCw`, `Activity`, `AlertTriangle`.
> Note this is the **only** card that uses `hover:-translate-y-0.5`, and the only one that uses
> `rounded-lg` rather than `rounded-xl`.

---

## 13. `home/QualityArchitecture.tsx` — 145 lines

`bg-surface-container-low py-16 lg:py-24 … border-b`, inner
`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start`.

- **Left `lg:col-span-7 flex flex-col gap-6`** — `SectionHeader eyebrow="INSTITUTIONAL RIGOR"
  title="Quality Architecture & Field Discipline"`, then a 3-cell telemetry strip
  (`grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-lg border`, each cell
  `border-l-2 border-primary-container pl-3` with `15.2 Yrs` / `100%` / `NEBB TAB`), then
  `space-y-4 pt-2` of **3 pillar rows**: `flex items-start gap-3.5 bg-white p-4 rounded-lg
  border border-structural`, a `w-7 h-7 rounded bg-surface-container-low` icon tile
  (`UserCheck`, `CheckCircle2`, `ShieldCheck` at `w-4 h-4 text-primary`), an `<h4>` numbered
  `1.`–`3.`, and a 14px paragraph.
- **Right `lg:col-span-5`** — the directorate card
  `bg-white border border-structural p-8 rounded-xl shadow-xs`: a header row with
  `Engineering Directorate` + a hand-rolled crimson chip `PE License: #PE-104928-IN`; a
  `w-16 h-16 rounded-lg bg-surface-container` avatar tile showing the initials `RK`; name,
  title, and credentials; an italic `<blockquote>` on `bg-surface-container-low p-4 rounded-lg
  border`; a 3-item credentials list with crimson dots; and a tertiary `Read Full Engineering
  Credentials →` link to `/about`.

> [BRAND-SPECIFIC] **Robert Keller, P.E.**, `#PE-104928-IN`, "Purdue B.S. Mechanical Engineering ·
> 22+ Years", "ASHRAE Distinguished Lecturer (Central Plants)", "ASME Boiler and Pressure Vessel Code
> Committee Member", and the pull-quote are all invented identity content. The **same P.E. name,
> licence and pull-quote are repeated verbatim on `AboutPage` and `ContactPage`** — there is no
> shared constant, so all three copies must be edited together in a rebrand.

---

## 14. `home/FeaturedCaseStudies.tsx` — 141 lines

`bg-white py-16 lg:py-24 … border-b`. Header row identical in shape to `CapabilitiesGrid`
(`md:items-end justify-between mb-12`) with `eyebrow="DOCUMENTED PERFORMANCE"` and a
`Explore All 240+ Deployments →` link.

`CASE_STUDIES.slice(0, 3)` in a `grid grid-cols-1 md:grid-cols-3 gap-8`. Each card:
`bg-surface-container-lowest border border-structural rounded-xl overflow-hidden flex flex-col
group hover:border-on-surface hover:shadow-lg transition-all duration-200`.

- Image well `relative h-56 w-full overflow-hidden bg-surface-dim`, `img` with
  `transition-transform duration-500 group-hover:scale-105`, `<Badge variant="dark">` sector tag
  at `top-3 left-3`, and a `text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded
  backdrop-blur-sm` year chip at `bottom-3 right-3`.
- Body `p-6 flex-1 flex flex-col justify-between`: a `MapPin`-led meta row
  (`location • facilityFootprint`), an `<h3>`, a `line-clamp-3` overview, then a
  `pt-4 border-t` telemetry bar — `grid grid-cols-2 gap-3 mb-4 bg-surface-container-low p-2.5
  rounded-lg` with the primary metric in `text-on-surface` and the secondary in `text-primary` —
  and a `View Dossier & Equipment Schedule →` tertiary link.

Then a full-width **CTA box** `mt-16 bg-surface-container-low border border-structural rounded-xl
p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8`:
`Proactive Asset Protection` eyebrow, an `<h3>`, a `max-w-2xl` paragraph, and two buttons
(`Schedule a Facility Assessment` crimson + `Speak with an Engineer: (800) 555-0194` with a
crimson `Phone`).

> ⚠ **Bug:** the card's CTA is `to={`/case-studies`}` — a bare template literal with no
> interpolation, so **all three "View Dossier" links go to the index**, not to
> `/case-studies/${study.slug}`. Should be `to={`/case-studies/${study.slug}`}`.
> (`CaseStudiesPage` links correctly.)
> ⚠ `alt={study.title}` is used, so the alt text is a good one — but the images have no
> `width`/`height` and no `loading` attribute.

---

## 15. `maintenance/PipelineSection.tsx` — 57 lines

`bg-white py-16 lg:py-20 … border-b`. `SectionHeader eyebrow="EXECUTION PIPELINE" title="6-Step
Mechanical Execution Pipeline" className="mb-12"`, then
`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` over `MAINTENANCE_PIPELINE` (6 items).

Each card `bg-surface-container-lowest border border-structural p-6 rounded-xl flex flex-col
justify-between hover:border-on-surface hover:shadow-md transition-all duration-200 group`:
header `flex items-center justify-between pb-3 mb-4 border-b` with the step number in
`font-display-xl-mobile text-primary font-bold leading-none` and a phase chip; an `<h3>`; a
description; then a `pt-4 border-t flex flex-col gap-1.5 font-label-mono-sm text-[11px]` block of
two `justify-between` rows — `Deliverable:` / `Testing Standard:` (the latter in `text-primary`).

> [HVAC-TEMPLATE] **This is the reusable "process proof" section** for any service business:
> numbered step → deliverable → the standard it is measured against. It is the backbone of the
> maintenance page and could be lifted into any services site.

---

## 16. `maintenance/ChecklistSection.tsx` — 101 lines

`bg-surface-container-low py-16 lg:py-20 … border-b`. Two pieces of state: `checkedItems:
number[]` and a `toggleCheck(id)` / `markAll()` pair. `markAll` toggles between "all" and "none".

Header: `flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6` with
`SectionHeader eyebrow="FACILITY READINESS" title="Pre-Maintenance Intake Checklist"`, beside a
text `<button>` that reads `Select All Checkpoints` / `Deselect All Checkpoints`
(`font-label-mono-sm text-[12px] uppercase text-primary font-semibold`).

Grid `grid grid-cols-1 md:grid-cols-2 gap-4` over 7 `READINESS_CHECKLIST` items. Each row is a
**`<div onClick>`** (not a button):

```html
<div class="p-5 rounded-lg border transition-all cursor-pointer flex items-start gap-4 select-none
            bg-white border-on-surface shadow-xs">            <!-- checked -->
<div class="p-5 rounded-lg … bg-white/80 border-structural hover:bg-white
            hover:border-structural-dim">                    <!-- unchecked -->
  <div class="w-[18px] h-[18px] rounded-[3px] border mt-1 … bg-primary-container
              border-primary-container text-white">          <!-- checked -->
    <Check class="w-3.5 h-3.5 stroke-[3]" />
  </div>
  <div class="flex-1">
    <div class="flex items-center justify-between gap-2 mb-1">
      <span class="font-headline-sm text-[16px] font-semibold">{id}. {title}</span>
      <span class="font-label-mono-sm text-[10px] uppercase tracking-wider bg-surface-container-low
                   px-2 py-0.5 rounded shrink-0">{tag}</span>
    </div>
    <p class="font-body-sm text-secondary text-[13px]">{description}</p>
  </div>
</div>
```

**Progress meter** `mt-8 bg-white border border-structural p-4 rounded-lg flex flex-col
sm:flex-row items-center justify-between gap-4 font-label-mono-sm text-[12px]`:
a crimson `CheckCircle2 w-5 h-5`, `Facility Verification Status: **{n} of 7 Checkpoints
Confirmed**`, and a right-hand status that reads `✓ Ready for Immediate Priority Dispatch` when
complete, else `Provide items during submittal review`.

> ⚠ **Accessibility defect:** the rows are `<div onClick>` with no `role="checkbox"`,
> no `aria-checked`, no `tabIndex`, no `onKeyDown`, and no `<input>`. Completely unreachable by
> keyboard and invisible to assistive tech. The progress meter is also not announced
> (`aria-live` absent), so the count change is silent for screen-reader users.
> **Fix in a rebuild:** use `<button type="button" role="checkbox" aria-checked={isChecked}>`, or a
> real `<input type="checkbox" className="sr-only peer">` with a `peer-checked:` visual.
>
> [REUSABLE] The interactive "readiness checklist with a live N-of-M meter" is a strong
> non-gated engagement device for any technical B2B service. Keep the idea, fix the a11y.

---

## 17. `maintenance/TierMatrixSection.tsx` — 148 lines

`bg-white py-16 lg:py-24 … border-b`. `SectionHeader eyebrow="SERVICE AGREEMENTS" title="Tiered
Maintenance Agreement Matrix" className="mb-12"`.

**Tier cards** — `grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20` over
`MAINTENANCE_TIERS` (3). Each `rounded-xl border flex flex-col justify-between p-8
transition-all duration-200`:

| State | Classes |
|---|---|
| `isPopular` | `bg-surface-container-lowest border-primary-container shadow-xl ring-1 ring-primary-container relative` |
| normal | `bg-surface-container-lowest border-structural shadow-xs hover:border-structural-dim` |

The popular card also renders an absolutely-positioned ribbon
`absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary
font-label-mono-sm text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold
shadow-sm` reading **Most Popular Scope**.

Body: header row (`{tierNumber}` + an `slaBadge` chip in `text-primary
bg-surface-container-low px-2.5 py-1 rounded`), `<h3 class="font-headline-md font-bold">`, the
tagline, a `bg-surface-container-low p-4 rounded-lg border font-label-mono-sm text-[12px]
space-y-2` inset with `Cadence:` / `Arrival Window:` `justify-between` rows, then
`Core Inclusions:` with 4 items, each a `w-4 h-4 rounded bg-surface-container-low` tile holding a
`Check w-3 h-3 stroke-[2.5] text-primary`.

Footer CTA is a full-width `<Link to={`/contact?tier=${tier.id}`}>`:
`w-full py-3 rounded-lg font-button-text text-center font-semibold text-[14px]` — crimson when
popular, else `bg-white hover:bg-surface-container text-on-surface border border-structural`.

**FAQ accordion** — `max-w-4xl mx-auto pt-8 border-t border-structural`, header row with a crimson
`HelpCircle w-5 h-5`, `<h3>Frequently Asked Technical Questions</h3>`, and a right-aligned
`REV 2024.3 // ASHRAE 90.1` mono label. State is `openFaq: number | null` initialised to **`0`**
(first item open). Each item is `border border-structural rounded-lg overflow-hidden
bg-surface-container-lowest`; the header is a real `<button class="w-full p-5 text-left flex
items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">` with
`{index + 1}. {question}` and a `ChevronUp` (crimson) / `ChevronDown` (secondary) at `w-4 h-4`.
The panel renders only when open.

> ⚠ **Bug:** the panel uses `border-t border-structural/50 bg-surface-container-low/50`.
> `bg-surface-container-low/50` works (it is a real Tailwind colour utility), but
> **`border-structural/50` generates no CSS** — `.border-structural` is a hand-written class in
> `index.css`, not a Tailwind colour, so Tailwind cannot synthesise an opacity variant. The
> `border-t` therefore falls back to `border-color: currentColor` and renders a **dark
> `#191c1d` 1px line** instead of a 50% `#e2e4e8`. Visible defect in the open FAQ panel.
> ⚠ No `aria-expanded` / `aria-controls` on the accordion buttons, and no `role="region"` on the
> panels.

---

## 18. `contact/SubmittalForm.tsx` — 421 lines

The conversion endpoint. Full detail in `forms-and-conversion.md`. Summary of structure:

- Outer `div className="bg-white p-6 sm:p-10 rounded-xl border border-structural shadow-sm relative"`.
- Header block `flex items-center justify-between pb-space-md mb-space-lg bg-surface-container-low
  p-4 rounded-lg border border-structural`: stacked `Protocol Intake` (mono uppercase) +
  `Submittal Specification Form` (`font-headline-sm text-headline-sm`), plus a
  `REV 4.2` chip (`font-label-mono-sm px-2.5 py-1 bg-surface-container-lowest rounded
  text-secondary border border-structural`).
- **Three mutually exclusive states:** error banner → form → confirmation panel, driven by
  `isSubmitting`, `submittedTicket`, `errorMessage`.
- Uses **none** of the shared `Button`/`Badge`/`SectionHeader` primitives; every control is
  hand-written.

---

## 19. `contact/DispatchDirectory.tsx` — 136 lines

`space-y-6` wrapper around two cards.

**Fast-Track Directory card** `bg-white p-6 sm:p-8 rounded-xl border border-structural shadow-sm
space-y-6`, header row with `Fast-Track Directory` and a hand-rolled crimson `SLA < 4 Hours` chip,
then a `space-y-4 font-body-sm` stack of 4 blocks:

1. **Hotline** — the only "spec-table" block:
   `bg-surface-container-low p-4 rounded-lg border border-structural flex items-start gap-3.5`
   with a `w-8 h-8 rounded-full bg-primary-container text-white` `Phone` tile, a mono uppercase
   label, a `font-headline-sm text-[20px] font-bold` `tel:8005550194` link, and a
   `text-[12px] text-secondary` SLA sub-line.
2. **Estimating desk** — `flex items-start gap-3 pt-2`, crimson `Phone w-4 h-4`, label +
   `tel:3175550140` in `text-on-surface font-semibold hover:text-primary`.
3. **Inboxes** — crimson `Mail`, then two `mailto:` links stacked:
   `estimating@vertexsolutionshvac.com` (`text-primary hover:underline font-medium`) and
   `service@vertexsolutionshvac.com` (`text-secondary hover:text-on-surface`).
4. **Address** — crimson `MapPin` + `4820 Innovation Parkway, Suite 100, Indianapolis, IN 46268`
   + `Serving IN, OH, KY regional territory`.
5. **Hours** — crimson `Clock` + `Mon–Fri 7:00 AM – 5:00 PM EST` +
   `(Continuous 24/7 on-call field operations 365 days/year)`.

**Tri-State Dispatch Hubs card** `bg-surface-container-low p-6 rounded-xl border
border-structural space-y-4` — three state blocks (`INDIANA:` / `OHIO:` / `KENTUCKY:` in
`text-primary font-bold` mono) each listing cities on a `text-[11px] text-secondary` line.
**It is not linked to `serviceAreasData.ts`** — the city lists are re-typed by hand here, which is
the second source of the address/city duplication problem.

> [REUSABLE] The "fast-track directory" card is a strong conversion pattern: the phone number is
> the visually largest element on the whole right column. Keep that hierarchy in any rebuild.
