import { ClientReview } from '../types';

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-01',
    author: 'Marcus Vance',
    role: 'Vice President of Facility Operations',
    organization: 'Apex Logistics Midwest Network',
    location: 'Columbus, OH',
    serviceCategory: 'Direct-Fired Ventilation & MAUs',
    rating: 5,
    quote: 'During polar vortex temperatures, negative building pressure was pulling freezing air across 40 shipping docks, making warehouse conditions hazardous. Vertex engineered and installed direct-fired make-up air units ahead of schedule. Their technicians self-perform all work—no subcontractors, zero change orders, and flawless TAB balancing.',
    verificationBadge: 'Verified Project Dossier #2024-IND-01'
  },
  {
    id: 'rev-02',
    author: 'Sarah Chen, M.S., CHFM',
    role: 'Director of Healthcare Facilities & Engineering',
    organization: 'St. Jude Ambulatory Surgery Center',
    location: 'Indianapolis, IN',
    serviceCategory: 'Dual Magnetic Chiller Overhaul',
    rating: 5,
    quote: 'Operating rooms cannot shut down for mechanical maintenance. Vertex delivered a 400 TR chiller overhaul utilizing a temporary bypass loop that sustained strict ASHRAE 170 temperature and humidity tolerances without canceling a single surgical procedure. Their lead engineer, Robert Keller, was on-site during every critical cut.',
    verificationBadge: 'Verified Project Dossier #2024-HLT-02'
  },
  {
    id: 'rev-03',
    author: 'David L. Albright',
    role: 'Senior Property Manager',
    organization: 'Keystone Commercial Tower (16-Story)',
    location: 'Louisville, KY',
    serviceCategory: 'Weekend Helicopter RTU Modernization',
    rating: 5,
    quote: 'Replacing 4 major rooftop units on a 16-story downtown tower seemed impossible without days of street closures. Vertex organized an accelerated weekend helicopter crane lift. By Monday at 6:00 AM, all 16 tenant floors were fully conditioned and quiet. They are the only mechanical engineering firm in the region I trust with high-risk rigging.',
    verificationBadge: 'Verified Project Dossier #2023-OFC-03'
  },
  {
    id: 'rev-04',
    author: 'Gregory Thompson',
    role: 'Chief Plant Engineer',
    organization: 'Foundry Defense Manufacturing',
    location: 'Dayton, OH',
    serviceCategory: 'Precision ±1°F CNC Thermal Containment',
    rating: 5,
    quote: 'Thermal drift was causing micro-dimensional part scrap on our 5-axis aerospace titanium milling cells. Vertex diagnosed airflow eddies and re-engineered our chilled water reheat loops. We have held ±1.0°F round-the-clock for 14 straight months. Their response time on preventive service is consistently under an hour.',
    verificationBadge: 'Verified Project Dossier #2024-IND-05'
  },
  {
    id: 'rev-05',
    author: 'Elena Rostova',
    role: 'Director of Cold Chain Logistics',
    organization: 'Crossdock Regional Refrigeration',
    location: 'Fort Wayne, IN',
    serviceCategory: 'Transcritical CO2 (R-744) Conversion',
    rating: 5,
    quote: 'Vertex transitioned our 120,000 sq. ft. frozen storage hub to transcritical CO2 without losing a single pallet of food inventory. Their telemetry diagnostics run continuously in the background, giving us complete peace of mind across our regulatory and environmental compliance mandates.',
    verificationBadge: 'Verified Project Dossier #2024-CLD-08'
  }
];
