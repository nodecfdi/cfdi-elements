import eienjs from '@eienjs/eslint-config';

export default eienjs({
  markdown: true,
  stylistic: {
    maxLineLength: 200,
  },
  typescript: {
    tsconfigPath: 'tsconfig.json',
    erasableSyntaxOnly: {
      parameterProperties: false,
    },
  },
});
