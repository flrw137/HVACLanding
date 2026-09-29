import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const DispatchDirectory: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Fast-Track Contact Card */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-structural shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-structural">
          <span className="font-label-mono-sm text-label-mono-sm text-secondary uppercase font-semibold">
            Fast-Track Directory
          </span>
          <span className="font-label-mono-sm text-[11px] text-primary bg-[#ffdad8] px-2 py-0.5 rounded font-semibold">
            SLA &lt; 4 Hours
          </span>
        </div>

        <div className="space-y-4 font-body-sm">
          {/* 24/7 Hotline */}
          <div className="bg-surface-container-low p-4 rounded-lg border border-structural flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary block">
                24/7 Commercial Emergency Dispatch
              </span>
              <a
                href="tel:8005550194"
                className="font-headline-sm text-[20px] text-on-surface hover:text-primary font-bold transition-colors block mt-0.5"
              >
                (800) 555-0194
              </a>
              <span className="text-[12px] text-secondary block mt-0.5">
                Guaranteed 2-hour on-site response for contract accounts
              </span>
            </div>
          </div>

          {/* Estimating Direct */}
          <div className="flex items-start gap-3 pt-2">
            <Phone className="w-4 h-4 text-primary shrink-0 mt-1" />
            <div>
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary block">
                Commercial Estimating &amp; Engineering Desk
              </span>
              <a href="tel:3175550140" className="text-on-surface font-semibold hover:text-primary transition-colors">
                (317) 555-0140
              </a>
            </div>
          </div>

          {/* Inboxes */}
          <div className="flex items-start gap-3 pt-2">
            <Mail className="w-4 h-4 text-primary shrink-0 mt-1" />
            <div>
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary block">
                Direct Submittal Inboxes
              </span>
              <a
                href="mailto:estimating@vertexsolutionshvac.com"
                className="text-primary hover:underline block text-[13px] font-medium"
              >
                estimating@vertexsolutionshvac.com
              </a>
              <a
                href="mailto:service@vertexsolutionshvac.com"
                className="text-secondary hover:text-on-surface block text-[13px]"
              >
                service@vertexsolutionshvac.com
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div className="flex items-start gap-3 pt-2">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
            <div>
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary block">
                Corporate Engineering Headquarters
              </span>
              <span className="text-on-surface text-[13px] block">
                4820 Innovation Parkway, Suite 100, Indianapolis, IN 46268
              </span>
              <span className="text-[11px] text-secondary">Serving IN, OH, KY regional territory</span>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3 pt-2">
            <Clock className="w-4 h-4 text-primary shrink-0 mt-1" />
            <div>
              <span className="font-label-mono-sm text-[11px] uppercase text-secondary block">
                Engineering Desk Hours
              </span>
              <span className="text-on-surface text-[13px] block">
                Mon–Fri 7:00 AM – 5:00 PM EST
              </span>
              <span className="text-[11px] text-primary font-medium">
                (Continuous 24/7 on-call field operations 365 days/year)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Operations Hubs */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-structural space-y-4">
        <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary font-semibold block">
          Tri-State Dispatch Hubs
        </span>

        <div className="space-y-3 font-label-mono-sm text-[12px]">
          <div>
            <span className="text-primary font-bold">INDIANA:</span>
            <div className="text-secondary text-[11px] mt-0.5">
              Indianapolis (Central HQ) • Fort Wayne • Evansville
            </div>
          </div>
          <div>
            <span className="text-primary font-bold">OHIO:</span>
            <div className="text-secondary text-[11px] mt-0.5">
              Columbus • Cincinnati • Dayton
            </div>
          </div>
          <div>
            <span className="text-primary font-bold">KENTUCKY:</span>
            <div className="text-secondary text-[11px] mt-0.5">
              Louisville • Lexington • Covington / N. Kentucky
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
