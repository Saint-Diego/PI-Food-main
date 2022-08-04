const { Router } = require("express");
const recipeController = require('../controllers/recipes');

const router = Router();

router.get('/', recipeController.getAll);
// router.get('/', recipeController.getByName);
router.get('/:idRecipe', recipeController.getById);
router.post('/', recipeController.addOne);

module.exports = router;