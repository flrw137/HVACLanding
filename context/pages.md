# Pages

> **11 page components, 15 route entries, 14 dynamic slugs.** Section order, background alternation
> and CTA labels below are transcribed from the code. `<SEO>` is present on all 11 pages.

---

## Quick reference

| Route | Component | LOC | Sections | Title passed to `<SEO>` |
|---|---|---|---|---|
| `/` | `HomePage` | 25 | 6 (4 child components) | `Commercial & Industrial Mechanical HVAC Engineering` |
| `/services` | `ServicesPage` | 165 | 4 | `Commercial & Industrial Mechanical HVAC Services` |
| `/services/:slug` | `ServiceDetailPage` | 256 | 8 | `` `${service.title} | Vertex Solutions` `` |
| `/maintenance-plans` | `MaintenancePage` | 163 | 7 (3 child components) | `Maintenance & Work Process \| Structured Commercial HVAC` |
| `/case-studies` | `CaseStudiesPage` | 376 | 8 | `Documented Case Studies & Portfolio \| Vertex Solutions` |
| `/case-studies/:slug` | `CaseStudyDetailPage` | 501 | 10 | `` `${study.title} | Vertex Solutions` `` |
| `/service-areas` | `ServiceAreasPage` | 190 | 5 | `Regional Service Areas & Dispatch Hubs \| Vertex Solutions` |
| `/about` | `AboutPage` | 237 | 5 | `Why Choose Vertex Solutions \| Engineering Credibility` |
| `/financing` | `FinancingPage` | 215 | 6 | `Commercial Capital Allocation & Utility Rebates \| Vertex Solutions` |
| `/contact` | `ContactPage` | 90 | 3 | `Request Consultation & Schedule Online \| Vertex Solutions` |
| `*` | `NotFoundPage` | 43 | 1 | `Page Not Found \| Vertex Solutions` (no description) |

---

## 1. `HomePage` — `/`

25 lines. Six children, no page-local markup.

```tsx
<SEO title="Commercial & Industrial Mechanical HVAC Engineering" … />
<HeroSlider />        <MetricsRibbon />     <PartnerGrid />
<CapabilitiesGrid />  <QualityArchitecture /> <FeaturedCaseStudies />
```

Background alternation: `inverse-surface` hero → `surface-container-low` → `white` →
`surface-container-lowest` → `surface-container-low` → `white`.

| # | Section | Bg | Height / padding |
|---|---|---|---|
| 1 | `HeroSlider` | `inverse-surface` | `min-h-[660px] lg:min-h-[740px]`, `pt-16 sm:pt-20 lg:pt-24 pb-12` |
| 2 | `MetricsRibbon` | `surface-container-low` | `py-8` |
| 3 | `PartnerGrid` | `bg-white` | `py-12` |
| 4 | `CapabilitiesGrid` | `surface-container-lowest` | `py-16 lg:py-24` |
| 5 | `QualityArchitecture` | `surface-container-low` | `py-16 lg:py-24` |
| 6 | `FeaturedCaseStudies` | `bg-white` | `py-16 lg:py-24` |

**Only 3 CTAs on the whole homepage:** the hero pair (`Request Technical Consultation` →
`/contact`, `View Commercial Projects` → `/case-studies`), the `View All Engineering Services`
text link, the `Learn More` links inside capability cards, `Explore All 240+ Deployments`, the
3 per-card `View Dossier` links (**buggy — all point to the index**), and the CTA box pair
(`Schedule a Facility Assessment` + `Speak with an Engineer: (800) 555-0194`).

> [REUSABLE] **Homepage skeleton that transfers to any service business:**
> hero slider → 4-metric proof ribbon → trust/OEM strip → 4-up capability grid → 2-column
> "why us + expert" block → 3-up case studies + CTA box. Six sections is the right number; do not
> add a seventh.

---

## 2. `ServicesPage` — `/services`

`eyebrow="SYSTEM DISCIPLINES"` · the page title comes from `SectionHeader`, which renders an
`<h2>`.
**Note:** `ServicesPage` therefore has **no `<h1>` at all** — its outline is `h2` → `h3` ×2.
The same applies to `ServiceAreasPage` and `FinancingPage`. `CaseStudiesPage`, `AboutPage`,
`MaintenancePage`, `ServiceDetailPage`, `CaseStudyDetailPage`, `ContactPage` and `NotFoundPage`
*do* hand-write an `<h1>` alongside their `SectionHeader`s; `HomePage`'s is supplied by
`HeroSlider`. Per-page outlines are tabulated in `accessibility.md` §2.8 and
`seo-and-metadata.md` §4.

