/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoShowcase } from './components/LogoShowcase';
import { AboutSection } from './components/AboutSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkProcessSection } from './components/WorkProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { SocialConnectSection } from './components/SocialConnectSection';
import { ContactSection } from './components/ContactSection';
import { ContactAnnouncementBanner } from './components/ContactAnnouncementBanner';
import { Footer } from './components/Footer';
import { CASE_STUDIES, CaseStudy } from './data/caseStudies';
import { scrollToSection } from './utils/scroll';
import { submitLead } from './services/leadSubmission';

const CaseStudyDetailModal = React.lazy(() =>
  import('./components/CaseStudyDetailModal').then((module) => ({
    default: module.CaseStudyDetailModal,
  }))
);

const StrategyCallModal = React.lazy(() =>
  import('./components/StrategyCallModal').then((module) => ({
    default: module.StrategyCallModal,
  }))
);

const AdminDashboard = React.lazy(() =>
  import('./components/admin/AdminDashboard').then((module) => ({
    default: module.AdminDashboard,
  }))
);

const AdminLogin = React.lazy(() =>
  import('./components/admin/AdminLogin').then((module) => ({
    default: module.AdminLogin,
  }))
);

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [serviceInquiry, setServiceInquiry] = useState<string | undefined>(undefined);

  // Handle client-side routing and popstate
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (target && target.getAttribute('href') === '/admin') {
        e.preventDefault();
        window.history.pushState({}, '', '/admin');
        setCurrentPath('/admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Check admin authentication when visiting /admin
  React.useEffect(() => {
    if (currentPath.startsWith('/admin')) {
      fetch('/api/admin/me')
        .then(async (res) => {
          if (!res.ok) return { authenticated: false };
          try {
            return await res.json();
          } catch {
            return { authenticated: false };
          }
        })
        .then((data) => {
          setIsAdminAuthenticated(Boolean(data?.authenticated));
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, [currentPath]);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      setIsAdminAuthenticated(false);
    }
  };

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleOpenContact = (prefilledService?: string) => {
    if (prefilledService) {
      setServiceInquiry(prefilledService);
    }

    scrollToSection('contact');
  };

  const handleExploreWork = () => {
    scrollToSection('case-studies');
  };

  const handleSelectCaseStudyBySlug = (slug: string) => {
    const found = CASE_STUDIES.find((c) => c.slug === slug);
    if (found) {
      setSelectedCaseStudy(found);
    }
  };

  if (currentPath.startsWith('/admin')) {
    return (
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-[#070A10] flex items-center justify-center text-lime-400 font-mono text-sm">
            Loading Zahidul Pro CRM...
          </div>
        }
      >
        {isAdminAuthenticated ? (
          <AdminDashboard
            onLogout={handleAdminLogout}
            onBackToSite={() => navigateTo('/')}
          />
        ) : (
          <AdminLogin
            onSuccess={() => setIsAdminAuthenticated(true)}
            onBackToSite={() => navigateTo('/')}
          />
        )}
      </React.Suspense>
    );
  }

  return (
    <div className="min-h-screen text-[#09090B] flex flex-col font-sans relative bg-[#FAFAFA] overflow-x-hidden">
      {/* Top Minimal Brand Bar + Signature Floating Bottom Glass Dock */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Content Flow — Design Monks Editorial Light/Dark Section Rhythm */}
      <main className="flex-1 relative z-10 overflow-x-hidden">
        {/* 1. Hero Section — Dark Obsidian (#06070B) */}
        <div id="home">
          <Hero
            onOpenBooking={handleOpenBooking}
            onExploreWork={handleExploreWork}
          />
        </div>

        {/* 2. Platforms & Measurement Marquee — Light (#FFFFFF) */}
        <LogoShowcase />

        {/* 3. About Zahidul Islam, Impact Metrics & Who I Help Bento — Light (#FAFAFA) */}
        <AboutSection
          onOpenBooking={handleOpenBooking}
          onExploreWork={handleExploreWork}
        />

        {/* 4. Verified Campaign Results (4 Stacked Sticky Editorial Cards + All 12 Grid) — Light (#FFFFFF) */}
        <CaseStudiesSection
          onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Core Capabilities & Services — High-Contrast Dark Obsidian (#07080D) */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onSelectCaseStudyBySlug={handleSelectCaseStudyBySlug}
          onSelectServiceForInquiry={(serviceName) =>
            handleOpenContact(serviceName)
          }
        />

        {/* 6. Our 4-Step Work Process — Light (#FAFAFA) */}
        <WorkProcessSection
          onOpenBooking={handleOpenBooking}
          onRequestAudit={() =>
            handleOpenContact('Google Ads Audit & Optimization')
          }
        />

        {/* 7. Restored Original Client Testimonials — Light (#FFFFFF) */}
        <TestimonialsSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 8. Frequently Asked Questions Accordion — Light (#FAFAFA) */}
        <FaqSection />

        {/* 9. Verified Profiles & Networks — Light (#FFFFFF) */}
        <SocialConnectSection />

        {/* 10. Executive Contact Card — Floating Dark Obsidian Card on Light (#FAFAFA) */}
        <ContactSection
          onOpenBooking={handleOpenBooking}
          initialService={serviceInquiry}
        />

        {/* 10. Announcement Ticker Pill — Light (#FAFAFA) */}
        <ContactAnnouncementBanner />
      </main>

      {/* 11. Monumental Wordmark Footer — Dark Obsidian (#05060A) */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenContact={handleOpenContact}
      />

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <React.Suspense fallback={null}>
          <CaseStudyDetailModal
            caseStudy={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
            onOpenBooking={handleOpenBooking}
            onSelectCaseStudy={setSelectedCaseStudy}
          />
        </React.Suspense>
      )}

      {/* Strategy Call Scheduling Modal */}
      {isBookingModalOpen && (
        <React.Suspense fallback={null}>
          <StrategyCallModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            onSubmit={async (request) => {
              await submitLead({
                source: 'consultation_popup',
                fullName: request.name,
                email: request.email,
                whatsapp: request.whatsappNumber,
                websiteUrl: request.website,
                service: request.service,
                monthlyBudget: request.monthlyBudget,
                projectDetails: request.notes,
                honeypot: request.honeypot,
                formLoadedAt: request.formLoadedAt,
              });
            }}
          />
        </React.Suspense>
      )}
    </div>
  );
}
