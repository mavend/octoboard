module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "standard",
    "prettier",
    "plugin:jest/all",
    "plugin:json/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier", "jest", "json"],
  rules: {
    "react/prop-types": [2, { ignore: ["children"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/**", "build/**"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
      },
    },
  ],
};
