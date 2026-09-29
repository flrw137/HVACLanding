export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: {
    label: string;
    href: string;
    description: string;
    tag?: string;
  }[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  eyebrow: string;
  summary: string;
  description: string;
  heroImage: string;
  specs: {
    standard: string;
    responseSLA: string;
    warranty: string;
    balancingTolerance?: string;
  };
  features: string[];
  equipmentHandled: string[];
  deliverables: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CaseStudyDossier {
  id: string;
  slug: string;
  code: string;
  title: string;
  location: string;
  year: string;
  sector: 'Industrial' | 'Healthcare' | 'Class A Office' | 'Education' | 'Hospitality' | 'Cold Storage';
  sectorBadge: string;
  overview: string;
  facilityFootprint: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  equipmentSchedule: string[];
  outcome: string;
  image: string;
  fullNarrative?: string;
  challenge?: string;
  scopeOfWork?: string;
  executionPhases?: string[];
  verificationNotes?: string;
  relatedServiceSlugs?: string[];
}

export interface MaintenanceStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  deliverable: string;
  testingOrStandard: string;
}

export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  tag: string;
}

export interface MaintenanceTier {
  id: string;
  tierNumber: string;
  title: string;
  tagline: string;
  isPopular?: boolean;
  cadence: string;
  responseWindow: string;
  slaBadge: string;
  inclusions: string[];
  actionLabel: string;
}

export interface ServiceAreaHub {
  state: 'Indiana' | 'Ohio' | 'Kentucky';
  stateCode: string;
  city: string;
  code: string;
  isHQ?: boolean;
  address?: string;
  dispatchHotline: string;
  coverageRadius: string;
  avgResponseTime: string;
  keyFacilitiesServed: string[];
}

export interface ClientReview {
  id: string;
  author: string;
  role: string;
  organization: string;
  location: string;
  serviceCategory: string;
  rating: number;
  quote: string;
  verificationBadge: string;
}

export interface ConsultationSubmittal {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectClassification: string;
  facilityType: string;
  projectLocation: string;
  estimatedTimeline: string;
  budgetScope?: string;
  projectScope: string;
}
