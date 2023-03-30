/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable("recipes", (table) => {
      table.increments("zoo_id");
      table.string("recipe_name", 200).notNullable().unique();
    })
    .createTable("ingredients", (table) => {
      table.increments("ingredient_id");
      table.string("ingredient_name", 200).notNullable().unique();
      table.string("ingredient_unit", 50);
    })
    .createTable("steps", (table) => {
      table.increments("stepid");
      table.string("step_text", 200).notNullable();
      table.integer("step_number").notNullable();
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
    .createTable("step_ingredients", (table) => {
      table.increments("step_ingredient_id");
      table.float("quanity").notNullable();
      table
        .integer("step_id")
        .unsigned()
        .notNullable()
        .references("zoo_id")
        .inTable("zoos")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("step_ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes");
};
