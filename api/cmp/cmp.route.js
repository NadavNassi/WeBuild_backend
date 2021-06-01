const express = require('express')
const router = express.Router()
const cmpController = require('./cmp.controller')

router.get('/', cmpController.getCmps)

module.exports = router