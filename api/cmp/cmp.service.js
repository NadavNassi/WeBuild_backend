const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectID
const logger = require('../../services/logger.service')

const dbName = 'cmp'

async function query() {
    try {
        const collection = await dbService.getCollection(dbName)
        let cmps = await collection.find().toArray()
        return cmps
    } catch (err) {
        logger.error('Failed to get cmps', err)
        throw err
    }
}

module.exports = {
    query
}