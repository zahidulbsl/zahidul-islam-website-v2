import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Target,
  Share2,
  ChartNoAxesCombined,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { NumberTicker } from './ui/NumberTicker';
import { scrollToSection } from '../utils/scroll';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onExploreWork?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onExploreWork,
}) => {
  const [activePillarSlide, setActivePillarSlide] = useState(0);
  const pillarsSliderRef = useRef<HTMLDivElement>(null);

  const [activeStatSlide, setActiveStatSlide] = useState(0);
  const statSliderRef = useRef<HTMLDivElement>(null);

  const handleStatScroll = () => {
    if (!statSliderRef.current) return;
    const container = statSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-stat-card="true"]'
    );
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
    setActiveStatSlide(closestIndex);
  };

  const scrollToStatSlide = (index: number) => {
    if (!statSliderRef.current) return;
    const container = statSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-stat-card="true"]'
    );
    const card = cards[index];
    if (card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft + (cardRect.left - containerRect.left);
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
      setActiveStatSlide(index);
    }
  };

  const handlePillarsScroll = () => {
    if (!pillarsSliderRef.current) return;
    const container = pillarsSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-pillar-card="true"]'
    );
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
    setActivePillarSlide(closestIndex);
  };

  const scrollToPillarSlide = (index: number) => {
    if (!pillarsSliderRef.current) return;
    const container = pillarsSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-pillar-card="true"]'
    );
    const card = cards[index];
    if (card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft + (cardRect.left - containerRect.left);
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
      setActivePillarSlide(index);
    }
  };

  useEffect(() => {
    setActivePillarSlide(0);
    if (pillarsSliderRef.current) {
      pillarsSliderRef.current.scrollLeft = 0;
    }

    const timer = setTimeout(() => {
      if (pillarsSliderRef.current) {
        pillarsSliderRef.current.scrollLeft = 0;
      }
      setActivePillarSlide(0);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToCaseStudies = () => {
    if (onExploreWork) {
      onExploreWork();
    } else {
      scrollToSection('case-studies');
    }
  };

  // Left Column — Three Equal-Sized Statistics Cards
  const statisticsCards = [
    {
      number: '01',
      category: 'GOOGLE ADS',
      prefix: '$',
      value: 10,
      suffix: 'M+',
      label: 'Ad Spend Managed',
      description: 'Google Search, Shopping & Performance Max',
      icon: Target,
      tint: 'bg-[#E0F2FE]/65 border-sky-200/80 hover:border-sky-300',
      categoryColor: 'text-sky-900/75',
      dividerColor: 'border-sky-200/75',
    },
    {
      number: '02',
      category: 'META ADS',
      prefix: '$',
      value: 12,
      suffix: 'M+',
      label: 'Ad Spend Managed',
      description: 'Facebook, Instagram & Lead Generation',
      icon: Share2,
      tint: 'bg-[#ECFCCB]/70 border-lime-300/80 hover:border-lime-400',
      categoryColor: 'text-emerald-900/75',
      dividerColor: 'border-lime-300/70',
    },
    {
      number: '03',
      category: 'ANALYTICS & TRACKING',
      prefix: '',
      value: 300,
      suffix: '+',
      label: 'Tracking Implementations',
      description: 'GA4, GTM, Meta CAPI & Server-Side Tracking',
      icon: ChartNoAxesCombined,
      tint: 'bg-[#FEF3C7]/70 border-amber-200/85 hover:border-amber-300',
      categoryColor: 'text-amber-900/75',
      dividerColor: 'border-amber-200/80',
    },
  ];

  // Right Column — Three Specialization Slider Cards
  const specializationCards = [
    {
      index: '01',
      title: 'Google Ads & eCommerce',
      platforms: 'Search · Shopping · PMax',
      description:
        'Capture high-intent search demand and turn qualified traffic into measurable revenue through strategic Google Ads campaigns.',
      services: [
        'Google Search Ads',
        'Google Shopping',
        'Performance Max',
        'Keyword Strategy',
        'Remarketing',
        'eCommerce Campaign Optimization',
      ],
      icon: Target,
      tint: 'bg-[#E0F2FE]/60 border-sky-200/80',
    },
    {
      index: '02',
      title: 'Meta Ads & Lead Generation',
      platforms: 'Facebook & Instagram Ads',
      description:
        'Build targeted advertising campaigns that attract relevant audiences, generate qualified inquiries, and support sustainable customer acquisition.',
      services: [
        'Facebook & Instagram Ads',
        'Lead Generation',
        'Audience Research',
        'Creative Testing',
        'Retargeting',
        'Campaign Optimization',
      ],
      icon: Share2,
      tint: 'bg-[#ECFCCB]/65 border-lime-300/80',
    },
    {
      index: '03',
      title: 'Analytics & Conversion Tracking',
      platforms: 'GA4 · GTM · Server-Side CAPI',
      description:
        'Build reliable measurement systems that connect advertising performance with real business outcomes through accurate conversion tracking and attribution.',
      services: [
        'Google Analytics 4 (GA4)',
        'Google Tag Manager (GTM)',
        'Meta Pixel & Conversions API',
        'Server-Side Tracking',
        'Enhanced Conversions',
        'eCommerce Tracking',
      ],
      icon: ChartNoAxesCombined,
      tint: 'bg-[#FEF3C7]/65 border-amber-200/80',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 lg:py-32 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Top Editorial Dot Matrix Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-dot-matrix-light opacity-70 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            CENTERED EDITORIAL HEADER
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <span className="dm-pill-light mb-4">
            About Zahidul Islam
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.08]">
            Advertising Expertise Backed by{' '}
            <span className="font-serif italic font-normal text-[#09090B] block sm:inline">
              Real Campaign Data.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Many businesses invest in paid ads without seeing consistent return—often
            because campaigns target broad, low-intent traffic or broken tracking fails
            to record which ads actually generate phone calls, leads, and purchases.
          </p>
        </motion.div>

        {/* ===================================================================
            ORIGINAL TWO-COLUMN COMPOSITION (Exact Equal Height on Desktop)
            LEFT: Profile Info + 3 Equal Statistics Cards
            RIGHT: 3 Specialization / Capability Slider Cards
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-stretch">
          {/* -----------------------------------------------------------------
              LEFT COLUMN (6 COLS): PERSONAL PROFILE & 3 STATISTICS CARDS
          ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 lg:h-full flex flex-col justify-between gap-6"
          >
            {/* Personal Profile Card */}
            <div className="flex-1 rounded-[28px] bg-white border border-zinc-200/90 p-6 sm:p-9 shadow-[0_12px_32px_-8px_rgba(9,9,11,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-zinc-100">
                  <img
                    src="/assets/zahidul-Illustration.webp"
                    alt="Zahidul Islam — Performance & Analytics Specialist"
                    width={56}
                    height={56}
                    loading="lazy"
                    className="w-14 h-14 rounded-2xl object-cover object-top border border-zinc-200 shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#09090B]">
                        Zahidul Islam
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lime-100 border border-lime-300 text-[10px] font-mono font-semibold text-lime-900">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Top Rated · 5+ Yrs Exp
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                      Performance &amp; Analytics Specialist · Google Ads &amp; Meta Ads
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  <p>
                    With{' '}
                    <strong className="text-[#09090B] font-semibold">
                      5+ years of hands-on experience
                    </strong>{' '}
                    in Google Ads, Meta Ads, and PPC campaign management, I help
                    local service businesses, professional practices, and eCommerce
                    brands turn ad spend into qualified leads and measurable sales.
                  </p>
                  <p>
                    Alongside campaign management, I implement{' '}
                    <strong className="text-[#09090B] font-semibold">
                      Google Analytics 4 (GA4), Google Tag Manager (GTM), Meta
                      Pixel, and Server-Side Conversions API
                    </strong>{' '}
                    so your optimization decisions are grounded in reliable
                    conversion data rather than guesswork.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-500 pt-1">
                    As a Top Rated freelancer on Upwork (100% Job Success Score
                    across 15+ completed projects) and a Top Rated / Level 1 Seller
                    on Fiverr (4.9★ rating across 685 reviews), I focus on clear
                    communication, honest expectations, and practical strategies
                    built around your business goals.
                  </p>
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-zinc-100 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
                >
                  <span>Work With Me</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleScrollToCaseStudies}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-[#09090B] font-display font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Three Compact Equal-Sized Statistics Cards Below Description */}
            <div className="shrink-0">
              {/* Desktop & Tablet: Equal 3-Column Grid */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-3.5 items-stretch">
                {statisticsCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.number}
                      className={`h-full rounded-[22px] ${stat.tint} border p-5 flex flex-col justify-between shadow-[0_8px_24px_-10px_rgba(9,9,11,0.05)] transition-all duration-300 hover:-translate-y-0.5`}
                    >
                      <div>
                        {/* Card Top Row: Category & Icon */}
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <span
                            className={`font-mono text-[10px] font-bold uppercase tracking-wider truncate ${stat.categoryColor}`}
                          >
                            {stat.category}
                          </span>
                          <div className="w-7 h-7 rounded-lg bg-white/90 border border-black/10 flex items-center justify-center text-[#09090B] shrink-0 shadow-2xs">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Prominent Numerical Figure in Lime/Green Accent */}
                        <div className="font-display font-extrabold text-2xl xl:text-3xl text-emerald-700 tracking-tight leading-none">
                          <NumberTicker
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            className="font-display font-extrabold"
                          />
                        </div>

                        {/* Supporting Label */}
                        <div className="mt-1.5 font-display font-bold text-xs text-[#09090B] leading-snug">
                          {stat.label}
                        </div>
                      </div>

                      {/* Subtle Divider & Short Supporting Description */}
                      <div className={`mt-3.5 pt-3 border-t ${stat.dividerColor}`}>
                        <p className="text-[11px] text-zinc-700 leading-relaxed">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Only: Swipeable Horizontal Slider for the 3 Statistics Cards */}
              <div className="sm:hidden flex flex-col gap-3">
                <div
                  ref={statSliderRef}
                  onScroll={handleStatScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-1 -mx-4 px-4 slider-touch-track"
                >
                  {statisticsCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.number}
                        data-stat-card="true"
                        className={`w-[82vw] max-w-[290px] shrink-0 snap-center rounded-[22px] ${stat.tint} border p-5 flex flex-col justify-between shadow-xs`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span
                              className={`font-mono text-[10px] font-bold uppercase tracking-wider ${stat.categoryColor}`}
                            >
                              {stat.number} · {stat.category}
                            </span>
                            <div className="w-7 h-7 rounded-lg bg-white/90 border border-black/10 flex items-center justify-center text-[#09090B] shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div className="font-display font-extrabold text-3xl text-emerald-700 tracking-tight leading-none">
                            <NumberTicker
                              value={stat.value}
                              prefix={stat.prefix}
                              suffix={stat.suffix}
                              className="font-display font-extrabold"
                            />
                          </div>

                          <div className="mt-1.5 font-display font-bold text-xs text-[#09090B]">
                            {stat.label}
                          </div>
                        </div>

                        <div className={`mt-3.5 pt-3 border-t ${stat.dividerColor}`}>
                          <p className="text-xs text-zinc-700 leading-relaxed">
                            {stat.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Pagination Dots for Statistics Cards */}
                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="font-mono text-[10px] text-zinc-500">
                    0{activeStatSlide + 1} / 03 · Verified Track Record
                  </span>
                  <div className="flex items-center gap-1.5">
                    {statisticsCards.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => scrollToStatSlide(i)}
                        aria-label={`Go to statistic ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeStatSlide === i
                            ? 'w-5 bg-[#09090B]'
                            : 'w-1.5 bg-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (6 COLS): THREE SPECIALIZATION SLIDER CARDS
          ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 lg:h-full flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between px-1 shrink-0">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-500">
                Core Capabilities · Specializations
              </span>
              <span className="font-serif italic text-sm text-zinc-700">
                Full-Funnel Growth Systems
              </span>
            </div>

            {/* Vertical Stack on Desktop/Tablet, Touch Slider on Mobile */}
            <div
              ref={pillarsSliderRef}
              onScroll={handlePillarsScroll}
              className="
                flex sm:flex-col lg:flex-1 lg:justify-between
                overflow-x-auto sm:overflow-x-visible
                snap-x snap-mandatory sm:snap-none
                gap-4
                pb-2 sm:pb-0
                -mx-4 px-4 sm:mx-0 sm:px-0
                scrollbar-none
                slider-touch-track
              "
            >
              {specializationCards.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.index}
                    data-pillar-card="true"
                    className={`w-[86vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink lg:flex-1 rounded-[26px] ${pillar.tint} border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(9,9,11,0.04)] flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-serif italic text-sm sm:text-base text-zinc-800">
                          {pillar.platforms}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/80 border border-black/5 font-mono text-[11px] font-semibold text-zinc-700">
                          Specialization {pillar.index}
                        </span>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#09090B] shrink-0 shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-bold text-lg sm:text-xl text-[#09090B] tracking-tight">
                            {pillar.title}
                          </h3>
                          <p className="mt-1.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                            {pillar.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {pillar.services.map((service) => (
                              <span
                                key={service}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-black/8 text-xs font-medium text-zinc-800"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipe Navigation & Pagination Indicators */}
            <div className="sm:hidden pt-1 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-zinc-600">
                <span className="font-bold text-[#09090B]">
                  0{activePillarSlide + 1}
                </span>
                <span>/</span>
                <span>03</span>
                <span className="ml-1">· Swipe specializations</span>
              </div>

              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Specializations pagination"
              >
                {specializationCards.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToPillarSlide(i)}
                    aria-label={`Go to specialization ${i + 1}`}
                    aria-selected={activePillarSlide === i}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      activePillarSlide === i
                        ? 'w-5 bg-[#09090B]'
                        : 'w-1.5 bg-zinc-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
