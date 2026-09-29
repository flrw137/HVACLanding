import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lock, AlertCircle } from 'lucide-react';
import { ConsultationSubmittal } from '../../types';

export const SubmittalForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTier = searchParams.get('tier');

  const [formData, setFormData] = useState<ConsultationSubmittal>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectClassification: initialTier ? 'Preventive Maintenance Agreement' : '',
    facilityType: '',
    projectLocation: '',
    estimatedTimeline: '',
    budgetScope: '',
    projectScope: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.projectScope.trim().length < 25) {
      setErrorMessage('Please provide at least 25 characters describing your project scope or equipment parameters.');
      return;
    }

    setIsSubmitting(true);

    // Simulate verified submittal routing to engineering desk
    setTimeout(() => {
      const randomTicket = `VTX-PE-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(randomTicket);
      setIsSubmitting(false);
    }, 800);
  };

  const resetForm = () => {
    setSubmittedTicket(null);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      projectClassification: '',
      facilityType: '',
      projectLocation: '',
      estimatedTimeline: '',
      budgetScope: '',
      projectScope: '',
    });
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl border border-structural shadow-sm relative">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-space-md mb-space-lg bg-surface-container-low p-4 rounded-lg border border-structural">
        <div>
          <span className="font-label-mono-sm text-label-mono-sm text-secondary uppercase block">
            Protocol Intake
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface">
            Submittal Specification Form
          </span>
        </div>
        <span className="font-label-mono-sm text-label-mono-sm px-2.5 py-1 bg-surface-container-lowest rounded text-secondary font-medium border border-structural">
          REV 4.2
        </span>
      </div>

      {/* Confirmation Modal */}
      {submittedTicket && (
        <div className="p-8 rounded-lg bg-surface-container-low border border-primary-container text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-headline-md text-on-surface font-bold">
            Submittal Received &amp; Encrypted
          </h3>
          <p className="font-body-md text-secondary max-w-lg mx-auto leading-relaxed">
            Your commercial specifications have been routed to our Lead Project Engineer (Robert Keller, P.E.). A preliminary scope assessment and diagnostic plan will be delivered within 4 business hours.
          </p>
          <div className="bg-white p-4 rounded-lg border border-structural inline-block font-label-mono-sm text-left text-[12px] space-y-1">
            <div>
              <span className="text-secondary uppercase">Assigned Ticket:</span>{' '}
              <strong className="text-primary font-bold">{submittedTicket}</strong>
            </div>
            <div>
              <span className="text-secondary uppercase">Direct Dispatch Queue:</span>{' '}
              <span className="text-on-surface font-semibold">Indianapolis Central Plant Operations</span>
            </div>
            <div>
              <span className="text-secondary uppercase">SLA Response Window:</span>{' '}
              <span className="text-on-surface font-semibold">&lt; 4 Hours Guaranteed</span>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={resetForm}
              className="bg-white hover:bg-surface text-on-surface border border-structural font-button-text px-5 py-2 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Submit Another Technical Request
            </button>
          </div>
        </div>
      )}

      {/* Main Intake Form */}
      {!submittedTicket && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Row 1: Full Name & Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="fullName"
              >
                Full Name <span className="text-primary-container">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Michael Turner"
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface placeholder:text-secondary/60 font-body-md text-body-md shadow-xs"
              />
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Project representative or facilities director
              </span>
            </div>

            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="companyName"
              >
                Company / Facility Name <span className="text-primary-container">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Meridian Logistics Center"
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface placeholder:text-secondary/60 font-body-md text-body-md shadow-xs"
              />
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Entity holding commercial property title
              </span>
            </div>
          </div>

          {/* Row 2: Business Email & Direct Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="email"
              >
                Business Email Address <span className="text-primary-container">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface placeholder:text-secondary/60 font-body-md text-body-md shadow-xs"
              />
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Official corporate correspondence address
              </span>
            </div>

            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="phone"
              >
                Direct Phone Number <span className="text-primary-container">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface placeholder:text-secondary/60 font-body-md text-body-md shadow-xs"
              />
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Direct cell or facility engineering desk
              </span>
            </div>
          </div>

          {/* Row 3: Project Classification & Facility Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="projectClassification"
              >
                Project Classification <span className="text-primary-container">*</span>
              </label>
              <select
                id="projectClassification"
                name="projectClassification"
                required
                value={formData.projectClassification}
                onChange={handleChange}
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface font-body-md text-body-md shadow-xs cursor-pointer"
              >
                <option value="">Select mechanical scope...</option>
                <option value="New Commercial Installation">New Commercial Installation</option>
                <option value="Plant Retrofit & Modernization">Plant Retrofit &amp; Modernization</option>
                <option value="Preventive Maintenance Agreement">Preventive Maintenance Agreement</option>
                <option value="Emergency Mechanical Repair">Emergency Mechanical Repair</option>
                <option value="Chilled Water System Upgrade">Chilled Water System Upgrade</option>
                <option value="Energy & TAB Audit">Energy &amp; TAB Audit</option>
              </select>
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Primary engineering classification
              </span>
            </div>

            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="facilityType"
              >
                Building / Facility Type <span className="text-primary-container">*</span>
              </label>
              <select
                id="facilityType"
                name="facilityType"
                required
                value={formData.facilityType}
                onChange={handleChange}
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface font-body-md text-body-md shadow-xs cursor-pointer"
              >
                <option value="">Select environmental profile...</option>
                <option value="Industrial Logistics / Distribution Center">
                  Industrial Logistics / Distribution Center
                </option>
                <option value="Healthcare / Surgical Suite / Hospital">
                  Healthcare / Surgical Suite / Hospital
                </option>
                <option value="Pharmaceutical Cleanroom / BSL Lab">
                  Pharmaceutical Cleanroom / BSL Lab
                </option>
                <option value="Class A Multi-Story Office">Class A Multi-Story Office</option>
                <option value="Educational Campus / DOAS">Educational Campus / DOAS</option>
                <option value="Cold Storage & Blast Refrigeration">
                  Cold Storage &amp; Blast Refrigeration
                </option>
                <option value="Manufacturing / Foundry CNC">Manufacturing / Foundry CNC</option>
              </select>
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Operational environmental envelope
              </span>
            </div>
          </div>

          {/* Row 4: Location & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="projectLocation"
              >
                Project Location (City, State) <span className="text-primary-container">*</span>
              </label>
              <input
                id="projectLocation"
                name="projectLocation"
                type="text"
                required
                value={formData.projectLocation}
                onChange={handleChange}
                placeholder="e.g. Columbus, OH"
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface placeholder:text-secondary/60 font-body-md text-body-md shadow-xs"
              />
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Midwest Region (IN · OH · KY territory)
              </span>
            </div>

            <div className="space-y-1.5">
              <label
                className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
                htmlFor="estimatedTimeline"
              >
                Estimated Timeline / Urgency <span className="text-primary-container">*</span>
              </label>
              <select
                id="estimatedTimeline"
                name="estimatedTimeline"
                required
                value={formData.estimatedTimeline}
                onChange={handleChange}
                className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface font-body-md text-body-md shadow-xs cursor-pointer"
              >
                <option value="">Deployment window...</option>
                <option value="Immediate Critical Emergency Dispatch">
                  Immediate Critical Emergency Dispatch
                </option>
                <option value="30-Day Mobilization Window">30-Day Mobilization Window</option>
                <option value="Q1/Q2 Planned Capital Upgrade">Q1/Q2 Planned Capital Upgrade</option>
                <option value="Preliminary Feasibility & RFP Review">
                  Preliminary Feasibility &amp; RFP Review
                </option>
              </select>
              <span className="font-label-mono-sm text-[11px] text-secondary block">
                Target engineering mobilization date
              </span>
            </div>
          </div>

          {/* Row 5: Capital Budget (Optional) */}
          <div className="space-y-1.5">
            <label
              className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
              htmlFor="budgetScope"
            >
              Target Capital Allocation / Budget <span className="text-secondary">(Optional)</span>
            </label>
            <select
              id="budgetScope"
              name="budgetScope"
              value={formData.budgetScope}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface font-body-md text-body-md shadow-xs cursor-pointer"
            >
              <option value="">Select approximate scope threshold...</option>
              <option value="Under $50,000">Under $50,000</option>
              <option value="$50,000 – $150,000">$50,000 – $150,000</option>
              <option value="$150,000 – $500,000">$150,000 – $500,000</option>
              <option value="$500,000+ Enterprise Central Plant">
                $500,000+ Enterprise Central Plant
              </option>
            </select>
            <span className="font-label-mono-sm text-[11px] text-secondary block">
              Assists our engineering team in selecting appropriate equipment schedules
            </span>
          </div>

          {/* Row 6: Project Scope & Specs Textarea */}
          <div className="space-y-1.5">
            <label
              className="block font-label-technical text-label-technical uppercase text-on-surface tracking-wider"
              htmlFor="projectScope"
            >
              Project Scope &amp; Equipment Specifications <span className="text-primary-container">*</span>
            </label>
            <textarea
              id="projectScope"
              name="projectScope"
              required
              rows={4}
              value={formData.projectScope}
              onChange={handleChange}
              placeholder="Include equipment makes/models (e.g. York YK Centrifugal, Trane Intellipak), tonnage ratings, BACnet integration requirements, mechanical room clearance constraints, or observable operational symptoms..."
              className="w-full p-3.5 bg-surface-container-lowest rounded-lg border border-[#cbd0d8] text-on-surface placeholder:text-secondary/60 font-body-md text-body-md shadow-xs"
            ></textarea>
            <span className="font-label-mono-sm text-[11px] text-secondary block">
              Minimum 25 characters. Attach telemetry logs, mechanical schematics, or photos upon PE dispatch outreach.
            </span>
          </div>

          {/* Submit Action & Confidentiality */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-primary-container hover:bg-primary text-on-primary font-button-text text-button-text px-8 py-3.5 rounded-lg shadow-sm transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer font-semibold disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Encrypting & Routing...' : 'Submit Request for Review'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-secondary font-label-mono-sm text-[11px]">
              <Lock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Commercial NDA encrypted transmission</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
