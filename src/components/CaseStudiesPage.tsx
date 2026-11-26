import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  CASE_STUDIES,
  type CaseStudy,
  type CaseStudyImage,
} from '../data/caseStudies';
import { OFFICIAL_CREDENTIALS } from '../data/credentials';
import {
  PORTFOLIO_FILTER_CATEGORIES,
  type PortfolioFilterCategory,
  filterCaseStudies,
  getTrackingBadge,
} from '../utils/caseStudyFilters';
import { scrollToSection } from '../utils/scroll';
import { trackCaseStudyClick, trackCtaClick } from '../utils/tracking';
import { useBodyScrollLock } from '../utils/bodyScrollLock';
import { ContactSection } from './ContactSection';
import { ContactAnnouncementBanner } from './ContactAnnouncementBanner';

interface CaseStudiesPageProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
  onOpenBooking: () => void;
  onNavigateHome: () => void;
  initialService?: string;
}

const buildFallbackSvg = (title: string, metric: string) => {
  const safeTitle = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const safeMetric = metric
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" width="960" height="600">
    <rect width="960" height="600" fill="#0B0F19"/>
    <rect x="36" y="36" width="888" height="528" rx="24" fill="#111827" stroke="#1F2937" stroke-width="2"/>
    <text x="80" y="120" fill="#9CA3AF" font-family="monospace" font-size="14" letter-spacing="2">ZAHIDUL ISLAM · VERIFIED CAMPAIGN</text>
    <text x="80" y="280" fill="#FFFFFF" font-family="sans-serif" font-size="68" font-weight="800">${safeMetric}</text>
    <text x="80" y="340" fill="#34D399" font-family="sans-serif" font-size="22" font-weight="600">${safeTitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onSelectCaseStudy,
  onOpenBooking,
  onNavigateHome,
  initialService,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] =
    useState<PortfolioFilterCategory>('All Projects');
  const [previewTarget, setPreviewTarget] = useState<{
    image: CaseStudyImage;
    project: CaseStudy;
    position: number;
  } | null>(null);

  useBodyScrollLock(Boolean(previewTarget));

  useEffect(() => {
    if (!previewTarget) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewTarget(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewTarget]);

  const filteredProjects = filterCaseStudies(CASE_STUDIES, activeFilter);

  const getCategoryCount = (category: PortfolioFilterCategory) =>
    filterCaseStudies(CASE_STUDIES, category).length;

  const handleOpenProject = (project: CaseStudy, position: number) => {
    trackCaseStudyClick({
      caseStudyName: project.title,
      caseStudyCategory: project.category,
      caseStudyPosition: position,
    });
    onSelectCaseStudy(project);
  };

  const revealInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const revealAnimate = { opacity: 1, y: 0 };

  return (
    <div id="home" className="bg-[#FAFAFA] text-[#09090B]">
      {/* =====================================================================
          SECTION 01 — COMPACT CONTENT-FIRST PORTFOLIO INTRODUCTION / HERO
      ===================================================================== */}
      <section
        aria-labelledby="portfolio-page-heading"
        className="relative pt-22 sm:pt-24 lg:pt-26 pb-10 sm:pb-12 lg:pb-14 overflow-hidden bg-[#06070B] text-white border-b border-white/[0.08]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dot-matrix-dark opacity-70 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_30%,#000_35%,transparent_88%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 w-[880px] h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12)_0%,rgba(56,189,248,0.08)_45%,transparent_75%)] blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb Navigation */}
          <div className="flex items-center justify-center mb-5 sm:mb-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 motion-safe:group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </a>
          </div>

          <motion.div
            initial={revealInitial}
            animate={revealAnimate}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl mx-auto text-center flex flex-col items-center"
          >
            <span className="dm-pill-dark mb-4">
              Verified Campaign Portfolio
            </span>

            <h1
              id="portfolio-page-heading"
              className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.75rem] text-white tracking-[-0.03em] leading-[1.08] text-balance"
            >
              Real Campaigns.{' '}
              <span className="font-serif italic font-normal text-white block sm:inline">
                Measurable Results.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Explore real Google Ads, Meta Ads, eCommerce, lead generation, and
              conversion tracking projects—showing the strategy, implementation,
              and measurable results behind each campaign.
            </p>

            {/* Primary & Secondary Intro CTAs */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  trackCtaClick({
                    ctaText: 'Explore Case Studies',
                    ctaLocation: 'case_studies_page_hero',
                  });
                  scrollToSection('portfolio-grid');
                }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-[#09090B] font-display font-bold text-xs sm:text-sm border border-white shadow-[0_12px_32px_rgba(255,255,255,0.16)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Case Studies</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  trackCtaClick({
                    ctaText: 'Book a Call',
                    ctaLocation: 'case_studies_page_hero',
                  });
                  onOpenBooking();
                }}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.11] text-white font-display font-semibold text-xs sm:text-sm border border-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>Book a Call</span>
                <ArrowUpRight className="w-4 h-4 text-lime-400 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Compact Verified Credibility Line (Existing Verified Facts Only) */}
            <div
              aria-label="Verified credentials summary"
              className="mt-8 pt-6 border-t border-white/[0.08] w-full max-w-3xl flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] sm:text-xs font-mono text-zinc-400"
            >
              <span className="inline-flex items-center gap-1.5 text-zinc-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <strong className="font-semibold text-white tabular-nums">
                  {CASE_STUDIES.length}
                </strong>{' '}
                Documented Campaigns
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-zinc-700">
                ·
              </span>
              <span>
                <strong className="font-semibold text-white tabular-nums">
                  $22M+
                </strong>{' '}
                Managed Ad Spend
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-zinc-700">
                ·
              </span>
              <span>
                <strong className="font-semibold text-white tabular-nums">
                  {OFFICIAL_CREDENTIALS.fiverrReviewsShort}
                </strong>{' '}
                5-Star Reviews
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-zinc-700">
                ·
              </span>
              <span>
                <strong className="font-semibold text-white tabular-nums">
                  {OFFICIAL_CREDENTIALS.upworkJssShort}
                </strong>{' '}
                Upwork JSS
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02 & 03 — PORTFOLIO FILTERS & CASE STUDIES GRID
      ===================================================================== */}
      <section
        id="portfolio-grid"
        aria-labelledby="portfolio-grid-heading"
        className="relative py-12 sm:py-16 lg:py-20 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-dot-matrix-light opacity-65 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact Grid Header & Category Filter Controls */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <h2
              id="portfolio-grid-heading"
              className="sr-only"
            >
              Case Studies Portfolio Grid
            </h2>

            <div
              role="group"
              aria-label="Filter case studies by category"
              className="w-full flex items-center justify-start md:flex-wrap md:justify-center gap-2 overflow-x-auto md:overflow-x-visible scrollbar-none pb-2 md:pb-0 -mx-1 px-1"
            >
              {PORTFOLIO_FILTER_CATEGORIES.map((category) => {
                const isActive = activeFilter === category;
                const count = getCategoryCount(category);

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    aria-pressed={isActive}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-display font-semibold border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#09090B] text-white border-[#09090B] shadow-md'
                        : 'bg-white text-zinc-600 border-zinc-200/90 hover:text-[#09090B] hover:border-zinc-400'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${
                        isActive
                          ? 'bg-white/15 text-emerald-300'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-xs font-mono text-zinc-500">
              Showing{' '}
              <strong className="text-[#09090B] tabular-nums">
                {filteredProjects.length}
              </strong>{' '}
              {filteredProjects.length === 1 ? 'case study' : 'case studies'}
              {activeFilter !== 'All Projects' ? ` in ${activeFilter}` : ''}
              {activeFilter === 'Conversion Tracking'
                ? ' · Every campaign includes verified GA4, GTM, or Meta Pixel & CAPI setup'
                : ' · Click any screenshot to zoom or open the full breakdown'}
            </p>
          </div>

          {/* 3-Column Desktop / 2-Column Tablet / 1-Column Mobile Case Study Grid */}
          <div
            data-testid="portfolio-case-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch"
          >
            {filteredProjects.map((project, idx) => {
              const trackingBadge = getTrackingBadge(project);
              const originalPosition =
                CASE_STUDIES.findIndex((c) => c.id === project.id) + 1;
              const formattedIndex = String(originalPosition).padStart(2, '0');
              const coverSrc =
                project.coverImage?.src ??
                buildFallbackSvg(project.title, project.primaryMetric);
              const coverAlt = project.coverImage?.alt ?? project.title;

              return (
                <article
                  key={project.id}
                  data-portfolio-card="true"
                  data-project-id={project.id}
                  className="group h-full rounded-[22px] sm:rounded-[26px] bg-white hover:bg-[#FAFAFA] border border-zinc-200/90 hover:border-[#09090B]/40 p-4 sm:p-5 lg:p-6 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none shadow-[0_10px_30px_-12px_rgba(9,9,11,0.06)] hover:shadow-[0_24px_48px_-14px_rgba(9,9,11,0.13)]"
                >
                  <div className="flex flex-col flex-1">
                    {/* 1. PROMINENT CAMPAIGN PROOF IMAGE (Click to Preview Lightbox) */}
                    <button
                      type="button"
                      onClick={() => {
                        if (project.coverImage) {
                          setPreviewTarget({
                            image: project.coverImage,
                            project,
                            position: originalPosition,
                          });
                        } else {
                          handleOpenProject(project, originalPosition);
                        }
                      }}
                      aria-label={`Preview campaign screenshot: ${project.title}`}
                      className="group/img relative block w-full aspect-[4/3] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-[#0B1644] bg-gradient-to-r from-[#0D2378] via-[#0B1644] to-[#1A1443] border border-zinc-900/10 mb-4 shrink-0 cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09090B]"
                    >
                      <img
                        src={coverSrc}
                        alt={coverAlt}
                        width={640}
                        height={480}
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = buildFallbackSvg(
                            project.title,
                            project.primaryMetric
                          );
                        }}
                        className="block w-full h-full object-contain object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/img:scale-[1.02]"
                      />

                      {/* Case Index Tag */}
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#090B10]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-zinc-200 tabular-nums">
                        #{formattedIndex}
                      </span>

                      {/* Subtle Zoom Affordance */}
                      <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#090B10]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white opacity-90 sm:opacity-0 sm:group-hover/img:opacity-100 sm:group-focus-visible/img:opacity-100 transition-opacity duration-200">
                        <Maximize2 className="w-3 h-3 text-emerald-400" />
                        <span>Zoom</span>
                      </span>
                    </button>

                    {/* 2. CATEGORY & TRACKING METADATA ROW */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 min-w-0 text-xs">
                        <span className="font-serif italic text-sm text-zinc-700 truncate">
                          {project.clientIndustry}
                        </span>
                        <span aria-hidden="true" className="text-zinc-300">
                          ·
                        </span>
                        <span className="font-mono text-[10.5px] font-medium text-emerald-700 truncate">
                          {project.category}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 shrink-0 whitespace-nowrap">
                        <img
                          src={trackingBadge.src}
                          alt={trackingBadge.name}
                          width={12}
                          height={12}
                          className="w-3 h-3 object-contain"
                        />
                        <span>{trackingBadge.name}</span>
                      </span>
                    </div>

                    {/* 3. DATA-FIRST VERIFIED METRIC STRIP */}
                    <div className="mb-3.5 rounded-xl bg-[#FAFAFA] group-hover:bg-white border border-zinc-200/80 px-3.5 py-2.5 flex items-center justify-between gap-3 transition-colors duration-300">
                      <div className="min-w-0">
                        <div className="font-display font-extrabold text-xl sm:text-2xl text-[#09090B] tracking-[-0.025em] leading-none tabular-nums">
                          {project.primaryMetric}
                        </div>
                        <div className="mt-1 font-mono text-[10.5px] font-semibold text-emerald-700 truncate">
                          {project.metricLabel}
                        </div>
                      </div>

                      {project.secondaryMetric && (
                        <div className="text-right shrink-0 pl-3 border-l border-zinc-200/90">
                          <div className="font-display font-bold text-xs sm:text-sm text-[#09090B] leading-tight tabular-nums">
                            {project.secondaryMetric}
                          </div>
                          {project.secondaryMetricLabel && (
                            <div className="mt-0.5 font-mono text-[10px] text-zinc-500 leading-tight">
                              {project.secondaryMetricLabel}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 4. PROJECT TITLE */}
                    <h3 className="font-display font-bold text-lg sm:text-[1.18rem] text-[#09090B] tracking-[-0.02em] leading-snug line-clamp-2 sm:min-h-[3.1rem]">
                      {project.title}
                    </h3>

                    {/* 5. SHORT DESCRIPTION */}
                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3 sm:min-h-[3.9rem]">
                      {project.summary}
                    </p>
                  </div>

                  {/* 6. PLATFORM TAGS & VIEW CASE STUDY CTA */}
                  <div className="mt-4 pt-3.5 border-t border-zinc-200/80 flex flex-col gap-3 shrink-0">
                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                      {project.platforms.slice(0, 3).map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/80 font-mono text-[10px] font-medium text-zinc-700 whitespace-nowrap"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenProject(project, originalPosition)
                      }
                      className="group/btn w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 min-h-[40px] rounded-xl bg-[#FAFAFA] hover:bg-[#09090B] border border-zinc-200/90 hover:border-[#09090B] text-xs font-display font-bold text-[#09090B] hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 motion-safe:group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Transparent Performance Disclaimer (Consistent with Homepage) */}
          <p className="mt-8 text-center text-xs text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            All screenshots and metrics come from documented historical client
            campaigns. Revenue figures represent gross attributed store sales,
            not net profit, and past performance does not guarantee future
            outcomes.
          </p>

          {/* =================================================================
              SECTION 04 — CONVERSION CTA SECTION ("Looking for Results Like These?")
          ================================================================= */}
          <div className="mt-12 sm:mt-16">
            <div className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] bg-[#090B10] border border-zinc-800 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 text-white shadow-[0_24px_60px_-18px_rgba(9,9,11,0.3)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 -right-24 w-80 h-80 rounded-full bg-emerald-500/12 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl"
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] font-semibold text-emerald-300 mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next Step</span>
                  </span>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-[-0.025em] leading-[1.15]">
                    Looking for Results{' '}
                    <span className="font-serif italic font-normal text-emerald-300">
                      Like These?
                    </span>
                  </h2>

                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-zinc-300">
                    Let&apos;s discuss your business goals, advertising
                    strategy, and how I can help you generate more qualified
                    leads or sales.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      trackCtaClick({
                        ctaText: "Let's Discuss Your Project",
                        ctaLocation: 'case_studies_page_cta',
                      });
                      scrollToSection('contact');
                    }}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] rounded-xl bg-white hover:bg-zinc-100 text-[#09090B] text-xs sm:text-sm font-display font-bold transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer shadow-lg whitespace-nowrap"
                  >
                    <span>Let&apos;s Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      trackCtaClick({
                        ctaText: 'Book a Call',
                        ctaLocation: 'case_studies_page_cta',
                      });
                      onOpenBooking();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-white text-xs sm:text-sm font-display font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <span>Book a Call</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 05 — REUSED EXISTING CONTACT SECTION & ANNOUNCEMENT BANNER
      ===================================================================== */}
      <ContactSection
        onOpenBooking={onOpenBooking}
        initialService={initialService}
      />

      <ContactAnnouncementBanner />

      {/* =====================================================================
          FULL-SCREEN CAMPAIGN SCREENSHOT LIGHTBOX PREVIEW
      ===================================================================== */}
      {previewTarget &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Screenshot preview: ${previewTarget.project.title}`}
            className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6"
            onClick={() => setPreviewTarget(null)}
          >
            <div
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-zinc-300 truncate max-w-[70%]">
                  {previewTarget.project.title}
                </span>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => {
                      const { project, position } = previewTarget;
                      setPreviewTarget(null);
                      handleOpenProject(project, position);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-zinc-100 text-[#09090B] text-xs font-display font-bold transition-colors cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewTarget(null)}
                    aria-label="Close image preview"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    <span>Close</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <img
                src={previewTarget.image.src}
                alt={previewTarget.image.alt}
                className="w-full h-auto max-h-[78dvh] object-contain rounded-2xl border border-white/15 bg-[#090D16]"
              />

              <p className="mt-3 text-center text-xs font-mono text-zinc-300 px-2">
                {previewTarget.image.caption}
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CaseStudiesPage;
