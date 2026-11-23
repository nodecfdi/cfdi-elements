import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: [
      'test_helpers/xml_matcher.ts',
      'test_helpers/element_matchers.ts',
      'test_helpers/element_tests_context.ts',
    ],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
    },
    isolate: false,
  },
});
