exports.up = function (knex) {
  return knex.schema.createTable("tickets", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.string("type").notNullable();
    table.string("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tickets");
};
