# Content Structure

> All content is **compile-time TypeScript constants** in 5 files under `src/data/`, plus the
> interface file `src/types/index.ts`. There is no CMS, no markdown loader, no JSON, no fetch.
> To change a word on the site you edit a `.ts` file and rebuild.

---

## 1. Content inventory

| File | Exports | Records | Lines | Consumed by |
|---|---|---|---|---|
| `src/data/servicesData.ts` | `SERVICES` | **6** | 296 | `ServiceDetailPage`, `ServicesPage`, `Navbar` (mega + drawer), `Footer`, `FeaturedCaseStudies` (partial), `CaseStudyDetailPage` (related slugs) |
| `src/data/caseStudiesData.ts` | `CASE_STUDIES` | **8** | 292 | `CaseStudiesPage`, `CaseStudyDetailPage`, `FeaturedCaseStudies` |
| `src/data/serviceAreasData.ts` | `SERVICE_HUBS` | **9** | 144 | `ServiceAreasPage` |
| `src/data/maintenanceData.ts` | `MAINTENANCE_PIPELINE`, `READINESS_CHECKLIST`, `MAINTENANCE_TIERS`, `TECHNICAL_FAQS` | 6 / 7 / 3 / 5 | 180 | `PipelineSection`, `ChecklistSection`, `TierMatrixSection` |
| `src/data/reviewsData.ts` | `REVIEWS` | **5** | 59 | `CaseStudiesPage` |
| `src/types/index.ts` | 9 interfaces | — | 129 | everywhere |

**Total content records: 49**, across 8 exported arrays in 5 modules:

```
6 services + 8 case studies + 9 service hubs = 23
6 pipeline steps + 7 checklist items + 3 tiers + 5 FAQs = 21
5 client reviews
                            ────────────────────
                            49
```

The 21 maintenance records are the ones most likely to be "counted as 4 modules" rather than 21
records by a naive audit — that is where the earlier count of 43 came from. **49 is the number to
carry forward**: it is the count of distinct content objects a rebuild must be able to render.

`ServiceDetailPage` and `CaseStudyDetailPage` also hardcode copy that *is not* in the data layer —
see §5.

---

## 2. `SERVICES` — 6 records

Interface: `ServiceItem` (`src/types/index.ts`).

```ts
interface ServiceItem {
  id: string;
  slug: string;
  title: string;        // display H1/H3
  shortTitle: string;   // nav / dropdown / related-links label
  category: string;     // Badge on the image
  eyebrow: string;      // hero eyebrow
  summary: string;      // index card + meta description
  description: string;  // detail-page narrative
  heroImage: string;    // remote URL
  specs: { standard: string; responseSLA: string; warranty: string;
           balancingTolerance?: string };
  features: string[];         // detail checklist (ALL) / first 4 on the index
  equipmentHandled: string[];  // detail page
  deliverables: string[];     // detail right rail
  faqs: { question: string; answer: string }[];
}
```

| # | `slug` | `title` | `shortTitle` | `category` | `eyebrow` |
|---|---|---|---|---|---|
| 1 | `ac-repair` | Commercial AC & Central Chiller Repair | AC & Chiller Repair | Cooling & Refrigeration | `SPEC 01 // PRECISION COOLING REPAIR & RESTORATION` |
| 2 | `heating-furnace-repair` | Industrial Heating & Hydronic Boiler Repair | Heating & Boiler Repair | Commercial Heating & Hydronics | `SPEC 02 // THERMAL COMBUSTION & STEAM RESTORATION` |
| 3 | `maintenance-tune-up` | Predictive Preventive Maintenance & TAB Tune-Up | Maintenance & Tune-Up | Reliability & Uptime | `SPEC 03 // PREDICTIVE TELEMETRY & LIFECYCLE PRESERVATION` |
| 4 | `emergency-hvac-service` | Emergency 24/7 Mechanical HVAC Dispatch | 24/7 Emergency Dispatch | Rapid Critical Response | `SPEC 04 // GUARANTEED 2-HOUR REGIONAL DISPATCH SLA` |
| 5 | `indoor-air-quality` | Duct Cleaning, Cleanrooms & Sterile IAQ | Duct & Indoor Air Quality | Air Quality & Containment | `SPEC 05 // STERILE AIR DISTRIBUTION & ISO COMPLIANCE` |
| 6 | `commercial-hvac` | Turnkey Commercial HVAC & Rigging Upgrades | Commercial Turnkey HVAC | Design-Build & Modernization | `SPEC 06 // HEAVY-TONNAGE RETROFITS & CRANE RIGGING` |

