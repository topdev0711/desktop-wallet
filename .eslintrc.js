module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    indent: [
      'warn',
      2,
      { SwitchCase: 1 },
    ],
    'linebreak-style': [
      'warn',
      'unix',
    ],
    quotes: [
      'warn',
      'single',
    ],
    semi: [
      'warn',
      'always',
    ],
    '@typescript-eslint/object-curly-spacing': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'no-new-wrappers': 'off',
    'no-extra-boolean-cast': 'off',
    'react/no-array-index-key': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/prefer-stateless-function': 'off',
    'no-param-reassign': 'off', // used redux-immer for simplification
    'prefer-object-spread': 'off',
    'max-classes-per-file': ['error', 3],
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/parser': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'import/no-unresolved': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-return-await': 'off',
    'no-console': 'off',
    'react-hooks/exhaustive-deps': [
      'off',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'import/extensions': 'off',
    'arrow-body-style': 'off',
    'react/jsx-filename-extension': 'off',
    'arrow-parens': 'off',
    'max-len': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'operator-linebreak': 'off',
    'react/require-default-props': 'off',
    'react/display-name': 'off',
    'object-curly-newline': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'react/jsx-key': 'off'
  },
};
