const mongoose = require('mongoose')

const { mongoDbName, mongodbUrl } = require('../config/main')

mongoose.connect(mongodbUrl)
mongoose.Promise = global.Promise;

module.exports = {
	ObjectID: mongoose.Types.ObjectId
}