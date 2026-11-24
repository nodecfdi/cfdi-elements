import eienjs from '@eienjs/eslint-config';

export default eienjs({
  markdown: true,
  stylistic: {
    maxLineLength: 200,
  },
  unicorn: {
    overrides: {
      'unicorn/prefer-https': 'off',
    },
  },
  typescript: {
    tsconfigPath: 'tsconfig.json',
    erasableSyntaxOnly: {
      parameterProperties: false,
    },
  },
});
