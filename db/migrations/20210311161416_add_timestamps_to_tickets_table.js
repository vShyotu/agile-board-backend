exports.up = function (knex) {
  return knex.schema.table("tickets", (table) => {
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.table("tickets", (table) => {
    table.dropTimestamps();
  });
};
