import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    commaDangle: 'never',
    arrowParens: false,
    braceStyle: '1tbs',
    jsx: false
  }),
  { rules: { '@stylistic/space-before-function-paren': ['error', 'always'] } },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { __dirname: 'readonly', process: 'readonly', Buffer: 'readonly' }
    }
  }
]
