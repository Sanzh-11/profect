const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['react-app', 'airbnb', 'plugin:jsx-a11y/recommended', 'prettier'],
  plugins: ['jsx-a11y', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { prettierOptions }],
    // 'no-console': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};