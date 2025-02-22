/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("user_id").primary();
    table.string("name").notNullable();
    // table.string("othernames").notNullable();
    table.string("email_address").notNullable().unique();
    table.string("password_hash").notNullable();
    table.string("password_salt").notNullable();
    table.string("phone_number").nullable();
    table.string("location").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