| # | Section | Classes | Content |
|---|---|---|---|
| 1 | Top banner | `bg-surface-container-low border-b py-3` | pulsing dot + `ENGINEERING SPECIFICATION // COMMERCIAL & INDUSTRIAL HVAC` / `REGIONAL COVERAGE: INDIANA · OHIO · KENTUCKY` (in `text-on-surface font-bold`) |
| 2 | Page header | `bg-white py-16 lg:py-20` | `SectionHeader className="max-w-4xl"` + a `grid-cols-2 md:grid-cols-4 gap-4 mt-8 bg-surface-container-low p-4 rounded-lg border font-label-mono-sm text-[12px]` stat row: `DELIVERED TONNAGE 14,850+ TR` · `EMERGENCY SLA 2-Hour Regional Arrival` (crimson) · `BALANCING STANDARD ±2.5% NEBB TAB` · `FIELD LABOR 100% Self-Performed` |
| 3 | Service list | `surface-container-lowest py-16 lg:py-20` | `space-y-12` of 6 rows. Each row is `bg-white border border-structural rounded-xl overflow-hidden hover:border-on-surface hover:shadow-lg transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 items-stretch` — **5 cols image / 7 cols text** |
| 4 | Dispatch CTA | `surface-container-low py-12` | `Have an immediate commercial HVAC RFP or plant emergency?` + `Request Engineering Intake` (→`/contact`) + `tel:` button |

**Service row anatomy:** image well `lg:col-span-5 relative min-h-[260px] lg:min-h-full
bg-surface-dim overflow-hidden` with `hover:scale-105` on the img, `<Badge variant="dark">` category
at `top-4 left-4`, and a `bg-black/60 backdrop-blur-sm p-2.5 rounded` SLA bar at
`bottom-4 left-4 right-4` showing `SLA: {responseSLA}` and `{standard}` in `text-inverse-primary`.
Text column `lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between`: crimson-dot eyebrow,
`<h3 class="font-headline-md font-bold">`, `summary`, a `grid-cols-1 sm:grid-cols-2 gap-2` list of
the **first 4** `features` with crimson `CheckCircle2 w-4 h-4`, then a `pt-6 border-t` row with
`Standard: {standard}` and an `Explore Technical Specs` crimson button.

> [HVAC-TEMPLATE] The 5/7 image-left editorial row is the workhorse layout of this entire site —
> used for all 6 services on the index and again on every service detail page. Highly reusable.

---

## 3. `ServiceDetailPage` — `/services/:slug`

`const { slug } = useParams<{slug: string}>()` → `SERVICES.find(s => s.slug === slug)`; on miss,
`return <Navigate to="/services" replace />` (`src/pages/ServiceDetailPage.tsx:24`).

`eyebrow` = `{service.eyebrow}`; `<h1>` = `{service.title}`.
**Only 3 top-level sections, and only ONE `/contact` CTA is rendered in the hero** (the right-rail
CTA is a second one, to the same URL). There is no bottom CTA band on this template.

| # | Section | Content |
|---|---|---|
| 1 | Breadcrumb strip | `bg-surface-container-low border-b border-structural py-2.5 px-margin lg:px-margin-desktop font-label-mono-sm text-[12px] text-secondary`; `flex items-center gap-2` of `Home` → `<ChevronRight w-3.5 h-3.5>` → `Services` → `<ChevronRight>` → `<span class="text-on-surface font-semibold">{service.shortTitle}</span>` |
| 2 | Service hero | `relative w-full bg-inverse-surface text-inverse-on-surface py-16 lg:py-24 overflow-hidden`. Two background layers: an `absolute inset-0 z-0 opacity-25` `<img>` and an `absolute inset-0 z-1 bg-gradient-to-r from-inverse-surface via-inverse-surface/90 to-transparent`. Content in `relative z-10 max-w-[1320px]` → `max-w-3xl`: an `inline-flex … bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm` eyebrow pill with a pulsing dot, `<h1 class="… text-white">`, the `summary`, then two CTAs — `Request Service Intake` → `/contact?service={slug}` (crimson, `shadow-lg`) and a `bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm` `24/7 Hotline: (800) 555-0194` `tel:` button with a **crimson** `Phone` icon |
| 3 | Main grid | `bg-white py-16 lg:py-24` → `grid-cols-1 lg:grid-cols-12 gap-12 items-start` |

