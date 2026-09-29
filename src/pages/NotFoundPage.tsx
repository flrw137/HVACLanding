import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-20 px-margin">
      <SEO title="Page Not Found | Vertex Solutions" />
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-low border border-structural flex items-center justify-center mx-auto text-primary">
          <Wrench className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="font-label-mono-sm text-[12px] uppercase tracking-wider text-primary font-bold">
            ERROR 404 // DIAGNOSTIC ROUTE FAULT
          </span>
          <h1 className="font-headline-lg text-on-surface font-bold">
            Specification Page Not Found
          </h1>
          <p className="font-body-md text-secondary leading-relaxed">
            The mechanical engineering specification or route requested does not exist in the active telemetry registry.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto bg-primary-container hover:bg-primary text-on-primary font-button-text px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto bg-white hover:bg-surface text-on-surface border border-structural font-button-text px-5 py-3 rounded-lg font-semibold inline-flex items-center justify-center transition-colors"
          >
            <span>View All Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
