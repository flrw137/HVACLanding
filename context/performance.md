# Performance

> There is **no code splitting, no lazy loading, no image optimisation, no caching strategy, no
> bundle analysis, and no `manualChunks`**. There is also almost nothing to optimise: 5,657 lines
> of source, 4 runtime libraries, zero data fetching, zero third-party scripts. The reference site
> is *structurally* fast. Its two real performance problems are **14 unoptimised remote images**
> and **5 simultaneously-mounted hero slides**.

---

## 1. Current state

| Metric | Value | Verdict |
|---|---|---|
| Source size | **5,657 lines** across 38 files (281 KB on disk) | ✅ tiny |
| Runtime deps | 3 used (`react`, `react-dom`, `react-router-dom`, `lenis`, `lucide-react`) | ✅ lean |
| Dead deps shipped | `gsap` (**~70KB min / ~23KB gzip**), `clsx`, `tailwind-merge` | ❌ wasted |
| JS chunks | **1** — no `manualChunks`, no `React.lazy`, no dynamic import | ❌ all-or-nothing |
| CSS | 1 purged Tailwind file + 71 lines of custom CSS | ✅ small |
| Images | **14 remote URLs, 22 references, 0 local files, 0 `width`/`height`, 0 `loading`, 0 `srcset`** | ❌ **the main problem** |
| Fonts | 3 Google families, render-blocking, 4 requests | ⚠ |
| Third-party JS | **0** — no analytics, no tag manager, no chat widget, no maps | ✅ excellent |
| Data fetching | **0** — all content is compiled into the bundle | ✅ excellent |
| Caching | whatever the host does; **no config file** | ❌ |
| Lighthouse / CI perf budget | **none configured** | ❌ |

---

## 2. Bundle composition (estimated)

| Chunk contents | Est. gzip | Notes |
|---|---|---|
| `react` + `react-dom` | ~45KB | irreducible |
| `react-router-dom` | ~15KB | irreducible for a multi-route SPA |
| `lucide-react` — ~40 icons | ~15–25KB | tree-shaken; `lucide-react` is ESM so only imported icons ship |
| `lenis` | ~5KB | |
| App code (5,657 lines + 49 content records) | ~25KB | |
| **`gsap` (unreachable, tree-shaken away)** | **0KB shipped** | ⚠ tree-shaking *does* remove it, so the cost is install-time + `package-lock` noise only — **not** a runtime cost. |
| `clsx`, `tailwind-merge` | 0KB shipped | same — not imported, so not bundled |
| **Total JS (est. gzip)** | **~105–115KB** | |
| CSS (est. gzip) | ~10–15KB | purged Tailwind |

> Correction on a common assumption: because `gsap`, `clsx` and `tailwind-merge` are **never
> imported**, Vite/Rollup tree-shakes them out of the output entirely. They are dead weight in
> `node_modules` and in install time, **not** in the user's download. The real cost of the missing
> code splitting is that *everything else* is also in one file.

---

## 3. The image problem (the actual bottleneck)

### 3.1 What the DOM does

```tsx
// all 5 slides are always mounted; only opacity changes
{[0,1,2,3,4].map(i => (
  <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                   ${i === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    <img src={HERO_SLIDES[i].image} alt={HERO_SLIDES[i].headline}
         className="absolute inset-0 w-full h-full object-cover" />
  </div>
))}
```

| Consequence | Detail |
|---|---|
| **5 hero images requested on load** | `opacity-0` does not stop a download. All 5 are fetched during LCP. |
| **All 5 are in the a11y tree** | the headline is a single `<h1>` (state-swapped, so it is fine), but **all 5 `alt`s are announced** even though only one image is visible |
| **All 5 are decoded** | The compositor holds 5 full-bleed bitmaps, decoded or not |
| **No `width`/`height`** | The *container* is always sized by CSS — `min-h-[660px]`/`lg:min-h-[740px]` (hero), `h-56` (case cards), `h-44` (case detail hero), `h-48` (maintenance gallery), `min-h-[260px] lg:min-h-full` (service grid). **There is no `aspect-*` utility anywhere in the codebase**, so every image box is a hardcoded pixel height and the image *file* is unconstrained. Layout shift is mostly avoided; wasted bytes are not. |
| **No `loading="lazy"`** | 22 references, **all eager**. The 17 non-hero images are all below the fold. |
| **No `srcset`/`sizes`** | a 375px phone downloads the desktop file |
| **No `decoding="async"`** | decode blocks the main thread |
| **No `fetchpriority`** | the LCP image gets no hint |
| **No AVIF/WebP** | whatever Google returns (typically JPEG) |
| **Unknown file sizes** | unversioned CDN URLs with no cache headers under the app's control |

### 3.2 Worst case

The homepage alone can pull **5 full-bleed hero images + up to 3 case-study images + 1 logo-less
text header** ≈ 9 images on first paint, several of which are above-the-fold-but-not-visible.
On a 4G connection at ~1.6Mbps effective, 5 × ~250KB hero images ≈ **6.4 seconds of image
download before the user can see the whole hero carousel**.

### 3.3 Fix, in priority order

