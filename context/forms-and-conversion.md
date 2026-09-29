# Forms & Conversion

> **There is exactly one form on the entire site, it is hand-rolled, and it does not submit
> anywhere.** The "network call" is a `setTimeout` that fabricates a ticket number. This file
> documents what exists, what is broken, and what a rebuild must add.

---

## 1. Inventory — every form-like element

| # | Element | Where | Submits? | Notes |
|---|---|---|---|---|
| 1 | **`SubmittalForm`** — the consultation intake | `src/components/contact/SubmittalForm.tsx` (421 L), rendered by `ContactPage` at the 7/5 split | ❌ **no** | 10 fields, native `required` + 1 custom rule, fake 800ms submit, fake ticket |
| 2 | **Tier CTAs** | `TierMatrixSection` → `/contact?tier=tier-01\|02\|03` | n/a | prefill attempt, **value is discarded** |
| 3 | **"Request Technical Consultation"** | `ServicesPage` service rows → `/contact?service=${slug}` | n/a | ❌ **dead param** — `service` is never read |
| 4 | **Financing CTA** | `FinancingPage` → `/contact?financing=true` | n/a | ❌ **dead param** — never read |
| 5 | **Nav CTA "Request a Consultation"** | `Navbar` desktop bar, mobile drawer, footer → `/contact` | n/a | clean |
| 6 | **Hero CTAs** | `HeroSlider` → `/services`, `/contact` | n/a | clean |
| 7 | **Case-study "Discuss a Similar Project"** | `CaseStudyDetailPage` → `/contact` | n/a | clean — loses the dossier context |
| 8 | Phone `tel:` links | Navbar, footer, hub cards, 9 `dispatchHotline`s | n/a | `tel:` only, no tracking |
| 9 | Email `mailto:` links | footer, `ContactPage` (2 addresses) | n/a | `mailto:` only |
| 10 | Newsletter / social / cookie-consent | — | — | **do not exist** |

> [REUSABLE] **Every CTA on the site converges on `/contact`.** There is exactly one conversion
> destination, which makes analytics and a rebuild simple. The cost is that all 4 entry contexts
> (a service, a tier, a financing enquiry, a case study) arrive at an identical blank form.

---

## 2. `SubmittalForm` — full specification

### 2.1 State shape

```ts
type ConsultationSubmittal = {
  fullName: string; companyName: string; email: string; phone: string;
  projectClassification: string; facilityType: string;
  projectLocation: string; estimatedTimeline: string;
  budgetScope: string; projectScope: string;
};
```

10 fields. Initial state: **every field `''`**, except `projectClassification` which is seeded to
`'Preventive Maintenance Agreement'` when `?tier=` is present. Plus 3 UI state variables:
`isSubmitting: boolean`, `submittedTicket: string | null`, `errorMessage: string | null`.

### 2.2 Field table

| # | `name` | Label | Control | Type | Required | Options / constraint | Helper text |
|---|---|---|---|---|---|---|---|
| 1 | `fullName` | Full Name | `<input>` | `text` | ✅ `required` | — | Project representative or facilities director |
| 2 | `companyName` | Company / Facility Name | `<input>` | `text` | ✅ `required` | — | Entity holding commercial property title |
| 3 | `email` | Business Email Address | `<input>` | `email` | ✅ `required` | browser email validation | Official corporate correspondence address |
| 4 | `phone` | Direct Phone Number | `<input>` | `tel` | ✅ `required` | **no pattern, no `minLength`** | Direct cell or facility engineering desk |
| 5 | `projectClassification` | Project Classification | `<select>` | — | ✅ `required` | 6 options + placeholder | Primary engineering classification |
| 6 | `facilityType` | Building / Facility Type | `<select>` | — | ✅ `required` | 7 options + placeholder | Operational environmental envelope |
| 7 | `projectLocation` | Project Location (City, State) | `<input>` | `text` | ✅ `required` | **no validation at all** | Midwest Region (IN · OH · KY territory) |
| 8 | `estimatedTimeline` | Estimated Timeline / Urgency | `<select>` | — | ✅ `required` | 4 options + placeholder | Target engineering mobilization date |
| 9 | `budgetScope` | Target Capital Allocation / Budget | `<select>` | — | ⬜ **optional** | 4 bands + placeholder | Assists our engineering team… |
| 10 | `projectScope` | Project Scope & Equipment Specifications | `<textarea rows={4}>` | — | ✅ `required` | **custom: ≥ 25 chars after trim** | Minimum 25 characters. Attach telemetry logs… |

