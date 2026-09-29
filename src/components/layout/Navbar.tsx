import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/servicesData';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', to: '/' },
    { label: 'Services', to: '/services', hasDropdown: true },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Maintenance Process', to: '/maintenance-plans' },
    { label: 'Service Areas', to: '/service-areas' },
    { label: 'Why Choose Us', to: '/about' },
    { label: 'Financing', to: '/financing' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-structural transition-shadow duration-200">
      {/* Top Utility Dispatch Strip */}
      <div className="h-8 w-full bg-surface-container-low border-b border-structural px-margin lg:px-margin-desktop hidden sm:block">
        <div className="max-w-[1320px] mx-auto h-full flex items-center justify-between font-label-mono-sm text-label-mono-sm text-secondary">
          <div className="flex items-center gap-space-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            <span>Midwest Regional Engineering (IN · OH · KY) • Lic #HVAC-MECH-48209</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span>24/7 Commercial Dispatch:</span>
            <a
              href="tel:8005550194"
              className="font-label-technical text-label-technical text-on-surface hover:text-primary transition-colors font-medium"
            >
              (800) 555-0194
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`h-[72px] max-w-[1320px] mx-auto px-margin lg:px-margin-desktop flex items-center justify-between transition-all ${isScrolled ? 'shadow-xs' : ''}`}>
        {/* Brand Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-white shrink-0 group-hover:bg-primary transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2zm0 6l4.5 10H7.5L12 8z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface leading-none">
              Vertex Solutions
            </span>
            <span className="xl:hidden font-label-mono-sm text-[10px] text-secondary uppercase tracking-widest mt-0.5">
              Mechanical &amp; Industrial HVAC
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 h-full">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.to}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `h-full inline-flex items-center gap-1 border-b-2 font-button-text text-button-text transition-colors ${
                        isActive || location.pathname.startsWith('/services')
                          ? 'text-on-surface border-primary-container font-semibold'
                          : 'text-secondary hover:text-on-surface border-transparent'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </NavLink>

                  {/* Mega Dropdown */}
                  {isServicesOpen && (
                    <div className="absolute top-[71px] left-1/2 -translate-x-1/2 w-[540px] bg-white border border-structural rounded-lg shadow-xl p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="col-span-2 pb-2 mb-1 border-b border-structural flex items-center justify-between text-secondary font-label-mono-sm text-[11px] uppercase">
                        <span>Commercial HVAC Disciplines</span>
                        <Link to="/services" className="text-primary hover:underline font-semibold">
                          View All Services →
                        </Link>
                      </div>
                      {SERVICES.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.slug}`}
                          className="p-2.5 rounded-md hover:bg-surface-container-low transition-colors group flex flex-col"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-container group-hover:scale-125 transition-transform"></span>
                            <span className="font-button-text text-[13px] font-semibold text-on-surface group-hover:text-primary transition-colors">
                              {s.shortTitle}
                            </span>
                          </div>
                          <span className="text-[11px] text-secondary line-clamp-1 mt-0.5 ml-3.5">
                            {s.summary}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `h-full inline-flex items-center border-b-2 font-button-text text-button-text transition-colors ${
                    isActive
                      ? 'text-on-surface border-primary-container font-semibold'
                      : 'text-secondary hover:text-on-surface border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right CTA Cluster */}
        <div className="flex items-center gap-3 xl:ml-2">
          <Link
            to="/contact"
            className="bg-primary-container hover:bg-primary text-on-primary font-button-text text-button-text px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-colors flex items-center justify-center shadow-none text-[13px] sm:text-[14px]"
          >
            <span>Request Consultation</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors ml-1"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-structural px-margin py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="bg-surface-container-low p-3 rounded-lg border border-structural font-label-mono-sm text-[12px] flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                24/7 Dispatch Hotline
              </span>
              <a href="tel:8005550194" className="font-semibold text-primary">
                (800) 555-0194
              </a>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-2.5 px-3 rounded-lg font-button-text text-[15px] transition-colors ${
                        isActive
                          ? 'bg-surface-container-low text-primary font-semibold'
                          : 'text-on-surface hover:bg-surface-container-lowest'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </NavLink>
                </div>
              ))}
            </div>

            {/* Subservices Quick Links in Mobile */}
            <div className="pt-2 border-t border-structural">
              <span className="font-label-mono-sm text-[11px] uppercase tracking-wider text-secondary block mb-2 px-3">
                Core HVAC Services
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {SERVICES.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="py-2 px-3 rounded text-[13px] text-secondary hover:text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span>{s.shortTitle}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-structural flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="w-full bg-primary-container hover:bg-primary text-on-primary font-button-text py-3 rounded-lg text-center font-semibold transition-colors"
              >
                Schedule Site Assessment
              </Link>
              <a
                href="tel:8005550194"
                className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface border border-structural font-button-text py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Call Emergency Line (800) 555-0194</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
