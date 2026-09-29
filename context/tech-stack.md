# Tech Stack

> The reference implementation is a **stock Vite + React 19 + TypeScript + Tailwind 3 SPA** with
> no framework, no state library, no form library, no test runner, no linter, and no backend. It is
> 5,657 lines of source across 38 files. Everything below is what is *actually installed and
> actually used*, verified against `package.json`, the lockfile, and a per-file import audit.

---

## 1. Runtime dependencies — used vs. dead

| Package | Declared | Lockfile | **Used?** | Where |
|---|---|---|---|---|
| `react` | `^19.0.0` | `19.3.0` | ✅ | everywhere |
| `react-dom` | `^19.0.0` | `19.3.0` | ✅ | `src/main.tsx` |
| `react-router-dom` | `^7.3.0` | `7.18.4` | ✅ | `src/App.tsx` |
| `lenis` | `^1.1.20` | `1.3.26` | ✅ | `src/components/layout/Layout.tsx` |
| `lucide-react` | `^1.16.0` | `1.48.0` | ✅ | 15 components, ~40 icons |
| `clsx` | `^2.1.1` | `2.1.1` | ❌ **dead** | `grep -ri "clsx" src/` → 0 imports |
| `tailwind-merge` | `^3.0.2` | `3.7.0` | ❌ **dead** | `grep -ri "tailwind-merge" src/` → 0 imports |
| `gsap` | `^3.12.7` | `3.15.0` | ❌ **dead** | `grep -ri "gsap" src/` → 0 imports |

**3 of 8 runtime dependencies (~uncompressed weight of `gsap` alone ≈ 70KB min) are installed and
never imported.** A rebuild should start from `react`, `react-dom`, `react-router-dom`,
`lenis`, `lucide-react` and nothing else.

> Note on the two class-name helpers: `clsx` + `tailwind-merge` are the standard `cn()` pairing.
> Their absence is *why* the class strings in this codebase use hardcoded ternaries and
> `\n`-concatenation, and why the "last class wins" problem in §6 exists. Adding them would be an
> improvement, but it also means rewriting every class string. Pick deliberately.

## 2. Dev dependencies

| Package | Declared | Lockfile | Used for |
|---|---|---|---|
| `vite` | `^6.2.1` | `6.4.3` | dev server + build |
| `@vitejs/plugin-react` | `^4.3.4` | 4.7.0 | React Fast Refresh, JSX transform |
| `typescript` | `~5.7.2` | `5.7.3` | typecheck (`tsc -b`) |
| `tailwindcss` | `^3.4.17` | `3.4.19` | the entire design system |
| `postcss` | `^8.5.3` | 8.5.x | Tailwind's PostCSS plugin host |
| `autoprefixer` | `^10.4.20` | 10.4.x | vendor prefixes |
| `@types/node` | `^22.13.10` | 22.x | `NodeJS.Timeout` in `HeroSlider` + `path` in `vite.config.ts` |
| `@types/react` / `@types/react-dom` | `^19.0.10` / `^19.0.4` | 19.x | types |

### Notably absent

`eslint` · `prettier` · `@typescript-eslint/*` · `vitest` / `jest` / `@testing-library/*` ·
`playwright` / `cypress` · `storybook` · `@tanstack/react-query` · `zustand` / `redux` /
`jotai` / `context` (no state lib) · `react-hook-form` / `zod` / `yup` · `framer-motion` ·
`@next/third-parties` · `sentry` · `i18next` / `react-intl` · `clsx`+`tailwind-merge` in dev
(i.e. `cn()`) · `date-fns`.

> **[HVAC-TEMPLATE] What this tells you about the project.** The dependency list is *exactly* what
> a competent solo frontend build needs and nothing more. There is no CMS SDK, no commerce SDK,
> no scheduling SDK, no map SDK — the contact form is a `setTimeout`, and the service-area "map"
> is a list of cards. If the rebuilt product needs real lead capture, a scheduler, or a map, that
> is net-new architecture, not a configuration change.

---

## 3. Scripts

```json
"dev": "vite",
"build": "tsc -b && vite build",
"preview": "vite preview"
```

Only 3 scripts. No `lint`, no `typecheck`, no `test`, no `format`, no `analyze`, no `clean`.

### `npm run build` — clean as of the audit (was failing)

`build` runs `tsc -b` **before** Vite, and `tsconfig.app.json` sets
`"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`. The reference
originally failed here with **26 `TS6133` "declared but its value is never read" errors** — 25
unused imports plus one unused `.map()` parameter, all in pages:

| File | Removed (all were genuinely unused) |
|---|---|
| `AboutPage.tsx` | `Badge`, `Users`, `ArrowRight` |
| `ContactPage.tsx` | `SectionHeader`, `Phone`, `CheckCircle2` |
| `FinancingPage.tsx` | `Badge`, `DollarSign`, `ShieldCheck`, `Phone`, `Calculator` |
| `MaintenancePage.tsx` | `SectionHeader`, `CheckCircle2` |
| `ServiceAreasPage.tsx` | `Badge`, `Clock`, `ShieldCheck`, `Building2`, `ArrowRight` |
| `ServiceDetailPage.tsx` | `SectionHeader`, `Badge`, `ShieldCheck`, `Clock`, `Wrench` |
| `ServicesPage.tsx` | `ShieldCheck`, `Clock`, and the unused `index` in `SERVICES.map((service, index) =>` |

