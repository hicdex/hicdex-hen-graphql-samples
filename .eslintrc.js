module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {},
  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    'prefer-template': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'template-curly-spacing': 'off',
    indent: 'off',
    'max-len': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/no-cycle': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
