import React from 'react';

export const MetricsRibbon: React.FC = () => {
  const metrics = [
    {
      value: '240+',
      label: 'Turnkey Builds',
      detail: 'Midwest Commercial Plants',
      highlight: false,
    },
    {
      value: '96.4%',
      label: 'SLA Retention',
      detail: 'Multi-Year Service Accounts',
      highlight: false,
    },
    {
      value: '2 HR',
      label: 'Midwest Dispatch',
      detail: 'Guaranteed Emergency SLA',
      highlight: true,
    },
    {
      value: '0.00',
      label: 'EMR Incident Rate',
      detail: 'Zero Lost-Time Incidents',
      highlight: false,
    },
  ];

  return (
    <div className="w-full bg-surface-container-low border-b border-structural py-8 px-margin lg:px-margin-desktop">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col border-l-2 border-structural pl-4 py-1">
              <span
                className={`font-display-xl-mobile sm:font-headline-lg lg:font-display-xl leading-none tracking-tight ${
                  m.highlight ? 'text-primary' : 'text-on-surface'
                }`}
              >
                {m.value}
              </span>
              <span className="font-label-mono-sm text-label-mono-sm uppercase text-on-surface font-semibold mt-2">
                {m.label}
              </span>
              <span className="font-body-sm text-[12px] text-secondary mt-0.5">
                {m.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
