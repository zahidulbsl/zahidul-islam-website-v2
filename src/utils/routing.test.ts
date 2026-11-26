import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRoute, getRoutePath } from './routing';
import { getPageSeoConfig } from './seo';
import { getScrollBehavior } from './scroll';

test('normalizeRoute resolves home and case-studies paths reliably', () => {
  assert.equal(normalizeRoute('/'), 'home');
  assert.equal(normalizeRoute(''), 'home');
  assert.equal(normalizeRoute('/index.html'), 'home');
  assert.equal(normalizeRoute('/case-studies'), 'case-studies');
  assert.equal(normalizeRoute('/case-studies/'), 'case-studies');
  assert.equal(normalizeRoute('/case-studies/index.html'), 'case-studies');
  assert.equal(normalizeRoute('/CASE-STUDIES/'), 'case-studies');
  assert.equal(normalizeRoute('/unknown-route'), 'home');
});

test('getRoutePath returns canonical paths', () => {
  assert.equal(getRoutePath('home'), '/');
  assert.equal(getRoutePath('case-studies'), '/case-studies/');
});

test('getScrollBehavior uses instant scroll when prefers-reduced-motion is enabled', () => {
  assert.equal(getScrollBehavior(true), 'auto');
  assert.equal(getScrollBehavior(false), 'smooth');
});

test('getPageSeoConfig returns dedicated metadata for /case-studies/ without altering home', () => {
  const homeSeo = getPageSeoConfig('home');
  const csSeo = getPageSeoConfig('case-studies');

  assert.equal(homeSeo.canonicalUrl, 'https://zahidul.pro.bd/');
  assert.equal(
    homeSeo.title,
    'Zahidul Islam | Google Ads & Meta Ads Specialist'
  );

  assert.equal(csSeo.canonicalUrl, 'https://zahidul.pro.bd/case-studies/');
  assert.equal(
    csSeo.title,
    'Google Ads, Meta Ads & Tracking Case Studies | Zahidul Islam'
  );
  assert.equal(csSeo.ogUrl, 'https://zahidul.pro.bd/case-studies/');
  assert.ok(csSeo.description.includes('Zahidul Islam'));
});
