import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';

export const Layout: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest text-on-surface">
      <ScrollToTop />
      <Navbar />
      {/* 
        Fixed Navbar offset:
        Utility bar: 32px
        Main navbar: 72px
        Total: 104px (sm and above), 72px (xs where utility bar is hidden)
      */}
      <main className="flex-1 w-full pt-[72px] sm:pt-[104px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
