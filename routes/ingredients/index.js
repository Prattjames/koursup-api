const express = require('express')
const router = express.Router()

const {
	getIngredientsRoute,
	getIngredientByIdRoute,
	createIngredientRoute,
	updateIngredientByIdRoute,
} = require('./ingredients.routes')

router.get('/', getIngredientsRoute)
router.get('/:id', getIngredientByIdRoute)
router.post('/', createIngredientRoute)
router.post('/:id', updateIngredientByIdRoute)

module.exports = router