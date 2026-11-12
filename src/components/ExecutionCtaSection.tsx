import React from 'react';
import { PromotionalCtaCard } from './ui/PromotionalCtaCard';

interface ExecutionCtaSectionProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

const WHATSAPP_PROJECT_URL =
  'https://wa.me/8801911184235?text=Hello%20Zahidul%2C%20I%20would%20like%20to%20discuss%20a%20marketing%20project.';
const WHATSAPP_SERVICES_URL =
  'https://wa.me/8801911184235?text=Hello%20Zahidul%2C%20I%20would%20like%20to%20know%20more%20about%20your%20marketing%20services.';

export const ExecutionCtaSection: React.FC<ExecutionCtaSectionProps> = () => {
  return (
    <PromotionalCtaCard
      ariaLabel="Ready to Make Your Advertising Work Smarter"
      kicker="START A CONVERSATION"
      title="Ready to Make Your Advertising"
      highlightedTitle="Work Smarter?"
      description="Whether you are launching your first campaign, fixing tracking issues, or looking to improve existing Google Ads or Meta Ads performance, let’s discuss how I can help your business grow."
      primaryCtaText="Start a Conversation"
      primaryHref={WHATSAPP_PROJECT_URL}
      secondaryCtaText="View Upwork Profile"
      secondaryHref="https://www.upwork.com/freelancers/zahidulpro"
      theme="green-cyan"
    />
  );
};

export default ExecutionCtaSection;
