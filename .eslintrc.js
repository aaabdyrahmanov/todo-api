module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [
    "/dist/**/*", // Ignore built files.
    "/coverage/**/*", // Ignore coverage files.
    "/build/**/*", // Ignore build tsoa files.
    "*.config.js", // ignore config files.
    "__mocks__/**/*", // Ignore jest mock files.
    "/test/**/*", // ignore test files.
    ".eslintrc.js", // ignore eslint config file.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "single"],
    indent: ["error", 1],
    "new-cap": "off",
    "require-jsdoc": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
