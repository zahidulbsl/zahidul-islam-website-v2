import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const ssrOutDir = path.resolve(rootDir, '.prerender-ssr');
const distHtmlPath = path.resolve(distDir, 'index.html');
const caseStudiesOutDir = path.resolve(distDir, 'case-studies');
const caseStudiesHtmlPath = path.resolve(caseStudiesOutDir, 'index.html');

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMetaByAttr(html, attrName, attrValue, newContent) {
  const escapedContent = escapeHtmlAttr(newContent);
  const pattern = new RegExp(
    `(<meta\\s+[^>]*${attrName}="${attrValue}"[^>]*content=")[^"]*("[^>]*>)`,
    'i'
  );
  if (!pattern.test(html)) {
    throw new Error(`Could not locate <meta ${attrName}="${attrValue}"> in HTML template.`);
  }
  return html.replace(pattern, `$1${escapedContent}$2`);
}

function applyRouteHeadSeo(templateHtml, seo, structuredData) {
  let html = templateHtml;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtmlText(seo.title)}</title>`
  );

  html = replaceMetaByAttr(html, 'name', 'description', seo.description);
  html = replaceMetaByAttr(html, 'property', 'og:title', seo.ogTitle);
  html = replaceMetaByAttr(html, 'property', 'og:description', seo.ogDescription);
  html = replaceMetaByAttr(html, 'property', 'og:url', seo.ogUrl);
  html = replaceMetaByAttr(html, 'property', 'og:image', seo.ogImage);
  html = replaceMetaByAttr(html, 'property', 'og:image:secure_url', seo.ogImage);
  html = replaceMetaByAttr(html, 'property', 'og:image:alt', seo.ogImageAlt);

  html = replaceMetaByAttr(html, 'name', 'twitter:url', seo.ogUrl);
  html = replaceMetaByAttr(html, 'name', 'twitter:title', seo.ogTitle);
  html = replaceMetaByAttr(html, 'name', 'twitter:description', seo.ogDescription);
  html = replaceMetaByAttr(html, 'name', 'twitter:image', seo.ogImage);
  html = replaceMetaByAttr(html, 'name', 'twitter:image:alt', seo.ogImageAlt);

  html = html.replace(
    /(<link\s+[^>]*rel="canonical"[^>]*href=")[^"]*("[^>]*>)/i,
    `$1${escapeHtmlAttr(seo.canonicalUrl)}$2`
  );

  if (structuredData) {
    const jsonLd = JSON.stringify(structuredData, null, 2);
    html = html.replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${jsonLd}\n    </script>`
    );
  }

  return html;
}

async function prerender() {
  try {
    // 1. Build the SSR bundle into a temporary directory
    await build({
      root: rootDir,
      logLevel: 'warn',
      build: {
        ssr: path.resolve(rootDir, 'src/entry-server.tsx'),
        outDir: ssrOutDir,
        emptyOutDir: true,
        ssrEmitAssets: false,
        rollupOptions: {
          output: {
            format: 'esm',
            entryFileNames: 'entry-server.mjs',
          },
        },
      },
    });

    // 2. Import the SSR renderer and route SEO helpers
    const serverEntryPath = path.resolve(ssrOutDir, 'entry-server.mjs');
    const { render, getRouteSeo, getCaseStudiesStructuredData } = await import(
      pathToFileURL(serverEntryPath).href
    );

    const template = await fs.readFile(distHtmlPath, 'utf-8');
    const rootPlaceholder = '<div id="root"></div>';

    if (!template.includes(rootPlaceholder)) {
      throw new Error('Could not locate <div id="root"></div> in dist/index.html.');
    }

    // 3. Prerender homepage (/) into dist/index.html — preserving homepage SEO verbatim
    const homeHtml = render('/');
    if (!homeHtml || !homeHtml.includes('<main') || !homeHtml.includes('<h1')) {
      throw new Error('Prerendered homepage HTML is missing expected markup.');
    }

    const finalHomeHtml = template.replace(
      rootPlaceholder,
      `<div id="root">${homeHtml}</div>`
    );
    await fs.writeFile(distHtmlPath, finalHomeHtml, 'utf-8');
    console.log(
      `[prerender] Successfully injected ${homeHtml.length.toLocaleString()} bytes of static HTML into dist/index.html`
    );

    // 4. Prerender dedicated Case Studies page (/case-studies/) into dist/case-studies/index.html
    const caseStudiesAppHtml = render('/case-studies/');
    if (
      !caseStudiesAppHtml ||
      !caseStudiesAppHtml.includes('<main') ||
      !caseStudiesAppHtml.includes('Real Campaigns.')
    ) {
      throw new Error('Prerendered /case-studies/ HTML is missing expected markup.');
    }

    const caseStudiesSeo = getRouteSeo('/case-studies/');
    const caseStudiesSchema = getCaseStudiesStructuredData();
    const caseStudiesDocument = applyRouteHeadSeo(
      template,
      caseStudiesSeo,
      caseStudiesSchema
    ).replace(rootPlaceholder, `<div id="root">${caseStudiesAppHtml}</div>`);

    await fs.mkdir(caseStudiesOutDir, { recursive: true });
    await fs.writeFile(caseStudiesHtmlPath, caseStudiesDocument, 'utf-8');
    console.log(
      `[prerender] Successfully generated dist/case-studies/index.html (${caseStudiesAppHtml.length.toLocaleString()} bytes of app HTML)`
    );
  } finally {
    // 5. Clean up temporary SSR build artifacts
    await fs.rm(ssrOutDir, { recursive: true, force: true });
  }
}

prerender().catch((err) => {
  console.error('[prerender] Failed to prerender pages:', err);
  process.exit(1);
});

