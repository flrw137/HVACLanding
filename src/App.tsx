import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { AboutPage } from './pages/AboutPage';
import { FinancingPage } from './pages/FinancingPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="maintenance-plans" element={<MaintenancePage />} />
          <Route path="maintenance-process" element={<MaintenancePage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="reviews" element={<Navigate to="/case-studies" replace />} />
          <Route path="service-areas" element={<ServiceAreasPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="company-and-trust" element={<AboutPage />} />
          <Route path="financing" element={<FinancingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="request-consultation" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
