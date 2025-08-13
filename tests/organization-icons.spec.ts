import { test } from 'node:test';
import assert from 'node:assert/strict';

import { iconForOrganization } from '../utils/organization-icons.ts';

test('returns logo for known organization', () => {
  assert.equal(iconForOrganization('Røde Kors'), '/logos/rode-kors.svg');
});

test('falls back to default icon for unknown organization', () => {
  assert.equal(iconForOrganization('Unknown Org'), '/icons/community.svg');
});

