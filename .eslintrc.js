module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    browser: true, // For frontend code
    node: true,    // For backend code
    es6: true,
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off', // Since we are using TypeScript for prop types
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+ new JSX transform
    // Add any project-specific rules here
  },
  overrides: [
    {
      files: ['src/backend/**/*.ts', 'src/backend/**/*.js'], // Rules specific to backend
      env: {
        browser: false,
        node: true,
      },
      rules: {
        // Backend specific rules if any
      }
    },
    {
      files: ['src/frontend/**/*.ts', 'src/frontend/**/*.tsx'], // Rules specific to frontend
      env: {
        browser: true,
        node: false,
      },
      rules: {
        // Frontend specific rules if any
      }
    }
  ],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "src/frontend/dist/",
    "src/frontend/node_modules/",
    "src/backend/dist/",
    "src/backend/node_modules/",
    "*.config.js" // Ignoring webpack, tailwind, postcss config files from root linting
    ],
};
