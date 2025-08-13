import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('~~/')) {
    const resolved = pathToFileURL(path.join(rootDir, specifier.slice(3))).href;
    return { url: resolved, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('/data/locations.json')) {
    const sample = [
      {
        name: 'Oslo Food',
        description: '',
        image: '',
        address: '',
        email: '',
        source: '',
        coordinates: [0, 0],
        data_updated: '',
        notes: '',
        organization: 'OrgA',
        organization_logo: '',
        city: 'Oslo',
        type: ['foodbank'],
      },
      {
        name: 'Bergen Health',
        description: '',
        image: '',
        address: '',
        email: '',
        source: '',
        coordinates: [0, 0],
        data_updated: '',
        notes: '',
        organization: 'OrgB',
        organization_logo: '',
        city: 'Bergen',
        type: ['health'],
      },
    ];
    return {
      format: 'module',
      source: 'export default ' + JSON.stringify(sample) + ';',
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
