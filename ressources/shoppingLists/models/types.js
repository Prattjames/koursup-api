const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ShoppingListSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
	date: { type: Date, default: Date.now },
	archived: { type: Boolean, default: false },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	ingredients: [{
		_id: { type: Schema.Types.ObjectId, get: v => mongoose.Types.ObjectId(v), set: v => mongoose.Types.ObjectId(v) },
		price: { type: Number, required: true }
	}]
})

const ShoppingListModel = mongoose.model('ShoppingList', ShoppingListSchema)

module.exports = {
	ShoppingListModel
}