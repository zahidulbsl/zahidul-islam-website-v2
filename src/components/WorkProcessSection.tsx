import React from 'react';
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

        {/* 2. ASYMMETRIC BENTO PROCESS GRID (7/5 and 5/7 on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
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
                onClick={onOpenBooking}
                className={`group relative overflow-hidden ${gridSpan} rounded-[28px] border p-6 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  featured
                    ? 'bg-[#09090B] border-zinc-800 text-white shadow-[0_20px_50px_-15px_rgba(9,9,11,0.35)]'
                    : 'bg-white border-zinc-200/90 hover:border-zinc-400 text-[#09090B] shadow-[0_12px_32px_-10px_rgba(9,9,11,0.05)]'
                }`}
              >
                {/* TOP ROW: STAGE NUMBER & ICON */}
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <span
                      className={`text-[11px] font-mono uppercase tracking-[0.18em] font-semibold ${
                        featured ? 'text-lime-400' : 'text-emerald-700'
                      }`}
                    >
                      Stage {step.stepNumber} · {step.stage}
                    </span>

                    <span
                      className={`block mt-1 font-display font-extrabold text-5xl sm:text-6xl leading-none tracking-tighter tabular-nums ${
                        featured ? 'text-white/20' : 'text-zinc-900/12'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                  </div>

                  <div
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-colors ${
                      featured
                        ? 'bg-white/10 border-white/15 text-lime-400 group-hover:bg-white group-hover:text-[#09090B]'
                        : 'bg-zinc-100 border-zinc-200 text-[#09090B] group-hover:bg-[#09090B] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* BOTTOM ROW: TITLE, SUBTITLE & KEY ACTIVITIES */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
                  <div className="sm:col-span-5">
                    <h3
                      className={`font-display font-bold text-xl sm:text-2xl tracking-tight leading-snug ${
                        featured ? 'text-white' : 'text-[#09090B]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${
                        featured ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="sm:col-span-7">
                    <span
                      className={`block mb-2.5 text-[10px] font-mono uppercase tracking-[0.16em] font-semibold ${
                        featured ? 'text-zinc-400' : 'text-zinc-400'
                      }`}
                    >
                      Key Deliverables &amp; Actions
                    </span>

                    <div className="space-y-2">
                      {step.activities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
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
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-[#09090B] text-xs sm:text-sm font-display font-bold transition-all cursor-pointer shadow-lg"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleAuditClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-white text-xs sm:text-sm font-display font-semibold transition-all cursor-pointer"
                >
                  <span>Request an Ads Audit</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
