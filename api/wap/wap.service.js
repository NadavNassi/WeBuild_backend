const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectID
const logger = require('../../services/logger.service')

const collectionName = 'wap'

async function query() {
    try {
        const collection = await dbService.getCollection(collectionName)
        let waps = await collection.find().toArray()
        return waps
    } catch (err) {
        logger.error('Failed to get waps', err)
        throw err
    }
}

async function createWap(wap) {
    try {
        const collection = await dbService.getCollection(collectionName)
        wap.isPublic = wap.isEdit = true
        res = await collection.insertOne(wap)
        return res.ops
    } catch (err) {
        logger.error('Failed to create wap', err)
        throw err
    }
}


async function updateWap(wap) {
    const { _id } = wap
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ '_id': ObjectId(_id) }, { $set: { ...wap, _id: ObjectId(_id) } })
        return wap;
    } catch (err) {
        logger.error('Failed to update toy', err)
        throw err
    }
}

module.exports = {
    query,
    updateWap,
    createWap
}