module.exports = {
  root: true,

  env: {
    node: true,
  },

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxEOF': 1,
    }],
    'no-trailing-spaces': ['error'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
