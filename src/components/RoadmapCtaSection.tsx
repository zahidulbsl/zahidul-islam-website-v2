import React from 'react';
import { PromotionalCtaCard } from './ui/PromotionalCtaCard';

interface RoadmapCtaSectionProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

const WHATSAPP_PROJECT_URL =
  'https://wa.me/8801911184235?text=Hello%20Zahidul%2C%20I%20would%20like%20to%20discuss%20a%20marketing%20project.';

export const RoadmapCtaSection: React.FC<RoadmapCtaSectionProps> = () => {
  return (
    <PromotionalCtaCard
      ariaLabel="Campaign Strategy and Tracking Review"
      kicker="CAMPAIGN STRATEGY & TRACKING SETUP"
      title="Tired of Broken Tracking &"
      highlightedTitle="Wasted Ad Spend?"
      description="Let's fix your GA4, Google Tag Manager, and Meta Pixel tracking gaps and build a paid advertising strategy tailored to your business."
      primaryCtaText="Let's Discuss Your Project"
      primaryHref={WHATSAPP_PROJECT_URL}
      secondaryCtaText="View Fiverr Profile"
      secondaryHref="https://www.fiverr.com/studio_2d2u"
      theme="lime"
    />
  );
};

export default RoadmapCtaSection;
