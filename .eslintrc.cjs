module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-promise-executor-return": "off",
    "prefer-promise-reject-errors": "off",
    "import/no-cycle": "off",
  },
};
