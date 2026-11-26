import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const ssrOutDir = path.resolve(rootDir, '.prerender-ssr');
const distHtmlPath = path.resolve(distDir, 'index.html');

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

    // 2. Import and execute the SSR renderer
    const serverEntryPath = path.resolve(ssrOutDir, 'entry-server.mjs');
    const { render } = await import(pathToFileURL(serverEntryPath).href);
    const appHtml = render();

    if (!appHtml || !appHtml.includes('<main') || !appHtml.includes('<h1')) {
      throw new Error('Prerendered HTML is missing expected landing-page markup.');
    }

    // 3. Inject prerendered HTML into the built dist/index.html
    const template = await fs.readFile(distHtmlPath, 'utf-8');
    const rootPlaceholder = '<div id="root"></div>';

    if (!template.includes(rootPlaceholder)) {
      throw new Error('Could not locate <div id="root"></div> in dist/index.html.');
    }

    const finalHtml = template.replace(
      rootPlaceholder,
      `<div id="root">${appHtml}</div>`
    );

    await fs.writeFile(distHtmlPath, finalHtml, 'utf-8');
    console.log(
      `[prerender] Successfully injected ${appHtml.length.toLocaleString()} bytes of static HTML into dist/index.html`
    );
  } finally {
    // 4. Clean up temporary SSR build artifacts
    await fs.rm(ssrOutDir, { recursive: true, force: true });
  }
}

prerender().catch((err) => {
  console.error('[prerender] Failed to prerender landing page:', err);
  process.exit(1);
});