**Left column — `lg:col-span-8 space-y-12` (4 blocks):**

| Block | Markup |
|---|---|
| Detailed narrative | `eyebrow` `Technical Architecture & Methodology` (hand-rolled `text-primary uppercase tracking-widest` span) + `<h2 class="font-headline-md font-bold">Engineering Scope &amp; Diagnostic Protocol</h2>` + `<p class="font-body-md text-secondary text-[16px]">{service.description}</p>` |
| Diagnostic checklist | `<h3>Diagnostic &amp; Field Execution Scope</h3>` over `service.features` in a `grid-cols-1 sm:grid-cols-2 gap-3`; each item is a `bg-surface-container-low p-4 rounded-lg border border-structural flex items-start gap-3` with a crimson `CheckCircle2 w-4 h-4` and `font-body-sm text-[14px] leading-snug` |
| Equipment handled | `<h3>Supported Equipment &amp; Plant Topologies</h3>` over `service.equipmentHandled` in `space-y-2.5`; each is `flex items-center gap-3 p-3 rounded-lg border border-structural bg-white` with a `w-2 h-2 rounded-full bg-primary-container` dot and `text-on-surface font-medium text-[14px]` |
| FAQs | `pt-6 border-t border-structural`; `<h3 class="… flex items-center gap-2">` with a crimson `HelpCircle w-5 h-5`; then `space-y-4` of `service.faqs` — **static cards, NOT an accordion**: `bg-surface-container-low p-5 rounded-lg border border-structural` with an `<h4>{faq.question}</h4>` and `<p class="text-[14px]">{faq.answer}</p>`. No `useState`, no toggle. |

**Right column — `lg:col-span-4 space-y-6` (3 cards):**

| Card | Markup |
|---|---|
| Engineering Specs | `bg-surface-container-low p-6 rounded-xl border border-structural space-y-4`. Header `pb-3 border-b` with `Engineering SLA &amp; Standards` + `Verified Parameters` (`font-headline-sm text-[18px] font-bold`). Body `space-y-3 font-label-mono-sm text-[12px]` of **stacked** (not `justify-between`) label/value pairs: `Governing Standard:` → `specs.standard` (`text-on-surface text-[13px]`), `Emergency Arrival SLA:` → `specs.responseSLA` (**`text-primary`**), `Warranty Coverage:` → `specs.warranty`, and a 4th row `Balancing Tolerance:` → `specs.balancingTolerance` **guarded by `&&`**. Footer `pt-4 border-t` holds a full-width crimson `Schedule Field Assessment` → `/contact?service={slug}` |
| Turnover Deliverables | `bg-white p-6 rounded-xl border border-structural`; `service.deliverables` in `space-y-2.5` as `flex items-start gap-2.5 text-[13px]` with a crimson `FileText w-4 h-4` |
| Other Mechanical Services | `bg-surface-container-low p-6 rounded-xl border border-structural`; **4** siblings via `SERVICES.filter(s => s.id !== service.id).slice(0, 4)`, each `block p-2 rounded hover:bg-white text-[13px] text-on-surface font-medium` rendering the literal `→ {shortTitle}` |

> `servicesData.ts` supplies `specs.standard`, `specs.responseSLA`, `specs.warranty`, and an
> **optional** `specs.balancingTolerance` (only on the TAB / air-balance-oriented records). The
> detail page correctly guards that field with `{service.specs.balancingTolerance && (…)}`.
>
> ⚠ **`?service=` is dead.** Two links emit `/contact?service=<slug>` (lines 75 and 209) but
> `SubmittalForm` never reads it — see `forms-and-conversion.md` §7.
> ⚠ `SectionHeader` and `Badge` are imported and unused here (2 of the 25 typecheck errors), and so
> are the `ShieldCheck`, `Clock`, `Wrench` icons.
> ⚠ The hero image is decorative (a 25%-opacity scrim layer) yet still carries
> `alt={service.title}`, so a screen reader announces the headline twice. Use `alt=""` + `aria-hidden`
> for that layer in a rebuild.

