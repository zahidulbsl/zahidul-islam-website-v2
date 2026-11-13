import React from 'react';
import { motion } from 'motion/react';
import {
  ROW_1_LOGOS,
  ROW_2_LOGOS,
} from '../data/platforms';
import type { PlatformLogo } from '../data/platforms';
import { EDGE_FADE_MASK_STYLE } from '../utils/edgeFade';

interface MarqueeRowProps {
  logos: PlatformLogo[];
  speedClass: string;
  rowLabel: string;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  logos,
  speedClass,
  rowLabel,
}) => {
  const repeatedLogos = [...logos, ...logos];

  return (
    <div
      className="relative w-full overflow-hidden py-2.5 sm:py-3"
      aria-label={rowLabel}
      style={EDGE_FADE_MASK_STYLE}
    >
      <div
        className={`flex w-max shrink-0 items-center justify-start gap-4 sm:gap-6 lg:gap-8 ${speedClass} hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {repeatedLogos.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            title={`${item.name} — ${item.description}`}
            aria-hidden={index >= logos.length ? true : undefined}
            className="flex shrink-0 items-center justify-center px-4 py-2.5 rounded-2xl bg-[#FAFAFA] border border-zinc-200/80 hover:border-zinc-300 transition-all duration-300"
          >
            <img
              src={item.logoPath}
              alt={index >= logos.length ? '' : item.alt}
              loading="lazy"
              draggable={false}
              className="h-6 sm:h-7 w-auto max-w-[145px] sm:max-w-[165px] object-contain pointer-events-none brightness-[0.38] contrast-125 opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const LogoShowcase: React.FC = () => {
  return (
    <section
      aria-label="Technology and Advertising Platforms"
      className="relative isolate overflow-hidden bg-white border-b border-zinc-200/80 py-8 sm:py-11 lg:py-12"
    >
      <div className="relative z-10 mx-auto mb-6 sm:mb-8 max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center"
        >
          <span className="dm-pill-light mb-3">
            Platforms &amp; Tracking Tools I Manage
          </span>
          <p className="text-sm sm:text-base font-medium text-zinc-600 max-w-2xl">
            Hands-on daily execution across{' '}
            <strong className="text-zinc-950 font-semibold">
              Google Ads, Meta Ads, GA4, Google Tag Manager, Looker Studio
            </strong>{' '}
            &amp; leading eCommerce platforms
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1360px] overflow-hidden space-y-2.5">
        <MarqueeRow
          logos={ROW_1_LOGOS}
          speedClass="animate-marquee-ltr"
          rowLabel="Advertising and eCommerce platforms"
        />
        <MarqueeRow
          logos={ROW_2_LOGOS}
          speedClass="animate-marquee-rtl"
          rowLabel="Analytics and tracking platforms"
        />
      </div>
    </section>
  );
};

export default LogoShowcase;