**`specs` per record** (the right-rail "Engineering SLA & Standards" table on the detail page):

| # | `standard` | `responseSLA` | `warranty` | `balancingTolerance` (optional) |
|---|---|---|---|---|
| 1 | EPA Section 608 Universal · AHRI 550/590 | 2-Hour Emergency Dispatch | 1-Year Fixed Labor & OEM Manufacturer Warranty | `±2.5% Design Flow` |
| 2 | ASME Section IV · National Board R-Stamp · NFPA 85 | 2-Hour Emergency Dispatch | Full System Combustion Performance Guarantee | `Flue Efficiency > 94% on Condensing Units` |
| 3 | NEBB Certified Procedures · ASHRAE Standard 180 | Guaranteed Priority Dispatch Window | Fixed-Rate Labor Pricing on All Identified Repairs | `±2.5% ASHRAE 111 Standard` |
| 4 | OSHA 30 · EPA Universal · Critical Environment Protocol | Guaranteed 2-Hour Midwest Arrival Window | Immediate Emergency Stabilization Guarantee | *(absent)* |
| 5 | ASHRAE 170 · ISO 14644 · NADCA ACR Standard | Standard Planned Mobilization Window | Post-Remediation Particulate Clearance Certification | `±0.02" WG Cascade Differential Pressure` |
| 6 | ASHRAE Standard 90.1 · SMACNA Standards · P.E. Stamped | Firm Fixed Project Turnkey Schedule | 5-Year Equipment Compressor & 1-Year Comprehensive Labor | `100% Commissioned As-Built TAB Record` |

> 5 of 6 records carry `balancingTolerance`; **only `emergency-hvac-service` omits it**, which is
> why `ServiceDetailPage` renders that row behind an `&&` guard. If you add a service without the
> optional field, the rail will simply be one row shorter — this is intentional, not a bug.

> [HVAC-TEMPLATE] **Keep the slugs residential-flavoured even for a commercial site.** The slugs
> (`ac-repair`, `heating-furnace-repair`, `maintenance-tune-up`, `emergency-hvac-service`,
> `indoor-air-quality`, `commercial-hvac`) target high-volume search queries; the *display titles*
> supply the commercial positioning. Changing slugs in a rebrand breaks inbound links — treat
> them as permanent and add redirects instead.
> **One record is consumed by 6 different components.** This single array drives the mega dropdown,
> the mobile drawer, the services index, the service detail page, the footer's service column and
> the case-study "related services" rail. It is the site's most important data file.

---

## 3. `CASE_STUDIES` — 8 records

Interface: `CaseStudyDossier` (`src/types/index.ts`).

```ts
interface CaseStudyDossier {
  id: string; slug: string; code: string;     // code = "2024-IND-01" style dossier number
  title: string; location: string; year: string;
  sector: 'Industrial' | 'Healthcare' | 'Class A Office'
        | 'Education' | 'Hospitality' | 'Cold Storage';
  sectorBadge: string;                          // the Badge text (differ from `sector`)
  overview: string; facilityFootprint: string;
  primaryMetricLabel: string; primaryMetricValue: string;
  secondaryMetricLabel: string; secondaryMetricValue: string;
  equipmentSchedule: string[];
  outcome: string; image: string;
  fullNarrative?: string; challenge?: string; scopeOfWork?: string;
  executionPhases?: string[]; verificationNotes?: string;
  relatedServiceSlugs?: string[];
}
```

