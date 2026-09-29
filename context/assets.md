# Assets

> **The entire site ships with zero local asset files.** There is no `public/`, no `src/assets/`,
> no `*.svg`, no `*.png`, no `*.jpg`, no `*.webp`, no `*.woff2`. Every image and every font is a
> remote URL. Rebuilding means choosing your own asset pipeline.

---

## 1. Images

### 1.1 Count

| Metric | Value |
|---|---|
| Total image references in source | **22** |
| **Unique** image URLs | **14** |
| Local image files | **0** |
| Host | `lh3.googleusercontent.com` (Google's image CDN, path `/aida-public/…`) |
| Referenced from | 4 files only |

### 1.2 Distribution across the codebase

| File | Refs | Purpose |
|---|---|---|
| `src/data/servicesData.ts` | **6** | one `heroImage` per service → services index, service detail hero, mega dropdown (dropdown does *not* show images) |
| `src/data/caseStudiesData.ts` | **8** | one `image` per case study → case-studies grid, case-study detail hero |
| `src/components/home/HeroSlider.tsx` | **5** | one `image` per hero slide |
| `src/pages/MaintenancePage.tsx` | **3** | 1 page header image + a 3-tile maintenance gallery |

The 4 files account for all 22 references.

### 1.3 De-duplication map (14 unique URLs)

| URL # | Used by | Times referenced |
|---|---|---|
| 1 | `HeroSlider` + `servicesData` | 3 |
| 2 | `HeroSlider` + `servicesData` | 2 |
| 3 | `servicesData` + `caseStudiesData` + `MaintenancePage` | 3 |
| 4 | `servicesData` + `MaintenancePage` | 2 |
| 5 | `HeroSlider` + `servicesData` | 2 |
| 6 | `HeroSlider` + `servicesData` | 2 |
| 7 | `caseStudiesData` | 1 |
| 8 | `caseStudiesData` | 1 |
| 9 | `caseStudiesData` | 1 |
| 10 | `caseStudiesData` | 1 |
| 11 | `caseStudiesData` | 1 |
| 12 | `caseStudiesData` | 1 |
| 13 | `caseStudiesData` | 1 |
| 14 | `HeroSlider` + `MaintenancePage` | 2 |

- **6 URLs are reused across files** (14 unique vs 22 references) — 4 of them between the hero and
  a service, 2 between a service/case-study and the maintenance page.
- **URL #3 is used 3 times** across 3 different files (a service hero, a case-study hero, and the
  maintenance page) — the single most-reused image on the site.
- 7 URLs are case-study-only, i.e. the dossier imagery is the most distinctive asset set.

> ⚠ **These are opaque, unauthenticated CDN URLs with no version control and no licence attached.**
> They are the single largest rebrand risk in the project. Nothing in the repo records who
> licensed them, from where, or under what terms. A rebuild must source its own photography.
> See `project-overview.md` §9 for the replacement policy.

### 1.4 `<img>` attribute audit (the most important table in this file)

There are **10 `<img>` elements** rendering the 22 URL references. **Not one specifies `width`,
`height`, `loading`, `decoding`, or `srcset`.** Every one is `src` + `alt` + a class string.

| Render site | Count | `alt` | Wrapper (the only thing preventing CLS) |
|---|---|---|---|
| `HeroSlider` | 1 | `{slide.headline}` | `min-h-[660px] lg:min-h-[740px]` on the `<section>` |
| `FeaturedCaseStudies` | 1 | `{study.title}` | `relative h-56 w-full overflow-hidden bg-surface-dim` |
| `CaseStudiesPage` | 1 | `{study.title}` | `relative h-56 w-full overflow-hidden bg-surface-dim` |
| `CaseStudyDetailPage` (hero) | 1 | `{study.title}` | `relative h-44 w-full overflow-hidden bg-surface-dim` |
| `CaseStudyDetailPage` (related) | 1 | `{related.title}` | same pattern |
| `ServiceDetailPage` | 1 | `{service.title}` | hero band |
| `ServicesPage` | 1 | `{service.title}` | `lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-surface-dim overflow-hidden` |
| `MaintenancePage` (gallery) | 3 | literal: `Hydronic Testing & Tuning`, `Electronic Diagnostics`, `BACnet Commissioning` | `h-48 overflow-hidden bg-surface-dim` |

