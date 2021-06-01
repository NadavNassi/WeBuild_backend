const cmpService = require('./cmp.service')
const logger = require('../../services/logger.service')


async function getCmps(req, res) {
    try {
        const cmps = await cmpService.query()
        res.send(cmps)
    } catch (err) {
        logger.error('Failed to get cmps', err)
        res.status(500).send({ err: 'Failed to get cmps' })
    }
}

module.exports = {
    getCmps
}