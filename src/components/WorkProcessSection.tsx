import React, { useState, useRef } from 'react';
import {
  Search,
  Target,
  Rocket,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

interface WorkProcessSectionProps {
  onOpenBooking?: () => void;
  onRequestAudit?: () => void;
}

const steps = [
  {
    stepNumber: '01',
    stage: 'AUDIT & TRACKING',
    title: 'Audit & Tracking Foundation',
    icon: Search,
    subtitle:
      'Reviewing your business model, target audience, website journey, and existing ad accounts or tracking setup to uncover wasted spend and growth opportunities.',
    activities: [
      'Understand your services, products, and target locations',
      'Audit existing Google Ads or Meta Ads account performance',
      'Review website landing pages, forms, and checkout flow',
      'Check GA4, Google Tag Manager, and pixel tracking accuracy',
    ],
    featured: false,
  },
  {
    stepNumber: '02',
    stage: 'STRATEGY & SETUP',
    title: 'Strategy & Restructuring',
    icon: Target,
    subtitle:
      'Building a clear campaign structure, keyword or audience targeting plan, persuasive ad copy, and reliable conversion tracking before launching or scaling.',
    activities: [
      'Structure Google Search, Shopping, PMax, or Meta campaigns',
      'Research high-intent keywords, negative lists, and audiences',
      'Write clear, customer-focused ad headlines and descriptions',
      'Configure GA4, GTM, Meta Pixel, and Conversions API tracking',
    ],
    featured: false,
  },
  {
    stepNumber: '03',
    stage: 'OPTIMIZE',
    title: 'Optimize & Test',
    icon: Rocket,
    subtitle:
      'Monitoring campaign performance closely to filter out irrelevant searches, test ad variations, refine bidding, and focus budget on what converts.',
    activities: [
      'Prune wasteful search queries and expand negative keywords',
      'Test ad copy variations, creative hooks, and audience segments',
      'Adjust bids, device settings, and location targeting',
      'Monitor cost per lead, conversion quality, and ROAS',
    ],
    featured: true,
  },
  {
    stepNumber: '04',
    stage: 'MEASURE',
    title: 'Measure & Improve',
    icon: TrendingUp,
    subtitle:
      'Tracking verified leads and sales, sharing straightforward performance updates, and making continuous improvements aligned with your business goals.',
    activities: [
      'Verify phone call, lead form, and purchase attribution',
      'Share clear, jargon-free performance summaries',
      'Reallocate budget toward highest-performing campaigns',
      'Plan next-step tests for steady, sustainable improvement',
    ],
    featured: false,
  },
];

export const WorkProcessSection: React.FC<WorkProcessSectionProps> = ({
  onOpenBooking,
  onRequestAudit,
}) => {
  const [activeProcessSlide, setActiveProcessSlide] = useState(0);
  const processSliderRef = useRef<HTMLDivElement>(null);

  const handleProcessScroll = () => {
    if (!processSliderRef.current) return;
    const container = processSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-process-card="true"]');
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
    setActiveProcessSlide(closestIndex);
  };

  const scrollToProcessSlide = (index: number) => {
    if (!processSliderRef.current) return;
    const container = processSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-process-card="true"]');
    const card = cards[index];
    if (card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      container.scrollTo({
        left: container.scrollLeft + (cardRect.left - containerRect.left),
        behavior: 'smooth',
      });
      setActiveProcessSlide(index);
    }
  };

  const handleAuditClick = () => {
    if (onRequestAudit) {
      onRequestAudit();
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <section
      id="process"
      className="relative overflow-hidden scroll-mt-20 border-b border-zinc-200/80 bg-[#FAFAFA] text-[#09090B] py-20 sm:py-24 lg:py-32"
    >
      {/* Subtle Top Editorial Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-dot-matrix-light opacity-70 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. CENTERED EDITORIAL HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="dm-pill-light mb-4">
            How We Work Together
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-[-0.03em] text-[#09090B]">
            A Clear Working Process.{' '}
            <span className="font-serif italic font-normal text-[#09090B] block sm:inline">
              Complete Transparency.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
            From the initial account audit to weekly campaign optimization and
            reporting, every step is structured, collaborative, and focused on
            measurable business outcomes.
          </p>
        </div>

        {/* 2. ASYMMETRIC BENTO PROCESS GRID (Horizontal Swipe on Mobile, 7/5 and 5/7 on Desktop) */}
        <div
          ref={processSliderRef}
          onScroll={handleProcessScroll}
          className="flex sm:grid sm:grid-cols-1 lg:grid-cols-12 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none scroll-pl-4 sm:scroll-pl-0 gap-3.5 sm:gap-6 items-stretch -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-none slider-touch-track"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const featured = step.featured;

            const gridSpan =
              index === 0
                ? 'lg:col-span-7'
                : index === 1
                  ? 'lg:col-span-5'
                  : index === 2
                    ? 'lg:col-span-5'
                    : 'lg:col-span-7';

            return (
              <article
                key={step.stepNumber}
                data-process-card="true"
                onClick={onOpenBooking}
                className={`group relative overflow-hidden w-[85vw] max-w-[345px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink ${gridSpan} rounded-[24px] sm:rounded-[28px] border p-5 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  featured
                    ? 'bg-[#09090B] border-zinc-800 text-white shadow-[0_20px_50px_-15px_rgba(9,9,11,0.35)]'
                    : 'bg-white border-zinc-200/90 hover:border-zinc-400 text-[#09090B] shadow-[0_12px_32px_-10px_rgba(9,9,11,0.05)]'
                }`}
              >
                {/* TOP ROW: STAGE NUMBER & ICON */}
                <div className="flex items-start justify-between gap-4 mb-4 sm:mb-8">
                  <div>
                    <span
                      className={`text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] font-semibold ${
                        featured ? 'text-lime-400' : 'text-emerald-700'
                      }`}
                    >
                      Stage {step.stepNumber} · {step.stage}
                    </span>

                    <span
                      className={`block mt-1 font-display font-extrabold text-4xl sm:text-6xl leading-none tracking-tighter tabular-nums ${
                        featured ? 'text-white/20' : 'text-zinc-900/12'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                  </div>

                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-colors shrink-0 ${
                      featured
                        ? 'bg-white/10 border-white/15 text-lime-400 group-hover:bg-white group-hover:text-[#09090B]'
                        : 'bg-zinc-100 border-zinc-200 text-[#09090B] group-hover:bg-[#09090B] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                </div>

                {/* BOTTOM ROW: TITLE, SUBTITLE & KEY ACTIVITIES */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-end">
                  <div className="sm:col-span-5">
                    <h3
                      className={`font-display font-bold text-lg sm:text-2xl tracking-tight leading-snug ${
                        featured ? 'text-white' : 'text-[#09090B]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`mt-2 sm:mt-2.5 text-xs sm:text-sm leading-relaxed ${
                        featured ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="sm:col-span-7">
                    <span
                      className={`block mb-2 sm:mb-2.5 text-[10px] font-mono uppercase tracking-[0.16em] font-semibold ${
                        featured ? 'text-zinc-400' : 'text-zinc-400'
                      }`}
                    >
                      Key Deliverables &amp; Actions
                    </span>

                    <div className="space-y-1.5 sm:space-y-2">
                      {step.activities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-2 sm:gap-2.5">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${
                              featured ? 'text-lime-400' : 'text-emerald-600'
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-[13px] leading-snug ${
                              featured ? 'text-zinc-200' : 'text-zinc-700'
                            }`}
                          >
                            {activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Swipe Navigation & Pagination Indicators */}
        <div className="sm:hidden pt-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-zinc-600">
            <span className="font-bold text-[#09090B]">
              0{activeProcessSlide + 1}
            </span>
            <span>/</span>
            <span>0{steps.length}</span>
            <span className="ml-1">· Swipe process</span>
          </div>

          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Process stages pagination"
          >
            {steps.map((st, i) => (
              <button
                key={st.stepNumber}
                type="button"
                onClick={() => scrollToProcessSlide(i)}
                aria-label={`Go to stage ${i + 1}`}
                aria-selected={activeProcessSlide === i}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  activeProcessSlide === i
                    ? 'w-5 bg-[#09090B]'
                    : 'w-1.5 bg-zinc-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. PREMIUM CONVERSION CTA BANNER */}
        <div className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#090B10] border border-zinc-800 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 text-white shadow-[0_24px_60px_-18px_rgba(9,9,11,0.3)]">
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

                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-[-0.025em] leading-[1.15]">
                  Ready to Get More From Your{' '}
                  <span className="font-serif italic font-normal text-emerald-300">
                    Advertising?
                  </span>
                </h3>

                <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-zinc-300">
                  Your next stage of growth starts with the right strategy.
                  Let&apos;s identify what&apos;s holding your campaigns back
                  and find opportunities to improve lead quality, conversion
                  tracking, and advertising performance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
                <button
                  type="button"
                  onClick={handleAuditClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-[#09090B] text-xs sm:text-sm font-display font-bold transition-all cursor-pointer shadow-lg"
                >
                  <span>Request an Ads Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/8801911184235?text=Hello%20Zahidul%2C%20I%20would%20like%20to%20discuss%20a%20marketing%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-white text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer"
                >
                  <span>WhatsApp Me</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
