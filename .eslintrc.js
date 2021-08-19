module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    node: true,
    'jest/globals': true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'jest/consistent-test-it': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jest/no-test-callback': 'off',
    'no-underscore-dangle': 'off',
    'jest/no-standalone-expect': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jest/valid-title': 'off'
  }
}
