import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [
      'tests/setup_files/element_matchers.ts',
      'tests/setup_files/element_tests_context.ts',
    ],
    coverage: {
      all: true,
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
    },
  },
});
