import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { TESTIMONIALS, Testimonial } from '../data/testimonials';
import {
  Star,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Quote,
  ArrowUpRight,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { scrollToSection } from '../utils/scroll';
import { useBodyScrollLock } from '../utils/bodyScrollLock';

interface TestimonialsSectionProps {
  onOpenBooking?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenBooking,
}) => {
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(
    null
  );
  const reviewContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reviewContentRef.current) {
      reviewContentRef.current.scrollTop = 0;
    }
  }, [selectedReviewIndex]);

  const totalReviews = TESTIMONIALS.length;

  const selectedReview: Testimonial | null =
    selectedReviewIndex !== null
      ? TESTIMONIALS[selectedReviewIndex] ?? null
      : null;

  const handleNextReview = () => {
    setSelectedReviewIndex((current) => {
      if (current === null || totalReviews === 0) return current;
      return (current + 1) % totalReviews;
    });
  };

  const handlePrevReview = () => {
    setSelectedReviewIndex((current) => {
      if (current === null || totalReviews === 0) return current;
      return (current - 1 + totalReviews) % totalReviews;
    });
  };

  const closeReview = () => setSelectedReviewIndex(null);

  useEffect(() => {
    if (selectedReviewIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeReview();
      if (e.key === 'ArrowRight') handleNextReview();
      if (e.key === 'ArrowLeft') handlePrevReview();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReviewIndex]);

  const isReviewModalOpen = selectedReviewIndex !== null;
  useBodyScrollLock(isReviewModalOpen);

  // Split 6 reviews into two rows of 3, repeated 4× so -50% translate3d loops seamlessly
  const row1Items = TESTIMONIALS.slice(0, 3).map((t, idx) => ({
    review: t,
    originalIndex: idx,
  }));
  const row2Items = TESTIMONIALS.slice(3, 6).map((t, idx) => ({
    review: t,
    originalIndex: idx + 3,
  }));

  const row1Repeated = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const row2Repeated = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  const renderReviewCard = (
    item: { review: Testimonial; originalIndex: number },
    loopKey: string
  ) => {
    const t = item.review;
    const initials = t.clientName
      .split(' ')
      .map((name) => name[0])
      .join('');

    return (
      <article
        key={loopKey}
        onClick={() => setSelectedReviewIndex(item.originalIndex)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedReviewIndex(item.originalIndex);
          }
        }}
        aria-label={`Read full review from ${t.clientName}`}
        className="group relative w-[310px] sm:w-[390px] h-[328px] sm:h-[336px] shrink-0 rounded-[26px] border border-zinc-200/90 bg-[#FAFAFA] hover:bg-white p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#09090B]/35 shadow-[0_10px_28px_-12px_rgba(9,9,11,0.05)] hover:shadow-[0_22px_45px_-14px_rgba(9,9,11,0.12)] cursor-pointer overflow-hidden select-none"
      >
        {/* TOP & QUOTE AREA */}
        <div className="flex flex-col min-h-0">
          {/* Slot 1: Fixed-Height Category & 5-Star Rating Row (h-6) */}
          <div className="h-6 flex items-center justify-between gap-2 shrink-0">
            <span className="font-serif italic text-sm text-zinc-600 truncate">
              {t.serviceCategory}
            </span>

            <div className="flex items-center gap-1 text-amber-500 shrink-0">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] font-bold text-[#09090B] ml-0.5">
                {t.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Slot 2: Fixed-Height Highlight Badge Row (h-7 mt-3) */}
          <div className="mt-3 h-7 flex items-center shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-[11px] font-mono font-semibold text-emerald-800 max-w-full truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">{t.projectHighlight}</span>
            </span>
          </div>

          {/* Slot 3: Fixed-Height Quote Container (h-[6.75rem] mt-4) */}
          <div className="mt-4 h-[6.75rem] overflow-hidden shrink-0">
            <p className="line-clamp-4 font-sans text-xs sm:text-[14px] leading-[1.68] text-zinc-700 group-hover:text-[#09090B] transition-colors">
              “{t.quote}”
            </p>
          </div>
        </div>

        {/* Slot 4: Fixed-Height Reviewer & Read Full Review Footer (h-[3.75rem]) */}
        <div className="pt-4 border-t border-zinc-200/80 h-[3.75rem] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#09090B] text-white font-display text-xs font-bold flex items-center justify-center shrink-0">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="font-display font-bold text-xs sm:text-sm text-[#09090B] truncate">
                {t.clientName}
              </div>
              <div className="text-[11px] text-zinc-500 truncate">
                {t.role} · {t.companyOrIndustry}
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white group-hover:bg-[#09090B] border border-zinc-200/90 group-hover:border-[#09090B] text-[11px] font-display font-semibold text-[#09090B] group-hover:text-white transition-colors shrink-0">
            <span>Read Full Review</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </article>
    );
  };

  return (
    <section
      id="reviews"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-zinc-200/80 bg-white text-[#09090B] py-20 sm:py-24 lg:py-32"
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
          className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center"
        >
          <span className="dm-pill-light mb-4">
            Verified Client Feedback
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.08]">
            Trusted by Founders &amp;{' '}
            <span className="font-serif italic font-normal text-[#09090B] block sm:inline">
              Marketing Teams.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-zinc-600">
            Direct feedback from clients across eCommerce, SaaS, healthcare, and
            local service industries—alongside verified marketplace ratings on
            Upwork and Fiverr.
          </p>
        </motion.div>
      </div>

      {/* ===================================================================
          2. CONTINUOUS TWO-ROW HORIZONTAL SCROLLING MARQUEE
             Restores smooth continuous horizontal scrolling with pause-on-hover
             while preserving the exact equal-dimension card design.
      =================================================================== */}
      <div
        className={`relative z-10 ${EDGE_FADE_CONTAINER_CLASS} space-y-5 sm:space-y-6 py-2 overflow-hidden`}
        style={EDGE_FADE_MASK_STYLE}
      >
        {/* Row 1: Right-to-Left Continuous Marquee */}
        <div className="flex overflow-hidden">
          <div className="flex gap-5 sm:gap-6 pr-5 sm:pr-6 w-max animate-reviews-rtl hover:[animation-play-state:paused]">
            {row1Repeated.map((item, idx) =>
              renderReviewCard(item, `row1-${item.review.id}-${idx}`)
            )}
          </div>
        </div>

        {/* Row 2: Left-to-Right Continuous Marquee */}
        <div className="flex overflow-hidden">
          <div className="flex gap-5 sm:gap-6 pr-5 sm:pr-6 w-max animate-reviews-ltr hover:[animation-play-state:paused]">
            {row2Repeated.map((item, idx) =>
              renderReviewCard(item, `row2-${item.review.id}-${idx}`)
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================
          3. BOTTOM REVIEW CTA BAR (Section 7 — Only "Book a Call" &
             "Let's Discuss Your Project")
      =================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 px-6 py-5 sm:px-8 sm:py-6 rounded-[24px] bg-[#FAFAFA] border border-zinc-200/90 text-center lg:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 hidden sm:block" />
            <p className="text-xs sm:text-sm font-medium text-zinc-700">
              <strong className="text-[#09090B]">Upwork:</strong> Top Rated ·
              100% Job Success · 15+ Projects | {' '}
              <strong className="text-[#09090B]">Fiverr:</strong> Top Rated ·
              5★ Rating · 685 Reviews
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-xs sm:text-sm font-display font-bold text-white transition-colors cursor-pointer"
            >
              <span>📞 Book Free Strategy Call</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-xs sm:text-sm font-display font-semibold text-[#09090B] transition-colors cursor-pointer"
            >
              <span>Let&apos;s Discuss Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================
          4. UNIFORM-DIMENSION REVIEW DETAIL MODAL
      =================================================================== */}
      {selectedReview &&
        selectedReviewIndex !== null &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`Full client review from ${selectedReview.clientName}`}
          >
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer touch-none"
              onClick={closeReview}
              aria-label="Close review modal backdrop"
            />

            <div
              data-lenis-prevent="true"
              className="relative z-10 w-full max-w-2xl h-[500px] sm:h-[470px] max-h-[88vh] flex flex-col rounded-[28px] border border-zinc-200 bg-white text-[#09090B] shadow-2xl overflow-hidden overscroll-contain"
            >
              {/* Modal Header */}
              <div className="shrink-0 flex items-center justify-between gap-3 border-b border-white/10 px-5 sm:px-7 py-4 bg-[#090B10] text-white text-xs z-20">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 font-mono font-bold text-emerald-300">
                    Review {String(selectedReviewIndex + 1).padStart(2, '0')} /{' '}
                    {String(totalReviews).padStart(2, '0')}
                  </span>
                  <span className="hidden text-zinc-300 sm:inline font-serif italic text-sm">
                    {selectedReview.serviceCategory}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevReview}
                    className="cursor-pointer rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 p-1.5 text-zinc-200 transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextReview}
                    className="cursor-pointer rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 p-1.5 text-zinc-200 transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={closeReview}
                    className="cursor-pointer rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-[#09090B] border border-white/15 p-1.5 transition-colors ml-1"
                    aria-label="Close review modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Body */}
              <div
                ref={reviewContentRef}
                data-lenis-prevent="true"
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 font-mono text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{selectedReview.projectHighlight}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-amber-500">
                      <div className="flex items-center gap-0.5">
                        {Array.from({
                          length: Math.max(
                            0,
                            Math.round(selectedReview.rating)
                          ),
                        }).map((_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="ml-1 font-mono text-xs font-bold text-[#09090B]">
                        {selectedReview.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Full Unedited Original Testimonial Quote */}
                  <div className="relative rounded-2xl border border-zinc-200/90 bg-[#FAFAFA] p-5 sm:p-6">
                    <Quote className="pointer-events-none absolute right-4 top-4 h-7 w-7 text-zinc-200" />
                    <p className="text-sm sm:text-base leading-relaxed text-[#09090B]">
                      “{selectedReview.quote}”
                    </p>
                  </div>
                </div>

                {/* Reviewer Metadata & Action Footer */}
                <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-display text-base font-bold text-[#09090B]">
                      {selectedReview.clientName}
                    </div>
                    <div className="text-xs text-zinc-600">
                      {selectedReview.role} · {selectedReview.companyOrIndustry}{' '}
                      ({selectedReview.location})
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>
                        {selectedReview.verifiedOrder
                          ? `${selectedReview.platform} Verified Review`
                          : selectedReview.platform}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      closeReview();
                      if (onOpenBooking) {
                        onOpenBooking();
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer shrink-0"
                  >
                    <span>Discuss Your Project</span>
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

export default TestimonialsSection;
