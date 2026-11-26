/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoShowcase } from './components/LogoShowcase';
import { AboutSection } from './components/AboutSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { CaseStudiesPage } from './components/CaseStudiesPage';
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
import {
  APP_NAVIGATE_EVENT,
  CASE_STUDIES_PATH,
  HOME_PATH,
  type AppRoute,
  navigateToPath,
  normalizeRoute,
} from './utils/routing';
import { syncDocumentSeo } from './utils/seo';
import { submitLead } from './services/leadSubmission';
import {
  trackCaseStudyClick,
  trackLeadSubmission,
  trackPageView,
} from './utils/tracking';

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

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps = {}) {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    normalizeRoute(
      initialPath ??
        (typeof window !== 'undefined' ? window.location.pathname : HOME_PATH)
    )
  );
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [serviceInquiry, setServiceInquiry] = useState<string | undefined>(undefined);
  const pendingHashRef = useRef<string | null>(null);
  const previousRouteRef = useRef<AppRoute>(currentRoute);

  const scrollToTopImmediate = useCallback(() => {
    if (typeof window === 'undefined') return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (pos: number, opts?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  // Track initial page load, SPA history navigation, SEO updates, and browser back/forward
  useEffect(() => {
    const initialRoute = normalizeRoute(window.location.pathname);
    setCurrentRoute(initialRoute);
    syncDocumentSeo(initialRoute);
    trackPageView();

    const syncRouteAndTrack = () => {
      const nextRoute = normalizeRoute(window.location.pathname);
      syncDocumentSeo(nextRoute);
      setCurrentRoute(nextRoute);
      trackPageView();
    };

    const handleAppNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ pathname?: string; hash?: string }>;
      const nextRoute = normalizeRoute(
        customEvent.detail?.pathname ?? window.location.pathname
      );
      if (customEvent.detail?.hash) {
        pendingHashRef.current = customEvent.detail.hash;
      }
      syncDocumentSeo(nextRoute);
      setCurrentRoute(nextRoute);
    };

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = (...args) => {
      originalPushState(...args);
      syncRouteAndTrack();
    };

    window.history.replaceState = (...args) => {
      originalReplaceState(...args);
      const nextRoute = normalizeRoute(window.location.pathname);
      syncDocumentSeo(nextRoute);
      trackPageView();
    };

    window.addEventListener('popstate', syncRouteAndTrack);
    window.addEventListener(APP_NAVIGATE_EVENT, handleAppNavigate);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', syncRouteAndTrack);
      window.removeEventListener(APP_NAVIGATE_EVENT, handleAppNavigate);
    };
  }, []);

  // Handle scroll positioning after route transitions
  useEffect(() => {
    const routeChanged = previousRouteRef.current !== currentRoute;
    previousRouteRef.current = currentRoute;

    if (pendingHashRef.current) {
      const targetHash = pendingHashRef.current;
      pendingHashRef.current = null;
      requestAnimationFrame(() => {
        scrollToSection(targetHash);
      });
      return;
    }

    if (routeChanged) {
      if (window.location.hash && window.location.hash !== '#home') {
        const hash = window.location.hash;
        requestAnimationFrame(() => {
          scrollToSection(hash);
        });
      } else {
        scrollToTopImmediate();
      }
    }
  }, [currentRoute, scrollToTopImmediate]);

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
    if (currentRoute === 'case-studies') {
      scrollToSection('portfolio-grid');
      return;
    }
    navigateToPath(CASE_STUDIES_PATH);
  };

  const handleNavigateHome = () => {
    if (currentRoute === 'home') {
      scrollToSection('#home');
      return;
    }
    navigateToPath(HOME_PATH);
  };

  const handleNavigate = (href: string) => {
    const normalized = href.trim();

    if (
      normalized === CASE_STUDIES_PATH ||
      normalized === '/case-studies'
    ) {
      if (currentRoute === 'case-studies') {
        scrollToSection('#home');
      } else {
        navigateToPath(CASE_STUDIES_PATH);
      }
      return;
    }

    if (normalized === HOME_PATH || normalized === '#home') {
      if (currentRoute === 'case-studies') {
        navigateToPath(HOME_PATH);
      } else {
        scrollToSection('#home');
      }
      return;
    }

    if (normalized === '#contact') {
      scrollToSection('#contact');
      return;
    }

    if (normalized.startsWith('/#')) {
      const hash = normalized.slice(1);
      if (currentRoute === 'home') {
        scrollToSection(hash);
      } else {
        pendingHashRef.current = hash;
        navigateToPath(HOME_PATH, hash);
      }
      return;
    }

    if (normalized.startsWith('#')) {
      if (currentRoute === 'home') {
        scrollToSection(normalized);
      } else {
        pendingHashRef.current = normalized;
        navigateToPath(HOME_PATH, normalized);
      }
      return;
    }

    scrollToSection(normalized);
  };

  const handleSelectCaseStudyBySlug = (slug: string) => {
    const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
    if (idx !== -1) {
      const found = CASE_STUDIES[idx];
      trackCaseStudyClick({
        caseStudyName: found.title,
        caseStudyCategory: found.category,
        caseStudyPosition: idx + 1,
      });
      setSelectedCaseStudy(found);
    }
  };

  return (
    <div className="min-h-screen text-[#09090B] flex flex-col font-sans relative bg-[#FAFAFA] overflow-x-hidden">
      {/* Top Minimal Brand Bar + Signature Floating Bottom Glass Dock */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Content Flow — Design Monks Editorial Light/Dark Section Rhythm */}
      <main className="flex-1 relative z-10 overflow-x-hidden">
        {currentRoute === 'case-studies' ? (
          <CaseStudiesPage
            onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)}
            onOpenBooking={handleOpenBooking}
            onNavigateHome={handleNavigateHome}
            initialService={serviceInquiry}
          />
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* 11. Monumental Wordmark Footer — Dark Obsidian (#05060A) */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenContact={handleOpenContact}
        onNavigate={handleNavigate}
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
              const result = await submitLead({
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

              trackLeadSubmission({
                formType: 'strategy_call_form',
                leadId: result.submissionId,
                submissionTimestamp: result.submittedAt,
                fullName: request.name,
                email: request.email,
                whatsapp: request.whatsappNumber,
                website: request.website,
                service: request.service,
                projectDetails: request.notes,
              });
            }}
          />
        </React.Suspense>
      )}
    </div>
  );
}
