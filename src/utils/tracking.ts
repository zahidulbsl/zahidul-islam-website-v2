/**
 * Centralized privacy-safe Google Tag Manager Data Layer utility.
 *
 * - Uses a single shared `window.dataLayer` initialized before GTM loads.
 * - Never persists PII in browser storage, cookies, or URLs.
 * - Isolates personal form details into `lead_submission_debug` (for GTM Preview only)
 *   and pushes sanitized conversion events (`generate_lead`, `strategy_call_submit`)
 *   for GA4, Google Ads, and Meta Pixel.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type LeadFormType = 'main_contact_form' | 'strategy_call_form';

export interface LeadSubmissionPayload {
  formType: LeadFormType;
  leadId?: string;
  submissionTimestamp?: string;
  fullName: string;
  email: string;
  whatsapp?: string;
  website?: string;
  service: string;
  projectDetails?: string;
}

function ensureDataLayer(): Array<Record<string, unknown>> {
  if (typeof window === 'undefined') {
    return [];
  }
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function getPagePath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

/**
 * Strips query parameters and hash fragments from the current URL
 * so no sensitive or personal parameters leak into analytics payloads.
 */
function getSanitizedPageUrl(): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${window.location.pathname}`;
}

function getPageTitle(): string {
  if (typeof document === 'undefined') return '';
  return document.title || '';
}

function generateFallbackLeadId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `lead_${crypto.randomUUID()}`;
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

let lastTrackedPageKey: string | null = null;

/**
 * Tracks initial page load and SPA route / popstate navigation with deduplication.
 */
export function trackPageView(explicitPath?: string): void {
  if (typeof window === 'undefined') return;

  const pagePath = explicitPath || getPagePath();
  const pageUrl = `${window.location.origin}${pagePath}`;
  const pageTitle = getPageTitle();
  const pageKey = `${pageUrl}|${pageTitle}`;

  if (lastTrackedPageKey === pageKey) {
    return;
  }
  lastTrackedPageKey = pageKey;

  const dataLayer = ensureDataLayer();
  dataLayer.push({
    event: 'page_view',
    page_url: pageUrl,
    page_path: pagePath,
    page_title: pageTitle,
    page_referrer: document.referrer || '',
  });
}

/**
 * Tracks confirmed backend lead submissions using a two-event privacy-safe pattern:
 * 1. `lead_submission_debug`: Private Data Layer event for GTM Preview inspection only.
 * 2. `generate_lead` or `strategy_call_submit`: Sanitized conversion event with zero PII.
 */
export function trackLeadSubmission(payload: LeadSubmissionPayload): void {
  if (typeof window === 'undefined') return;

  const dataLayer = ensureDataLayer();
  const leadId = payload.leadId || generateFallbackLeadId();
  const pageUrl = getSanitizedPageUrl();
  const pagePath = getPagePath();
  const pageTitle = getPageTitle();
  const submissionTimestamp = payload.submissionTimestamp || new Date().toISOString();

  // 1. Private debug-only event for authorized GTM Preview inspection
  dataLayer.push({
    event: 'lead_submission_debug',
    lead_id: leadId,
    form_type: payload.formType,
    full_name: payload.fullName,
    email: payload.email,
    whatsapp: payload.whatsapp || '',
    website: payload.website || '',
    service: payload.service,
    project_details: payload.projectDetails || '',
    page_url: pageUrl,
    page_title: pageTitle,
    submission_timestamp: submissionTimestamp,
  });

  // 2. Sanitized conversion event for GA4, Google Ads, and Meta Pixel (NO PII)
  const conversionEventName =
    payload.formType === 'main_contact_form' ? 'generate_lead' : 'strategy_call_submit';

  dataLayer.push({
    event: conversionEventName,
    lead_id: leadId,
    form_type: payload.formType,
    service: payload.service,
    page_url: pageUrl,
    page_path: pagePath,
    page_title: pageTitle,
    submission_timestamp: submissionTimestamp,
  });
}

function sanitizeLinkUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  try {
    const parsed = new URL(rawUrl);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return '';
  }
}

export function trackWhatsAppClick(params: {
  buttonText: string;
  buttonLocation: string;
  linkUrl?: string;
}): void {
  if (typeof window === 'undefined') return;

  const dataLayer = ensureDataLayer();
  dataLayer.push({
    event: 'whatsapp_click',
    button_text: params.buttonText.trim(),
    button_location: params.buttonLocation,
    page_path: getPagePath(),
    link_url: sanitizeLinkUrl(params.linkUrl),
  });
}

export function trackServiceClick(params: {
  serviceName: string;
  servicePosition: number;
}): void {
  if (typeof window === 'undefined') return;

  const dataLayer = ensureDataLayer();
  dataLayer.push({
    event: 'service_click',
    service_name: params.serviceName,
    service_position: params.servicePosition,
    page_path: getPagePath(),
  });
}

export function trackCaseStudyClick(params: {
  caseStudyName: string;
  caseStudyCategory: string;
  caseStudyPosition: number;
}): void {
  if (typeof window === 'undefined') return;

  const dataLayer = ensureDataLayer();
  dataLayer.push({
    event: 'case_study_click',
    case_study_name: params.caseStudyName,
    case_study_category: params.caseStudyCategory,
    case_study_position: params.caseStudyPosition,
    page_path: getPagePath(),
  });
}

export function trackCtaClick(params: {
  ctaText: string;
  ctaLocation: string;
}): void {
  if (typeof window === 'undefined') return;

  const dataLayer = ensureDataLayer();
  dataLayer.push({
    event: 'cta_click',
    cta_text: params.ctaText.trim(),
    cta_location: params.ctaLocation,
    page_path: getPagePath(),
  });
}
