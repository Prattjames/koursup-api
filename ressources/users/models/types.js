const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const saltRounds = 10

const UserSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
})

UserSchema.path('email').validate(function (email) {
	var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	return emailRegex.test(email)
}, 'The email is required')

UserSchema.pre('save', async function(next) {
	try {
		const hash = await bcrypt.hash(this.password, saltRounds)
		this.password = hash
		next()
	} catch (error) {
		throw error
	}
})

UserSchema.methods.comparePasswords = async function (infos) {
	try {
		return await bcrypt.compare(infos.password, this.password)
	} catch (error) {
		throw error
	}
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
	UserModel
}