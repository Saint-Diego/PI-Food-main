const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { apiKey } = require('../utils/config/index');
const ModelCRUD = require('./modelCRUD');

const URL_API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`;

class RecipeController extends ModelCRUD {
  constructor(model) {
    super(model);
  }

  downloadRecipes = async () => {
    try {
      const { data: { results } } = await axios.get(URL_API);
      await results?.map(async (r) => {
        const newRecipe = { 
          name: r.title, 
          summary: r.summary, 
          healthScore: r.healthScore, 
          steps: r.analyzedInstructions[0]?.steps?.map(({number, step}) => ({number, step})),
          image: r.image, 
          dishTypes: r.dishTypes,
        };
        if (r.vegetarian) r.diets = [...r.diets, 'vegetarian'];
        const recipe = await this.model.create(newRecipe);
        const dietPromise = await r.diets?.map(async (name) => 
          await Diet.findOne({where: {name}})
        );
        const dietTypes = await Promise.all(dietPromise);
        await recipe.addDiets(dietTypes);
      });
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

}

const recipeController = new RecipeController(Recipe);

module.exports = recipeController;