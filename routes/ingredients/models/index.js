const { omit } = require('lodash')
const t = require('tcomb')
const { databaseInstance, ObjectID } = require('../../../services/mongoDb')
const { Id, Ingredient } = require('./types')

const ingredients = async (id, userId = null) => {
	try {
		const db = databaseInstance.getDb()
		const ingredients = db.collection('ingredients')
		if (id) {
			Id(id)
			return await ingredients.findOne({ _id: new ObjectID(id), userId: new ObjectID(userId) }, { projection: { userId: 0 } })
		}
		return await ingredients.find({ userId: new ObjectID(userId) }).project({ userId: 0 }).toArray()
	} catch (error) {
		throw error
	}
}

const createIngredient = async (ing) => {
	try {
		const newIng = omit(Ingredient(ing), ['_id'])
		const db = databaseInstance.getDb()
		const ingredients = db.collection('ingredients')
		const newIngredient = await ingredients.insertOne(newIng)
		return omit(newIngredient.ops, 'userId')
	} catch (error) {
		throw error
	}
}

const updateIngredient = async (id, ing, userId = null) => {
	try {
		Id(id)
		const newIng = omit(Ingredient({ ...ing, createdAt: new Date(ing.createdAt) }), ['_id'])
		const db = databaseInstance.getDb()
		const ingredients = db.collection('ingredients')
		const oldIngredient = await ingredients.findOneAndUpdate({ _id: new ObjectID(id), userId: new ObjectID(userId) }, newIng)
		return omit(oldIngredient.value, 'userId')
	} catch (error) {
		throw error
	}
}

module.exports = {
	ingredients,
	createIngredient,
	updateIngredient
}