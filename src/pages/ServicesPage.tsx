import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/servicesData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const ServicesPage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Commercial & Industrial Mechanical HVAC Services"
        description="Comprehensive mechanical HVAC services: chiller repair, industrial boilers, RTUs, predictive maintenance, cleanrooms, and 24/7 emergency dispatch."
      />

      {/* Top Banner */}
      <div className="w-full bg-surface-container-low border-b border-structural py-3 px-margin lg:px-margin-desktop">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3 text-secondary font-label-mono-sm text-[12px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span>ENGINEERING SPECIFICATION // COMMERCIAL &amp; INDUSTRIAL HVAC</span>
          </div>
          <div>
            <span>REGIONAL COVERAGE: <strong className="text-on-surface">INDIANA · OHIO · KENTUCKY</strong></span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="w-full bg-white py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <SectionHeader
            eyebrow="SYSTEM DISCIPLINES"
            title="Commercial Mechanical HVAC Engineering Services"
            description="From complex central chilled water loops to high-efficiency hydronic boiler cascades and weekend helicopter crane rigging, Vertex engineers turnkey solutions tailored for zero unplanned downtime."
            className="max-w-4xl"
          />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 bg-surface-container-low p-4 rounded-lg border border-structural font-label-mono-sm text-[12px]">
            <div>
              <span className="text-secondary block">DELIVERED TONNAGE</span>
              <strong className="text-on-surface text-[15px] font-bold">14,850+ TR</strong>
            </div>
            <div>
              <span className="text-secondary block">EMERGENCY SLA</span>
              <strong className="text-primary text-[15px] font-bold">2-Hour Regional Arrival</strong>
            </div>
            <div>
              <span className="text-secondary block">BALANCING STANDARD</span>
              <strong className="text-on-surface text-[15px] font-bold">±2.5% NEBB TAB</strong>
            </div>
            <div>
              <span className="text-secondary block">FIELD LABOR</span>
              <strong className="text-on-surface text-[15px] font-bold">100% Self-Performed</strong>
            </div>
          </div>
        </div>
      </section>

      {/* All 6 Services Detailed Grid */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto space-y-12">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-structural rounded-xl overflow-hidden hover:border-on-surface hover:shadow-lg transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Left Column: Image (5 cols) */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-surface-dim overflow-hidden">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="dark">{service.category}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-2.5 rounded text-white font-label-mono-sm text-[11px] flex justify-between">
                  <span>SLA: {service.specs.responseSLA}</span>
                  <span className="text-inverse-primary">{service.specs.standard}</span>
                </div>
              </div>

              {/* Right Column: Narrative & Specs (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span className="font-label-technical text-label-technical text-primary font-semibold">
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-on-surface font-bold mb-3">
                    {service.title}
                  </h3>

                  <p className="font-body-md text-secondary leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {service.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-[13px] text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-structural flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="font-label-mono-sm text-[11px] text-secondary">
                    Standard: <strong className="text-on-surface">{service.specs.standard}</strong>
                  </span>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      to={`/services/${service.slug}`}
                      className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors inline-flex items-center justify-center gap-1.5 w-full sm:w-auto"
                    >
                      <span>Explore Technical Specs</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Dispatch CTA Strip */}
      <section className="w-full bg-surface-container-low py-12 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-headline-sm text-[22px] text-on-surface font-semibold">
              Have an immediate commercial HVAC RFP or plant emergency?
            </h3>
            <p className="font-body-md text-secondary mt-1">
              Speak directly with an on-duty licensed mechanical engineer for rapid site triage.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Request Engineering Intake
            </Link>
            <a
              href="tel:8005550194"
              className="bg-white hover:bg-surface text-on-surface border border-structural font-button-text px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
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