---

## 4. `MaintenancePage` — `/maintenance-plans` and alias `/maintenance-process`

`<h1>A Structured Mechanical Process from First Site Visit to Final Balance.</h1>`
Eyebrow `Process & Preventive Maintenance` (hand-rolled, not `SectionHeader`).

| # | Section | Bg | Padding | Content |
|---|---|---|---|---|
| 1 | Protocol metric band | `surface-container-low` | `py-3 border-b` | `flex flex-wrap justify-between gap-3` mono band. Left: pulsing dot + `ACTIVE PROTOCOL: DOC-ENG-9018`, a `hidden md:inline` `\|` separator, and `SYSTEM BALANCING TOLERANCE: ±2.5% ASHRAE 111`. Right: `CURRENT MEAN DISPATCH: **41 MIN**` and `PEAK MTBF FACTOR: **99.98%**` |
| 2 | Page header | `bg-white` | `pt-16 pb-12 lg:pt-20 lg:pb-16` | `grid-cols-1 lg:grid-cols-12 gap-8 items-end` → **left `lg:col-span-8`**: hand-rolled eyebrow `Process &amp; Preventive Maintenance` + `<h1>` + intro `<p>`. **right `lg:col-span-4`**: a right-aligned `bg-surface-container-low px-4 py-2.5 rounded-lg border` chip with a crimson `ShieldCheck w-5 h-5` + `NEBB Certified Field Procedures`, plus a `hidden sm:block` mono sub-line `Mechanical SLA Compliance: 100% Guaranteed Fixed Scope` |
| 3 | Pipeline gallery strip | `surface-container-low` | `py-12` | `grid-cols-1 md:grid-cols-3 gap-6` of 3 cards, each `rounded-xl overflow-hidden bg-white border border-structural group` with an `h-48 overflow-hidden bg-surface-dim` well (`hover:scale-105 duration-500`) and a `p-4 flex items-center justify-between font-label-mono-sm text-[12px]` caption pairing a phase label with a crimson standard |
| 4 | 6-Step pipeline | `bg-white` | `py-16 lg:py-20` | `<PipelineSection />` |
| 5 | Interactive checklist | `surface-container-low` | `py-16 lg:py-20` | `<ChecklistSection />` |
| 6 | Tier matrix + FAQ | `bg-white` | `py-16 lg:py-24` | `<TierMatrixSection />` |
| 7 | CTA | `surface-container-low` | `py-16` | An **inner** `bg-white border border-structural rounded-xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8` box: eyebrow `Direct Site Assessment`, `<h3 class="font-headline-md font-bold">Schedule a Baseline Plant Assessment</h3>`, a `max-w-2xl` paragraph, `Request Site Inspection` → `/contact` (crimson `px-6 py-3.5`) and a `tel:` button |

**The 3 gallery images borrow `servicesData.ts` URLs directly** (inline `<img src="…">` literals, not
a data reference) — the only place in the codebase where a page hardcodes another module's imagery:

| Tile | `alt` | Caption | Standard |
|---|---|---|---|
| 1 | `Hydronic Testing & Tuning` | `Phase 1: Precision Telemetry` | `Laser Vibration Run` |
| 2 | `Electronic Diagnostics` | `Phase 2: Execution &amp; Welding` | `ASME Section IV` |
| 3 | `BACnet Commissioning` | `Phase 3: Digital Turnover` | `NEBB Certified TAB` |

Tile 1's URL is the *Maintenance & Tune-Up* service image, tile 2's is the *24/7 Emergency Dispatch*
image, and tile 3's is the *Automation & BMS* hero image (the one image not owned by a service).
**A rebrand that swaps `servicesData` imagery will silently change this strip.**

> ⚠ The band separator `<span className="hidden md:inline text-structural-dim">|</span>` uses
> **`text-structural-dim`, which does not exist.** The tokens are `border-structural` /
> `border-structural-dim` (hand-written CSS classes in `index.css`), and there is no
> `structural-dim` *colour* in `tailwind.config.ts`. The `|` simply inherits `text-secondary`.

---

## 5. `CaseStudiesPage` — `/case-studies`

`eyebrow="PORTFOLIO & CASE STUDIES"` · `<h1>Documented Mechanical HVAC Installations & Retrofits</h1>`
State: `const [selectedSector, setSelectedSector] = useState<string>('All')` + a `useMemo` filter.

