import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Target,
  TrendingUp,
} from 'lucide-react';
import { trackCtaClick, trackWhatsAppClick } from '../utils/tracking';

interface CaseStudiesPortfolioCtaProps {
  onOpenBooking: () => void;
}

const WHATSAPP_PROJECT_URL =
  'https://wa.me/8801911184235?text=Hello%20Zahidul%2C%20I%20would%20like%20to%20discuss%20a%20marketing%20project.';

const PILLARS = [
  { label: 'Targeting', icon: Target },
  { label: 'Tracking', icon: Activity },
  { label: 'Performance', icon: TrendingUp },
] as const;

export const CaseStudiesPortfolioCta: React.FC<
  CaseStudiesPortfolioCtaProps
> = ({ onOpenBooking }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="region"
      aria-labelledby="portfolio-cta-heading"
      data-testid="portfolio-conversion-cta"
      className="mt-10 sm:mt-14 lg:mt-16"
    >
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 18 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative rounded-[24px] sm:rounded-[30px] bg-white border border-zinc-200/90 shadow-[0_24px_60px_-24px_rgba(9,9,11,0.1)] overflow-hidden"
      >
          {/* Subtle top emerald accent bar & ambient light wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500/80 via-lime-400/90 to-emerald-500/30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.11)_0%,rgba(163,230,53,0.06)_45%,transparent_72%)] blur-2xl"
          />

          <div className="relative z-10 p-6 sm:p-9 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Editorial Headline, Supporting Copy & Dual CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div
                aria-hidden="true"
                className="mb-4 inline-flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.55)]" />
                <span className="h-[1.5px] w-10 rounded-full bg-gradient-to-r from-emerald-500/70 to-transparent" />
              </div>

              <h3
                id="portfolio-cta-heading"
                className="font-display font-bold text-[1.75rem] min-[390px]:text-[1.95rem] sm:text-4xl lg:text-[2.65rem] text-[#09090B] tracking-[-0.03em] leading-[1.1] text-balance"
              >
                Your Next Success Story{' '}
                <span className="font-serif italic font-normal text-[#09090B]">
                  Starts Here.
                </span>
              </h3>

              <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-[1.65] max-w-xl">
                Whether you&apos;re scaling an eCommerce store or generating
                qualified leads, let&apos;s build an advertising strategy backed
                by the right targeting, tracking, and performance data.
              </p>

              <div className="mt-7 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackCtaClick({
                      ctaText: "Let's Discuss Your Project",
                      ctaLocation: 'case_studies_page_portfolio_cta',
                    });
                    onOpenBooking();
                  }}
                  data-testid="portfolio-cta-primary"
                  className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-7 py-3.5 min-h-[48px] rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-bold text-sm border border-[#09090B] shadow-[0_14px_30px_-10px_rgba(9,9,11,0.35)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer touch-manipulation whitespace-nowrap"
                >
                  <span>Let&apos;s Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
                </button>

                <a
                  href={WHATSAPP_PROJECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      buttonText: 'Connect on WhatsApp',
                      buttonLocation: 'case_studies_page_portfolio_cta',
                      linkUrl: 'https://wa.me/8801911184235',
                    })
                  }
                  data-testid="portfolio-cta-whatsapp"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-xl bg-[#FAFAFA] hover:bg-emerald-50/70 text-[#09090B] font-display font-semibold text-sm border border-zinc-300/90 hover:border-emerald-500/50 transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer touch-manipulation whitespace-nowrap"
                >
                  <span>Connect on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Minimalist Campaign Growth & Attribution Visual */}
            <div
              aria-hidden="true"
              className="hidden lg:flex lg:col-span-5 flex-col justify-between rounded-[22px] bg-[#FAFAFA] border border-zinc-200/85 p-6 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 bg-dot-matrix-light opacity-70 [mask-image:radial-gradient(ellipse_85%_85%_at_50%_50%,#000_35%,transparent_95%)]" />

              {/* Decorative Growth Trajectory SVG */}
              <div className="relative z-10 rounded-2xl bg-white border border-zinc-200/80 p-4 shadow-[0_8px_24px_-12px_rgba(9,9,11,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-16 rounded-full bg-zinc-200" />
                  </div>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.2} />
                  </span>
                </div>

                <svg
                  viewBox="0 0 280 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-[84px] overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="portfolioCtaGrowthFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="86"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0%"
                        stopColor="#10B981"
                        stopOpacity="0.22"
                      />
                      <stop
                        offset="100%"
                        stopColor="#10B981"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {/* Subtle horizontal guide lines */}
                  <line
                    x1="0"
                    y1="22"
                    x2="280"
                    y2="22"
                    stroke="#E4E4E7"
                    strokeDasharray="3 4"
                  />
                  <line
                    x1="0"
                    y1="52"
                    x2="280"
                    y2="52"
                    stroke="#E4E4E7"
                    strokeDasharray="3 4"
                  />

                  {/* Subtle vertical campaign cadence bars */}
                  <rect
                    x="14"
                    y="62"
                    width="14"
                    height="20"
                    rx="4"
                    fill="#E4E4E7"
                  />
                  <rect
                    x="56"
                    y="54"
                    width="14"
                    height="28"
                    rx="4"
                    fill="#E4E4E7"
                  />
                  <rect
                    x="98"
                    y="48"
                    width="14"
                    height="34"
                    rx="4"
                    fill="#D4D4D8"
                  />
                  <rect
                    x="140"
                    y="38"
                    width="14"
                    height="44"
                    rx="4"
                    fill="#A7F3D0"
                  />
                  <rect
                    x="182"
                    y="28"
                    width="14"
                    height="54"
                    rx="4"
                    fill="#6EE7B7"
                  />
                  <rect
                    x="224"
                    y="18"
                    width="14"
                    height="64"
                    rx="4"
                    fill="#34D399"
                  />

                  {/* Smooth upward performance curve */}
                  <path
                    d="M4 72C36 69 54 58 84 56C114 54 136 42 168 35C200 28 228 18 268 8V82H4V72Z"
                    fill="url(#portfolioCtaGrowthFill)"
                  />
                  <path
                    d="M4 72C36 69 54 58 84 56C114 54 136 42 168 35C200 28 228 18 268 8"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="268" cy="8" r="4.5" fill="#10B981" />
                  <circle
                    cx="268"
                    cy="8"
                    r="9.5"
                    fill="#84CC16"
                    fillOpacity="0.28"
                  />
                </svg>
              </div>

              {/* Three Strategy Pillars Matching Supporting Copy */}
              <div className="relative z-10 mt-4 grid grid-cols-3 gap-2.5">
                {PILLARS.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white border border-zinc-200/80 px-3 py-2.5 flex flex-col items-start gap-1.5 shadow-[0_4px_12px_-6px_rgba(9,9,11,0.05)]"
                  >
                    <span className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                    <span className="font-mono text-[10.5px] font-semibold text-zinc-700">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </motion.div>
    </div>
  );
};

export default CaseStudiesPortfolioCta;
