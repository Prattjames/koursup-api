const { promisify } = require('util')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const { mongoDbName, mongodbUrl } = require('../config/main')

class MongoDb {
	constructor() {
		// Connection URL
		this._url = mongodbUrl
		// Database Name
		this._dbName = mongoDbName
		// Database instance
		this._db = null
		this.connectDb()
	}

	connectDb () {
		MongoClient.connect(this._url, (err, client) => {
			console.log("Connected successfully to database")
			this._db = client.db(this._dbName)
		})
	}

	getDb () {
		return this._db
	}
}

const databaseInstance = new MongoDb()

module.exports = {
	databaseInstance,
	ObjectID
}