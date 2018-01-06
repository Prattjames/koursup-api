const { ObjectID } = require('../../../config/mongoDb')
const { ShoppingListModel } = require('./types')

const removedFields = { user: 0, __v: 0 }

const shoppingLists = async (id, userId = null) => {
	if (id) return await ShoppingListModel.findOne({ _id: new ObjectID(id), user: userId }, removedFields)
	return await ShoppingListModel.find({ user: userId }, removedFields)
}

const createShoppingList = async (newList) => {
	const newShoppingList = new ShoppingListModel(newList)
	await newShoppingList.save()
	return newShoppingList
}

const updateShoppingList = async (id, changedList, userId = null) => {
	return await ShoppingListModel.findOneAndUpdate(
		{ _id: new ObjectID(id), user: userId },
		changedList,
		{ new: true, fields: removedFields }
	)
}

const archiveShoppingList = async (id, archived = true, userId = null) => {
	return await ShoppingListModel.findOneAndUpdate(
		{ _id: new ObjectID(id), user: userId },
		{ archived },
		{ new: true, fields: removedFields }
	)
}

module.exports = {
	shoppingLists,
	createShoppingList,
	updateShoppingList,
	archiveShoppingList
}