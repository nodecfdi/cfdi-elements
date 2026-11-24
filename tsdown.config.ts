import { existsSync, readdirSync } from 'node:fs';
import { defineConfig } from 'tsdown';

function toCamelCase(name: string): string {
  return name.replaceAll(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase());
}

const elementEntries = Object.fromEntries(
  readdirSync('src/elements', { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(`src/elements/${entry.name}/index.ts`))
    .map((entry) => [toCamelCase(entry.name), `src/elements/${entry.name}/index.ts`]),
);

export default defineConfig({
  entry: {
    index: 'index.ts',
    types: 'src/types.ts',
    ...elementEntries,
  },
  clean: true,
  format: 'esm',
  unbundle: true,
  minify: 'dce-only',
  fixedExtension: false,
  dts: true,
  platform: 'neutral',
  deps: {
    neverBundle: [/^node:/],
  },
  target: 'esnext',
  exports: true,
});