**9 of 10 required.** Layout: rows 1–4 are 2-up (`grid-cols-1 sm:grid-cols-2 gap-space-md`); rows 5
and 6 (`budgetScope`, `projectScope`) are full-width.

### 2.3 `<select>` option sets (copy these verbatim on a rebrand — they are the qualification logic)

**`projectClassification`** — 6 options, placeholder `Select mechanical scope...`
```
New Commercial Installation
Plant Retrofit & Modernization
Preventive Maintenance Agreement
Emergency Mechanical Repair
Chilled Water System Upgrade
Energy & TAB Audit
```

**`facilityType`** — 7 options, placeholder `Select environmental profile...`
```
Industrial Logistics / Distribution Center
Healthcare / Surgical Suite / Hospital
Pharmaceutical Cleanroom / BSL Lab
Class A Multi-Story Office
Educational Campus / DOAS
Cold Storage & Blast Refrigeration
Manufacturing / Foundry CNC
```

**`estimatedTimeline`** — 4 options, placeholder `Deployment window...`
```
Immediate Critical Emergency Dispatch
30-Day Mobilization Window
Q1/Q2 Planned Capital Upgrade
Preliminary Feasibility & RFP Review
```

**`budgetScope`** — 4 bands, placeholder `Select approximate scope threshold...`
```
Under $50,000
$50,000 – $150,000
$150,000 – $500,000
$500,000+ Enterprise Central Plant
```

> [HVAC-TEMPLATE] **These option sets are the lead-qualification layer.** `facilityType` maps 1:1 to
> the 6 `sector` values in `CASE_STUDIES`; `budgetScope` sets the sales-response SLA; and
> `estimatedTimeline` distinguishes an emergency call from a capital project. They are worth
> keeping verbatim on a rebrand — only the copy needs editing.

