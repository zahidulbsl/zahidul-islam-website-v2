import React from 'react';
import { OFFICIAL_CREDENTIALS } from '../data/credentials';

const ANNOUNCEMENT_MESSAGES = [
  'Stop guessing which ads work. Make budget decisions backed by accurate conversion tracking.',
  'Google Ads & Meta Ads — Disciplined management focused on qualified calls, leads, and sales.',
  'Fix missing conversion signals with Google Tag Manager, GA4, and Meta Conversions API.',
  "Running Google Shopping or Performance Max? Let's tighten your product feed and cut query waste.",
  'Need consistent local inquiries? Territory-locked Search and qualifying lead funnels.',
  'Direct 1-on-1 collaboration with Zahidul Islam — full account ownership and zero agency handoffs.',
];

export const ContactAnnouncementBanner: React.FC = () => {
  const renderMessageSequence = () => (
    <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8 select-none">
      {ANNOUNCEMENT_MESSAGES.map((msg, idx) => (
        <React.Fragment key={idx}>
          <span className="font-display text-xs sm:text-sm md:text-[14.5px] font-semibold text-white tracking-tight whitespace-nowrap">
            {msg}
          </span>
          <span className="text-lime-400 text-xs sm:text-sm shrink-0 font-bold select-none">
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Announcement"
      className="bg-[#FAFAFA] pt-0 pb-12 sm:pb-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="group relative w-full rounded-full bg-[#09090D] py-3 sm:py-3.5 px-4 sm:px-6 md:px-7 flex items-center gap-3 sm:gap-4 md:gap-5 shadow-[0_12px_35px_rgba(9,9,11,0.16)] border border-black/10 overflow-hidden"
          title="Zahidul Islam | Google Ads & Meta Ads Specialist"
        >
          {/* Three Visible Profile and Trust Badges */}
          <div className="flex items-center shrink-0 z-20">
            {/* Portrait */}
            <div className="relative z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white/20 bg-zinc-900 shrink-0 shadow-xs">
              <img
                src="/assets/zahidul-Illustration.webp"
                alt="Zahidul Islam"
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* 5.0 Star Rating on Fiverr */}
            <div
              className="relative z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900 text-lime-400 flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-black border-2 border-white/20 -ml-2.5 shrink-0 shadow-xs whitespace-nowrap"
              title={`${OFFICIAL_CREDENTIALS.freelancerStatus} · ${OFFICIAL_CREDENTIALS.fiverrReviewsLabel}`}
            >
              ★{OFFICIAL_CREDENTIALS.fiverrRating}
            </div>

            {/* 100% Upwork Job Success */}
            <div
              className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#09090D] flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-bold border-2 border-[#09090D] -ml-2.5 shrink-0 shadow-xs whitespace-nowrap"
              title={`${OFFICIAL_CREDENTIALS.freelancerStatus} · ${OFFICIAL_CREDENTIALS.upworkJssLabel}`}
            >
              {OFFICIAL_CREDENTIALS.upworkJssShort}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-5 sm:h-6 w-px bg-white/15 shrink-0 z-10" />

          {/* Announcement Ticker */}
          <div className="flex-1 min-w-0 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,1)_3%,rgba(0,0,0,1)_97%,transparent_100%)]">
            <div className="flex w-max group-hover:[animation-play-state:paused]">
              <div
                className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]"
                style={{ animationDuration: '58s' }}
              >
                {renderMessageSequence()}
              </div>

              <div
                aria-hidden="true"
                className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]"
                style={{ animationDuration: '58s' }}
              >
                {renderMessageSequence()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactAnnouncementBanner;
