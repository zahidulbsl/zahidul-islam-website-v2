import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { CaseStudy } from '../data/caseStudies';
import { CASE_STUDIES } from '../data/caseStudies';
import {
  trackCaseStudyClick,
  trackCtaClick,
  trackWhatsAppClick,
} from '../utils/tracking';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from 'lucide-react';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
  onOpenBooking: () => void;
}

type Category =
  | 'All'
  | 'Google Ads'
  | 'Meta Ads'
  | 'eCommerce'
  | 'Lead Generation';

const CATEGORIES: Category[] = [
  'All',
  'Google Ads',
  'Meta Ads',
  'eCommerce',
  'Lead Generation',
];

const PROJECTS = CASE_STUDIES;

const matchesCategory = (project: CaseStudy, category: Category): boolean => {
  if (category === 'All') return true;

  if (category === 'Google Ads') {
    return (
      project.category === 'Google Ads' ||
      project.platforms.some((platform) =>
        platform.toLowerCase().includes('google')
      )
    );
  }

  if (category === 'Meta Ads') {
    return (
      project.category === 'Meta Ads' ||
      project.platforms.some((platform) =>
        platform.toLowerCase().includes('meta')
      )
    );
  }

  return project.category === category;
};

const getTrackingLogo = (project: CaseStudy): { src: string; name: string } => {
  const joined = project.platforms.join(' ').toLowerCase();
  if (joined.includes('merchant')) {
    return { src: '/logos/google-merchant.svg', name: 'Merchant Center' };
  }
  if (joined.includes('capi') || joined.includes('pixel')) {
    return { src: '/logos/meta-capi.svg', name: 'Meta Pixel & CAPI' };
  }
  if (joined.includes('tag manager') || joined.includes('gtm')) {
    return { src: '/logos/google-tag-manager.svg', name: 'GTM Tracking' };
  }
  return { src: '/logos/google-analytics.svg', name: 'GA4 Attribution' };
};

