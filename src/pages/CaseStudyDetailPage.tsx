import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle2,
  CalendarDays,
  Layers,
  Gauge,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { SERVICES } from '../data/servicesData';
import { SEO } from '../components/common/SEO';
import { Badge } from '../components/common/Badge';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const index = CASE_STUDIES.findIndex((s) => s.id === study.id);
  const prevStudy = CASE_STUDIES[index - 1] ?? CASE_STUDIES[CASE_STUDIES.length - 1];
  const nextStudy = CASE_STUDIES[index + 1] ?? CASE_STUDIES[0];

  const relatedStudies = CASE_STUDIES.filter((s) => s.id !== study.id)
    .sort((a, b) => Number(b.sector === study.sector) - Number(a.sector === study.sector))
    .slice(0, 3);

  const relatedServices = (study.relatedServiceSlugs ?? [])
    .map((serviceSlug) => SERVICES.find((s) => s.slug === serviceSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="w-full">
      <SEO title={`${study.title} | Vertex Solutions`} description={study.overview} />

      {/* Breadcrumb Strip */}
      <div className="w-full bg-surface-container-low border-b border-structural py-2.5 px-margin lg:px-margin-desktop font-label-mono-sm text-[12px] text-secondary">
        <div className="max-w-[1320px] mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-on-surface transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/case-studies" className="hover:text-on-surface transition-colors">
            Case Studies
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-on-surface font-semibold">{study.title}</span>
        </div>
      </div>

      {/* Project Hero */}
      <section className="relative w-full bg-inverse-surface text-inverse-on-surface overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-inverse-surface via-inverse-surface/90 to-transparent"></div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-margin lg:px-margin-desktop py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-technical text-label-technical tracking-widest uppercase text-inverse-primary font-semibold">
                {study.code}
              </span>
            </div>

            <h1 className="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-display-xl-mobile sm:text-headline-lg lg:text-display-xl text-white tracking-tight leading-tight mb-5">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/80 font-label-mono-sm text-[12px] mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary-container" />
                {study.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-primary-container" />
                {study.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-primary-container" />
                Footprint: {study.facilityFootprint}
              </span>
            </div>

            <p className="font-body-md sm:font-body-lg text-surface-dim leading-relaxed mb-8 max-w-2xl">
              {study.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-lg"
              >
                <span>Request Similar Assessment</span>
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

      {/* Key Commissioning Metrics Ribbon */}
      <section className="w-full bg-white border-b border-structural">
        <div className="max-w-[1320px] mx-auto px-margin lg:px-margin-desktop py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-l-2 border-primary-container pl-4">
              <span className="font-label-mono-sm text-[10px] uppercase text-secondary block">
                {study.primaryMetricLabel}
              </span>
              <span className="font-headline-md text-on-surface font-bold block mt-1">
                {study.primaryMetricValue}
              </span>
            </div>
            <div className="border-l-2 border-primary-container pl-4">
              <span className="font-label-mono-sm text-[10px] uppercase text-secondary block">
                {study.secondaryMetricLabel}
              </span>
              <span className="font-headline-md text-primary font-bold block mt-1">
                {study.secondaryMetricValue}
              </span>
            </div>
            <div className="border-l-2 border-structural pl-4">
              <span className="font-label-mono-sm text-[10px] uppercase text-secondary block">
                Testing Protocol
              </span>
              <span className="font-headline-sm text-[16px] text-on-surface font-bold block mt-1.5">
                NEBB TAB Stamped
              </span>
            </div>
            <div className="border-l-2 border-structural pl-4">
              <span className="font-label-mono-sm text-[10px] uppercase text-secondary block">
                Audit Standard
              </span>
              <span className="font-headline-sm text-[16px] text-on-surface font-bold block mt-1.5">
                ASHRAE 90.1
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Project Facts Grid */}
      <section className="w-full bg-white py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest block mb-3">
                  01 // Project Overview
                </span>
                <h2 className="font-headline-md text-display-xl-mobile sm:font-headline-lg text-on-surface mb-4">
                  {study.title}
                </h2>
                <p className="font-body-md text-secondary leading-relaxed text-[16px]">
                  {study.overview}
                </p>
                {study.fullNarrative && (
                  <p className="font-body-md text-secondary leading-relaxed text-[16px] mt-4">
                    {study.fullNarrative}
                  </p>
                )}
              </div>

              {study.challenge && (
                <div>
                  <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest block mb-3">
                    02 // The Challenge
                  </span>
                  <h2 className="font-headline-md text-on-surface mb-4">Operational Problem Statement</h2>
                  <p className="font-body-md text-secondary leading-relaxed text-[16px]">
                    {study.challenge}
                  </p>
                </div>
              )}

              {study.scopeOfWork && (
                <div>
                  <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest block mb-3">
                    03 // Scope of Work
                  </span>
                  <h2 className="font-headline-md text-on-surface mb-4">Vertex Engineering Scope</h2>
                  <p className="font-body-md text-secondary leading-relaxed text-[16px]">
                    {study.scopeOfWork}
                  </p>
                </div>
              )}

              {/* Equipment Schedule */}
              <div>
                <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest block mb-3">
                  04 // Equipment Schedule
                </span>
                <h2 className="font-headline-md text-on-surface mb-5">
                  Equipment &amp; System Integration
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {study.equipmentSchedule.map((item, i) => (
                    <div
                      key={i}
                      className="bg-surface-container-low p-4 rounded-lg border border-structural flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0"></span>
                      <span className="font-body-sm text-on-surface text-[14px] leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Sequence */}
              {study.executionPhases && study.executionPhases.length > 0 && (
                <div>
                  <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest block mb-3">
                    05 // Execution Sequence
                  </span>
                  <h2 className="font-headline-md text-on-surface mb-5">Field Delivery Sequence</h2>
                  <div className="space-y-2.5">
                    {study.executionPhases.map((phase, i) => (
                      <div key={i} className="flex items-start gap-3.5">
                        <span className="font-label-mono-sm text-[11px] text-primary font-bold shrink-0 w-8 pt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-body-sm text-secondary text-[14px] leading-relaxed">
                          {phase}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcome */}
              <div className="bg-surface-container-low p-6 rounded-xl border border-structural">
                <h2 className="font-headline-sm text-on-surface font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Commissioning Outcome &amp; Post-Occupancy Sign-Off</span>
                </h2>
                <p className="font-body-md text-secondary leading-relaxed">
                  {study.outcome}
                </p>
                {study.verificationNotes && (
                  <p className="font-body-sm text-secondary leading-relaxed mt-4 pt-4 border-t border-structural">
                    {study.verificationNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Facts, Related Services, CTA */}
            <div className="lg:col-span-4 space-y-6">
              {/* Project Facts */}
              <div className="bg-surface-container-low p-6 rounded-xl border border-structural">
                <div className="pb-3 border-b border-structural">
                  <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block">
                    Dossier Reference
                  </span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-bold mt-1 block">
                    {study.code}
                  </span>
                </div>
                <div className="space-y-3 font-label-mono-sm text-[12px] pt-3">
                  <div>
                    <span className="text-secondary uppercase block">Sector:</span>
                    <strong className="text-on-surface text-[13px]">{study.sectorBadge}</strong>
                  </div>
                  <div>
                    <span className="text-secondary uppercase block">Location:</span>
                    <strong className="text-on-surface text-[13px]">{study.location}</strong>
                  </div>
                  <div>
                    <span className="text-secondary uppercase block">Delivery Year:</span>
                    <strong className="text-on-surface text-[13px]">{study.year}</strong>
                  </div>
                  <div>
                    <span className="text-secondary uppercase block">Facility Footprint:</span>
                    <strong className="text-on-surface text-[13px]">{study.facilityFootprint}</strong>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-surface-container-low p-6 rounded-xl border border-structural">
                  <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block mb-3">
                    Related Mechanical Services
                  </span>
                  <div className="space-y-2">
                    {relatedServices.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className="block p-2 rounded hover:bg-white text-[13px] text-on-surface font-medium transition-colors"
                      >
                        → {service.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-surface-container-low p-6 rounded-xl border border-structural">
                <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block mb-2">
                  Discuss a Similar Project
                </span>
                <p className="font-body-sm text-secondary leading-relaxed mb-4">
                  Speak directly with a licensed mechanical project engineer about equipment
                  scheduling, submittal review, and turnaround planning.
                </p>
                <Link
                  to="/contact"
                  className="w-full bg-primary-container hover:bg-primary text-on-primary font-button-text py-3 rounded-lg text-center font-semibold text-[14px] block transition-colors shadow-sm"
                >
                  Schedule Field Assessment
                </Link>
                <div className="pt-4 mt-4 border-t border-structural text-[12px] font-label-mono-sm text-secondary">
                  PE Stamped Certification: IN #PE-104928-IN
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous / Next Project Pager */}
      <section className="w-full bg-surface-container-lowest border-b border-structural">
        <div className="max-w-[1320px] mx-auto px-margin lg:px-margin-desktop py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to={`/case-studies/${prevStudy.slug}`}
              className="group flex items-center gap-4 p-5 rounded-xl border border-structural bg-white hover:border-on-surface transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary shrink-0 group-hover:-translate-x-1 transition-transform" />
              <span className="min-w-0">
                <span className="font-label-mono-sm text-[10px] uppercase tracking-wider text-secondary block">
                  Previous Project
                </span>
                <span className="font-headline-sm text-[15px] text-on-surface font-semibold block truncate mt-0.5">
                  {prevStudy.title}
                </span>
              </span>
            </Link>

            <Link
              to={`/case-studies/${nextStudy.slug}`}
              className="group flex items-center justify-end gap-4 p-5 rounded-xl border border-structural bg-white hover:border-on-surface transition-colors text-right"
            >
              <span className="min-w-0">
                <span className="font-label-mono-sm text-[10px] uppercase tracking-wider text-secondary block">
                  Next Project
                </span>
                <span className="font-headline-sm text-[15px] text-on-surface font-semibold block truncate mt-0.5">
                  {nextStudy.title}
                </span>
              </span>
              <ChevronRight className="w-5 h-5 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="w-full bg-white py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest block mb-2">
                Portfolio Continuation
              </span>
              <h2 className="font-display-xl-mobile sm:font-headline-lg text-display-xl-mobile sm:text-headline-lg text-on-surface">
                Related Case Studies
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="hidden sm:inline-flex items-center gap-1.5 font-button-text text-[14px] text-primary font-semibold hover:text-on-surface transition-colors shrink-0"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedStudies.map((related) => (
              <Link
                key={related.id}
                to={`/case-studies/${related.slug}`}
                className="group bg-white border border-structural rounded-xl overflow-hidden flex flex-col hover:border-on-surface hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
              >
                <div className="relative h-44 w-full overflow-hidden bg-surface-dim">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="dark">{related.sectorBadge}</Badge>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-secondary font-label-mono-sm text-[11px] mb-2 pb-2 border-b border-structural">
                    <span className="text-primary font-semibold">{related.code}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {related.location}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-[17px] text-on-surface font-semibold group-hover:text-primary transition-colors leading-tight mb-2">
                    {related.title}
                  </h3>
                  <p className="font-body-sm text-secondary line-clamp-2 leading-relaxed mb-4">
                    {related.overview}
                  </p>
                  <span className="mt-auto font-button-text text-[13px] text-primary font-semibold inline-flex items-center gap-1">
                    View Full Dossier
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Advisory CTA */}
      <section className="w-full bg-inverse-surface text-inverse-on-surface py-16 lg:py-20 px-margin lg:px-margin-desktop">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
                <Gauge className="w-3.5 h-3.5 text-inverse-primary" />
                <span className="font-label-technical text-label-technical tracking-widest uppercase text-inverse-primary font-semibold">
                  Engineering Advisory
                </span>
              </div>
              <h2 className="font-display-xl-mobile sm:font-headline-lg text-white tracking-tight leading-tight mb-4">
                Have a facility blueprint or chiller replacement in planning?
              </h2>
              <p className="font-body-md sm:font-body-lg text-surface-dim leading-relaxed">
                Consult directly with a licensed mechanical project engineer for submittal review,
                equipment scheduling, and guaranteed 48-hour turnarounds on mechanical bid
                assessments.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6 font-label-mono-sm text-[11px] uppercase tracking-wider text-surface-dim">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-primary-container" />
                  PE Stamped Reviews
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-container" />
                  48hr Submittal Triage
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary-container" />
                  Equipment Lifecycle Models
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0">
              <Link
                to="/contact"
                className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Submit Project Blueprint / RFP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:8005550194"
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-button-text px-6 py-3.5 rounded-lg inline-flex items-center justify-center gap-2 transition-colors backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-primary-container" />
                <span>Direct Dispatch: (800) 555-0194</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
