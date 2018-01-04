const t = require('tcomb')
const { databaseInstance, ObjectID } = require('../../../services/mongoDb')

// SCHEMAS TYPES
const Id = t.refinement(t.String, (s) => s.length === 24, 'Id')
const Ingredient = t.struct({
	name: t.String,
	price: t.Number
}, 'Ingredient')


const ingredients = async (id) => {
	try {
		const db = databaseInstance.getDb()
		const ingredients = db.collection('ingredients')
		if (id) {
			Id(id)
			return await ingredients.findOne({ _id: new ObjectID(id) })
		}
		return await ingredients.find({}).toArray()
	} catch (error) {
		throw error
	}
}

const createIngredient = async (ing) => {
	try {
		Ingredient(ing)
		const db = databaseInstance.getDb()
		const ingredients = db.collection('ingredients')
		const newIngredient = await ingredients.insertOne(ing)
		return newIngredient.ops
	} catch (error) {
		throw error
	}
}

const updateIngredient = async (id, newIng) => {
	try {
		Id(id)
		Ingredient(newIng)
		const db = databaseInstance.getDb()
		const ingredients = db.collection('ingredients')
		const oldIngredient = await ingredients.findOneAndUpdate({ _id: new ObjectID(id) }, newIng)
		return oldIngredient.value
	} catch (error) {
		throw error
	}
}

module.exports = {
	ingredients,
	createIngredient,
	updateIngredient
}