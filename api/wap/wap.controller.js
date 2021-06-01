const wapService = require('./wap.service')
const logger = require('../../services/logger.service')

async function getWaps(req, res) {
    try {
        const waps = await wapService.query()
        res.send(waps)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function updateWap(req, res) {
    console.log("🚀 ~ file: wap.controller.js ~ line 15 ~ updateWap ~ req", req.body)
    const wapToSave = req.body
    try {
        const wap = await wapService.updateWap(wapToSave)
        res.send(wap)
    } catch (err) {
        logger.error('Failed to update wap', err)
        res.status(500).send({ err })
    }
}

module.exports = {
    getWaps,
    updateWap
}