import { existsSync, readdirSync } from 'node:fs';
import { defineConfig } from 'tsdown';

function toCamelCase(name: string): string {
  return name.replaceAll(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase());
}

function toPascalCase(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const elementEntries = Object.fromEntries(
  readdirSync('src/elements', { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(`src/elements/${entry.name}/index.ts`))
    .map((entry) => [toCamelCase(entry.name), `src/elements/${entry.name}/index.ts`]),
);

const iifeEntries = {
  index: 'index.ts',
  ...elementEntries,
};

export default defineConfig([
  {
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
  },
  ...Object.entries(iifeEntries).map(([name, entry]) => ({
    entry: { [name]: entry },
    outDir: 'dist/iife',
    clean: false,
    format: 'iife' as const,
    globalName: `nc${toPascalCase(name)}`,
    unbundle: false,
    minify: true,
    fixedExtension: false,
    dts: false,
    platform: 'browser' as const,
    target: 'es2020',
    outputOptions: {
      globals: {
        '@nodecfdi/cfdi-core': 'ncCfdiCore',
      },
    },
  })),
]);
