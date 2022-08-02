const { Router } = require("express");
const dietController = require('../controllers/diets')

const router = Router();

router.get('/', dietController.getAll);

module.exports = router;