The uniform image class is `w-full h-full object-cover` (plus `transition-transform duration-500`
+ `group-hover:scale-105` on the 6 card contexts, and the template class
`` `${isActive ? 'kenburns-active' : ''}` `` on the hero).

**There is not a single `aspect-*` utility in the codebase** — no `aspect-video`, no
`aspect-[4/3]`. Every image box is a **hardcoded pixel height**: `h-56` (224px), `h-44` (176px),
`h-48` (192px), `min-h-[260px]`, or the hero's `min-h-[660px]`/`[740px]`.

Consequences: the *boxes* are sized by CSS so CLS is largely avoided, but **the image files are
not constrained** — no intrinsic size hint, no `loading="lazy"`, no `srcset`, and `bg-surface-dim`
paints a grey placeholder that is visible until the remote file decodes. `ServicesPage` is the one
exception to the fixed height: `min-h-[260px] lg:min-h-full` lets the image grow to the height of
the text column, so its aspect ratio varies with content length.

### 1.5 Alt-text coverage

**All 10 `<img>` elements have an `alt`.** 7 use the record's own title, 3 use literal strings.

| Image | `alt` | Assessment |
|---|---|---|
| Hero | `slide.headline` (e.g. `Mechanical Precision Delivered On Schedule.`) | **Adjectival, not descriptive** — a marketing sentence, not "industrial chiller plant". All 5 slide wrappers stay mounted (`opacity-0`, not `display:none`), so 5 headlines are announced on load. |
| 6 service images | `service.title` | Duplicates the adjacent `<h3>`. These are **decorative** and should be `alt=""`. |
| 8 case-study images | `study.title` | Duplicates the adjacent `<h3>`. Same. |
| 3 maintenance gallery | `Hydronic Testing & Tuning` · `Electronic Diagnostics` · `BACnet Commissioning` | These 3 are the **only good ones** — they name the subject, and in two of the three cases the image carries information the caption does not. |

> [REUSABLE] For a rebuild: give any image whose adjacent text already says the same thing an
> empty `alt=""`. **9 of the 10 here are pure decoration** — only the 3 maintenance tiles
> (7 counting the hero) add information. The current pattern adds noise to the a11y tree without
> adding meaning, and the hero's version is actively misleading.

### 1.6 Iconography — `lucide-react`

| Property | Value |
|---|---|
| Library | `lucide-react` (`^1.16.0`, resolved `1.48.0`) |
| Style | 1.5px stroke, 24×24 viewBox, round caps/joins — the Lucide default |
| Sizes used | `h-3` (12px), `h-3.5` (14px), `h-4` (16px), `h-5` (20px), `h-6` (24px), `h-8` (32px), `h-10` (40px), `h-12` (48px), `h-16` (64px), `w-16 h-16` |
| Weights | **no `strokeWidth` prop anywhere** — every icon uses the default |
| Fill | `fill-*` on a few (e.g. stars, quote marks) |
| Animated | only via the parent's `transition-transform` (nudges, chevron rotate) |
| Count | ~40 distinct icons |

**Rule:** stroke-only, no filled icons except where a filled glyph is semantically a star or a
quotation mark. No icon button without a visible label or an `aria-label`.

**Second icon font — dead weight.** `index.html` requests
`Material Symbols Outlined` from Google Fonts, and `lucide-react` provides every icon actually
rendered. `grep -ri "Material Symbols" src/` returns only the HTML request. This is a wasted
network request (a variable icon font with 5 axes) that can be deleted.

### 1.7 Inline SVG

Exactly one hand-written SVG in the entire project: the **favicon**, inlined as a
`data:image/svg+xml` URI in `index.html:5`. It is a 24×24 crimson (`%23c8102e`) **warning triangle**
with a triangular cut-out.

> ⚠ **A hazard icon for a mechanical/HVAC contractor's favicon is a branding error, not a
> choice.** It reads as a safety-warning site, not an engineering firm. A rebuild should use a
> wordmark, a monogram (e.g. `VS`), or a mechanical glyph (fan blade, valve wheel, duct elbow).
> Also note the `<link>` has no `rel="apple-touch-icon"`, so iOS home-screen bookmarks get a
> screenshot instead of an icon.

### 1.8 Logotype

There is **no logo image**. The wordmark is live text in `Navbar.tsx` and `Footer.tsx`:
`Vertex Solutions` in Space Grotesk 600, split across two lines/segments. The "V" is not
stylised. This is a deliberate, defensible choice for a text-first engineering brand — and it means
a rebrand is a text change, not an asset hunt.

