// @ts-check
import { nodecfdiConfig } from '@nodecfdi/eslint-config';
import { defineFlatConfig } from 'eslint-define-config';

export default defineFlatConfig([
  ...nodecfdiConfig({ vitest: true, ignores: { additional: ['**/*.stub', 'ace.js'] } }),
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/tests/**/*'],
    rules: {
      'vitest/no-done-callback': 'off',
    },
  },
]);
