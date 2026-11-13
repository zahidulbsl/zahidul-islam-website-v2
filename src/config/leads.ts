/**
 * Serverless Lead Management Endpoint Configuration
 *
 * For GitHub Pages / Vite static builds:
 * Set VITE_GOOGLE_APPS_SCRIPT_URL in your build environment (.env.production or GitHub Actions secret/var)
 * OR paste your deployed Apps Script Web App URL directly below after deployment:
 * Example: 'https://script.google.com/macros/s/AKfycb.../exec'
 *
 * IMPORTANT:
 * - Never store private credentials, Sheet IDs, or OAuth secrets here.
 * - Only the public Google Apps Script Web App /exec endpoint URL belongs here.
 */
const DEFAULT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzuw2SJw0Jl_7z6U6ToUh5fJSROpVddH7WjP-1bXD4yub6TdSro_FsiORd4Qn0cTDdy/exec';

const CONFIGURED_WEB_APP_URL =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined)?.trim() ||
  DEFAULT_WEB_APP_URL;

export function getLeadSubmissionEndpoint(): string {
  return CONFIGURED_WEB_APP_URL;
}

export function isLeadEndpointConfigured(): boolean {
  const url = getLeadSubmissionEndpoint();
  return (
    url.startsWith('https://script.google.com/macros/s/') &&
    url.endsWith('/exec')
  );
}
