module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals', // Add Next.js-specific rules
    'plugin:prettier/recommended', // Enable Prettier integration
  ],
  rules: {
    'no-unused-vars': 'off', // Disable the default rule
    '@typescript-eslint/no-unused-vars': ['error'], // Enable the TypeScript-specific rule
  },
};
