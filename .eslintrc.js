module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier", "eslint-plugin-prettier"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      // add any rules you want to customize
    },
  };