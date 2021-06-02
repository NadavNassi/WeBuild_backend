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
        wap.isPublic = true
        await collection.insertOne(wap)
        return wap
    } catch (err) {
        logger.error('Failed to create wap', err)
        throw err
    }
}


async function updateWap(wap) {
    console.log("🚀 ~ file: wap.service.js ~ line 19 ~ updateWap ~ wap", wap)
    const { _id } = wap
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ '_id': ObjectId(_id) }, { $set: { ...wap, _id: ObjectId(_id) } })
        console.log("🚀 ~ file: wap.service.js ~ line 24 ~ updateWap ~ updatedWap", wap)
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