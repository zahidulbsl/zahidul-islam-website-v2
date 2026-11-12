import React from 'react';
import { PromotionalCtaCard } from './ui/PromotionalCtaCard';

interface GrowthCtaSectionProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

const WHATSAPP_PROJECT_URL =
  'https://wa.me/8801911184235?text=Hello%20Zahidul%2C%20I%20would%20like%20to%20discuss%20a%20marketing%20project.';

export const GrowthCtaSection: React.FC<GrowthCtaSectionProps> = ({
  onExploreWork,
}) => {
  return (
    <PromotionalCtaCard
      ariaLabel="Account Audit and Action Plan"
      kicker="GOOGLE ADS & META ADS REVIEW"
      title="Wondering Where Your Ad Budget Is"
      highlightedTitle="Actually Going?"
      description="Let's review your search terms, audience targeting, and conversion tracking to uncover wasted spend and practical opportunities for growth."
      primaryCtaText="Request a Campaign Review"
      primaryHref={WHATSAPP_PROJECT_URL}
      secondaryCtaText="Explore My Work"
      onSecondaryClick={onExploreWork}
      theme="blue-teal"
    />
  );
};

export default GrowthCtaSection;
