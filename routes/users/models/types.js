const t = require('tcomb')
const { omit } = require('lodash')
const bcrypt = require('bcrypt')
const { Id } = require('../../ingredients/models/types')

const saltRounds = 10

const Email = t.refinement(t.String, function (s) {
  return /@/.test(s);
});

const User = t.struct({
	_id: t.maybe(Id),
	createdAt: t.maybe(t.Date),
	email: Email,
	password: t.String
}, {
	name: 'User',
	strict: true,
	defaultProps: {
		createdAt: new Date()
	}
})

User.prototype.hashPass = async function () {
	try {
		const hash = await bcrypt.hash(this.password, saltRounds)
		this.password = hash
		return omit({ ...this, password: hash }, '_id')
	} catch (error) {
		throw error
	}
}

User.prototype.comparePasswords = async function (hashPass) {
	try {
		return await bcrypt.compare(this.password, hashPass)
	} catch (error) {
		throw error
	}
}

module.exports = {
	User,
	Id
}