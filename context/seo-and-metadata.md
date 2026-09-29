# SEO & Metadata

> The reference implementation has **one 20-line component** that mutates `document.title` and one
> `meta` tag. There is no canonical, no Open Graph, no Twitter card, no JSON-LD, no `robots.txt`,
> no `sitemap.xml`, no hreflang, no structured data of any kind, and no SSR or prerendering. This
> file documents exactly what exists, the bugs in it, and what a rebuild needs.

---

## 1. The whole implementation

```tsx
// src/components/common/SEO.tsx — 20 lines, the complete SEO layer
import { useEffect } from 'react';

interface SEOProps { title: string; description?: string; }

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | Vertex Solutions Mechanical Engineering`;
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};
```

| Property | Reality |
|---|---|
| Calls | **11** — one per page component, always as the first child of the page's root |
| Mechanism | `useEffect` side effect, `return null` |
| Title | always `${title} \| Vertex Solutions Mechanical Engineering` — **the suffix is not optional** |
| Description | overwrites the **static** `meta[name="description"]` in `index.html` — no `if` check for existence beyond the null guard, no `name="description"` creation |
| Cleanup | ❌ **none** — no revert to the previous title, no tag removal |
| `<head>` management | ❌ **none** — React 19 can hoist `<title>`/`<meta>` to `<head>`, but this component deliberately doesn't |
| Dependency array | `[title, description]` — correct |

> ⚠ Because the base `index.html` ships a `<meta name="description">`, the `querySelector` always
> finds a node. **If a rebuild removes the static tag, this component silently does nothing** — the
> description will never be set. Always create the tag if it is missing.

---

## 2. The 11 call sites, verbatim

| Page | `title` prop | `description` prop | Length | Suffix clash? |
|---|---|---|---|---|
| `HomePage` | `Commercial & Industrial Mechanical HVAC Engineering` | hard-coded | 175 | ✅ clean |
| `ServicesPage` | `Commercial & Industrial Mechanical HVAC Services` | hard-coded | 146 | ✅ clean |
| `MaintenancePage` | `Maintenance & Work Process \| Structured Commercial HVAC` | hard-coded | 161 | ✅ clean |
| `ServiceDetailPage` | `` `${service.title} \| Vertex Solutions` `` | `service.summary` | variable | ❌ **clash** |
| `CaseStudiesPage` | `Documented Case Studies & Portfolio \| Vertex Solutions` | hard-coded | 160 | ❌ **clash** |
| `CaseStudyDetailPage` | `` `${study.title} \| Vertex Solutions` `` | `study.overview` | variable | ❌ **clash** |
| `ServiceAreasPage` | `Regional Service Areas & Dispatch Hubs \| Vertex Solutions` | hard-coded | 132 | ❌ **clash** |
| `AboutPage` | `Why Choose Vertex Solutions \| Engineering Credibility` | hard-coded | 178 | ❌ **clash** |
| `FinancingPage` | `Commercial Capital Allocation & Utility Rebates \| Vertex Solutions` | hard-coded | 173 | ❌ **clash** |
| `ContactPage` | `Request Consultation & Schedule Online \| Vertex Solutions` | hard-coded | 190 | ❌ **clash** |
| `NotFoundPage` | `Page Not Found \| Vertex Solutions` | **— none —** | — | ❌ **clash** |

**8 of 11 titles already contain `| Vertex Solutions` and get a second one appended.**

### 2.1 ⚠ The rendered titles, as they actually appear in the browser tab

| Page | Actual `document.title` | Length |
|---|---|---|
| Home | `Commercial & Industrial Mechanical HVAC Engineering \| Vertex Solutions Mechanical Engineering` | 98 |
| Services | `Commercial & Industrial Mechanical HVAC Services \| Vertex Solutions Mechanical Engineering` | 95 |
| Maintenance | `Maintenance & Work Process \| Structured Commercial HVAC \| Vertex Solutions Mechanical Engineering` | 102 |
| About | `Why Choose Vertex Solutions \| Engineering Credibility \| Vertex Solutions Mechanical Engineering` | 91 |
| Case Studies | `Documented Case Studies & Portfolio \| Vertex Solutions \| Vertex Solutions Mechanical Engineering` | 95 |
| Financing | `Commercial Capital Allocation & Utility Rebates \| Vertex Solutions \| Vertex Solutions Mechanical Engineering` | 106 |
| Contact | `Request Consultation & Schedule Online \| Vertex Solutions \| Vertex Solutions Mechanical Engineering` | 98 |
| Service Areas | `Regional Service Areas & Dispatch Hubs \| Vertex Solutions \| Vertex Solutions Mechanical Engineering` | 100 |
| 404 | `Page Not Found \| Vertex Solutions \| Vertex Solutions Mechanical Engineering` | 75 |
| Service detail | `Commercial AC & Central Chiller Repair \| Vertex Solutions \| Vertex Solutions Mechanical Engineering` | 103 |
| Case detail | `Apex Logistics Hub Central Ventilation \| Vertex Solutions \| Vertex Solutions Mechanical Engineering` | 102 |

**Every single title is 75–108 characters.** Google truncates the SERP title at roughly **580px
(~60 characters)**; the practical limit is **50–60 characters**. **All 11 pages risk truncation**,
and the 8 clashing ones waste their most valuable pixels on a repeated brand name.

**Fix (one line):**

```tsx
const SUFFIX = 'Vertex Solutions Mechanical Engineering';
const full = title.includes('Vertex Solutions') ? title : `${title} | ${SUFFIX}`;
document.title = full.length > 60 ? `${full.slice(0, 57)}…` : full;
```

Or better: drop the suffix entirely and put the brand in a shorter, deliberate position
(`{page} · Vertex Solutions`) with a per-page character budget.

### 2.2 ⚠ Description lengths

Target: **120–160 characters.** Above 160 Google truncates; below ~70 wastes the snippet.

| Page | Length | Verdict |
|---|---|---|
| `ContactPage` | 190 | ❌ 30 over |
| `AboutPage` | 178 | ❌ 18 over |
| `HomePage` | 175 | ❌ 15 over |
| `FinancingPage` | 173 | ❌ 13 over |
| `CaseStudiesPage` | 160 | ⚠ at the limit |
| `MaintenancePage` | 161 | ⚠ 1 over |
| `ServicesPage` | 146 | ✅ |
| `ServiceAreasPage` | 132 | ✅ |
| **`NotFoundPage`** | — | ❌ **no description at all** — the static `index.html` description (the *home page's*, 175 chars) stays, so a 404 page advertises "turnkey commercial HVAC design, central chiller plants…" |
| `ServiceDetailPage` | `service.summary` | variable — verify each of the 6 |
| `CaseStudyDetailPage` | `study.overview` | variable — verify each of the 8 |

---

## 3. What is missing entirely

| Concern | Present? | Consequence |
|---|---|---|
| `<link rel="canonical">` | ❌ | **3 alias routes serve duplicate content** (`/maintenance-process`, `/company-and-trust`, `/request-consultation`) with no canonical and no redirect. Google may pick any of them. |
| `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` | ❌ | **No link preview at all.** Every share on LinkedIn/X/Facebook/Slack renders as a bare URL. This is the single highest-visibility SEO gap for a B2B site where sharing is the main distribution channel. |
| `twitter:card` | ❌ | same |
| JSON-LD structured data | ❌ | An HVAC contractor is a textbook `LocalBusiness` / `HVACBusiness` / `GeneralContractor` entity. The site claims a name, address, phone, hours, licence, service area, 8 case studies, and 5 reviews — **all of it is invisible to Google.** No rich results, no knowledge panel, no `Review` snippets. |
| `robots.txt` | ❌ | Not in `public/` (there is no `public/`). Default crawl behaviour. |
| `sitemap.xml` | ❌ | Manual |
| `robots` meta tag | ❌ | Default `index, follow` |
| `hreflang` | ❌ | Single-locale site, so not needed yet — but the 3-state service area invites future multi-region pages |
| `geo` / `geo.region` / `geo.placename` | ❌ | Local SEO is the entire business model (9 hubs in 3 states) and there is no local signal at all |
| `geo` / `ICBM` for the 9 hubs | ❌ | |
| `<meta name="author">` | ❌ | |
| `theme-color` | ❌ | |
| `apple-touch-icon` | ❌ | iOS bookmark fallback is a screenshot |
| `manifest.webmanifest` | ❌ | Not installable |
| `<html lang="en">` | ✅ | correct |
| Semantic `<h1>` per page | ⚠ | see §4 |
| Internal-link depth | ✅ good | every service links to its case studies and related services; every case links to related services |

---

## 4. Heading hierarchy

Measured by walking the render tree, not the page file — `SectionHeader` supplies `<h2>` and
`HeroSlider` supplies HomePage's `<h1>`, so file-level counts alone are misleading.

| Page | `<h1>` source | Rendered outline | Verdict |
|---|---|---|---|
| `HomePage` | `HeroSlider` (one `<h1>`, text swapped by state) | `h1` `h3` `h2` `h3` `h2` `h3` `h4`×3 `h2` `h3`×2 | ⚠ `PartnerGrid`'s `h3` has no preceding `h2` |
| `ServicesPage` | **none** | `h2` `h3`×2 | ❌ **no `<h1>`** |
| `ServiceDetailPage` | `service.title` | `h1` `h2` `h3`×3 `h4` | ✅ |
| `MaintenancePage` | page-header title | `h1` `h2` `h3` `h2` `h2` `h3` `h3` `h3` | ✅ |
| `CaseStudiesPage` | page-header title | `h1` `h2`×2 `h3`×2 `h4`×3 | ✅ |
| `CaseStudyDetailPage` | `study.title` | `h1` `h2`×8 `h3` | ✅ |
| `ServiceAreasPage` | **none** | `h2` `h3`×2 | ❌ **no `<h1>`** |
| `AboutPage` | page-header title | `h1` `h2` `h3`×3 `h4`×4 | ✅ |
| `FinancingPage` | **none** | `h2`×2 `h3`×4 `h4`×2 | ❌ **no `<h1>`** |
| `ContactPage` | page-header title | `h1` `h3` `h4` | ❌ **two level skips** |
| `NotFoundPage` | page-header title | `h1` | ✅ |

> ⚠ **`SectionHeader` renders an `<h2>`, never an `<h1>`, and no page has a hand-written `<h1>`
> *plus* a `SectionHeader` for the same text.** The result is that **3 pages ship with no `<h1>` at
> all** — `/services`, `/service-areas`, `/financing` — because they use `SectionHeader` for their
> page title and nothing else emits an `h1`.
>
> `HomePage`'s H1 is fine: `HeroSlider` renders **one** `<h1>` whose text is swapped by state, not
> five. What *is* wrong on the homepage is that all 5 slides stay mounted (`opacity-0`, not
> `display:none`), so **5 full-bleed `<img>` elements** are fetched and their `alt`s announced.
>
> **Fix:** the page owns its `<h1>`; `SectionHeader` is `<h2>`-only and never used for the page
> title; `PartnerGrid` gets a `SectionHeader` like its five siblings.

---

## 5. Crawlability & indexation

| Issue | Detail | Severity |
|---|---|---|
| **No SSR / no prerender** | The shipped HTML contains only `<div id="root"></div>`. Every crawler that does not execute JavaScript — including many social-preview scrapers — sees an empty page. | 🔴 |
| **No SPA rewrite config** | `BrowserRouter` + `base: '/'` + no `vercel.json`/`netlify.toml`/`_redirects` → any deep link may 404 on the host. | 🔴 |
| **3 duplicate-content aliases** | `/maintenance-process` ≡ `/maintenance-plans`, `/company-and-trust` ≡ `/about`, `/request-consultation` ≡ `/contact`. Same DOM, no canonical, no redirect. | 🔴 |
| **Bad-slug pages redirect to the index, not a 404** | `ServiceDetailPage` → `/services`; `CaseStudyDetailPage` → `/case-studies`. A crawler requesting a stale slug is redirected to a 200 index page, which reads as soft-404 spam. | 🟠 |
| **`/reviews` is a proper `<Navigate replace>`** | The one place the pattern is used correctly. | ✅ |
| **Sitemap** | **22 canonical URLs**: 8 static (`/`, `/services`, `/maintenance-plans`, `/case-studies`, `/service-areas`, `/about`, `/financing`, `/contact`) + 6 service slugs + 8 case-study slugs. The 3 aliases render byte-identical content and must be excluded or canonicalised. Must be hand-written — there is no generator. | 🟠 |
| **`robots.txt`** | absent; crawlers will try `/robots.txt`, get the SPA shell or a 404 | 🟡 |
| **Deep-link depth** | `/` → `/services` → `/services/:slug` — maximum 2 clicks from home. Excellent. | ✅ |
| **Trailing slashes** | React Router 7 matches `/services` and `/services/`; no `<Redirect>` normalises them, so both are indexable unless the host 301s. | 🟡 |

---

## 6. Recommended metadata for a rebuild

### 6.1 Per-page tags

```tsx
// src/components/common/SEO.tsx — rebuilt
interface SEOProps {
  title: string;            // page-specific, no brand suffix
  description: string;      // 120–160 chars
  canonical: string;        // absolute URL
  image?: string;           // absolute 1200×630
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;        // true for /404 and for query-param variants
  publishedTime?: string;   // case studies
  jsonLd?: object;          // see §6.4
}
```

Emit, in this order: `<title>`, `<meta name="description">`, `<link rel="canonical">`,
`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`,
`twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`,
and optionally `geo.region`, `geo.placename`, `ICBM`.

Always include a cleanup that removes tags the current page does not need, so a page without
`og:image` does not inherit the previous page's.

### 6.2 Title / description budget

| Template | Length |
|---|---|
| `{Page} · Vertex Solutions` | 25–40 chars ✅ |
| `{Service} Commercial HVAC Repair \| Vertex` | ≤ 60 chars |
| `{Case Study} Project Dossier \| Vertex Solutions` | ≤ 60 chars |

Never exceed 60. Never repeat the brand inside the `title` prop when the component appends it.

### 6.3 `index.html` static tags (add these)

```html
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#c8102e" />
<meta name="author" content="Vertex Solutions" />
<link rel="canonical" href="https://example.com/" />
<meta property="og:site_name" content="Vertex Solutions" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

