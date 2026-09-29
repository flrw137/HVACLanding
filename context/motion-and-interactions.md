# Motion & Interactions

> The site's motion philosophy is **restrained and largely implicit**. There is no animation
> library in use, no scroll-triggered reveal, no parallax, no page transition, and **no
> `prefers-reduced-motion` handling whatsoever**. Everything below is CSS `transition-*` plus a
> small amount of hand-written state and a `setInterval`.

---

## 1. Inventory — what actually moves

| # | Mechanism | Where | Trigger | Duration / easing |
|---|---|---|---|---|
| 1 | Hero slide cross-fade | `HeroSlider` slide wrappers | `currentSlide` change | `duration-1000 ease-in-out` (opacity) |
| 2 | Hero Ken Burns zoom | `.kenburns-active` in `index.css` | CSS, infinite, on the active slide only | `12s ease-in-out infinite alternate` |
| 3 | Hero autoplay | `setInterval` | every 7000ms | — |
| 4 | Hero progress bar width | inline `style` + `transition-all` | `currentSlide` change | `duration-300` |
| 5 | Hero text transitions | `<h1>` / `<p>` | `currentSlide` change | `transition-all duration-300` |
| 6 | Navbar scroll shadow | `isScrolled` from a scroll listener at `scrollY > 20` | scroll | `transition-shadow duration-200` |
| 7 | Services mega dropdown | `isServicesOpen` on `onMouseEnter/Leave` | hover | `duration-150` **but see §3** |
| 8 | Services dropdown chevron | `group-hover:rotate-180` | hover | `duration-200` — **broken, see §3** |
| 9 | Mobile drawer | conditional render | toggle click | `duration-200` — **broken, see §3** |
| 10 | Form confirmation panel | conditional render | submit success | `duration-200` — **broken, see §3** |
| 11 | Card hover lift | `hover:-translate-y-0.5` | hover | `transition-all duration-200` |
| 12 | Card hover border + shadow | `hover:border-on-surface hover:shadow-md/lg/xl` | hover | `transition-all duration-200` |
| 13 | Image hover zoom | `group-hover:scale-105` | hover | `transition-transform duration-500` |
| 14 | Arrow nudge | `group-hover:translate-x-0.5` / `translate-x-1` | hover | `transition-transform` (default 150ms) |
| 15 | Dot scale on hover | `group-hover:scale-125` | hover | `transition-transform` |
| 16 | Status dot pulse | `animate-pulse` (Tailwind) | infinite | 2s cycle, default easing |
| 17 | Badge ping | `animate-ping` (Tailwind) | infinite | 1s cycle, `opacity-75` — ⚠ **dead**: behind `Badge`'s `hasPulse` prop, which no call site sets |
| 18 | Colour transitions on links/buttons | `transition-colors` | hover/focus | default **150ms** |
| 19 | Smooth scrolling | **Lenis** in `Layout` | wheel/touch/keys | `duration: 1.1`, expo-out easing |
| 20 | Route scroll reset | `ScrollToTop` on `pathname` change | route change | `behavior: 'instant'` |

**Total distinct motion behaviours: 20.** Of these, **1 is a silent no-op**
(`border-structural/50`, §3.4), **1 is a wrong-value no-op** (`group-hover:rotate-180` never
rotates, §3.2), and **2 more render wrong** (mobile drawer + form panel, §3.3 — the
`duration-200` / `duration-300` never take effect because there is no `transition-*` class).
There is no `useRef` observer, no `IntersectionObserver`, no `Framer Motion`, no `GSAP` import
anywhere, and no `transitionDuration` key in the config — every `duration-*` is a Tailwind default.

---

## 2. Motion rules

1. **Three duration families.** `150ms` / `200ms` for UI feedback (colour, border, shadow,
   transform) and `300ms` for the hero cross-fade, plus `500ms` for image zooms and `1000ms` for
   the mega-menu fade. Nothing is 400ms. Nothing is 800ms. All six values are Tailwind defaults —
   the config defines no `transitionDuration`.
2. **One easing strategy.** `transition-colors`, `transition-all`, and `transition-transform` with
   Tailwind's default `cubic-bezier(0.4, 0, 0.2, 1)`. The only non-default easings are
   `ease-in-out` on the hero cross-fade and `ease-in-out` on the Ken Burns keyframes.
3. **`transition-all` is the default choice, not `transition-colors`.** Cards use `transition-all`
   precisely so the border colour and the shadow animate together.
4. **Elevation always animates with colour.** Every `hover:shadow-*` is paired with
   `hover:border-on-surface` in the same `transition-all`.
5. **Image zooms are always 500ms.** `transition-transform duration-500 group-hover:scale-105` is
   the identical pattern in `FeaturedCaseStudies`, `ServicesPage`, `MaintenancePage`,
   `CaseStudiesPage`, and `CaseStudyDetailPage`. The slow, small zoom reads as "photographic"
   rather than "UI".
