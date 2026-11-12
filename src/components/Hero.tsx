import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  TrendingUp,
  Activity,
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
          {/* Top Marketplace Rating Badge Lockup (Upwork + Fiverr 4.9★) */}
          <div className="inline-flex flex-col items-center gap-1.5 mb-5">
            <div className="flex items-center -space-x-1.5 bg-white/95 px-2.5 py-1 rounded-full shadow-md">
              <span
                title="Upwork Top Rated — 100% Job Success"
                className="w-6 h-6 rounded-full bg-[#14A800] text-white font-display font-black text-[10px] flex items-center justify-center ring-2 ring-white"
              >
                Up
              </span>
              <span
                title="Fiverr Level 1 Seller — 685+ Reviews"
                className="w-6 h-6 rounded-full bg-[#1DBF73] text-white font-display font-black text-[10px] flex items-center justify-center ring-2 ring-white"
              >
                fi
              </span>
              <span
                title="Google Ads & Analytics Specialist"
                className="w-6 h-6 rounded-full bg-[#4285F4] text-white font-display font-black text-[10px] flex items-center justify-center ring-2 ring-white"
              >
                G
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
                className="inline-flex items-center -space-x-2 sm:-space-x-2.5 py-1 align-middle"
              >
                {/* Badge 1: Google Ads */}
                <span className="w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 rounded-full bg-[#10B981] border-2 border-[#06070B] flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current">
                    <path d="M12 2L3 19h5.5l3.5-7 3.5 7H21L12 2z" />
                  </svg>
                </span>
                {/* Badge 2: Meta Ads */}
                <span className="w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 rounded-full bg-[#EA580C] border-2 border-[#06070B] flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />
                </span>
                {/* Badge 3: GA4 / GTM Tracking */}
                <span className="w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 rounded-full bg-white border-2 border-[#06070B] flex items-center justify-center shadow-lg">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[#09090B] stroke-[2.4]" />
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
