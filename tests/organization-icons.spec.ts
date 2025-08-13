import { test } from 'node:test';
import assert from 'node:assert/strict';

import { iconForOrganization } from '../utils/organization-icons.ts';

test('returns logo path for Røde Kors', () => {
  assert.equal(iconForOrganization('Røde Kors'), '/logos/rode-kors.svg');
});

test('returns fallback for unknown organization', () => {
  assert.equal(iconForOrganization('Unknown'), '/logos/default.svg');
});
