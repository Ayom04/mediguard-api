/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("medication_remainders", (table) => {
    table.string("medication_remainder_id").primary();
    table.string("medication_name").notNullable();
    table.string("medication_dose").notNullable();
    table.time("medication_time").notNullable();
    table.integer("repeat_interval").notNullable(); // Interval in hours
    table.datetime("last_sent").nullable(); // Stores last reminder sent time
    table.date("medication_date").nullable(); // Changed from STRING to DATE
    table.datetime("schedule").nullable();
    table
      .string("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE"); // Ensure related reminders are deleted if a user is removed
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("medication_reminders");
};
