// @ts-check
import nodecfdiConfig from '@nodecfdi/eslint-config';

const { defineConfig } = nodecfdiConfig(import.meta.dirname, { vitest: true });

export default defineConfig();

// export default defineFlatConfig([
//   ...nodecfdiConfig({
//     vitest: true,
//     experimentalProjectService: import.meta.dirname,
//     ignores: { additional: ['**/*.stub'] },
//   }),
// ]);
