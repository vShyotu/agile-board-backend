# Steps

## Install and setup Koa

1. `npm init --yes`
   Change package.json to use app.js as the main entry point
2. `npm install koa`

3. Create app.js and setup basic hello world

   ```js
   // app.js

   const Koa = require("koa");
   const app = new Koa();
   const port = process.env.APP_PORT || 3000;

   app.use(async (ctx) => {
     ctx.body = "Hello World";
   });

   app.listen(port);

   console.log(`App listening on port ${port}`);
   ```

4. Setup package.json to have a start command

   ```json
   "start:dev": "SET NODE_ENV=development & node app.js",
   ```

5. Try and see if it works.

   `npm run start:dev`

## Setup Tooling (ESLint, Prettier, Nodemon)

### ESLint - Koa Config

1. Install eslint - `npm install eslint --save-dev`

2. Create config file - `npx eslint --init`

   - Use the following options:
     - Option 3 - Enforce code style
     - Common JS
     - None
     - No
     - Invert selections so that node is highlighted and browser isn't
     - Use a popular style guide
     - Standard
     - JavaScript

3. Use eslint-config-koa

   ```
   npm install --save-dev eslint-config-koa eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
   ```

   - Change the extends array to be koa rather than standard

   ```js
   extends: ["eslint:recommended", "koa"],
   ```

### Prettier - Code formatting

1. Install prettier - `npm install --save-dev --save-exact prettier`

2. Configure prettier

   - Create .prettierrc.json - `echo {} > .prettierrc.json`
   - Add the following config (tweak to your needs):
     ```json
     {
       "trailingComma": "es5",
       "tabWidth": 2,
       "semi": true,
       "singleQuote": false
     }
     ```
   - Create .prettierignore with `build` and `coverage` ignored.

3. Configure ESLint to work with prettier. By default some of prettiers rules conflict with eslint, so `eslint-config-prettier` allows them to work together.

   - `npm install --save-dev eslint-config-prettier`
   - Add "prettier" to the extends array in .eslintrc.js

   ```js
   extends: ["eslint:recommended", "koa", "prettier"],
   ```

### Setup Nodemon

Currently we have to restart the application everytime we make changes - nodemon will take care of this for us and watch for changes and restart as necessary.

`npm install --save-dev nodemon`

Change npm script for starting development to use nodemon

```json
"start:dev":"SET NODE_ENV=development && nodemon"
```

`nodemon` uses the package.json's entry point by default, but you can specify it as an additional parameter if necessary.

Run `npm run start:dev` and change app.js to:

```js
// app.js

const Koa = require("koa");
const app = new Koa();
const port = process.env.APP_PORT || 3000;
const env = process.env.NODE_ENV || "";

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(port);

console.log(`App listening on port ${port} in ${env}mode`);
```

If setup you should see "App listening on port 3000" displayed and then "App listening on port 3000 in development mode" after saving the file.

`ctrl+c` to stop nodemon.

## Create Repo

1. Create a .gitignore file in the root of the project with `node_modules` and `.DS_Store`
1. `git init`
1. `git add .`
1. `git commit -m "Initial commit"`
1. Add README.md with description of the project
1. `git add README.md`
1. `git commit -m "Add README.md`

## Create GitHub Repo

1. Login to GitHub and create a repository.
1. Follow the instructions provided by github to push an existing repo.

```
git remote add origin git@github.com:<username>/<repo>.git
git branch -M main
git push -u origin main
```

## Setup Husky

Setup Husky pre-commit hooks with lint-staged to run linting and formatting on commits

- `npx mrm lint-staged`
- Remove any log file artefacts created by this command (e.g. 10)

  **Note:** it's important that eslint and prettier are configured prior to this as it will detect them in your package.json file to setup lint-staged and husky and create their configs in package.json.

## Setup Koa Router

`npm install @koa/router`

What is it? A router middleware for Koa. Unlike Express Koa does not come with routing out of the box.

## Setup heartbeat route

```js
// app.js

const Koa = require("koa");
const Router = require("@koa/router");
const app = new Koa();
const router = new Router();
const port = process.env.APP_PORT || 3000;
const env = process.env.NODE_ENV || "";

router.get("/heartbeat", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = { serviceName: "agile-board-backend", status: ctx.status };
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);
console.log(`App listening on port ${port} in ${env}mode`);
```

## Setup Testing (Jest, Supertest)

### Install jest and supertest

`npm install --save-dev jest supertest`

### Configure jest

Run the following command to initialise a jest.config.js:
`npx jest --init`

Select the following options:

- No
- Node
- Yes
- v8
- Yes

For more information about the reporters available see this page: https://istanbul.js.org/docs/advanced/alternative-reporters/

Adjust config as required for your project, here's what I'm using:

```js
// jest.config.js

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  // text is used to generate console output for coverage, lcov generates html and lcov format report.
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "node"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  transformIgnorePatterns: ["\\\\node_modules\\\\"],
};
```

### Setup jest/eslint compatibility

`npm install --save-dev eslint-plugin-jest`

- Add `"plugin:jest/recommended"` to the plugins in .eslintrc.js

  ```js
  extends: ["eslint:recommended", "plugin:jest/recommended", "koa", "prettier"],
  ```

### Setup package.json for testing

- Change package.json's `"test": "jest"`
- Add package.json script `"test:coverage": "jest --coverage"`

### Write tests for app.js

### Run tests

`npm run test:coverage`

### Add Coverage to .gitignore

Add `coverage` to .gitignore - we don't want to commit test coverage files.

### Ignore coverage folder in jest config

```js
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\coverage\\\\"],
  transformIgnorePatterns: ["\\\\node_modules\\\\", "\\\\coverage\\\\"],
```

### Update pre-commit hooks to include running the tests

```js
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "jest --findRelatedTests --bail"
    ],
    "*.{js,md}": "prettier --write"
  }
```
