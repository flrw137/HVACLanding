# UI Rules

> The rules a contributor must follow to keep new UI indistinguishable from the existing UI.
> Every rule here is derived from an observable pattern in the shipped code, not from taste.

---

## 1. Layout rules

1. **One container, everywhere.** Every top-level section uses exactly:
   `w-full … px-margin lg:px-margin-desktop` on the `<section>`, and
   `max-w-[1320px] mx-auto` on the single inner div. Never add a second wrapper, never nest two
   containers, never put a max-width on the `<section>` itself.
2. **Horizontal gutters only jump at `lg`.** 16px below 1024px, 48px at ≥1024px. There is no `sm:`
   or `md:` gutter step. If you need intermediate padding, use `py-*` not `px-*`.
3. **Vertical section rhythm is 64px base.** Every `<section>` that holds content uses
   `py-16` and escalates to `lg:py-20` or `lg:py-24`. A section that uses `py-12` is
   *deliberately* compressed and must be a thin banner/CTA, not a content block.
4. **Page-header sections are asymmetric:** `pt-16 pb-12 lg:pt-20 lg:pb-16`.
5. **The hero is asymmetric:** `pt-16 sm:pt-20 lg:pt-24 pb-12`.
6. **Every section except the last on a page carries `border-b border-structural`.** This is the
   primary visual separator. Never separate sections with whitespace alone.
7. **Grids collapse to 1 column below `lg`.** Use `grid-cols-1 lg:grid-cols-N`. A bare
   `grid-cols-2` or `grid-cols-3` at the base breakpoint is only acceptable for
   *small equal-ratio tiles* (metrics, stat cells) — never for text blocks.
8. **12-column splits start at `lg` and use `gap-12` with `items-start`.** The standard editorial
   split is 8/4. The asymmetric splits in use are 8/4, 7/5, 4/8.
9. **Never use `justify-between` on a card whose two children can wrap.** The pattern
   `flex items-center justify-between` is reserved for label/value pairs inside a fixed-width
   inset box (spec rows, metric bars, footer column headers).

---

## 2. Section-opening rule (the brand signature)

**Every** content section opens with the same three-part header. This is non-negotiable and it is
what makes the site read as one document rather than a pile of divs.

```html
<div class="inline-flex items-center gap-2 mb-space-sm">
  <span class="w-2 h-2 rounded-full bg-primary-container shrink-0"></span>
  <span class="font-label-technical text-label-technical tracking-widest uppercase font-semibold text-primary">
    SECTION EYEBOB
  </span>
  <!-- optional trailing chip/badge -->
</div>
<h2 class="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl … text-on-surface">Title</h2>
<!-- ⚠ verbatim from SectionHeader.tsx — note there is no text-* half here -->
<!-- the shipped component renders this at the UA default 24px, not 36/40/56px -->
<!-- correct: add text-display-xl-mobile sm:text-headline-lg lg:text-display-xl -->
<p class="font-body-md sm:font-body-lg max-w-3xl leading-relaxed text-secondary">Description</p>
```

`SectionHeader` (`src/components/common/SectionHeader.tsx`) implements this. **Use it** on index
pages. `MaintenancePage`, `ServiceDetailPage` and `ContactPage` hand-roll it inline — copy those
inline blocks if you must, but prefer `SectionHeader`.

**Numbered eyebrows** appear on: the hero (`SPEC 01 // …`), `CaseStudyDetailPage` (`01 // Project
Overview` … `05 // Execution Sequence`), `CapabilitiesGrid` (`01 / Construction`),
`PipelineSection` (a bare step number), and `NotFoundPage` (`ERROR 404 // DIAGNOSTIC ROUTE FAULT`).
Use numbering for *sequences and records*, and unnumbered uppercase for *thematic* sections.

---

## 3. Type rules

1. **A `font-*` token sets the family; a `text-*` token sets the metrics.** The two share 12 key
   names. `font-label-technical text-label-technical` (38 uses) is the correct full pattern;
   `font-body-md` alone sets *only* Inter and leaves the size at the 16px default. Never write a
   bare pixel size for a heading or label, and never rely on a `font-*` token to size anything.
2. **Body copy is `font-body-md` + `text-body-md`/`text-body-lg`,** or `font-body-sm` +
   `text-[13px]`/`text-[14px]` in dense card interiors. In practice the size half is usually an
   arbitrary `text-[Npx]` — the *observed* body range is 10/11/12/13/14/15/16/18px, not the 13/15/18
   the scale implies. Treat the scale as the intent and the arbitrary values as the debt.
