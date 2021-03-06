module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  plugins: ["@mysticatea", "@typescript-eslint", "import", "tsc"],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  env: {
    browser: true,
  },
  rules: {
    "@mysticatea/block-scoped-var": "error",
    "@mysticatea/no-instanceof-array": "error",
    "@mysticatea/no-instanceof-wrapper": "error",
    "@mysticatea/no-literal-call": "error",
    "@mysticatea/no-this-in-static": "error",
    "@mysticatea/no-use-ignored-vars": "error",
    "@mysticatea/no-useless-rest-spread": "error",
    "tsc/config": [
      "error",
      {
        configFile: `${__dirname}/tsconfig.json`,
      },
    ],

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
