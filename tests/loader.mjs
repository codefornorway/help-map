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
      { name: 'Oslo Food', description: '', city: 'Oslo', coordinates: [0, 0], type: 'foodbank', address: '', organization: 'OrgA' },
      { name: 'Bergen Health', description: '', city: 'Bergen', coordinates: [0, 0], type: 'health', address: '', organization: 'OrgB' },
    ];
    return {
      format: 'module',
      source: 'export default ' + JSON.stringify(sample) + ';',
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
