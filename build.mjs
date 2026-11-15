import { buildSite } from './_core/build.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
console.log('Building site...');
await buildSite(here);
console.log('Build complete! Output in ./dist');
