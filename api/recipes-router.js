//eslint-disable

const express = require("express");
const Recipe = require("./recipes-model");

const router = express.Router();

router.get("/:recipe_id", (req, res, next) => {
  Recipe.getRecipeById(req.params.recipe_id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "We ran into an error!",
    message: err.message,
    stack: err.stack,
  });
});
module.exports = router;