1. **Render only the active slide** (or `loading="lazy"` on slides 2–5 + `aria-hidden` +
   `inert`). Single highest-impact change: 5 hero requests → 1.
2. **`loading="lazy"` + `decoding="async"`** on the 17 non-hero images.
3. **`fetchpriority="high"`** on slide 1 only.
4. **Real assets**: download, convert to **AVIF + WebP** with fallbacks, and re-host. Budget
   ≤150KB for a full-bleed hero, ≤80KB for a card.
5. **`<picture>` + `srcset`** at 640/1024/1600w with explicit `sizes`.
6. **`width`/`height` attributes** (or `aspect-ratio` CSS) — already effectively handled by the
   containers, but add the attributes anyway for pre-CLS hinting.
7. **`alt=""`** on the 14 images that duplicate an adjacent heading.

---

## 4. Font performance

| Issue | Detail | Fix |
|---|---|---|
| **4 render-blocking `<link>` to `fonts.googleapis.com`** | 3 families + 1 dead icon font. `preconnect` is correctly set for both origins ✅, but the CSS itself still blocks first paint. | Self-host WOFF2 subsets; add `rel="preload" as="font" type="font/woff2" crossorigin` for the 2 critical faces (Inter 400/600). |
| **Material Symbols Outlined** | a variable icon font with 5 axes, requested and **never used** (`lucide-react` supplies every icon). | **Delete the request.** Pure win. |
| **3 families / 7 static faces** | Inter ×4, JetBrains Mono ×2, Space Grotesk ×1. | Latin-only subsets: ~45KB Inter + ~24KB JetBrains + ~11KB Space Grotesk ≈ **80KB**. Dropping one family saves ~24–45KB. |
| **`display=swap`** ✅ | set on all 3 real families — no FOIT. | Keep. |
| **No `font-display` tuning** | `swap` causes a full block-level reflow when Space Grotesk arrives. | `swap` is right; mitigate with `size-adjust`/`ascent-override` on a `@font-face` fallback. |
| **No preloading** | Space Grotesk 600 renders every heading. | `preload` that one face specifically. |
| **3 different `letter-spacing` values across the scale** | −0.02em on `display-xl`, −0.01em on `display-xl-mobile`/`headline-lg` | Intentional; keep, but the shift on swap is visible. Metric overrides help. |

---

## 5. Rendering & runtime cost

