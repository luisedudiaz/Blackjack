const express = require('express')
const router = express.Router()

const game = require('../../controllers/Game')

router.post('/', game.createGame)

module.exports = router
