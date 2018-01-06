const { isEmpty } = require('lodash')

const { 
	ingredients,
	createIngredient,
	updateIngredient
} = require('./models')

const getIngredientsRoute = async (req, res) => {
 try {
	const ingredientsData = await ingredients(null, req.user._id)
	if (ingredientsData) res.json(ingredientsData)
	else res.status(204).json([])
 } catch (error) {
	 res.status(500).send(error)
 }
}

const getIngredientByIdRoute = async (req, res) => {
	try {
		const ingredientData = await ingredients(req.params.id, req.user._id)
		if (ingredientData) res.json(ingredientData)
		else res.status(404).json({})
	} catch (error) {
		res.status(400).send({ message: String(error) })
	}
}

const createIngredientRoute = async (req, res) => {
	try {
		const { name, price } = req.body
		if (!name || !price) res.status(400).json({ message: "name and price is required" })
		const newIngredientData = await createIngredient({ name, price, user: req.user._id }, req.user._id)
		if (newIngredientData) res.json(newIngredientData)
	} catch (error) {
		res.status(400).send({ message: String(error) })
	}
}

const updateIngredientByIdRoute = async (req, res) => {
	try {
		if (isEmpty(req.body)) res.status(400).json({ message: "the ingredient data is required" })
		const updatedIngredient = await updateIngredient(req.params.id, { ...req.body }, req.user._id,)
		res.json(updatedIngredient)
	} catch (error) {
		res.status(400).send({ message: String(error) })
	}
}

module.exports = {
	getIngredientsRoute,
	getIngredientByIdRoute,
	createIngredientRoute,
	updateIngredientByIdRoute,
}