| # | Section | Content |
|---|---|---|
| 1 | Top telemetry strip | `bg-surface-container-low border-b py-3` — mono portfolio stats |
| 2 | Page header | `SectionHeader` + `<h1>` block, `pt-16 pb-12 lg:pt-20 lg:pb-16` |
| 3 | Telemetry metrics ribbon | `grid-cols-2 md:grid-cols-4` of `border-l-2` metric cells (same pattern as `MetricsRibbon`) |
| 4 | Sector filter | `Interactive Sector Filter Buttons` — chip row: `All` + the 6 `sector` values (`Industrial`, `Healthcare`, `Class A Office`, `Education`, `Hospitality`, `Cold Storage`). Chips are `font-label-mono-sm text-[11px] uppercase tracking-wider` in `rounded-lg border`; the selected chip gets `border-primary-container text-on-surface shadow-xs` and a `bg-primary-fixed` count badge; the idle chip is `bg-white border-structural text-secondary hover:border-on-surface` |
| 5 | Dossier grid | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` of 8 cards (filtered). Card = `relative h-56 image + <Badge variant="dark"> sectorBadge + year chip`, then title / `line-clamp-3` overview / 2-metric telemetry bar / `View Full Dossier →` → `/case-studies/{slug}`. **These two grids are the only place with `focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2` on cards.** |
| 6 | Commissioning standards | 3 cards: `Calibrated Air & Flow TAB`, `Load Trend Telemetry`, `ASHRAE 90.1 Sign-Off` (`<h4>`) |
| 7 | Testimonials | `eyebrow="COMMERCIAL ENDORSEMENTS"` — 3 static `REVIEWS` cards, **no carousel** |
| 8 | CTA | `eyebrow="Engineering Bid Triage"`, `<h3>Have a facility blueprint or chiller replacement in planning?</h3>`, crimson + `Direct Dispatch: (800) 555-0194` |

---

## 6. `CaseStudyDetailPage` — `/case-studies/:slug`

The richest page in the codebase (501 lines). Miss → `<Navigate to="/case-studies" replace />`.

| # | Section | Content |
|---|---|---|
| 0 | Breadcrumb strip | `Home / Case Studies / {study.code}` |
| 1 | Project hero | full-bleed `study.image` + `inverse-surface` scrim; `<Badge variant="dark">` sector, `DOSSIER #{study.code}` mono label, `<h1>{study.title}</h1>`, location/year meta, and `Request Similar Assessment` → `/contact` + `tel:` |
| 2 | Key metrics ribbon | 2 × 2 `border-l-2` cells using `primaryMetric*` / `secondaryMetric*` |
| 3 | Main grid | `lg:col-span-8` narrative / `lg:col-span-4` rail |
| 3a | `01 // Project Overview` | `<h2>{study.title}</h2>` + `study.overview` |
| 3b | `02 // The Challenge` | `<h2>Operational Problem Statement</h2>` + `study.challenge` |
| 3c | `03 // Scope of Work` | `<h2>Vertex Engineering Scope</h2>` + `study.scopeOfWork` |
| 3d | `04 // Equipment Schedule` | `<h2>Equipment & System Integration</h2>` + `study.equipmentSchedule[]` as mono rows in `bg-surface-container-low` |
| 3e | `05 // Execution Sequence` | `<h2>Field Delivery Sequence</h2>` + `study.executionPhases[]` — numbered timeline |
| 3f | Outcome | `study.outcome` |
| 3g | Right rail | `Project Facts` inset spec table (`facilityFootprint`, `sector`, `year`, `location`, `code`), `Related Services` (resolved from `relatedServiceSlugs[]` against `SERVICES`), and a CTA |
| 4 | Previous / next pager | wrap-around: index 0 → previous = last item; last → next = first |
| 5 | Related case studies | 3 siblings sharing the same `sector` (or nearest), each with `hover:shadow-xl` |
| 6 | Engineering advisory CTA | `eyebrow="Engineering Advisory"`, `<h2>Have a facility blueprint or chiller replacement in planning?</h2>` — **the only full-bleed `bg-inverse-surface` section outside the hero**, with white text and crimson CTA |