6. **Arrow icons nudge, never grow.** `translate-x-0.5` on 13px tertiary links, `translate-x-1` on
   14px card links.
7. **Hover effects never apply on touch.** There is **no `hover:` guard** (no
   `@media (hover: hover)`) and no `active:`-equivalent for the card lifts. On a touch device
   these simply do not fire, which is the correct outcome by accident.
8. **No element animates more than one property on hover** (except the card triple, which is
   border + shadow + translate as a single `transition-all`).
9. **No `will-change`, no `transform: translateZ`, no GPU-hinting layer** anywhere.
10. **No animation loops other than the 12 `animate-pulse` status dots and the Ken Burns zoom.**
    The site's only `animate-ping` is dead code — it sits behind `Badge`'s `hasPulse` prop, which
    none of the 9 `<Badge>` call sites passes, so it never paints.

---

## 3. ⚠ Broken / non-functional motion (4 real defects)

### 3.1 `tailwindcss-animate` is not installed — 4 class groups are dead

`package.json` has no `tailwindcss-animate` dependency and `tailwind.config.ts` has
`plugins: []`. The following classes are therefore **plain strings with no generated CSS**:

| Class | Where | Intended | Actual |
|---|---|---|---|
| `animate-in fade-in slide-in-from-top-1 duration-150` | `Navbar.tsx:102` (mega dropdown) | fade + 4px slide-in | **instant appearance** |
| `animate-in slide-in-from-top-2 duration-200` | `Navbar.tsx:172` (mobile drawer) | slide down | **instant appearance** |
| `animate-in zoom-in-95 duration-200` | `SubmittalForm.tsx:88` (confirmation panel) | scale up from 95% | **instant appearance** |
| `scrollbar-none` | `HeroSlider.tsx:158` (tab strip) | hide the scrollbar | **scrollbar still visible** |

Fix: `npm i -D tailwindcss-animate` and add it to `plugins`, **or** replace with real Tailwind
keyframes. The visual impact is small (things appear instantly instead of animating) but the
`duration-150`/`duration-200` classes are also doing nothing useful here, which makes the code
misleading.

### 3.2 The mega-dropdown chevron never rotates

```tsx
<NavLink className={({isActive}) => `… border-b-2 font-button-text …`}>
  <span>{link.label}</span>
  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
</NavLink>
```

`group-hover:` requires a `group` class on an **ancestor**. The wrapper is
`className="relative h-full flex items-center"` — **no `group`**. The chevron therefore never
rotates. Fix: add `group` to the wrapper (or `group` to the `NavLink` and change to `group-hover`
on the chevron — but the wrapper is the right target so the chevron rotates while the panel is
open).

### 3.3 `z-1` is not a Tailwind class

Used 7 times in `HeroSlider.tsx` and `ServiceDetailPage.tsx` on the gradient scrims. Tailwind's
default z-index scale is `0 / 10 / 20 / 30 / 40 / 50` and the config adds no `zIndex` extension,
so `z-1` produces **nothing**. The scrims still paint above the image layer purely because of DOM
order. This is load-bearing-by-accident: any future reordering of those divs silently breaks the
hero's legibility.

### 3.4 `border-structural/50` produces no CSS

`TierMatrixSection.tsx:134` uses `border-t border-structural/50`. `.border-structural` is a
hand-written class in `index.css`, **not** a Tailwind colour utility, so Tailwind cannot synthesise
an opacity variant for it. The `border-t` falls back to `border-color: currentColor`, and because
the FAQ panel inherits `text-on-surface` (`#191c1d`) the open FAQ answer gets a **dark 1px
separator** instead of the intended 50% grey.

*(The sibling `bg-surface-container-low/50` in the same class string **does** work, because
`surface-container-low` is a real `theme.extend.colors` entry.)*

### 3.5 Also dead

| Class | Where | Note |
|---|---|---|
| `text-structural-dim` | `MaintenancePage.tsx:26` | No such colour token; the `|` separator inherits `text-secondary` |
| `text-button-text` next to `font-button-text` | 8 places | **Not dead.** `font-button-text` emits `font-family: Inter`; `text-button-text` emits 14px/20px/0.01em/600. The pair is the *correct* way to consume the token, and `font-bold` on the same element then overrides the 600 → 700 |
| `text-label-mono-sm` next to `font-label-mono-sm` | 11 places | Same — this is the token working as designed |
| `font-label-technical text-label-technical` | 38 places | Same, and the only pairing used consistently in the codebase |
| `font-headline-md` on the `<h2>` | `CaseStudyDetailPage.tsx:169` | Harmless no-op: `index.css` `@layer base` already gives every `h1..h6` Space Grotesk. The `font-*` half emits `font-family` only, so it **cannot** collide with the `text-*` half — sizes are 36px / 40px as intended |
| `shadow-none` | `Navbar.tsx:154` | Cancels nothing (a `<Link>` has no default shadow) |

