# Site Map

> Source of truth: `src/App.tsx`. Every route below exists in that file. Nothing is invented.

---

## 1. Route table (complete)

| # | Path | Component | Type |
|---|------|-----------|------|
| 1 | `/` | `HomePage` | Static |
| 2 | `/services` | `ServicesPage` | Static index |
| 3 | `/services/:slug` | `ServiceDetailPage` | **Dynamic** (6 slugs) |
| 4 | `/maintenance-plans` | `MaintenancePage` | Static |
| 5 | `/maintenance-process` | `MaintenancePage` | **Alias** of #4 |
| 6 | `/case-studies` | `CaseStudiesPage` | Static index + filter |
| 7 | `/case-studies/:slug` | `CaseStudyDetailPage` | **Dynamic** (8 slugs) |
| 8 | `/reviews` | `<Navigate to="/case-studies" replace />` | **Redirect** |
| 9 | `/service-areas` | `ServiceAreasPage` | Static index + filter |
| 10 | `/about` | `AboutPage` | Static |
| 11 | `/company-and-trust` | `AboutPage` | **Alias** of #10 |
| 12 | `/financing` | `FinancingPage` | Static |
| 13 | `/contact` | `ContactPage` | Static + form |
| 14 | `/request-consultation` | `ContactPage` | **Alias** of #13 |
| 15 | `*` | `NotFoundPage` | **Catch-all** 404 |

**Concrete public URLs: 15** (13 content pages + 1 redirect + 1 catch-all).
**Unique page components: 11.** **Dynamic slugs: 14** (6 services + 8 case studies).

### Dynamic route slugs

`/services/:slug` — resolved by `SERVICES.find(s => s.slug === slug)` in `src/data/servicesData.ts`:

1. `/services/ac-repair`
2. `/services/heating-furnace-repair`
3. `/services/maintenance-tune-up`
4. `/services/emergency-hvac-service`
5. `/services/indoor-air-quality`
6. `/services/commercial-hvac`

> [HVAC-TEMPLATE] Slugs are **kept residential-market names** (`ac-repair`, `heating-furnace-repair`,
> `maintenance-tune-up`, `emergency-hvac-service`, `indoor-air-quality`, `commercial-hvac`) while
> the *displayed titles* are commercial/industrial ("Commercial AC & Central Chiller Repair"). This
> is deliberate SEO capture of high-volume residential-style queries. **Keep this pattern** — a
> commercial HVAC site should still be findable on `/ac-repair`.

`/case-studies/:slug` — resolved by `CASE_STUDIES.find(s => s.slug === slug)`:

1. `apex-logistics-hub` · 2. `st-jude-ambulatory-chiller` · 3. `keystone-tower-rooftop` ·
4. `oakridge-campus-hydronic-boiler` · 5. `foundry-precision-cnc` · 6. `grand-marquis-fan-coil` ·
7. `biovance-cleanroom-pressurization` · 8. `crossdock-regional-low-gwp`

**Invalid slug behaviour (both detail pages):** a `return <Navigate … replace />` early-return —
`ServiceDetailPage` → `/services` (`src/pages/ServiceDetailPage.tsx:24`),
`CaseStudyDetailPage` → `/case-studies`. A 404 page is *not* shown. ⚠ For SEO this should be a
real 404 with `noindex`, not a redirect to the index.

---

## 2. Hierarchy

```text
Layout  (src/components/layout/Layout.tsx — fixed Navbar, Lenis, ScrollToTop, <Outlet/>, Footer)
├── /                       HomePage
│   ├── HeroSlider
│   ├── MetricsRibbon
│   ├── PartnerGrid
│   ├── CapabilitiesGrid
│   ├── QualityArchitecture
│   └── FeaturedCaseStudies  (also contains the "Proactive Asset Protection" CTA box)
├── /services               ServicesPage
├── /services/:slug         ServiceDetailPage
├── /maintenance-plans      MaintenancePage
│   ├── PipelineSection
│   ├── ChecklistSection
│   └── TierMatrixSection    (tiers + FAQ accordion)
├── /maintenance-process    → MaintenancePage
├── /case-studies           CaseStudiesPage   (filter + grid + reviews + CTA)
├── /case-studies/:slug     CaseStudyDetailPage
├── /reviews                → redirect /case-studies
├── /service-areas          ServiceAreasPage (filter + hub grid + SLA strip)
├── /about                  AboutPage
├── /company-and-trust      → AboutPage
├── /financing              FinancingPage
├── /contact                ContactPage  → SubmittalForm + DispatchDirectory
├── /request-consultation   → ContactPage
└── *                       NotFoundPage
```

---

## 3. Primary navigation

Defined inline in `src/components/layout/Navbar.tsx` (`navLinks` array, lines 25–33). There is **no
shared nav config file**.

| Label | Target | Dropdown |
|---|---|---|
| Overview | `/` | No |
| Services | `/services` | **Yes** — mega menu, 540px wide, 2 columns |
| Case Studies | `/case-studies` | No |
| Maintenance Process | `/maintenance-plans` | No |
| Service Areas | `/service-areas` | No |
| Why Choose Us | `/about` | No |
| Financing | `/financing` | No |

Navbar right cluster: **`Request Consultation` → `/contact`** (primary button), then the mobile
hamburger below `xl`.

Navbar top utility strip (≥640px only): pulsing crimson dot + `Midwest Regional Engineering
(IN · OH · KY) • Lic #HVAC-MECH-48209` on the left; `24/7 Commercial Dispatch: (800) 555-0194`
on the right.