| # | `slug` | `code` | Title | `sector` | `sectorBadge` | Primary metric | Secondary metric |
|---|---|---|---|---|---|---|---|
| 1 | `apex-logistics-hub` | `2024-IND-01` | Apex Logistics Hub Central Ventilation | Industrial | Industrial / Logistics | `210,000 CFM` | `-14.2% REDUCTION` |
| 2 | `st-jude-ambulatory-chiller` | `2024-HLT-02` | St. Jude Ambulatory Chiller Plant | Healthcare | Healthcare / Critical | `400 TR N+1` | `-28.0% KWH CONSUMPTION` |
| 3 | `keystone-tower-rooftop` | `2023-OFC-03` | Keystone Tower Rooftop Modernization | Class A Office | Class A Commercial Office | `160 TONS (4x 40 TR)` | `NC-35 COMPLIANT` |
| 4 | `oakridge-campus-hydronic-boiler` | `2023-EDU-04` | Oakridge Campus Hydronic Boiler Retrofit | Education | Education / Campus DOAS | `9.0M BTU/HR` | `-34.0% THERMS` |
| 5 | `foundry-precision-cnc` | `2024-IND-05` | Foundry Precision CNC Thermal Containment | Industrial | Industrial / Aerospace Machining | `±1.0°F CONSTANT` | `99.98% MTBF` |
| 6 | `grand-marquis-fan-coil` | `2023-HSP-06` | The Grand Marquis 4-Pipe Fan Coil Overhaul | Hospitality | Hospitality / Luxury Suites | `NC-28 DB RATING` | `-19.2% KW DRAW` |
| 7 | `biovance-cleanroom-pressurization` | `2024-HLT-07` | BioVance Cleanroom Dynamic Pressurization | Healthcare | Healthcare / BSL-3 Cleanroom | `±0.02" WG STRICT` | `< 1.0 SEC RESPONSE` |
| 8 | `crossdock-regional-low-gwp` | `2024-CLD-08` | Crossdock Regional Low-GWP Refrigeration | Cold Storage | Cold Storage / Food Logistics | `-10°F LOW-TEMP` | `1.0 GWP (NET ZERO)` |

Note the `code` values are **zero-padded sequential within the year group** (`01`–`08`), and their
3-letter infix is a *sector* abbreviation (`IND`/`HLT`/`OFC`/`EDU`/`HSP`/`CLD`), not a state code.
`code` is rendered as `DOSSIER #{code}` on the detail hero and in the breadcrumb.

**The `sector` union type has exactly 6 members, and all 6 appear in the data** — that is what makes
`CaseStudiesPage`'s filter row work. Adding a 7th sector requires editing the union in
`src/types/index.ts` *and* the filter array in the page.

> ⚠ **Two parallel taxonomy fields.** `sector` (a typed union, drives the filter) and `sectorBadge`
> (free text, what the badge displays) can drift. A rebuild should collapse them to one field.
> ⚠ **7 of the 8 records lack a `fullNarrative` / `verificationNotes` combination** that
> `CaseStudyDetailPage` renders. Guard optional fields; do not assume presence.
> ⚠ `relatedServiceSlugs` is optional and only populated on some records. The related-services rail
> must degrade to "no related services" rather than render an empty box.

---

## 4. `SERVICE_HUBS` — 9 records

Interface: `ServiceAreaHub` (`src/types/index.ts`).

```ts
interface ServiceAreaHub {
  state: 'Indiana' | 'Ohio' | 'Kentucky';
  stateCode: string;      // "IN" | "OH" | "KY"
  city: string;
  code: string;           // hub designation, e.g. "IND-01"
  isHQ?: boolean;         // exactly one record
  address?: string;       // HQ only
  dispatchHotline: string;// display form, "(317) 555-0140"
  coverageRadius: string;
  avgResponseTime: string;
  keyFacilitiesServed: string[];
}
```

| State | Cities | Count |
|---|---|---|
| Indiana | Indianapolis (**HQ**), Fort Wayne, Evansville | 3 |
| Ohio | Columbus, Cincinnati, Dayton | 3 |
| Kentucky | Louisville, Lexington, Covington / N. Kentucky | 3 |

The HQ record is `isHQ: true` with an `address`; the other 8 omit both. `ServiceAreasPage`
generates the `tel:` href at render time with
`hub.dispatchHotline.replace(/[^0-9]/g, '')` — the only computed phone link in the codebase.

> [HVAC-TEMPLATE] A "3 states × 3 cities, one is HQ" hub directory is the standard
> multi-branch-services pattern. The `state` union type gives you a free filter. Keep it.

---

## 5. `MAINTENANCE_*` — 4 collections

### `MAINTENANCE_PIPELINE` — 6 steps
`MaintenanceStep { step, phase, title, description, deliverable, testingOrStandard }`
Rendered by `PipelineSection` as a 3×2 grid. The `step` value is a large crimson numeral
(`font-display-xl-mobile text-primary font-bold`); `phase` is a chip; `deliverable` and
`testingOrStandard` are the two inset `justify-between` rows.

> [HVAC-TEMPLATE] **This is the most portable content device on the site.** "Numbered step →
> deliverable → the standard it is measured against" works for any regulated or process-driven
> trade.

