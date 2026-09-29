import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { MetricsRibbon } from '../components/home/MetricsRibbon';
import { PartnerGrid } from '../components/home/PartnerGrid';
import { CapabilitiesGrid } from '../components/home/CapabilitiesGrid';
import { QualityArchitecture } from '../components/home/QualityArchitecture';
import { FeaturedCaseStudies } from '../components/home/FeaturedCaseStudies';
import { SEO } from '../components/common/SEO';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <SEO
        title="Commercial & Industrial Mechanical HVAC Engineering"
        description="Vertex Solutions delivers turnkey commercial HVAC installation, central chiller plants, industrial boilers, RTUs, and 24/7 emergency mechanical dispatch across IN, OH, and KY."
      />
      <HeroSlider />
      <MetricsRibbon />
      <PartnerGrid />
      <CapabilitiesGrid />
      <QualityArchitecture />
      <FeaturedCaseStudies />
    </div>
  );
};
