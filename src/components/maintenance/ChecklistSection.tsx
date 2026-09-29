import React, { useState } from 'react';
import { READINESS_CHECKLIST } from '../../data/maintenanceData';
import { SectionHeader } from '../common/SectionHeader';
import { Check, CheckCircle2 } from 'lucide-react';

export const ChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const markAll = () => {
    if (checkedItems.length === READINESS_CHECKLIST.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(READINESS_CHECKLIST.map((item) => item.id));
    }
  };

  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-20 px-margin lg:px-margin-desktop border-b border-structural">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeader
            eyebrow="FACILITY READINESS"
            title="Pre-Maintenance Intake Checklist"
            description="7 key facility checkpoints to streamline technician dispatch, eliminate diagnostic delays, and expedite immediate root-cause field resolution."
          />
          <button
            onClick={markAll}
            className="font-label-mono-sm text-[12px] uppercase text-primary hover:text-on-surface transition-colors font-semibold self-start md:self-auto cursor-pointer"
          >
            {checkedItems.length === READINESS_CHECKLIST.length
              ? 'Deselect All Checkpoints'
              : 'Select All Checkpoints'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {READINESS_CHECKLIST.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-5 rounded-lg border transition-all cursor-pointer flex items-start gap-4 select-none ${
                  isChecked
                    ? 'bg-white border-on-surface shadow-xs'
                    : 'bg-white/80 border-structural hover:bg-white hover:border-structural-dim'
                }`}
              >
                {/* 18px square checkbox per DESIGN.md */}
                <div
                  className={`w-[18px] h-[18px] rounded-[3px] border mt-1 flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-primary-container border-primary-container text-white'
                      : 'border-[#cbd0d8] bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                      {item.id}. {item.title}
                    </span>
                    <span className="font-label-mono-sm text-[10px] uppercase tracking-wider text-secondary bg-surface-container-low px-2 py-0.5 rounded shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="font-body-sm text-secondary text-[13px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Readiness progress meter */}
        <div className="mt-8 bg-white border border-structural p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-label-mono-sm text-[12px]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-secondary">
              Facility Verification Status: <strong className="text-on-surface">{checkedItems.length} of {READINESS_CHECKLIST.length} Checkpoints Confirmed</strong>
            </span>
          </div>
          <span className="text-primary font-medium">
            {checkedItems.length === READINESS_CHECKLIST.length
              ? '✓ Ready for Immediate Priority Dispatch'
              : 'Provide items during submittal review'}
          </span>
        </div>
      </div>
    </section>
  );
};
