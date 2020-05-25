const express = require('express')
const router = express.Router()

const player = require('../../controllers/Player')

router.get('/')

router.get('/house', player.getHousePlayer)

router.post('/house', player.createHousePlayer)

module.exports = router
