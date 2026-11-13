import {
  getLeadSubmissionEndpoint,
  isLeadEndpointConfigured,
} from '../config/leads';

export type LeadFormSource = 'contact_section' | 'consultation_popup';

export interface LeadSubmissionInput {
  source: LeadFormSource;
  fullName: string;
  email: string;
  whatsapp?: string;
  websiteUrl?: string;
  service: string;
  monthlyBudget?: string;
  projectDetails: string;
  honeypot?: string;
  formLoadedAt?: number;
}

export interface LeadSubmissionResponse {
  ok: true;
  submissionId: string;
  submittedAt: string;
  status: string;
  message: string;
}

const DUPLICATE_COOLDOWN_MS = 45_000;
const REQUEST_TIMEOUT_MS = 20_000;
const RECENT_SUBMISSIONS_STORAGE_KEY = 'zahidul_recent_lead_submissions_v1';

const inMemoryRecentSubmissions = new Map<string, number>();

function normalizeWhatsapp(raw?: string): string {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';
  const digitsOnly = trimmed.replace(/\D/g, '');
  // react-international-phone with forceDialCode may hold only the country code (e.g., "+1", "+44")
  if (digitsOnly.length <= 3) return '';
  return trimmed;
}

function normalizeWebsiteUrl(raw?: string): string {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function buildDuplicateFingerprint(input: {
  source: LeadFormSource;
  email: string;
  service: string;
  projectDetails: string;
}): string {
  return [
    input.source,
    input.email.trim().toLowerCase(),
    input.service.trim().toLowerCase(),
    input.projectDetails.trim().slice(0, 120).toLowerCase(),
  ].join('|');
}

function isDuplicateRecentSubmission(fingerprint: string): boolean {
  const now = Date.now();
  const memTimestamp = inMemoryRecentSubmissions.get(fingerprint);
  if (memTimestamp && now - memTimestamp < DUPLICATE_COOLDOWN_MS) {
    return true;
  }

  try {
    const raw = window.sessionStorage.getItem(RECENT_SUBMISSIONS_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Record<string, number>;
    const storedTs = parsed[fingerprint];
    return typeof storedTs === 'number' && now - storedTs < DUPLICATE_COOLDOWN_MS;
  } catch {
    return false;
  }
}

function recordSuccessfulSubmission(fingerprint: string): void {
  const now = Date.now();
  inMemoryRecentSubmissions.set(fingerprint, now);

  try {
    const raw = window.sessionStorage.getItem(RECENT_SUBMISSIONS_STORAGE_KEY);
    const parsed: Record<string, number> = raw ? JSON.parse(raw) : {};
    // Prune expired fingerprints
    for (const [key, ts] of Object.entries(parsed)) {
      if (now - ts >= DUPLICATE_COOLDOWN_MS) {
        delete parsed[key];
      }
    }
    parsed[fingerprint] = now;
    window.sessionStorage.setItem(
      RECENT_SUBMISSIONS_STORAGE_KEY,
      JSON.stringify(parsed)
    );
  } catch {
    // Ignore sessionStorage restrictions
  }
}

export async function submitLead(
  input: LeadSubmissionInput
): Promise<LeadSubmissionResponse> {
  // Honeypot client-side short-circuit
  if (input.honeypot && input.honeypot.trim().length > 0) {
    throw new Error('Unable to verify submission. Please refresh and try again.');
  }

  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const service = input.service.trim();
  const projectDetails = input.projectDetails.trim();
  const whatsapp = normalizeWhatsapp(input.whatsapp);
  const websiteUrl = normalizeWebsiteUrl(input.websiteUrl);
  const monthlyBudget = (input.monthlyBudget || '').trim();

  if (fullName.length < 2) {
    throw new Error('Please enter your full name (minimum 2 characters).');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!service) {
    throw new Error('Please select a primary service needed.');
  }

  if (projectDetails.length < 5) {
    throw new Error('Please share at least a brief summary of your project details.');
  }

  if (whatsapp) {
    const digits = whatsapp.replace(/\D/g, '');
    if (digits.length < 6 || digits.length > 18) {
      throw new Error('Please enter a valid WhatsApp number or leave it blank.');
    }
  }

  if (websiteUrl) {
    try {
      const parsedUrl = new URL(websiteUrl);
      if (!parsedUrl.hostname.includes('.')) {
        throw new Error('Invalid domain');
      }
    } catch {
      throw new Error(
        'Please enter a valid Website / Store URL (e.g., https://yourwebsite.com) or leave it blank.'
      );
    }
  }

  const fingerprint = buildDuplicateFingerprint({
    source: input.source,
    email,
    service,
    projectDetails,
  });

  if (isDuplicateRecentSubmission(fingerprint)) {
    throw new Error(
      'This inquiry was just submitted. Please wait a moment before sending it again.'
    );
  }

  if (!isLeadEndpointConfigured()) {
    throw new Error(
      'Lead submission backend is not configured yet. Please deploy the Google Apps Script Web App and set VITE_GOOGLE_APPS_SCRIPT_URL.'
    );
  }

  const endpoint = getLeadSubmissionEndpoint();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    // Use text/plain;charset=utf-8 so the browser sends a CORS-simple POST request
    // without triggering an OPTIONS preflight that Google Apps Script cannot answer.
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      redirect: 'follow',
      signal: controller.signal,
      body: JSON.stringify({
        source: input.source,
        fullName,
        email,
        whatsapp,
        websiteUrl,
        service,
        monthlyBudget,
        projectDetails,
        honeypot: input.honeypot || '',
        formLoadedAt: input.formLoadedAt || 0,
        submittedAt: Date.now(),
      }),
    });

    const rawText = await response.text();
    let parsed: {
      ok?: boolean;
      submissionId?: string;
      submittedAt?: string;
      status?: string;
      message?: string;
      error?: string;
    } | null = null;

    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = null;
    }

    if (!response.ok || !parsed || parsed.ok !== true) {
      throw new Error(
        parsed?.error ||
          `Submission could not be processed (status ${response.status}). Please try again or reach out via WhatsApp.`
      );
    }

    recordSuccessfulSubmission(fingerprint);

    return {
      ok: true,
      submissionId: parsed.submissionId || '',
      submittedAt: parsed.submittedAt || new Date().toISOString(),
      status: parsed.status || 'New',
      message: parsed.message || 'Inquiry received successfully.',
    };
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(
        'The request timed out while contacting the server. Your details are preserved—please try again.'
      );
    }
    if (err instanceof Error) {
      throw err;
    }
    throw new Error(
      'Network error while submitting your inquiry. Please try again or contact via WhatsApp.'
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
}
