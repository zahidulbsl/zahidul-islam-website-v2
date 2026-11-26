export type AppRoute = 'home' | 'case-studies';

export const HOME_PATH = '/';
export const CASE_STUDIES_PATH = '/case-studies/';
export const APP_NAVIGATE_EVENT = 'app:navigate';

/**
 * Normalizes a URL pathname into one of the supported application routes.
 * Handles trailing slashes and static index.html paths cleanly for GitHub Pages.
 */
export function normalizeRoute(pathname: string): AppRoute {
  const cleaned = pathname.trim().toLowerCase().replace(/\/index\.html$/, '').replace(/\/+$/, '');
  if (cleaned === '/case-studies') {
    return 'case-studies';
  }
  return 'home';
}

/**
 * Resolves the canonical URL path for a given AppRoute.
 */
export function getRoutePath(route: AppRoute): string {
  return route === 'case-studies' ? CASE_STUDIES_PATH : HOME_PATH;
}

/**
 * Client-side navigation helper using the History API so SPA transitions
 * keep clean URLs, trigger analytics page views, and support browser back/forward.
 */
export function navigateToPath(targetPath: string, hash?: string): void {
  if (typeof window === 'undefined') return;

  const normalizedHash = hash
    ? hash.startsWith('#')
      ? hash
      : `#${hash}`
    : '';
  const nextUrl = `${targetPath}${normalizedHash}`;
  const currentUrl = `${window.location.pathname}${window.location.hash}`;

  if (currentUrl !== nextUrl) {
    window.history.pushState({}, '', nextUrl);
  }

  window.dispatchEvent(
    new CustomEvent(APP_NAVIGATE_EVENT, {
      detail: {
        pathname: targetPath,
        hash: normalizedHash,
      },
    })
  );
}
