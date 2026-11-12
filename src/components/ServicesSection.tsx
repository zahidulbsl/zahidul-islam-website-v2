import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { SERVICES, ServiceItem } from '../data/services';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Share2,
  ShoppingBag,
  Target,
  Activity,
  BarChart3,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { scrollToSection } from '../utils/scroll';
import { useBodyScrollLock } from '../utils/bodyScrollLock';

interface ServicesSectionProps {
  onOpenBooking: () => void;
  onSelectCaseStudyBySlug: (slug: string) => void;
  onSelectServiceForInquiry?: (serviceName: string) => void;
}

const SERVICE_META = [
  {
    eyebrow: 'Paid Search Acquisition',
    logo: '/logos/google-ads.svg',
    accentBorder: 'group-hover:border-emerald-400/45',
    badgeBg: 'bg-emerald-500/12 border-emerald-400/25 text-emerald-300',
    icon: Search,
  },
  {
    eyebrow: 'Social Demand & Lead Funnels',
    logo: '/logos/meta-ads.svg',
    accentBorder: 'group-hover:border-sky-400/45',
    badgeBg: 'bg-sky-500/12 border-sky-400/25 text-sky-300',
    icon: Share2,
  },
  {
    eyebrow: 'eCommerce Feed & Catalog Scaling',
    logo: '/logos/google-merchant.svg',
    accentBorder: 'group-hover:border-amber-400/45',
    badgeBg: 'bg-amber-500/12 border-amber-400/25 text-amber-300',
    icon: ShoppingBag,
  },
  {
    eyebrow: 'High-Intent Local & Service Leads',
    logo: '/logos/google-ads.svg',
    accentBorder: 'group-hover:border-teal-400/45',
    badgeBg: 'bg-teal-500/12 border-teal-400/25 text-teal-300',
    icon: Target,
  },
  {
    eyebrow: 'Server-Side Measurement Architecture',
    logo: '/logos/google-tag-manager.svg',
    accentBorder: 'group-hover:border-violet-400/45',
    badgeBg: 'bg-violet-500/12 border-violet-400/25 text-violet-300',
    icon: Activity,
  },
  {
    eyebrow: 'Account Diagnostics & Restructuring',
    logo: '/logos/google-analytics.svg',
    accentBorder: 'group-hover:border-emerald-400/45',
    badgeBg: 'bg-emerald-500/12 border-emerald-400/25 text-emerald-300',
    icon: BarChart3,
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
  onSelectCaseStudyBySlug,
  onSelectServiceForInquiry,
}) => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);
  const serviceModalContentRef = useRef<HTMLDivElement>(null);

  // Reset modal scroll position to top whenever service changes
  useEffect(() => {
    if (serviceModalContentRef.current) {
      serviceModalContentRef.current.scrollTop = 0;
    }
  }, [selectedServiceIndex]);

  const selectedService: ServiceItem | null =
    selectedServiceIndex !== null ? SERVICES[selectedServiceIndex] : null;

  const handleNextService = useCallback(() => {
    setSelectedServiceIndex((current) => {
      if (current === null) return null;
      return (current + 1) % SERVICES.length;
    });
  }, []);

  const handlePrevService = useCallback(() => {
    setSelectedServiceIndex((current) => {
      if (current === null) return null;
      return (current - 1 + SERVICES.length) % SERVICES.length;
    });
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    if (selectedServiceIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedServiceIndex(null);
      }
      if (e.key === 'ArrowRight') {
        handleNextService();
      }
      if (e.key === 'ArrowLeft') {
        handlePrevService();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedServiceIndex, handleNextService, handlePrevService]);

  const isModalOpen = selectedServiceIndex !== null;
  useBodyScrollLock(isModalOpen);

  const handleInquireFromModal = (serviceTitle: string) => {
    setSelectedServiceIndex(null);
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(serviceTitle);
    }
    scrollToSection('contact');
  };

  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 lg:py-32 bg-[#06070B] text-white border-y border-white/[0.08] scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Architectural Matrix & Radial Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-dot-matrix-dark opacity-60 [mask-image:linear-gradient(to_bottom,#000_25%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[920px] h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.10)_0%,rgba(56,189,248,0.06)_45%,transparent_75%)] blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ===================================================================
            1. EDITORIAL SECTION HEADER
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <span className="dm-pill-dark mb-4">
            Specialized Capabilities
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-white tracking-[-0.03em] leading-[1.08]">
            Practical Advertising &amp; Tracking{' '}
            <span className="block mt-1">
              Services{' '}
              <span className="font-serif italic font-normal text-white">
                Built for Real Growth.
              </span>
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Whether you need a new campaign built from scratch, a diagnostic
            audit of an underperforming account, server-side conversion
            tracking, or ongoing monthly management, every service is structured
            around your business goals.
          </p>
        </motion.div>

        {/* ===================================================================
            2. ARCHITECTURAL 6-CARD SERVICE SPECIFICATION GRID (Section 6)
        =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {SERVICES.map((service, idx) => {
            const meta = SERVICE_META[idx % SERVICE_META.length];
            const Icon = meta.icon;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                onClick={() => setSelectedServiceIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedServiceIndex(idx);
                  }
                }}
                aria-label={`Explore service: ${service.title}`}
                className={`group relative h-full rounded-[26px] bg-[#0C0F17] hover:bg-[#101420] border border-white/10 ${meta.accentBorder} p-6 sm:px-7 sm:py-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_18px_45px_-18px_rgba(0,0,0,0.65)]`}
              >
                <div>
                  {/* Top Bar: Numbering, Platform Logo & Verified Proof Pill */}
                  <div className="flex items-center justify-between gap-2 pb-4.5 mb-4.5 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#09090B] transition-colors shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                          Service {service.number} / 06
                        </span>
                        <span className="font-serif italic text-xs text-zinc-300">
                          {meta.eyebrow}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full border font-mono text-[10px] font-semibold shrink-0 ${meta.badgeBg}`}
                    >
                      {service.proof.metric}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display font-bold text-xl sm:text-[22px] text-white tracking-[-0.02em] leading-snug">
                    {service.title}
                  </h3>

                  {/* Supporting Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Core Capabilities Checklist */}
                  <div className="mt-4.5 pt-4 border-t border-white/[0.06] space-y-2">
                    {service.coreCapabilities.slice(0, 3).map((cap) => (
                      <div
                        key={cap}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300 leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Technologies & Explore Service Button */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src={meta.logo}
                      alt=""
                      width={15}
                      height={15}
                      className="w-3.5 h-3.5 object-contain shrink-0"
                    />
                    <span className="font-mono text-[11px] text-zinc-400 truncate">
                      {service.technologies.slice(0, 2).join(' · ')}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] group-hover:bg-white text-white group-hover:text-[#09090B] font-display font-bold text-xs border border-white/10 group-hover:border-white transition-all shrink-0">
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ===================================================================
            3. BOTTOM CUSTOM SCOPE & CONSULTATION STRIP
        =================================================================== */}
        <div className="mt-12 sm:mt-14 rounded-[24px] bg-[#0C0F17] border border-white/10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 hidden sm:flex">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Need a Combined Advertising + Conversion Tracking Package?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                Every engagement is available as a one-time setup, diagnostic
                account audit, or ongoing monthly campaign management.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-[#09090B] font-display font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0 shadow-lg"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===================================================================
          4. COMPLETELY REDESIGNED SERVICE DETAIL POPUP / MODAL (Section 6.1)
      =================================================================== */}
      {selectedService &&
        selectedServiceIndex !== null &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedService.title} service details`}
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer touch-none"
              onClick={() => setSelectedServiceIndex(null)}
              aria-label="Close service modal backdrop"
            />

            {/* Editorial Modal Container (High-Contrast Light Dossier with Dark Architectural Header) */}
            <div
              data-lenis-prevent="true"
              className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[26px] sm:rounded-[32px] bg-white text-[#09090B] border border-zinc-200 shadow-[0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden overscroll-contain"
            >
              {/* 1. STICKY TOP NAVIGATION BAR */}
              <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-[#090B10] text-white border-b border-white/10 z-20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-xs font-bold text-emerald-300 shrink-0">
                    Service {selectedService.number} / 06
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm text-zinc-300 truncate hidden sm:inline">
                    {
                      SERVICE_META[selectedServiceIndex % SERVICE_META.length]
                        .eyebrow
                    }
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrevService}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    title="Previous Service (Arrow Left)"
                    aria-label="Previous Service"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextService}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    title="Next Service (Arrow Right)"
                    aria-label="Next Service"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedServiceIndex(null)}
                    className="p-2 rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-[#09090B] border border-white/15 transition-colors cursor-pointer ml-1"
                    title="Close Modal (Escape)"
                    aria-label="Close service modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 2. SCROLLABLE MODAL BODY */}
              <div
                ref={serviceModalContentRef}
                data-lenis-prevent="true"
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-5 sm:p-8 lg:p-10 space-y-7 [-webkit-overflow-scrolling:touch]"
              >
                {/* Hero Header inside Modal */}
                <div className="rounded-[24px] bg-[#0B0D14] text-white p-6 sm:p-8 border border-zinc-900 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Zahidul Pro · Specialized Service Dossier</span>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-[-0.025em] leading-tight">
                      {selectedService.title}
                    </h3>

                    <p className="mt-2.5 text-sm sm:text-base font-medium text-emerald-300">
                      {selectedService.categoryHeadline}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
                      {selectedService.detailedOverview}
                    </p>

                    {/* Tools & Platforms Pills */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mr-1">
                        Platforms &amp; Tools:
                      </span>
                      {selectedService.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 font-mono text-[11px] text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Two-Column Breakdown: What I Do & What You'll Receive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* What I Do */}
                  <div className="rounded-[22px] bg-[#FAFAFA] border border-zinc-200/90 p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/80">
                      <h4 className="font-display font-bold text-base sm:text-lg text-[#09090B]">
                        What I Do
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Execution Scope
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {selectedService.coreCapabilities.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What You'll Receive */}
                  <div className="rounded-[22px] bg-[#FAFAFA] border border-zinc-200/90 p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/80">
                      <h4 className="font-display font-bold text-base sm:text-lg text-[#09090B]">
                        What You&apos;ll Receive
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Client Deliverables
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {selectedService.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Relevant Campaign Result & Related Case Study Link */}
                {selectedService.proof && (
                  <div className="rounded-[22px] bg-emerald-50/70 border border-emerald-200/90 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>{selectedService.proof.label}</span>
                      </span>

                      {selectedService.relatedCaseStudySlugs?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const slug =
                              selectedService.relatedCaseStudySlugs[0];
                            setSelectedServiceIndex(null);
                            onSelectCaseStudyBySlug(slug);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-bold text-xs transition-colors cursor-pointer"
                        >
                          <span>Inspect Related Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div className="shrink-0">
                        <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#09090B] tracking-tight">
                          {selectedService.proof.metric}
                        </div>
                        <div className="text-xs font-semibold text-emerald-900 mt-0.5">
                          {selectedService.proof.title}
                        </div>
                      </div>

                      <div className="hidden sm:block w-px h-12 bg-emerald-300/70" />

                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                          {selectedService.proof.description}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-1.5">
                          {selectedService.proof.note}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Problems Addressed */}
                <div className="rounded-[22px] bg-[#FAFAFA] border border-zinc-200/90 p-5 sm:p-6">
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#09090B] mb-4">
                    Common Challenges This Service Solves
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.businessChallenges
                      .slice(0, 4)
                      .map((challenge) => (
                        <div
                          key={challenge}
                          className="p-3.5 rounded-xl bg-white border border-zinc-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                          <span>{challenge}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Honest Expectations Box */}
                <div className="rounded-[20px] bg-zinc-100/80 border border-zinc-200/90 p-4 sm:p-5 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    <strong className="text-[#09090B]">
                      Transparent Collaboration:
                    </strong>{' '}
                    Available as a one-time setup or ongoing monthly management.
                    While no ethical specialist can guarantee a fixed number of
                    leads, sales, or ROAS—because outcomes depend on market
                    demand, offer, pricing, and budget—you receive direct senior
                    execution, clean conversion tracking, and disciplined
                    optimization.
                  </p>
                </div>
              </div>

              {/* 3. STICKY MODAL FOOTER BAR */}
              <div className="shrink-0 px-5 sm:px-8 py-4 bg-[#FAFAFA] border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-mono text-xs text-zinc-500">
                  Direct execution by Zahidul Islam · Upwork Top Rated (100% JSS)
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceIndex(null)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-xs sm:text-sm font-display font-semibold text-zinc-700 transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleInquireFromModal(selectedService.title)
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer flex-1 sm:flex-initial"
                  >
                    <span>Inquire About {selectedService.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default ServicesSection;
