import { ServiceAreaHub } from '../types';

export const SERVICE_HUBS: ServiceAreaHub[] = [
  // Indiana
  {
    state: 'Indiana',
    stateCode: 'IN',
    city: 'Indianapolis',
    code: 'IND',
    isHQ: true,
    address: '4200 Precision Way, Suite 800, Indianapolis, IN 46240',
    dispatchHotline: '(317) 555-0140',
    coverageRadius: '75-mile radius (Marion, Hamilton, Boone, Hendricks, Johnson, Hancock counties)',
    avgResponseTime: '38 Minutes',
    keyFacilitiesServed: [
      'St. Jude Ambulatory Clinic',
      'Eli Lilly Biomedical District Facilities',
      'Meridian Commercial Office Corridor',
      'Indianapolis International Air Cargo Logistics Hub'
    ]
  },
  {
    state: 'Indiana',
    stateCode: 'IN',
    city: 'Fort Wayne',
    code: 'FW',
    address: '2100 Meyer Road, Fort Wayne, IN 46803',
    dispatchHotline: '(800) 555-0194',
    coverageRadius: '50-mile radius (Allen, DeKalb, Whitley, Huntington counties)',
    avgResponseTime: '45 Minutes',
    keyFacilitiesServed: [
      'Crossdock Regional Food Logistics & Cold Chain',
      'General Motors Assembly Supply Chain Warehouses',
      'Parkview Regional Medical Sub-Centres'
    ]
  },
  {
    state: 'Indiana',
    stateCode: 'IN',
    city: 'Evansville',
    code: 'EVV',
    address: '1400 N Royal Ave, Evansville, IN 47715',
    dispatchHotline: '(800) 555-0194',
    coverageRadius: '45-mile radius (Vanderburgh, Warrick, Posey, Gibson counties)',
    avgResponseTime: '48 Minutes',
    keyFacilitiesServed: [
      'Ohio River Industrial Chemical Process Plants',
      'Deaconess Gateway Hospital Support Buildings',
      'CenterPoint Energy Regional Substations'
    ]
  },
  // Ohio
  {
    state: 'Ohio',
    stateCode: 'OH',
    city: 'Columbus',
    code: 'COL',
    address: '6500 Busch Blvd, Suite 210, Columbus, OH 43229',
    dispatchHotline: '(614) 555-0178',
    coverageRadius: '60-mile radius (Franklin, Delaware, Licking, Fairfield, Union counties)',
    avgResponseTime: '40 Minutes',
    keyFacilitiesServed: [
      'Apex Freight Fulfillment Center (420,000 sq ft)',
      'Rickenbacker Global Logistics Air Hub',
      'Ohio State University Research Annex Facilities'
    ]
  },
  {
    state: 'Ohio',
    stateCode: 'OH',
    city: 'Cincinnati',
    code: 'CIN',
    address: '4600 Duke Drive, Suite 150, Mason, OH 45040',
    dispatchHotline: '(513) 555-0182',
    coverageRadius: '55-mile radius (Hamilton, Butler, Warren, Clermont counties)',
    avgResponseTime: '42 Minutes',
    keyFacilitiesServed: [
      'Oakridge Educational Campus Hydronic Plants',
      'Sharonville Industrial Automotive Plants',
      'Downtown Cincinnati High-Rise Commercial Towers'
    ]
  },
  {
    state: 'Ohio',
    stateCode: 'OH',
    city: 'Dayton',
    code: 'DAY',
    address: '3200 Research Blvd, Kettering, OH 45420',
    dispatchHotline: '(937) 555-0164',
    coverageRadius: '45-mile radius (Montgomery, Greene, Miami, Clark counties)',
    avgResponseTime: '39 Minutes',
    keyFacilitiesServed: [
      'Foundry Precision CNC Thermal Containment',
      'Wright-Patterson Aerospace Contractor Facilities',
      'Miami Valley Hospital Outpatient Centers'
    ]
  },
  // Kentucky
  {
    state: 'Kentucky',
    stateCode: 'KY',
    city: 'Louisville',
    code: 'LOU',
    address: '9900 Corporate Campus Dr, Suite 3000, Louisville, KY 40223',
    dispatchHotline: '(502) 555-0155',
    coverageRadius: '55-mile radius (Jefferson, Oldham, Bullitt, Shelby counties)',
    avgResponseTime: '41 Minutes',
    keyFacilitiesServed: [
      'Keystone Tower (16-Story Commercial Rooftop Modernization)',
      'UPS Worldport Auxiliary Ground Infrastructure',
      'Norton Healthcare Suburban Complex'
    ]
  },
  {
    state: 'Kentucky',
    stateCode: 'KY',
    city: 'Lexington',
    code: 'LEX',
    address: '2400 Fortune Drive, Suite 120, Lexington, KY 40509',
    dispatchHotline: '(859) 555-0199',
    coverageRadius: '50-mile radius (Fayette, Scott, Woodford, Madison counties)',
    avgResponseTime: '44 Minutes',
    keyFacilitiesServed: [
      'BioVance BSL-3 Cleanroom Dynamic Pressure Facilities',
      'Coldstream Research Campus Pharmaceutical Labs',
      'Toyota Motor Manufacturing Regional Support Nodes'
    ]
  },
  {
    state: 'Kentucky',
    stateCode: 'KY',
    city: 'Covington / N. Kentucky',
    code: 'CVG',
    address: '100 E RiverCenter Blvd, Suite 400, Covington, KY 41011',
    dispatchHotline: '(800) 555-0194',
    coverageRadius: '35-mile radius (Kenton, Campbell, Boone counties & Greater Cincinnati link)',
    avgResponseTime: '36 Minutes',
    keyFacilitiesServed: [
      'CVG Global Cargo Fulfillment Terminals',
      'RiverCenter Commercial Waterfront Complexes',
      'St. Elizabeth Healthcare Primary Plants'
    ]
  }
];