| Item | Cost | Note |
|---|---|---|
| **Lenis `requestAnimationFrame` loop** | 1 rAF callback per frame **for the lifetime of the app** | Standard for Lenis. It calls `lenis.raf(time)` and re-schedules. Idle cost is negligible, but the loop never stops, even when the tab is backgrounded (browsers throttle rAF to 0 in background tabs, so it effectively does stop). |
| **5 hero images decoded** | 5 × (viewport area × DPR²) bytes of bitmap | The largest memory cost on the site. Fixing §3.1 fixes this. |
| **Ken Burns `transform: scale()` on a full-bleed image** | GPU composited ✅ | `transform` and `opacity` are the only two compositor-friendly properties, and the hero uses both. Good choice. |
| **Hover `transition-all`** on cards | animates *all* animatable properties | 11 card classes use `transition-all`. It is fine at this scale (a handful of cards), but `transition-[border-color,box-shadow,transform]` is cheaper and avoids surprises. |
| **`transition-all duration-1000` on 5 stacked hero layers** | 5 layers animating opacity simultaneously during every cross-fade | Minor; opacity-only is compositor-friendly. |
| **No `will-change`** | ✅ correct — permanent `will-change` wastes memory |
| **`overflow-x: hidden` on `body`** | can create a scroll container that breaks `position: sticky` in some browsers | The navbar is `fixed`, not `sticky`, so no issue today. |
| **`h-[72px]` / `min-h-[660px]` / `max-w-[1320px]`** | hardcoded px rather than `dvh`/`clamp()` | On mobile browsers with collapsing toolbars, `min-h-[660px]` on the hero can exceed the visual viewport. `min-h-[100svh]` would be better. |
| **No `content-visibility`** | all 5 homepage sections render immediately | `content-visibility: auto` on below-fold sections would cut initial render work meaningfully on a long page. |
| **React re-renders** | `Navbar` + `Footer` do **not** re-render on navigation (state is local and they don't take changing props) ✅. `HeroSlider` re-renders every 7s. | Fine. |
| **`No memo/useCallback` anywhere** | ~15 cards re-render with their parent | At this size, irrelevant. Don't add memoization. |

---

## 6. Build & delivery configuration

`vite.config.ts` is 12 lines: the React plugin and the `@` alias. Everything is Vite's default:

| Setting | Default | Impact |
|---|---|---|
| `build.target` | `'baseline-widely-available'` (Vite 6) | modern output, no legacy transpile |
| `build.minify` | `'esbuild'` | fine |
| `build.sourcemap` | `false` | no `.map` in `dist/` — smaller, but no production debugging |
| `build.rollupOptions.output.manualChunks` | **none** | 1 JS chunk; React and Router cannot be cached independently of app code |
| `build.cssCodeSplit` | `true` (default) | 1 CSS file here anyway |
| `build.reportCompressedSize` | `true` | gzip sizes are printed in the build log — use it |
| `base` | `'/'` | ⚠ **not sub-path safe**; a GitHub-Pages or `/docs/` deploy will 404 every asset |
| `assetsDir` | `'assets'` | hashed filenames ✅ → safe to serve with `Cache-Control: immutable` |
| `esbuild` drop / `terser` | none | `drop: ['console','debugger']` is free here (no `console.*` calls exist) |
| Compression | **none** | no gzip/brotli plugin — the host must compress |
| `manifest.json` | **not emitted** | can't do modulepreload / long-term caching of the entry without it |

### 6.1 Recommended `vite.config.ts` additions

```ts
build: {
  target: 'es2020',
  sourcemap: false,
  cssCodeSplit: true,
  rollupOptions: {
    output: {
      manualChunks: {
        react:  ['react', 'react-dom', 'react-router-dom'],
        motion: ['lenis'],
        icons:  ['lucide-react'],
      },
    },
  },
},
esbuild: { drop: ['console', 'debugger'] },
```

Plus, if you want a real budget, `rollup-plugin-visualizer` and a CI step that fails when the
gzip total exceeds a threshold (e.g. 150KB JS / 20KB CSS).

---

## 7. Caching & deployment — ⚠ the largest operational risk

| Concern | Reality |
|---|---|
| Hashed asset filenames | ✅ `/assets/index-*.js` etc. — safe to cache forever |
| Entry HTML | ⚠ `index.html` is **not** hashed; it must be served `no-cache` so it points at new hashes |
| **`BrowserRouter` SPA fallback** | ❌ **no `vercel.json`, `netlify.toml`, `_redirects`, `404.html`, or `base` setting exists.** Without an all-routes → `/index.html` rewrite, `/services/ac-repair` returns a 404 on most static hosts. |
| `dist/` is committed in the working tree | ❌ it exists on disk; a rebuild should `.gitignore` it and deploy from CI |
| Brotli/gzip | the host's job; no config here |
| HTTP/2 or /3, CDN, edge | not configured |
| `Cache-Control` headers | not configured |
| Security headers | **none** — no CSP, no `X-Content-Type-Options`, no `Referrer-Policy`, no HSTS |
| `<noscript>` | **absent** — with no prerender, a no-JS visitor sees a blank page |

---

## 8. What is genuinely good here (keep it)

1. **Zero third-party JavaScript.** No analytics tag, no chat widget, no maps SDK, no font
   optimisation script, no A/B tool. This is the single biggest reason the site would score well
   on a performance audit.
2. **Zero runtime data fetching.** All 49 content records are in the bundle, so there is no
   loading state, no waterfall, no layout shift from late-arriving content, and no API latency.
3. **Purged Tailwind.** One ~10–15KB stylesheet for a 49-record-worth-of-classes design system.
4. **Compositor-friendly hero motion.** Only `opacity` and `transform` are animated.
5. **No `will-change` abuse, no layout-thrashing loops, no `getBoundingClientRect` in render.**
6. **Real `aspect-ratio`/`h-*` containers on every image**, which removes almost all CLS.
7. **Small dependency surface** — 4 runtime libraries, 1 of which is a 5KB smooth-scroll helper.
8. **No `console.log`, no debug code, no dead component in the bundle** (`Button.tsx` is dead but
   still compiles into nothing since it is never imported).

---

## 9. Rebuild performance budget

| Target | Budget | Notes |
|---|---|---|
| JS, initial route, gzip | **≤ 120KB** | React + Router + Lenis + Lucide + app |
| JS, per lazy route, gzip | ≤ 8KB | 11 pages are tiny |
| CSS, gzip | ≤ 20KB | |
| Fonts, total | ≤ 80KB | 3 families, latin-only, self-hosted |
| Hero image, 1st paint | ≤ 150KB | AVIF, 1600w, one request |
| Card image | ≤ 60KB | AVIF, 640w |
| Total images on `/` above the fold | **≤ 2** | 1 hero + 1 preloaded LCP candidate |
| LCP | < 2.0s on 4G | requires the single-hero fix |
| CLS | < 0.05 | already achieved by the fixed-height containers |
| INP | < 200ms | the only main-thread work is Lenis + a 7s state flip |
| Requests on first load | ≤ 12 | 1 HTML + 1 JS + 1 CSS + ~4 fonts + ~3 images |

### Priority order for a rebuild

1. **Render only the active hero slide** (1 request instead of 5; 5× less image memory)
2. **Delete the Material Symbols request**
3. **`loading="lazy"` + `decoding="async"` on the 17 below-fold images**
4. **Self-host + subset the 3 font families, preload Space Grotesk 600 and Inter 400**
5. **Re-host images as AVIF/WebP with `srcset`**
6. **Add `manualChunks` for react / motion / icons**
7. **Add the SPA rewrite config** (`_redirects` / `vercel.json` / `404.html`)
8. **Add `content-visibility: auto` to below-fold sections on the long pages**
9. **Add a CI bundle-size budget + Lighthouse CI**
10. **Add the missing security headers and a `<noscript>` block**