> ⚠ **The reason this section exists is worth keeping in mind:** Tailwind can only synthesise
> opacity variants (`/50`) and responsive prefixes for **theme keys**, and only for the utility that
> key drives. A hand-written `.border-structural` in `index.css` can never grow a `/50` variant, and
> a `fontSize` key can never grow an `sm:` prefix — it can only be a different *key*. So
> `font-headline-sm sm:font-headline-sm` would be a no-op, while
> `text-display-xl-mobile sm:text-headline-lg` is not. Both spellings are present here.

---

## 4. Hero slider — full behaviour spec

### 4.1 State & timing

```tsx
const [currentSlide, setCurrentSlide] = useState(0);
const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
const slideDuration = 7000;                                  // 7 s

const nextSlide = () => setCurrentSlide(p => (p + 1) % HERO_SLIDES.length);

useEffect(() => {
  autoPlayRef.current = setInterval(nextSlide, slideDuration);
  return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
}, [currentSlide]);
```

| Property | Value |
|---|---|
| Slide count | **5** |
| Interval | 7000ms |
| `currentSlide` clamped | yes — modulo `% 5` |
| Interval reset on manual tab click | **yes** — the effect depends on `currentSlide`, so clicking a tab restarts the 7s timer |
| Effect cleanup on unmount | yes — `clearInterval` |
| `useRef` usage | only to hold the interval id (unnecessary; a local `const id` would do) |
| Total cycle time | 35s |

### 4.2 Cross-fade mechanics

All 5 slides are **always mounted**; only opacity changes.

```html
<div class="absolute inset-0 transition-opacity duration-1000 ease-in-out
            opacity-100">            <!-- active -->
<div class="absolute inset-0 transition-opacity duration-1000 ease-in-out
            opacity-0 pointer-events-none">   <!-- inactive -->
```

Because inactive slides are `opacity-0` but not `display:none`, **all 5 `<img>` elements are in the
layout and in the accessibility tree at all times** — so a screen reader announces 5 hero headlines
on page load, and the browser may fetch/decode all 5 images. (See `performance.md` §3.)

### 4.3 Ken Burns

```css
@keyframes kenburns { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
.kenburns-active { animation: kenburns 12s ease-in-out infinite alternate; }
```

Applied via a template class: `${isActive ? 'kenburns-active' : ''}`. The `alternate` direction
means the zoom drifts 1.00 → 1.05 → 1.00 over 24s, always slightly in. Because only the active
slide carries the class, **the zoom restarts from 1.00 on every slide change** — a subtle but
intentional-looking reset.

### 4.4 Progress bar

```tsx
<div className="absolute top-0 left-0 right-0 h-1 bg-white/15 z-30">
  <div className="h-full bg-primary-container transition-all duration-300"
       style={{ width: `${((currentSlide + 1) / 5) * 100}%` }} />
</div>
```

The bar **jumps in 20% steps at slide change**; it does not animate linearly over 7 seconds. It is
a discrete step indicator, not a timer. `transition-all duration-300` smooths the jump.

### 4.5 Layout-shift prevention

| Element | Reserved height |
|---|---|
| `<h1>` | `min-h-[90px]` (< 640px), `sm:min-h-[140px]` |
| `<p>` subhead | `min-h-[60px]` |
| `<section>` | `min-h-[660px]`, `lg:min-h-[740px]` |

Without these, every slide change with a different headline length would reflow the CTAs and
shake the layout. **This is the one genuinely well-engineered motion decision in the codebase** —
and it is done with hardcoded pixel values rather than `min-h-*` in `em` or a measured height.

### 4.6 Hero interaction gaps

| Missing | Consequence |
|---|---|
| Pause on hover / focus | Reading the copy is impossible without the slide changing under you |
| Pause / play control | WCAG 2.2.2 requires a mechanism to pause auto-updating content |
| `prefers-reduced-motion` guard | Ken Burns + cross-fade run regardless of the OS setting |
| `aria-roledescription="carousel"` + `aria-live` | No announcement of slide changes |
| Touch swipe | `overflow-x-auto` exists on the *tab strip* but not on the slide area |
| Arrow-key navigation | Tabs are real `<button>`s and are focusable, so `Enter`/`Space` works; arrows do not |
| `prefers-reduced-motion` on `duration-1000` | The cross-fade is the most likely motion to bother a user |

---

## 5. Smooth scroll — Lenis

```tsx
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),   // expo-out
  orientation: 'vertical',
  smoothWheel: true,
});

function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
const animId = requestAnimationFrame(raf);

return () => { cancelAnimationFrame(animId); lenis.destroy(); };
```