> **[REUSABLE]** The numbered `01 //` … `05 //` dossier structure is the most distinctive content
> device on the site. Any project-based service business (construction, legal, medical, industrial)
> can adopt it verbatim by changing only the eyebrow strings and the section titles.
>
> ⚠ `fullNarrative` and `verificationNotes` are **optional** fields in
> `CaseStudyDossier` that the type declares; the page's `useEffect`-free render must guard them.
> The pager's index math must be checked against a 1-item list (div/0 and same-item self-links).

---

## 7. `ServiceAreasPage` — `/service-areas`

`eyebrow="REGIONAL INFRASTRUCTURE"`. State: `const [selectedState, setSelectedState] = useState<string>('All')`.

| # | Section | Content |
|---|---|---|
| 1 | Top banner | `bg-surface-container-low border-b py-3` mono strip |
| 2 | Page header | `SectionHeader` + a `pt-16 pb-12 lg:pt-20 lg:pb-16` block |
| 3 | State filter | `All` / `Indiana` / `Ohio` / `Kentucky` chips |
| 4 | Hubs grid | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` of 9 `SERVICE_HUBS` filtered by `state`. Card = `<h3>{hub.city}</h3>`, `{stateCode} // {code}` mono, `address` (HQ only), `keyFacilitiesServed[]` chips, a `Dispatch Parameters` inset row (`Coverage Radius`, `Avg Response Time`), and `tel:{hub.dispatchHotline.replace(/[^0-9]/g,'')}` |
| 5 | SLA strip | `eyebrow="Regional Response SLA"`, `<h3>2-Hour Field Mobilization Guarantee</h3>` |

**The HQ card is the only card with `ring-1 ring-primary-container`** and the only one showing a
`code` chip and `isHQ` treatment — it also carries the crimson `#ffdad8` chip (hand-rolled
instead of `Badge variant="crimson"`).

> The `tel:` href is generated by stripping non-digits, which is the **only** place a phone number
> is not hardcoded as `tel:8005550194`. Keep this pattern for per-hub numbers.

---

## 8. `AboutPage` — `/about` and alias `/company-and-trust`

`eyebrow="Engineering Authority"` · `<h1>Institutional Discipline in Every Valve, Drop, and
Control Loop.</h1>`

| # | Section | Eyebrow | Content |
|---|---|---|---|
| 1 | Top banner | — | mono strip |
| 2 | Page header | `Engineering Authority` | `<h1>` + intro paragraph |
| 3 | Leadership profile | — | `Robert Keller, P.E.` — `w-24 h-24 rounded-full` avatar, name/title/credentials, and a pull-quote `<h3>` |
| 4 | Safety & credentialing | `SAFETY & LICENSURE` | 4 `<h4>` cards: `OSHA 30 Certified`, `NEBB Certified TAB`, `EPA Universal 608`, `ASME Section IV` |
| 5 | Directorate commitment | `DIRECTORATE COMMITMENT` | `<h3>` + the same P.E. quote as `QualityArchitecture`/`ContactPage` |
| 6 | CTA | `ENGINEERING CONSULTATION` | `<h3>Ready to discuss an upcoming mechanical retrofit?</h3>` + `Request Intake Form` → `/contact` + `tel:` |

---

## 9. `FinancingPage` — `/financing`

`eyebrow="FINANCIAL MODELING"` / `CAPITAL STRUCTURING` / `COMMERCIAL INTEGRITY`.
This is the only page with **no photos at all** — 100% typographic.

| # | Section | Content |
|---|---|---|
| 1 | Top banner | mono strip |
| 2 | Page header | `SectionHeader` |
| 3 | 3 capital models | a 3-up card row: `Operating Lease (OpEx)`, `C-PACE Clean Energy Capital`, `Utility Incentive Capture` |
| 4 | Model 1 detail | `OpEx` — deep dive, CTA → **`/contact?financing=opex`** |
| 5 | Model 2 detail | `C-PACE` — deep dive, CTA → **`/contact?financing=cpace`** |
| 6 | Model 3 detail | `Utility rebate recovery` — deep dive, CTA → **`/contact?financing=rebates`** |
| 7 | Engineering principles | `Transparent Engineering Principles` — 2 `<h4>` cards: `Lifecycle Cost Analysis (LCCA)`, `Guaranteed Fixed-Bid Turnkey Pricing` |
| 8 | CTA box | `<h3>Request a Custom Capital Feasibility Review</h3>` + `Request Intake Form` |

