exports.up = async function (knex) {
  await knex.schema.table("tickets", (table) => {
    table.timestamps(false, true);
  });

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$;
  `);

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON tickets
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp()
  `);
};

exports.down = async function (knex) {
  await knex.schema.table("tickets", (table) => {
    table.dropTimestamps();
  });

  await knex.raw(`
    DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
  `);
};
