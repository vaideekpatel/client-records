module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    settings: {
      react: { version: 'detect' },
    },
    env: { browser: true, es2021: true, node: true },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',                    
      'plugin:prettier/recommended',
    ],
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
      // your custom rules:
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/prop-types': 'off',
    },
  };
  