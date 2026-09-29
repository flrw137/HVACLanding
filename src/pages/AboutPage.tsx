import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Users,
  HardHat,
  ArrowRight,
  Phone,
  FileCheck2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Why Choose Vertex Solutions | Engineering Credibility"
        description="Learn why facility directors trust Vertex Solutions: 100% self-performed mechanical trades, 0.00 EMR incident safety, licensed P.E. leadership, and NEBB certified TAB procedures."
      />

      {/* Top Banner */}
      <div className="w-full bg-surface-container-low border-b border-structural py-3 px-margin lg:px-margin-desktop font-label-mono-sm text-[12px] text-secondary">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span>COMPANY &amp; TRUST // INSTITUTIONAL DISCIPLINE</span>
          </div>
          <div>
            <span>LICENSED PROFESSIONAL ENGINEERS // IN · OH · KY</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="w-full bg-white pt-16 pb-12 lg:pt-20 lg:pb-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-container rounded-full"></span>
                <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold">
                  Engineering Authority
                </span>
              </div>
              <h1 className="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-on-surface tracking-tight">
                Institutional Discipline in Every Valve, Drop, and Control Loop.
              </h1>
              <p className="font-body-md sm:font-body-lg text-secondary leading-relaxed">
                Vertex Solutions was established on a single engineering standard: eliminate the disconnect between schematic design models and physical mechanical execution. We do not outsource field work to third-party subcontractors or rely on speculative sales commissions.
              </p>
            </div>

            <div className="lg:col-span-4 bg-surface-container-low p-6 rounded-xl border border-structural space-y-4">
              <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block pb-2 border-b border-structural">
                The Vertex Standard
              </span>
              <div className="space-y-3 font-label-mono-sm text-[13px]">
                <div className="flex justify-between">
                  <span className="text-secondary">Safety Incident Rate:</span>
                  <strong className="text-primary font-bold">0.00 EMR</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Technician Tenure:</span>
                  <strong className="text-on-surface">15.2 Yrs Avg</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Core Mechanical Labor:</span>
                  <strong className="text-on-surface">100% Self-Performed</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Commissioned Builds:</span>
                  <strong className="text-on-surface">240+ Midwest Plants</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile: Robert Keller P.E. */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="bg-white border border-structural rounded-2xl p-8 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-surface-container-low rounded-xl border border-structural">
              <div className="w-24 h-24 rounded-full bg-primary-container text-white flex items-center justify-center font-display-xl-mobile font-bold mb-4 shadow-sm">
                RK
              </div>
              <h3 className="font-headline-sm text-[22px] text-on-surface font-bold">
                Robert Keller, P.E.
              </h3>
              <span className="font-label-technical text-label-technical text-primary font-semibold mt-1">
                Principal Mechanical Engineer &amp; Director of Field Operations
              </span>
              <span className="font-label-mono-sm text-[11px] text-secondary mt-1">
                PE License: #PE-104928-IN
              </span>
              <div className="mt-4 pt-4 border-t border-structural w-full text-[12px] font-label-mono-sm text-secondary space-y-1">
                <div>Purdue University B.S. Mechanical Engineering</div>
                <div>22+ Years Commercial Central Plant Design</div>
                <div>ASHRAE Distinguished Lecturer</div>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4">
              <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold">
                Directorate Commitment
              </span>
              <h3 className="font-headline-md text-on-surface font-bold">
                "Every commercial submittal passes through verified engineering peer review before field mobilization."
              </h3>
              <p className="font-body-md text-secondary leading-relaxed">
                In commercial mechanical engineering, failure rarely stems from component defect; it originates in improper hydraulic load calculations, flawed balancing, or uncoordinated field piping. At Vertex, every project is supervised directly by licensed Professional Engineers who review chiller submittals, verify pump head curves, and certify air balance readings before signing off on client handover.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-[14px] text-on-surface font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Direct phone contact with lead mechanics</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-on-surface font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Itemized fixed pricing with zero change orders</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-on-surface font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Licensed PE stamped drawings and TAB records</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-on-surface font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Guaranteed 2-hour regional emergency dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Credentialing Standards */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <SectionHeader
            eyebrow="SAFETY & LICENSURE"
            title="Rigorous Regulatory & Compliance Accreditations"
            description="Our technicians carry active commercial certifications across federal, state, and environmental governing bodies."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-structural">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-2">
                OSHA 30 Certified
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                All lead mechanical technicians and rigging supervisors hold active OSHA 30-hour commercial construction credentials. 0.00 EMR record.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-structural">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-2">
                NEBB Certified TAB
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                National Environmental Balancing Bureau procedures for air, hydronics, sound, and cleanroom laminar dynamic pressure testing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-structural">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-2">
                EPA Universal 608
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                Universal refrigerant certification covering low-pressure centrifugal chillers, high-pressure DX, and low-GWP natural refrigerants (R-744 CO2).
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-structural">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary mb-4">
                <HardHat className="w-5 h-5" />
              </div>
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-2">
                ASME Section IV
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                Certified high-pressure boiler piping, certified R-stamp vessel repairs, and low-NOx combustion tuning per National Board standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-white py-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto bg-surface-container-low border border-structural rounded-xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold block mb-2">
              Engineering Consultation
            </span>
            <h3 className="font-headline-md text-on-surface font-bold">
              Ready to discuss an upcoming mechanical retrofit?
            </h3>
            <p className="font-body-md text-secondary mt-1">
              Connect directly with our engineering team for submittal triage and equipment scheduling.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold transition-colors"
            >
              Request Intake Form
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