All 26 were trivial deletions with no rendering effect. The site is type-clean under full
`strict` and `npm run build` now emits `dist/` successfully (~522 kB JS / ~35 kB CSS, 1,944
modules). This remains a good signal about the codebase: the JSX was always well-typed, and the
failure was purely dead import lines left behind by iterative editing. **A rebuild should keep
`tsc -b` green and add a standalone `typecheck` script.**

Verify without touching `dist/`:

```
npx tsc --noEmit -p tsconfig.app.json
```

### ⚠ `vite.config.ts` uses `__dirname` in an ESM package

```ts
// "type": "module" in package.json
import path from 'path';
export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```

`__dirname` does not exist in native ESM. This works only because Vite pre-bundles the config to
CJS before evaluating it. It is a known-accepted pattern in Vite 5/6 but it **will break the moment
the config is moved to `.mts` or loaded natively**. The modern form is
`import.meta.dirname` (Node ≥ 20.11) or `fileURLToPath(new URL('./src', import.meta.url))`.

---

## 4. TypeScript configuration

`tsconfig.json` is a **solution file with zero compiler options** — it only references the two
projects. This is the correct Vite template shape.

### `tsconfig.app.json` (application)

| Option | Value | Note |
|---|---|---|
| `target` | `ES2020` | browserslist not configured; Vite's own default is `modules` |
| `lib` | `ES2020`, `DOM`, `DOM.Iterable` | no `ES2021+` → **`Array.prototype.at`, `Object.hasOwn`, `structuredClone` are unavailable** |
| `module` | `ESNext` + `moduleResolution: bundler` | correct for Vite |
| `allowImportingTsExtensions` | `true` | needed for `import x from './y.ts'`; combined with `noEmit: true` |
| `isolatedModules` | `true` | requires `export type` for type re-exports |
| `moduleDetection` | `force` | every file is a module |
| `noEmit` | `true` | typecheck only; Vite does the transpiling |
| `jsx` | `react-jsx` | no need to import React (though `main.tsx` still does) |
| `strict` | `true` | `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, etc. |
| `noUnusedLocals` | `true` | ← the source of the reference's 26 build errors (now fixed) |
| `noUnusedParameters` | `true` | ← ditto |
| `noFallthroughCasesInSwitch` | `true` | |
| `skipLibCheck` | `true` | **should be off in a strict project**; it hides type errors in `node_modules` |
| `paths` | `@/*` → `src/*` | matches `vite.config.ts` alias ✅ |

### `tsconfig.node.json` (Vite config)

Same strictness; `target: ES2022`, `lib: ES2023`, `include: ["vite.config.ts"]`.

### ⚠ There is no `src/vite-env.d.ts`

The Vite template normally ships one (`/// <reference types="vite/client" />`) so that
`import.meta.env` is typed. It is **absent**. The project therefore:
- cannot reference `import.meta.env.*` without a type error (it happens not to need it — no env vars), and
- relies on `@types/node`'s `NodeJS.Timeout` for the `HeroSlider` interval ref instead of
  `Vite`'s `ReturnType<typeof setInterval>`, which is the portable choice anyway.

---

## 5. Build pipeline

```
index.html
  └─ <script type="module" src="/src/main.tsx">
       └─ main.tsx → App → Router → Layout → Navbar/Footer + <Outlet>
                                     └─ Page → Components → src/data/*.ts
  └─ <link> ×2 Google Fonts CSS  (render-blocking)
  └─ <link rel="icon"> inline data: URI
        ↓
PostCSS:  tailwindcss → autoprefixer
Vite:     esbuild TS/JSX transpile · Rollup bundle · CSS extraction
```

`postcss.config.js` is ESM (`export default`) to match `"type": "module"`. It contains only
`tailwindcss` and `autoprefixer` — **no nesting, no `postcss-preset-env`, no minifier** (Vite
handles minification via esbuild).

`vite.config.ts` adds **only** the React plugin and the `@` alias. There is **no**:
`build.rollupOptions.manualChunks`, no `build.target`, no `server.proxy`, no `base`, no
`esbuild` options, no `chunkSizeWarningLimit`, no compression plugin.

### Consequences of the bare Vite config

| Default | Result |
|---|---|
| `build.target: 'baseline-widely-available'` (Vite 6) | no legacy transpilation; `ES2020` in tsconfig is the real constraint |
| Single entry chunk | everything lands in one JS bundle; the Lenis + Router + Lucide tree is not split |
| `base: '/'` | **absolute asset paths** → deploying under a sub-path breaks. Also no `base` means SPA-fallback is still required for `BrowserRouter` |
| No `build.outDir` override | `dist/` |
| No sourcemap | production `dist/` has no `.map` files |
| CSS from Tailwind | one stylesheet, purged by `content` globs |

> **[REUSABLE]** `content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']` means Tailwind purges
> any class that does not appear as a **literal string** in those files. Consequence in this
> codebase: the class names built by string concatenation (e.g. `` `hover:border-${x}` ``) or
> the semicolon-separated `Button` variant map would be **purged away**. They currently work only
> because every class used in JSX is written out in full. Any rebuild that generates class names
> dynamically **must** either safelist them or use the full-token maps the way `Button.tsx` does.

---

## 6. Build output and runtime shape

| Aspect | Reality |
|---|---|
| Entry | `index.html` at `dist/index.html` |
| JS | one hashed ES module bundle (React + ReactDOM + Router + Lenis + Lucide tree) |
| CSS | one hashed stylesheet (purged Tailwind + the `@layer base` typography rules + the `@keyframes kenburns` + `.kenburns-active` + the 4 `::-webkit-scrollbar` rules + the 2 raw `.border-structural*` classes + the form `:focus` override) |
| Fonts | **none bundled** — 3 Google Fonts families loaded at runtime |
| Images | **none bundled** — 14 remote URLs |
| Routing | `BrowserRouter` → **client-side only** |
| Data | **none bundled from network** — 5 TS modules compiled into the JS bundle |
| State | **none persisted** |
| Target browsers | whatever Tailwind's 3.4 + Vite 6 baseline supports; effectively all evergreen |
| SSR / SEO | **none.** A crawler that does not execute JS sees only the static `index.html` shell |

> ⚠ **`BrowserRouter` + no deployment config = a real risk.** Any host without an
> "all routes → `/index.html`" rewrite will 404 on `/services/ac-repair`, `/case-studies/…` and
> every deep link the site advertises. There is no `vercel.json`, `netlify.toml`, `_redirects`,
> `404.html` shim, or `base` setting to compensate. See `performance.md` §6 and
> `seo-and-metadata.md` §5.

---

## 7. Style architecture

| Aspect | Reality |
|---|---|
| Framework | Tailwind **3.4.19** (not 4) — `tailwind.config.ts`, PostCSS plugin, JS config, `content`/`theme.extend` |
| Why not v4 | v4 is CSS-first (`@theme`, `@import "tailwindcss"`), removes the JS config, and requires a Vite plugin. The migration is mechanical but is a *rewrite of `design-system.md`'s source of truth* |
| Custom CSS | **71 lines total** in `src/index.css`: `@tailwind` ×3 · `html`/`body` base · a `h1..h6` font-family rule · a `code, pre, .font-mono` rule · `@keyframes kenburns` + `.kenburns-active` · 4 `::-webkit-scrollbar*` rules · 2 raw `.border-structural*` classes · a global `input:focus, textarea:focus, select:focus` rule |
| Components | **no `cva`, no `clsx`, no `tailwind-merge`** — variant logic is hand-written ternaries or a literal variant→class map (`Button.tsx`) |
| CSS modules / styled-components | **none** |
| Container | No container class exists. The string `max-w-[1320px] mx-auto px-margin lg:px-margin-desktop` is repeated verbatim (55 / 59 / 57 / 55 occurrences respectively, in 20 of 39 source files) — the de-facto layout convention, but not an abstraction |
| Naming | semantic utility tokens (`surface-container-lowest`, `primary-container`, `on-surface`, `outline`) rather than raw palette names — the *one* genuinely good architectural decision in the styling layer |

---

## 8. How to install and run a rebuild

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  → dist/
npm run preview
```

There is **no `.env` file and no environment variable is read anywhere.** A rebuild that adds
lead capture, a CMS, or a map API will need `import.meta.env.VITE_*` **and** the missing
`src/vite-env.d.ts`.

### Node version

No `.nvmrc`, no `engines` field. Vite 6 requires **Node 18+**; the recommended target is **Node 20
or 22 LTS** (`@types/node` is pinned to 22.x).

---

## 9. Rebuild recommendation

| Decision | Reference impl. | Recommended for a rebuild |
|---|---|---|
| Build tool | Vite 6 | Keep Vite (7 is current) |
| Framework | React 19 | Keep React 19 |
| Language | TS `strict` | Keep; add ESLint 9 flat config + `typescript-eslint` |
| Styling | Tailwind 3.4 + 71 lines of CSS | Keep Tailwind; consider **v4** only if you are willing to re-express `theme.extend` as `@theme` |
| Routing | React Router 7 `BrowserRouter` | Keep; add `ScrollRestoration`/Lenis interop, or `HashRouter` for zero-config static hosting |
| Smooth scroll | Lenis 1.3, `duration: 1.1` | Keep, but gate on `prefers-reduced-motion` and fix the `ScrollToTop` interop |
| Icons | `lucide-react` | Keep; drop the Material Symbols request |
| State | `useState` × 11 | Keep for this size; add a `siteConfig.ts` for company data, not a state library |
| Forms | hand-rolled | Keep the markup; extract a `cn()` + a validator, then wire to a real endpoint |
| Data | 5 hardcoded TS modules | Keep for a static brochure site; add a CMS only if editors are non-technical |
| Dead deps | `clsx`, `tailwind-merge`, `gsap` | **Remove `gsap`.** Keep or remove the other two depending on whether you adopt `cn()` |
