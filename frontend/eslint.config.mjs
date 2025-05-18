/* eslint import/no-extraneous-dependencies: 0 */

import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([globalIgnores(['node_modules/', '**/dist', '**/build']), {
  extends: fixupConfigRules(compat.extends(
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  )),

  plugins: {
    react: fixupPluginRules(react),
  },

  languageOptions: {
    globals: {
      ...globals.browser,
    },

    ecmaVersion: 'latest',
    sourceType: 'module',

    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'react/react-in-jsx-scope': 0,

    'no-underscore-dangle': [2, {
      allow: ['__filename', '__dirname'],
    }],

    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
    }],

    'testing-library/no-debug': 0,

    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx'],
    }],
  },
}]);
