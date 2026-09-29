import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import {
  DollarSign,
  TrendingDown,
  Building,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Phone,
  Calculator,
} from 'lucide-react';

export const FinancingPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Commercial Capital Allocation & Utility Rebates | Vertex Solutions"
        description="Explore commercial HVAC capital allocation structures, equipment leasing, C-PACE financing compatibility, and utility energy efficiency rebate capture across IN, OH, and KY."
      />

      {/* Top Banner */}
      <div className="w-full bg-surface-container-low border-b border-structural py-3 px-margin lg:px-margin-desktop font-label-mono-sm text-[12px] text-secondary">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span>COMMERCIAL CAPITAL MODELS // UTILITY REBATE RECOVERY</span>
          </div>
          <div>
            <span>ASHRAE 90.1 PE VERIFIED ENERGY AUDITS</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="w-full bg-white pt-16 pb-12 lg:pt-20 lg:pb-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <SectionHeader
            eyebrow="CAPITAL STRUCTURING"
            title="Commercial HVAC Financing &amp; Utility Rebate Capture"
            description="Replacing central chillers or boiler plants requires significant capital outlay. Vertex Solutions collaborates with commercial facility directors and CFOs to structure equipment financing, maximize utility decarbonization grants, and minimize balance-sheet impact."
            className="max-w-4xl"
          />
        </div>
      </section>

      {/* 3 Capital Allocation Models */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1: Operating Leases & OpEx */}
            <div className="bg-white border border-structural p-8 rounded-xl flex flex-col justify-between hover:border-on-surface hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary mb-6">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block mb-1">
                  Structure 01
                </span>
                <h3 className="font-headline-sm text-[20px] text-on-surface font-bold mb-3">
                  Operating Lease (OpEx)
                </h3>
                <p className="font-body-sm text-secondary leading-relaxed mb-6">
                  Structure high-tonnage chiller and RTU replacements as off-balance-sheet operating expenses. Lowers immediate capital hurdles while integrating ongoing preventive maintenance into a single predictable monthly invoice.
                </p>
                <div className="space-y-2 text-[13px] font-label-mono-sm text-secondary pt-4 border-t border-structural">
                  <div>• 100% Tax Deductible Operating Expense</div>
                  <div>• Preserves Working Capital Reserves</div>
                  <div>• Includes Full Tier-2 Maintenance SLA</div>
                </div>
              </div>

              <div className="pt-6 border-t border-structural mt-6">
                <Link
                  to="/contact?financing=opex"
                  className="font-button-text text-[13px] text-primary hover:text-on-surface font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Request OpEx Feasibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Model 2: C-PACE Financing */}
            <div className="bg-white border border-structural p-8 rounded-xl flex flex-col justify-between hover:border-on-surface hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary mb-6">
                  <Building className="w-5 h-5" />
                </div>
                <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block mb-1">
                  Structure 02
                </span>
                <h3 className="font-headline-sm text-[20px] text-on-surface font-bold mb-3">
                  C-PACE Clean Energy Capital
                </h3>
                <p className="font-body-sm text-secondary leading-relaxed mb-6">
                  Commercial Property Assessed Clean Energy (C-PACE) provides long-term, fixed-rate financing for energy-efficient mechanical retrofits, repaid conveniently through local property tax assessments without personal guarantees.
                </p>
                <div className="space-y-2 text-[13px] font-label-mono-sm text-secondary pt-4 border-t border-structural">
                  <div>• Up to 20-Year Fixed Financing Terms</div>
                  <div>• Transferable Upon Property Sale</div>
                  <div>• Funded via Verified Energy Reductions</div>
                </div>
              </div>

              <div className="pt-6 border-t border-structural mt-6">
                <Link
                  to="/contact?financing=cpace"
                  className="font-button-text text-[13px] text-primary hover:text-on-surface font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Check C-PACE Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Model 3: Utility Rebate Recovery */}
            <div className="bg-white border border-structural p-8 rounded-xl flex flex-col justify-between hover:border-on-surface hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary mb-6">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block mb-1">
                  Structure 03
                </span>
                <h3 className="font-headline-sm text-[20px] text-on-surface font-bold mb-3">
                  Utility Incentive Capture
                </h3>
                <p className="font-body-sm text-secondary leading-relaxed mb-6">
                  Our licensed Professional Engineers generate stamped ASHRAE 90.1 pre- and post-installation energy models, securing tens of thousands of dollars in commercial rebates across Duke Energy, AES Indiana, AEP Ohio, and LG&amp;E.
                </p>
                <div className="space-y-2 text-[13px] font-label-mono-sm text-secondary pt-4 border-t border-structural">
                  <div>• Direct Utility Incentive Filing</div>
                  <div>• PE Stamped Thermodynamic Models</div>
                  <div>• Immediate First-Year Capital Offset</div>
                </div>
              </div>

              <div className="pt-6 border-t border-structural mt-6">
                <Link
                  to="/contact?financing=rebates"
                  className="font-button-text text-[13px] text-primary hover:text-on-surface font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Explore Utility Rebates</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Engineering Principles */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <SectionHeader
            eyebrow="COMMERCIAL INTEGRITY"
            title="Non-Predatory, Institutional Financial Guidance"
            description="Vertex operates as a licensed mechanical engineering contractor, not an equipment loan broker. We provide transparent lifecycle cost models so you can make informed decisions based on genuine thermodynamic return on investment."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-structural">
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-3">
                Lifecycle Cost Analysis (LCCA)
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                Initial equipment purchase price typically accounts for less than 15% of an industrial chiller or boiler’s 20-year total cost. Electrical power draw, refrigerant maintenance, and water treatment make up the remaining 85%. Our engineering proposals include detailed LCCA calculations detailing payback periods down to the month.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-structural">
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-3">
                Guaranteed Fixed-Bid Turnkey Pricing
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                Unforeseen crane costs, electrical disconnects, and curb adapters are common sources of contractor change orders. Vertex conducts exhaustive pre-bid site audits with laser measurements, guaranteeing firm fixed pricing on every capital replacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full bg-white py-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto bg-surface-container-low border border-structural rounded-xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold block mb-2">
              Financial Modeling
            </span>
            <h3 className="font-headline-md text-on-surface font-bold">
              Request a Custom Capital Feasibility Review
            </h3>
            <p className="font-body-md text-secondary mt-1">
              Connect with our estimating desk to model utility rebates and equipment lease options for your plant.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold transition-colors"
            >
              Request Intake Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
