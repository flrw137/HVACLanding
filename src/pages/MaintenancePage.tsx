import React from 'react';
import { Link } from 'react-router-dom';
import { PipelineSection } from '../components/maintenance/PipelineSection';
import { ChecklistSection } from '../components/maintenance/ChecklistSection';
import { TierMatrixSection } from '../components/maintenance/TierMatrixSection';
import { SEO } from '../components/common/SEO';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Maintenance & Work Process | Structured Commercial HVAC"
        description="Structured six-step mechanical HVAC execution pipeline, 7-point facility readiness checklist, and 3-tier maintenance agreements with guaranteed 2-to-4 hour SLAs."
      />

      {/* Top Protocol & Standards Metric Band per Reference */}
      <div className="w-full bg-surface-container-low border-b border-structural py-3 px-margin lg:px-margin-desktop">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3 text-secondary font-label-mono-sm text-[12px]">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-on-surface">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              ACTIVE PROTOCOL: DOC-ENG-9018
            </span>
            <span className="hidden md:inline text-structural-dim">|</span>
            <span className="hidden md:inline">SYSTEM BALANCING TOLERANCE: ±2.5% ASHRAE 111</span>
          </div>
          <div className="flex items-center gap-6">
            <span>CURRENT MEAN DISPATCH: <strong className="text-on-surface font-semibold">41 MIN</strong></span>
            <span>PEAK MTBF FACTOR: <strong className="text-on-surface font-semibold">99.98%</strong></span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="w-full bg-white pt-16 pb-12 lg:pt-20 lg:pb-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-primary-container rounded-full"></span>
                <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold">
                  Process &amp; Preventive Maintenance
                </span>
              </div>
              <h1 className="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-on-surface tracking-tight">
                A Structured Mechanical Process from First Site Visit to Final Balance.
              </h1>
              <p className="font-body-md sm:font-body-lg text-secondary max-w-3xl mt-2 leading-relaxed">
                We execute commercial HVAC service through a transparent six-step methodology that eliminates guesswork, avoids change orders, and protects critical facility uptime across enterprise plants.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end lg:items-end gap-3 pb-2">
              <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2.5 rounded-lg border border-structural">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="font-label-technical text-label-technical text-on-surface font-semibold">
                  NEBB Certified Field Procedures
                </span>
              </div>
              <p className="font-label-mono-sm text-[11px] text-secondary text-right hidden sm:block">
                Mechanical SLA Compliance: 100% Guaranteed Fixed Scope
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Pipeline Gallery Strip from Reference */}
      <section className="w-full bg-surface-container-low py-12 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden bg-white border border-structural group">
              <div className="h-48 overflow-hidden bg-surface-dim">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaU4xhdhHKaqT9Oln-QV7_UWvK3IiD1GIyqJqChqeM_5DwqaAdLVjJBWotIZjU9J6a_tbLAwdaM1rh2DPKl53p6YNw7eVlbL1pRWIyuWDjz_Cs6dmXMMBesbpsXjjMynbBGvlpbcHxllomBB0gp7WXdQBuAL7ND1HAD8lxh80UtdfKYuFYc7wXegmw7e3skwApGp9C7KyHZPmU9eUL805lwkK8TP6hEM0WF7sfwAfqc9tYWdvSfHp9Tw"
                  alt="Hydronic Testing & Tuning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between font-label-mono-sm text-[12px]">
                <span className="font-semibold text-on-surface">Phase 1: Precision Telemetry</span>
                <span className="text-primary font-medium">Laser Vibration Run</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-white border border-structural group">
              <div className="h-48 overflow-hidden bg-surface-dim">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdFL3YVYyMW1SmxuMypRao3gLNoNoUxxlMb6aoZITmIrM54q7g-1fAQ8xgKje4_WOQO1ghfmMJVz7GwXS2eJfl3k0WAkaqStEN-zB4uAHY5ZVsaJn9-TtJWILyqJd_xnBcw9fTGCreTccd_gOM-dcZIbAmN6emdlQhmZ4cPaBVOJ69UR5UfEI8r9uGqWFSF1sryEiO-EvKEqSfTGhiYozL79EV0MKnT-5bwNumzeUsD_Kq_YlREDLOaQ"
                  alt="Electronic Diagnostics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between font-label-mono-sm text-[12px]">
                <span className="font-semibold text-on-surface">Phase 2: Execution &amp; Welding</span>
                <span className="text-primary font-medium">ASME Section IV</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-white border border-structural group">
              <div className="h-48 overflow-hidden bg-surface-dim">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8h65zo3ViSg_Ly7lc34XnJlj1nCwJMaIqzRoUS5bCu8F26X4bRGrFwIACVDo56KthOPrUo1VHe-s5yuLkKZ5eb_F-5RV8-DEWniscZc7gGlAAdbEoF03yk_JdugcsY1pNrHmFyTKlgcV6EHrSXhuQvavqXE6LkpoxmconqaL7asd1PV14bUnoAVHNzhVYGtbzj_sGJyc9wexU3Hi7QkVVUiYRtoiDoeIxijWvyZ9mwCvImP-rdjUWcg"
                  alt="BACnet Commissioning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between font-label-mono-sm text-[12px]">
                <span className="font-semibold text-on-surface">Phase 3: Digital Turnover</span>
                <span className="text-primary font-medium">NEBB Certified TAB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Pipeline */}
      <PipelineSection />

      {/* Interactive Facility Readiness Checklist */}
      <ChecklistSection />

      {/* 3-Tier Maintenance Matrix & FAQs */}
      <TierMatrixSection />

      {/* Direct Assessment CTA Section */}
      <section className="w-full bg-surface-container-low py-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto bg-white border border-structural rounded-xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold block mb-2">
              Direct Site Assessment
            </span>
            <h3 className="font-headline-md text-on-surface font-bold">
              Schedule a Baseline Plant Assessment
            </h3>
            <p className="font-body-md text-secondary mt-2 leading-relaxed">
              Deploy our regional mechanical specialists to inspect your central plant, capture operational telemetry, and deliver an itemized maintenance roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Request Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8005550194"
              className="bg-white hover:bg-surface text-on-surface border border-structural font-button-text px-5 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>(800) 555-0194</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
