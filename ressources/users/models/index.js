const t = require('tcomb')
const { omit } = require('lodash')
const jwt = require('jsonwebtoken')
const { secret } = require('../../../config/main')
const { ObjectID } = require('../../../services/mongoDb')
const { getCollection } = require('../../../helpers/db.helpers')
const { Id, User } = require('./types')

const Users = async (id) => {
	try {
		const users = await getCollection('users')
		return await users.findOne({ _id: new ObjectID(id) })
	} catch (error) {
		throw error
	}
}

const registerUser = async (infos) => {
	try {
		const validUser = User(infos)
		const newUser = await validUser.hashPass()
		const users = await getCollection('users')
		await users.ensureIndex( { email: 1 }, { unique: true } )
		const createdUser = await users.insertOne(newUser)
		return createdUser.ops
	} catch (error) {
		throw error
	}
}

const authenticateUser = async (infos) => {
	try {
		const validUser = User(infos)
		const users = await getCollection('users')
		const user = await users.findOne({ email: validUser.email })
		const isSamePassword = await validUser.comparePasswords(user.password)
		if (!user || !isSamePassword) return null
		return `token ${jwt.sign(user, secret, { expiresIn: 10080 })}`
	} catch (error) {
		throw error
	}
}

module.exports = {
	Users,
	registerUser,
	authenticateUser
}