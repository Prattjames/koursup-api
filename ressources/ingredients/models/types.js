const t = require('tcomb')

const Id = t.refinement(t.String, (s) => s.length === 24, 'Id')
const Ingredient = t.struct({
	_id: t.maybe(Id),
	name: t.String,
	price: t.Number,
	createdAt: t.Date,
	userId: t.maybe(t.Object),
}, {
	name: 'Ingredient',
	strict: true,
	defaultProps: {
		createdAt: new Date()
	}
})

module.exports = {
	Id,
	Ingredient
}