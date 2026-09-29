import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-structural text-secondary font-body-sm text-body-sm">
      {/* Top Engineering Directory Grid */}
      <div className="max-w-[1320px] mx-auto px-margin lg:px-margin-desktop py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Corporate HQ (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2zm0 6l4.5 10H7.5L12 8z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface leading-none">
                  Vertex Solutions
                </span>
                <span className="font-label-mono-sm text-[10px] text-secondary uppercase tracking-widest mt-0.5">
                  Mechanical Engineering Corp.
                </span>
              </div>
            </Link>

            <p className="font-body-sm text-secondary leading-relaxed max-w-sm mt-1">
              Industrial and enterprise commercial mechanical HVAC engineering. We self-perform central chiller overhauls, high-efficiency hydronics, RTU rigging, cleanrooms, and predictive maintenance across the Midwest.
            </p>

            <div className="flex flex-col gap-2 pt-2 border-t border-structural">
              <div className="flex items-center gap-2 text-on-surface font-label-mono-sm text-[12px]">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>4200 Precision Way, Suite 800, Indianapolis, IN 46240</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface font-label-mono-sm text-[12px]">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:8005550194" className="hover:text-primary transition-colors font-semibold">
                  (800) 555-0194 (24/7 Regional Commercial Dispatch)
                </a>
              </div>
              <div className="flex items-center gap-2 text-on-surface font-label-mono-sm text-[12px]">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:estimating@vertexsolutionshvac.com" className="hover:text-primary transition-colors">
                  estimating@vertexsolutionshvac.com
                </a>
              </div>
            </div>
          </div>

          {/* Mechanical Services (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-mono-sm text-label-mono-sm uppercase text-on-surface font-bold tracking-wider">
              Mechanical Services
            </span>
            <ul className="space-y-2 font-body-sm">
              <li>
                <Link to="/services/ac-repair" className="hover:text-primary transition-colors">
                  Centrifugal &amp; Screw Chillers
                </Link>
              </li>
              <li>
                <Link to="/services/heating-furnace-repair" className="hover:text-primary transition-colors">
                  Industrial Boilers &amp; Hydronics
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-hvac" className="hover:text-primary transition-colors">
                  Packaged RTUs &amp; Crane Rigging
                </Link>
              </li>
              <li>
                <Link to="/services/indoor-air-quality" className="hover:text-primary transition-colors">
                  Critical Cleanrooms &amp; Sterile IAQ
                </Link>
              </li>
              <li>
                <Link to="/services/maintenance-tune-up" className="hover:text-primary transition-colors">
                  Predictive Telemetry &amp; TAB Tuning
                </Link>
              </li>
              <li>
                <Link to="/services/emergency-hvac-service" className="hover:text-primary transition-colors">
                  24/7 Emergency Master Mechanic Dispatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering Standards & Specs (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-mono-sm text-label-mono-sm uppercase text-on-surface font-bold tracking-wider">
              Engineering Protocols
            </span>
            <ul className="space-y-2 font-body-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>ASHRAE Standard 90.1 Compliance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>BIM &amp; Revit 3D Clash Fabrication</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>NEBB Certified Air &amp; Hydronic TAB</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>Predictive Laser Vibration Spectral Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>Decarbonization &amp; Heat Recovery Loops</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>ASME Section IV Certified Welds</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Service Areas (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-label-mono-sm text-label-mono-sm uppercase text-on-surface font-bold tracking-wider">
              Company &amp; Trust
            </span>
            <ul className="space-y-2 font-body-sm">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Why Choose Vertex
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-primary transition-colors">
                  Engineering Case Studies
                </Link>
              </li>
              <li>
                <Link to="/maintenance-plans" className="hover:text-primary transition-colors">
                  Maintenance Agreements
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="hover:text-primary transition-colors">
                  Midwest Hubs (IN · OH · KY)
                </Link>
              </li>
              <li>
                <Link to="/financing" className="hover:text-primary transition-colors">
                  Capital Models &amp; Rebates
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors font-semibold text-primary">
                  Request Intake Form →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regional Coverage & Certifications Band */}
        <div className="mt-12 pt-8 border-t border-structural flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5 max-w-xl">
            <span className="font-label-mono-sm text-[12px] uppercase text-on-surface font-semibold">
              Regional Coverage &amp; Response SLA
            </span>
            <p className="font-body-sm text-secondary">
              Dedicated engineering dispatch hubs in Indianapolis, Columbus, Cincinnati, Dayton, Louisville, and Lexington with guaranteed 2-hour Tier-1 uptime response SLAs.
            </p>
          </div>

          {/* Regulatory Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">ASHRAE 90.1</Badge>
            <Badge variant="neutral">NEBB TAB</Badge>
            <Badge variant="neutral">OSHA 30</Badge>
            <Badge variant="neutral">EPA UNIVERSAL</Badge>
            <Badge variant="neutral">ASME IV</Badge>
          </div>
        </div>
      </div>

      {/* Bottom Legal Sub-Footer */}
      <div className="w-full bg-surface-container border-t border-structural py-4 px-margin lg:px-margin-desktop">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-secondary font-label-mono-sm text-[11px]">
          <div>
            © {new Date().getFullYear()} Vertex Solutions Mechanical Engineering Corporation. Lic #HVAC-MECH-48209. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-on-surface transition-colors">
              Safety Protocols
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-on-surface transition-colors">
              Engineering Licensure
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-on-surface transition-colors">
              Commercial Confidentiality / NDA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
