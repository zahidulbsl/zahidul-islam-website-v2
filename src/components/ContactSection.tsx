import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
  type PhoneInputRefType,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import { OFFICIAL_CREDENTIALS } from '../data/credentials';

interface ContactSectionProps {
  onOpenBooking: () => void;
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenBooking,
  initialService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsappNumber: '',
    websiteUrl: '',
    serviceInterest: initialService || 'Google Ads Management',
    monthlyBudget: '$3K - $10K',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countries = useMemo(() => defaultCountries.map(parseCountry), []);
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const phoneRef = useRef<PhoneInputRefType>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    const dialQuery = query.replace(/[\s+()-]/g, '');

    if (!query) return countries;

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.iso2.toLowerCase().includes(query) ||
        country.dialCode.includes(dialQuery)
    );
  }, [countries, countrySearch]);

  const activeCountry =
    countries.find((country) => country.iso2 === selectedCountry) ||
    countries.find((country) => country.iso2 === 'us')!;

  const getCountryFlag = (iso2: string) =>
    String.fromCodePoint(
      ...Array.from(iso2.toUpperCase()).map(
        (char) => 127397 + char.charCodeAt(0)
      )
    );

  const handleCountrySelect = (iso2: string) => {
    setSelectedCountry(iso2);
    phoneRef.current?.setCountry(iso2 as never, {
      focusOnInput: false,
    });
    setIsCountryOpen(false);
    setCountrySearch('');
  };

  useEffect(() => {
    if (!isCountryOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isCountryOpen]);

  useEffect(() => {
    if (isCountryOpen) {
      const timer = window.setTimeout(() => {
        countrySearchInputRef.current?.focus();
      }, 40);

      return () => window.clearTimeout(timer);
    }
  }, [isCountryOpen]);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        serviceInterest: initialService,
      }));
    }
  }, [initialService]);

  const budgetOptions = [
    'Less than $3K',
    '$3K - $10K',
    '$10K - $20K',
    '$20K - $50K',
    'More than $50K',
  ];

  const serviceOptions = [
    'Google Ads Management',
    'Meta Ads Management',
    'Google Shopping & eCommerce Ads',
    'Lead Generation Advertising',
    'GA4, GTM & Conversion Tracking',
    'Google Ads Audit & Optimization',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError('Please complete all required fields (Name, Email, and Project Details).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact_section',
          fullName: formData.name,
          email: formData.email,
          whatsappNumber: formData.whatsappNumber,
          websiteUrl: formData.websiteUrl,
          service: formData.serviceInterest,
          monthlyBudget: formData.monthlyBudget,
          projectDetails: formData.message,
        }),
      });

      const rawText = await res.text();
      let data: { error?: string } | null = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(
          data?.error ||
            `Submission failed with status ${res.status}. Please try again or reach out via WhatsApp.`
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Contact form submission error:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while submitting. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Zahidul, I would like to discuss ${formData.serviceInterest} for my business.`
  );

  const trustPoints = [
    'Direct 1-on-1 collaboration with Zahidul Islam—never passed to junior staff.',
    'Strategic Google Ads & Meta Ads paired with reliable GA4, GTM, and Conversions API tracking.',
    '100% account ownership, plain-English reporting, and zero agency lock-in.',
  ];

  return (
    <>
      <style>{`
        .zp-contact-field {
          outline: none !important;
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .zp-contact-field:focus,
        .zp-contact-field:focus-visible {
          background-color: #FFFFFF;
          border-color: #09090B;
          box-shadow: 0 0 0 3px rgba(9, 9, 11, 0.08);
          outline: none !important;
        }
        .zp-budget-btn:focus,
        .zp-budget-btn:focus-visible {
          outline: none !important;
        }
        .zp-budget-btn:focus-visible {
          border-color: #09090B;
          box-shadow: 0 0 0 3px rgba(9, 9, 11, 0.08);
        }
        .zp-phone-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: 46px;
          border: 1px solid #E4E4E7;
          border-radius: 12px;
          background: #FAFAFA;
          padding: 0 12px;
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          outline: none !important;
        }
        .zp-phone-box:hover {
          border-color: #A1A1AA;
        }
        .zp-phone-box:focus-within {
          background: #FFFFFF;
          border-color: #09090B;
          box-shadow: 0 0 0 3px rgba(9, 9, 11, 0.08);
          outline: none !important;
        }
        .zp-country-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding-right: 10px;
          border-right: 1px solid #E4E4E7;
          background: transparent;
          color: #09090B;
          cursor: pointer;
          flex-shrink: 0;
          outline: none !important;
        }
        .zp-country-btn:focus,
        .zp-country-btn:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .zp-phone-box .react-international-phone-input-container {
          flex: 1;
          min-width: 0;
          height: 44px;
          border: none !important;
          background: transparent !important;
        }
        .zp-phone-box .react-international-phone-country-selector {
          display: none !important;
        }
        .zp-phone-box .react-international-phone-input {
          width: 100%;
          height: 44px;
          padding: 0 0 0 10px !important;
          border: none !important;
          outline: none !important;
          background: transparent !important;
          color: #09090B !important;
          font-size: 14px !important;
          box-shadow: none !important;
        }
        .zp-phone-box .react-international-phone-input:focus,
        .zp-phone-box .react-international-phone-input:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .zp-phone-box .react-international-phone-input::placeholder {
          color: #71717A;
        }
        .zp-country-popover {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          z-index: 10050;
          width: 280px;
          max-width: calc(100vw - 36px);
          padding: 8px;
          border: 1px solid #E4E4E7;
          border-radius: 16px;
          background: #FFFFFF;
          box-shadow: 0 20px 45px -10px rgba(9, 9, 11, 0.18);
          outline: none !important;
        }
        .zp-country-search {
          display: flex;
          align-items: center;
          height: 36px;
          margin-bottom: 6px;
          padding: 0 10px;
          border: 1px solid #E4E4E7;
          border-radius: 10px;
          background: #FAFAFA;
          color: #52525B;
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .zp-country-search:hover {
          border-color: #A1A1AA;
        }
        .zp-country-search:focus-within {
          background: #FFFFFF;
          border-color: #09090B;
          box-shadow: 0 0 0 3px rgba(9, 9, 11, 0.08);
        }
        .zp-country-search input {
          width: 100%;
          height: 32px;
          padding: 0 8px;
          border: none;
          outline: none !important;
          box-shadow: none !important;
          background: transparent;
          color: #09090B;
          font-size: 12px;
        }
        .zp-country-search input:focus,
        .zp-country-search input:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .zp-country-list {
          height: 210px;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .zp-country-option {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 8px;
          padding: 7px 10px;
          border-radius: 8px;
          background: transparent;
          color: #27272A;
          text-align: left;
          font-size: 12px;
          cursor: pointer;
          outline: none !important;
        }
        .zp-country-option:hover,
        .zp-country-option:focus-visible {
          background: #F4F4F5;
          outline: none !important;
        }
        .zp-country-option.active,
        .zp-country-option.active:hover,
        .zp-country-option.active:focus-visible {
          background: #09090B;
          color: #FFFFFF;
          font-weight: 600;
          outline: none !important;
        }
      `}</style>

      <section
        id="contact"
        className="relative pt-16 sm:pt-20 lg:pt-24 pb-5 sm:pb-6 bg-[#FAFAFA] text-[#09090B] border-t border-zinc-200/80 scroll-mt-20 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-dot-matrix-light opacity-65 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* =================================================================
              SECTION HEADER
          ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
          >
            <span className="dm-pill-light mb-4">
              Start a Conversation
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.08]">
              Ready to Make Your Advertising{' '}
              <span className="font-serif italic font-normal text-[#09090B] block sm:inline">
                Work Smarter?
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              Share your website and goals below or message me directly on
              WhatsApp. I personally review every inquiry and reply within 24
              hours—with zero sales pressure.
            </p>
          </motion.div>

          {/* =================================================================
              2-COLUMN ARCHITECTURAL CONTACT STUDIO (Section 8)
              Equal desktop height enforced via items-stretch & h-full cards
          ================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-stretch">
            {/* ---------------------------------------------------------------
                LEFT CONTENT CARD (5 COLS): CONVERSATIONAL BRIEFING & PROFILE
            --------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 h-full rounded-[28px] sm:rounded-[32px] bg-[#0B0D14] text-white border border-zinc-900 p-6 sm:p-9 lg:p-10 flex flex-col justify-between shadow-[0_24px_60px_-18px_rgba(9,9,11,0.28)] relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/12 blur-3xl"
              />

              <div className="relative z-10 space-y-6">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Specialist Consultation</span>
                </div>

                {/* Natural, Client-Focused Headline & Introduction */}
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-[-0.025em] leading-[1.15]">
                    Let&apos;s Talk About Your{' '}
                    <span className="font-serif italic font-normal text-emerald-300">
                      Next Campaign.
                    </span>
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Tell me what you want to improve with your ads or conversion
                    tracking. Whether you need a new Google Ads or Meta Ads
                    campaign, a clean GA4/GTM setup, or an honest audit of an
                    underperforming account, I will outline clear, practical
                    next steps for your business.
                  </p>
                </div>

                {/* Trust Points */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  {trustPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Upwork & Fiverr Trust Information */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Upwork Top Rated</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      {OFFICIAL_CREDENTIALS.upworkJssCompact}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Fiverr Top Rated</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      {OFFICIAL_CREDENTIALS.fiverrReviewsLabel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Profile Card + Direct WhatsApp Action */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/zahidul-Illustration.webp"
                    alt="Zahidul Islam — Performance & Analytics Specialist"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-15 h-15 sm:w-16 sm:h-16 rounded-2xl object-cover object-top border border-white/15 bg-zinc-900 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-base sm:text-lg text-white truncate">
                        Zahidul Islam
                      </h4>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[10px] text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Available
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      Google Ads, Meta Ads &amp; GA4/GTM Specialist
                    </p>
                  </div>
                </div>

                {/* Direct WhatsApp Button */}
                <div>
                  <a
                    href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#09090B] font-display font-bold text-xs sm:text-sm transition-colors shadow-sm"
                  >
                    <span>WhatsApp Chat</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ---------------------------------------------------------------
                RIGHT CONTACT FORM (7 COLS): EDITORIAL INQUIRY FORM
            --------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="lg:col-span-7 h-full rounded-[28px] sm:rounded-[32px] bg-white border border-zinc-200/90 p-6 sm:p-9 lg:p-10 shadow-[0_20px_50px_-18px_rgba(9,9,11,0.08)] flex flex-col justify-between"
            >
              {submitted ? (
                <div className="my-auto py-14 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#09090B] tracking-tight">
                    Project Inquiry Received
                  </h3>

                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thank you,{' '}
                    <strong className="text-[#09090B]">{formData.name}</strong>.
                    I will review your project details and reply to{' '}
                    <strong className="text-emerald-700">
                      {formData.email}
                    </strong>{' '}
                    within 24 hours.
                  </p>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setError(null);
                        setFormData({
                          name: '',
                          email: '',
                          whatsappNumber: '',
                          websiteUrl: '',
                          serviceInterest:
                            initialService || 'Google Ads Management',
                          monthlyBudget: '$3K - $10K',
                          message: '',
                        });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="h-full flex flex-col justify-between gap-5"
                >
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-200/80">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#09090B]">
                        Send a Project Inquiry
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Fields marked with * are required.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 font-mono text-[11px] font-medium text-zinc-700">
                      Replies within 24h
                    </span>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium"
                    >
                      {error}
                    </div>
                  )}

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label
                        htmlFor="contact-full-name"
                        className="block text-xs font-display font-bold text-[#09090B] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-full-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="zp-contact-field w-full h-[46px] px-3.5 rounded-xl bg-[#FAFAFA] border border-zinc-200 hover:border-zinc-400 text-sm text-[#09090B] placeholder-zinc-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-display font-bold text-[#09090B] mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@company.com"
                        className="zp-contact-field w-full h-[46px] px-3.5 rounded-xl bg-[#FAFAFA] border border-zinc-200 hover:border-zinc-400 text-sm text-[#09090B] placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  {/* Row 2: WhatsApp Number (Optional) & Website / Store URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-display font-bold text-[#09090B] mb-1.5">
                        WhatsApp Number{' '}
                        <span className="text-zinc-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <div className="zp-phone-box" ref={countryDropdownRef}>
                        <button
                          type="button"
                          className="zp-country-btn"
                          onClick={() => {
                            setIsCountryOpen((prev) => !prev);
                            setCountrySearch('');
                          }}
                          aria-label="Select country calling code"
                          aria-expanded={isCountryOpen}
                        >
                          <span className="text-base leading-none">
                            {getCountryFlag(activeCountry.iso2)}
                          </span>
                          <ChevronDown size={13} className="text-zinc-500" />
                        </button>

                        {isCountryOpen && (
                          <div
                            className="zp-country-popover"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                          >
                            <div className="zp-country-search">
                              <Search
                                size={14}
                                className="shrink-0 text-zinc-400"
                              />
                              <input
                                ref={countrySearchInputRef}
                                type="text"
                                value={countrySearch}
                                onChange={(e) =>
                                  setCountrySearch(e.target.value)
                                }
                                placeholder="Search country or code..."
                                aria-label="Search countries or calling codes"
                              />
                            </div>

                            <div className="zp-country-list">
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                  <button
                                    key={country.iso2}
                                    type="button"
                                    className={`zp-country-option ${
                                      selectedCountry === country.iso2
                                        ? 'active'
                                        : ''
                                    }`}
                                    onClick={() =>
                                      handleCountrySelect(country.iso2)
                                    }
                                  >
                                    <span>{getCountryFlag(country.iso2)}</span>
                                    <span className="flex-1 truncate">
                                      {country.name}
                                    </span>
                                    <span className="font-mono text-[11px] opacity-70">
                                      +{country.dialCode}
                                    </span>
                                  </button>
                                ))
                              ) : (
                                <div className="p-3 text-center text-xs text-zinc-500">
                                  No country found.
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <PhoneInput
                          ref={phoneRef}
                          defaultCountry="us"
                          value={formData.whatsappNumber}
                          onChange={(phone, meta) => {
                            setFormData((prev) => ({
                              ...prev,
                              whatsappNumber: phone,
                            }));
                            if (meta?.country?.iso2) {
                              setSelectedCountry(meta.country.iso2);
                            }
                          }}
                          placeholder="WhatsApp number"
                          forceDialCode
                          hideDropdown
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-website"
                        className="block text-xs font-display font-bold text-[#09090B] mb-1.5"
                      >
                        Website / Store URL{' '}
                        <span className="text-zinc-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="contact-website"
                        type="url"
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            websiteUrl: e.target.value,
                          })
                        }
                        placeholder="https://yourwebsite.com"
                        className="zp-contact-field w-full h-[46px] px-3.5 rounded-xl bg-[#FAFAFA] border border-zinc-200 hover:border-zinc-400 text-sm text-[#09090B] placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  {/* Row 3: Primary Service Needed */}
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-display font-bold text-[#09090B] mb-1.5"
                    >
                      Primary Service Needed
                    </label>
                    <div className="relative">
                      <select
                        id="contact-service"
                        value={formData.serviceInterest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceInterest: e.target.value,
                          })
                        }
                        className="zp-contact-field w-full h-[46px] pl-3.5 pr-10 rounded-xl bg-[#FAFAFA] border border-zinc-200 hover:border-zinc-400 text-sm text-[#09090B] font-medium appearance-none cursor-pointer"
                      >
                        {serviceOptions.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    </div>
                  </div>

                  {/* Row 4: Estimated Monthly Ad Spend Pills */}
                  <div>
                    <label className="block text-xs font-display font-bold text-[#09090B] mb-2">
                      Estimated Monthly Ad Spend
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((budget) => {
                        const isSelected = formData.monthlyBudget === budget;
                        return (
                          <button
                            key={budget}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                monthlyBudget: budget,
                              })
                            }
                            aria-pressed={isSelected}
                            className={`zp-budget-btn px-3.5 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#09090B] text-white border-[#09090B] font-bold shadow-sm'
                                : 'bg-[#FAFAFA] text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100/80'
                            }`}
                          >
                            {budget}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                    {/* Row 5: Project Details */}
                    <div>
                      <label
                        htmlFor="contact-details"
                        className="block text-xs font-display font-bold text-[#09090B] mb-1.5"
                      >
                        Project Details *
                      </label>
                      <textarea
                        id="contact-details"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell me about your business, current advertising setup, tracking needs, or campaign goals..."
                        className="zp-contact-field w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-zinc-200 hover:border-zinc-400 text-sm text-[#09090B] placeholder-zinc-400 resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit Action Bar */}
                  <div className="pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[11px] text-zinc-500">
                      Your details remain strictly confidential and are never
                      shared.
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 disabled:opacity-60 text-white font-display font-bold text-sm shadow-[0_14px_30px_-10px_rgba(9,9,11,0.35)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shrink-0"
                    >
                      <span>
                        {loading ? 'Sending Inquiry...' : 'Send Inquiry'}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
