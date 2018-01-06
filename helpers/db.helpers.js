const { databaseInstance } = require('../services/mongoDb')

const getCollection = (collectionName) => {
	const db = databaseInstance.getDb()
	return db.collection(collectionName)
}

module.exports = {
	getCollection
}