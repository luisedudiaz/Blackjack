const express = require('express')
const router = express.Router()

const { player } = require('../../controllers/Player')

router.post('/', player.login)

router.get('/house', player.getHousePlayer)

router.post('/house', player.createHousePlayer)

module.exports = router
