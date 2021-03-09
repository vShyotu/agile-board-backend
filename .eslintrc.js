module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:jest/recommended", "koa", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
