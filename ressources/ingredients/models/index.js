const { ObjectID } = require('../../../services/mongoDb')
const { IngredientModel } = require('./types')

const removedFields = { user: 0, __v: 0 }

const ingredients = async (id, userId = null) => {
	if (id) return await IngredientModel.findOne({ _id: new ObjectID(id), user: userId }, removedFields)
	return await IngredientModel.find({ user: new ObjectID(userId) }, removedFields)
}

const createIngredient = async (ing) => {
	const newIng = new IngredientModel(ing)
	await newIng.save()
	return newIng
}

const updateIngredient = async (id, ing, userId = null) => {
	return await IngredientModel.findOneAndUpdate(
		{ _id: new ObjectID(id), user: userId },
		ing,
		{ new: true, fields: removedFields }
	)
}

module.exports = {
	ingredients,
	createIngredient,
	updateIngredient
}