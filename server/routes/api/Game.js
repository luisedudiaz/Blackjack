const express = require('express')
const router = express.Router()

const game = require('../../controllers/Game')

router.post('/', game.createGame)

router.get('/all', game.getGames)

module.exports = router
