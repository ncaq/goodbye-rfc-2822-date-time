module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "prettier",
  ],
  env: {
    browser: true,
  },
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
      },
    ],

    curly: ["error", "all"],
    "no-param-reassign": "off",
  },
};
