const { promisify } = require('util')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

class MongoDb {
	constructor() {
		// Connection URL
		this._url = 'mongodb://admin:admin@ds135817.mlab.com:35817/tests'
		// Database Name
		this._dbName = 'tests'
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