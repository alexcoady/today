module.exports = {
  "plugins": [
      "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "root": true,
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "impliedStrict": true
    }
  },
  "rules": {
    "no-console": 0
  },
  "globals": {
    "console": true,
    "global": true,
    "window": true,
    "document": true,
    "__dirname": true
  }
};
