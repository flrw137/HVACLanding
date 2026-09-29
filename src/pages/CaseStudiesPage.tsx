import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { CLIENT_REVIEWS } from '../data/reviewsData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  Phone,
  Star,
} from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const sectors = [
    { label: 'All Projects', value: 'All', count: '08' },
    { label: 'Industrial', value: 'Industrial', count: '02' },
    { label: 'Healthcare', value: 'Healthcare', count: '02' },
    { label: 'Class A Office', value: 'Class A Office', count: '01' },
    { label: 'Education', value: 'Education', count: '01' },
    { label: 'Hospitality', value: 'Hospitality', count: '01' },
    { label: 'Cold Storage', value: 'Cold Storage', count: '01' },
  ];

  const filteredDossiers = useMemo(() => {
    if (selectedSector === 'All') return CASE_STUDIES;
    return CASE_STUDIES.filter((item) => item.sector === selectedSector);
  }, [selectedSector]);

  return (
    <div className="w-full">
      <SEO
        title="Documented Case Studies & Portfolio | Vertex Solutions"
        description="Detailed mechanical engineering project dossiers across industrial, healthcare, office, and institutional plants with verified ASHRAE 90.1 and TAB balance logs."
      />

      {/* Top Telemetry Strip */}
      <div className="w-full bg-surface-container-low border-b border-structural py-3 px-margin lg:px-margin-desktop">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3 text-secondary font-label-mono-sm text-[12px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="text-on-surface font-semibold">FIELD COMMISSIONING REGISTRY</span>
            <span>/ VERIFIED ASHRAE 90.1 AUDIT LOGS</span>
          </div>
          <div>
            <span>REGIONAL FLEET: <strong className="text-on-surface">INDIANA · OHIO · KENTUCKY</strong></span>
          </div>
        </div>
      </div>

      {/* Page Header Block */}
      <section className="w-full bg-white pt-16 pb-12 lg:pt-20 lg:pb-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-primary-container rounded-full"></span>
                <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold">
                  PORTFOLIO &amp; CASE STUDIES
                </span>
              </div>
              <h1 className="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-on-surface tracking-tight uppercase">
                Documented Mechanical HVAC Installations &amp; Retrofits
              </h1>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="font-body-md text-secondary leading-relaxed">
                Engineering dossiers detailing field-delivered capacity, hydraulic balance, thermal performance coefficients, and verified utility reductions across industrial, healthcare, and enterprise facilities.
              </p>
            </div>
          </div>

          {/* High-Level Telemetry Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-container-low p-6 rounded-xl border border-structural">
            <div className="flex flex-col border-l-2 border-primary-container pl-3">
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary">
                Commissioned Projects
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display-xl-mobile sm:font-headline-lg text-on-surface font-bold">240+</span>
                <span className="font-label-mono-sm text-[11px] text-primary font-semibold">MIDWEST</span>
              </div>
              <span className="font-label-mono-sm text-[11px] text-secondary mt-0.5">Field sign-offs complete</span>
            </div>

            <div className="flex flex-col border-l-2 border-primary-container pl-3">
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary">
                Delivered Tonnage
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display-xl-mobile sm:font-headline-lg text-on-surface font-bold">14,850</span>
                <span className="font-label-mono-sm text-[11px] text-secondary">TR</span>
              </div>
              <span className="font-label-mono-sm text-[11px] text-secondary mt-0.5">Chilled water &amp; direct vapor</span>
            </div>

            <div className="flex flex-col border-l-2 border-primary-container pl-3">
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary">
                Aggregate Displacement
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display-xl-mobile sm:font-headline-lg text-on-surface font-bold">2.4M</span>
                <span className="font-label-mono-sm text-[11px] text-secondary">CFM</span>
              </div>
              <span className="font-label-mono-sm text-[11px] text-secondary mt-0.5">Positive pressure &amp; DOAS</span>
            </div>

            <div className="flex flex-col border-l-2 border-primary-container pl-3">
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary">
                Mean Verified Reduction
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display-xl-mobile sm:font-headline-lg text-primary font-bold">-23.6%</span>
                <span className="font-label-mono-sm text-[11px] text-secondary">KWH/YR</span>
              </div>
              <span className="font-label-mono-sm text-[11px] text-secondary mt-0.5">Post-occupancy validation</span>
            </div>
          </div>

          {/* Interactive Sector Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {sectors.map((sec) => {
              const isSelected = selectedSector === sec.value;
              return (
                <button
                  key={sec.value}
                  onClick={() => setSelectedSector(sec.value)}
                  className={`px-3.5 py-2 rounded-lg font-label-mono-sm text-[12px] transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-on-surface text-white border-on-surface font-semibold shadow-xs'
                      : 'bg-white text-secondary hover:text-on-surface hover:bg-surface-container-low border-structural'
                  }`}
                >
                  <span>{sec.label}</span>
                  <span className={`ml-1.5 ${isSelected ? 'text-primary-fixed' : 'text-secondary/70'}`}>
                    ({sec.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dossier Grid */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDossiers.map((study) => (
              <Link
                key={study.id}
                to={`/case-studies/${study.slug}`}
                className="bg-white border border-structural rounded-xl overflow-hidden flex flex-col justify-between hover:border-on-surface hover:shadow-xl transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
              >
                <div>
                  {/* Image & Sector Tag */}
                  <div className="relative h-56 w-full overflow-hidden bg-surface-dim">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="dark">{study.sectorBadge}</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="font-label-mono-sm text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        {study.year}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-secondary font-label-mono-sm text-[11px] mb-2 pb-2 border-b border-structural">
                      <span className="text-primary font-semibold">{study.code}</span>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        <span>{study.location}</span>
                      </div>
                    </div>

                    <h3 className="font-headline-sm text-[19px] text-on-surface font-semibold group-hover:text-primary transition-colors leading-tight mb-3">
                      {study.title}
                    </h3>

                    <p className="font-body-sm text-secondary line-clamp-3 leading-relaxed mb-6">
                      {study.overview}
                    </p>

                    {/* Telemetry Metrics Bar */}
                    <div className="grid grid-cols-2 gap-3 mb-4 bg-surface-container-low p-3 rounded-lg border border-structural">
                      <div>
                        <span className="font-label-mono-sm text-[10px] uppercase text-secondary block">
                          {study.primaryMetricLabel}
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                          {study.primaryMetricValue}
                        </span>
                      </div>
                      <div>
                        <span className="font-label-mono-sm text-[10px] uppercase text-secondary block">
                          {study.secondaryMetricLabel}
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-primary">
                          {study.secondaryMetricValue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-structural flex items-center justify-between">
                  <span className="font-label-mono-sm text-[11px] text-secondary">
                    Footprint: {study.facilityFootprint}
                  </span>
                  <span className="font-button-text text-[13px] text-primary group-hover:text-on-surface font-semibold inline-flex items-center gap-1">
                    <span>View Full Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commissioning Standards Section */}
      <section className="w-full bg-white py-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <SectionHeader
            eyebrow="COMMISSIONING BENCHMARKS"
            title="Testing &amp; Balancing Quality Standards"
            description="Every Vertex project concludes with certified air and hydronic balancing, automated sensor trend logging, and registered Professional Engineer stamp sign-offs."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-surface-container-low border border-structural">
              <span className="font-display-xl-mobile text-primary font-bold block mb-2">01</span>
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-2">
                Calibrated Air &amp; Flow TAB
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                Pitot traverse duct airflow confirmation and ultrasonic hydronic flow rate verification within ±2.5% of design spec, documented per NEBB procedures.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface-container-low border border-structural">
              <span className="font-display-xl-mobile text-primary font-bold block mb-2">02</span>
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-2">
                Load Trend Telemetry
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                Continuous 30-day BACnet trend logging across peak cooling and heating days to confirm chiller staging, burner modulation, and Delta-T efficiency.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface-container-low border border-structural">
              <span className="font-display-xl-mobile text-primary font-bold block mb-2">03</span>
              <h4 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-2">
                ASHRAE 90.1 Sign-Off
              </h4>
              <p className="font-body-sm text-secondary leading-relaxed">
                Full compliance certificate stamped by our in-house licensed Professional Engineers (PE) for local municipal code closeout and utility rebate capture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Realistic Client Reviews & Testimonials */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <SectionHeader
            eyebrow="COMMERCIAL ENDORSEMENTS"
            title="Facility Director Testimonials"
            description="Direct feedback from commercial property directors, hospital chief engineers, and manufacturing plant managers across the Midwest."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 sm:p-8 rounded-xl border border-structural shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-structural">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="font-label-mono-sm text-[10px] text-secondary bg-surface-container-low px-2 py-0.5 rounded">
                      {rev.serviceCategory}
                    </span>
                  </div>

                  <blockquote className="font-body-sm text-secondary italic leading-relaxed mb-6">
                    "{rev.quote}"
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-structural">
                  <div className="font-headline-sm text-[15px] font-semibold text-on-surface">
                    {rev.author}
                  </div>
                  <div className="font-body-sm text-[13px] text-secondary">
                    {rev.role} • {rev.organization}
                  </div>
                  <div className="font-label-mono-sm text-[10px] text-primary font-medium mt-1">
                    {rev.verificationBadge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Advisory CTA */}
      <section className="w-full bg-white py-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto bg-surface-container-low border border-structural rounded-xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold block mb-2">
              Engineering Bid Triage
            </span>
            <h3 className="font-headline-md text-on-surface font-bold">
              Have a facility blueprint or chiller replacement in planning?
            </h3>
            <p className="font-body-md text-secondary mt-2 leading-relaxed">
              Consult directly with a licensed mechanical project engineer for submittal review, equipment scheduling, and guaranteed 48-hour turnarounds on mechanical bid assessments.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4 font-label-mono-sm text-[12px] text-secondary">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                PE Stamped Reviews
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                48hr Submittal Triage
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Equipment Lifecycle Models
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Submit Project Blueprint / RFP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8005550194"
              className="bg-white hover:bg-surface text-on-surface border border-structural font-button-text px-5 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>Direct Dispatch: (800) 555-0194</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
