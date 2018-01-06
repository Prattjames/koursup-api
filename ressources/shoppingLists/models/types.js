const t = require('tcomb')
const { Id, Ingredient } = require('../../ingredients/models/types')

const ShoppingList = t.struct({
	_id: t.maybe(Id),
	date: t.Date,
	ingredients: t.list(Ingredient),
	archived: t.Boolean,
	userId: t.Object,
}, {
	name: 'ShoppingList',
	strict: true,
	defaultProps: {
		date: new Date(),
		archived: false
	}
})

module.exports = {
	ShoppingList,
	Id
}