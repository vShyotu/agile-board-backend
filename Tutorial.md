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

## Database Setup (Postgres)

We're going to run Postgres locally in a docker container - so we don't have to go through the process of installing it.

Install docker.

Run the following command to pull down Postgres and run it:

```
docker run --rm --name agile-board-postgres -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v D:/docker/volumes/postgres:/var/lib/postgresql/data postgres
```

- `--name agile-board-postgres` sets the container name
- `-v /docker/volumes/postgres:/var/lib/postgresql/data` mounts the postgres volume from the container to /docker/volumes/postgres
- `--rm` removes the container when its stopped
- `-e POSTGRES_PASSWORD=docker` sets up the environment variable (POSTGRES_USER and POSTGRES_DB also available)
- `-d` detached mode
- `-p 5432:5432` exposes the port and maps it to the port inside the container - postgres runs on 5432 by default

If you exec into the container you can access postgres with the following command:

`psql -U postgres`

Setup some databases by running:

`create database agile_board;`
`create database agile_board_test;`

We'll use one for development and one specifically for testing

## Install dependencies for working with Postgres

`npm install pg knex` - pg is node-postgres a node wrapper for interacting with a postgres database and knex is a query builder for SQL databases - compatible with PostgreSQL

Either install knex globally with npm `npm i -g knex` to use the CLI or prefix all knex cli commands with `npx`

`knex init`

Edit the knexfile.js to be the following:

```js
const path = require("path");

const BASE_PATH = path.join(__dirname, "db");

module.exports = {
  test: {
    client: "pg",
    connection: {
      database: "agile_board_test",
      user: "postgres",
      password: "docker",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },

  development: {
    client: "postgresql",
    connection: {
      database: "agile_board",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
};
```

Create migration to add a tickets table
`knex migrate:make tickets_table`
-> edit in /db/migrations/timestamp_tickets_table.js

Create schema for the table

Save and run the migration
`knex migrate:latest`

Create a seed file
`knex seed:make tickets_seed`
-> edit in /seeds/tickets_seed.js

Save and run the seeds
`knex seed:run`

Exec into the container, login to psql and then
`\l` to list the databases
`\c` to change the database - use `\c agile_board`
`\dt` to list tables in the database - check tickets now exists
`select * from tickets` - check the seed ran correctly

## Create connection.js file

## Create queries folder

Create tickets.js query file - import knex and use the connection.js file

## Create routes folder

Create tickets.js routes file - import tickets knex from tickets.js in queries,

- Add router to app.js
- Add test file (ticket.spec.js)

## Create GET all tickets route by TDD

## Create GET single ticket route by TDD

## Install koa body parser

## Setup POST new ticket route by TDD