> ⚠ **`?financing=` is dead** — three links emit it, nothing reads it. See
> `forms-and-conversion.md` §7.
> [HVAC-TEMPLATE] The OpEx / C-PACE / rebate triad is a standard commercial-HVAC capital page.
> Keep the three-model structure; the vocabulary is what makes it HVAC-specific.

---

## 10. `ContactPage` — `/contact` and alias `/request-consultation`

`eyebrow="SPECIFICATION & PROJECT INTAKE"` · `<h1>Speak Directly with a Commercial Mechanical
Specialist.</h1>` — **the conversion endpoint. 90 lines.**

| # | Section | Content |
|---|---|---|
| 1 | Top banner | `py-3` mono strip: pulsing dot + `SPECIFICATION INTAKE // 24/7 COMMERCIAL DISPATCH: (800) 555-0194` and `COMMERCIAL NDA ENCRYPTED ROUTING` |
| 2 | Main form section | `surface-container-lowest py-16 lg:py-24`; a `max-w-4xl mb-12` header block, then `grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12` → **left `lg:col-span-7` = `<SubmittalForm />`, right `lg:col-span-5` = `<DispatchDirectory />`** |
| 3 | Directorate banner | `bg-white py-12` with an inset `bg-surface-container-low p-6 sm:p-8 rounded-xl border` row: a `w-10 h-10 rounded-full bg-primary-container` `ShieldCheck` tile, the P.E. name, the third copy of the same pull-quote, and `PE License: #PE-104928-IN` |

> The **7 / 5 split** is unique to this page (detail pages use 8/4, `QualityArchitecture` uses
> 7/5 too). The form gets the wider column because it is the conversion target.

---

## 11. `NotFoundPage` — `*`

43 lines, `min-h-[60vh] flex items-center justify-center py-20 px-margin`, inner `max-w-md w-full
text-center space-y-6`:

1. `w-16 h-16 rounded-2xl bg-surface-container-low border border-structural` tile with a
   `Wrench w-8 h-8 text-primary` — **the only `rounded-2xl` icon tile in the codebase.**
2. `ERROR 404 // DIAGNOSTIC ROUTE FAULT` in `font-label-mono-sm text-[12px] uppercase
   tracking-wider text-primary font-bold`.
3. `<h1 class="font-headline-lg text-on-surface font-bold">Specification Page Not Found</h1>`
   (Space Grotesk at the **UA default `h1` size**, ~32px, and 700 — the `font-headline-lg` class
   sets only the family, so nothing here is 40px) + one sentence in `font-body-md` (16px).
4. Two buttons: `Return to Overview` (crimson, `ArrowLeft`) and `View All Services` (secondary).

> ⚠ `<SEO title="Page Not Found | Vertex Solutions" />` passes **no `description`**, so
> `document.querySelector('meta[name="description"]')` is not updated and the home page's
> description persists onto the 404.

---

## Cross-page patterns

| Pattern | Where |
|---|---|
| `bg-surface-container-low border-b py-3` mono banner strip | `ServicesPage`, `ContactPage`, `ServiceAreasPage`, `AboutPage`, `FinancingPage`, `MaintenancePage`, `CaseStudiesPage` |
| `grid-cols-1 lg:grid-cols-12 gap-12 items-start` + `lg:col-span-N` | 8 detail/index pages |
| `4 × (border-l-2 metric cell)` | `MetricsRibbon`, `QualityArchitecture`, `CaseStudiesPage`, `CaseStudyDetailPage` |
| `justify-between label / value` inset spec table | ~12 places, 4 distinct implementations |
| Hand-rolled `text-primary bg-[#ffdad8] px-2 py-0.5 rounded font-semibold` chip | 5 places (should be `Badge variant="crimson"`) |
| `mt-8` / `mt-12` / `mt-16` CTA box on `bg-surface-container-low rounded-xl p-8 lg:p-12` | 8 pages |
| `tel:8005550194` secondary button | 9 pages |
| `font-display-xl-mobile sm:font-headline-lg lg:font-display-xl` on the H1 | 7 hand-written page H1s + `HeroSlider` — **family only, no size half** |
| `text-display-xl-mobile sm:text-headline-lg lg:text-display-xl` on the H1 | **`HeroSlider` only — the sole correct pair in the codebase** |
