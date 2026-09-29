import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_HUBS } from '../data/serviceAreasData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  ArrowRight,
} from 'lucide-react';

export const ServiceAreasPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');

  const filteredHubs =
    selectedState === 'All'
      ? SERVICE_HUBS
      : SERVICE_HUBS.filter((hub) => hub.state === selectedState);

  return (
    <div className="w-full">
      <SEO
        title="Regional Service Areas & Dispatch Hubs | Vertex Solutions"
        description="Dedicated commercial HVAC mechanical dispatch hubs across Indiana, Ohio, and Kentucky with guaranteed 2-hour emergency arrival SLAs."
      />

      {/* Top Banner */}
      <div className="w-full bg-surface-container-low border-b border-structural py-3 px-margin lg:px-margin-desktop font-label-mono-sm text-[12px] text-secondary">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span>REGIONAL LICENSURE // IN · OH · KY • LIC #HVAC-MECH-48209</span>
          </div>
          <div>
            <span>COMMERCIAL HOTLINE: <strong className="text-on-surface">(800) 555-0194</strong></span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="w-full bg-white pt-16 pb-12 lg:pt-20 lg:pb-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto space-y-8">
          <SectionHeader
            eyebrow="REGIONAL INFRASTRUCTURE"
            title="Tri-State Engineering Hubs & Field Coverage"
            description="With 9 strategically positioned operations facilities across Indiana, Ohio, and Kentucky, Vertex deploys master mechanical mechanics and auxiliary temporary chillers directly to your facility in under 2 hours."
            className="max-w-4xl"
          />

          {/* State Filter Buttons */}
          <div className="flex items-center gap-2 pt-2">
            {['All', 'Indiana', 'Ohio', 'Kentucky'].map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-4 py-2 rounded-lg font-label-mono-sm text-[12px] uppercase transition-colors cursor-pointer border ${
                  selectedState === state
                    ? 'bg-on-surface text-white border-on-surface font-semibold shadow-xs'
                    : 'bg-white text-secondary hover:text-on-surface border-structural hover:bg-surface-container-low'
                }`}
              >
                {state === 'All' ? 'All Tri-State Hubs (09)' : state}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hubs Grid */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHubs.map((hub) => (
              <div
                key={hub.code}
                className={`bg-white border rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 ${
                  hub.isHQ
                    ? 'border-primary-container ring-1 ring-primary-container shadow-xs relative'
                    : 'border-structural hover:border-on-surface'
                }`}
              >
                {hub.isHQ && (
                  <div className="absolute -top-3 left-6 bg-primary-container text-on-primary font-label-mono-sm text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded font-semibold shadow-xs">
                    Corporate Engineering HQ
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-structural">
                    <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary">
                      {hub.state} Territory
                    </span>
                    <span className="font-label-mono-sm text-[11px] text-primary font-bold bg-[#ffdad8] px-2 py-0.5 rounded">
                      {hub.code}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-on-surface font-bold mb-2">
                    {hub.city}
                  </h3>

                  {hub.address && (
                    <div className="flex items-start gap-2 text-[13px] text-secondary font-body-sm mb-4">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </div>
                  )}

                  {/* Dispatch Parameters */}
                  <div className="bg-surface-container-low p-3.5 rounded-lg border border-structural font-label-mono-sm text-[12px] space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-secondary uppercase">Average Dispatch:</span>
                      <strong className="text-primary font-bold">{hub.avgResponseTime}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary uppercase">Coverage Radius:</span>
                      <span className="text-on-surface text-right max-w-[180px] truncate">{hub.coverageRadius}</span>
                    </div>
                  </div>

                  {/* Key Facilities */}
                  <div>
                    <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block mb-2">
                      Key Regional Facilities Served:
                    </span>
                    <div className="space-y-1.5">
                      {hub.keyFacilitiesServed.map((fac, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-structural mt-6 flex items-center justify-between">
                  <a
                    href={`tel:${hub.dispatchHotline.replace(/[^0-9]/g, '')}`}
                    className="font-headline-sm text-[14px] font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{hub.dispatchHotline}</span>
                  </a>
                  <Link
                    to="/contact"
                    className="font-button-text text-[12px] text-primary hover:text-on-surface transition-colors font-semibold"
                  >
                    Request Intake →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Guarantee Strip */}
      <section className="w-full bg-white py-16 px-margin lg:px-margin-desktop border-b border-structural">
        <div className="max-w-[1320px] mx-auto bg-surface-container-low border border-structural rounded-xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold block mb-2">
              Regional Response SLA
            </span>
            <h3 className="font-headline-md text-on-surface font-bold">
              2-Hour Field Mobilization Guarantee
            </h3>
            <p className="font-body-md text-secondary mt-2 leading-relaxed">
              For contracted commercial accounts and mission-critical facilities across Indiana, Ohio, and Kentucky, we guarantee a certified technician on site with OEM diagnostic telemetry tools within 120 minutes of dispatch call.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3.5 rounded-lg font-semibold transition-colors"
            >
              Enroll Facility in SLA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
