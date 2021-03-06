const express = require('express')
const router = express.Router()

const { card } = require('../../controllers/Card')

router.get('/', card.getDeck)

router.post('/card', card.getCard)

router.post('/', card.createDeck)

module.exports = router
