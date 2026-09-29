import React from 'react';
import { MAINTENANCE_PIPELINE } from '../../data/maintenanceData';
import { SectionHeader } from '../common/SectionHeader';

export const PipelineSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeader
          eyebrow="EXECUTION PIPELINE"
          title="6-Step Mechanical Execution Pipeline"
          description="A structured methodology from initial site audit to certified digital turnover that eliminates guesswork, avoids change orders, and protects critical facility uptime."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAINTENANCE_PIPELINE.map((item) => (
            <div
              key={item.step}
              className="bg-surface-container-lowest border border-structural p-6 rounded-xl flex flex-col justify-between hover:border-on-surface hover:shadow-md transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-structural">
                  <span className="font-display-xl-mobile text-primary font-bold leading-none">
                    {item.step}
                  </span>
                  <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary bg-surface-container-low px-2 py-0.5 rounded">
                    {item.phase}
                  </span>
                </div>

                <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold group-hover:text-primary transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="font-body-sm text-secondary text-[14px] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-structural flex flex-col gap-1.5 font-label-mono-sm text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-secondary uppercase">Deliverable:</span>
                  <span className="text-on-surface font-semibold">{item.deliverable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary uppercase">Testing Standard:</span>
                  <span className="text-primary font-medium">{item.testingOrStandard}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