| Aspect | Reality |
|---|---|
| Init | Once, in `Layout`'s `useEffect(…, [])` |
| Driver | Self-rescheduling `requestAnimationFrame` — runs for the lifetime of the app |
| Duration | 1.1s |
| Easing | `1.001 - 2^(-10t)`, clamped to 1 → **expo-out**, i.e. fast start, long settle |
| Orientation | vertical only |
| `lerp` | not used (duration mode instead) |
| Touch | default (`syncTouch: false`) → **native momentum scrolling on touch devices** |
| `smoothWheel` | `true` → intercepted wheel events |
| Cleanup | `cancelAnimationFrame` + `lenis.destroy()` |

### 5.1 Lenis conflicts and gaps

1. **`index.css` sets `html { scroll-behavior: smooth }`.** This is redundant and conflicts with
   Lenis. Lenis injects its own `scroll-behavior` handling; leaving the CSS rule in means anchor
   jumps and `window.scrollTo` behave differently from Lenis-driven scrolling. **Pick one.**
2. **`ScrollToTop` calls native `window.scrollTo`, not `lenis.scrollTo`.** Because the Lenis
   instance lives in a different effect's closure, `ScrollToTop` cannot reach it. On route change
   this can leave Lenis's internal `targetScroll`/`animatedScroll` out of sync — a visible snap or
   a "the page scrolls back up" glitch. **Fix:** lift the Lenis instance into a ref or a context
   and call `lenis.scrollTo(0, { immediate: true })`.
3. **No `lenis.stop()` / `lenis.start()`** on route change or on drawer open. The mobile drawer
   is not scroll-locked, so Lenis keeps interpolating the page behind it.
4. **`ScrollToTop` keys on `pathname` only** — correct, since `?tier=`/`?service=` should not
   reset scroll. Worth keeping.
5. **No `anchors: true`** → in-page anchor links would fight Lenis. There are none today.

> [REUSABLE] Lenis with a 1.1s expo-out duration is a good feel for a site that wants to feel
> "considered". Two cautions: (a) a duration-based smooth scroll **hurts perceived performance**
> for long pages on low-end devices — consider `lerp: 0.1` instead; (b) always disable it under
> `prefers-reduced-motion`.

---

## 6. `prefers-reduced-motion` — completely absent

`grep -ri "prefers-reduced-motion" src/` returns **zero matches**. Nothing in the codebase honours
the OS motion preference. The following all run regardless:

- the 7s autoplay hero with a 1000ms cross-fade,
- the infinite `kenburns` scale animation,
- the infinite `animate-pulse` status dots (12 occurrences). The single `animate-ping` in
  `Badge.tsx` is unreachable (`hasPulse` is never passed),
- Lenis smooth scrolling,
- all 5 image hover zooms and the card `-translate-y-0.5` lifts.

**Minimum viable fix for a rebuild** — add to `index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .kenburns-active { animation: none; }
}
```

…plus skip the hero autoplay in JS when
`window.matchMedia('(prefers-reduced-motion: reduce)').matches`, and expose a pause button.

---

## 7. State inventory (all of it)

| Component | State | Type | Initial | Persistence |
|---|---|---|---|---|
| `HeroSlider` | `currentSlide` | `number` | `0` | none |
| `Navbar` | `isMobileMenuOpen` | `boolean` | `false` | reset on `pathname` change |
| `Navbar` | `isServicesOpen` | `boolean` | `false` | reset on `pathname` change |
| `Navbar` | `isScrolled` | `boolean` | `false` | from a `scroll` listener |
| `ChecklistSection` | `checkedItems` | `number[]` | `[]` | **lost on route change** |
| `TierMatrixSection` | `openFaq` | `number \| null` | `0` | **lost on route change** |
| `SubmittalForm` | `formData` | `ConsultationSubmittal` | all `''` (see below) | **lost on route change** |
| `SubmittalForm` | `isSubmitting` | `boolean` | `false` | — |
| `SubmittalForm` | `submittedTicket` | `string \| null` | `null` | — |
| `SubmittalForm` | `errorMessage` | `string \| null` | `null` | — |
| `CaseStudiesPage` | `selectedSector` | `string` | `'All'` | lost |
| `ServiceAreasPage` | `selectedState` | `string` | `'All'` | lost |
| `ServiceDetailPage` | — | — | — | (no state) |

**There is no `localStorage`, no `sessionStorage`, no URL-encoded state, and no context/provider**
anywhere in the codebase. Every piece of interactive state is component-local and dies on
navigation. The one exception is `SubmittalForm.formData.projectClassification`, which is seeded
once from `?tier=` at mount and is *not* re-seeded if the query changes while the page is mounted.

**Total: 11 state variables across 6 components.** That is the entire interactive surface of the
site — a good number to know, because it means "rebuild the interactions" is a small, tractable job.