---

## 2. Fonts

### 2.1 The requests (`index.html:11–14`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```

| Family | Weights requested | Variable? | Used for |
|---|---|---|---|
| **Inter** | 400, 500, 600, 700 | no (4 static) | body copy, buttons, UI, all card text |
| **JetBrains Mono** | 400, 500 | no (2 static) | eyebrows, mono chips, metric labels, dossier codes, licence numbers, units |
| **Space Grotesk** | 600 only | no (1 static) | every display heading, the wordmark |
| ~~Material Symbols Outlined~~ | variable, 5 axes | yes | **never used** — delete |

`preconnect` is done correctly (2 origins, the second with `crossorigin`).
`display=swap` is set on Inter/JetBrains/Space Grotesk — **correct**, prevents FOIT. It is **not**
set on the Material Symbols request, which is harmless because the family is unused.

### 2.2 Font stacks (`tailwind.config.ts` → `theme.extend.fontFamily`)

```js
'display-xl': ['"Space Grotesk"', 'sans-serif'],
'display-xl-mobile': ['"Space Grotesk"', 'sans-serif'],
'headline-lg': ['"Space Grotesk"', 'sans-serif'],
'headline-lg-mobile': ['"Space Grotesk"', 'sans-serif'],
'headline-md': ['"Space Grotesk"', 'sans-serif'],
'headline-sm': ['"Space Grotesk"', 'sans-serif'],
'body-lg': ['"Inter"', 'sans-serif'],
'body-md': ['"Inter"', 'sans-serif'],
'body-sm': ['"Inter"', 'sans-serif'],
'button-text': ['"Inter"', 'sans-serif'],
'label-technical': ['"JetBrains Mono"', 'monospace'],
'label-mono-sm': ['"JetBrains Mono"', 'monospace'],
sans: ['"Inter"', 'sans-serif'],
mono: ['"JetBrains Mono"', 'monospace'],
space: ['"Space Grotesk"', 'sans-serif'],
```

**15 entries, and the fallbacks are bare — just `sans-serif` / `monospace`.** There is no
`ui-sans-serif` / `system-ui` / `-apple-system` fallback chain. If Space Grotesk fails to load,
headings fall back to the generic `sans-serif` of the OS — which on most systems resolves to
Arial/Helvetica, i.e. visibly *not* Inter. The body text and the headings will then look like two
different brands. A rebuild should add
`['"Space Grotesk"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif']`.

Three aliases exist and are unused in components: `sans`, `mono`, `space`.

### 2.3 ⚠ Render-blocking and no self-hosting

| Issue | Impact |
|---|---|
| **3 render-blocking stylesheet requests to `fonts.googleapis.com`** (4 counting the dead icon font) | On a cold cache these are on the critical path in a market with poor connectivity to Google's CDN. |
| **No `font-display` control beyond `swap`** | Fine, but the metrics-override class `.font-display` only changes `font-family`, so the swap is visible as a full block-level reflow. |
| **No self-hosted subset** | No control over which subsets are served, no guaranteed availability. |
| **The legacy `DESIGN.md` names different fonts** (Roboto / Space Grotesk / IBM Plex Mono) — code wins. | Do not copy the doc. |
| **`font-weight` 500 (Medium) is used for headings/badges** and is requested. Good. | 400–700 all present, so no synthetic bolding anywhere. |

### 2.4 Typography metrics (the reason the type feels engineered)

`theme.extend.fontFamily` and `theme.extend.fontSize` **share the same 12 token keys.** That
overlap is the mechanism:

| Utility | Source key | Emits |
|---|---|---|
| `font-display-xl` | `fontFamily['display-xl']` | `font-family: "Space Grotesk", sans-serif` |
| `text-display-xl` | `fontSize['display-xl']` | `font-size: 56px; line-height: 64px; letter-spacing: -0.02em; font-weight: 600` |
| `font-body-md` | `fontFamily['body-md']` | `font-family: "Inter", sans-serif` |
| `text-body-md` | `fontSize['body-md']` | `font-size: 15px; line-height: 25px; font-weight: 400` |

So `font-X` sets the **family** and `text-X` sets the **size, leading, tracking and weight**.
They are complementary, not redundant. Measured usage:

| Token | Size / LH / tracking / weight | `font-*` uses | `text-*` uses |
|---|---|---|---|
| `display-xl` | 56px / 64px / -0.02em / 600 | — | — |
| `display-xl-mobile` | 36px / 44px / -0.01em / 600 | — | — |
| `headline-lg` | 40px / 48px / -0.01em / 600 | — | — |
| `headline-lg-mobile` | 28px / 36px / 0 / 600 | 0 | 0 — **defined, never used** |
| `headline-md` | 28px / 36px / -0.005em / 600 | — | — |
| `headline-sm` | 20px / 28px / 0 / 600 | **49** | 4 |
| `body-lg` | 18px / 30px / 0 / 400 | — | — |
| `body-md` | 15px / 25px / 0 / 400 | — | — |
| `body-sm` | 13px / 20px / 0.01em / 400 | — | — |
| `button-text` | 14px / 20px / 0.01em / 600 | **47** | 8 |
| `label-technical` | 12px / 16px / 0.06em / 500 | — | — |
| `label-mono-sm` | 11px / 14px / 0.04em / 400 | **139** | 11 |

`src/index.css` supplies the element-level defaults:
`html { font-family: 'Inter' }`, `h1..h6 { font-family: 'Space Grotesk' }`, and
`code, pre, .font-mono, [data-mono] { font-family: 'JetBrains Mono' }`.

> [REUSABLE] **The `font-X` = family / `text-X` = metric overlap is the best idea in this
> codebase.** One token name carries an entire typographic personality, and you can mix and match
> deliberately: `font-headline-sm text-[28px]` gives you Space Grotesk at 28px with no
> line-height/tracking/weight, which is exactly what ~20 card headings do. The cost is
> **253 arbitrary `text-[Npx]` utilities** — `text-[11px]` ×75, `text-[12px]` ×43, `text-[13px]`
> ×39, `text-[14px]` ×24, `text-[10px]` ×20, `text-[15px]` ×14, `text-[18px]` ×13, `text-[16px]`
> ×13, `text-[20px]` ×7, `text-[22px]`/`text-[17px]` ×2 each, `text-[19px]` ×1. Two thirds of the
> type in the site bypasses the scale entirely. A rebuild should add a 5th step to the scale
> instead (`text-2xs` = 10px, `text-xs` = 12px) and delete the arbitrary values.

---

## 3. What a rebuild needs to acquire

| Asset class | Reference impl. | What to do |
|---|---|---|
| **Hero photography** (5 URLs, 1 `<img>`) | remote `aida-public` URLs | 5 landscape industrial/mechanical shots, 2400px wide, ≤300KB AVIF/WebP each, focal point chosen for the left-text/right-image crop |
| **Service photography** (6 URLs) | remote, 4 reused from hero | 6 images |
| **Case-study photography** (8 URLs) | remote, 7 unique | 8 images matching the 8 sectors; the most content-specific assets in the project |
| **Maintenance imagery** (3 URLs) | remote, 2 reused | 3 images for the gallery + 1 page header |
| **Favicon** | inline warning triangle (wrong) | Design a monogram or wordmark; ship `.svg` + `favicon.ico` + `apple-touch-icon.png` + a web manifest |
| **Logotype** | live text | Keep as live text; if a mark is added, ship it as inline SVG, not an image |
| **Icons** | `lucide-react` | Keep Lucide; do **not** ship a second icon font |
| **Fonts** | Google Fonts, 3 families | Self-host WOFF2 subsets; drop Material Symbols; add a real fallback chain |
| **Press / certification marks** | **none shipped** | The site *claims* ASHRAE/NEBB/ASME membership in copy and the footer but displays **no logos**. If the rebuilt brand is genuinely a member, these are high-trust assets worth adding — with permission. |

**Recommended target budget** (for a rebuild, 14 images):
`<picture>` with AVIF + WebP + fallback, `width`/`height` attributes, `loading="lazy"`
(everything except the active hero slide), `decoding="async"`, `fetchpriority="high"` on the first
hero slide only, and an `srcset` at 640/1024/1600w. See `performance.md` §4.

---

## 4. Reference to the image files

Full URL list (14 unique) is reproducible with:

```
python - <<'PY'
import re, glob
urls = set()
for f in glob.glob("src/**/*.ts*", recursive=True):
    urls |= set(re.findall(r"https://lh3\.googleusercontent\.com/aida-public/[^\s\"'\`)]+",
                           open(f, encoding="utf-8", errors="replace").read()))
for u in sorted(urls): print(u)
PY
```

`rg` is not installed in this environment; the Python form above is the substitute.
