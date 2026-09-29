import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'ac-repair',
    slug: 'ac-repair',
    title: 'Commercial AC & Central Chiller Repair',
    shortTitle: 'AC & Chiller Repair',
    category: 'Cooling & Refrigeration',
    eyebrow: 'SPEC 01 // PRECISION COOLING REPAIR & RESTORATION',
    summary: 'Comprehensive diagnostics, centrifugal chiller overhauls, refrigerant circuit recovery, and component rebuilds for enterprise comfort and critical process cooling.',
    description: 'When commercial cooling plants fail during peak summer demand, thermal runaway risks facility operations and tenant leases. Vertex Solutions provides factory-certified diagnostic troubleshooting across commercial direct-expansion (DX) systems, rooftop split plants, and water-cooled centrifugal chillers. Every repair begins with digital manifold telemetry, oil spectrographic sampling, and micro-channel leak testing to address underlying thermodynamic root causes rather than temporary symptoms.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4EaXh-qt-cf-VinR9fEBDr4FRhL3iEgghop68zTM4Q8h2PaqdUWn12Ztu67newo0y8fJavCfGhGY4y_qoWIsHhqPRATXutIsGiaIVFIzXwn6Be-mX3_-41JCTAEMW6VPF4b75NfuZzg_Ut6-PHG456H-pXiMrZ9sZgATBTfbnsQC6ajY279X56MXhgBmdw8gRqbLFjqh9SBjlSPaVMdTDcCtpaIntGBfWK57gTJ0pFX82EoQzWjSW7A',
    specs: {
      standard: 'EPA Section 608 Universal · AHRI 550/590',
      responseSLA: '2-Hour Emergency Dispatch',
      warranty: '1-Year Fixed Labor & OEM Manufacturer Warranty',
      balancingTolerance: '±2.5% Design Flow'
    },
    features: [
      'Comprehensive digital manifold refrigerant pressure and superheat / subcooling profiling',
      'Spectrographic compressor oil testing for acid contamination, moisture, and bearing wear',
      'Electronic eddy-current non-destructive tube testing on shell-and-tube evaporators',
      'Variable Frequency Drive (VFD) harmonic analysis and inverter bypass diagnostics',
      'Precision laser shaft alignment between motor drives and centrifugal impellers',
      'EPA certified closed-loop refrigerant recovery, evacuation down to 500 microns, and charging'
    ],
    equipmentHandled: [
      'Water-Cooled Centrifugal & Magnetic-Bearing Frictionless Chillers (100–1,500 TR)',
      'Air-Cooled Screw and Scroll Chiller Plants (20–400 TR)',
      'High-Tonnage Commercial Packaged Rooftop DX Systems (15–120 Tons)',
      'Direct Expansion (DX) Multi-Stage Air Handlers & Split Condensing Units',
      'Variable Refrigerant Flow (VRF/VRV) 3-Pipe Heat Recovery Architectures'
    ],
    deliverables: [
      'Full Digital Thermodynamic Diagnostic Report',
      'Refrigerant Compliance & Recovery Log (EPA Section 608)',
      'Pre- and Post-Repair Delta-T & Amp Draw Baseline Verification',
      'Itemized Scope Sheet with Zero-Surprise Guaranteed Pricing'
    ],
    faqs: [
      {
        question: 'How quickly can your mechanical team mobilize for an offline chiller?',
        answer: 'For contract facilities and critical industrial plants in our Midwest footprint (IN, OH, KY), we guarantee an on-site mechanical arrival SLA under 2 hours with our fully equipped mobile service vehicles.'
      },
      {
        question: 'Do you supply temporary auxiliary cooling while major compressor repairs occur?',
        answer: 'Yes. Vertex maintains a regional fleet of trailer-mounted rental chillers (100 to 500 tons) and portable air handlers with flexible cam-lock hydronic tie-ins to preserve facility operations during rebuilds.'
      },
      {
        question: 'Are your technicians certified across multi-vendor OEM equipment?',
        answer: 'Our senior technicians are factory-trained and hold Universal EPA credentials across Trane, Carrier, York, Daikin, McQuay, and AAON commercial platforms.'
      }
    ]
  },
  {
    id: 'heating-furnace-repair',
    slug: 'heating-furnace-repair',
    title: 'Industrial Heating & Hydronic Boiler Repair',
    shortTitle: 'Heating & Boiler Repair',
    category: 'Commercial Heating & Hydronics',
    eyebrow: 'SPEC 02 // THERMAL COMBUSTION & STEAM RESTORATION',
    summary: 'Turnkey combustion tuning, low-NOx burner rehabilitation, condensing hydronic cascades, and steam header re-piping engineered for continuous plant reliability.',
    description: 'Industrial heating failures jeopardize process water temperatures, freeze fire sprinkler lines, and drive massive operational liabilities. Vertex Solutions engineers specialize in commercial hydronic boilers, condensing hot water cascades, direct-fired make-up air systems, and steam distribution. We utilize electronic flue gas analyzers to measure O2, CO, and thermal efficiency, restoring proper air-to-fuel modulation and safety relief actuation per ASME Section IV standards.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWs0OpU9UP1hdT6HCymS250empMwgzlwON0a7xoBwYqfK_1iug9HaDvcBUV9TaV2aQ8gCFMfbt3yBDUE-gA5F7haiEUr0-fSOWp-0B2xoydbavznNofht2ExfCUCIlhoEzhNUg27dnKlscNFQ9E53AARGFTrDt-Mz8e8dvvcoyxhjoy5Ae-wG--QNF-tNshOAGZIKm2mXaMFPsIpxjQwELMgMHBt2wbix3wsrHz9vGnf8Muo6_DiKJvQ',
    specs: {
      standard: 'ASME Section IV · National Board R-Stamp · NFPA 85',
      responseSLA: '2-Hour Emergency Dispatch',
      warranty: 'Full System Combustion Performance Guarantee',
      balancingTolerance: 'Flue Efficiency > 94% on Condensing Units'
    },
    features: [
      'Real-time combustion analysis: O2, CO, stack temperature, and excess air verification',
      'Electronic flame safeguard control troubleshooting, scanner replacement, and safety interlocks',
      'Boiler feed pump dynamic head testing, deaerator inspection, and condensate return audits',
      'Low-loss header balancing and hydronic zone control actuator recalibration',
      'Refractory brick repair, sectional gasket renewal, and heat exchanger descaling',
      'Certified safety relief valve pop-testing and low-water cut-off mechanical rebuilds'
    ],
    equipmentHandled: [
      'Ultra-Low NOx High-Efficiency Condensing Boilers (500 MBH to 6,000 MBH)',
      'Atmospheric and Forced-Draft Cast Iron Sectional Boilers',
      'Industrial Scotch Marine Firetube & Watertube Boilers',
      'Direct and Indirect-Fired Warehouse Make-Up Air Units (MAUs)',
      'Commercial Gas Unit Heaters & Radiant Tube Industrial Arrays'
    ],
    deliverables: [
      'ASME CSD-1 Combustion & Safety Test Certification Sheet',
      'Continuous Flue Gas Efficiency Printout (CO ppm & Excess Air)',
      'Water Treatment Chemistry Recommendation & pH Profile',
      'Itemized Component Wear and Burner Modulation Roadmap'
    ],
    faqs: [
      {
        question: 'What is involved in an ASME CSD-1 annual safety audit?',
        answer: 'Our licensed engineers perform physical functional testing of flame safeguards, high and low gas pressure switches, manual-reset high limits, low-water cut-off mechanisms, and safety relief valves, certifying state compliance.'
      },
      {
        question: 'Can you convert our older inefficient steam system to high-efficiency hydronics?',
        answer: 'Yes. We routinely engineer phased conversions that replace central steam headers with localized condensing boiler loops, cutting fuel consumption by 30% to 40% while eliminating steam trap maintenance.'
      }
    ]
  },
  {
    id: 'maintenance-tune-up',
    slug: 'maintenance-tune-up',
    title: 'Predictive Preventive Maintenance & TAB Tune-Up',
    shortTitle: 'Maintenance & Tune-Up',
    category: 'Reliability & Uptime',
    eyebrow: 'SPEC 03 // PREDICTIVE TELEMETRY & LIFECYCLE PRESERVATION',
    summary: 'Data-driven quarterly mechanical agreements, laser vibration diagnostics, NEBB certified air/water balancing, and continuous sensor calibration.',
    description: 'Reactive HVAC repairs are up to 4 times more expensive than planned predictive maintenance. Vertex Solutions provides structured mechanical maintenance programs that treat commercial HVAC as high-tolerance capital machinery. Our technicians execute quarterly laser shaft alignments, ultrasonic bearing lubrication, motor winding insulation resistance (Megger) testing, and automated BACnet trend analysis to catch component degradation hundreds of hours before catastrophic failure.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaU4xhdhHKaqT9Oln-QV7_UWvK3IiD1GIyqJqChqeM_5DwqaAdLVjJBWotIZjU9J6a_tbLAwdaM1rh2DPKl53p6YNw7eVlbL1pRWIyuWDjz_Cs6dmXMMBesbpsXjjMynbBGvlpbcHxllomBB0gp7WXdQBuAL7ND1HAD8lxh80UtdfKYuFYc7wXegmw7e3skwApGp9C7KyHZPmU9eUL805lwkK8TP6hEM0WF7sfwAfqc9tYWdvSfHp9Tw',
    specs: {
      standard: 'NEBB Certified Procedures · ASHRAE Standard 180',
      responseSLA: 'Guaranteed Priority Dispatch Window',
      warranty: 'Fixed-Rate Labor Pricing on All Identified Repairs',
      balancingTolerance: '±2.5% ASHRAE 111 Standard'
    },
    features: [
      'Tri-axial laser vibration analysis on rotating motor shafts, fans, and pump impellers',
      'Infrared thermographic scanning of electrical disconnects, contactors, and motor starters',
      'Ultrasonic hydronic flow rate verification across coils and balancing valves',
      'Precision MERV 13 to MERV 16 filter changeout and antimicrobial evaporator coil washing',
      'Chemical water treatment testing for conductivity, biocides, and corrosion inhibitors',
      'BACnet sensor calibration and modulating damper stroke verification'
    ],
    equipmentHandled: [
      'Complete Central Chiller & Boiler Mechanical Plant Infrastructure',
      'Commercial Air Handling Units (AHUs) & Make-Up Air Systems',
      'Cooling Towers (Induced and Forced Draft Open/Closed Circuit)',
      'Hydronic Base-Mounted & In-Line Distribution Pumps',
      'Variable Air Volume (VAV) Terminal Boxes with Reheat Coils'
    ],
    deliverables: [
      'Quarterly Mechanical Health Index (MHI) Scorecard',
      'Vibration FFT Spectral Trend Charts & Bearing Condition Index',
      'As-Found vs. As-Left Airflow (CFM) & Water Flow (GPM) Balance Sheets',
      'Priority Parts Caching in Regional Warehouse Locker'
    ],
    faqs: [
      {
        question: 'How do tiered maintenance agreements reduce our total operating budget?',
        answer: 'By preventing compressor bearing seizures, keeping heat exchangers clean for optimal heat transfer, and eliminating emergency overtime rates, clients typically experience a 15%–25% reduction in annual utility and repair costs.'
      },
      {
        question: 'Do you coordinate around corporate quiet hours and tenant meetings?',
        answer: 'Yes. All high-noise procedures such as filter cleanouts, belt tensioning, and chemical loop sampling are scheduled during approved off-peak service windows or weekends.'
      }
    ]
  },
  {
    id: 'emergency-hvac-service',
    slug: 'emergency-hvac-service',
    title: 'Emergency 24/7 Mechanical HVAC Dispatch',
    shortTitle: '24/7 Emergency Dispatch',
    category: 'Rapid Critical Response',
    eyebrow: 'SPEC 04 // GUARANTEED 2-HOUR REGIONAL DISPATCH SLA',
    summary: 'Round-the-clock master mechanical dispatch with dedicated emergency response trucks, on-board OEM spares, and portable temporary plant bypass solutions.',
    description: 'When critical HVAC assets fail in medical centers, pharmaceutical laboratories, cold-storage warehouses, or high-density server rooms, every passing hour compounds financial loss. Vertex Solutions operates a true 24/7 commercial emergency dispatch center staffed by licensed mechanical tradesmen. We maintain guaranteed 2-hour on-site arrival SLAs across Indiana, Ohio, and Northern Kentucky, equipped to immediately stabilize refrigeration circuits, restore boiler combustion, or deploy temporary bypass chillers.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdFL3YVYyMW1SmxuMypRao3gLNoNoUxxlMb6aoZITmIrM54q7g-1fAQ8xgKje4_WOQO1ghfmMJVz7GwXS2eJfl3k0WAkaqStEN-zB4uAHY5ZVsaJn9-TtJWILyqJd_xnBcw9fTGCreTccd_gOM-dcZIbAmN6emdlQhmZ4cPaBVOJ69UR5UfEI8r9uGqWFSF1sryEiO-EvKEqSfTGhiYozL79EV0MKnT-5bwNumzeUsD_Kq_YlREDLOaQ',
    specs: {
      standard: 'OSHA 30 · EPA Universal · Critical Environment Protocol',
      responseSLA: 'Guaranteed 2-Hour Midwest Arrival Window',
      warranty: 'Immediate Emergency Stabilization Guarantee',
      balancingTolerance: 'Rapid Temporary Bypass Contingency'
    },
    features: [
      'Dedicated 24/7 commercial dispatch hotline: (800) 555-0194 with direct mechanic triage',
      'Fleet of heavy mechanical service trucks stocked with universal contactors, VFDs, and valves',
      'Mobile temporary chiller (100–500 TR) and diesel boiler deployment capability',
      'Refrigerant leak pinpointing with calibrated helium sniffers and ultrasonic audio sensors',
      'Emergency electrical phase monitoring, transformer stabilization, and motor swap-outs',
      'Direct access to regional OEM distributor emergency parts lockers 365 days a year'
    ],
    equipmentHandled: [
      'Failed Chiller Compressors (Centrifugal, Screw, Scroll)',
      'Boiler Flame-Outs, Low-Water Lockouts & Gas Valve Failures',
      'Rooftop Blower Motor Burnouts & Broken Fan Shafts',
      'Hydronic Circulation Pump Mechanical Seal Failures',
      'Cleanroom Differential Pressure Drops & Exhaust Blower Trips'
    ],
    deliverables: [
      'Initial 60-Minute Telemetry Triage Phone Consultation',
      'On-Site Physical Containment & Temporary Stabilization Plan',
      'Root-Cause Forensic Diagnostic Failure Analysis Report',
      'Long-Term Turnkey Permanent Engineering Restoration Proposal'
    ],
    faqs: [
      {
        question: 'Who answers your emergency hotline outside of business hours?',
        answer: 'You speak directly with an on-call mechanical field supervisor, not a third-party answering service, allowing immediate technical triage before trucks roll.'
      },
      {
        question: 'What is the geographic radius of your 2-hour emergency SLA?',
        answer: 'Our guaranteed 2-hour response covers metropolitan Indianapolis, Columbus, Cincinnati, Dayton, Louisville, Lexington, Fort Wayne, and surrounding logistics corridors.'
      }
    ]
  },
  {
    id: 'indoor-air-quality',
    slug: 'indoor-air-quality',
    title: 'Duct Cleaning, Cleanrooms & Sterile IAQ',
    shortTitle: 'Duct & Indoor Air Quality',
    category: 'Air Quality & Containment',
    eyebrow: 'SPEC 05 // STERILE AIR DISTRIBUTION & ISO COMPLIANCE',
    summary: 'Hospital surgical suite containment, pharmaceutical cleanroom laminar airflow, high-speed venturi control valves, and precision HEPA filtration grids.',
    description: 'In precision healthcare, semiconductor, and research facilities, air is a critical process variable. Vertex Solutions delivers advanced indoor air quality engineering and duct hygiene services aligned with strict ASHRAE 170 and ISO 14644 standards. From positive/negative pressure isolation suites to hospital surgical laminar grids and commercial duct remediation, our technicians utilize negative-air HEPA containment vacuums, ultrasonic airflow pitot traverses, and airborne particulate meters.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChgg2YBBKdgNcZHt6omhA27WZuaf6P2W7FjJK4aYjsV4gXl4ESRlt1Xnk5EdXSXlXOLVBvuDRBYPj5BMPc45RDXU2ZwVhwSd6GTBTaLQ1hj90BpyKRJRd2kjzH6bvTYcaC-bqySpN0grr3ImKeTF9g88GFC1xVO0eOc0ZrOcubLl4e5K5KaGVaJujhjQimZXWOLNPEaicznLeLKYU_xL4Q8qCiwHOAefE3TH3IH0Y4cGvkCL2PozoLGw',
    specs: {
      standard: 'ASHRAE 170 · ISO 14644 · NADCA ACR Standard',
      responseSLA: 'Standard Planned Mobilization Window',
      warranty: 'Post-Remediation Particulate Clearance Certification',
      balancingTolerance: '±0.02" WG Cascade Differential Pressure'
    },
    features: [
      'High-speed venturi valve installation for dynamic milliseconds cascade pressure containment',
      'Commercial negative-air continuous vacuum duct cleaning with video borescope logging',
      'Fan-powered terminal unit HEPA filter grid challenge testing with calibrated aerosol photometers',
      'Ultraviolet-C (UV-C) germicidal irradiation grid integration into central air handlers',
      'Continuous differential static pressure monitoring and room occupancy sensors',
      'Full fresh air ventilation audits per ASHRAE Standard 62.1 commercial standards'
    ],
    equipmentHandled: [
      'Hospital Surgical Suite Laminar Airflow Distribution Grids',
      'Pharmaceutical Cleanrooms (ISO Class 5 through ISO Class 8)',
      'Safe-Change Bag-In / Bag-Out (BIBO) Hazardous Exhaust Systems',
      'Dedicated Outdoor Air Systems (DOAS) with Enthalpy Energy Recovery Wheels',
      'Commercial Supply and Return Sheet Metal Ductwork Networks'
    ],
    deliverables: [
      'Pre- and Post-Remediation Borescope Visual Inspection Records',
      'Optical Particle Counter Aerosol Validation Logs (0.3μm & 0.5μm)',
      'Room Differential Pressure Cascade Mapping Certificate',
      'NADCA Certified Cleanliness & Air Balancing Sign-Off Sheet'
    ],
    faqs: [
      {
        question: 'Can you service ductwork and filters while the facility remains occupied?',
        answer: 'Yes. We construct engineered negative-pressure ante-rooms with portable HEPA scrubbers, ensuring zero dust or particulate migration into patient rooms, clean spaces, or tenant offices.'
      },
      {
        question: 'Do you certify cleanrooms for regulatory inspections?',
        answer: 'We provide comprehensive test reports stamped by our in-house engineers verifying air exchange rates (ACH), filter face velocities, and pressure differentials.'
      }
    ]
  },
  {
    id: 'commercial-hvac',
    slug: 'commercial-hvac',
    title: 'Turnkey Commercial HVAC & Rigging Upgrades',
    shortTitle: 'Commercial Turnkey HVAC',
    category: 'Design-Build & Modernization',
    eyebrow: 'SPEC 06 // HEAVY-TONNAGE RETROFITS & CRANE RIGGING',
    summary: 'Turnkey design-build installations, weekend helicopter/crane packaged RTU replacements, BIM clash coordination, and BACnet building management automation.',
    description: 'Vertex Solutions engineers turnkey commercial HVAC construction and capital retrofit projects for commercial office buildings, industrial campuses, and distribution centers. From load calculations using Revit BIM modeling through complex crane rigging on high-rise structures, we execute retrofits with zero interruption to active tenants. Our team handles permitting, curb adapter fabrication, duct transitions, and full digital integration into central building management systems.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuhObwdPErr1ucpqTVu3vOgpGQtV7dhPzdJJXRCrmusKbeL9_F-OUX8cHxhKQjEQpvgjXScFWgN9lojHsLUNhKb4mIo8f0PAGLgy1SjltNjB6DodX-T3SlGexRAxKZGtjslqXJxTFx4rpitYYDPLJmD6fNr7f2lz5B9Fxqf7v13e7U7ITXWFmsZZHeb1L94lTzV05TvvegTcOCN3C-6mbP-yNZ9xmYKAWOCmALdW-XanQUIvRsMXupdw',
    specs: {
      standard: 'ASHRAE Standard 90.1 · SMACNA Standards · P.E. Stamped',
      responseSLA: 'Firm Fixed Project Turnkey Schedule',
      warranty: '5-Year Equipment Compressor & 1-Year Comprehensive Labor',
      balancingTolerance: '100% Commissioned As-Built TAB Record'
    },
    features: [
      'Comprehensive BIM / Revit 3D mechanical clash detection and pre-fabrication',
      'Accelerated weekend crane and helicopter heavy-lift rigging maneuvers',
      'Custom laser-measured heavy-gauge roof curb adapters for seamless RTU drops',
      'Direct Digital Controls (DDC) and BACnet MS/TP or IP building automation integration',
      'Total Air Balancing (TAB) certified pitot traverses and air distribution tuning',
      'Utility energy rebate documentation and ASHRAE 90.1 compliance sign-offs'
    ],
    equipmentHandled: [
      'Commercial Packaged Rooftop Units (RTUs) from 15 to 150 Tons',
      'Central Built-Up Mechanical Air Handling Units (AHUs) up to 100,000 CFM',
      'Centrifugal Water-Cooled & Air-Cooled Central Chiller Plants',
      'Industrial Direct-Fired Make-Up Air Systems & Ventilation Stacks',
      'Variable Refrigerant Flow (VRF) Heat Recovery Inverter Systems'
    ],
    deliverables: [
      'Professional Engineer (P.E.) Stamped Mechanical Submittals',
      'Rigging Safety & Municipal Street Closure Logistics Plans',
      'NEBB Certified Air & Hydronic TAB Turnover Binder',
      'Digital As-Built CAD / BIM Drawings & Owner O&M Manuals'
    ],
    faqs: [
      {
        question: 'How do you perform major rooftop replacements without disrupting tenants?',
        answer: 'We coordinate all heavy rigging maneuvers during off-peak weekend windows. Our crews arrive Friday evening to rig, install curb adapters, set new units, complete electrical and gas terminations, and test systems before Monday 6:00 AM.'
      },
      {
        question: 'Do you assist with local utility decarbonization and energy efficiency rebates?',
        answer: 'Yes. Our P.E. engineers prepare all necessary pre- and post-installation energy models (ASHRAE 90.1) required by regional utility rebate programs, often recovering tens of thousands of dollars in incentive capital.'
      }
    ]
  }
];
