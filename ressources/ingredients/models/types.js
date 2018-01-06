const mongoose = require('mongoose')

const Schema = mongoose.Schema

const IngredientSchema = new Schema({
	_id: {  type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const IngredientModel = mongoose.model('Ingredient', IngredientSchema)

module.exports = {
	IngredientModel
}