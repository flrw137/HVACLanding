import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { MAINTENANCE_TIERS, TECHNICAL_FAQS } from '../../data/maintenanceData';
import { SectionHeader } from '../common/SectionHeader';

export const TierMatrixSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-margin lg:px-margin-desktop border-b border-structural">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeader
          eyebrow="SERVICE AGREEMENTS"
          title="Tiered Maintenance Agreement Matrix"
          description="Predictable lifecycle care engineered to preserve mechanical assets, lower energy consumption, and guarantee immediate engineering dispatch."
          className="mb-12"
        />

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {MAINTENANCE_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-xl border flex flex-col justify-between p-8 transition-all duration-200 ${
                tier.isPopular
                  ? 'bg-surface-container-lowest border-primary-container shadow-xl ring-1 ring-primary-container relative'
                  : 'bg-surface-container-lowest border-structural shadow-xs hover:border-structural-dim'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary font-label-mono-sm text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold shadow-sm">
                  Most Popular Scope
                </div>
              )}

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-structural mb-6">
                  <span className="font-label-mono-sm text-[12px] uppercase tracking-wider text-secondary font-semibold">
                    {tier.tierNumber}
                  </span>
                  <span className="font-label-mono-sm text-[11px] bg-surface-container-low px-2.5 py-1 rounded text-primary font-semibold">
                    {tier.slaBadge}
                  </span>
                </div>

                <h3 className="font-headline-md text-on-surface mb-2 font-bold">
                  {tier.title}
                </h3>

                <p className="font-body-sm text-secondary text-[14px] leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                <div className="bg-surface-container-low p-4 rounded-lg border border-structural mb-6 font-label-mono-sm text-[12px] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary uppercase">Cadence:</span>
                    <strong className="text-on-surface">{tier.cadence}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary uppercase">Arrival Window:</span>
                    <strong className="text-on-surface">{tier.responseWindow}</strong>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block">
                    Core Inclusions:
                  </span>
                  {tier.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[14px] text-secondary">
                      <span className="w-4 h-4 rounded bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5 text-primary">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span className="leading-snug">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/contact?tier=${tier.id}`}
                className={`w-full py-3 rounded-lg font-button-text text-center transition-colors font-semibold text-[14px] ${
                  tier.isPopular
                    ? 'bg-primary-container hover:bg-primary text-on-primary'
                    : 'bg-white hover:bg-surface-container text-on-surface border border-structural'
                }`}
              >
                {tier.actionLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* Technical FAQ Accordion */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-structural">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="font-headline-md text-on-surface font-semibold">
              Frequently Asked Technical Questions
            </h3>
            <span className="font-label-mono-sm text-[11px] text-secondary ml-auto">
              REV 2024.3 // ASHRAE 90.1
            </span>
          </div>

          <div className="space-y-3">
            {TECHNICAL_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-structural rounded-lg overflow-hidden bg-surface-container-lowest"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                      {index + 1}. {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-secondary shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-structural/50 bg-surface-container-low/50">
                      <p className="font-body-md text-secondary leading-relaxed text-[15px] pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
