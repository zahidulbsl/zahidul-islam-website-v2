import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
  profileConfig?: HeroProfileConfig;
}

export interface HeroProfileMetric {
  label: string;
  value: string;
}

export interface HeroProfileConfig {
  name: string;
  title: string;
  metrics: HeroProfileMetric[];
}

export const HERO_PROFILE_CONFIG: HeroProfileConfig = {
  name: 'Zahidul Islam',
  title: 'Performance & Analytics Specialist',
  metrics: [
    {
      label: 'Upwork Job Success',
      value: '100%',
    },
    {
      label: 'Fiverr Reviews',
      value: '685',
    },
    {
      label: 'Upwork Projects',
      value: '15+',
    },
  ],
};

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreWork,
}) => {
  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28 overflow-hidden bg-[#06070B] text-white border-b border-white/[0.07]">
      {/* 1. ARCHITECTURAL DOT-MATRIX TEXTURE & TOP RADIAL ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-matrix-dark opacity-75 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000_35%,transparent_85%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 w-[980px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15)_0%,rgba(132,204,22,0.09)_42%,transparent_72%)] blur-3xl"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            CENTERED EDITORIAL HERO HEADER
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {/* Top Marketplace Rating Badge Lockup (Fiverr + Upwork + Google 4.9★) */}
          <div className="inline-flex flex-col items-center gap-1.5 mb-5">
            <div className="flex items-center -space-x-2">
              {/* 1. Fiverr */}
              <span
                title="Fiverr Level 1 Seller — 685+ Reviews"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black/20 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#1DBF73] fill-current"
                  role="img"
                  aria-label="Fiverr"
                >
                  <path d="M16.25 16.5v-5.75h-5.5v-.45c0-.72.52-1.15 1.35-1.15h1.5V6.6h-1.85c-2.45 0-3.85 1.4-3.85 3.65v.5H6.2v2.4h1.7v3.35H6.2V19h5.9v-2.5h-1.35v-3.35h2.75v3.35h-.7V19h5.15v-2.5h-1.7z" />
                  <circle cx="14.9" cy="7.9" r="1.45" />
                </svg>
              </span>

              {/* 2. Upwork */}
              <span
                title="Upwork Top Rated — 100% Job Success"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black/20 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#14A800] fill-current"
                  role="img"
                  aria-label="Upwork"
                >
                  <g transform="translate(0, -5)">
                    <path d="M16 11c-2.4 0-4.3 1.8-4.8 4.2-1-.7-2.3-1.2-3.7-1.2-3.3 0-6 2.7-6 6s2.7 6 6 6c3.1 0 5.6-2.3 6-5.3.8 1.4 2.2 2.3 3.9 2.3 2.5 0 4.5-2 4.5-4.5V11h-3v7.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V11h-3v7.5c0 1.9-1.2 3.5-2.9 4-1-.5-1.7-1.5-1.7-2.7 0-1.7 1.3-3 3-3 .4 0 .7.1 1.1.2V14c-.4-.1-.8-.1-1.1-.1-2.2 0-4.1 1.3-4.9 3.1-.1-.7-.1-1.4.2-2.1H4.6c-.3.7-.4 1.5-.4 2.3 0 3.3 2.7 6 6 6 1.7 0 3.3-.7 4.4-1.9.8 1.2 2.2 1.9 3.7 1.9 2.5 0 4.5-2 4.5-4.5V11h-6.8z" />
                  </g>
                </svg>
              </span>

              {/* 3. Google */}
              <span
                title="Google Ads & Analytics Specialist"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black/20 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  role="img"
                  aria-label="Google"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-200">
              <span className="font-bold text-white">4.9</span>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-zinc-400 text-xs font-mono">
                (685+ Reviews · 100% Upwork JSS)
              </span>
            </div>
          </div>

          {/* Personal Brand Eyebrow */}
          <p className="text-sm sm:text-base md:text-lg font-medium text-zinc-200 tracking-tight mb-3">
            Zahidul Islam — Google Ads, Meta Ads &amp; Conversion Tracking Specialist
          </p>

          {/* Monumental H1 Headline with Playfair Display Italic & Inline Platform Icon Cluster */}
          <h1 className="font-display font-bold text-[2.5rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.25rem] text-white tracking-[-0.03em] leading-[1.06] max-w-4xl mx-auto">
            <span className="block">
              I{' '}
              <span className="font-serif italic font-normal text-white">
                Build
              </span>{' '}
              Campaigns That
            </span>

            <span className="mt-1 sm:mt-2 inline-flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2">
              <span>Drive</span>

              {/* Inline Overlapping Platform Badges */}
              <span
                aria-label="Google Ads, Meta Ads, and Google Analytics 4"
                className="inline-flex items-center -space-x-2.5 sm:-space-x-3 py-1 align-middle"
              >
                {/* Badge 1: Google Ads */}
                <span
                  title="Google Ads"
                  className="w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 rounded-full bg-[#10A37F] border-2 border-[#06070B] flex items-center justify-center shadow-lg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 sm:w-6.5 sm:h-6.5 lg:w-7.5 lg:h-7.5"
                    role="img"
                    aria-label="Google Ads"
                  >
                    <path
                      fill="#FFFFFF"
                      fillOpacity="0.82"
                      d="M3.2 17.5L9.9 5.9c.7-1.2 2.2-1.6 3.4-.9 1.2.7 1.6 2.2.9 3.4L7.5 20c-.7 1.2-2.2 1.6-3.4.9-1.2-.7-1.6-2.2-.9-3.4z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M20.8 17.5L14.1 5.9c-.7-1.2-2.2-1.6-3.4-.9-1.2.7-1.6 2.2-.9 3.4l6.7 11.6c.7 1.2 2.2 1.6 3.4.9 1.2-.7 1.6-2.2.9-3.4z"
                    />
                    <circle cx="5.4" cy="18.7" r="2.6" fill="#FFFFFF" />
                  </svg>
                </span>

                {/* Badge 2: Meta Ads */}
                <span
                  title="Meta Ads"
                  className="w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 rounded-full bg-[#D97757] border-2 border-[#06070B] flex items-center justify-center shadow-lg"
                >
                  <svg
                    viewBox="0 0 34 34"
                    className="w-5.5 h-5.5 sm:w-7.5 sm:h-7.5 lg:w-8.5 lg:h-8.5"
                    role="img"
                    aria-label="Meta Ads"
                  >
                    <g transform="translate(0, -2.5)" fill="#FFFFFF">
                      <path d="M22.8 11.2c-2.4 0-4.6 1.3-5.8 3.3-1.2-2-3.4-3.3-5.8-3.3-4.5 0-7.7 3.6-7.7 8.3 0 4.8 3.3 8.3 7.8 8.3 2.5 0 4.7-1.3 5.8-3.3 1.1 2 3.3 3.3 5.7 3.3 4.6 0 7.8-3.5 7.8-8.3 0-4.7-3.2-8.3-7.8-8.3zm-11.6 13.5c-2.7 0-4.7-2.3-4.7-5.2 0-3 2-5.2 4.7-5.2 2.6 0 4.6 2.2 4.6 5.2 0 3-2 5.2-4.6 5.2zm11.6 0c-2.7 0-4.7-2.3-4.7-5.2 0-3 2-5.2 4.7-5.2 2.6 0 4.7 2.2 4.7 5.2 0 3-2 5.2-4.7 5.2z" />
                    </g>
                  </svg>
                </span>

                {/* Badge 3: GA4 / GTM Tracking */}
                <span
                  title="GA4 & GTM Conversion Tracking"
                  className="w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 rounded-full bg-white border-2 border-[#06070B] flex items-center justify-center shadow-lg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 sm:w-6.5 sm:h-6.5 lg:w-7.5 lg:h-7.5"
                    role="img"
                    aria-label="Google Analytics 4"
                  >
                    <rect x="15.5" y="4" width="3.8" height="16" rx="1.9" fill="#E37400" />
                    <rect x="10.1" y="9.5" width="3.8" height="10.5" rx="1.9" fill="#F9AB00" />
                    <circle cx="6.6" cy="18.1" r="1.9" fill="#F9AB00" />
                  </svg>
                </span>
              </span>

              <span className="font-serif italic font-normal text-white">
                Results
              </span>
            </span>
          </h1>

          {/* Supporting Pill */}
          <div className="mt-6 sm:mt-7 inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#0C0E16]/95 border border-white/15 text-xs sm:text-sm text-zinc-200 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-lime-400 shrink-0" />
            <span>
              Strategic Paid Advertising + Server-Side GA4 &amp; GTM Attribution
            </span>
          </div>

          {/* Primary & Secondary Hero CTAs */}
          <div className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={onOpenBooking}
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-zinc-100 text-[#09090B] font-display font-bold text-sm sm:text-base border border-white shadow-[0_12px_35px_rgba(255,255,255,0.18)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onExploreWork}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.11] text-white font-display font-semibold text-sm sm:text-base border border-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer"
            >
              <span>Explore Case Studies</span>
              <ArrowUpRight className="w-4 h-4 text-lime-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
