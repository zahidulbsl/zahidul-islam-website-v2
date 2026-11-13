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
  BarChart3,
  BookOpen,
  Maximize2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Wrench,
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
    <text x="80" y="120" fill="#9CA3AF" font-family="monospace" font-size="14" letter-spacing="2">ZAHIDUL PRO · VERIFIED CAMPAIGN</text>
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
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLightboxImage(null);
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [caseStudy?.id]);

  const currentIndex = caseStudy
    ? CASE_STUDIES.findIndex((project) => project.id === caseStudy.id)
    : -1;
  const totalCount = CASE_STUDIES.length;

  const allImages = caseStudy
    ? [caseStudy.coverImage, ...caseStudy.galleryImages].slice(0, 2)
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

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-6 overflow-hidden"
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

        {/* Editorial Dashboard Modal Container */}
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          data-lenis-prevent="true"
          className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-[26px] sm:rounded-[32px] bg-white text-[#09090B] border border-zinc-200 shadow-[0_32px_95px_rgba(0,0,0,0.7)] overflow-hidden overscroll-contain"
        >
          {/* =================================================================
              1. STICKY TOP CONTROL BAR (Project Number, Category, Prev/Next/Close)
          ================================================================= */}
          <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-8 py-4 bg-[#090B10] text-white border-b border-white/10 z-20">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-xs font-bold text-emerald-300 shrink-0">
                Case {formattedNumber} / {formattedTotal}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-zinc-200 truncate">
                {caseStudy.category}
              </span>
              <span className="hidden md:inline font-serif italic text-sm text-zinc-400 truncate">
                {caseStudy.clientIndustry}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onSelectCaseStudy && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevProject}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    title="Previous Case Study (Arrow Left)"
                    aria-label="Previous Case Study"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextProject}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    title="Next Case Study (Arrow Right)"
                    aria-label="Next Case Study"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-[#09090B] border border-white/15 transition-colors cursor-pointer ml-1"
                title="Close Case Study (Escape)"
                aria-label="Close case study modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =================================================================
              2. INDEPENDENTLY SCROLLABLE EDITORIAL DASHBOARD BODY
          ================================================================= */}
          <div
            ref={modalBodyRef}
            data-lenis-prevent="true"
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-5 sm:p-8 lg:p-10 space-y-8 [-webkit-overflow-scrolling:touch]"
          >
            {/* ---------------------------------------------------------------
                A. HERO OVERVIEW & PRIMARY METRIC DASHBOARD BANNER
            --------------------------------------------------------------- */}
            <div className="rounded-[24px] sm:rounded-[28px] bg-[#0B0D14] text-white p-6 sm:p-8 lg:p-9 border border-zinc-900 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
                {/* Left: Title, Overview & Platforms (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {caseStudy.clientIndustry} · Verified Campaign Dossier
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-[-0.025em] leading-[1.12]">
                    {caseStudy.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {caseStudy.summary}
                  </p>

                  {/* Platforms & Tools */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mr-1">
                      Platforms &amp; Tools:
                    </span>
                    {caseStudy.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 font-mono text-[11px] text-zinc-200"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Primary Performance Metric & Supporting Metrics (5 Cols) */}
                <div className="lg:col-span-5 rounded-2xl bg-[#111521] border border-white/10 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      Primary Performance Metric
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[10px] text-emerald-300">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  <div>
                    <div className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-none">
                      {caseStudy.primaryMetric}
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-emerald-300 mt-1.5">
                      {caseStudy.metricLabel}
                    </div>
                  </div>

                  {/* Supporting Metrics Grid */}
                  <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {caseStudy.results.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                      >
                        <div className="font-display font-bold text-sm sm:text-base text-white truncate">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                B. CAMPAIGN VISUAL SHOWCASE (Click to Expand)
            --------------------------------------------------------------- */}
            {allImages.length > 0 && (
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-500">
                    01 · Campaign Visual Presentation
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    Click any visual to inspect full screen
                  </span>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    allImages.length > 1 ? 'md:grid-cols-2' : ''
                  } gap-5`}
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
                      <div className="aspect-[16/10] w-full overflow-hidden">
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
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
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
              </div>
            )}

            {/* ---------------------------------------------------------------
                C. CLIENT REQUIREMENTS & INITIAL AUDIT (2-Column Grid)
            --------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Requirements & Project Overview */}
              <div className="rounded-[22px] bg-[#FAFAFA] border border-zinc-200/90 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                    <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B]">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        02 · Business Goal
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B]">
                        Campaign Objective &amp; Scope
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    {caseStudy.campaignObjective}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-200/80 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-zinc-400">
                      Industry
                    </span>
                    <span className="font-display font-bold text-[#09090B]">
                      {caseStudy.clientIndustry}
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-zinc-400">
                      Primary Channel
                    </span>
                    <span className="font-display font-bold text-[#09090B]">
                      {caseStudy.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Initial Audit */}
              <div className="rounded-[22px] bg-[#FAFAFA] border border-zinc-200/90 p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B]">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      03 · Account Diagnosis
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B]">
                      Bottlenecks &amp; Challenges Solved
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {caseStudy.challenges.map((challenge, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-zinc-200/80 text-[#09090B] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                D. CAMPAIGN STRATEGY & IMPLEMENTATION / OPTIMIZATION (2-Column Grid)
            --------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campaign Strategy & Optimization */}
              <div className="rounded-[22px] bg-[#FAFAFA] border border-zinc-200/90 p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      04 · Execution &amp; Optimization
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B]">
                      How We Solved It
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {caseStudy.strategy.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Implementation & Conversion Tracking */}
              <div className="rounded-[22px] bg-[#FAFAFA] border border-zinc-200/90 p-5 sm:p-6 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80">
                    <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        05 · Implementation
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B]">
                        Campaign Architecture
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {caseStudy.campaignStructure.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conversion Tracking Sub-Box */}
                {caseStudy.trackingSetup.length > 0 && (
                  <div className="rounded-xl bg-white border border-zinc-200/90 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#09090B]">
                        06 · Conversion Tracking Setup
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {caseStudy.trackingSetup.map((track, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-zinc-600 leading-relaxed"
                        >
                          • {track}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* ---------------------------------------------------------------
                E. DOCUMENTED RESULTS & KEY TAKEAWAYS
            --------------------------------------------------------------- */}
            <div className="rounded-[24px] bg-emerald-50/70 border border-emerald-200/90 p-5 sm:p-7 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-700" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-900">
                    07 · Documented Campaign Results
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-800">
                  Verified Portfolio Record
                </span>
              </div>

              <p className="font-display font-bold text-lg sm:text-xl text-[#09090B]">
                {caseStudy.results.highlight}
              </p>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {caseStudy.results.summary}
              </p>

              {caseStudy.keyTakeaways.length > 0 && (
                <div className="pt-4 border-t border-emerald-200/80">
                  <div className="flex items-center gap-2 mb-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                      Key Takeaways
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {caseStudy.keyTakeaways.map((takeaway, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-white/90 border border-emerald-200/80 text-xs text-zinc-700 leading-relaxed"
                      >
                        {takeaway}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ---------------------------------------------------------------
                F. PLATFORMS & TOOLS USED
            --------------------------------------------------------------- */}
            <div className="rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-zinc-600 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#09090B]">
                  Platforms &amp; Tools
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseStudy.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-3 py-1 rounded-lg bg-white border border-zinc-200/90 font-mono text-xs font-medium text-zinc-800"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================================
              3. STICKY BOTTOM FOOTER BAR
          ================================================================= */}
          <div className="shrink-0 px-5 sm:px-8 py-4 bg-[#FAFAFA] border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-xs text-zinc-500">
              Case Study {formattedNumber} of {formattedTotal} · Managed by
              Zahidul Islam
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-xs sm:text-sm font-display font-semibold text-zinc-700 transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer flex-1 sm:flex-initial"
              >
                <span>Discuss a Similar Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Overlay for Full-Screen Visual Inspection */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100000] bg-black/92 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-11 right-0 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <span>Close Preview</span>
              <X className="w-3.5 h-3.5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto max-h-[82vh] object-contain rounded-2xl border border-white/15 bg-[#090D16]"
            />
            <p className="mt-3 text-center text-xs font-mono text-zinc-300">
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
