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

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [serviceInquiry, setServiceInquiry] = useState<string | undefined>(undefined);

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
