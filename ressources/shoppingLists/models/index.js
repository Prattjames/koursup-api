const t = require('tcomb')
const fromJSON = require('tcomb/lib/fromJSON')
const { omit } = require('lodash')
const { ObjectID } = require('../../../services/mongoDb')
const { getCollection } = require('../../../helpers/db.helpers')
const { Id, ShoppingList } = require('./types')

const shoppingLists = async (id, userId = null) => {
	try {
		const shoppingLists = getCollection('shoppingLists')
		if (id) {
			Id(id)
			return await shoppingLists.findOne(
				{ _id: new ObjectID(id), userId: userId },
				{ projection: { userId: 0 } }
			)
		}
		return await shoppingLists.find({ userId: userId }).project({ userId: 0 }).toArray()
	} catch (error) {
		throw error
	}
}

const createShoppingList = async (newList) => {
	try {
		const newShopList = omit(ShoppingList(omit(newList, 'date')), '_id')
		const ingredients = newShopList.ingredients.map(ing => {
			if (!ing._id) throw new Error('Ingredients ids are needed')
			return omit(ing, 'userId')
		})
		const shoppingListsModel = getCollection('shoppingLists')
		const newShoppingList = await shoppingListsModel.insertOne({ ...newShopList, ingredients })
		return await shoppingLists(String(newShoppingList.insertedId), newList.userId)
	} catch (error) {
		throw error
	}
}

const updateShoppingList = async (id, changedList, userId = null) => {
	try {
		const newShopList = {
			...changedList,
			date: new Date(changedList.date)
		}
		ShoppingList(newShopList)
		const shoppingLists = getCollection('shoppingLists')
		const oldShoppingList = await shoppingLists.findOneAndUpdate({ _id: new ObjectID(id), userId: userId }, newShopList)
		return omit(oldShoppingList.value, 'userId')
	} catch (error) {
		throw error
	}
}

const archiveShoppingList = async (id, archived = true, userId = null) => {
	try {
		Id(id)
		const shoppingListsModel = getCollection('shoppingLists')
		const shoppingList = await shoppingListsModel.updateOne({ _id: new ObjectID(id), userId: userId }, { $set: { archived } })
		return await shoppingLists(id, userId)
	} catch (error) {
		throw error
	}
}

module.exports = {
	shoppingLists,
	createShoppingList,
	updateShoppingList,
	archiveShoppingList
}