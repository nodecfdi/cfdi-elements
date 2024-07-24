import { register } from 'node:module';

register('ts-node/esm', import.meta.url);

await import('./tools/main.js');
