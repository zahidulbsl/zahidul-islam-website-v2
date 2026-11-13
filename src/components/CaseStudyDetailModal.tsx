import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import {
  CASE_STUDIES,
  type CaseStudy,
  type CaseStudyImage,
} from '../data/caseStudies';
import {
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Target,
  Search,
  Lightbulb,
  Layers,
  Activity,
  Maximize2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useBodyScrollLock } from '../utils/bodyScrollLock';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenBooking: () => void;
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
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

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  caseStudy,
  onClose,
  onOpenBooking,
  onSelectCaseStudy,
}) => {
  const [lightboxImage, setLightboxImage] = useState<CaseStudyImage | null>(
    null
  );
  const [activeVisualSlide, setActiveVisualSlide] = useState(0);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const visualSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLightboxImage(null);
    setActiveVisualSlide(0);
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
    if (visualSliderRef.current) {
      visualSliderRef.current.scrollLeft = 0;
    }
  }, [caseStudy?.id]);

  const currentIndex = caseStudy
    ? CASE_STUDIES.findIndex((project) => project.id === caseStudy.id)
    : -1;
  const totalCount = CASE_STUDIES.length;

  const allImages = caseStudy
    ? [caseStudy.coverImage, ...caseStudy.galleryImages]
    : [];

  const handleNextProject = () => {
    if (currentIndex < 0 || !onSelectCaseStudy || totalCount === 0) return;
    const nextIndex = (currentIndex + 1) % totalCount;
    onSelectCaseStudy(CASE_STUDIES[nextIndex]);
  };

  const handlePrevProject = () => {
    if (currentIndex < 0 || !onSelectCaseStudy || totalCount === 0) return;
    const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
    onSelectCaseStudy(CASE_STUDIES[prevIndex]);
  };

  const handleVisualScroll = () => {
    if (!visualSliderRef.current) return;
    const container = visualSliderRef.current;
    const slides = container.querySelectorAll<HTMLElement>('[data-visual-slide="true"]');
    if (!slides.length) return;
    const containerLeft = container.getBoundingClientRect().left;
    let closestIndex = 0;
    let minDiff = Infinity;
    slides.forEach((slide, idx) => {
      const diff = Math.abs(slide.getBoundingClientRect().left - containerLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    setActiveVisualSlide(closestIndex);
  };

  const scrollToVisualSlide = (index: number) => {
    if (!visualSliderRef.current) return;
    const container = visualSliderRef.current;
    const slides = container.querySelectorAll<HTMLElement>('[data-visual-slide="true"]');
    const targetSlide = slides[index];
    if (targetSlide) {
      const containerRect = container.getBoundingClientRect();
      const slideRect = targetSlide.getBoundingClientRect();
      container.scrollTo({
        left: container.scrollLeft + (slideRect.left - containerRect.left),
        behavior: 'smooth',
      });
      setActiveVisualSlide(index);
    }
  };

  useEffect(() => {
    if (!caseStudy) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
      if (!lightboxImage && e.key === 'ArrowRight') {
        handleNextProject();
      }
      if (!lightboxImage && e.key === 'ArrowLeft') {
        handlePrevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, lightboxImage, currentIndex]);

  useBodyScrollLock(Boolean(caseStudy));

  if (!caseStudy || typeof document === 'undefined') return null;

  const formattedNumber = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  const showDistinctSecondaryMetric =
    Boolean(caseStudy.secondaryMetric) &&
    !caseStudy.platforms.some(
      (p) => p.toLowerCase() === caseStudy.secondaryMetric?.toLowerCase()
    );

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-5 lg:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={`Case study details: ${caseStudy.title}`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/82 backdrop-blur-md cursor-pointer touch-none"
          onClick={onClose}
          aria-label="Close case study modal backdrop"
        />

        {/* Editorial Case Study Modal Container */}
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          data-lenis-prevent="true"
          className="relative z-10 w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] flex flex-col rounded-[22px] sm:rounded-[30px] bg-white text-[#09090B] border border-zinc-200 shadow-[0_32px_95px_rgba(0,0,0,0.7)] overflow-hidden overscroll-contain"
        >
          {/* =================================================================
              1. STICKY TOP CONTROL BAR (Case Number, Category, Prev/Next/Close)
          ================================================================= */}
          <div className="shrink-0 flex items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-7 py-3 sm:py-3.5 bg-[#090B10] text-white border-b border-white/10 z-20">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[11px] sm:text-xs font-bold text-emerald-300 shrink-0 tabular-nums">
                Case {formattedNumber} / {formattedTotal}
              </span>
              <span className="hidden min-[375px]:inline-block px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[10.5px] sm:text-[11px] text-zinc-200 truncate max-w-[130px] sm:max-w-none">
                {caseStudy.category}
              </span>
              <span className="hidden md:inline font-serif italic text-sm text-zinc-400 truncate">
                {caseStudy.clientIndustry}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {onSelectCaseStudy && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevProject}
                    className="inline-flex items-center justify-center gap-1 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    title="Previous Case Study (Arrow Left)"
                    aria-label="Previous Case Study"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextProject}
                    className="inline-flex items-center justify-center gap-1 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    title="Next Case Study (Arrow Right)"
                    aria-label="Next Case Study"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-[#09090B] border border-white/15 transition-colors cursor-pointer ml-0.5 sm:ml-1"
                title="Close Case Study (Escape)"
                aria-label="Close case study modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =================================================================
              2. INDEPENDENTLY SCROLLABLE BODY — 7-SECTION CASE STUDY FLOW
          ================================================================= */}
          <div
            ref={modalBodyRef}
            data-lenis-prevent="true"
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y p-4 sm:p-7 lg:p-9 space-y-5 sm:space-y-6 [-webkit-overflow-scrolling:touch]"
          >
            {/* ---------------------------------------------------------------
                01. CAMPAIGN OVERVIEW
            --------------------------------------------------------------- */}
            <section
              aria-labelledby="cs-section-overview"
              className="rounded-[20px] sm:rounded-[26px] bg-[#0B0D14] text-white p-5 sm:p-7 lg:p-8 border border-zinc-900 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-center">
                {/* Left: Category/Industry, Title, Intro & Single Platforms List */}
                <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-[0.12em]">
                    <span className="font-semibold text-emerald-400">
                      01 · Campaign Overview
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">
                      ·
                    </span>
                    <span className="text-zinc-300">{caseStudy.category}</span>
                    <span aria-hidden="true" className="text-zinc-600">
                      ·
                    </span>
                    <span className="text-zinc-400">
                      {caseStudy.clientIndustry}
                    </span>
                  </div>

                  <h2
                    id="cs-section-overview"
                    className="font-display font-bold text-xl min-[375px]:text-2xl sm:text-3xl lg:text-[2.15rem] text-white tracking-[-0.025em] leading-[1.15] [text-wrap:balance]"
                  >
                    {caseStudy.title}
                  </h2>

                  <p className="text-[13px] sm:text-sm text-zinc-300 leading-relaxed">
                    {caseStudy.summary}
                  </p>

                  {/* Platforms & Tools (Displayed Only Once Across Entire Popup) */}
                  {caseStudy.platforms.length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mr-1">
                        Platforms &amp; Tools:
                      </span>
                      {caseStudy.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 font-mono text-[10.5px] sm:text-[11px] text-zinc-200 whitespace-nowrap"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Single Prominent Primary Result Highlight */}
                <div className="lg:col-span-5 rounded-2xl bg-[#111521] border border-white/10 p-4 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      Primary Outcome
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[10px] text-emerald-300 shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  <div>
                    <div className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none tabular-nums">
                      {caseStudy.primaryMetric}
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-emerald-300 mt-1.5">
                      {caseStudy.metricLabel}
                    </div>
                  </div>

                  {showDistinctSecondaryMetric && (
                    <div className="pt-3 border-t border-white/10 flex items-baseline justify-between gap-2">
                      <span className="text-[11px] font-mono text-zinc-400">
                        {caseStudy.secondaryMetricLabel}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base text-white tabular-nums">
                        {caseStudy.secondaryMetric}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ---------------------------------------------------------------
                02. BUSINESS GOAL & SCOPE  |  03. ACCOUNT DIAGNOSIS
            --------------------------------------------------------------- */}
            {(caseStudy.campaignObjective || caseStudy.challenges.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* 02. Business Goal & Scope */}
                {caseStudy.campaignObjective && (
                  <section
                    aria-labelledby="cs-section-goal"
                    className="rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B] shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                            02 · Business Goal &amp; Scope
                          </span>
                          <h3
                            id="cs-section-goal"
                            className="font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug"
                          >
                            Client Objective &amp; Scope
                          </h3>
                        </div>
                      </div>

                      <p className="text-[13px] sm:text-sm text-zinc-700 leading-relaxed">
                        {caseStudy.campaignObjective}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-zinc-200/80 grid grid-cols-2 gap-3 text-xs">
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase text-zinc-400">
                          Industry
                        </span>
                        <span className="font-display font-bold text-[#09090B] block truncate">
                          {caseStudy.clientIndustry}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase text-zinc-400">
                          Campaign Focus
                        </span>
                        <span className="font-display font-bold text-[#09090B] block truncate">
                          {caseStudy.secondaryMetricLabel || caseStudy.category}
                        </span>
                      </div>
                    </div>
                  </section>
                )}

                {/* 03. Account Diagnosis — Challenges Identified */}
                {caseStudy.challenges.length > 0 && (
                  <section
                    aria-labelledby="cs-section-diagnosis"
                    className="rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B] shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                          03 · Account Diagnosis
                        </span>
                        <h3
                          id="cs-section-diagnosis"
                          className="font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug"
                        >
                          Challenges Identified
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {caseStudy.challenges.map((challenge, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed"
                        >
                          <span className="w-5 h-5 rounded-full bg-zinc-200/80 text-[#09090B] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                            {i + 1}
                          </span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {/* ---------------------------------------------------------------
                04. STRATEGY & EXECUTION  |  05. CAMPAIGN ARCHITECTURE
            --------------------------------------------------------------- */}
            {(caseStudy.strategy.length > 0 ||
              caseStudy.campaignStructure.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* 04. Strategy & Execution */}
                {caseStudy.strategy.length > 0 && (
                  <section
                    aria-labelledby="cs-section-strategy"
                    className="rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 shrink-0">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                          04 · Strategy &amp; Execution
                        </span>
                        <h3
                          id="cs-section-strategy"
                          className="font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug"
                        >
                          Approach &amp; Optimizations
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {caseStudy.strategy.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* 05. Campaign Architecture & Implementation */}
                {caseStudy.campaignStructure.length > 0 && (
                  <section
                    aria-labelledby="cs-section-architecture"
                    className="rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B] shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                          05 · Campaign Architecture
                        </span>
                        <h3
                          id="cs-section-architecture"
                          className="font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug"
                        >
                          Technical Implementation
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {caseStudy.campaignStructure.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {/* ---------------------------------------------------------------
                06. CONVERSION TRACKING SETUP
            --------------------------------------------------------------- */}
            {caseStudy.trackingSetup.length > 0 && (
              <section
                aria-labelledby="cs-section-tracking"
                className="rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      06 · Conversion Tracking Setup
                    </span>
                    <h3
                      id="cs-section-tracking"
                      className="font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug"
                    >
                      Measurement &amp; Attribution Configuration
                    </h3>
                  </div>
                </div>

                <ul
                  className={`grid grid-cols-1 ${
                    caseStudy.trackingSetup.length > 1 ? 'md:grid-cols-2' : ''
                  } gap-3`}
                >
                  {caseStudy.trackingSetup.map((track, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl bg-white border border-zinc-200/90 p-3.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{track}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ---------------------------------------------------------------
                07. CAMPAIGN VISUAL PRESENTATION (FINAL SECTION — END OF POPUP)
            --------------------------------------------------------------- */}
            {allImages.length > 0 && (
              <section
                aria-labelledby="cs-section-visuals"
                className="pt-2 border-t border-zinc-200/80"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      07 · Campaign Visual Presentation
                    </span>
                    <h3
                      id="cs-section-visuals"
                      className="font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug"
                    >
                      Campaign Evidence &amp; Screenshots
                    </h3>
                  </div>
                  <span className="text-[11px] sm:text-xs text-zinc-500 font-mono">
                    Tap any visual to expand
                  </span>
                </div>

                {/* Mobile (< 768px): Intentional Touch Swipe Gallery */}
                <div className="md:hidden">
                  <div
                    ref={visualSliderRef}
                    onScroll={handleVisualScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 gap-3.5 -mx-4 px-4 pb-2 scrollbar-none slider-touch-track"
                  >
                    {allImages.map((img) => (
                      <div
                        key={img.id}
                        data-visual-slide="true"
                        onClick={() => setLightboxImage(img)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setLightboxImage(img);
                          }
                        }}
                        aria-label={`Inspect visual: ${img.caption}`}
                        className={`${
                          allImages.length > 1 ? 'w-[86%]' : 'w-full'
                        } shrink-0 snap-start rounded-[18px] overflow-hidden bg-[#090D16] border border-zinc-200 cursor-pointer shadow-sm`}
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null;
                              target.src = buildFallbackSvg(
                                caseStudy.title,
                                caseStudy.primaryMetric
                              );
                            }}
                            className="w-full h-full object-cover object-[50%_54%]"
                          />
                        </div>
                        <div className="px-3.5 py-3 bg-[#FAFAFA] border-t border-zinc-200/80 flex items-center justify-between gap-2.5">
                          <span className="text-xs text-zinc-700 line-clamp-2 leading-snug">
                            {img.caption}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-zinc-200 text-[10.5px] font-mono font-semibold text-[#09090B] shrink-0">
                            <Maximize2 className="w-3 h-3" />
                            <span>Zoom</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {allImages.length > 1 && (
                    <div className="pt-2.5 flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-zinc-500 tabular-nums">
                        <strong className="text-[#09090B]">
                          {String(activeVisualSlide + 1).padStart(2, '0')}
                        </strong>{' '}
                        / {String(allImages.length).padStart(2, '0')} · Swipe visuals
                      </span>

                      <div
                        className="flex items-center gap-1"
                        role="tablist"
                        aria-label="Campaign visual slides"
                      >
                        {allImages.map((img, i) => (
                          <button
                            key={img.id}
                            type="button"
                            onClick={() => scrollToVisualSlide(i)}
                            aria-label={`View screenshot ${i + 1}`}
                            aria-selected={activeVisualSlide === i}
                            className="p-1.5 cursor-pointer flex items-center justify-center"
                          >
                            <span
                              className={`block h-1.5 rounded-full transition-all duration-300 ${
                                activeVisualSlide === i
                                  ? 'w-5 bg-[#09090B]'
                                  : 'w-1.5 bg-zinc-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tablet & Desktop (>= 768px): Unobstructed Two-Column Gallery */}
                <div
                  className={`hidden md:grid gap-5 ${
                    allImages.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'
                  }`}
                >
                  {allImages.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setLightboxImage(img)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setLightboxImage(img);
                        }
                      }}
                      className="group relative rounded-[20px] overflow-hidden bg-[#090D16] border border-zinc-200 cursor-pointer shadow-sm"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = buildFallbackSvg(
                              caseStudy.title,
                              caseStudy.primaryMetric
                            );
                          }}
                          className="w-full h-full object-cover object-[50%_54%] transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="px-4 py-3 bg-[#FAFAFA] border-t border-zinc-200/80 flex items-center justify-between gap-2">
                        <span className="text-xs text-zinc-600 truncate">
                          {img.caption}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#09090B] shrink-0">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* =================================================================
              3. STICKY BOTTOM FOOTER BAR (Mobile-Ergonomic 44px+ Tap Targets)
          ================================================================= */}
          <div className="shrink-0 px-3.5 sm:px-7 py-3 sm:py-4 bg-[#FAFAFA] border-t border-zinc-200 flex items-center justify-between gap-2.5 sm:gap-3">
            <span className="hidden sm:inline font-mono text-xs text-zinc-500">
              Case Study {formattedNumber} of {formattedTotal} · Managed by
              Zahidul Islam
            </span>

            <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] sm:min-h-0 px-3 min-[375px]:px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-xs sm:text-sm font-display font-semibold text-zinc-700 transition-colors cursor-pointer shrink-0"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="min-h-[44px] sm:min-h-0 inline-flex items-center justify-center gap-1.5 min-[375px]:gap-2 px-3 min-[375px]:px-4 sm:px-5 py-2.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-[11.5px] min-[375px]:text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer flex-1 sm:flex-initial whitespace-nowrap"
              >
                <span>Discuss a Similar Campaign</span>
                <ArrowRight className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 shrink-0" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Overlay for Full-Screen Visual Inspection */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100000] bg-black/92 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="mb-3 ml-auto px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <span>Close Preview</span>
              <X className="w-3.5 h-3.5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto max-h-[80dvh] object-contain rounded-2xl border border-white/15 bg-[#090D16]"
            />
            <p className="mt-3 text-center text-xs font-mono text-zinc-300 px-2">
              {lightboxImage.caption}
            </p>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default CaseStudyDetailModal;
