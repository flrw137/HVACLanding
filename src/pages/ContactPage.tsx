import React from 'react';
import { SubmittalForm } from '../components/contact/SubmittalForm';
import { DispatchDirectory } from '../components/contact/DispatchDirectory';
import { SectionHeader } from '../components/common/SectionHeader';
import { SEO } from '../components/common/SEO';
import { ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Request Consultation & Schedule Online | Vertex Solutions"
        description="Speak directly with a commercial mechanical specialist. Submit project specifications, chiller replacement plans, or preventive maintenance requests for guaranteed 4-hour engineering triage."
      />

      {/* Top Banner */}
      <div className="w-full bg-surface-container-low border-b border-structural py-3 px-margin lg:px-margin-desktop font-label-mono-sm text-[12px] text-secondary">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span>SPECIFICATION INTAKE // 24/7 COMMERCIAL DISPATCH: (800) 555-0194</span>
          </div>
          <div>
            <span>COMMERCIAL NDA ENCRYPTED ROUTING</span>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          {/* Editorial Header Block */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-primary-container rounded-full"></span>
              <span className="font-label-technical text-label-technical uppercase tracking-widest text-primary font-semibold">
                SPECIFICATION &amp; PROJECT INTAKE
              </span>
            </div>
            <h1 className="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl tracking-tight text-on-surface mb-3">
              Speak Directly with a Commercial Mechanical Specialist.
            </h1>
            <p className="font-body-md sm:font-body-lg text-secondary max-w-3xl leading-relaxed">
              Reach out to discuss an upcoming equipment installation, plan a phased facility retrofit, or establish a preventive maintenance agreement. We respond within one business day.
            </p>
          </div>

          {/* Dual-Column Engineering Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Commercial Request Form (7 Cols) */}
            <div className="lg:col-span-7">
              <SubmittalForm />
            </div>

            {/* Right: Fast-Track Dispatch Directory & Hubs (5 Cols) */}
            <div className="lg:col-span-5">
              <DispatchDirectory />
            </div>
          </div>
        </div>
      </section>

      {/* Directorate Guarantee Banner */}
      <section className="w-full bg-white py-12 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto bg-surface-container-low p-6 sm:p-8 rounded-xl border border-structural flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 mt-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block">
                Engineering Directorate Oversight
              </span>
              <h4 className="font-headline-sm text-[17px] text-on-surface font-bold mt-0.5">
                Robert Keller, P.E. — Principal Mechanical Engineer
              </h4>
              <p className="font-body-sm text-secondary text-[13px] mt-1 max-w-2xl leading-relaxed">
                "Every commercial submittal, whether a 200-ton chiller overhaul or a preventive multi-site agreement, passes through verified engineering peer review before field mobilization."
              </p>
            </div>
          </div>

          <div className="shrink-0 font-label-mono-sm text-[12px] text-secondary">
            PE License: <strong className="text-primary">#PE-104928-IN</strong>
          </div>
        </div>
      </section>
    </div>
  );
};
