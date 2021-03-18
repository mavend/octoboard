module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "standard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "react/prop-types": [2, { ignore: ["children"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/**", "build/**"],
};
