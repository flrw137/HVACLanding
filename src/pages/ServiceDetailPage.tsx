import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES } from '../data/servicesData';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  FileText,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="w-full">
      <SEO
        title={`${service.title} | Vertex Solutions`}
        description={service.summary}
      />

      {/* Breadcrumb Strip */}
      <div className="w-full bg-surface-container-low border-b border-structural py-2.5 px-margin lg:px-margin-desktop font-label-mono-sm text-[12px] text-secondary">
        <div className="max-w-[1320px] mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-on-surface transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/services" className="hover:text-on-surface transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-on-surface font-semibold">{service.shortTitle}</span>
        </div>
      </div>

      {/* Service Hero Section */}
      <section className="relative w-full bg-inverse-surface text-inverse-on-surface py-16 lg:py-24 px-margin lg:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-inverse-surface via-inverse-surface/90 to-transparent"></div>

        <div className="relative z-10 max-w-[1320px] mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-technical text-label-technical tracking-widest uppercase text-inverse-primary font-semibold">
                {service.eyebrow}
              </span>
            </div>

            <h1 className="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-white tracking-tight leading-tight mb-4">
              {service.title}
            </h1>

            <p className="font-body-md sm:font-body-lg text-surface-dim leading-relaxed mb-8">
              {service.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={`/contact?service=${service.slug}`}
                className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-lg"
              >
                <span>Request Service Intake</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:8005550194"
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-button-text px-5 py-3.5 rounded-lg inline-flex items-center gap-2 transition-colors backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-primary-container" />
                <span>24/7 Hotline: (800) 555-0194</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Specs Grid */}
      <section className="w-full bg-white py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Narrative */}
              <div>
                <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold block mb-2">
                  Technical Architecture &amp; Methodology
                </span>
                <h2 className="font-headline-md text-on-surface font-bold mb-4">
                  Engineering Scope &amp; Diagnostic Protocol
                </h2>
                <p className="font-body-md text-secondary leading-relaxed text-[16px]">
                  {service.description}
                </p>
              </div>

              {/* Diagnostic Procedures Checklist */}
              <div>
                <h3 className="font-headline-sm text-on-surface font-semibold mb-4">
                  Diagnostic &amp; Field Execution Scope
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="bg-surface-container-low p-4 rounded-lg border border-structural flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                      <span className="font-body-sm text-secondary text-[14px] leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Handled */}
              <div>
                <h3 className="font-headline-sm text-on-surface font-semibold mb-4">
                  Supported Equipment &amp; Plant Topologies
                </h3>
                <div className="space-y-2.5">
                  {service.equipmentHandled.map((eq, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-structural bg-white"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary-container shrink-0"></span>
                      <span className="font-body-sm text-on-surface font-medium text-[14px]">
                        {eq}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Specific FAQs */}
              <div className="pt-6 border-t border-structural">
                <h3 className="font-headline-sm text-on-surface font-semibold mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span>Frequently Asked Technical Questions</span>
                </h3>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="bg-surface-container-low p-5 rounded-lg border border-structural">
                      <h4 className="font-headline-sm text-[16px] text-on-surface font-semibold mb-2">
                        {faq.question}
                      </h4>
                      <p className="font-body-sm text-secondary leading-relaxed text-[14px]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Specification Card & Deliverables (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Engineering Specs Card */}
              <div className="bg-surface-container-low p-6 rounded-xl border border-structural space-y-4">
                <div className="pb-3 border-b border-structural">
                  <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block">
                    Engineering SLA &amp; Standards
                  </span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-bold mt-1 block">
                    Verified Parameters
                  </span>
                </div>

                <div className="space-y-3 font-label-mono-sm text-[12px]">
                  <div>
                    <span className="text-secondary uppercase block">Governing Standard:</span>
                    <strong className="text-on-surface text-[13px]">{service.specs.standard}</strong>
                  </div>
                  <div>
                    <span className="text-secondary uppercase block">Emergency Arrival SLA:</span>
                    <strong className="text-primary text-[13px]">{service.specs.responseSLA}</strong>
                  </div>
                  <div>
                    <span className="text-secondary uppercase block">Warranty Coverage:</span>
                    <strong className="text-on-surface text-[13px]">{service.specs.warranty}</strong>
                  </div>
                  {service.specs.balancingTolerance && (
                    <div>
                      <span className="text-secondary uppercase block">Balancing Tolerance:</span>
                      <strong className="text-on-surface text-[13px]">{service.specs.balancingTolerance}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-structural">
                  <Link
                    to={`/contact?service=${service.slug}`}
                    className="w-full bg-primary-container hover:bg-primary text-on-primary font-button-text py-3 rounded-lg text-center font-semibold text-[14px] block transition-colors shadow-sm"
                  >
                    Schedule Field Assessment
                  </Link>
                </div>
              </div>

              {/* Turnover Deliverables */}
              <div className="bg-white p-6 rounded-xl border border-structural space-y-4">
                <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block pb-2 border-b border-structural">
                  Turnover Deliverables
                </span>
                <div className="space-y-2.5">
                  {service.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13px] text-secondary">
                      <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-surface-container-low p-6 rounded-xl border border-structural">
                <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block mb-3">
                  Other Mechanical Services
                </span>
                <div className="space-y-2">
                  {SERVICES.filter((s) => s.id !== service.id).slice(0, 4).map((other) => (
                    <Link
                      key={other.id}
                      to={`/services/${other.slug}`}
                      className="block p-2 rounded hover:bg-white text-[13px] text-on-surface font-medium transition-colors"
                    >
                      → {other.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
