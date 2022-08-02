const { Diet } = require('../db');
const ModelCRUD = require('./modelCRUD');

class DietController extends ModelCRUD {
  constructor(model) {
    super(model);
  }

  loadDiets = async () => {
    try {
      let dietTypes = [
        {name: 'gluten free'},
        {name: 'dairy free'},
        {name: 'lacto ovo vegetarian'},
        {name: 'vegan'},
        {name: 'paleolithic'},
        {name: 'primal'},
        {name: 'whole 30'},
        {name: 'pescatarian'},
        {name: 'ketogenic'},
        {name: 'fodmap friendly'},
        {name: 'vegetarian'},
      ];
      await this.model.bulkCreate(dietTypes);
    } catch (error) {
      throw new TypeError(error.message);
    }
  };
}

const dietController = new DietController(Diet);

module.exports = dietController;