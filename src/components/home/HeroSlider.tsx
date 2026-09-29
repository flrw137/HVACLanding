import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';

interface HeroSlide {
  spec: string;
  headline: string;
  subhead: string;
  image: string;
  tabLabel: string;
  tabNumber: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    spec: 'SPEC 01 // WATER-COOLED CENTRIFUGAL CHILLER PLANTS',
    headline: 'Engineered Central Plant Cooling for Critical Facility Uptime',
    subhead: 'Oil-free magnetic-bearing centrifugal chillers, redundant hydronic pumping stations, and automated chiller sequencing engineered to sustain uninterrupted comfort and process cooling under peak thermal loads.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4EaXh-qt-cf-VinR9fEBDr4FRhL3iEgghop68zTM4Q8h2PaqdUWn12Ztu67newo0y8fJavCfGhGY4y_qoWIsHhqPRATXutIsGiaIVFIzXwn6Be-mX3_-41JCTAEMW6VPF4b75NfuZzg_Ut6-PHG456H-pXiMrZ9sZgATBTfbnsQC6ajY279X56MXhgBmdw8gRqbLFjqh9SBjlSPaVMdTDcCtpaIntGBfWK57gTJ0pFX82EoQzWjSW7A',
    tabNumber: '01',
    tabLabel: 'Central Chillers',
  },
  {
    spec: 'SPEC 02 // HIGH-EFFICIENCY HYDRONIC BOILER SYSTEMS',
    headline: 'Industrial Heating & Precision Hydronic Plant Engineering',
    subhead: 'High-efficiency condensing boiler cascades, low-loss manifolds, and multi-zone distribution engineered for zero thermal interrupt across commercial campuses.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWs0OpU9UP1hdT6HCymS250empMwgzlwON0a7xoBwYqfK_1iug9HaDvcBUV9TaV2aQ8gCFMfbt3yBDUE-gA5F7haiEUr0-fSOWp-0B2xoydbavznNofht2ExfCUCIlhoEzhNUg27dnKlscNFQ9E53AARGFTrDt-Mz8e8dvvcoyxhjoy5Ae-wG--QNF-tNshOAGZIKm2mXaMFPsIpxjQwELMgMHBt2wbix3wsrHz9vGnf8Muo6_DiKJvQ',
    tabNumber: '02',
    tabLabel: 'Hydronic Boilers',
  },
  {
    spec: 'SPEC 03 // HEAVY-DUTY PACKAGED ROOFTOP UNITS & CRANE RIGGING',
    headline: 'High-Tonnage Rooftop Upgrades with Zero Business Interruption',
    subhead: 'Accelerated weekend helicopter and crane rigging maneuvers replacing end-of-life packaged RTUs, featuring modulating economizers and factory seismic vibration isolation curbs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuhObwdPErr1ucpqTVu3vOgpGQtV7dhPzdJJXRCrmusKbeL9_F-OUX8cHxhKQjEQpvgjXScFWgN9lojHsLUNhKb4mIo8f0PAGLgy1SjltNjB6DodX-T3SlGexRAxKZGtjslqXJxTFx4rpitYYDPLJmD6fNr7f2lz5B9Fxqf7v13e7U7ITXWFmsZZHeb1L94lTzV05TvvegTcOCN3C-6mbP-yNZ9xmYKAWOCmALdW-XanQUIvRsMXupdw',
    tabNumber: '03',
    tabLabel: 'Rooftop RTUs',
  },
  {
    spec: 'SPEC 04 // PHARMACEUTICAL & CRITICAL HEALTHCARE IAQ',
    headline: 'Laminar Airflow & Precision Cascade Pressure Containment',
    subhead: 'ISO Class cleanroom certification, high-speed venturi control valves, HEPA filtration grids, and ASHRAE 170 surgical suite compliance delivering uncompromising air purity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChgg2YBBKdgNcZHt6omhA27WZuaf6P2W7FjJK4aYjsV4gXl4ESRlt1Xnk5EdXSXlXOLVBvuDRBYPj5BMPc45RDXU2ZwVhwSd6GTBTaLQ1hj90BpyKRJRd2kjzH6bvTYcaC-bqySpN0grr3ImKeTF9g88GFC1xVO0eOc0ZrOcubLl4e5K5KaGVaJujhjQimZXWOLNPEaicznLeLKYU_xL4Q8qCiwHOAefE3TH3IH0Y4cGvkCL2PozoLGw',
    tabNumber: '04',
    tabLabel: 'Sterile IAQ',
  },
  {
    spec: 'SPEC 05 // BACNET DIGITAL TELEMETRY & BMS AUTOMATION',
    headline: 'Real-Time Plant Telemetry, Diagnostics & Predictive Balancing',
    subhead: 'Direct digital controls (DDC), automated valve loops, sensor diagnostics, and continuous energy monitoring designed to expose hidden thermal drift and eliminate utility waste.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8h65zo3ViSg_Ly7lc34XnJlj1nCwJMaIqzRoUS5bCu8F26X4bRGrFwIACVDo56KthOPrUo1VHe-s5yuLkKZ5eb_F-5RV8-DEWniscZc7gGlAAdbEoF03yk_JdugcsY1pNrHmFyTKlgcV6EHrSXhuQvavqXE6LkpoxmconqaL7asd1PV14bUnoAVHNzhVYGtbzj_sGJyc9wexU3Hi7QkVVUiYRtoiDoeIxijWvyZ9mwCvImP-rdjUWcg',
    tabNumber: '05',
    tabLabel: 'Automation & BMS',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 7000; // 7 seconds per slide

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, slideDuration);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentSlide]);

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full min-h-[660px] lg:min-h-[740px] flex flex-col justify-between overflow-hidden bg-inverse-surface text-inverse-on-surface select-none"
    >
      {/* Background Slider Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.tabNumber}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className={`w-full h-full object-cover ${isActive ? 'kenburns-active' : ''}`}
              />
            </div>
          );
        })}
      </div>

      {/* Architectural Vignette / Dark Scrim Overlays per Reference */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-inverse-surface/95 via-inverse-surface/85 to-inverse-surface/40 pointer-events-none"></div>
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-inverse-surface via-transparent to-inverse-surface/50 pointer-events-none"></div>

      {/* Top Slide Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/15 z-30">
        <div
          className="h-full bg-primary-container transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / HERO_SLIDES.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-margin lg:px-margin-desktop pt-16 sm:pt-20 lg:pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-space-md bg-inverse-surface/80 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-label-technical text-label-technical tracking-widest uppercase text-inverse-primary font-semibold">
              {active.spec}
            </span>
          </div>

          {/* Dynamic Headline with Smooth Transition */}
          <h1 className="font-display-xl-mobile sm:font-headline-lg lg:font-display-xl text-display-xl-mobile sm:text-headline-lg lg:text-display-xl text-white mb-space-md tracking-tight leading-tight transition-all duration-300 min-h-[90px] sm:min-h-[140px] flex items-center">
            {active.headline}
          </h1>

          {/* Supporting Narrative */}
          <p className="font-body-md sm:font-body-lg text-surface-dim max-w-2xl mb-space-xl transition-all duration-300 min-h-[60px] leading-relaxed">
            {active.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-space-md mb-8">
            <Link
              to="/contact"
              className="bg-primary-container hover:bg-primary text-on-primary font-button-text text-button-text px-6 py-3.5 rounded-lg shadow-lg transition-all duration-150 inline-flex items-center gap-2"
            >
              <span>Request Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/case-studies"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-sm font-button-text text-button-text px-6 py-3.5 rounded-lg shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              <span>View Commercial Projects</span>
              <Layers className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Restrained Cinematic Navigation & 5 Tab Bar */}
      <div className="relative z-20 w-full bg-inverse-surface/85 backdrop-blur-md border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-margin lg:px-margin-desktop py-space-sm flex items-center">
          {/* 5 Slide Tab Selectors */}
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
            {HERO_SLIDES.map((slide, index) => {
              const isSelected = index === currentSlide;
              return (
                <button
                  key={slide.tabNumber}
                  onClick={() => setCurrentSlide(index)}
                  className={`px-3 py-1.5 rounded-lg font-label-mono-sm text-label-mono-sm transition-all duration-200 text-left whitespace-nowrap cursor-pointer border-l-2 ${
                    isSelected
                      ? 'bg-white/15 text-white border-primary-container font-semibold'
                      : 'text-surface-dim hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  <span className={`mr-1 font-bold ${isSelected ? 'text-inverse-primary' : 'text-surface-dim'}`}>
                    {slide.tabNumber}
                  </span>
                  <span>{slide.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
