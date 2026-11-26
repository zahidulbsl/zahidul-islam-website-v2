import { renderToString } from 'react-dom/server';
import App from './App';
import { CASE_STUDIES } from './data/caseStudies';
import { normalizeRoute } from './utils/routing';
import { getPageSeoConfig, SITE_ORIGIN } from './utils/seo';

export function render(pathname: string = '/'): string {
  return renderToString(<App initialPath={pathname} />);
}

export function getRouteSeo(pathname: string = '/') {
  return getPageSeoConfig(normalizeRoute(pathname));
}

export function getCaseStudiesStructuredData() {
  const seo = getPageSeoConfig('case-studies');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${seo.canonicalUrl}#webpage`,
        url: seo.canonicalUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          '@id': `${SITE_ORIGIN}/#website`,
        },
        about: {
          '@id': `${SITE_ORIGIN}/#person`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: seo.ogImage,
          width: 1200,
          height: 630,
          encodingFormat: 'image/png',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_ORIGIN}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Case Studies',
              item: seo.canonicalUrl,
            },
          ],
        },
        mainEntity: {
          '@type': 'ItemList',
          name: 'Google Ads, Meta Ads & Conversion Tracking Case Studies',
          numberOfItems: CASE_STUDIES.length,
          itemListElement: CASE_STUDIES.map((cs, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: cs.title,
            description: cs.summary,
            url: `${seo.canonicalUrl}#${cs.slug}`,
          })),
        },
        inLanguage: 'en-US',
      },
    ],
  };
}

