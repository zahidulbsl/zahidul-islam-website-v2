import React from 'react';
import {
  ArrowUp,
  ArrowRight,
} from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
}) => {
  const scrollToTop = () => {
    scrollToSection('#home');
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const quickNav = [
    { label: 'About Zahidul', href: '#about' },
    { label: 'Campaign Results', href: '#case-studies' },
    { label: 'Services', href: '#services' },
    { label: 'Work Process', href: '#process' },
    { label: 'Client Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const coreServices = [
    'Google Ads Management',
    'Meta Ads Management',
    'Google Shopping & eCommerce Ads',
    'Lead Generation Advertising',
    'GA4, GTM & Conversion Tracking',
    'Google Ads Audit & Optimization',
  ];

  return (
    <footer className="relative overflow-hidden bg-[#05060A] border-t border-white/[0.08] pt-16 sm:pt-20 lg:pt-24 pb-28 sm:pb-24 text-zinc-400">
      {/* Subtle Top Specular Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. MAIN FOOTER CONTENT — TWO-COLUMN MOBILE DIRECTORY, THREE-COLUMN DESKTOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-9 gap-x-4 sm:gap-x-6 md:gap-y-10 md:gap-x-8 lg:gap-x-12 pb-12 sm:pb-14">
          {/* COLUMN 1: ZAHIDUL ISLAM INTRODUCTION & DESCRIPTION (6 COLS) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-6 space-y-4">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Zahidul Islam — Back to top"
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center">
                Zahidul Islam
                <span className="text-lime-400 ml-0.5">.</span>
              </span>
            </button>

            <p className="text-xs font-mono uppercase tracking-wider text-lime-400">
              Performance &amp; Analytics Specialist
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
              Helping local service businesses, professional practices, and
              eCommerce brands scale profitably with strategic Google Ads, Meta
              Ads, and server-side conversion tracking.
            </p>

            {/* 5. PROFILE CREDENTIALS — Highlighted Non-Clickable Badge */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-lime-400/35 text-xs font-mono font-semibold text-zinc-200 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0" />
                <span>Top Rated: Upwork &amp; Fiverr</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: NAVIGATION LINKS (LEFT ON MOBILE, 3 COLS ON DESKTOP) */}
          <div className="col-span-1 md:col-span-5 lg:col-span-3 h-full flex flex-col space-y-3 sm:space-y-4 min-w-0">
            <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white font-bold">
              Navigation
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-[12.5px] min-[375px]:text-[13px] sm:text-sm leading-snug sm:leading-normal">
              {quickNav.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5 break-words"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES LINKS (RIGHT ON MOBILE, 3 COLS ON DESKTOP) */}
          <div className="col-span-1 md:col-span-7 lg:col-span-3 h-full flex flex-col space-y-3 sm:space-y-4 min-w-0">
            <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white font-bold">
              Services
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-[12.5px] min-[375px]:text-[13px] sm:text-sm leading-snug sm:leading-normal">
              {coreServices.map((service) => (
                <li key={service} className="text-zinc-400">
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="hover:text-white transition-colors inline-block break-words"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. FIRST HORIZONTAL DIVIDER */}
        <div className="border-t border-white/[0.08]" />

        {/* 3. FOOTER BOTTOM INFORMATION ROW */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="font-mono text-zinc-500 text-center sm:text-left">
            Copyright © 2026 Zahidul Islam. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 font-mono text-zinc-300 hover:text-lime-400 transition-colors cursor-pointer"
            >
              <span>Book Free Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-mono font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. LARGE PERSONAL BRAND LOGO — ABSOLUTE BOTTOM */}
        <div className="pt-6 sm:pt-8 pb-2 select-none overflow-hidden text-center">
          <div
            aria-hidden="true"
            className="font-display font-black text-[11.2vw] sm:text-[10.8vw] lg:text-[8.75rem] whitespace-nowrap leading-[0.9] tracking-[-0.04em] bg-gradient-to-b from-white via-zinc-300 to-zinc-800/40 bg-clip-text text-transparent"
          >
            Zahidul Islam
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
