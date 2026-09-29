import { MaintenanceStep, ChecklistItem, MaintenanceTier } from '../types';

export const MAINTENANCE_PIPELINE: MaintenanceStep[] = [
  {
    step: '01',
    phase: 'Phase 1: Audit',
    title: 'Initial Assessment',
    description: 'Equipment schedule review, historical service logs, warranty baseline, and mapping facility heat-load expectations against original design criteria.',
    deliverable: 'Equip. Registry Sheet',
    testingOrStandard: 'ASHRAE 180 Baseline'
  },
  {
    step: '02',
    phase: 'Phase 1: Field Run',
    title: 'Site Inspection & Telemetry',
    description: 'Physical plant audit including precision amp draws, refrigerant pressure diagnostics, laser shaft alignment, and rotating equipment vibration analysis.',
    deliverable: 'Vibration & Amp Signatures',
    testingOrStandard: 'Tri-Axial Laser TAB'
  },
  {
    step: '03',
    phase: 'Phase 2: Estimation',
    title: 'Technical Proposal',
    description: 'Itemized scope of work with transparent OEM equipment specs, calculated component lead times, and locked-in guaranteed fixed pricing without change orders.',
    deliverable: 'Firm Fixed Bid Scope',
    testingOrStandard: '100% Scope Lock'
  },
  {
    step: '04',
    phase: 'Phase 2: Ops Plan',
    title: 'Scheduling & Logistics',
    description: 'Coordinated crane pick permits, off-peak rigging windows, and comprehensive safety plans formulated specifically to prevent any tenant disruption.',
    deliverable: 'Rigging & Traffic Logistics',
    testingOrStandard: 'OSHA 30 Safety Plan'
  },
  {
    step: '05',
    phase: 'Phase 3: Build & Tune',
    title: 'Installation & Service',
    description: 'OSHA-30 and EPA Universal certified mechanical technicians executing exact piping, electrical terminations, and refrigerant recovery per ASME standards.',
    deliverable: 'ASME Section IV Welds',
    testingOrStandard: 'EPA Universal · OSHA 30'
  },
  {
    step: '06',
    phase: 'Phase 3: Closeout',
    title: 'Verification & Digital Turnover',
    description: 'Certified air and hydronic balancing (TAB), BACnet control sensor calibration, baseline benchmark reports, and full digital maintenance binder turnover.',
    deliverable: 'NEBB Certified TAB Record',
    testingOrStandard: '±2.5% ASHRAE 111 Standard'
  }
];

export const READINESS_CHECKLIST: ChecklistItem[] = [
  {
    id: 1,
    title: 'Building Address & Access Logistics',
    description: 'Confirm exact roof hatch locations, service freight elevator dimensions, keycard protocols, and security escort desk contact details.',
    tag: 'Access Required'
  },
  {
    id: 2,
    title: 'Equipment Brand & Model Numbers',
    description: 'Clear photograph or transcript of compressor/chiller nameplate stamps, model designations, and serial tag codes.',
    tag: 'Critical ID'
  },
  {
    id: 3,
    title: 'System Architecture Designation',
    description: 'Specify plant topology: Packaged RTUs, Split DX, Water-Cooled Centrifugal Chiller, Hydronic Gas Boilers, or Open Cooling Towers.',
    tag: 'Plant Class'
  },
  {
    id: 4,
    title: 'Last Service Date & Historical Logs',
    description: 'Recent oil analysis reports, last chemical water treatment records, filter/belt change logs, and any major compressor overhauls.',
    tag: 'Baseline Records'
  },
  {
    id: 5,
    title: 'Description of Existing Symptoms',
    description: 'Specific active alarm codes, abnormal harmonics/vibrations, differential pressure drops across coils, or static air pressure imbalances.',
    tag: 'Telemetry Data'
  },
  {
    id: 6,
    title: 'Site Safety & Environmental Clearance',
    description: 'Facility-specific safety orientations, site badging protocols, lock-out/tag-out rules, and ARC flash PPE requirements.',
    tag: 'Compliance'
  },
  {
    id: 7,
    title: 'Preferred Low-Impact Service Windows',
    description: 'Tenant acoustic restrictions, off-peak utility demand windows, evening crane approvals, or designated weekend testing slots.',
    tag: 'Schedule'
  }
];

