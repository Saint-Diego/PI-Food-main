const { Diet, Op } = require('../db');

class ModelCRUD {
  constructor(modelo) {
    this.model = modelo;
  }; 

  getAll = async (req, res, next) => {
    const name = (req.query) && req.query.name;
    const condition = {
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    };
    try {
      let data = null;
      if (this.model !== Diet) {
        const dbRecipes = (!name) ? await this.model.findAll() :  await this.model.findAll(condition);
        const promise = await dbRecipes?.map(async (r) => await this.setDiets(r));
        data = await Promise.all(promise);
      } else data = await this.model.findAll();
      if (data.length) res.send(data);
      else res.status(404).send('Recipes not found!');
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    let id = (req.params) ? req.params.idRecipe : req.query.idRecipe;
    try {
      const result = await this.model.findByPk(id);
      if (!result) res.status(404).send('Recipe not found!');
      res.send(await this.setDiets(result));
    } catch (error) {
      next(error);
    }
  };

  getByName = async (req, res, next) => {
    let name = (req.query) ? req.query.name : req.params.name;
    try {
      const result = await this.model.finOne({where: {name}});
      if (!result) res.status(404).send('Recipe not found!');
      res.send(await this.setDiets(result));
    } catch (error) {
      next(error);
    }
  };

  addOne = async (req, res, next) => {
    try {
      const created = await this.model.create(req.body);
      if (!created) res.send(`The ${req.body.name} recipe already exist`);
      await this.transfer(created, req.body.diets);
      res.status(201).send('Recipe created successfully');
    } catch (error) {
      next(error);
    }
  };

  transfer = async (recipe, dietTypes) => {
    try {
      const dietPromise = await dietTypes?.map(async (name) => 
        await Diet.findOne({where: {name}})
      );
      const codeDiets = await Promise.all(dietPromise);
      await recipe.addDiets(codeDiets);
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

  setDiets = async (recipe) => {
    try {
      const allDiets = await recipe.getDiets();
      const diets = allDiets?.map((d) => d.toJSON().name);
      return {...recipe.toJSON(), diets};
    } catch (error) {
      throw new TypeError(error.message);
    }
  };

}

module.exports = ModelCRUD;