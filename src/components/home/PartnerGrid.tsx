import React from 'react';

export const PartnerGrid: React.FC = () => {
  const partners = [
    { name: 'Carrier', spec: 'Factory Certified Commercial Applied Systems' },
    { name: 'Trane', spec: 'Centrifugal Chiller & CenTraVac Diagnostics' },
    { name: 'Daikin', spec: 'Applied Chiller & VRV Inverter Integration' },
    { name: 'Bosch', spec: 'Commercial Hydronic Boilers & Geothermal' },
    { name: 'York / JCI', spec: 'YK / YMC2 Magnetic Bearing Systems' },
    { name: 'Lennox', spec: 'Energence High-Efficiency Rooftop RTUs' },
  ];

  return (
    <section className="w-full bg-white border-b border-structural py-12 px-margin lg:px-margin-desktop">
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col shrink-0 max-w-xs">
          <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest font-semibold">
            OEM Integration
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">
            Authorized Factory Partners
          </h3>
          <p className="font-body-sm text-secondary text-[13px] mt-1">
            Factory-trained and warranty-certified mechanical service partners.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
          {partners.map((p) => (
            <div
              key={p.name}
              className="bg-surface-container-low border border-structural p-3.5 rounded-lg flex flex-col items-center justify-center text-center hover:border-on-surface transition-all group"
            >
              <span className="font-headline-sm text-[18px] text-on-surface font-bold tracking-tight group-hover:text-primary transition-colors">
                {p.name}
              </span>
              <span className="font-label-mono-sm text-[10px] text-secondary mt-1 leading-tight line-clamp-2">
                {p.spec}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
