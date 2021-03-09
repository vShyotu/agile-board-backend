module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["koa", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
