# Design System

> **Source of truth order:** `tailwind.config.ts` → `src/index.css` → component class strings.
> Where the legacy `designs/.../mechanical_precision/DESIGN.md` disagrees with the code, **the code
> wins** and the discrepancy is called out in §10.

---

## 1. Colors

All values below are verbatim from `tailwind.config.ts` → `theme.extend.colors`. This is a
**Material-3-derived** palette (note the `primary` / `on-primary` / `primary-container` /
`inverse-primary` / `primary-fixed` naming), re-tinted to a crimson accent.

### 1.1 Surfaces (the most important group)

| Token | Hex | Role |
|---|---|---|
| `surface-container-lowest` | `#ffffff` | Pure white card canvas. **Default page background** (set on `<body>` and on `Layout`'s root div). 7 usages. |
| `background` | `#f8f9fa` | Defined but **never used** in any class. |
| `surface` | `#f8f9fa` | Defined but **never used**. |
| `surface-bright` | `#f8f9fa` | Defined but **never used**. |
| `surface-container-low` | `#f3f4f5` | **The workhorse secondary surface.** 57 usages. Section backgrounds, inset spec tables, tab/inset boxes, partner tiles, checkbox backgrounds. |
| `surface-container` | `#edeeef` | Avatar tile background on `AboutPage`; 1 usage. |
| `surface-container-high` | `#e7e8e9` | **Unused.** |
| `surface-container-highest` | `#e1e3e4` | **Unused.** |
| `surface-variant` | `#e1e3e4` | **Unused.** |
| `surface-dim` | `#d9dadb` | Image placeholder background behind `<img>` in cards/hero. 4 usages. Also the **body text colour on dark hero** via `text-surface-dim` (4 usages). |
| `surface-tint` | `#bf0229` | **Unused.** |

> [REUSABLE] The pattern is: **white card on a light-gray page, separated by a 1px hairline.**
> `bg-surface-container-low` is the second-most-used colour in the entire codebase and is doing the
> job a designer would normally solve with shadows.

### 1.2 Ink / text

| Token | Hex | Role | Usage |
|---|---|---|---|
| `on-surface` | `#191c1d` | **Primary text.** Near-black. Headlines, values, body on white. | 108 |
| `secondary` | `#5d5e61` | **Secondary / muted text.** Mid-gray. Descriptions, meta, nav links, placeholders. | 122 |
| `on-background` | `#191c1d` | **Unused.** | 0 |
| `on-surface-variant` | `#5c403f` | **Unused.** | 0 |
| `outline` | `#906f6e` | Custom scrollbar thumb **hover** colour only (`index.css`). | 1 |
| `outline-variant` | `#e5bdbb` | **Unused** in classes; the literal `#e5bdbb` is hardcoded in `Badge` `crimson`. | 0 |
| `white` | `#ffffff` | On-dark text, on-primary button text. | many |

> There is **no** dedicated "primary ink" `#111315` token in the config. `index.css` and
> `Button.tsx`'s `active:bg-[#8E0B20]` still hardcode `#111315` / `#8E0B20` in a few places —
> see §10.

### 1.3 Brand (crimson) — the scarce resource

| Token | Hex | Role | Usage |
|---|---|---|---|
| `primary-container` | `#c8102e` | **THE brand colour.** Primary button bg, 6–8px status dots, active nav underline, active filter border, leader avatar, hero progress bar, ring on "popular" tier. | 32 |
| `primary` | `#9e001f` | Primary button **hover** (`hover:bg-primary`). | 32 |
| `on-primary` | `#ffffff` | Text on crimson. | — |
| `inverse-primary` | `#ffb3b1` | Pale pink used for the eyebrow text on dark scrims and the metric highlight on active filter buttons. | 5 |
| `on-primary-container` | `#ffdad8` | **Unused** in classes; the literal `#ffdad8` is hardcoded in 5 places. | 0 |
| `surface-tint` | `#bf0229` | **Unused.** | 0 |
| `primary-fixed` | `#ffdad8` | Filter-button count badge text on selected state. | 1 |
| `primary-fixed-dim` | `#ffb3b1` | **Unused.** | 0 |
| `on-primary-fixed` | `#410007` | **Unused.** | 0 |
| `on-primary-fixed-variant` | `#92001c` | **Unused.** | 0 |
| — literal `#8E0B20` | | `Button` `primary` **active** state. Hardcoded, not a token. | 1 |
| — literal `#ffdad8` | | Crimson badge bg, PE-license chip, HQ code chip. Hardcoded in `Badge.tsx`, `QualityArchitecture`, `ServiceAreasPage`, `ContactPage`. | 5 |
| — literal `#e5bdbb` | | Crimson badge border. Hardcoded in `Badge.tsx`. | 1 |
| — literal `#dcfce7` / `#166534` / `#bbf7d0` | | `Badge` `success` variant (Tailwind green-100/800/200). **No usage anywhere in the site.** | 0 |
| — literal `#ffb3b1` | | `Badge` `crimson`… no; used for `inverse-primary`. | — |

**Crimson discipline rule (the single most important colour rule):**
`#c8102e` is used as a **fill** only on small elements and buttons. It is never a section
background, never a large panel, never a hero wash. If you need a dark full-bleed band, use
`inverse-surface` (`#2e3132`) instead — this is done exactly once (the case-study detail CTA band)
plus in the hero and the two detail-page heroes.

### 1.4 Dark / inverse

| Token | Hex | Role | Usage |
|---|---|---|---|
| `inverse-surface` | `#2e3132` | Structural charcoal. **Hero background** (`HeroSlider`), gradient scrim `from-inverse-surface/95`, the case-study detail CTA band, the eyebrow pill base. | 3 |
| `inverse-on-surface` | `#f0f1f2` | Text on dark. | 3 |
| — `white` | | Actual on-dark body/heading text (`text-white`). Space Grotesk headings and hero copy use `text-white`, not `inverse-on-surface`. | many |

### 1.5 Borders

| Where defined | Value | Class | Role |
|---|---|---|---|
| `index.css` `.border-structural` | `#e2e4e8` | `border-structural` | **The default hairline.** 182 usages. Every card, every `border-b` between sections, every divider. |
| `index.css` `.border-structural-dim` | `#cbd0d8` | `border-structural-dim` | Hover state on cards/checklist rows. 2 usages. |
| `index.css` focus rule | `#111315` | — | Forced `input/textarea/select:focus` border + outline. |
| Literal in `SubmittalForm` | `#cbd0d8` | `border-[#cbd0d8]` | All 10 form inputs. |
| Literal in `ChecklistSection` | `#cbd0d8` | `border-[#cbd0d8]` | Unchecked checkbox. |
| `index.css` scrollbar track | `#f3f4f5` | — | `::-webkit-scrollbar-track` |
| `index.css` scrollbar thumb | `#cbd0d8` / hover `#906f6e` | — | `::-webkit-scrollbar-thumb` |
| `outline-variant` | `#e5bdbb` | unused | — |

> ⚠ **`index.css` does have an `@layer base`, but the two border classes are NOT inside it.**
> `.border-structural` and `.border-structural-dim` are declared as **top-level** class selectors
> after the `@layer base` block, so they land in the implicit *unlayered* bucket, which
> `@layer utilities` **cannot** override. That is the only reason `border-structural` (182 uses)
> beats every `border-<token>` utility. If you move them into a layer or migrate them into a
> `borderColor` theme, the cascade flips and every border on the site changes. Keep them as-is.

### 1.6 Feedback

| Token | Hex | Role | Status |
|---|---|---|---|
| `error` | `#ba1a1a` | **Unused.** | 0 |
| `on-error` | `#ffffff` | Unused | 0 |
| `error-container` | `#ffdad6` | Unused | 0 |
| `on-error-container` | `#93000a` | Unused | 0 |
| Literal | `#ba1a1a` on `bg-red-50` / `border-red-200` / `text-red-700` | `SubmittalForm` error banner. **Not the design-system error token** — the banner uses Tailwind red, not `error`. | 1 |
| `secondary` | `#5d5e61` | Chrome/scrollbar, unused as feedback. | — |
| `tertiary` / `tertiary-container` | `#454d59` / `#5d6571` | **Unused** (and their blue-grey hue is off-brand). | 0 |
| `secondary-container` | `#e2e2e5` | **Unused.** | 0 |
| `Badge` `success` | `#dcfce7` / `#166534` / `#bbf7d0` | Variant exists, **never rendered.** | 0 |

> **Real finding:** there is **no working success, error, or warning token** in the design system as
> shipped. The one error state is hardcoded Tailwind red. The one success state is hardcoded Tailwind
> green. Rebuilding a production site you should add `success` / `warning` tokens and use them.

---

## 2. Typography

### 2.1 Families

| Role | Family | Source | Tailwind keys |
|---|---|---|---|
| Display / headings (`h1`–`h6`) | **Space Grotesk** 600 | Google Fonts `<link>` in `index.html` | `display-xl`, `display-xl-mobile`, `headline-lg`, `headline-lg-mobile`, `headline-md`, `headline-sm`, `space` (unused) |
| Body / UI / buttons | **Inter** 400/500/600/700 | Google Fonts `<link>` | `body-lg`, `body-md`, `body-sm`, `button-text`, `sans` (unused) |
| Labels / metadata / telemetry | **JetBrains Mono** 400/500 | Google Fonts `<link>` | `label-technical`, `label-mono-sm`, `mono` (unused) |

**Google Fonts request (exact, `index.html` line 13):**
```text
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600&display=swap
```
Plus a second request for **Material Symbols Outlined** (`index.html` line 14) — **this font is
never used by any class or component.** It is dead weight; remove it.

**Preconnect:** `fonts.googleapis.com` + `fonts.gstatic.com` (both present, correct).

**How they are applied**
- `index.css` `@layer base` sets `html { font-family: 'Inter', sans-serif }`,
  `h1..h6 { font-family: 'Space Grotesk', sans-serif }`, and
  `code, pre, .font-mono, [data-mono] { font-family: 'JetBrains Mono', monospace }`.
- `index.html` puts `font-body-md antialiased selection:bg-primary-container selection:text-white`
  on `<body>` — that sets **only the family** (Inter). It sets no font-size.
- The config's real mechanism is that `fontFamily` and `fontSize` **share the same 12 keys**:
  - `font-<token>` → emits **`font-family` only**
  - `text-<token>` → emits **`font-size` + `line-height` + `letter-spacing` + `font-weight`**

> [REUSABLE] The overlap is the best idea in the codebase: one name carries a whole typographic
> personality, and you can mix deliberately — Space Grotesk at an arbitrary 18px is just
> `font-headline-sm text-[18px]`.

> ⚠ **But the codebase mostly does the half of it that throws the scale away.** Measured census
> of `<p>/<span>/<li>/<a>/<button>/<h1>–<h4>` class strings:
>
> | Pattern | Count | What actually renders |
> |---|---|---|
> | `font-body-sm text-secondary` (no `text-*`) | 20 | Inter, **16px** (inherited default) |
> | `font-body-md text-secondary` (no `text-*`) | 16 | Inter, **16px** |
> | `font-label-mono-sm text-[11px]` | 34 + 18 variants | JetBrains Mono, 11px, but **no leading/tracking** |
> | `font-label-technical text-label-technical` | 21 | Space Grotesk? no — JetBrains Mono, **12px/16px/+0.06em/500** ✅ the token actually used |
> | `font-headline-md text-on-surface font-bold` (no `text-*`) | 10 | Space Grotesk at the **UA default h3 size (~1.17em)**, 700 |
>
> So: `text-<token>` fires only **82 times in the whole site**, while `font-<token>` fires
> **440 times**. The carefully authored `lineHeight` / `letterSpacing` / `fontWeight` values in
> `fontSize` are therefore **~90% dead** — including the line-heights. Consequence: `<body>` is
> Inter at the browser default **16px / normal**, not the 15px/25px the token implies, and several
> `h3`s render at the UA default size with `font-bold` rather than at `headline-md`'s 28px/600.
>
> **For a rebuild:** keep the paired-token mechanism, but make the atomic utility the *default*
> (one class = family + metrics, as `design.md` originally intended) and treat `font-*` alone as
> a deliberate exception, not the default. Then audit the 253 `text-[Npx]` values back into the
> scale.
>
> ### 2.1a ⚠ The single worst instance: `SectionHeader`
>
> The shared section-heading component — 13 renderings across 11 files — writes:
>
> ```tsx
> <h2 className={`font-display-xl-mobile sm:font-headline-lg lg:font-display-xl
>                tracking-tight leading-tight mb-space-sm ${dark ? 'text-white' : 'text-on-surface'}`}>
> ```
>
> Three font *families* and **not one size utility.** The author clearly intended the
> 36px → 40px → 56px step-up, copied it onto the `font-*` half only, and never added the `text-*`
> half. Because the `h2` element carries no other size, every section heading on the site renders
> at the **browser default `1.5em` ≈ 24px, bold** — the same size as the `<h3>`s directly beneath
> it. The identical mistake is in its `<p>`: `font-body-md sm:font-body-lg` sets the same family
> at both breakpoints, so the `sm:` step is a literal no-op and the description never grows.
>
> `HeroSlider`'s `<h1>` is the one place the pair *is* written correctly, and it is the reference
> to copy:
> `font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-display-xl-mobile sm:text-headline-lg lg:text-display-xl`
>
> **This is the strongest argument in the whole audit for the token architecture.** One missing
> utility half, repeated in one shared component, silently collapsed the site's entire display
> scale — and no test, lint rule, or type checker can catch it, because both spellings are valid
> Tailwind.

### 2.2 The scale (verbatim from `tailwind.config.ts`)

| Token | Size | Line-height | Letter-spacing | Weight | Family | Used? |
|---|---|---|---|---|---|---|
| `display-xl` | 56px | 64px | -0.02em | 600 | Space Grotesk | ✅ hero H1, section H2 at `lg` |
| `display-xl-mobile` | 36px | 44px | -0.01em | 600 | Space Grotesk | ✅ base H1/H2 below `lg` |
| `headline-lg` | 40px | 48px | -0.01em | 600 | Space Grotesk | ✅ `sm:` H1/H2 |
| `headline-lg-mobile` | 28px | 36px | 0 | 600 | Space Grotesk | ❌ **defined, never used** |
| `headline-md` | 28px | 36px | -0.005em | 600 | Space Grotesk | ✅ H2/H3 |
| `headline-sm` | 20px | 28px | 0 | 600 | Space Grotesk | ✅ H3, wordmark, values |
| `body-lg` | 18px | 30px (1.67) | 0 | 400 | Inter | ✅ `sm:` body |
| `body-md` | 15px | 25px (1.67) | 0 | 400 | Inter | ✅ document default |
| `body-sm` | 13px | 20px (1.54) | 0.01em | 400 | Inter | ✅ dense card copy |
| `button-text` | 14px | 20px | 0.01em | 600 | Inter | ✅ all buttons + nav links |
| `label-technical` | 12px | 16px | 0.06em | 500 | JetBrains Mono | ✅ eyebrows, labels, form labels |
| `label-mono-sm` | 11px | 14px | 0.04em | 400 | JetBrains Mono | ✅ chips, badges, meta, tabs |

> Note the scale is **display-first**: 56 → 40 → 28 → 20 for headings, with `display-xl-mobile` (36px)
> as the mobile H1. The `sm:` breakpoint (640px) promotes H1/H2 from 36 → 40; the `lg` breakpoint
> (1024px) promotes to 56. **Body text never changes across breakpoints** — only its token
> (`body-md` → `body-lg` at `sm`).

### 2.3 Heading hierarchy as implemented

| Level | Family class (the only half usually written) | Size class | Where |
|---|---|---|---|
| `<h1>` | `font-display-xl-mobile sm:font-headline-lg lg:font-display-xl` | **only in `HeroSlider`** | 7 page H1s, all bare `font-*`; `HomePage`'s is the one correct pair |
| `<h2>` | `SectionHeader` → `font-display-xl-mobile sm:font-headline-lg lg:font-display-xl`; detail pages → `font-headline-md` | **none anywhere** | 13 `SectionHeader` renderings + 8 hand-written detail-page `<h2>` |
| `<h3>` | `font-headline-md` (page) or `font-headline-sm` (cards) | cards use `text-[16..22px]` | Card titles, tier titles, list-section heads |
| `<h4>` | `font-headline-sm` | `text-[16..18px]` | Pillar headings, credential cards, FAQ questions inside a `<div>` |

> `SectionHeader` (57 L) renders an `<h2>`, used **13× across 11 files**: 5 pages
> (`ServicesPage` ×1, `CaseStudiesPage` ×2, `FinancingPage` ×2, `ServiceAreasPage`, `AboutPage`)
> and 6 section components (`CapabilitiesGrid`, `FeaturedCaseStudies`, `QualityArchitecture`,
> `PipelineSection`, `ChecklistSection`, `TierMatrixSection`). It is **not** used by
> `HomePage`, `MaintenancePage`, `ServiceDetailPage`, `CaseStudyDetailPage`, `ContactPage`, or
> `NotFoundPage` — those hand-roll the eyebrow + heading.
>
> ⚠ **Not one of the 21 `<h2>`s gets a size class**, so every `<h2>` on the site renders at the
> UA default 24px bold. See §2.1a. The 7 hand-written page `<h1>`s have the same problem at 32px.
> The size half of the pair is written in exactly **one** place on the entire site:
> `HeroSlider`'s `<h1>`.

### 2.4 Labels, buttons, navigation, metadata

- **Eyebrow:** `font-label-technical` (12px mono, 0.06em) + `uppercase` + `text-primary` +
  `tracking-widest` + `font-semibold`, preceded by a `w-2 h-2 rounded-full bg-primary-container` dot
  (or `w-1.5 h-1.5` in tighter contexts).
- **Buttons:** `font-button-text` (14px/20px Inter 600). Navbar CTA overrides to
  `text-[13px] sm:text-[14px]`.
- **Nav links:** `font-button-text` + `text-button-text` (redundant, but harmless), `text-secondary`,
  `hover:text-on-surface`, with a `border-b-2` that is `border-transparent` at rest and
  `border-primary-container` when active.
- **Metadata / chips / tabs / spec rows:** `font-label-mono-sm` (11px mono) + `uppercase` +
  `tracking-wider`. Some use `text-[10px]`.
- **Field helper text under form inputs:** `font-label-mono-sm text-[11px] text-secondary`.

---

## 3. Spacing

### 3.1 Token definitions (`tailwind.config.ts` → `theme.extend.spacing`)

| Token | Value | Used in code? |
|---|---|---|
| `space-xs` | 0.25rem (4px) | ❌ 0 usages |
| `space-sm` | 0.5rem (8px) | ✅ 5 usages |
| `space-md` | 1rem (16px) | ✅ 8 usages |
| `space-lg` | 1.5rem (24px) | ✅ 2 usages |
| `space-xl` | 2.5rem (40px) | ✅ 1 usage (hero subhead margin) |
| `margin` | 1rem (16px) | ✅ **the horizontal page gutter** |
| `margin-tablet` | 2rem (32px) | ❌ 0 usages |
| `gutter` | 1.5rem (24px) | ❌ 0 usages |
| `gutter-desktop` | 2rem (32px) | ❌ 0 usages |
| `margin-desktop` | 3rem (48px) | ✅ the desktop horizontal gutter |

> **Reality check:** of 9 defined spacing tokens, **4 are never used** (`space-xs`, `margin-tablet`,
> `gutter`, `gutter-desktop`). 98% of spacing in this codebase is stock Tailwind numeric utilities
> (`py-16`, `gap-6`, `p-6`, `mb-3`…). The custom spacing scale exists for a handful of `gap-*` and
> `mb-*` calls. Do not expect to "use the spacing system" — you will be writing `py-16`.

### 3.2 Base unit

Tailwind's default `0.25rem` (4px). Everything is a multiple of 4px. The two most common raw
values: **24px** (`gap-6`, `gap-8`, `p-6`, `py-6`) and **16px** (`gap-4`, `p-4`, `py-4`).

### 3.3 Section vertical padding — the macro rhythm

Three bands, all driven by `py-*` on the `<section>` element:

| Band | Classes | Values | Used by |
|---|---|---|---|
| **Standard** | `py-16 lg:py-20` | 64px → 80px | `ServicesPage` header, `ServicesPage` grid, `MaintenancePage` phases, `PipelineSection`, `ChecklistSection`, `ServiceAreasPage` header + grid, `CaseStudiesPage` grid, `CaseStudyDetailPage` related, `AboutPage` leadership |
| **Tall** | `py-16 lg:py-24` | 64px → 96px | `CapabilitiesGrid`, `QualityArchitecture`, `FeaturedCaseStudies`, `MaintenancePage` CTA, `PipelineSection`-adjacent white sections, `TierMatrixSection`, `ServiceDetailPage` main, `CaseStudyDetailPage` main, `CaseStudiesPage` testimonials, `FinancingPage` principles, `AboutPage` credentials, `ContactPage` form |
| **Compressed** | `py-12` (no `lg:` variant) | 48px flat | `PartnerGrid`, `MetricsRibbon` (uses `py-8`), `ServicesPage` dispatch CTA, `MaintenancePage` phase strip, `Footer` (uses `py-12 lg:py-16`) |

Page-header sections use asymmetric padding: `pt-16 pb-12 lg:pt-20 lg:pb-16` on
`MaintenancePage`, `ServiceAreasPage`, `FinancingPage`, `CaseStudiesPage`, `AboutPage`.

The hero uses `pt-16 sm:pt-20 lg:pt-24 pb-12`.

> [REUSABLE] **64px base / 96px desktop** is the macro rhythm. The jump from 64 → 96 at `lg` is what
> gives the page its "generous executive" feel. Do not use 40px or 48px as the base section padding.

### 3.4 Component spacing

| Context | Value |
|---|---|
| Card padding — small (grids, tiles) | `p-4` (16px) |
| Card padding — standard | `p-5` (20px), `p-6` (24px) |
| Card padding — large (feature cards) | `p-8` (32px) |
| Card padding — CTA boxes | `p-8 lg:p-12` (32px → 48px) |
| Card padding — form container | `p-6 sm:p-10` |
| Grid gap — tight (icon grids, bullets) | `gap-2` (8px), `gap-2.5` (10px), `gap-3` (12px) |
| Grid gap — standard | `gap-4` (16px), `gap-6` (24px) |
| Grid gap — spacious (major card grids) | `gap-8` (32px) |
| Grid gap — column gutters (12-col) | `gap-8 lg:gap-12`, `gap-12` |
| Grid gap — vertical rhythm between stacked blocks | `space-y-12` (48px), `space-y-4` (16px), `mb-12` (48px), `mb-20` (80px) |
| Section-header bottom margin | `mb-12` (48px) or `mb-10` (40px) |
| List item spacing | `space-y-2` (8px), `space-y-2.5` (10px), `space-y-3` (12px) |

### 3.5 Horizontal gutters

`px-margin` (16px) below 1024px → `lg:px-margin-desktop` (48px) at ≥1024px.
Applied identically on **every** top-level section, banner and container. There is no intermediate
step at `sm` or `md` — the padding jumps straight from 16px to 48px.

---

## 4. Containers

```html
<div class="max-w-[1320px] mx-auto px-margin lg:px-margin-desktop">
```

| Property | Value |
|---|---|
| Max width | **1320px** (hardcoded arbitrary value — no `max-w-screen-*`, no config token) |
| Horizontal padding | 16px (<1024px) → 48px (≥1024px) |
| Centring | `mx-auto` |
| Narrow content column | `max-w-3xl` (768px) — hero copy, `SectionHeader` descriptions, detail-page intros |
| Tighter column | `max-w-4xl` (896px) — `SectionHeader` on index pages, contact intro, FAQ block |
| Widest text column | `max-w-2xl` (672px) — hero subhead, CTA-box copy, card descriptions |
| Avatar / marker column | `max-w-xs` (320px) — `PartnerGrid` label block |

> ⚠ The `1320px` container is **not** defined in `tailwind.config.ts`. It is written as
> `max-w-[1320px]` in **55 places** (plus `px-margin lg:px-margin-desktop`, which is tokenised).
> When rebuilding, add `maxWidth: { container: '1320px' }` to the theme and switch to `max-w-container`
> — or keep the arbitrary value to stay byte-identical with the reference. Either is acceptable;
> **do not mix the two forms in one codebase.**

**Grid behaviour:** the container is a plain block; the grid lives one level inside. The dominant
pattern is a **12-column grid at `lg` only**:

```html
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
  <div class="lg:col-span-8">…</div>
  <div class="lg:col-span-4">…</div>
</div>
```

Splits in use: 8/4 (detail pages, contact page 7/5), 7/5 (`QualityArchitecture`), 4/8, 4/3/3/2
(footer). Below `lg` everything collapses to `grid-cols-1` full width.

---

## 5. Borders

| Property | Value |
|---|---|
| Standard width | **1px** (`border`, `border-b`, `border-t`, `border-l`, `border-l-2`) |
| Emphasis width | **`border-l-2`** (2px) — used exclusively on the left edge of metric blocks (`MetricsRibbon`, `QualityArchitecture` telemetry strip, `CaseStudiesPage` ribbon, `CaseStudyDetailPage` metrics ribbon) |
| Accent border | `border-2` via `ring-1 ring-primary-container` on the HQ hub card and the "Most Popular" tier card |
| Over-image borders | `border-white/10`, `border-white/15`, `border-white/25` on dark scrims |
| Opacity | Only on dark overlays. On light surfaces, borders are **fully opaque** |
| Section separators | Every full-width section except the last on a page carries `border-b border-structural` |

> [REUSABLE] **Sections are divided by a 1px `#e2e4e8` bottom border, not by extra whitespace.**
> This is the mechanism that keeps 64–96px padding from feeling empty. Preserve it.

---

## 6. Radius

`tailwind.config.ts` overrides the default scale:

| Token | Config value | Tailwind default | Lines using it |
|---|---|---|---|
| `DEFAULT` (`rounded`) | **0.125rem (2px)** | 0.25rem | the bare `rounded` is the most common single form — status dots, the logo mark tile, `Badge`, the form `REV 4.2` chip |
| `sm` | 0.125rem (2px) | 0.125rem | ❌ **0 usages** |
| `md` | **0.25rem (4px)** | 0.375rem | 1 — the mega-dropdown service item (`Navbar.tsx:113`) |
| `lg` | **0.5rem (8px)** | 0.5rem | **82** — buttons, inputs, logo tile, inset spec boxes, filter chips, mega dropdown, drawer items |
| `xl` | **0.75rem (12px)** | 0.75rem | **46** — every large card |
| `2xl` | *not overridden* → **1rem (16px)** | 1rem | 2 — `AboutPage` leadership card, `NotFoundPage` icon tile |
| `full` | 9999px | 9999px | 42 — status dots, eyebrow pills, avatar, success circle |
| `3xl` / `4xl` | Tailwind defaults | — | ❌ **0 usages** |
| `t-*` / `b-*` / `r-*` sided variants | — | — | ❌ **0 usages** (no card has an asymmetric radius) |
| arbitrary | `rounded-[3px]` | — | 1 — the unchecked checkbox in `ChecklistSection` |

> Note the config also leaves `2xl`, `3xl`, `4xl` at Tailwind defaults, so the real effective scale is
> **2 / 4 / 8 / 12 / 16 / 9999** — with 4px appearing exactly once.

Where each radius is used:

| Radius | Applied to |
|---|---|
| `rounded` (2px) | The 32px logo mark tile, every 6–8px status dot, all `Badge`s, the form `REV 4.2` chip, the eyebrow telemetry dots |
| `rounded-md` (4px) | Mega-dropdown service item only (`Navbar.tsx:113`) |
| `rounded-lg` (8px) | **All buttons**, all form inputs/selects/textareas, the mega dropdown, filter chips, mobile dispatch card, mobile drawer nav items, footer legal links, the comment-bar input |
| `rounded-xl` (12px) | **All large cards**: capability cards, dossier cards, service index rows, tier cards, hub cards, CTA boxes, the form container, peer-review cards, dossier fact rows |
| `rounded-2xl` (16px) | `AboutPage` leadership card + `NotFoundPage` icon tile — the only two |
| `rounded-full` (9999px) | Status dots (`animate-pulse`; the one `animate-ping` is dead), the eyebrow pills in hero/detail heroes, the `CheckCircle2` success circle, the `ShieldCheck` circle, the leader avatar `w-24 h-24`, the case-study ticker dot |

> [REUSABLE] Radius scale is **2 / 8 / 12 / 16 / 9999** in practice (4px appears exactly once).
> Buttons and inputs are always 8px. Cards are always 12px. The logo tile is 2px — a deliberately
> sharp mark, and one of the cheapest ways to make a logo read as *engineered* rather than *app-like*.

---

## 7. Shadows

Only Tailwind defaults are used — no custom shadow tokens exist.

| Class | Value | Where |
|---|---|---|
| `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Navbar when `isScrolled`; base state of capability cards; form inputs; HQ hub card; non-popular tier cards; selected filter chip |
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `Button` primary + secondary; hero secondary CTA; most CTA bands; `SubmittalForm` container; `DispatchDirectory` card; `AboutPage` leadership card |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | **Hover** on capability cards, pipeline cards, financing cards |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | **Hover** on dossier cards, service rows, hub cards; hero primary CTA; detail-page hero primary CTA |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Mega dropdown; "Most Popular" tier card; **hover** on `CaseStudiesPage` + `CaseStudyDetailPage` dossier cards |
| `shadow-2xl` | Tailwind default | The mobile navigation drawer only |

### Where shadows are deliberately NOT used

- **Never** on section backgrounds.
- **Never** on flat body text or metadata.
- **Never** as a substitute for a border — every card has a `border` *and* may have a shadow.
- **Never** multi-layered. Max one shadow layer per element.
- **Never** blurred/diffused. No `drop-shadow`, no `shadow-2xl` on cards, no `filter: blur`.
- No `box-shadow` transitions. Hover pairs `shadow-xs → shadow-md/lg/xl` **and** a border colour
  change (`border-structural → border-on-surface`) in the *same* `transition-all duration-200`.

> The legacy `DESIGN.md` specifies a custom hover shadow
> `0 4px 16px -2px rgba(17,19,21,0.05)`. **The code uses Tailwind's `shadow-md` instead.** The code
> is the reference.

---

## 8. Spacing scale reference (quick card)

```text
4px   space-xs, gap-1, p-1                       (rarely)
8px   space-sm, gap-2, p-2, px-2, py-1.5, rounded-lg origin
10px  gap-2.5
12px  gap-3, p-3, mb-3, px-3, py-3
16px  margin, space-md, gap-4, p-4, py-4, h-4, w-4 icons, w-6 h-6 input
20px  p-5, min-h-[260px]
24px  gap-6, p-6, py-6, space-lg, gap-6 lg:gap-8
32px  p-8, py-8, gap-8, h-8, w-8, py-16 (base section)
40px  space-xl, py-10
48px  margin-desktop, p-12, py-12, gap-12, py-16 lg:py-20
64px  py-16 (base), py-20 lg:py-20
72px  navbar height (h-[72px])
80px  mb-20
96px  py-24 (lg:py-24)
104px main offset sm:pt-[104px]
```

---

## 9. Token usage census (measured)

| Group | Defined | Actually used |
|---|---|---|
| Colors | 47 | ~20 (`on-background`, `on-surface-variant`, `outline-variant`, `surface-container-high`, `surface-container-highest`, `surface-variant`, `surface-dim` as a bg, `surface-tint`, all four `error*`, `secondary-container`, both `tertiary*` pairs, all `*-fixed*`, and `surface`/`background`/`surface-bright` are unused) |
| `fontSize` | 12 | 1 as written (`headline-lg-mobile`); the other 11 are reached only via the `text-*` half of the pair — and that half is applied 82× total, vs 440× for `font-*`. See §2.1. |
| `fontFamily` | 15 | 12 (the 3 aliases `sans`, `mono`, `space` are unused) |
| `spacing` | 10 | 7 (`space-xs`, `margin-tablet`, `gutter`, `gutter-desktop` unused) |
| `borderRadius` | 6 | 5 (`sm` unused; `2xl`/`3xl` not overridden — Tailwind's 16px/24px apply; `full` is overridden to 9999px, which is already its default, so that line is a no-op) |
| `screens` | **0 custom** — Tailwind defaults `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536` | `sm`, `md`, `lg`, `xl` all used. **`2xl` never used.** |
| dark mode | `darkMode: 'class'` | **Exactly 1 `dark:` variant** — inside `Badge.tsx`'s `variantClasses.dark` string, which *is* rendered 4×. So one real dark surface exists, but nothing ever toggles the class, so it is unreachable in practice. |
| shadows | 0 custom | Tailwind defaults only |
| container | 0 (`max-w-[1320px]` hardcoded) | — |
| animations | **0 in the config.** `@keyframes kenburns` + `.kenburns-active` are raw CSS in `index.css` | `animate-pulse` (12×), `.kenburns-active` (1×, hero), `animate-ping` (1×, **dead** — behind an unused prop), `animate-in` (3×, **dead** — `tailwindcss-animate` is not installed) |

---

## 10. Discrepancies between `DESIGN.md` and the shipped code

The reference design doc lives at `designs/stitch_vertex_solutions_hvac_engineering/mechanical_precision/DESIGN.md`
(identical copies in `mdfile/`, `mdfile1/`, `mdfile2/`). **The implementation deviates from it in
nine places.** When rebuilding, follow the code.

| # | `DESIGN.md` says | Code does | Impact |
|---|---|---|---|
| 1 | Navbar height `76px` | `72px` + a `32px` utility strip (`h-8`) = **104px** | Main offset in `Layout.tsx` is `pt-[72px] sm:pt-[104px]` |
| 2 | `borderRadius.DEFAULT: 0.25rem` | `0.125rem` | All bare `rounded` classes are 2px |
| 3 | `borderRadius.md: 0.375rem` | `0.25rem` | (unused anyway) |
| 4 | Primary ink `#111315` | `on-surface: #191c1d` | Headline colour differs |
| 5 | Muted steel ink `#59616D` | `secondary: #5d5e61` | Body colour differs |
| 6 | Hover shadow `0 4px 16px -2px rgba(17,19,21,.05)` | Tailwind `shadow-md` | Elevation is stronger than documented |
| 7 | Button active `#8E0B20` | ✅ matches (`active:bg-[#8E0B20]`, hardcoded not a token) | — |
| 8 | Input height `40px` | **`h-11` = 44px** on all 10 fields | Slightly taller, more tactile |
| 9 | Badge radius `4px` (`rounded-sm`) | `Badge` uses bare `rounded` = **2px** | Tighter, more mechanical |

Additional in-code quirks a rebuild should decide about:

- **The size half of the type scale is mostly unused.** `font-<token>` is applied 440 times but
  `text-<token>` only 82 times, so the `lineHeight` / `letterSpacing` / `fontWeight` authored into
  `fontSize` are nearly always discarded in favour of an arbitrary `text-[Npx]`. Concretely:
  `<body>` is 16px, `font-body-md` paragraphs are 16px, and `font-headline-md` `h3`s fall back to
  the UA default size. **`font-label-technical text-label-technical` (21×) is the one pairing that
  is actually used correctly** — copy that pattern, drop the other 229.
- **Two ways to reach the same pixel size.** `font-label-mono-sm text-[11px]` (52×) and
  `text-label-mono-sm` (11×) both land on 11px, but the first inherits no leading/tracking. The
  codebase uses both, so mono metadata renders at two different line-heights across the site.
- **The `font-*` half is frequently a pure no-op on headings.** `index.css` `@layer base` already
  sets `font-family: 'Space Grotesk'` on `h1..h6`, so `font-headline-md` on an `<h2>`
  (`CaseStudyDetailPage.tsx:169`) changes nothing. The same line's *size* classes are fine —
  `text-display-xl-mobile sm:text-headline-lg` is 36px / 40px as intended. **There is no cascade
  conflict anywhere**, because `font-<token>` emits `font-family` only and can never compete with
  `text-<token>`. The one thing worth copying is `CaseStudyDetailPage.tsx:76`, the `<h1>`:
  `font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-display-xl-mobile sm:text-headline-lg lg:text-display-xl`
  — the same three keys on both halves, in the same order. That is the pattern to reproduce.
- **Unscaled `text-[13px]` / `text-[14px]` / `text-[10px]`** overrides scattered through cards,
  contradicting the 11/12/13/14/15/18 body scale. `text-[10px]` (20×) and `text-[11px]` (75×) are
  the two most-used type utilities in the site, and neither is in the scale.
- **`Material Symbols Outlined` font is loaded and never used.**
