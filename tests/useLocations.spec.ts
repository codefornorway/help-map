import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function ref<T>(value: T) {
  return { value } as { value: T };
}

function computed<T>(getter: () => T) {
  return { get value() { return getter(); } } as { readonly value: T };
}

// Ensure alias `~~` points to project root so imports in composables work
const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const aliasDir = path.join(rootDir, 'node_modules', '~~');
try {
  fs.statSync(aliasDir);
} catch {
  fs.mkdirSync(path.dirname(aliasDir), { recursive: true });
  fs.symlinkSync(rootDir, aliasDir, 'dir');
}

// Provide Vue's ref globally to match Nuxt auto-import behavior
(globalThis as any).ref = ref;
(globalThis as any).computed = computed;
(globalThis as any).useState = (_key: string, init: any) => {
  const value = typeof init === 'function' ? init() : init;
  return ref(value);
};

const { useLocations } = await import('../app/composables/useLocations.ts');

function createFlyToSpy() {
  const calls: any[] = [];
  const flyTo = (...args: any[]) => {
    calls.push(args);
  };
  return { flyTo, calls };
}

test('focus sets selected and calls flyTo with location coordinates', () => {
  const { flyTo, calls } = createFlyToSpy();
  (globalThis as any).useMapbox = (_id: string, cb: (map: any) => void) => {
    cb({ flyTo });
  };

  const { selected, focus } = useLocations();
  const location = {
    name: 'Test',
    description: '',
    image: '',
    address: '',
    email: '',
    source: '',
    coordinates: [1, 2] as [number, number],
    data_updated: '',
    notes: '',
    organization: '',
    organization_logo: '',
    city: '',
    type: ['foodbank'],
  };

  focus(location);

  assert.deepEqual(selected.value, location);
  assert.deepEqual(calls[0][0], { center: [location.coordinates[1], location.coordinates[0]], zoom: 15 });
});

test('reset clears selected and calls flyTo with default center', () => {
  const { flyTo, calls } = createFlyToSpy();
  (globalThis as any).useMapbox = (_id: string, cb: (map: any) => void) => {
    cb({ flyTo });
  };

  const { selected, focus, reset } = useLocations();
  const location = {
    name: 'Test',
    description: '',
    image: '',
    address: '',
    email: '',
    source: '',
    coordinates: [1, 2] as [number, number],
    data_updated: '',
    notes: '',
    organization: '',
    organization_logo: '',
    city: '',
    type: ['foodbank'],
  };

  focus(location);
  calls.length = 0; // clear previous flyTo call

  reset();

  assert.equal(selected.value, null);
  assert.deepEqual(calls[0][0], { center: [8.49, 64.63], zoom: 4.38 });
});

test('filters by query, type, and organization', () => {
  const { locations, searchQuery, filterTypes, filterOrgs, types, organizations } = useLocations();
  searchQuery.value = '';
  filterTypes.value = [];
  filterOrgs.value = [];
  assert.deepEqual(types.value.sort(), ['foodbank', 'health']);
  assert.deepEqual(organizations.value.sort(), ['OrgA', 'OrgB']);
  searchQuery.value = 'Bergen';
  filterTypes.value = ['health'];
  filterOrgs.value = ['OrgB'];
  assert.equal(locations.value.length, 1);
  assert.equal(locations.value[0].name, 'Bergen Health');
});

test('allows selecting multiple types and organizations', () => {
  const { locations, filterTypes, filterOrgs, searchQuery } = useLocations();
  searchQuery.value = '';
  filterTypes.value = [];
  filterOrgs.value = [];
  filterTypes.value = ['foodbank', 'health'];
  filterOrgs.value = ['OrgA', 'OrgB'];
  assert.equal(locations.value.length, 2);
});