3. **Metadata, labels, chips, tabs, and spec values are ALWAYS JetBrains Mono**
   (`font-label-technical` + `text-label-technical` 12px, or `font-label-mono-sm` +
   `text-label-mono-sm`/`text-[11px]` 11px), and virtually always `uppercase`.
   This is the rule that carries the whole brand.
4. **Headings are always Space Grotesk.** `index.css` `@layer base` sets `h1`–`h6` globally, so a
   `font-headline-*` / `font-display-xl*` class on a heading is a **no-op** — it is present 440×
   anyway. Size them with `text-display-xl-mobile sm:text-headline-lg lg:text-display-xl`; that
   exact triple on both halves (`HeroSlider.tsx` `<h1>`) is the reference-correct pattern.
   ⚠ **`SectionHeader` gets this wrong**: it writes only the `font-*` half, so all **13** of its
   `<h2>`s render at the UA default 24px bold. Never ship a heading with a family class and no
   size class.
5. **Buttons are always `font-button-text text-button-text`** (14px Inter 600, +0.01em). The
   `font-bold` that appears on the same element in ~8 places then wins and renders 700.
6. **`line-clamp-N`** is the only accepted way to truncate. It is used in exactly 6 places (2 each): the
   mega-dropdown summaries (`line-clamp-1`), `PartnerGrid` specs (`line-clamp-2`),
   `FeaturedCaseStudies` overviews (`line-clamp-3`).
7. **Body paragraph measure is capped at `max-w-3xl` (768px) or `max-w-2xl` (672px)** in
   side-by-side layouts. Do not let body copy run the full 1320px.

---

## 4. Colour rules

1. **Text colours are only ever** `on-surface` (primary ink), `secondary` (muted),
   `text-primary` (eyebrow / crimson emphasis), `text-inverse-primary` (on dark),
   `text-surface-dim` (on dark body copy), or `text-white` (on dark headline).
