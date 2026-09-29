import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, RefreshCw, Activity, AlertTriangle } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

export const CapabilitiesGrid: React.FC = () => {
  const capabilities = [
    {
      number: '01',
      tag: 'Construction',
      title: 'Turnkey Commercial Installation',
      description: 'Turnkey mechanical HVAC systems for new facilities, coordinated directly with general contractors and structural engineers using BIM clash-detection.',
      spec: 'ASHRAE 90.1 Compliant',
      link: '/services/commercial-hvac',
      icon: <Wrench className="w-5 h-5 text-primary" />,
    },
    {
      number: '02',
      tag: 'Modernization',
      title: 'System Retrofits & Upgrades',
      description: 'Phased replacement of aging chillers, boilers, and packaged RTUs engineered around continuous facility operation with minimal tenant disruption.',
      spec: 'Zero-Downtime Cuts',
      link: '/services/ac-repair',
      icon: <RefreshCw className="w-5 h-5 text-primary" />,
    },
    {
      number: '03',
      tag: 'Reliability',
      title: 'Planned Predictive Maintenance',
      description: 'Structured quarterly telemetry agreements designed to protect equipment warranties, optimize energy draw, and eliminate unplanned downtime.',
      spec: 'Vibration & Thermal Logging',
      link: '/maintenance-plans',
      icon: <Activity className="w-5 h-5 text-primary" />,
    },
    {
      number: '04',
      tag: 'Critical Response',
      title: 'Emergency Diagnostics & Repair',
      description: '24/7 rapid on-site diagnosis and stabilization for critical hospital, cleanroom, cold-chain, and manufacturing environments across the tri-state area.',
      spec: '2-Hour Regional SLA',
      link: '/services/emergency-hvac-service',
      icon: <AlertTriangle className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <section className="w-full bg-surface-container-lowest py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="ENGINEERED DISCIPLINES"
            title="Mechanical Capabilities"
            description="Engineered solutions designed to meet stringent thermal load parameters, occupant comfort, and lifecycle decarbonization targets."
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 font-button-text text-primary hover:text-on-surface transition-colors font-semibold shrink-0"
          >
            <span>View All Engineering Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c) => (
            <div
              key={c.number}
              className="bg-white border border-structural p-6 rounded-lg flex flex-col justify-between hover:border-on-surface hover:-translate-y-0.5 transition-all duration-200 group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-structural">
                  <span className="font-label-mono-sm text-label-mono-sm text-secondary uppercase font-semibold">
                    {c.number} / {c.tag}
                  </span>
                  <div className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center">
                    {c.icon}
                  </div>
                </div>

                <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold group-hover:text-primary transition-colors leading-snug mb-3">
                  {c.title}
                </h3>

                <p className="font-body-sm text-secondary leading-relaxed mb-6">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 border-t border-structural flex items-center justify-between">
                <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary bg-surface-container-low px-2 py-0.5 rounded">
                  {c.spec}
                </span>
                <Link
                  to={c.link}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary group-hover:text-on-surface transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