### `READINESS_CHECKLIST` — 7 items
`ChecklistItem { id: number, title, description, tag }`
`id` is the visible number (`{item.id}. {item.title}`), so **ids must be 1..7 in order** — they are
not auto-generated. `ChecklistSection` prints the live count against `READINESS_CHECKLIST.length`.

### `MAINTENANCE_TIERS` — 3 tiers
`MaintenanceTier { id, tierNumber, title, tagline, isPopular?, cadence, responseWindow,
slaBadge, inclusions: string[], actionLabel }`
- `id` values are `tier-01`, `tier-02`, `tier-03` and are what `/contact?tier=` carries.
- Exactly one has `isPopular: true` (the middle one) → gets the crimson border, `ring-1`,
  `shadow-xl` and the "Most Popular Scope" ribbon.
- `actionLabel` is the CTA text — **the button has no `children`, it renders `tier.actionLabel`
  directly**, so each tier names its own next step (e.g. request a survey vs. sign an agreement).
- `inclusions` is rendered as a bulleted list with crimson `Check` tiles.

> ⚠ **`/contact?tier=<id>` loses the tier.** `SubmittalForm` reads only
> `searchParams.get('tier')` and uses it as a **boolean**: if the param exists at all it sets
> `projectClassification = 'Preventive Maintenance Agreement'`. So `?tier=tier-01`,
> `?tier=tier-02` and `?tier=tier-03` all produce the *same* prefilled form. The three CTAs are
> indistinguishable at the destination. Fix: `actionLabel`-aware routing, or a `?classification=`
> param per tier.

### `TECHNICAL_FAQS` — 5 items
`{ question, answer }`. Rendered by `TierMatrixSection`'s accordion with `openFaq` initialised to
`0`.

---

## 6. `REVIEWS` — 5 records

Interface: `ClientReview` (`src/types/index.ts`).

```ts
interface ClientReview {
  id: string; author: string; role: string; organization: string;
  location: string; serviceCategory: string; rating: number;
  quote: string; verificationBadge: string;
}
```

Rendered as a **static 3-column grid** on `CaseStudiesPage` (5 records, 3 shown per row → 3 + 2).
`rating` (a number) and `verificationBadge` (a string) are in the data but the grid renders
`verificationBadge` as a `<strong>` and does **not** render star icons — `rating` is unused.

> [BRAND-SPECIFIC] All 5 reviews are invented: fake named engineers at fake organisations
> (`Apex`, `St. Jude Health`, `Keystone Properties`, `Grand Marquis Hospitality`,
> `BioVance Pharma`). **These names resemble real institutions and must be replaced before any
> real deployment** — a testimonial attributing a quote to a real hospital or property developer is
> a legal exposure. Note `/reviews` also **redirects to `/case-studies`**, so there is no dedicated
> testimonial page.

---

## 7. ⚠ Content that lives OUTSIDE the data layer (real debt)

The following is duplicated, hardcoded in JSX, and must all be found and edited manually on a
rebrand:

| Content | Locations | Notes |
|---|---|---|
| **HQ street address** | `serviceAreasData.ts:11` **and** `Footer.tsx:37` = `4200 Precision Way, Suite 800, Indianapolis, IN 46240` · `DispatchDirectory.tsx:83` = **`4820 Innovation Parkway, Suite 100, Indianapolis, IN 46268`** | **Two different addresses.** The service-area hub and the footer agree; the contact page disagrees. |
| **Hub city lists** | `serviceAreasData.ts` (9 hubs) **and** `DispatchDirectory.tsx:114–131` (re-typed as `Indianapolis (Central HQ) • Fort Wayne • Evansville` etc.) | Two sources of truth for the same list |
| **Dispatch phone** | `tel:8005550194` in **13 places**; `(317) 555-0140` ×2; per-hub `dispatchHotline` ×9 | No shared constant |
| **Emails** | `estimating@vertexsolutionshvac.com` ×2, `service@vertexsolutionshvac.com` ×1 | — |
| **Licence numbers** | `#HVAC-MECH-48209` in `Navbar.tsx:42` and `Footer.tsx:192` · `#PE-104928-IN` in `QualityArchitecture`, `ContactPage`, `AboutPage` | — |
| **P.E. identity** | Name, title, `Purdue B.S.`, `22+ Years`, `ASHRAE Distinguished Lecturer`, `ASME … Committee Member` — in `QualityArchitecture`, `AboutPage`, `ContactPage` | 3 copies |
| **The P.E. pull-quote** | `QualityArchitecture:113`, `AboutPage`, `ContactPage:78` | 3 byte-identical copies |
| **Hero slides** | `HeroSlider.tsx:14–55` (5 slides with `spec`/`headline`/`subhead`/`image`/`tabNumber`/`tabLabel`) | In-component, not in `src/data` — the one content array that lives in a component |
| **Partner list** | `PartnerGrid.tsx:4–11` (6 OEMs) | In-component |
| **Metrics** | `MetricsRibbon.tsx:4–29` (4), `ServicesPage:41–58` (4), `CaseStudiesPage` ribbon, `MaintenancePage:22–33`, `AboutPage` | 5 separate hardcoded metric sets |
| **`SERVICE_HUBS[].address`** | Only the HQ record has one; `DispatchDirectory` and `Footer` each re-type their own | — |

