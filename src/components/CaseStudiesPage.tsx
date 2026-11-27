import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Home,
  ShieldCheck,
} from 'lucide-react';
import type { CaseStudy } from '../data/caseStudies';
import {
  PORTFOLIO_INITIAL_VISIBLE_COUNT,
  PORTFOLIO_PROJECTS,
} from '../data/portfolioProjects';
import {
  PORTFOLIO_FILTER_CATEGORIES,
  type PortfolioFilterCategory,
  filterCaseStudies,
  getTrackingBadge,
  partitionVisibleCaseStudies,
} from '../utils/caseStudyFilters';
import { trackCaseStudyClick, trackCtaClick } from '../utils/tracking';
import { TestimonialsSection } from './TestimonialsSection';
import { ContactSection } from './ContactSection';
import { ContactAnnouncementBanner } from './ContactAnnouncementBanner';
import { CaseStudiesHeroStats } from './CaseStudiesHeroStats';
import { CaseStudiesPortfolioCta } from './CaseStudiesPortfolioCta';

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

  const filteredProjects = filterCaseStudies(PORTFOLIO_PROJECTS, activeFilter);
  const {
    initialProjects,
    additionalProjects,
    remainingCount,
    hasMore,
  } = partitionVisibleCaseStudies(
    filteredProjects,
    PORTFOLIO_INITIAL_VISIBLE_COUNT
  );

  const getCategoryCount = (category: PortfolioFilterCategory) =>
    filterCaseStudies(PORTFOLIO_PROJECTS, category).length;

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

  const revealInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const revealAnimate = { opacity: 1, y: 0 };

  const renderCaseStudyCard = (project: CaseStudy, renderIndex: number) => {
    const trackingBadge = getTrackingBadge(project);
    const originalPosition =
      PORTFOLIO_PROJECTS.findIndex((c) => c.id === project.id) + 1;
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
        role="button"
        tabIndex={0}
        aria-label={`View case study: ${project.title}`}
        onClick={() => handleOpenProject(project, originalPosition)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenProject(project, originalPosition);
          }
        }}
        className="group h-full rounded-[20px] sm:rounded-[26px] bg-white hover:bg-[#FAFAFA] border border-zinc-200/90 hover:border-[#09090B]/40 p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none shadow-[0_10px_30px_-12px_rgba(9,9,11,0.06)] hover:shadow-[0_24px_48px_-14px_rgba(9,9,11,0.13)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09090B] focus-visible:ring-offset-2 touch-manipulation"
      >
        <div className="flex flex-col flex-1">
          {/* 1. CAMPAIGN PROOF IMAGE (Compact 16:9 on Mobile, 16:10 on sm+) */}
          <div className="relative block w-full aspect-[16/9] sm:aspect-[16/10] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#0B1644] bg-gradient-to-r from-[#0D2378] via-[#0B1644] to-[#1A1443] border border-zinc-900/10 mb-3 sm:mb-4 shrink-0">
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
              className="block w-full h-full object-contain object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.02]"
            />

            {/* Case Index Badge */}
            <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#090B10]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-zinc-200 tabular-nums">
              #{formattedIndex}
            </span>
          </div>

          {/* 2. CATEGORY & TRACKING METADATA ROW */}
          <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0 flex-1 text-xs">
              <span className="font-serif italic text-[13px] sm:text-sm text-zinc-700 truncate">
                {project.clientIndustry}
              </span>
              <span aria-hidden="true" className="text-zinc-300 shrink-0">
                ·
              </span>
              <span className="font-mono text-[10px] sm:text-[10.5px] font-medium text-emerald-700 truncate">
                {project.category}
              </span>
            </div>

            <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-mono text-zinc-500 shrink-0 max-w-[46%] sm:max-w-none whitespace-nowrap">
              <img
                src={trackingBadge.src}
                alt={trackingBadge.name}
                width={12}
                height={12}
                className="w-3 h-3 object-contain shrink-0"
              />
              <span className="truncate">{trackingBadge.name}</span>
            </span>
          </div>

          {/* 3. DATA-FIRST VERIFIED METRIC STRIP */}
          <div className="mb-2.5 sm:mb-3.5 rounded-xl bg-[#FAFAFA] group-hover:bg-white border border-zinc-200/80 px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between gap-2.5 sm:gap-3 transition-colors duration-300">
            <div className="min-w-0">
              <div className="font-display font-extrabold text-[1.22rem] sm:text-2xl text-[#09090B] tracking-[-0.025em] leading-none tabular-nums">
                {project.primaryMetric}
              </div>
              <div className="mt-0.5 sm:mt-1 font-mono text-[10px] sm:text-[10.5px] font-semibold text-emerald-700 truncate">
                {project.metricLabel}
              </div>
            </div>

            {project.secondaryMetric && (
              <div className="text-right min-w-0 max-w-[54%] sm:max-w-none sm:shrink-0 pl-2.5 sm:pl-3 border-l border-zinc-200/90">
                <div className="font-display font-bold text-xs sm:text-sm text-[#09090B] leading-tight tabular-nums truncate">
                  {project.secondaryMetric}
                </div>
                {project.secondaryMetricLabel && (
                  <div className="mt-0.5 font-mono text-[9.5px] sm:text-[10px] text-zinc-500 leading-tight truncate">
                    {project.secondaryMetricLabel}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. PROJECT TITLE */}
          <h3 className="font-display font-bold text-[1.02rem] min-[390px]:text-[1.08rem] sm:text-[1.18rem] text-[#09090B] tracking-[-0.02em] leading-[1.28] sm:leading-snug line-clamp-2 sm:min-h-[3.1rem]">
            {project.title}
          </h3>

          {/* 5. SHORT DESCRIPTION */}
          <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-sm text-zinc-600 leading-[1.55] sm:leading-relaxed line-clamp-2 sm:line-clamp-3 sm:min-h-[3.9rem]">
            {project.summary}
          </p>
        </div>

        {/* 6. PLATFORM TAGS & VIEW CASE STUDY CTA */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-zinc-200/80 flex flex-col gap-2.5 sm:gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            {project.platforms.slice(0, 3).map((platform) => (
              <span
                key={platform}
                className="px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/80 font-mono text-[10px] font-medium text-zinc-700 whitespace-nowrap max-w-full truncate"
              >
                {platform}
              </span>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 min-h-[42px] sm:min-h-[40px] rounded-xl bg-[#FAFAFA] group-hover:bg-[#09090B] group-active:bg-[#09090B] group-active:text-white border border-zinc-200/90 group-hover:border-[#09090B] text-xs font-display font-bold text-[#09090B] group-hover:text-white transition-colors duration-200"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
          </div>
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
            <span
              data-testid="portfolio-credibility-badge"
              className="dm-pill-dark mb-4 px-3.5 py-1.5 text-[11px] min-[390px]:text-[11.5px] sm:text-xs font-medium tracking-normal text-zinc-200 border-lime-400/30 bg-lime-400/[0.07]"
            >
              <ShieldCheck
                aria-hidden="true"
                className="w-3.5 h-3.5 text-lime-400 shrink-0"
              />
              <span>
                <strong className="font-semibold text-white">
                  Zahidul Islam
                </strong>
                <span aria-hidden="true" className="mx-1.5 text-lime-400/75">
                  ·
                </span>
                <span className="text-zinc-300">
                  Top Rated on Fiverr &amp; Upwork
                </span>
              </span>
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
          </motion.div>

          {/* Redesigned 5-Card Layered Hero Stats Showcase */}
          <CaseStudiesHeroStats />
        </div>
      </section>

      {/* =====================================================================
          SECTION 02 — SECTION HEADING, FILTERS, 3×4 GRID & SEE ALL PROJECTS CTA
      ===================================================================== */}
      <section
        id="portfolio-grid"
        aria-labelledby="portfolio-grid-heading"
        className="relative pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-16 lg:pb-20 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-dot-matrix-light opacity-65 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Section Heading Matching Homepage Design System */}
          <motion.div
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl mx-auto text-center mb-6 sm:mb-10"
          >
            <span className="dm-pill-light mb-3 sm:mb-4">Case Studies</span>

            <h2
              id="portfolio-grid-heading"
              className="font-display font-bold text-[1.75rem] min-[390px]:text-[2rem] sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.08]"
            >
              Real Campaigns.{' '}
              <span className="font-serif italic font-normal text-[#09090B] block sm:inline">
                Measurable Results.
              </span>
            </h2>

            <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              Explore real advertising campaigns, performance data, and the
              strategies behind measurable business growth.
            </p>
          </motion.div>

          {/* Category Filter Pills (Dynamic Counts, Horizontally Scrollable on Mobile) */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
            <div
              role="group"
              aria-label="Filter case studies by category"
              className="w-full flex items-center justify-start md:flex-wrap md:justify-center gap-2 overflow-x-auto md:overflow-x-visible scrollbar-none slider-touch-track pb-1.5 md:pb-0 px-0.5"
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
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-display font-semibold border transition-all duration-200 cursor-pointer whitespace-nowrap touch-manipulation ${
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

          {/* Initial 12 Case Studies (3-Col × 4-Row Desktop / 2-Col Tablet / 1-Col Mobile) */}
          <div
            data-testid="portfolio-case-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-stretch"
          >
            {initialProjects.map((project, idx) =>
              renderCaseStudyCard(project, idx)
            )}
          </div>

          {/* Remaining Projects Revealed Dynamically by "See All Projects" */}
          <AnimatePresence initial={false}>
            {showAllProjects && additionalProjects.length > 0 && (
              <motion.div
                key={`additional-${activeFilter}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, height: 'auto' }
                    : { opacity: 0, height: 0 }
                }
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <div
                  data-testid="portfolio-additional-grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-stretch pt-4 sm:pt-6 lg:pt-7"
                >
                  {additionalProjects.map((project, idx) =>
                    renderCaseStudyCard(project, initialProjects.length + idx)
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preserved Black Pill CTA: "See All Projects" Expand/Collapse Toggle */}
          {hasMore && (
            <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                aria-expanded={showAllProjects}
                data-testid="see-all-projects-cta"
                className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-bold text-xs sm:text-sm border border-[#09090B] shadow-[0_14px_34px_-10px_rgba(9,9,11,0.35)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer touch-manipulation"
              >
                <span>
                  {showAllProjects ? 'Show Less' : 'See All Projects'}
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

          {/* Integrated Portfolio Conversion CTA (Inside Case Studies Section) */}
          <CaseStudiesPortfolioCta onOpenBooking={onOpenBooking} />
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
    </div>
  );
};

export default CaseStudiesPage;