export const MAINTENANCE_TIERS: MaintenanceTier[] = [
  {
    id: 'tier-01',
    tierNumber: 'Tier 01',
    title: 'Baseline Compliance',
    tagline: 'Quarterly code and safety maintenance for standard commercial office and retail operations.',
    cadence: 'Quarterly / Plant Cycle',
    responseWindow: 'Standard 8-Hour Dispatch',
    slaBadge: 'Standard 8-Hr SLA',
    inclusions: [
      'Quarterly MERV 13 high-efficiency filter & drive belt changeouts',
      'EPA Section 608 certified closed-circuit refrigerant leak inspections',
      'Motor bearing lubrication & laser drive belt tension verification',
      'Electrical contactor amp draw and voltage drop verification',
      'Basic municipal and environmental safety compliance record filing',
      'Operating temperature differential (Delta-T) logging'
    ],
    actionLabel: 'Select Baseline Tier'
  },
  {
    id: 'tier-02',
    tierNumber: 'Tier 02',
    title: 'Planned Comprehensive',
    tagline: 'Predictive diagnostic telemetry engineered to lower annual energy consumption and prevent failure.',
    isPopular: true,
    cadence: 'Bi-Monthly / Plant Cycle',
    responseWindow: '4-Hour Priority SLA',
    slaBadge: '4-Hour Priority SLA',
    inclusions: [
      'Everything included in Tier 01 Baseline Compliance',
      'Bi-monthly physical audit of all central chillers, boilers, and RTUs',
      'Tri-axial laser vibration testing & dynamic rotating assembly balancing',
      'Hydronic loop chemical water sampling & corrosion inhibitor profiling',
      '15% contract discount on all OEM manufacturer replacement parts',
      'Guaranteed 4-hour emergency on-site technician dispatch',
      'Infrared thermographic scanning of central motor control centers'
    ],
    actionLabel: 'Request Comprehensive SLA'
  },
  {
    id: 'tier-03',
    tierNumber: 'Tier 03',
    title: 'Mission-Critical 24/7',
    tagline: 'Continuous monitoring and dedicated engineering coverage for healthcare, cleanrooms, and data centers.',
    cadence: 'Continuous / Telemetry',
    responseWindow: 'Guaranteed 2-Hour SLA',
    slaBadge: 'Guaranteed 2-Hour SLA',
    inclusions: [
      'Everything included in Tier 02 Planned Comprehensive',
      '24/7 continuous BACnet cloud telemetry & automated fault detection',
      'Dedicated Named Lead Mechanical Engineer assigned to your facility',
      'Guaranteed 2-hour on-site arrival SLA across the tri-state footprint',
      'Critical spare parts cached in regional warehouse locker',
      'Hospital and pharmaceutical cleanroom particulate & pressure certification',
      'Mobile auxiliary bypass chiller hookup prioritization contingency'
    ],
    actionLabel: 'Deploy Mission-Critical SLA'
  }
];

export const TECHNICAL_FAQS = [
  {
    question: 'How do you service equipment in fully occupied commercial or medical buildings?',
    answer: 'We isolate mechanical service work behind engineered containment barriers when necessary, utilize low-decibel vacuum and recovery equipment, and schedule all high-noise procedures (such as crane rigging or high-pressure flushing) during pre-approved off-peak quiet hours. Our technicians carry badging credentials and maintain cleanroom and occupied-space protocols.'
  },
  {
    question: 'What is the standard recommended maintenance frequency for central plants?',
    answer: 'Commercial central chiller and boiler plants typically require bi-monthly runtime verification, belt and bearing inspections, quarterly filter changes, and seasonal water treatment audits to sustain efficiency and maintain warranty protection.'
  },
  {
    question: 'What is the emergency dispatch protocol if our plant experiences an unexpected trip?',
    answer: 'Contract holders have direct radio lines into our master mechanic roster, guaranteeing 2-to-4 hour emergency response times across Indiana, Ohio, and Northern Kentucky.'
  },
  {
    question: 'What measurable energy efficiency recovery is achieved through regular coil cleaning?',
    answer: 'Dirty heat exchangers and improper refrigerant charges force compressors and fans to draw 10%–20% excess electrical consumption. Our precision sensor calibration, dynamic VFD balancing, and micro-channel coil washes routinely recover full thermodynamic COP ratings within 30 days.'
  },
  {
    question: 'Which commercial and industrial HVAC equipment manufacturers are supported?',
    answer: 'We are factory-authorized and warranty-certified across Trane, Carrier, York, Daikin, Lennox, AAON, and Mitsubishi Electric VRF architectures.'
  }
];