> **[REUSABLE LESSON]** A production rebuild should extract a single `src/data/siteConfig.ts`
> holding `{ company, licence, pe, contact, addresses, phones, emails, nav }` and import it
> everywhere. The reference implementation has none of this, which is why the two addresses
> disagree.

---

## 8. Content tone system

| Layer | Style | Example |
|---|---|---|
| Eyebrow | UPPERCASE, mono, numbered, `//`-separated | `SPEC 03 // HEAVY-DUTY PACKAGED ROOFTOP UNITS & CRANE RIGGING` |
| H1 | Sentence case, full stop, technical noun phrase | `A Structured Mechanical Process from First Site Visit to Final Balance.` |
| Section H2 | Title case, no full stop | `Tiered Maintenance Agreement Matrix` |
| Card H3/H4 | Title or sentence case, no full stop | `Emergency Diagnostics & Repair` |
| Body | Complete sentences, 2nd/3rd person plural, no exclamation | `We execute commercial HVAC service through a transparent six-step methodology…` |
| Metric | Number + unit + uppercase mono label | `±2.5% NEBB TAB`, `2-Hour Regional Arrival`, `14,850+ TR` |
| CTA | Verb-first, Title Case | `Request Technical Consultation` · `Schedule a Facility Assessment` |
| Data value | Mixed: monospace for codes/units, Inter bold for tonnages | `DOSSIER #2024-IND-01`, `400 TR N+1` |

**Banned vocabulary** (absent from the entire codebase): *amazing, best, #1, top-rated, quality
service, affordable, friendly, we care, your comfort, guaranteed savings, unbeatable, state-of-the-art*.

**Required vocabulary:** standards bodies (`ASHRAE`, `NEBB`, `ASME`, `EPA`, `OSHA`, `ISO`, `AHRMA`),
equipment brands (Carrier, Trane, Daikin, Bosch, York, JCI, Lennox), control protocols (`BACnet`,
`DDC`, `VFD`), and credential terms (`P.E. stamped`, `TAB`, `C-PACE`, `MMBtu`, `TR`).

---

## 9. How to change content

| To change | Edit | Then |
|---|---|---|
| A service | `src/data/servicesData.ts` | Rebuild. The nav dropdown, drawer, index, detail page, footer column and case-study related rails all update automatically. |
| Add a service | Add a record to `SERVICES` | Nothing else. But check: the mega dropdown is a fixed `w-[540px] grid-cols-2` — **7 items would make it 4 rows and it will still fit, 9+ will look sparse.** |
| A case study | `src/data/caseStudiesData.ts` | Rebuild. If its `sector` is new, also add it to the union type and the filter array in `CaseStudiesPage`. |
| A hub | `src/data/serviceAreasData.ts` | Also fix `DispatchDirectory.tsx:114–131` by hand. |
| A maintenance tier | `MAINTENANCE_TIERS` | Also fix the `?tier=` handling in `SubmittalForm` if you want the CTA to carry identity. |
| A review | `src/data/reviewsData.ts` | Grid shows 3 per row; 5 records → 3 + 2. |
| A hero slide | `src/components/home/HeroSlider.tsx:14–55` | Progress bar and tab bar auto-size to `HERO_SLIDES.length`. |
| Company name / phone / address | **5+ places, no single source** | See §7. |
| Any mono-uppercase label | Hardcoded in the JSX | `grep -ri` the old string. |
