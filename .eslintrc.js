module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "standard",
    "prettier",
    "plugin:json/recommended",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    project: ["tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier", "jest", "json"],
  rules: {
    "react/prop-types": [
      2,
      {
        ignore: ["children"],
      },
    ],
    "jest/no-hooks": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/**", "build/**", "dist/**"],
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
