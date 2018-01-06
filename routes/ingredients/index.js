const express = require('express')
const passport = require('passport')
const router = express.Router()

const {
	getIngredientsRoute,
	getIngredientByIdRoute,
	createIngredientRoute,
	updateIngredientByIdRoute,
} = require('./ingredients.routes')

router.get('/', passport.authenticate('jwt', { session: false }), getIngredientsRoute)
router.get('/:id',passport.authenticate('jwt', { session: false }), getIngredientByIdRoute)
router.post('/', passport.authenticate('jwt', { session: false }), createIngredientRoute)
router.post('/:id', passport.authenticate('jwt', { session: false }), updateIngredientByIdRoute)

module.exports = router