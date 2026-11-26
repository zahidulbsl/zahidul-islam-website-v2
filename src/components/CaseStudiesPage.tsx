import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Home,
  Maximize2,
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
  partitionVisibleCaseStudies,
} from '../utils/caseStudyFilters';
import { trackCaseStudyClick, trackCtaClick } from '../utils/tracking';
import { useBodyScrollLock } from '../utils/bodyScrollLock';
import { TestimonialsSection } from './TestimonialsSection';
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
  const [showAllProjects, setShowAllProjects] = useState(false);
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
  const {
    initialProjects,
    additionalProjects,
    remainingCount,
    hasMore,
  } = partitionVisibleCaseStudies(filteredProjects);

  const getCategoryCount = (category: PortfolioFilterCategory) =>
    filterCaseStudies(CASE_STUDIES, category).length;

  const handleFilterChange = (category: PortfolioFilterCategory) => {
    setActiveFilter(category);
    setShowAllProjects(false);
  };

  const handleOpenProject = (project: CaseStudy, position: number) => {
    trackCaseStudyClick({
      caseStudyName: project.title,
      caseStudyCategory: project.category,
      caseStudyPosition: position,
    });
    onSelectCaseStudy(project);
  };

  const heroCredentials = [
    {
      value: '$22M+',
      label: 'Managed Ad Spend',
    },
    {
      value: OFFICIAL_CREDENTIALS.fiverrReviewsShort,
      label: '5-Star Reviews',
    },
    {
      value: OFFICIAL_CREDENTIALS.upworkJssShort,
      label: 'Upwork JSS',
    },
  ];

  const revealInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const revealAnimate = { opacity: 1, y: 0 };

  const renderCaseStudyCard = (project: CaseStudy, renderIndex: number) => {
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
          {/* 1. CAMPAIGN PROOF IMAGE (Consistent 16:10 Ratio + Click-to-Zoom Lightbox) */}
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
            className="group/img relative block w-full aspect-[16/10] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-[#0B1644] bg-gradient-to-r from-[#0D2378] via-[#0B1644] to-[#1A1443] border border-zinc-900/10 mb-4 shrink-0 cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09090B]"
          >
            <img
              src={coverSrc}
              alt={coverAlt}
              width={640}
              height={400}
              loading={renderIndex < 3 ? 'eager' : 'lazy'}
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

            {/* Case Index Badge */}
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
            onClick={() => handleOpenProject(project, originalPosition)}
            className="group/btn w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 min-h-[40px] rounded-xl bg-[#FAFAFA] hover:bg-[#09090B] border border-zinc-200/90 hover:border-[#09090B] text-xs font-display font-bold text-[#09090B] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 motion-safe:group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <div id="home" className="bg-[#FAFAFA] text-[#09090B]">
      {/* =====================================================================
          SECTION 01 — PORTFOLIO HERO
      ===================================================================== */}
      <section
        aria-labelledby="portfolio-page-heading"
        className="relative pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 overflow-hidden bg-[#06070B] text-white border-b border-white/[0.08]"
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
          <motion.div
            initial={revealInitial}
            animate={revealAnimate}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl mx-auto text-center flex flex-col items-center"
          >
            <span className="dm-pill-dark mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
              REAL-WORLD CAMPAIGN RESULTS
            </span>

            <h1
              id="portfolio-page-heading"
              className="font-display font-bold text-[2.25rem] sm:text-5xl lg:text-[3.85rem] text-white tracking-[-0.03em] leading-[1.06] text-balance"
            >
              <span className="block">Campaigns Built for</span>
              <span className="block mt-1 font-serif italic font-normal text-white">
                Measurable Growth.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Documented Google Ads, Meta Ads, eCommerce, lead generation, and
              conversion tracking campaigns—detailing the strategy,
              implementation, and measurable business results behind each
              engagement.
            </p>

            {/* Primary (Book a Call) & Minimal Text-Link Secondary (Home Page) CTAs */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <button
                type="button"
                onClick={() => {
                  trackCtaClick({
                    ctaText: 'Book a Call',
                    ctaLocation: 'case_studies_page_hero',
                  });
                  onOpenBooking();
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-zinc-100 text-[#09090B] font-display font-bold text-sm sm:text-base border border-white shadow-[0_12px_35px_rgba(255,255,255,0.18)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
              </button>

              <a
                href="/"
                onClick={(e) => {
                  trackCtaClick({
                    ctaText: 'Home Page',
                    ctaLocation: 'case_studies_page_hero',
                  });
                  if (
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    e.button !== 0
                  ) {
                    return;
                  }
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="group inline-flex items-center gap-2 px-2 py-2 text-sm sm:text-[15px] font-display font-medium text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <Home className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors duration-200" />
                <span className="underline-offset-4 group-hover:underline">
                  Home Page
                </span>
              </a>
            </div>

            {/* Redesigned Architectural 3-Stat Credibility Highlight Row */}
            <div
              aria-label="Verified credentials summary"
              data-testid="portfolio-hero-metrics"
              className="mt-9 sm:mt-11 w-full max-w-xl grid grid-cols-3 gap-4 sm:gap-10"
            >
              {heroCredentials.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                >
                  <span
                    aria-hidden="true"
                    className="w-6 sm:w-8 h-[1.5px] rounded-full bg-white/25 mb-3"
                  />
                  <span className="font-display font-bold text-[1.75rem] sm:text-4xl lg:text-[2.65rem] text-white tracking-[-0.035em] leading-none tabular-nums">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[10.5px] min-[375px]:text-[11px] sm:text-xs font-sans font-medium text-zinc-400 tracking-[0.01em] leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02 — PORTFOLIO FILTERS, 3-COLUMN GRID & SEE ALL CTA
      ===================================================================== */}
      <section
        id="portfolio-grid"
        aria-labelledby="portfolio-grid-heading"
        className="relative pt-8 sm:pt-10 lg:pt-11 pb-14 sm:pb-16 lg:pb-20 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-dot-matrix-light opacity-65 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills (Dynamic Counts, Zero Hardcoded Text) */}
          <div className="flex flex-col items-center text-center mb-7 sm:mb-9">
            <h2 id="portfolio-grid-heading" className="sr-only">
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
                    onClick={() => handleFilterChange(category)}
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
          </div>

          {/* Initial Case Studies (3-Col Desktop / 2-Col Tablet / 1-Col Mobile) */}
          <div
            data-testid="portfolio-case-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch"
          >
            {initialProjects.map((project, idx) =>
              renderCaseStudyCard(project, idx)
            )}
          </div>

          {/* Remaining Case Studies Revealed Dynamically by "See All Case Studies" */}
          <AnimatePresence initial={false}>
            {showAllProjects && additionalProjects.length > 0 && (
              <motion.div
                key={`additional-${activeFilter}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, height: 'auto', marginTop: 24 }
                    : { opacity: 0, height: 0, marginTop: 0 }
                }
                animate={{ opacity: 1, height: 'auto', marginTop: 28 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0, height: 0, marginTop: 0 }
                    : { opacity: 0, height: 0, marginTop: 0 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <div
                  data-testid="portfolio-additional-grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch pt-1"
                >
                  {additionalProjects.map((project, idx) =>
                    renderCaseStudyCard(project, initialProjects.length + idx)
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centered Homepage-Style "See All Case Studies" Dynamic Toggle CTA */}
          {hasMore && (
            <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                aria-expanded={showAllProjects}
                data-testid="see-all-case-studies-cta"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-bold text-xs sm:text-sm border border-[#09090B] shadow-[0_14px_34px_-10px_rgba(9,9,11,0.35)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer"
              >
                <span>
                  {showAllProjects ? 'Show Less' : 'See All Case Studies'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/15 font-mono text-[11px] text-emerald-300 tabular-nums">
                  {showAllProjects
                    ? `Showing All ${filteredProjects.length}`
                    : `+${remainingCount} More`}
                </span>
                {showAllProjects ? (
                  <ChevronUp className="w-4 h-4 transition-transform motion-safe:group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform motion-safe:group-hover:translate-y-0.5" />
                )}
              </button>
            </div>
          )}

          {/* Transparent Performance Disclaimer (Consistent with Homepage) */}
          <p className="mt-8 sm:mt-10 text-center text-xs text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            All screenshots and metrics come from documented historical client
            campaigns. Revenue figures represent gross attributed store sales,
            not net profit, and past performance does not guarantee future
            outcomes.
          </p>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03 — EXISTING HOMEPAGE REVIEWS SECTION (NO EXTRA CTA BANNER)
      ===================================================================== */}
      <TestimonialsSection
        onOpenBooking={onOpenBooking}
        showCtaBanner={false}
      />

      {/* =====================================================================
          SECTION 04 — EXACT EXISTING HOMEPAGE CONTACT SECTION
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