> [REUSABLE] 7 top-level links is the practical ceiling for this layout. The desktop nav only
> appears at `xl` (≥1280px) precisely because 7 links + wordmark + CTA do not fit below that.

### Services mega dropdown

- Opens on `onMouseEnter` of the wrapper, closes on `onMouseLeave` (hover only — no click, no focus, no keyboard).
- 540px wide, `bg-white`, `border-structural`, `rounded-lg`, `shadow-xl`, `p-4`, `grid-cols-2`, `gap-2`.
- Header row spans both columns: `COMMERCIAL HVAC DISCIPLINES` + `View All Services →`.
- Body iterates `SERVICES` — each item is a crimson 6px dot, `shortTitle` (13px semibold), and a
  `summary` clamped to one line.
- **On mobile this dropdown does not exist**; the same `SERVICES` array is flattened into a
  `Core HVAC Services` link list in the drawer.

---

## 4. Footer navigation

`src/components/layout/Footer.tsx`. 12-column grid, `lg` spans **4 / 3 / 3 / 2**.

1. **Brand column (4 cols)** — logo + wordmark + `Mechanical Engineering Corp.`, company paragraph,
   then a hairline-divided contact block: address, phone, email (each with a crimson Lucide icon).
2. **Mechanical Services (3 cols)** — 6 `<Link>`s to specific service detail routes.
3. **Engineering Protocols (3 cols)** — 6 non-link list items, each prefixed with a crimson 6px dot.
4. **Company & Trust (2 cols)** — 5 `<Link>`s; the last (`Request Intake Form →`) is crimson + semibold.

**Coverage & Certifications band** — border-top, a paragraph about 6 dispatch hubs, then five
`<Badge variant="neutral">` items: `ASHRAE 90.1`, `NEBB TAB`, `OSHA 30`, `EPA UNIVERSAL`, `ASME IV`.

**Legal sub-footer** — darker `bg-surface-container`, `© {new Date().getFullYear()} … Lic
#HVAC-MECH-48209`, then three links (`Safety Protocols`, `Engineering Licensure`, `Commercial
Confidentiality / NDA`) — all three currently point to `/about` or `/contact`; there are **no
privacy-policy or terms pages**.

---

## 5. Page-to-page relationships

```text
Home ──► Services ──► Service Detail ──► /contact?service=<slug>
  │          │                                (query param NOT read by the form — see forms-and-conversion.md)
  ├──► Case Studies ──► Case Study Detail ──► /contact
  │                        ├──► prev / next dossier (wrap-around)
  │                        ├──► /case-studies (all)
  │                        └──► related services (via relatedServiceSlugs)
  ├──► Maintenance ──► (tier) ──► /contact?tier=<tier-01|tier-02|tier-03>   (param IS read)
  ├──► Service Areas ──► /contact
  ├──► About ──► /contact, tel:
  └──► Financing ──► /contact?financing=opex|cpace|rebates  (param NOT read)
```

Deep-link context is passed to `/contact` via three different query params, but only `?tier=` is
actually consumed (`SubmittalForm.tsx` line 8). See `forms-and-conversion.md` §7.

---

## 6. Utility pages

- **404** (`NotFoundPage`) — centred, `min-h-[60vh]`, a 64px `rounded-2xl` icon tile with a Lucide
  `Wrench` in crimson, the eyebrow `ERROR 404 // DIAGNOSTIC ROUTE FAULT`, an `<h1>`, one sentence,
  and two buttons (`Return to Overview` → `/`, `View All Services` → `/services`).
- **Redirects** — `/reviews` → `/case-studies` and the three alias routes above. The aliases exist
  so that alternative marketing names resolve (`maintenance-process`, `company-and-trust`,
  `request-consultation`). **Keep aliases when rebranding**; they are pure SEO insurance and cost
  one line each.

---

## 7. Per-page summary

| Route | Purpose | Primary CTA | Secondary CTA |
|---|---|---|---|
| `/` | Positioning + capability + proof | `Request Technical Consultation` → `/contact` | `View Commercial Projects` → `/case-studies` |
| `/services` | Full service index + specs | `Request Engineering Intake` → `/contact` | `tel:8005550194` |
| `/services/:slug` | Single service deep dive | `Request Service Intake` → `/contact?service=` | `24/7 Hotline: (800) 555-0194` |
| `/maintenance-plans` | Process proof + plan tiers | `Request Site Inspection` → `/contact` | `tel:8005550194` |
| `/case-studies` | Portfolio + sector filter + reviews | `Submit Project Blueprint / RFP` → `/contact` | `Direct Dispatch: (800) 555-0194` |
| `/case-studies/:slug` | Single project dossier | `Request Similar Assessment` → `/contact` | `24/7 Hotline: (800) 555-0194` |
| `/service-areas` | Hub directory + SLA | `Enroll Facility in SLA` → `/contact` | Per-hub `tel:` links |
| `/about` | Trust / credentials / leadership | `Request Intake Form` → `/contact` | `tel:8005550194` |
| `/financing` | Capital + rebate education | `Request Intake Form` → `/contact` | 3 contextual `/contact?financing=` links |
| `/contact` | **Conversion endpoint** | Form submit | `tel:` ×2, `mailto:` ×2 |
| `*` | 404 recovery | `Return to Overview` | `View All Services` |

Full section-by-section detail: see `pages.md`.