2. **`primary-container` (#c8102e) is used as a fill only on small elements:** buttons, ≤8px dots,
   ≤48px icon tiles, the 1px hero progress bar, the active nav underline, the `Most Popular`
   ribbon. Never as a section or card background. Never as a large panel.
3. **`primary` (#9e001f) is the hover state of `primary-container`** and nothing else. Do not use
   it as a resting text colour.
4. **Section backgrounds cycle** `white` → `surface-container-lowest` → `surface-container-low`.
   Never two identical backgrounds in a row unless separated by the CTA box.
5. **The only non-neutral colours on the entire site are:** crimson (brand), `#ffdad8`/`#e5bdbb`
   (crimson badge/chip pairs), and `red-50/red-200/red-700` (the single form error banner).
   `Badge variant="success"` green exists but is **never rendered**.
6. **Over-image scrims** use `bg-black/60`, `bg-inverse-surface/95|85|50`, `from-… via-… to-…`
   gradients, or `bg-white/10|15|20|25` with `border-white/10|15|25|30`. There is no other
   scrim vocabulary.
7. **Borders are `#e2e4e8` (`border-structural`), `#cbd0d8` (`border-structural-dim` on hover), or
   an explicit `border-[#cbd0d8]` literal on form controls.** No other border colours.

---

## 5. Surface & elevation rules

1. **Elevation = 1px border first, shadow second.** Every card has a border. A card may also
   carry `shadow-xs` at rest and `hover:shadow-md|lg|xl`, or a shadow with no hover change
   (CTA boxes, the leadership card, tier cards).
2. **Hover on a card is always the same three-part gesture:**
   `hover:border-on-surface` + a shadow increase + optionally `hover:-translate-y-0.5` (capability
   cards only) or an inner `group-hover:scale-105` on the image. Duration is **200ms**, easing is
   Tailwind default, and the property is `transition-all`.
3. **Only two shadow steps are ever combined on one element:** `shadow-xs → shadow-md`,
   `shadow-sm → shadow-lg`, or none. Never stack.
4. **Inset boxes** (spec tables, telemetry bars, dispatch callouts) are
   `bg-surface-container-low` + `border border-structural` + `rounded-lg` + `p-4` (or
   `p-2.5` when they sit inside an already-padded card).
5. **Icon tiles** come in exactly three sizes: `w-7 h-7 rounded` (inline, next to a heading),
   `w-8 h-8 rounded` / `w-8 h-8 rounded-full` (card header), `w-10 h-10 rounded-full` (feature),
   `w-12 h-12 rounded-full` (form success), `w-16 h-16 rounded-lg` (leader avatar),
   `w-16 h-16 rounded-2xl` (404 page), `w-8 h-8 rounded` (logo). Icon inside is always
   `w-4 h-4` or `w-5 h-5`; never larger.
6. **Card radius is 8px or 12px.** 8px for capability cards, checklist rows, the leadership-card
   companions and dropdown items; 12px for dossier cards, service rows, tier cards, hub cards,
   CTA boxes and the form container. Do not introduce a 16px card.

---

## 6. Button rules

`Button` (`src/components/common/Button.tsx`) is the only sanctioned button. It has
5 variants × 3 sizes. **However, `Button` is imported by zero components** — every button in the
site is a hand-written `<Link>`, `<a>`, or `<button>`. Match the hand-written form, and copy this
class string:

```html
class="bg-primary-container hover:bg-primary text-on-primary font-button-text
       px-5 py-2.5 rounded-lg font-semibold transition-colors
       inline-flex items-center justify-center gap-1.5 shadow-sm"
```

| Role | Pattern | Sizes used |
|---|---|---|
| Primary in-page CTA | crimson fill, white text | `px-5 py-2.5` (small), `px-6 py-3` (medium), `px-6 py-3.5` (large) |
| Secondary | `bg-white hover:bg-surface text-on-surface border border-structural hover:border-on-surface shadow-sm` | same |
| Tertiary / text link | `text-primary hover:text-on-surface font-semibold` + `ArrowRight w-4 h-4` | inline, no box |
| On dark | `bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-sm` | `px-6 py-3.5` |
| Phone CTA | as secondary, but with `<Phone className="w-4 h-4 text-primary" />` | `px-5 py-3` |
| Submit | as primary, `w-full sm:w-auto`, `px-8 py-3.5`, `disabled:opacity-50` | — |

Hard rules:
- **Every primary button is `rounded-lg` (8px).** No pills, no `rounded-full`.
- **Every primary button has an icon** — `ArrowRight w-4 h-4` (default, right), `Phone`, or
  `Check`. Tertiary links use `ArrowRight w-3.5 h-3.5`.
- **Text buttons use `font-semibold`** even though `text-button-text` already sets 600 — `font-semibold`
  (600) matches, `font-bold` (700) overrides.
- **`text-button-text` next to `font-button-text` is the correct pairing, not a duplication** —
  `font-button-text` sets the family, `text-button-text` sets 14px/20px/0.01em/600. Keep both.
  The genuinely dead case is a `font-*` token on an `h1`–`h6`, which `index.css` already handles.
- Text CTA labels are **Title Case with a verb**: `Request Technical Consultation`,
  `Explore Technical Specs`, `Schedule a Baseline Plant Assessment`. Never `Submit` alone, never
  `Learn More` on a primary (that label is reserved for capability cards' tertiary links).

---

## 7. Form rules

1. **One input style, no variants.** Every one of the 10 fields uses:
   ```html
   class="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8]
          text-on-surface placeholder:text-secondary/60 font-body-md text-body-md shadow-xs"
   ```
   The `textarea` swaps `h-11 px-3.5` for `p-3.5`. `<select>` adds `cursor-pointer`.
2. **Height is 44px (`h-11`)**, not the 40px the design doc specifies.
3. **Every field is wrapped in `space-y-1.5`** and contains exactly three children:
   `<label>` → control → `<span>` hint. The hint is **mandatory** and uses
   `font-label-mono-sm text-[11px] text-secondary`.
4. **Labels** use `block font-label-technical text-label-technical uppercase text-on-surface
   tracking-wider` with a `<label htmlFor>` that matches the control's `id`. Required marker is
   `<span className="text-primary-container">*</span>`; the optional marker is
   `<span className="text-secondary">(Optional)</span>`.
5. **Layout is a 2-up grid** `grid-cols-1 sm:grid-cols-2 gap-space-md` for the paired fields,
   then full-width for the budget select and the textarea. Never 3-up.
6. **Form rows are separated by `space-y-6`** on the `<form>`.
7. **The form container** is `bg-white p-6 sm:p-10 rounded-xl border border-structural shadow-sm`
   with a `Protocol Intake / Submittal Specification Form / REV 4.2` header block.
8. **Selects must have a placeholder option with `value=""`** as the first child.
9. **No native date, number, range, checkbox-group, or radio input exists** in this codebase. Do
   not add one without also adding its styling.
10. Focus styling is global and comes from `index.css` (`input:focus, textarea:focus,
    select:focus { outline: 1px solid #111315 !important }`) — do not add Tailwind `focus:` rings
    to inputs, and note this dark `#111315` focus ring is a *different* colour from
    `on-surface #191c1d`.

---

## 8. Content-voice rules

1. **Metadata is uppercase, mono, and terse.** `SLA: 4-Hour Response`, `CANDIDATE PROFILE`,
   `DOCUMENTED PERFORMANCE`, `REV 4.2`, `REGIONAL COVERAGE`.
2. **Headlines are sentence case with a period.** `Speak Directly with a Commercial Mechanical
   Specialist.` · `Institutional Discipline in Every Valve, Drop, and Control Loop.` ·
   `A Structured Mechanical Process from First Site Visit to Final Balance.` Never Title Case
   headings. (Section H2s are Title Case: `Mechanical Capabilities`, `Quality Architecture &
   Field Discipline`.)
3. **Body copy is complete sentences with periods.** No sentence fragments, no exclamation marks
   anywhere on the site.
4. **Every claim carries a number.** `14,850+ TR`, `±2.5% NEBB TAB`, `2-Hour Regional Arrival`,
   `0.00 EMR`, `400 TR N+1`, `-28.0%`. If a sentence has no number, it is too vague — this is
   the site's core persuasion device.
5. **Standards and certifications are always named in full at least once**, then abbreviated:
   `ASHRAE 90.1`, `NEBB Certified TAB`, `EPA Section 608 Universal`, `ASME Section IV`,
   `ISO Class`, `OSHA 30`, `C-PACE`, `BACnet`.
6. **Units and symbols are preserved exactly:** `TR`, `°F`, `kW`, `MMBtu`, `in. w.g.`, `CFM`,
   `±`, `·` (as a separator), `–` (en dash in ranges like `$50,000 – $150,000`).
7. **Never use the words** *amazing*, *best*, *top-rated*, *quality service*, *we care*,
   *your comfort*. The site speaks only in verifiable engineering language.
8. **Buttons and links never say "Click here".** Always name the destination or the action.

---

## 9. Accessibility-relevant house rules

- Interactive hover states are paired with **colour change and/or border change**, never colour
  alone (e.g. `hover:text-primary` is always paired with a sibling or shadow change).
- The checklist, FAQ and filter controls all have a real `<button>` element (not a `<div
  onClick>`) — **keep it that way**. `ChecklistSection` is the one exception: it uses
  `<div onClick>` with no `role`/`tabIndex`/`onKeyDown`.
- Form labels are always associated with `htmlFor`/`id`. **Keep it that way.**
- Decorative icons inherit `text-primary` and have no `aria-label`; the icon-only hamburger has
  `aria-label="Toggle mobile menu"`. Everything else is a text+icon link.
- There is **no skip-to-content link** and **no `:focus-visible` ring on links or buttons**
  (only on the two dossier-card grids). See `accessibility.md` before claiming WCAG conformance.

---

## 10. Anti-patterns — things that do not exist here

Never add any of these; if you find yourself reaching for one, you have misread the design.

| Anti-pattern | Why it's wrong here |
|---|---|
| `rounded-full` on a button | Buttons are 8px. Pills are reserved for status dots and the `Most Popular` ribbon. |
| A gradient background on a section | The only gradients are the two hero scrims. |
| Glassmorphism / heavy `backdrop-blur` | `backdrop-blur-sm|md` appears 14×, all on hero/utility surfaces. Never on cards. |
| A drop shadow as the only separation | Every card has a 1px border. |
| `shadow-2xl` on content | Only the mobile drawer. |
| An icon-only button without `aria-label` | One such button exists and it is labelled. |
| A 3-up form row | Forms are 2-up max. |
| A `dark:` variant | `darkMode: 'class'` is configured; **zero** dark variants exist. Adding one changes the deliverable. |
| A scroll-reveal animation | No IntersectionObserver anywhere. Nothing animates on scroll. |
| A carousel with prev/next arrows | The hero is driven purely by a tab bar and autoplay. |
| A testimonial carousel | Reviews are a static 3-column grid. |
| A modal or lightbox | The only overlay-ish thing is the mobile nav drawer. |
| An FAQ that opens all items | `openFaq` initial value is `0` (first item open). |
| A cookie banner, a chat widget, a back-to-top button | None exist. |
| An icon library other than Lucide | Lucide is the only icon source, imported per-component. |
| A utility class outside `src/` | `content` globs are `./index.html` + `./src/**/*.{js,ts,jsx,tsx}`. |
| `@/components/...` imports | The `@` alias exists in both configs but is **never used**; all imports are relative. |
