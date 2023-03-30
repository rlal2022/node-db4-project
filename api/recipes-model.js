const db = require("../data/db-config.js");

async function getRecipeById() {
  const rows = await db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as si", "si.step_id", "s.step_id")
    .select(
      "r.recipe_id",
      "r.recipe_name",
      "s.step_id",
      "s.step_number",
      "s.step_text",
      "si.ingredient_id",
      "si.ingredient_name",
      "si.quantity"
    )
    .orderBy("s.step_number")
    .where("recipe_id", recipe_id);
  const recipes = {
    recipe_id: rows[0].recipe_id,
    recipe_name: rows[0].recipe_name,
    steps: rows.reduce((acc, row) => {
      if (!row.ingredient_id) {
        return acc.concat({
          step_id: row.step_id,
          step_number: row.step_number,
          step_text: row.step_text,
          ingredients: [
            {
              ingredient_id: row.ingredient_id,
              ingredient_name: row.ingredient_name,
              quantity: row.quantity,
            },
          ],
        });
      }
      const currentStep = acc.find((step) => step.step_id === row.step_id);
      currentStep.ingredients.push({
        ingredient_id: row.ingredient_id,
        ingredient_name: row.ingredient_name,
        quantity: row.quantity,
      });
      return acc;
    }, []),
  };

  return recipes;
}

module.exports = { getRecipeById };
