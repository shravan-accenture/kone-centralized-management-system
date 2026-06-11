import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist/**'],
  },

  js.configs.recommended,

  {
    files: ['src/**/*.{js,jsx}'],
    ...pluginReact.configs.flat.recommended,

    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['webpack.config.js', 'postcss.config.js', 'tailwind.config.js'],

    languageOptions: {
      globals: globals.node,
    },
  },
];
