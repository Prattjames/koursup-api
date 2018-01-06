const { isEmpty } = require('lodash')
const { 
	shoppingLists,
	createShoppingList,
	updateShoppingList,
	archiveShoppingList,
} = require('./models')

const getShoppingListsRoute = async (req, res) => {
	try {
		const shoppingListsData = await shoppingLists(null, req.user._id)
		res.json(shoppingListsData)
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: String(error) })
	}
}

const getShoppingListByIdRoute = async (req, res) => {
	try {
		const shoppingListData = await shoppingLists(req.params.id, req.user._id)
		if (!isEmpty(shoppingListData)) res.json(shoppingListData)
		else res.status(204).send()
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: String(error) })
	}
}

const createShoppingListRoute = async (req, res) => {
	try {
		const shoppingListData = await createShoppingList({ ...req.body, userId: req.user._id })
		if (!isEmpty(shoppingListData)) res.status(201).json(shoppingListData)
		else res.status(204).send()
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: String(error) })
	}
}

const updateShoppingListRoute = async (req, res) => {
	try {
		await updateShoppingList(req.params.id, { ...req.body, userId: res.user._id }, req.user._id)
		res.json({ ...req.body, _id: req.params.id })
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: String(error) })
	}
}

const archiveShoppingListRoute = async (req, res) => {
	try {
		const shoppingListData = await archiveShoppingList(req.params.id, req.user._id)
		res.json(shoppingListData)
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: String(error) })
	}
}

const unArchiveShoppingListRoute = async (req, res) => {
	try {
		const shoppingListData = await archiveShoppingList(req.params.id, false, req.user._id)
		res.json(shoppingListData)
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: String(error) })
	}
}

module.exports = {
	getShoppingListsRoute,
	getShoppingListByIdRoute,
	createShoppingListRoute,
	updateShoppingListRoute,
	archiveShoppingListRoute,
	unArchiveShoppingListRoute
}