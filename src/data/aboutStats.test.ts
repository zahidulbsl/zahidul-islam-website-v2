import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CREDIBILITY_STATISTICS,
  EXPERTISE_STATISTICS,
  ABOUT_STATISTICS,
  ABOUT_EXPERTISE_CARDS,
} from './aboutStats';

test('About statistics are organized into two groups of three cards each', () => {
  assert.equal(CREDIBILITY_STATISTICS.length, 3);
  assert.equal(EXPERTISE_STATISTICS.length, 3);
  assert.equal(ABOUT_STATISTICS.length, 6);
});

test('Group 1 (Professional Credibility) preserves exact order and figures', () => {
  assert.deepEqual(
    CREDIBILITY_STATISTICS.map((s) => s.label),
    ['Orders Completed', '5-Star Reviews', 'Job Success Score']
  );

  assert.deepEqual(
    CREDIBILITY_STATISTICS.map((s) => `${s.prefix}${s.value}${s.suffix}`),
    ['1000+', '700+', '100%']
  );

  assert.deepEqual(
    CREDIBILITY_STATISTICS.map((s) => s.support),
    ['Fiverr & Upwork', 'Fiverr Verified', 'Top Rated on Fiverr & Upwork']
  );
});

test('Group 2 (Advertising & Tracking Expertise) preserves exact order and figures', () => {
  assert.deepEqual(
    EXPERTISE_STATISTICS.map((s) => s.label),
    ['Google Ads Spend', 'Meta Ads Spend', 'Tracking Implementations']
  );

  assert.deepEqual(
    EXPERTISE_STATISTICS.map((s) => `${s.prefix}${s.value}${s.suffix}`),
    ['$10M+', '$12M+', '300+']
  );

  assert.deepEqual(
    EXPERTISE_STATISTICS.map((s) => s.support),
    [
      'Google Search, Shopping & Performance Max.',
      'Facebook, Instagram & Lead Generation.',
      'GA4, GTM, Meta CAPI & Server-Side Tracking.',
    ]
  );
});

test('Combined statistics list places Group 1 first (mobile row 1) and Group 2 second (mobile row 2)', () => {
  assert.deepEqual(
    ABOUT_STATISTICS.slice(0, 3).map((s) => s.group),
    ['credibility', 'credibility', 'credibility']
  );
  assert.deepEqual(
    ABOUT_STATISTICS.slice(3, 6).map((s) => s.group),
    ['expertise', 'expertise', 'expertise']
  );
});

test('Lower section preserves all three expertise cards verbatim', () => {
  assert.equal(ABOUT_EXPERTISE_CARDS.length, 3);
  assert.deepEqual(
    ABOUT_EXPERTISE_CARDS.map((c) => c.title),
    [
      'Google Ads & Search Growth',
      'Meta Ads & Customer Acquisition',
      'Analytics & Conversion Tracking',
    ]
  );
});
