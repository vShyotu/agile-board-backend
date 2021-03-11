exports.up = function (knex) {
  return knex.schema.createTable("tickets", (table) => {
    table.increments("id");
    table.string("title");
    table.string("type");
    table.string("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tickets");
};
