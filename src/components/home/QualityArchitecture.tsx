import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

export const QualityArchitecture: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Metrics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeader
              eyebrow="INSTITUTIONAL RIGOR"
              title="Quality Architecture & Field Discipline"
              description="Institutional discipline in every valve, drop, and control loop. Unlike equipment dealers who outsource installation, Vertex maintains an in-house engineering corps with direct licensed P.E. accountability from schematic load-modeling through final balancing."
            />

            {/* Field Telemetry Standards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-lg border border-structural my-2">
              <div className="flex flex-col border-l-2 border-primary-container pl-3">
                <span className="font-display-xl-mobile sm:font-headline-md text-on-surface">15.2 Yrs</span>
                <span className="font-label-mono-sm text-[11px] uppercase text-secondary font-semibold mt-1">Technician Tenure</span>
                <span className="font-body-sm text-[12px] text-secondary">Midwest engineering average</span>
              </div>
              <div className="flex flex-col border-l-2 border-primary-container pl-3">
                <span className="font-display-xl-mobile sm:font-headline-md text-on-surface">100%</span>
                <span className="font-label-mono-sm text-[11px] uppercase text-secondary font-semibold mt-1">Field Labor</span>
                <span className="font-body-sm text-[12px] text-secondary">Self-performed core mechanical</span>
              </div>
              <div className="flex flex-col border-l-2 border-primary-container pl-3">
                <span className="font-display-xl-mobile sm:font-headline-md text-on-surface">NEBB TAB</span>
                <span className="font-label-mono-sm text-[11px] uppercase text-secondary font-semibold mt-1">Certified Testing</span>
                <span className="font-body-sm text-[12px] text-secondary">Air &amp; hydronic balancing</span>
              </div>
            </div>

            {/* 3 Core Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-lg border border-structural">
                <div className="w-7 h-7 rounded bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5">
                  <UserCheck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-on-surface font-semibold">
                    1. Direct Access to Project Engineers
                  </h4>
                  <p className="font-body-sm text-secondary text-[14px] mt-0.5 leading-relaxed">
                    No customer service intermediaries. Facility directors coordinate directly with lead mechanical designers and assigned lead mechanics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-lg border border-structural">
                <div className="w-7 h-7 rounded bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-on-surface font-semibold">
                    2. Zero-Risk Commissioning (Cx)
                  </h4>
                  <p className="font-body-sm text-secondary text-[14px] mt-0.5 leading-relaxed">
                    Every installation concludes with comprehensive functional testing, thermodynamic verification, and acoustic certification before final handover.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-lg border border-structural">
                <div className="w-7 h-7 rounded bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] text-on-surface font-semibold">
                    3. EPA Universal &amp; ASHRAE 90.1 Compliance
                  </h4>
                  <p className="font-body-sm text-secondary text-[14px] mt-0.5 leading-relaxed">
                    Complete refrigerant management protocols and energy recovery verification aligned with current state and federal decarbonization mandates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Directorate Leadership Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-structural p-8 rounded-xl shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-structural mb-6">
              <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
                Engineering Directorate
              </span>
              <span className="font-label-mono-sm text-[11px] text-primary bg-[#ffdad8] px-2 py-0.5 rounded font-semibold">
                PE License: #PE-104928-IN
              </span>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center shrink-0 overflow-hidden border border-structural">
                <span className="font-headline-md text-primary font-bold">RK</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold">
                  Robert Keller, P.E.
                </h3>
                <span className="font-label-technical text-label-technical text-secondary block mt-0.5">
                  Principal Mechanical Engineer &amp; Director of Field Operations
                </span>
                <span className="font-body-sm text-[12px] text-secondary/80 block mt-1">
                  Purdue B.S. Mechanical Engineering · 22+ Years Commercial Experience
                </span>
              </div>
            </div>

            <blockquote className="bg-surface-container-low p-4 rounded-lg border border-structural text-secondary font-body-sm text-[14px] italic leading-relaxed mb-6">
              "Every commercial submittal, whether a 200-ton chiller overhaul or a preventive multi-site agreement, passes through verified engineering peer review before field mobilization."
            </blockquote>

            <div className="space-y-2.5 text-[13px] font-label-mono-sm text-secondary pb-6 border-b border-structural">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>ASHRAE Distinguished Lecturer (Central Plants)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>ASME Boiler and Pressure Vessel Code Committee Member</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>Licensed Professional Engineer (IN, OH, KY)</span>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <Link
                to="/about"
                className="font-button-text text-[14px] text-primary hover:text-on-surface transition-colors font-semibold inline-flex items-center gap-1.5"
              >
                <span>Read Full Engineering Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