Plus `public/robots.txt` and `public/sitemap.xml` (25 URLs, generated by a script from the two
data files so it can never drift).

### 6.4 JSON-LD worth adding

| `@type` | Applied to | Data available today |
|---|---|---|
| `HVACBusiness` (subtype of `LocalBusiness`) | homepage, `/service-areas`, `/contact` | name, 2 addresses (⚠ **reconcile them first**), 3 phones, 3 states, licence numbers, opening hours |
| `Service` | each `/services/:slug` (6) | `service.title`, `service.summary`, `service.features` |
| `Article` / `CaseStudy` | each `/case-studies/:slug` (8) | `study.title`, `study.overview`, `study.image`, `study.year`, `sector` |
| `BreadcrumbList` | all 25 pages | route path segments |
| `Review` + `AggregateRating` | `/case-studies` | `REVIEWS` — ⚠ **only if the reviews are real.** Fabricated `Review` markup is a manual-action risk. |
| `FAQPage` | `/maintenance-plans`, `/financing` | `TECHNICAL_FAQS` (5) + the service-detail `faqs` (18) |

### 6.5 The three fixes that matter most

1. **Add Open Graph tags.** B2B HVAC is shared on LinkedIn. Without `og:image` every share is a
   bare link. Highest visible return per hour of work.
2. **Fix the titles** — one `includes()` check removes the clash on 8 of 11 pages, and a 60-char cap
   removes the truncation risk on all 11.
3. **Turn the 3 alias routes into `<Navigate replace>`** — a 3-line change that removes the only
   real duplicate-content problem on the site.

---

## 7. Rebrand checklist (SEO)

- [ ] Replace the hard-coded `| Vertex Solutions Mechanical Engineering` suffix (it lives in `SEO.tsx`, not in the call sites)
- [ ] Strip `| Vertex Solutions` from the 8 title props that carry it
- [ ] Re-measure every title against the 60-char budget
- [ ] Re-measure the 8 hard-coded descriptions into 120–160 chars
- [ ] Give `NotFoundPage` a description and `noindex`
- [ ] Verify each of the 6 `service.summary` and 8 `study.overview` values
- [ ] Reconcile the two HQ addresses **before** putting either into JSON-LD
- [ ] Decide whether the 5 reviews are real; if not, **never** emit `Review` markup
- [ ] Add `canonical` to all 22 canonical URLs (and point the 3 aliases at their canonical)
- [ ] Generate `sitemap.xml` from `servicesData.ts` + `caseStudiesData.ts`
