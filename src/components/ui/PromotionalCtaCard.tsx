import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CtaButton } from './CtaButton';

export type CtaVisualTheme = 'lime' | 'blue-teal' | 'green-cyan';

export interface PromotionalCtaCardProps {
  id?: string;
  ariaLabel?: string;
  kicker: string;
  title: string;
  highlightedTitle: string;
  description: string;
  primaryCtaText?: string;
  onPrimaryClick?: () => void;
  primaryHref?: string;
  secondaryCtaText?: string;
  onSecondaryClick?: () => void;
  secondaryHref?: string;
  theme?: CtaVisualTheme;
  className?: string;
}

export const PromotionalCtaCard: React.FC<PromotionalCtaCardProps> = ({
  id,
  ariaLabel = 'Call to Action',
  kicker,
  title,
  highlightedTitle,
  description,
  primaryCtaText = 'Discuss Your Project',
  onPrimaryClick,
  primaryHref,
  secondaryCtaText = 'Explore Case Studies',
  onSecondaryClick,
  secondaryHref,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative py-10 sm:py-14 bg-[#FAFAFA] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[32px] bg-[#09090D] border border-black/15 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(9,9,11,0.22)] overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 w-72 h-72 bg-lime-400/10 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            <div className="max-w-2xl flex-1 text-center lg:text-left">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-lime-400 font-semibold block mb-3">
                {kicker}
              </span>

              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                {title}{' '}
                <span className="font-serif italic font-normal text-white block sm:inline">
                  {highlightedTitle}
                </span>
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                {description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto justify-center lg:justify-end">
              <CtaButton
                variant="light"
                size="md"
                asLink={Boolean(primaryHref)}
                href={primaryHref}
                target={primaryHref?.startsWith('http') ? '_blank' : undefined}
                rel={primaryHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={onPrimaryClick}
                className="w-full sm:w-auto min-w-[200px]"
              >
                {primaryCtaText}
              </CtaButton>

              {secondaryCtaText && (onSecondaryClick || secondaryHref) && (
                <CtaButton
                  variant="outline"
                  size="md"
                  asLink={Boolean(secondaryHref)}
                  href={secondaryHref}
                  target={secondaryHref?.startsWith('http') ? '_blank' : undefined}
                  rel={secondaryHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={onSecondaryClick}
                  className="w-full sm:w-auto min-w-[190px]"
                >
                  {secondaryCtaText}
                </CtaButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalCtaCard;