### 2.4 The submit handler — in full

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage(null);

  if (formData.projectScope.trim().length < 25) {
    setErrorMessage('Please provide at least 25 characters describing your project scope or equipment parameters.');
    return;
  }

  setIsSubmitting(true);

  // Simulate verified submittal routing to engineering desk
  setTimeout(() => {
    const randomTicket = `VTX-PE-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(randomTicket);
    setIsSubmitting(false);
  }, 800);
};
```

| Property | Reality |
|---|---|
| Validation | **Browser-native only** (`required`, `type="email"`), plus 1 custom rule |
| Network | **none** — no `fetch`, no XHR, no `FormData`, no `action` attribute |
| Latency | a hard-coded `setTimeout(…, 800)` |
| Result | a random 6-digit number: `VTX-PE-` + `Math.floor(100000 + Math.random() * 900000)` |
| Persistence | **none** — the ticket is discarded when the component unmounts |
| Reset | `resetForm()` clears `submittedTicket` **and all 10 fields**, but **does not re-read `?tier=`** — so a second submission on a `?tier=` URL loses the prefill |
| Concurrency | the submit button is `disabled={isSubmitting}`, so double-submit is blocked by the UI only |
| Cleanup | ⚠ **the `setTimeout` is never cleared.** Navigating away mid-submit calls `setState` on an unmounted component (harmless in React 19, but a leak of intent) |

### 2.5 The "confirmation" panel

Rendered when `submittedTicket` is truthy, in place of the form. Contains:
- a `CheckCircle2` in a `w-12 h-12 rounded-full bg-primary-container` disc,
- `<h3>Submittal Received & Encrypted</h3>`,
- a paragraph naming **Robert Keller, P.E.** as the receiving engineer and promising a scope
  assessment "within 4 business hours",
- a mono receipt block: `Assigned Ticket` / `Direct Dispatch Queue: Indianapolis Central Plant
  Operations` / `SLA Response Window: < 4 Hours Guaranteed`,
- one button: `Submit Another Technical Request` → `resetForm()`.

**Copy claims the rebuild must either honour or delete:** "Received & **Encrypted**", "Commercial
NDA encrypted transmission" (with a `Lock` icon), "< 4 Hours Guaranteed", and a named individual
engineer. On a real site these are legally binding service commitments. **There is no encryption,
no NDA, and no SLA** — the form is client-side only.

---

## 3. Conversion path analysis

### 3.1 The funnel

```
Hero / Nav / Footer / Any page
        │  "Request a Consultation" / "Request Technical Consultation"
        ▼
    /contact                                  ← the ONLY destination
        │
        ├── SubmittalForm  (10 fields, 9 required, 800ms fake submit)
        │
        └── DispatchDirectory  (9 hubs, per-hub tel: links, "24/7 Dispatch" block)
                │
                └── tel: links              ← the real conversion for 40% of visitors
```

There is **no second step** — no thank-you page (the panel is inline), no calendar link, no
download, no phone-back scheduler, no confirmation email, no CRM, no analytics event, no
`gtag`/`dataLayer` call, no `track` hook.

### 3.2 Friction points, in order of severity

| # | Friction | Impact | Fix |
|---|---|---|---|
| 1 | **10 fields before you can submit** | The single biggest drop-off on a B2B site. A phone-first visitor must complete a 10-field spec sheet. | Cut to 5 (name, company, email, phone, scope). Move `facilityType`, `estimatedTimeline`, `budgetScope` to a post-submit qualification call, or to an optional step 2. |
| 2 | **The fake submit** | A visitor who types a real scope and clicks submit is **told it was received and encrypted** — and nothing happened. This is the most damaging bug in the project: it is user-visible *and* it makes a false claim. | Wire to a real endpoint before any launch. Until then, change the copy to something honest. |
| 3 | **No phone-only path in the form column** | A visitor who wants to call has to scroll past the form. | Put the `DispatchDirectory` above the form on mobile, or add a `tel:` CTA at the top of the form. |
| 4 | **`?service=` / `?financing=` are dead** | A visitor who clicks "Discuss AC & Chiller Repair" on a service page arrives at a blank form with no recollection of their interest. | Read the param and prefill `projectClassification` + inject the service title into the `projectScope` placeholder. |
| 5 | **`?tier=` loses the tier** | All 3 tier CTAs land on an identical form. | Pass `?classification=Preventive%20Maintenance%20Agreement&tier=tier-02` and read both. |
| 6 | **No prefill of context on case-study CTAs** | The dossier is the most persuasive asset on the site and none of it carries over. | `/contact?caseStudy=${slug}`. |
| 7 | **No `autocomplete` attributes** | Mobile browsers do not offer field suggestions. | `autocomplete="name" "organization" "email" "tel" "street-address"`. |
| 8 | **No `enterkeyhint` / input mode** | `projectScope` and `projectLocation` don't get the right soft keyboard. | `enterKeyHint="done"`, `inputMode="text"`. |
| 9 | **`phone` has no pattern** | `required` accepts `"1"`. | `pattern="[0-9()\-+ ]{7,}"` or a light custom check. |
| 10 | **No consent / privacy copy, no checkbox** | Collecting email + phone without a stated basis is a GDPR/CCPA exposure. | Add a required consent checkbox and a link to a privacy policy. **There is no privacy page in the route table at all.** |
| 11 | **No honeypot, no rate limit, no CAPTCHA** | The moment you point this at a real endpoint it becomes a spam target. | Honeypot field + server-side rate limit. |
| 12 | **No analytics, no conversion event** | You cannot measure any of the above. | Fire a `submit_success` event; log the referrer and the CTA that led here. |

---

## 4. ⚠ Form accessibility audit

| Requirement | Status | Detail |
|---|---|---|
| `<label for>` matching the control `id` | ✅ **10/10 correct** — every field has `id={name}` and `htmlFor={name}` |
| Required indication | ⚠ visual-only — a crimson `*` span, no `aria-required` (though native `required` is set) | Screen readers announce "required" from the attribute, so this is acceptable |
| Optional indication | ✅ `(Optional)` in `text-secondary` | |
| Error announcement | ❌ **the red panel has no `role="alert"`** and focus is not moved to it | A screen-reader user submitting 10 characters hears nothing |
| `aria-invalid` on the failing field | ❌ **missing** — `projectScope` is never marked invalid | |
| Error ↔ field association | ❌ **missing** — the panel is at the top of the form, ~250px above the `projectScope` field | No `aria-describedby` |
| Focus management on submit | ❌ focus stays on the (now-removed) submit button | Focus should move to the confirmation `<h3>` with `tabIndex={-1}` |
| Confirmation semantics | ❌ a plain `<div>` — no `role="status"`, no `role="alert"`, no focus target | |
| Required fields in a `<fieldset>`/`<legend>` | ❌ 10 flat fields, no grouping | Row grouping is visual only |
| Error styling beyond colour | ❌ red text + red border only | No icon per field, no message under the field |
| Autofill | ❌ no `autocomplete` | |
| Keyboard submit | ✅ native `Enter` in a text input submits the form | |
| Button `type` | ✅ `type="submit"` | |
| Tab order | ✅ DOM order matches visual order | |

> The labelling is genuinely well done (10/10 `for`/`id` pairs) — which makes the missing
> `role="alert"` the more glaring gap. A rebuild should add a `useId`-per-field pattern with
> `aria-describedby` + `aria-invalid` + `role="alert"` on the summary, and it will be strictly
> better than the reference in about 20 lines.

---

## 5. ⚠ The `?tier=` bug, in detail

```
/contact?tier=tier-01   ─┐
/contact?tier=tier-02   ─┼─→  searchParams.get('tier')  →  "tier-01" | "tier-02" | "tier-03"
/contact?tier=tier-03   ─┘            │
                                       ├─ truthy for ALL THREE
                                       ▼
              setProjectClassification('Preventive Maintenance Agreement')
```

The value is read at line 8, used once as a truthiness test at line 15, and **never referenced
again**. Consequences:

1. `tier-01`, `tier-02` and `tier-03` are indistinguishable at the destination.
2. Even if the visitor changes the select, the tier is not recoverable.
3. `resetForm()` hard-codes `projectClassification: ''`, so the prefill is lost on the second
   submission.
4. A visitor landing on `/contact?tier=anything` — including `?tier=false` or a typo — gets the
   maintenance-agreement prefill.

**Minimal fix:**

```tsx
const tier = searchParams.get('tier');
const svc = searchParams.get('service');
const fin = searchParams.get('financing');
const cls = tier
  ? 'Preventive Maintenance Agreement'
  : svc
    ? (SERVICES.find(s => s.slug === svc)?.title ?? '')
    : fin ? 'Plant Retrofit & Modernization'
          : '';
```

**Correct fix:** give each tier a real classification, e.g. add `classification: string` to
`MaintenanceTier` and read `?classification=` directly. Also echo the tier into the confirmation
panel and the `projectScope` placeholder so the visitor can see the context carried through.

---

## 6. Rebuild requirements

| # | Requirement | Priority |
|---|---|---|
| 1 | **A real submission endpoint** (form action, serverless function, CRM, or `mailto:` fallback) | 🔴 blocker |
| 2 | Delete or substantiate "Encrypted" / "NDA" / "< 4 Hours Guaranteed" / the named P.E. | 🔴 blocker (legal) |
| 3 | Cut the form to 5 required fields; move the other 5 to a qualification step | 🔴 conversion |
| 4 | Add `autocomplete`, `inputMode`, `enterKeyHint`, and a `phone` pattern | 🟠 |
| 5 | Add `role="alert"`, `aria-invalid`, `aria-describedby`, and focus management | 🟠 a11y |
| 6 | Fix the `?tier=` / `?service=` / `?financing=` handoff (see §5) | 🟠 |
| 7 | Add a honeypot + server-side rate limit + CAPTCHA if the endpoint is public | 🟠 security |
| 8 | Add a consent checkbox and a real `/privacy` route | 🟠 legal |
| 9 | Fire analytics events: `cta_click`, `form_start`, `form_error`, `form_submit` | 🟡 |
| 10 | Preserve the draft in `sessionStorage` so a navigation doesn't lose 10 fields | 🟡 |
| 11 | Clear the `setTimeout` on unmount | 🟡 hygiene |
| 12 | Put `DispatchDirectory` above the form on mobile | 🟡 conversion |
| 13 | Add a real thank-you route with the ticket in the URL (`/thanks?ref=VTX-PE-…`) so it is shareable | 🟢 |
| 14 | Validate with a schema (`zod`) instead of 1 inline `if` | 🟢 |

> **[REUSABLE]** The strongest conversion idea in this project is not the form — it is the
> **`DispatchDirectory` sitting next to it.** Nine named hubs with `tel:` links and per-hub
> response times give a visitor a zero-friction path alongside a high-friction one. That dual
> path (self-serve spec + human phone) is exactly right for commercial HVAC, and it is worth
> reproducing even if you never build the real backend.
