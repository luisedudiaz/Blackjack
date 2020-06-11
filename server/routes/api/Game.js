const express = require('express')
const router = express.Router()

const game = require('../../controllers/Game')

router.post('/', game.createGame)

router.get('/all', game.getGames)

router.get('', game.getGame)

router.post('/update', game.updateGame)

module.exports = router