// Reliable inline SVG fallback if any image fails to load
const buildFallbackSvg = (title: string, metric: string) => {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeMetric = metric.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" width="960" height="600">
    <rect width="960" height="600" fill="#0B0F19"/>
    <rect x="36" y="36" width="888" height="528" rx="24" fill="#111827" stroke="#1F2937" stroke-width="2"/>
    <text x="80" y="120" fill="#9CA3AF" font-family="monospace" font-size="14" letter-spacing="2">ZAHIDUL PRO · VERIFIED CAMPAIGN</text>
    <text x="80" y="280" fill="#FFFFFF" font-family="sans-serif" font-size="68" font-weight="800">${safeMetric}</text>
    <text x="80" y="340" fill="#34D399" font-family="sans-serif" font-size="22" font-weight="600">${safeTitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onSelectCaseStudy,
  onOpenBooking,
}) => {
  const [filter, setFilter] = useState<Category>('All');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeCaseSlide, setActiveCaseSlide] = useState(0);
  const caseSliderRef = useRef<HTMLDivElement>(null);

  const handleCaseScroll = () => {
    if (!caseSliderRef.current) return;
    const container = caseSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-case-card="true"]');
    if (!cards.length) return;
    const containerLeft = container.getBoundingClientRect().left;
    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.getBoundingClientRect().left - containerLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    setActiveCaseSlide(closestIndex);
  };

  const scrollToCaseSlide = (index: number) => {
    if (!caseSliderRef.current) return;
    const container = caseSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-case-card="true"]');
    const card = cards[index];
    if (card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      container.scrollTo({
        left: container.scrollLeft + (cardRect.left - containerRect.left),
        behavior: 'smooth',
      });
      setActiveCaseSlide(index);
    }
  };

  useEffect(() => {
    setActiveCaseSlide(0);
    if (caseSliderRef.current) {
      caseSliderRef.current.scrollLeft = 0;
    }
  }, [filter]);

  const filteredProjects = PROJECTS.filter((project) =>
    matchesCategory(project, filter)
  );

  // 1 Featured Case Study + 6 Initial Regular Cards + Remaining Cards (Desktop/Tablet)
  // Mobile renders all remaining cards in one continuous swipeable carousel
  const featuredProject = filteredProjects[0] ?? null;
  const mobileCarouselProjects = filteredProjects.slice(1);
  const initialRegularProjects = filteredProjects.slice(1, 7);
  const additionalProjects = filteredProjects.slice(7);

  const getCount = (category: Category) =>
    PROJECTS.filter((project) => matchesCategory(project, category)).length;

  // Render a regular 3-column portfolio card with consistent dimensions & aspect ratio
  const renderRegularCard = (project: CaseStudy, indexNumber: number) => {
    const trackingLogo = getTrackingLogo(project);
    const formattedIndex = String(indexNumber).padStart(2, '0');

    return (
      <article
        key={project.id}
        data-case-card="true"
        onClick={() => {
          trackCaseStudyClick({
            caseStudyName: project.title,
            caseStudyCategory: project.category,
            caseStudyPosition: indexNumber,
          });
          onSelectCaseStudy(project);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trackCaseStudyClick({
              caseStudyName: project.title,
              caseStudyCategory: project.category,
              caseStudyPosition: indexNumber,
            });
            onSelectCaseStudy(project);
          }
        }}
        aria-label={`View case study: ${project.title}`}
        className="group w-[84vw] max-w-[330px] shrink-0 snap-start self-stretch sm:w-auto sm:max-w-none sm:shrink sm:h-full rounded-[22px] sm:rounded-[26px] bg-white hover:bg-[#FAFAFA] border border-zinc-200/90 hover:border-[#09090B]/40 p-4 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_-12px_rgba(9,9,11,0.06)] hover:shadow-[0_24px_48px_-14px_rgba(9,9,11,0.13)]"
      >
        <div className="flex flex-col flex-1">
          {/* 1. CAMPAIGN IMAGE (Consistent 16:10 Aspect Ratio) */}
          <div className="relative aspect-[16/10] w-full rounded-[16px] sm:rounded-[18px] overflow-hidden bg-[#090D16] border border-zinc-900/10 mb-3.5 sm:mb-5 shrink-0">
            <img
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              width={640}
              height={400}
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = buildFallbackSvg(project.title, project.primaryMetric);
              }}
              className="w-full h-full object-cover object-[50%_60%] transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            />

            {/* 2. CASE INDEX BADGE */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#090B10]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-zinc-300">
                #{formattedIndex}
              </span>
            </div>
          </div>

          {/* INDUSTRY KICKER & TRACKING */}
          <div className="h-5 sm:h-auto flex items-center justify-between gap-2 mb-2 shrink-0">
            <span className="font-serif italic text-sm text-zinc-600 truncate">
              {project.clientIndustry}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 shrink-0 whitespace-nowrap">
              <img
                src={trackingLogo.src}
                alt={trackingLogo.name}
                width={12}
                height={12}
                className="w-3 h-3 object-contain"
              />
              <span>{trackingLogo.name}</span>
            </span>
          </div>

          {/* 4. PROJECT TITLE (Consistent 2-Line Height Slot) */}
          <h3 className="font-display font-bold text-lg sm:text-xl text-[#09090B] tracking-[-0.02em] leading-snug line-clamp-2 h-[3.25rem] sm:h-auto sm:min-h-[3.25rem]">
            {project.title}
          </h3>

          {/* 5. SHORT DESCRIPTION (Consistent 3-Line Height Slot) */}
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3 h-[3.75rem] sm:h-auto sm:min-h-[3.75rem]">
            {project.summary}
          </p>
        </div>

        {/* 6. PLATFORM INFORMATION & 7. VIEW CASE STUDY LINK */}
        <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2 shrink-0">
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 min-w-0">
            {project.platforms.slice(0, 2).map((platform) => (
              <span
                key={platform}
                className="px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200/80 font-mono text-[10px] font-medium text-zinc-700 whitespace-nowrap truncate"
              >
                {platform}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center justify-end sm:justify-start gap-1 text-xs font-display font-bold text-[#09090B] group-hover:translate-x-0.5 transition-transform shrink-0 whitespace-nowrap">
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </article>
    );
  };

  return (
    <section
      id="case-studies"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            1. EDITORIAL SECTION HEADER
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-8 sm:mb-11"
        >
          <span className="dm-pill-light mb-4">
            Verified Campaign Portfolio
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.08]">
            Proven Campaign{' '}
            <span className="font-serif italic font-normal text-[#09090B]">
              Results
            </span>{' '}
            <span className="block">Across Real Businesses.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Explore 12 documented Google Ads and Meta Ads campaigns across local
            home services, healthcare and financial firms, and online stores.
            Revenue figures reflect gross attributed sales, not net profit, and
            past results do not guarantee future outcomes.
          </p>
        </motion.div>

        {/* ===================================================================
            2. CATEGORY FILTER PILLS
        =================================================================== */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-10 sm:mb-12">
          {CATEGORIES.map((category) => {
            const active = filter === category;
            const count = getCount(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-display font-semibold border transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-[#09090B] text-white border-[#09090B] shadow-md'
                    : 'bg-white text-zinc-600 border-zinc-200/90 hover:text-[#09090B] hover:border-zinc-400'
                }`}
              >
                {category}
                <span
                  className={`ml-1.5 font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                    active
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

        {/* ===================================================================
            3. ONE LARGE FEATURED CASE STUDY (Section 5.1)
               Initial Featured Project: 22.8X ROAS — eCommerce Shopping Campaign
        =================================================================== */}
        {featuredProject && (
          <motion.article
            key={`featured-${featuredProject.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              trackCaseStudyClick({
                caseStudyName: featuredProject.title,
                caseStudyCategory: featuredProject.category,
                caseStudyPosition: 1,
              });
              onSelectCaseStudy(featuredProject);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trackCaseStudyClick({
                  caseStudyName: featuredProject.title,
                  caseStudyCategory: featuredProject.category,
                  caseStudyPosition: 1,
                });
                onSelectCaseStudy(featuredProject);
              }
            }}
            aria-label={`Featured case study: ${featuredProject.title}`}
            className="group relative rounded-[28px] sm:rounded-[34px] bg-[#0B0D14] text-white border border-zinc-900 p-5 sm:p-6 lg:p-8 mb-8 sm:mb-10 shadow-[0_26px_65px_-18px_rgba(9,9,11,0.25)] cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:items-stretch">
              {/* LEFT COLUMN: UNOBSTRUCTED CAMPAIGN PROOF IMAGE (6 COLS) */}
              <div className="lg:col-span-6 flex">
                <div className="relative w-full aspect-[4/3] lg:h-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#07090F] border border-white/12 shadow-[0_18px_45px_-15px_rgba(0,0,0,0.65)]">
                  <img
                    src={featuredProject.coverImage.src}
                    alt={featuredProject.coverImage.alt}
                    width={960}
                    height={600}
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = buildFallbackSvg(
                        featuredProject.title,
                        featuredProject.primaryMetric
                      );
                    }}
                    className="w-full h-full object-cover object-[50%_54%] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: EDITORIAL STORY & EXECUTION (6 COLS) */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-5">
                {/* 1. Category Kicker & Verification + 2. Title + 3. Description */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em]">
                      <span className="font-semibold text-emerald-400">
                        Featured Case · 01
                      </span>
                      <span aria-hidden="true" className="text-zinc-600">
                        ·
                      </span>
                      <span className="text-zinc-300">
                        {featuredProject.clientIndustry}
                      </span>
                    </div>
                    <span className="font-serif italic text-xs sm:text-[13px] text-zinc-400">
                      Verified Portfolio Result
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[1.9rem] text-white tracking-[-0.025em] leading-[1.15] [text-wrap:balance]">
                    {featuredProject.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {featuredProject.summary}
                  </p>
                </div>

                {/* 4. Key Strategic Execution Points */}
                <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                    Key Strategic Execution
                  </span>
                  <div className="space-y-2">
                    {featuredProject.strategy.slice(0, 3).map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300 leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Platform Tags & 6. Prominent Green CTA */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    {featuredProject.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.09] font-mono text-[10.5px] text-zinc-300 whitespace-nowrap"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 group-hover:bg-emerald-300 text-[#06080D] font-display font-bold text-xs sm:text-[13px] transition-colors shrink-0 whitespace-nowrap shadow-[0_10px_28px_-8px_rgba(52,211,153,0.45)]">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ===================================================================
            4. REMAINING CASE STUDIES
               Mobile (<640px): All remaining projects in one horizontal swipe carousel
               Tablet/Desktop (>=640px): Initial 6 cards + expandable See All Projects
        =================================================================== */}
        {mobileCarouselProjects.length > 0 && (
          <div className="sm:hidden">
            <div
              ref={caseSliderRef}
              onScroll={handleCaseScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 gap-3.5 items-stretch -mx-4 px-4 pb-2 scrollbar-none slider-touch-track"
            >
              {mobileCarouselProjects.map((project, idx) =>
                renderRegularCard(project, idx + 2)
              )}
            </div>

            {mobileCarouselProjects.length > 1 && (
              <div className="pt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-zinc-600">
                  <span className="font-bold text-[#09090B]">
                    {String(activeCaseSlide + 1).padStart(2, '0')}
                  </span>
                  <span>/</span>
                  <span>{String(mobileCarouselProjects.length).padStart(2, '0')}</span>
                  <span className="ml-1">· Swipe projects</span>
                </div>

                <div
                  className="flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Case studies pagination"
                >
                  {mobileCarouselProjects.map((proj, i) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => scrollToCaseSlide(i)}
                      aria-label={`Go to project ${i + 1}`}
                      aria-selected={activeCaseSlide === i}
                      className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                        activeCaseSlide === i
                          ? 'w-5 bg-[#09090B]'
                          : 'w-1.5 bg-zinc-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {initialRegularProjects.length > 0 && (
          <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {initialRegularProjects.map((project, idx) =>
              renderRegularCard(project, idx + 2)
            )}
          </div>
        )}

        {/* ===================================================================
            5. REMAINING FIVE CASE STUDIES (Tablet/Desktop Only — Revealed when SEE ALL PROJECTS is clicked)
        =================================================================== */}
        <AnimatePresence initial={false}>
          {showAllProjects && additionalProjects.length > 0 && (
            <motion.div
              key="additional-case-studies"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 28 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch pt-1">
                {additionalProjects.map((project, idx) =>
                  renderRegularCard(project, idx + 8)
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            6. SEE ALL PROJECTS / SHOW LESS BUTTON (Tablet/Desktop Only — Removed on Mobile)
        =================================================================== */}
        {additionalProjects.length > 0 && (
          <div className="hidden sm:flex mt-10 sm:mt-12 flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              aria-expanded={showAllProjects}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-bold text-xs sm:text-sm border border-[#09090B] shadow-[0_14px_34px_-10px_rgba(9,9,11,0.35)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{showAllProjects ? 'Show Less' : 'See All Projects'}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/15 font-mono text-[11px] text-emerald-300">
                {showAllProjects
                  ? `Showing All ${filteredProjects.length}`
                  : `+${additionalProjects.length} More`}
              </span>
              {showAllProjects ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

        {/* ===================================================================
            7. BOTTOM CONSULTATION CTA BAR
        =================================================================== */}
        <div className="mt-10 sm:mt-12 rounded-[24px] bg-white border border-zinc-200/90 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start sm:items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] border border-zinc-200/90 flex items-center justify-center text-emerald-600 shrink-0 hidden sm:flex">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug">
                Ready to Turn Your Ad Spend Into Profitable Growth?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                Let&apos;s discuss your business goals, identify growth
                opportunities, and build a performance-driven advertising
                strategy tailored to your business.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                trackCtaClick({
                  ctaText: 'Book Free Strategy Call',
                  ctaLocation: 'case_studies_section',
                });
                onOpenBooking();
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer"
            >
              <span>Book Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/8801911184235?text=Hello%20Zahidul%2C%20I%20would%20like%20to%20discuss%20a%20marketing%20project."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  buttonText: 'Chat on WhatsApp',
                  buttonLocation: 'case_studies_section',
                  linkUrl: 'https://wa.me/8801911184235',
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#FAFAFA] hover:bg-zinc-100 border border-zinc-300 text-[#09090B] text-xs sm:text-sm font-display font-semibold transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
