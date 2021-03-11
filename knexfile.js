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
