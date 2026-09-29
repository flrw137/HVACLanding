import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { CASE_STUDIES } from '../../data/caseStudiesData';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const FeaturedCaseStudies: React.FC = () => {
  // Show first 3 dossiers
  const featured = CASE_STUDIES.slice(0, 3);

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="DOCUMENTED PERFORMANCE"
            title="Featured Engineering Case Studies"
            description="Verified post-occupancy metrics, thermodynamic coefficients, and utility reductions from actual Midwest commercial deployments."
          />
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 font-button-text text-primary hover:text-on-surface transition-colors font-semibold shrink-0"
          >
            <span>Explore All 240+ Deployments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Dossier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((study) => (
            <div
              key={study.id}
              className="bg-surface-container-lowest border border-structural rounded-xl overflow-hidden flex flex-col group hover:border-on-surface hover:shadow-lg transition-all duration-200"
            >
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

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-secondary font-label-mono-sm text-[11px] mb-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{study.location}</span>
                    <span>•</span>
                    <span>{study.facilityFootprint}</span>
                  </div>

                  <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold group-hover:text-primary transition-colors leading-tight mb-3">
                    {study.title}
                  </h3>

                  <p className="font-body-sm text-secondary line-clamp-3 mb-6 leading-relaxed">
                    {study.overview}
                  </p>
                </div>

                {/* Telemetry Metrics Bar */}
                <div className="pt-4 border-t border-structural">
                  <div className="grid grid-cols-2 gap-3 mb-4 bg-surface-container-low p-2.5 rounded-lg">
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

                  <Link
                    to={`/case-studies`}
                    className="inline-flex items-center gap-1.5 font-button-text text-[13px] text-on-surface font-semibold group-hover:text-primary transition-colors"
                  >
                    <span>View Dossier &amp; Equipment Schedule</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proactive Asset Protection CTA Box */}
        <div className="mt-16 bg-surface-container-low border border-structural rounded-xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold block mb-2">
              Proactive Asset Protection
            </span>
            <h3 className="font-display-xl-mobile sm:font-headline-md text-on-surface font-semibold tracking-tight">
              Protect your capital equipment before peak load season.
            </h3>
            <p className="font-body-md text-secondary mt-2 leading-relaxed">
              Structured mechanical service agreements tailored to your specific plant assets, operating schedule, and internal maintenance capacity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text text-button-text px-6 py-3 rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
            >
              <span>Schedule a Facility Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8005550194"
              className="bg-white hover:bg-surface text-on-surface border border-structural font-button-text text-button-text px-5 py-3 rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>Speak with an Engineer: (800) 555-0194</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
