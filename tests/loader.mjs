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
    return { format: 'module', source: 'export default [];', shortCircuit: true };
  }
  return nextLoad(url, context);
}
