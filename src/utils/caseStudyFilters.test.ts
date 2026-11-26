import test from 'node:test';
import assert from 'node:assert/strict';
import { CASE_STUDIES } from '../data/caseStudies';
import {
  PORTFOLIO_FILTER_CATEGORIES,
  filterCaseStudies,
  getTrackingBadge,
} from './caseStudyFilters';

test('All six portfolio filter categories are defined in order', () => {
  assert.deepEqual(PORTFOLIO_FILTER_CATEGORIES, [
    'All Projects',
    'Google Ads',
    'Meta Ads',
    'eCommerce',
    'Lead Generation',
    'Conversion Tracking',
  ]);
});

test('filterCaseStudies returns accurate counts for every category using existing data', () => {
  assert.equal(filterCaseStudies(CASE_STUDIES, 'All Projects').length, 12);
  assert.equal(filterCaseStudies(CASE_STUDIES, 'Google Ads').length, 9);
  assert.equal(filterCaseStudies(CASE_STUDIES, 'Meta Ads').length, 3);
  assert.equal(filterCaseStudies(CASE_STUDIES, 'eCommerce').length, 5);
  assert.equal(filterCaseStudies(CASE_STUDIES, 'Lead Generation').length, 7);
  assert.equal(filterCaseStudies(CASE_STUDIES, 'Conversion Tracking').length, 12);
});

test('Every case study has a real existing portfolio image and tracking badge', () => {
  for (const project of CASE_STUDIES) {
    assert.ok(project.coverImage?.src.startsWith('/assets/portfolio/'));
    const badge = getTrackingBadge(project);
    assert.ok(badge.src.startsWith('/logos/'));
    assert.ok(badge.name.length > 0);
  }
});
