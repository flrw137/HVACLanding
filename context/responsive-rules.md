# Responsive Rules

> **Breakpoints are 100% Tailwind defaults.** `tailwind.config.ts` adds **no** `screens` key, so
> the entire site is designed against: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`,
> `2xl: 1536px`. **`2xl` is never used anywhere.**

---

## 1. The five breakpoints and what each one actually controls

| BP | Width | What changes at this width in this codebase |
|---|---|---|
| `sm` | **640px** | ① the navbar **utility strip appears** (`hidden sm:block`); ② `<main>` offset jumps `pt-[72px]` → `pt-[104px]`; ③ H1/H2 promote `display-xl-mobile` (36px) → `headline-lg` (40px); ④ body copy `body-md` (15px) → `body-lg` (18px); ⑤ all 2-up form rows become 2 columns; ⑥ hero `<h1>` reserves `min-h-[90px]` → `min-h-[140px]`; ⑦ `form p-6` → `p-10`; ⑧ footer legal bar becomes a row; ⑨ `PartnerGrid` partner tiles 2 → 3 columns |
| `md` | **768px** | ① the **entire desktop nav becomes visible? No — that is `xl`.** At `md`: ② `MetricsRibbon` 2 → 4 columns; ③ `CapabilitiesGrid` 1 → 2 columns; ④ `PipelineSection` 1 → 2; ⑤ `ChecklistSection` 1 → 2; ⑥ `FeaturedCaseStudies` 1 → 3; ⑦ `PartnerGrid` becomes a horizontal row (`flex-col md:flex-row items-center`); ⑧ `MaintenancePage` gallery 1 → 3; ⑨ section-header rows become `md:flex-row md:items-end`; ⑩ the `MAINTAINANCE` mono band's middle separator appears (`hidden md:inline`); ⑪ hero tab strip becomes `md:w-auto` |
| `lg` | **1024px** | ① **horizontal gutters 16px → 48px** (`px-margin` → `lg:px-margin-desktop`); ② **all 12-column grids appear** (`lg:grid-cols-12` + `gap-12 items-start`); ③ **H1/H2 → `display-xl` 56px**; ④ section vertical padding escalates (`lg:py-20` / `lg:py-24`); ⑤ **the footer becomes 4/3/3/2**; ⑥ `CapabilitiesGrid` 2 → 4; ⑦ `PipelineSection` 2 → 3; ⑧ `TierMatrixSection` becomes 3 tier cards; ⑨ `ServiceDetailPage`/`CaseStudyDetailPage` service rows become 5/7; ⑩ `ContactPage` becomes 7/5; ⑪ `MetricsRibbon` gap `gap-6` → `lg:gap-8`; ⑫ `ServiceAreasPage` hubs 1 → 3 |
| `xl` | **1280px** | ① **the desktop nav bar switches on** (`hidden xl:flex`) and the hamburger switches off (`xl:hidden`); ② the wordmark's sub-line "Mechanical & Industrial HVAC" **hides** (`xl:hidden`); ③ the mobile drawer becomes unavailable (`xl:hidden`) |
| `2xl` | 1536px | **Nothing. Never used.** |

> ⚠ **The single most important consequence:** the desktop navigation does not appear at 1024px —
> it appears at **1280px**. Between 1024px and 1279px the user gets the full 12-column editorial
> layout with **a hamburger menu and no visible menu links**. The CTA button *is* visible (it is
> outside the `xl:flex` nav), so the site is never unusable, but the 7 primary links are hidden
> for 256px of viewport width. This is a deliberate space decision, not an oversight, but it is
> worth knowing before you "fix" it.

---

## 2. Breakpoint strategy (the four rules)

1. **Mobile-first, min-width prefixes only.** There is not one `max-*` variant in the codebase.
2. **Content-driven breakpoints, not device-driven.** `sm: 640` is chosen because the form's
   2-up rows need it and the H1 needs it; `md: 768` because 2-up card grids need it;
   `lg: 1024` because 12-column splits need it; `xl: 1280` because 7 nav links + wordmark + CTA
   need it. Nothing is chosen to match a phone model.
3. **Exactly one step for horizontal padding** (at `lg`) and **one step for gutters** — there is
   deliberately no intermediate padding. Do not add one.
4. **Vertical padding gets a 3-step ladder** (`py-12` < `py-16 lg:py-20` < `py-16 lg:py-24`), but
   horizontal padding gets a single step. Do not confuse the two.

---

## 3. Breakpoint reference tables

### 3.1 Typography

| Token | < 640 | 640–1023 | ≥ 1024 |
|---|---|---|---|
| H1 / section H2 | `display-xl-mobile` **36px / 44px / -0.01em / 600** | `headline-lg` **40px / 48px / -0.01em / 600** | `display-xl` **56px / 64px / -0.02em / 600** |
| Body | `body-md` **15px / 25px** | `body-lg` **18px / 30px** | `body-lg` 18px |
| Mono eyebrow | `label-technical` 12px (no change) | | |
| Mono chip | `label-mono-sm` 11px (no change) | | |
| Buttons | `label-technical` 14px (no change) | | |

```html
<!-- The canonical responsive heading class string. Appears 11+ times. -->
font-display-xl-mobile sm:font-headline-lg lg:font-display-xl
```

> Body text and mono labels **never change size** across breakpoints. Only the display scale moves.
> That restraint is why the site doesn't look like three different designs stacked on top of
> each other.

### 3.2 Spacing

| Context | < 640 | 640–1023 | ≥ 1024 |
|---|---|---|---|
| **Horizontal gutter** | **16px** | **16px** | **48px** |
| Section padding (standard) | `py-16` = 64px | 64px | `lg:py-20` = 80px |
| Section padding (tall) | `py-16` = 64px | 64px | `lg:py-24` = 96px |
| Section padding (compressed) | `py-12` = 48px | 48px | 48px (no `lg:` variant) |
| Page header | `pt-16 pb-12` | `pt-16 pb-12` | `lg:pt-20 lg:pb-16` |
| Hero | `pt-16 pb-12` | `sm:pt-20 pb-12` | `lg:pt-24 pb-12` |
| Grid gap (major grids) | `gap-8` = 32px | 32px | 32px |
| 12-col grid gap | `gap-12` = 48px (from the `grid-cols-1` base) | 48px | 48px |
| `MetricsRibbon` gap | `gap-6` = 24px | 24px | `lg:gap-8` = 32px |
| CTA box padding | `p-8` = 32px | 32px | `lg:p-12` = 48px |
| Form container padding | `p-6` = 24px | `sm:p-10` = 40px | 40px |
| 5/7 service row text | `p-6` | `sm:p-8` | 32px |

### 3.3 Layout collapse

| Component | < 640 | 640–767 | 768–1023 | ≥ 1024 | ≥ 1280 |
|---|---|---|---|---|---|
| Nav links | drawer | drawer | drawer | drawer | **7 links + CTA** |
| Nav CTA | visible | visible | visible | visible | visible |
| Utility strip | hidden | visible | visible | visible | visible |
| `MetricsRibbon` | 2 | 2 | 4 | 4 | 4 |
| `PartnerGrid` | stacked, 2-up tiles | 3-up tiles | horizontal row, 3-up | row, 6-up | row, 6-up |
| `CapabilitiesGrid` | 1 | 1 | 2 | 4 | 4 |
| `PipelineSection` | 1 | 1 | 2 | 3 | 3 |
| `ChecklistSection` | 1 | 1 | 2 | 2 | 2 |
| `FeaturedCaseStudies` | 1 | 1 | 3 | 3 | 3 |
| `MaintenancePage` gallery | 1 | 1 | 3 | 3 | 3 |
| `CaseStudiesPage` grid | 1 | 1 | 2 | 3 | 3 |
| `ServiceAreasPage` hubs | 1 | 1 | 2 | 3 | 3 |
| `TierMatrixSection` | 1 | 1 | 1 | 3 | 3 |
| Service index row | image above text | image above text | image above text | **5/7 side by side** | 5/7 |
| Service detail | 8 over 4 | 8 over 4 | 8 over 4 | **8/4 side by side** | 8/4 |
| Case-study detail | 8 over 4 | 8 over 4 | 8 over 4 | **8/4 side by side** | 8/4 |
| `ContactPage` | form, then directory | form, then directory | form, then directory | **7/5 side by side** | 7/5 |
| `QualityArchitecture` | 7 over 5 | 7 over 5 | 7 over 5 | **7/5 side by side** | 7/5 |
| Footer | 1 col | 1 col | 2 cols | **4/3/3/2** | 4/3/3/2 |
| Form field rows | 1 col | 2 cols | 2 cols | 2 cols | 2 cols |
| Hero min-height | `660px` | `660px` | `660px` | `740px` | `740px` |
| Hero CTA row | wraps | wraps | wraps | row | row |
| Hero tab strip | `overflow-x-auto` scroll | scroll | `md:w-auto` | auto | auto |

---

## 4. Per-breakpoint component notes

### `< 640px` (phone)
- The utility strip is gone → `<main>` only needs 72px of top offset.
- The nav is entirely the drawer. **The drawer is not scroll-locked and the body behind it still
  scrolls.** A phone user can scroll the page while the drawer is open.
- **Everything is one column.** The only 2-up layouts that survive are `MetricsRibbon` (4 short
  label/value pairs) and the hero tab strip.
- Cards: `p-4`…`p-6`, `gap-4`…`gap-6`.
- Buttons: primary CTAs inside `flex flex-wrap` groups wrap onto their own lines; hero CTAs are
  `px-6 py-3.5` full-ish-width inline-flex, so they still sit side by side until ~380px.
- The mobile drawer hits `max-h-[85vh] overflow-y-auto` with 7 nav items + a 6-item service list
  + 2 full-width CTAs — it overflows and must scroll.
- `index.css` sets `body { overflow-x: hidden }` — a blunt fix for the horizontal overflow that
  `w-[540px]`-class desktop-only elements or long mono strings would otherwise cause. Verify no
  element is actually overflowing before relying on it.

### `640–1023px` (large phone / small tablet)
- The **utility strip appears**, adding 32px above the nav, and `<main>` compensates with
  `sm:pt-[104px]`.
- H1 promotes to 40px; body to 18px.
- **The drawer is still the nav.** The reader sees a two-tier header with a phone number but no
  menu links.
- Two-up form rows, 2-up card grids at `md`.

### `1024–1279px` (tablet landscape / small laptop) — the awkward band
- Full 12-column editorial layout, 48px gutters, 56px display type, 80–96px section padding.
- **Still the hamburger.** The `xl:hidden` toggle is visible, the 7 links are not.
- The wordmark sub-line "Mechanical & Industrial HVAC" is still visible.
- This is the band to check first when testing a rebuild.

### `≥ 1280px` (the design target)
- Everything at once: utility strip + 7 links + Services mega dropdown + CTA.
- The container is `1320px − 96px = 1224px` of live content, or 1296px at `2xl` viewport with
  the container centred in the 1536px canvas.
- Tier cards are 3-up and the "Most Popular" middle card is the visual centre of the page.

---

## 5. Fixed-offset arithmetic (the fragile part)

```text
< 640px :  navbar = 72px                    → main pt-[72px]
≥ 640px :  navbar = 32px strip + 72px bar   → main sm:pt-[104px]
```

The offsets live in **two different files**: `Navbar.tsx` (`h-8`, `h-[72px]`) and
`Layout.tsx` (`pt-[72px] sm:pt-[104px]`), and they are connected only by a comment block in
`Layout.tsx:35–40`. Changing the navbar height without changing the `<main>` padding will place
the first section underneath the header on every page.

The legacy `DESIGN.md` says the navbar is `76px` — **wrong**. Code is the reference.

---

## 6. Accessibility of the responsive behaviour

| Breakpoint | What a keyboard user gets | What a screen reader gets |
|---|---|---|
| All | The hamburger is a real `<button>` with `aria-label="Toggle mobile menu"`, but it is **removed from the DOM entirely below `xl`** (`xl:hidden`), so at ≥1280px the label no longer exists | Same — the button is not rendered, so it is correctly absent from the a11y tree |
| All | The Services mega dropdown is `hidden xl:flex`'s parent, so it is unreachable by keyboard at any width (hover-only) | No `aria-expanded`, no `aria-haspopup`, no `role="menu"` |
| All | The mobile drawer has no focus trap, no `role="dialog"`, no `Escape` handler and no focus restoration | Focus stays on the toggle; `Tab` walks into page content behind the open drawer |
| All | The checklist rows are `<div onClick>` — not focusable at any width | No `role="checkbox"`, no `aria-checked` |

See `accessibility.md` for the full list.

---

## 7. Testing matrix for a rebuild

Verify at these **five** widths (not the usual three), because the design has behaviour at `sm`,
`md` and `lg` that most sites do not:

| Width | Height | What you are checking |
|---|---|---|
| 375px | 812 | 1-col everywhere; drawer overflows and scrolls; hero tab strip scrolls horizontally |
| 640px | 900 | utility strip appears; header grows to 104px; **verify `<main>` offset still clears it** |
| 768px | 1024 | 2-up card grids; the `MaintenancePage` gallery jumps to 3; the `md` separator appears |
| 1100px | 900 | **the awkward band** — 12-col layout + 48px gutters + 56px type + *no menu links* |
| 1440px | 900 | the design target; mega dropdown hover; 3-up tiers; 4/3/3/2 footer |

Also check: 1279px ↔ 1280px (the nav switch), 1023px ↔ 1024px (the gutter jump), and
639px ↔ 640px (the header-height jump). Those three 1-pixel boundaries are where this layout
breaks if it has been modified.
