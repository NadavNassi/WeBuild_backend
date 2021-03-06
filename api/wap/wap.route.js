const express = require('express')
const wapController = require('./wap.controller')
const router = express.Router()

router.get('/', wapController.getWaps)
router.post('/', wapController.createWap)
router.put('/', wapController.updateWap)

module.exports = router